/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// A basic slider crank created for GDC tutorial: Understanding Constraints

import { Vec2, World, Box, RevoluteJoint, PrismaticJoint, Testbed } from "planck";

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.y = -15;
testbed.start(world);

let ground = world.createBody(new Vec2(0.0, 17.0));

// Define crank.
let crank = world.createDynamicBody(new Vec2(-8.0, 20.0));
crank.createFixture(new Box(4.0, 1.0), 2.0);
world.createJoint(new RevoluteJoint({}, ground, crank, new Vec2(-12.0, 20.0)));

// Define connecting rod
let rod = world.createDynamicBody(new Vec2(4.0, 20.0));
rod.createFixture(new Box(8.0, 1.0), 2.0);
world.createJoint(new RevoluteJoint({}, crank, rod, new Vec2(-4.0, 20.0)));

// Define piston
let piston = world.createDynamicBody({
  fixedRotation: true,
  position: new Vec2(12.0, 20.0),
});
piston.createFixture(new Box(3.0, 3.0), 2.0);
world.createJoint(new RevoluteJoint({}, rod, piston, new Vec2(12.0, 20.0)));
world.createJoint(new PrismaticJoint({}, ground, piston, new Vec2(12.0, 17.0), new Vec2(1.0, 0.0)));
