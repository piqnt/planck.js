import { Memo, Middleware } from "polymatic";

import {
  type TestbedInterface,
  type Vec2Value,
  type World,
  type Joint,
  type Fixture,
  type Body,
  type AABBValue,
} from "../";

import { findAll, findOne } from "../common/LookupId";

import { type TestbedContext } from "./TestbedContext";
import { type FrameLoopEvent } from "../common/FrameLoop";

/**
 * Implements Testbed.mount() and returns a testbed instance connected to this runtime.
 */
export class TestbedLoader extends Middleware<TestbedContext> {
  stageMemo = Memo.init();

  constructor() {
    super();

    this.on("activate", this.handleActivate);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);

    this.on("gamepad-keydown", this.handleGamepadKeydown);
    this.on("gamepad-keyup", this.handleGamepadKeyup);

    this.on("frame-update", this.handleFrameLoop);
  }

  handleActivate = () => {
    this.handleContextChange();
  };

  handleContextChange = () => {
    const stage = this.context.stage;
    if (this.stageMemo.update(stage) && stage) {
      // default root alignment in stage is 0, 0 (top-left origin).
      // planck testbed root alignment needs to be -0.5, -0.5 (origin in the middle)
      stage.pin("alignX", -0.5);
      stage.pin("alignY", -0.5);
    }
  };

  handleDeactivate() {
    this.stageMemo.clear();
  }

  handleFrameLoop = (ev: FrameLoopEvent) => {
    if (this.context.paused) return;
    if (this.context.activeMode !== "play") return;
    this.context.testbed?.step?.(ev.dt, ev.now);
  };

  handleGamepadKeydown = (ev: KeyboardEvent) => {
    console.log("handleGamepadKeyup", this.context.paused, this.context.activeMode);
    if (this.context.paused) return;
    if (this.context.activeMode !== "play") return;
    const keyCode = ev.keyCode;
    this.context.testbed?.keydown?.(keyCode, String.fromCharCode(keyCode));
  };

  handleGamepadKeyup = (ev: KeyboardEvent) => {
    if (this.context.paused) return;
    if (this.context.activeMode !== "play") return;
    const keyCode = ev.keyCode;
    this.context.testbed?.keyup?.(keyCode, String.fromCharCode(keyCode));
  };
}

export class TestbedInstance implements TestbedInterface {
  static instance: TestbedInstance;
  private runtime: Middleware<TestbedContext>;

  constructor(runtime: Middleware<TestbedContext>) {
    this.runtime = runtime;
  }

  get width() {
    return this.runtime.context.camera.width;
  }
  set width(value: number) {
    this.runtime.context.camera.width = value;
  }

  get height() {
    return this.runtime.context.camera.height;
  }
  set height(value: number) {
    this.runtime.context.camera.height = value;
  }

  get x() {
    return this.runtime.context.camera.x;
  }
  set x(value: number) {
    this.runtime.context.camera.x = value;
  }

  get y() {
    return this.runtime.context.camera.y;
  }
  set y(value: number) {
    this.runtime.context.camera.y = value;
  }

  get background() {
    return this.runtime.context.style.background;
  }

  set background(value: string) {
    this.runtime.context.style.background = value;
  }

  scaleY: number;
  get hz() {
    return this.runtime.context.simulation.hz;
  }
  set hz(value: number) {
    this.runtime.context.simulation.hz = value;
  }

  get speed() {
    return this.runtime.context.simulation.speed;
  }
  set speed(value: number) {
    this.runtime.context.simulation.speed = value;
  }

  get mouseForce() {
    return this.runtime.context.activeTool.maxForce as number;
  }
  set mouseForce(value: number) {
    this.runtime.context.activeTool.maxForce = value;
  }

  get activeKeys() {
    return this.runtime.context.gamepad.activeKeys;
  }

  step: (dt: number, t: number) => void;
  keydown: (keyCode: number, label: string) => void;
  keyup: (keyCode: number, label: string) => void;

  color(red: number, green: number, blue: number, alpha = 1): string {
    const redHex = ((red * 255) | 0).toString(16).padStart(2, "0");
    const greenHex = ((green * 255) | 0).toString(16).padStart(2, "0");
    const blueHex = ((blue * 255) | 0).toString(16).padStart(2, "0");
    const alphaHex = alpha !== 1 ? ((alpha * 255) | 0).toString(16).padStart(2, "0") : "";
    const hexColor = "#" + redHex + greenHex + blueHex + alphaHex;
    return hexColor;
  }

  start(world: World): void {
    if (world) {
      this.runtime.setContext((context) => {
        context.world = world;
      });
    }
    this.resume();
  }

  // todo: how to add world to testbed api?
  // get/set world, or get/setWorld
  get world() {
    return this.runtime.context.world;
  }

  set world(world: World) {
    this.runtime.setContext((context) => {
      context.world = world;
    });
  }

  drawPoint(p: Vec2Value, r: number, color: string): void {
    this.runtime.context.magicboard?.drawPoint(p, r, color);
  }

  drawCircle(p: Vec2Value, r: number, color: string): void {
    this.runtime.context.magicboard?.drawCircle(p, r, color);
  }

  drawEdge(a: Vec2Value, b: Vec2Value, color: string): void {
    this.runtime.context.magicboard?.drawEdge(a, b, color);
  }

  drawSegment(a: Vec2Value, b: Vec2Value, color: string): void {
    this.runtime.context.magicboard?.drawEdge(a, b, color);
  }

  drawPolygon(points: Array<Vec2Value>, color: string): void {
    this.runtime.context.magicboard?.drawPolygon(points, color);
  }

  drawChain(points: Array<Vec2Value>, color: string): void {
    this.runtime.context.magicboard?.drawChain(points, color);
  }

  drawAABB(aabb: AABBValue, color: string): void {
    this.runtime.context.magicboard?.drawAABB(aabb, color);
  }

  findOne(query: string): Body | Joint | Fixture | null {
    return findOne(this.runtime.context.world, query);
  }

  findAll(query: string): (Body | Joint | Fixture)[] {
    return findAll(this.runtime.context.world, query);
  }

  /** @internal pass paused to WorldComponent */
  get paused() {
    return this.runtime.context.paused;
  }

  isPaused() {
    return this.runtime.context.paused;
  }

  pause() {
    this.runtime.setContext((context) => {
      context.paused = true;
    });
  }

  resume() {
    this.runtime.setContext((context) => {
      context.paused = false;
    });
  }

  info(text: string): void {
    this.runtime.context.console?.info(text);
  }

  status(name: string, value: any): void;
  status(value: object | string): void;
  status(a: any, b?: any) {
    this.runtime.context.console?.status(a, b);
  }
}
