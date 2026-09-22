/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This test shows how a rope joint can be used to stabilize a chain of
// bodies with a heavy payload. Notice that the rope joint just prevents
// excessive stretching and has no other effect.
// By disabling the rope joint you can see that the Box2D solver has trouble
// supporting heavy bodies with light bodies. Try playing around with the
// densities, time step, and iterations to see how they affect stability.
// This test also shows how to use contact filtering. Filtering is configured
// so that the payload does not collide with the chain.

import { World, Edge, Box, RevoluteJoint, RopeJoint, Testbed, BodyDef } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.info("X: Toggle the rope joint");
testbed.start(world);

const ground = world.createBody({
  type: "static",
});

ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const N = 10;
const y = 15.0;

let shape = new Box(0.5, 0.125);

let prevBody = ground;
for (let i = 0; i < N; ++i) {
  const fixDef = {
    density: 20.0,
    friction: 0.2,
    filterCategoryBits: 0x0001,
    filterMaskBits: 0xffff & ~0x0002,
  };

  const bodyDef = {
    type: "dynamic" as const,
    position: { x: 0.5 + 1.0 * i, y: y },
    angularDamping: 0,
  };

  const jointDef = {
    collideConnected: false,
  };

  if (i === N - 1) {
    shape = new Box(1.5, 1.5);
    fixDef.density = 100.0;
    fixDef.filterCategoryBits = 0x0002;
    bodyDef.position = { x: 1.0 * i, y: y };
    bodyDef.angularDamping = 0.4;
  }

  const body = world.createBody(bodyDef);

  body.createFixture({
    shape: shape,
    ...fixDef,
  });

  const anchor = { x: i, y: y };
  world.createJoint(new RevoluteJoint(jointDef, prevBody, body, anchor));

  prevBody = body;
}

const ropeJointDef = {
  maxLength: N - 1.0 + 0.01,
  localAnchorA: { x: 0.0, y: y },
  localAnchorB: { x: 0, y: 0 },
};

let rope = world.createJoint(new RopeJoint(ropeJointDef, ground, prevBody));

testbed.keydown = function (code, char) {
  if (char === "X") {
    if (rope) {
      world.destroyJoint(rope);
      rope = null;
    } else {
      rope = world.createJoint(new RopeJoint(ropeJointDef, ground, prevBody));
    }
  }

  updateStatus();
};

function updateStatus() {
  testbed.status("Rope", !!rope);
}

updateStatus();
