/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import {
  Vec2,
  World,
  Circle,
  Box,
  Edge,
  RevoluteJoint,
  PrismaticJoint,
  GearJoint,
  Testbed,
} from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(50.0, 0.0), new Vec2(-50.0, 0.0)));

const radius1 = 1.0;
const radius2 = 2.0;

const gearA1 = world.createBody(new Vec2(10.0, 9.0));
gearA1.createFixture(new Circle(radius1), 5.0);

const plankA1 = world.createDynamicBody(new Vec2(10.0, 8.0));
plankA1.createFixture(new Box(0.5, 5.0), 5.0);

const gearA2 = world.createDynamicBody(new Vec2(10.0, 6.0));
gearA2.createFixture(new Circle(radius2), 5.0);

const jointA1 = world.createJoint(new RevoluteJoint({}, plankA1, gearA1, gearA1.getPosition()));
const jointA2 = world.createJoint(new RevoluteJoint({}, plankA1, gearA2, gearA2.getPosition()));

world.createJoint(new GearJoint({}, gearA1, gearA2, jointA1!, jointA2!, radius2 / radius1));

const gearB1 = world.createDynamicBody(new Vec2(-3.0, 12.0));
gearB1.createFixture(new Circle(1.0), 5.0);

const jointB1 = world.createJoint(new RevoluteJoint({}, ground, gearB1, gearB1.getPosition()));

const gearB2 = world.createDynamicBody(new Vec2(0.0, 12.0));
gearB2.createFixture(new Circle(2.0), 5.0);

const jointB2 = world.createJoint(new RevoluteJoint({}, ground, gearB2, gearB2.getPosition()));

const plankB1 = world.createDynamicBody(new Vec2(2.5, 12.0));
plankB1.createFixture(new Box(0.5, 5.0), 5.0);

const jointB3 = world.createJoint(
  new PrismaticJoint(
    {
      lowerTranslation: -5.0,
      upperTranslation: 5.0,
      enableLimit: true,
    },
    ground,
    plankB1,
    plankB1.getPosition(),
    new Vec2(0.0, 1.0),
  ),
);

const jointB4 = world.createJoint(
  new GearJoint({}, gearB1, gearB2, jointB1!, jointB2!, radius2 / radius1),
);
const jointB5 = world.createJoint(
  new GearJoint({}, gearB2, plankB1, jointB2!, jointB3!, -1.0 / radius2),
);

testbed.step = function () {
  const ratio1 = jointB4!.getRatio();
  const value1 = jointB1!.getJointAngle() + ratio1 * jointB2!.getJointAngle();

  testbed.status("ratio1", ratio1);
  testbed.status("theta1 + ratio * delta", value1);

  const ratio2 = jointB5!.getRatio();
  const value2 = jointB2!.getJointAngle() + ratio2 * jointB3!.getJointTranslation();

  testbed.status("ratio2", ratio2);
  testbed.status("theta2 + ratio * delta", value2);
};
