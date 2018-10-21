/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2010 Erin Catto  http://www.box2d.org
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
  shape1.setNext(v3);
  ground.createFixture(shape1, 0.0);

  var shape2 = pl.Edge(v2, v3);
  shape2.setPrev(v1);
  shape2.setNext(v4);
  ground.createFixture(shape2, 0.0);

  var shape3 = pl.Edge(v3, v4);
  shape3.setPrev(v2);
  shape3.setNext(v5);
  ground.createFixture(shape3, 0.0);

  var shape4 = pl.Edge(v4, v5);
  shape4.setPrev(v3);
  shape4.setNext(v6);
  ground.createFixture(shape4, 0.0);

  var shape5 = pl.Edge(v5, v6);
  shape5.setPrev(v4);
  shape5.setNext(v7);
  ground.createFixture(shape5, 0.0);

  var shape6 = pl.Edge(v6, v7);
  shape6.setPrev(v5);
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
