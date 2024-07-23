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

// This stress tests the dynamic tree broad-phase. This also shows that tile
// based collision is _not_ smooth due to Box2D not knowing about adjacency.
import planck from "../src/main";

const { World, Vec2, Box, Testbed } = planck;

const world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

const COUNT = 20;

let fixtureCount = 0;

{
  const a = 0.5;
  const ground = world.createBody(new Vec2(0, -a));
  /// NEED TO CHECK
  if (true) {
    const N = 200;
    const M = 10;
    const position = new Vec2();
    position.y = 0.0;
    for (let j = 0; j < M; ++j) {
      position.x = -N * a;
      for (let i = 0; i < N; ++i) {
        ground.createFixture(new Box(a, a, position, 0.0), 0.0);
        ++fixtureCount;
        position.x += 2.0 * a;
      }
      position.y -= 2.0 * a;
    }
  } else {
    const N = 200;
    const M = 10;
    const position = new Vec2();
    position.x = -N * a;
    for (let i = 0; i < N; ++i) {
      position.y = 0.0;
      for (let j = 0; j < M; ++j) {
        ground.createFixture(new Box(a, a, position, 0.0), 0.0);
        position.y -= 2.0 * a;
      }
      position.x += 2.0 * a;
    }
  }
}
{
  const a = 0.5;
  const shape = new Box(a, a);

  const x = new Vec2(-7.0, 0.75);
  const y = new Vec2();
  const deltaX = new Vec2(0.5625, 1.25);
  const deltaY = new Vec2(1.125, 0.0);

  for (let i = 0; i < COUNT; ++i) {
    y.set(x);

    for (let j = i; j < COUNT; ++j) {
      // bd.allowSleep = !(i == 0 && j == 0)

      const body = world.createDynamicBody(y);
      body.createFixture(shape, 5.0);
      ++fixtureCount;
      y.add(deltaY);
    }

    x.add(deltaX);
  }
}
const createTime = Date.now();

testbed.step = function () {
  const height = world.getTreeHeight();
  const leafCount = world.getProxyCount();
  const minimumNodeCount = 2 * leafCount - 1;
  const minimumHeight = Math.ceil(Math.log(minimumNodeCount) / Math.log(2.0));

  testbed.status("dynamic tree height", height);
  testbed.status("min", minimumHeight);
  testbed.status("create time", createTime + "ms");
  testbed.status("fixture count", fixtureCount);

  // const tree = world.m_broadPhase.m_tree;
  // if (stepCount++ == 400) {
  // tree.rebuildBottomUp();
  // }
};
