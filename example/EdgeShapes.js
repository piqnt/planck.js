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

const { Vec2, World, Edge, Polygon, Box, Circle, Math, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let pause = false;

let MAX_BODIES = 256;

let bodies = [];
let shapes = [];

{
  let ground = world.createBody();

  let x1 = -20.0;
  let y1 = 2.0 * Math.cos(x1 / 10.0 * Math.PI);
  for (let i = 0; i < 80; ++i) {
    let x2 = x1 + 0.5;
    let y2 = 2.0 * Math.cos(x2 / 10.0 * Math.PI);

    ground.createFixture(new Edge(new Vec2(x1, y1), new Vec2(x2, y2)), 0.0);

    x1 = x2;
    y1 = y2;
  }
}

shapes[0] = new Polygon([new Vec2(-0.5, 0.0), new Vec2(0.5, 0.0), new Vec2(0.0, 1.5)]);

shapes[1] = new Polygon([new Vec2(-0.1, 0.0), new Vec2(0.1, 0.0), new Vec2(0.0, 1.5)]);

{
  let w = 1.0;
  let b = w / (2.0 + Math.sqrt(2.0));
  let s = Math.sqrt(2.0) * b;

  let vertices = [];
  vertices[0] = new Vec2(0.5 * s, 0.0);
  vertices[1] = new Vec2(0.5 * w, b);
  vertices[2] = new Vec2(0.5 * w, b + s);
  vertices[3] = new Vec2(0.5 * s, w);
  vertices[4] = new Vec2(-0.5 * s, w);
  vertices[5] = new Vec2(-0.5 * w, b + s);
  vertices[6] = new Vec2(-0.5 * w, b);
  vertices[7] = new Vec2(-0.5 * s, 0.0);

  shapes[2] = new Polygon(vertices);
}

shapes[3] = new Box(0.5, 0.5);

shapes[4] = new Circle(0.5);

let angle = 0.0;

function createItem(index) {
  if (bodies.length > MAX_BODIES) {
    world.destroyBody(bodies.shift());
  }

  let bd = {
    position: new Vec2(
      Math.random(-10.0, 10.0),
      Math.random(10.0, 20.0)
    ),
    angle: Math.random(-Math.PI, Math.PI),
    type: 'dynamic',
  };

  if (index === 4) {
    bd.angularDamping = 0.02;
  }

  let body = world.createBody(bd);

  body.createFixture(shapes[index], {
    density: 20.0,
    friction: 0.3
  });

  bodies.push(body);
}

function destroyBody() {
  world.destroyBody(bodies.shift());
}

testbed.keydown = function(code, char) {
  switch (char) {
  case '1':
    createItem(0);
    break;
  case '2':
    createItem(1);
    break;
  case '3':
    createItem(2);
    break;
  case '4':
    createItem(3);
    break;
  case '5':
    createItem(4);
    break;
  case 'X':
    destroyBody();
    break;
  case 'Z':
    pause = !pause;
    break;
  }
};

testbed.info('1-5: Drop new object, X: Destroy an object');

const rayCastResult = {
  fixture: null,
  point: null,
  normal: null,
};

function rayCastCallback (fixture, point, normal, fraction) {
  rayCastResult.fixture = fixture;
  rayCastResult.point = point;
  rayCastResult.normal = normal;
  return fraction;
}

function rayCastReset () {
  rayCastResult.fixture = null;
  rayCastResult.point = null;
  rayCastResult.normal = null;
}

testbed.step = function() {
  let advanceRay = !pause; // settings.pause == 0 || settings.singleStep;

  let L = 25.0;
  let point1 = new Vec2(0.0, 10.0);
  let d = new Vec2(L * Math.cos(angle), -L * Math.abs(Math.sin(angle)));
  let point2 = Vec2.add(point1, d);

  rayCastReset();

  world.rayCast(point1, point2, rayCastCallback);

  if (rayCastResult.fixture) {
    testbed.drawPoint(rayCastResult.point, 5.0, testbed.color(0.4, 0.9, 0.4));
    testbed.drawSegment(point1, rayCastResult.point, testbed.color(0.8, 0.8, 0.8));

    let head = Vec2.combine(1, rayCastResult.point, 2, rayCastResult.normal);
    testbed.drawSegment(rayCastResult.point, head, testbed.color(0.9, 0.9, 0.4));
  } else {
    testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
  }

  if (advanceRay) {
    angle += 0.25 * Math.PI / 180.0;
  }
};
