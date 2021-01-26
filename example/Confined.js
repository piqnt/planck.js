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

planck.testbed('Confined', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World();

  var e_columnCount = 0;
  var e_rowCount = 0;
  var ground = world.createBody();

  // Floor
  ground.createFixture(pl.Edge(Vec2(-10, 0), Vec2(10, 0)), 0);

  // Left wall
  ground.createFixture(pl.Edge(Vec2(-10, 0), Vec2(-10, 20)), 0);

  // Right wall
  ground.createFixture(pl.Edge(Vec2(10, 0), Vec2(10, 20)), 0);

  // Roof
  ground.createFixture(pl.Edge(Vec2(-10, 20), Vec2(10, 20)), 0);

  var radius = 0.5;
  var shape = pl.Circle(radius);

  var fd = {};
  fd.density = 1.0;
  fd.friction = 0.1;

  for (var j = 0; j < e_columnCount; ++j) {
    for (var i = 0; i < e_rowCount; ++i) {
      var body = world.createDynamicBody(Vec2(-10 + (2.1 * j + 1 + 0.01 * i) * radius, (2 * i + 1) * radius));
      body.createFixture(shape, fd);
    }
  }

  function CreateCircle() {
    var body = world.createDynamicBody(Vec2(Math.random() * 10 - 5, Math.random() * 10 + 5));
    // bd.allowSleep = false;
    body.createFixture(pl.Circle(Math.random() * 2.5 + 0.5), {
      density : 1.0,
      friction : 0.0
    });
  }

  testbed.keydown = function(code, char) {
    if (testbed.activeKeys.fire) {
      CreateCircle();
    }
  };

  var stepCount = 0;
  testbed.step = function() {
    var sleeping = true;
    for (var b = world.getBodyList(); b; b = b.getNext()) {
      if (b.isDynamic() && b.isAwake()) {
        sleeping = false;
      }
    }

    // ?
    // if (stepCount++ == 180) {
    //   stepCount += 0;
    // }

    if (sleeping) {
      CreateCircle();
    }

    // for (var b = world.getBodyList(); b; b = b.getNext()) {
    //   if (!b.isDynamic()) {
    //     continue;
    //   }
    //
    //   var p = b.getPosition();
    //   if (p.x <= -10.0 || 10.0 <= p.x || p.y <= 0.0 || 20.0 <= p.y) {
    //     // why?
    //     p.x += 0.0;
    //   }
    // }
  };

  return world;
});
