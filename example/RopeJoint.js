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

/// This test shows how a rope joint can be used to stabilize a chain of
/// bodies with a heavy payload. Notice that the rope joint just prevents
/// excessive stretching and has no other effect.
/// By disabling the rope joint you can see that the Box2D solver has trouble
/// supporting heavy bodies with light bodies. Try playing around with the
/// densities, time step, and iterations to see how they affect stability.
/// This test also shows how to use contact filtering. Filtering is configured
/// so that the payload does not collide with the chain.
planck.testbed('RopeJoint', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();

  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var segmentDef = {};
  segmentDef.density = 20.0;
  segmentDef.friction = 0.2;
  segmentDef.filterCategoryBits = 0x0001;
  segmentDef.filterMaskBits = 0xFFFF & ~0x0002;

  var segmentJointDef = {};
  segmentJointDef.collideConnected = false;

  var N = 10;
  var y = 15.0;

  var prevBody = ground;
  for (var i = 0; i < N; ++i) {
    var shape = pl.Box(0.5, 0.125);
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(0.5 + 1.0 * i, y);
    if (i === N - 1) {
      shape = pl.Box(1.5, 1.5);
      segmentDef.density = 100.0;
      segmentDef.filterCategoryBits = 0x0002;
      bd.position = Vec2(1.0 * i, y);
      bd.angularDamping = 0.4;
    }

    var body = world.createBody(bd);

    body.createFixture(shape, segmentDef);

    var anchor = Vec2(i, y);
    world.createJoint(pl.RevoluteJoint(segmentJointDef, prevBody, body, anchor));

    prevBody = body;
  }

  var ropeJointDef = {};
  ropeJointDef.maxLength = N - 1.0 + 0.01;
  ropeJointDef.localAnchorA = Vec2(0.0, y);
  ropeJointDef.localAnchorB = Vec2(0, 0);
  var rope = world.createJoint(pl.RopeJoint(ropeJointDef, ground, prevBody));

  testbed.info('X: Toggle the rope joint');

  testbed.keydown = function(code, char) {
    if (char === 'X') {
      if (rope) {
        world.destroyJoint(rope);
        rope = null;
      } else {
        rope = world.createJoint(pl.RopeJoint(ropeJointDef, ground, prevBody));
      }
    }

    updateStatus();
  };

  function updateStatus() {
    testbed.status('Rope', !!rope);
  }

  updateStatus();

  return world;
});
