import type { AABBValue } from "../collision/AABB";
import type { World } from "../dynamics/World";
import type { Joint } from "../dynamics/Joint";
import type { Fixture } from "../dynamics/Fixture";
import type { Body } from "../dynamics/Body";

export interface Style {
  stroke?: string;
  fill?: string;
}

type KEY = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' |
  '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
  'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' |
  'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' |
  'Z' | 'right' | 'left' | 'up' | 'down' | 'fire';

export type ActiveKeys = { [key in KEY]?: boolean };

type TestbedMountOptions = {};

export abstract class Testbed {
  /**
   * Mount testbed.
   * 
   * If you need to customize testbed before starting, use `Testbed.mount()` and `Testbed.start()` separately.
   */
  static mount(options?: TestbedMountOptions): Testbed {
    throw new Error('Not implemented');
  }

  /**
   * Start simulation, and mount testbed if needed.
   * 
   * If you need to customize testbed before starting, use `Testbed.mount().start()` separately.
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

  scaleY: number = -1;

  /** World simulation step frequency */
  hz: number = 60;

  /** World simulation speed, default is 1 */
  speed: number = 1;

  ratio: number = 16;
  background: string = '#222222';

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

  private statusText = '';
  private statusMap: Record<string, any> = {};

  status(name: string, value: any): void;
  status(value: object | string): void;
  status(a: any, b?: any) {
    if (typeof b !== 'undefined') {
      const key = a;
      const value = b;
      if (typeof value !== 'function' && typeof value !== 'object') {
        this.statusMap[key] = value;
      }
    } else if (a && typeof a === 'object') {
      // tslint:disable-next-line:no-for-in
      for (const key in a) {
        const value = a[key];
        if (typeof value !== 'function' && typeof value !== 'object') {
          this.statusMap[key] = value;
        }
      }
    } else if (typeof a === 'string') {
      this.statusText = a;
    }

    var newline = '\n';
    var text = this.statusText || '';
    for (var key in this.statusMap) {
      var value = this.statusMap[key];
      if (typeof value === 'function') continue;
      text += (text && newline) + key + ': ' + value;
    }

    this._status(text);
  }

  info(text: string): void {
    this._info(text);
  }

  color(r: number, g: number, b: number): string {
    r = r * 256 | 0;
    g = g * 256 | 0;
    b = b * 256 | 0;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  abstract drawPoint(p: {x: number, y: number}, r: any, color: string): void;
  abstract drawCircle(p: {x: number, y: number}, r: number, color: string): void;
  abstract drawEdge(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
  abstract drawSegment(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
  abstract drawPolygon(points: Array<{x: number, y: number}>, color: string): void;
  abstract drawAABB(aabb: AABBValue, color: string): void;

  abstract start(world: World): void;

  /** @internal */
  abstract _pause(): void;

  /** @internal */
  abstract _resume(): void;

  /** @internal */
  abstract _status(string: string): void;

  /** @internal */  
  abstract _info(text: string): void;

  abstract findOne(query: string): (Body | Joint | Fixture | null);
  abstract findAll(query: string): (Body | Joint | Fixture)[];
}

type TestbedFactoryOptions = string | {};

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
  if (typeof a === 'function') {
    callback = a;
    options = b;
  } else if (typeof b === 'function') {
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
