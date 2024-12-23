/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import {
  Vec2,
  Transform,
  AABB,
  CircleShape,
  Polygon,
  Edge,
  Box,
  World,
  Distance,
  Testbed,
  Body,
  Shape,
  BodyDef,
  Fixture,
  PolygonShape,
} from "planck";

// This tests stacking. It also shows how to use World.query and TestOverlap.
// This callback is called by World.queryAABB. We find all the fixtures
// that overlap an AABB. Of those, we use TestOverlap to determine which fixtures
// overlap a circle. Up to 4 overlapped fixtures will be highlighted with a
// yellow border.

const world = new World(new Vec2(0, -10));
const testbed = Testbed.mount();
testbed.start(world);

const MAX_BODIES = 256;

const bodies: Body[] = [];

const shapes: Shape[] = [];

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

shapes[0] = new Polygon([new Vec2(-0.5, 0.0), new Vec2(0.5, 0.0), new Vec2(0.0, 1.5)]);

shapes[1] = new Polygon([new Vec2(-0.1, 0.0), new Vec2(0.1, 0.0), new Vec2(0.0, 1.5)]);

{
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
}

shapes[3] = new Box(0.5, 0.5);

shapes[4] = new CircleShape(0.5);

function createBody(index: number) {
  if (bodies.length > MAX_BODIES) {
    world.destroyBody(bodies.shift()!);
  }

  const bd: BodyDef = {
    type: "dynamic",
    position: new Vec2(Math.random() * 0.4 - 2.0, 10.0),
    angle: Math.random() * 2 * Math.PI - Math.PI,
  };

  if (index === 4) {
    bd.angularDamping = 0.02;
  }

  const body = world.createBody(bd);

  body.createFixture(shapes[index % shapes.length], {
    density: 1.0,
    friction: 0.3,
  });

  bodies.push(body);
}

function destroyBody() {
  world.destroyBody(bodies.shift()!);
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "1":
      createBody(1);
      break;

    case "2":
      createBody(2);
      break;

    case "3":
      createBody(3);
      break;

    case "4":
      createBody(4);
      break;

    case "5":
      createBody(5);
      break;

    case "Z":
      for (let i = 0; i < bodies.length; i += 2) {
        const body = bodies[i];
        body.setActive(!body.isActive());
      }
      break;

    case "X":
      destroyBody();
      break;
  }
};

testbed.info("1-5: Drop new objects, Z: Activate/deactivate some bodies, X: Destroy an object");

const aabb = new AABB();
const circle = new CircleShape(new Vec2(0.0, 1.1), 2.0);
const transform = new Transform();
let count = 0;

const MAX_COUNT = 40;

// Called for each fixture found in the query AABB.
// return false to terminate the query.
function queryCallback(fixture: Fixture) {
  if (count === MAX_COUNT) {
    return false;
  }

  const body = fixture.getBody();
  const shape = fixture.getShape();

  const overlap = Distance.testOverlap(shape, 0, circle, 0, body.getTransform(), transform);

  if (overlap) {
    drawFixture(fixture);
    ++count;
  }

  return true;
}

testbed.step = function () {
  circle.computeAABB(aabb, transform, 0);
  count = 0;

  world.queryAABB(aabb, queryCallback);

  testbed.drawCircle(circle.m_p, circle.m_radius, testbed.color(0.4, 0.7, 0.8));
};

function drawFixture(fixture: Fixture) {
  const color = testbed.color(0.95, 0.95, 0.6);
  const xf = fixture.getBody().getTransform();

  switch (fixture.getType()) {
    case "circle":
      {
        const circle = fixture.getShape() as CircleShape;

        const center = Transform.mul(xf, circle.getCenter());
        const radius = circle.getRadius();

        testbed.drawCircle(center, radius, color);
      }
      break;

    case "polygon":
      {
        const poly = fixture.getShape() as PolygonShape;
        const vertices = poly.m_vertices.map((v) => Transform.mul(xf, v));
        testbed.drawPolygon(vertices, color);
      }
      break;

    default:
      break;
  }
}