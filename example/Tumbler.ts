/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Box, RevoluteJoint, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 200;

const ground = world.createBody();

const container = world.createDynamicBody({
  allowSleep: false,
  position: new Vec2(0, 10),
});

container.createFixture(new Box(0.5, 20, new Vec2(20, 0), 0), 5);
container.createFixture(new Box(0.5, 20, new Vec2(-20, 0), 0), 5);
container.createFixture(new Box(20, 0.5, new Vec2(0, 20), 0), 5);
container.createFixture(new Box(20, 0.5, new Vec2(0, -20), 0), 5);

world.createJoint(
  new RevoluteJoint(
    {
      motorSpeed: 0.08 * Math.PI,
      maxMotorTorque: 1e8,
      enableMotor: true,
    },
    ground,
    container,
    new Vec2(0, 10),
  ),
);

const shape = new Box(0.5, 0.5);
let count = 0;
while (count < COUNT) {
  const body = world.createDynamicBody();
  body.setPosition(new Vec2(Math.random() * 20 - 10, 10 + Math.random() * 20 - 10));
  body.createFixture(shape, 1);
  ++count;
}
