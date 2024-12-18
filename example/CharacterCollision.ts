/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This is a test of typical character collision scenarios. This does not
// show how you should implement a character in your application.
// Instead this is used to test smooth collision on edge chains.

import { World, Vec2, Edge, Chain, Box, Polygon, Circle, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.info(`
  This tests various character collision shapes.
  Limitation: square and hexagon can snag on aligned boxes.
  Feature: edge chains have smooth collision inside and out.
`);
testbed.start(world);

// Ground body
const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), 0.0);

// Collinear edges with no adjacency information.
// This shows the problematic case where a box shape can hit
// an internal vertex.
const edge = world.createBody();
edge.createFixture(new Edge(new Vec2(-8.0, 1.0), new Vec2(-6.0, 1.0)), 0.0);
edge.createFixture(new Edge(new Vec2(-6.0, 1.0), new Vec2(-4.0, 1.0)), 0.0);
edge.createFixture(new Edge(new Vec2(-4.0, 1.0), new Vec2(-2.0, 1.0)), 0.0);

// Chain shape
const chain = world.createBody(new Vec2(), 0.25 * Math.PI);
chain.createFixture(
  new Chain([new Vec2(5.0, 7.0), new Vec2(6.0, 8.0), new Vec2(7.0, 8.0), new Vec2(8.0, 7.0)]),
  0.0,
);

// Square tiles. This shows that adjacency shapes may
// have non-smooth collision. There is no solution
// to this problem.
const tiles = world.createBody();
tiles.createFixture(new Box(1.0, 1.0, new Vec2(4.0, 3.0), 0.0), 0.0);
tiles.createFixture(new Box(1.0, 1.0, new Vec2(6.0, 3.0), 0.0), 0.0);
tiles.createFixture(new Box(1.0, 1.0, new Vec2(8.0, 3.0), 0.0), 0.0);

// Square made from an edge loop. Collision should be smooth.
const square = world.createBody();
square.createFixture(
  new Chain(
    [new Vec2(-1.0, 3.0), new Vec2(1.0, 3.0), new Vec2(1.0, 5.0), new Vec2(-1.0, 5.0)],
    true,
  ),
  0.0,
);

// Edge loop. Collision should be smooth.
const loop = world.createBody(new Vec2(-10.0, 4.0));
loop.createFixture(
  new Chain(
    [
      new Vec2(0.0, 0.0),
      new Vec2(6.0, 0.0),
      new Vec2(6.0, 2.0),
      new Vec2(4.0, 1.0),
      new Vec2(2.0, 2.0),
      new Vec2(0.0, 2.0),
      new Vec2(-2.0, 2.0),
      new Vec2(-4.0, 3.0),
      new Vec2(-6.0, 2.0),
      new Vec2(-6.0, 0.0),
    ],
    true,
  ),
  0.0,
);

// Square character 1
const char1 = world.createBody({
  position: new Vec2(-3.0, 8.0),
  type: "dynamic",
  fixedRotation: true,
  allowSleep: false,
});
char1.createFixture(new Box(0.5, 0.5), 20.0);

// Square character 2
const char2 = world.createBody({
  position: new Vec2(-5.0, 5.0),
  type: "dynamic",
  fixedRotation: true,
  allowSleep: false,
});
char2.createFixture(new Box(0.25, 0.25), 20.0);

// Hexagon character
const hex = world.createBody({
  position: new Vec2(-5.0, 8.0),
  type: "dynamic",
  fixedRotation: true,
  allowSleep: false,
});

let angle = 0.0;
const delta = Math.PI / 3.0;
const vertices: Vec2[] = [];
for (let i = 0; i < 6; ++i) {
  vertices[i] = new Vec2(0.5 * Math.cos(angle), 0.5 * Math.sin(angle));
  angle += delta;
}

hex.createFixture(new Polygon(vertices), 20.0);

// Circle character
const circle = world.createBody({
  position: new Vec2(3.0, 5.0),
  type: "dynamic",
  fixedRotation: true,
  allowSleep: false,
});
circle.createFixture(new Circle(0.5), 20.0);

// Circle character
const character = world.createBody({
  position: new Vec2(-7.0, 6.0),
  type: "dynamic",
  allowSleep: false,
});
character.createFixture(new Circle(0.25), {
  density: 20.0,
  friction: 1.0,
});

testbed.step = function () {
  const v = character.getLinearVelocity();
  v.x = -5.0;
  character.setLinearVelocity(v);
};
