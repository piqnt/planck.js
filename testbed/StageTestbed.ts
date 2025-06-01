import * as Stage from "stage-js";

import type { World } from "../src/dynamics/World";
import type { Joint } from "../src/dynamics/Joint";
import type { Fixture } from "../src/dynamics/Fixture";
import type { Body } from "../src/dynamics/Body";
import type { AABBValue } from "../src/collision/AABB";
import { ActiveKeys, Testbed, TestbedInterface } from "../src/util/Testbed";
import { MouseJoint } from "../src/dynamics/joint/MouseJoint";
import { WorldComponent, WorldDragEnd, WorldDragMove, WorldDragStart } from "./world-view";
import { Memo } from "./Memo";

const math_PI = Math.PI;

let mounted: StageTestbed | null = null;

Testbed.mount = () => {
  if (mounted) {
    return mounted;
  }

  mounted = new StageTestbed();

  const playButton = document.getElementById("testbed-play");
  const statusElement = document.getElementById("testbed-status");
  const infoElement = document.getElementById("testbed-info");

  if (playButton) {
    playButton.addEventListener("click", () => {
      if (mounted.isPaused()) {
        mounted.resume();
      } else {
        mounted.pause();
      }
    });

    mounted._pause = () => {
      playButton.classList.add("pause");
      playButton.classList.remove("play");
    };

    mounted._resume = () => {
      playButton.classList.add("play");
      playButton.classList.remove("pause");
    };
  } else {
    console.log("Please create a button with id='testbed-play'");
  }

  let lastStatus = "";
  if (statusElement) {
    statusElement.innerText = lastStatus;
  }
  mounted._status = (text: string) => {
    if (lastStatus === text) {
      return;
    }
    lastStatus = text;
    if (statusElement) {
      statusElement.innerText = text;
    }
  };

  let lastInfo = "";
  if (infoElement) {
    infoElement.innerText = lastInfo;
  }
  mounted._info = (text: string) => {
    if (lastInfo === text) {
      return;
    }
    lastInfo = text;
    if (infoElement) {
      infoElement.innerText = text;
    }
  };

  return mounted;
};

/** @internal */
export class StageTestbed implements TestbedInterface {
  /** World viewbox width. */
  width: number = 80;

  /** World viewbox height. */
  height: number = 60;

  /** World viewbox center vertical offset. */
  x: number = 0;

  /** World viewbox center horizontal offset. */
  y: number = -10;

  /** @hidden */
  scaleY: number = -1;

  /** World simulation step frequency */
  hz: number = 60;

  /** World simulation speed, default is 1 */
  speed: number = 1;

  background: string = "#222222";

  mouseForce?: number;
  activeKeys: ActiveKeys = {};

  /** callback, to be implemented by user */
  step = (dt: number, t: number): void => {
    return;
  };

  /** callback, to be implemented by user */
  keydown = (keyCode: number, label: string): void => {
    return;
  };

  /** callback, to be implemented by user */
  keyup = (keyCode: number, label: string): void => {
    return;
  };

