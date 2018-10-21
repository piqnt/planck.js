/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
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

  var polygonA = pl.Box(2, 4);
  var transformA = pl.Transform(Vec2(0.0, 0.0), 0.0);

  var polygonB = pl.Box(5, 5);
  var positionB = Vec2(5, 4);
  var angleB = 1.9160721;
  var transformB = pl.Transform(positionB, angleB);

  testbed.step = function() {
    var manifold = new pl.internal.Manifold();
    pl.internal.CollidePolygons(manifold, polygonA, transformA, polygonB, transformB);

    var worldManifold = manifold.getWorldManifold(null, transformA, polygonA.getRadius(), transformB, polygonB.getRadius());

    testbed.status('point count', manifold.pointCount);

    var vA = polygonA.m_vertices.map(Transform.mulFn(transformA));
    testbed.drawPolygon(vA, testbed.color(0.9, 0.9, 0.9));

    var vB = polygonB.m_vertices.map(Transform.mulFn(transformB));
    testbed.drawPolygon(vB, testbed.color(0.9, 0.9, 0.9));

    for (var i = 0; i < manifold.pointCount; ++i) {
      testbed.drawPoint(worldManifold.points[i], 4.0, testbed.color(0.9, 0.3, 0.3));
    }
  };

  testbed.keydown = function() {
    if (testbed.activeKeys['left']) {
      positionB.x -= 0.2;
    }

    if (testbed.activeKeys['right']) {
      positionB.x += 0.2;
    }

    if (testbed.activeKeys['down']) {
      positionB.y -= 0.2;
    }

    if (testbed.activeKeys['up']) {
      positionB.y += 0.2;
    }

    if (testbed.activeKeys['Z']) {
      angleB += 0.2;
    }

    if (testbed.activeKeys['X']) {
      angleB -= 0.2;
    }

    transformB.set(positionB, angleB);
  };

  testbed.info('Use arrow keys to move and Z or X to rotate.')
  return world;
});
