/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2007-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('Gears', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(50.0, 0.0), Vec2(-50.0, 0.0)));

  var radius1 = 1.0, radius2 = 2.0;
  var circle1 = pl.Circle(radius1);
  var circle2 = pl.Circle(radius2);
  var box = pl.Box(0.5, 5.0);

  var bd1 = {};
  bd1.type = 'static';
  bd1.position = Vec2(10.0, 9.0);
  var body1 = world.createBody(bd1);
  body1.createFixture(circle1, 5.0);

  var bd2 = {};
  bd2.type = 'dynamic';
  bd2.position = Vec2(10.0, 8.0);
  var body2 = world.createBody(bd2);
  body2.createFixture(box, 5.0);

  var bd3 = {};
  bd3.type = 'dynamic';
  bd3.position = Vec2(10.0, 6.0);
  var body3 = world.createBody(bd3);
  body3.createFixture(circle2, 5.0);

  var joint1 = world.createJoint(pl.RevoluteJoint({}, body2, body1, bd1.position));
  var joint2 = world.createJoint(pl.RevoluteJoint({}, body2, body3, bd3.position));

  world.createJoint(pl.GearJoint({}, body1, body3, joint1, joint2, radius2 / radius1));

  var circle1 = pl.Circle(1.0);
  var circle2 = pl.Circle(2.0);
  var box = pl.Box(0.5, 5.0);

  var bd1 = {};
  bd1.type = 'dynamic';
  bd1.position = Vec2(-3.0, 12.0);
  var body1 = world.createBody(bd1);
  body1.createFixture(circle1, 5.0);

  var joint1 = world.createJoint(pl.RevoluteJoint({}, ground, body1, bd1.position));

  var bd2 = {};
  bd2.type = 'dynamic';
  bd2.position = Vec2(0.0, 12.0);
  var body2 = world.createBody(bd2);
  body2.createFixture(circle2, 5.0);

  var joint2 = world.createJoint(pl.RevoluteJoint({}, ground, body2, bd2.position));

  var bd3 = {};
  bd3.type = 'dynamic';
  bd3.position = Vec2(2.5, 12.0);
  var body3 = world.createBody(bd3);
  body3.createFixture(box, 5.0);

  var jd3 = {};
  jd3.lowerTranslation = -5.0;
  jd3.upperTranslation = 5.0;
  jd3.enableLimit = true;

  var joint3 = world.createJoint(pl.PrismaticJoint(jd3, ground, body3, bd3.position, Vec2(0.0, 1.0)));
  var joint4 = world.createJoint(pl.GearJoint({}, body1, body2, joint1, joint2, radius2 / radius1));
  var joint5 = world.createJoint(pl.GearJoint({}, body2, body3, joint2, joint3, -1.0 / radius2));

  testbed.step = function Step(settings) {
    var ratio, value;

    ratio = joint4.setRatio();
    value = joint1.getJointAngle() + ratio * joint2.getJointAngle();
    testbed.status("ratio1", ratio);
    testbed.status("theta1 + ratio * delta", value);

    ratio = joint5.setRatio();
    value = joint2.getJointAngle() + ratio * joint3.getJointTranslation();

    testbed.status("ratio2", ratio);
    testbed.status("theta2 + ratio * delta", value);
  };

  return world;
});
