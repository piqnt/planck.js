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

module.exports = Sweep;

var common = require('../util/common');
var Math = require('./Math');
var Vec2 = require('./Vec2');
var Rot = require('./Rot');
var Transform = require('./Transform');

/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 * 
 * @prop {Vec2} localCenter Local center of mass position
 * @prop {Vec2} c World center position
 * @prop {float} a World angle
 * @prop {float} alpha0 Fraction of the current time step in the range [0,1], c0
 *       and a0 are c and a at alpha0.
 */
function Sweep(c, a) {
  _ASSERT && common.assert(typeof c === 'undefined');
  _ASSERT && common.assert(typeof a === 'undefined');
  this.localCenter = Vec2.zero();
  this.c = Vec2.zero();
  this.a = 0;
  this.alpha0 = 0;
  this.c0 = Vec2.zero();
  this.a0 = 0;
}

Sweep.prototype.setTransform = function(xf) {
  var c = Transform.mulVec2(xf, this.localCenter);
  this.c.set(c);
  this.c0.set(c);

  this.a = xf.q.getAngle();
  this.a0 = xf.q.getAngle();
};

Sweep.prototype.setLocalCenter = function(localCenter, xf) {
  this.localCenter.set(localCenter);

  var c = Transform.mulVec2(xf, this.localCenter);
  this.c.set(c);
  this.c0.set(c);
};

/**
 * Get the interpolated transform at a specific time.
 * 
 * @param xf
 * @param beta A factor in [0,1], where 0 indicates alpha0
 */
Sweep.prototype.getTransform = function(xf, beta) {
  beta = typeof beta === 'undefined' ? 0 : beta;
  xf.q.setAngle((1.0 - beta) * this.a0 + beta * this.a);
  xf.p.setCombine((1.0 - beta), this.c0, beta, this.c);

  // shift to origin
  xf.p.sub(Rot.mulVec2(xf.q, this.localCenter));
};

/**
 * Advance the sweep forward, yielding a new initial state.
 * 
 * @param {float} alpha The new initial time
 */
Sweep.prototype.advance = function(alpha) {
  _ASSERT && common.assert(this.alpha0 < 1.0);
  var beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
  this.c0.setCombine(beta, this.c, 1 - beta, this.c0);
  this.a0 = beta * this.a + (1 - beta) * this.a0;
  this.alpha0 = alpha;
};

Sweep.prototype.forward = function() {
  this.a0 = this.a;
  this.c0.set(this.c);
};

/**
 * normalize the angles in radians to be between -pi and pi.
 */
Sweep.prototype.normalize = function() {
  var a0 = Math.mod(this.a0, -Math.PI, +Math.PI);
  this.a -= this.a0 - a0;
  this.a0 = a0;
};

Sweep.prototype.clone = function() {
  var clone = new Sweep();
  clone.localCenter.set(this.localCenter);
  clone.alpha0 = this.alpha0;
  clone.a0 = this.a0;
  clone.a = this.a;
  clone.c0.set(this.c0);
  clone.c.set(this.c);
  return clone;
};

Sweep.prototype.set = function(that) {
  this.localCenter.set(that.localCenter);
  this.alpha0 = that.alpha0;
  this.a0 = that.a0;
  this.a = that.a;
  this.c0.set(that.c0);
  this.c.set(that.c);
};
