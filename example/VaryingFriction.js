/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('VaryingFriction', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10))

  world.createBody().createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)));

  world.createBody({
    position : Vec2(-4.0, 22.0),
    angle : -0.25
  }).createFixture(pl.Box(13.0, 0.25), 0.0);

  world.createBody({
    position : Vec2(10.5, 19.0)
  }).createFixture(pl.Box(0.25, 1.0), 0.0);

  world.createBody({
    position : Vec2(4.0, 14.0),
    angle : 0.25
  }).createFixture(pl.Box(13.0, 0.25), 0.0);

  world.createBody({
    position : Vec2(-10.5, 11.0)
  }).createFixture(pl.Box(0.25, 1.0), 0.0);

  world.createBody({
    position : Vec2(-4.0, 6.0),
    angle : -0.25
  }).createFixture(pl.Box(13.0, 0.25), 0.0);

  var friction = [ 0.75, 0.5, 0.35, 0.1, 0.0 ];

  var bd = {};
  bd.type = 'dynamic';

  var fd = {};
  fd.density = 25.0;

  var circle = pl.Box(0.5, 0.5);

  for (var i = 0; i < friction.length; ++i) {
    bd.position = Vec2(-15.0 + 4.0 * i, 28.0);
    fd.friction = friction[i];
    world.createBody(bd).createFixture(circle, fd);
  }

  return world;
});
