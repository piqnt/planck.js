import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";
import { type Mat2d, invMat2dVec2 } from "../common/Mat2d";

interface PointerManagerContext {
  canvasElement: Signal<HTMLCanvasElement>;
  worldMatrix: Mat2d;
  pointerCaptured: boolean;
}

export interface LocalPointerDownEvent {
  raw: PointerEvent;
  point: { x: number; y: number };
}

export interface LocalPointerMove {
  raw: PointerEvent;
  point: { x: number; y: number };
}

export interface LocalPointerUp {
  raw: PointerEvent;
  point: { x: number; y: number };
}

export class PointerManager extends Middleware<PointerManagerContext> {
  private disposers: (() => void)[] = [];

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("capture-pointer", this.handleCapturePointer);
    this.on("release-pointer", this.handleReleasePointer);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const canvas = this.context.canvasElement.value;
        if (!canvas) return;

        canvas.addEventListener("pointerdown", this.handlePointerDown);
        canvas.addEventListener("pointermove", this.handlePointerMove);
        canvas.addEventListener("pointerup", this.handlePointerUp);
        canvas.addEventListener("pointercancel", this.handlePointerCancel);

        return () => {
          canvas.removeEventListener("pointerdown", this.handlePointerDown);
          canvas.removeEventListener("pointermove", this.handlePointerMove);
          canvas.removeEventListener("pointerup", this.handlePointerUp);
          canvas.removeEventListener("pointercancel", this.handlePointerCancel);
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleCapturePointer = () => {
    this.context.pointerCaptured = true;
  };

  handleReleasePointer = () => {
    this.context.pointerCaptured = false;
  };

  pointerStart = { x: 0, y: 0 };
  pointerLast = { x: 0, y: 0 };
  pointerDragged = false;
  pointerDown = false;

  // canvas CSS-pixel raw event -> world-space point, matching physics body coordinates
  toWorldPoint = (raw: PointerEvent) => {
    const canvas = this.context.canvasElement.value;
    const rect = canvas.getBoundingClientRect();
    const point = { x: raw.clientX - rect.left, y: raw.clientY - rect.top };
    invMat2dVec2(point, this.context.worldMatrix, point);
    return point;
  };

  handlePointerDown = (raw: PointerEvent) => {
    const point = this.toWorldPoint(raw);

    this.emit("pointer-down", { point, raw });

    this.pointerStart.x = point.x;
    this.pointerStart.y = point.y;
    this.pointerLast.x = point.x;
    this.pointerLast.y = point.y;

    this.pointerDown = true;
    this.pointerDragged = false;
  };

  handlePointerMove = (raw: PointerEvent) => {
    const point = this.toWorldPoint(raw);

    this.emit("pointer-move", { point, raw });

    if (!this.pointerDown) return;

    const move = {
      x: point.x - this.pointerStart.x,
      y: point.y - this.pointerStart.y,
    };
    const delta = {
      x: point.x - this.pointerLast.x,
      y: point.y - this.pointerLast.y,
    };

    if (this.pointerDragged) {
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      this.emit("pointer-drag-move", {
        point,
        raw,
        delta,
        move,
      });
    } else if (move.x !== 0 || move.y !== 0) {
      this.pointerDragged = true;
      this.emit("pointer-drag-start", { point, raw });
    }
  };

  handlePointerUp = (raw: PointerEvent) => {
    const point = this.toWorldPoint(raw);

    this.emit("pointer-up", { point, raw });

    if (!this.pointerDown) return;

    this.pointerDown = false;

    const move = {
      x: point.x - this.pointerStart.x,
      y: point.y - this.pointerStart.y,
    };
    const delta = {
      x: point.x - this.pointerLast.x,
      y: point.y - this.pointerLast.y,
    };
    this.pointerLast.x = point.x;
    this.pointerLast.y = point.y;

    if (this.pointerDragged) {
      this.emit("pointer-drag-end", {
        point,
        raw,
        delta,
        move,
      });
    } else {
      this.emit("pointer-click", { point, raw });
    }
    this.emit("release-pointer");
  };

  handlePointerCancel = (raw: PointerEvent) => {
    this.emit("pointer-cancel", { raw });

    if (!this.pointerDown) return;

    this.pointerDown = false;

    if (this.pointerDragged) {
      this.emit("pointer-drag-cancel");
    }
    this.emit("release-pointer");
  };
}
