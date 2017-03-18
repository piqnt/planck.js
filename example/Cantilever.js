/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
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

// It is difficult to make a cantilever made of links completely rigid with weld joints.
// You will have to use a high number of iterations to make them stiff.
// So why not go ahead and use soft weld joints? They behave like a revolute
// joint with a rotational spring.
planck.testbed('Cantilever', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_count = 8;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var shape = pl.Box(0.5, 0.125);

  var fd = {};
  fd.density = 20.0;

  var jd = {};

  var prevBody = ground;
  for (var i = 0; i < e_count; ++i) {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(-14.5 + 1.0 * i, 5.0);
    var body = world.createBody(bd);
    body.createFixture(shape, fd);

    var anchor = Vec2(-15.0 + 1.0 * i, 5.0);
    world.createJoint(pl.WeldJoint(jd, prevBody, body, anchor));

    prevBody = body;
  }

  var shape = pl.Box(1.0, 0.125);

  var fd;
  fd.density = 20.0;

  var jd = {};
  jd.frequencyHz = 5.0;
  jd.dampingRatio = 0.7;

  var prevBody = ground;
  for (var i = 0; i < 3; ++i) {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(-14.0 + 2.0 * i, 15.0);
    var body = world.createBody(bd);
    body.createFixture(shape, fd);

    var anchor = Vec2(-15.0 + 2.0 * i, 15.0);
    world.createJoint(pl.WeldJoint(jd, prevBody, body, anchor));

    prevBody = body;
  }

  var shape = pl.Box(0.5, 0.125);

  var fd = {};
  fd.density = 20.0;

  var jd = {};

  var prevBody = ground;
  for (var i = 0; i < e_count; ++i) {
    var bd;
    bd.type = 'dynamic';
    bd.position = Vec2(-4.5 + 1.0 * i, 5.0);
    var body = world.createBody(bd);
    body.createFixture(shape, fd);

    if (i > 0) {
      var anchor = Vec2(-5.0 + 1.0 * i, 5.0);
      world.createJoint(pl.WeldJoint(jd, prevBody, body, anchor));
    }

    prevBody = body;
  }

  var shape = new pl.Box(0.5, 0.125);

  var fd = {};
  fd.shape = shape;
  fd.density = 20.0;

  var jd = {};
  jd.frequencyHz = 8.0;
  jd.dampingRatio = 0.7;

  var prevBody = ground;
  for (var i = 0; i < e_count; ++i) {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(5.5 + 1.0 * i, 10.0);
    var body = world.createBody(bd);
    body.createFixture(shape, fd);

    if (i > 0) {
      var anchor = Vec2(5.0 + 1.0 * i, 10.0);
      world.createJoint(pl.WeldJoint(jd, prevBody, body, anchor));
    }

    prevBody = body;
  }

  for (var i = 0; i < 2; ++i) {
    var vertices = [];
    vertices[0] = Vec2(-0.5, 0.0);
    vertices[1] = Vec2(0.5, 0.0);
    vertices[2] = Vec2(0.0, 1.5);

    var shape = new pl.Polygon(vertices);

    var fd = {};
    fd.density = 1.0;

    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(-8.0 + 8.0 * i, 12.0);
    var body = world.createBody(bd);
    body.createFixture(shape, fd);
  }

  for (var i = 0; i < 2; ++i) {
    var shape = pl.Circle(0.5);

    var fd = {};
    fd.density = 1.0;

    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(-6.0 + 6.0 * i, 10.0);
    var body = world.createBody(bd);
    body.createFixture(shape, fd);
  }

  return world;
});
