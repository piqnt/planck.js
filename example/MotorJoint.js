/*
 * Copyright (c) Erin Catto
 *
 * This source code is licensed under the MIT license.
 */

// This test shows how to use a motor joint. A motor joint
// can be used to animate a dynamic body. With finite motor forces
// the body can be blocked by collision with other bodies.

const { Vec2, World, MotorJoint, Box, Edge, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let time = 0;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)));

// Define motorized body
let body = world.createDynamicBody(new Vec2(0.0, 8.0));
body.createFixture(new Box(2.0, 0.5), {
  friction : 0.6,
  density : 2.0
});

let joint = world.createJoint(new MotorJoint({
  maxForce : 1000.0,
  maxTorque : 1000.0
}, ground, body));

testbed.step = function(dt) {
  time += Math.min(dt, 100) / 1000;

  joint.setLinearOffset(new Vec2(
    6.0 * Math.sin(2.0 * time),
    8.0 + 4.0 * Math.sin(1.0 * time),
  ));
  joint.setAngularOffset(4.0 * time);
};
