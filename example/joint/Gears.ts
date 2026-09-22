/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import {
  World,
  Circle,
  Box,
  Edge,
  RevoluteJoint,
  PrismaticJoint,
  GearJoint,
  Testbed,
} from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: 50.0, y: 0.0 }, { x: -50.0, y: 0.0 }),
});

const radius1 = 1.0;
const radius2 = 2.0;

const gearA1 = world.createBody({
  type: "static",
  position: { x: 10.0, y: 9.0 },
});
gearA1.createFixture({
  shape: new Circle(radius1),
  density: 5.0,
});

const plankA1 = world.createBody({
  type: "dynamic",
  position: { x: 10.0, y: 8.0 },
});
plankA1.createFixture({
  shape: new Box(0.5, 5.0),
  density: 5.0,
});

const gearA2 = world.createBody({
  type: "dynamic",
  position: { x: 10.0, y: 6.0 },
});
gearA2.createFixture({
  shape: new Circle(radius2),
  density: 5.0,
});

const jointA1 = world.createJoint(new RevoluteJoint({}, plankA1, gearA1, gearA1.getPosition()));
const jointA2 = world.createJoint(new RevoluteJoint({}, plankA1, gearA2, gearA2.getPosition()));

world.createJoint(new GearJoint({}, gearA1, gearA2, jointA1!, jointA2!, radius2 / radius1));

const gearB1 = world.createBody({
  type: "dynamic",
  position: { x: -3.0, y: 12.0 },
});
gearB1.createFixture({
  shape: new Circle(1.0),
  density: 5.0,
});

const jointB1 = world.createJoint(new RevoluteJoint({}, ground, gearB1, gearB1.getPosition()));

const gearB2 = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 12.0 },
});
gearB2.createFixture({
  shape: new Circle(2.0),
  density: 5.0,
});

const jointB2 = world.createJoint(new RevoluteJoint({}, ground, gearB2, gearB2.getPosition()));

const plankB1 = world.createBody({
  type: "dynamic",
  position: { x: 2.5, y: 12.0 },
});
plankB1.createFixture({
  shape: new Box(0.5, 5.0),
  density: 5.0,
});

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
    { x: 0.0, y: 1.0 },
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
