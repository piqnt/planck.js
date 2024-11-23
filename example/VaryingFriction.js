/*
 * Copyright (c) Erin Catto
 *
 * This source code is licensed under the MIT license.
 */

const { World, Vec2, Edge, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

world.createBody().createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)));

world.createBody(new Vec2(-4.0, 22.0), -0.25).createFixture(new Box(13.0, 0.25), 0.0);

world.createBody(new Vec2(10.5, 19.0)).createFixture(new Box(0.25, 1.0), 0.0);

world.createBody(new Vec2(4.0, 14.0), 0.25).createFixture(new Box(13.0, 0.25), 0.0);

world.createBody(new Vec2(-10.5, 11.0)).createFixture(new Box(0.25, 1.0), 0.0);

world.createBody(new Vec2(-4.0, 6.0), -0.25).createFixture(new Box(13.0, 0.25), 0.0);

const friction = [ 0.75, 0.5, 0.35, 0.1, 0.0 ];

const circle = new Box(0.5, 0.5);

for (let i = 0; i < friction.length; ++i) {
  const ball = world.createDynamicBody(new Vec2(-15.0 + 4.0 * i, 28.0));
  ball.createFixture(circle, {
    density: 25.0,
    friction: friction[i]
  });
}
