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

const { World, Vec2, Edge, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

world.createBody().createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)));

world.createBody(new Vec2(-4.0, 22.0), -0.25).createFixture(new Box(13.0, 0.25), 0.0);

world.createBody(new Vec2(10.5, 19.0)).createFixture(new Box(0.25, 1.0), 0.0);

world.createBody(new Vec2(4.0, 14.0), 0.25).createFixture(new Box(13.0, 0.25), 0.0);

world.createBody(new Vec2(-10.5, 11.0)).createFixture(new Box(0.25, 1.0), 0.0);

world.createBody(new Vec2(-4.0, 6.0), -0.25).createFixture(new Box(13.0, 0.25), 0.0);

const friction = [ 0.75, 0.5, 0.35, 0.1, 0.0 ];

const circle = new Box(0.5, 0.5);

for (let i = 0; i < friction.length; ++i) {
  const ball = world.createDynamicBody(new Vec2(-15.0 + 4.0 * i, 28.0));
  ball.createFixture(circle, {
    density: 25.0,
    friction: friction[i]
  });
}
