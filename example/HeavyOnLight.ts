/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Circle, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
});

const light = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 4.5 },
});
light.createFixture({
  shape: new Circle(0.5),
  density: 10.0,
});

const heavy = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 10.0 },
});
heavy.createFixture({
  shape: new Circle(5.0),
  density: 10.0,
});
