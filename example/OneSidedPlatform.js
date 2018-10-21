/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2008-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('OneSidedPlatform', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var radius = 0.5;
  var top = 10.0 + 0.5;
  var bottom = 10.0 - 0.5;

  var UNKNOWN = 0, ABOVE = +1, BELOW = -1;

  var state = UNKNOWN;

  // Ground
  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), 0.0);

  // Platform
  var platform = world.createBody(Vec2(0.0, 10.0));
  var platformFix = platform.createFixture(pl.Box(3.0, 0.5), 0.0);

  // Actor
  var character = world.createDynamicBody(Vec2(0.0, 12.0));
  var characterFix = character.createFixture(pl.Circle(radius), 20.0);
  character.setLinearVelocity(Vec2(0.0, -50.0));

  world.on('pre-solve', function(contact, oldManifold) {
    var fixA = contact.getFixtureA();
    var fixB = contact.getFixtureB();

    var isCharPlatformContact =
      fixA === platformFix && fixB === characterFix ||
      fixB === platformFix && fixA === characterFix;

    if (!isCharPlatformContact) {
      return;
    }

    if (0) {
      var p = character.getPosition();

      if (p.y < top + radius - 3.0 * /*linearSlop*/ 0.005) {
        contact.setEnabled(false);
      }
    } else {
      var v = character.getLinearVelocity();
      if (v.y > 0.0) {
        contact.setEnabled(false);
      }
    }
  });

  testbed.step = function(settings) {
    var v = character.getLinearVelocity();
    testbed.status("Character Linear Velocity", v.y);
  };

  return world;
});
