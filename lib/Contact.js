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

var DEBUG_SOLVER = false;

var common = require('./util/common');

var Math = require('./common/Math');
var Vec2 = require('./common/Vec2');
var Transform = require('./common/Transform');
var Mat22 = require('./common/Mat22');
var Rot = require('./common/Rot');

var Settings = require('./Settings');
var Manifold = require('./Manifold');
var Distance = require('./collision/Distance');

module.exports = Contact;

/**
 * A contact edge is used to connect bodies and contacts together in a contact
 * graph where each body is a node and each contact is an edge. A contact edge
 * belongs to a doubly linked list maintained in each attached body. Each
 * contact has two contact nodes, one for each attached body.
 * 
 * @prop {Contact} contact The contact
 * @prop {ContactEdge} prev The previous contact edge in the body's contact list
 * @prop {ContactEdge} next The next contact edge in the body's contact list
 * @prop {Body} other Provides quick access to the other body attached.
 */
function ContactEdge(contact) {
  this.contact = contact;
  this.prev;
  this.next;
  this.other;
};

/**
 * @function Contact~evaluate
 * 
 * @param manifold
 * @param xfA
 * @param fixtureA
 * @param indexA
 * @param xfB
 * @param fixtureB
 * @param indexB
 */

/**
 * The class manages contact between two shapes. A contact exists for each
 * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
 * object may exist that has no contact points.
 * 
 * @param {Fixture} fA
 * @param {int} indexA
 * @param {Fixture} fB
 * @param {int} indexB
 * @param {Contact~evaluate} evaluateFcn
 */
function Contact(fA, indexA, fB, indexB, evaluateFcn) {
  // Nodes for connecting bodies.
  this.m_nodeA = new ContactEdge(this);
  this.m_nodeB = new ContactEdge(this);

  this.m_fixtureA = fA;
  this.m_fixtureB = fB;

  this.m_indexA = indexA;
  this.m_indexB = indexB;

  this.m_evaluateFcn = evaluateFcn;

  this.m_manifold = new Manifold();

  this.m_prev = null;
  this.m_next = null;

  this.m_toi = 1.0;
  this.m_toiCount = 0;
  // This contact has a valid TOI in m_toi
  this.m_toiFlag = false;

  this.m_friction = mixFriction(this.m_fixtureA.m_friction,
      this.m_fixtureB.m_friction);
  this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution,
      this.m_fixtureB.m_restitution);

  this.m_tangentSpeed = 0.0;

  // This contact can be disabled (by user)
  this.m_enabledFlag = true;

  // Used when crawling contact graph when forming islands.
  this.m_islandFlag = false;

  // Set when the shapes are touching.
  this.m_touchingFlag = false;

  // This contact needs filtering because a fixture filter was changed.
  this.m_filterFlag = false;

  // This bullet contact had a TOI event
  this.m_bulletHitFlag = false;

  this.v_points = []; // VelocityConstraintPoint[maxManifoldPoints]
  this.v_normal = Vec2.zero();
  this.v_normalMass = new Mat22();
  this.v_K = new Mat22();
  this.v_pointCount;

  this.v_tangentSpeed;
  this.v_friction;
  this.v_restitution;

  this.v_invMassA;
  this.v_invMassB;
  this.v_invIA;
  this.v_invIB;

  this.p_localPoints = [] // Vec2[maxManifoldPoints];
  this.p_localNormal = Vec2.zero();
  this.p_localPoint = Vec2.zero();
  this.p_localCenterA = Vec2.zero();
  this.p_localCenterB = Vec2.zero();
  this.p_type; // Manifold.Type
  this.p_radiusA;
  this.p_radiusB;
  this.p_pointCount;

  this.p_invMassA;
  this.p_invMassB;
  this.p_invIA;
  this.p_invIB;
}

