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

planck.testbed('CollisionFiltering', function(testbed) {
  // This is a test of collision filtering.
  // There is a triangle, a box, and a circle.
  // There are 6 shapes. 3 large and 3 small.
  // The 3 small ones always collide.
  // The 3 large ones never collide.
  // The boxes don't collide with triangles (except if both are small).
  var SMALL_GROUP = 1;
  var LARGE_GROUP = -1;

  var TRIANGLE_CATEGORY = 0x0002;
  var BOX_Category = 0x0004;
  var CIRCLE_CATEGORY = 0x0008;

  var TRIANGLE_MASK = 0xFFFF;
  var BOX_MASK = 0xFFFF ^ TRIANGLE_CATEGORY;
  var CIRCLE_MAX = 0xFFFF;

  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  // Ground body
  world.createBody().createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), {friction : 0.3});

  var triangleShapeDef = {};
  triangleShapeDef.density = 1.0;

  // Small triangle
  triangleShapeDef.filterGroupIndex = SMALL_GROUP;
  triangleShapeDef.filterCategoryBits = TRIANGLE_CATEGORY;
  triangleShapeDef.filterMaskBits = TRIANGLE_MASK;

  var body1 = world.createBody({
    type : 'dynamic',
    position : Vec2(-5.0, 2.0)
  });
  body1.createFixture(pl.Polygon([
    Vec2(-1.0, 0.0),
    Vec2(1.0, 0.0),
    Vec2(0.0, 2.0)
  ]), triangleShapeDef);

  // Large triangle (recycle definitions)
  triangleShapeDef.filterGroupIndex = LARGE_GROUP;

  var body2 = world.createBody({
    type : 'dynamic',
    position : Vec2(-5.0, 6.0),
    fixedRotation : true // look at me!
  });
  body2.createFixture(pl.Polygon([
    Vec2(-2.0, 0.0),
    Vec2(2.0, 0.0),
    Vec2(0.0, 4.0)
  ]), triangleShapeDef);

  var body = world.createDynamicBody(Vec2(-5.0, 10.0));
  body.createFixture(pl.Box(0.5, 1.0), 1.0);
  world.createJoint(pl.PrismaticJoint({
    enableLimit : true,
    localAnchorA : Vec2(0.0, 4.0),
    localAnchorB : Vec2(),
    localAxisA : Vec2(0.0, 1.0),
    lowerTranslation : -1.0,
    upperTranslation : 1.0
  }, body2, body));

  var boxShapeDef = {};
  boxShapeDef.density = 1.0;
  boxShapeDef.restitution = 0.1;

  // Small box
  boxShapeDef.filterGroupIndex = SMALL_GROUP;
  boxShapeDef.filterCategoryBits = BOX_Category;
  boxShapeDef.filterMaskBits = BOX_MASK;

  var body3 = world.createDynamicBody(Vec2(0.0, 2.0));
  body3.createFixture(pl.Box(1.0, 0.5), boxShapeDef);

  // Large box (recycle definitions)
  boxShapeDef.filterGroupIndex = LARGE_GROUP;

  var body4 = world.createDynamicBody(Vec2(0.0, 6.0));
  body4.createFixture(pl.Box(2.0, 1.0), boxShapeDef);

  var circleShapeDef = {};

  // Small circle
  circleShapeDef.density = 1.0;

  circleShapeDef.filterGroupIndex = SMALL_GROUP;
  circleShapeDef.filterCategoryBits = CIRCLE_CATEGORY;
  circleShapeDef.filterMaskBits = CIRCLE_MAX;

  var circleBodyDef = {};
  circleBodyDef.type = 'dynamic';
  circleBodyDef.position = Vec2(5.0, 2.0);

  var body5 = world.createBody(circleBodyDef);
  body5.createFixture(pl.Circle(1.0), circleShapeDef);

  // Large circle
  circleShapeDef.filterGroupIndex = LARGE_GROUP;
  circleBodyDef.position = Vec2(5.0, 6.0);

  var body6 = world.createBody(circleBodyDef);
  body6.createFixture(pl.Circle(2.0), circleShapeDef);

  return world;
});
