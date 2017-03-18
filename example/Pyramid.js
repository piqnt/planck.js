/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('Pyramid', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_count = 20;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var a = 0.5;
  var shape = pl.Box(a, a);

  var x = Vec2(-7.0, 0.75);
  var y = Vec2();
  var deltaX = Vec2(0.5625, 1.25);
  var deltaY = Vec2(1.125, 0.0);

  for (var i = 0; i < e_count; ++i) {
    y.set(x);
    for (var j = i; j < e_count; ++j) {

      var body = world.createDynamicBody(y);
      body.createFixture(shape, 5.0);

      y.add(deltaY);
    }
    x.add(deltaX);
  }

  testbed.step = function() {
    // var tree = world.m_broadPhase.m_tree;
    // if (world.m_stepCount == 400) {
    // tree.rebuildBottomUp();
    // }
  };

  return world;
});
