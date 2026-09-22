import { type AABBValue, type Vec2Value, type World, type Body, type Fixture, type Joint } from "planck";

export interface Style {
  stroke?: string;
  fill?: string;
  lineWidth?: number;
}

export type StepEvent = {
  /** seconds */
  timeStep: number;
  velocityIterations: number;
  positionIterations: number;
};

export type StepCallback = (ev: StepEvent) => void;
export type FrameCallback = () => void;
export type KeyupCallback = (ev: KeyboardEvent) => void;
export type KeydownCallback = (ev: KeyboardEvent) => void;

/** `left`, `right`, `up`, `down`, `fire` (space or enter), and letters and digits by character */
export type ActiveKeys = Record<string, boolean>;

/**
 * What a scenario script gets from `Testbed.mount()`: planck's TestbedInterface (src/util/Testbed)
 * plus the frame and step events.
 */
export interface TestbedInterface {
  /** World viewbox width. */
  width: number;
  /** World viewbox height. */
  height: number;
  /** World viewbox center vertical offset. */
  x: number;
  /** World viewbox center horizontal offset. */
  y: number;
  /** @hidden */
  scaleY: number;
  /** World simulation step frequency */
  hz: number;
  /** World simulation speed, default is 1 */
  speed: number;
  background: string;
  mouseForce?: number;

  activeKeys: ActiveKeys;

  /** callback, to be implemented by user */
  step?: (dt: number, t: number) => void;
  /** callback, to be implemented by user */
  keydown?: (keyCode: number, label: string) => void;
  /** callback, to be implemented by user */
  keyup?: (keyCode: number, label: string) => void;

  status(name: string, value: any): void;
  status(value: object | string): void;
  info(text: string): void;

  color(r: number, g: number, b: number): string;

  drawPoint(p: Vec2Value, r: any, color: string): void;
  drawCircle(p: Vec2Value, r: number, color: string): void;
  drawCapsule(a: Vec2Value, b: Vec2Value, r: number, color: string): void;
  drawEdge(a: Vec2Value, b: Vec2Value, color: string): void;
  drawSegment(a: Vec2Value, b: Vec2Value, color: string): void;
  drawPolygon(points: Array<Vec2Value>, color: string): void;
  drawChain(points: Array<Vec2Value>, color: string): void;
  drawAABB(aabb: AABBValue, color: string): void;

  start(world: World): void;

  findOne(query: string): Body | Joint | Fixture | null;
  findAll(query: string): (Body | Joint | Fixture)[];

  on(name: "step-before", listener: StepCallback): void;
  on(name: "step-after", listener: StepCallback): void;
  on(name: "frame-update", listener: FrameCallback): void;
  on(name: "frame-render", listener: FrameCallback): void;
  on(name: "keydown", listener: KeyupCallback): void;
  on(name: "keyup", listener: KeydownCallback): void;
}
