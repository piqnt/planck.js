/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Edge, Circle, Box, Testbed } from "planck";

let world = new World({
  gravity: new Vec2(0, -10),
  blockSolve: true,
});

const testbed = Testbed.mount();
testbed.info("X: Launch a bullet");
testbed.start(world);

const columnCount = 3;
const rowCount = 20;

let bullet;
let bodies = [];
let indices = [];

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)));
ground.createFixture(new Edge(new Vec2(20.0, 0.0), new Vec2(20.0, 20.0)));

let xs = [0.0, -10.0, -5.0, 5.0, 10.0];

let shape = new Box(0.5, 0.5);

for (let j = 0; j < columnCount; ++j) {
  for (let i = 0; i < rowCount; ++i) {
    let n = j * rowCount + i;
    indices[n] = n;
    let x = 0.0;
    // let x = Math.random() * 0.04 - 0.02;
    // let x = i % 2 == 0 ? -0.01 : 0.01;

    let body = world.createDynamicBody();
    body.setUserData(indices[n]);
    body.setPosition(new Vec2(xs[j] + x, 0.55 + 1.1 * i));
    body.createFixture(shape, {
      density: 1.0,
      friction: 0.3,
    });

    bodies[n] = body;
  }
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "X":
      if (bullet != null) {
        world.destroyBody(bullet);
        bullet = null;
      }

      bullet = world.createBody({
        type: "dynamic",
        bullet: true,
        position: new Vec2(-31.0, 5.0),
      });

      bullet.createFixture({
        shape: new Circle(0.25),
        density: 20.0,
        restitution: 0.05,
      });

      bullet.setLinearVelocity(new Vec2(400.0, 0.0));
      break;

    case "Z":
      world.m_blockSolve = !world.m_blockSolve;
      break;
  }
};

let stepCount = 1;
testbed.step = function () {
  testbed.status("Blocksolve", world.m_blockSolve);

  if (stepCount++ % 300 == 0) {
    if (bullet != null) {
      world.destroyBody(bullet);
      bullet = null;
    }

    bullet = world.createBody({
      type: "dynamic",
      bullet: true,
      position: new Vec2(-31.0, 5.0),
    });
    bullet.createFixture({
      shape: new Circle(0.25),
      density: 20.0,
      restitution: 0.05,
    });

    bullet.setLinearVelocity(new Vec2(400.0, Math.random() * 100 - 50));
  }
};
