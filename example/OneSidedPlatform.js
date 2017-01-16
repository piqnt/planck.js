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

planck.play('OneSidedPlatform', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var m_radius = 0.5;
  var m_top = 10.0 + 0.5;
  var m_bottom = 10.0 - 0.5;
  var m_state;
  var m_platform;
  var m_character;

  var e_unknown, e_above, e_below;

  // Ground
  var ground = world.createBody();
  var shape = pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0));
  ground.createFixture(shape, 0.0);

  // Platform
  var body = world.createBody(Vec2(0.0, 10.0));
  m_platform = body.createFixture(pl.Box(3.0, 0.5), 0.0);

  // Actor
  var body = world.createDynamicBody(Vec2(0.0, 12.0));
  m_character = body.createFixture(pl.Circle(m_radius), 20.0);
  body.setLinearVelocity(Vec2(0.0, -50.0));
  m_state = e_unknown;

  function PreSolve(contact, oldManifold) {
    Test.preSolve(contact, oldManifold);

    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    if (fixtureA != m_platform && fixtureA != m_character) {
      return;
    }

    if (fixtureB != m_platform && fixtureB != m_character) {
      return;
    }

    if (1) {
      var position = m_character.getBody().getPosition();

      if (position.y < m_top + m_radius - 3.0 * b2_linearSlop) {
        contact.setEnabled(false);
      }
    } else {
      var v = m_character.getBody().getLinearVelocity();
      if (v.y > 0.0) {
        contact.setEnabled(false);
      }
    }
  }

  function Step(settings) {
    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine,
        "Press: (c) create a shape, (d) destroy a shape.");
    m_textLine += DRAW_STRING_NEW_LINE;

    var /* Vec2 */v = m_character.getBody().getLinearVelocity();
    g_debugDraw.DrawString(5, m_textLine, "Character Linear Velocity: %f",
        v.y);
    m_textLine += DRAW_STRING_NEW_LINE;
  }

  return world;
});
