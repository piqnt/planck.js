/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
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
planck.play('Breakable', function(pl) {
  e_count = 7

  // Ground body
  {
    var /* BodyDef */bd;
    var /* Body */ground = world.createBody(bd);

    var /* EdgeShape */shape;
    shape.set(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));
    ground.createFixture(shape, 0.0);
  }

  // Breakable dynamic body
  {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(0.0, 40.0);
    bd.angle = 0.25 * Math.PI;
    m_body1 = world.createBody(bd);

    m_shape1.setAsBox(0.5, 0.5, Vec2(-0.5, 0.0), 0.0);
    m_piece1 = m_body1.createFixture(m_shape1, 1.0);

    m_shape2.setAsBox(0.5, 0.5, Vec2(0.5, 0.0), 0.0);
    m_piece2 = m_body1.createFixture(m_shape2, 1.0);
  }

  m_break = false;
  m_broke = false;

  function PostSolve(/* Contact */contact, /* ContactImpulse */impulse) {
    if (m_broke) {
      // The body already broke.
      return;
    }

    // Should the body break?
    var /* int32 */count = contact.getManifold().pointCount;

    var /* float32 */maxImpulse = 0.0;
    for (var /* int32 */i = 0; i < count; ++i) {
      maxImpulse = Max(maxImpulse, impulse.normalImpulses[i]);
    }

    if (maxImpulse > 40.0) {
      // Flag the body for breaking.
      m_break = true;
    }
  }

  Break()
  {
    // Create two bodies from one.
    var /* Body */body1 = m_piece1.getBody();
    var /* Vec2 */center = body1.getWorldCenter();

    body1.destroyFixture(m_piece2);
    m_piece2 = null;

    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position = body1.getPosition();
    bd.angle = body1.getAngle();

    var /* Body */body2 = world.createBody(bd);
    m_piece2 = body2.createFixture(m_shape2, 1.0);

    // Compute consistent velocities for new bodies based on
    // cached velocity.
    var /* Vec2 */center1 = body1.getWorldCenter();
    var /* Vec2 */center2 = body2.getWorldCenter();

    var /* Vec2 */velocity1 = m_velocity
        + Cross(m_angularVelocity, center1 - center);
    var /* Vec2 */velocity2 = m_velocity
        + Cross(m_angularVelocity, center2 - center);

    body1.setAngularVelocity(m_angularVelocity);
    body1.setLinearVelocity(velocity1);

    body2.setAngularVelocity(m_angularVelocity);
    body2.setLinearVelocity(velocity2);
  }

  function Step(settings) {
    if (m_break) {
      Break();
      m_broke = true;
      m_break = false;
    }

    // Cache velocities to improve movement on breakage.
    if (m_broke == false) {
      m_velocity = m_body1.getLinearVelocity();
      m_angularVelocity = m_body1.getAngularVelocity();
    }

    Test.step(settings);
  }

  var /* Body */m_body1;
  var /* Vec2 */m_velocity;
  var /* float32 */m_angularVelocity;
  var /* PolygonShape */m_shape1;
  var /* PolygonShape */m_shape2;
  var /* Fixture */m_piece1;
  var /* Fixture */m_piece2;

  var /* bool */m_broke;
  var /* bool */m_break;

  return world;
});
