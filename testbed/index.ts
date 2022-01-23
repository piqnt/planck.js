import {
  AABB,
  Body,
  Fixture,
  Joint,
  MouseJoint,
  Vec2,
  World
} from '../src/index';
import { default as Stage } from 'stage-js/platform/web';

export interface ActiveKeys {
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
}

export interface Testbed {
  /** @private @internal */ _pause: any;
  /** @private @internal */ _resume: any;
  /** @private @internal */ _status: any;
  /** @private @internal */ _info: any;

  /** @private @internal */ resume: any;
  /** @private @internal */ pause: any;
  /** @private @internal */ isPaused: any;
  /** @private @internal */ togglePause: any;
  /** @private @internal */ canvas: any;
  /** @private @internal */ focus: () => void;

  // camera position
  /** World viewbox width. */
  width: number;
  /** World viewbox height. */
  height: number;
  /** World viewbox center vertical offset. */
  x: number;
  /** World viewbox center horizontal offset. */
  y: number;

  scaleY: number;
  ratio: number;

  /** World simulation step frequency */
  hz: number;
  /** World simulation speed, default is 1 */
  speed: number;

  activeKeys: ActiveKeys;
  background: string;

  mouseForce?: number;

  status(name: string, value: any): void;
  status(value: object | string): void;
  info(text: string): void;

  drawPoint(p: {x: number, y: number}, r: any, color: string): void;
  drawCircle(p: {x: number, y: number}, r: number, color: string): void;
  drawSegment(a: {x: number, y: number}, b: {x: number, y: number}, color: string): void;
  drawPolygon(points: Array<{x: number, y: number}>, color: string): void;
  drawAABB(aabb: AABB, color: string): void;
  color(r: number, g: number, b: number): string;

  // callbacks
  step?: (dt: number, t: number) => void;
  keydown?: (keyCode: number, label: string) => void;
  keyup?: (keyCode: number, label: string) => void;

  findOne: (query: string) => Body | Joint | Fixture | null;
  findAll: (query: string) => Body[] | Joint[] | Fixture[];
}

