import Stage from 'stage-js';

export * from '../src/index';

import {
  AABB,
  MouseJoint,
  Vec2,
} from '../src';

import type {
  Body,
  Fixture,
  Joint,
  World,
  EdgeShape,
  PolygonShape,
  ChainShape,
  CircleShape,
} from '../src';

interface Point {
  x: number;
  y: number;
}

interface Style {
  stroke?: string;
  fill?: string;
}

const getStyle = function(obj: Body | Fixture | Joint): Style {
  return obj['render'] ?? obj['style'] ?? {};
};

interface Options {
  speed: number;
  hz: number;
  scaleY: number;
  ratio: number;
  lineWidth: number;
  stroke: string | undefined;
  fill: string | undefined;
}

type KEY = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' |
  '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
  'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' |
  'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' |
  'Z' | 'right' | 'left' | 'up' | 'down' | 'fire';

export type ActiveKeys = { [key in KEY]?: boolean };

function findBody(world: World, point: Point) {
  let body: Body | null = null;
  const aabb = new AABB(point, point);
  world.queryAABB(aabb, (fixture: Fixture) => {
    if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
      return true;
    }
    body = fixture.getBody();
    return false;
  });
  return body;
}

// status.innerText = '';
// info.innerText = '';

export class Testbed {
  // camera position

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

  private canvas: any;
  private stage: any;
  private paused: boolean = false;
  private lastDrawHash = "";
  private newDrawHash = "";
  private buffer: ((context: CanvasRenderingContext2D, ratio: number)=> void)[] = [];

  start = (world: World) => {
    const stage = this.stage = Stage.mount();
    const canvas = this.canvas = stage.dom as HTMLCanvasElement;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const testbed = this;
    this.canvas = canvas;

    stage.on(Stage.Mouse.START, () => {
      window.focus();
      // @ts-ignore
      document.activeElement?.blur();
      canvas.focus();
    });

    (stage as any).MAX_ELAPSE = 1000 / 30;

    stage.on('resume', () => {
      this.paused = false;
      this._resume();
    });
    stage.on('pause', () => {
      this.paused = true;
      this._pause();
    });

    const drawingTexture = new Stage.Texture();
    stage.append(Stage.sprite(drawingTexture));
    stage.tick(() => {
      this.buffer.length = 0;
    }, true);

    drawingTexture.draw = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.transform(1, 0, 0, this.scaleY, -this.x, -this.y);
      ctx.lineWidth = 2  / this.ratio;
      ctx.lineCap = 'round';
      for (let drawing = this.buffer.shift(); drawing; drawing = this.buffer.shift()) {
        drawing(ctx, this.ratio);
      }
      ctx.restore();
    };

    const worldNode = new PlanckStageNode(world, this);

    let lastX = 0;
    let lastY = 0;
    stage.tick((dt: number, t: number) => {
      // update camera position
      if (lastX !== this.x || lastY !== this.y) {
        worldNode.offset(-this.x, -this.y);
        lastX = this.x;
        lastY = this.y;
      }
    });

    worldNode.tick((dt: number, t: number) => {
      this.step(dt, t);

      if (targetBody) {
        this.drawSegment(targetBody.getPosition(), mouseMove, 'rgba(255,255,255,0.2)');
      }

      if (this.lastDrawHash !== this.newDrawHash) {
        this.lastDrawHash = this.newDrawHash;
        stage.touch();
      }
      this.newDrawHash = "";

      return true;
    });

    // stage.empty();
    stage.background(this.background);
    stage.viewbox(this.width, this.height);
    stage.pin('alignX', -0.5);
    stage.pin('alignY', -0.5);
    stage.prepend(worldNode);

    const mouseGround = world.createBody();
    let mouseJoint: MouseJoint | null = null;
    let targetBody: Body | null = null;
    const mouseMove = {x: 0, y: 0};

    worldNode.attr('spy', true);

