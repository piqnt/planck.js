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

const { Vec2, World, Edge, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

// Ground
let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), 0.0);

// Platform
let platform = world
  .createBody(new Vec2(-5.0, 5.0))
  .createFixture(new Box(10.0, 0.5), {friction : 0.8});

// Boxes
for (let i = 0; i < 5; ++i) {
  world
    .createDynamicBody(new Vec2(-10.0 + 2.0 * i, 7.0))
    .createFixture(new Box(0.5, 0.5), 20.0);
}

world.on('pre-solve', function(contact, oldManifold) {
  let fixtureA = contact.getFixtureA();
  let fixtureB = contact.getFixtureB();

  if (fixtureA == platform) {
    contact.setTangentSpeed(5.0);
  }

  if (fixtureB == platform) {
    contact.setTangentSpeed(-5.0);
  }
});