Contact.prototype.initConstraint = function(step) {
  var fixtureA = this.m_fixtureA;
  var fixtureB = this.m_fixtureB;

  var shapeA = fixtureA.getShape();
  var shapeB = fixtureB.getShape();

  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  var manifold = this.getManifold();

  var pointCount = manifold.pointCount;
  _ASSERT && common.assert(pointCount > 0);

  this.v_invMassA = bodyA.m_invMass;
  this.v_invMassB = bodyB.m_invMass;
  this.v_invIA = bodyA.m_invI;
  this.v_invIB = bodyB.m_invI;

  this.v_friction = this.m_friction;
  this.v_restitution = this.m_restitution;
  this.v_tangentSpeed = this.m_tangentSpeed;

  this.v_pointCount = pointCount;

  this.v_K.setZero();
  this.v_normalMass.setZero();

  this.p_invMassA = bodyA.m_invMass;
  this.p_invMassB = bodyB.m_invMass;
  this.p_invIA = bodyA.m_invI;
  this.p_invIB = bodyB.m_invI;
  this.p_localCenterA = Vec2.clone(bodyA.m_sweep.localCenter);
  this.p_localCenterB = Vec2.clone(bodyB.m_sweep.localCenter);

  this.p_radiusA = shapeA.m_radius;
  this.p_radiusB = shapeB.m_radius;

  this.p_type = manifold.type;
  this.p_localNormal = Vec2.clone(manifold.localNormal);
  this.p_localPoint = Vec2.clone(manifold.localPoint);
  this.p_pointCount = pointCount;

  for (var j = 0; j < pointCount; ++j) {
    var cp = manifold.points[j]; // ManifoldPoint
    var vcp = this.v_points[j] = new VelocityConstraintPoint();

    if (step.warmStarting) {
      vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
      vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;

    } else {
      vcp.normalImpulse = 0.0;
      vcp.tangentImpulse = 0.0;
    }

    vcp.rA.setZero();
    vcp.rB.setZero();
    vcp.normalMass = 0.0;
    vcp.tangentMass = 0.0;
    vcp.velocityBias = 0.0;

    this.p_localPoints[j] = Vec2.clone(cp.localPoint);

  }
};

/**
 * Get the contact manifold. Do not modify the manifold unless you understand
 * the internals of the library.
 */
Contact.prototype.getManifold = function() {
  return this.m_manifold;
}

/**
 * Get the world manifold.
 * 
 * @param {WorldManifold} [worldManifold]
 */
Contact.prototype.getWorldManifold = function(worldManifold) {
  var bodyA = this.m_fixtureA.getBody();
  var bodyB = this.m_fixtureB.getBody();
  var shapeA = this.m_fixtureA.getShape();
  var shapeB = this.m_fixtureB.getShape();

  return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(),
      shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
}

/**
 * Enable/disable this contact. This can be used inside the pre-solve contact
 * listener. The contact is only disabled for the current time step (or sub-step
 * in continuous collisions).
 */
Contact.prototype.setEnabled = function(flag) {
  this.m_enabledFlag = !!flag;
}

/**
 * Has this contact been disabled?
 */
Contact.prototype.isEnabled = function() {
  return this.m_enabledFlag;
}

/**
 * Is this contact touching?
 */
Contact.prototype.isTouching = function() {
  return this.m_touchingFlag;
}

/**
 * Get the next contact in the world's contact list.
 */
Contact.prototype.getNext = function() {
  return this.m_next;
}

/**
 * Get fixture A in this contact.
 */
Contact.prototype.getFixtureA = function() {
  return this.m_fixtureA;
}

/**
 * Get fixture B in this contact.
 */
Contact.prototype.getFixtureB = function() {
  return this.m_fixtureB;
}

/**
 * Get the child primitive index for fixture A.
 */
Contact.prototype.getChildIndexA = function() {
  return this.m_indexA;
}

/**
 * Get the child primitive index for fixture B.
 */
Contact.prototype.getChildIndexB = function() {
  return this.m_indexB;
}

/**
 * Flag this contact for filtering. Filtering will occur the next time step.
 */
Contact.prototype.flagForFiltering = function() {
  this.m_filterFlag = true;
}

/**
 * Override the default friction mixture. You can call this in
 * ContactListener.preSolve. This value persists until set or reset.
 */
Contact.prototype.setFriction = function(friction) {
  this.m_friction = friction;
}

/**
 * Get the friction.
 */
Contact.prototype.getFriction = function() {
  return this.m_friction;
}

/**
 * Reset the friction mixture to the default value.
 */
Contact.prototype.resetFriction = function() {
  this.m_friction = mixFriction(this.m_fixtureA.m_friction,
      this.m_fixtureB.m_friction);
}

/**
 * Override the default restitution mixture. You can call this in
 * ContactListener.preSolve. The value persists until you set or reset.
 */
Contact.prototype.setRestitution = function(restitution) {
  this.m_restitution = restitution;
}

/**
 * Get the restitution.
 */
Contact.prototype.getRestitution = function() {
  return this.m_restitution;
}

/**
 * Reset the restitution to the default value.
 */
Contact.prototype.resetRestitution = function() {
  this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution,
      this.m_fixtureB.m_restitution);
}

/**
 * Set the desired tangent speed for a conveyor belt behavior. In meters per
 * second.
 */
Contact.prototype.setTangentSpeed = function(speed) {
  this.m_tangentSpeed = speed;
}

/**
 * Get the desired tangent speed. In meters per second.
 */
Contact.prototype.getTangentSpeed = function() {
  return this.m_tangentSpeed;
}

/**
 * Called by Update method, and implemented by subclasses.
 */
