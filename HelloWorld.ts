/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

/*
 * This is a simple example of building and running a simulation
 * using Planck.js. Here we create a large ground box and a small dynamic
 * box.
 * There are no graphics for this example. Planck.js is meant to be used
 * with your rendering engine in your game engine.
 *
 * To run this example simply run `node HelloWorld.js` from command line.
 */

import { Box, World } from "./src";

// Define the gravity vector.
var gravity = { x: 0.0, y: -10.0 };

// Construct a world object, which will hold and simulate the rigid bodies.
var world = new World({
  gravity: gravity,
});

// Define the ground body.
var groundBodyDef = {
  position: { x: 0.0, y: -10.0 },
};

// Call the body factory which allocates memory for the ground body
// from a pool and creates the ground box shape (also from a pool).
// The body is also added to the world.
var groundBody = world.createBody(groundBodyDef);

// Define the ground box shape.
// The extents are the half-widths of the box.
var groundBox = new Box(50.0, 10.0);

// Add the ground fixture to the ground body.
groundBody.createFixture(groundBox, 0.0);

// Define the dynamic body. We set its position and call the body factory.
var body = world.createBody({
  type: "dynamic",
  position: { x: 0.0, y: 4.0 },
});

// Define another box shape for our dynamic body.
var dynamicBox = new Box(1.0, 1.0);

// Define the dynamic body fixture.
var fixtureDef = {
  shape: dynamicBox,
  // Set the box density to be non-zero, so it will be dynamic.
  density: 1.0,
  // Override the default friction.
  friction: 0.3,
};

// Add the shape to the body.
body.createFixture(fixtureDef);

// Prepare for simulation. Typically we use a time step of 1/60 of a
// second (60Hz) and 10 iterations. This provides a high quality simulation
// in most game scenarios.
var timeStep = 1.0 / 60.0;
var velocityIterations = 6;
var positionIterations = 2;

// This is our little game loop.
for (var i = 0; i < 60; ++i) {
  // Instruct the world to perform a single step of simulation.
  // It is generally best to keep the time step and iterations fixed.
  world.step(timeStep, velocityIterations, positionIterations);

  // Now print the position and angle of the body.
  var position = body.getPosition();
  var angle = body.getAngle();

  console.log(position.x.toFixed(2), position.y.toFixed(2), angle.toFixed(2));
}

console.log(Math.abs(position.x) < 0.01);
console.log(Math.abs(position.y - 1.01) < 0.01);
console.log(Math.abs(angle) < 0.01);
