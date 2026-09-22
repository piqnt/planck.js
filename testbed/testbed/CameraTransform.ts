import { Middleware, Memo } from "polymatic";
import { effect, type Signal } from "@preact/signals";
import {
  type Mat2d,
  makeMat2d,
  identityMat2d,
  scaleMat2d,
  translateMat2d,
  mulMat2ds,
  mat2dToProjection,
} from "../common/Mat2d";
import { type GLResources } from "../gl/GLContext";

interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ZoomEvent {
  zoom: number;
  center: { x: number; y: number };
}

interface PanEvent {
  delta: { x: number; y: number };
}

interface CameraTransformContext {
  gl: Signal<GLResources>;
  canvasElement: Signal<HTMLCanvasElement>;
  worldMatrix: Mat2d;
  camera: Camera;
}

/**
 * Owns the camera viewbox fit + interactive pan/zoom, independent of canvas/GL lifecycle: reacts
 * to canvasElement/gl becoming available via signals, and to display-zoom/display-pan events
 * emitted by ZoomPanProvider, rather than being driven directly by GLLoader.
 */
export class CameraTransform extends Middleware<CameraTransformContext> {
  private disposers: (() => void)[] = [];

  viewboxMemo = Memo.init();

  canvas: HTMLCanvasElement;
  resizeObserver: ResizeObserver;

  // interactive pan/zoom, accumulated in canvas CSS-pixel space
  panZoom = makeMat2d();
  // world (camera viewbox) -> canvas CSS-pixel space, recomputed on camera/resize change
  fitMatrix = makeMat2d();

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("display-zoom", this.handleZoom);
    this.on("display-pan", this.handlePan);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        // track both: gl becomes ready slightly after canvasElement during GLLoader's activation,
        // so this effect must re-run once resources exist, not just once the canvas exists
        const canvas = this.context.canvasElement.value;
        const resources = this.context.gl.value;
        if (!canvas || !resources) return;

        this.canvas = canvas;
        this.resizeObserver = new ResizeObserver(this.rescale);
        this.resizeObserver.observe(canvas);
        this.rescale();

        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.canvas = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleFrameBefore = () => {
    const camera = this.context.camera;
    if (this.viewboxMemo.update(camera.x, camera.y, camera.width, camera.height)) {
      this.rescale();
    }
  };

  // Fits camera.{x,y,width,height} into the canvas (contain fit), origin centered, in CSS-pixel
  // space. Both worldMatrix (used for pointer inverse-transform) and the shader projection built
  // from it work in CSS pixels - gl.viewport's device-pixel backing store size gives HiDPI
  // crispness independently, without either matrix needing to know about devicePixelRatio.
  rescale = () => {
    if (!this.canvas) return;
    const camera = this.context.camera;
    const screenWidth = this.canvas.clientWidth;
    const screenHeight = this.canvas.clientHeight;
    const fitScale = Math.min(screenWidth / camera.width, screenHeight / camera.height) || 1;
    identityMat2d(this.fitMatrix);
    scaleMat2d(this.fitMatrix, fitScale, -fitScale);
    translateMat2d(this.fitMatrix, screenWidth / 2 - camera.x * fitScale, screenHeight / 2 + camera.y * fitScale);
    this.applyTransform();
  };

  applyTransform = () => {
    const resources = this.context.gl.peek();
    if (!this.canvas || !resources) return;
    mulMat2ds(this.context.worldMatrix, this.panZoom, this.fitMatrix);
    mat2dToProjection(
      resources.projectionMatrix,
      this.context.worldMatrix,
      this.canvas.clientWidth,
      this.canvas.clientHeight,
    );
  };

  // camera(x,y) is the interactive pan/zoom transform, layered on top of the viewbox fit, so
  // app-driven camera state and user gestures compose independently (matches stage-js's separate
  // viewbox vs camera(matrix) concepts, carried over from the PixiJS version of this loader)
  handleZoom = ({ center, zoom }: ZoomEvent) => {
    translateMat2d(this.panZoom, -center.x, -center.y);
    scaleMat2d(this.panZoom, zoom, zoom);
    translateMat2d(this.panZoom, center.x, center.y);
    this.applyTransform();
  };

  handlePan = ({ delta }: PanEvent) => {
    translateMat2d(this.panZoom, -delta.x, -delta.y);
    this.applyTransform();
  };
}
