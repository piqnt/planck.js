/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Box, RevoluteJoint, Testbed, Body, Vec2Value } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.y = -15;
testbed.width = 20;
testbed.height = 20;
testbed.start(world);

const DEPTH = 4;
const DENSITY = 20.0;

const ground = world.createBody({
  type: "static",
  position: { x: 0.0, y: 20.0 },
});

const a = 0.5;
const h = { x: 0.0, y: a };

const root = addNode(ground, { x: 0, y: 0 }, 0, 3.0, a);

world.createJoint(
  new RevoluteJoint({
    bodyA: ground,
    bodyB: root,
    localAnchorA: { x: 0, y: 0 },
    localAnchorB: h,
  }),
);

function addNode(parent: Body, localAnchor: Vec2Value, depth: number, offset: number, a: number) {
  const h = { x: 0.0, y: a };

  const p = new Vec2(parent.getPosition()).add(localAnchor).sub(h);

  const node = world.createBody({
    type: "dynamic",
    position: p,
  });

  node.createFixture({
    shape: new Box(0.25 * a, a),
    density: DENSITY,
  });

  if (depth === DEPTH) {
    return node;
  }

  node.createFixture({
    shape: new Box(offset, 0.25 * a, { x: 0, y: -a }, 0.0),
    density: DENSITY,
  });

  const right = { x: offset, y: -a };
  const left = { x: -offset, y: -a };
  const rightChild = addNode(node, right, depth + 1, 0.5 * offset, a);
  const leftChild = addNode(node, left, depth + 1, 0.5 * offset, a);

  world.createJoint(
    new RevoluteJoint({
      bodyA: node,
      bodyB: rightChild,
      localAnchorA: right,
      localAnchorB: h,
    }),
  );

  world.createJoint(
    new RevoluteJoint({
      bodyA: node,
      bodyB: leftChild,
      localAnchorA: left,
      localAnchorB: h,
    }),
  );

  return node;
}
