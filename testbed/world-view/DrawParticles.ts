import { Middleware } from "polymatic";
import { effect } from "@preact/signals";
import { type World } from "planck";

import { TestbedContext } from "../testbed/TestbedContext";
import { GLResources } from "../gl/GLContext";
import { parseColor } from "../gl/glUtil";

type ParticleSystem = NonNullable<ReturnType<World["getParticleSystemList"]>>;

/** particles created without a color */
const DEFAULT_COLOR = "rgb(0, 119, 255)";

// x, y, size, r, g, b, a
const FLOATS_PER_PARTICLE = 7;

/**
 * Draws the world's particle systems (LiquidFun): every particle a round
 * dot of the system's radius, in its color. gl.POINTS, one buffer upload
 * and one draw call per system per frame however many particles it has
 * (see gl/shaders/particle.*).
 */
export class DrawParticles extends Middleware<TestbedContext> {
  private disposers: (() => void)[] = [];
  private resources: GLResources | null = null;

  private vao: WebGLVertexArrayObject | null = null;
  private buffer: WebGLBuffer | null = null;
  // grow-only, like GLDraw's instance buffers
  private capacity = 0;
  private data = new Float32Array(0);

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-render", this.handleFrameRender);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const resources = this.context.gl.value;
        if (!resources) return;
        const gl = resources.gl;
        this.resources = resources;

        this.buffer = gl.createBuffer();
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        const stride = FLOATS_PER_PARTICLE * 4;
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 1, gl.FLOAT, false, stride, 2 * 4);
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, stride, 3 * 4);
        gl.bindVertexArray(null);

        return () => {
          gl.deleteVertexArray(this.vao);
          gl.deleteBuffer(this.buffer);
          this.vao = null;
          this.buffer = null;
          this.capacity = 0;
          this.resources = null;
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  handleFrameRender = () => {
    if (!this.resources) return;
    const world = this.context.world.value;
    if (!world) return;
    if (!this.context.renderConfig.value.particles) return;
    for (let system = world.getParticleSystemList(); system; system = system.getNext()) {
      this.drawSystem(system);
    }
  };

  private drawSystem(system: ParticleSystem) {
    const count = system.getParticleCount();
    if (!count) return;
    const positions = system.getPositionBuffer();
    const colors = system.getColorBuffer();
    const size = system.getRadius() * 2;
    const [dr, dg, db, da] = parseColor(DEFAULT_COLOR);

    const floats = count * FLOATS_PER_PARTICLE;
    if (this.data.length < floats) this.data = new Float32Array(floats);
    const data = this.data;
    for (let i = 0, j = 0; i < count; i++, j += FLOATS_PER_PARTICLE) {
      const p = positions[i];
      data[j] = p.x;
      data[j + 1] = p.y;
      data[j + 2] = size;
      const color = colors?.[i];
      if (color) {
        data[j + 3] = color.r / 255;
        data[j + 4] = color.g / 255;
        data[j + 5] = color.b / 255;
        data[j + 6] = color.a / 255;
      } else {
        data[j + 3] = dr;
        data[j + 4] = dg;
        data[j + 5] = db;
        data[j + 6] = da;
      }
    }

    const { gl, pointProgram, projectionMatrix, pixelScale } = this.resources;
    const view = data.subarray(0, floats);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    if (floats > this.capacity) {
      gl.bufferData(gl.ARRAY_BUFFER, view, gl.DYNAMIC_DRAW);
      this.capacity = floats;
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }

    gl.useProgram(pointProgram.program);
    gl.uniformMatrix4fv(pointProgram.uProjectionMatrix, false, projectionMatrix);
    // pixelScale is world units to CSS pixels; gl_PointSize is in device pixels
    gl.uniform1f(pointProgram.uPointScale, pixelScale * (window.devicePixelRatio || 1));
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.POINTS, 0, count);
    gl.bindVertexArray(null);
    gl.useProgram(null);
  }
}