Contact.prototype.evaluate = function(manifold, xfA, xfB) {
  this.m_evaluateFcn(manifold, xfA, this.m_fixtureA, this.m_indexA, xfB,
      this.m_fixtureB, this.m_indexB);
};

/**
 * Updates the contact manifold and touching status.
 * 
 * Note: do not assume the fixture AABBs are overlapping or are valid.
 * 
 * @param {function} listener.beginContact
 * @param {function} listener.endContact
 * @param {function} listener.preSolve
 */
Contact.prototype.update = function(listener) {

  // Re-enable this contact.
  this.m_enabledFlag = true;

  var touching = false;
  var wasTouching = this.m_touchingFlag;

  var sensorA = this.m_fixtureA.isSensor();
  var sensorB = this.m_fixtureB.isSensor();
  var sensor = sensorA || sensorB;

  var bodyA = this.m_fixtureA.getBody();
  var bodyB = this.m_fixtureB.getBody();
  var xfA = bodyA.getTransform();
  var xfB = bodyB.getTransform();

  // Is this contact a sensor?
  if (sensor) {
    var shapeA = this.m_fixtureA.getShape();
    var shapeB = this.m_fixtureB.getShape();
    touching = Distance.testOverlap(shapeA, this.m_indexA, shapeB,
        this.m_indexB, xfA, xfB);

    // Sensors don't generate manifolds.
    this.m_manifold.pointCount = 0;
  } else {

    // TODO reuse manifold
    var oldManifold = this.m_manifold;
    this.m_manifold = new Manifold();

    this.evaluate(this.m_manifold, xfA, xfB);
    touching = this.m_manifold.pointCount > 0;

    // Match old contact ids to new contact ids and copy the
    // stored impulses to warm start the solver.
    for (var i = 0; i < this.m_manifold.pointCount; ++i) {
      var nmp = this.m_manifold.points[i];
      nmp.normalImpulse = 0.0;
      nmp.tangentImpulse = 0.0;

      for (var j = 0; j < oldManifold.pointCount; ++j) {
        var omp = oldManifold.points[j];
        if (omp.id.key == nmp.id.key) { // ContactID.key
          nmp.normalImpulse = omp.normalImpulse;
          nmp.tangentImpulse = omp.tangentImpulse;
          break;
        }
      }
    }

    if (touching != wasTouching) {
      bodyA.setAwake(true);
      bodyB.setAwake(true);
    }
  }

  this.m_touchingFlag = touching;

  if (wasTouching == false && touching == true && listener) {
    listener.beginContact(this);
  }

  if (wasTouching == true && touching == false && listener) {
    listener.endContact(this);
  }

  if (sensor == false && touching && listener) {
    listener.preSolve(this, oldManifold);
  }
}

Contact.prototype.solvePositionConstraint = function(step) {
  return this._solvePositionConstraint(step, false);
}

Contact.prototype.solvePositionConstraintTOI = function(step, toiA, toiB) {
  return this._solvePositionConstraint(step, true, toiA, toiB);
}

