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

planck.testbed('AddPair', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, 0));

  testbed.y = 0;
  testbed.hz = 60;
  testbed.speed = 0.5;

  var circle = pl.Circle(0.1);

  for (var i = 0; i < 50; ++i) {
    var pos = Vec2(pl.Math.random(0.0, -6.0), pl.Math.random(-1.0, 1.0));
    world.createDynamicBody(pos).createFixture(circle, 0.01);
  }

  var box = world.createBody({
    type : 'dynamic',
    position : Vec2(-40.0, 0.0),
    bullet : true
  });

  box.createFixture(pl.Box(1.5, 1.5), 1.0);
  box.setLinearVelocity(Vec2(100.0, 0.0));

  return world;
});
