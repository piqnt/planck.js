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

// This tests distance joints, body destruction, and joint destruction.

const { World, Vec2, Box, DistanceJoint, Testbed } = planck;

const world = new World();

const testbed = Testbed.mount();
testbed.start(world);

let ground = world.createBody();

const bodies = [];
let joints = [];

const box = new Box(0.5, 0.5);

bodies[0] = world.createDynamicBody(new Vec2(-5.0, 5.0));
bodies[0].createFixture(box, 5.0);

bodies[1] = world.createDynamicBody(new Vec2(5.0, 5.0));
bodies[1].createFixture(box, 5.0);

bodies[2] = world.createDynamicBody(new Vec2(5.0, 15.0));
bodies[2].createFixture(box, 5.0);

bodies[3] = world.createDynamicBody(new Vec2(-5.0, 15.0));
bodies[3].createFixture(box, 5.0);

const jd = {
  frequencyHz: 2.0,
  dampingRatio: 0.0  
};

world.createJoint(joints[0] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: new Vec2(-10.0, 0.0),
  bodyB: bodies[0],
  localAnchorB: new Vec2(-0.5, -0.5)
}));

world.createJoint(joints[1] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: new Vec2(10.0, 0.0),
  bodyB: bodies[1],
  localAnchorB: new Vec2(0.5, -0.5)
}));

world.createJoint(joints[2] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: new Vec2(10.0, 20.0),
  bodyB: bodies[2],
  localAnchorB: new Vec2(0.5, 0.5)
}));

world.createJoint(joints[3] = new DistanceJoint({
  ...jd,
  bodyA: ground,
  localAnchorA: new Vec2(-10.0, 20.0),
  bodyB: bodies[3],
  localAnchorB: new Vec2(-0.5, 0.5)
}));

world.createJoint(joints[4] = new DistanceJoint({
  ...jd,
  bodyA: bodies[0],
  localAnchorA: new Vec2(0.5, 0.0),
  bodyB: bodies[1],
  localAnchorB: new Vec2(-0.5, 0.0)
}));

world.createJoint(joints[5] = new DistanceJoint({
  ...jd,
  bodyA: bodies[1],
  localAnchorA: new Vec2(0.0, 0.5),
  bodyB: bodies[2],
  localAnchorB: new Vec2(0.0, -0.5)
}));

world.createJoint(joints[6] = new DistanceJoint({
  ...jd,
  bodyA: bodies[2],
  localAnchorA: new Vec2(-0.5, 0.0),
  bodyB: bodies[3],
  localAnchorB: new Vec2(0.5, 0.0)
}));

world.createJoint(joints[7] = new DistanceJoint({
  ...jd,
  bodyA: bodies[3],
  localAnchorA: new Vec2(0.0, -0.5),
  bodyB: bodies[0],
  localAnchorB: new Vec2(0.0, 0.5)
}));

testbed.keydown = function(code, char) {
  switch (char) {
  case 'X':
    if (bodies.length) {
      world.destroyBody(bodies.pop());
    }
    break;

  case 'Z':
    if (joints.length) {
      world.destroyJoint(joints.pop());
    }
    break;
  }
};

testbed.info('This demonstrates a soft distance joint.\nX: Delete a body, Z: Delete a joint');

world.on('remove-joint', function(joint) {
  for (let i = 0; i < 8; ++i) {
    joints = joints.filter(function(j) {
      return j !== joint;
    });
  }
});