export function testbed(opts: object, callback: (testbed: Testbed) => World);
export function testbed(callback: (testbed: Testbed) => World);
export function testbed(opts, callback?) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  Stage(function(stage, canvas) {

    stage.on(Stage.Mouse.START, function() {
      window.focus();
      // @ts-ignore
      document.activeElement && document.activeElement.blur();
      canvas.focus();
    });

    stage.MAX_ELAPSE = 1000 / 30;

    // @ts-ignore
    const testbed: Testbed = {};
    testbed.canvas = canvas;

    let paused = false;
    stage.on('resume', function() {
      paused = false;
      testbed._resume && testbed._resume();
    });
    stage.on('pause', function() {
      paused = true;
      testbed._pause && testbed._pause();
    });
    testbed.isPaused = function() {
      return paused;
    };
    testbed.togglePause = function() {
      paused ? testbed.resume() : testbed.pause();
    };
    testbed.pause = function() {
      stage.pause();
    };
    testbed.resume = function() {
      stage.resume();
      testbed.focus();
    };
    testbed.focus = function() {
      // @ts-ignore
      document.activeElement && document.activeElement.blur();
      canvas.focus();
    };

    testbed.width = 80;
    testbed.height = 60;
    testbed.x = 0;
    testbed.y = -10;
    testbed.scaleY = -1;
    testbed.ratio = 16;
    testbed.hz = 60;
    testbed.speed = 1;
    testbed.activeKeys = {};
    testbed.background = '#222222';

    testbed.findOne = function() {
      // todo: implement
      return null;
    };

    testbed.findAll = function() {
      // todo: implement
      return [];
    };

    let statusText = '';
    const statusMap = {};

    function statusSet(name, value) {
      if (typeof value !== 'function' && typeof value !== 'object') {
        statusMap[name] = value;
      }
    }

    function statusMerge(obj) {
      // tslint:disable-next-line:no-for-in
      for (const key in obj) {
        statusSet(key, obj[key]);
      }
    }

    testbed.status = function(a, b?) {
      if (typeof b !== 'undefined') {
        statusSet(a, b);
      } else if (a && typeof a === 'object') {
        statusMerge(a);
      } else if (typeof a === 'string') {
        statusText = a;
      }

      testbed._status && testbed._status(statusText, statusMap);
    };

    testbed.info = function(text) {
      testbed._info && testbed._info(text);
    };

    let lastDrawHash = "";
    let drawHash = "";

    (function() {
      const drawingTexture = new Stage.Texture();
      stage.append(Stage.image(drawingTexture));

      const buffer = [];
      stage.tick(function() {
        buffer.length = 0;
      }, true);

      drawingTexture.draw = function(ctx) {
        ctx.save();
        ctx.transform(1, 0, 0, testbed.scaleY, -testbed.x, -testbed.y);
        ctx.lineWidth = 2  / testbed.ratio;
        ctx.lineCap = 'round';
        for (let drawing = buffer.shift(); drawing; drawing = buffer.shift()) {
          drawing(ctx, testbed.ratio);
        }
        ctx.restore();
      };

      testbed.drawPoint = function(p, r, color) {
        buffer.push(function(ctx, ratio) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5  / ratio, 0, 2 * Math.PI);
          ctx.strokeStyle = color;
          ctx.stroke();
        });
        drawHash += "point" + p.x + ',' + p.y + ',' + r + ',' + color;
      };

      testbed.drawCircle = function(p, r, color) {
        buffer.push(function(ctx) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
          ctx.strokeStyle = color;
          ctx.stroke();
        });
        drawHash += "circle" + p.x + ',' + p.y + ',' + r + ',' + color;
      };

      testbed.drawSegment = function(a, b, color) {
        buffer.push(function(ctx) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = color;
          ctx.stroke();
        });
        drawHash += "segment" + a.x + ',' + a.y + ',' + b.x + ',' + b.y + ',' + color;
      };

      testbed.drawPolygon = function(points, color) {
        if (!points || !points.length) {
          return;
        }
        buffer.push(function(ctx) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.strokeStyle = color;
          ctx.closePath();
          ctx.stroke();
        });
        drawHash += "segment";
        for (let i = 1; i < points.length; i++) {
          drawHash += points[i].x + ',' + points[i].y + ',';
        }
        drawHash += color;
      };

      testbed.drawAABB = function(aabb, color) {
        buffer.push(function(ctx) {
          ctx.beginPath();
          ctx.moveTo(aabb.lowerBound.x, aabb.lowerBound.y);
          ctx.lineTo(aabb.upperBound.x, aabb.lowerBound.y);
          ctx.lineTo(aabb.upperBound.x, aabb.upperBound.y);
          ctx.lineTo(aabb.lowerBound.x, aabb.upperBound.y);
          ctx.strokeStyle = color;
          ctx.closePath();
          ctx.stroke();
        });
        drawHash += "aabb";
        drawHash += aabb.lowerBound.x + ',' + aabb.lowerBound.y + ',';
        drawHash += aabb.upperBound.x + ',' + aabb.upperBound.y + ',';
        drawHash += color;
      };

      testbed.color = function(r, g, b) {
        r = r * 256 | 0;
        g = g * 256 | 0;
        b = b * 256 | 0;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
      };

    })();

    const world = callback(testbed);

    const viewer = new Viewer(world, testbed);

    let lastX = 0;
    let lastY = 0;
    stage.tick(function(dt, t) {
      // update camera position
      if (lastX !== testbed.x || lastY !== testbed.y) {
        viewer.offset(-testbed.x, -testbed.y);
        lastX = testbed.x;
        lastY = testbed.y;
      }
    });

    viewer.tick(function(dt, t) {
      // call testbed step, if provided
      if (typeof testbed.step === 'function') {
        testbed.step(dt, t);
      }

      if (targetBody) {
        testbed.drawSegment(targetBody.getPosition(), mouseMove, 'rgba(255,255,255,0.2)');
      }

      if (lastDrawHash !== drawHash) {
        lastDrawHash = drawHash;
        stage.touch();
      }
      drawHash = "";

      return true;
    });

    // stage.empty();
    stage.background(testbed.background);
    stage.viewbox(testbed.width, testbed.height);
    stage.pin('alignX', -0.5);
    stage.pin('alignY', -0.5);
    stage.prepend(viewer);

    function findBody(point) {
      let body;
      const aabb = new AABB(point, point);
      world.queryAABB(aabb, function(fixture) {
        if (body) {
          return;
        }
        if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
          return;
        }
        body = fixture.getBody();
        return true;
      });
      return body;
    }

    const mouseGround = world.createBody();
    let mouseJoint;

    let targetBody;
    const mouseMove = {x: 0, y: 0};

    viewer.attr('spy', true).on(Stage.Mouse.START, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (targetBody) {
        return;
      }

      const body = findBody(point);
      if (!body) {
        return;
      }

      if (testbed.mouseForce) {
        targetBody = body;

      } else {
        mouseJoint = new MouseJoint({maxForce: 1000}, mouseGround, body, Vec2.clone(point));
        world.createJoint(mouseJoint);
      }

    }).on(Stage.Mouse.MOVE, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

      mouseMove.x = point.x;
      mouseMove.y = point.y;
    }).on(Stage.Mouse.END, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        const force = Vec2.sub(point, targetBody.getPosition());
        targetBody.applyForceToCenter(force.mul(testbed.mouseForce), true);
        targetBody = null;
      }

    }).on(Stage.Mouse.CANCEL, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        targetBody = null;
      }
    });

    window.addEventListener("keydown", function(e) {
      switch (e.keyCode) {
        case 'P'.charCodeAt(0):
          testbed.togglePause();
          break;
      }
    }, false);

    const downKeys = {};
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

    const activeKeys = testbed.activeKeys;
    function updateActiveKeys(keyCode, down) {
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

  });
}

