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

// This is a test of typical character collision scenarios. This does not
// show how you should implement a character in your application.
// Instead this is used to test smooth collision on edge chains.
planck.play('CharacterCollision', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, 0));

  // Ground body
  {
    var ground = world.createBody();
    ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), 0.0);
  }

  // Collinear edges with no adjacency information.
  // This shows the problematic case where a box shape can hit
  // an internal vertex.
  {
    var ground = world.createBody();

    ground.createFixture(pl.Edge(Vec2(-8.0, 1.0), Vec2(-6.0, 1.0)), 0.0);
    ground.createFixture(pl.Edge(Vec2(-6.0, 1.0), Vec2(-4.0, 1.0)), 0.0);
    ground.createFixture(pl.Edge(Vec2(-4.0, 1.0), Vec2(-2.0, 1.0)), 0.0);
  }

  // Chain shape
  {
    var ground = world.createBody(Vec2(), 0.25 * Math.PI);

    var vs = [];
    vs[0] = Vec2(5.0, 7.0);
    vs[1] = Vec2(6.0, 8.0);
    vs[2] = Vec2(7.0, 8.0);
    vs[3] = Vec2(8.0, 7.0);
    ground.createFixture(pl.Chain(vs), 0.0);
  }

  // Square tiles. This shows that adjacency shapes may
  // have non-smooth collision. There is no solution
  // to this problem.
  {
    var ground = world.createBody();
    ground.createFixture(pl.Box(1.0, 1.0, Vec2(4.0, 3.0), 0.0), 0.0);
    ground.createFixture(pl.Box(1.0, 1.0, Vec2(6.0, 3.0), 0.0), 0.0);
    ground.createFixture(pl.Box(1.0, 1.0, Vec2(8.0, 3.0), 0.0), 0.0);
  }

  // Square made from an edge loop. Collision should be smooth.
  {
    var ground = world.createBody();

    var vs = [];
    vs[0] = Vec2(-1.0, 3.0);
    vs[1] = Vec2(1.0, 3.0);
    vs[2] = Vec2(1.0, 5.0);
    vs[3] = Vec2(-1.0, 5.0);
    var shape = pl.Chain(vs, true);
    ground.createFixture(shape, 0.0);
  }

  // Edge loop. Collision should be smooth.
  {
    var ground = world.createBody(Vec2(-10.0, 4.0));

    var vs = [];
    vs[0] = Vec2(0.0, 0.0);
    vs[1] = Vec2(6.0, 0.0);
    vs[2] = Vec2(6.0, 2.0);
    vs[3] = Vec2(4.0, 1.0);
    vs[4] = Vec2(2.0, 2.0);
    vs[5] = Vec2(0.0, 2.0);
    vs[6] = Vec2(-2.0, 2.0);
    vs[7] = Vec2(-4.0, 3.0);
    vs[8] = Vec2(-6.0, 2.0);
    vs[9] = Vec2(-6.0, 0.0);
    ground.createFixture(pl.Chain(vs, true), 0.0);
  }

  // Square character 1
  {
    var bd = {};
    bd.position = Vec2(-3.0, 8.0);
    bd.type = 'dynamic';
    bd.fixedRotation = true;
    bd.allowSleep = false;

    var body = world.createBody(bd);

    var fd = {};
    fd.density = 20.0;
    body.createFixture(pl.Box(0.5, 0.5), fd);
  }

  // Square character 2
  {
    var bd = {};
    bd.position = Vec2(-5.0, 5.0);
    bd.type = 'dynamic';
    bd.fixedRotation = true;
    bd.allowSleep = false;

    var body = world.createBody(bd);

    var fd = {};
    fd.density = 20.0;
    body.createFixture(pl.Box(0.25, 0.25), fd);
  }

  // Hexagon character
  {
    var bd = {};
    bd.position = Vec2(-5.0, 8.0);
    bd.type = 'dynamic';
    bd.fixedRotation = true;
    bd.allowSleep = false;

    var body = world.createBody(bd);

    var angle = 0.0;
    var delta = Math.PI / 3.0;
    var vertices = [];
    for (var i = 0; i < 6; ++i) {
      vertices[i] = Vec2(0.5 * Math.cos(angle), 0.5 * Math.sin(angle));
      angle += delta;
    }

    body.createFixture(pl.Polygon(vertices), 20.0);
  }

  // Circle character
  {
    var bd = {};
    bd.position = Vec2(3.0, 5.0);
    bd.type = 'dynamic';
    bd.fixedRotation = true;
    bd.allowSleep = false;

    var body = world.createBody(bd);
    body.createFixture(pl.Circle(0.5), 20.0);
  }

  // Circle character
  var character;
  {
    var bd = {};
    bd.position = Vec2(-7.0, 6.0);
    bd.type = 'dynamic';
    bd.allowSleep = false;

    character = world.createBody(bd);

    var fd = {};
    fd.density = 20.0;
    fd.friction = 1.0;
    character.createFixture(pl.Circle(0.25), fd);
  }

  function Step(settings) {
    var v = character.getLinearVelocity();
    v.x = -5.0;
    character.setLinearVelocity(v);

    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine,
        "This tests various character collision shapes.");
    m_textLine += DRAW_STRING_NEW_LINE;
    g_debugDraw.DrawString(5, m_textLine,
        "Limitation: square and hexagon can snag on aligned boxes.");
    m_textLine += DRAW_STRING_NEW_LINE;
    g_debugDraw.DrawString(5, m_textLine,
        "Feature: edge chains have smooth collision inside and out.");
    m_textLine += DRAW_STRING_NEW_LINE;
  }

  return world;
});
