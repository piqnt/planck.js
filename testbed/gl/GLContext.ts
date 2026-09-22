import { type Signal } from "@preact/signals";

export interface ShapeProgram {
  program: WebGLProgram;
  uProjectionMatrix: WebGLUniformLocation;
  uPixelScale: WebGLUniformLocation;
}

export interface LineProgram {
  program: WebGLProgram;
  uProjectionMatrix: WebGLUniformLocation;
}

// gl.POINTS, one per particle (see world-view/DrawParticles.ts): position, size and color per
// vertex; pointScale turns the size in world units into gl_PointSize's device pixels
export interface PointProgram {
  program: WebGLProgram;
  uProjectionMatrix: WebGLUniformLocation;
  uPointScale: WebGLUniformLocation;
}

// Polygon vertices live in a shared data texture (see GLDraw.ts's polygonVertexData/pushPolygon)
// rather than fixed-size per-instance attributes, so a polygon can carry as many vertices as
// src/constants.ts's MAX_POLYGON_VERTICES allows instead of a hardcoded cap.
export interface PolygonProgram extends ShapeProgram {
  uVertexTex: WebGLUniformLocation;
  uVertexTexWidth: WebGLUniformLocation;
}

// Created once by GLLoader and read (never mutated) by every GLDraw instance (see GLDraw.ts).
// projectionMatrix is recomputed by CameraTransform and pixelScale by GLLoader, both in their
// "frame-before" handlers (CameraTransform registered first), so they're always current by the
// time any consumer's "frame-update"/"frame-render" handlers issue their draw calls. Color is a
// per-instance vertex attribute (not a uniform here) since a single GLDraw instance/draw call can
// mix shapes of different colors (e.g. contact points vs. broadphase AABBs).
export interface GLResources {
  gl: WebGL2RenderingContext;
  quadBuffer: WebGLBuffer;
  circleProgram: ShapeProgram;
  capsuleProgram: ShapeProgram;
  polygonProgram: PolygonProgram;
  lineProgram: LineProgram;
  pointProgram: PointProgram;
  projectionMatrix: Float32Array;
  pixelScale: number;
}

export interface GLDrawContext {
  gl: Signal<GLResources>;
}
