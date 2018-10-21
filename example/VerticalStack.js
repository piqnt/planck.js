/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
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

planck.testbed('VerticalStack', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = new pl.World({
    gravity: Vec2(0, -10),
    blockSolve: true,
  });

  var columnCount = 2;
  var rowCount = 15;

  var bullet;
  var bodies = [];
  var indices = [];

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)));
  ground.createFixture(pl.Edge(Vec2(20.0, 0.0), Vec2(20.0, 20.0)));

  var xs = [ 0.0, -10.0, -5.0, 5.0, 10.0 ];

  var shape = pl.Box(0.5, 0.5);

  for (var j = 0; j < columnCount; ++j) {
    for (var i = 0; i < rowCount; ++i) {
      var n = j * rowCount + i;
      indices[n] = n;
      var x = 0.0;
      // var x = pl.Math.random(-0.02, 0.02);
      // var x = i % 2 == 0 ? -0.01 : 0.01;

      var body = world.createDynamicBody();
      body.setUserData(indices[n]);
      body.setPosition(Vec2(xs[j] + x, 0.55 + 1.1 * i));
      body.createFixture(shape, {
        density : 1.0,
        friction : 0.3
      });

      bodies[n] = body;
    }
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'X':
      if (bullet != null) {
        world.destroyBody(bullet);
        bullet = null;
      }

      bullet = world.createBody({
        type: 'dynamic',
        bullet: true,
        position: Vec2(-31.0, 5.0),
      });

      bullet.createFixture({
        shape: pl.Circle(0.25),
        density: 20.0,
        restitution: 0.05,
      });

      bullet.setLinearVelocity(Vec2(400.0, 0.0));
      break;

    case 'Z':
      world.m_blockSolve = !world.m_blockSolve;
      break;
    }
  };

  testbed.info("X: Launch a bullet");

  testbed.step = function() {
    testbed.status("Blocksolve", world.m_blockSolve);

    // if (stepCount++ == 300) {
    // if (bullet != null)
    // {
    // world.destroyBody(bullet);
    // bullet = null;
    // }

    // {
    // var shape = pl.Circle(0.25);

    // var fd = {};
    // fd.shape = shape;
    // fd.density = 20.0;
    // fd.restitution = 0.05;

    // var bd = {};
    // bd.type = 'dynamic';
    // bd.bullet = true;
    // bd.position.set(-31.0, 5.0);

    // bullet = world.createBody(bd);
    // bullet.createFixture(fd);

    // bullet.setLinearVelocity(Vec2(400.0, 0.0));
    // }
    // }
  };

  return world;
});
