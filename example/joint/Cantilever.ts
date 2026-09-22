/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// It is difficult to make a cantilever made of links completely rigid with weld joints.
// You will have to use a high number of iterations to make them stiff.
// So why not go ahead and use soft weld joints? They behave like a revolute
// joint with a rotational spring.

import { World, Edge, Box, WeldJoint, Polygon, Circle, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 8;

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40.0, y: 0.0 }, { x: 40.0, y: 0.0 }),
  density: 0.0,
});
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    const body = world.createBody({
      type: "dynamic",
      position: { x: -14.5 + 1.0 * i, y: 5.0 },
    });
    body.createFixture({
      shape: new Box(0.5, 0.125),
      density: 20.0,
    });

    const anchor = { x: -15.0 + 1.0 * i, y: 5.0 };
    world.createJoint(new WeldJoint({}, prevBody, body, anchor));

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < 3; ++i) {
    const body = world.createBody({
      type: "dynamic",
      position: { x: -14.0 + 2.0 * i, y: 15.0 },
    });
    body.createFixture({
      shape: new Box(1.0, 0.125),
      density: 20.0,
    });

    const anchor = { x: -15.0 + 2.0 * i, y: 15.0 };
    world.createJoint(
      new WeldJoint(
        {
          frequencyHz: 5.0,
          dampingRatio: 0.7,
        },
        prevBody,
        body,
        anchor,
      ),
    );

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    const body = world.createBody({
      type: "dynamic",
      position: { x: -4.5 + 1.0 * i, y: 5.0 },
    });
    body.createFixture({
      shape: new Box(0.5, 0.125),
      density: 20.0,
    });

    if (i > 0) {
      const anchor = { x: -5.0 + 1.0 * i, y: 5.0 };
      world.createJoint(new WeldJoint({}, prevBody, body, anchor));
    }

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    const body = world.createBody({
      type: "dynamic",
      position: { x: 5.5 + 1.0 * i, y: 10.0 },
    });
    body.createFixture({
      shape: new Box(0.5, 0.125),
      density: 20.0,
    });

    if (i > 0) {
      const anchor = { x: 5.0 + 1.0 * i, y: 10.0 };
      world.createJoint(
        new WeldJoint(
          {
            frequencyHz: 8.0,
            dampingRatio: 0.7,
          },
          prevBody,
          body,
          anchor,
        ),
      );
    }

    prevBody = body;
  }
}
{
  for (let i = 0; i < 2; ++i) {
    const vertices = [
      { x: -0.5, y: 0.0 },
      { x: 0.5, y: 0.0 },
      { x: 0.0, y: 1.5 },
    ];

    const body = world.createBody({
      type: "dynamic",
      position: { x: -8.0 + 8.0 * i, y: 12.0 },
    });
    body.createFixture({
      shape: new Polygon(vertices),
      density: 1.0,
    });
  }

  for (let i = 0; i < 2; ++i) {
    const body = world.createBody({
      type: "dynamic",
      position: { x: -6.0 + 6.0 * i, y: 10.0 },
    });
    body.createFixture({
      shape: new Circle(0.5),
      density: 1.0,
    });
  }
}
