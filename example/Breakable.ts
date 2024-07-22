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

const { World, Vec2, Edge, Box, Testbed } = planck;

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let breakVelocity: planck.Vec2;
let breakAngularVelocity: number;

let broke = false;

// Ground body
const ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

// Breakable dynamic body
const body1 = world.createDynamicBody(new Vec2(0.0, 40.0), 0.25 * Math.PI);

const shape1 = new Box(0.5, 0.5, new Vec2(-0.5, 0.0), 0.0);
const piece1 = body1.createFixture(shape1, 1.0);

const shape2 = new Box(0.5, 0.5, new Vec2(0.5, 0.0), 0.0);
let piece2 = body1.createFixture(shape2, 1.0);

world.on("post-solve", function (contact, impulse) {
  if (broke) {
    // The body already broke.
    return;
  }

  // Should the body break?
  const count = contact.getManifold().pointCount;

  let maxImpulse = 0.0;
  for (let i = 0; i < count; ++i) {
    maxImpulse = Math.max(maxImpulse, impulse.normalImpulses[i]);
  }

  if (maxImpulse > 40.0) {
    setTimeout(function () {
      Break();
      broke = true;
    });
  }
});

function Break() {
  // Create two bodies from one.
  const center = body1.getWorldCenter();

  body1.destroyFixture(piece2);

  const body2 = world.createDynamicBody(body1.getPosition(), body1.getAngle());

  piece2 = body2.createFixture(shape2, 1.0);

  // Compute consistent velocities for new bodies based on
  // cached velocity.
  const center1 = body1.getWorldCenter();
  const center2 = body2.getWorldCenter();

  const velocity1 = Vec2.add(
    breakVelocity,
    Vec2.cross(breakAngularVelocity, Vec2.sub(center1, center))
  );
  const velocity2 = Vec2.add(
    breakVelocity,
    Vec2.cross(breakAngularVelocity, Vec2.sub(center2, center))
  );

  body1.setAngularVelocity(breakAngularVelocity);
  body1.setLinearVelocity(velocity1);

  body2.setAngularVelocity(-breakAngularVelocity);
  body2.setLinearVelocity(velocity2);
}

testbed.step = function () {
  // Cache velocities to improve movement on breakage.
  if (!broke) {
    breakVelocity = body1.getLinearVelocity();
    breakAngularVelocity = body1.getAngularVelocity();
  }
};
