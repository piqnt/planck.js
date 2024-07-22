/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import planck from "../src/main";

const { World, Vec2, Polygon, Testbed } = planck;

const world = new World();

const testbed = Testbed.mount();

testbed.x = 0;
testbed.y = 0;
testbed.start(world);
testbed.info("X: Generate a new random convex hull, Z: Auto-generate");

const COUNT = 8;

let auto = false;
const points = [];

let shape: planck.PolygonShape;

generate();

function generate() {
  const lowerBound = new Vec2(-8.0, -8.0);
  const upperBound = new Vec2(8.0, 8.0);

  points.length = 0;
  for (let i = 0; i < COUNT; ++i) {
    const x = 10.0 * Math.random() - 5;
    const y = 10.0 * Math.random() - 5;

    // Clamp onto a square to help create collinearities.
    // This will stress the convex hull algorithm.
    const v = Vec2.clamp(new Vec2(x, y), x + y);
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
