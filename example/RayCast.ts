/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This test demonstrates how to use the world ray-cast feature.
// NOTE: we are intentionally filtering one of the polygons, therefore
// the ray will always miss one type of polygon.

import planck from "../src/main";

const { World, Vec2, Transform, Edge, Circle, Polygon, Box, Testbed } = planck;

// This callback finds the closest hit. Polygon 0 is filtered.
const RayCastClosest = (function () {
  const def: any = {};

  def.reset = function () {
    def.hit = false;
    def.point = null;
    def.normal = null;
  };

  def.callback = function (fixture, point, normal, fraction) {
    const body = fixture.getBody();
    const userData = body.getUserData();
    if (userData !== undefined) {
      if (userData === 0) {
        // By returning -1, we instruct the calling code to ignore this fixture and
        // continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.hit = true;
    def.point = point;
    def.normal = normal;

    // By returning the current fraction, we instruct the calling code to clip the ray and
    // continue the ray-cast to the next fixture. WARNING: do not assume that fixtures
    // are reported in order. However, by clipping, we can always get the closest fixture.
    return fraction;
  };

  return def;
})();

// This callback finds any hit. Polygon 0 is filtered. For this type of query we are usually
// just checking for obstruction, so the actual fixture and hit point are irrelevant.
const RayCastAny = (function () {
  const def: any = {};

  def.reset = function () {
    def.hit = false;
    def.point = null;
    def.normal = null;
  };

  def.callback = function (fixture, point, normal, fraction) {
    const body = fixture.getBody();
    const userData = body.getUserData();
    if (userData !== undefined) {
      if (userData === 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.hit = true;
    def.point = point;
    def.normal = normal;

    // At this point we have a hit, so we know the ray is obstructed.
    // By returning 0, we instruct the calling code to terminate the ray-cast.
    return 0.0;
  };

  return def;
})();

// This ray cast collects multiple hits along the ray. Polygon 0 is filtered.
// The fixtures are not necessary reported in order, so we might not capture
// the closest fixture.
const RayCastMultiple = (function () {
  const def: any = {};
  // const MAX_COUNT = 3;

  def.reset = function () {
    def.points = [];
    def.normals = [];
  };

  def.callback = function (fixture, point, normal, fraction) {
    const body = fixture.getBody();
    const userData = body.getUserData();
    if (userData !== undefined) {
      if (userData === 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.points.push(point);
    def.normals.push(normal);

    // if (m_count == MAX_COUNT) {
    //   // At this point the buffer is full.
    //   // By returning 0, we instruct the calling code to terminate the ray-cast.
    //   return 0.0;
    // }

    // By returning 1, we instruct the caller to continue without clipping the
    // ray.
    return 1.0;
  };

  return def;
})();

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.width = 40;
testbed.height = 40;
testbed.info("1-6: Drop new objects, Z: Change mode, X: Destroy an object");
testbed.start(world);

const MAX_BODIES = 256;

// mode
const CLOSEST = 1,
  ANY = 2,
  MULTIPLE = 3;

const bodies = [];
const shapes = [];

let angle = 0.0;
let mode = CLOSEST;

shapes[0] = new Polygon([
  new Vec2(-0.5, 0.0),
  new Vec2(0.5, 0.0),
  new Vec2(0.0, 1.5),
]);
shapes[1] = new Polygon([
  new Vec2(-0.1, 0.0),
  new Vec2(0.1, 0.0),
  new Vec2(0.0, 1.5),
]);

const w = 1.0;
const b = w / (2.0 + Math.sqrt(2.0));
const s = Math.sqrt(2.0) * b;

shapes[2] = new Polygon([
  new Vec2(0.5 * s, 0.0),
  new Vec2(0.5 * w, b),
  new Vec2(0.5 * w, b + s),
  new Vec2(0.5 * s, w),
  new Vec2(-0.5 * s, w),
  new Vec2(-0.5 * w, b + s),
  new Vec2(-0.5 * w, b),
  new Vec2(-0.5 * s, 0.0),
]);
shapes[3] = new Box(0.5, 0.5);

shapes[4] = new Circle(0.5);
shapes[5] = new Edge(new Vec2(-1.0, 0.0), new Vec2(1.0, 0.0));

function createBody(index) {
  if (bodies.length > MAX_BODIES) {
    world.destroyBody(bodies.shift());
  }

  const x = Math.random() * 20 - 10;
  const y = Math.random() * 20;

  const bd: any = {};
  bd.position = new Vec2(x, y);
  bd.angle = Math.random() * 2 * Math.PI - Math.PI;
  bd.userData = index;

  if (index === 4) {
    bd.angularDamping = 0.02;
  }

  const body = world.createBody(bd);

  const shape = shapes[index % shapes.length];

  body.createFixture(shape, { friction: 0.3 });

  bodies.push(body);
}

function destroyBody() {
  const body = bodies.shift();
  body && world.destroyBody(body);
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "Z":
      if (mode === CLOSEST) {
        mode = ANY;
      } else if (mode === ANY) {
        mode = MULTIPLE;
      } else if (mode === MULTIPLE) {
        mode = CLOSEST;
      }
      break;
    case "X":
      destroyBody();
      break;
    case "1":
      createBody(0);
      break;
    case "2":
      createBody(1);
      break;
    case "3":
      createBody(2);
      break;
    case "4":
      createBody(3);
      break;
    case "5":
      createBody(4);
      break;
    case "6":
      createBody(5);
      break;
  }

  updateStatus();
};

function updateStatus() {
  switch (mode) {
    case CLOSEST:
      testbed.status(
        "Ray-cast mode",
        "Closest - find closest fixture along the ray"
      );
      break;

    case ANY:
      testbed.status("Ray-cast mode", "Any - check for obstruction");
      break;

    case MULTIPLE:
      testbed.status("Ray-cast mode", "Multiple - gather multiple fixtures");
      break;
  }
}

testbed.step = function () {
  const advanceRay = true;

  const L = 11.0;
  const point1 = new Vec2(0.0, 10.0);
  const d = new Vec2(L * Math.cos(angle), L * Math.sin(angle));
  const point2 = Vec2.add(point1, d);

  if (mode === CLOSEST) {
    RayCastClosest.reset();
    world.rayCast(point1, point2, RayCastClosest.callback);

    if (RayCastClosest.hit) {
      testbed.drawPoint(
        RayCastClosest.point,
        5.0,
        testbed.color(0.4, 0.9, 0.4)
      );
      testbed.drawSegment(
        point1,
        RayCastClosest.point,
        testbed.color(0.8, 0.8, 0.8)
      );
      const head = Vec2.combine(
        1,
        RayCastClosest.point,
        2,
        RayCastClosest.normal
      );
      testbed.drawSegment(
        RayCastClosest.point,
        head,
        testbed.color(0.9, 0.9, 0.4)
      );
    } else {
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
    }
  } else if (mode === ANY) {
    RayCastAny.reset();
    world.rayCast(point1, point2, RayCastAny.callback);

    if (RayCastAny.hit) {
      testbed.drawPoint(RayCastAny.point, 5.0, testbed.color(0.4, 0.9, 0.4));
      testbed.drawSegment(
        point1,
        RayCastAny.point,
        testbed.color(0.8, 0.8, 0.8)
      );
      const head = Vec2.combine(1, RayCastAny.point, 2, RayCastAny.normal);
      testbed.drawSegment(RayCastAny.point, head, testbed.color(0.9, 0.9, 0.4));
    } else {
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
    }
  } else if (mode === MULTIPLE) {
    RayCastMultiple.reset();
    world.rayCast(point1, point2, RayCastMultiple.callback);
    testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));

    for (let i = 0; i < RayCastMultiple.points.length; ++i) {
      const p = RayCastMultiple.points[i];
      const n = RayCastMultiple.normals[i];
      testbed.drawPoint(p, 5.0, testbed.color(0.4, 0.9, 0.4));
      testbed.drawSegment(point1, p, testbed.color(0.8, 0.8, 0.8));
      const head = Vec2.combine(1, p, 0.5, n);
      testbed.drawSegment(p, head, testbed.color(0.9, 0.9, 0.4));
    }
  }

  if (advanceRay) {
    angle += (0.25 * Math.PI) / 180.0;
  }

  if (false) {
    // This case was failing.
    const shape = new Box(22.875, 3.0);

    const input: planck.RayCastInput = {} as any; // RayCastInput
    input.p1 = new Vec2(10.2725, 1.71372);
    input.p2 = new Vec2(10.2353, 2.21807);
    // input.maxFraction = 0.567623;
    input.maxFraction = 0.56762173;

    const xf = new Transform(new Vec2(23.0, 5.0));

    const output: planck.RayCastOutput = {} as any; // RayCastOutput
    let hit = shape.rayCast(output, input, xf, 0);
    hit = false;

    const color = testbed.color(1.0, 1.0, 1.0);
    const vs = shape.m_vertices.map((v: planck.Vec2) => Transform.mul(xf, v));

    testbed.drawPolygon(vs, color);
    testbed.drawSegment(input.p1, input.p2, color);
  }
};

updateStatus();
