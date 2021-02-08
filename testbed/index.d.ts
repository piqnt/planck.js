import { AABB } from "../lib/collision";
import { Body, Fixture, Joint, World } from "../lib";

export interface Testbed {
  width: number;
  height: number;
  x: number;
  y: number;
  scaleY: number;
  ratio: number;
  hz: number;
  speed: number;
  activeKeys: {
    0?: boolean;
    1?: boolean;
    2?: boolean;
    3?: boolean;
    4?: boolean;
    5?: boolean;
    6?: boolean;
    7?: boolean;
    8?: boolean;
    9?: boolean;
    A?: boolean;
    B?: boolean;
    C?: boolean;
    D?: boolean;
    E?: boolean;
    F?: boolean;
    G?: boolean;
    H?: boolean;
    I?: boolean;
    J?: boolean;
    K?: boolean;
    L?: boolean;
    M?: boolean;
    N?: boolean;
    O?: boolean;
    P?: boolean;
    Q?: boolean;
    R?: boolean;
    S?: boolean;
    T?: boolean;
    U?: boolean;
    V?: boolean;
    W?: boolean;
    X?: boolean;
    Y?: boolean;
    Z?: boolean;
    right?: boolean;
    left?: boolean;
    up?: boolean;
    down?: boolean;
    fire?: boolean;
  };
  background: string;

  mouseForce?: number;

  status(name: string, value: any): void;
  status(a: object): void;
  status(a: string): void;
  info(text: string): void;

  drawPoint(p: {x: number, y: number}, r: any, color: string): void;
  drawCircle(p: {x: number, y: number}, r: number, color: string): void;
  drawSegment(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
  drawPolygon(points: {x: number, y: number}[], color: string): void;
  drawAABB(aabb: AABB, color: string): void;
  color(r: number, g: number, b: number): string;

  // callbacks
  step?: (dt: number, t: number) => void;
  keydown?: (keyCode: number, label: string) => void;
  keyup?: (keyCode: number, label: string) => void;

  findOne: (query: string) => Body | Joint | Fixture | null;
  findAll: (query: string) => Body[] | Joint[] | Fixture[];
}

export function testbed(opts: any, callback: (testbed: Testbed) => World): Testbed;
export function testbed(callback: (testbed: Testbed) => World): Testbed;
