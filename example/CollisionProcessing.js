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

// This test shows collision processing and tests
// deferred body destruction.
planck.play('CollisionProcessing', function(pl) {
  // Ground body
  world.createBody()
    .createFixture(pl.Edge(Vec2(-50.0, 0.0), Vec2(50.0, 0.0)));

  var xLo = -5.0, xHi = 5.0;
  var yLo = 2.0, yHi = 35.0;

  // Small triangle
  var vertices = [];
  vertices[0].set(-1.0, 0.0);
  vertices[1].set(1.0, 0.0);
  vertices[2].set(0.0, 2.0);

  var triangleShapeDef = {};
  triangleShapeDef.shape = pl.Polygon(vertices);
  triangleShapeDef.density = 1.0;

  var triangleBodyDef = {};
  triangleBodyDef.type = 'dynamic';
  triangleBodyDef.position = Vec2(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var body1 = world.createBody(triangleBodyDef);
  body1.createFixture(triangleShapeDef);

  // Large triangle (recycle definitions)
  vertices[0] *= 2.0;
  vertices[1] *= 2.0;
  vertices[2] *= 2.0;
  triangleShapeDef.shape = pl.Polygon(vertices);

  triangleBodyDef.position = Vec2(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var body2 = world.createBody(triangleBodyDef);
  body2.createFixture(triangleShapeDef);

  // Small box

  var boxShapeDef = {};
  boxShapeDef.shape = pl.Box(1.0, 0.5);
  boxShapeDef.density = 1.0;

  var boxBodyDef = {};
  boxBodyDef.type = 'dynamic';
  boxBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var body3 = world.createBody(boxBodyDef);
  body3.createFixture(boxShapeDef);

  // Large box (recycle definitions)
  boxShapeDef.shape = pl.Box(2.0, 1.0);
  boxBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var body4 = world.createBody(boxBodyDef);
  body4.createFixture(boxShapeDef);

  // Small circle
  var circleShapeDef = {};
  circleShapeDef.shape = pl.Circle(1.0);
  circleShapeDef.density = 1.0;

  var circleBodyDef = {};
  circleBodyDef.type = 'dynamic';
  circleBodyDef.position = Vec2(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var body5 = world.createBody(circleBodyDef);
  body5.createFixture(circleShapeDef);

  // Large circle
  circleShapeDef.shape = pl.Circle(2.0);
  circleBodyDef.position = Vec2(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var body6 = world.createBody(circleBodyDef);
  body6.createFixture(circleShapeDef);

  function Step(settings) {
    Test.step(settings);

    // We are going to destroy some bodies according to contact
    // points. We must buffer the bodies that should be destroyed
    // because they may belong to multiple contact points.
    var k_maxNuke = 6;
    var nuke = []; // Body[ k_maxNuke ]
    var nukeCount = 0;

    // Traverse the contact results. Destroy bodies that
    // are touching heavier bodies.
    for (var i = 0; i < m_pointCount; ++i) {
      var /* ContactPovar */ povar = m_points + i;

      var body1 = point.fixtureA.getBody();
      var body2 = point.fixtureB.getBody();
      var mass1 = body1.getMass();
      var mass2 = body2.getMass();

      if (mass1 > 0.0 && mass2 > 0.0) {
        if (mass2 > mass1) {
          nuke[nukeCount++] = body1;
        } else {
          nuke[nukeCount++] = body2;
        }

        if (nukeCount == k_maxNuke) {
          break;
        }
      }
    }

    // Sort the nuke array to group duplicates.
    std.sort(nuke, nuke + nukeCount);

    // Destroy the bodies, skipping duplicates.
    var i = 0;
    while (i < nukeCount) {
      var /* Body */b = nuke[i++];
      while (i < nukeCount && nuke[i] == b) {
        ++i;
      }

      if (b != m_bomb) {
        world.destroyBody(b);
      }
    }
  }

  return world;
});
