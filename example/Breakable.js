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

// This is used to test sensor shapes.
planck.testbed('Breakable', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var breakVelocity;
  var breakAngularVelocity;

  var broke = false;

  // Ground body
  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  // Breakable dynamic body
  var body1 = world.createDynamicBody(Vec2(0.0, 40.0), 0.25 * Math.PI);

  var shape1 = pl.Box(0.5, 0.5, Vec2(-0.5, 0.0), 0.0);
  var piece1 = body1.createFixture(shape1, 1.0);

  var shape2 = pl.Box(0.5, 0.5, Vec2(0.5, 0.0), 0.0);
  var piece2 = body1.createFixture(shape2, 1.0);

  world.on('post-solve', function (contact, impulse) {
    if (broke) {
      // The body already broke.
      return;
    }

    // Should the body break?
    var count = contact.getManifold().pointCount;

    var maxImpulse = 0.0;
    for (var i = 0; i < count; ++i) {
      maxImpulse = Math.max(maxImpulse, impulse.normalImpulses[i]);
    }

    if (maxImpulse > 40.0) {
      setTimeout(function() {
        Break();
        broke = true;
      });
    }
  });

  function Break() {
    // Create two bodies from one.
    var center = body1.getWorldCenter();

    body1.destroyFixture(piece2);

    var body2 = world.createDynamicBody(body1.getPosition(), body1.getAngle());

    piece2 = body2.createFixture(shape2, 1.0);

    // Compute consistent velocities for new bodies based on
    // cached velocity.
    var center1 = body1.getWorldCenter();
    var center2 = body2.getWorldCenter();

    var velocity1 = Vec2.add(breakVelocity, Vec2.cross(breakAngularVelocity, Vec2.sub(center1, center)));
    var velocity2 = Vec2.add(breakVelocity, Vec2.cross(breakAngularVelocity, Vec2.sub(center2, center)));

    console.log(velocity1, velocity2);

    body1.setAngularVelocity(breakAngularVelocity);
    body1.setLinearVelocity(velocity1);

    body2.setAngularVelocity(-breakAngularVelocity);
    body2.setLinearVelocity(velocity2);
  }

  testbed.step = function() {
    // Cache velocities to improve movement on breakage.
    if (!broke) {
      breakVelocity = body1.getLinearVelocity();
      breakAngularVelocity = body1.getAngularVelocity();
    }
  };

  return world;
});
