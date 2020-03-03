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

module.exports = Mat22;

var common = require('../util/common');
var Math = require('./Math');
var Vec2 = require('./Vec2');

/**
 * A 2-by-2 matrix. Stored in column-major order.
 */
function Mat22(a, b, c, d) {
  if (typeof a === 'object' && a !== null) {
    this.ex = Vec2.clone(a);
    this.ey = Vec2.clone(b);
  } else if (typeof a === 'number') {
    this.ex = Vec2.neo(a, c);
    this.ey = Vec2.neo(b, d)
  } else {
    this.ex = Vec2.zero();
    this.ey = Vec2.zero()
  }
};

Mat22.prototype.toString = function() {
  return JSON.stringify(this);
};

Mat22.isValid = function(o) {
  return o && Vec2.isValid(o.ex) && Vec2.isValid(o.ey);
};

Mat22.assert = function(o) {
  if (!_ASSERT) return;
  if (!Mat22.isValid(o)) {
    _DEBUG && common.debug(o);
    throw new Error('Invalid Mat22!');
  }
};

Mat22.prototype.set = function(a, b, c, d) {
  if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number'
      && typeof d === 'number') {
    this.ex.set(a, c);
    this.ey.set(b, d);

  } else if (typeof a === 'object' && typeof b === 'object') {
    this.ex.set(a);
    this.ey.set(b);

  } else if (typeof a === 'object') {
    _ASSERT && Mat22.assert(a);
    this.ex.set(a.ex);
    this.ey.set(a.ey);

  } else {
    _ASSERT && common.assert(false);
  }
}

Mat22.prototype.setIdentity = function() {
  this.ex.x = 1.0;
  this.ey.x = 0.0;
  this.ex.y = 0.0;
  this.ey.y = 1.0;
}

Mat22.prototype.setZero = function() {
  this.ex.x = 0.0;
  this.ey.x = 0.0;
  this.ex.y = 0.0;
  this.ey.y = 0.0;
}

Mat22.prototype.getInverse = function() {
  var a = this.ex.x;
  var b = this.ey.x;
  var c = this.ex.y;
  var d = this.ey.y;
  var det = a * d - b * c;
  if (det != 0.0) {
    det = 1.0 / det;
  }
  var imx = new Mat22();
  imx.ex.x = det * d;
  imx.ey.x = -det * b;
  imx.ex.y = -det * c;
  imx.ey.y = det * a;
  return imx;
}

/**
 * Solve A * x = b, where b is a column vector. This is more efficient than
 * computing the inverse in one-shot cases.
 */
Mat22.prototype.solve = function(v) {
  _ASSERT && Vec2.assert(v);
  var a = this.ex.x;
  var b = this.ey.x;
  var c = this.ex.y;
  var d = this.ey.y;
  var det = a * d - b * c;
  if (det != 0.0) {
    det = 1.0 / det;
  }
  var w = Vec2.zero();
  w.x = det * (d * v.x - b * v.y);
  w.y = det * (a * v.y - c * v.x);
  return w;
}

/**
 * Multiply a matrix times a vector. If a rotation matrix is provided, then this
 * transforms the vector from one frame to another.
 */
Mat22.mul = function(mx, v) {
  if (v && 'x' in v && 'y' in v) {
    _ASSERT && Vec2.assert(v);
    var x = mx.ex.x * v.x + mx.ey.x * v.y;
    var y = mx.ex.y * v.x + mx.ey.y * v.y;
    return Vec2.neo(x, y);

  } else if (v && 'ex' in v && 'ey' in v) { // Mat22
    _ASSERT && Mat22.assert(v);
    // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
    var a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
    var b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
    var c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
    var d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
    return new Mat22(a, b, c, d);
  }

  _ASSERT && common.assert(false);
}

Mat22.mulVec2 = function(mx, v) {
  _ASSERT && Vec2.assert(v);
  var x = mx.ex.x * v.x + mx.ey.x * v.y;
  var y = mx.ex.y * v.x + mx.ey.y * v.y;
  return Vec2.neo(x, y);
}

Mat22.mulMat22 = function(mx, v) {
  _ASSERT && Mat22.assert(v);
  // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
  var a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
  var b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
  var c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
  var d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
  return new Mat22(a, b, c, d);
  _ASSERT && common.assert(false);
}

/**
 * Multiply a matrix transpose times a vector. If a rotation matrix is provided,
 * then this transforms the vector from one frame to another (inverse
 * transform).
 */
Mat22.mulT = function(mx, v) {
  if (v && 'x' in v && 'y' in v) { // Vec2
    _ASSERT && Vec2.assert(v);
    return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));

  } else if (v && 'ex' in v && 'ey' in v) { // Mat22
    _ASSERT && Mat22.assert(v);
    var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
    var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
    return new Mat22(c1, c2);
  }

  _ASSERT && common.assert(false);
}

Mat22.mulTVec2 = function(mx, v) {
  _ASSERT && Mat22.assert(mx);
  _ASSERT && Vec2.assert(v);
  return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
}

Mat22.mulTMat22 = function(mx, v) {
  _ASSERT && Mat22.assert(mx);
  _ASSERT && Mat22.assert(v);
  var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
  var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
  return new Mat22(c1, c2);
}

Mat22.abs = function(mx) {
  _ASSERT && Mat22.assert(mx);
  return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
}

Mat22.add = function(mx1, mx2) {
  _ASSERT && Mat22.assert(mx1);
  _ASSERT && Mat22.assert(mx2);
  return new Mat22(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
}
