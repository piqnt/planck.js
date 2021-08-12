/*
* Copyright (c) 2013 Google, Inc.
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

// TODO export enums
const b2_rigidParticleGroup = 1 << 1;
const b2_solidParticleGroup = 1 << 0;

planck.testbed('RigidPaticles', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = new pl.World({
    gravity: Vec2(0, -10),
  });

  var ground = world.createBody();

  {
    const shape = pl.Polygon([
      Vec2(-4, -1),
      Vec2(4, -1),
      Vec2(4, 0),
      Vec2(-4, 0)
    ]);
    ground.createFixture(shape, 0.0);
  }

  {
    const shape = pl.Polygon([
      Vec2(-4, -0.1),
      Vec2(-2, -0.1),
      Vec2(-2, 2),
      Vec2(-4, 2)
    ]);
    ground.createFixture(shape, 0.0);
  }

  {
    const shape = pl.Polygon([
      Vec2(2, -0.1),
      Vec2(4, -0.1),
      Vec2(4, 2),
      Vec2(2, 2)
    ]);
    ground.createFixture(shape, 0.0);
  }

  var particleSystem = world.createParticleSystem({
    radius: 0.035,
  });

  particleSystem.createParticleGroup({
    groupFlags: b2_rigidParticleGroup | b2_solidParticleGroup,
    shape: pl.Circle(Vec2(0, 3), 0.5)
    // color: (255, 0, 0, 255) // TODO
  });

  particleSystem.createParticleGroup({
    groupFlags: b2_rigidParticleGroup | b2_solidParticleGroup,
    shape: pl.Circle(Vec2(-1, 3), 0.5)
    // color: (0, 255, 0, 255); // TODO
  });

  {
    particleSystem.createParticleGroup({
      groupFlags: b2_rigidParticleGroup | b2_solidParticleGroup,
      position: Vec2(1, 4),
      angle: -0.5,
      angularVelocity: 2.0,
      shape: pl.Box(1, 0.5)
      // color: (0, 0, 255, 255); // TODO
    });
  }

  {
    const body = world.createDynamicBody();
    const shape = pl.Circle(Vec2(0,8), 0.5);
    body.createFixture(shape, 0.5);
  }

	testbed.x = 0;
  testbed.y = 0;
  testbed.width = 10;
  testbed.height = 10;

  return world;
});
