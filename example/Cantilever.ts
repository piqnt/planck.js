/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

// It is difficult to make a cantilever made of links completely rigid with weld joints.
// You will have to use a high number of iterations to make them stiff.
// So why not go ahead and use soft weld joints? They behave like a revolute
// joint with a rotational spring.

import { World, Vec2, Edge, Box, WeldJoint, Polygon, Circle, Testbed } from "planck";

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 8;

const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    const body = world.createDynamicBody(new Vec2(-14.5 + 1.0 * i, 5.0));
    body.createFixture(new Box(0.5, 0.125), 20.0);

    const anchor = new Vec2(-15.0 + 1.0 * i, 5.0);
    world.createJoint(new WeldJoint({}, prevBody, body, anchor));

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < 3; ++i) {
    const body = world.createDynamicBody(new Vec2(-14.0 + 2.0 * i, 15.0));
    body.createFixture(new Box(1.0, 0.125), 20.0);

    const anchor = new Vec2(-15.0 + 2.0 * i, 15.0);
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
    const body = world.createDynamicBody(new Vec2(-4.5 + 1.0 * i, 5.0));
    body.createFixture(new Box(0.5, 0.125), 20.0);

    if (i > 0) {
      const anchor = new Vec2(-5.0 + 1.0 * i, 5.0);
      world.createJoint(new WeldJoint({}, prevBody, body, anchor));
    }

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    const body = world.createDynamicBody(new Vec2(5.5 + 1.0 * i, 10.0));
    body.createFixture(new Box(0.5, 0.125), 20.0);

    if (i > 0) {
      const anchor = new Vec2(5.0 + 1.0 * i, 10.0);
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
    const vertices: Vec2[] = [];
    vertices[0] = new Vec2(-0.5, 0.0);
    vertices[1] = new Vec2(0.5, 0.0);
    vertices[2] = new Vec2(0.0, 1.5);

    const body = world.createDynamicBody(new Vec2(-8.0 + 8.0 * i, 12.0));
    body.createFixture(new Polygon(vertices), 1.0);
  }

  for (let i = 0; i < 2; ++i) {
    const body = world.createDynamicBody(new Vec2(-6.0 + 6.0 * i, 10.0));
    body.createFixture(new Circle(0.5), 1.0);
  }
}
