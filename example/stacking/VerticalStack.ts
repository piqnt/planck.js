/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, Edge, Circle, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
  blockSolve: true,
});

const testbed = Testbed.mount();
testbed.info("X: Launch a bullet");
testbed.start(world);

const columnCount = 3;
const rowCount = 20;

let bullet: Body | null = null;
const bodies: Body[] = [];
const indices: number[] = [];

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
});
ground.createFixture({
  shape: new Edge({ x: 20.0, y: 0.0 }, { x: 20.0, y: 20.0 }),
});

const xs = [0.0, -10.0, -5.0, 5.0, 10.0];

const shape = new Box(0.5, 0.5);

for (let j = 0; j < columnCount; ++j) {
  for (let i = 0; i < rowCount; ++i) {
    const n = j * rowCount + i;
    indices[n] = n;
    const x = 0.0;
    // let x = Math.random() * 0.04 - 0.02;
    // let x = i % 2 == 0 ? -0.01 : 0.01;

    const body = world.createBody({
      type: "dynamic",
      userData: indices[n],
      position: { x: xs[j] + x, y: 0.55 + 1.1 * i },
    });
    body.createFixture({
      shape: shape,
      density: 1.0,
      friction: 0.3,
    });

    bodies[n] = body;
  }
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "X":
      fireBullet();
      break;

    case "Z":
      // @ts-expect-error
      world.m_blockSolve = !world.m_blockSolve;
      break;
  }
};

let stepCount = 1;
testbed.step = function () {
  // @ts-expect-error
  testbed.status("Blocksolve", world.m_blockSolve);

  if (stepCount++ % 300 == 0) {
    fireBullet();
  }
};

function fireBullet() {
  if (bullet != null) {
    world.destroyBody(bullet);
    bullet = null;
  }

  bullet = world.createBody({
    type: "dynamic",
    bullet: true,
    position: { x: -31.0, y: 5.0 },
    linearVelocity: {
      x: 400.0,
      y: Math.random() * 100 - 50,
    },
  });

  bullet.createFixture({
    shape: new Circle(0.25),
    density: 20.0,
    restitution: 0.05,
  });
}
