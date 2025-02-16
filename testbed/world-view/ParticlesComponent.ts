import * as Stage from "stage-js";
import type { b2ParticleSystem } from "../../src/particle/ParticleSystem";

const SIZE = 5; // TODO

export class ParticlesComponent extends Stage.Sprite {
  constructor(particles: b2ParticleSystem) {
    super();

    const texture = Stage.canvas();
    texture.setMemoizer(() => {
      // always rerender
      return Math.random();
    });
    texture.setDrawer(function () {
      const ctx = this.getContext();
      const ratio = this.getDevicePixelRatio();

      this.setSize(SIZE * 2, SIZE * 2, ratio);

      ctx.fillStyle = "#0077ff";
      const positions = particles.getPositionBuffer()
      for (let i = 0; i < particles.m_count; i++) {
        const p = positions[i];
        ctx.fillRect(p.x * ratio + SIZE * ratio, p.y * ratio + SIZE * ratio, 1, 1);
      }
    });

    this.texture(texture);

    this.tick(this.handleTick);
  }

  handleTick = () => {
    this.offset(-SIZE, -SIZE);
  };
}
