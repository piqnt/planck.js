/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// Inspired by a contribution by roman_m
// Dimensions scooped from APE (http://www.cove.org/ape/index.htm)

import {
  World,
  Vec2,
  Edge,
  Circle,
  Box,
  PolygonShape,
  RevoluteJoint,
  DistanceJoint,
  Testbed,
} from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const motorSpeed = 2.0;
const motorOn = true;

const offset = new Vec2(0.0, 8.0);
const pivot = new Vec2(0.0, 0.8);

// Ground
const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-50.0, 0.0), new Vec2(50.0, 0.0)), 0.0);
ground.createFixture(new Edge(new Vec2(-50.0, 0.0), new Vec2(-50.0, 10.0)), 0.0);
ground.createFixture(new Edge(new Vec2(50.0, 0.0), new Vec2(50.0, 10.0)), 0.0);

// Balls
for (let i = 0; i < 40; ++i) {
  world.createDynamicBody(new Vec2(-40.0 + 2.0 * i, 0.5)).createFixture(new Circle(0.25), 1.0);
}

// Chassis
const chassis = world.createDynamicBody(Vec2.add(pivot, offset));
chassis.createFixture(new Box(2.5, 1.0), {
  density: 1.0,
  filterGroupIndex: -1,
});

const wheel = world.createDynamicBody(Vec2.add(pivot, offset));
wheel.createFixture(new Circle(1.6), {
  density: 1.0,
  filterGroupIndex: -1,
});

const motorJoint = world.createJoint(
  new RevoluteJoint(
    {
      collideConnected: false,
      motorSpeed: motorSpeed,
      maxMotorTorque: 400.0,
      enableMotor: motorOn,
    },
    wheel,
    chassis,
    Vec2.add(pivot, offset),
  ),
);

const wheelAnchor = new Vec2(0.0, -0.8).add(pivot);

createLeg(-1.0, wheelAnchor);
createLeg(1.0, wheelAnchor);

wheel.setTransform(wheel.getPosition(), (120.0 * Math.PI) / 180.0);
createLeg(-1.0, wheelAnchor);
createLeg(1.0, wheelAnchor);

wheel.setTransform(wheel.getPosition(), (-120.0 * Math.PI) / 180.0);
createLeg(-1.0, wheelAnchor);
createLeg(1.0, wheelAnchor);

function createLeg(s: number, wheelAnchor: Vec2) {
  const p1 = new Vec2(5.4 * s, -6.1);
  const p2 = new Vec2(7.2 * s, -1.2);
  const p3 = new Vec2(4.3 * s, -1.9);
  const p4 = new Vec2(3.1 * s, 0.8);
  const p5 = new Vec2(6.0 * s, 1.5);
  const p6 = new Vec2(2.5 * s, 3.7);

  let poly1: PolygonShape;
  let poly2: PolygonShape;
  if (s > 0.0) {
    poly1 = new PolygonShape([p1, p2, p3]);
    poly2 = new PolygonShape([new Vec2(), Vec2.sub(p5, p4), Vec2.sub(p6, p4)]);
  } else {
    poly1 = new PolygonShape([p1, p3, p2]);
    poly2 = new PolygonShape([new Vec2(), Vec2.sub(p6, p4), Vec2.sub(p5, p4)]);
  }

  const body1 = world.createDynamicBody({
    position: offset,
    angularDamping: 10.0,
  });
  body1.createFixture(poly1, {
    density: 1.0,
    filterGroupIndex: -1,
  });

  const body2 = world.createDynamicBody({
    position: Vec2.add(p4, offset),
    angularDamping: 10.0,
  });
  body2.createFixture(poly2, {
    density: 1.0,
    filterGroupIndex: -1,
  });

  // Using a soft distance constraint can reduce some jitter.
  // It also makes the structure seem a bit more fluid by
  // acting like a suspension system.
  const djd = {
    dampingRatio: 0.5,
    frequencyHz: 10.0,
  };
  world.createJoint(
    new DistanceJoint(djd, body1, body2, Vec2.add(p2, offset), Vec2.add(p5, offset)),
  );
  world.createJoint(
    new DistanceJoint(djd, body1, body2, Vec2.add(p3, offset), Vec2.add(p4, offset)),
  );
  world.createJoint(
    new DistanceJoint(djd, body1, wheel, Vec2.add(p3, offset), Vec2.add(wheelAnchor, offset)),
  );
  world.createJoint(
    new DistanceJoint(djd, body2, wheel, Vec2.add(p6, offset), Vec2.add(wheelAnchor, offset)),
  );

  world.createJoint(new RevoluteJoint({}, body2, chassis, Vec2.add(p4, offset)));
}

testbed.step = function () {
  if (!motorJoint) return;
  if (testbed.activeKeys.right && testbed.activeKeys.left) {
    motorJoint.setMotorSpeed(0.0);
    motorJoint.enableMotor(false);
  } else if (testbed.activeKeys.right) {
    motorJoint.setMotorSpeed(motorSpeed);
    motorJoint.enableMotor(true);
  } else if (testbed.activeKeys.left) {
    motorJoint.setMotorSpeed(-motorSpeed);
    motorJoint.enableMotor(true);
  } else {
    motorJoint.setMotorSpeed(0.0);
    motorJoint.enableMotor(true);
  }

  if (wheel.getPosition().x > testbed.x + 10) {
    testbed.x = wheel.getPosition().x - 10;
  } else if (wheel.getPosition().x < testbed.x - 10) {
    testbed.x = wheel.getPosition().x + 10;
  }
};
