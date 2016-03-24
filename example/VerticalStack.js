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

planck.play('VerticalStack', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var columnCount = 1;
  var rowCount = 15

  var bullet;
  var bodies = [];
  var indices = [];

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)));
  ground.createFixture(pl.Edge(Vec2(20.0, 0.0), Vec2(20.0, 20.0)));

  var xs = [ 0.0, -10.0, -5.0, 5.0, 10.0 ];

  var fd = {
    density : 1.0,
    friction : 0.3
  };
  var bd = {
    type : 'dynamic'
  };
  var shape = pl.Polygon().setAsBox(0.5, 0.5);

  for (var j = 0; j < columnCount; ++j) {
    for (var i = 0; i < rowCount; ++i) {
      var n = j * rowCount + i;
      indices[n] = n;
      bd.userData = indices[n];

      var x = 0.0;
      // var x = RandomFloat(-0.02, 0.02);
      // var x = i % 2 == 0 ? -0.01 : 0.01;

      var body = world.createBody(bd);
      body.setPosition(Vec2(xs[j] + x, 0.55 + 1.1 * i));
      body.createFixture(shape, fd);

      bodies[n] = body;
    }
  }

  function Keyboard(key) {
    switch (key) {
    case GLFW_KEY_COMMA:
      if (bullet != null) {
        world.destroyBody(bullet);
        bullet = null;
      }

      var shape = pl.Circle();
      shape.m_radius = 0.25;

      var fd = {};
      fd.shape = shape;
      fd.density = 20.0;
      fd.restitution = 0.05;

      var bd = {};
      bd.type = 'dynamic';
      bd.bullet = true;
      bd.position.set(-31.0, 5.0);

      bullet = world.createBody(bd);
      bullet.createFixture(fd);

      bullet.setLinearVelocity(Vec2(400.0, 0.0));
      break;

    case GLFW_KEY_B:
      g_blockSolve = !g_blockSolve;
      break;
    }
  }

  function Step(settings) {
    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine, "Press: (,) to launch a bullet.");
    m_textLine += DRAW_STRING_NEW_LINE;
    g_debugDraw.DrawString(5, m_textLine, "Blocksolve = %d", g_blockSolve);
    // if (m_stepCount == 300)
    // {
    // if (m_bullet != null)
    // {
    // world.destroyBody(m_bullet);
    // m_bullet = null;
    // }

    // {
    // var /*CircleShape*/ shape;
    // shape.m_radius = 0.25;

    // var /*FixtureDef*/ fd;
    // fd.shape = shape;
    // fd.density = 20.0;
    // fd.restitution = 0.05;

    // var /*BodyDef*/ bd;
    // bd.type = 'dynamic';
    // bd.bullet = true;
    // bd.position.set(-31.0, 5.0);

    // m_bullet = world.createBody(bd);
    // m_bullet.createFixture(fd);

    // m_bullet.setLinearVelocity(Vec2(400.0, 0.0));
    // }
    // }
  }

  return world;
});
