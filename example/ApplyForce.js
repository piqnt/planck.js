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

const { Vec2, Transform, Polygon, Box, FrictionJoint, World, Edge } = planck;

var world = new World();

const testbed = planck.testbed();
testbed.y = -20;
testbed.start(world);

var ground = world.createBody(new Vec2(0.0, 20.0));

var wallFD = {
  density: 0.0,
  restitution: 0.4,
};

// Left vertical
ground.createFixture(new Edge(new Vec2(-20.0, -20.0), new Vec2(-20.0, 20.0)), wallFD);

// Right vertical
ground.createFixture(new Edge(new Vec2(20.0, -20.0), new Vec2(20.0, 20.0)), wallFD);

// Top horizontal
ground.createFixture(new Edge(new Vec2(-20.0, 20.0), new Vec2(20.0, 20.0)), wallFD);

// Bottom horizontal
ground.createFixture(new Edge(new Vec2(-20.0, -20.0), new Vec2(20.0, -20.0)), wallFD);

var xf1 = new Transform();
xf1.q.set(0.3524 * Math.PI);
xf1.p.set(xf1.q.getXAxis());

var poly1 = new Polygon([new Vec2(-1.0, 0.0), new Vec2(1.0, 0.0), new Vec2(0.0, 0.5)].map(Transform.mulFn(xf1)));

var xf2 = new Transform();
xf2.q.set(-0.3524 * Math.PI);
xf2.p.set(Vec2.neg(xf2.q.getXAxis()));

var poly2 = new Polygon([new Vec2(-1.0, 0.0), new Vec2(1.0, 0.0), new Vec2(0.0, 0.5)].map(Transform.mulFn(xf2)));

var jet = world.createBody({
  type : 'dynamic',
  angularDamping : 2.0,
  linearDamping : 0.5,
  position : new Vec2(0.0, 2.0),
  angle : Math.PI,
  allowSleep : false
});

jet.createFixture(poly1, 2.0);
jet.createFixture(poly2, 2.0);

var boxFD = {
  density: 1.0,
  friction: 0.3,
};

for (var i = 0; i < 10; ++i) {
  var box = world.createDynamicBody(new Vec2(0.0, 5.0 + 1.54 * i));

  box.createFixture(new Box(0.5, 0.5), boxFD);

  var gravity = 10.0;
  var I = box.getInertia();
  var mass = box.getMass();

  // For a circle: I = 0.5 * m * r * r ==> r = sqrt(2 * I / m)
  var radius = Math.sqrt(2.0 * I / mass);

  world.createJoint(new FrictionJoint({
    collideConnected : true,
    maxForce : mass * gravity,
    maxTorque : mass * radius * gravity
  }, ground, box));
}

testbed.step = function() {
  if (testbed.activeKeys.right && !testbed.activeKeys.left) {
    jet.applyAngularImpulse(-0.2, true);

  } else if (testbed.activeKeys.left && !testbed.activeKeys.right) {
    jet.applyAngularImpulse(+0.2, true);
  }

  if (testbed.activeKeys.up) {
    var f = jet.getWorldVector(new Vec2(0.0, -1.0));
    var p = jet.getWorldPoint(new Vec2(0.0, 2.0));
    jet.applyLinearImpulse(f, p, true);
  }
};
