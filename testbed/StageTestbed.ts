import Stage from 'stage-js';

import type { Vec2Value } from '../src/common/Vec2';
import type { World } from "../src/dynamics/World";
import type { Joint } from "../src/dynamics/Joint";
import type { Fixture } from "../src/dynamics/Fixture";
import type { Body } from "../src/dynamics/Body";
import type { AABBValue } from "../src/collision/AABB";
import type { Style } from '../src/util/Testbed';
import { Testbed } from '../src/util/Testbed';
import type { EdgeShape } from "../src/collision/shape/EdgeShape";
import type { PolygonShape } from "../src/collision/shape/PolygonShape";
import type { ChainShape } from "../src/collision/shape/ChainShape";
import type { CircleShape } from "../src/collision/shape/CircleShape";
import type { PulleyJoint } from "../src/dynamics/joint/PulleyJoint";
import { MouseJoint } from "../src/dynamics/joint/MouseJoint";

const math_atan2 = Math.atan2;
const math_abs = Math.abs;
const math_sqrt = Math.sqrt;
const math_PI = Math.PI;
const math_max = Math.max;
const math_min = Math.min;


let mounted: StageTestbed | null = null;

Testbed.mount = () => {
  if (mounted) {
    return mounted;
  }

  mounted = new StageTestbed();

  // todo: merge rest of this into StageTestbed

  // todo: should we create these elements if not exists?
  const playButton = document.getElementById('testbed-play');
  const statusElement = document.getElementById('testbed-status');
  const infoElement = document.getElementById('testbed-info');

  playButton.addEventListener('click', () => {
    mounted.isPaused() ? mounted.resume() : mounted.pause();
  });

  mounted._pause = () => {
    playButton.classList.add('pause');
    playButton.classList.remove('play');
  };

  mounted._resume = () => {
    playButton.classList.add('play');
    playButton.classList.remove('pause');
  };

  let lastStatus = '';
  statusElement.innerText = lastStatus;
  mounted._status = (text: string) => {
    if (lastStatus === text) {
      return;
    }
    lastStatus = text;
    if (statusElement) {
      statusElement.innerText = text;
    }
  };

  let lastInfo = '';
  infoElement.innerText = lastInfo;
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

const getStyle = function(obj: Body | Fixture | Joint): Style {
  return obj['render'] ?? obj['style'] ?? {};
};

function findBody(world: World, point: Vec2Value) {
  let body: Body | null = null;
  const aabb = {
    lowerBound: point,
    upperBound: point,
  };
  world.queryAABB(aabb, (fixture: Fixture) => {
    if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
      return true;
    }
    body = fixture.getBody();
    return false;
  });
  return body;
}

/** @internal */
class StageTestbed extends Testbed {
  private canvas: any;
  private stage: any;
  private paused: boolean = false;
  private lastDrawHash = "";
  private newDrawHash = "";
  private buffer: ((context: CanvasRenderingContext2D, ratio: number)=> void)[] = [];

  start(world: World) {
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

    stage.background(this.background);
    stage.viewbox(this.width, this.height);
    stage.pin('alignX', -0.5);
    stage.pin('alignY', -0.5);

    const worldNode = new  WorldStageNode(world, this);

    // stage.empty();
    stage.prepend(worldNode);

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

    const mouseGround = world.createBody();
    let mouseJoint: MouseJoint | null = null;
    let targetBody: Body | null = null;
    const mouseMove = {x: 0, y: 0};

    worldNode.attr('spy', true);

    worldNode.on(Stage.Mouse.START, (point: Vec2Value) => {
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
        mouseJoint = new MouseJoint({maxForce: 1000}, mouseGround, body, { x: point.x, y: point.y });
        world.createJoint(mouseJoint);
      }
    });

