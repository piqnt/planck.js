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

planck.testbed('PolyCollision', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2, Transform = pl.Transform;
  var world = new pl.World(Vec2(0, -10));

  var m_polygonA = pl.Box(0.2, 0.4);
  var m_transformA = pl.Transform(Vec2(0.0, 0.0), 0.0);

  var m_polygonB = pl.Box(0.5, 0.5);
  var m_positionB = Vec2(19.345284, 1.5632932);
  var m_angleB = 1.9160721;
  var m_transformB = pl.Transform(m_positionB, m_angleB);

  testbed.step = function() {
    var manifold = new pl.internal.Manifold();
    pl.internal.CollidePolygons(manifold, m_polygonA, m_transformA, m_polygonB, m_transformB);

    var worldManifold = manifold.getWorldManifold(null, m_transformA, m_polygonA.getRadius(), m_transformB, m_polygonB.getRadius());

    testbed.status('point count', manifold.pointCount);

    var vA = Transform.mul(m_transformA, m_polygonA.m_vertices);
    testbed.drawPolygon(vA, testbed.color(0.9, 0.9, 0.9));

    var vB = Transform.mul(m_transformB, m_polygonB.m_vertices);
    testbed.drawPolygon(vB, testbed.color(0.9, 0.9, 0.9));

    for (var i = 0; i < manifold.pointCount; ++i) {
      testbed.drawPoint(worldManifold.points[i], 4.0, testbed.color(0.9, 0.3, 0.3));
    }
  };

  testbed.keydown = function(code, char) {
    if (testbed.activeKeys['left']) {
      m_positionB.x -= 0.1;
    }

    if (testbed.activeKeys['right']) {
      m_positionB.x += 0.1;
    }

    if (testbed.activeKeys['down']) {
      m_positionB.y -= 0.1;
    }

    if (testbed.activeKeys['up']) {
      m_positionB.y += 0.1;
    }

    if (testbed.activeKeys['Z']) {
      m_angleB += 0.1;
    }

    if (testbed.activeKeys['X']) {
      m_angleB -= 0.1;
    }

    m_transformB.set(m_positionB, m_angleB);
  };

  return world;
});
