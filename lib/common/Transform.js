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
