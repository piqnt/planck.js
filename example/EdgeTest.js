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

planck.testbed('EdgeTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();

  var v1 = Vec2(-10.0, 0.0);
  var v2 = Vec2(-7.0, -2.0);
  var v3 = Vec2(-4.0, 0.0);
  var v4 = Vec2(0.0, 0.0);
  var v5 = Vec2(4.0, 0.0);
  var v6 = Vec2(7.0, 2.0);
  var v7 = Vec2(10.0, 0.0);

  var shape1 = pl.Edge(v1, v2);
  shape1.setNextVertex(v3);
  ground.createFixture(shape1, 0.0);

  var shape2 = pl.Edge(v2, v3);
  shape2.setPrevVertex(v1);
  shape2.setNextVertex(v4);
  ground.createFixture(shape2, 0.0);

  var shape3 = pl.Edge(v3, v4);
  shape3.setPrevVertex(v2);
  shape3.setNextVertex(v5);
  ground.createFixture(shape3, 0.0);

  var shape4 = pl.Edge(v4, v5);
  shape4.setPrevVertex(v3);
  shape4.setNextVertex(v6);
  ground.createFixture(shape4, 0.0);

  var shape5 = pl.Edge(v5, v6);
  shape5.setPrevVertex(v4);
  shape5.setNextVertex(v7);
  ground.createFixture(shape5, 0.0);

  var shape6 = pl.Edge(v6, v7);
  shape6.setPrevVertex(v5);
  ground.createFixture(shape6, 0.0);

  world.createBody({
    type : 'dynamic',
    position : Vec2(-0.5, 0.6),
    allowSleep : false
  }).createFixture(pl.Circle(0.5), 1.0);

  world.createBody({
    type : 'dynamic',
    position : Vec2(1.0, 0.6),
    allowSleep : false
  }).createFixture(pl.Box(0.5, 0.5), 1.0);

  return world;
});
