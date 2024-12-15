/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Circle, Box, Math, Testbed } from "planck";

let world = new World(new Vec2(0, 0));

const testbed = Testbed.mount();
testbed.y = 0;
testbed.hz = 60;
testbed.speed = 1;
testbed.start(world);

let circle = new Circle(0.1);

for (let i = 0; i < 50; ++i) {
  let b = world.createBody({
    type: "dynamic",
    position: new Vec2(Math.random() * -6, Math.random() * 2 - 1),
  });
  b.createFixture(circle, 0.01);
}

let box = world.createBody({
  type: "dynamic",
  position: new Vec2(-40.0, 0.0),
  bullet: true,
});

box.createFixture(new Box(1.5, 1.5), 1.0);
box.setLinearVelocity(new Vec2(100.0, 0.0));