  color(r: number, g: number, b: number): string {
    r = (r * 256) | 0;
    g = (g * 256) | 0;
    b = (b * 256) | 0;
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  private canvas: HTMLCanvasElement;
  private stage: Stage.Root;
  paused: boolean = false;
  private lastDrawHash = "";
  private newDrawHash = "";
  private buffer: ((context: CanvasRenderingContext2D, ratio: number) => void)[] = [];

  start(world: World) {
    const stage = (this.stage = Stage.mount());
    const canvas = (this.canvas = stage.dom as HTMLCanvasElement);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const testbed = this;
    this.canvas = canvas;

    stage.on(Stage.POINTER_DOWN, () => {
      window.focus();
      // @ts-ignore
      document.activeElement?.blur();
      canvas.focus();
    });

    stage.MAX_ELAPSE = 1000 / 30;

    stage.flipY(true);

    stage.on("resume", () => {
      this.paused = false;
      this._resume();
    });
    stage.on("pause", () => {
      this.paused = true;
      this._pause();
    });

    const drawingTexture = new Stage.CanvasTexture();
    drawingTexture.draw = (ctx: CanvasRenderingContext2D) => {
      const pixelRatio = drawingTexture.getDevicePixelRatio();
      ctx.save();
      ctx.transform(1, 0, 0, 1, 0, 0);
      ctx.lineWidth = 3 / pixelRatio;
      ctx.lineCap = "round";
      for (let drawing = this.buffer.shift(); drawing; drawing = this.buffer.shift()) {
        drawing(ctx, pixelRatio);
      }
      ctx.restore();
    };

    const drawingElement = Stage.sprite(drawingTexture);
    stage.append(drawingElement);
    stage.tick(() => {
      this.buffer.length = 0;
    }, true);

    stage.background(this.background);
    stage.viewbox(this.width, this.height);
    stage.pin("alignX", -0.5);
    stage.pin("alignY", -0.5);

    const mouseGround = world.createBody();
    let mouseJoint: MouseJoint | null = null;
    let targetBody: Body | null = null;
    const mouseMove = { x: 0, y: 0 };

    const pointerStart = (event: WorldDragStart) => {
      const point = event.point;
      if (targetBody) {
        return;
      }

      const fixture = worldNode.findFixture(point);
      if (!fixture) {
        return;
      }
      const body = fixture.getBody();

      if (this.mouseForce) {
        targetBody = body;
      } else if (this.mouseForce === 0) {
      } else {
        mouseJoint = new MouseJoint({ maxForce: 1000 }, mouseGround, body, {
          x: point.x,
          y: point.y,
        });
        world.createJoint(mouseJoint);
      }
    };

    const pointerMove = (event: WorldDragMove) => {
      const point = event.point;
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

      mouseMove.x = point.x;
      mouseMove.y = point.y;
    };

    const pointerEnd = (event: WorldDragEnd) => {
      const point = event.point;
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody && this.mouseForce) {
        const target = targetBody.getPosition();
        const force = {
          x: (point.x - target.x) * this.mouseForce,
          y: (point.y - target.y) * this.mouseForce,
        };
        targetBody.applyForceToCenter(force, true);
        targetBody = null;
      }
    };

    const pointerCancel = () => {
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        targetBody = null;
      }
    };

    const worldNode = new WorldComponent(this, (name, event) => {
      if (name === "world-drag-start") {
        pointerStart(event as WorldDragStart);
      } else if (name === "world-drag-move") {
        pointerMove(event as WorldDragMove);
      } else if (name === "world-drag-end") {
        pointerEnd(event as WorldDragEnd);
      } else if (name === "world-pointer-cancel") {
        pointerCancel();
      }
    });

    worldNode.setWorld(world);

    // stage.empty();
    stage.prepend(worldNode);

    const viewboxMemo = Memo.init();
    stage.tick((dt: number, t: number) => {
      if (viewboxMemo.update(this.x, this.y, this.width, this.height)) {
        stage.viewbox(this);
      }
    });

    worldNode.tick((dt: number, t: number) => {
      this.step(dt, t);

      if (targetBody) {
        this.drawSegment(targetBody.getPosition(), mouseMove, "rgba(255,255,255,0.2)");
      }

      if (this.lastDrawHash !== this.newDrawHash) {
        this.lastDrawHash = this.newDrawHash;
        stage.touch();
      }
      this.newDrawHash = "";

      return true;
    });

    const activeKeys = testbed.activeKeys;
    const downKeys: Record<number, boolean> = {};
    function updateActiveKeys(keyCode: number, down: boolean) {
      const char = String.fromCharCode(keyCode);
      if (/\w/.test(char)) {
        activeKeys[char] = down;
      }
      activeKeys.right = downKeys[39] || activeKeys["D"];
      activeKeys.left = downKeys[37] || activeKeys["A"];
      activeKeys.up = downKeys[38] || activeKeys["W"];
      activeKeys.down = downKeys[40] || activeKeys["S"];
      activeKeys.fire = downKeys[32] || downKeys[13];
    }

    window.addEventListener("keydown", function (e) {
      const keyCode = e.keyCode;
      downKeys[keyCode] = true;
      updateActiveKeys(keyCode, true);
      testbed.keydown?.(keyCode, String.fromCharCode(keyCode));
    });
    window.addEventListener("keyup", function (e) {
      const keyCode = e.keyCode;
      downKeys[keyCode] = false;
      updateActiveKeys(keyCode, false);
      testbed.keyup?.(keyCode, String.fromCharCode(keyCode));
    });

