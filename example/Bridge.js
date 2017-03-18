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

planck.testbed('Bridge', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -4));

  var e_count = 30

  var middle;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var shape = pl.Box(0.5, 0.125);

  var fd = {};
  fd.density = 20.0;
  fd.friction = 0.2;

  var jd = {};

  var prevBody = ground;
  for (var i = 0; i < e_count; ++i) {
    var body = world.createDynamicBody(Vec2(-14.5 + 1.0 * i, 5.0));
    body.createFixture(shape, fd);

    var anchor = Vec2(-15.0 + 1.0 * i, 5.0);
    world.createJoint(pl.RevoluteJoint(jd, prevBody, body, anchor));

    if (i == (e_count >> 1)) {
      middle = body;
    }
    prevBody = body;
  }

  var anchor = Vec2(-15.0 + 1.0 * e_count, 5.0);
  world.createJoint(pl.RevoluteJoint(jd, prevBody, ground, anchor));

  for (var i = 0; i < 2; ++i) {
    var body = world.createDynamicBody(Vec2(-8.0 + 8.0 * i, 12.0));

    var vertices = [];
    vertices[0] = Vec2(-0.5, 0.0);
    vertices[1] = Vec2(0.5, 0.0);
    vertices[2] = Vec2(0.0, 1.5);
    body.createFixture(pl.Polygon(vertices), 1.0);
  }

  var shape = pl.Circle(0.5);
  for (var i = 0; i < 3; ++i) {
    var body = world.createDynamicBody(Vec2(-6.0 + 6.0 * i, 10.0));
    body.createFixture(shape, 1.0);
  }

  return world;
});
