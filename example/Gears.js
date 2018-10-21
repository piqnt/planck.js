/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
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

  var radius1 = 1.0;
  var radius2 = 2.0;

  var gearA1 = world.createBody(Vec2(10.0, 9.0));
  gearA1.createFixture(pl.Circle(radius1), 5.0);

  var plankA1 = world.createDynamicBody(Vec2(10.0, 8.0));
  plankA1.createFixture(pl.Box(0.5, 5.0), 5.0);

  var gearA2 = world.createDynamicBody(Vec2(10.0, 6.0));
  gearA2.createFixture(pl.Circle(radius2), 5.0);

  var jointA1 = world.createJoint(pl.RevoluteJoint({}, plankA1, gearA1, gearA1.getPosition()));
  var jointA2 = world.createJoint(pl.RevoluteJoint({}, plankA1, gearA2, gearA2.getPosition()));

  world.createJoint(pl.GearJoint({}, gearA1, gearA2, jointA1, jointA2, radius2 / radius1));

  var gearB1 = world.createDynamicBody(Vec2(-3.0, 12.0));
  gearB1.createFixture(pl.Circle(1.0), 5.0);

  var jointB1 = world.createJoint(pl.RevoluteJoint({}, ground, gearB1, gearB1.getPosition()));

  var gearB2 = world.createDynamicBody(Vec2(0.0, 12.0));
  gearB2.createFixture(pl.Circle(2.0), 5.0);

  var jointB2 = world.createJoint(pl.RevoluteJoint({}, ground, gearB2, gearB2.getPosition()));

  var plankB1 = world.createDynamicBody(Vec2(2.5, 12.0));
  plankB1.createFixture(pl.Box(0.5, 5.0), 5.0);

  var jointB3 = world.createJoint(pl.PrismaticJoint({
    lowerTranslation: -5.0,
    upperTranslation: 5.0,
    enableLimit: true,
  }, ground, plankB1, plankB1.getPosition(), Vec2(0.0, 1.0)));

  var jointB4 = world.createJoint(pl.GearJoint({}, gearB1, gearB2, jointB1, jointB2, radius2 / radius1));
  var jointB5 = world.createJoint(pl.GearJoint({}, gearB2, plankB1, jointB2, jointB3, -1.0 / radius2));

  testbed.step = function Step(settings) {
    var ratio, value;

    ratio = jointB4.getRatio();
    value = jointB1.getJointAngle() + ratio * jointB2.getJointAngle();
    testbed.status("ratio1", ratio);
    testbed.status("theta1 + ratio * delta", value);

    ratio = jointB5.getRatio();
    value = jointB2.getJointAngle() + ratio * jointB3.getJointTranslation();

    testbed.status("ratio2", ratio);
    testbed.status("theta2 + ratio * delta", value);
  };

  return world;
});
