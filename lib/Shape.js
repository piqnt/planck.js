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
