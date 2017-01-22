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
function RayCastClosestCallback() {
  var def = {};

  def.m_hit = false;
  def.m_point = null;
  def.m_normal = null;

  def.ReportFixture = function(fixture, point, normal, fraction) {
    var body = fixture.getBody();
    var userData = body.getUserData();
    if (userData == 'arrow') {
      return -1.0;
    }
    if (userData) {
      if (userData == 0) {
        // By returning -1, we instruct the calling code to ignore this fixture and
        // continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.m_hit = true;
    def.m_point = point;
    def.m_normal = normal;

    // By returning the current fraction, we instruct the calling code to clip the ray and
    // continue the ray-cast to the next fixture. WARNING: do not assume that fixtures
    // are reported in order. However, by clipping, we can always get the closest fixture.
    return fraction;
  };

  return def;
}

// This callback finds any hit. Polygon 0 is filtered. For this type of query we are usually
// just checking for obstruction, so the actual fixture and hit point are irrelevant.
function RayCastAnyCallback() {
  var def = {};

  def.m_hit = false;
  def.m_point = null;
  def.m_normal = null;

  def.ReportFixture = function(fixture, point, normal, fraction) {
    var body = fixture.getBody();
    var userData = body.getUserData();
    if (userData == 'arrow') {
      return -1.0;
    }
    if (userData) {
      if (userData == 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.m_hit = true;
    def.m_point = point;
    def.m_normal = normal;

    // At this point we have a hit, so we know the ray is obstructed.
    // By returning 0, we instruct the calling code to terminate the ray-cast.
    return 0.0;
  };

  return def;
}

// This ray cast collects multiple hits along the ray. Polygon 0 is filtered.
// The fixtures are not necessary reported in order, so we might not capture
// the closest fixture.
function RayCastMultipleCallback() {
  var def = {};
  // var e_maxCount = 3;

  def.m_points = [];
  def.m_normals = [];

  def.ReportFixture = function(fixture, point, normal, fraction) {
    var body = fixture.getBody();
    var userData = body.getUserData();
    if (userData == 'arrow') {
      return -1.0;
    }
    if (userData) {
      if (userData == 0) {
        // By returning -1, we instruct the calling code to ignore this fixture
        // and continue the ray-cast to the next fixture.
        return -1.0;
      }
    }

    def.m_points.push(point);
    def.m_normals.push(normal);

    // if (m_count == e_maxCount) {
    //   // At this point the buffer is full.
    //   // By returning 0, we instruct the calling code to terminate the ray-cast.
    //   return 0.0;
    // }

    // By returning 1, we instruct the caller to continue without clipping the
    // ray.
    return 1.0;
  };

  return {};
}

planck.play('Ray-Cast', function(pl, player) {
  var Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_maxBodies = 256;

  // mode
  var e_closest = 1, e_any = 2, e_multiple = 3;

  var m_bodyIndex = 0;
  var m_bodies = []; // [ e_maxBodies ];
  var m_userData = []; //[ e_maxBodies ];
  var m_polygons = []; // [ 4 ];
  var m_circle;
  var m_edge;

  var m_angle = 0.0;
  var m_mode = e_closest;

  var arrow = world.createBody();
  arrow.createFixture(pl.Polygon([Vec2(0, 0), Vec2(0.2, -1), Vec2(-0.2, -1)]));
  arrow.setUserData('arrow');

  m_polygons[0] = pl.Polygon([
    Vec2(-0.5, 0.0),
    Vec2(0.5, 0.0),
    Vec2(0.0, 1.5)
  ]);
  m_polygons[1] = pl.Polygon([
    Vec2(-0.1, 0.0),
    Vec2(0.1, 0.0),
    Vec2(0.0, 1.5)
  ]);

  var w = 1.0;
  var b = w / (2.0 + Math.sqrt(2.0));
  var s = Math.sqrt(2.0) * b;

  m_polygons[2] = pl.Polygon([
    Vec2(0.5 * s, 0.0),
    Vec2(0.5 * w, b),
    Vec2(0.5 * w, b + s),
    Vec2(0.5 * s, w),
    Vec2(-0.5 * s, w),
    Vec2(-0.5 * w, b + s),
    Vec2(-0.5 * w, b),
    Vec2(-0.5 * s, 0.0)
  ]);
  m_polygons[3] = pl.Box(0.5, 0.5);

  m_circle = pl.Circle(0.5);
  m_edge = pl.Edge(Vec2(-1.0, 0.0), Vec2(1.0, 0.0));

  function Create(index) {
    if (m_bodies[m_bodyIndex] != null) {
      world.destroyBody(m_bodies[m_bodyIndex]);
      m_bodies[m_bodyIndex] = null;
    }

    var x = pl.Math.random(-10.0, 10.0);
    var y = pl.Math.random(0.0, 20.0);

    var bd = {};
    bd.position = Vec2(x, y);
    bd.angle = pl.Math.random(-Math.PI, Math.PI);
    bd.userData = m_userData[m_bodyIndex] = index;

    if (index == 4) {
      bd.angularDamping = 0.02;
    }

    m_bodies[m_bodyIndex] = world.createBody(bd);

    var shape;
    if (index < 4) {
      shape = m_polygons[index];

    } else if (index < 5) {
      shape = m_circle;

    } else {
      shape = m_edge;
    }

    m_bodies[m_bodyIndex].createFixture(shape, {friction: 0.3});

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

  player.keydown = function() {
    if (player.activeKeys['M']) {
      if (m_mode == e_closest) {
        m_mode = e_any;
      } else if (m_mode == e_any) {
        m_mode = e_multiple;
      } else if (m_mode == e_multiple) {
        m_mode = e_closest;
      }

    } else if (player.activeKeys['D']) {
      DestroyBody();

    } else if (player.activeKeys['1']) {
      Create(0)

    } else if (player.activeKeys['2']) {
      Create(1)

    } else if (player.activeKeys['3']) {
      Create(2)

    } else if (player.activeKeys['4']) {
      Create(3)

    } else if (player.activeKeys['5']) {
      Create(4)

    } else if (player.activeKeys['6']) {
      Create(5)
    }

    updateStatus()
  };

  function updateStatus() {
    switch (m_mode) {
      case e_closest:
        player.status("Ray-cast mode: closest - find closest fixture along the ray");
        break;

      case e_any:
        player.status("Ray-cast mode: any - check for obstruction");
        break;

      case e_multiple:
        player.status("Ray-cast mode: multiple - gather multiple fixtures");
        break;
    }
    player.status("Press 1-6 to drop stuff, m to change the mode");
  }

  player.step = function(settings) {
    var advanceRay = true;

    var L = 11.0;
    var point1 = Vec2(0.0, 10.0);
    var d = Vec2(L * Math.cos(m_angle), L * Math.sin(m_angle));
    var point2 = Vec2.add(point1, d);

    arrow.setAngle(m_angle - Math.PI / 2);

    if (m_mode == e_closest) {
      var callback = RayCastClosestCallback();
      world.rayCast(point1, point2, callback.ReportFixture);

      if (callback.m_hit) {
        arrow.setPosition(callback.m_point);
        // g_debugDraw.DrawPoint(callback.m_point, 5.0, Color(0.4, 0.9, 0.4));
        // g_debugDraw.DrawSegment(point1, callback.m_point, Color(0.8, 0.8, 0.8));
        // var head = Vec2.wAdd(1, callback.m_point, 0.5, callback.m_normal);
        // g_debugDraw.DrawSegment(callback.m_point, head, Color(0.9, 0.9, 0.4));
      } else {
        arrow.setPosition(point2);
        // g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));
      }
    } else if (m_mode == e_any) {
      var callback = RayCastAnyCallback();
      world.rayCast(point1, point2, callback.ReportFixture);

      if (callback.m_hit) {
        arrow.setPosition(callback.m_point);
        // g_debugDraw.DrawPoint(callback.m_point, 5.0, Color(0.4, 0.9, 0.4));
        // g_debugDraw.DrawSegment(point1, callback.m_point, Color(0.8, 0.8, 0.8));
        // var /* Vec2 */head = callback.m_point + 0.5 * callback.m_normal;
        // g_debugDraw.DrawSegment(callback.m_point, head, Color(0.9, 0.9, 0.4));
      } else {
        arrow.setPosition(point2);
        // g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));
      }
    } else if (m_mode == e_multiple) {
      var callback = RayCastMultipleCallback();
      world.rayCast(point1, point2, callback.ReportFixture);
      // g_debugDraw.DrawSegment(point1, point2, Color(0.8, 0.8, 0.8));
      //
      // for (var i = 0; i < callback.m_count; ++i) {
      //   var /* Vec2 */p = callback.m_points[i];
      //   var /* Vec2 */n = callback.m_normals[i];
      //   g_debugDraw.DrawPoint(p, 5.0, Color(0.4, 0.9, 0.4));
      //   g_debugDraw.DrawSegment(point1, p, Color(0.8, 0.8, 0.8));
      //   var /* Vec2 */head = p + 0.5 * n;
      //   g_debugDraw.DrawSegment(p, head, Color(0.9, 0.9, 0.4));
      // }
    }

    if (advanceRay) {
      m_angle += 0.25 * Math.PI / 180.0;
    }

    if (0) {
      // This case was failing.
      var shape = pl.Box(22.875, 3.0);

      var input = {}; // new RayCastInput();
      input.p1 = Vec2(10.2725, 1.71372);
      input.p2 = Vec2(10.2353, 2.21807);
      // input.maxFraction = 0.567623;
      input.maxFraction = 0.56762173;

      var xf = pl.Transform();
      xf.setIdentity();
      xf.position = Vec2(23.0, 5.0);

      var output = {}; // new RayCastOutput();
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
  };

  updateStatus();

  return world;
});
