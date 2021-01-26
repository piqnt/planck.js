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

planck.testbed('Rope', function(testbed) {

  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  testbed.info('Not implemented!');
  return world;

  var /* Rope */rope;
  var /* float32 */angle;

  var N = 40;
  var vertices = [];
  var masses = [];

  for (var i = 0; i < N; ++i) {
    vertices[i].set(0.0, 20.0 - 0.25 * i);
    masses[i] = 1.0;
  }
  masses[0] = 0.0;
  masses[1] = 0.0;

  var def = {};
  def.vertices = vertices;
  def.count = N;
  def.gravity.set(0.0, -10.0);
  def.masses = masses;
  def.damping = 0.1;
  def.k2 = 1.0;
  def.k3 = 0.5;

  rope.initialize(def);

  angle = 0.0;
  rope.setAngle(angle);

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'Z':
      angle = Math.max(-Math.PI, angle - 0.05 * Math.PI);
      rope.setAngle(angle);
      break;

    case 'X':
      angle = Math.min(Math.PI, angle + 0.05 * Math.PI);
      rope.setAngle(angle);
      break;
    }
  };

  testbed.step = function(settings) {
    var dt = settings.hz > 0.0 ? 1.0 / settings.hz : 0.0;

    if (settings.pause == 1 && settings.singleStep == 0) {
      dt = 0.0;
    }

    rope.step(dt, 1);

    testbed.status('Target angle', (angle * 180.0 / Math.PI) + degrees );
  };
  testbed.info("Z/X to adjust target angle");

  return world;
});
