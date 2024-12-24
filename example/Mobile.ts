/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { Vec2, World, Box, RevoluteJoint, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -1 },
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

function addNode(parent, localAnchor, depth, offset, a) {
  const h = { x: 0.0, y: a };

  const node = world.createBody({
    type: "dynamic",
    position: new Vec2(parent.getPosition()).add(localAnchor).sub(h),
  });

  node.createFixture(new Box(0.25 * a, a), DENSITY);

  if (depth === DEPTH) {
    return node;
  }

  const left = { x: offset, y: -a };
  const right = { x: -offset, y: -a };
  const leftChild = addNode(node, left, depth + 1, 0.5 * offset, a);
  const rightChild = addNode(node, right, depth + 1, 0.5 * offset, a);

  world.createJoint(
    new RevoluteJoint({
      bodyA: node,
      bodyB: leftChild,
      localAnchorA: left,
      localAnchorB: h,
    }),
  );

  world.createJoint(
    new RevoluteJoint({
      bodyA: node,
      bodyB: rightChild,
      localAnchorA: right,
      localAnchorB: h,
    }),
  );

  return node;
}
