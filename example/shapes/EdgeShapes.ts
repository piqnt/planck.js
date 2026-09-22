/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Body, Fixture, Shape, Edge, Polygon, Box, Circle, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

let pause = false;

const MAX_BODIES = 256;

const bodies: Body[] = [];
const shapes: Shape[] = [];

{
  const ground = world.createBody({
    type: "static",
  });

  let x1 = -20.0;
  let y1 = 2.0 * Math.cos((x1 / 10.0) * Math.PI);
  for (let i = 0; i < 80; ++i) {
    const x2 = x1 + 0.5;
    const y2 = 2.0 * Math.cos((x2 / 10.0) * Math.PI);

    ground.createFixture({
      shape: new Edge({ x: x1, y: y1 }, { x: x2, y: y2 }),
      density: 0.0,
    });

    x1 = x2;
    y1 = y2;
  }
}

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

{
  const w = 1.0;
  const b = w / (2.0 + Math.sqrt(2.0));
  const s = Math.sqrt(2.0) * b;

  const vertices = [
    { x: 0.5 * s, y: 0.0 },
    { x: 0.5 * w, y: b },
    { x: 0.5 * w, y: b + s },
    { x: 0.5 * s, y: w },
    { x: -0.5 * s, y: w },
    { x: -0.5 * w, y: b + s },
    { x: -0.5 * w, y: b },
    { x: -0.5 * s, y: 0.0 },
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

  const body = world.createBody({
    type: "dynamic",
    position: {
      x: Math.random() * 20 - 10.0,
      y: Math.random() * 10 + 10.0,
    },
    angle: Math.random() * 2 * Math.PI - Math.PI,
    angularDamping: index === 4 ? 0.02 : 0,
  });

  body.createFixture({
    shape: shapes[index],
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
  const point1 = { x: 0.0, y: 10.0 };
  const d = {
    x: L * Math.cos(angle),
    y: -L * Math.abs(Math.sin(angle)),
  };
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
