/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2008-2014 Erin Catto  http://www.box2d.org
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

planck.testbed('HeavyOnLightTwo', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  world.createBody().createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)),
      0.0);

  world.createBody({
    type : 'dynamic',
    position : Vec2(0.0, 2.5)
  }).createFixture(pl.Circle(0.5), 10.0);

  world.createBody({
    type : 'dynamic',
    position : Vec2(0.0, 3.5)
  }).createFixture(pl.Circle(0.5), 10.0);

  var heavy = null;

  function ToggleHeavy() {
    if (heavy) {
      world.destroyBody(heavy);
      heavy = null;
    } else {
      heavy = world.createBody({
        type : 'dynamic',
        position : Vec2(0.0, 9.0)
      });
      heavy.createFixture(pl.Circle(5.0), 10.0);
    }
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'X':
      ToggleHeavy();
      break;
    }
  };


  testbed.info('X: Add/Remove heavy circle');

  return world;
});
