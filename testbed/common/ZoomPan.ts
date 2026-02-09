import * as Stage from "stage-js";
import Hammer from "hammerjs";
import { Middleware, Memo } from "polymatic";

interface ZoomPanPluginContext {
  pointerCaptured: boolean;
  containerElement: HTMLElement;
  stage: Stage.Root;
  // zoom: number;
}

export interface ZoomEvent {
  zoom: number;
  center: { x: number; y: number };
}

export interface PanEvent {
  delta: { x: number; y: number };
}

/**
 * Zoom and pan the root component, using Hammer.js.
 */
export class ZoomPanProvider extends Middleware<ZoomPanPluginContext> {
  hammer: Hammer.Manager | null = null;
  containerElement: HTMLElement | null = null;

  setupMemo = Memo.init();
  pinchScale = 1;
  pan = { x: 0, y: 0 };

  constructor() {
    super();
    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);

    this.on("display-zoom", this.handleZoom);
    this.on("display-pan", this.handlePan);
  }

  handleContextChange = () => {
    this.containerElement = this.context.containerElement;
    if (!this.setupMemo.update(this.containerElement)) return;

    // console.log('zoom', element);
    if (!this.containerElement) {
      return;
    }

    this.hammer = new Hammer(this.containerElement, {});
    this.hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.get("pinch").set({ enable: true });

    this.hammer.on("pinchstart", this.handlePinchStart);
    this.hammer.on("pinchin", this.handlePinch);
    this.hammer.on("pinchout", this.handlePinch);

    this.hammer.on("panstart", this.handlePanStart);
    this.hammer.on("panmove", this.handlePanMove);

    this.containerElement.addEventListener("wheel", this.wheelListener, false);
  };

  handleDeactivate = () => {
    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = null;
    }

    if (this.containerElement) {
      this.containerElement.removeEventListener("wheel", this.wheelListener);
      this.containerElement = null;
    }
  };

  getPoint = (ev: WheelEvent) => {
    const rect = this.containerElement.getBoundingClientRect() as DOMRect;
    const point = {
      x: ev.clientX - rect.left,
      y: ev.clientY - rect.top,
    };
    return point;
  };

  wheelListener = (ev: WheelEvent) => {
    ev.preventDefault();
    const delta = Math.max(-1, Math.min(1, -(ev.deltaX + ev.deltaY)));
    const point = this.getPoint(ev);
    this.emit("display-zoom", {
      zoom: 1 + delta * 0.05,
      center: point,
    });
  };

  handlePinchStart = () => {
    this.pinchScale = 1;
  };

  handlePinch = ({ target, scale, center, rotation }) => {
    const rect = target.getBoundingClientRect() as DOMRect;
    const x = center.x - rect.left;
    const y = center.y - rect.top;

    this.emit("display-zoom", {
      zoom: scale / this.pinchScale,
      center: { x, y },
    });
    this.pinchScale = scale;
  };

  handlePanStart = () => {
    this.pan.x = 0;
    this.pan.y = 0;
  };

  handlePanMove = ({ deltaX, deltaY }) => {
    if (this.context.pointerCaptured) {
      return;
    }
    const delta = {
      x: this.pan.x - deltaX,
      y: this.pan.y - deltaY,
    };
    this.emit("display-pan", {
      delta,
    });
    this.pan.x = deltaX;
    this.pan.y = deltaY;
  };

  camera = new Stage.Matrix();

  containerElementMemo = Memo.init();
  sizeMemo = Memo.init();
  offsetMemo = Memo.init();

  handleZoom = ({ center, zoom }: ZoomEvent) => {
    const stage = this.context.stage;
    if (!stage) return;

    const ratio = stage.viewport().ratio;

    const cx = center.x * ratio;
    const cy = center.y * ratio;

    this.camera.translate(-cx, -cy).scale(zoom, zoom).translate(cx, cy);

    stage.camera(this.camera);

    // this.setContext((context) => {
    //   context.zoom = this.camera.a;
    // });
  };

  handlePan = ({ delta }: PanEvent) => {
    const stage = this.context.stage;
    if (!stage) return;

    const ratio = stage.viewport().ratio;
    const tx = delta.x * ratio;
    const ty = delta.y * ratio;

    this.camera.translate(-tx, -ty);
    stage.camera(this.camera);
  };
}