Contact.prototype._solvePositionConstraint = function(step, toi, toiA, toiB) {

  var fixtureA = this.m_fixtureA;
  var fixtureB = this.m_fixtureB;

  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  var velocityA = bodyA.c_velocity;
  var velocityB = bodyB.c_velocity;
  var positionA = bodyA.c_position;
  var positionB = bodyB.c_position;

  var localCenterA = Vec2.clone(this.p_localCenterA);
  var localCenterB = Vec2.clone(this.p_localCenterB);

  var mA = 0.0;
  var iA = 0.0;
  if (!toi || (bodyA == toiA || bodyA == toiB)) {
    mA = this.p_invMassA;
    iA = this.p_invIA;
  }

  var mB = 0.0;
  var iB = 0.0;
  if (!toi || (bodyB == toiA || bodyB == toiB)) {
    mB = this.p_invMassB;
    iB = this.p_invIB;
  }

  var cA = Vec2.clone(positionA.c);
  var aA = positionA.a;

  var cB = Vec2.clone(positionB.c);
  var aB = positionB.a;

  var minSeparation = 0.0;

  // Solve normal constraints
  for (var j = 0; j < this.p_pointCount; ++j) {
    var xfA = Transform.identity();
    var xfB = Transform.identity();
    xfA.q.set(aA);
    xfB.q.set(aB);
    xfA.p = Vec2.sub(cA, Rot.mulVec2(xfA.q, localCenterA));
    xfB.p = Vec2.sub(cB, Rot.mulVec2(xfB.q, localCenterB));

    // PositionSolverManifold
    var normal, point, separation;
    switch (this.p_type) {
    case Manifold.e_circles:
      var pointA = Transform.mulVec2(xfA, this.p_localPoint);
      var pointB = Transform.mulVec2(xfB, this.p_localPoints[0]);
      normal = Vec2.sub(pointB, pointA);
      normal.normalize();
      point = Vec2.combine(0.5, pointA, 0.5, pointB);
      separation = Vec2.dot(Vec2.sub(pointB, pointA), normal) - this.p_radiusA
          - this.p_radiusB;
      break;

    case Manifold.e_faceA:
      normal = Rot.mulVec2(xfA.q, this.p_localNormal);
      var planePoint = Transform.mulVec2(xfA, this.p_localPoint);
      var clipPoint = Transform.mulVec2(xfB, this.p_localPoints[j]);
      separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal)
          - this.p_radiusA - this.p_radiusB;
      point = clipPoint;
      break;

    case Manifold.e_faceB:
      normal = Rot.mulVec2(xfB.q, this.p_localNormal);
      var planePoint = Transform.mulVec2(xfB, this.p_localPoint);
      var clipPoint = Transform.mulVec2(xfA, this.p_localPoints[j]);
      separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal)
          - this.p_radiusA - this.p_radiusB;
      point = clipPoint;

      // Ensure normal points from A to B
      normal.mul(-1);
      break;
    }

    var rA = Vec2.sub(point, cA);
    var rB = Vec2.sub(point, cB);

    // Track max constraint error.
    minSeparation = Math.min(minSeparation, separation);

    var baumgarte = toi ? Settings.toiBaugarte : Settings.baumgarte;
    var linearSlop = Settings.linearSlop;
    var maxLinearCorrection = Settings.maxLinearCorrection;

    // Prevent large corrections and allow slop.
    var C = Math.clamp(baumgarte * (separation + linearSlop),
        -maxLinearCorrection, 0.0);

    // Compute the effective mass.
    var rnA = Vec2.cross(rA, normal);
    var rnB = Vec2.cross(rB, normal);
    var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;

    // Compute normal impulse
    var impulse = K > 0.0 ? -C / K : 0.0;

    var P = Vec2.mul(impulse, normal);

    cA.subMul(mA, P);
    aA -= iA * Vec2.cross(rA, P);

    cB.addMul(mB, P);
    aB += iB * Vec2.cross(rB, P);
  }

  positionA.c.set(cA);
  positionA.a = aA;

  positionB.c.set(cB);
  positionB.a = aB;

  return minSeparation;
}

// TODO merge with ManifoldPoint
function VelocityConstraintPoint() {
  this.rA = Vec2.zero();
  this.rB = Vec2.zero();
  this.normalImpulse = 0;
  this.tangentImpulse = 0;
  this.normalMass = 0;
  this.tangentMass = 0;
  this.velocityBias = 0;
}

Contact.prototype.initVelocityConstraint = function(step) {
  var fixtureA = this.m_fixtureA;
  var fixtureB = this.m_fixtureB;

  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  var velocityA = bodyA.c_velocity;
  var velocityB = bodyB.c_velocity;

  var positionA = bodyA.c_position;
  var positionB = bodyB.c_position;

  var radiusA = this.p_radiusA;
  var radiusB = this.p_radiusB;
  var manifold = this.getManifold();

  var mA = this.v_invMassA;
  var mB = this.v_invMassB;
  var iA = this.v_invIA;
  var iB = this.v_invIB;
  var localCenterA = Vec2.clone(this.p_localCenterA);
  var localCenterB = Vec2.clone(this.p_localCenterB);

  var cA = Vec2.clone(positionA.c);
  var aA = positionA.a;
  var vA = Vec2.clone(velocityA.v);
  var wA = velocityA.w;

  var cB = Vec2.clone(positionB.c);
  var aB = positionB.a;
  var vB = Vec2.clone(velocityB.v);
  var wB = velocityB.w;

  _ASSERT && common.assert(manifold.pointCount > 0);

  var xfA = Transform.identity();
  var xfB = Transform.identity();
  xfA.q.set(aA);
  xfB.q.set(aB);
  xfA.p.setCombine(1, cA, -1, Rot.mulVec2(xfA.q, localCenterA));
  xfB.p.setCombine(1, cB, -1, Rot.mulVec2(xfB.q, localCenterB));

  var worldManifold = manifold.getWorldManifold(null, xfA, radiusA, xfB, radiusB);

  this.v_normal.set(worldManifold.normal);

  for (var j = 0; j < this.v_pointCount; ++j) {
    var vcp = this.v_points[j]; // VelocityConstraintPoint

    vcp.rA.set(Vec2.sub(worldManifold.points[j], cA));
    vcp.rB.set(Vec2.sub(worldManifold.points[j], cB));

    var rnA = Vec2.cross(vcp.rA, this.v_normal);
    var rnB = Vec2.cross(vcp.rB, this.v_normal);

    var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;

    vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;

    var tangent = Vec2.cross(this.v_normal, 1.0);

    var rtA = Vec2.cross(vcp.rA, tangent);
    var rtB = Vec2.cross(vcp.rB, tangent);

    var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;

    vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;

    // Setup a velocity bias for restitution.
    vcp.velocityBias = 0.0;
    var vRel = Vec2.dot(this.v_normal, vB)
        + Vec2.dot(this.v_normal, Vec2.cross(wB, vcp.rB))
        - Vec2.dot(this.v_normal, vA)
        - Vec2.dot(this.v_normal, Vec2.cross(wA, vcp.rA));
    if (vRel < -Settings.velocityThreshold) {
      vcp.velocityBias = -this.v_restitution * vRel;
    }
  }

  // If we have two points, then prepare the block solver.
  if (this.v_pointCount == 2 && step.blockSolve) {
    var vcp1 = this.v_points[0]; // VelocityConstraintPoint
    var vcp2 = this.v_points[1]; // VelocityConstraintPoint

    var rn1A = Vec2.cross(vcp1.rA, this.v_normal);
    var rn1B = Vec2.cross(vcp1.rB, this.v_normal);
    var rn2A = Vec2.cross(vcp2.rA, this.v_normal);
    var rn2B = Vec2.cross(vcp2.rB, this.v_normal);

    var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
    var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
    var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;

    // Ensure a reasonable condition number.
    var k_maxConditionNumber = 1000.0;
    if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
      // K is safe to invert.
      this.v_K.ex.set(k11, k12);
      this.v_K.ey.set(k12, k22);
      this.v_normalMass.set(this.v_K.getInverse());
    } else {
      // The constraints are redundant, just use one.
      // TODO_ERIN use deepest?
      this.v_pointCount = 1;
    }
  }

  positionA.c.set(cA);
  positionA.a = aA;
  velocityA.v.set(vA);
  velocityA.w = wA;

  positionB.c.set(cB);
  positionB.a = aB;
  velocityB.v.set(vB);
  velocityB.w = wB;
};

