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

// This test shows how a rope joint can be used to stabilize a chain of
// bodies with a heavy payload. Notice that the rope joint just prevents
// excessive stretching and has no other effect.
// By disabling the rope joint you can see that the Box2D solver has trouble
// supporting heavy bodies with light bodies. Try playing around with the
// densities, time step, and iterations to see how they affect stability.
// This test also shows how to use contact filtering. Filtering is configured
// so that the payload does not collide with the chain.

const { Vec2, World, Edge, Box, RevoluteJoint, RopeJoint, Testbed } = planck;

let world = new World({x: 0, y: -10});

const testbed = Testbed.mount();
testbed.info('X: Toggle the rope joint');
testbed.start(world);

let ground = world.createBody();

ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

let segmentDef = {
  density: 20.0,
  friction: 0.2,
  filterCategoryBits: 0x0001,
  filterMaskBits: 0xFFFF & ~0x0002,
};

let segmentJointDef = {
  collideConnected: false,
};

let N = 10;
let y = 15.0;

let prevBody = ground;
for (let i = 0; i < N; ++i) {
  let shape = new Box(0.5, 0.125);
  let bd = {
    type: 'dynamic',
    position: new Vec2(0.5 + 1.0 * i, y),
  };
  if (i === N - 1) {
    shape = new Box(1.5, 1.5);
    segmentDef.density = 100.0;
    segmentDef.filterCategoryBits = 0x0002;
    bd.position = new Vec2(1.0 * i, y);
    bd.angularDamping = 0.4;
  }

  let body = world.createBody(bd);

  body.createFixture(shape, segmentDef);

  let anchor = new Vec2(i, y);
  world.createJoint(new RevoluteJoint(segmentJointDef, prevBody, body, anchor));

  prevBody = body;
}

let ropeJointDef = {
  maxLength: N - 1.0 + 0.01,
  localAnchorA: new Vec2(0.0, y),
  localAnchorB: new Vec2(0, 0),
};
let rope = world.createJoint(new RopeJoint(ropeJointDef, ground, prevBody));

testbed.keydown = function(code, char) {
  if (char === 'X') {
    if (rope) {
      world.destroyJoint(rope);
      rope = null;
    } else {
      rope = world.createJoint(new RopeJoint(ropeJointDef, ground, prevBody));
    }
  }

  updateStatus();
};

function updateStatus() {
  testbed.status('Rope', !!rope);
}

updateStatus();
