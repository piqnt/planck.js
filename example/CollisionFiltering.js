/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This is a test of collision filtering.
// There is a triangle, a box, and a circle.
// There are 6 shapes. 3 large and 3 small.
// The 3 small ones always collide.
// The 3 large ones never collide.
// The boxes don't collide with triangles (except if both are small).

const { World, Vec2, Edge, Polygon, Box, Circle, PrismaticJoint, Testbed } = planck;

let SMALL_GROUP = 1;
let LARGE_GROUP = -1;

let TRIANGLE_CATEGORY = 0x0002;
let BOX_Category = 0x0004;
let CIRCLE_CATEGORY = 0x0008;

let TRIANGLE_MASK = 0xFFFF;
let BOX_MASK = 0xFFFF ^ TRIANGLE_CATEGORY;
let CIRCLE_MAX = 0xFFFF;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

// Ground body
let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), {friction : 0.3});

// Small triangle
const smallTriangle = {
  density: 1.0,
  filterCategoryBits: TRIANGLE_CATEGORY,
  filterMaskBits: TRIANGLE_MASK,
  filterGroupIndex: SMALL_GROUP,
};

let body1 = world.createBody({
  type : 'dynamic',
  position : new Vec2(-5.0, 2.0)
});
body1.createFixture(new Polygon([
  new Vec2(-1.0, 0.0),
  new Vec2(1.0, 0.0),
  new Vec2(0.0, 2.0)
]), smallTriangle);

// Large triangle (recycle definitions)
const largeTriangle = {
  density: 1.0,
  filterCategoryBits: TRIANGLE_CATEGORY,
  filterMaskBits: TRIANGLE_MASK,
  filterGroupIndex: LARGE_GROUP,
};

let body2 = world.createBody({
  type : 'dynamic',
  position : new Vec2(-5.0, 6.0),
  fixedRotation : true // look at me!
});
body2.createFixture(new Polygon([
  new Vec2(-2.0, 0.0),
  new Vec2(2.0, 0.0),
  new Vec2(0.0, 4.0)
]), largeTriangle);

let body = world.createDynamicBody(new Vec2(-5.0, 10.0));
body.createFixture(new Box(0.5, 1.0), 1.0);

world.createJoint(new PrismaticJoint({
  enableLimit : true,
  localAnchorA : new Vec2(0.0, 4.0),
  localAnchorB : new Vec2(),
  localAxisA : new Vec2(0.0, 1.0),
  lowerTranslation : -1.0,
  upperTranslation : 1.0
}, body2, body));

// Small box
const smallBox = {
  density : 1.0,
  restitution : 0.1,
  filterCategoryBits: BOX_Category,
  filterMaskBits: BOX_MASK,
  filterGroupIndex: SMALL_GROUP,
};

let body3 = world.createDynamicBody(new Vec2(0.0, 2.0));
body3.createFixture(new Box(1.0, 0.5), smallBox);

// Large box (recycle definitions)
const largeBox = {
  density : 1.0,
  restitution : 0.1,
  filterCategoryBits: BOX_Category,
  filterMaskBits: BOX_MASK,
  filterGroupIndex: LARGE_GROUP,
};

let body4 = world.createDynamicBody(new Vec2(0.0, 6.0));
body4.createFixture(new Box(2.0, 1.0), largeBox);

// Small circle
const smallCircle = {
  density : 1.0,
  filterCategoryBits: CIRCLE_CATEGORY,
  filterMaskBits: CIRCLE_MAX,
  filterGroupIndex: SMALL_GROUP,
};

let body5 = world.createDynamicBody(new Vec2(5.0, 2.0));
body5.createFixture(new Circle(1.0), smallCircle);

// Large circle
const largeCircle = {
  density : 1.0,
  filterCategoryBits: CIRCLE_CATEGORY,
  filterMaskBits: CIRCLE_MAX,
  filterGroupIndex: LARGE_GROUP,
};

let body6 = world.createDynamicBody(new Vec2(5.0, 6.0));
body6.createFixture(new Circle(2.0), largeCircle);
