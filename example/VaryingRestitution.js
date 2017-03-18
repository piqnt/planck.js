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

// Note: even with a restitution of 1.0, there is some energy change
// due to position correction.
planck.testbed('VaryingRestitution', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10))

  world.createBody().createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)));

  var restitution = [ 0.0, 0.1, 0.3, 0.5, 0.75, 0.9, 1.0 ];

  var circle = pl.Circle(1.0);

  var fd = {};
  fd.density = 1.0;

  var bd = {};
  bd.type = 'dynamic';

  for (var i = 0; i < restitution.length; ++i) {
    bd.position = Vec2(-10.0 + 3.0 * i, 20.0);
    fd.restitution = restitution[i];
    world.createBody(bd).createFixture(circle, fd);
  }

  return world;
});
