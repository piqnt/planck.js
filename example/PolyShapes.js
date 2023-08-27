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

const { Vec2, Transform, AABB, Circle, Polygon, Edge, Box, World, Distance, Testbed } = planck;

let world = new World(new Vec2(0, -10));
const testbed = Testbed.mount();
testbed.start(world);

let MAX_BODIES = 256;

let bodies = [];

let shapes = [];

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

shapes[0] = new Polygon([
  new Vec2(-0.5, 0.0),
  new Vec2(0.5, 0.0),
  new Vec2(0.0, 1.5)
]);

shapes[1] = new Polygon([
  new Vec2(-0.1, 0.0),
  new Vec2(0.1, 0.0),
  new Vec2(0.0, 1.5)
]);

{
  let w = 1.0;
  let b = w / (2.0 + Math.sqrt(2.0));
  let s = Math.sqrt(2.0) * b;

  shapes[2] = new Polygon([
    new Vec2(0.5 * s, 0.0),
    new Vec2(0.5 * w, b),
    new Vec2(0.5 * w, b + s),
    new Vec2(0.5 * s, w),
    new Vec2(-0.5 * s, w),
    new Vec2(-0.5 * w, b + s),
    new Vec2(-0.5 * w, b),
    new Vec2(-0.5 * s, 0.0),
  ]);
}

shapes[3] = new Box(0.5, 0.5);

shapes[4] = new Circle(0.5);

function createBody(index) {
  if (bodies.length > MAX_BODIES) {
    world.destroyBody(bodies.shift());
  }

  let bd = {
    type: 'dynamic',
    position: new Vec2(Math.random() * 0.4 - 2.0, 10.0),
    angle: Math.random() * 2 * Math.PI - Math.PI,
  };

  if (index === 4) {
    bd.angularDamping = 0.02;
  }

  let body = world.createBody(bd);

  body.createFixture(shapes[index % shapes.length], {
    density: 1.0,
    friction: 0.3,
  });

  bodies.push(body);
}

function destroyBody() {
  world.destroyBody(bodies.shift());
}

testbed.keydown = function(code, char) {
  switch (char) {
  case '1':
    createBody(1);
    break;

  case '2':
    createBody(2);
    break;

  case '3':
    createBody(3);
    break;

  case '4':
    createBody(4);
    break;

  case '5':
    createBody(5);
    break;

  case 'Z':
    for (let i = 0; i < bodies.length; i += 2) {
      let body = bodies[i];
      body.setActive(!body.isActive());
    }
    break;

  case 'X':
    destroyBody();
    break;
  }
};

testbed.info('1-5: Drop new objects, Z: Activate/deactivate some bodies, X: Destroy an object');

testbed.step = function() {
  AABBQueryListener.reset();
  let aabb = new AABB();
  AABBQueryListener.circle.computeAABB(aabb, AABBQueryListener.transform, 0);

  world.queryAABB(aabb, AABBQueryListener.callback);

  testbed.drawCircle(AABBQueryListener.circle.m_p, AABBQueryListener.circle.m_radius, testbed.color(0.4, 0.7, 0.8));
};

function drawFixture(fixture) {
  let color = testbed.color(0.95, 0.95, 0.6);
  let xf = fixture.getBody().getTransform();

  switch (fixture.getType()) {
  case 'circle': {
    let circle = fixture.getShape();

    let center = Transform.mul(xf, circle.getCenter());
    let radius = circle.getRadius();

    testbed.drawCircle(center, radius, color);
  }
    break;

  case 'polygon': {
    let poly = fixture.getShape();
    let vertexCount = poly.m_count;
    // assert(vertexCount <= b2_maxPolygonVertices);
    let vertices = poly.m_vertices.map(v => Transform.mul(xf, v));
    testbed.drawPolygon(vertices, color);
  }
    break;

  default:
    break;
  }
}

// This tests stacking. It also shows how to use World.query and TestOverlap.
// This callback is called by World.queryAABB. We find all the fixtures
// that overlap an AABB. Of those, we use TestOverlap to determine which fixtures
// overlap a circle. Up to 4 overlapped fixtures will be highlighted with a
// yellow border.
let AABBQueryListener = (function() {
  let def = {};

  def.circle = new Circle(new Vec2(0.0, 1.1), 2.0);
  def.transform = new Transform();
  let count = 0;

  let MAX_COUNT = 40;

  def.reset = function() {
    count = 0;
  };
  // Called for each fixture found in the query AABB.
  // return false to terminate the query.
  def.callback = function(fixture) {
    if (count === MAX_COUNT) {
      return false;
    }

    let body = fixture.getBody();
    let shape = fixture.getShape();

    let overlap = Distance.testOverlap(shape, 0, def.circle, 0, body.getTransform(), def.transform);

    if (overlap) {
      drawFixture(fixture);
      ++count;
    }

    return true;
  };

  return def;
})();
