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

planck.testbed('VaryingFriction', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  world.createBody().createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)));

  world.createBody(Vec2(-4.0, 22.0), -0.25).createFixture(pl.Box(13.0, 0.25), 0.0);

  world.createBody(Vec2(10.5, 19.0)).createFixture(pl.Box(0.25, 1.0), 0.0);

  world.createBody(Vec2(4.0, 14.0), 0.25).createFixture(pl.Box(13.0, 0.25), 0.0);

  world.createBody(Vec2(-10.5, 11.0)).createFixture(pl.Box(0.25, 1.0), 0.0);

  world.createBody(Vec2(-4.0, 6.0), -0.25).createFixture(pl.Box(13.0, 0.25), 0.0);

  var friction = [ 0.75, 0.5, 0.35, 0.1, 0.0 ];

  var circle = pl.Box(0.5, 0.5);

  for (var i = 0; i < friction.length; ++i) {
    var ball = world.createDynamicBody(Vec2(-15.0 + 4.0 * i, 28.0));
    ball.createFixture(circle, {
      density: 25.0,
      friction: friction[i]
    });
  }

  return world;
});
