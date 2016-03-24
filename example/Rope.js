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

planck.play('Rope', function(pl) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  {
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

    function Keyboard(key) {
      switch (key) {
      case 'q':
        m_angle = Max(-Math.PI, m_angle - 0.05 * Math.PI);
        m_rope.setAngle(m_angle);
        break;

      case 'e':
        m_angle = Min(Math.PI, m_angle + 0.05 * Math.PI);
        m_rope.setAngle(m_angle);
        break;
      }
    }

    function Step(settings) {
      var /* float32 */dt = settings.hz > 0.0 ? 1.0 / settings.hz : 0.0;

      if (settings.pause == 1 && settings.singleStep == 0) {
        dt = 0.0;
      }

      m_rope.step(dt, 1);

      Test.step(settings);

      m_rope.Draw(m_debugDraw);

      m_debugDraw.DrawString(5, m_textLine,
          "Press (q,e) to adjust target angle");
      m_textLine += DRAW_STRING_NEW_LINE;
      m_debugDraw.DrawString(5, m_textLine, "Target angle = %g degrees",
          m_angle * 180.0 / Math.PI);
      m_textLine += DRAW_STRING_NEW_LINE;
    }

    var /* Rope */m_rope;
    var /* float32 */m_angle;

    return world;
  }
});
