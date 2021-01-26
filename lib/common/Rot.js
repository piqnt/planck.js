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

module.exports = Rot;

var common = require('../util/common');
var Vec2 = require('./Vec2');
var Math = require('./Math');

// TODO merge with Transform

/**
 * Initialize from an angle in radians.
 */
function Rot(angle) {
  if (!(this instanceof Rot)) {
    return new Rot(angle);
  }
  if (typeof angle === 'number') {
    this.setAngle(angle);
  } else if (typeof angle === 'object') {
      this.set(angle);
  } else {
    this.setIdentity();
  }
}

Rot.neo = function(angle) {
  var obj = Object.create(Rot.prototype);
  obj.setAngle(angle);
  return obj;
};

Rot.clone = function(rot) {
  _ASSERT && Rot.assert(rot);
  var obj = Object.create(Rot.prototype);
  obj.s = rot.s;
  obj.c = rot.c;
  return obj;
};

Rot.identity = function() {
  var obj = Object.create(Rot.prototype);
  obj.s = 0.0;
  obj.c = 1.0;
  return obj;
};

Rot.isValid = function(o) {
  return o && Math.isFinite(o.s) && Math.isFinite(o.c);
}

Rot.assert = function(o) {
  if (!_ASSERT) return;
  if (!Rot.isValid(o)) {
    _DEBUG && common.debug(o);
    throw new Error('Invalid Rot!');
  }
}

/**
 * Set to the identity rotation.
 */
Rot.prototype.setIdentity = function() {
  this.s = 0.0;
  this.c = 1.0;
}

Rot.prototype.set = function(angle) {
  if (typeof angle === 'object') {
    _ASSERT && Rot.assert(angle);
    this.s = angle.s;
    this.c = angle.c;

  } else {
    _ASSERT && Math.assert(angle);
    // TODO_ERIN optimize
    this.s = Math.sin(angle);
    this.c = Math.cos(angle);
  }
}

/**
 * Set using an angle in radians.
 */
Rot.prototype.setAngle = function(angle) {
  _ASSERT && Math.assert(angle);
  // TODO_ERIN optimize
  this.s = Math.sin(angle);
  this.c = Math.cos(angle);
};

/**
 * Get the angle in radians.
 */
Rot.prototype.getAngle = function() {
  return Math.atan2(this.s, this.c);
}

/**
 * Get the x-axis.
 */
Rot.prototype.getXAxis = function() {
  return Vec2.neo(this.c, this.s);
}

/**
 * Get the u-axis.
 */
Rot.prototype.getYAxis = function() {
  return Vec2.neo(-this.s, this.c);
}

/**
 * Multiply two rotations: q * r
 * 
 * @returns Rot
 * 
 * Rotate a vector
 * 
 * @returns Vec2
 */
Rot.mul = function(rot, m) {
  _ASSERT && Rot.assert(rot);
  if ('c' in m && 's' in m) {
    _ASSERT && Rot.assert(m);
    // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
    // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
    // s = qs * rc + qc * rs
    // c = qc * rc - qs * rs
    var qr = Rot.identity();
    qr.s = rot.s * m.c + rot.c * m.s;
    qr.c = rot.c * m.c - rot.s * m.s;
    return qr;

  } else if ('x' in m && 'y' in m) {
    _ASSERT && Vec2.assert(m);
    return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
  }
}

Rot.mulRot = function(rot, m) {
  _ASSERT && Rot.assert(rot);
  _ASSERT && Rot.assert(m);
  // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
  // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
  // s = qs * rc + qc * rs
  // c = qc * rc - qs * rs
  var qr = Rot.identity();
  qr.s = rot.s * m.c + rot.c * m.s;
  qr.c = rot.c * m.c - rot.s * m.s;
  return qr;
}

Rot.mulVec2 = function(rot, m) {
  _ASSERT && Rot.assert(rot);
  _ASSERT && Vec2.assert(m);
  return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
}

Rot.mulSub = function(rot, v, w) {
  var x = rot.c * (v.x - w.x) - rot.s * (v.y - w.y);
  var y = rot.s * (v.x - w.x) + rot.c * (v.y - w.y);
  return Vec2.neo(x, y);
}

/**
 * Transpose multiply two rotations: qT * r
 * 
 * @returns Rot
 * 
 * Inverse rotate a vector
 * 
 * @returns Vec2
 */
Rot.mulT = function(rot, m) {
  if ('c' in m && 's' in m) {
    _ASSERT && Rot.assert(m);
    // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
    // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
    // s = qc * rs - qs * rc
    // c = qc * rc + qs * rs
    var qr = Rot.identity();
    qr.s = rot.c * m.s - rot.s * m.c;
    qr.c = rot.c * m.c + rot.s * m.s;
    return qr;

  } else if ('x' in m && 'y' in m) {
    _ASSERT && Vec2.assert(m);
    return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
  }
}

Rot.mulTRot = function(rot, m) {
  _ASSERT && Rot.assert(m);
  // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
  // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
  // s = qc * rs - qs * rc
  // c = qc * rc + qs * rs
  var qr = Rot.identity();
  qr.s = rot.c * m.s - rot.s * m.c;
  qr.c = rot.c * m.c + rot.s * m.s;
  return qr;
}

Rot.mulTVec2 = function(rot, m) {
  _ASSERT && Vec2.assert(m);
  return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
}
