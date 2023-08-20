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

const { Vec2, World, Circle, Box, Math, Testbed } = planck;

let world = new World(new Vec2(0, 0));

const testbed = Testbed.mount();
testbed.y = 0;
testbed.hz = 60;
testbed.speed = 1;
testbed.start(world);

let circle = new Circle(0.1);

for (let i = 0; i < 50; ++i) {
  let b = world.createBody({
    type : 'dynamic',
    position : new Vec2(Math.random() * -6, Math.random() * 2 - 1),
  });
  b.createFixture(circle, 0.01);
}

let box = world.createBody({
  type : 'dynamic',
  position : new Vec2(-40.0, 0.0),
  bullet : true
});

box.createFixture(new Box(1.5, 1.5), 1.0);
box.setLinearVelocity(new Vec2(100.0, 0.0));
