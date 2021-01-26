/*
 * Planck.js
 * The MIT License
 * Copyright (c) 2021 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

module.exports = Vec3;

var common = require('../util/common');
var Math = require('./Math');

function Vec3(x, y, z) {
  if (!(this instanceof Vec3)) {
    return new Vec3(x, y, z);
  }
  if (typeof x === 'undefined') {
    this.x = 0, this.y = 0, this.z = 0;
  } else if (typeof x === 'object') {
    this.x = x.x, this.y = x.y, this.z = x.z;
  } else {
    this.x = x, this.y = y, this.z = z;
  }
  _ASSERT && Vec3.assert(this);
};

Vec3.prototype._serialize = function() {
  return {
    x: this.x,
    y: this.y,
    z: this.z
  };
};

Vec3._deserialize = function(data) {
  var obj = Object.create(Vec3.prototype);
  obj.x = data.x;
  obj.y = data.y;
  obj.z = data.z;
  return obj;
};

Vec3.neo = function(x, y, z) {
  var obj = Object.create(Vec3.prototype);
  obj.x = x;
  obj.y = y;
  obj.z = z;
  return obj;
};

Vec3.clone = function(v) {
  _ASSERT && Vec3.assert(v);
  return Vec3.neo(v.x, v.y, v.z);
};

Vec3.prototype.toString = function() {
  return JSON.stringify(this);
};

/**
 * Does this vector contain finite coordinates?
 */
Vec3.isValid = function(v) {
  return v && Math.isFinite(v.x) && Math.isFinite(v.y) && Math.isFinite(v.z);
}

Vec3.assert = function(o) {
  if (!_ASSERT) return;
  if (!Vec3.isValid(o)) {
    _DEBUG && common.debug(o);
    throw new Error('Invalid Vec3!');
  }
}

Vec3.prototype.setZero = function() {
  this.x = 0.0;
  this.y = 0.0;
  this.z = 0.0;
  return this;
}

Vec3.prototype.set = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  return this;
}

Vec3.prototype.add = function(w) {
  this.x += w.x;
  this.y += w.y;
  this.z += w.z;
  return this;
}

Vec3.prototype.sub = function(w) {
  this.x -= w.x;
  this.y -= w.y;
  this.z -= w.z;
  return this;
}

Vec3.prototype.mul = function(m) {
  this.x *= m;
  this.y *= m;
  this.z *= m;
  return this;
}

Vec3.areEqual = function(v, w) {
  _ASSERT && Vec3.assert(v);
  _ASSERT && Vec3.assert(w);
  return v == w ||
    typeof v === 'object' && v !== null &&
    typeof w === 'object' && w !== null &&
    v.x === w.x && v.y === w.y && v.z === w.z;
}

/**
 * Perform the dot product on two vectors.
 */
Vec3.dot = function(v, w) {
  return v.x * w.x + v.y * w.y + v.z * w.z;
}

/**
 * Perform the cross product on two vectors. In 2D this produces a scalar.
 */
Vec3.cross = function(v, w) {
  return new Vec3(
    v.y * w.z - v.z * w.y,
    v.z * w.x - v.x * w.z,
    v.x * w.y - v.y * w.x
  );
}

Vec3.add = function(v, w) {
  return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
}

Vec3.sub = function(v, w) {
  return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
}

Vec3.mul = function(v, m) {
  return new Vec3(m * v.x, m * v.y, m * v.z);
}

Vec3.prototype.neg = function() {
  this.x = -this.x;
  this.y = -this.y;
  this.z = -this.z;
  return this;
}

Vec3.neg = function(v) {
  return new Vec3(-v.x, -v.y, -v.z);
}
