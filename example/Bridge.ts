/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 */
import planck from "../src/main";

const { Vec2, World, Edge, Box, Polygon, Circle, RevoluteJoint, Testbed } =
  planck;

const world = new World(new Vec2(0, -4));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 30;

let middle: planck.Body;

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

const bridgeRect = new Box(0.5, 0.125);

const bridgeFD = {
  density: 20.0,
  friction: 0.2,
};

let prevBody = ground;
for (let i = 0; i < COUNT; ++i) {
  const body = world.createDynamicBody(new Vec2(-14.5 + 1.0 * i, 5.0));
  body.createFixture(bridgeRect, bridgeFD);

  const anchor = new Vec2(-15.0 + 1.0 * i, 5.0);
  world.createJoint(new RevoluteJoint({}, prevBody, body, anchor));

  if (i * 2 === COUNT) {
    middle = body;
  }
  prevBody = body;
}

const anchor = new Vec2(-15.0 + 1.0 * COUNT, 5.0);
world.createJoint(new RevoluteJoint({}, prevBody, ground, anchor));

for (let i = 0; i < 2; ++i) {
  const body = world.createDynamicBody(new Vec2(-8.0 + 8.0 * i, 12.0));

  const vertices = [
    new Vec2(-0.5, 0.0),
    new Vec2(0.5, 0.0),
    new Vec2(0.0, 1.5),
  ];
  body.createFixture(new Polygon(vertices), 1.0);
}

const shape = new Circle(0.5);
for (let i = 0; i < 3; ++i) {
  const body = world.createDynamicBody(new Vec2(-6.0 + 6.0 * i, 10.0));
  body.createFixture(shape, 1.0);
}
