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

planck.play('ConvexHull', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World();

  var e_count = 8;
  var m_auto = false;
  var points = [];

  var body = world.createBody();

  Generate();

  function Generate() {
    var lowerBound = Vec2(-8.0, -8.0);
    var upperBound = Vec2(8.0, 8.0);

    for (var i = 0; i < e_count; ++i) {
      var x = 10.0 * Math.random();
      var y = 10.0 * Math.random();

      // Clamp onto a square to help create collinearities.
      // This will stress the convex hull algorithm.
      var v = Vec2.clamp(Vec2(x, y), lowerBound, upperBound);
      points.push(v);
    }

    var shape = pl.Polygon(points);

    body.createFixture(shape);
  }

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
    case 'A'.charCodeAt(0):
      m_auto = !m_auto;
      break;

    case 'G'.charCodeAt(0):
      Generate();
      break;
    }
  });

  function Step(settings) {

    g_debugDraw.DrawString(5, m_textLine,
        "Press g to generate a new random convex hull");
    m_textLine += DRAW_STRING_NEW_LINE;

    g_debugDraw.DrawPolygon(shape.m_vertices, shape.m_count, Color(0.9, 0.9,
        0.9));

    for (var i = 0; i < m_count; ++i) {
      g_debugDraw.DrawPoint(points[i], 3.0, Color(0.3, 0.9, 0.3));
      g_debugDraw.DrawString(points[i] + Vec2(0.05, 0.05), "%d", i);
    }

    if (shape.validate() == false) {
      m_textLine += 0;
    }

    if (m_auto) {
      Generate();
    }
  }

  return world;
});
