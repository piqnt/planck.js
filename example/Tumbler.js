/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2011 Erin Catto  http://www.box2d.org
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

planck.play('Tumbler', function(pl) {
  var Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  var COUNT = 20; // 800
  var count = 0;

  var ground = world.createBody();

  var bd = {};
  bd.type = 'dynamic';
  bd.allowSleep = false;
  bd.position = Vec2(0, 10);

  var body = world.createBody(bd);

  body.createFixture(pl.Polygon().setAsBox(0.5, 10, Vec2(10, 0), 0), 5);
  body.createFixture(pl.Polygon().setAsBox(0.5, 10, Vec2(-10, 0), 0), 5);
  body.createFixture(pl.Polygon().setAsBox(10, 0.5, Vec2(0, 10), 0), 5);
  body.createFixture(pl.Polygon().setAsBox(10, 0.5, Vec2(0, -10), 0), 5);

  var jd = {};
  jd.motorSpeed = 0.05 * Math.PI;
  jd.maxMotorTorque = 1e8;
  jd.enableMotor = true;
  world.createJoint(pl.RevoluteJoint(jd, ground, body, Vec2(0, 10)));

  var bd = {};
  bd.type = 'dynamic';
  var shape = pl.Polygon().setAsBox(0.125, 0.125);
  while (count < COUNT) {
    var body = world.createBody(bd);
    body.setPosition(Vec2(0, 10));
    body.createFixture(shape, 1);
    ++count;
  }

  return world;
});
