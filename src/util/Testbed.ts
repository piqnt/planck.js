import type { AABBValue } from "../collision/AABB";
import type { World } from "../dynamics/World";
import type { Joint } from "../dynamics/Joint";
import type { Fixture } from "../dynamics/Fixture";
import type { Body } from "../dynamics/Body";

export interface Style {
  stroke?: string;
  fill?: string;
  lineWidth?: number;
}

type KEY = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" |
  "8" | "9" | "A" | "B" | "C" | "D" | "E" | "F" | "G" |
  "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" |
  "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" |
  "Z" | "right" | "left" | "up" | "down" | "fire";

export type ActiveKeys = { [key in KEY]?: boolean };

type TestbedMountOptions = { [key: string]: any };

export abstract class Testbed {
  /**
   * Mounts testbed. Call start with a world to start simulation and rendering.
   */
  static mount(options?: TestbedMountOptions): Testbed {
    throw new Error("Not implemented");
  }

  /**
   * Mounts testbed if needed, then starts simulation and rendering.
   * 
   * If you need to customize testbed before starting, first run `const testbed = Testbed.mount()` and then `testbed.start()`.
   */
  static start(world: World): Testbed {
    const testbed = Testbed.mount();
    testbed.start(world);
    return testbed;
  }

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

  abstract status(name: string, value: any): void;
  abstract status(value: object | string): void;

  abstract info(text: string): void;

  color(r: number, g: number, b: number): string {
    r = r * 256 | 0;
    g = g * 256 | 0;
    b = b * 256 | 0;
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  abstract drawPoint(p: {x: number, y: number}, r: any, color: string): void;
  abstract drawCircle(p: {x: number, y: number}, r: number, color: string): void;
  abstract drawEdge(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
  abstract drawSegment(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
  abstract drawPolygon(points: Array<{x: number, y: number}>, color: string): void;
  abstract drawAABB(aabb: AABBValue, color: string): void;

  abstract start(world: World): void;

  abstract findOne(query: string): (Body | Joint | Fixture | null);
  abstract findAll(query: string): (Body | Joint | Fixture)[];
}

type TestbedFactoryOptions = string | TestbedMountOptions;

/** @deprecated */
type TestbedCallback = (testbed: Testbed) => (World | undefined);

/** @deprecated */
export function testbed(callback: TestbedCallback): void;
/** @deprecated */
export function testbed(options: TestbedFactoryOptions, callback: TestbedCallback): void;
/** @internal */
export function testbed(a?: any, b?: any) {
  let callback: TestbedCallback | undefined;
  let options;
  if (typeof a === "function") {
    callback = a;
    options = b;
  } else if (typeof b === "function") {
    callback = b;
    options = a;
  } else {
    options = a ?? b;
  }
  const testbed = Testbed.mount(options);
  if (callback) {
    // this is for backwards compatibility
    const world = callback(testbed) || (testbed as any).world;
    testbed.start(world);
  } else {
    return testbed;
  }
}
