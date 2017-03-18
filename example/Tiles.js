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

// This stress tests the dynamic tree broad-phase. This also shows that tile
// based collision is _not_ smooth due to Box2D not knowing about adjacency.
planck.testbed('Tiles', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  var e_count = 20;

  var m_fixtureCount = 0;

  var a = 0.5;
  var ground = world.createBody(Vec2(0, -a));

  if (1) {
    var N = 200;
    var M = 10;
    var position = Vec2();
    position.y = 0.0;
    for (var j = 0; j < M; ++j) {
      position.x = -N * a;
      for (var i = 0; i < N; ++i) {
        ground.createFixture(pl.Box(a, a, position, 0.0), 0.0);
        ++m_fixtureCount;
        position.x += 2.0 * a;
      }
      position.y -= 2.0 * a;
    }

  } else {
    var N = 200;
    var M = 10;
    var position = Vec2();
    position.x = -N * a;
    for (var i = 0; i < N; ++i) {
      position.y = 0.0;
      for (var j = 0; j < M; ++j) {
        ground.createFixture(pl.Box(a, a, position, 0.0), 0.0);
        position.y -= 2.0 * a;
      }
      position.x += 2.0 * a;
    }
  }

  var a = 0.5;
  var shape = pl.Box(a, a);

  var x = Vec2(-7.0, 0.75);
  var y = Vec2();
  var deltaX = Vec2(0.5625, 1.25);
  var deltaY = Vec2(1.125, 0.0);

  var bd = {};
  bd.type = 'dynamic';
  for (var i = 0; i < e_count; ++i) {
    y = x;

    for (var j = i; j < e_count; ++j) {
      bd.position = y;

      // bd.allowSleep = !(i == 0 && j == 0)

      var body = world.createBody(bd);
      body.createFixture(shape, 5.0);
      ++m_fixtureCount;
      y.add(deltaY);
    }

    x.add(deltaX);
  }

  var m_createTime = Date.now();

  testbed.step = function() {
    var height = world.getTreeHeight();
    var leafCount = world.getProxyCount();
    var minimumNodeCount = 2 * leafCount - 1;
    var minimumHeight = Math.ceil(Math.log(minimumNodeCount) / Math.log(2.0));

    testbed.status("dynamic tree height", height);
    testbed.status("min", minimumHeight);
    testbed.status("create time", m_createTime + "ms");
    testbed.status("fixture count", m_fixtureCount);

    // var tree = world.m_broadPhase.m_tree;
    // if (world.m_stepCount == 400) {
    // tree.rebuildBottomUp();
    // }
  };

  return world;
});
