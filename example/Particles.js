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

planck.testbed('Particles', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = new pl.World({
    gravity: new Vec2(0, -10),
  });

  var ground = world.createBody();

  {
    const shape = new pl.Polygon([
      new Vec2(-4, -1),
      new Vec2(4, -1),
      new Vec2(4, 0),
      new Vec2(-4, 0)
    ]);
    ground.createFixture(shape, 0.0);
  }

  {
    const shape = new pl.Polygon([
      new Vec2(-4, -0.1),
      new Vec2(-2, -0.1),
      new Vec2(-2, 2),
      new Vec2(-4, 3)
    ]);
    ground.createFixture(shape, 0.0);
  }

  {
    const shape = new pl.Polygon([
      new Vec2(2, -0.1),
      new Vec2(4, -0.1),
      new Vec2(4, 3),
      new Vec2(2, 2)
    ]);
    ground.createFixture(shape, 0.0);
  }

  var particleType = 0; // TestMain::GetParticleParameterValue(); // TODO
  var particleSystem = world.createParticleSystem({
    radius: 0.025,
    dampingStrength: 0.2,
  });

  const group = particleSystem.createParticleGroup({
    flags: particleType,
    shape: new pl.Circle(new Vec2(0, 3), 2)
  });
  // if (pd.flags & b2_colorMixingParticle) {
  //    ColorParticleGroup(group, 0); // TODO
  // }

  {
    const body = world.createDynamicBody();
    const shape = new pl.Circle(new Vec2(0, 8), 0.5);
    body.createFixture(shape, 0.5);
  }

  testbed.x = 0;
  testbed.y = 0;
  testbed.width = 10;
  testbed.height = 10;
  testbed.ratio = 64;

  return world;
});