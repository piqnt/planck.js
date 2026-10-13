import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals-core";

interface ZoomPanContext {
  pointerCaptured: boolean;
  containerElement: Signal<HTMLElement>;
  zoomPan: Signal<boolean>;
}

type Point = { x: number; y: number };

// a press becomes a pan once it moves this far, in CSS px, so a click stays a click
const PAN_THRESHOLD = 10;
// zoom per wheel notch
const WHEEL_ZOOM = 0.05;

/**
 * Zoom and pan of the view, on pointer events alone: the wheel zooms around the cursor, one
 * pointer dragging where no tool holds it (empty space) pans, two pointers pinch-zoom around
 * their midpoint and pan with it. Emits display-zoom and display-pan, which CameraTransform
 * applies. Off while `zoomPan` is false: then the wheel scrolls the page as usual.
 */
export class ZoomPanProvider extends Middleware<ZoomPanContext> {
  private containerElement: HTMLElement | null = null;
  private disposers: (() => void)[] = [];

  // active pointers, by id, in container coordinates
  private pointers = new Map<number, Point>();
  // the one pointer's press point, until it moves past the threshold
  private panFrom: Point | null = null;
  private panning = false;
  // a press a tool took (pointerCaptured when it went down) never pans
  private panBlocked = false;
  // the last pinch's spread and midpoint
  private pinchDistance = 0;
  private pinchCenter: Point | null = null;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement) return;
        this.containerElement = containerElement;

        containerElement.addEventListener("pointerdown", this.handlePointerDown);
        // not passive: it prevents the page from scrolling while zooming
        containerElement.addEventListener("wheel", this.handleWheel, { passive: false });

        return () => {
          containerElement.removeEventListener("pointerdown", this.handlePointerDown);
          containerElement.removeEventListener("wheel", this.handleWheel);
          this.endAll();
          this.containerElement = null;
        };
      }),
      // touches go to the testbed, not to scrolling or zooming the page, while it is on
      effect(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement || !this.context.zoomPan?.value) return;
        const touchAction = containerElement.style.touchAction;
        containerElement.style.touchAction = "none";
        return () => {
          containerElement.style.touchAction = touchAction;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  private get enabled() {
    return !!this.context.zoomPan?.value;
  }

  private toPoint(ev: { clientX: number; clientY: number }): Point {
    const rect = this.containerElement.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  private handleWheel = (ev: WheelEvent) => {
    if (!this.enabled) return;
    ev.preventDefault();
    const delta = Math.max(-1, Math.min(1, -(ev.deltaX + ev.deltaY)));
    this.emit("display-zoom", { zoom: 1 + delta * WHEEL_ZOOM, center: this.toPoint(ev) });
  };

  private handlePointerDown = (ev: PointerEvent) => {
    if (!this.enabled || !this.containerElement) return;
    // the mouse pans with its main button; touch and pen with any contact
    if (ev.pointerType === "mouse" && ev.button !== 0) return;

    if (this.pointers.size === 0) {
      window.addEventListener("pointermove", this.handlePointerMove);
      window.addEventListener("pointerup", this.handlePointerUp);
      window.addEventListener("pointercancel", this.handlePointerUp);
    }
    this.pointers.set(ev.pointerId, this.toPoint(ev));
    this.restart();
  };

  private handlePointerMove = (ev: PointerEvent) => {
    if (!this.pointers.has(ev.pointerId)) return;
    const point = this.toPoint(ev);
    this.pointers.set(ev.pointerId, point);
    if (!this.enabled) return;

    if (this.pointers.size === 1) {
      this.movePan(point);
    } else if (this.pointers.size === 2) {
      this.movePinch();
    }
  };

  private handlePointerUp = (ev: PointerEvent) => {
    if (!this.pointers.delete(ev.pointerId)) return;
    if (this.pointers.size === 0) {
      this.endAll();
    } else {
      this.restart();
    }
  };

  // a pointer came or went: the gesture starts over from where the pointers are now, so the
  // view does not jump
  private restart() {
    const points = [...this.pointers.values()];
    if (points.length === 1) {
      // the first press: a tool that took it (pulling a body) keeps it from panning
      if (!this.panning && !this.panFrom) this.panBlocked = this.context.pointerCaptured;
      this.panFrom = { ...points[0] };
      this.panning = this.panning && !this.panBlocked;
      this.pinchCenter = null;
    } else if (points.length === 2) {
      this.panFrom = null;
      this.pinchDistance = distance(points[0], points[1]);
      this.pinchCenter = midpoint(points[0], points[1]);
    }
  }

  private movePan(point: Point) {
    if (this.panBlocked || this.context.pointerCaptured || !this.panFrom) return;
    const dx = point.x - this.panFrom.x;
    const dy = point.y - this.panFrom.y;
    if (!this.panning && Math.hypot(dx, dy) < PAN_THRESHOLD) return;
    this.panning = true;
    this.emit("display-pan", { delta: { x: -dx, y: -dy } });
    this.panFrom = point;
  }

  private movePinch() {
    const [a, b] = [...this.pointers.values()];
    const spread = distance(a, b);
    const center = midpoint(a, b);
    if (this.pinchCenter) {
      this.emit("display-pan", { delta: { x: this.pinchCenter.x - center.x, y: this.pinchCenter.y - center.y } });
    }
    if (this.pinchDistance > 0 && spread > 0) {
      this.emit("display-zoom", { zoom: spread / this.pinchDistance, center });
    }
    this.pinchDistance = spread;
    this.pinchCenter = center;
  }

  private endAll() {
    this.pointers.clear();
    this.panFrom = null;
    this.panning = false;
    this.panBlocked = false;
    this.pinchCenter = null;
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
    window.removeEventListener("pointercancel", this.handlePointerUp);
  }
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
