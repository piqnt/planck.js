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

planck.play('Apply Force', function(pl, testbed) {
  testbed.pin.alignY = -0.8;

  var Vec2 = pl.Vec2;
  var Transform = pl.Transform;

  var world = new pl.World();

  world.setGravity(Vec2(0.0, 0.0));

  var k_restitution = 0.4;

  var ground = world.createBody(Vec2(0.0, 20.0));

  var sd = {};
  sd.density = 0.0;
  sd.restitution = k_restitution;

  // Left vertical
  ground.createFixture(pl.Edge(Vec2(-20.0, -20.0), Vec2(-20.0, 20.0)), sd);

  // Right vertical
  ground.createFixture(pl.Edge(Vec2(20.0, -20.0), Vec2(20.0, 20.0)), sd);

  // Top horizontal
  ground.createFixture(pl.Edge(Vec2(-20.0, 20.0), Vec2(20.0, 20.0)), sd);

  // Bottom horizontal
  ground.createFixture(pl.Edge(Vec2(-20.0, -20.0), Vec2(20.0, -20.0)), sd);

  var xf1 = new Transform();
  xf1.q.set(0.3524 * Math.PI);
  xf1.p.set(xf1.q.getXAxis());

  var poly1 = pl.Polygon([
    Transform.mul(xf1, Vec2(-1.0, 0.0)),
    Transform.mul(xf1, Vec2(1.0, 0.0)),
    Transform.mul(xf1, Vec2(0.0, 0.5))
  ]);

  var xf2 = new Transform();
  xf2.q.set(-0.3524 * Math.PI);
  xf2.p.set(Vec2.neg(xf2.q.getXAxis()));

  var poly2 = pl.Polygon([
    Transform.mul(xf2, Vec2(-1.0, 0.0)),
    Transform.mul(xf2, Vec2(1.0, 0.0)),
    Transform.mul(xf2, Vec2(0.0, 0.5))
  ]);

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

  var shape = pl.Box(0.5, 0.5);

  var fd = {};
  fd.density = 1.0;
  fd.friction = 0.3;

  for (var i = 0; i < 10; ++i) {
    var body = world.createBody({
      type : 'dynamic',
      position : Vec2(0.0, 5.0 + 1.54 * i)
    });

    body.createFixture(shape, fd);

    var gravity = 10.0;
    var I = body.getInertia();
    var mass = body.getMass();

    // For a circle: I = 0.5 * m * r * r ==> r = sqrt(2 * I / m)
    var radius = Math.sqrt(2.0 * I / mass);

    var jd = {};
    jd.collideConnected = true;
    jd.maxForce = mass * gravity;
    jd.maxTorque = mass * radius * gravity;
    world.createJoint(pl.FrictionJoint(jd, ground, body));
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
