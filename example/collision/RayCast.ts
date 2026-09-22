/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This test demonstrates how to use the world ray-cast feature.
// NOTE: we are intentionally filtering one of the polygons, therefore
// the ray will always miss one type of polygon.

import {
  World,
  Body,
  Fixture,
  Shape,
  Vec2,
  Transform,
  Edge,
  Circle,
  Polygon,
  Box,
  Testbed,
  RayCastOutput,
  Vec2Value,
} from "planck";

const outputClosest = {
  point: null as Vec2Value | null,
  normal: null as Vec2Value | null,
};

function resetClosest() {
  outputClosest.point = null;
  outputClosest.normal = null;
}

// This callback finds the closest hit. Polygon 0 is filtered.
function callbackClosest(
  fixture: Fixture,
  point: Vec2Value,
  normal: Vec2Value,
  fraction: number,
): number {
  const body = fixture.getBody();
  const userData = body.getUserData();
  if (userData !== undefined) {
    if (userData === 0) {
      // By returning -1, we instruct the calling code to ignore this fixture and
      // continue the ray-cast to the next fixture.
      return -1.0;
    }
  }

  outputClosest.point = point;
  outputClosest.normal = normal;

  // By returning the current fraction, we instruct the calling code to clip the ray and
  // continue the ray-cast to the next fixture. WARNING: do not assume that fixtures
  // are reported in order. However, by clipping, we can always get the closest fixture.
  return fraction;
}

const outputAny = {
  point: null as Vec2Value | null,
  normal: null as Vec2Value | null,
};

function resetAny() {
  outputAny.point = null;
  outputAny.normal = null;
}

// This callback finds any hit. Polygon 0 is filtered. For this type of query we are usually
// just checking for obstruction, so the actual fixture and hit point are irrelevant.
function callbackAny(
  fixture: Fixture,
  point: Vec2Value,
  normal: Vec2Value,
  fraction: number,
): number {
  const body = fixture.getBody();
  const userData = body.getUserData();
  if (userData !== undefined) {
    if (userData === 0) {
      // By returning -1, we instruct the calling code to ignore this fixture
      // and continue the ray-cast to the next fixture.
      return -1.0;
    }
  }
  outputAny.point = point;
  outputAny.normal = normal;

  // At this point we have a hit, so we know the ray is obstructed.
  // By returning 0, we instruct the calling code to terminate the ray-cast.
  return 0.0;
}

const outputMultiple = {
  points: [] as Vec2Value[],
  normals: [] as Vec2Value[],
};
// let MAX_COUNT = 3;

function resetMultiple() {
  outputMultiple.points.length = 0;
  outputMultiple.normals.length = 0;
}

// This ray cast collects multiple hits along the ray. Polygon 0 is filtered.
// The fixtures are not necessary reported in order, so we might not capture
// the closest fixture.
function callbackMultiple(
  fixture: Fixture,
  point: Vec2Value,
  normal: Vec2Value,
  fraction: number,
): number {
  const body = fixture.getBody();
  const userData = body.getUserData();
  if (userData !== undefined) {
    if (userData === 0) {
      // By returning -1, we instruct the calling code to ignore this fixture
      // and continue the ray-cast to the next fixture.
      return -1.0;
    }
  }

  outputMultiple.points.push(point);
  outputMultiple.normals.push(normal);

  // if (m_count == MAX_COUNT) {
  //   // At this point the buffer is full.
  //   // By returning 0, we instruct the calling code to terminate the ray-cast.
  //   return 0.0;
  // }

  // By returning 1, we instruct the caller to continue without clipping the
  // ray.
  return 1.0;
}

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.width = 40;
testbed.height = 40;
testbed.info("1-6: Drop new objects, Z: Change mode, X: Destroy an object");
testbed.start(world);

const MAX_BODIES = 256;

// mode
const CLOSEST = 1;
const ANY = 2;
const MULTIPLE = 3;

const bodies: Body[] = [];
const shapes: Shape[] = [];

let angle = 0.0;
let mode = CLOSEST;

