/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2009      Erin Catto  http://www.box2d.org
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

planck.testbed('Confined', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World();

  var e_columnCount = 0;
  var e_rowCount = 0;
  var ground = world.createBody();

  // Floor
  ground.createFixture(pl.Edge(Vec2(-10, 0), Vec2(10, 0)), 0);

  // Left wall
  ground.createFixture(pl.Edge(Vec2(-10, 0), Vec2(-10, 20)), 0);

  // Right wall
  ground.createFixture(pl.Edge(Vec2(10, 0), Vec2(10, 20)), 0);

  // Roof
  ground.createFixture(pl.Edge(Vec2(-10, 20), Vec2(10, 20)), 0);

  var radius = 0.5;
  var shape = pl.Circle(radius);

  var fd = {};
  fd.density = 1.0;
  fd.friction = 0.1;

  for (var j = 0; j < e_columnCount; ++j) {
    for (var i = 0; i < e_rowCount; ++i) {
      var body = world.createDynamicBody(Vec2(-10 + (2.1 * j + 1 + 0.01 * i) * radius, (2 * i + 1) * radius));
      body.createFixture(shape, fd);
    }
  }

  function CreateCircle() {
    var body = world.createDynamicBody(Vec2(Math.random() * 10 - 5, Math.random() * 10 + 5));
    // bd.allowSleep = false;
    body.createFixture(pl.Circle(Math.random() * 2.5 + 0.5), {
      density : 1.0,
      friction : 0.0
    });
  }

  testbed.keydown = function(code, char) {
    if (testbed.activeKeys.fire) {
      CreateCircle();
    }
  };

  testbed.step = function() {
    var sleeping = true;
    for (var b = world.getBodyList(); b; b = b.getNext()) {
      if (b.isDynamic() && b.isAwake()) {
        sleeping = false;
      }
    }

    // ?
    // if (world.m_stepCount == 180) {
    //   world.m_stepCount += 0;
    // }

    if (sleeping) {
      CreateCircle();
    }

    // for (var b = world.getBodyList(); b; b = b.getNext()) {
    //   if (!b.isDynamic()) {
    //     continue;
    //   }
    //
    //   var p = b.getPosition();
    //   if (p.x <= -10.0 || 10.0 <= p.x || p.y <= 0.0 || 20.0 <= p.y) {
    //     // why?
    //     p.x += 0.0;
    //   }
    // }
  };

  return world;
});
