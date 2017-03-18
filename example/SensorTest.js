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
planck.testbed('SensorTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_count = 7;

  var m_sensor;
  var m_bodies = [];
  var m_touching = [];

  var ground = world.createBody(bd);
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  if (0) {
    var sd = {};
    sd.shape = pl.Box(10.0, 2.0, Vec2(0.0, 20.0), 0.0);
    sd.isSensor = true;
    m_sensor = ground.createFixture(sd);

  } else {
    var fd = {};
    fd.shape = pl.Circle(Vec2(0.0, 10.0), 5.0);
    fd.isSensor = true;
    m_sensor = ground.createFixture(fd);
  }

  var shape = pl.Circle(1.0);

  for (var i = 0; i < e_count; ++i) {
    m_touching[i] = {touching : false};

    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(-10.0 + 3.0 * i, 20.0);
    bd.userData = m_touching[i];

    m_bodies[i] = world.createBody(bd);
    m_bodies[i].createFixture(shape, 1.0);
  }

  // Implement contact listener.
  world.on('begin-contact', function(contact) {
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    if (fixtureA == m_sensor) {
      var userData = fixtureB.getBody().getUserData();
      if (userData) {
        userData.touching = true;
      }
    }

    if (fixtureB == m_sensor) {
      var userData = fixtureA.getBody().getUserData();
      if (userData) {
        userData.touching = true;
      }
    }
  });

  // Implement contact listener.
  world.on('end-contact', function(contact) {
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    if (fixtureA == m_sensor) {
      var userData = fixtureB.getBody().getUserData();
      if (userData) {
        userData.touching = false;
      }
    }

    if (fixtureB == m_sensor) {
      var userData = fixtureA.getBody().getUserData();
      if (userData) {
        userData.touching = false;
      }
    }
  });

  testbed.step = function() {
    // Traverse the contact results. Apply a force on shapes
    // that overlap the sensor.
    for (var i = 0; i < e_count; ++i) {
      if (m_touching[i].touching == false) {
        continue;
      }

      var body = m_bodies[i];
      var ground = m_sensor.getBody();

      var circle = m_sensor.getShape();
      var center = ground.getWorldPoint(circle.getCenter());

      var position = body.getPosition();

      var d = Vec2.sub(center, position);
      if (d.lengthSquared() < pl.Math.EPSILON * pl.Math.EPSILON) {
        continue;
      }

      d.normalize();
      var F = Vec2.mul(d, 100.0);
      body.applyForce(F, position, false);
    }
  };

  return world;
});
