/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2012 Erin Catto  http://www.box2d.org
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

// This test shows how to use a motor joint. A motor joint
// can be used to animate a dynamic body. With finite motor forces
// the body can be blocked by collision with other bodies.
planck.testbed('Motor Joint', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var time = 0;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)));

  // Define motorized body
  var body = world.createDynamicBody(Vec2(0.0, 8.0));
  body.createFixture(pl.Box(2.0, 0.5), {
    friction : 0.6,
    density : 2.0
  });

  var joint = world.createJoint(pl.MotorJoint({
    maxForce : 1000.0,
    maxTorque : 1000.0
  }, ground, body));

  testbed.step = function (dt) {
    // if (m_go && settings.hz > 0.0) {
    //   time += 1.0 / settings.hz;
    // }
    time += Math.min(dt, 100) / 1000;

    var linearOffset = Vec2();
    linearOffset.x = 6.0 * Math.sin(2.0 * time);
    linearOffset.y = 8.0 + 4.0 * Math.sin(1.0 * time);

    var angularOffset = 4.0 * time;

    joint.setLinearOffset(linearOffset);
    joint.setAngularOffset(angularOffset);

  };

  return world;
});
