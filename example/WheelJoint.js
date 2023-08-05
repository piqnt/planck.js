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

// Test the wheel joint with motor, spring, and limit options.

var { World, Vec2, Edge, Box, Circle, Polygon, RevoluteJoint, WheelJoint } = planck;

var testbed = planck.testbed();

var world = new World({
  gravity : new Vec2(0, -10)
});

testbed.start(world); 

var ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);


var enableLimit = true;
var enableMotor = false;
var motorSpeed = 0.0;

var body = world.createBody({
  type : 'dynamic',
  position : new Vec2(0.0, 10.0),
  allowSleep : false
});
body.createFixture(new Circle(2.0), 5.0);

var mass = body.getMass();
var hertz = 1.0;
var dampingRatio = 0.7;
var omega = 2.0 * Math.PI * hertz;

var joint = new WheelJoint({
  motorSpeed : motorSpeed,
  maxMotorTorque : 10000.0,
  enableMotor : enableMotor,
  stiffness : mass * omega * omega,
  damping : 2.0 * mass * dampingRatio * omega,
  lowerTranslation : -3.0,
  upperTranslation : 3.0,
  enableLimit : enableLimit
}, ground, body, new Vec2(0.0, 10.0), new Vec2(0.0, 1.0));

world.createJoint(joint);

testbed.step = function() {
  var torque = joint.getMotorTorque(testbed.hz);
  testbed.status({
    "Motor Torque" : torque,
    "Motor Speed" : joint.getMotorSpeed(),
  });

  if (testbed.activeKeys.right && testbed.activeKeys.left) {
    joint.setMotorSpeed(0);
    joint.enableMotor(true);
  } else if (testbed.activeKeys.right) {
    joint.setMotorSpeed(-10);
    joint.enableMotor(true);
  } else if (testbed.activeKeys.left) {
    joint.setMotorSpeed(10);
    joint.enableMotor(true);
  } else {
    joint.setMotorSpeed(0);
    joint.enableMotor(false);
  }
};
