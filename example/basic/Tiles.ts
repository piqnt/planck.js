/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This stress tests the dynamic tree broad-phase. This also shows that tile
// based collision is _not_ smooth due to Box2D not knowing about adjacency.

import { World, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 20;

let fixtureCount = 0;

{
  const a = 0.5;
  const ground = world.createBody({
    type: "static",
    position: { x: 0, y: -a },
  });

  if (true) {
    const N = 200;
    const M = 10;
    const position = { x: 0, y: 0 };
    position.y = 0.0;
    for (let j = 0; j < M; ++j) {
      position.x = -N * a;
      for (let i = 0; i < N; ++i) {
        ground.createFixture({
          shape: new Box(a, a, position, 0.0),
          density: 0.0,
        });
        ++fixtureCount;
        position.x += 2.0 * a;
      }
      position.y -= 2.0 * a;
    }
  } else {
    const N = 200;
    const M = 10;
    const position = { x: 0, y: 0 };
    position.x = -N * a;
    for (let i = 0; i < N; ++i) {
      position.y = 0.0;
      for (let j = 0; j < M; ++j) {
        ground.createFixture({
          shape: new Box(a, a, position, 0.0),
          density: 0.0,
        });
        position.y -= 2.0 * a;
      }
      position.x += 2.0 * a;
    }
  }
}
{
  const a = 0.5;
  const shape = new Box(a, a);

  const x = { x: -7.0, y: 0.75 };
  const y = { x: 0, y: 0 };
  const deltaX = { x: 0.5625, y: 1.25 };
  const deltaY = { x: 1.125, y: 0.0 };

  for (let i = 0; i < COUNT; ++i) {
    y.x = x.x;
    y.y = x.y;

    for (let j = i; j < COUNT; ++j) {
      // bd.allowSleep = !(i == 0 && j == 0)

      const body = world.createBody({
        type: "dynamic",
        position: y,
      });
      body.createFixture({
        shape: shape,
        density: 5.0,
      });
      ++fixtureCount;
      y.x += deltaY.x;
      y.y += deltaY.y;
    }

    x.x += deltaX.x;
    x.y += deltaX.y;
  }
}
const createTime = Date.now();

testbed.step = function () {
  const height = world.getTreeHeight();
  const leafCount = world.getProxyCount();
  const minimumNodeCount = 2 * leafCount - 1;
  const minimumHeight = Math.ceil(Math.log(minimumNodeCount) / Math.log(2.0));

  testbed.status("dynamic tree height", height);
  testbed.status("min", minimumHeight);
  testbed.status("create time", createTime + "ms");
  testbed.status("fixture count", fixtureCount);

  // let tree = world.m_broadPhase.m_tree;
  // if (stepCount++ == 400) {
  // tree.rebuildBottomUp();
  // }
};
