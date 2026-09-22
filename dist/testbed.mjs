/**
 * Planck.js v1.5.0
 * @license The MIT license
 * @copyright Copyright (c) 2026 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { signal, effect } from "@preact/signals";
import { Middleware, Memo, Runtime } from "polymatic";
import { Transform, Rot, WorldManifold, MouseJoint, AABB, DistanceInput, CircleShape, SimplexCache, DistanceOutput, Distance, Vec2, Testbed } from "planck";
import { Testbed as Testbed2 } from "planck";
class ProviderCollection {
  constructor() {
    this.list = [];
  }
  register(provider) {
    this.list.push(provider);
  }
}
const playlist = [];
const currentPlay = signal();
const toolbarTool = new ProviderCollection();
const runtime = signal();
let random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let j = step | 0;
      while (j--) {
        id += alphabet[bytes[j] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
const generateKey = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
function getKey(obj) {
  if (obj && typeof obj["__key"] === "string") {
    return obj["__key"];
  }
}
function setKey(obj, key) {
  if (!obj)
    return;
  if (typeof key !== "undefined") {
    obj["__key"] = key;
  } else if (!obj["__key"]) {
    obj["__key"] = generateKey();
  }
  return obj["__key"];
}
function replaceKey(node) {
  if (typeof node !== "object" || node === null) {
    return node;
  }
  if (Array.isArray(node)) {
    const result2 = [];
    for (let key2 = 0; key2 < node.length; key2++) {
      result2[key2] = replaceKey(node[key2]);
    }
    return result2;
  }
  const key = getKey(node);
  if (key) {
    return key;
  }
  const result = {};
  for (const key2 in node) {
    if (Object.prototype.hasOwnProperty.call(node, key2)) {
      result[key2] = replaceKey(node[key2]);
    }
  }
  return result;
}
const getLabel = (obj) => {
  if (obj.lookupId) {
    return obj.lookupId;
  }
  if (obj.spaceName) {
    return obj.spaceName;
  }
  return null;
};
const setLabel = (obj, id) => {
  obj.lookupId = id;
};
const findOne = (world, query) => {
  if (query.indexOf("#")) {
    const [type, label] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLabel(body) === label) {
          return body;
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLabel(fixture) === label) {
            return fixture;
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLabel(joint) === label) {
          return joint;
        }
      }
    }
  }
  return null;
};
const findAll = (world, query) => {
  const result = [];
  if (query.indexOf("#")) {
    const [type, label] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLabel(body) === label) {
          result.push(body);
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLabel(fixture) === label) {
            result.push(fixture);
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLabel(joint) === label) {
          result.push(joint);
        }
      }
    }
  }
  return result;
};
function findBody(world, key) {
  if (!world)
    return void 0;
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    if (getKey(body) === key)
      return body;
  }
}
function findFixture(world, key) {
  if (!world)
    return void 0;
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      if (getKey(fixture) === key)
        return fixture;
    }
  }
}
function findJoint(world, key) {
  if (!world)
    return void 0;
  for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
    if (getKey(joint) === key)
      return joint;
  }
}
class Multiselect {
  constructor(selected = []) {
    this.selected = [];
    this.selected = selected;
  }
}
function isSelected(selection, key) {
  return !!selection?.selected.some((s) => s.key === key);
}
function setSelection(context, selection) {
  context.multiselect.value = new Multiselect(selection?.key ? [selection] : []);
}
function emptySelection(context) {
  setSelection(context, null);
}
function removeSelection(context, selection) {
  if (isSelected(context.multiselect.value, selection.key))
    emptySelection(context);
}
function selectBody(body) {
  return { type: "body", key: body };
}
function selectFixture(fixture, body) {
  return { type: "fixture", key: fixture, up: { type: "body", key: body } };
}
function selectJoint(joint) {
  return { type: "joint", key: joint };
}
function makeMat2d() {
  return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
}
function identityMat2d(out) {
  out.a = 1;
  out.b = 0;
  out.c = 0;
  out.d = 1;
  out.e = 0;
  out.f = 0;
}
function translateMat2d(m, x, y) {
  m.e += x;
  m.f += y;
}
function scaleMat2d(m, x, y) {
  m.a *= x;
  m.c *= x;
  m.e *= x;
  m.b *= y;
  m.d *= y;
  m.f *= y;
}
function mulMat2ds(out, A, B) {
  const a = A.a * B.a + A.c * B.b;
  const b = A.b * B.a + A.d * B.b;
  const c = A.a * B.c + A.c * B.d;
  const d = A.b * B.c + A.d * B.d;
  const e = A.a * B.e + A.c * B.f + A.e;
  const f = A.b * B.e + A.d * B.f + A.f;
  out.a = a;
  out.b = b;
  out.c = c;
  out.d = d;
  out.e = e;
  out.f = f;
}
function mulMat2dVec2(out, m, v) {
  const x = v.x;
  const y = v.y;
  out.x = m.a * x + m.c * y + m.e;
  out.y = m.b * x + m.d * y + m.f;
}
function invMat2dVec2(out, m, v) {
  const id = 1 / (m.a * m.d - m.c * m.b);
  const x = v.x;
  const y = v.y;
  out.x = m.d * id * x - m.c * id * y + (m.f * m.c - m.e * m.d) * id;
  out.y = m.a * id * y - m.b * id * x + (m.e * m.b - m.f * m.a) * id;
}
function mat2dToProjection(out, m, screenWidth, screenHeight) {
  const sx = 2 / screenWidth;
  const sy = -2 / screenHeight;
  const a = sx * m.a;
  const b = sy * m.b;
  const c = sx * m.c;
  const d = sy * m.d;
  const tx = sx * m.e - 1;
  const ty = sy * m.f + 1;
  out.fill(0);
  out[0] = a;
  out[1] = b;
  out[4] = c;
  out[5] = d;
  out[10] = 1;
  out[12] = tx;
  out[13] = ty;
  out[15] = 1;
}
function initTestbedContext() {
  const ctx = {};
  ctx.activity = signal("mode:play");
  ctx.activeTool = signal(void 0);
  ctx.paused = signal(false);
  ctx.editable = signal(false);
  ctx.pointerCaptured = false;
  ctx.style = { background: "#111" };
  ctx.camera = {
    x: 0,
    y: 10,
    width: 80,
    height: 60
  };
  ctx.containerElement = signal(void 0);
  ctx.canvasElement = signal(void 0);
  ctx.gl = signal(void 0);
  ctx.worldMatrix = makeMat2d();
  ctx.mouseForce = signal(1e3);
  ctx.pixelPerUnit = 1;
  ctx.pointerRadius = 20;
  ctx.showOutline = signal(true);
  ctx.showToolbar = signal(true);
  ctx.activeKeys = {};
  ctx.multiselect = signal(new Multiselect([]));
  ctx.world = signal();
  ctx.simulation = {
    speed: 1,
    hz: 60,
    velocityIterations: 8,
    positionIterations: 3
  };
  ctx.renderConfig = signal({
    shapes: true,
    bounds: false,
    mass: false,
    bodyNames: false,
    joints: true,
    contact: false,
    contactNormals: false
  });
  ctx.textOverlay = signal(void 0);
  return ctx;
}
class ToolSwitch extends Middleware {
  constructor(name, tool) {
    super();
    this.disposers = [];
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const activeTool = this.context.activeTool.value;
        const isMe = activeTool?.name === this.name;
        if (isMe && !this.tool.activated) {
          this.use(this.tool);
        } else if (!isMe && this.tool.activated) {
          this.unuse(this.tool);
        }
        return () => {
          this.unuse(this.tool);
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.name = name;
    this.tool = tool;
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
}
function compileShader(gl, type, source) {
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
function compileProgram(gl, vertexSrc, fragmentSrc) {
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
function createUnitQuadBuffer(gl) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,
    -1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1
  ]), gl.STATIC_DRAW);
  return buffer;
}
function createInstancedVAO(gl, quadBuffer, instanceBuffer, instanceAttribSizes) {
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
function createShapeProgram(gl, vertexSrc, fragmentSrc) {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    uPixelScale: gl.getUniformLocation(program, "pixelScale")
  };
}
function createPolygonProgram(gl, vertexSrc, fragmentSrc) {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    uPixelScale: gl.getUniformLocation(program, "pixelScale"),
    uVertexTex: gl.getUniformLocation(program, "uVertexTex"),
    uVertexTexWidth: gl.getUniformLocation(program, "uVertexTexWidth")
  };
}
function createDataTexture(gl) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}
function createLineProgram(gl, vertexSrc, fragmentSrc) {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix")
  };
}
const colorCache = /* @__PURE__ */ new Map();
let colorCanvasCtx = null;
function parseColor(css) {
  const cached = colorCache.get(css);
  if (cached)
    return cached;
  if (!colorCanvasCtx) {
    colorCanvasCtx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    colorCanvasCtx.canvas.width = 1;
    colorCanvasCtx.canvas.height = 1;
  }
  colorCanvasCtx.clearRect(0, 0, 1, 1);
  colorCanvasCtx.fillStyle = css;
  colorCanvasCtx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = colorCanvasCtx.getImageData(0, 0, 1, 1).data;
  const parsed = [r / 255, g / 255, b / 255, a / 255];
  colorCache.set(css, parsed);
  return parsed;
}
var solidCircle_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceRadius;\nlayout(location = 3) in vec4 v_instanceColor;\nlayout(location = 4) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvoid main() {\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n  float radius = v_instanceRadius;\n  \n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  \n  \n  \n  float scale = radius + thicknessWorld;\n\n  f_position = v_localPosition;\n  f_radius = radius / scale;\n  f_thickness = thicknessWorld / scale;\n\n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
var solidCircle_default = "#version 300 es\nprecision highp float;\n\nin vec2 f_position;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nvoid main() {\n  float radius = f_radius;\n\n  \n  vec2 e = vec2(radius, 0.0);\n  vec2 w = f_position;\n  float we = dot(w, e);\n  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n  float da = length(b);\n\n  \n  float dw = length(w);\n  float dc = abs(dw - radius);\n\n  \n  float d = min(da, dc);\n\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
var solidCapsule_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceRadius;\nlayout(location = 3) in float v_instanceLength;\nlayout(location = 4) in vec4 v_instanceColor;\nlayout(location = 5) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nout float f_length;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvoid main() {\n  f_position = v_localPosition;\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n\n  float radius = v_instanceRadius;\n  float capsuleLength = v_instanceLength;\n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  float scale = radius + 0.5 * capsuleLength + thicknessWorld;\n\n  \n  f_length = capsuleLength / scale;\n  f_radius = radius / scale;\n  f_thickness = thicknessWorld / scale;\n\n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
var solidCapsule_default = "#version 300 es\nprecision highp float;\n\nin vec2 f_position;\nin float f_length;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nvoid main() {\n  float radius = f_radius;\n\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  vec2 v1 = vec2(-0.5 * f_length, 0.0);\n  vec2 v2 = vec2(0.5 * f_length, 0.0);\n\n  \n  vec2 e = v2 - v1;\n  vec2 w = f_position - v1;\n  float we = dot(w, e);\n  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n  float dw = length(b);\n\n  \n  float d = min(dw, abs(dw - radius));\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
var solidPolygon_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nuniform sampler2D uVertexTex;\n\nuniform highp int uVertexTexWidth;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceVertexOffset;\nlayout(location = 3) in float v_instanceVertexCount;\nlayout(location = 4) in float v_instanceRadius;\nlayout(location = 5) in vec4 v_instanceColor;\nlayout(location = 6) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nflat out highp int f_vertexOffset;\nflat out highp int f_vertexCount;\nout vec2 f_center;\nout float f_invScale;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvec2 fetchVertex(int index) {\n  return texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;\n}\n\nvoid main() {\n  f_position = v_localPosition;\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n\n  int offset = int(v_instanceVertexOffset + 0.5);\n  int count = int(v_instanceVertexCount + 0.5);\n  f_vertexOffset = offset;\n  f_vertexCount = count;\n\n  \n  vec2 lower = fetchVertex(offset);\n  vec2 upper = lower;\n  for (int i = 1; i < count; ++i) {\n    vec2 v = fetchVertex(offset + i);\n    lower = min(lower, v);\n    upper = max(upper, v);\n  }\n\n  vec2 center = 0.5 * (lower + upper);\n  vec2 width = upper - lower;\n  float maxWidth = max(width.x, width.y);\n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  float scale = v_instanceRadius + 0.5 * maxWidth + thicknessWorld;\n  float invScale = 1.0 / scale;\n\n  \n  \n  \n  f_center = center;\n  f_invScale = invScale;\n  f_radius = invScale * v_instanceRadius;\n  f_thickness = thicknessWorld * invScale;\n\n  \n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y) + center;\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
var solidPolygon_default = "#version 300 es\nprecision highp float;\n\nuniform sampler2D uVertexTex;\n\nuniform highp int uVertexTexWidth;\n\nin vec2 f_position;\nflat in highp int f_vertexOffset;\nflat in highp int f_vertexCount;\nin vec2 f_center;\nin float f_invScale;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nfloat cross2d(in vec2 v1, in vec2 v2) {\n  return v1.x * v2.y - v1.y * v2.x;\n}\n\nvec2 fetchVertex(in int index, in vec2 center, in float invScale) {\n  vec2 raw = texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;\n  return invScale * (raw - center);\n}\n\nfloat sdConvexPolygon(in vec2 p, in int offset, in int count, in vec2 center, in float invScale) {\n  vec2 v0 = fetchVertex(offset, center, invScale);\n  float d = dot(p - v0, p - v0);\n\n  \n  float side = -1.0;\n  vec2 vj = fetchVertex(offset + count - 1, center, invScale);\n  for (int i = 0; i < count; ++i) {\n    vec2 vi = fetchVertex(offset + i, center, invScale);\n    vec2 e = vi - vj;\n    vec2 w = p - vj;\n    float we = dot(w, e);\n    vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n    float bb = dot(b, b);\n\n    if (bb < d) {\n      d = bb;\n    }\n\n    \n    \n    float s = cross2d(w, e);\n    if (s >= 0.0) {\n      side = 1.0;\n    }\n\n    vj = vi;\n  }\n\n  return side * sqrt(d);\n}\n\nvoid main() {\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  float dw = sdConvexPolygon(f_position, f_vertexOffset, f_vertexCount, f_center, f_invScale);\n  float d = abs(dw - f_radius);\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(f_radius + f_thickness, f_radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
var line_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\n\nlayout(location = 0) in vec2 v_position;\nlayout(location = 1) in vec4 v_color;\n\nout vec4 f_color;\n\nvoid main() {\n  f_color = v_color;\n  gl_Position = projectionMatrix * vec4(v_position, 0.0, 1.0);\n}";
var line_default = "#version 300 es\nprecision highp float;\n\nin vec4 f_color;\nout vec4 fragColor;\n\nvoid main() {\n  fragColor = f_color;\n}";
class GLLoader extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.backgroundMemo = Memo.init();
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement)
          return;
        const canvas = document.createElement("canvas");
        canvas.tabIndex = 1;
        containerElement.appendChild(canvas);
        this.canvas = canvas;
        this.context.canvasElement.value = canvas;
        const gl = canvas.getContext("webgl2", {
          alpha: true,
          antialias: true,
          premultipliedAlpha: false
        });
        if (!gl) {
          throw new Error("WebGL2 is not supported by this browser");
        }
        this.resources = {
          gl,
          quadBuffer: createUnitQuadBuffer(gl),
          circleProgram: createShapeProgram(gl, solidCircle_default$1, solidCircle_default),
          capsuleProgram: createShapeProgram(gl, solidCapsule_default$1, solidCapsule_default),
          polygonProgram: createPolygonProgram(gl, solidPolygon_default$1, solidPolygon_default),
          lineProgram: createLineProgram(gl, line_default$1, line_default),
          projectionMatrix: new Float32Array(16),
          pixelScale: 1
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
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.handleResize = () => {
      if (!this.canvas || !this.resources)
        return;
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
    this.handleUpdateState = () => {
      if (!this.resources)
        return;
      const background = this.context.style.background;
      if (this.backgroundMemo.update(background)) {
        if (background)
          this.canvas.style.backgroundColor = background;
      }
    };
    this.handleFrameBefore = () => {
      this.handleUpdateState();
      if (!this.resources)
        return;
      const m = this.context.worldMatrix;
      this.context.pixelPerUnit = Math.max(m.a, m.d) || 1;
      this.context.pointerRadius = 20 / this.context.pixelPerUnit;
      this.resources.pixelScale = this.context.pixelPerUnit;
      const gl = this.resources.gl;
      gl.clear(gl.COLOR_BUFFER_BIT);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }
}
class CameraTransform extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.viewboxMemo = Memo.init();
    this.panZoom = makeMat2d();
    this.fitMatrix = makeMat2d();
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const canvas = this.context.canvasElement.value;
        const resources = this.context.gl.value;
        if (!canvas || !resources)
          return;
        this.canvas = canvas;
        this.resizeObserver = new ResizeObserver(this.rescale);
        this.resizeObserver.observe(canvas);
        this.rescale();
        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.handleFrameBefore = () => {
      const camera = this.context.camera;
      if (this.viewboxMemo.update(camera.x, camera.y, camera.width, camera.height)) {
        this.rescale();
      }
    };
    this.rescale = () => {
      if (!this.canvas)
        return;
      const camera = this.context.camera;
      const screenWidth = this.canvas.clientWidth;
      const screenHeight = this.canvas.clientHeight;
      const fitScale = Math.min(screenWidth / camera.width, screenHeight / camera.height) || 1;
      identityMat2d(this.fitMatrix);
      scaleMat2d(this.fitMatrix, fitScale, -fitScale);
      translateMat2d(this.fitMatrix, screenWidth / 2 - camera.x * fitScale, screenHeight / 2 + camera.y * fitScale);
      this.applyTransform();
    };
    this.applyTransform = () => {
      const resources = this.context.gl.peek();
      if (!this.canvas || !resources)
        return;
      mulMat2ds(this.context.worldMatrix, this.panZoom, this.fitMatrix);
      mat2dToProjection(resources.projectionMatrix, this.context.worldMatrix, this.canvas.clientWidth, this.canvas.clientHeight);
    };
    this.handleZoom = ({ center, zoom }) => {
      translateMat2d(this.panZoom, -center.x, -center.y);
      scaleMat2d(this.panZoom, zoom, zoom);
      translateMat2d(this.panZoom, center.x, center.y);
      this.applyTransform();
    };
    this.handlePan = ({ delta }) => {
      translateMat2d(this.panZoom, -delta.x, -delta.y);
      this.applyTransform();
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("display-zoom", this.handleZoom);
    this.on("display-pan", this.handlePan);
  }
}
class AutoFocus extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.pausedMemo = Memo.init();
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const canvas = this.context.canvasElement.value;
        if (!canvas)
          return;
        this.canvas = canvas;
        canvas.addEventListener("mousedown", this.focus);
        canvas.addEventListener("touchstart", this.focus);
        return () => {
          canvas.removeEventListener("mousedown", this.focus);
          canvas.removeEventListener("touchstart", this.focus);
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.handleFrameBefore = () => {
      const paused = this.context.paused.peek();
      if (this.pausedMemo.update(paused)) {
        if (!paused)
          this.focus();
      }
    };
    this.focus = () => {
      window.focus();
      document.activeElement?.blur?.();
      this.canvas?.focus();
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }
}
class ContainerLoader extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      if (document.readyState !== "loading") {
        this.handleDomReady();
      } else {
        document.addEventListener("DOMContentLoaded", this.handleDomReady);
      }
    };
    this.handleDomReady = () => {
      const containerElement = document.getElementById("space");
      if (!containerElement) {
        throw new Error("Runtime container element not available!");
      }
      this.context.containerElement.value = containerElement;
    };
    this.on("activate", this.handleActivate);
  }
}
const DEFAULTS = {
  speed: 1,
  hz: 60,
  velocityIterations: 8,
  positionIterations: 3
};
class FrameLoop extends Middleware {
  constructor() {
    super();
    this.lastTime = 0;
    this.timeBuffer = 0;
    this.event = {
      dt: 0,
      now: 0
    };
    this.stepEvent = {
      timeStep: 0,
      velocityIterations: 0,
      positionIterations: 0
    };
    this.handleActivate = () => {
      this.lastTime = performance.now();
      this.requestFrame();
    };
    this.handleFrame = () => {
      if (!this.activated)
        return;
      const now = performance.now();
      const delta = now - this.lastTime;
      this.lastTime = now;
      this.event.now = now;
      this.event.dt = delta;
      this.emit("frame-before", this.event);
      if (this.context.world?.value && !this.context.paused?.value) {
        const config = this.context.simulation;
        const speed = config?.speed ?? DEFAULTS.speed;
        let hz = config?.hz ?? DEFAULTS.hz;
        if (Math.abs(hz) < 1) {
          hz = 1 / hz;
        }
        const timeStep = 1 / hz;
        this.stepEvent.timeStep = timeStep;
        this.stepEvent.velocityIterations = config?.velocityIterations ?? DEFAULTS.velocityIterations;
        this.stepEvent.positionIterations = config?.positionIterations ?? DEFAULTS.positionIterations;
        this.timeBuffer += delta * 1e-3 * speed;
        while (this.timeBuffer > timeStep) {
          this.timeBuffer -= timeStep;
          this.emit("step-before", this.stepEvent);
          this.emit("step-physics", this.stepEvent);
          this.emit("step-after", this.stepEvent);
        }
      }
      this.emit("frame-update", this.event);
      this.emit("frame-render", this.event);
      this.emit("frame-after", this.event);
      this.requestFrame();
    };
    this.requestFrame = () => {
      if (!this.activated)
        return;
      window.requestAnimationFrame(this.handleFrame);
    };
    this.on("activate", this.handleActivate);
  }
}
class PointerManager extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const canvas = this.context.canvasElement.value;
        if (!canvas)
          return;
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
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.handleCapturePointer = () => {
      this.context.pointerCaptured = true;
    };
    this.handleReleasePointer = () => {
      this.context.pointerCaptured = false;
    };
    this.pointerStart = { x: 0, y: 0 };
    this.pointerLast = { x: 0, y: 0 };
    this.pointerDragged = false;
    this.pointerDown = false;
    this.toWorldPoint = (raw) => {
      const canvas = this.context.canvasElement.value;
      const rect = canvas.getBoundingClientRect();
      const point = { x: raw.clientX - rect.left, y: raw.clientY - rect.top };
      invMat2dVec2(point, this.context.worldMatrix, point);
      return point;
    };
    this.handlePointerDown = (raw) => {
      const point = this.toWorldPoint(raw);
      this.emit("pointer-down", { point, raw });
      this.pointerStart.x = point.x;
      this.pointerStart.y = point.y;
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      this.pointerDown = true;
      this.pointerDragged = false;
    };
    this.handlePointerMove = (raw) => {
      const point = this.toWorldPoint(raw);
      this.emit("pointer-move", { point, raw });
      if (!this.pointerDown)
        return;
      const move = {
        x: point.x - this.pointerStart.x,
        y: point.y - this.pointerStart.y
      };
      const delta = {
        x: point.x - this.pointerLast.x,
        y: point.y - this.pointerLast.y
      };
      if (this.pointerDragged) {
        this.pointerLast.x = point.x;
        this.pointerLast.y = point.y;
        this.emit("pointer-drag-move", {
          point,
          raw,
          delta,
          move
        });
      } else if (move.x !== 0 || move.y !== 0) {
        this.pointerDragged = true;
        this.emit("pointer-drag-start", { point, raw });
      }
    };
    this.handlePointerUp = (raw) => {
      const point = this.toWorldPoint(raw);
      this.emit("pointer-up", { point, raw });
      if (!this.pointerDown)
        return;
      this.pointerDown = false;
      const move = {
        x: point.x - this.pointerStart.x,
        y: point.y - this.pointerStart.y
      };
      const delta = {
        x: point.x - this.pointerLast.x,
        y: point.y - this.pointerLast.y
      };
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      if (this.pointerDragged) {
        this.emit("pointer-drag-end", {
          point,
          raw,
          delta,
          move
        });
      } else {
        this.emit("pointer-click", { point, raw });
      }
      this.emit("release-pointer");
    };
    this.handlePointerCancel = (raw) => {
      this.emit("pointer-cancel", { raw });
      if (!this.pointerDown)
        return;
      this.pointerDown = false;
      if (this.pointerDragged) {
        this.emit("pointer-drag-cancel");
      }
      this.emit("release-pointer");
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("capture-pointer", this.handleCapturePointer);
    this.on("release-pointer", this.handleReleasePointer);
  }
}
class KeyboardManager extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      window.addEventListener("keydown", this.handleKeydown);
      window.addEventListener("keyup", this.handleKeyup);
      window.addEventListener("keypress", this.handleKeypress);
    };
    this.handleDeactivate = () => {
      window.removeEventListener("keydown", this.handleKeydown);
      window.removeEventListener("keyup", this.handleKeyup);
      window.removeEventListener("keypress", this.handleKeypress);
    };
    this.downKeys = {};
    this.handleKeydown = (ev) => {
      this.downKeys[ev.keyCode] = true;
      this.updateActiveKeys(ev.keyCode, true);
      this.emit("keydown", ev);
    };
    this.handleKeyup = (ev) => {
      this.downKeys[ev.keyCode] = false;
      this.updateActiveKeys(ev.keyCode, false);
      this.emit("keyup", ev);
    };
    this.handleKeypress = (ev) => {
      this.emit("keypress", ev);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  // `left`/`right`/`up`/`down` (arrows or WASD), `fire` (space or enter), and characters
  updateActiveKeys(keyCode, down) {
    const activeKeys = this.context.activeKeys;
    const downKeys = this.downKeys;
    const char = String.fromCharCode(keyCode);
    if (/[A-Z0-9]/.test(char)) {
      activeKeys[char] = down;
    }
    activeKeys.right = downKeys[39] || activeKeys["D"];
    activeKeys.left = downKeys[37] || activeKeys["A"];
    activeKeys.up = downKeys[38] || activeKeys["W"];
    activeKeys.down = downKeys[40] || activeKeys["S"];
    activeKeys.fire = downKeys[32] || downKeys[13];
  }
}
const IDLE_TIMEOUT = 15e3;
class AutoPause extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      window.addEventListener("pointerdown", this.handleInteraction);
      window.addEventListener("pointermove", this.handleInteraction);
      window.addEventListener("keydown", this.handleInteraction);
      window.addEventListener("wheel", this.handleInteraction);
      window.addEventListener("touchstart", this.handleInteraction);
      this.resetIdleTimeout();
    };
    this.handleDeactivate = () => {
      window.removeEventListener("pointerdown", this.handleInteraction);
      window.removeEventListener("pointermove", this.handleInteraction);
      window.removeEventListener("keydown", this.handleInteraction);
      window.removeEventListener("wheel", this.handleInteraction);
      window.removeEventListener("touchstart", this.handleInteraction);
      clearTimeout(this.idleTimeout);
    };
    this.handleInteraction = () => {
      this.resetIdleTimeout();
    };
    this.handleIdleTimeout = () => {
      this.context.paused.value = true;
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  resetIdleTimeout() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(this.handleIdleTimeout, IDLE_TIMEOUT);
  }
}
const noxf = { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } };
const transformVec2 = (out, xf, v) => {
  const x = xf.q.c * v.x - xf.q.s * v.y + xf.p.x;
  const y = xf.q.s * v.x + xf.q.c * v.y + xf.p.y;
  out.x = x;
  out.y = y;
};
const temp1 = { x: 0, y: 0 };
const temp2 = { x: 0, y: 0 };
const POLYGON_VERTEX_TEX_WIDTH = 1024;
const dimmedCache = /* @__PURE__ */ new Map();
function fillColorOf(color, fill) {
  if (fill)
    return parseColor(fill);
  let dimmed = dimmedCache.get(color);
  if (!dimmed) {
    const [r, g, b, a] = parseColor(color);
    dimmed = [0.6 * r, 0.6 * g, 0.6 * b, 0.6 * a];
    dimmedCache.set(color, dimmed);
  }
  return dimmed;
}
class GLDraw extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.resources = null;
    this.circleVAO = null;
    this.circleBuffer = null;
    this.circleCapacity = 0;
    this.circleData = [];
    this.capsuleVAO = null;
    this.capsuleBuffer = null;
    this.capsuleCapacity = 0;
    this.capsuleData = [];
    this.polygonVAO = null;
    this.polygonBuffer = null;
    this.polygonCapacity = 0;
    this.polygonData = [];
    this.polygonVertexTexture = null;
    this.polygonVertexTexHeight = 0;
    this.polygonVertexData = [];
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const resources = this.context.gl.value;
        if (!resources)
          return;
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
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.handleFrameBefore = () => {
      this.circleData.length = 0;
      this.capsuleData.length = 0;
      this.polygonData.length = 0;
      this.polygonVertexData.length = 0;
    };
    this.handleFrameRender = () => {
      if (!this.resources)
        return;
      this.uploadAndDraw(this.resources.circleProgram, this.circleVAO, this.circleBuffer, this.circleData, 13, () => this.circleCapacity, (n) => this.circleCapacity = n);
      this.uploadAndDraw(this.resources.capsuleProgram, this.capsuleVAO, this.capsuleBuffer, this.capsuleData, 14, () => this.capsuleCapacity, (n) => this.capsuleCapacity = n);
      this.uploadPolygonVertexTexture();
      this.uploadAndDraw(this.resources.polygonProgram, this.polygonVAO, this.polygonBuffer, this.polygonData, 15, () => this.polygonCapacity, (n) => this.polygonCapacity = n, () => {
        const gl = this.resources.gl;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
        gl.uniform1i(this.resources.polygonProgram.uVertexTex, 0);
        gl.uniform1i(this.resources.polygonProgram.uVertexTexWidth, POLYGON_VERTEX_TEX_WIDTH);
      });
    };
    this.drawCircle = (p, r, color, xf = noxf, fill) => {
      transformVec2(temp1, xf, p);
      const [cr, cg, cb, ca] = parseColor(color);
      const [fr, fg, fb, fa] = fillColorOf(color, fill);
      this.circleData.push(temp1.x, temp1.y, xf.q.c, xf.q.s, r, cr, cg, cb, ca, fr, fg, fb, fa);
    };
    this.drawPoint = this.drawCircle;
    this.drawScreenPoint = (p, pixelSize, color, xf = noxf) => {
      const pixelScale = this.resources?.pixelScale || 1;
      this.drawCircle(p, pixelSize / pixelScale, color, xf);
    };
    this.drawCapsule = (a, b, r, color, xf = noxf, fill) => {
      this.pushCapsule(xf, a, b, r, color, fill);
    };
    this.drawEdge = (a, b, color, xf = noxf) => {
      this.pushCapsule(xf, a, b, 0, color);
    };
    this.drawSegment = this.drawEdge;
    this.drawPolygon = (points, color, xf = noxf, fill) => {
      this.pushPolygon(xf, points, 0, color, fill);
    };
    this.drawRoundedPolygon = (points, count, r, color, xf = noxf, fill) => {
      this.pushPolygon(xf, points.slice(0, count), r, color, fill);
    };
    this.drawChain = (points, color, xf = noxf) => {
      for (let i = 0; i < points.length - 1; i++) {
        this.pushCapsule(xf, points[i], points[i + 1], 0, color);
      }
    };
    this.drawAABB = (aabb, color, xf = noxf) => {
      const { lowerBound: lo, upperBound: hi } = aabb;
      this.pushPolygon(xf, [lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], 0, color);
    };
    this.drawHollowPolygon = (points, color, xf = noxf) => {
      let prev = points[points.length - 1];
      for (const p of points) {
        this.pushCapsule(xf, prev, p, 0, color);
        prev = p;
      }
    };
    this.drawHollowAABB = (aabb, color, xf = noxf) => {
      const { lowerBound: lo, upperBound: hi } = aabb;
      this.drawHollowPolygon([lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], color, xf);
    };
    this.drawHollowCircle = (center, radius, color, xf = noxf, segments = 24) => {
      const points = [];
      for (let i = 0; i < segments; i++) {
        const a = i / segments * Math.PI * 2;
        points.push({ x: center.x + radius * Math.cos(a), y: center.y + radius * Math.sin(a) });
      }
      this.drawHollowPolygon(points, color, xf);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("frame-render", this.handleFrameRender);
  }
  // Uploads this frame's flat vertex list into polygonVertexTexture, growing its height (in
  // POLYGON_VERTEX_TEX_WIDTH-wide rows) only when the existing allocation is too small - mirrors
  // uploadAndDraw's grow-only buffer capacity pattern below.
  uploadPolygonVertexTexture() {
    const vertexCount = this.polygonVertexData.length / 2;
    if (vertexCount === 0)
      return;
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
  pushCapsule(xf, a, b, radius, color, fill) {
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
  pushPolygon(xf, points, radius, color, fill) {
    const offset = this.polygonVertexData.length / 2;
    for (let i = 0; i < points.length; i++) {
      this.polygonVertexData.push(points[i].x, points[i].y);
    }
    const [cr, cg, cb, ca] = parseColor(color);
    const [fr, fg, fb, fa] = fillColorOf(color, fill);
    this.polygonData.push(xf.p.x, xf.p.y, xf.q.c, xf.q.s, offset, points.length, radius, cr, cg, cb, ca, fr, fg, fb, fa);
  }
  uploadAndDraw(shapeProgram, vao, buffer, data, floatsPerInstance, getCapacity, setCapacity, bindExtra) {
    const instanceCount = data.length / floatsPerInstance;
    if (instanceCount === 0)
      return;
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
class DrawWorld extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (!this.context.renderConfig.value.shapes)
        return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        this.drawBody(body);
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
  drawBody(body) {
    const xf = body.getTransform();
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      const style = getStyle(fixture.getShape()) ?? getStyle(fixture) ?? getStyle(body);
      const color = style?.stroke ?? shapeColor(body, fixture);
      const fill = style?.fill ?? DEFAULT_FILL;
      const type = fixture.getType();
      if (type === "circle") {
        const shape = fixture.getShape();
        this.draw.drawCircle(shape.m_p, shape.m_radius, color, xf, fill);
      } else if (type === "polygon") {
        const shape = fixture.getShape();
        this.draw.drawPolygon(shape.m_vertices.slice(0, shape.m_count), color, xf, fill);
      } else if (type === "edge") {
        const shape = fixture.getShape();
        this.draw.drawEdge(shape.m_vertex1, shape.m_vertex2, color, xf);
      } else if (type === "chain") {
        const shape = fixture.getShape();
        const vertices = shape.m_vertices;
        const count = shape.m_count;
        for (let i = 1; i < count; i++) {
          this.draw.drawEdge(vertices[i - 1], vertices[i], color, xf);
        }
        if (shape.isLoop() && count > 1) {
          this.draw.drawEdge(vertices[count - 1], vertices[0], color, xf);
        }
      }
    }
  }
}
const DEFAULT_FILL = "rgba(255,255,255,0.1)";
function getStyle(obj) {
  const render = obj["render"];
  if (typeof render === "object" && render && ("stroke" in render || "fill" in render)) {
    return render;
  }
  const style = obj["style"];
  if (typeof style === "object" && style) {
    return style;
  }
}
function shapeColor(body, fixture) {
  if (fixture.isSensor()) {
    return "wheat";
  }
  if (body.isDynamic()) {
    return "rgba(255,255,255,0.9)";
  }
  if (body.isKinematic()) {
    return "rgba(255,255,255,0.8)";
  }
  return "rgba(255,255,255,0.7)";
}
class DrawBounds extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (!this.context.renderConfig.value.bounds)
        return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          const children = fixture.getShape().getChildCount();
          for (let child = 0; child < children; child++) {
            this.draw.drawHollowAABB(fixture.getAABB(child), "gold");
          }
        }
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
}
class TextOverlay extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.canvas = null;
    this.resizeObserver = null;
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement)
          return;
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.background = "transparent";
        canvas.style.pointerEvents = "none";
        containerElement.appendChild(canvas);
        this.canvas = canvas;
        this.context.textOverlay.value = canvas.getContext("2d");
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(containerElement);
        this.handleResize();
        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.context.textOverlay.value = void 0;
          canvas.remove();
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.handleResize = () => {
      if (!this.canvas)
        return;
      const containerElement = this.context.containerElement.peek();
      const ratio = window.devicePixelRatio || 1;
      this.canvas.width = Math.max(1, Math.round(containerElement.clientWidth * ratio));
      this.canvas.height = Math.max(1, Math.round(containerElement.clientHeight * ratio));
    };
    this.handleFrameBefore = () => {
      const ctx = this.context.textOverlay.peek();
      if (!ctx)
        return;
      const ratio = window.devicePixelRatio || 1;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }
}
const screenPoint = { x: 0, y: 0 };
function drawWorldString(context, p, text, color, align = "left") {
  const ctx = context.textOverlay.value;
  if (!ctx)
    return;
  mulMat2dVec2(screenPoint, context.worldMatrix, p);
  ctx.font = "12px monospace";
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, screenPoint.x, screenPoint.y);
}
class DrawBodyInfo extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      const renderConfig = this.context.renderConfig.value;
      if (!renderConfig.bodyNames && !renderConfig.mass)
        return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (renderConfig.bodyNames) {
          const label = getLabel(body);
          if (label)
            this.drawBodyName(body, label);
        }
        if (renderConfig.mass && body.isDynamic()) {
          this.drawMass(body);
        }
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
  drawBodyName(body, label) {
    const { c, s } = body.getTransform().q;
    const center = body.getWorldCenter();
    const p = { x: center.x + c * 0.1 - s * 0.1, y: center.y + s * 0.1 + c * 0.1 };
    drawWorldString(this.context, p, label, "blueviolet");
  }
  drawMass(body) {
    const { c, s } = body.getTransform().q;
    const center = body.getWorldCenter();
    this.draw.drawEdge(center, { x: center.x + c, y: center.y + s }, "red");
    this.draw.drawEdge(center, { x: center.x - s, y: center.y + c }, "green");
    const p = { x: center.x + c * 0.1 - s * 0.1, y: center.y + s * 0.1 + c * 0.1 };
    drawWorldString(this.context, p, `  ${body.getMass().toFixed(2)}`, "white");
  }
}
const DEFAULT_COLOR = "rgba(255,255,255,0.9)";
class DrawJoints extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (!this.context.renderConfig.value.joints)
        return;
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        this.drawJoint(joint);
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
  drawJoint(joint) {
    const style = joint["style"];
    const color = style?.stroke ?? DEFAULT_COLOR;
    const pA = joint.getAnchorA();
    const pB = joint.getAnchorB();
    switch (joint.getType()) {
      case "pulley-joint": {
        const pj = joint;
        const gA = pj.getGroundAnchorA();
        const gB = pj.getGroundAnchorB();
        this.draw.drawEdge(pA, gA, color);
        this.draw.drawEdge(gA, gB, color);
        this.draw.drawEdge(gB, pB, color);
        break;
      }
      case "prismatic-joint":
      case "wheel-joint": {
        const axis = joint.getLocalAxisA();
        const xfA = joint.getBodyA().getTransform();
        const end = Transform.mulVec2(xfA, {
          x: joint["m_localAnchorA"].x + axis.x,
          y: joint["m_localAnchorA"].y + axis.y
        });
        this.draw.drawEdge(pA, end, "gray");
        this.draw.drawEdge(pA, pB, color);
        break;
      }
      case "mouse-joint": {
        const target = joint.getTarget();
        this.draw.drawEdge(target, pB, color);
        this.draw.drawScreenPoint(target, 4, color);
        break;
      }
      case "revolute-joint": {
        this.draw.drawEdge(pA, pB, color);
        this.draw.drawScreenPoint(pB, 6, color);
        break;
      }
      default:
        this.draw.drawEdge(pA, pB, color);
        break;
    }
  }
}
const rotate = (q, v) => Rot.mulVec2(q, v);
const CONTACT_NORMAL_LENGTH = 0.3;
class DrawContacts extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.manifold = new WorldManifold();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      const renderConfig = this.context.renderConfig.value;
      if (!renderConfig.contact)
        return;
      for (let contact = world.getContactList(); contact; contact = contact.getNext()) {
        if (!contact.isTouching())
          continue;
        const manifold = contact.getWorldManifold(this.manifold);
        if (!manifold)
          continue;
        const normal = manifold.normal;
        for (let i = 0; i < manifold.pointCount; i++) {
          const point = manifold.points[i];
          this.draw.drawScreenPoint(point, 5, "blue");
          if (renderConfig.contactNormals) {
            const p2 = {
              x: point.x + normal.x * CONTACT_NORMAL_LENGTH,
              y: point.y + normal.y * CONTACT_NORMAL_LENGTH
            };
            this.draw.drawEdge(point, p2, "dimgray");
          }
        }
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
}
class WorldStep extends Middleware {
  constructor() {
    super();
    this.handleStep = (ev) => {
      const world = this.context.world.value;
      if (!world)
        return;
      try {
        world.step(ev.timeStep, ev.velocityIterations, ev.positionIterations);
      } catch (error) {
        console.error(error);
        this.context.paused.value = true;
      }
    };
    this.on("step-physics", this.handleStep);
  }
}
class WorldKeys extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      this.dispose = effect(() => {
        const world = this.context.world.value;
        if (!world)
          return;
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          setKey(body);
          for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            setKey(fixture);
          }
        }
        for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
          setKey(joint);
        }
        world.on("add-body", this.keyOne);
        world.on("add-fixture", this.keyOne);
        world.on("add-joint", this.keyOne);
        return () => {
          world.off("add-body", this.keyOne);
          world.off("add-fixture", this.keyOne);
          world.off("add-joint", this.keyOne);
        };
      });
    };
    this.handleDeactivate = () => {
      this.dispose?.();
      this.dispose = void 0;
    };
    this.keyOne = (obj) => {
      setKey(obj);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
}
class PullTool extends Middleware {
  constructor() {
    super();
    this.body = null;
    this.ground = null;
    this.joint = null;
    this.handleDeactivate = () => {
      this.destroyJoint();
      this.body = null;
    };
    this.handlePointerDown = (ev) => {
      const world = this.context.world.value;
      if (!world)
        return;
      let mouseForce = this.context.mouseForce.value;
      if (mouseForce === 0)
        return;
      if (typeof mouseForce !== "number") {
        mouseForce = 1e3;
      }
      const match = this.context.worldQuery.testPoint(ev.point, (m) => m.worldBody.isDynamic());
      if (!match)
        return;
      const hit = match.worldBody;
      if (hit !== this.body) {
        this.destroyJoint();
      }
      this.body = hit;
      this.ground = world.createBody();
      this.joint = new MouseJoint({ maxForce: mouseForce }, this.ground, this.body, ev.point);
      world.createJoint(this.joint);
      this.emit("capture-pointer");
    };
    this.handlePointerMove = (ev) => {
      if (!this.joint)
        return;
      this.joint.setTarget(ev.point);
    };
    this.handlePointerUp = () => {
      if (!this.joint)
        return;
      this.body = null;
      this.destroyJoint();
    };
    this.handlePointerCancel = () => {
      if (!this.joint)
        return;
      this.body = null;
      this.destroyJoint();
    };
    this.destroyJoint = () => {
      const world = this.context.world.value;
      if (world && this.joint)
        world.destroyJoint(this.joint);
      if (world && this.ground)
        world.destroyBody(this.ground);
      this.joint = null;
      this.ground = null;
    };
    this.on("deactivate", this.handleDeactivate);
    this.on("pointer-down", this.handlePointerDown);
    this.on("pointer-move", this.handlePointerMove);
    this.on("pointer-up", this.handlePointerUp);
    this.on("pointer-cancel", this.handlePointerCancel);
  }
}
toolbarTool.register({
  name: "pull",
  activate: (context) => {
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
    context.activeTool.value = { name: "interact-pull" };
  }
});
class ImpulseTool extends Middleware {
  constructor() {
    super();
    this.body = null;
    this.pointer = { x: 0, y: 0 };
    this.draw = new GLDraw();
    this.handleDeactivate = () => {
      this.body = null;
    };
    this.handlePointerDown = (ev) => {
      if (this.body)
        return;
      const mouseForce = this.context.mouseForce.value;
      if (mouseForce === 0)
        return;
      const match = this.context.worldQuery.testPoint(ev.point, (m) => m.worldBody.isDynamic());
      if (!match)
        return;
      this.body = match.worldBody;
      this.pointer.x = ev.point.x;
      this.pointer.y = ev.point.y;
      this.emit("capture-pointer");
    };
    this.handlePointerMove = (ev) => {
      if (!this.body)
        return;
      this.pointer.x = ev.point.x;
      this.pointer.y = ev.point.y;
    };
    this.handlePointerUp = (ev) => {
      if (!this.body)
        return;
      let mouseForce = this.context.mouseForce.value;
      if (mouseForce === 0)
        return;
      if (typeof mouseForce !== "number") {
        mouseForce = -1e3;
      }
      if (mouseForce > 0) {
        mouseForce = -mouseForce;
      }
      const pos = this.body.getPosition();
      const force = {
        x: (ev.point.x - pos.x) * mouseForce,
        y: (ev.point.y - pos.y) * mouseForce
      };
      this.body.applyForceToCenter(force, true);
      this.body = null;
    };
    this.handlePointerCancel = () => {
      this.body = null;
    };
    this.handleFrameUpdate = () => {
      if (!this.body)
        return;
      const pos = this.body.getPosition();
      this.draw.drawSegment(pos, this.pointer, "rgba(255,255,255,0.5)");
    };
    this.use(this.draw);
    this.on("deactivate", this.handleDeactivate);
    this.on("pointer-down", this.handlePointerDown);
    this.on("pointer-move", this.handlePointerMove);
    this.on("pointer-up", this.handlePointerUp);
    this.on("pointer-cancel", this.handlePointerCancel);
    this.on("frame-update", this.handleFrameUpdate);
  }
}
toolbarTool.register({
  name: "impulse",
  activate: (context) => {
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
    context.activeTool.value = { name: "interact-impulse" };
  }
});
class InspectTool extends Middleware {
  constructor() {
    super();
    this.handleClick = (ev) => {
      const match = this.context.worldQuery.testPoint(ev.point);
      const was = this.context.multiselect.value.selected[0];
      if (!match?.fixture) {
        setSelection(this.context, was?.up ?? null);
      } else if (was?.key === match.body || was?.key !== match.fixture && was?.up?.key === match.body) {
        setSelection(this.context, selectFixture(match.fixture, match.body));
      } else {
        setSelection(this.context, selectBody(match.body));
      }
    };
    this.on("pointer-click", this.handleClick);
  }
}
class SelectionManager extends Middleware {
  constructor() {
    super();
    this.selectBody = (select) => {
      if (!select?.body)
        return;
      setSelection(this.context, selectBody(select.body));
    };
    this.deselectBody = (select) => {
      if (!select?.body)
        return;
      removeSelection(this.context, selectBody(select.body));
    };
    this.selectFixture = (select) => {
      if (!select?.fixture)
        return;
      setSelection(this.context, selectFixture(select.fixture, select.body));
    };
    this.deselectFixture = (select) => {
      if (!select?.fixture)
        return;
      removeSelection(this.context, selectFixture(select.fixture, select.body));
    };
    this.selectJoint = (select) => {
      if (!select?.joint)
        return;
      setSelection(this.context, selectJoint(select.joint));
    };
    this.deselectJoint = (select) => {
      if (!select?.joint)
        return;
      removeSelection(this.context, selectJoint(select.joint));
    };
    this.deselectAll = () => {
      emptySelection(this.context);
    };
    this.on("select-body", this.selectBody);
    this.on("deselect-body", this.deselectBody);
    this.on("select-fixture", this.selectFixture);
    this.on("deselect-fixture", this.deselectFixture);
    this.on("select-joint", this.selectJoint);
    this.on("deselect-joint", this.deselectJoint);
    this.on("deselect-all", this.deselectAll);
  }
}
const DEFAULT_POINTER_RADIUS = 0.1;
class WorldQuery extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      this.context.worldQuery = this;
    };
    this.testPoint = (point, filter) => {
      const world = this.context.world.value;
      if (!world)
        return void 0;
      const radius = this.context.pointerRadius ?? DEFAULT_POINTER_RADIUS;
      let bestMatch;
      let bestDistance = radius;
      const aabb = new AABB(point, point).extend(radius);
      const distanceInput = new DistanceInput();
      distanceInput.useRadii = true;
      distanceInput.proxyB.set(new CircleShape(1e-5), 0);
      distanceInput.transformB.p.x = point.x;
      distanceInput.transformB.p.y = point.y;
      distanceInput.transformB.q.s = 0;
      distanceInput.transformB.q.c = 1;
      world.queryAABB(aabb, function(fixture) {
        const body = fixture.getBody();
        const match = {
          worldBody: body,
          worldFixture: fixture,
          body: getKey(body),
          fixture: getKey(fixture)
        };
        if (filter && !filter(match)) {
          return true;
        }
        if (fixture.testPoint(point)) {
          bestMatch = match;
          bestDistance = 0;
          return false;
        }
        for (let childIndex = fixture.getShape().getChildCount() - 1; childIndex >= 0; childIndex--) {
          distanceInput.proxyA.set(fixture.getShape(), childIndex);
          const xf = fixture.getBody().getTransform();
          distanceInput.transformA.p.x = xf.p.x;
          distanceInput.transformA.p.y = xf.p.y;
          distanceInput.transformA.q.s = xf.q.s;
          distanceInput.transformA.q.c = xf.q.c;
          const cache = new SimplexCache();
          const output = new DistanceOutput();
          Distance(output, cache, distanceInput);
          const distance = Vec2.distance(output.pointA, output.pointB);
          if (distance < bestDistance) {
            bestMatch = match;
            bestDistance = distance;
          }
        }
        return true;
      });
      return bestMatch;
    };
    this.testBox = (start, end, filter) => {
      const world = this.context.world.value;
      if (!world)
        return [];
      const aabb = {
        lowerBound: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
        upperBound: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) }
      };
      const results = [];
      world.queryAABB(aabb, function(fixture) {
        const body = fixture.getBody();
        const match = {
          worldBody: body,
          worldFixture: fixture,
          body: getKey(body),
          fixture: getKey(fixture)
        };
        if (filter && !filter(match))
          return true;
        results.push(match);
        return true;
      });
      return results;
    };
    this.on("activate", this.handleActivate);
  }
}
class DefaultTool extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.handleActivate = () => {
      this.disposers.push(effect(() => {
        this.resetTool();
      }));
      this.disposers.push(this.context.activeTool.subscribe((activeTool) => {
        if (activeTool?.name === "default-tool") {
          this.resetTool();
        }
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d) => d());
      this.disposers = [];
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  resetTool() {
    const paused = this.context.paused.value;
    const mouseForce = this.context.mouseForce.value;
    let tool = { name: "inspect" };
    if (!paused) {
      if (mouseForce > 0) {
        tool = { name: "interact-pull" };
      } else if (mouseForce < 0) {
        tool = { name: "interact-impulse" };
      }
    }
    this.context.activeTool.value = tool;
  }
}
class ConsoleManager extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      this.context.console = this;
      this.statusElement = document.getElementById("testbed-status");
      this.lastStatus = "";
      if (this.statusElement) {
        this.statusElement.innerText = this.lastStatus;
      } else {
        console.warn("Element with id='testbed-status' not found!");
      }
      this.infoElement = document.getElementById("testbed-info");
      this.lastInfo = "";
      if (this.infoElement) {
        this.infoElement.innerText = this.lastInfo;
      } else {
        console.warn("Element with id='testbed-info' not found!");
      }
    };
    this.handleDeactivate = () => {
      this.context.console = null;
    };
    this._statusText = "";
    this._statusMap = {};
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  info(text) {
    this.updateInfo(text);
  }
  status(a, b) {
    if (typeof b !== "undefined") {
      const key = a;
      const value = b;
      if (typeof value !== "function" && typeof value !== "object") {
        this._statusMap[key] = value;
      }
    } else if (a && typeof a === "object") {
      for (const key in a) {
        const value = a[key];
        if (typeof value !== "function" && typeof value !== "object") {
          this._statusMap[key] = value;
        }
      }
    } else if (typeof a === "string") {
      this._statusText = a;
    }
    const newline = "\n";
    let text = this._statusText || "";
    for (const key in this._statusMap) {
      const value = this._statusMap[key];
      if (typeof value === "function")
        continue;
      text += (text && newline) + key + ": " + value;
    }
    this.updateStatus(text);
  }
  updateInfo(text) {
    if (this.lastInfo === text)
      return;
    this.lastInfo = text;
    if (this.infoElement) {
      this.infoElement.innerText = text;
    }
  }
  updateStatus(text) {
    if (this.lastStatus === text)
      return;
    this.lastStatus = text;
    if (this.statusElement) {
      this.statusElement.innerText = text;
    }
  }
}
class TestbedMain extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameUpdate = (ev) => {
      if (this.context.paused.value)
        return;
      if (!this.context.world.value)
        return;
      this.step?.(ev.dt, ev.now);
    };
    this.handleKeydown = (ev) => {
      if (this.context.paused.value)
        return;
      this.keydown?.(ev.keyCode, String.fromCharCode(ev.keyCode));
    };
    this.handleKeyup = (ev) => {
      if (this.context.paused.value)
        return;
      this.keyup?.(ev.keyCode, String.fromCharCode(ev.keyCode));
    };
    this.use(this.draw);
    this.use(new WorldQuery());
    this.use(new FrameLoop());
    this.use(new ContainerLoader());
    this.use(new WorldStep());
    this.use(new AutoPause());
    this.use(new ConsoleManager());
    this.use(new KeyboardManager());
    this.use(new CameraTransform());
    this.use(new GLLoader());
    this.use(new TextOverlay());
    this.use(new AutoFocus());
    this.use(new DrawWorld());
    this.use(new DrawBounds());
    this.use(new DrawBodyInfo());
    this.use(new DrawJoints());
    this.use(new DrawContacts());
    this.use(new WorldKeys());
    this.use(new SelectionManager());
    this.use(new PointerManager());
    this.use(new DefaultTool());
    this.use(new ToolSwitch("inspect", new InspectTool()));
    this.use(new ToolSwitch("interact-pull", new PullTool()));
    this.use(new ToolSwitch("interact-impulse", new ImpulseTool()));
    this.on("frame-update", this.handleFrameUpdate);
    this.on("keydown", this.handleKeydown);
    this.on("keyup", this.handleKeyup);
  }
  color(r, g, b) {
    r = r * 255 | 0;
    g = g * 255 | 0;
    b = b * 255 | 0;
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  findOne(query) {
    const world = this.context.world.value;
    return world ? findOne(world, query) : null;
  }
  findAll(query) {
    const world = this.context.world.value;
    return world ? findAll(world, query) : [];
  }
  // @on("tool-request")
  // handleToolRequest(config: ToolConfig) {
  //   this.context.activeTool.value = config;
  // }
  get width() {
    return this.context.camera.width;
  }
  set width(value) {
    this.context.camera.width = value;
  }
  get height() {
    return this.context.camera.height;
  }
  set height(value) {
    this.context.camera.height = value;
  }
  get x() {
    return this.context.camera.x;
  }
  set x(value) {
    this.context.camera.x = value;
  }
  // planck 1's testbed measured y downwards: `testbed.y = -20` centers the view on world y = 20
  get y() {
    return -this.context.camera.y;
  }
  set y(value) {
    this.context.camera.y = -value;
  }
  get background() {
    return this.context.style.background;
  }
  set background(value) {
    this.context.style.background = value;
  }
  get hz() {
    return this.context.simulation.hz;
  }
  set hz(value) {
    this.context.simulation.hz = value;
  }
  get speed() {
    return this.context.simulation.speed;
  }
  set speed(value) {
    this.context.simulation.speed = value;
  }
  get mouseForce() {
    return this.context.mouseForce.value;
  }
  set mouseForce(value) {
    this.context.mouseForce.value = value;
  }
  get activeKeys() {
    return this.context.activeKeys;
  }
  start(world) {
    if (world) {
      this.context.world.value = world;
    }
    this.resume();
  }
  // todo: how to add world to testbed api?
  // get/set world, or get/setWorld
  get world() {
    return this.context.world.value;
  }
  set world(world) {
    this.context.world.value = world;
  }
  drawPoint(p, r, color) {
    this.draw.drawPoint(p, r, color);
  }
  drawCircle(p, r, color) {
    this.draw.drawCircle(p, r, color);
  }
  drawCapsule(a, b, r, color) {
    this.draw.drawCapsule(a, b, r, color);
  }
  drawEdge(a, b, color) {
    this.draw.drawEdge(a, b, color);
  }
  drawSegment(a, b, color) {
    this.draw.drawEdge(a, b, color);
  }
  drawPolygon(points, color) {
    this.draw.drawPolygon(points, color);
  }
  drawChain(points, color) {
    this.draw.drawChain(points, color);
  }
  drawAABB(aabb, color) {
    this.draw.drawAABB(aabb, color);
  }
  /** @internal pass paused to WorldComponent */
  get paused() {
    return this.context.paused.value;
  }
  isPaused() {
    return this.context.paused.value;
  }
  pause() {
    this.context.paused.value = true;
  }
  resume() {
    this.context.paused.value = false;
  }
  info(text) {
    this.context.console?.info(text);
  }
  status(a, b) {
    this.context.console?.status(a, b);
  }
}
const mountTestbed = () => {
  if (runtime.value)
    return runtime.value.middleware;
  const main = new TestbedMain();
  const context = initTestbedContext();
  context.activeTool.value = { name: "interact-pull" };
  runtime.value = {
    middleware: main,
    context,
    emit: main.emit.bind(main)
  };
  window["runtime"] = main;
  Runtime.activate(main, context);
  return main;
};
Testbed.mount = mountTestbed;
export {
  DrawBodyInfo,
  DrawBounds,
  DrawContacts,
  DrawJoints,
  DrawWorld,
  InspectTool,
  Multiselect,
  ProviderCollection,
  SelectionManager,
  Testbed2 as Testbed,
  TestbedMain,
  TextOverlay,
  WorldKeys,
  WorldQuery,
  WorldStep,
  currentPlay,
  drawWorldString,
  emptySelection,
  findAll,
  findBody,
  findFixture,
  findJoint,
  findOne,
  generateKey,
  getKey,
  getLabel,
  initTestbedContext,
  isSelected,
  mountTestbed,
  playlist,
  removeSelection,
  replaceKey,
  rotate,
  runtime,
  selectBody,
  selectFixture,
  selectJoint,
  setKey,
  setLabel,
  setSelection,
  toolbarTool
};
//# sourceMappingURL=testbed.mjs.map
