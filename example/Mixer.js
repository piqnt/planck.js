/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
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

planck.testbed('Mixer', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World();

  testbed.y = 0;

  var box = world.createKinematicBody();
  box.createFixture(pl.Edge(Vec2(15, -5), Vec2(25, 5)));

  box.createFixture(pl.Edge(Vec2(-20, -20), Vec2(20, -20)));
  box.createFixture(pl.Edge(Vec2(-20, 20), Vec2(20, 20)));
  box.createFixture(pl.Edge(Vec2(-20, -20), Vec2(-20, 20)));
  box.createFixture(pl.Edge(Vec2(20, -20), Vec2(20, 20)));

  for (var i = -5; i <= 5; i++) {
    for (var j = -5; j <= 5; j++) {
      var a = world.createDynamicBody(Vec2(i * 2, j * 2));
      a.createFixture(pl.Circle(0.6));
      a.setMassData({
        mass : 2,
        center : Vec2(),
        I : 0.4
      })
      a.applyForceToCenter(Vec2(pl.Math.random(-100, 100), pl.Math.random(-100, 100)));
    }
  }

  box.setAngularVelocity(0.3);

  return world
});