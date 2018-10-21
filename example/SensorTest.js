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
planck.testbed('SensorTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var COUNT = 7;

  var sensor;
  var bodies = [];
  var touching = [];

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  if (0) {
    sensor = ground.createFixture({
      shape: pl.Box(10.0, 2.0, Vec2(0.0, 20.0), 0.0),
      isSensor: true,
    });

  } else {
    sensor = ground.createFixture({
      shape: pl.Circle(Vec2(0.0, 10.0), 5.0),
      isSensor: true,
    });
  }

  var circle = pl.Circle(1.0);

  for (var i = 0; i < COUNT; ++i) {
    touching[i] = { touching : false };

    bodies[i] = world.createDynamicBody(Vec2(-10.0 + 3.0 * i, 20.0));
    bodies[i].setUserData(touching[i])
    bodies[i].createFixture(circle, 1.0);
  }

  // Implement contact listener.
  world.on('begin-contact', function(contact) {
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    if (fixtureA === sensor) {
      var userData = fixtureB.getBody().getUserData();
      if (userData) {
        userData.touching = true;
      }
    }

    if (fixtureB === sensor) {
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

    if (fixtureA === sensor) {
      var userData = fixtureB.getBody().getUserData();
      if (userData) {
        userData.touching = false;
      }
    }

    if (fixtureB === sensor) {
      var userData = fixtureA.getBody().getUserData();
      if (userData) {
        userData.touching = false;
      }
    }
  });

  testbed.step = function() {
    // Traverse the contact results. Apply a force on shapes
    // that overlap the sensor.
    for (var i = 0; i < COUNT; ++i) {
      if (!touching[i].touching) {
        continue;
      }

      var body = bodies[i];
      var ground = sensor.getBody();

      var circle = sensor.getShape();
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
