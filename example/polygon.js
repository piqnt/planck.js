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

planck.play('Polygon', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World();

  var box = world.createBody().setKinematic();
  box.createFixture(pl.Box(4, 4));
  // box.setAngle(0.11);
  box.setAngularVelocity(0.1);

  var ball = world.createBody({
    position : Vec2(-40, 0)
  }).setDynamic();
  ball.createFixture(pl.Circle().setRadius(2));
  ball.setMassData({
    mass : 0.1,
    center : Vec2(),
    I : 1
  })
  ball.applyForceToCenter(Vec2(32, 0));

  var ball = world.createDynamicBody(Vec2(40, 0));
  ball.createFixture(pl.Box(2, 2));
  ball.setMassData({
    mass : 0.1,
    center : Vec2(),
    I : 1
  })
  ball.applyForceToCenter(Vec2(-32, 0));

  return world
});
