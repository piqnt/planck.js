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

import planck from "../src/main";

const { Vec2, World, Circle, Box, PulleyJoint, Testbed } = planck;

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const y = 16.0;
const L = 12.0;
const a = 1.0;
const b = 2.0;

const ground = world.createBody();

// ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

ground.createFixture(new Circle(new Vec2(-10.0, y + b + L), 2.0), 0.0);
ground.createFixture(new Circle(new Vec2(10.0, y + b + L), 2.0), 0.0);

const shape = new Box(a, b);

// bd.fixedRotation = true;
const box1 = world.createDynamicBody(new Vec2(-10.0, y));
box1.createFixture(shape, 5.0);

const box2 = world.createDynamicBody(new Vec2(10.0, y));
box2.createFixture(shape, 5.0);

const anchor1 = new Vec2(-10.0, y + b);
const anchor2 = new Vec2(10.0, y + b);
const groundAnchor1 = new Vec2(-10.0, y + b + L);
const groundAnchor2 = new Vec2(10.0, y + b + L);

const joint1 = world.createJoint(
  new PulleyJoint(
    {},
    box1,
    box2,
    groundAnchor1,
    groundAnchor2,
    anchor1,
    anchor2,
    1.5
  )
);

testbed.step = function () {
  const ratio = joint1.getRatio();
  const L = joint1.getCurrentLengthA() + ratio * joint1.getCurrentLengthB();
  testbed.status("ratio", ratio);
  testbed.status("L (L1 * ratio + L2)", L);
};
