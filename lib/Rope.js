/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
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

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

var common = require('./util/common');

var RopeDef = {
  vertices : [],
  count : 0,
  masses : [],
  gravity : Vec2.zero(),
  damping : 0.1,
  // Stretching stiffness
  k2 : 0.9,
  // Bending stiffness. Values above 0.5 can make the simulation blow up.
  k3 : 0.1
};

function Rope() {

  // int32
  // this.m_count;
  // Vec2 * this.m_ps;
  // Vec2 * this.m_p0s;
  // Vec2 * this.m_vs;
  //
  // float * this.m_ims;
  //
  // float * this.m_Ls;
  // float * this.m_as;

  this.m_gravity;// Vec2
  this.m_damping;

  this.m_count = 0;
  this.m_ps = null;
  this.m_p0s = null;
  this.m_vs = null;
  this.m_ims = null;
  this.m_Ls = null;
  this.m_as = null;
  this.m_gravity.setZero();
  this.m_k2 = 1.0;
  this.m_k3 = 0.1;
}

Rope.prototype.initialize = function(def) {
  _ASSERT && common.assert(def.count >= 3);
  this.m_count = def.count;
  this.m_ps = [];// Vec2[m_count]
  this.m_p0s = [];// Vec2[m_count]
  this.m_vs = [];// Vec2[m_count]
  this.m_ims = [];// float[m_count]

  for (var i = 0; i < this.m_count; ++i) {
    this.m_ps[i] = def.vertices[i];
    this.m_p0s[i] = def.vertices[i];
    this.m_vs[i].setZero();

    var m = def.masses[i];// float
    if (m > 0.0) {
      this.m_ims[i] = 1.0 / m;
    } else {
      this.m_ims[i] = 0.0;
    }
  }

  var count2 = this.m_count - 1;
  var count3 = this.m_count - 2;
  this.m_Ls = [];// float[count2]
  this.m_as = [];// float[count3]

  for (var i = 0; i < count2; ++i) {
    var p1 = this.m_ps[i];
    var p2 = this.m_ps[i + 1];
    this.m_Ls[i] = Vec2.distance(p1, p2);
  }

  for (var i = 0; i < count3; ++i) {
    var p1 = this.m_ps[i];
    var p2 = this.m_ps[i + 1];
    var p3 = this.m_ps[i + 2];

    var d1 = Sub(p2, p1);
    var d2 = Sub(p3, p2);

    var a = Cross(d1, d2);
    var b = Dot(d1, d2);

    this.m_as[i] = Atan2(a, b);
  }

  this.m_gravity = def.gravity;
  this.m_damping = def.damping;
  this.m_k2 = def.k2;
  this.m_k3 = def.k3;
}

Rope.prototype.getVertexCount = function() {
  return this.m_count;
}

Rope.prototype.getVertices = function() {
  return this.m_ps;
}

// h: timeStep
Rope.prototype.step = function(h, iterations) {
  if (h == 0.0) {
    return;
  }

  var d = expf(-h * this.m_damping);

  for (var i = 0; i < this.m_count; ++i) {
    this.m_p0s[i] = this.m_ps[i];
    if (this.m_ims[i] > 0.0) {
      this.m_vs[i] += h * this.m_gravity;
    }
    this.m_vs[i] *= d;
    this.m_ps[i] += h * this.m_vs[i];

  }

  for (var i = 0; i < iterations; ++i) {
    SolveC2();
    SolveC3();
    SolveC2();
  }

  var inv_h = 1.0 / h;
  for (var i = 0; i < this.m_count; ++i) {
    this.m_vs[i] = inv_h * (this.m_ps[i] - this.m_p0s[i]);
  }
}

Rope.prototype.solveC2 = function() {
  var count2 = this.m_count - 1;

  for (var i = 0; i < count2; ++i) {
    var p1 = this.m_ps[i]; // Vec2
    var p2 = this.m_ps[i + 1]; // Vec2

    var d = p2 - p1; // Vec2
    var L = d.normalize();

    var im1 = this.m_ims[i];
    var im2 = this.m_ims[i + 1];

    if (im1 + im2 == 0.0) {
      continue;
    }

    var s1 = im1 / (im1 + im2);
    var s2 = im2 / (im1 + im2);

    p1 -= this.m_k2 * s1 * (this.m_Ls[i] - L) * d;
    p2 += this.m_k2 * s2 * (this.m_Ls[i] - L) * d;

    this.m_ps[i] = p1;
    this.m_ps[i + 1] = p2;
  }
}

Rope.prototype.setAngle = function(angle) {
  var count3 = this.m_count - 2;
  for (var i = 0; i < count3; ++i) {
    this.m_as[i] = angle;
  }
}

Rope.prototype.solveC3 = function() {
  var count3 = this.m_count - 2;

  for (var i = 0; i < count3; ++i) {
    var p1 = this.m_ps[i]; // Vec2
    var p2 = this.m_ps[i + 1]; // Vec2
    var p3 = this.m_ps[i + 2]; // Vec2

    var m1 = this.m_ims[i];
    var m2 = this.m_ims[i + 1];
    var m3 = this.m_ims[i + 2];

    var d1 = p2 - p1;
    var d2 = p3 - p2;

    var L1sqr = d1.lengthSquared();
    var L2sqr = d2.lengthSquared();

    if (L1sqr * L2sqr == 0.0) {
      continue;
    }

    var a = Cross(d1, d2);
    var b = Dot(d1, d2);

    var angle = Atan2(a, b);

    var Jd1 = (-1.0 / L1sqr) * d1.skew(); // Vec2
    var Jd2 = (1.0 / L2sqr) * d2.skew(); // Vec2

    var J1 = -Jd1;
    var J2 = Jd1 - Jd2;
    var J3 = Jd2;

    var mass = m1 * Dot(J1, J1) + m2 * Dot(J2, J2) + m3 * Dot(J3, J3);
    if (mass == 0.0) {
      continue;
    }

    mass = 1.0 / mass;

    var C = angle - this.m_as[i];

    while (C > Math.PI) {
      angle -= 2 * Math.PI;
      C = angle - this.m_as[i];
    }

    while (C < -Math.PI) {
      angle += 2.0 * Math.PI;
      C = angle - this.m_as[i];
    }

    var impulse = -this.m_k3 * mass * C;

    p1 += (m1 * impulse) * J1;
    p2 += (m2 * impulse) * J2;
    p3 += (m3 * impulse) * J3;

    this.m_ps[i] = p1;
    this.m_ps[i + 1] = p2;
    this.m_ps[i + 2] = p3;
  }
}
