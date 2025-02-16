/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Body, Circle, Edge, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.info("X: Add/Remove heavy circle");
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});

const light1 = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 2.5 },
});
light1.createFixture({
  shape: new Circle(0.5),
  density: 10.0,
});

const light2 = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 3.5 },
});
light2.createFixture({
  shape: new Circle(0.5),
  density: 10.0,
});

let heavy: Body | null = null;

function toggleHeavy() {
  if (heavy) {
    world.destroyBody(heavy);
    heavy = null;
  } else {
    heavy = world.createBody({
      type: "dynamic",
      position: { x: 0.0, y: 9.0 },
    });
    heavy.createFixture({
      shape: new Circle(5.0),
      density: 10.0,
    });
  }
}

testbed.keydown = function (code, char) {
  switch (char) {
    case "X":
      toggleHeavy();
      break;
  }
};
