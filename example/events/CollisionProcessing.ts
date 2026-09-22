/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, Fixture, Vec2Value, Edge, Polygon, Box, Circle, Math, Testbed } from "planck";

// This test shows collision processing and tests
// deferred body destruction.

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

// Ground body
const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -50.0, y: 0.0 }, { x: 50.0, y: 0.0 }),
});

const xLo = -5.0;
const xHi = 5.0;
const yLo = 2.0;
const yHi = 35.0;

// Small triangle
const body1 = world.createBody({
  type: "dynamic",
  position: {
    x: Math.random(xLo, xHi),
    y: Math.random(yLo, yHi),
  },
});
body1.createFixture(
  new Polygon([
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 2.0 },
  ]),
  1.0,
);

// Large triangle
const body2 = world.createBody({
  type: "dynamic",
  position: {
    x: Math.random(xLo, xHi),
    y: Math.random(yLo, yHi),
  },
});
body2.createFixture(
  new Polygon([
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 2.0 },
  ]),
  1.0,
);

// Small box
const body3 = world.createBody({
  type: "dynamic",
  position: {
    x: Math.random(xLo, xHi),
    y: Math.random(yLo, yHi),
  },
});
body3.createFixture({
  shape: new Box(1.0, 0.5),
  density: 1.0,
});

// Large box
const body4 = world.createBody({
  type: "dynamic",
  position: {
    x: Math.random(xLo, xHi),
    y: Math.random(yLo, yHi),
  },
});
body4.createFixture({
  shape: new Box(2.0, 1.0),
  density: 1.0,
});

// Small circle
const body5 = world.createBody({
  type: "dynamic",
  position: {
    x: Math.random(xLo, xHi),
    y: Math.random(yLo, yHi),
  },
});
body5.createFixture({
  shape: new Circle(1.0),
  density: 1.0,
});

// Large circle
const body6 = world.createBody({
  type: "dynamic",
  position: {
    x: Math.random(xLo, xHi),
    y: Math.random(yLo, yHi),
  },
});
body6.createFixture({
  shape: new Circle(2.0),
  density: 1.0,
});

interface ContactPoint {
  fixtureA: Fixture;
  fixtureB: Fixture;
  position?: Vec2Value;
  normal?: Vec2Value;
  normalImpulse: number;
  tangentImpulse: number;
  separation?: number;
}

const points: ContactPoint[] = [];

world.on("pre-solve", function (contact, oldManifold) {
  const manifold = contact.getManifold();

  if (manifold.pointCount == 0) {
    return;
  }

  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  const worldManifold = contact.getWorldManifold(null);

  for (let i = 0; i < manifold.pointCount; ++i) {
    const cp = {} as ContactPoint;
    cp.fixtureA = fixtureA;
    cp.fixtureB = fixtureB;
    cp.position = worldManifold?.points[i];
    cp.normal = worldManifold?.normal;
    // cp.state = state2[i];
    cp.normalImpulse = manifold.points[i].normalImpulse;
    cp.tangentImpulse = manifold.points[i].tangentImpulse;
    cp.separation = worldManifold?.separations[i];
    points.push(cp);
  }
});

const bomb = null;
const MAX_NUKE = 6;

testbed.step = function () {
  // We are going to destroy some bodies according to contact
  // points. We must buffer the bodies that should be destroyed
  // because they may belong to multiple contact points.
  const nuke: Body[] = [];

  // Traverse the contact results. Destroy bodies that
  // are touching heavier bodies.
  for (let i = 0; i < points.length && nuke.length < MAX_NUKE; ++i) {
    const point = points[i];

    const body1 = point.fixtureA.getBody();
    const body2 = point.fixtureB.getBody();
    const mass1 = body1.getMass();
    const mass2 = body2.getMass();

    if (mass1 > 0.0 && mass2 > 0.0) {
      if (mass2 > mass1) {
        nuke.push(body1);
      } else {
        nuke.push(body2);
      }
    }
  }

  for (let i = 0; i < nuke.length; i++) {
    const b = nuke[i];
    if (b != bomb) {
      world.destroyBody(b);
    }
  }

  points.length = 0;
};
