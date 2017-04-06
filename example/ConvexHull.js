/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2011      Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

planck.testbed('ConvexHull', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World();

  testbed.x = 0;
  testbed.y = 0;

  var e_count = 8;
  var m_auto = false;
  var points = [];

  var shape;

  Generate();

  function Generate() {

    var lowerBound = Vec2(-8.0, -8.0);
    var upperBound = Vec2(8.0, 8.0);

    points.length = 0;
    for (var i = 0; i < e_count; ++i) {
      var x = 10.0 * Math.random() - 5;
      var y = 10.0 * Math.random() - 5;

      // Clamp onto a square to help create collinearities.
      // This will stress the convex hull algorithm.
      var v = Vec2.clamp(Vec2(x, y), lowerBound, upperBound);
      points.push(Vec2(x, y));
    }

    shape = pl.Polygon(points);
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'Z':
      m_auto = !m_auto;
      break;

    case 'X':
      Generate();
      break;
    }
  };

  testbed.info('X: Generate a new random convex hull');

  testbed.step = function() {
    testbed.drawPolygon(shape.m_vertices, testbed.color(0.9, 0.9, 0.9));

    for (var i = 0; i < points.length; ++i) {
      testbed.drawPoint(points[i], 3.0, testbed.color(0.3, 0.9, 0.3));
      // testbed.drawString(points[i] + Vec2(0.05, 0.05), "%d", i);
    }

    // if (shape.validate() == false) {
    //   m_textLine += 0;
    // }

    if (m_auto) {
      Generate();
    }
  };

  return world;
});
