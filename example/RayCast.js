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

// This test demonstrates how to use the world ray-cast feature.
// NOTE: we are intentionally filtering one of the polygons, therefore
// the ray will always miss one type of polygon.
// This callback finds the closest hit. Polygon 0 is filtered.
function RayCastClosestCallback() { // extends rayCastCallback
  var m_hit = false;
  var /* Vec2 */m_point;
  var /* Vec2 */m_normal;

  function ReportFixture(fixture, /* Vec2& */point, /* Vec2& */normal, fraction) {
    var body = fixture.getBody();
    userData = body.getUserData();
    if (userData) {
      var /* int32 */index = userData;
      if (index == 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and
        // continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    m_hit = true;
    m_povar /* int */ = point;
    m_normal = normal;

    // By returning the current fraction, we instruct the calling code to clip
    // the ray and
    // continue the ray-cast to the next fixture. WARNING: do not assume that
    // fixtures
    // are reported in order. However, by clipping, we can always get the
    // closest fixture.
    return fraction;
  }
}

// This callback finds any hit. Polygon 0 is filtered. For this type of query we
// are usually
// just checking for obstruction, so the actual fixture and hit povar /*int*/
// are irrelevant.
function RayCastAnyCallback() { // extends rayCastCallback
  var m_hit = false;
  var /* Vec2 */m_point;
  var /* Vec2 */m_normal;

  function ReportFixture(fixture, /* Vec2& */point, /* Vec2& */normal, fraction) {
    var body = fixture.getBody();
    userData = body.getUserData();
    if (userData) {
      var /* int32 */index = userData;
      if (index == 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    m_hit = true;
    m_povar /* int */ = point;
    m_normal = normal;

    // At this povar /*int*/ we have a hit, so we know the ray is obstructed.
    // By returning 0, we instruct the calling code to terminate the ray-cast.
    return 0.0;
  }
}

// This ray cast collects multiple hits along the ray. Polygon 0 is filtered.
// The fixtures are not necessary reported in order, so we might not capture
// the closest fixture.
function RayCastMultipleCallback() { // extends rayCastCallback
  var e_maxCount = 3;

  var m_points = []; //Vec2[e_maxCount]
  var m_normals = []; //Vec2[e_maxCount]
  var m_count = 0;

  function ReportFixture(fixture, /* Vec2& */point, /* Vec2& */normal, fraction) {
    var body = fixture.getBody();
    userData = body.getUserData();
    if (userData) {
      var index = userData;
      if (index == 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    Assert(m_count < e_maxCount);

    m_points[m_count] = point;
    m_normals[m_count] = normal;
    ++m_count;

    if (m_count == e_maxCount) {
      // At this povar /*int*/ the buffer is full.
      // By returning 0, we instruct the calling code to terminate the ray-cast.
      return 0.0;
    }

    // By returning 1, we instruct the caller to continue without clipping the
    // ray.
    return 1.0;
  }
}

planck.play('Ray-Cast', function(pl) {

  var e_maxBodies = 256;

  var e_closest, e_any, e_multiple;

  var m_bodyIndex;
  var m_bodies = []; // [ e_maxBodies ];
  var m_userData = []; //[ e_maxBodies ];
  var m_polygons = []; // [ 4 ];
  var m_circle;
  var m_edge;

  var m_angle;
  var m_mode;

  // Ground body
  var ground = world.createBody();

  var shape = pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));
  ground.createFixture(shape, 0.0);

  var vertices = [];
  vertices[0] = Vec2(-0.5, 0.0);
  vertices[1] = Vec2(0.5, 0.0);
  vertices[2] = Vec2(0.0, 1.5);
  m_polygons[0] = pl.Polygon(vertices);

  var vertices = [];
  vertices[0] = Vec2(-0.1, 0.0);
  vertices[1] = Vec2(0.1, 0.0);
  vertices[2] = Vec2(0.0, 1.5);
  m_polygons[1] = pl.Polygon(vertices, 3);

  var w = 1.0;
  var b = w / (2.0 + Math.sqrt(2.0));
  var s = Math.sqrt(2.0) * b;

  var vertices = [];
  vertices[0] = Vec2(0.5 * s, 0.0);
  vertices[1] = Vec2(0.5 * w, b);
  vertices[2] = Vec2(0.5 * w, b + s);
  vertices[3] = Vec2(0.5 * s, w);
  vertices[4] = Vec2(-0.5 * s, w);
  vertices[5] = Vec2(-0.5 * w, b + s);
  vertices[6] = Vec2(-0.5 * w, b);
  vertices[7] = Vec2(-0.5 * s, 0.0);

  m_polygons[2] = pl.Polygon(vertices, 8);

  m_polygons[3] = pl.Box(0.5, 0.5);

  m_circle = pl.Circle(0.5);

  m_edge = pl.Edge(Vec2(-1.0, 0.0), Vec2(1.0, 0.0));

  m_bodyIndex = 0;

  m_angle = 0.0;

  m_mode = e_closest;

  function Create(index) {
    if (m_bodies[m_bodyIndex] != null) {
      world.destroyBody(m_bodies[m_bodyIndex]);
      m_bodies[m_bodyIndex] = null;
    }

    var bd = {};

    var x = RandomFloat(-10.0, 10.0);
    var y = RandomFloat(0.0, 20.0);
    bd.position = Vec2(x, y);
    bd.angle = RandomFloat(-Math.PI, Math.PI);

    m_userData[m_bodyIndex] = index;
    bd.userData = m_userData + m_bodyIndex;

    if (index == 4) {
      bd.angularDamping = 0.02;
    }

    m_bodies[m_bodyIndex] = world.createBody(bd);

    if (index < 4) {
      var fd = {};
      fd.shape = m_polygons + index;
      fd.friction = 0.3;
      m_bodies[m_bodyIndex].createFixture(fd);

    } else if (index < 5) {
      var fd = {};
      fd.shape = m_circle;
      fd.friction = 0.3;
      m_bodies[m_bodyIndex].createFixture(fd);

    } else {
      var fd = {};
      fd.shape = m_edge;
      fd.friction = 0.3;
      m_bodies[m_bodyIndex].createFixture(fd);
    }

    m_bodyIndex = (m_bodyIndex + 1) % e_maxBodies;
  }

  function DestroyBody() {
    for (var i = 0; i < e_maxBodies; ++i) {
      if (m_bodies[i] != null) {
        world.destroyBody(m_bodies[i]);
        m_bodies[i] = null;
        return;
      }
    }
  }

  function Keyboard(key) {
    switch (key) {
      case GLFW_KEY_1:
      case GLFW_KEY_2:
      case GLFW_KEY_3:
      case GLFW_KEY_4:
      case GLFW_KEY_5:
      case GLFW_KEY_6:
        Create(key - GLFW_KEY_1);
        break;

      case GLFW_KEY_D:
        DestroyBody();
        break;

      case GLFW_KEY_M:
        if (m_mode == e_closest) {
          m_mode = e_any;
        } else if (m_mode == e_any) {
          m_mode = e_multiple;
        } else if (m_mode == e_multiple) {
          m_mode = e_closest;
        }
    }
  }

  function Step(settings) {
    var /* bool */advanceRay = settings.pause == 0 || settings.singleStep;

    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine,
      "Press 1-6 to drop stuff, m to change the mode");
    m_textLine += DRAW_STRING_NEW_LINE;
    switch (m_mode) {
      case e_closest:
        g_debugDraw.DrawString(5, m_textLine,
          "Ray-cast mode: closest - find closest fixture along the ray");
        break;

      case e_any:
        g_debugDraw.DrawString(5, m_textLine,
          "Ray-cast mode: any - check for obstruction");
        break;

      case e_multiple:
        g_debugDraw.DrawString(5, m_textLine,
          "Ray-cast mode: multiple - gather multiple fixtures");
        break;
    }

    m_textLine += DRAW_STRING_NEW_LINE;

    var L = 11.0;
    var point1 = Vec2(0.0, 10.0);
    var d = Vec2(L * cosf(m_angle), L * sinf(m_angle));
    var point2 = Vec2.add(point1, d);

    if (m_mode == e_closest) {
      var callback = RayCastClosestCallback;
      world.rayCast(callback, point1, point2);

      if (callback.m_hit) {
        g_debugDraw.DrawPoint(callback.m_point, 5.0, Color(0.4, 0.9, 0.4));
        g_debugDraw.DrawSegment(point1, callback.m_point, Color(0.8, 0.8,
          0.8));
        var /* Vec2 */head = callback.m_povar /* int */ + 0.5
          * callback.m_normal;
        g_debugDraw.DrawSegment(callback.m_point, head,
          Color(0.9, 0.9, 0.4));
      } else {
        g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));
      }
    } else if (m_mode == e_any) {
      var callback = RayCastAnyCallback;
      world.rayCast(callback, point1, point2);

      if (callback.m_hit) {
        g_debugDraw.DrawPoint(callback.m_point, 5.0, Color(0.4, 0.9, 0.4));
        g_debugDraw.DrawSegment(point1, callback.m_point, Color(0.8, 0.8,
          0.8));
        var /* Vec2 */head = callback.m_povar /* int */ + 0.5
          * callback.m_normal;
        g_debugDraw.DrawSegment(callback.m_point, head,
          Color(0.9, 0.9, 0.4));
      } else {
        g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));
      }
    } else if (m_mode == e_multiple) {
      var callback = RayCastMultipleCallback;
      world.rayCast(callback, point1, point2);
      g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));

      for (var i = 0; i < callback.m_count; ++i) {
        var /* Vec2 */p = callback.m_points[i];
        var /* Vec2 */n = callback.m_normals[i];
        g_debugDraw.DrawPoint(p, 5.0, Color(0.4, 0.9, 0.4));
        g_debugDraw.DrawSegment(point1, p, Color(0.8, 0.8, 0.8));
        var /* Vec2 */head = p + 0.5 * n;
        g_debugDraw.DrawSegment(p, head, Color(0.9, 0.9, 0.4));
      }
    }

    if (advanceRay) {
      m_angle += 0.25 * Math.PI / 180.0;
    }

    if (0) {
      // This case was failing.
      var shape = pl.Box(22.875, 3.0);

      var input = new RayCastInput();
      input.p1.set(10.2725, 1.71372);
      input.p2.set(10.2353, 2.21807);
      // input.maxFraction = 0.567623;
      input.maxFraction = 0.56762173;

      var xf = pl.Transform();
      xf.setIdentity();
      xf.position.set(23.0, 5.0);

      var output = new RayCastOutput();
      var hit = shape.rayCast(output, input, xf);
      hit = false;

      var color = Color(1.0, 1.0, 1.0);
      var vs = [];
      for (var i = 0; i < 4; ++i) {
        vs[i] = Mul(xf, shape.m_vertices[i]);
      }

      g_debugDraw.DrawPolygon(vs, 4, color);
      g_debugDraw.DrawSegment(input.p1, input.p2, color);
    }
  }

  return world;
});
