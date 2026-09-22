import { Middleware } from "polymatic";
import { effect } from "@preact/signals";
import { type TransformValue, type Vec2Value } from "planck";
import { createInstancedVAO, createDataTexture, parseColor } from "./glUtil";
import { GLDrawContext, GLResources, ShapeProgram } from "./GLContext";

interface AABBValue {
  lowerBound: Vec2Value;
  upperBound: Vec2Value;
}

const noxf: TransformValue = { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } };

// out = xf × v, without allocating (planck 1's Transform.mulVec2 returns a new Vec2)
const transformVec2 = (out: Vec2Value, xf: TransformValue, v: Vec2Value) => {
  const x = xf.q.c * v.x - xf.q.s * v.y + xf.p.x;
  const y = xf.q.s * v.x + xf.q.c * v.y + xf.p.y;
  out.x = x;
  out.y = y;
};
const temp1 = { x: 0, y: 0 };
const temp2 = { x: 0, y: 0 };

// Row width of the polygon vertex-data texture (see polygonVertexData/pushPolygon below and
// solidPolygon.vert/.frag) - arbitrary, just needs to comfortably clear WebGL2's guaranteed
// minimum MAX_TEXTURE_SIZE (2048) so growing the texture only ever grows its height.
const POLYGON_VERTEX_TEX_WIDTH = 1024;

// explicit fill color, or the default fill derived from the border color: 0.6 of it
const dimmedCache = new Map<string, [number, number, number, number]>();
function fillColorOf(color: string, fill?: string): [number, number, number, number] {
  if (fill) return parseColor(fill);
  let dimmed = dimmedCache.get(color);
  if (!dimmed) {
    const [r, g, b, a] = parseColor(color);
    dimmed = [0.6 * r, 0.6 * g, 0.6 * b, 0.6 * a];
    dimmedCache.set(color, dimmed);
  }
  return dimmed;
}

// Instanced-quad + analytic-SDF drawing surface (see shaders.ts).
//
// Not a context singleton - each consumer middleware constructs its own instance and
// `use()`s it (own VAOs/buffers/pending-shape arrays, shared only the compiled programs +
// projection/pixelScale living on context.gl).
//
// Self-clearing lifecycle: clears on "frame-before" (before any consumer's "frame-update" can push
// shapes) and uploads+draws on "frame-render" (after every consumer has pushed for the frame)
export class GLDraw extends Middleware<GLDrawContext> {
  private disposers: (() => void)[] = [];
  private resources: GLResources | null = null;

  private circleVAO: WebGLVertexArrayObject | null = null;
  private circleBuffer: WebGLBuffer | null = null;
  private circleCapacity = 0;
  private circleData: number[] = [];

  private capsuleVAO: WebGLVertexArrayObject | null = null;
  private capsuleBuffer: WebGLBuffer | null = null;
  private capsuleCapacity = 0;
  private capsuleData: number[] = [];

  private polygonVAO: WebGLVertexArrayObject | null = null;
  private polygonBuffer: WebGLBuffer | null = null;
  private polygonCapacity = 0;
  private polygonData: number[] = [];

  // Flat [x0, y0, x1, y1, ...] list of every polygon vertex pushed this frame, uploaded into
  // polygonVertexTexture for solidPolygon.vert/.frag to texelFetch by index (see pushPolygon) -
  // lets a polygon instance carry an arbitrary vertex count instead of a fixed number of slots.
  private polygonVertexTexture: WebGLTexture | null = null;
  private polygonVertexTexHeight = 0;
  private polygonVertexData: number[] = [];

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("frame-render", this.handleFrameRender);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const resources = this.context.gl.value;
        if (!resources) return;

        const gl = resources.gl;
        this.resources = resources;

        this.circleBuffer = gl.createBuffer();
        this.circleVAO = createInstancedVAO(gl, resources.quadBuffer, this.circleBuffer, [4, 1, 4, 4]);

        this.capsuleBuffer = gl.createBuffer();
        this.capsuleVAO = createInstancedVAO(gl, resources.quadBuffer, this.capsuleBuffer, [4, 1, 1, 4, 4]);

        this.polygonBuffer = gl.createBuffer();
        this.polygonVAO = createInstancedVAO(gl, resources.quadBuffer, this.polygonBuffer, [4, 1, 1, 1, 4, 4]);
        this.polygonVertexTexture = createDataTexture(gl);

