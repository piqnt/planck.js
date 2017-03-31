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

planck.testbed('Boxes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = pl.World(Vec2(0, -10));

  var bar = world.createBody();
  bar.createFixture(pl.Edge(Vec2(-20, 5), Vec2(20, 5)));
  bar.setAngle(0.2);

  for (var i = -2; i <= 2; i++) {
    for (var j = -2; j <= 2; j++) {
      var box = world.createBody().setDynamic();
      box.createFixture(pl.Box(0.5, 0.5));
      box.setPosition(Vec2(i * 1, -j * 1 + 20));
      box.setMassData({
        mass : 1,
        center : Vec2(),
        I : 1
      })
    }
  }

  return world
});