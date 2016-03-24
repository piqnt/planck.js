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
planck.play('SensorTest', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_count = 7
  {
    var /* BodyDef */bd;
    var /* Body */ground = world.createBody(bd);

    {
      var /* EdgeShape */shape;
      shape.set(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));
      ground.createFixture(shape, 0.0);
    }

    if (0) {
      {
        var /* FixtureDef */sd;
        sd.setAsBox(10.0, 2.0, Vec2(0.0, 20.0), 0.0);
        sd.isSensor = true;
        m_sensor = ground.createFixture(sd);
      }
    } else {
      {
        var /* CircleShape */shape;
        shape.m_radius = 5.0;
        shape.m_p.set(0.0, 10.0);

        var /* FixtureDef */fd;
        fd.shape = shape;
        fd.isSensor = true;
        m_sensor = ground.createFixture(fd);
      }
    }
  }

  {
    var /* CircleShape */shape;
    shape.m_radius = 1.0;

    for (var /* int32 */i = 0; i < e_count; ++i) {
      var /* BodyDef */bd;
      bd.type = 'dynamic';
      bd.position.set(-10.0 + 3.0 * i, 20.0);
      bd.userData = m_touching + i;

      m_touching[i] = false;
      m_bodies[i] = world.createBody(bd);

      m_bodies[i].createFixture(shape, 1.0);
    }
  }

  // Implement contact listener.
  function BeginContact(/* Contact */contact) {
    var /* Fixture */fixtureA = contact.getFixtureA();
    var /* Fixture */fixtureB = contact.getFixtureB();

    if (fixtureA == m_sensor) {
      userData = fixtureB.getBody().getUserData();
      if (userData) {
        var /* bool */touching = (bool)
        userData;
        /***/
        touching = true;
      }
    }

    if (fixtureB == m_sensor) {
      userData = fixtureA.getBody().getUserData();
      if (userData) {
        var /* bool */touching = (bool)
        userData;
        /***/
        touching = true;
      }
    }
  }

  // Implement contact listener.
  EndContact( /* Contact */contact)
  {
    var /* Fixture */fixtureA = contact.getFixtureA();
    var /* Fixture */fixtureB = contact.getFixtureB();

    if (fixtureA == m_sensor) {
      userData = fixtureB.getBody().getUserData();
      if (userData) {
        var /* bool */touching = (bool)
        userData;
        /***/
        touching = false;
      }
    }

    if (fixtureB == m_sensor) {
      userData = fixtureA.getBody().getUserData();
      if (userData) {
        var /* bool */touching = (bool)
        userData;
        /***/
        touching = false;
      }
    }
  }

  function Step(settings) {
    Test.step(settings);

    // Traverse the contact results. Apply a force on shapes
    // that overlap the sensor.
    for (var /* int32 */i = 0; i < e_count; ++i) {
      if (m_touching[i] == false) {
        continue;
      }

      var /* Body */body = m_bodies[i];
      var /* Body */ground = m_sensor.getBody();

      var /* CircleShape */circle = /* CircleShape */m_sensor.getShape();
      var /* Vec2 */center = ground.getWorldPoint(circle.m_p);

      var /* Vec2 */position = body.getPosition();

      var /* Vec2 */d = center - position;
      if (d.lengthSquared() < FLT_EPSILON * FLT_EPSILON) {
        continue;
      }

      d.normalize();
      var /* Vec2 */F = 100.0 * d;
      body.applyForce(F, position, false);
    }
  }

  var /* Fixture */m_sensor;
  var /* Body */m_bodies
  [ e_count ];
  var /* bool */m_touching
  [ e_count ];

  return world;
});
