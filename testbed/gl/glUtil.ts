import { LineProgram, PolygonProgram, ShapeProgram } from "./GLContext";

export function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

export function compileProgram(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string): WebGLProgram {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  return program;
}

// shared 6-vertex unit quad ([-1,-1] to [1,1], two triangles) at attribute location 0,
// used (not instanced) by every instanced solid-shape draw
export function createUnitQuadBuffer(gl: WebGL2RenderingContext): WebGLBuffer {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // prettier-ignore
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, 1, 1,
    -1, -1, 1, 1, -1, 1,
  ]), gl.STATIC_DRAW);
  return buffer;
}

// A VAO binding the shared unit quad (location 0, per-vertex) plus one instance buffer whose
// attributes are laid out back-to-back (locations starting at 1, each advancing once per instance
// via vertexAttribDivisor): one static quad vbo + one dynamic per-instance vbo per shape type.
export function createInstancedVAO(
  gl: WebGL2RenderingContext,
  quadBuffer: WebGLBuffer,
  instanceBuffer: WebGLBuffer,
  instanceAttribSizes: number[],
): WebGLVertexArrayObject {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const stride = instanceAttribSizes.reduce((sum, size) => sum + size, 0) * 4;
  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
  let offset = 0;
  for (let i = 0; i < instanceAttribSizes.length; i++) {
    const location = i + 1;
    const size = instanceAttribSizes[i];
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset);
    gl.vertexAttribDivisor(location, 1);
    offset += size * 4;
  }

  gl.bindVertexArray(null);
  return vao;
}

export function createShapeProgram(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string): ShapeProgram {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    uPixelScale: gl.getUniformLocation(program, "pixelScale"),
  };
}

export function createPolygonProgram(
  gl: WebGL2RenderingContext,
  vertexSrc: string,
  fragmentSrc: string,
): PolygonProgram {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    uPixelScale: gl.getUniformLocation(program, "pixelScale"),
    uVertexTex: gl.getUniformLocation(program, "uVertexTex"),
    uVertexTexWidth: gl.getUniformLocation(program, "uVertexTexWidth"),
  };
}

// A texelFetch-only data texture (no filtering/mipmaps - see its TEXTURE_MIN_FILTER below) used to
// pass a variable-length float array to a shader, indexed as ivec2(i % width, i / width). RG32F
// (vs. R32F) packs one vec2 per texel, matching how polygon vertices are stored.
export function createDataTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // default MIN_FILTER needs mipmaps, which this texture never generates - would otherwise
  // sample as incomplete (all zeros)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

export function createLineProgram(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string): LineProgram {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
  };
}

// Parses any valid CSS color string (named, hex incl. #rgba, rgb()/rgba(), ...) to [r,g,b,a] in
// 0..1, by letting the browser's own CSS parser do the work rather than hand-rolling one -
// this codebase's debug draw colors are passed around as CSS strings (e.g. "blue", "rgba(0,0,127,0.5)").
const colorCache = new Map<string, [number, number, number, number]>();
let colorCanvasCtx: CanvasRenderingContext2D | null = null;

export function parseColor(css: string): [number, number, number, number] {
  const cached = colorCache.get(css);
  if (cached) return cached;

  if (!colorCanvasCtx) {
    colorCanvasCtx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    colorCanvasCtx.canvas.width = 1;
    colorCanvasCtx.canvas.height = 1;
  }
  colorCanvasCtx.clearRect(0, 0, 1, 1);
  colorCanvasCtx.fillStyle = css;
  colorCanvasCtx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = colorCanvasCtx.getImageData(0, 0, 1, 1).data;
  const parsed: [number, number, number, number] = [r / 255, g / 255, b / 255, a / 255];
  colorCache.set(css, parsed);
  return parsed;
}
