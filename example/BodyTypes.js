/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
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

planck.testbed('BodyTypes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  var SPEED = 3.0;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)));

  // Define attachment
  var attachment = world.createDynamicBody(Vec2(0.0, 3.0));
  attachment.createFixture(pl.Box(0.5, 2.0), 2.0);

  // Define platform
  var platform = world.createDynamicBody(Vec2(-4.0, 5.0));

  platform.createFixture(
    pl.Box(0.5, 4.0, Vec2(4.0, 0.0), 0.5 * Math.PI),
    { friction : 0.6, density : 2.0 }
  );

  world.createJoint(pl.RevoluteJoint({
    maxMotorTorque : 50.0,
    enableMotor : true
  }, attachment, platform, Vec2(0.0, 5.0)));

  world.createJoint(pl.PrismaticJoint({
    maxMotorForce : 1000.0,
    enableMotor : true,
    lowerTranslation : -10.0,
    upperTranslation : 10.0,
    enableLimit : true
  }, ground, platform, Vec2(0.0, 5.0), Vec2(1.0, 0.0)));

  // Create a payload
  var payload = world.createDynamicBody(Vec2(0.0, 8.0));
  payload.createFixture(
    pl.Box(0.75, 0.75),
    { friction : 0.6, density : 2.0 }
  );

  testbed.keydown = function(code, char) {
    if (char === 'Z') {
      platform.setDynamic();

    } else if (char === 'X') {
      platform.setStatic();

    } else if (char === 'C') {
      platform.setKinematic();
      platform.setLinearVelocity(Vec2(-SPEED, 0.0));
      platform.setAngularVelocity(0.0);
    }
  };

  testbed.step = function(settings) {
    // Drive the kinematic body.
    if (platform.isKinematic()) {
      var p = platform.getTransform().p;
      var v = platform.getLinearVelocity();

      if ((p.x < -10.0 && v.x < 0.0) || (p.x > 10.0 && v.x > 0.0)) {
        v.x = -v.x;
        platform.setLinearVelocity(v);
      }
    }
  };

  testbed.info('Z: Dynamic, X: Static, C: Kinematic');
  return world;
});
