/*
 * Copyright (c) Erin Catto
 *
 * This source code is licensed under the MIT license.
 */

// Note: even with a restitution of 1.0, there is some energy change
// due to position correction.

const { World, Vec2, Circle, Edge, Testbed } = planck;

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)));

const restitution = [ 0.0, 0.1, 0.3, 0.5, 0.75, 0.9, 1.0 ];

const circle = new Circle(1.0);

for (let i = 0; i < restitution.length; ++i) {
  const ball = world.createDynamicBody(new Vec2(-10.0 + 3.0 * i, 20.0));
  ball.createFixture(circle, {
    density: 1.0,
    restitution: restitution[i]
  });
}
