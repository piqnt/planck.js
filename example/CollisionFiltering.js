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

// This is a test of collision filtering.
// There is a triangle, a box, and a circle.
// There are 6 shapes. 3 large and 3 small.
// The 3 small ones always collide.
// The 3 large ones never collide.
// The boxes don't collide with triangles (except if both are small).
/*const*//*int16*/k_smallGroup = 1;
/* const *//* int16 */k_largeGroup = -1;

/* const *//* uint16 */k_defaultCategory = 0x0001;
/* const *//* uint16 */k_triangleCategory = 0x0002;
/* const *//* uint16 */k_boxCategory = 0x0004;
/* const *//* uint16 */k_circleCategory = 0x0008;

/* const *//* uint16 */k_triangleMask = 0xFFFF;
/* const *//* uint16 */k_boxMask = 0xFFFF ^ k_triangleCategory;
/* const *//* uint16 */k_circleMask = 0xFFFF;

planck.play('CollisionFiltering', function(pl) {
  // Ground body
  {
    var /* EdgeShape */shape;
    shape.set(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));

    var /* FixtureDef */sd;
    sd.shape = shape;
    sd.friction = 0.3;

    var /* BodyDef */bd;
    var /* Body */ground = world.createBody(bd);
    ground.createFixture(sd);
  }

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

  triangleShapeDef.filterGroupIndex = k_smallGroup;
  triangleShapeDef.filterCategoryBits = k_triangleCategory;
  triangleShapeDef.filterMaskBits = k_triangleMask;

  var /* BodyDef */triangleBodyDef;
  triangleBodyDef.type = 'dynamic';
  triangleBodyDef.position.set(-5.0, 2.0);

  var /* Body */body1 = world.createBody(triangleBodyDef);
  body1.createFixture(triangleShapeDef);

  // Large triangle (recycle definitions)
  vertices[0] *= 2.0;
  vertices[1] *= 2.0;
  vertices[2] *= 2.0;
  polygon.set(vertices, 3);
  triangleShapeDef.filterGroupIndex = k_largeGroup;
  triangleBodyDef.position.set(-5.0, 6.0);
  triangleBodyDef.fixedRotation = true; // look at me!

  var /* Body */body2 = world.createBody(triangleBodyDef);
  body2.createFixture(triangleShapeDef);

  {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(-5.0, 10.0);
    var /* Body */body = world.createBody(bd);

    var /* PolygonShape */p;
    p.setAsBox(0.5, 1.0);
    body.createFixture(p, 1.0);

    var /* PrismaticJointDef */jd;
    jd.bodyA = body2;
    jd.bodyB = body;
    jd.enableLimit = true;
    jd.localAnchorA.set(0.0, 4.0);
    jd.localAnchorB.setZero();
    jd.localAxisA.set(0.0, 1.0);
    jd.lowerTranslation = -1.0;
    jd.upperTranslation = 1.0;

    world.createJoint(jd);
  }

  // Small box
  polygon.setAsBox(1.0, 0.5);
  var /* FixtureDef */boxShapeDef;
  boxShapeDef.shape = polygon;
  boxShapeDef.density = 1.0;
  boxShapeDef.restitution = 0.1;

  boxShapeDef.filterGroupIndex = k_smallGroup;
  boxShapeDef.filterCategoryBits = k_boxCategory;
  boxShapeDef.filterMaskBits = k_boxMask;

  var /* BodyDef */boxBodyDef;
  boxBodyDef.type = 'dynamic';
  boxBodyDef.position.set(0.0, 2.0);

  var /* Body */body3 = world.createBody(boxBodyDef);
  body3.createFixture(boxShapeDef);

  // Large box (recycle definitions)
  polygon.setAsBox(2.0, 1.0);
  boxShapeDef.filterGroupIndex = k_largeGroup;
  boxBodyDef.position.set(0.0, 6.0);

  var /* Body */body4 = world.createBody(boxBodyDef);
  body4.createFixture(boxShapeDef);

  // Small circle
  var /* CircleShape */circle;
  circle.m_radius = 1.0;

  var /* FixtureDef */circleShapeDef;
  circleShapeDef.shape = circle;
  circleShapeDef.density = 1.0;

  circleShapeDef.filterGroupIndex = k_smallGroup;
  circleShapeDef.filterCategoryBits = k_circleCategory;
  circleShapeDef.filterMaskBits = k_circleMask;

  var /* BodyDef */circleBodyDef;
  circleBodyDef.type = 'dynamic';
  circleBodyDef.position.set(5.0, 2.0);

  var /* Body */body5 = world.createBody(circleBodyDef);
  body5.createFixture(circleShapeDef);

  // Large circle
  circle.m_radius *= 2.0;
  circleShapeDef.filterGroupIndex = k_largeGroup;
  circleBodyDef.position.set(5.0, 6.0);

  var /* Body */body6 = world.createBody(circleBodyDef);
  body6.createFixture(circleShapeDef);

  return world;
});
