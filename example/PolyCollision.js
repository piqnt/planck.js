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

planck.play('PolyCollision', function(pl) {
  {
    var Vec2 = pl.Vec2;
    var world = new pl.World(Vec2(0, -10));

    m_polygonA.setAsBox(0.2, 0.4);
    m_transformA.set(Vec2(0.0, 0.0), 0.0);

    m_polygonB.setAsBox(0.5, 0.5);
    m_positionB.set(19.345284, 1.5632932);
    m_angleB = 1.9160721;
    m_transformB.set(m_positionB, m_angleB);

    function Step(settings) {
      B2_NOT_USED(settings);

      var /* Manifold */manifold;
      CollidePolygons(manifold, m_polygonA, m_transformA, m_polygonB,
          m_transformB);

      var /* WorldManifold */worldManifold;
      worldManifold.initialize(manifold, m_transformA, m_polygonA.m_radius,
          m_transformB, m_polygonB.m_radius);

      g_debugDraw.DrawString(5, m_textLine, "povar /*int*/ count = %d",
          manifold.pointCount);
      m_textLine += DRAW_STRING_NEW_LINE;

      var color = Color(0.9, 0.9, 0.9);
      var /* Vec2 */v = []// [b2_maxPolygonVertices];
      for (var /* int32 */i = 0; i < m_polygonA.m_count; ++i) {
        v[i] = Mul(m_transformA, m_polygonA.m_vertices[i]);
      }
      g_debugDraw.DrawPolygon(v, m_polygonA.m_count, color);

      for (var /* int32 */i = 0; i < m_polygonB.m_count; ++i) {
        v[i] = Mul(m_transformB, m_polygonB.m_vertices[i]);
      }
      g_debugDraw.DrawPolygon(v, m_polygonB.m_count, color);

      for (var /* int32 */i = 0; i < manifold.pointCount; ++i) {
        g_debugDraw.DrawPoint(worldManifold.points[i], 4.0,
            Color(0.9, 0.3, 0.3));
      }
    }

    function Keyboard( /* int */key) {
      switch (key) {
      case GLFW_KEY_A:
        m_positionB.x -= 0.1;
        break;

      case GLFW_KEY_D:
        m_positionB.x += 0.1;
        break;

      case GLFW_KEY_S:
        m_positionB.y -= 0.1;
        break;

      case GLFW_KEY_W:
        m_positionB.y += 0.1;
        break;

      case GLFW_KEY_Q:
        m_angleB += 0.1 * Math.PI;
        break;

      case GLFW_KEY_E:
        m_angleB -= 0.1 * Math.PI;
        break;
      }

      m_transformB.set(m_positionB, m_angleB);
    }

    var /* PolygonShape */m_polygonA;
    var /* PolygonShape */m_polygonB;

    var /* Transform */m_transformA;
    var /* Transform */m_transformB;

    var /* Vec2 */m_positionB;
    var /* float32 */m_angleB;

    return world;
  }
});
