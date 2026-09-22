import { Middleware, Memo } from "polymatic";
import { effect, type Signal } from "@preact/signals";
import { type Mat2d } from "../common/Mat2d";
import { createShapeProgram, createPolygonProgram, createLineProgram, createUnitQuadBuffer } from "./glUtil";
import { type GLResources } from "./GLContext";
import * as Shaders from "./shaders";

interface ContextStyle {
  background?: string;
}

interface GLLoaderContext {
  pixelPerUnit: number;
  pointerRadius: number;
  gl: Signal<GLResources>;
  containerElement: Signal<HTMLElement>;
  canvasElement: Signal<HTMLCanvasElement>;
  worldMatrix: Mat2d;
  style: ContextStyle;
}

export class GLLoader extends Middleware<GLLoaderContext> {
  private disposers: (() => void)[] = [];

  backgroundMemo = Memo.init();

  canvas: HTMLCanvasElement;
  resources: GLResources;
  resizeObserver: ResizeObserver;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement) return;

        const canvas = document.createElement("canvas");
        canvas.tabIndex = 1;
        containerElement.appendChild(canvas);
        this.canvas = canvas;
        this.context.canvasElement.value = canvas;

        // premultipliedAlpha:false matches the shaders' straight-alpha output (see blend_colors
        // in shaders.ts), so anti-aliased shape edges composite correctly against the CSS background
        const gl = canvas.getContext("webgl2", {
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
        });
        if (!gl) {
          throw new Error("WebGL2 is not supported by this browser");
        }

        this.resources = {
          gl,
          quadBuffer: createUnitQuadBuffer(gl),
          circleProgram: createShapeProgram(gl, Shaders.SOLID_CIRCLE_VERT, Shaders.SOLID_CIRCLE_FRAG),
          capsuleProgram: createShapeProgram(gl, Shaders.SOLID_CAPSULE_VERT, Shaders.SOLID_CAPSULE_FRAG),
          polygonProgram: createPolygonProgram(gl, Shaders.SOLID_POLYGON_VERT, Shaders.SOLID_POLYGON_FRAG),
          lineProgram: createLineProgram(gl, Shaders.LINE_VERT, Shaders.LINE_FRAG),
          projectionMatrix: new Float32Array(16),
          pixelScale: 1,
        };

        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(containerElement);
        this.handleResize();

        this.handleUpdateState();
        this.context.gl.value = this.resources;

        this.emit("stage-ready");

        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;

          this.context.canvasElement.value = null;
          this.context.gl.value = null;

          gl.deleteProgram(this.resources.circleProgram.program);
          gl.deleteProgram(this.resources.capsuleProgram.program);
          gl.deleteProgram(this.resources.polygonProgram.program);
          gl.deleteProgram(this.resources.lineProgram.program);
          gl.deleteBuffer(this.resources.quadBuffer);
          this.resources = null;

          canvas.remove();
          this.canvas = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleResize = () => {
    if (!this.canvas || !this.resources) return;

    const containerElement = this.context.containerElement.peek();
    const ratio = window.devicePixelRatio || 1;
    const pixelWidth = Math.max(1, Math.round(containerElement.clientWidth * ratio));
    const pixelHeight = Math.max(1, Math.round(containerElement.clientHeight * ratio));

    if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
      this.canvas.width = pixelWidth;
      this.canvas.height = pixelHeight;
    }
    this.resources.gl.viewport(0, 0, pixelWidth, pixelHeight);
  };

  handleUpdateState = () => {
    if (!this.resources) return;

    const background = this.context.style.background;
    if (this.backgroundMemo.update(background)) {
      if (background) this.canvas.style.backgroundColor = background;
    }
  };

  // Runs first every tick (before any consumer's "frame-update"/"frame-render" handlers, e.g.
  // DrawWorld's or a GLDraw instance's), so the projection/pixelScale are current and the canvas
  // is cleared before anything draws.
  handleFrameBefore = () => {
    this.handleUpdateState();
    if (!this.resources) return;

    const m = this.context.worldMatrix;
    this.context.pixelPerUnit = Math.max(m.a, m.d) || 1;
    this.context.pointerRadius = 20 / this.context.pixelPerUnit;
    this.resources.pixelScale = this.context.pixelPerUnit;

    const gl = this.resources.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
  };
}
