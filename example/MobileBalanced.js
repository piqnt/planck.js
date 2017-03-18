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

planck.testbed('MobileBalanced', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  testbed.y = -15;
  testbed.width = 20;
  testbed.height = 20;
  testbed.ratio = 40;

  var DEPTH = 4;
  var DENSITY = 20.0;

  var ground = world.createBody(Vec2(0.0, 20.0));

  var a = 0.5;
  var h = Vec2(0.0, a);

  var root = AddNode(ground, Vec2(), 0, 3.0, a);

  world.createJoint(pl.RevoluteJoint({
    localAnchorA : Vec2(),
    localAnchorB : h
  }, ground, root));

  function AddNode(parent, localAnchor, depth, offset, a) {

    var h = Vec2(0.0, a);

    var p = Vec2().add(parent.getPosition()).add(localAnchor).sub(h);

    var body = world.createBody({
      type : 'dynamic',
      position : p
    });

    body.createFixture(pl.Box(0.25 * a, a), DENSITY);

    if (depth == DEPTH) {
      return body;
    }

    body.createFixture(pl.Box(offset, 0.25 * a, Vec2(0, -a), 0.0), DENSITY);

    var a1 = Vec2(offset, -a);
    var a2 = Vec2(-offset, -a);
    var body1 = AddNode(body, a1, depth + 1, 0.5 * offset, a);
    var body2 = AddNode(body, a2, depth + 1, 0.5 * offset, a);

    var jointDef = {};
    jointDef.localAnchorB = h;

    jointDef.localAnchorA = a1;
    world.createJoint(pl.RevoluteJoint(jointDef, body, body1));

    jointDef.localAnchorA = a2;
    world.createJoint(pl.RevoluteJoint(jointDef, body, body2));

    return body;
  }

  return world;
});
