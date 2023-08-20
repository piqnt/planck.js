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

const { World, Vec2, Edge, Circle, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.info('C: Create a shape, X: Destroy a shape, Z: Sensor');
testbed.start(world);

let sensor = true;

let ground = world.createBody();
ground.createFixture(new Edge(new Vec2(-40.0, 0.0), new Vec2(40.0, 0.0)), 0.0);

let body = world.createDynamicBody(new Vec2(0.0, 10.0));

let fixture1 = body.createFixture(new Box(4.0, 4.0, new Vec2(0.0, 0.0), 0.0), 10.0);
let fixture2 = null;

testbed.keydown = function(code, char) {
  switch (char) {
  case 'C':
    if (fixture2 == null) {
      let shape = new Circle(new Vec2(0.5, -4.0), 3.0);
      fixture2 = body.createFixture(shape, 10.0);
      body.setAwake(true);
      fixture2.setSensor(sensor);
    }
    break;

  case 'X':
    if (fixture2 != null) {
      body.destroyFixture(fixture2);
      fixture2 = null;
      body.setAwake(true);
    }
    break;

  case 'Z':
    if (fixture2 != null) {
      sensor = !sensor;
      fixture2.setSensor(sensor);
    }
    break;
  }

  updateStatus();
};

function updateStatus() {
  testbed.status('Sensor', sensor);
}

updateStatus();
