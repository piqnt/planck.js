/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
