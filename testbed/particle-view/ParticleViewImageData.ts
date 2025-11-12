import * as Stage from "stage-js";
import { Middleware, Memo } from "polymatic";
import { World } from "../../src/";

interface ParticleViewImageDataContext {
  world: World;
  stage: Stage.Root;
}

export class ParticleViewImageData extends Middleware<ParticleViewImageDataContext> {
  private component: Stage.Sprite;

  private setupMemo = Memo.init();

  texture: Stage.CanvasTexture;

  constructor() {
    super();

    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("frame-render", this.handleFrameBefore);

    this.texture = new Stage.CanvasTexture();
    this.texture.setMemoizer(() => Math.random());
    this.texture.setDrawer(this.textureDrawer);

    this.component = new Stage.Image();
    this.component.texture(this.texture);
  }

  maxWidth = 1;
  maxHeight = 1;

  textureDrawer = () => {
    const particles = this.context.world["particles"];
    if (!particles) return;

    const context = this.texture.getContext("2d");

    const scale = 16;

    let xMin = Infinity;
    let yMin = Infinity;
    let xMax = -Infinity;
    let yMax = -Infinity;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      xMin = Math.min(xMin, p.x);
      yMin = Math.min(yMin, p.x);
      xMax = Math.max(xMax, p.x);
      yMax = Math.max(yMax, p.x);
    }

    xMin = Math.floor(xMin);
    yMin = Math.floor(yMin);
    xMax = Math.ceil(xMax);
    yMax = Math.ceil(yMax);

    const pw = Math.ceil(xMax - xMin);
    const ph = Math.ceil(yMax - yMin);
    if (pw > this.maxWidth || ph > this.maxHeight) {
      this.maxWidth = Math.max(this.maxWidth, pw);
      this.maxHeight = Math.max(this.maxHeight, ph);
      this.texture.setSize(this.maxWidth, this.maxHeight, scale);
    }

    this.component.offset(xMin, yMin);

    const cw = this.maxWidth * scale;
    const ch = this.maxHeight * scale;

    const imageData = context.getImageData(0, 0, cw, ch);
    const data = imageData.data;

    for (let i = 0; i < data.length; i++) {
      data[i] = 0; // clear
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const ix = ((p.x - xMin) * scale) | 0;
      const iy = ((p.y - yMin) * scale) | 0;
      if (ix >= 0 && ix < cw && iy >= 0 && iy < ch) {
        const x0 = ix;
        const y0 = iy;
        const index = (y0 * cw + x0) * 4;
        data[index] = p.r;
        data[index + 1] = p.g;
        data[index + 2] = p.b;
        data[index + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);
  };

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
