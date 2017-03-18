/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

// This tests distance joints, body destruction, and joint destruction.
planck.testbed('Web', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var bodies = [];
  var joints = [];

  var shape = pl.Box(0.5, 0.5);

  var bd = {};
  bd.type = 'dynamic';

  bd.position = Vec2(-5.0, 5.0);
  bodies[0] = world.createBody(bd);
  bodies[0].createFixture(shape, 5.0);

  bd.position = Vec2(5.0, 5.0);
  bodies[1] = world.createBody(bd);
  bodies[1].createFixture(shape, 5.0);

  bd.position = Vec2(5.0, 15.0);
  bodies[2] = world.createBody(bd);
  bodies[2].createFixture(shape, 5.0);

  bd.position = Vec2(-5.0, 15.0);
  bodies[3] = world.createBody(bd);
  bodies[3].createFixture(shape, 5.0);

  var jd = {};
  jd.frequencyHz = 2.0;
  jd.dampingRatio = 0.0;

  world.createJoint(joints[0] = pl.DistanceJoint(jd,
    ground, Vec2(-10.0, 0.0),
    bodies[0], bodies[0].getWorldPoint(Vec2(-0.5, -0.5))
  ));

  world.createJoint(joints[1] = pl.DistanceJoint(jd,
    ground, Vec2(10.0, 0.0),
    bodies[1], bodies[1].getWorldPoint(Vec2(0.5, -0.5))
  ));

  world.createJoint(joints[2] = pl.DistanceJoint(jd,
    ground, Vec2(10.0, 20.0),
    bodies[2], bodies[2].getWorldPoint(Vec2(0.5, 0.5))
  ));

  world.createJoint(joints[3] = pl.DistanceJoint(jd,
    ground, Vec2(-10.0, 20.0),
    bodies[3], bodies[3].getWorldPoint(Vec2(-0.5, 0.5))
  ));

  world.createJoint(joints[4] = pl.DistanceJoint(jd,
    bodies[0], bodies[0].getWorldPoint(Vec2(0.5, 0.0)),
    bodies[1], bodies[1].getWorldPoint(Vec2(-0.5, 0.0))
  ));

  world.createJoint(joints[5] = pl.DistanceJoint(jd,
    bodies[1], bodies[1].getWorldPoint(Vec2(0.0, 0.5)),
    bodies[2], bodies[2].getWorldPoint(Vec2(0.0, -0.5))
  ));

  world.createJoint(joints[6] = pl.DistanceJoint(jd,
    bodies[2], bodies[2].getWorldPoint(Vec2(-0.5, 0.0)),
    bodies[3], bodies[3].getWorldPoint(Vec2(0.5, 0.0))
  ));

  world.createJoint(joints[7] = pl.DistanceJoint(jd,
    bodies[3], bodies[3].getWorldPoint(Vec2(0.0, -0.5)),
    bodies[0], bodies[0].getWorldPoint(Vec2(0.0, 0.5))
  ));

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'X':
      for (var i = 0; i < 4; ++i) {
        if (bodies[i]) {
          world.destroyBody(bodies[i]);
          bodies[i] = null;
          break;
        }
      }
      break;

    case 'Z':
      for (var i = 0; i < 8; ++i) {
        if (joints[i]) {
          world.destroyJoint(joints[i]);
          joints[i] = null;
          break;
        }
      }
      break;
    }
  };

  testbed.info('This demonstrates a soft distance joint.\nX: Delete a body, Z: Delete a joint');

  function JointDestroyed(joint) {
    for (var i = 0; i < 8; ++i) {
      if (joints[i] == joint) {
        joints[i] = null;
        break;
      }
    }
  }

  // TODO: BBJJJJ -> Error

  return world;
});