    worldNode.on(Stage.Mouse.START, (point: Point) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (targetBody) {
        return;
      }

      const body = findBody(world, point);
      if (!body) {
        return;
      }

      if (this.mouseForce) {
        targetBody = body;

      } else {
        mouseJoint = new MouseJoint({maxForce: 1000}, mouseGround, body, Vec2.clone(point));
        world.createJoint(mouseJoint);
      }
    });

    worldNode.on(Stage.Mouse.MOVE, (point: Point) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

      mouseMove.x = point.x;
      mouseMove.y = point.y;
    });

    worldNode.on(Stage.Mouse.END, (point: Point) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody && this.mouseForce) {
        const force = Vec2.sub(point, targetBody.getPosition());
        targetBody.applyForceToCenter(force.mul(this.mouseForce), true);
        targetBody = null;
      }
    });

    worldNode.on(Stage.Mouse.CANCEL, (point: Point) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        targetBody = null;
      }
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 'P'.charCodeAt(0):
          this.togglePause();
          break;
      }
    }, false);

    const activeKeys = testbed.activeKeys;
    const downKeys: Record<number, boolean> = {};
    function updateActiveKeys(keyCode: number, down: boolean) {
      const char = String.fromCharCode(keyCode) as KEY;
      if (/\w/.test(char)) {
        activeKeys[char] = down;
      }
      activeKeys.right = downKeys[39] || activeKeys['D'];
      activeKeys.left = downKeys[37] || activeKeys['A'];
      activeKeys.up = downKeys[38] || activeKeys['W'];
      activeKeys.down = downKeys[40] || activeKeys['S'];
      activeKeys.fire = downKeys[32] || downKeys[13] ;
    }

    window.addEventListener("keydown", function(e) {
      const keyCode = e.keyCode;
      downKeys[keyCode] = true;
      updateActiveKeys(keyCode, true);
      testbed.keydown && testbed.keydown(keyCode, String.fromCharCode(keyCode));
    });
    window.addEventListener("keyup", function(e) {
      const keyCode = e.keyCode;
      downKeys[keyCode] = false;
      updateActiveKeys(keyCode, false);
      testbed.keyup && testbed.keyup(keyCode, String.fromCharCode(keyCode));
    });

    this.resume();
  }

  /** @private @internal */
  focus = () => {
    // @ts-ignore
    document.activeElement && document.activeElement.blur();
    this.canvas.focus();
  };

  /** @internal */
  _pause = () => {
  };

  /** @internal */
  _resume = () => {
  };

  /** @internal */
  _status = (string: string) => {
  };

  /** @internal */  
  _info = (text: string) => {
  };

  /** @internal */
  isPaused = () => {
    return this.paused;
  };

  /** @internal */
  togglePause = () => {
    this.paused ? this.resume() : this.pause();
  };

  /** @internal */
  pause = () => {
    this.stage.pause();
  };

  /** @internal */
  resume = () => {
    this.stage.resume();
    this.focus();
  };

  statusText = '';
  statusMap: Record<string, any> = {};

  private statusSet(name: string, value: string | number | boolean) {
    if (typeof value !== 'function' && typeof value !== 'object') {
      this.statusMap[name] = value;
    }
  }

  status(name: string, value: any): void;
  status(value: object | string): void;
  status(a: any, b?: any) {
    if (typeof b !== 'undefined') {
      this.statusSet(a, b);
    } else if (a && typeof a === 'object') {
      // tslint:disable-next-line:no-for-in
      for (const key in a) {
        this.statusSet(key, a[key]);
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

  info = (text: string): void => {
    this._info(text);
  };

  drawPoint = (p: {x: number, y: number}, r: any, color: string): void => {
    this.buffer.push(function(ctx, ratio) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5  / ratio, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "point" + p.x + ',' + p.y + ',' + r + ',' + color;
  };

  drawCircle = (p: {x: number, y: number}, r: number, color: string): void => {
    this.buffer.push(function(ctx) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "circle" + p.x + ',' + p.y + ',' + r + ',' + color;
  };

  drawEdge = (a: {x: number, y: number}, b: {x: number, y: number}, color: string): void => {
    this.buffer.push(function(ctx) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "segment" + a.x + ',' + a.y + ',' + b.x + ',' + b.y + ',' + color;
  };

  drawSegment = this.drawEdge;

  drawPolygon = (points: Array<{x: number, y: number}>, color: string): void => {
    if (!points || !points.length) {
      return;
    }
    this.buffer.push(function(ctx) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = color;
      ctx.closePath();
      ctx.stroke();
    });
    this.newDrawHash += "segment";
    for (let i = 1; i < points.length; i++) {
      this.newDrawHash += points[i].x + ',' + points[i].y + ',';
    }
    this.newDrawHash += color;
  };

  drawAABB = (aabb: AABB, color: string): void => {
    this.buffer.push(function(ctx) {
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
    this.newDrawHash += aabb.lowerBound.x + ',' + aabb.lowerBound.y + ',';
    this.newDrawHash += aabb.upperBound.x + ',' + aabb.upperBound.y + ',';
    this.newDrawHash += color;
  };

  color = function(r: number, g: number, b: number): string {
    r = r * 256 | 0;
    g = g * 256 | 0;
    b = b * 256 | 0;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };

  findOne = (query: string): (Body | Joint | Fixture | null) => {
    // todo: implement
    return null;
  };

  findAll = (query: string): (Body | Joint | Fixture)[] => {
    // todo: implement
    return [];
  };
}

class PlanckStageNode extends Stage.Node {
  private nodes = new WeakMap<Body | Fixture | Joint, Stage.Node>();

  private options: Options = {
    speed: 1,
    hz: 60,
    scaleY: -1,
    ratio: 16,
    lineWidth: 1,
    stroke: undefined,
    fill: undefined
  };

  private world: World;

  constructor(world: World, opts: Partial<Options> = {}) {
    super();
    this.label('Planck');

    this.options.speed = opts.speed ?? this.options.speed;
    this.options.hz = opts.hz ?? this.options.speed;
    if (Math.abs(this.options.hz) < 1) {
      this.options.hz = 1 / this.options.hz;
    }
    this.options.scaleY = opts.scaleY ?? this.options.scaleY;
    this.options.ratio = opts.ratio ?? this.options.ratio;
    this.options.lineWidth = 2 / this.options.ratio;

    this.world = world;

    const timeStep = 1 / this.options.hz;
    let elapsedTime = 0;
    let errored = false;
    this.tick((dt: number) => {
      if (errored) {
        return false;
      }
      try {
        dt = dt * 0.001 * this.options.speed;
        elapsedTime += dt;
        while (elapsedTime > timeStep) {
          world.step(timeStep);
          elapsedTime -= timeStep;
        }
        this.renderWorld();
        return true;          
      } catch (error) {
        errored = true;
        console.error(error);
        return false;
      }
    }, true);

    world.on('remove-fixture', (obj: Fixture) => {
      this.nodes.get(obj)?.remove();
    });

    world.on('remove-joint', (obj: Joint) => {
      this.nodes.get(obj)?.remove();
    });
  }

  renderWorld = () => {
    const world = this.world;
    const options = this.options;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const viewer = this;

    for (let b = world.getBodyList(); b; b = b.getNext()) {
      for (let f = b.getFixtureList(); f; f = f.getNext()) {

        let node = this.nodes.get(f);
        const fstyle = getStyle(f);
        const bstyle = getStyle(b);
        if (!node) {
          if (fstyle && fstyle.stroke) {
            options.stroke = fstyle.stroke;
          } else if (bstyle && bstyle.stroke) {
            options.stroke = bstyle.stroke;
          } else if (b.isDynamic()) {
            options.stroke = 'rgba(255,255,255,0.9)';
          } else if (b.isKinematic()) {
            options.stroke = 'rgba(255,255,255,0.7)';
          } else if (b.isStatic()) {
            options.stroke = 'rgba(255,255,255,0.5)';
          }

          if (fstyle && fstyle.fill) {
            options.fill = fstyle.fill;
          } else if (bstyle && bstyle.fill) {
            options.fill = bstyle.fill;
          } else {
            options.fill = '';
          }

          const type = f.getType();
          const shape = f.getShape();
          if (type == 'circle') {
            node = viewer.drawCircle(shape as CircleShape, options);
          }
          if (type == 'edge') {
            node = viewer.drawEdge(shape as EdgeShape, options);
          }
          if (type == 'polygon') {
            node = viewer.drawPolygon(shape as PolygonShape, options);
          }
          if (type == 'chain') {
            node = viewer.drawChain(shape as ChainShape, options);
          }

          if (node) {
            node.appendTo(viewer);
            this.nodes.set(f, node);
          }
        }

        if (node) {
          const p = b.getPosition();
          const r = b.getAngle();
          // @ts-ignore
          const isChanged = node.__lastX !== p.x || node.__lastY !== p.y || node.__lastR !== r;
          if (isChanged) {
            // @ts-ignore
            node.__lastX = p.x;
            // @ts-ignore
            node.__lastY = p.y;
            // @ts-ignore
            node.__lastR = r;
            node.offset(p.x, options.scaleY * p.y);
            node.rotate(options.scaleY * r);
          }
        }

      }
    }

    for (let j = world.getJointList(); j; j = j.getNext()) {
      const type = j.getType();
      const a = j.getAnchorA();
      const b = j.getAnchorB();

      let node = this.nodes.get(j);
      if (!node) {
        options.stroke = 'rgba(255,255,255,0.2)';

        node = viewer.drawJoint(j, options);
        node.pin('handle', 0.5);
        node.appendTo(viewer);
        this.nodes.set(j, node);
      }

      if (node) {
        const cx = (a.x + b.x) * 0.5;
        const cy = options.scaleY * (a.y + b.y) * 0.5;
        const dx = a.x - b.x;
        const dy = options.scaleY * (a.y - b.y);
        const d = Math.sqrt(dx * dx + dy * dy);
        node.width(d);
        node.rotate(Math.atan2(dy, dx));
        node.offset(cx, cy);
      }
    }
  }

  drawJoint = (joint: Joint, options: Options) => {
    const lw = options.lineWidth;
    const ratio = options.ratio;

    const length = 10;

    const texture = Stage.canvas(function (ctx) {
      // @ts-ignore
      this.size(length + 2 * lw, 2 * lw, ratio);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      ctx.moveTo(lw, lw);
      ctx.lineTo(lw + length, lw);

      ctx.lineCap = 'round';
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.stroke ?? '';
      ctx.stroke();
    });

    const image = Stage.sprite(texture).stretch();
    return image;
  }

  drawCircle = (shape: CircleShape, options: Options) => {
    const lw = options.lineWidth;
    const ratio = options.ratio;

    const r = shape.m_radius;
    const cx = r + lw;
    const cy = r + lw;
    const w = r * 2 + lw * 2;
    const h = r * 2 + lw * 2;

    const texture = Stage.canvas(function (ctx) {
      // @ts-ignore
      this.size(w, h, ratio);

      ctx.scale(ratio, ratio);
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      if (options.fill) {
        ctx.fillStyle = options.fill;
        ctx.fill();
      }
      ctx.lineTo(cx, cy);
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.stroke ?? '';
      ctx.stroke();
    });
    const image = Stage.sprite(texture)
      .offset(shape.m_p.x - cx, options.scaleY * shape.m_p.y - cy);
    const node = Stage.create().append(image);
    return node;
  }

  drawEdge = (edge: EdgeShape, options: Options) => {
    const lw = options.lineWidth;
    const ratio = options.ratio;

    const v1 = edge.m_vertex1;
    const v2 = edge.m_vertex2;

    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;

    const length = Math.sqrt(dx * dx + dy * dy);

    const texture = Stage.canvas(function (ctx) {
      // @ts-ignore
      this.size(length + 2 * lw, 2 * lw, ratio);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      ctx.moveTo(lw, lw);
      ctx.lineTo(lw + length, lw);

      ctx.lineCap = 'round';
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.stroke ?? '';
      ctx.stroke();
    });

    const minX = Math.min(v1.x, v2.x);
    const minY = Math.min(options.scaleY * v1.y, options.scaleY * v2.y);

    const image = Stage.sprite(texture);
    image.rotate(options.scaleY * Math.atan2(dy, dx));
    image.offset(minX - lw, minY - lw);
    const node = Stage.create().append(image);
    return node;
  }

  drawPolygon = (shape: PolygonShape, options: Options) => {
    const lw = options.lineWidth;
    const ratio = options.ratio;

    const vertices = shape.m_vertices;

    if (!vertices.length) {
      return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < vertices.length; ++i) {
      const v = vertices[i];
      minX = Math.min(minX, v.x);
      maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, options.scaleY * v.y);
      maxY = Math.max(maxY, options.scaleY * v.y);
    }

    const width = maxX - minX;
    const height = maxY - minY;

    const texture = Stage.canvas(function (ctx: CanvasRenderingContext2D) {
      // @ts-ignore
      this.size(width + 2 * lw, height + 2 * lw, ratio);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      for (let i = 0; i < vertices.length; ++i) {
        const v = vertices[i];
        const x = v.x - minX + lw;
        const y = options.scaleY * v.y - minY + lw;
        if (i == 0)
          ctx.moveTo(x, y);

        else
          ctx.lineTo(x, y);
      }

      if (vertices.length > 2) {
        ctx.closePath();
      }

      if (options.fill) {
        ctx.fillStyle = options.fill;
        ctx.fill();
        ctx.closePath();
      }

      ctx.lineCap = 'round';
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.stroke ?? '';
      ctx.stroke();
    });

    const image = Stage.sprite(texture);
    image.offset(minX - lw, minY - lw);
    const node = Stage.create().append(image);
    return node;
  }

  drawChain = (shape: ChainShape, options: Options) => {
    const lw = options.lineWidth;
    const ratio = options.ratio;

    const vertices = shape.m_vertices;

    if (!vertices.length) {
      return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < vertices.length; ++i) {
      const v = vertices[i];
      minX = Math.min(minX, v.x);
      maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, options.scaleY * v.y);
      maxY = Math.max(maxY, options.scaleY * v.y);
    }

    const width = maxX - minX;
    const height = maxY - minY;

    const texture = Stage.canvas(function (ctx) {
      // @ts-ignore
      this.size(width + 2 * lw, height + 2 * lw, ratio);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      for (let i = 0; i < vertices.length; ++i) {
        const v = vertices[i];
        const x = v.x - minX + lw;
        const y = options.scaleY * v.y - minY + lw;
        if (i == 0)
          ctx.moveTo(x, y);

        else
          ctx.lineTo(x, y);
      }

      // TODO: if loop
      if (vertices.length > 2) {
        // ctx.closePath();
      }

      if (options.fill) {
        ctx.fillStyle = options.fill;
        ctx.fill();
        ctx.closePath();
      }

      ctx.lineCap = 'round';
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.stroke ?? '';
      ctx.stroke();
    });

    const image = Stage.sprite(texture);
    image.offset(minX - lw, minY - lw);
    const node = Stage.create().append(image);
    return node;
  }
}

const tb = new Testbed();

type TestbedOptions = string | Record<string, any>;

/** @deprecated */
type TestbedCallback = (testbed?: Testbed) => (World | undefined);

/** @deprecated */
export function testbed(callback: TestbedCallback): void;
/** @deprecated */
export function testbed(options: TestbedOptions, callback: TestbedCallback): void;
export function testbed(options?: TestbedOptions): Testbed;
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
  if (callback) {
    // this is for backwards compatibility
    const world = callback(tb);
    tb.start(world);
  } else {
    return tb;
  }
}
