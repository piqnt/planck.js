/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// A motor driven slider crank with joint friction.

const { World, Vec2, RevoluteJoint, PrismaticJoint, Edge, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);
testbed.info('Z: Toggle friction, X: Toggle motor');

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

// Define crank.
let crank = world.createDynamicBody(new Vec2(0.0, 7.0));
crank.createFixture(new Box(0.5, 2.0), 2.0);

let joint1 = world.createJoint(new RevoluteJoint({
  motorSpeed: Math.PI,
  maxMotorTorque: 10000.0,
  enableMotor: true
}, ground, crank, new Vec2(0.0, 5.0)));


// Define follower.
let follower = world.createDynamicBody(new Vec2(0.0, 13.0));
follower.createFixture(new Box(0.5, 4.0), 2.0);

world.createJoint(new RevoluteJoint({enableMotor: false}, crank, follower, new Vec2(0.0, 9.0)));

// Define piston
let piston = world.createBody({
  type: 'dynamic',
  fixedRotation: true,
  position: new Vec2(0.0, 17.0)
});
piston.createFixture(new Box(1.5, 1.5), 2.0);

world.createJoint(new RevoluteJoint({}, follower, piston, new Vec2(0.0, 17.0)));

let joint2 = world.createJoint(new PrismaticJoint({
  maxMotorForce: 1000.0,
  enableMotor: true
}, ground, piston, new Vec2(0.0, 17.0), new Vec2(0.0, 1.0)));

// Create a payload
let payload = world.createDynamicBody(new Vec2(0.0, 23.0));
payload.createFixture(new Box(1.5, 1.5), 2.0);

testbed.keydown = function(code, char) {
  switch (char) {
  case 'Z':
    joint2.enableMotor(!joint2.isMotorEnabled());
    joint2.getBodyB().setAwake(true);
    break;

  case 'X':
    joint1.enableMotor(!joint1.isMotorEnabled());
    joint1.getBodyB().setAwake(true);
    break;
  }
};

testbed.step = function() {
  let torque = joint1.getMotorTorque(1 / 60);
  testbed.status('Motor Torque', torque);
};
