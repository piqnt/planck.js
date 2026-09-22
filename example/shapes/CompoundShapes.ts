/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// TODO_ERIN test joints on compounds.
import { World, Vec2, Transform, Math, Edge, Circle, Polygon, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

{
  const ground = world.createBody({
    type: "static",
    position: { x: 0.0, y: 0.0 },
  });
  ground.createFixture({
    shape: new Edge({ x: 50.0, y: 0.0 }, { x: -50.0, y: 0.0 }),
    density: 0.0,
  });
}

const circle1 = new Circle({ x: -0.5, y: 0.5 }, 0.5);
const circle2 = new Circle({ x: 0.5, y: 0.5 }, 0.5);

for (let i = 0; i < 10; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: {
      x: Math.random(-0.1, 0.1) + 5.0,
      y: 1.05 + 2.5 * i,
    },
    angle: Math.random(-Math.PI, Math.PI),
  });
  body.createFixture({
    shape: circle1,
    density: 2.0,
  });
  body.createFixture({
    shape: circle2,
    density: 0.0,
  });
}

const polygon1 = new Box(0.25, 0.5);
const polygon2 = new Box(0.25, 0.5, { x: 0.0, y: -0.5 }, 0.5 * Math.PI);

for (let i = 0; i < 10; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: { x: Math.random(-0.1, 0.1) - 5.0, y: 1.05 + 2.5 * i },
    angle: Math.random(-Math.PI, Math.PI),
  });
  body.createFixture({
    shape: polygon1,
    density: 2.0,
  });
  body.createFixture({
    shape: polygon2,
    density: 2.0,
  });
}

const xf1 = new Transform();
xf1.q.set(0.3524 * Math.PI);
xf1.p.set(xf1.q.getXAxis());

const triangle1 = new Polygon(
  [
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 0.5 },
  ].map((v) => Transform.mul(xf1, v)),
);

const xf2 = new Transform();
xf2.q.set(-0.3524 * Math.PI);
xf2.p.set(Vec2.neg(xf2.q.getXAxis()));

const triangle2 = new Polygon(
  [
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 0.5 },
  ].map((v) => Transform.mul(xf2, v)),
);

for (let i = 0; i < 10; ++i) {
  const body = world.createBody({
    type: "dynamic",
    position: {
      x: Math.random(-0.1, 0.1),
      y: 2.05 + 2.5 * i,
    },
    angle: 0.0,
  });
  body.createFixture({
    shape: triangle1,
    density: 2.0,
  });
  body.createFixture({
    shape: triangle2,
    density: 2.0,
  });
}

const bottom = new Box(1.5, 0.15);
const left = new Box(0.15, 2.7, { x: -1.45, y: 2.35 }, 0.2);
const right = new Box(0.15, 2.7, { x: 1.45, y: 2.35 }, -0.2);

const container = world.createBody({
  type: "static",
  position: { x: 0.0, y: 2.0 },
});
container.createFixture({
  shape: bottom,
  density: 4.0,
});
container.createFixture({
  shape: left,
  density: 4.0,
});
container.createFixture({
  shape: right,
  density: 4.0,
});
