/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2008-2009 Erin Catto  http://www.box2d.org
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

planck.testbed('ShapeEditing', function(testbed) {
  testbed.info('C: Create a shape, X: Destroy a shape, Z: Sensor');

  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var m_sensor = true;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var m_body = world.createDynamicBody(Vec2(0.0, 10.0));

  var m_fixture1 = m_body.createFixture(pl.Box(4.0, 4.0, Vec2(0.0, 0.0), 0.0), 10.0);
  var m_fixture2 = null;


  testbed.keydown = function(code, char) {
    switch (char) {
    case 'C':
      if (m_fixture2 == null) {
        var shape = pl.Circle(Vec2(0.5, -4.0), 3.0);
        m_fixture2 = m_body.createFixture(shape, 10.0);
        m_body.setAwake(true);
        m_fixture2.setSensor(m_sensor);
      }
      break;

    case 'X':
      if (m_fixture2 != null) {
        m_body.destroyFixture(m_fixture2);
        m_fixture2 = null;
        m_body.setAwake(true);
      }
      break;

    case 'Z':
      if (m_fixture2 != null) {
        m_sensor = !m_sensor;
        m_fixture2.setSensor(m_sensor);
      }
      break;
    }

    updateStatus();
  };

  function updateStatus() {
    testbed.status('Sensor', m_sensor);
  }

  updateStatus();

  return world;
});
