/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
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

  var m_attachment;
  var m_platform;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)));

  // Define attachment
  m_attachment = world.createDynamicBody(Vec2(0.0, 3.0));
  m_attachment.createFixture(pl.Box(0.5, 2.0), 2.0);

  // Define platform
  m_platform = world.createDynamicBody(Vec2(-4.0, 5.0));

  m_platform.createFixture(pl.Box(0.5, 4.0, Vec2(4.0, 0.0), 0.5 * Math.PI), {
    friction : 0.6,
    density : 2.0
  });

  world.createJoint(pl.RevoluteJoint({
    maxMotorTorque : 50.0,
    enableMotor : true
  }, m_attachment, m_platform, Vec2(0.0, 5.0)));

  world.createJoint(pl.PrismaticJoint({
    maxMotorForce : 1000.0,
    enableMotor : true,
    lowerTranslation : -10.0,
    upperTranslation : 10.0,
    enableLimit : true
  }, ground, m_platform, Vec2(0.0, 5.0), Vec2(1.0, 0.0)));

  // Create a payload
  var payload = world.createDynamicBody(Vec2(0.0, 8.0));
  payload.createFixture(pl.Box(0.75, 0.75), {friction : 0.6, density : 2.0});

  testbed.keydown = function(code, char) {
    if (char === 'Z') {
      m_platform.setDynamic();

    } else if (char === 'X') {
      m_platform.setStatic();

    } else if (char === 'C') {
      m_platform.setKinematic();
      m_platform.setLinearVelocity(Vec2(-SPEED, 0.0));
      m_platform.setAngularVelocity(0.0);
    }
  };

  testbed.step = function(settings) {
    // Drive the kinematic body.
    if (m_platform.isKinematic()) {
      var p = m_platform.getTransform().p;
      var v = m_platform.getLinearVelocity();

      if ((p.x < -10.0 && v.x < 0.0) || (p.x > 10.0 && v.x > 0.0)) {
        v.x = -v.x;
        m_platform.setLinearVelocity(v);
      }
    }
  };

  testbed.info('Z: Dynamic, X: Static, C: Kinematic');
  return world;
});
