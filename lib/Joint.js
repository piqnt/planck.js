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

module.exports = Joint;

var common = require('./util/common');

/**
 * A joint edge is used to connect bodies and joints together in a joint graph
 * where each body is a node and each joint is an edge. A joint edge belongs to
 * a doubly linked list maintained in each attached body. Each joint has two
 * joint nodes, one for each attached body.
 * 
 * @prop {Body} other provides quick access to the other body attached.
 * @prop {Joint} joint the joint
 * @prop {JointEdge} prev the previous joint edge in the body's joint list
 * @prop {JointEdge} next the next joint edge in the body's joint list
 */
function JointEdge() {
  this.other = null;
  this.joint = null;
  this.prev = null;
  this.next = null;
};

/**
 * @typedef {Object} JointDef
 *
 * Joint definitions are used to construct joints.
 * 
 * @prop userData Use this to attach application specific data to your joints.
 *       void userData;
 * @prop {boolean} collideConnected Set this flag to true if the attached bodies
 *       should collide.
 *
 * @prop {Body} bodyA The first attached body.
 * @prop {Body} bodyB The second attached body.
 */

var DEFAULTS = {
  userData : null,
  collideConnected : false
};

/**
 * The base joint class. Joints are used to constraint two bodies together in
 * various fashions. Some joints also feature limits and motors.
 * 
 * @param {JointDef} def
 */
function Joint(def, bodyA, bodyB) {
  bodyA = def.bodyA || bodyA;
  bodyB = def.bodyB || bodyB;

  _ASSERT && common.assert(bodyA);
  _ASSERT && common.assert(bodyB);
  _ASSERT && common.assert(bodyA != bodyB);

  this.m_type = 'unknown-joint';

  this.m_bodyA = bodyA;
  this.m_bodyB = bodyB;

  this.m_index = 0;
  this.m_collideConnected = !!def.collideConnected;

  this.m_prev = null;
  this.m_next = null;

  this.m_edgeA = new JointEdge();
  this.m_edgeB = new JointEdge();

  this.m_islandFlag = false;
  this.m_userData = def.userData;
};

Joint.TYPES = {};

Joint._deserialize = function(data, context, restore) {
  var clazz = Joint.TYPES[data.type];
  return clazz && restore(clazz, data);
};

/**
 * Short-cut function to determine if either body is inactive.
 * 
 * @returns {boolean}
 */
Joint.prototype.isActive = function() {
  return this.m_bodyA.isActive() && this.m_bodyB.isActive();
}

/**
 * Get the type of the concrete joint.
 * 
 * @returns JointType
 */
Joint.prototype.getType = function() {
  return this.m_type;
}

/**
 * Get the first body attached to this joint.
 * 
 * @returns Body
 */
Joint.prototype.getBodyA = function() {
  return this.m_bodyA;
}

/**
 * Get the second body attached to this joint.
 * 
 * @returns Body
 */
Joint.prototype.getBodyB = function() {
  return this.m_bodyB;
}

/**
 * Get the next joint the world joint list.
 * 
 * @returns Joint
 */
Joint.prototype.getNext = function() {
  return this.m_next;
}

Joint.prototype.getUserData = function() {
  return this.m_userData;
}

Joint.prototype.setUserData = function(data) {
  this.m_userData = data;
}

/**
 * Get collide connected. Note: modifying the collide connect flag won't work
 * correctly because the flag is only checked when fixture AABBs begin to
 * overlap.
 * 
 * @returns {boolean}
 */
Joint.prototype.getCollideConnected = function() {
  return this.m_collideConnected;
};

/**
 * Get the anchor point on bodyA in world coordinates.
 * 
 * @return {Vec2}
 */
Joint.prototype.getAnchorA = function() {
};

/**
 * Get the anchor point on bodyB in world coordinates.
 * 
 * @return {Vec2}
 */
Joint.prototype.getAnchorB = function() {
};

/**
 * Get the reaction force on bodyB at the joint anchor in Newtons.
 * 
 * @param {float} inv_dt
 * @return {Vec2}
 */
Joint.prototype.getReactionForce = function(inv_dt) {
};

/**
 * Get the reaction torque on bodyB in N*m.
 * 
 * @param {float} inv_dt
 * @return {float}
 */
Joint.prototype.getReactionTorque = function(inv_dt) {
};

/**
 * Shift the origin for any points stored in world coordinates.
 * 
 * @param {Vec2} newOrigin
 */
Joint.prototype.shiftOrigin = function(newOrigin) {
};

/**
 */
Joint.prototype.initVelocityConstraints = function(step) {
};

/**
 */
Joint.prototype.solveVelocityConstraints = function(step) {
};

/**
 * This returns true if the position errors are within tolerance.
 */
Joint.prototype.solvePositionConstraints = function(step) {
};