/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Polygon, Testbed } from "planck";

let world = new World();

const testbed = Testbed.mount();

testbed.x = 0;
testbed.y = 0;
testbed.start(world);
testbed.info("X: Generate a new random convex hull, Z: Auto-generate");

let COUNT = 8;

let auto = false;
let points = [];

let shape;

generate();

function generate() {
  let lowerBound = new Vec2(-8.0, -8.0);
  let upperBound = new Vec2(8.0, 8.0);

  points.length = 0;
  for (let i = 0; i < COUNT; ++i) {
    let x = 10.0 * Math.random() - 5;
    let y = 10.0 * Math.random() - 5;

    // Clamp onto a square to help create collinearities.
    // This will stress the convex hull algorithm.
    let v = Vec2.clamp(new Vec2(x, y), lowerBound, upperBound);
    points.push(v);
  }

  shape = new Polygon(points);
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
    // testbed.drawString(points[i] + new Vec2(0.05, 0.05), "%d", i);
  }

  // if (shape.validate() == false) {
  //   m_textLine += 0;
  // }

  if (auto) {
    generate();
  }
};
