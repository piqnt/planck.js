/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// This is used to test sensor shapes.

import { World, Body, Fixture, Vec2, CircleShape, Box, Edge, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 7;

interface UserDate {
  touching: boolean;
}

let sensor: Fixture;
const bodies: Body[] = [];
const touching: UserDate[] = [];

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

if (0) {
  sensor = ground.createFixture({
    shape: new Box(10.0, 2.0, { x: 0.0, y: 20.0 }, 0.0),
    isSensor: true,
  });
} else {
  sensor = ground.createFixture({
    shape: new CircleShape({ x: 0.0, y: 10.0 }, 5.0),
    isSensor: true,
  });
}

const circle = new CircleShape(1.0);

for (let i = 0; i < COUNT; ++i) {
  touching[i] = { touching: false };

  bodies[i] = world.createBody({
    type: "dynamic",
    position: { x: -10.0 + 3.0 * i, y: 20.0 },
    userData: touching[i],
  });
  bodies[i].createFixture({
    shape: circle,
    density: 1.0,
  });
}

// Implement contact listener.
world.on("begin-contact", function (contact) {
  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  if (fixtureA === sensor) {
    const userData = fixtureB.getBody().getUserData() as UserDate;
    if (userData) {
      userData.touching = true;
    }
  }

  if (fixtureB === sensor) {
    const userData = fixtureA.getBody().getUserData() as UserDate;
    if (userData) {
      userData.touching = true;
    }
  }
});

// Implement contact listener.
world.on("end-contact", function (contact) {
  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  if (fixtureA === sensor) {
    const userData = fixtureB.getBody().getUserData() as UserDate;
    if (userData) {
      userData.touching = false;
    }
  }

  if (fixtureB === sensor) {
    const userData = fixtureA.getBody().getUserData() as UserDate;
    if (userData) {
      userData.touching = false;
    }
  }
});

testbed.step = function () {
  // Traverse the contact results. Apply a force on shapes
  // that overlap the sensor.
  for (let i = 0; i < COUNT; ++i) {
    if (!touching[i].touching) {
      continue;
    }

    const body = bodies[i];
    const ground = sensor.getBody();

    const circle = sensor.getShape() as CircleShape;
    const center = ground.getWorldPoint(circle.getCenter());

    const position = body.getPosition();

    const d = Vec2.sub(center, position);
    if (d.lengthSquared() < 1e-18) {
      continue;
    }

    d.normalize();
    const F = Vec2.mul(d, 100.0);
    body.applyForce(F, position, false);
  }
};
