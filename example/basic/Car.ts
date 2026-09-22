/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This is a fun demo that shows off the wheel joint

import { World, Edge, Box, Circle, Polygon, RevoluteJoint, WheelJoint, Testbed } from "planck";

const testbed = Testbed.mount();

const world = new World({
  gravity: { x: 0, y: -10 },
});

testbed.speed = 1.3;
testbed.hz = 50;
testbed.info("←/→: Accelerate car, ↑/↓: Change spring frequency");
testbed.start(world);

// wheel spring settings
let HZ = 4.0;
const ZETA = 0.7;
const SPEED = 50.0;

const ground = world.createBody({
  type: "static",
});

const groundFD = {
  density: 0.0,
  friction: 0.6,
};

ground.createFixture({
  shape: new Edge({ x: -20.0, y: 0.0 }, { x: 20.0, y: 0.0 }),
  ...groundFD,
});

const hs = [0.25, 1.0, 4.0, 0.0, 0.0, -1.0, -2.0, -2.0, -1.25, 0.0];

let x = 20.0;
let y1 = 0.0;
const dx = 5.0;

for (let i = 0; i < 10; ++i) {
  const y2 = hs[i];
  ground.createFixture({
    shape: new Edge({ x: x, y: y1 }, { x: x + dx, y: y2 }),
    ...groundFD,
  });
  y1 = y2;
  x += dx;
}

for (let i = 0; i < 10; ++i) {
  const y2 = hs[i];
  ground.createFixture({
    shape: new Edge({ x: x, y: y1 }, { x: x + dx, y: y2 }),
    ...groundFD,
  });
  y1 = y2;
  x += dx;
}

ground.createFixture({
  shape: new Edge({ x: x, y: 0.0 }, { x: x + 40.0, y: 0.0 }),
  ...groundFD,
});

x += 80.0;
ground.createFixture({
  shape: new Edge({ x: x, y: 0.0 }, { x: x + 40.0, y: 0.0 }),
  ...groundFD,
});

x += 40.0;
ground.createFixture({
  shape: new Edge({ x: x, y: 0.0 }, { x: x + 10.0, y: 5.0 }),
  ...groundFD,
});

x += 20.0;
ground.createFixture({
  shape: new Edge({ x: x, y: 0.0 }, { x: x + 40.0, y: 0.0 }),
  ...groundFD,
});

x += 40.0;
ground.createFixture({
  shape: new Edge({ x: x, y: 0.0 }, { x: x, y: 20.0 }),
  ...groundFD,
});

// Teeter
const teeter = world.createBody({
  type: "dynamic",
  position: { x: 140.0, y: 1.0 },
});
teeter.createFixture({
  shape: new Box(10.0, 0.25),
  density: 1.0,
});
world.createJoint(
  new RevoluteJoint(
    {
      lowerAngle: (-8.0 * Math.PI) / 180.0,
      upperAngle: (8.0 * Math.PI) / 180.0,
      enableLimit: true,
    },
    ground,
    teeter,
    teeter.getPosition(),
  ),
);

teeter.applyAngularImpulse(100.0, true);

// Bridge
const bridgeFD = {
  density: 1.0,
  friction: 0.6,
};

let prevBody = ground;
let i: number;
for (i = 0; i < 20; ++i) {
  const bridgeBlock = world.createBody({
    type: "dynamic",
    position: { x: 161.0 + 2.0 * i, y: -0.125 },
  });
  bridgeBlock.createFixture({
    shape: new Box(1.0, 0.125),
    ...bridgeFD,
  });

  world.createJoint(
    new RevoluteJoint({}, prevBody, bridgeBlock, { x: 160.0 + 2.0 * i, y: -0.125 }),
  );

  prevBody = bridgeBlock;
}

world.createJoint(new RevoluteJoint({}, prevBody, ground, { x: 160.0 + 2.0 * i, y: -0.125 }));

// Boxes
const box = new Box(0.5, 0.5);

world
  .createBody({
    type: "dynamic",
    position: { x: 230.0, y: 0.5 },
  })
  .createFixture({
    shape: box,
    density: 0.5,
  });

world
  .createBody({
    type: "dynamic",
    position: { x: 230.0, y: 1.5 },
  })
  .createFixture({
    shape: box,
    density: 0.5,
  });

world
  .createBody({
    type: "dynamic",
    position: { x: 230.0, y: 2.5 },
  })
  .createFixture({
    shape: box,
    density: 0.5,
  });

world
  .createBody({
    type: "dynamic",
    position: { x: 230.0, y: 3.5 },
  })
  .createFixture({
    shape: box,
    density: 0.5,
  });

world
  .createBody({
    type: "dynamic",
    position: { x: 230.0, y: 4.5 },
  })
  .createFixture({
    shape: box,
    density: 0.5,
  });

// Car
const car = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 1.0 },
});
car.createFixture(
  new Polygon([
    { x: -1.5, y: -0.5 },
    { x: 1.5, y: -0.5 },
    { x: 1.5, y: 0.0 },
    { x: 0.0, y: 0.9 },
    { x: -1.15, y: 0.9 },
    { x: -1.5, y: 0.2 },
  ]),
  1.0,
);

const wheelFD = {
  density: 1.0,
  friction: 0.9,
};

const wheelBack = world.createBody({
  type: "dynamic",
  position: { x: -1.0, y: 0.35 },
});
wheelBack.createFixture({
  shape: new Circle(0.4),
  ...wheelFD,
});

const wheelFront = world.createBody({
  type: "dynamic",
  position: { x: 1.0, y: 0.4 },
});
wheelFront.createFixture({
  shape: new Circle(0.4),
  ...wheelFD,
});

const springBack = world.createJoint(
  new WheelJoint(
    {
      motorSpeed: 0.0,
      maxMotorTorque: 20.0,
      enableMotor: true,
      frequencyHz: HZ,
      dampingRatio: ZETA,
    },
    car,
    wheelBack,
    wheelBack.getPosition(),
    { x: 0.0, y: 1.0 },
  ),
);

const springFront = world.createJoint(
  new WheelJoint(
    {
      motorSpeed: 0.0,
      maxMotorTorque: 10.0,
      enableMotor: false,
      frequencyHz: HZ,
      dampingRatio: ZETA,
    },
    car,
    wheelFront,
    wheelFront.getPosition(),
    { x: 0.0, y: 1.0 },
  ),
);

testbed.keydown = function () {
  if (testbed.activeKeys.down) {
    HZ = Math.max(0.0, HZ - 1.0);
    springBack?.setSpringFrequencyHz(HZ);
    springFront?.setSpringFrequencyHz(HZ);
  } else if (testbed.activeKeys.up) {
    HZ += 1.0;
    springBack?.setSpringFrequencyHz(HZ);
    springFront?.setSpringFrequencyHz(HZ);
  }
};

testbed.step = function () {
  if (testbed.activeKeys.right && testbed.activeKeys.left) {
    springBack?.setMotorSpeed(0);
    springBack?.enableMotor(true);
  } else if (testbed.activeKeys.right) {
    springBack?.setMotorSpeed(-SPEED);
    springBack?.enableMotor(true);
  } else if (testbed.activeKeys.left) {
    springBack?.setMotorSpeed(+SPEED);
    springBack?.enableMotor(true);
  } else {
    springBack?.setMotorSpeed(0);
    springBack?.enableMotor(false);
  }

  const cp = car.getPosition();
  if (cp.x > testbed.x + 10) {
    testbed.x = cp.x - 10;
  } else if (cp.x < testbed.x - 10) {
    testbed.x = cp.x + 10;
  }
};
