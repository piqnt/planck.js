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

const { World, Vec2, Edge, Circle, Box } = planck;

var world = new World({
  gravity: new Vec2(0, -10),
  blockSolve: true,
});

const testbed = planck.testbed();
testbed.start(world);

var columnCount = 2;
var rowCount = 15;

var bullet;
var bodies = [];
var indices = [];

var ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)));
ground.createFixture(new Edge(new Vec2(20.0, 0.0), new Vec2(20.0, 20.0)));

var xs = [ 0.0, -10.0, -5.0, 5.0, 10.0 ];

var shape = new Box(0.5, 0.5);

for (var j = 0; j < columnCount; ++j) {
  for (var i = 0; i < rowCount; ++i) {
    var n = j * rowCount + i;
    indices[n] = n;
    var x = 0.0;
    // var x = Math.random(-0.02, 0.02);
    // var x = i % 2 == 0 ? -0.01 : 0.01;

    var body = world.createDynamicBody();
    body.setUserData(indices[n]);
    body.setPosition(new Vec2(xs[j] + x, 0.55 + 1.1 * i));
    body.createFixture(shape, {
      density : 1.0,
      friction : 0.3
    });

    bodies[n] = body;
  }
}

testbed.keydown = function(code, char) {
  switch (char) {
  case 'X':
    if (bullet != null) {
      world.destroyBody(bullet);
      bullet = null;
    }

    bullet = world.createBody({
      type: 'dynamic',
      bullet: true,
      position: new Vec2(-31.0, 5.0),
    });

    bullet.createFixture({
      shape: new Circle(0.25),
      density: 20.0,
      restitution: 0.05,
    });

    bullet.setLinearVelocity(new Vec2(400.0, 0.0));
    break;

  case 'Z':
    world.m_blockSolve = !world.m_blockSolve;
    break;
  }
};

testbed.info("X: Launch a bullet");

testbed.step = function() {
  testbed.status("Blocksolve", world.m_blockSolve);

  // if (stepCount++ == 300) {
  // if (bullet != null)
  // {
  // world.destroyBody(bullet);
  // bullet = null;
  // }

  // {
  // var shape = new Circle(0.25);

  // var fd = {};
  // fd.shape = shape;
  // fd.density = 20.0;
  // fd.restitution = 0.05;

  // var bd = {};
  // bd.type = 'dynamic';
  // bd.bullet = true;
  // bd.position.set(-31.0, 5.0);

  // bullet = world.createBody(bd);
  // bullet.createFixture(fd);

  // bullet.setLinearVelocity(new Vec2(400.0, 0.0));
  // }
  // }
};
