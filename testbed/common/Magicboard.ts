import * as Stage from "stage-js";
import type { Vec2Value, AABBValue } from "../";
import { Middleware, Memo } from "polymatic";

const math_PI = Math.PI;

interface MagicboardContext {
  stage: Stage.Root;
  magicboard: MagicboardInterface;
}

export interface MagicboardInterface {
  drawPoint(p: Vec2Value, r: number, color: string): void;
  drawCircle(p: Vec2Value, r: number, color: string): void;
  drawEdge(a: Vec2Value, b: Vec2Value, color: string): void;
  drawSegment(a: Vec2Value, b: Vec2Value, color: string): void;
  drawPolygon(points: Array<Vec2Value>, color: string): void;
  drawChain(points: Array<Vec2Value>, color: string): void;
  drawAABB(aabb: AABBValue, color: string): void;
}

/**
 * Memoized drawing surface.
 */
export class Magicboard extends Middleware<MagicboardContext> {
  private component: Stage.Node;

  private setupMemo = Memo.init();

  private nextBuffer = [];
  private lastBuffer = [];

  static lineWidth = 3;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);

    this.on("frame-before", this.handleFrameBefore);
    this.on("frame-render", this.handleFrameRender);

    this.component = new Stage.Node();
    this.component.renderTexture = (ctx: CanvasRenderingContext2D): void => {
      const pixelRatio = this.component.getDevicePixelRatio();
      ctx.save();
      ctx.lineWidth = Magicboard.lineWidth / pixelRatio;
      ctx.lineCap = "round";
      drawCommands(this.nextBuffer, ctx, pixelRatio);
      ctx.restore();
    };
  }

  handleActivate = () => {
    this.context.magicboard = this;
    this.handleContextChange();
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
    this.context.magicboard = null;
    this.component?.remove();
    this.component = null;
  }

  // clear buffer before each frame
  handleFrameBefore = () => {
    this.nextBuffer.length = 0;
  };

  // check buffer hash after all draw requests
  handleFrameRender = () => {
    if (!equal(this.lastBuffer, this.nextBuffer)) {
      copy(this.lastBuffer, this.nextBuffer);
      this.component.touch();
    }
    // this.newBufferHash = "";
  };

  drawPoint = (p: Vec2Value, r: number, color: string): void => {
    this.nextBuffer.push("point", p.x, p.y, color);
  };

  drawCircle = (p: Vec2Value, r: number, color: string): void => {
    this.nextBuffer.push("circle", p.x, p.y, r, color);
  };

  drawEdge = (a: Vec2Value, b: Vec2Value, color: string): void => {
    this.nextBuffer.push("edge", a.x, a.y, b.x, b.y, color);
  };

  drawSegment = this.drawEdge;

  drawPolygon = (points: Array<Vec2Value>, color: string): void => {
    if (!points || !points.length) {
      return;
    }
    this.nextBuffer.push("polygon", points.length);
    for (let i = 0; i < points.length; i++) {
      this.nextBuffer.push(points[i].x, points[i].y);
    }
    this.nextBuffer.push(color);
  };

  drawChain = (points: Array<Vec2Value>, color: string): void => {
    if (!points || !points.length) {
      return;
    }
    this.nextBuffer.push("chain", points.length);
    for (let i = 0; i < points.length; i++) {
      this.nextBuffer.push(points[i].x, points[i].y);
    }
    this.nextBuffer.push(color);
  };

  drawAABB = (aabb: AABBValue, color: string): void => {
    this.nextBuffer.push("polygon", 4);
    this.nextBuffer.push(aabb.lowerBound.x, aabb.lowerBound.y);
    this.nextBuffer.push(aabb.upperBound.x, aabb.lowerBound.y);
    this.nextBuffer.push(aabb.upperBound.x, aabb.upperBound.y);
    this.nextBuffer.push(aabb.lowerBound.x, aabb.upperBound.y);
    this.nextBuffer.push(color);
  };
}

const drawCommands = (commands: (string | number)[], ctx: CanvasRenderingContext2D, pixelRatio: number) => {
  while (commands.length) {
    const type = commands.shift() as string;
    switch (type) {
      case "circle": {
        const x = commands.shift() as number;
        const y = commands.shift() as number;
        const r = commands.shift() as number;
        const color = commands.shift() as string;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * math_PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        break;
      }
      case "point": {
        const x = commands.shift() as number;
        const y = commands.shift() as number;
        const color = commands.shift() as string;
        ctx.beginPath();
        ctx.arc(x, y, 5 / pixelRatio, 0, 2 * math_PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        break;
      }
      case "edge": {
        const x1 = commands.shift() as number;
        const y1 = commands.shift() as number;
        const x2 = commands.shift() as number;
        const y2 = commands.shift() as number;
        const color = commands.shift() as string;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();
        break;
      }
      case "polygon": {
        const size = commands.shift() as number;
        const x = commands.shift() as number;
        const y = commands.shift() as number;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let i = 1; i < size; i++) {
          const x = commands.shift() as number;
          const y = commands.shift() as number;
          ctx.lineTo(x, y);
        }
        const color = commands.shift() as string;
        ctx.strokeStyle = color;
        ctx.closePath();
        ctx.stroke();
        break;
      }
      case "chain": {
        const size = commands.shift() as number;
        const x = commands.shift() as number;
        const y = commands.shift() as number;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let i = 1; i < size; i++) {
          const x = commands.shift() as number;
          const y = commands.shift() as number;
          ctx.lineTo(x, y);
        }
        const color = commands.shift() as string;
        ctx.strokeStyle = color;
        // ctx.closePath();
        ctx.stroke();
        break;
      }
    }
  }
};

const equal = (left: any[], right: any[]) => {
  if (left?.length !== right?.length) return false;
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return false;
  }
  return true;
};

const copy = (output: any[], input: any[]) => {
  for (let i = 0; i < input.length; i++) {
    output[i] = input[i];
  }
  output.length = input.length;
};

const copyqual = (output: any[], input: any[]) => {
  let equal = true;
  if (output?.length !== input?.length) equal = false;
  for (let i = 0; i < input.length; i++) {
    if (output[i] !== input[i]) equal = false;
    output[i] = input[i];
  }
  output.length = input.length;
  return equal;
};
