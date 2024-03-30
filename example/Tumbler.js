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

const { World, Vec2, Box, RevoluteJoint, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let COUNT = 200;

let ground = world.createBody();

let container = world.createDynamicBody({
  allowSleep: false,
  position: new Vec2(0, 10)
});

container.createFixture(new Box(0.5, 20, new Vec2(20, 0), 0), 5);
container.createFixture(new Box(0.5, 20, new Vec2(-20, 0), 0), 5);
container.createFixture(new Box(20, 0.5, new Vec2(0, 20), 0), 5);
container.createFixture(new Box(20, 0.5, new Vec2(0, -20), 0), 5);

world.createJoint(new RevoluteJoint({
  motorSpeed: 0.08 * Math.PI,
  maxMotorTorque: 1e8,
  enableMotor: true,
}, ground, container, new Vec2(0, 10)));

let shape = new Box(0.5, 0.5);
let count = 0;
while (count < COUNT) {
  let body = world.createDynamicBody();
  body.setPosition(new Vec2(Math.random() * 20 - 10, 10 + Math.random() * 20 - 10));
  body.createFixture(shape, 1);
  ++count;
}
