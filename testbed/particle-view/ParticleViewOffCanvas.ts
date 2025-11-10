import * as Stage from "stage-js";
import { Middleware, Memo } from "polymatic";
import { World } from "../../src/";

const math_PI = Math.PI;

interface ParticleViewOffCanvasContext {
  world: World;
  stage: Stage.Root;
}

export class ParticleViewOffCanvas extends Middleware<ParticleViewOffCanvasContext> {
  private component: Stage.Node;

  private setupMemo = Memo.init();

  constructor() {
    super();

    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);

    const texture = document.createElement("canvas");
    {
      // offscreen texture for particles
      const size = 8;
      texture.width = size;
      texture.height = size;
      const ctx = texture.getContext("2d") as CanvasRenderingContext2D;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * math_PI);
      ctx.stroke();
      // ctx.fillStyle = "red";
      // ctx.fill();
    }

    this.component = new Stage.Sprite();
    this.component.size(200, 200);
    this.component.renderTexture = (context: CanvasRenderingContext2D): void => {
      const particles = this.context.world["particles"];
      if (!particles) return;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        context.drawImage(texture, p.x, p.y, 0.1, 0.1);
      }
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
