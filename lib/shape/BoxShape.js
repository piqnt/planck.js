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

DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

module.exports = BoxShape;

var common = require('../util/common');
var create = require('../util/create');
var options = require('../util/options');
var Math = require('../common/Math');
var Transform = require('../common/Transform');
var Rot = require('../common/Rot');
var Vec2 = require('../common/Vec2');
var AABB = require('../collision/AABB');
var Settings = require('../Settings');
var PolygonShape = require('./PolygonShape');

BoxShape._super = PolygonShape;
BoxShape.prototype = create(BoxShape._super.prototype);

BoxShape.TYPE = 'polygon';

/**
 * A rectangle polygon which extend PolygonShape.
 */
function BoxShape(hx, hy, center, angle) {
  if (!(this instanceof BoxShape)) {
    return new BoxShape(hx, hy, center, angle);
  }

  BoxShape._super.call(this);

  this.m_vertices[0] = Vec2.neo(-hx, -hy);
  this.m_vertices[1] = Vec2.neo(hx, -hy);
  this.m_vertices[2] = Vec2.neo(hx, hy);
  this.m_vertices[3] = Vec2.neo(-hx, hy);

  this.m_normals[0] = Vec2.neo(0.0, -1.0);
  this.m_normals[1] = Vec2.neo(1.0, 0.0);
  this.m_normals[2] = Vec2.neo(0.0, 1.0);
  this.m_normals[3] = Vec2.neo(-1.0, 0.0);

  this.m_count = 4;

  if (center && ('x' in center) && ('y' in center)) {
    angle = angle || 0;

    this.m_centroid.set(center);

    var xf = Transform.identity();
    xf.p.set(center);
    xf.q.set(angle);

    // Transform vertices and normals.
    for (var i = 0; i < this.m_count; ++i) {
      this.m_vertices[i] = Transform.mul(xf, this.m_vertices[i]);
      this.m_normals[i] = Rot.mul(xf.q, this.m_normals[i]);
    }
  }
}