Contact.prototype.warmStartConstraint = function(step) {
  var fixtureA = this.m_fixtureA;
  var fixtureB = this.m_fixtureB;

  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  var velocityA = bodyA.c_velocity;
  var velocityB = bodyB.c_velocity;
  var positionA = bodyA.c_position;
  var positionB = bodyB.c_position;

  var mA = this.v_invMassA;
  var iA = this.v_invIA;
  var mB = this.v_invMassB;
  var iB = this.v_invIB;

  var vA = Vec2.clone(velocityA.v);
  var wA = velocityA.w;
  var vB = Vec2.clone(velocityB.v);
  var wB = velocityB.w;

  var normal = this.v_normal;
  var tangent = Vec2.cross(normal, 1.0);

  for (var j = 0; j < this.v_pointCount; ++j) {
    var vcp = this.v_points[j]; // VelocityConstraintPoint

    var P = Vec2.combine(vcp.normalImpulse, normal, vcp.tangentImpulse, tangent);
    wA -= iA * Vec2.cross(vcp.rA, P);
    vA.subMul(mA, P);
    wB += iB * Vec2.cross(vcp.rB, P);
    vB.addMul(mB, P);
  }

  velocityA.v.set(vA);
  velocityA.w = wA;
  velocityB.v.set(vB);
  velocityB.w = wB;
};

Contact.prototype.storeConstraintImpulses = function(step) {
  var manifold = this.m_manifold;
  for (var j = 0; j < this.v_pointCount; ++j) {
    manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
    manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
  }
};