Viewer._super = Stage;
Viewer.prototype = Stage._create(Viewer._super.prototype);

function Viewer(world, opts) {
  Viewer._super.call(this);
  this.label('Planck');

  opts = opts || {};

  this._options = {};
  this._options.speed = opts.speed || 1;
  this._options.hz = opts.hz || 60;
  if (Math.abs(this._options.hz) < 1) {
    this._options.hz = 1 / this._options.hz;
  }
  this._options.scaleY = opts.scaleY || -1;
  this._options.ratio = opts.ratio || 16;
  this._options.lineWidth = 2 / this._options.ratio;

  this._world = world;

  const timeStep = 1 / this._options.hz;
  let elapsedTime = 0;
  this.tick((dt) => {
    dt = dt * 0.001 * this._options.speed;
    elapsedTime += dt;
    while (elapsedTime > timeStep) {
      world.step(timeStep);
      elapsedTime -= timeStep;
    }
    this.renderWorld();
    return true;
  }, true);

  world.on('remove-fixture', function(obj) {
    obj.ui && obj.ui.remove();
  });

  world.on('remove-joint', function(obj) {
    obj.ui && obj.ui.remove();
  });
}

Viewer.prototype.renderWorld = function() {
  const world = this._world;
  const options = this._options;
  const viewer = this;

  for (let b = world.getBodyList(); b; b = b.getNext()) {
    for (let f = b.getFixtureList(); f; f = f.getNext()) {

      if (!f.ui) {
        if (f.render && f.render.stroke) {
          options.strokeStyle = f.render.stroke;
        } else if (b.render && b.render.stroke) {
          options.strokeStyle = b.render.stroke;
        } else if (b.isDynamic()) {
          options.strokeStyle = 'rgba(255,255,255,0.9)';
        } else if (b.isKinematic()) {
          options.strokeStyle = 'rgba(255,255,255,0.7)';
        } else if (b.isStatic()) {
          options.strokeStyle = 'rgba(255,255,255,0.5)';
        }

        if (f.render && f.render.fill) {
          options.fillStyle = f.render.fill;
        } else if (b.render && b.render.fill) {
          options.fillStyle = b.render.fill;
        } else {
          options.fillStyle = '';
        }

        const type = f.getType();
        const shape = f.getShape();
        if (type == 'circle') {
          f.ui = viewer.drawCircle(shape, options);
        }
        if (type == 'edge') {
          f.ui = viewer.drawEdge(shape, options);
        }
        if (type == 'polygon') {
          f.ui = viewer.drawPolygon(shape, options);
        }
        if (type == 'chain') {
          f.ui = viewer.drawChain(shape, options);
        }

        if (f.ui) {
          f.ui.appendTo(viewer);
        }
      }

      if (f.ui) {
        const p = b.getPosition();
        const r = b.getAngle();
        if (f.ui.__lastX !== p.x || f.ui.__lastY !== p.y || f.ui.__lastR !== r) {
          f.ui.__lastX = p.x;
          f.ui.__lastY = p.y;
          f.ui.__lastR = r;
          f.ui.offset(p.x, options.scaleY * p.y);
          f.ui.rotate(options.scaleY * r);
        }
      }

    }
  }

  for (let j = world.getJointList(); j; j = j.getNext()) {
    const type = j.getType();
    const a = j.getAnchorA();
    const b = j.getAnchorB();

    if (!j.ui) {
      options.strokeStyle = 'rgba(255,255,255,0.2)';

      j.ui = viewer.drawJoint(j, options);
      j.ui.pin('handle', 0.5);
      if (j.ui) {
        j.ui.appendTo(viewer);
      }
    }

    if (j.ui) {
      const cx = (a.x + b.x) * 0.5;
      const cy = options.scaleY * (a.y + b.y) * 0.5;
      const dx = a.x - b.x;
      const dy = options.scaleY * (a.y - b.y);
      const d = Math.sqrt(dx * dx + dy * dy);
      j.ui.width(d);
      j.ui.rotate(Math.atan2(dy, dx));
      j.ui.offset(cx, cy);
    }
  }

};

