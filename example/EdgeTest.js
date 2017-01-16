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

planck.play('EdgeTest', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  {
    var ground = world.createBody();

    var v1 = Vec2(-10.0, 0.0);
    var v2 = Vec2(-7.0, -2.0);
    var v3 = Vec2(-4.0, 0.0);
    var v4 = Vec2(0.0, 0.0);
    var v5 = Vec2(4.0, 0.0);
    var v6 = Vec2(7.0, 2.0);
    var v7 = Vec2(10.0, 0.0);

    var shape = pl.Edge(v1, v2);
    shape.m_hasVertex3 = true;
    shape.m_vertex3 = v3;
    ground.createFixture(shape, 0.0);

    var shape = pl.Edge(v2, v3);
    shape.m_hasVertex0 = true;
    shape.m_hasVertex3 = true;
    shape.m_vertex0 = v1;
    shape.m_vertex3 = v4;
    ground.createFixture(shape, 0.0);

    var shape = pl.Edge(v3, v4);
    shape.m_hasVertex0 = true;
    shape.m_hasVertex3 = true;
    shape.m_vertex0 = v2;
    shape.m_vertex3 = v5;
    ground.createFixture(shape, 0.0);

    var shape = pl.Edge(v4, v5);
    shape.m_hasVertex0 = true;
    shape.m_hasVertex3 = true;
    shape.m_vertex0 = v3;
    shape.m_vertex3 = v6;
    ground.createFixture(shape, 0.0);

    var shape = pl.Edge(v5, v6);
    shape.m_hasVertex0 = true;
    shape.m_hasVertex3 = true;
    shape.m_vertex0 = v4;
    shape.m_vertex3 = v7;
    ground.createFixture(shape, 0.0);

    var shape = pl.Edge(v6, v7);
    shape.m_hasVertex0 = true;
    shape.m_vertex0 = v5;
    ground.createFixture(shape, 0.0);
  }

  {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(-0.5, 0.6);
    bd.allowSleep = false;
    world.createBody(bd)
      .createFixture(pl.Circle(0.5), 1.0);
  }

  {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(1.0, 0.6);
    bd.allowSleep = false;
    world.createBody(bd)
      .createFixture(pl.Box(0.5, 0.5), 1.0);
  }

  return world;
});
