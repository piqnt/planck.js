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

module.exports = Transform;

var common = require('../util/common');
var Vec2 = require('./Vec2');
var Rot = require('./Rot');

// TODO merge with Rot

/**
 * A transform contains translation and rotation. It is used to represent the
 * position and orientation of rigid frames. Initialize using a position vector
 * and a rotation.
 *
 * @prop {Vec2} position
 * @prop {Rot} rotation
 */
function Transform(position, rotation) {
  if (!(this instanceof Transform)) {
    return new Transform(position, rotation);
  }
  this.p = Vec2.zero();
  this.q = Rot.identity();
  if (typeof position !== 'undefined') {
    this.p.set(position);
  }
  if (typeof rotation !== 'undefined') {
    this.q.set(rotation);
  }
};

Transform.clone = function(xf) {
  var obj = Object.create(Transform.prototype);
  obj.p = Vec2.clone(xf.p);
  obj.q = Rot.clone(xf.q);
  return obj;
};

Transform.neo = function(position, rotation) {
  var obj = Object.create(Transform.prototype);
  obj.p = Vec2.clone(position);
  obj.q = Rot.clone(rotation);
  return obj;
};

Transform.identity = function() {
  var obj = Object.create(Transform.prototype);
  obj.p = Vec2.zero();
  obj.q = Rot.identity();
  return obj;
};

/**
 * Set this to the identity transform.
 */
Transform.prototype.setIdentity = function() {
  this.p.setZero();
  this.q.setIdentity();
}

/**
 * Set this based on the position and angle.
 */
Transform.prototype.set = function(a, b) {
  if (typeof b === 'undefined') {
    this.p.set(a.p);
    this.q.set(a.q);
  } else {
    this.p.set(a);
    this.q.set(b);
  }
}

Transform.isValid = function(o) {
  return o && Vec2.isValid(o.p) && Rot.isValid(o.q);
}

Transform.assert = function(o) {
  if (!_ASSERT) return;
  if (!Transform.isValid(o)) {
    _DEBUG && common.debug(o);
    throw new Error('Invalid Transform!');
  }
}

/**
 * @param {Transform} a
 * @param {Vec2} b
 * @returns {Vec2}
 *
 * @param {Transform} a
 * @param {Transform} b
 * @returns {Transform}
 */
Transform.mul = function(a, b) {
  _ASSERT && Transform.assert(a);
  if (Array.isArray(b)) {
    var arr = [];
    for (var i = 0; i < b.length; i++) {
      arr[i] = Transform.mul(a, b[i]);
    }
    return arr;

  } else if ('x' in b && 'y' in b) {
    _ASSERT && Vec2.assert(b);
    var x = (a.q.c * b.x - a.q.s * b.y) + a.p.x;
    var y = (a.q.s * b.x + a.q.c * b.y) + a.p.y;
    return Vec2.neo(x, y);

  } else if ('p' in b && 'q' in b) {
    _ASSERT && Transform.assert(b);
    // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
    // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
    var xf = Transform.identity();
    xf.q = Rot.mulRot(a.q, b.q);
    xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
    return xf;
  }
}

/**
 * @deprecated Use mulFn instead.
 */
Transform.mulAll = function(a, b) {
  _ASSERT && Transform.assert(a);
  var arr = [];
  for (var i = 0; i < b.length; i++) {
    arr[i] = Transform.mul(a, b[i]);
  }
  return arr;
}

/**
 * @experimental
 */
Transform.mulFn = function(a) {
  _ASSERT && Transform.assert(a);
  return function(b) {
    return Transform.mul(a, b);
  };
}

Transform.mulVec2 = function(a, b) {
  _ASSERT && Transform.assert(a);
  _ASSERT && Vec2.assert(b);
  var x = (a.q.c * b.x - a.q.s * b.y) + a.p.x;
  var y = (a.q.s * b.x + a.q.c * b.y) + a.p.y;
  return Vec2.neo(x, y);
}

Transform.mulXf = function(a, b) {
  _ASSERT && Transform.assert(a);
  _ASSERT && Transform.assert(b);
  // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
  // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
  var xf = Transform.identity();
  xf.q = Rot.mulRot(a.q, b.q);
  xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
  return xf;
}

/**
 * @param {Transform} a
 * @param {Vec2} b
 * @returns {Vec2}
 *
 * @param {Transform} a
 * @param {Transform} b
 * @returns {Transform}
 */
Transform.mulT = function(a, b) {
  _ASSERT && Transform.assert(a);
  if ('x' in b && 'y' in b) {
    _ASSERT && Vec2.assert(b)
    var px = b.x - a.p.x;
    var py = b.y - a.p.y;
    var x = (a.q.c * px + a.q.s * py);
    var y = (-a.q.s * px + a.q.c * py);
    return Vec2.neo(x, y);

  } else if ('p' in b && 'q' in b) {
    _ASSERT && Transform.assert(b);
    // v2 = A.q' * (B.q * v1 + B.p - A.p)
    // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
    var xf = Transform.identity();
    xf.q.set(Rot.mulTRot(a.q, b.q));
    xf.p.set(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
    return xf;
  }
}

Transform.mulTVec2 = function(a, b) {
  _ASSERT && Transform.assert(a);
  _ASSERT && Vec2.assert(b)
  var px = b.x - a.p.x;
  var py = b.y - a.p.y;
  var x = (a.q.c * px + a.q.s * py);
  var y = (-a.q.s * px + a.q.c * py);
  return Vec2.neo(x, y);
}

Transform.mulTXf = function(a, b) {
  _ASSERT && Transform.assert(a);
  _ASSERT && Transform.assert(b);
  // v2 = A.q' * (B.q * v1 + B.p - A.p)
  // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
  var xf = Transform.identity();
  xf.q.set(Rot.mulTRot(a.q, b.q));
  xf.p.set(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
  return xf;
}
