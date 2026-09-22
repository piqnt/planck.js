/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, DynamicTree, AABB, Math, Testbed, RayCastInput, RayCastOutput } from "planck";

class Actor {
  aabb = new AABB();
  fraction: number;
  overlap: boolean;
  proxyId: number | null = null;
}

const testbed = Testbed.mount();
const world = new World();
testbed.start(world);

const ACTOR_COUNT = 128;
const WORLD_EXTENT = 15.0;
const PROXY_EXTENT = 0.5;

let automated = false;

const tree = new DynamicTree<Actor>();
const actors: Actor[] = [];

for (let i = 0; i < ACTOR_COUNT; ++i) {
  const actor = new Actor();
  actors[i] = actor;
  getRandomAABB(actor.aabb);
  actor.proxyId = tree.createProxy(actor.aabb, actor);
}

const queryAABB = new AABB({ x: -3.0, y: -4.0 + WORLD_EXTENT }, { x: 5.0, y: 6.0 + WORLD_EXTENT });

function queryCallback(proxyId: number) {
  const actor = tree.getUserData(proxyId);
  actor.overlap = AABB.testOverlap(queryAABB, actor.aabb);
  return true;
}

function runQuery(tree: DynamicTree<Actor>) {
  tree.query(queryAABB, queryCallback);

  for (let i = 0; i < actors.length; ++i) {
    if (actors[i].proxyId == null) {
      continue;
    }

    const overlap = AABB.testOverlap(queryAABB, actors[i].aabb);
    // console.assert(overlap == actors[i].overlap);
  }
}

const rayCastInput: RayCastInput = {
  // p1: { x: 0.0, y:  2.0 + worldExtent },
  // p2: { x: 0.0, y:  -2.0 + worldExtent },
  p1: { x: -5.0, y: 5.0 + WORLD_EXTENT },
  p2: { x: 7.0, y: -4.0 + WORLD_EXTENT },
  maxFraction: 1.0,
};

const rayCastResult = {} as {
  actor: Actor | null;
  output: RayCastOutput | null;
  input: RayCastInput;
};

function rayCastCallback(input: RayCastInput, proxyId: number) {
  const actor = tree.getUserData(proxyId);

  const output = {} as RayCastOutput;
  const hit = actor.aabb.rayCast(output, input);

  if (hit) {
    rayCastResult.output = output;
    rayCastResult.actor = actor;
    rayCastResult.actor.fraction = output.fraction;
    return output.fraction;
  }

  return input.maxFraction;
}

function runRayCast() {
  rayCastResult.actor = null;
  rayCastResult.output = null;

  rayCastResult.input = {
    p1: Vec2.clone(rayCastInput.p1),
    p2: Vec2.clone(rayCastInput.p2),
    maxFraction: rayCastInput.maxFraction,
  };

  // Ray cast against the dynamic tree.
  tree.rayCast(rayCastResult.input, rayCastCallback);

  // Brute force ray cast.
  let bruteActor: Actor | null = null;
  let bruteOutput: RayCastOutput | null = null;

  for (let i = 0; i < actors.length; ++i) {
    const actor = actors[i];
    if (actor.proxyId == null) {
      continue;
    }

    const output = {} as RayCastOutput;
    const hit = actor.aabb.rayCast(output, rayCastResult.input);
    if (hit) {
      bruteActor = actor;
      bruteOutput = output;
      rayCastResult.input.maxFraction = output.fraction;
    }
  }

  if (bruteActor != null) {
    // console.assert(bruteOutput?.fraction == rayCastOutput.fraction);
  }

  return rayCastResult;
}

