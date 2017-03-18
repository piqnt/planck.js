/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2010 Erin Catto  http://www.box2d.org
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

// This tests bullet collision and provides an example of a gameplay scenario.
// This also uses a loop shape.
planck.testbed('Pinball', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  // Ground body
  var ground = world.createBody();
  ground.createFixture(pl.Chain([
    Vec2(0.0, -2.0),
    Vec2(8.0, 6.0),
    Vec2(8.0, 20.0),
    Vec2(-8.0, 20.0),
    Vec2(-8.0, 6.0)
  ], true), 0.0);

  // Flippers
  var pLeft = Vec2(-2.0, 0.0);
  var pRight = Vec2(2.0, 0.0);

  var leftFlipper = world.createDynamicBody(pLeft);
  var rightFlipper = world.createDynamicBody(pRight);

  leftFlipper.createFixture(pl.Box(1.75, 0.1), 1.0);
  rightFlipper.createFixture(pl.Box(1.75, 0.1), 1.0);

  var jd = {};
  jd.enableMotor = true;
  jd.maxMotorTorque = 1000.0;
  jd.enableLimit = true;
  jd.motorSpeed = 0.0;

  jd.lowerAngle = -30.0 * Math.PI / 180.0;
  jd.upperAngle = 5.0 * Math.PI / 180.0;
  var leftJoint = pl.RevoluteJoint(jd, ground, leftFlipper, pLeft);
  world.createJoint(leftJoint);

  jd.lowerAngle = -5.0 * Math.PI / 180.0;
  jd.upperAngle = 30.0 * Math.PI / 180.0;
  var rightJoint = pl.RevoluteJoint(jd, ground, rightFlipper, pRight);
  world.createJoint(rightJoint);

  // Circle character
  var ball = world.createBody({
    position : Vec2(1.0, 15.0),
    type : 'dynamic',
    bullet : true
  });
  ball.createFixture(pl.Circle(0.2), 1.0);

  testbed.step = function() {
    if (testbed.activeKeys.right) {
      rightJoint.setMotorSpeed(-20.0);
    } else {
      rightJoint.setMotorSpeed(10.0);
    }

    if (testbed.activeKeys.left) {
      leftJoint.setMotorSpeed(20.0);
    } else {
      leftJoint.setMotorSpeed(-10.0);
    }
  }

  return world;
});
