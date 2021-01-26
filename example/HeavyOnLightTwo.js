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

planck.testbed('HeavyOnLightTwo', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  world.createBody().createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  world.createDynamicBody(Vec2(0.0, 2.5)).createFixture(pl.Circle(0.5), 10.0);

  world.createDynamicBody(Vec2(0.0, 3.5)).createFixture(pl.Circle(0.5), 10.0);

  var heavy = null;

  function toggleHeavy() {
    if (heavy) {
      world.destroyBody(heavy);
      heavy = null;
    } else {
      heavy = world.createDynamicBody(Vec2(0.0, 9.0));
      heavy.createFixture(pl.Circle(5.0), 10.0);
    }
  }

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'X':
      toggleHeavy();
      break;
    }
  };


  testbed.info('X: Add/Remove heavy circle');

  return world;
});
