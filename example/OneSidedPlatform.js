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

const { Vec2, World, Edge, Box, Circle, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let radius = 0.5;
let top = 10.0 + 0.5;
let bottom = 10.0 - 0.5;

let UNKNOWN = 0, ABOVE = +1, BELOW = -1;

let state = UNKNOWN;

// Ground
let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), 0.0);

// Platform
let platform = world.createBody(new Vec2(0.0, 10.0));
let platformFix = platform.createFixture(new Box(3.0, 0.5), 0.0);

// Actor
let character = world.createDynamicBody(new Vec2(0.0, 12.0));
let characterFix = character.createFixture(new Circle(radius), 20.0);
character.setLinearVelocity(new Vec2(0.0, -50.0));

world.on('pre-solve', function(contact, oldManifold) {
  let fixA = contact.getFixtureA();
  let fixB = contact.getFixtureB();

  let isCharPlatformContact =
    fixA === platformFix && fixB === characterFix ||
    fixB === platformFix && fixA === characterFix;

  if (!isCharPlatformContact) {
    return;
  }

  if (false) {
    // if character is below platform
    // disable contact
    let p = character.getPosition();

    if (p.y < top + radius - 3.0 * /*linearSlop*/ 0.005) {
      contact.setEnabled(false);
    }
  } else {
    // if character is moving up
    // disable contact
    let v = character.getLinearVelocity();
    if (v.y > 0.0) {
      contact.setEnabled(false);
    }
  }
});

testbed.step = function() {
  let v = character.getLinearVelocity();
  testbed.status('Character Linear Velocity', v.y);
};
