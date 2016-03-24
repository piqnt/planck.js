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

planck.play('DistanceTest', function(pl) {
  {
    {
      m_transformA.setIdentity();
      m_transformA.p.set(0.0, -0.2);
      m_polygonA.setAsBox(10.0, 0.2);
    }

    {
      m_positionB.set(12.017401, 0.13678508);
      m_angleB = -0.0109265;
      m_transformB.set(m_positionB, m_angleB);

      m_polygonB.setAsBox(2.0, 0.1);
    }

    function Step(settings) {
      Test.step(settings);

      var /* DistanceInput */input;
      input.proxyA.set(m_polygonA, 0);
      input.proxyB.set(m_polygonB, 0);
      input.transformA = m_transformA;
      input.transformB = m_transformB;
      input.useRadii = true;
      var /* SimplexCache */cache;
      cache.count = 0;
      var /* DistanceOutput */output;
      Distance(output, cache, input);

      g_debugDraw.DrawString(5, m_textLine, "distance = %g", output.distance);
      m_textLine += DRAW_STRING_NEW_LINE;

      g_debugDraw.DrawString(5, m_textLine, "iterations = %d",
          output.iterations);
      m_textLine += DRAW_STRING_NEW_LINE;

      {
        var color = Color(0.9, 0.9, 0.9);
        var /* Vec2 */v = [];// [b2_maxPolygonVertices];
        for (var /* int32 */i = 0; i < m_polygonA.m_count; ++i) {
          v[i] = Mul(m_transformA, m_polygonA.m_vertices[i]);
        }
        g_debugDraw.DrawPolygon(v, m_polygonA.m_count, color);

        for (var /* int32 */i = 0; i < m_polygonB.m_count; ++i) {
          v[i] = Mul(m_transformB, m_polygonB.m_vertices[i]);
        }
        g_debugDraw.DrawPolygon(v, m_polygonB.m_count, color);
      }

      var /* Vec2 */x1 = output.pointA;
      var /* Vec2 */x2 = output.pointB;

      var c1 = Color(1.0, 0.0, 0.0);
      g_debugDraw.DrawPoint(x1, 4.0, c1);

      var c2 = Color(1.0, 1.0, 0.0);
      g_debugDraw.DrawPoint(x2, 4.0, c2);
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

    var /* Vec2 */m_positionB;
    var /* float32 */m_angleB;

    var /* Transform */m_transformA;
    var /* Transform */m_transformB;
    var /* PolygonShape */m_polygonA;
    var /* PolygonShape */m_polygonB;

    return world;
  }
});
