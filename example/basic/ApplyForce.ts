/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, Transform, Polygon, Box, FrictionJoint, World, Edge, Testbed } from "planck";

const world = new World();

const testbed = Testbed.mount();
testbed.y = -20;
testbed.start(world);

const ground = world.createBody({
  type: "static",
  position: { x: 0.0, y: 20.0 },
});

const wallFD = {
  density: 0.0,
  restitution: 0.4,
};

// Left vertical
ground.createFixture({
  shape: new Edge({ x: -20.0, y: -20.0 }, { x: -20.0, y: 20.0 }),
  ...wallFD,
});

// Right vertical
ground.createFixture({
  shape: new Edge({ x: 20.0, y: -20.0 }, { x: 20.0, y: 20.0 }),
  ...wallFD,
});

// Top horizontal
ground.createFixture({
  shape: new Edge({ x: -20.0, y: 20.0 }, { x: 20.0, y: 20.0 }),
  ...wallFD,
});

// Bottom horizontal
ground.createFixture({
  shape: new Edge({ x: -20.0, y: -20.0 }, { x: 20.0, y: -20.0 }),
  ...wallFD,
});

const xf1 = new Transform();
xf1.q.set(0.3524 * Math.PI);
xf1.p.set(xf1.q.getXAxis());

const poly1 = new Polygon(
  [
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 0.5 },
  ].map((v) => Transform.mul(xf1, v)),
);

const xf2 = new Transform();
xf2.q.set(-0.3524 * Math.PI);
xf2.p.set(Vec2.neg(xf2.q.getXAxis()));

const poly2 = new Polygon(
  [
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 0.5 },
  ].map((v) => Transform.mul(xf2, v)),
);

const jet = world.createBody({
  type: "dynamic",
  angularDamping: 2.0,
  linearDamping: 0.5,
  position: { x: 0.0, y: 2.0 },
  angle: Math.PI,
  allowSleep: false,
});

jet.createFixture({
  shape: poly1,
  density: 2.0,
});
jet.createFixture({
  shape: poly2,
  density: 2.0,
});

const boxFD = {
  density: 1.0,
  friction: 0.3,
};

for (let i = 0; i < 10; ++i) {
  const box = world.createBody({
    type: "dynamic",
    position: { x: 0.0, y: 5.0 + 1.54 * i },
  });

  box.createFixture({
    shape: new Box(0.5, 0.5),
    ...boxFD,
  });

  const gravity = 10.0;
  const I = box.getInertia();
  const mass = box.getMass();

  // For a circle: I = 0.5 * m * r * r ==> r = sqrt(2 * I / m)
  const radius = Math.sqrt((2.0 * I) / mass);

  world.createJoint(
    new FrictionJoint(
      {
        collideConnected: true,
        maxForce: mass * gravity,
        maxTorque: mass * radius * gravity,
      },
      ground,
      box,
    ),
  );
}

testbed.step = function () {
  if (testbed.activeKeys.right && !testbed.activeKeys.left) {
    jet.applyAngularImpulse(-0.2, true);
  } else if (testbed.activeKeys.left && !testbed.activeKeys.right) {
    jet.applyAngularImpulse(+0.2, true);
  }

  if (testbed.activeKeys.up) {
    const f = jet.getWorldVector({ x: 0.0, y: -1.0 });
    const p = jet.getWorldPoint({ x: 0.0, y: 2.0 });
    jet.applyLinearImpulse(f, p, true);
  }
};
