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
  {
    var /* EdgeShape */shape;
    shape.set(Vec2(-50.0, 0.0), Vec2(50.0, 0.0));

    var /* FixtureDef */sd;
    sd.shape = shape;
    ;

    var /* BodyDef */bd;
    var /* Body */ground = world.createBody(bd);
    ground.createFixture(sd);
  }

  var /* float32 */xLo = -5.0, xHi = 5.0;
  var /* float32 */yLo = 2.0, yHi = 35.0;

  // Small triangle
  var /* Vec2 */vertices
  [ 3 ];
  vertices[0].set(-1.0, 0.0);
  vertices[1].set(1.0, 0.0);
  vertices[2].set(0.0, 2.0);

  var /* PolygonShape */polygon;
  polygon.set(vertices, 3);

  var /* FixtureDef */triangleShapeDef;
  triangleShapeDef.shape = polygon;
  triangleShapeDef.density = 1.0;

  var /* BodyDef */triangleBodyDef;
  triangleBodyDef.type = 'dynamic';
  triangleBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var /* Body */body1 = world.createBody(triangleBodyDef);
  body1.createFixture(triangleShapeDef);

  // Large triangle (recycle definitions)
  vertices[0] *= 2.0;
  vertices[1] *= 2.0;
  vertices[2] *= 2.0;
  polygon.set(vertices, 3);

  triangleBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var /* Body */body2 = world.createBody(triangleBodyDef);
  body2.createFixture(triangleShapeDef);

  // Small box
  polygon.setAsBox(1.0, 0.5);

  var /* FixtureDef */boxShapeDef;
  boxShapeDef.shape = polygon;
  boxShapeDef.density = 1.0;

  var /* BodyDef */boxBodyDef;
  boxBodyDef.type = 'dynamic';
  boxBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var /* Body */body3 = world.createBody(boxBodyDef);
  body3.createFixture(boxShapeDef);

  // Large box (recycle definitions)
  polygon.setAsBox(2.0, 1.0);
  boxBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var /* Body */body4 = world.createBody(boxBodyDef);
  body4.createFixture(boxShapeDef);

  // Small circle
  var /* CircleShape */circle;
  circle.m_radius = 1.0;

  var /* FixtureDef */circleShapeDef;
  circleShapeDef.shape = circle;
  circleShapeDef.density = 1.0;

  var /* BodyDef */circleBodyDef;
  circleBodyDef.type = 'dynamic';
  circleBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var /* Body */body5 = world.createBody(circleBodyDef);
  body5.createFixture(circleShapeDef);

  // Large circle
  circle.m_radius *= 2.0;
  circleBodyDef.position.set(RandomFloat(xLo, xHi), RandomFloat(yLo, yHi));

  var /* Body */body6 = world.createBody(circleBodyDef);
  body6.createFixture(circleShapeDef);

  function Step(settings) {
    Test.step(settings);

    // We are going to destroy some bodies according to contact
    // points. We must buffer the bodies that should be destroyed
    // because they may belong to multiple contact points.
    /* const */var /* int32 */k_maxNuke = 6;
    var /* Body */nuke
    [ k_maxNuke ];
    var /* int32 */nukeCount = 0;

    // Traverse the contact results. Destroy bodies that
    // are touching heavier bodies.
    for (var /* int32 */i = 0; i < m_pointCount; ++i) {
      ContactPovar /* int */
      povar /* int */= m_points + i;

      var /* Body */body1 = point.fixtureA.getBody();
      var /* Body */body2 = point.fixtureB.getBody();
      var /* float32 */mass1 = body1.getMass();
      var /* float32 */mass2 = body2.getMass();

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
    var /* int32 */i = 0;
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
