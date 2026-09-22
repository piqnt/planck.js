import { Middleware } from "polymatic";

import { type Vec2Value, type World, type AABBValue, type Body, type Fixture, type Joint } from "planck";

import { ToolSwitch } from "./ToolSwitch";
import { GLLoader } from "../gl/GLLoader";
import { CameraTransform } from "./CameraTransform";
import { AutoFocus } from "./AutoFocus";
import { ContainerLoader } from "./ContainerLoader";
import { FrameLoop } from "./FrameLoop";
import { PointerManager } from "./Pointer";
import { KeyboardManager } from "./Keyboard";
import { AutoPause } from "./AutoPause";

import { DrawWorld } from "../world-view/DrawWorld";
import { DrawBounds } from "../world-view/DrawBounds";
import { DrawBodyInfo } from "../world-view/DrawBodyInfo";
import { DrawJoints } from "../world-view/DrawJoints";
import { DrawContacts } from "../world-view/DrawContacts";
import { WorldStep } from "../world-view/WorldStep";
import { WorldKeys } from "../world-view/WorldKeys";
import { findAll, findOne } from "../common/FindLabel";
import { TextOverlay } from "../gl/TextOverlay";
import { PullTool } from "../world-play/PullTool";
import { ImpulseTool } from "../world-play/ImpulseTool";
import { InspectTool } from "../world-inspect/InspectTool";
import { SelectionManager } from "../world-inspect/SelectionManager";
import { WorldQuery } from "../world-view/WorldQuery";
import { DefaultTool } from "./DefaultTool";
import { TestbedContext } from "./TestbedContext";
import { ConsoleManager } from "./ConsoleManager";
import { TestbedInterface } from "./TestbedInterface";
import { GLDraw } from "../gl/GLDraw";
import { FrameLoopEvent } from "./FrameLoop";

/** Testbed with preset middleware */
export class TestbedMain extends Middleware<TestbedContext> implements TestbedInterface {
  // backs the public draw*() API below, for user-authored scenario scripts
  private draw = new GLDraw();

  constructor() {
    super();

    this.use(this.draw);
    this.use(new WorldQuery());

    this.use(new FrameLoop());
    this.use(new ContainerLoader());

    this.use(new WorldStep());
    this.use(new AutoPause());

    this.use(new ConsoleManager());

    this.use(new KeyboardManager());

    // CameraTransform must precede GLLoader: both handle "frame-before", and GLLoader reads
    // context.worldMatrix (written by CameraTransform) to compute pixelPerUnit/pointerRadius.
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

  /** callback, to be implemented by user */
  step?: (dt: number, t: number) => void;
  /** callback, to be implemented by user */
  keydown?: (keyCode: number, label: string) => void;
  /** callback, to be implemented by user */
  keyup?: (keyCode: number, label: string) => void;

  private handleFrameUpdate = (ev: FrameLoopEvent) => {
    if (this.context.paused.value) return;
    if (!this.context.world.value) return;
    this.step?.(ev.dt, ev.now);
  };

  private handleKeydown = (ev: KeyboardEvent) => {
    if (this.context.paused.value) return;
    this.keydown?.(ev.keyCode, String.fromCharCode(ev.keyCode));
  };

  private handleKeyup = (ev: KeyboardEvent) => {
    if (this.context.paused.value) return;
    this.keyup?.(ev.keyCode, String.fromCharCode(ev.keyCode));
  };

  color(r: number, g: number, b: number): string {
    r = (r * 255) | 0;
    g = (g * 255) | 0;
    b = (b * 255) | 0;
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  findOne(query: string): Body | Joint | Fixture | null {
    const world = this.context.world.value;
    return world ? findOne(world, query) : null;
  }

  findAll(query: string): (Body | Joint | Fixture)[] {
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
  set width(value: number) {
    this.context.camera.width = value;
  }

  get height() {
    return this.context.camera.height;
  }
  set height(value: number) {
    this.context.camera.height = value;
  }

  get x() {
    return this.context.camera.x;
  }
  set x(value: number) {
    this.context.camera.x = value;
  }

  // planck 1's testbed measured y downwards: `testbed.y = -20` centers the view on world y = 20
  get y() {
    return -this.context.camera.y;
  }
  set y(value: number) {
    this.context.camera.y = -value;
  }

  get background() {
    return this.context.style.background;
  }

  set background(value: string) {
    this.context.style.background = value;
  }

  scaleY: number;
  get hz() {
    return this.context.simulation.hz;
  }
  set hz(value: number) {
    this.context.simulation.hz = value;
  }

  get speed() {
    return this.context.simulation.speed;
  }
  set speed(value: number) {
    this.context.simulation.speed = value;
  }

  get mouseForce() {
    return this.context.mouseForce.value as number;
  }

  set mouseForce(value: number) {
    this.context.mouseForce.value = value;
  }

  get activeKeys() {
    return this.context.activeKeys;
  }

  start(world: World): void {
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

  set world(world: World) {
    this.context.world.value = world;
  }

  drawPoint(p: Vec2Value, r: number, color: string): void {
    this.draw.drawPoint(p, r, color);
  }

  drawCircle(p: Vec2Value, r: number, color: string): void {
    this.draw.drawCircle(p, r, color);
  }

  drawCapsule(a: Vec2Value, b: Vec2Value, r: number, color: string): void {
    this.draw.drawCapsule(a, b, r, color);
  }

  drawEdge(a: Vec2Value, b: Vec2Value, color: string): void {
    this.draw.drawEdge(a, b, color);
  }

  drawSegment(a: Vec2Value, b: Vec2Value, color: string): void {
    this.draw.drawEdge(a, b, color);
  }

  drawPolygon(points: Array<Vec2Value>, color: string): void {
    this.draw.drawPolygon(points, color);
  }

  drawChain(points: Array<Vec2Value>, color: string): void {
    this.draw.drawChain(points, color);
  }

  drawAABB(aabb: AABBValue, color: string): void {
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

  info(text: string): void {
    this.context.console?.info(text);
  }

  status(name: string, value: any): void;
  status(value: object | string): void;
  status(a: any, b?: any) {
    this.context.console?.status(a, b);
  }
}
