/*
* Copyright (c) 2013 Google, Inc.
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

planck.testbed('WaveMachine', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = new pl.World({
    gravity: Vec2(0, -10),
  });

  var ground = world.createBody();

  var body = world.createBody({
    type: 'dynamic',
    allowSleep: false,
    position: Vec2(0, 1)
  });

  body.createFixture(pl.Box(0.05, 1.00, Vec2( 2, 0), 0), 5);
  body.createFixture(pl.Box(0.05, 1.00, Vec2(-2, 0), 0), 5);
  body.createFixture(pl.Box(2.00, 0.05, Vec2( 0, 1), 0), 5);
  body.createFixture(pl.Box(2.00, 0.05, Vec2( 0,-1), 0), 5);

  var joint = world.createJoint(pl.RevoluteJoint({
    bodyA: ground,
    bodyB: body,
    localAnchorA: Vec2(0, 1),
    localAnchorB: Vec2(0, 0),
    referenceAngle: 0,
    motorSpeed: 0.05 * Math.PI,
    maxMotorTorque: 1e7,
    enableMotor: true,
  }));

  var particleSystem = world.createParticleSystem({
    radius: 0.025,
    dampingStrength: 0.2,
  });
  
  var box = new pl.Box(0.9, 0.9, Vec2(0, 1), 0);
  var particleGroup = particleSystem.createParticleGroup({
    shape: box,
  });

  testbed.step = (_, t) => {
    var hz = 1; // TODO
    joint.setMotorSpeed(0.05 * Math.cos(t / 1000 / hz) * Math.PI);
  }

  testbed.x = 0;
  testbed.y = 0;
  testbed.width = 10;
  testbed.height = 10;

  return world;
});
