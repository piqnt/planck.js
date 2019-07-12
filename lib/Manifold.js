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

var Vec2 = require('./common/Vec2');
var Transform = require('./common/Transform');
var Math = require('./common/Math');
var Rot = require('./common/Rot');

module.exports = Manifold;
module.exports.clipSegmentToLine = clipSegmentToLine;
module.exports.clipVertex = ClipVertex;
module.exports.getPointStates = getPointStates;
module.exports.PointState = PointState;

// Manifold Type
Manifold.e_circles = 0;
Manifold.e_faceA = 1;
Manifold.e_faceB = 2;

// ContactFeature Type
Manifold.e_vertex = 0;
Manifold.e_face = 1;

/**
 * A manifold for two touching convex shapes. Manifolds are created in `evaluate`
 * method of Contact subclasses.
 * 
 * Supported manifold types are e_faceA or e_faceB for clip point versus plane
 * with radius and e_circles point versus point with radius.
 * 
 * We store contacts in this way so that position correction can account for
 * movement, which is critical for continuous physics. All contact scenarios
 * must be expressed in one of these types. This structure is stored across time
 * steps, so we keep it small.
 * 
 * @prop type e_circle, e_faceA, e_faceB
 * @prop localPoint Usage depends on manifold type:<br>
 *       e_circles: the local center of circleA <br>
 *       e_faceA: the center of faceA <br>
 *       e_faceB: the center of faceB
 * @prop localNormal Usage depends on manifold type:<br>
 *       e_circles: not used <br>
 *       e_faceA: the normal on polygonA <br>
 *       e_faceB: the normal on polygonB
 * @prop points The points of contact {ManifoldPoint[]}
 * @prop pointCount The number of manifold points
 */
function Manifold() {
  this.type;
  this.localNormal = Vec2.zero();
  this.localPoint = Vec2.zero();
  this.points = [ new ManifoldPoint(), new ManifoldPoint() ];
  this.pointCount = 0;
};

/**
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * details related to the geometry and dynamics of the contact points.
 * 
 * This structure is stored across time steps, so we keep it small.
 * 
 * Note: impulses are used for internal caching and may not provide reliable
 * contact forces, especially for high speed collisions.
 * 
 * @prop {Vec2} localPoint Usage depends on manifold type:<br>
 *       e_circles: the local center of circleB<br>
 *       e_faceA: the local center of cirlceB or the clip point of polygonB<br>
 *       e_faceB: the clip point of polygonA.
 * @prop normalImpulse The non-penetration impulse
 * @prop tangentImpulse The friction impulse
 * @prop {ContactID} id Uniquely identifies a contact point between two shapes
 *       to facilatate warm starting
 */
function ManifoldPoint() {
  this.localPoint = Vec2.zero();
  this.normalImpulse = 0;
  this.tangentImpulse = 0;
  this.id = new ContactID();
};

/**
 * Contact ids to facilitate warm starting.
 * 
 * @prop {ContactFeature} cf
 * @prop key Used to quickly compare contact ids.
 * 
 */
function ContactID() {
  this.cf = new ContactFeature();
};

Object.defineProperty(ContactID.prototype, 'key', {
  get: function() {
    return this.cf.indexA + this.cf.indexB * 4 + this.cf.typeA * 16 + this.cf.typeB * 64;
  },
  enumerable: true,
  configurable: true
});

ContactID.prototype.set = function(o) {
  // this.key = o.key;
  this.cf.set(o.cf);
};

/**
 * The features that intersect to form the contact point.
 * 
 * @prop indexA Feature index on shapeA
 * @prop indexB Feature index on shapeB
 * @prop typeA The feature type on shapeA
 * @prop typeB The feature type on shapeB
 */
function ContactFeature() {
  this.indexA;
  this.indexB;
  this.typeA;
  this.typeB;
};

ContactFeature.prototype.set = function(o) {
  this.indexA = o.indexA;
  this.indexB = o.indexB;
  this.typeA = o.typeA;
  this.typeB = o.typeB;
};

/**
 * This is used to compute the current state of a contact manifold.
 * 
 * @prop normal World vector pointing from A to B
 * @prop points World contact point (point of intersection)
 * @prop separations A negative value indicates overlap, in meters
 */
function WorldManifold() {
  this.normal;
  this.points = []; // [maxManifoldPoints]
  this.separations = []; // float[maxManifoldPoints]
};

/**
 * Evaluate the manifold with supplied transforms. This assumes modest motion
 * from the original state. This does not change the point count, impulses, etc.
 * The radii must come from the shapes that generated the manifold.
 * 
 * @param {WorldManifold} [wm]
 */
