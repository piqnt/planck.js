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

// This tests bullet collision and provides an example of a gameplay scenario.
// This also uses a loop shape.

const { World, Vec2, Circle, Box, Chain, RevoluteJoint } = planck;

var world = new World(new Vec2(0, -10));

const testbed = planck.testbed();
testbed.start(world);

// Ground body
var ground = world.createBody();
ground.createFixture(new Chain([
  new Vec2(0.0, -2.0),
  new Vec2(8.0, 6.0),
  new Vec2(8.0, 20.0),
  new Vec2(-8.0, 20.0),
  new Vec2(-8.0, 6.0)
], true), 0.0);

// Flippers
var pLeft = new Vec2(-2.0, 0.0);
var pRight = new Vec2(2.0, 0.0);

var leftFlipper = world.createDynamicBody(new Vec2(-2.0, 0.0));
var rightFlipper = world.createDynamicBody(new Vec2(2.0, 0.0));

leftFlipper.createFixture(new Box(1.75, 0.1), 1.0);
rightFlipper.createFixture(new Box(1.75, 0.1), 1.0);

var jd = {};
jd.enableMotor = true;
jd.maxMotorTorque = 1000.0;
jd.enableLimit = true;
jd.motorSpeed = 0.0;

jd.lowerAngle = -30.0 * Math.PI / 180.0;
jd.upperAngle = 5.0 * Math.PI / 180.0;
var leftJoint = new RevoluteJoint(jd, ground, leftFlipper, leftFlipper.getPosition());
world.createJoint(leftJoint);

jd.lowerAngle = -5.0 * Math.PI / 180.0;
jd.upperAngle = 30.0 * Math.PI / 180.0;
var rightJoint = new RevoluteJoint(jd, ground, rightFlipper, rightFlipper.getPosition());
world.createJoint(rightJoint);

// Circle character
var ball = world.createBody({
  position : new Vec2(1.0, 15.0),
  type : 'dynamic',
  bullet : true
});
ball.createFixture(new Circle(0.2), 1.0);

testbed.step = function() {
  if (testbed.activeKeys.right) {
    rightJoint.setMotorSpeed(-20.0);
  } else {
    rightJoint.setMotorSpeed(10.0);
  }

  if (testbed.activeKeys.left) {
    leftJoint.setMotorSpeed(20.0);
  } else {
    leftJoint.setMotorSpeed(-10.0);
  }
}
