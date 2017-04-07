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

planck.testbed('AddPair', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, 0));

  var shape = pl.Circle(0.1);

  testbed.y = 0;
  testbed.hz = 60;
  testbed.speed = 0.5;

  for (var i = 0; i < 50; ++i) {
    var body = world.createBody({
      type : 'dynamic',
      position : Vec2(pl.Math.random(0.0, -6.0), pl.Math.random(-1.0, 1.0))
    });
    body.createFixture(shape, 0.01);
  }

  var box = world.createBody({
    type : 'dynamic',
    position : Vec2(-40.0, 0.0),
    bullet : true
  });

  box.createFixture(pl.Box(1.5, 1.5), 1.0);
  box.setLinearVelocity(Vec2(100.0, 0.0));

  return world;
});
