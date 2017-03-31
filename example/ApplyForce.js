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

planck.testbed('Apply Force', function(testbed) {
  testbed.y = -20;

  var pl = planck, Vec2 = pl.Vec2, Transform = pl.Transform;

  var world = new pl.World();

  world.setGravity(Vec2(0.0, 0.0));

  var ground = world.createBody(Vec2(0.0, 20.0));

  var wallFD = {};
  wallFD.density = 0.0;
  wallFD.restitution = 0.4;

  // Left vertical
  ground.createFixture(pl.Edge(Vec2(-20.0, -20.0), Vec2(-20.0, 20.0)), wallFD);

  // Right vertical
  ground.createFixture(pl.Edge(Vec2(20.0, -20.0), Vec2(20.0, 20.0)), wallFD);

  // Top horizontal
  ground.createFixture(pl.Edge(Vec2(-20.0, 20.0), Vec2(20.0, 20.0)), wallFD);

  // Bottom horizontal
  ground.createFixture(pl.Edge(Vec2(-20.0, -20.0), Vec2(20.0, -20.0)), wallFD);

  var xf1 = new Transform();
  xf1.q.set(0.3524 * Math.PI);
  xf1.p.set(xf1.q.getXAxis());

  var poly1 = pl.Polygon(Transform.mul(xf1, [Vec2(-1.0, 0.0), Vec2(1.0, 0.0), Vec2(0.0, 0.5)]));

  var xf2 = new Transform();
  xf2.q.set(-0.3524 * Math.PI);
  xf2.p.set(Vec2.neg(xf2.q.getXAxis()));

  var poly2 = pl.Polygon(Transform.mul(xf2, [Vec2(-1.0, 0.0), Vec2(1.0, 0.0), Vec2(0.0, 0.5)]));

  var jet = world.createBody({
    type : 'dynamic',
    angularDamping : 2.0,
    linearDamping : 0.5,
    position : Vec2(0.0, 2.0),
    angle : Math.PI,
    allowSleep : false
  });

  jet.createFixture(poly1, 2.0);
  jet.createFixture(poly2, 2.0);

  var boxFD = {};
  boxFD.density = 1.0;
  boxFD.friction = 0.3;

  for (var i = 0; i < 10; ++i) {
    var box = world.createBody({
      type : 'dynamic',
      position : Vec2(0.0, 5.0 + 1.54 * i)
    });

    box.createFixture(pl.Box(0.5, 0.5), boxFD);

    var gravity = 10.0;
    var I = box.getInertia();
    var mass = box.getMass();

    // For a circle: I = 0.5 * m * r * r ==> r = sqrt(2 * I / m)
    var radius = Math.sqrt(2.0 * I / mass);

    world.createJoint(pl.FrictionJoint({
      collideConnected : true,
      maxForce : mass * gravity,
      maxTorque : mass * radius * gravity
    }, ground, box));
  }

  testbed.step = function() {
    if (testbed.activeKeys.right && !testbed.activeKeys.left) {
      jet.applyAngularImpulse(-0.2, true);

    } else if (testbed.activeKeys.left && !testbed.activeKeys.right) {
      jet.applyAngularImpulse(+0.2, true);
    }

    if (testbed.activeKeys.up) {
      var f = jet.getWorldVector(Vec2(0.0, -1.0));
      var p = jet.getWorldPoint(Vec2(0.0, 2.0));
      jet.applyLinearImpulse(f, p, true);
    }
  };

  return world;
});
