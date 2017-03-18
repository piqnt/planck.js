/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2011      Erin Catto  http://www.box2d.org
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

planck.testbed('ConveyorBelt', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  // Ground
  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), 0.0);

  // Platform
  var platform = world
    .createBody(Vec2(-5.0, 5.0))
    .createFixture(pl.Box(10.0, 0.5), {friction : 0.8});

  // Boxes
  for (var i = 0; i < 5; ++i) {
    world.createDynamicBody(Vec2(-10.0 + 2.0 * i, 7.0))
      .createFixture(pl.Box(0.5, 0.5), 20.0);
  }

  world.on('pre-solve', function(contact, oldManifold) {
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    if (fixtureA == platform) {
      contact.setTangentSpeed(5.0);
    }

    if (fixtureB == platform) {
      contact.setTangentSpeed(-5.0);
    }
  });

  return world;
});
