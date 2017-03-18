/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2011      Erin Catto  http://www.box2d.org
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

planck.testbed('Rope', function(testbed) {

  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  testbed.info('Not implemented!');
  return world;

  var /* Rope */m_rope;
  var /* float32 */m_angle;

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

  m_rope.initialize(def);

  m_angle = 0.0;
  m_rope.setAngle(m_angle);

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'Z':
      m_angle = Math.max(-Math.PI, m_angle - 0.05 * Math.PI);
      m_rope.setAngle(m_angle);
      break;

    case 'X':
      m_angle = Math.min(Math.PI, m_angle + 0.05 * Math.PI);
      m_rope.setAngle(m_angle);
      break;
    }
  };

  testbed.step = function(settings) {
    var dt = settings.hz > 0.0 ? 1.0 / settings.hz : 0.0;

    if (settings.pause == 1 && settings.singleStep == 0) {
      dt = 0.0;
    }

    m_rope.step(dt, 1);

    testbed.status('Target angle', (m_angle * 180.0 / Math.PI) + degrees );
  };
  testbed.info("Z/X to adjust target angle");

  return world;
});
