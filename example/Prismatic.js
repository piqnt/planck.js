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

// The motor in this test gets smoother with higher velocity iterations.
planck.testbed('Prismatic', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var MOTOR_SPEED = 10;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var body = world.createBody({
    type : 'dynamic',
    position : Vec2(-10.0, 10.0),
    angle : 0.5 * Math.PI,
    allowSleep : false
  });
  body.createFixture(pl.Box(2.0, 0.5), 5.0);

  // Bouncy limit
  var axis = Vec2(2.0, 1.0);
  axis.normalize();
  var joint = pl.PrismaticJoint({
    motorSpeed : MOTOR_SPEED,
    maxMotorForce : 10000.0,
    enableMotor : true,
    lowerTranslation : 0.0,
    upperTranslation : 20.0,
    enableLimit : true
  }, ground, body, Vec2(0.0, 0.0), axis);

  // Non-bouncy limit
  // (ground, body, Vec2(-10.0, 10.0), Vec2(1.0, 0.0));

  world.createJoint(joint);

  testbed.step = function() {
    if (testbed.activeKeys.right && !testbed.activeKeys.left) {
      joint.enableLimit(true);
      joint.enableMotor(true);
      joint.setMotorSpeed(+MOTOR_SPEED);

    } else if (testbed.activeKeys.left && !testbed.activeKeys.right) {
      joint.enableLimit(true);
      joint.enableMotor(true);
      joint.setMotorSpeed(-MOTOR_SPEED);

    } else if (testbed.activeKeys.up && !testbed.activeKeys.down) {
      joint.enableLimit(false);
      joint.enableMotor(true);
      joint.setMotorSpeed(+MOTOR_SPEED);

    } else if (testbed.activeKeys.down && !testbed.activeKeys.up) {
      joint.enableLimit(false);
      joint.enableMotor(true);
      joint.setMotorSpeed(-MOTOR_SPEED);

    } else {
      joint.enableLimit(true);
      joint.enableMotor(false);
    }

    var force = joint.getMotorForce(1 / 60);
    testbed.status('Motor Force', force);
  };

  return world;
});
