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

const { Vec2, Rot, Transform, AABB, World, Edge, Box, Circle } = planck;

var world = new World(new Vec2(0, -10));

const testbed = planck.testbed();
testbed.start(world);

var radius = 0.5;
var top = 10.0 + 0.5;
var bottom = 10.0 - 0.5;

var UNKNOWN = 0, ABOVE = +1, BELOW = -1;

var state = UNKNOWN;

// Ground
var ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-20.0, 0.0), new Vec2(20.0, 0.0)), 0.0);

// Platform
var platform = world.createBody(new Vec2(0.0, 10.0));
var platformFix = platform.createFixture(new Box(3.0, 0.5), 0.0);

// Actor
var character = world.createDynamicBody(new Vec2(0.0, 12.0));
var characterFix = character.createFixture(new Circle(radius), 20.0);
character.setLinearVelocity(new Vec2(0.0, -50.0));

world.on('pre-solve', function(contact, oldManifold) {
  var fixA = contact.getFixtureA();
  var fixB = contact.getFixtureB();

  var isCharPlatformContact =
    fixA === platformFix && fixB === characterFix ||
    fixB === platformFix && fixA === characterFix;

  if (!isCharPlatformContact) {
    return;
  }

  if (0) {
    // if character is below platform
    // disable contact
    var p = character.getPosition();

    if (p.y < top + radius - 3.0 * /*linearSlop*/ 0.005) {
      contact.setEnabled(false);
    }
  } else {
    // if character is moving up
    // disable contact
    var v = character.getLinearVelocity();
    if (v.y > 0.0) {
      contact.setEnabled(false);
    }
  }
});

testbed.step = function(settings) {
  var v = character.getLinearVelocity();
  testbed.status("Character Linear Velocity", v.y);
};
