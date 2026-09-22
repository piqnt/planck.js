/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Fixture, Edge, Circle, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.info("C: Create a shape, X: Destroy a shape, Z: Sensor");
testbed.start(world);

let sensor = true;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const body = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 10.0 },
});

const fixture1 = body.createFixture({
  shape: new Box(4.0, 4.0, { x: 0.0, y: 0.0 }, 0.0),
  density: 10.0,
});

let fixture2: Fixture | null = null;

testbed.keydown = function (code, char) {
  switch (char) {
    case "C":
      if (fixture2 == null) {
        fixture2 = body.createFixture({
          shape: new Circle({ x: 0.5, y: -4.0 }, 3.0),
          density: 10.0,
        });
        body.setAwake(true);
        fixture2.setSensor(sensor);
      }
      break;

    case "X":
      if (fixture2 != null) {
        body.destroyFixture(fixture2);
        fixture2 = null;
        body.setAwake(true);
      }
      break;

    case "Z":
      if (fixture2 != null) {
        sensor = !sensor;
        fixture2.setSensor(sensor);
      }
      break;
  }

  updateStatus();
};

function updateStatus() {
  testbed.status("Sensor", sensor);
}

updateStatus();
