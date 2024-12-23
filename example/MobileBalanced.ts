/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Box, RevoluteJoint, Testbed } from "planck";

const world = new World({ x: 0, y: -10 });

const testbed = Testbed.mount();
testbed.y = -15;
testbed.width = 20;
testbed.height = 20;
testbed.start(world);

const DEPTH = 4;
const DENSITY = 20.0;

const ground = world.createBody({ x: 0.0, y: 20.0 });

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

  const p = new Vec2(parent.getPosition()).add(localAnchor).sub(h);

  const node = world.createDynamicBody(p);

  node.createFixture(new Box(0.25 * a, a), DENSITY);

  if (depth === DEPTH) {
    return node;
  }

  node.createFixture(new Box(offset, 0.25 * a, { x: 0, y: -a }, 0.0), DENSITY);

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
