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
  
  {
    var e_unknown, e_above, e_below;
    // Ground
    {
      var /* BodyDef */bd;
      var /* Body */ground = world.createBody(bd);

      var /* EdgeShape */shape;
      shape.set(Vec2(-20.0, 0.0), Vec2(20.0, 0.0));
      ground.createFixture(shape, 0.0);
    }

    // Platform
    {
      var /* BodyDef */bd;
      bd.position.set(0.0, 10.0);
      var /* Body */body = world.createBody(bd);

      var /* PolygonShape */shape;
      shape.setAsBox(3.0, 0.5);
      m_platform = body.createFixture(shape, 0.0);

      m_bottom = 10.0 - 0.5;
      m_top = 10.0 + 0.5;
    }

    // Actor
    {
      var /* BodyDef */bd;
      bd.type = 'dynamic';
      bd.position.set(0.0, 12.0);
      var /* Body */body = world.createBody(bd);

      m_radius = 0.5;
      var /* CircleShape */shape;
      shape.m_radius = m_radius;
      m_character = body.createFixture(shape, 20.0);

      body.setLinearVelocity(Vec2(0.0, -50.0));

      m_state = e_unknown;
    }

    function PreSolve( /* Contact */contact, /* const *//* Manifold */
    oldManifold) {
      Test.preSolve(contact, oldManifold);

      var /* Fixture */fixtureA = contact.getFixtureA();
      var /* Fixture */fixtureB = contact.getFixtureB();

      if (fixtureA != m_platform && fixtureA != m_character) {
        return;
      }

      if (fixtureB != m_platform && fixtureB != m_character) {
        return;
      }

      if (1) {
        var /* Vec2 */position = m_character.getBody().getPosition();

        if (position.y < m_top + m_radius - 3.0 * b2_linearSlop) {
          contact.setEnabled(false);
        }
      } else {
        var /* Vec2 */v = m_character.getBody().getLinearVelocity();
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

    var /* float32 */m_radius, m_top, m_bottom;
    State
    m_state;
    var /* Fixture */m_platform;
    var /* Fixture */m_character;

    return world;
  }
});
