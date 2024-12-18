/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Edge, Circle, Box, Testbed } from "planck";

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.info("C: Create a shape, X: Destroy a shape, Z: Sensor");
testbed.start(world);

let sensor = true;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

let body = world.createDynamicBody(new Vec2(0.0, 10.0));

let fixture1 = body.createFixture(new Box(4.0, 4.0, new Vec2(0.0, 0.0), 0.0), 10.0);
let fixture2 = null;

testbed.keydown = function (code, char) {
  switch (char) {
    case "C":
      if (fixture2 == null) {
        let shape = new Circle(new Vec2(0.5, -4.0), 3.0);
        fixture2 = body.createFixture(shape, 10.0);
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