    worldNode.on(Stage.Mouse.MOVE, (point: Vec2Value) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

      mouseMove.x = point.x;
      mouseMove.y = point.y;
    });

    worldNode.on(Stage.Mouse.END, (point: Vec2Value) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
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
    });

    worldNode.on(Stage.Mouse.CANCEL, (point: Vec2Value) => {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        targetBody = null;
      }
    });

    const activeKeys = testbed.activeKeys;
    const downKeys: Record<number, boolean> = {};
    function updateActiveKeys(keyCode: number, down: boolean) {
      const char = String.fromCharCode(keyCode);
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
  focus() {
    // @ts-ignore
    document.activeElement && document.activeElement.blur();
    this.canvas.focus();
  }

  /** @internal */
  _pause() {
  }

  /** @internal */
  _resume() {
  }

  /** @internal */
  _status(string: string) {
  }

  /** @internal */  
  _info(text: string) {
  }

  /** @internal */
  isPaused() {
    return this.paused;
  }

  /** @internal */
  togglePause() {
    this.paused ? this.resume() : this.pause();
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

  drawPoint(p: {x: number, y: number}, r: any, color: string): void {
    this.buffer.push(function(ctx, ratio) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5  / ratio, 0, 2 * math_PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "point" + p.x + ',' + p.y + ',' + r + ',' + color;
  }

  drawCircle(p: {x: number, y: number}, r: number, color: string): void {
    this.buffer.push(function(ctx) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, 2 * math_PI);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "circle" + p.x + ',' + p.y + ',' + r + ',' + color;
  }

  drawEdge(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void {
    this.buffer.push(function(ctx) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
    this.newDrawHash += "segment" + a.x + ',' + a.y + ',' + b.x + ',' + b.y + ',' + color;
  }

  drawSegment = this.drawEdge;

  drawPolygon(points: Array<{x: number, y: number}>, color: string): void {
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
  }

  drawAABB(aabb: AABBValue, color: string): void {
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
  }

  findOne(query: string): (Body | Joint | Fixture | null) {
    throw new Error("Not implemented");
  }

  findAll(query: string): (Body | Joint | Fixture)[] {
    throw new Error("Not implemented");
  }
}

interface WorldStageOptions {
  speed: number;
  hz: number;
  scaleY: number;
  ratio: number;
  lineWidth: number;
  stroke: string | undefined;
  fill: string | undefined;
}

class  WorldStageNode extends Stage.Node {
  private nodes = new WeakMap<Body | Fixture | Joint, Stage.Node>();

  private options: WorldStageOptions = {
    speed: 1,
    hz: 60,
    scaleY: -1,
    ratio: 16,
    lineWidth: 1,
    stroke: undefined,
    fill: undefined
  };

  private world: World;
  private testbed: Testbed;

  constructor(world: World, opts: Partial<WorldStageOptions> = {}) {
    super();
    this.label('Planck');

    this.options.speed = opts.speed ?? this.options.speed;
    this.options.hz = opts.hz ?? this.options.speed;
    if (math_abs(this.options.hz) < 1) {
      this.options.hz = 1 / this.options.hz;
    }
    this.options.scaleY = opts.scaleY ?? this.options.scaleY;
    this.options.ratio = opts.ratio ?? this.options.ratio;
    this.options.lineWidth = 2 / this.options.ratio;

    this.world = world;
    this.testbed = opts as Testbed;

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

  renderWorld() {
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
      if (type == 'pulley-joint') {
        this.testbed.drawSegment(j.getAnchorA(), (j as PulleyJoint).getGroundAnchorA(), 'rgba(255,255,255,0.5)');
        this.testbed.drawSegment(j.getAnchorB(), (j as PulleyJoint).getGroundAnchorB(), 'rgba(255,255,255,0.5)');
        this.testbed.drawSegment((j as PulleyJoint).getGroundAnchorB(), (j as PulleyJoint).getGroundAnchorA(), 'rgba(255,255,255,0.5)');
      } else {
        this.testbed.drawSegment(j.getAnchorA(), j.getAnchorB(), 'rgba(255,255,255,0.5)');
      }
    }
  }


  drawCircle(shape: CircleShape, options: WorldStageOptions) {
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
      ctx.arc(cx, cy, r, 0, 2 * math_PI);
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

  drawEdge(edge: EdgeShape, options: WorldStageOptions) {
    const lw = options.lineWidth;
    const ratio = options.ratio;

    const v1 = edge.m_vertex1;
    const v2 = edge.m_vertex2;

    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;

    const length = math_sqrt(dx * dx + dy * dy);

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

    const minX = math_min(v1.x, v2.x);
    const minY = math_min(options.scaleY * v1.y, options.scaleY * v2.y);

    const image = Stage.sprite(texture);
    image.rotate(options.scaleY * math_atan2(dy, dx));
    image.offset(minX - lw, minY - lw);
    const node = Stage.create().append(image);
    return node;
  }

  drawPolygon(shape: PolygonShape, options: WorldStageOptions) {
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
      minX = math_min(minX, v.x);
      maxX = math_max(maxX, v.x);
      minY = math_min(minY, options.scaleY * v.y);
      maxY = math_max(maxY, options.scaleY * v.y);
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

  drawChain(shape: ChainShape, options: WorldStageOptions) {
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
      minX = math_min(minX, v.x);
      maxX = math_max(maxX, v.x);
      minY = math_min(minY, options.scaleY * v.y);
      maxY = math_max(maxY, options.scaleY * v.y);
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
