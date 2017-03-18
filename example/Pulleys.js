/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2007-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('Pulleys', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var y = 16.0;
  var L = 12.0;
  var a = 1.0;
  var b = 2.0;

  var ground = world.createBody();

  // ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  ground.createFixture(pl.Circle(Vec2(-10.0, y + b + L), 2.0), 0.0);
  ground.createFixture(pl.Circle(Vec2(10.0, y + b + L), 2.0), 0.0);

  var shape = pl.Box(a, b);

  var bd = {};
  bd.type = 'dynamic';

  // bd.fixedRotation = true;
  bd.position = Vec2(-10.0, y);
  var body1 = world.createBody(bd);
  body1.createFixture(shape, 5.0);

  bd.position = Vec2(10.0, y);
  var body2 = world.createBody(bd);
  body2.createFixture(shape, 5.0);

  var pjd = {};

  var anchor1 = Vec2(-10.0, y + b);
  var anchor2 = Vec2(10.0, y + b);
  var groundAnchor1 = Vec2(-10.0, y + b + L);
  var groundAnchor2 = Vec2(10.0, y + b + L);

  var m_joint1 = world.createJoint(pl.PulleyJoint(pjd, body1, body2,
      groundAnchor1, groundAnchor2, anchor1, anchor2, 1.5));

  testbed.step = function() {
    var ratio = m_joint1.setRatio();
    var L = m_joint1.getCurrentLengthA() + ratio * m_joint1.getCurrentLengthB();
    testbed.status('ratio', ratio);
    testbed.status('L (L1 * ratio + L2)', L);
  };

  return world;
});