        return () => {
          gl.deleteVertexArray(this.circleVAO);
          gl.deleteBuffer(this.circleBuffer);
          gl.deleteVertexArray(this.capsuleVAO);
          gl.deleteBuffer(this.capsuleBuffer);
          gl.deleteVertexArray(this.polygonVAO);
          gl.deleteBuffer(this.polygonBuffer);
          gl.deleteTexture(this.polygonVertexTexture);

          this.circleVAO = this.capsuleVAO = this.polygonVAO = null;
          this.circleBuffer = this.capsuleBuffer = this.polygonBuffer = null;
          this.circleCapacity = this.capsuleCapacity = this.polygonCapacity = 0;
          this.polygonVertexTexture = null;
          this.polygonVertexTexHeight = 0;
          this.resources = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleFrameBefore = () => {
    this.circleData.length = 0;
    this.capsuleData.length = 0;
    this.polygonData.length = 0;
    this.polygonVertexData.length = 0;
  };

  handleFrameRender = () => {
    if (!this.resources) return;
    this.uploadAndDraw(
      this.resources.circleProgram,
      this.circleVAO,
      this.circleBuffer,
      this.circleData,
      13,
      () => this.circleCapacity,
      (n) => (this.circleCapacity = n),
    );
    this.uploadAndDraw(
      this.resources.capsuleProgram,
      this.capsuleVAO,
      this.capsuleBuffer,
      this.capsuleData,
      14,
      () => this.capsuleCapacity,
      (n) => (this.capsuleCapacity = n),
    );
    this.uploadPolygonVertexTexture();
    this.uploadAndDraw(
      this.resources.polygonProgram,
      this.polygonVAO,
      this.polygonBuffer,
      this.polygonData,
      15,
      () => this.polygonCapacity,
      (n) => (this.polygonCapacity = n),
      () => {
        const gl = this.resources.gl;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
        gl.uniform1i(this.resources.polygonProgram.uVertexTex, 0);
        gl.uniform1i(this.resources.polygonProgram.uVertexTexWidth, POLYGON_VERTEX_TEX_WIDTH);
      },
    );
  };

  // Uploads this frame's flat vertex list into polygonVertexTexture, growing its height (in
  // POLYGON_VERTEX_TEX_WIDTH-wide rows) only when the existing allocation is too small - mirrors
  // uploadAndDraw's grow-only buffer capacity pattern below.
  private uploadPolygonVertexTexture() {
    const vertexCount = this.polygonVertexData.length / 2;
    if (vertexCount === 0) return;

    const gl = this.resources.gl;
    const width = POLYGON_VERTEX_TEX_WIDTH;
    const height = Math.ceil(vertexCount / width);
    const rowData = new Float32Array(width * height * 2);
    rowData.set(this.polygonVertexData);

    gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
    if (height > this.polygonVertexTexHeight) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, width, height, 0, gl.RG, gl.FLOAT, rowData);
      this.polygonVertexTexHeight = height;
    } else {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, gl.RG, gl.FLOAT, rowData);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  drawCircle = (p: Vec2Value, r: number, color: string, xf: TransformValue = noxf, fill?: string): void => {
    transformVec2(temp1, xf, p);
    const [cr, cg, cb, ca] = parseColor(color);
    const [fr, fg, fb, fa] = fillColorOf(color, fill);
    this.circleData.push(temp1.x, temp1.y, xf.q.c, xf.q.s, r, cr, cg, cb, ca, fr, fg, fb, fa);
  };

  drawPoint = this.drawCircle;

  // A point sized in screen pixels, unlike drawCircle above whose radius is in world units. This
  // converts pixels -> world units via the current pixelScale (world-units-to-CSS-pixels ratio,
  // see CameraTransform/GLLoader) so contact points, joint anchors, ... render as
  // constant-looking screen dots instead of scaling with zoom.
  drawScreenPoint = (p: Vec2Value, pixelSize: number, color: string, xf: TransformValue = noxf): void => {
    const pixelScale = this.resources?.pixelScale || 1;
    this.drawCircle(p, pixelSize / pixelScale, color, xf);
  };

  drawCapsule = (
    a: Vec2Value,
    b: Vec2Value,
    r: number,
    color: string,
    xf: TransformValue = noxf,
    fill?: string,
  ): void => {
    this.pushCapsule(xf, a, b, r, color, fill);
  };

  drawEdge = (a: Vec2Value, b: Vec2Value, color: string, xf: TransformValue = noxf): void => {
    this.pushCapsule(xf, a, b, 0, color);
  };

  drawSegment = this.drawEdge;

  drawPolygon = (points: Vec2Value[], color: string, xf: TransformValue = noxf, fill?: string): void => {
    this.pushPolygon(xf, points, 0, color, fill);
  };

  drawRoundedPolygon = (
    points: Vec2Value[],
    count: number,
    r: number,
    color: string,
    xf: TransformValue = noxf,
    fill?: string,
  ): void => {
    this.pushPolygon(xf, points.slice(0, count), r, color, fill);
  };

