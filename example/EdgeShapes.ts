/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import {
  Vec2,
  World,
  Body,
  BodyDef,
  Fixture,
  Shape,
  Edge,
  Polygon,
  Box,
  Circle,
  Math,
  Testbed,
} from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let pause = false;

const MAX_BODIES = 256;

const bodies: Body[] = [];
const shapes: Shape[] = [];

{
  const ground = world.createBody();

  let x1 = -20.0;
  let y1 = 2.0 * Math.cos((x1 / 10.0) * Math.PI);
  for (let i = 0; i < 80; ++i) {
    const x2 = x1 + 0.5;
    const y2 = 2.0 * Math.cos((x2 / 10.0) * Math.PI);

    ground.createFixture(new Edge(new Vec2(x1, y1), new Vec2(x2, y2)), 0.0);

    x1 = x2;
    y1 = y2;
  }
}

shapes[0] = new Polygon([new Vec2(-0.5, 0.0), new Vec2(0.5, 0.0), new Vec2(0.0, 1.5)]);

shapes[1] = new Polygon([new Vec2(-0.1, 0.0), new Vec2(0.1, 0.0), new Vec2(0.0, 1.5)]);

{
  const w = 1.0;
  const b = w / (2.0 + Math.sqrt(2.0));
  const s = Math.sqrt(2.0) * b;

  const vertices = [
    new Vec2(0.5 * s, 0.0),
    new Vec2(0.5 * w, b),
    new Vec2(0.5 * w, b + s),
    new Vec2(0.5 * s, w),
    new Vec2(-0.5 * s, w),
    new Vec2(-0.5 * w, b + s),
    new Vec2(-0.5 * w, b),
    new Vec2(-0.5 * s, 0.0),
  ];

  shapes[2] = new Polygon(vertices);
}

shapes[3] = new Box(0.5, 0.5);

shapes[4] = new Circle(0.5);

let angle = 0.0;

function createItem(index: number) {
  if (bodies.length > MAX_BODIES) {
    world.destroyBody(bodies.shift()!);
  }

  const bd: BodyDef = {
    position: new Vec2(Math.random(-10.0, 10.0), Math.random(10.0, 20.0)),
    angle: Math.random(-Math.PI, Math.PI),
    type: "dynamic",
  };

  if (index === 4) {
    bd.angularDamping = 0.02;
  }

  const body = world.createBody(bd);

  body.createFixture(shapes[index], {
    density: 20.0,
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
      createItem(0);
      break;
    case "2":
      createItem(1);
      break;
    case "3":
      createItem(2);
      break;
    case "4":
      createItem(3);
      break;
    case "5":
      createItem(4);
      break;
    case "X":
      destroyBody();
      break;
    case "Z":
      pause = !pause;
      break;
  }
};

testbed.info("1-5: Drop new object, X: Destroy an object");

const rayCastResult = {
  fixture: null,
  point: null,
  normal: null,
} as {
  fixture: Fixture | null;
  point: Vec2 | null;
  normal: Vec2 | null;
};

function rayCastCallback(fixture: Fixture, point: Vec2, normal: Vec2, fraction: number) {
  rayCastResult.fixture = fixture;
  rayCastResult.point = point;
  rayCastResult.normal = normal;
  return fraction;
}

function rayCastReset() {
  rayCastResult.fixture = null;
  rayCastResult.point = null;
  rayCastResult.normal = null;
}

testbed.step = function () {
  const advanceRay = !pause; // settings.pause == 0 || settings.singleStep;

  const L = 25.0;
  const point1 = new Vec2(0.0, 10.0);
  const d = new Vec2(L * Math.cos(angle), -L * Math.abs(Math.sin(angle)));
  const point2 = Vec2.add(point1, d);

  rayCastReset();

  world.rayCast(point1, point2, rayCastCallback);

  if (rayCastResult.point && rayCastResult.normal) {
    testbed.drawPoint(rayCastResult.point, 5.0, testbed.color(0.4, 0.9, 0.4));
    testbed.drawSegment(point1, rayCastResult.point, testbed.color(0.8, 0.8, 0.8));

    const head = Vec2.combine(1, rayCastResult.point, 2, rayCastResult.normal);
    testbed.drawSegment(rayCastResult.point, head, testbed.color(0.9, 0.9, 0.4));
  } else {
    testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
  }

  if (advanceRay) {
    angle += (0.25 * Math.PI) / 180.0;
  }
};
