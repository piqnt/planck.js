/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
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

planck.play('PolyCollision', function(pl, testbed) {
  var Vec2 = pl.Vec2, Transform = pl.Transform;
  var world = new pl.World(Vec2(0, -10));

  var m_polygonA = pl.Box(0.2, 0.4);
  var m_transformA = pl.Transform(Vec2(0.0, 0.0), 0.0);

  var m_polygonB = pl.Box(0.5, 0.5);
  var m_positionB = Vec2(19.345284, 1.5632932);
  var m_angleB = 1.9160721;
  var m_transformB = pl.Transform(m_positionB, m_angleB);

  testbed.step = function() {
    return;

    var manifold = new pl.internal.Manifold();
    CollidePolygons(manifold, m_polygonA, m_transformA, m_polygonB, m_transformB);

    var worldManifold = manifold.getWorldManifold(null, m_transformA, m_polygonA.getRadius(), m_transformB, m_polygonB.getRadius());

    g_debugDraw.DrawString(5, m_textLine, "point count = %d", manifold.pointCount);

    var v = [];
    for (var i = 0; i < m_polygonA.m_count; ++i) {
      v[i] = Transform.mul(m_transformA, m_polygonA.m_vertices[i]);
    }
    // g_debugDraw.DrawPolygon(v, m_polygonA.m_count, Color(0.9, 0.9, 0.9));

    for (var i = 0; i < m_polygonB.m_count; ++i) {
      v[i] = Transform.mul(m_transformB, m_polygonB.m_vertices[i]);
    }
    // g_debugDraw.DrawPolygon(v, m_polygonB.m_count, Color(0.9, 0.9, 0.9));

    for (var i = 0; i < manifold.pointCount; ++i) {
      // g_debugDraw.DrawPoint(worldManifold.points[i], 4.0, Color(0.9, 0.3, 0.3));
    }
  };

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'A':
      m_positionB.x -= 0.1;
      break;

    case 'D':
      m_positionB.x += 0.1;
      break;

    case 'S':
      m_positionB.y -= 0.1;
      break;

    case 'W':
      m_positionB.y += 0.1;
      break;

    case 'Q':
      m_angleB += 0.1 * Math.PI;
      break;

    case 'E':
      m_angleB -= 0.1 * Math.PI;
      break;
    }

    m_transformB.set(m_positionB, m_angleB);
  };

  return world;
});
