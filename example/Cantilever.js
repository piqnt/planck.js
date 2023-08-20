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

// It is difficult to make a cantilever made of links completely rigid with weld joints.
// You will have to use a high number of iterations to make them stiff.
// So why not go ahead and use soft weld joints? They behave like a revolute
// joint with a rotational spring.

const { World, Vec2, Edge, Box, WeldJoint, Polygon, Circle, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let COUNT = 8;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    const body = world.createDynamicBody(new Vec2(-14.5 + 1.0 * i, 5.0));
    body.createFixture(new Box(0.5, 0.125), 20.0);

    const anchor = new Vec2(-15.0 + 1.0 * i, 5.0);
    world.createJoint(new WeldJoint({}, prevBody, body, anchor));

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < 3; ++i) {
    let body = world.createDynamicBody(new Vec2(-14.0 + 2.0 * i, 15.0));
    body.createFixture(new Box(1.0, 0.125), 20.0);

    let anchor = new Vec2(-15.0 + 2.0 * i, 15.0);
    world.createJoint(new WeldJoint({
      frequencyHz: 5.0,
      dampingRatio: 0.7,
    }, prevBody, body, anchor));

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    let body = world.createDynamicBody(new Vec2(-4.5 + 1.0 * i, 5.0));
    body.createFixture(new Box(0.5, 0.125), 20.0);

    if (i > 0) {
      let anchor = new Vec2(-5.0 + 1.0 * i, 5.0);
      world.createJoint(new WeldJoint({}, prevBody, body, anchor));
    }

    prevBody = body;
  }
}
{
  let prevBody = ground;
  for (let i = 0; i < COUNT; ++i) {
    let body = world.createDynamicBody(new Vec2(5.5 + 1.0 * i, 10.0));
    body.createFixture(new Box(0.5, 0.125), 20.0);

    if (i > 0) {
      let anchor = new Vec2(5.0 + 1.0 * i, 10.0);
      world.createJoint(new WeldJoint({
        frequencyHz: 8.0,
        dampingRatio: 0.7,
      }, prevBody, body, anchor));
    }

    prevBody = body;
  }
}
{
  for (let i = 0; i < 2; ++i) {
    let vertices = [];
    vertices[0] = new Vec2(-0.5, 0.0);
    vertices[1] = new Vec2(0.5, 0.0);
    vertices[2] = new Vec2(0.0, 1.5);

    let body = world.createDynamicBody(new Vec2(-8.0 + 8.0 * i, 12.0));
    body.createFixture(new Polygon(vertices), 1.0);
  }

  for (let i = 0; i < 2; ++i) {
    let body = world.createDynamicBody(new Vec2(-6.0 + 6.0 * i, 10.0));
    body.createFixture(new Circle(0.5), 1.0);
  }
}