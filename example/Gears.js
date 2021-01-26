/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
