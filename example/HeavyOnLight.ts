/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Edge, Circle, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

world.createBody().createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)));

world.createDynamicBody(new Vec2(0.0, 4.5)).createFixture(new Circle(0.5), 10.0);

world.createDynamicBody(new Vec2(0.0, 10.0)).createFixture(new Circle(5.0), 10.0);