testbed.step = function () {
  for (let i = 0; i < actors.length; ++i) {
    actors[i].fraction = 1.0;
    actors[i].overlap = false;
  }

  if (automated == true) {
    const actionCount = Math.max(1, actors.length >> 2);

    for (let i = 0; i < actionCount; ++i) {
      runAction();
    }
  }

  runQuery(tree);
  const rayCastResult = runRayCast();

  for (let i = 0; i < actors.length; ++i) {
    const actor = actors[i];
    if (actor.proxyId == null) continue;

    let c = testbed.color(0.9, 0.9, 0.9);
    if (actor == rayCastResult.actor && actor.overlap) {
      c = testbed.color(0.9, 0.6, 0.6);
    } else if (actor == rayCastResult.actor) {
      c = testbed.color(0.6, 0.9, 0.6);
    } else if (actor.overlap) {
      c = testbed.color(0.6, 0.6, 0.9);
    }

    testbed.drawAABB(actor.aabb, c);
  }

  testbed.drawAABB(queryAABB, testbed.color(0.7, 0.7, 0.7));
  testbed.drawSegment(rayCastResult.input.p1, rayCastResult.input.p2, testbed.color(0.9, 0.9, 0.9));
  testbed.drawPoint(rayCastResult.input.p1, 6.0, testbed.color(0.2, 0.9, 0.2));
  testbed.drawPoint(rayCastResult.input.p2, 6.0, testbed.color(0.9, 0.2, 0.2));

  if (rayCastResult.actor) {
    const p = Vec2.combine(
      1 - rayCastResult.actor.fraction,
      rayCastResult.input.p1,
      rayCastResult.actor.fraction,
      rayCastResult.input.p2,
    );
    testbed.drawPoint(p, 6.0, testbed.color(0.2, 0.2, 0.9));
  }

  const height = tree.getHeight();
  testbed.status("dynamic tree height", height);
};

testbed.keydown = function (code, char) {
  switch (char) {
    case "Z":
      automated = !automated;
      break;

    case "C":
      createProxy();
      break;

    case "X":
      destroyProxy();
      break;

    case "M":
      moveProxy();
      break;
  }
};

function getRandomAABB(aabb: AABB) {
  // aabb.lowerBound.x = -proxyExtent;
  // aabb.lowerBound.y = -proxyExtent + worldExtent;
  aabb.lowerBound.x = Math.random(-WORLD_EXTENT, WORLD_EXTENT);
  aabb.lowerBound.y = Math.random(0.0, 2.0 * WORLD_EXTENT);

  aabb.upperBound.x = aabb.lowerBound.x + 2.0 * PROXY_EXTENT;
  aabb.upperBound.y = aabb.lowerBound.y + 2.0 * PROXY_EXTENT;
}

function moveAABB(aabb: AABB) {
  const d = {
    x: Math.random(-0.5, 0.5),
    y: Math.random(-0.5, 0.5),
  };
  // d.x = 2.0;
  // d.y = 0.0;
  aabb.lowerBound.add(d);
  aabb.upperBound.add(d);

  const c0 = Vec2.mid(aabb.lowerBound, aabb.upperBound);
  const min = {
    x: -WORLD_EXTENT,
    y: 0.0,
  };
  const max = {
    x: WORLD_EXTENT,
    y: 2.0 * WORLD_EXTENT,
  };
  const c = Vec2.clampVec2(c0, min, max);

  aabb.lowerBound.add(c).sub(c0);
  aabb.upperBound.add(c).sub(c0);
}

function createProxy() {
  for (let i = 0; i < actors.length; ++i) {
    const j = (Math.random() * actors.length) | 0;
    const actor = actors[j];
    if (actor.proxyId == null) {
      getRandomAABB(actor.aabb);
      actor.proxyId = tree.createProxy(actor.aabb, actor);
      return;
    }
  }
}

function destroyProxy() {
  for (let i = 0; i < actors.length; ++i) {
    const j = (Math.random() * actors.length) | 0;
    const actor = actors[j];
    if (actor.proxyId != null) {
      tree.destroyProxy(actor.proxyId);
      actor.proxyId = null;
      return;
    }
  }
}

function moveProxy() {
  for (let i = 0; i < actors.length; ++i) {
    const j = (Math.random() * actors.length) | 0;
    const actor = actors[j];
    if (actor.proxyId == null) {
      continue;
    }

    const aabb0 = actor.aabb;
    moveAABB(actor.aabb);
    const displacement = Vec2.sub(actor.aabb.getCenter(), aabb0.getCenter());
    tree.moveProxy(actor.proxyId, actor.aabb, displacement);
    return;
  }
}

function runAction() {
  const choice = (Math.random() * 20) | 0;

  switch (choice) {
    case 0:
      createProxy();
      break;

    case 1:
      destroyProxy();
      break;

    default:
      moveProxy();
  }
}
