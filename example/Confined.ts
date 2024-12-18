/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Vec2, Edge, Circle, Testbed } from "planck";

let world = new World();

const testbed = Testbed.mount();
testbed.start(world);

let e_columnCount = 0;
let e_rowCount = 0;
let ground = world.createBody();

// Floor
ground.createFixture(new Edge(new Vec2(-10, 0), new Vec2(10, 0)), 0);

// Left wall
ground.createFixture(new Edge(new Vec2(-10, 0), new Vec2(-10, 20)), 0);

// Right wall
ground.createFixture(new Edge(new Vec2(10, 0), new Vec2(10, 20)), 0);

// Roof
ground.createFixture(new Edge(new Vec2(-10, 20), new Vec2(10, 20)), 0);

let radius = 0.5;
let shape = new Circle(radius);

let fd = {
  density: 1.0,
  friction: 0.1,
};

for (let j = 0; j < e_columnCount; ++j) {
  for (let i = 0; i < e_rowCount; ++i) {
    let body = world.createDynamicBody(
      new Vec2(-10 + (2.1 * j + 1 + 0.01 * i) * radius, (2 * i + 1) * radius),
    );
    body.createFixture(shape, fd);
  }
}

function CreateCircle() {
  let body = world.createDynamicBody(new Vec2(Math.random() * 10 - 5, Math.random() * 10 + 5));
  // bd.allowSleep = false;
  body.createFixture(new Circle(Math.random() * 2.5 + 0.5), {
    density: 1.0,
    friction: 0.0,
  });
}

testbed.keydown = function (code, char) {
  if (testbed.activeKeys.fire) {
    CreateCircle();
  }
};

let stepCount = 0;
testbed.step = function () {
  let sleeping = true;
  for (let b = world.getBodyList(); b; b = b.getNext()) {
    if (b.isDynamic() && b.isAwake()) {
      sleeping = false;
    }
  }

  // ?
  // if (stepCount++ == 180) {
  //   stepCount += 0;
  // }

  if (sleeping) {
    CreateCircle();
  }

  // for (let b = world.getBodyList(); b; b = b.getNext()) {
  //   if (!b.isDynamic()) {
  //     continue;
  //   }
  //
  //   let p = b.getPosition();
  //   if (p.x <= -10.0 || 10.0 <= p.x || p.y <= 0.0 || 20.0 <= p.y) {
  //     // why?
  //     p.x += 0.0;
  //   }
  // }
};
