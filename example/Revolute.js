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

planck.testbed('Revolute', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();

  var groundFD = {
    filterCategoryBits: 2,
    filterMaskBits: 0xFFFF,
    filterGroupIndex: 0,
  };
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), groundFD);

  var rotator = world.createDynamicBody(Vec2(-10.0, 20.0));
  rotator.createFixture(pl.Circle(0.5), 5.0);

  var w = 100.0;
  rotator.setAngularVelocity(w);
  rotator.setLinearVelocity(Vec2(-8.0 * w, 0.0));

  var joint = world.createJoint(pl.RevoluteJoint({
    motorSpeed: 1.0 * Math.PI,
    maxMotorTorque: 10000.0,
    enableMotor: true,
    lowerAngle: -0.25 * Math.PI,
    upperAngle: 0.5 * Math.PI,
    enableLimit: false,
    collideConnected: true,
  }, ground, rotator, Vec2(-10.0, 12.0)));

  var ball = world.createDynamicBody(Vec2(5.0, 30.0));
  ball.createFixture(pl.Circle(3.0), {
    density: 5.0,
    // filterMaskBits: 1,
  });

  var platform = world.createBody({
    position: Vec2(20.0, 10.0),
    type: 'dynamic',
    bullet: true,
  });
  platform.createFixture(pl.Box(10.0, 0.2, Vec2(-10.0, 0.0), 0.0), 2.0);

  world.createJoint(pl.RevoluteJoint({
    lowerAngle: -0.25 * Math.PI,
    upperAngle: 0.0 * Math.PI,
    enableLimit: true,
  }, ground, platform, Vec2(20.0, 10.0)));

  // Tests mass computation of a small object far from the origin
  var triangle = world.createDynamicBody();

  triangle.createFixture(pl.Polygon([
    Vec2(17.63, 36.31),
    Vec2(17.52, 36.69),
    Vec2(17.19, 36.36)
  ]), 1); // assertion hits inside here

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'Z':
      joint.enableLimit(!joint.isLimitEnabled());
      break;

    case 'X':
      joint.enableMotor(!joint.isMotorEnabled());
      break;
    }
  };

  testbed.step = function(settings) {
    // if (stepCount++ == 360) {
    //   ball.setTransform(Vec2(0.0, 0.5), 0.0);
    // }

    testbed.status('Motor Torque', joint.getMotorTorque(testbed.hz));
    // testbed.status('Motor Force', joint.getMaxForce());
  };

  testbed.info('Z: Limits, X: Motor');

  return world;
});
