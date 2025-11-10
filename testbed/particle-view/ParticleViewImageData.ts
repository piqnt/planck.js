import * as Stage from "stage-js";
import { Middleware, Memo } from "polymatic";
import { World } from "../../src/";

interface ParticleViewImageDataContext {
  world: World;
  stage: Stage.Root;
}

export class ParticleView extends Middleware<ParticleViewImageDataContext> {
  private component: Stage.Node;

  private setupMemo = Memo.init();

  constructor() {
    super();

    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);

    this.component = new Stage.Sprite();
    this.component.size(200, 200);
    this.component.renderTexture = (context: CanvasRenderingContext2D): void => {
      const particles = this.context.world["particles"];
      if (!particles) return;

      const cw = (context.canvas.width / 2) | 0;
      const ch = (context.canvas.height / 2) | 0;
      const w = cw;
      const h = ch;
      const sx = cw - w / 2;
      const sy = ch - h / 2;
      const sw = w;
      const sh = h;
      const imageData = context.getImageData(sx, sy, sw, sh);
      const data = imageData.data;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const x = (w / 2 + p.x * 8) | 0; // Round to integer
        const y = (h / 2 + p.y * 8) | 0;
        if (x >= 0 && x < w && y >= 0 && y < h) {
          {
            const x0 = x;
            const y0 = y;
            const index = (y0 * w + x0) * 4;
            data[index] = p.r; // R
            data[index + 1] = p.g; // G
            data[index + 2] = p.b; // B (blue)
            data[index + 3] = 255; // A (opaque)
          }
          {
            const x0 = x;
            const y0 = y - 1;
            const index = (y0 * w + x0) * 4;
            data[index] = p.r; // R
            data[index + 1] = p.g; // G
            data[index + 2] = p.b; // B (blue)
            data[index + 3] = 255; // A (opaque)
          }

          {
            const x0 = x - 1;
            const y0 = y;
            const index = (y0 * w + x0) * 4;
            data[index] = p.r; // R
            data[index + 1] = p.g; // G
            data[index + 2] = p.b; // B (blue)
            data[index + 3] = 255; // A (opaque)
          }
          {
            const x0 = x + 1;
            const y0 = y;
            const index = (y0 * w + x0) * 4;
            data[index] = p.r; // R
            data[index + 1] = p.g; // G
            data[index + 2] = p.b; // B (blue)
            data[index + 3] = 255; // A (opaque)
          }
          {
            const x0 = x;
            const y0 = y + 1;
            const index = (y0 * w + x0) * 4;
            data[index] = p.r; // R
            data[index + 1] = p.g; // G
            data[index + 2] = p.b; // B (blue)
            data[index + 3] = 255; // A (opaque)
          }
        }
      }

      context.putImageData(imageData, sx, sy);
    };
  }

  handleContextChange() {
    if (!this.setupMemo.update(this.context.stage)) return;
    if (!this.context.stage) {
      this.handleDeactivate();
    } else {
      this.context.stage.append(this.component);
    }
  }

  handleDeactivate() {
    this.component?.remove();
    this.component = null;
  }

  handleFrameBefore = () => {
    const particles = this.context.world["particles"];
    if (!particles) return;
    this.component.touch();
  };
}
