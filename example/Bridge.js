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

const { Vec2, World, Edge, Box, Polygon, Circle, RevoluteJoint } = planck;

var world = new World(new Vec2(0, -4));

const testbed = planck.testbed();
testbed.start(world);

var COUNT = 30;

var middle;

var ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

var bridgeRect = new Box(0.5, 0.125);

var bridgeFD = {
  density: 20.0,
  friction: 0.2
};

var prevBody = ground;
for (var i = 0; i < COUNT; ++i) {
  var body = world.createDynamicBody(new Vec2(-14.5 + 1.0 * i, 5.0));
  body.createFixture(bridgeRect, bridgeFD);

  var anchor = new Vec2(-15.0 + 1.0 * i, 5.0);
  world.createJoint(new RevoluteJoint({}, prevBody, body, anchor));

  if (i * 2 === COUNT) {
    middle = body;
  }
  prevBody = body;
}

var anchor = new Vec2(-15.0 + 1.0 * COUNT, 5.0);
world.createJoint(new RevoluteJoint({}, prevBody, ground, anchor));

for (var i = 0; i < 2; ++i) {
  var body = world.createDynamicBody(new Vec2(-8.0 + 8.0 * i, 12.0));

  var vertices = [new Vec2(-0.5, 0.0), new Vec2(0.5, 0.0), new Vec2(0.0, 1.5)];
  body.createFixture(new Polygon(vertices), 1.0);
}

var shape = new Circle(0.5);
for (var i = 0; i < 3; ++i) {
  var body = world.createDynamicBody(new Vec2(-6.0 + 6.0 * i, 10.0));
  body.createFixture(shape, 1.0);
}