Viewer.prototype.drawJoint = function(joint, options) {
  const lw = options.lineWidth;
  const ratio = options.ratio;

  const length = 10;

  const texture = Stage.canvas(function(ctx) {

    this.size(length + 2 * lw, 2 * lw, ratio);

    ctx.scale(ratio, ratio);
    ctx.beginPath();
    ctx.moveTo(lw, lw);
    ctx.lineTo(lw + length, lw);

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  const image = Stage.image(texture).stretch();
  return image;
};

Viewer.prototype.drawCircle = function(shape, options) {
  const lw = options.lineWidth;
  const ratio = options.ratio;

  const r = shape.m_radius;
  const cx = r + lw;
  const cy = r + lw;
  const w = r * 2 + lw * 2;
  const h = r * 2 + lw * 2;

  const texture = Stage.canvas(function(ctx) {

    this.size(w, h, ratio);

    ctx.scale(ratio, ratio);
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    if (options.fillStyle) {
      ctx.fillStyle = options.fillStyle;
      ctx.fill();
    }
    ctx.lineTo(cx, cy);
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });
  const image = Stage.image(texture)
    .offset(shape.m_p.x - cx, options.scaleY * shape.m_p.y - cy);
  const node = Stage.create().append(image);
  return node;
};

Viewer.prototype.drawEdge = function(edge, options) {
  const lw = options.lineWidth;
  const ratio = options.ratio;

  const v1 = edge.m_vertex1;
  const v2 = edge.m_vertex2;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;

  const length = Math.sqrt(dx * dx + dy * dy);

  const texture = Stage.canvas(function(ctx) {

    this.size(length + 2 * lw, 2 * lw, ratio);

    ctx.scale(ratio, ratio);
    ctx.beginPath();
    ctx.moveTo(lw, lw);
    ctx.lineTo(lw + length, lw);

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  const minX = Math.min(v1.x, v2.x);
  const minY = Math.min(options.scaleY * v1.y, options.scaleY * v2.y);

  const image = Stage.image(texture);
  image.rotate(options.scaleY * Math.atan2(dy, dx));
  image.offset(minX - lw, minY - lw);
  const node = Stage.create().append(image);
  return node;
};

Viewer.prototype.drawPolygon = function(shape, options) {
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

  const texture = Stage.canvas(function(ctx) {

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

    if (options.fillStyle) {
      ctx.fillStyle = options.fillStyle;
      ctx.fill();
      ctx.closePath();
    }

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  const image = Stage.image(texture);
  image.offset(minX - lw, minY - lw);
  const node = Stage.create().append(image);
  return node;
};

Viewer.prototype.drawChain = function(shape, options) {
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

  const texture = Stage.canvas(function(ctx) {

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

    if (options.fillStyle) {
      ctx.fillStyle = options.fillStyle;
      ctx.fill();
      ctx.closePath();
    }

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  const image = Stage.image(texture);
  image.offset(minX - lw, minY - lw);
  const node = Stage.create().append(image);
  return node;
};


// Everything below this is copied from ../src/index.ts

export { default as Serializer } from '../src/serializer/index';

export { default as Math } from '../src/common/Math';
export { default as Vec2 } from '../src/common/Vec2';
export { default as Vec3 } from '../src/common/Vec3';
export { default as Mat22 } from '../src/common/Mat22';
export { default as Mat33 } from '../src/common/Mat33';
export { default as Transform } from '../src/common/Transform';
export { default as Rot } from '../src/common/Rot';

export { default as AABB } from '../src/collision/AABB';

export { default as Shape } from '../src/collision/Shape';
export { default as Fixture } from '../src/dynamics/Fixture';
export { default as Body } from '../src/dynamics/Body';
export { default as Contact } from '../src/dynamics/Contact';
export { default as Joint } from '../src/dynamics/Joint';
export { default as World } from '../src/dynamics/World';

export { default as Circle } from '../src/collision/shape/CircleShape';
export { default as Edge } from '../src/collision/shape/EdgeShape';
export { default as Polygon } from '../src/collision/shape/PolygonShape';
export { default as Chain } from '../src/collision/shape/ChainShape';
export { default as Box } from '../src/collision/shape/BoxShape';

export { CollideCircles } from '../src/collision/shape/CollideCircle';
export { CollideEdgeCircle } from '../src/collision/shape/CollideEdgeCircle';
export { CollidePolygons } from '../src/collision/shape/CollidePolygon';
export { CollidePolygonCircle } from '../src/collision/shape/CollideCirclePolygone';
export { CollideEdgePolygon } from '../src/collision/shape/CollideEdgePolygon';

export { default as DistanceJoint } from '../src/dynamics/joint/DistanceJoint';
export { default as FrictionJoint } from '../src/dynamics/joint/FrictionJoint';
export { default as GearJoint } from '../src/dynamics/joint/GearJoint';
export { default as MotorJoint } from '../src/dynamics/joint/MotorJoint';
export { default as MouseJoint } from '../src/dynamics/joint/MouseJoint';
export { default as PrismaticJoint } from '../src/dynamics/joint/PrismaticJoint';
export { default as PulleyJoint } from '../src/dynamics/joint/PulleyJoint';
export { default as RevoluteJoint } from '../src/dynamics/joint/RevoluteJoint';
export { default as RopeJoint } from '../src/dynamics/joint/RopeJoint';
export { default as WeldJoint } from '../src/dynamics/joint/WeldJoint';
export { default as WheelJoint } from '../src/dynamics/joint/WheelJoint';

export { default as Settings } from '../src/Settings';

export { default as Sweep } from '../src/common/Sweep';
export { default as Manifold } from '../src/collision/Manifold';
export { default as Distance } from '../src/collision/Distance';
export { default as TimeOfImpact } from '../src/collision/TimeOfImpact';
export { default as DynamicTree } from '../src/collision/DynamicTree';

import Solver, { TimeStep } from '../src/dynamics/Solver';
import { CollidePolygons } from '../src/collision/shape/CollidePolygon';
import { default as Settings } from '../src/Settings';
import { default as Sweep } from '../src/common/Sweep';
import { default as Manifold } from '../src/collision/Manifold';
import { default as Distance, DistanceInput, DistanceOutput, DistanceProxy, SimplexCache, testOverlap } from '../src/collision/Distance';
import { default as TimeOfImpact, TOIInput, TOIOutput } from '../src/collision/TimeOfImpact';
import { default as DynamicTree } from '../src/collision/DynamicTree';

import { default as stats } from '../src/util/stats'; // todo: what to do with this?

import { ContactImpulse } from '../src/dynamics/Solver';
type _ContactImpulse = InstanceType<typeof ContactImpulse>;
export type { _ContactImpulse as ContactImpulse }

/** @deprecated Merged with main namespace */
export const internal = {};

// @ts-ignore
internal.CollidePolygons = CollidePolygons;
// @ts-ignore
internal.Settings = Settings;
// @ts-ignore
internal.Sweep = Sweep;
// @ts-ignore
internal.Manifold = Manifold;
// @ts-ignore
internal.Distance = Distance;
// @ts-ignore
internal.TimeOfImpact = TimeOfImpact;
// @ts-ignore
internal.DynamicTree = DynamicTree;
// @ts-ignore
internal.stats = stats;

// @ts-ignore
Solver.TimeStep = TimeStep;

// @ts-ignore
Distance.testOverlap = testOverlap;
// @ts-ignore
Distance.Input = DistanceInput;
// @ts-ignore
Distance.Output = DistanceOutput;
// @ts-ignore
Distance.Proxy = DistanceProxy;
// @ts-ignore
Distance.Cache = SimplexCache;

// @ts-ignore
TimeOfImpact.Input = TOIInput;
// @ts-ignore
TimeOfImpact.Output = TOIOutput;
