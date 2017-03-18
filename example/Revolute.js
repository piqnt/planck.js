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

planck.testbed('Revolute', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();

  var shape = pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));

  var fd = {};
  fd.filterCategoryBits = 2;
  fd.filterMaskBits = 0xFFFF;
  fd.filterGroupIndex = 0;

  ground.createFixture(shape, fd);

  var shape = pl.Circle(0.5);

  var bd = {};
  bd.type = 'dynamic';

  bd.position = Vec2(-10.0, 20.0);
  var body = world.createBody(bd);
  body.createFixture(shape, 5.0);

  var w = 100.0;
  body.setAngularVelocity(w);
  body.setLinearVelocity(Vec2(-8.0 * w, 0.0));

  var rjd = {};
  rjd.motorSpeed = 1.0 * Math.PI;
  rjd.maxMotorTorque = 10000.0;
  rjd.enableMotor = true;
  rjd.lowerAngle = -0.25 * Math.PI;
  rjd.upperAngle = 0.5 * Math.PI;
  rjd.enableLimit = false;
  rjd.collideConnected = true;

  var m_joint = world.createJoint(pl.RevoluteJoint(rjd, ground, body, Vec2(-10.0, 12.0)));

  var circle_shape = pl.Circle(3.0);

  var circle_bd = {};
  circle_bd.type = 'dynamic';
  circle_bd.position = Vec2(5.0, 30.0);

  var fd = {};
  fd.density = 5.0;
  // fd.filterMaskBits = 1;

  var m_ball = world.createBody(circle_bd);
  m_ball.createFixture(circle_shape, fd);

  var polygon_shape = pl.Box(10.0, 0.2, Vec2(-10.0, 0.0), 0.0);

  var polygon_bd = {};
  polygon_bd.position = Vec2(20.0, 10.0);
  polygon_bd.type = 'dynamic';
  polygon_bd.bullet = true;
  var polygon_body = world.createBody(polygon_bd);
  polygon_body.createFixture(polygon_shape, 2.0);

  var rjd = {};
  rjd.lowerAngle = -0.25 * Math.PI;
  rjd.upperAngle = 0.0 * Math.PI;
  rjd.enableLimit = true;
  world.createJoint(pl.RevoluteJoint(rjd, ground, polygon_body, Vec2(20.0, 10.0)));

  // Tests mass computation of a small object far from the origin
  var body = world.createDynamicBody();

  var polyShape = pl.Polygon([
    Vec2(17.63, 36.31),
    Vec2(17.52, 36.69),
    Vec2(17.19, 36.36)
  ]);

  var polyFixtureDef = {};
  polyFixtureDef.density = 1;

  body.createFixture(polyShape, polyFixtureDef); // assertion hits inside here

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'Z':
      m_joint.enableLimit(!m_joint.isLimitEnabled());
      break;

    case 'X':
      m_joint.enableMotor(!m_joint.isMotorEnabled());
      break;
    }
  };

  testbed.step = function(settings) {
    // if (world.m_stepCount == 360) {
    // m_ball.setTransform(Vec2(0.0, 0.5), 0.0);
    // }

    testbed.status('Motor Torque', m_joint.getMotorTorque(testbed.hz));
    // testbed.status('Motor Force', m_joint.getMaxForce());
  };

  testbed.info('Z: Limits, X: Motor');

  return world;
});
