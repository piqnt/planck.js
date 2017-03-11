/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2012 Erin Catto  http://www.box2d.org
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

planck.play('AddPair', function(pl, testbed) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, 0));

  var shape = pl.Circle(0.1);

  testbed.speed = 0.2

  var minX = -6.0;
  var maxX = 0.0;
  var minY = 4.0;
  var maxY = 6.0;

  for (var i = 0; i < /* 400 */50; ++i) {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(pl.Math.random(minX, maxX), pl.Math.random(minY, maxY));
    var body = world.createBody(bd);
    body.createFixture(shape, 0.01);
  }

  var bd = {};
  bd.type = 'dynamic';
  bd.position = Vec2(-40.0, 5.0);
  bd.bullet = true;
  var body = world.createBody(bd);

  var shape = pl.Box(1.5, 1.5);
  body.createFixture(shape, 1.0);
  body.setLinearVelocity(Vec2(150.0, 0.0));

  return world;
});
