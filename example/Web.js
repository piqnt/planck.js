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
planck.testbed('Web', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var bodies = [];
  var joints = [];

  var box = pl.Box(0.5, 0.5);

  bodies[0] = world.createDynamicBody(Vec2(-5.0, 5.0));
  bodies[0].createFixture(box, 5.0);

  bodies[1] = world.createDynamicBody(Vec2(5.0, 5.0));
  bodies[1].createFixture(box, 5.0);

  bodies[2] = world.createDynamicBody(Vec2(5.0, 15.0));
  bodies[2].createFixture(box, 5.0);

  bodies[3] = world.createDynamicBody(Vec2(-5.0, 15.0));
  bodies[3].createFixture(box, 5.0);

  var jd = {};
  jd.frequencyHz = 2.0;
  jd.dampingRatio = 0.0;

  world.createJoint(joints[0] = pl.DistanceJoint({
    bodyA: ground,
    localAnchorA: Vec2(-10.0, 0.0),
    bodyB: bodies[0],
    localAnchorB: Vec2(-0.5, -0.5)
  }));

  world.createJoint(joints[1] = pl.DistanceJoint({
    bodyA: ground,
    localAnchorA: Vec2(10.0, 0.0),
    bodyB: bodies[1],
    localAnchorB: Vec2(0.5, -0.5)
  }));

  world.createJoint(joints[2] = pl.DistanceJoint({
    bodyA: ground,
    localAnchorA: Vec2(10.0, 20.0),
    bodyB: bodies[2],
    localAnchorB: Vec2(0.5, 0.5)
  }));

  world.createJoint(joints[3] = pl.DistanceJoint({
    bodyA: ground,
    localAnchorA: Vec2(-10.0, 20.0),
    bodyB: bodies[3],
    localAnchorB: Vec2(-0.5, 0.5)
  }));

  world.createJoint(joints[4] = pl.DistanceJoint({
    bodyA: bodies[0],
    localAnchorA: Vec2(0.5, 0.0),
    bodyB: bodies[1],
    localAnchorB: Vec2(-0.5, 0.0)
  }));

  world.createJoint(joints[5] = pl.DistanceJoint({
    bodyA: bodies[1],
    localAnchorA: Vec2(0.0, 0.5),
    bodyB: bodies[2],
    localAnchorB: Vec2(0.0, -0.5)
  }));

  world.createJoint(joints[6] = pl.DistanceJoint({
    bodyA: bodies[2],
    localAnchorA: Vec2(-0.5, 0.0),
    bodyB: bodies[3],
    localAnchorB: Vec2(0.5, 0.0)
  }));

  world.createJoint(joints[7] = pl.DistanceJoint({
    bodyA: bodies[3],
    localAnchorA: Vec2(0.0, -0.5),
    bodyB: bodies[0],
    localAnchorB: Vec2(0.0, 0.5)
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
    for (var i = 0; i < 8; ++i) {
      joints = joints.filter(function(j) {
        return j !== joint;
      });
    }
  });

  return world;
});
