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

planck.testbed('Tumbler', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  testbed.hz = 40;

  var COUNT = 200;

  var ground = world.createBody();

  var container = world.createDynamicBody({
    allowSleep: false,
    position: Vec2(0, 10)
  });

  container.createFixture(pl.Box(0.5, 20, Vec2(20, 0), 0), 5);
  container.createFixture(pl.Box(0.5, 20, Vec2(-20, 0), 0), 5);
  container.createFixture(pl.Box(20, 0.5, Vec2(0, 20), 0), 5);
  container.createFixture(pl.Box(20, 0.5, Vec2(0, -20), 0), 5);

  world.createJoint(pl.RevoluteJoint({
    motorSpeed: 0.08 * Math.PI,
    maxMotorTorque: 1e8,
    enableMotor: true,
  }, ground, container, Vec2(0, 10)));

  var shape = pl.Box(0.5, 0.5);
  var count = 0;
  while (count < COUNT) {
    var body = world.createDynamicBody();
    body.setPosition(Vec2(pl.Math.random(-10, 10), 10 + pl.Math.random(-10, 10)));
    body.createFixture(shape, 1);
    ++count;
  }

  return world;
});
