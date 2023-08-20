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

// The motor in this test gets smoother with higher velocity iterations.

const { World, Vec2, PrismaticJoint, Edge, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let MOTOR_SPEED = 10;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

let body = world.createBody({
  type : 'dynamic',
  position : new Vec2(-10.0, 10.0),
  angle : 0.5 * Math.PI,
  allowSleep : false
});
body.createFixture(new Box(2.0, 0.5), 5.0);

// Bouncy limit
let axis = new Vec2(2.0, 1.0);
axis.normalize();
let joint = new PrismaticJoint({
  motorSpeed : MOTOR_SPEED,
  maxMotorForce : 10000.0,
  enableMotor : true,
  lowerTranslation : 0.0,
  upperTranslation : 20.0,
  enableLimit : true
}, ground, body, new Vec2(0.0, 0.0), axis);

// Non-bouncy limit
// (ground, body, new Vec2(-10.0, 10.0), new Vec2(1.0, 0.0));

world.createJoint(joint);

testbed.step = function() {
  if (testbed.activeKeys.right && !testbed.activeKeys.left) {
    joint.enableLimit(true);
    joint.enableMotor(true);
    joint.setMotorSpeed(+MOTOR_SPEED);

  } else if (testbed.activeKeys.left && !testbed.activeKeys.right) {
    joint.enableLimit(true);
    joint.enableMotor(true);
    joint.setMotorSpeed(-MOTOR_SPEED);

  } else if (testbed.activeKeys.up && !testbed.activeKeys.down) {
    joint.enableLimit(false);
    joint.enableMotor(true);
    joint.setMotorSpeed(+MOTOR_SPEED);

  } else if (testbed.activeKeys.down && !testbed.activeKeys.up) {
    joint.enableLimit(false);
    joint.enableMotor(true);
    joint.setMotorSpeed(-MOTOR_SPEED);

  } else {
    joint.enableLimit(true);
    joint.enableMotor(false);
  }

  let force = joint.getMotorForce(1 / 60);
  testbed.status('Motor Force', force);
};
