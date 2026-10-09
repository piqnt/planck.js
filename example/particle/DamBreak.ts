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

import { World, Vec2, Chain, Box, Testbed } from "planck";

const testbed = Testbed.mount();

var world = new World({
  gravity: new Vec2(0, -10),
});

testbed.x = 0;
testbed.y = 0;
testbed.width = 10;
testbed.height = 10;
testbed.ratio = 64;
testbed.start(world);

var ground = world.createBody();
var shape = new Chain([
  new Vec2(-2, 0),
  new Vec2(2, 0),
  new Vec2(2, 4),
  new Vec2(-2, 4)
], true);
ground.createFixture(shape, 0);
var particleSystem = world.createParticleSystem({
  radius: 0.025,
  dampingStrength: 0.2,
});
var group = particleSystem.createParticleGroup({
  // flags: TestMain::GetParticleParameterValue(), // TODO
  shape: new Box(0.8, 1.0, new Vec2(-1.2, 1.01), 0)
})
// if (pd.flags & b2_colorMixingParticle) { // TODO
// 	ColorParticleGroup(group, 0);
// }
