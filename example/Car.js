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

// This is a fun demo that shows off the wheel joint

const { World, Vec2, Edge, Box, Circle, Polygon, RevoluteJoint, WheelJoint } = planck;

const testbed = planck.testbed();

var world = new World({
  gravity : new Vec2(0, -10)
});

testbed.speed = 1.3;
testbed.hz = 50;
testbed.info('←/→: Accelerate car, ↑/↓: Change spring frequency');
testbed.start(world);

// wheel spring settings
var HZ = 4.0;
var ZETA = 0.7;
var SPEED = 50.0;

var ground = world.createBody();

var groundFD = {
  density : 0.0,
  friction : 0.6
};

ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), groundFD);

var hs = [ 0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0, -2.0, -1.25, 0.0 ];

var x = 20.0, y1 = 0.0, dx = 5.0;

for (var i = 0; i < 10; ++i) {
  var y2 = hs[i];
  ground.createFixture(new Edge(new Vec2(x, y1), new Vec2(x + dx, y2)), groundFD);
  y1 = y2;
  x += dx;
}

for (var i = 0; i < 10; ++i) {
  var y2 = hs[i];
  ground.createFixture(new Edge(new Vec2(x, y1), new Vec2(x + dx, y2)), groundFD);
  y1 = y2;
  x += dx;
}

ground.createFixture(new Edge(new Vec2(x, 0.0), new Vec2(x + 40.0, 0.0)), groundFD);

x += 80.0;
ground.createFixture(new Edge(new Vec2(x, 0.0), new Vec2(x + 40.0, 0.0)), groundFD);

x += 40.0;
ground.createFixture(new Edge(new Vec2(x, 0.0), new Vec2(x + 10.0, 5.0)), groundFD);

x += 20.0;
ground.createFixture(new Edge(new Vec2(x, 0.0), new Vec2(x + 40.0, 0.0)), groundFD);

x += 40.0;
ground.createFixture(new Edge(new Vec2(x, 0.0), new Vec2(x, 20.0)), groundFD);

// Teeter
var teeter = world.createDynamicBody(new Vec2(140.0, 1.0));
teeter.createFixture(new Box(10.0, 0.25), 1.0);
world.createJoint(new RevoluteJoint({
  lowerAngle : -8.0 * Math.PI / 180.0,
  upperAngle : 8.0 * Math.PI / 180.0,
  enableLimit : true
}, ground, teeter, teeter.getPosition()));

teeter.applyAngularImpulse(100.0, true);

// Bridge
var bridgeFD = {};
bridgeFD.density = 1.0;
bridgeFD.friction = 0.6;

var prevBody = ground;
for (var i = 0; i < 20; ++i) {
  var bridgeBlock = world.createDynamicBody(new Vec2(161.0 + 2.0 * i, -0.125));
  bridgeBlock.createFixture(new Box(1.0, 0.125), bridgeFD);

  world.createJoint(new RevoluteJoint({}, prevBody, bridgeBlock, new Vec2(160.0 + 2.0 * i, -0.125)));

  prevBody = bridgeBlock;
}

world.createJoint(new RevoluteJoint({}, prevBody, ground, new Vec2(160.0 + 2.0 * i, -0.125)));

// Boxes
var box = new Box(0.5, 0.5);

world.createDynamicBody(new Vec2(230.0, 0.5))
  .createFixture(box, 0.5);

world.createDynamicBody(new Vec2(230.0, 1.5))
  .createFixture(box, 0.5);

world.createDynamicBody(new Vec2(230.0, 2.5))
  .createFixture(box, 0.5);

world.createDynamicBody(new Vec2(230.0, 3.5))
  .createFixture(box, 0.5);

world.createDynamicBody(new Vec2(230.0, 4.5))
  .createFixture(box, 0.5);

// Car
var car = world.createDynamicBody(new Vec2(0.0, 1.0));
car.createFixture(new Polygon([
  new Vec2(-1.5, -0.5),
  new Vec2(1.5, -0.5),
  new Vec2(1.5, 0.0),
  new Vec2(0.0, 0.9),
  new Vec2(-1.15, 0.9),
  new Vec2(-1.5, 0.2)
]), 1.0);

var wheelFD = {};
wheelFD.density = 1.0;
wheelFD.friction = 0.9;

var wheelBack = world.createDynamicBody(new Vec2(-1.0, 0.35));
wheelBack.createFixture(new Circle(0.4), wheelFD);

var wheelFront = world.createDynamicBody(new Vec2(1.0, 0.4));
wheelFront.createFixture(new Circle(0.4), wheelFD);

var springBack = world.createJoint(new WheelJoint({
  motorSpeed : 0.0,
  maxMotorTorque : 20.0,
  enableMotor : true,
  frequencyHz : HZ,
  dampingRatio : ZETA
}, car, wheelBack, wheelBack.getPosition(), new Vec2(0.0, 1.0)));

var springFront = world.createJoint(new WheelJoint({
  motorSpeed : 0.0,
  maxMotorTorque : 10.0,
  enableMotor : false,
  frequencyHz : HZ,
  dampingRatio : ZETA
}, car, wheelFront, wheelFront.getPosition(), new Vec2(0.0, 1.0)));

testbed.keydown = function() {
  if (testbed.activeKeys.down) {
    HZ = Math.max(0.0, HZ - 1.0);
    springBack.setSpringFrequencyHz(HZ);
    springFront.setSpringFrequencyHz(HZ);

  } else if (testbed.activeKeys.up) {
    HZ += 1.0;
    springBack.setSpringFrequencyHz(HZ);
    springFront.setSpringFrequencyHz(HZ);
  }
};

testbed.step = function() {
  if (testbed.activeKeys.right && testbed.activeKeys.left) {
    springBack.setMotorSpeed(0);
    springBack.enableMotor(true);

  } else if (testbed.activeKeys.right) {
    springBack.setMotorSpeed(-SPEED);
    springBack.enableMotor(true);

  } else if (testbed.activeKeys.left) {
    springBack.setMotorSpeed(+SPEED);
    springBack.enableMotor(true);

  } else {
    springBack.setMotorSpeed(0);
    springBack.enableMotor(false);
  }

  var cp = car.getPosition();
  if (cp.x > testbed.x + 10) {
    testbed.x = cp.x - 10;

  } else if (cp.x < testbed.x - 10) {
    testbed.x = cp.x + 10;
  }
};
