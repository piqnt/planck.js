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

// TODO_ERIN test joints on compounds.
planck.play('CompoundShapes', function(pl) {
  {
    var /* BodyDef */bd;
    bd.position.set(0.0, 0.0);
    var /* Body */body = world.createBody(bd);

    var /* EdgeShape */shape;
    shape.set(Vec2(50.0, 0.0), Vec2(-50.0, 0.0));

    body.createFixture(shape, 0.0);
  }

  {
    var /* CircleShape */circle1;
    circle1.m_radius = 0.5;
    circle1.m_p.set(-0.5, 0.5);

    var /* CircleShape */circle2;
    circle2.m_radius = 0.5;
    circle2.m_p.set(0.5, 0.5);

    for (var /* int */i = 0; i < 10; ++i) {
      var /* float32 */x = RandomFloat(-0.1, 0.1);
      var /* BodyDef */bd;
      bd.type = 'dynamic';
      bd.position.set(x + 5.0, 1.05 + 2.5 * i);
      bd.angle = RandomFloat(-Math.PI, Math.PI);
      var /* Body */body = world.createBody(bd);
      body.createFixture(circle1, 2.0);
      body.createFixture(circle2, 0.0);
    }
  }

  {
    var /* PolygonShape */polygon1;
    polygon1.setAsBox(0.25, 0.5);

    var /* PolygonShape */polygon2;
    polygon2.setAsBox(0.25, 0.5, Vec2(0.0, -0.5), 0.5 * Math.PI);

    for (var /* int */i = 0; i < 10; ++i) {
      var /* float32 */x = RandomFloat(-0.1, 0.1);
      var /* BodyDef */bd;
      bd.type = 'dynamic';
      bd.position.set(x - 5.0, 1.05 + 2.5 * i);
      bd.angle = RandomFloat(-Math.PI, Math.PI);
      var /* Body */body = world.createBody(bd);
      body.createFixture(polygon1, 2.0);
      body.createFixture(polygon2, 2.0);
    }
  }

  {
    var /* Transform */xf1;
    xf1.q.set(0.3524 * Math.PI);
    xf1.p = xf1.q.getXAxis();

    var /* Vec2 */vertices
    [ 3 ];

    var /* PolygonShape */triangle1;
    vertices[0] = Mul(xf1, Vec2(-1.0, 0.0));
    vertices[1] = Mul(xf1, Vec2(1.0, 0.0));
    vertices[2] = Mul(xf1, Vec2(0.0, 0.5));
    triangle1.set(vertices, 3);

    var /* Transform */xf2;
    xf2.q.set(-0.3524 * Math.PI);
    xf2.p = -xf2.q.getXAxis();

    var /* PolygonShape */triangle2;
    vertices[0] = Mul(xf2, Vec2(-1.0, 0.0));
    vertices[1] = Mul(xf2, Vec2(1.0, 0.0));
    vertices[2] = Mul(xf2, Vec2(0.0, 0.5));
    triangle2.set(vertices, 3);

    for (var /* int32 */i = 0; i < 10; ++i) {
      var /* float32 */x = RandomFloat(-0.1, 0.1);
      var /* BodyDef */bd;
      bd.type = 'dynamic';
      bd.position.set(x, 2.05 + 2.5 * i);
      bd.angle = 0.0;
      var /* Body */body = world.createBody(bd);
      body.createFixture(triangle1, 2.0);
      body.createFixture(triangle2, 2.0);
    }
  }

  {
    var /* PolygonShape */bottom;
    bottom.setAsBox(1.5, 0.15);

    var /* PolygonShape */left;
    left.setAsBox(0.15, 2.7, Vec2(-1.45, 2.35), 0.2);

    var /* PolygonShape */right;
    right.setAsBox(0.15, 2.7, Vec2(1.45, 2.35), -0.2);

    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(0.0, 2.0);
    var /* Body */body = world.createBody(bd);
    body.createFixture(bottom, 4.0);
    body.createFixture(left, 4.0);
    body.createFixture(right, 4.0);
  }

  return world;
});
