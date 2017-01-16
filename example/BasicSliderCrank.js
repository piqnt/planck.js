/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2014 Erin Catto  http://www.box2d.org
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

// A basic slider crank created for GDC tutorial: Understanding Constraints
planck.play('BasicSliderCrank', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody(Vec2(0.0, 17.0));

  var prevBody = ground;

  // Define crank.
  {
    var shape = pl.Box(4.0, 1.0);

    var body = world.createBody({
      type : 'dynamic',
      position : Vec2(-8.0, 20.0)
    });
    body.createFixture(shape, 2.0);

    world.createJoint(pl.RevoluteJoint({}, prevBody, body, Vec2(-12.0, 20.0)));

    prevBody = body;
  }

  // Define connecting rod
  {
    var shape = pl.Box(8.0, 1.0);

    var body = world.createBody({
      type : 'dynamic',
      position : Vec2(4.0, 20.0)
    });
    body.createFixture(shape, 2.0);

    world.createJoint(pl.RevoluteJoint({}, prevBody, body, Vec2(-4.0, 20.0)));

    prevBody = body;
  }

  // Define piston
  {
    var shape = pl.Box(3.0, 3.0);

    var body = world.createBody({
      type : 'dynamic',
      fixedRotation : true,
      position : Vec2(12.0, 20.0)
    });
    body.createFixture(shape, 2.0);

    world.createJoint(pl.RevoluteJoint({}, prevBody, body, Vec2(12.0, 20.0)));

    world.createJoint(pl.PrismaticJoint({}, ground, body, Vec2(12.0, 17.0), Vec2(1.0, 0.0)));
  }

  return world;
});
