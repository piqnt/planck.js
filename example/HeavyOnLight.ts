/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Circle, Testbed } from "planck";

const world = new World({ x: 0, y: -10 });

const testbed = Testbed.mount();
testbed.start(world);

world.createBody().createFixture(new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }));

world.createDynamicBody({ x: 0.0, y: 4.5 }).createFixture(new Circle(0.5), 10.0);

world.createDynamicBody({ x: 0.0, y: 10.0 }).createFixture(new Circle(5.0), 10.0);