Manifold.prototype.getWorldManifold = function(wm, xfA, radiusA, xfB, radiusB) {
  if (this.pointCount == 0) {
    return;
  }

  wm = wm || new WorldManifold();

  var normal = wm.normal;
  var points = wm.points;
  var separations = wm.separations;

  // TODO: improve
  switch (this.type) {
  case Manifold.e_circles:
    normal = Vec2.neo(1.0, 0.0);
    var pointA = Transform.mulVec2(xfA, this.localPoint);
    var pointB = Transform.mulVec2(xfB, this.points[0].localPoint);
    var dist = Vec2.sub(pointB, pointA);
    if (Vec2.lengthSquared(dist) > Math.EPSILON * Math.EPSILON) {
      normal.set(dist);
      normal.normalize();
    }
    var cA = pointA.clone().addMul(radiusA, normal);
    var cB = pointB.clone().addMul(-radiusB, normal);
    points[0] = Vec2.mid(cA, cB);
    separations[0] = Vec2.dot(Vec2.sub(cB, cA), normal);
    points.length = 1;
    separations.length = 1;
    break;

  case Manifold.e_faceA:
    normal = Rot.mulVec2(xfA.q, this.localNormal);
    var planePoint = Transform.mulVec2(xfA, this.localPoint);

    for (var i = 0; i < this.pointCount; ++i) {
      var clipPoint = Transform.mulVec2(xfB, this.points[i].localPoint);
      var cA = Vec2.clone(clipPoint).addMul(radiusA - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
      var cB = Vec2.clone(clipPoint).subMul(radiusB, normal);
      points[i] = Vec2.mid(cA, cB);
      separations[i] = Vec2.dot(Vec2.sub(cB, cA), normal);
    }
    points.length = this.pointCount;
    separations.length = this.pointCount;
    break;

  case Manifold.e_faceB:
    normal = Rot.mulVec2(xfB.q, this.localNormal);
    var planePoint = Transform.mulVec2(xfB, this.localPoint);

    for (var i = 0; i < this.pointCount; ++i) {
      var clipPoint = Transform.mulVec2(xfA, this.points[i].localPoint);
      var cB = Vec2.combine(1, clipPoint, radiusB - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
      var cA = Vec2.combine(1, clipPoint, -radiusA, normal);
      points[i] = Vec2.mid(cA, cB);
      separations[i] = Vec2.dot(Vec2.sub(cA, cB), normal);
    }
    points.length = this.pointCount;
    separations.length = this.pointCount;
    // Ensure normal points from A to B.
    normal.mul(-1);
    break;
  }

  wm.normal = normal;
  wm.points = points;
  wm.separations = separations;
  return wm;
}

/**
 * This is used for determining the state of contact points.
 * 
 * @prop {0} nullState Point does not exist
 * @prop {1} addState Point was added in the update
 * @prop {2} persistState Point persisted across the update
 * @prop {3} removeState Point was removed in the update
 */
var PointState = {
  // TODO: use constants
  nullState : 0,
  addState : 1,
  persistState : 2,
  removeState : 3
};

/**
 * Compute the point states given two manifolds. The states pertain to the
 * transition from manifold1 to manifold2. So state1 is either persist or remove
 * while state2 is either add or persist.
 * 
 * @param {PointState[Settings.maxManifoldPoints]} state1
 * @param {PointState[Settings.maxManifoldPoints]} state2
 */
function getPointStates(state1, state2, manifold1, manifold2) {
  // for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
  // state1[i] = PointState.nullState;
  // state2[i] = PointState.nullState;
  // }

  // Detect persists and removes.
  for (var i = 0; i < manifold1.pointCount; ++i) {
    var id = manifold1.points[i].id;// ContactID

    state1[i] = PointState.removeState;

    for (var j = 0; j < manifold2.pointCount; ++j) {
      if (manifold2.points[j].id.key == id.key) {
        state1[i] = PointState.persistState;
        break;
      }
    }
  }

  // Detect persists and adds.
  for (var i = 0; i < manifold2.pointCount; ++i) {
    var id = manifold2.points[i].id;// ContactID

    state2[i] = PointState.addState;

    for (var j = 0; j < manifold1.pointCount; ++j) {
      if (manifold1.points[j].id.key == id.key) {
        state2[i] = PointState.persistState;
        break;
      }
    }
  }
}

/**
 * Used for computing contact manifolds.
 * 
 * @prop {Vec2} v
 * @prop {ContactID} id
 */
function ClipVertex() {
  this.v = Vec2.zero();
  this.id = new ContactID();
};

ClipVertex.prototype.set = function(o) {
  this.v.set(o.v);
  this.id.set(o.id);
};

/**
 * Clipping for contact manifolds. Sutherland-Hodgman clipping.
 * 
 * @param {ClipVertex[2]} vOut
 * @param {ClipVertex[2]} vIn
 */
function clipSegmentToLine(vOut, vIn, normal, offset, vertexIndexA) {
  // Start with no output points
  var numOut = 0;

  // Calculate the distance of end points to the line
  var distance0 = Vec2.dot(normal, vIn[0].v) - offset;
  var distance1 = Vec2.dot(normal, vIn[1].v) - offset;

  // If the points are behind the plane
  if (distance0 <= 0.0)
    vOut[numOut++].set(vIn[0]);
  if (distance1 <= 0.0)
    vOut[numOut++].set(vIn[1]);

  // If the points are on different sides of the plane
  if (distance0 * distance1 < 0.0) {
    // Find intersection point of edge and plane
    var interp = distance0 / (distance0 - distance1);
    vOut[numOut].v.setCombine(1 - interp, vIn[0].v, interp, vIn[1].v);

    // VertexA is hitting edgeB.
    vOut[numOut].id.cf.indexA = vertexIndexA;
    vOut[numOut].id.cf.indexB = vIn[0].id.cf.indexB;
    vOut[numOut].id.cf.typeA = Manifold.e_vertex;
    vOut[numOut].id.cf.typeB = Manifold.e_face;
    ++numOut;
  }

  return numOut;
}