Contact.prototype.solveVelocityConstraint = function(step) {
  var bodyA = this.m_fixtureA.m_body;
  var bodyB = this.m_fixtureB.m_body;

  var velocityA = bodyA.c_velocity;
  var positionA = bodyA.c_position;

  var velocityB = bodyB.c_velocity;
  var positionB = bodyB.c_position;

  var mA = this.v_invMassA;
  var iA = this.v_invIA;
  var mB = this.v_invMassB;
  var iB = this.v_invIB;

  var vA = Vec2.clone(velocityA.v);
  var wA = velocityA.w;
  var vB = Vec2.clone(velocityB.v);
  var wB = velocityB.w;

  var normal = this.v_normal;
  var tangent = Vec2.cross(normal, 1.0);
  var friction = this.v_friction;

  _ASSERT && common.assert(this.v_pointCount == 1 || this.v_pointCount == 2);

  // Solve tangent constraints first because non-penetration is more important
  // than friction.
  for (var j = 0; j < this.v_pointCount; ++j) {
    var vcp = this.v_points[j]; // VelocityConstraintPoint

    // Relative velocity at contact
    var dv = Vec2.zero();
    dv.addCombine(1, vB, 1, Vec2.cross(wB, vcp.rB));
    dv.subCombine(1, vA, 1, Vec2.cross(wA, vcp.rA));

    // Compute tangent force
    var vt = Vec2.dot(dv, tangent) - this.v_tangentSpeed;
    var lambda = vcp.tangentMass * (-vt);

    // Clamp the accumulated force
    var maxFriction = friction * vcp.normalImpulse;
    var newImpulse = Math.clamp(vcp.tangentImpulse + lambda, -maxFriction,
        maxFriction);
    lambda = newImpulse - vcp.tangentImpulse;
    vcp.tangentImpulse = newImpulse;

    // Apply contact impulse
    var P = Vec2.mul(lambda, tangent);

    vA.subMul(mA, P);
    wA -= iA * Vec2.cross(vcp.rA, P);

    vB.addMul(mB, P);
    wB += iB * Vec2.cross(vcp.rB, P);
  }

  // Solve normal constraints
  if (this.v_pointCount == 1 || step.blockSolve == false) {
    for (var i = 0; i < this.v_pointCount; ++i) {
      var vcp = this.v_points[i]; // VelocityConstraintPoint

      // Relative velocity at contact
      var dv = Vec2.zero();
      dv.addCombine(1, vB, 1, Vec2.cross(wB, vcp.rB));
      dv.subCombine(1, vA, 1, Vec2.cross(wA, vcp.rA));

      // Compute normal impulse
      var vn = Vec2.dot(dv, normal);
      var lambda = -vcp.normalMass * (vn - vcp.velocityBias);

      // Clamp the accumulated impulse
      var newImpulse = Math.max(vcp.normalImpulse + lambda, 0.0);
      lambda = newImpulse - vcp.normalImpulse;
      vcp.normalImpulse = newImpulse;

      // Apply contact impulse
      var P = Vec2.mul(lambda, normal);

      vA.subMul(mA, P);
      wA -= iA * Vec2.cross(vcp.rA, P);

      vB.addMul(mB, P);
      wB += iB * Vec2.cross(vcp.rB, P);
    }
  } else {
    // Block solver developed in collaboration with Dirk Gregorius (back in
    // 01/07 on Box2D_Lite).
    // Build the mini LCP for this contact patch
    //
    // vn = A * x + b, vn >= 0, , vn >= 0, x >= 0 and vn_i * x_i = 0 with i =
    // 1..2
    //
    // A = J * W * JT and J = ( -n, -r1 x n, n, r2 x n )
    // b = vn0 - velocityBias
    //
    // The system is solved using the "Total enumeration method" (s. Murty).
    // The complementary constraint vn_i * x_i
    // implies that we must have in any solution either vn_i = 0 or x_i = 0.
    // So for the 2D contact problem the cases
    // vn1 = 0 and vn2 = 0, x1 = 0 and x2 = 0, x1 = 0 and vn2 = 0, x2 = 0 and
    // vn1 = 0 need to be tested. The first valid
    // solution that satisfies the problem is chosen.
    // 
    // In order to account of the accumulated impulse 'a' (because of the
    // iterative nature of the solver which only requires
    // that the accumulated impulse is clamped and not the incremental
    // impulse) we change the impulse variable (x_i).
    //
    // Substitute:
    // 
    // x = a + d
    // 
    // a := old total impulse
    // x := new total impulse
    // d := incremental impulse
    //
    // For the current iteration we extend the formula for the incremental
    // impulse
    // to compute the new total impulse:
    //
    // vn = A * d + b
    // = A * (x - a) + b
    // = A * x + b - A * a
    // = A * x + b'
    // b' = b - A * a;

    var vcp1 = this.v_points[0]; // VelocityConstraintPoint
    var vcp2 = this.v_points[1]; // VelocityConstraintPoint

    var a = Vec2.neo(vcp1.normalImpulse, vcp2.normalImpulse);
    _ASSERT && common.assert(a.x >= 0.0 && a.y >= 0.0);

    // Relative velocity at contact
    var dv1 = Vec2.zero().add(vB).add(Vec2.cross(wB, vcp1.rB)).sub(vA).sub(Vec2.cross(wA, vcp1.rA));
    var dv2 = Vec2.zero().add(vB).add(Vec2.cross(wB, vcp2.rB)).sub(vA).sub(Vec2.cross(wA, vcp2.rA));

    // Compute normal velocity
    var vn1 = Vec2.dot(dv1, normal);
    var vn2 = Vec2.dot(dv2, normal);

    var b = Vec2.neo(vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);

    // Compute b'
    b.sub(Mat22.mulVec2(this.v_K, a));

    var k_errorTol = 1e-3;
    // NOT_USED(k_errorTol);

    for (;;) {
      //
      // Case 1: vn = 0
      //
      // 0 = A * x + b'
      //
      // Solve for x:
      //
      // x = - inv(A) * b'
      //
      var x = Mat22.mulVec2(this.v_normalMass, b).neg();

      if (x.x >= 0.0 && x.y >= 0.0) {
        // Get the incremental impulse
        var d = Vec2.sub(x, a);

        // Apply incremental impulse
        var P1 = Vec2.mul(d.x, normal);
        var P2 = Vec2.mul(d.y, normal);

        vA.subCombine(mA, P1, mA, P2);
        wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));

        vB.addCombine(mB, P1, mB, P2);
        wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));

        // Accumulate
        vcp1.normalImpulse = x.x;
        vcp2.normalImpulse = x.y;

        if (DEBUG_SOLVER) {
          // Postconditions
          dv1 = vB + Vec2.cross(wB, vcp1.rB) - vA - Vec2.cross(wA, vcp1.rA);
          dv2 = vB + Vec2.cross(wB, vcp2.rB) - vA - Vec2.cross(wA, vcp2.rA);

          // Compute normal velocity
          vn1 = Dot(dv1, normal);
          vn2 = Dot(dv2, normal);

          _ASSERT && common.assert(Abs(vn1 - vcp1.velocityBias) < k_errorTol);
          _ASSERT && common.assert(Abs(vn2 - vcp2.velocityBias) < k_errorTol);
        }
        break;
      }

      //
      // Case 2: vn1 = 0 and x2 = 0
      //
      // 0 = a11 * x1 + a12 * 0 + b1'
      // vn2 = a21 * x1 + a22 * 0 + b2'
      //
      x.x = -vcp1.normalMass * b.x;
      x.y = 0.0;
      vn1 = 0.0;
      vn2 = this.v_K.ex.y * x.x + b.y;

      if (x.x >= 0.0 && vn2 >= 0.0) {
        // Get the incremental impulse
        var d = Vec2.sub(x, a);

        // Apply incremental impulse
        var P1 = Vec2.mul(d.x, normal);
        var P2 = Vec2.mul(d.y, normal);
        vA.subCombine(mA, P1, mA, P2);
        wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));

        vB.addCombine(mB, P1, mB, P2);
        wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));

        // Accumulate
        vcp1.normalImpulse = x.x;
        vcp2.normalImpulse = x.y;

        if (DEBUG_SOLVER) {
          // Postconditions
          var dv1B = Vec2.add(vB, Vec2.cross(wB, vcp1.rB));
          var dv1A = Vec2.add(vA, Vec2.cross(wA, vcp1.rA));
          var dv1 = Vec2.sub(dv1B, dv1A);

          // Compute normal velocity
          vn1 = Vec2.dot(dv1, normal);

          _ASSERT && common.assert(Math.abs(vn1 - vcp1.velocityBias) < k_errorTol);
        }
        break;
      }

      //
      // Case 3: vn2 = 0 and x1 = 0
      //
      // vn1 = a11 * 0 + a12 * x2 + b1'
      // 0 = a21 * 0 + a22 * x2 + b2'
      //
      x.x = 0.0;
      x.y = -vcp2.normalMass * b.y;
      vn1 = this.v_K.ey.x * x.y + b.x;
      vn2 = 0.0;

      if (x.y >= 0.0 && vn1 >= 0.0) {
        // Resubstitute for the incremental impulse
        var d = Vec2.sub(x, a);

        // Apply incremental impulse
        var P1 = Vec2.mul(d.x, normal);
        var P2 = Vec2.mul(d.y, normal);
        vA.subCombine(mA, P1, mA, P2);
        wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));

        vB.addCombine(mB, P1, mB, P2);
        wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));

        // Accumulate
        vcp1.normalImpulse = x.x;
        vcp2.normalImpulse = x.y;

        if (DEBUG_SOLVER) {
          // Postconditions
          var dv2B = Vec2.add(vB, Vec2.cross(wB, vcp2.rB));
          var dv2A = Vec2.add(vA, Vec2.cross(wA, vcp2.rA));
          var dv1 = Vec2.sub(dv2B, dv2A);

          // Compute normal velocity
          vn2 = Vec2.dot(dv2, normal);

          _ASSERT && common.assert(Math.abs(vn2 - vcp2.velocityBias) < k_errorTol);
        }
        break;
      }

      //
      // Case 4: x1 = 0 and x2 = 0
      // 
      // vn1 = b1
      // vn2 = b2;
      //
      x.x = 0.0;
      x.y = 0.0;
      vn1 = b.x;
      vn2 = b.y;

      if (vn1 >= 0.0 && vn2 >= 0.0) {
        // Resubstitute for the incremental impulse
        var d = Vec2.sub(x, a);

        // Apply incremental impulse
        var P1 = Vec2.mul(d.x, normal);
        var P2 = Vec2.mul(d.y, normal);
        vA.subCombine(mA, P1, mA, P2);
        wA -= iA * (Vec2.cross(vcp1.rA, P1) + Vec2.cross(vcp2.rA, P2));

        vB.addCombine(mB, P1, mB, P2);
        wB += iB * (Vec2.cross(vcp1.rB, P1) + Vec2.cross(vcp2.rB, P2));

        // Accumulate
        vcp1.normalImpulse = x.x;
        vcp2.normalImpulse = x.y;

        break;
      }

      // No solution, give up. This is hit sometimes, but it doesn't seem to
      // matter.
      break;
    }
  }

  velocityA.v.set(vA);
  velocityA.w = wA;

  velocityB.v.set(vB);
  velocityB.w = wB;
};

