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

module.exports = Shape;

var Math = require('./common/Math');

/**
 * A shape is used for collision detection. You can create a shape however you
 * like. Shapes used for simulation in World are created automatically when a
 * Fixture is created. Shapes may encapsulate one or more child shapes.
 */
function Shape() {
  this.m_type;
  this.m_radius;
}

Shape.prototype._reset = function() {
};

Shape.prototype._serialize = function() {
  return {};
};

Shape.TYPES = {};

Shape._deserialize = function(data, context, restore) {
  var clazz = Shape.TYPES[data.type];
  return clazz && restore(clazz, data);
};

Shape.isValid = function(shape) {
  return !!shape;
};

Shape.prototype.getRadius = function() {
  return this.m_radius;
};

/**
 * Get the type of this shape. You can use this to down cast to the concrete
 * shape.
 * 
 * @return the shape type.
 */
Shape.prototype.getType = function() {
  return this.m_type;
};

/**
 * @deprecated Shapes should be treated as immutable.
 *
 * clone the concrete shape.
 */
Shape.prototype._clone = function() {
};

/**
 * // Get the number of child primitives.
 */
Shape.prototype.getChildCount = function() {
};

/**
 * Test a point for containment in this shape. This only works for convex
 * shapes.
 * 
 * @param {Transform} xf The shape world transform.
 * @param p A point in world coordinates.
 */
Shape.prototype.testPoint = function(xf, p) {
};

/**
 * Cast a ray against a child shape.
 * 
 * @param {RayCastOutput} output The ray-cast results.
 * @param {RayCastInput} input The ray-cast input parameters.
 * @param {Transform} transform The transform to be applied to the shape.
 * @param childIndex The child shape index
 */
Shape.prototype.rayCast = function(output, input, transform, childIndex) {
};

/**
 * Given a transform, compute the associated axis aligned bounding box for a
 * child shape.
 * 
 * @param {AABB} aabb Returns the axis aligned box.
 * @param {Transform} xf The world transform of the shape.
 * @param childIndex The child shape
 */
Shape.prototype.computeAABB = function(aabb, xf, childIndex) {
};

/**
 * Compute the mass properties of this shape using its dimensions and density.
 * The inertia tensor is computed about the local origin.
 * 
 * @param {MassData} massData Returns the mass data for this shape.
 * @param density The density in kilograms per meter squared.
 */
Shape.prototype.computeMass = function(massData, density) {
};

/**
 * @param {DistanceProxy} proxy
 */
Shape.prototype.computeDistanceProxy = function(proxy) {
};
