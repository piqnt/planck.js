/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
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

module.exports = Vec2;

var common = require('../util/common');
var Math = require('./Math');

function Vec2(x, y) {
  if (!(this instanceof Vec2)) {
    return new Vec2(x, y);
  }
  if (typeof x === 'undefined') {
    this.x = 0, this.y = 0;
  } else if (typeof x === 'object') {
    this.x = x.x, this.y = x.y;
  } else {
    this.x = x, this.y = y;
  }
  Vec2.assert(this);
};

Vec2.prototype.toString = function() {
  return JSON.stringify(this);
};

/**
 * Does this vector contain finite coordinates?
 */
Vec2.isValid = function(v) {
  return v && Math.isFinite(v.x) && Math.isFinite(v.y);
}

Vec2.assert = function(o) {
  if (!Vec2.isValid(o)) {
    common.debug(o);
    throw new Error('Invalid Vec2!');
  }
}

Vec2.prototype.clone = function(clone) {
  return Vec2.clone(this, clone);
}

/**
 * Set this vector to all zeros.
 * 
 * @returns this
 */
Vec2.prototype.setZero = function() {
  this.x = 0.0;
  this.y = 0.0;
  return this;
}

/**
 * Set this vector to some specified coordinates.
 * 
 * @returns this
 */
Vec2.prototype.set = function(x, y) {
  Vec2.set(this, x, y);
  return this;
}

Vec2.prototype.wSet = function(a, v, b, w) {
  Math.assert(a);
  Vec2.assert(v);
  var x = a * v.x;
  var y = a * v.y;
  if (typeof b !== 'undefined' || typeof w !== 'undefined') {
    Math.assert(b);
    Vec2.assert(w);
    x += b * w.x;
    y += b * w.y;
  }

  // `this` may be `w`
  this.x = x;
  this.y = y;
  return this;
}

/**
 * Add a vector to this vector.
 * 
 * @returns this
 */
Vec2.prototype.add = function(w) {
  Vec2.assert(w);
  this.x += w.x;
  this.y += w.y;
  return this;
}

Vec2.prototype.wAdd = function(a, v, b, w) {
  Math.assert(a);
  Vec2.assert(v);
  var x = a * v.x;
  var y = a * v.y;
  if (typeof b !== 'undefined' || typeof w !== 'undefined') {
    Math.assert(b);
    Vec2.assert(w);
    x += b * w.x;
    y += b * w.y;
  }

  // `this` may be `w`
  this.x += x;
  this.y += y;
  return this;
}

Vec2.prototype.wSub = function(a, v, b, w) {
  Math.assert(a);
  Vec2.assert(v);
  var x = a * v.x;
  var y = a * v.y;
  if (typeof b !== 'undefined' || typeof w !== 'undefined') {
    Math.assert(b);
    Vec2.assert(w);
    x += b * w.x;
    y += b * w.y;
  }

  // `this` may be `w`
  this.x -= x;
  this.y -= y;
  return this;
}

/**
 * Subtract a vector from this vector
 * 
 * @returns this
 */
Vec2.prototype.sub = function(w) {
  Vec2.assert(w);
  this.x -= w.x;
  this.y -= w.y;
  return this;
}

/**
 * Multiply this vector by a scalar.
 * 
 * @returns this
 */
Vec2.prototype.mul = function(m) {
  Math.assert(m);
  this.x *= m;
  this.y *= m;
  return this;
}

/**
 * Get the length of this vector (the norm).
 * 
 * For performance, use this instead of lengthSquared (if possible).
 */
Vec2.prototype.length = function() {
  return Vec2.lengthOf(this);
}

/**
 * Get the length squared.
 */
Vec2.prototype.lengthSquared = function() {
  return Vec2.lengthSquared(this);
}

/**
 * Convert this vector into a unit vector.
 * 
 * @returns old length
 */
Vec2.prototype.normalize = function() {
  var length = this.length();
  if (length < Math.EPSILON) {
    return 0.0;
  }
  var invLength = 1.0 / length;
  this.x *= invLength;
  this.y *= invLength;
  return length;
}

Vec2.clone = function(v, w) {
  Vec2.assert(v);
  if (typeof w !== 'object') {
    return new Vec2(v.x, v.y);
  }
  w.x = v.x;
  w.y = v.y;
  return w;
}

/**
 * Get the length of this vector (the norm).
 *
 * For performance, use this instead of lengthSquared (if possible).
 */
Vec2.lengthOf = function(v) {
  Vec2.assert(v);
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Get the length squared.
 */
Vec2.lengthSquared = function(v) {
  Vec2.assert(v);
  return v.x * v.x + v.y * v.y;
}

Vec2.distance = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  var dx = v.x - w.x, dy = v.y - w.y;
  return Math.sqrt(dx * dx + dy * dy);
}