/**
 * Friction mixing law. The idea is to allow either fixture to drive the
 * restitution to zero. For example, anything slides on ice.
 */
function mixFriction(friction1, friction2) {
  return Math.sqrt(friction1 * friction2);
}

/**
 * Restitution mixing law. The idea is allow for anything to bounce off an
 * inelastic surface. For example, a superball bounces on anything.
 */
function mixRestitution(restitution1, restitution2) {
  return restitution1 > restitution2 ? restitution1 : restitution2;
}

var s_registers = [];

/**
 * @param fn function(fixtureA, indexA, fixtureB, indexB) Contact
 */
Contact.addType = function(type1, type2, callback) {

  s_registers[type1] = s_registers[type1] || {};
  s_registers[type1][type2] = callback;
}

Contact.create = function(fixtureA, indexA, fixtureB, indexB) {
  var typeA = fixtureA.getType(); // Shape.Type
  var typeB = fixtureB.getType(); // Shape.Type

  // TODO: pool contacts
  var contact, evaluateFcn;
  if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
    contact = new Contact(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
  } else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
    contact = new Contact(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
  } else {
    return null;
  }

  // Contact creation may swap fixtures.
  fixtureA = contact.getFixtureA();
  fixtureB = contact.getFixtureB();
  indexA = contact.getChildIndexA();
  indexB = contact.getChildIndexB();
  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  // Connect to body A
  contact.m_nodeA.contact = contact;
  contact.m_nodeA.other = bodyB;

  contact.m_nodeA.prev = null;
  contact.m_nodeA.next = bodyA.m_contactList;
  if (bodyA.m_contactList != null) {
    bodyA.m_contactList.prev = contact.m_nodeA;
  }
  bodyA.m_contactList = contact.m_nodeA;

  // Connect to body B
  contact.m_nodeB.contact = contact;
  contact.m_nodeB.other = bodyA;

  contact.m_nodeB.prev = null;
  contact.m_nodeB.next = bodyB.m_contactList;
  if (bodyB.m_contactList != null) {
    bodyB.m_contactList.prev = contact.m_nodeB;
  }
  bodyB.m_contactList = contact.m_nodeB;

  // Wake up the bodies
  if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
    bodyA.setAwake(true);
    bodyB.setAwake(true);
  }

  return contact;
}

