/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, Vec2, Edge, Circle, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 10;
const bodies: Body[] = [];

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

const circle = new Circle(1.0);

for (let i = 0; i < COUNT; ++i) {
  bodies[i] = world.createDynamicBody(new Vec2(0.0, 4.0 + 3.0 * i));
  bodies[i].createFixture(circle, 1.0);
  bodies[i].setLinearVelocity(new Vec2(0.0, -50.0));
}
