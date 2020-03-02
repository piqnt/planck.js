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

module.exports = Mat33;

var common = require('../util/common');
var Math = require('./Math');
var Vec2 = require('./Vec2');
var Vec3 = require('./Vec3');

/**
 * A 3-by-3 matrix. Stored in column-major order.
 */
function Mat33(a, b, c) {
  if (typeof a === 'object' && a !== null) {
    this.ex = Vec3.clone(a);
    this.ey = Vec3.clone(b);
    this.ez = Vec3.clone(c);
  } else {
    this.ex = Vec3();
    this.ey = Vec3();
    this.ez = Vec3();
  }
};

Mat33.prototype.toString = function() {
  return JSON.stringify(this);
};

Mat33.isValid = function(o) {
  return o && Vec3.isValid(o.ex) && Vec3.isValid(o.ey) && Vec3.isValid(o.ez);
};

Mat33.assert = function(o) {
  if (!_ASSERT) return;
  if (!Mat33.isValid(o)) {
    _DEBUG && common.debug(o);
    throw new Error('Invalid Mat33!');
  }
};

/**
 * Set this matrix to all zeros.
 */
Mat33.prototype.setZero = function() {
  this.ex.setZero();
  this.ey.setZero();
  this.ez.setZero();
  return this;
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases.
 * 
 * @param {Vec3} v
 * @returns {Vec3}
 */
Mat33.prototype.solve33 = function(v) {
  var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
  if (det != 0.0) {
    det = 1.0 / det;
  }
  var r = new Vec3();
  r.x = det * Vec3.dot(v, Vec3.cross(this.ey, this.ez));
  r.y = det * Vec3.dot(this.ex, Vec3.cross(v, this.ez));
  r.z = det * Vec3.dot(this.ex, Vec3.cross(this.ey, v));
  return r;
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
 * equation.
 * 
 * @param {Vec2} v
 * 
 * @returns {Vec2}
 */
Mat33.prototype.solve22 = function(v) {
  var a11 = this.ex.x;
  var a12 = this.ey.x;
  var a21 = this.ex.y;
  var a22 = this.ey.y;
  var det = a11 * a22 - a12 * a21;
  if (det != 0.0) {
    det = 1.0 / det;
  }
  var r = Vec2.zero();
  r.x = det * (a22 * v.x - a12 * v.y);
  r.y = det * (a11 * v.y - a21 * v.x);
  return r;
}

/**
 * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
 * singular.
 * 
 * @param {Mat33} M
 */
Mat33.prototype.getInverse22 = function(M) {
  var a = this.ex.x;
  var b = this.ey.x;
  var c = this.ex.y;
  var d = this.ey.y;
  var det = a * d - b * c;
  if (det != 0.0) {
    det = 1.0 / det;
  }
  M.ex.x = det * d;
  M.ey.x = -det * b;
  M.ex.z = 0.0;
  M.ex.y = -det * c;
  M.ey.y = det * a;
  M.ey.z = 0.0;
  M.ez.x = 0.0;
  M.ez.y = 0.0;
  M.ez.z = 0.0;
}

/**
 * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
 * if singular.
 * 
 * @param {Mat33} M
 */
Mat33.prototype.getSymInverse33 = function(M) {
  var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
  if (det != 0.0) {
    det = 1.0 / det;
  }
  var a11 = this.ex.x;
  var a12 = this.ey.x;
  var a13 = this.ez.x;
  var a22 = this.ey.y;
  var a23 = this.ez.y;
  var a33 = this.ez.z;

  M.ex.x = det * (a22 * a33 - a23 * a23);
  M.ex.y = det * (a13 * a23 - a12 * a33);
  M.ex.z = det * (a12 * a23 - a13 * a22);

  M.ey.x = M.ex.y;
  M.ey.y = det * (a11 * a33 - a13 * a13);
  M.ey.z = det * (a13 * a12 - a11 * a23);

  M.ez.x = M.ex.z;
  M.ez.y = M.ey.z;
  M.ez.z = det * (a11 * a22 - a12 * a12);
}

/**
 * Multiply a matrix times a vector.
 * 
 * @param {Mat33} a
 * @param {Vec3|Vec2} b
 * 
 * @returns {Vec3|Vec2}
 */
Mat33.mul = function(a, b) {
  _ASSERT && Mat33.assert(a);
  if (b && 'z' in b && 'y' in b && 'x' in b) {
    _ASSERT && Vec3.assert(b);
    var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
    var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
    var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
    return new Vec3(x, y, z);

  } else if (b && 'y' in b && 'x' in b) {
    _ASSERT && Vec2.assert(b);
    var x = a.ex.x * b.x + a.ey.x * b.y;
    var y = a.ex.y * b.x + a.ey.y * b.y;
    return Vec2.neo(x, y);
  }

  _ASSERT && common.assert(false);
}

Mat33.mulVec3 = function(a, b) {
  _ASSERT && Mat33.assert(a);
  _ASSERT && Vec3.assert(b);
  var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
  var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
  var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
  return new Vec3(x, y, z);
}

Mat33.mulVec2 = function(a, b) {
  _ASSERT && Mat33.assert(a);
  _ASSERT && Vec2.assert(b);
  var x = a.ex.x * b.x + a.ey.x * b.y;
  var y = a.ex.y * b.x + a.ey.y * b.y;
  return Vec2.neo(x, y);
}

Mat33.add = function(a, b) {
  _ASSERT && Mat33.assert(a);
  _ASSERT && Mat33.assert(b);
  return new Mat33(
    Vec3.add(a.ex, b.ex),
    Vec3.add(a.ey, b.ey),
    Vec3.add(a.ez, b.ez)
  );
}
