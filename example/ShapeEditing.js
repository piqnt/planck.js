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

planck.play('ShapeEditing', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));
  
  {
    var /* BodyDef */bd;
    var /* Body */ground = world.createBody(bd);

    var /* EdgeShape */shape;
    shape.set(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));
    ground.createFixture(shape, 0.0);
  }

  var /* BodyDef */bd;
  bd.type = 'dynamic';
  bd.position.set(0.0, 10.0);
  m_body = world.createBody(bd);

  var /* PolygonShape */shape;
  shape.setAsBox(4.0, 4.0, Vec2(0.0, 0.0), 0.0);
  m_fixture1 = m_body.createFixture(shape, 10.0);

  m_fixture2 = null;

  m_sensor = false;

  function Keyboard( /* int */key) {
    switch (key) {
    case GLFW_KEY_C:
      if (m_fixture2 == null) {
        var /* CircleShape */shape;
        shape.m_radius = 3.0;
        shape.m_p.set(0.5, -4.0);
        m_fixture2 = m_body.createFixture(shape, 10.0);
        m_body.setAwake(true);
      }
      break;

    case GLFW_KEY_D:
      if (m_fixture2 != null) {
        m_body.destroyFixture(m_fixture2);
        m_fixture2 = null;
        m_body.setAwake(true);
      }
      break;

    case GLFW_KEY_S:
      if (m_fixture2 != null) {
        m_sensor = !m_sensor;
        m_fixture2.setSensor(m_sensor);
      }
      break;
    }
  }

  function Step(settings) {
    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine,
        "Press: (c) create a shape, (d) destroy a shape.");
    m_textLine += DRAW_STRING_NEW_LINE;
    g_debugDraw.DrawString(5, m_textLine, "sensor = %d", m_sensor);
    m_textLine += DRAW_STRING_NEW_LINE;
  }

  var /* Body */m_body;
  var /* Fixture */m_fixture1;
  var /* Fixture */m_fixture2;
  var /* bool */m_sensor;

  return world;
});
