/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, PolygonShape, Testbed, Vec2Value } from "planck";

const world = new World();

const testbed = Testbed.mount();

testbed.x = 0;
testbed.y = 0;
testbed.start(world);
testbed.info("X: Generate a new random convex hull, Z: Auto-generate");

const COUNT = 8;

let auto = false;
const points: Vec2Value[] = [];

let shape: PolygonShape;

generate();

function generate() {
  const lowerBound = { x: -8.0, y: -8.0 };
  const upperBound = { x: 8.0, y: 8.0 };

  points.length = 0;
  for (let i = 0; i < COUNT; ++i) {
    const x = 10.0 * Math.random() - 5;
    const y = 10.0 * Math.random() - 5;

    // Clamp onto a square to help create collinearities.
    // This will stress the convex hull algorithm.
    const v = Vec2.clampVec2({ x: x, y: y }, lowerBound, upperBound);
    points.push(v);
  }

  shape = new PolygonShape(points);
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "Z":
      auto = !auto;
      break;

    case "X":
      generate();
      break;
  }
};

testbed.step = function () {
  testbed.drawPolygon(shape.m_vertices, testbed.color(0.9, 0.9, 0.9));

  for (let i = 0; i < points.length; ++i) {
    testbed.drawPoint(points[i], 3.0, testbed.color(0.3, 0.9, 0.3));
    // testbed.drawString(points[i] + ({ x: 0.05, y:  0.05 }), "%d", i);
  }

  // if (shape.validate() == false) {
  //   m_textLine += 0;
  // }

  if (auto) {
    generate();
  }
};
