/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This is a test of collision filtering.
// There is a triangle, a box, and a circle.
// There are 6 shapes. 3 large and 3 small.
// The 3 small ones always collide.
// The 3 large ones never collide.
// The boxes don't collide with triangles (except if both are small).

import { World, Edge, Polygon, Box, Circle, PrismaticJoint, Testbed } from "planck";

const SMALL_GROUP = 1;
const LARGE_GROUP = -1;

const TRIANGLE_CATEGORY = 0x0002;
const BOX_Category = 0x0004;
const CIRCLE_CATEGORY = 0x0008;

const TRIANGLE_MASK = 0xffff;
const BOX_MASK = 0xffff ^ TRIANGLE_CATEGORY;
const CIRCLE_MAX = 0xffff;

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
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  friction: 0.3,
});

// Small triangle
const smallTriangle = {
  density: 1.0,
  filterCategoryBits: TRIANGLE_CATEGORY,
  filterMaskBits: TRIANGLE_MASK,
  filterGroupIndex: SMALL_GROUP,
};

const body1 = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 2.0 },
});
body1.createFixture(
  new Polygon([
    { x: -1.0, y: 0.0 },
    { x: 1.0, y: 0.0 },
    { x: 0.0, y: 2.0 },
  ]),
  smallTriangle,
);

// Large triangle
const largeTriangle = {
  density: 1.0,
  filterCategoryBits: TRIANGLE_CATEGORY,
  filterMaskBits: TRIANGLE_MASK,
  filterGroupIndex: LARGE_GROUP,
};

const body2 = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 6.0 },
  fixedRotation: true, // look at me!
});
body2.createFixture(
  new Polygon([
    { x: -2.0, y: 0.0 },
    { x: 2.0, y: 0.0 },
    { x: 0.0, y: 4.0 },
  ]),
  largeTriangle,
);

const body = world.createBody({
  type: "dynamic",
  position: { x: -5.0, y: 10.0 },
});
body.createFixture({
  shape: new Box(0.5, 1.0),
  density: 1.0,
});

world.createJoint(
  new PrismaticJoint({
    bodyA: body2,
    bodyB: body,
    enableLimit: true,
    localAnchorA: { x: 0.0, y: 4.0 },
    localAnchorB: { x: 0, y: 0 },
    localAxisA: { x: 0.0, y: 1.0 },
    lowerTranslation: -1.0,
    upperTranslation: 1.0,
  }),
);

// Small box
const smallBox = {
  density: 1.0,
  restitution: 0.1,
  filterCategoryBits: BOX_Category,
  filterMaskBits: BOX_MASK,
  filterGroupIndex: SMALL_GROUP,
};

const body3 = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 2.0 },
});
body3.createFixture({
  shape: new Box(1.0, 0.5),
  ...smallBox,
});

// Large box
const largeBox = {
  density: 1.0,
  restitution: 0.1,
  filterCategoryBits: BOX_Category,
  filterMaskBits: BOX_MASK,
  filterGroupIndex: LARGE_GROUP,
};

const body4 = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 6.0 },
});
body4.createFixture({
  shape: new Box(2.0, 1.0),
  ...largeBox,
});

// Small circle
const smallCircle = {
  density: 1.0,
  filterCategoryBits: CIRCLE_CATEGORY,
  filterMaskBits: CIRCLE_MAX,
  filterGroupIndex: SMALL_GROUP,
};

const body5 = world.createBody({
  type: "dynamic",
  position: { x: 5.0, y: 2.0 },
});
body5.createFixture({
  shape: new Circle(1.0),
  ...smallCircle,
});

// Large circle
const largeCircle = {
  density: 1.0,
  filterCategoryBits: CIRCLE_CATEGORY,
  filterMaskBits: CIRCLE_MAX,
  filterGroupIndex: LARGE_GROUP,
};

const body6 = world.createBody({
  type: "dynamic",
  position: { x: 5.0, y: 6.0 },
});
body6.createFixture({
  shape: new Circle(2.0),
  ...largeCircle,
});
