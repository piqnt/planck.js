/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2010 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
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

  var fd = {};
  fd.density = 20.0;
  fd.friction = 0.2;
  fd.filterCategoryBits = 0x0001;
  fd.filterMaskBits = 0xFFFF & ~0x0002;

  var jd = {};
  jd.collideConnected = false;

  var N = 10;
  var y = 15.0;

  var prevBody = ground;
  for (var i = 0; i < N; ++i) {
    var shape = pl.Box(0.5, 0.125);
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(0.5 + 1.0 * i, y);
    if (i == N - 1) {
      shape = pl.Box(1.5, 1.5);
      fd.density = 100.0;
      fd.filterCategoryBits = 0x0002;
      bd.position = Vec2(1.0 * i, y);
      bd.angularDamping = 0.4;
    }

    var body = world.createBody(bd);

    body.createFixture(shape, fd);

    var anchor = Vec2(i, y);
    world.createJoint(pl.RevoluteJoint(jd, prevBody, body, anchor));

    prevBody = body;
  }

  var m_ropeDef = {};
  m_ropeDef.maxLength = N - 1.0 + 0.01;
  m_ropeDef.localAnchorA = Vec2(0.0, y);
  m_ropeDef.localAnchorB = Vec2(0, 0);
  var m_rope = world.createJoint(pl.RopeJoint(m_ropeDef, ground, prevBody));

  testbed.info('X: Toggle the rope joint');

  testbed.keydown = function(code, char) {
    if (char === 'X') {
      if (m_rope) {
        world.destroyJoint(m_rope);
        m_rope = null;
      } else {
        m_rope = world.createJoint(pl.RopeJoint(m_ropeDef, ground, prevBody));
      }
    }

    updateStatus();
  };

  function updateStatus() {
    testbed.status('Rope', !!m_rope);
  }

  updateStatus();

  return world;
});
