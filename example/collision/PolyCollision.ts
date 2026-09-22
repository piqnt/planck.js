/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Transform, Manifold, CollidePolygons, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.info("Use arrow keys to move and Z or X to rotate.");
testbed.start(world);

const polygonA = new Box(2, 4);
const transformA = new Transform({ x: 0.0, y: 0.0 }, 0.0);

const polygonB = new Box(5, 5);
const positionB = { x: 5, y: 4 };
let angleB = 1.9160721;
const transformB = new Transform(positionB, angleB);

testbed.step = function () {
  const manifold = new Manifold();
  new CollidePolygons(manifold, polygonA, transformA, polygonB, transformB);

  const worldManifold = manifold.getWorldManifold(
    null,
    transformA,
    polygonA.getRadius(),
    transformB,
    polygonB.getRadius(),
  );

  testbed.status("point count", manifold.pointCount);

  const vA = polygonA.m_vertices.map((v) => Transform.mul(transformA, v));
  testbed.drawPolygon(vA, testbed.color(0.9, 0.9, 0.9));

  const vB = polygonB.m_vertices.map((v) => Transform.mul(transformB, v));
  testbed.drawPolygon(vB, testbed.color(0.9, 0.9, 0.9));

  for (let i = 0; i < manifold.pointCount; ++i) {
    testbed.drawPoint(worldManifold.points[i], 4.0, testbed.color(0.9, 0.3, 0.3));
  }
};

testbed.keydown = function () {
  if (testbed.activeKeys["left"]) {
    positionB.x -= 0.2;
  }

  if (testbed.activeKeys["right"]) {
    positionB.x += 0.2;
  }

  if (testbed.activeKeys["down"]) {
    positionB.y -= 0.2;
  }

  if (testbed.activeKeys["up"]) {
    positionB.y += 0.2;
  }

  if (testbed.activeKeys["Z"]) {
    angleB += 0.2;
  }

  if (testbed.activeKeys["X"]) {
    angleB -= 0.2;
  }

  transformB.set(positionB, angleB);
};
