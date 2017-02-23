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

planck.play('Chain', function(pl, testbed) {
  var Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var shape = pl.Box(0.6, 0.125);

  var fd = {};
  fd.density = 20.0;
  fd.friction = 0.2;

  var jd = {};
  jd.collideConnected = false;

  var y = 25.0;
  var prevBody = ground;
  for (var i = 0; i < 30; ++i) {
    var body = world.createDynamicBody(Vec2(0.5 + i, y));
    body.createFixture(shape, fd);

    var anchor = Vec2(i, y);
    world.createJoint(pl.RevoluteJoint(jd, prevBody, body, anchor));

    prevBody = body;
  }

  return world;
});
