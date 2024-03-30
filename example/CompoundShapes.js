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

// TODO_ERIN test joints on compounds.
const { World, Vec2, Transform, Math, Edge, Circle, Polygon, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

world.createBody(new Vec2(0.0, 0.0)).createFixture(new Edge(new Vec2(50.0, 0.0), new Vec2(-50.0, 0.0)), 0.0);

let circle1 = new Circle(new Vec2(-0.5, 0.5), 0.5);
let circle2 = new Circle(new Vec2(0.5, 0.5), 0.5);

for (let i = 0; i < 10; ++i) {
  let body = world.createDynamicBody({
    position : new Vec2(Math.random(-0.1, 0.1) + 5.0, 1.05 + 2.5 * i),
    angle : Math.random(-Math.PI, Math.PI)
  });
  body.createFixture(circle1, 2.0);
  body.createFixture(circle2, 0.0);
}

let polygon1 = new Box(0.25, 0.5);
let polygon2 = new Box(0.25, 0.5, new Vec2(0.0, -0.5), 0.5 * Math.PI);

for (let i = 0; i < 10; ++i) {
  let body = world.createDynamicBody({
    position : new Vec2(Math.random(-0.1, 0.1) - 5.0, 1.05 + 2.5 * i),
    angle : Math.random(-Math.PI, Math.PI)
  });
  body.createFixture(polygon1, 2.0);
  body.createFixture(polygon2, 2.0);
}

const xf1 = new Transform();
xf1.q.set(0.3524 * Math.PI);
xf1.p.set(xf1.q.getXAxis());

let triangle1 = new Polygon([
  new Vec2(-1.0, 0.0),
  new Vec2(1.0, 0.0),
  new Vec2(0.0, 0.5)
].map(v => Transform.mul(xf1, v)));

const xf2 = new Transform();
xf2.q.set(-0.3524 * Math.PI);
xf2.p.set(Vec2.neg(xf2.q.getXAxis()));

let triangle2 = new Polygon([
  new Vec2(-1.0, 0.0),
  new Vec2(1.0, 0.0),
  new Vec2(0.0, 0.5)
].map(v => Transform.mul(xf2, v)));

for (let i = 0; i < 10; ++i) {
  let body = world.createDynamicBody({
    position : new Vec2(Math.random(-0.1, 0.1), 2.05 + 2.5 * i),
    angle : 0.0
  });
  body.createFixture(triangle1, 2.0);
  body.createFixture(triangle2, 2.0);
}

let bottom = new Box(1.5, 0.15);
let left = new Box(0.15, 2.7, new Vec2(-1.45, 2.35), 0.2);
let right = new Box(0.15, 2.7, new Vec2(1.45, 2.35), -0.2);

let container = world.createBody(new Vec2(0.0, 2.0));
container.createFixture(bottom, 4.0);
container.createFixture(left, 4.0);
container.createFixture(right, 4.0);
