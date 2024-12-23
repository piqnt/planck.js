/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// A basic slider crank created for GDC tutorial: Understanding Constraints

import { World, Box, RevoluteJoint, PrismaticJoint, Testbed } from "planck";

const world = new World({ x: 0, y: -10 });

const testbed = Testbed.mount();
testbed.y = -15;
testbed.start(world);

const ground = world.createBody({ x: 0.0, y: 17.0 });

// Define crank.
const crank = world.createDynamicBody({ x: -8.0, y: 20.0 });
crank.createFixture(new Box(4.0, 1.0), 2.0);
world.createJoint(new RevoluteJoint({}, ground, crank, { x: -12.0, y: 20.0 }));

// Define connecting rod
const rod = world.createDynamicBody({ x: 4.0, y: 20.0 });
rod.createFixture(new Box(8.0, 1.0), 2.0);
world.createJoint(new RevoluteJoint({}, crank, rod, { x: -4.0, y: 20.0 }));

// Define piston
const piston = world.createDynamicBody({
  fixedRotation: true,
  position: { x: 12.0, y: 20.0 },
});
piston.createFixture(new Box(3.0, 3.0), 2.0);
world.createJoint(new RevoluteJoint({}, rod, piston, { x: 12.0, y: 20.0 }));
world.createJoint(new PrismaticJoint({}, ground, piston, { x: 12.0, y: 17.0 }, { x: 1.0, y: 0.0 }));
