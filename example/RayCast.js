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
  }.bind(this);

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
  }.bind(this);

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
  }.bind(this);

  return def;
}

planck.testbed('Ray-Cast', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

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

  testbed.keydown = function(code, char) {
    switch (char){
      case 'Z':
        if (m_mode == e_closest) {
          m_mode = e_any;
        } else if (m_mode == e_any) {
          m_mode = e_multiple;
        } else if (m_mode == e_multiple) {
          m_mode = e_closest;
        }
        break;
      case 'X':
        DestroyBody();
        break;
      case '1':
        Create(0);
        break;
      case '2':
        Create(1);
        break;
      case '3':
        Create(2);
        break;
      case '4':
        Create(3);
        break;
      case '5':
        Create(4);
        break;
    }

    updateStatus()
  };

  function updateStatus() {
    switch (m_mode) {
      case e_closest:
        testbed.status("Ray-cast mode", "closest - find closest fixture along the ray");
        break;

      case e_any:
        testbed.status("Ray-cast mode", "any - check for obstruction");
        break;

      case e_multiple:
        testbed.status("Ray-cast mode", "multiple - gather multiple fixtures");
        break;
    }
  }

  testbed.info("1-5: Drop new objects, Z: Change mode, X: Destroy an object");

  testbed.step = function() {
    var advanceRay = true;

    var L = 11.0;
    var point1 = Vec2(0.0, 10.0);
    var d = Vec2(L * Math.cos(m_angle), L * Math.sin(m_angle));
    var point2 = Vec2.add(point1, d);

    if (m_mode == e_closest) {
      var callback = RayCastClosestCallback();
      world.rayCast(point1, point2, callback.ReportFixture);

      if (callback.m_hit) {
        testbed.drawPoint(callback.m_point, 5.0, testbed.color(0.4, 0.9, 0.4));
        testbed.drawSegment(point1, callback.m_point, testbed.color(0.8, 0.8, 0.8));
        var head = Vec2.wAdd(1, callback.m_point, 0.5, callback.m_normal);
        testbed.drawSegment(callback.m_point, head, testbed.color(0.9, 0.9, 0.4));
      } else {
        testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
      }
    } else if (m_mode == e_any) {
      var callback = RayCastAnyCallback();
      world.rayCast(point1, point2, callback.ReportFixture);

      if (callback.m_hit) {
        testbed.drawPoint(callback.m_point, 5.0, testbed.color(0.4, 0.9, 0.4));
        testbed.drawSegment(point1, callback.m_point, testbed.color(0.8, 0.8, 0.8));
        var head = Vec2.wAdd(1, callback.m_point, 0.5, callback.m_normal);
        testbed.drawSegment(callback.m_point, head, testbed.color(0.9, 0.9, 0.4));
      } else {
        testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));
      }
    } else if (m_mode == e_multiple) {
      var callback = RayCastMultipleCallback();
      world.rayCast(point1, point2, callback.ReportFixture);
      testbed.drawSegment(point1, point2, testbed.color(0.8, 0.8, 0.8));

      for (var i = 0; i < callback.m_points.length; ++i) {
        var p = callback.m_points[i];
        var n = callback.m_normals[i];
        testbed.drawPoint(p, 5.0, testbed.color(0.4, 0.9, 0.4));
        testbed.drawSegment(point1, p, testbed.color(0.8, 0.8, 0.8));
        var head = Vec2.wAdd(1, p, 0.5, n);
        testbed.drawSegment(p, head, testbed.color(0.9, 0.9, 0.4));
      }
    }

    if (advanceRay) {
      m_angle += 0.25 * Math.PI / 180.0;
    }

    if (0) {
      // This case was failing.
      var shape = pl.Box(22.875, 3.0);

      var input = {}; // RayCastInput
      input.p1 = Vec2(10.2725, 1.71372);
      input.p2 = Vec2(10.2353, 2.21807);
      // input.maxFraction = 0.567623;
      input.maxFraction = 0.56762173;

      var xf = pl.Transform();
      xf.setIdentity();
      xf.position = Vec2(23.0, 5.0);

      var output = {}; // RayCastOutput
      var hit = shape.rayCast(output, input, xf);
      hit = false;

      var color = testbed.color(1.0, 1.0, 1.0);
      var vs = Transform.mul(xf, shape.m_vertices);

      testbed.drawPolygon(vs, color);
      testbed.drawSegment(input.p1, input.p2, color);
    }
  };

  updateStatus();

  return world;
});