Vec2.distanceSquared = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  var dx = v.x - w.x, dy = v.y - w.y;
  return dx * dx + dy * dy;
}

Vec2.areEqual = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return v == w || typeof w === 'object' && w !== null && v.x == w.x && v.y == w.y;
}

/**
 * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
 */
Vec2.skew = function(v) {
  Vec2.assert(v);
  return new Vec2(-v.y, v.x);
}

/**
 * Perform the dot product on two vectors.
 */
Vec2.dot = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return v.x * w.x + v.y * w.y;
}

/**
 * Perform the cross product on two vectors. In 2D this produces a scalar.
 * 
 * Perform the cross product on a vector and a scalar. In 2D this produces a
 * vector.
 */
Vec2.cross = function(v, w) {
  if (typeof w === 'number') {
    Vec2.assert(v);
    Math.assert(w);
    return new Vec2(w * v.y, -w * v.x);

  } else if (typeof v === 'number') {
    Math.assert(v);
    Vec2.assert(w);
    return new Vec2(-v * w.y, v * w.x);

  } else {
    Vec2.assert(v);
    Vec2.assert(w);
    return v.x * w.y - v.y * w.x
  }
}

Vec2.addCross = function(a, v, w) {
  if (typeof w === 'number') {
    Vec2.assert(v);
    Math.assert(w);
    return new Vec2(w * v.y + a.x, -w * v.x + a.y);

  } else if (typeof v === 'number') {
    Math.assert(v);
    Vec2.assert(w);
    return new Vec2(-v * w.y + a.x, v * w.x + a.y);
  }

  common.assert(false);
}

Vec2.add = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return new Vec2(v.x + w.x, v.y + w.y);
}

Vec2.wAdd = function(a, v, b, w) {
  var r = Vec2();
  r.wAdd(a, v, b, w);
  return r;
}

Vec2.sub = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return new Vec2(v.x - w.x, v.y - w.y);
}

Vec2.mul = function(a, b) {
  if (typeof a === 'object') {
    Vec2.assert(a);
    Math.assert(b);
    return Vec2(a.x * b, a.y * b);

  } else if (typeof b === 'object') {
    Math.assert(a);
    Vec2.assert(b);
    return Vec2(a * b.x, a * b.y);
  }
}

/**
 * Returns the projection on another vector (as a vector).
 */
Vec2.prototype.projectOn = function(other) {
  Vec2.assert(other);
  return other.mul(Vec2.dot(this, other));
}

Vec2.prototype.neg = function() {
  this.x = -this.x;
  this.y = -this.y;
  return this;
}

Vec2.neg = function(v) {
  Vec2.assert(v);
  return new Vec2(-v.x, -v.y);
}

Vec2.abs = function(v) {
  Vec2.assert(v);
  return new Vec2(Math.abs(v.x), Math.abs(v.y));
}

Vec2.mid = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return new Vec2((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
}

Vec2.setZero = function(v) {
  Vec2.assert(v);
  v.x = 0;
  v.y = 0;
  return v;
}

Vec2.set = function(v, x, y) {
  Vec2.assert(v);
  if (typeof x === 'object') {
    Vec2.assert(x);
    v.x = x.x;
    v.y = x.y;
  } else {
    Math.assert(x);
    Math.assert(y);
    v.x = x;
    v.y = y;
  }
  return v;
}

Vec2.addSet = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  this.x += w.x;
  this.y += w.y;
  return v;
}

Vec2.subSet = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  v.x -= w.x;
  v.y -= w.y;
  return v;
}

Vec2.mulSet = function(v, m) {
  Vec2.assert(v);
  Math.assert(m);
  v.x *= m.x;
  v.y *= m.y;
  return v;
}

Vec2.upper = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return new Vec2(Math.max(v.x, w.x), Math.max(v.y, w.y));
}

Vec2.lower = function(v, w) {
  Vec2.assert(v);
  Vec2.assert(w);
  return new Vec2(Math.min(v.x, w.x), Math.min(v.y, w.y));
}


Vec2.prototype.clamp = function(max) {
  var lengthSqr = this.x * this.x + this.y * this.y;
  if (lengthSqr > max * max) {
    var invLength = Math.invSqrt(lengthSqr);
    this.x *= invLength * max;
    this.y *= invLength * max;
  }
  return this;
}

Vec2.clamp = function(v, max) {
  v = new Vec2(v.x, v.y);
  v.clamp(max);
  return v;
}
