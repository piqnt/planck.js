/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This is used to test sensor shapes.
import planck from "../src/main";

const { World, Vec2, Circle, Box, Edge, Testbed } = planck;

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 7;

let sensor: planck.Fixture;
const bodies = [];
const touching = [];

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

if (0) {
  sensor = ground.createFixture({
    shape: new Box(10.0, 2.0, new Vec2(0.0, 20.0), 0.0),
    isSensor: true,
  });
} else {
  sensor = ground.createFixture({
    shape: new Circle(new Vec2(0.0, 10.0), 5.0),
    isSensor: true,
  });
}

const circle = new Circle(1.0);

for (let i = 0; i < COUNT; ++i) {
  touching[i] = { touching: false };

  bodies[i] = world.createDynamicBody(new Vec2(-10.0 + 3.0 * i, 20.0));
  bodies[i].setUserData(touching[i]);
  bodies[i].createFixture(circle, 1.0);
}

// Implement contact listener.
world.on("begin-contact", function (contact) {
  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  if (fixtureA === sensor) {
    const userData = fixtureB.getBody().getUserData() as any;
    if (userData) {
      userData.touching = true;
    }
  }

  if (fixtureB === sensor) {
    const userData = fixtureA.getBody().getUserData() as any;
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
    const userData = fixtureB.getBody().getUserData() as any;
    if (userData) {
      userData.touching = false;
    }
  }

  if (fixtureB === sensor) {
    const userData = fixtureA.getBody().getUserData() as any;
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

    const circle = sensor.getShape();

    /// NEED TO FIX THIS
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
