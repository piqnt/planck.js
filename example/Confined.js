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

const { World, Vec2, Edge, Circle, Testbed } = planck;

let world = new World();

const testbed = Testbed.mount();
testbed.start(world);

let e_columnCount = 0;
let e_rowCount = 0;
let ground = world.createBody();

// Floor
ground.createFixture(new Edge(new Vec2(-10, 0), new Vec2(10, 0)), 0);

// Left wall
ground.createFixture(new Edge(new Vec2(-10, 0), new Vec2(-10, 20)), 0);

// Right wall
ground.createFixture(new Edge(new Vec2(10, 0), new Vec2(10, 20)), 0);

// Roof
ground.createFixture(new Edge(new Vec2(-10, 20), new Vec2(10, 20)), 0);

let radius = 0.5;
let shape = new Circle(radius);

let fd = {
  density : 1.0,
  friction : 0.1
};

for (let j = 0; j < e_columnCount; ++j) {
  for (let i = 0; i < e_rowCount; ++i) {
    let body = world.createDynamicBody(new Vec2(-10 + (2.1 * j + 1 + 0.01 * i) * radius, (2 * i + 1) * radius));
    body.createFixture(shape, fd);
  }
}

function CreateCircle() {
  let body = world.createDynamicBody(new Vec2(Math.random() * 10 - 5, Math.random() * 10 + 5));
  // bd.allowSleep = false;
  body.createFixture(new Circle(Math.random() * 2.5 + 0.5), {
    density : 1.0,
    friction : 0.0
  });
}

testbed.keydown = function(code, char) {
  if (testbed.activeKeys.fire) {
    CreateCircle();
  }
};

let stepCount = 0;
testbed.step = function() {
  let sleeping = true;
  for (let b = world.getBodyList(); b; b = b.getNext()) {
    if (b.isDynamic() && b.isAwake()) {
      sleeping = false;
    }
  }

  // ?
  // if (stepCount++ == 180) {
  //   stepCount += 0;
  // }

  if (sleeping) {
    CreateCircle();
  }

  // for (let b = world.getBodyList(); b; b = b.getNext()) {
  //   if (!b.isDynamic()) {
  //     continue;
  //   }
  //
  //   let p = b.getPosition();
  //   if (p.x <= -10.0 || 10.0 <= p.x || p.y <= 0.0 || 20.0 <= p.y) {
  //     // why?
  //     p.x += 0.0;
  //   }
  // }
};