shapes[0] = new Polygon([
  { x: -0.5, y: 0.0 },
  { x: 0.5, y: 0.0 },
  { x: 0.0, y: 1.5 },
]);
shapes[1] = new Polygon([
  { x: -0.1, y: 0.0 },
  { x: 0.1, y: 0.0 },
  { x: 0.0, y: 1.5 },
]);

const w = 1.0;
const b = w / (2.0 + Math.sqrt(2.0));
const s = Math.sqrt(2.0) * b;

shapes[2] = new Polygon([
  { x: 0.5 * s, y: 0.0 },
  { x: 0.5 * w, y: b },
  { x: 0.5 * w, y: b + s },
  { x: 0.5 * s, y: w },
  { x: -0.5 * s, y: w },
  { x: -0.5 * w, y: b + s },
  { x: -0.5 * w, y: b },
  { x: -0.5 * s, y: 0.0 },
]);
shapes[3] = new Box(0.5, 0.5);

shapes[4] = new Circle(0.5);
shapes[5] = new Edge({ x: -1.0, y: 0.0 }, { x: 1.0, y: 0.0 });

function createBody(index: number) {
  if (bodies.length > MAX_BODIES) {
    world.destroyBody(bodies.shift()!);
  }

  const body = world.createBody({
    type: "static",
    position: {
      x: Math.random() * 20 - 10,
      y: Math.random() * 20,
    },
    angle: Math.random() * 2 * Math.PI - Math.PI,
    userData: index,
    angularDamping: index === 4 ? 0.02 : 0,
  });

  const shape = shapes[index % shapes.length];

  body.createFixture({
    shape: shape,
    friction: 0.3,
  });

  bodies.push(body);
}

function destroyBody() {
  const body = bodies.shift();
  if (body) world.destroyBody(body);
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
      testbed.status("Ray-cast mode", "Closest - find closest fixture along the ray");
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
  const point1 = { x: 0.0, y: 10.0 };
  const d = { x: L * Math.cos(angle), y: L * Math.sin(angle) };
  const point2 = Vec2.add(point1, d);

  if (mode === CLOSEST) {
    resetClosest();
    world.rayCast(point1, point2, callbackClosest);
    const output = outputClosest;

    if (output && output.point && output.normal) {
      testbed.drawPoint(output.point, 5.0, testbed.color(0.4, 0.9, 0.4));
      testbed.drawSegment(point1, output.point, testbed.color(0.8, 0.8, 0.8));
      const head = Vec2.combine(1, output.point, 2, output.normal);
      testbed.drawSegment(output.point, head, testbed.color(0.9, 0.9, 0.4));
    } else {
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
    }
  } else if (mode === ANY) {
    resetAny();
    world.rayCast(point1, point2, callbackAny);
    const output = outputAny;

    if (output && output.point && output.normal) {
      testbed.drawPoint(output.point, 5.0, testbed.color(0.4, 0.9, 0.4));
      testbed.drawSegment(point1, output.point, testbed.color(0.8, 0.8, 0.8));
      const head = Vec2.combine(1, output.point, 2, output.normal);
      testbed.drawSegment(output.point, head, testbed.color(0.9, 0.9, 0.4));
    } else {
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
    }
  } else if (mode === MULTIPLE) {
    resetMultiple();
    world.rayCast(point1, point2, callbackMultiple);
    testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
    const output = outputMultiple;

    for (let i = 0; i < output.points.length; ++i) {
      const p = output.points[i];
      const n = output.normals[i];
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

    const input = {
      p1: { x: 10.2725, y: 1.71372 },
      p2: { x: 10.2353, y: 2.21807 },
      maxFraction: 0.56762173,
    };

    const xf = new Transform({ x: 23.0, y: 5.0 });

    const output = {} as RayCastOutput;
    let hit = shape.rayCast(output, input, xf, 0);
    hit = false;

    const color = testbed.color(1.0, 1.0, 1.0);
    const vs = shape.m_vertices.map((v) => Transform.mul(xf, v));

    testbed.drawPolygon(vs, color);
    testbed.drawSegment(input.p1, input.p2, color);
  }
};

updateStatus();
