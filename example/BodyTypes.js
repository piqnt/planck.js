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

const { Vec2, World, Edge, Box, RevoluteJoint, PrismaticJoint, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.info('Z: Dynamic, X: Static, C: Kinematic');
testbed.start(world);

let SPEED = 3.0;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)));

// Define attachment
let attachment = world.createDynamicBody(new Vec2(0.0, 3.0));
attachment.createFixture(new Box(0.5, 2.0), 2.0);

// Define platform
let platform = world.createDynamicBody(new Vec2(-4.0, 5.0));

platform.createFixture(
  new Box(0.5, 4.0, new Vec2(4.0, 0.0), 0.5 * Math.PI),
  { friction : 0.6, density : 2.0 }
);

world.createJoint(new RevoluteJoint({
  maxMotorTorque : 50.0,
  enableMotor : true
}, attachment, platform, new Vec2(0.0, 5.0)));

world.createJoint(new PrismaticJoint({
  maxMotorForce : 1000.0,
  enableMotor : true,
  lowerTranslation : -10.0,
  upperTranslation : 10.0,
  enableLimit : true
}, ground, platform, new Vec2(0.0, 5.0), new Vec2(1.0, 0.0)));

// Create a payload
let payload = world.createDynamicBody(new Vec2(0.0, 8.0));
payload.createFixture(
  new Box(0.75, 0.75),
  { friction : 0.6, density : 2.0 }
);

testbed.keydown = function(code, char) {
  if (char === 'Z') {
    platform.setDynamic();

  } else if (char === 'X') {
    platform.setStatic();

  } else if (char === 'C') {
    platform.setKinematic();
    platform.setLinearVelocity(new Vec2(-SPEED, 0.0));
    platform.setAngularVelocity(0.0);
  }
};

testbed.step = function() {
  // Drive the kinematic body.
  if (platform.isKinematic()) {
    let p = platform.getTransform().p;
    let v = platform.getLinearVelocity();

    if ((p.x < -10.0 && v.x < 0.0) || (p.x > 10.0 && v.x > 0.0)) {
      v.x = -v.x;
      platform.setLinearVelocity(v);
    }
  }
};
