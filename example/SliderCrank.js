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

// A motor driven slider crank with joint friction.
planck.testbed('SliderCrank', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);


  // Define crank.
  var crank = world.createBody({
    type: 'dynamic',
    position: Vec2(0.0, 7.0)
  });
  crank.createFixture(pl.Box(0.5, 2.0), 2.0);

  var joint1 = world.createJoint(pl.RevoluteJoint({
    motorSpeed: Math.PI,
    maxMotorTorque: 10000.0,
    enableMotor: true
  }, ground, crank, Vec2(0.0, 5.0)));


  // Define follower.
  var follower = world.createBody({
    type: 'dynamic',
    position: Vec2(0.0, 13.0)
  });
  follower.createFixture(pl.Box(0.5, 4.0), 2.0);

  world.createJoint(pl.RevoluteJoint({enableMotor: false}, crank, follower, Vec2(0.0, 9.0)));


  // Define piston
  var piston = world.createBody({
    type: 'dynamic',
    fixedRotation: true,
    position: Vec2(0.0, 17.0)
  });
  piston.createFixture(pl.Box(1.5, 1.5), 2.0);

  world.createJoint(pl.RevoluteJoint({}, follower, piston, Vec2(0.0, 17.0)));

  var joint2 = world.createJoint(pl.PrismaticJoint({
    maxMotorForce: 1000.0,
    enableMotor: true
  }, ground, piston, Vec2(0.0, 17.0), Vec2(0.0, 1.0)));


  // Create a payload
  var payload = world.createBody({
    type: 'dynamic',
    position: Vec2(0.0, 23.0)
  });
  payload.createFixture(pl.Box(1.5, 1.5), 2.0);


  testbed.keydown = function(code, char) {
    switch (char) {
      case 'Z':
        joint2.enableMotor(!joint2.isMotorEnabled());
        joint2.getBodyB().setAwake(true);
        break;

      case 'X':
        joint1.enableMotor(!joint1.isMotorEnabled());
        joint1.getBodyB().setAwake(true);
        break;
    }
  };

  testbed.step = function() {
    var torque = joint1.getMotorTorque(1 / 60);
    testbed.status("Motor Torque", torque);
  };

  testbed.info('Z: Toggle friction, X: Toggle motor');

  return world;
});