Contact.destroy = function(contact, listener) {
  var fixtureA = contact.m_fixtureA;
  var fixtureB = contact.m_fixtureB;

  var bodyA = fixtureA.getBody();
  var bodyB = fixtureB.getBody();

  if (contact.isTouching()) {
    listener.endContact(contact);
  }

  // Remove from body 1
  if (contact.m_nodeA.prev) {
    contact.m_nodeA.prev.next = contact.m_nodeA.next;
  }

  if (contact.m_nodeA.next) {
    contact.m_nodeA.next.prev = contact.m_nodeA.prev;
  }

  if (contact.m_nodeA == bodyA.m_contactList) {
    bodyA.m_contactList = contact.m_nodeA.next;
  }

  // Remove from body 2
  if (contact.m_nodeB.prev) {
    contact.m_nodeB.prev.next = contact.m_nodeB.next;
  }

  if (contact.m_nodeB.next) {
    contact.m_nodeB.next.prev = contact.m_nodeB.prev;
  }

  if (contact.m_nodeB == bodyB.m_contactList) {
    bodyB.m_contactList = contact.m_nodeB.next;
  }

  if (contact.m_manifold.pointCount > 0 && fixtureA.isSensor() == false
      && fixtureB.isSensor() == false) {
    bodyA.setAwake(true);
    bodyB.setAwake(true);
  }

  var typeA = fixtureA.getType(); // Shape.Type
  var typeB = fixtureB.getType(); // Shape.Type

  var destroyFcn = s_registers[typeA][typeB].destroyFcn;
  if (typeof destroyFcn === 'function') {
    destroyFcn(contact);
  }
};
