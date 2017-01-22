/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
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

// This is a fun demo that shows off the wheel joint
planck.play('Car', function(pl, testbed) {
  var Vec2 = pl.Vec2;
  var world = new pl.World({
    gravity : Vec2(0, -10)
  });

  var m_hz = 4.0;
  var m_zeta = 0.7;
  var m_speed = 50.0;

  var ground = world.createBody();

  var fd = {
    density : 0.0,
    friction : 0.6
  };
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), fd);

  var hs = [ 0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0, -2.0, -1.25, 0.0 ];

  var x = 20.0, y1 = 0.0, dx = 5.0;

  for (var i = 0; i < 10; ++i) {
    var y2 = hs[i];
    ground.createFixture(pl.Edge(Vec2(x, y1), Vec2(x + dx, y2)), fd);
    y1 = y2;
    x += dx;
  }

  for (var i = 0; i < 10; ++i) {
    var y2 = hs[i];
    ground.createFixture(pl.Edge(Vec2(x, y1), Vec2(x + dx, y2)), fd);
    y1 = y2;
    x += dx;
  }

  ground.createFixture(  pl.Edge(Vec2(x, 0.0), Vec2(x + 40.0, 0.0)), fd);

  x += 80.0;
  ground.createFixture(pl.Edge(Vec2(x, 0.0), Vec2(x + 40.0, 0.0)), fd);

  x += 40.0;
  ground.createFixture(pl.Edge(Vec2(x, 0.0), Vec2(x + 10.0, 5.0)), fd);

  x += 20.0;
  ground.createFixture(pl.Edge(Vec2(x, 0.0), Vec2(x + 40.0, 0.0)), fd);

  x += 40.0;
  ground.createFixture(pl.Edge(Vec2(x, 0.0), Vec2(x, 20.0)), fd);

  // Teeter
  var body = world.createDynamicBody(Vec2(140.0, 1.0));

  body.createFixture(pl.Box(10.0, 0.25), 1.0);

  var jd = {};
  jd.lowerAngle = -8.0 * Math.PI / 180.0;
  jd.upperAngle = 8.0 * Math.PI / 180.0;
  jd.enableLimit = true;
  world.createJoint(pl.RevoluteJoint(jd, ground, body, body.getPosition()));

  body.applyAngularImpulse(100.0, true);

  // Bridge
  var N = 20;

  var fd = {};
  fd.density = 1.0;
  fd.friction = 0.6;

  var prevBody = ground;
  for (var i = 0; i < N; ++i) {
    var bd = {};
    bd.type = 'dynamic';
    bd.position = Vec2(161.0 + 2.0 * i, -0.125);
    var body = world.createBody(bd);
    body.createFixture(pl.Box(1.0, 0.125), fd);

    var anchor = Vec2(160.0 + 2.0 * i, -0.125);
    world.createJoint(pl.RevoluteJoint({}, prevBody, body, anchor));

    prevBody = body;
  }

  var anchor = Vec2(160.0 + 2.0 * N, -0.125);
  world.createJoint(pl.RevoluteJoint({}, prevBody, ground, anchor));

  // Boxes
  var box = pl.Box(0.5, 0.5);

  var body = null;
  var bd = {};
  bd.type = 'dynamic';

  bd.position = Vec2(230.0, 0.5);
  body = world.createBody(bd);
  body.createFixture(box, 0.5);

  bd.position = Vec2(230.0, 1.5);
  body = world.createBody(bd);
  body.createFixture(box, 0.5);

  bd.position = Vec2(230.0, 2.5);
  body = world.createBody(bd);
  body.createFixture(box, 0.5);

  bd.position = Vec2(230.0, 3.5);
  body = world.createBody(bd);
  body.createFixture(box, 0.5);

  bd.position = Vec2(230.0, 4.5);
  body = world.createBody(bd);
  body.createFixture(box, 0.5);

  // Car
  var vertices = [];
  vertices[0] = Vec2(-1.5, -0.5);
  vertices[1] = Vec2(1.5, -0.5);
  vertices[2] = Vec2(1.5, 0.0);
  vertices[3] = Vec2(0.0, 0.9);
  vertices[4] = Vec2(-1.15, 0.9);
  vertices[5] = Vec2(-1.5, 0.2);
  var chassis = pl.Polygon(vertices);

  var circle = pl.Circle(0.4);

  var bd = {};
  bd.type = 'dynamic';
  bd.position = Vec2(0.0, 1.0);
  var m_car = world.createBody(bd);
  m_car.createFixture(chassis, 1.0);

  var fd = {};
  fd.density = 1.0;
  fd.friction = 0.9;

  bd.position = Vec2(-1.0, 0.35);
  var m_wheel1 = world.createBody(bd);
  m_wheel1.createFixture(circle, fd);

  bd.position = Vec2(1.0, 0.4);
  var m_wheel2 = world.createBody(bd);
  m_wheel2.createFixture(circle, fd);

  var jd = {};
  jd.motorSpeed = 0.0;
  jd.maxMotorTorque = 20.0;
  jd.enableMotor = true;
  jd.frequencyHz = m_hz;
  jd.dampingRatio = m_zeta;
  var axis = Vec2(0.0, 1.0);
  var m_spring1 = world.createJoint(pl.WheelJoint(jd, m_car, m_wheel1, m_wheel1.getPosition(), axis));

  var jd = {};
  jd.motorSpeed = 0.0;
  jd.maxMotorTorque = 10.0;
  jd.enableMotor = false;
  jd.frequencyHz = m_hz;
  jd.dampingRatio = m_zeta;
  var m_spring2 = world.createJoint(pl.WheelJoint(jd, m_car, m_wheel2, m_wheel2.getPosition(), axis))

  testbed.keydown = function() {
    if (testbed.activeKeys.down) {
      m_hz = Math.max(0.0, m_hz - 1.0);
      m_spring1.setSpringFrequencyHz(m_hz);
      m_spring2.setSpringFrequencyHz(m_hz);

    } else if (testbed.activeKeys.up) {
      m_hz += 1.0;
      m_spring1.setSpringFrequencyHz(m_hz);
      m_spring2.setSpringFrequencyHz(m_hz);
    }
  };

  testbed.step = function() {
    if (testbed.activeKeys.right && testbed.activeKeys.left) {
      m_spring1.setMotorSpeed(0);
      m_spring1.enableMotor(true);

    } else if (testbed.activeKeys.right) {
      m_spring1.setMotorSpeed(-m_speed);
      m_spring1.enableMotor(true);

    } else if (testbed.activeKeys.left) {
      m_spring1.setMotorSpeed(+m_speed);
      m_spring1.enableMotor(true);

    } else {
      m_spring1.setMotorSpeed(0);
      m_spring1.enableMotor(false);
    }

    var cp = m_car.getPosition();
    if (-cp.x + 10 < this.pin('offsetX')) {
      this.pin('offsetX', -cp.x + 10);

    } else if (-cp.x - 10 > this.pin('offsetX')) {
      this.pin('offsetX', -cp.x - 10);
    }
  };

  testbed.status('←/→: Accelerate car, ↑/↓: Change spring frequency');

  return world;
});