    this.resume();
  }

  /** @private @internal */
  focus() {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.activeElement && document.activeElement.blur();
    this.canvas.focus();
  }

  /** @internal */
  _pause() {}

  /** @internal */
  _resume() {}

  private statusText = "";
  private statusMap: Record<string, any> = {};

  status(name: string, value: any): void;
  status(value: object | string): void;
  status(a: any, b?: any) {
    if (typeof b !== "undefined") {
      const key = a;
      const value = b;
      if (typeof value !== "function" && typeof value !== "object") {
        this.statusMap[key] = value;
      }
    } else if (a && typeof a === "object") {
      // tslint:disable-next-line:no-for-in
      for (const key in a) {
        const value = a[key];
        if (typeof value !== "function" && typeof value !== "object") {
          this.statusMap[key] = value;
        }
      }
    } else if (typeof a === "string") {
      this.statusText = a;
    }

    var newline = "\n";
    var text = this.statusText || "";
    for (var key in this.statusMap) {
      var value = this.statusMap[key];
      if (typeof value === "function") continue;
      text += (text && newline) + key + ": " + value;
    }

    this._status(text);
  }

  info(text: string): void {
    this._info(text);
  }

  /** @internal */
  _status(string: string) {}

  /** @internal */
  _info(text: string) {}

  /** @internal */
  isPaused() {
    return this.paused;
  }

  /** @internal */
  togglePause() {
    if (this.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  /** @internal */
  pause() {
    this.stage.pause();
  }

  /** @internal */
  resume() {
    this.stage.resume();
    this.focus();
  }

  drawPoint(p: { x: number; y: number }, r: number, color: string): void {
    this.buffer.push(function (ctx, ratio) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5 / ratio, 0, 2 * math_PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "point" + p.x + "," + p.y + "," + r + "," + color;
  }

  drawCircle(p: { x: number; y: number }, r: number, color: string): void {
    this.buffer.push(function (ctx) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, 2 * math_PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "circle" + p.x + "," + p.y + "," + r + "," + color;
  }

  drawEdge(a: { x: number; y: number }, b: { x: number; y: number }, color: string): void {
    this.buffer.push(function (ctx) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "segment" + a.x + "," + a.y + "," + b.x + "," + b.y + "," + color;
  }

  drawSegment = this.drawEdge;

  drawPolygon(points: Array<{ x: number; y: number }>, color: string): void {
    if (!points || !points.length) {
      return;
    }
    this.buffer.push(function (ctx) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = color;
      ctx.closePath();
      ctx.stroke();
    });
    this.newDrawHash += "polygon";
    for (let i = 1; i < points.length; i++) {
      this.newDrawHash += points[i].x + "," + points[i].y + ",";
    }
    this.newDrawHash += color;
  }

  drawChain(points: Array<{ x: number; y: number }>, color: string): void {
    if (!points || !points.length) {
      return;
    }
    this.buffer.push(function (ctx) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = color;
      // ctx.closePath();
      ctx.stroke();
    });
    this.newDrawHash += "chain";
    for (let i = 1; i < points.length; i++) {
      this.newDrawHash += points[i].x + "," + points[i].y + ",";
    }
    this.newDrawHash += color;
  }

  drawAABB(aabb: AABBValue, color: string): void {
    this.buffer.push(function (ctx) {
      ctx.beginPath();
      ctx.moveTo(aabb.lowerBound.x, aabb.lowerBound.y);
      ctx.lineTo(aabb.upperBound.x, aabb.lowerBound.y);
      ctx.lineTo(aabb.upperBound.x, aabb.upperBound.y);
      ctx.lineTo(aabb.lowerBound.x, aabb.upperBound.y);
      ctx.strokeStyle = color;
      ctx.closePath();
      ctx.stroke();
    });
    this.newDrawHash += "aabb";
    this.newDrawHash += aabb.lowerBound.x + "," + aabb.lowerBound.y + ",";
    this.newDrawHash += aabb.upperBound.x + "," + aabb.upperBound.y + ",";
    this.newDrawHash += color;
  }

  findOne(query: string): Body | Joint | Fixture | null {
    throw new Error("Not implemented");
  }

  findAll(query: string): (Body | Joint | Fixture)[] {
    throw new Error("Not implemented");
  }
}
