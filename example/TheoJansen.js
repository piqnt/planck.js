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

// Inspired by a contribution by roman_m
// Dimensions scooped from APE (http://www.cove.org/ape/index.htm)
planck.testbed('Theo Jansen\'s Walker', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var motorSpeed = 2.0;
  var motorOn = true;

  var offset = Vec2(0.0, 8.0);
  var pivot = Vec2(0.0, 0.8);

  // Ground
  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-50.0, 0.0), Vec2(50.0, 0.0)), 0.0);
  ground.createFixture(pl.Edge(Vec2(-50.0, 0.0), Vec2(-50.0, 10.0)), 0.0);
  ground.createFixture(pl.Edge(Vec2(50.0, 0.0), Vec2(50.0, 10.0)), 0.0);

  // Balls
  for (var i = 0; i < 40; ++i) {
    world.createBody({
      type: 'dynamic',
      position: Vec2(-40.0 + 2.0 * i, 0.5)
    }).createFixture(pl.Circle(0.25), 1.0);
  }

  // Chassis
  var chassis = world.createBody({
    type: 'dynamic',
    position: Vec2.add(pivot, offset)
  });
  chassis.createFixture(pl.Box(2.5, 1.0), {
    density: 1.0,
    filterGroupIndex: -1
  });

  var wheel = world.createBody({
    type: 'dynamic',
    position: Vec2.add(pivot, offset)
  });
  wheel.createFixture(pl.Circle(1.6), {
    density: 1.0,
    filterGroupIndex: -1
  });

  var motorjoint = world.createJoint(pl.RevoluteJoint({
    collideConnected: false,
    motorSpeed: motorSpeed,
    maxMotorTorque: 400.0,
    enableMotor: motorOn
  }, wheel, chassis, Vec2.add(pivot, offset)));

  var wheelAnchor = Vec2(0.0, -0.8).add(pivot);

  CreateLeg(-1.0, wheelAnchor);
  CreateLeg(1.0, wheelAnchor);

  wheel.setTransform(wheel.getPosition(), 120.0 * Math.PI / 180.0);
  CreateLeg(-1.0, wheelAnchor);
  CreateLeg(1.0, wheelAnchor);

  wheel.setTransform(wheel.getPosition(), -120.0 * Math.PI / 180.0);
  CreateLeg(-1.0, wheelAnchor);
  CreateLeg(1.0, wheelAnchor);

  function CreateLeg(s, wheelAnchor) {

    var p1 = Vec2(5.4 * s, -6.1);
    var p2 = Vec2(7.2 * s, -1.2);
    var p3 = Vec2(4.3 * s, -1.9);
    var p4 = Vec2(3.1 * s, 0.8);
    var p5 = Vec2(6.0 * s, 1.5);
    var p6 = Vec2(2.5 * s, 3.7);

    var poly1, poly2;
    if (s > 0.0) {
      poly1 = pl.Polygon([p1, p2, p3]);
      poly2 = pl.Polygon([Vec2(), Vec2.sub(p5, p4), Vec2.sub(p6, p4)]);

    } else {
      poly1 = pl.Polygon([p1, p3, p2]);
      poly2 = pl.Polygon([Vec2(), Vec2.sub(p6, p4), Vec2.sub(p5, p4)]);
    }

    var body1 = world.createBody({
      type: 'dynamic',
      position: offset,
      angularDamping: 10.0
    });
    body1.createFixture(poly1, {
      density: 1.0,
      filterGroupIndex: -1
    });

    var body2 = world.createBody({
      type: 'dynamic',
      position: Vec2.add(p4, offset),
      angularDamping: 10.0
    });
    body2.createFixture(poly2, {
      density: 1.0,
      filterGroupIndex: -1
    });

    // Using a soft distance constravar integer can reduce some jitter.
    // It also makes the structure seem a bit more fluid by
    // acting like a suspension system.
    var djd = {
      dampingRatio: 0.5,
      frequencyHz: 10.0
    };
    world.createJoint(pl.DistanceJoint(djd, body1, Vec2.add(p2, offset), body2, Vec2.add(p5, offset)));
    world.createJoint(pl.DistanceJoint(djd, body1, Vec2.add(p3, offset), body2, Vec2.add(p4, offset)));
    world.createJoint(pl.DistanceJoint(djd, body1, Vec2.add(p3, offset), wheel, Vec2.add(wheelAnchor, offset)));
    world.createJoint(pl.DistanceJoint(djd, body2, Vec2.add(p6, offset), wheel, Vec2.add(wheelAnchor, offset)));

    world.createJoint(pl.RevoluteJoint({}, body2, chassis, Vec2.add(p4, offset)));
  }

  testbed.step = function() {

    if (testbed.activeKeys.right && testbed.activeKeys.left) {
      motorjoint.setMotorSpeed(0.0);
      motorjoint.enableMotor(false);

    } else if (testbed.activeKeys.right) {
      motorjoint.setMotorSpeed(motorSpeed);
      motorjoint.enableMotor(true);

    } else if (testbed.activeKeys.left) {
      motorjoint.setMotorSpeed(-motorSpeed);
      motorjoint.enableMotor(true);

    } else {
      motorjoint.setMotorSpeed(0.0);
      motorjoint.enableMotor(true);
    }

    if (wheel.getPosition().x > testbed.x + 10) {
      testbed.x = wheel.getPosition().x - 10;

    } else if (wheel.getPosition().x < testbed.x - 10) {
      testbed.x = wheel.getPosition().x + 10;
    }

  };


  return world;
});