  drawChain = (points: Vec2Value[], color: string, xf: TransformValue = noxf): void => {
    for (let i = 0; i < points.length - 1; i++) {
      this.pushCapsule(xf, points[i], points[i + 1], 0, color);
    }
  };

  drawAABB = (aabb: AABBValue, color: string, xf: TransformValue = noxf): void => {
    const { lowerBound: lo, upperBound: hi } = aabb;
    this.pushPolygon(xf, [lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], 0, color);
  };

  // Hollow variants - edges traced as thin lines rather than a filled SDF, unlike drawPolygon
  // above. Reuses the capsule-radius-0 thin-line path (see drawEdge) edge by edge instead of a
  // filled quad.
  drawHollowPolygon = (points: Vec2Value[], color: string, xf: TransformValue = noxf): void => {
    let prev = points[points.length - 1];
    for (const p of points) {
      this.pushCapsule(xf, prev, p, 0, color);
      prev = p;
    }
  };

  drawHollowAABB = (aabb: AABBValue, color: string, xf: TransformValue = noxf): void => {
    const { lowerBound: lo, upperBound: hi } = aabb;
    this.drawHollowPolygon([lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], color, xf);
  };

  drawHollowCircle = (
    center: Vec2Value,
    radius: number,
    color: string,
    xf: TransformValue = noxf,
    segments = 24,
  ): void => {
    const points: Vec2Value[] = [];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      points.push({ x: center.x + radius * Math.cos(a), y: center.y + radius * Math.sin(a) });
    }
    this.drawHollowPolygon(points, color, xf);
  };

  private pushCapsule(xf: TransformValue, a: Vec2Value, b: Vec2Value, radius: number, color: string, fill?: string) {
    // world-space center/direction of the segment, composed with the body transform
    const mx = (a.x + b.x) * 0.5;
    const my = (a.y + b.y) * 0.5;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy);
    const lc = length > 0 ? dx / length : 1;
    const ls = length > 0 ? dy / length : 0;
    const bc = xf.q.c;
    const bs = xf.q.s;
    const worldC = bc * lc - bs * ls;
    const worldS = bs * lc + bc * ls;
    temp1.x = mx;
    temp1.y = my;
    transformVec2(temp2, xf, temp1);
    const [cr, cg, cb, ca] = parseColor(color);
    const [fr, fg, fb, fa] = fillColorOf(color, fill);
    this.capsuleData.push(temp2.x, temp2.y, worldC, worldS, radius, length, cr, cg, cb, ca, fr, fg, fb, fa);
  }

  private pushPolygon(xf: TransformValue, points: Vec2Value[], radius: number, color: string, fill?: string) {
    // vertices stay in xf-local space; xf itself becomes the GPU instance transform (matching
    // how body-local polygon vertices already work in DrawWorld) - no per-point CPU transform.
    // The vertices themselves go into the shared polygonVertexData list (uploaded as a texture -
    // see uploadPolygonVertexTexture); this instance only records where they start and how many.
    const offset = this.polygonVertexData.length / 2;
    for (let i = 0; i < points.length; i++) {
      this.polygonVertexData.push(points[i].x, points[i].y);
    }
    const [cr, cg, cb, ca] = parseColor(color);
    const [fr, fg, fb, fa] = fillColorOf(color, fill);
    this.polygonData.push(
      xf.p.x,
      xf.p.y,
      xf.q.c,
      xf.q.s,
      offset,
      points.length,
      radius,
      cr,
      cg,
      cb,
      ca,
      fr,
      fg,
      fb,
      fa,
    );
  }

  private uploadAndDraw(
    shapeProgram: ShapeProgram,
    vao: WebGLVertexArrayObject,
    buffer: WebGLBuffer,
    data: number[],
    floatsPerInstance: number,
    getCapacity: () => number,
    setCapacity: (n: number) => void,
    bindExtra?: () => void,
  ) {
    const instanceCount = data.length / floatsPerInstance;
    if (instanceCount === 0) return;

    const gl = this.resources.gl;
    const array = new Float32Array(data);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    if (array.length > getCapacity()) {
      gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);
      setCapacity(array.length);
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, array);
    }

    gl.useProgram(shapeProgram.program);
    gl.uniformMatrix4fv(shapeProgram.uProjectionMatrix, false, this.resources.projectionMatrix);
    gl.uniform1f(shapeProgram.uPixelScale, this.resources.pixelScale);
    bindExtra?.();
    gl.bindVertexArray(vao);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount);
    gl.bindVertexArray(null);
    gl.useProgram(null);
  }
}
