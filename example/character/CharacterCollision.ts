/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This is a test of typical character collision scenarios. This does not
// show how you should implement a character in your application.
// Instead this is used to test smooth collision on edge chains.

import { World, Vec2Value, Edge, Chain, Box, Polygon, Circle, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.info(`
  This tests various character collision shapes.
  Limitation: square and hexagon can snag on aligned boxes.
  Feature: edge chains have smooth collision inside and out.
`);
testbed.start(world);

// Ground body
const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -20.0, y: 0.0 }, { x: 20.0, y: 0.0 }),
  density: 0.0,
});

// Collinear edges with no adjacency information.
// This shows the problematic case where a box shape can hit
// an internal vertex.
const edge = world.createBody({
  type: "static",
});
edge.createFixture({
  shape: new Edge({ x: -8.0, y: 1.0 }, { x: -6.0, y: 1.0 }),
  density: 0.0,
});
edge.createFixture({
  shape: new Edge({ x: -6.0, y: 1.0 }, { x: -4.0, y: 1.0 }),
  density: 0.0,
});
edge.createFixture({
  shape: new Edge({ x: -4.0, y: 1.0 }, { x: -2.0, y: 1.0 }),
  density: 0.0,
});

// Chain shape
const chain = world.createBody({
  type: "static",
  position: { x: 0, y: 0 },
  angle: 0.25 * Math.PI,
});
chain.createFixture(
  new Chain([
    { x: 5.0, y: 7.0 },
    { x: 6.0, y: 8.0 },
    { x: 7.0, y: 8.0 },
    { x: 8.0, y: 7.0 },
  ]),
  0.0,
);

// Square tiles. This shows that adjacency shapes may
// have non-smooth collision. There is no solution
// to this problem.
const tiles = world.createBody({
  type: "static",
});
tiles.createFixture({
  shape: new Box(1.0, 1.0, { x: 4.0, y: 3.0 }, 0.0),
  density: 0.0,
});
tiles.createFixture({
  shape: new Box(1.0, 1.0, { x: 6.0, y: 3.0 }, 0.0),
  density: 0.0,
});
tiles.createFixture({
  shape: new Box(1.0, 1.0, { x: 8.0, y: 3.0 }, 0.0),
  density: 0.0,
});

// Square made from an edge loop. Collision should be smooth.
const square = world.createBody({
  type: "static",
});
square.createFixture(
  new Chain(
    [
      { x: -1.0, y: 3.0 },
      { x: 1.0, y: 3.0 },
      { x: 1.0, y: 5.0 },
      { x: -1.0, y: 5.0 },
    ],
    true,
  ),
  0.0,
);

// Edge loop. Collision should be smooth.
const loop = world.createBody({
  type: "static",
  position: { x: -10.0, y: 4.0 },
});
loop.createFixture(
  new Chain(
    [
      { x: 0.0, y: 0.0 },
      { x: 6.0, y: 0.0 },
      { x: 6.0, y: 2.0 },
      { x: 4.0, y: 1.0 },
      { x: 2.0, y: 2.0 },
      { x: 0.0, y: 2.0 },
      { x: -2.0, y: 2.0 },
      { x: -4.0, y: 3.0 },
      { x: -6.0, y: 2.0 },
      { x: -6.0, y: 0.0 },
    ],
    true,
  ),
  0.0,
);

// Square character 1
const char1 = world.createBody({
  type: "dynamic",
  position: { x: -3.0, y: 8.0 },
  fixedRotation: true,
  allowSleep: false,
});
char1.createFixture({
  shape: new Box(0.5, 0.5),
  density: 20.0,
});

// Square character 2
const char2 = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 5.0 },
  fixedRotation: true,
  allowSleep: false,
});
char2.createFixture({
  shape: new Box(0.25, 0.25),
  density: 20.0,
});

// Hexagon character
const hex = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 8.0 },
  fixedRotation: true,
  allowSleep: false,
});

let angle = 0.0;
const delta = Math.PI / 3.0;
const vertices: Vec2Value[] = [];
for (let i = 0; i < 6; ++i) {
  vertices[i] = { x: 0.5 * Math.cos(angle), y: 0.5 * Math.sin(angle) };
  angle += delta;
}

hex.createFixture({
  shape: new Polygon(vertices),
  density: 20.0,
});

// Circle character
const circle = world.createBody({
  type: "dynamic",
  position: { x: 3.0, y: 5.0 },
  fixedRotation: true,
  allowSleep: false,
});
circle.createFixture({
  shape: new Circle(0.5),
  density: 20.0,
});

// Circle character
const character = world.createBody({
  type: "dynamic",
  position: { x: -7.0, y: 6.0 },
  allowSleep: false,
});
character.createFixture({
  shape: new Circle(0.25),
  density: 20.0,
  friction: 1.0,
});

testbed.step = function () {
  const v = character.getLinearVelocity();
  v.x = -5.0;
  character.setLinearVelocity(v);
};
