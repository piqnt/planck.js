import Hammer from "@egjs/hammerjs";
import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";

interface ZoomPanContext {
  pointerCaptured: boolean;
  containerElement: Signal<HTMLElement>;
}

export class ZoomPanProvider extends Middleware<ZoomPanContext> {
  private hammer: HammerManager | null = null;
  private containerElement: HTMLElement | null = null;
  private pinchScale = 1;
  private pan = { x: 0, y: 0 };
  private disposers: (() => void)[] = [];

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        this.containerElement = this.context.containerElement?.value;
        if (!this.containerElement) return;

        // @ts-ignore
        this.hammer = new Hammer(this.containerElement, {});
        this.hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
        this.hammer.get("pinch").set({ enable: true });

        this.hammer.on("pinchstart", this.handlePinchStart);
        this.hammer.on("pinchin", this.handlePinch);
        this.hammer.on("pinchout", this.handlePinch);
        this.hammer.on("panstart", this.handlePanStart);
        this.hammer.on("panmove", this.handlePanMove);

        this.containerElement.addEventListener("wheel", this.wheelListener, false);

        return () => {
          if (this.hammer) {
            this.hammer.destroy();
            this.hammer = null;
          }
          this.containerElement = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  private getPoint = (ev: WheelEvent) => {
    const rect = this.containerElement.getBoundingClientRect() as DOMRect;
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  };

  private wheelListener = (ev: WheelEvent) => {
    ev.preventDefault();
    const delta = Math.max(-1, Math.min(1, -(ev.deltaX + ev.deltaY)));
    this.emit("display-zoom", { zoom: 1 + delta * 0.05, center: this.getPoint(ev) });
  };

  private handlePinchStart = () => {
    this.pinchScale = 1;
  };

  private handlePinch = ({ target, scale, center, rotation }) => {
    const rect = target.getBoundingClientRect() as DOMRect;
    this.emit("display-zoom", {
      zoom: scale / this.pinchScale,
      center: { x: center.x - rect.left, y: center.y - rect.top },
    });
    this.pinchScale = scale;
  };

  private handlePanStart = () => {
    this.pan.x = 0;
    this.pan.y = 0;
  };

  private handlePanMove = ({ deltaX, deltaY }) => {
    if (this.context.pointerCaptured) return;
    this.emit("display-pan", { delta: { x: this.pan.x - deltaX, y: this.pan.y - deltaY } });
    this.pan.x = deltaX;
    this.pan.y = deltaY;
  };
}
