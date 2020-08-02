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

module.exports = Fixture;

var common = require('./util/common');
var options = require('./util/options');

var Math = require('./common/Math');
var Vec2 = require('./common/Vec2');

var AABB = require('./collision/AABB');

var Shape = require('./Shape');

/**
 * @typedef {Object} FixtureDef
 *
 * A fixture definition is used to create a fixture. This class defines an
 * abstract fixture definition. You can reuse fixture definitions safely.
 * 
 * @prop friction The friction coefficient, usually in the range [0,1]
 * @prop restitution The restitution (elasticity) usually in the range [0,1]
 * @prop density The density, usually in kg/m^2
 * @prop isSensor A sensor shape collects contact information but never
 *       generates a collision response
 * @prop userData
 * @prop filterGroupIndex Zero, positive or negative collision group. Fixtures with same positive groupIndex always collide and fixtures with same
 * negative groupIndex never collide.
 * @prop filterCategoryBits Collision category bit or bits that this fixture belongs
 *       to. If groupIndex is zero or not matching, then at least one bit in this fixture
 * categoryBits should match other fixture maskBits and vice versa.
 * @prop filterMaskBits Collision category bit or bits that this fixture accept for
 *       collision.
 */
var FixtureDef = {
  userData : null,
  friction : 0.2,
  restitution : 0.0,
  density : 0.0,
  isSensor : false,

  filterGroupIndex : 0,
  filterCategoryBits : 0x0001,
  filterMaskBits : 0xFFFF
};

/**
 * This proxy is used internally to connect shape children to the broad-phase.
 */
function FixtureProxy(fixture, childIndex) {
  this.aabb = new AABB();
  this.fixture = fixture;
  this.childIndex = childIndex;
  this.proxyId;
};

/**
 * A fixture is used to attach a shape to a body for collision detection. A
 * fixture inherits its transform from its parent. Fixtures hold additional
 * non-geometric data such as friction, collision filters, etc. Fixtures are
 * created via Body.createFixture.
 * 
 * @param {Body} body
 * @param {Shape|FixtureDef} shape Shape of fixture definition.
 * @param {FixtureDef|number} def Fixture definition or number.
 */
function Fixture(body, shape, def) {
  if (shape.shape) {
    def = shape;
    shape = shape.shape;

  } else if (typeof def === 'number') {
    def = {density : def};
  }

  def = options(def, FixtureDef);

  this.m_body = body;

  this.m_friction = def.friction;
  this.m_restitution = def.restitution;
  this.m_density = def.density;
  this.m_isSensor = def.isSensor;

  this.m_filterGroupIndex = def.filterGroupIndex;
  this.m_filterCategoryBits = def.filterCategoryBits;
  this.m_filterMaskBits = def.filterMaskBits;

  // TODO validate shape
  this.m_shape = shape; //.clone();

  this.m_next = null;

  this.m_proxies = [];
  this.m_proxyCount = 0;

  var childCount = this.m_shape.getChildCount();
  for (var i = 0; i < childCount; ++i) {
    this.m_proxies[i] = new FixtureProxy(this, i);
  }

  this.m_userData = def.userData;
};

/**
 * Re-setup fixture.
 * @private
 */
Fixture.prototype._reset = function() {
  var body = this.getBody();
  var broadPhase = body.m_world.m_broadPhase;
  this.destroyProxies(broadPhase);
  if (this.m_shape._reset) {
    this.m_shape._reset();
  }
  var childCount = this.m_shape.getChildCount();
  for (var i = 0; i < childCount; ++i) {
    this.m_proxies[i] = new FixtureProxy(this, i);
  }
  this.createProxies(broadPhase, body.m_xf);
  body.resetMassData();
};

Fixture.prototype._serialize = function() {
  return {
    friction: this.m_friction,
    restitution: this.m_restitution,
    density: this.m_density,
    isSensor: this.m_isSensor,

    filterGroupIndex: this.m_filterGroupIndex,
    filterCategoryBits: this.m_filterCategoryBits,
    filterMaskBits: this.m_filterMaskBits,

    shape: this.m_shape,
  };
};

Fixture._deserialize = function(data, body, restore) {
  var shape = restore(Shape, data.shape);
  var fixture = shape && new Fixture(body, shape, data);
  return fixture;
};

/**
 * Get the type of the child shape. You can use this to down cast to the
 * concrete shape.
 */
Fixture.prototype.getType = function() {
  return this.m_shape.getType();
}

/**
 * Get the child shape. You can modify the child shape, however you should not
 * change the number of vertices because this will crash some collision caching
 * mechanisms. Manipulating the shape may lead to non-physical behavior.
 */
Fixture.prototype.getShape = function() {
  return this.m_shape;
}
/**
 * A sensor shape collects contact information but never generates a collision
 * response.
 */
Fixture.prototype.isSensor = function() {
  return this.m_isSensor;
}

/**
 * Set if this fixture is a sensor.
 */
Fixture.prototype.setSensor = function(sensor) {
  if (sensor != this.m_isSensor) {
    this.m_body.setAwake(true);
    this.m_isSensor = sensor;
  }
}

/**
 * Get the contact filtering data.
 */
// Fixture.prototype.getFilterData = function() {
//   return this.m_filter;
// }

/**
 * Get the user data that was assigned in the fixture definition. Use this to
 * store your application specific data.
 */
Fixture.prototype.getUserData = function() {
  return this.m_userData;
}

/**
 * Set the user data. Use this to store your application specific data.
 */
Fixture.prototype.setUserData = function(data) {
  this.m_userData = data;
}

/**
 * Get the parent body of this fixture. This is null if the fixture is not
 * attached.
 */
Fixture.prototype.getBody = function() {
  return this.m_body;
}

/**
 * Get the next fixture in the parent body's fixture list.
 */
Fixture.prototype.getNext = function() {
  return this.m_next;
}

/**
 * Get the density of this fixture.
 */
Fixture.prototype.getDensity = function() {
  return this.m_density;
}

/**
 * Set the density of this fixture. This will _not_ automatically adjust the
 * mass of the body. You must call Body.resetMassData to update the body's mass.
 */
Fixture.prototype.setDensity = function(density) {
  _ASSERT && common.assert(Math.isFinite(density) && density >= 0.0);
  this.m_density = density;
}

/**
 * Get the coefficient of friction, usually in the range [0,1].
 */
Fixture.prototype.getFriction = function() {
  return this.m_friction;
}

/**
 * Set the coefficient of friction. This will not change the friction of
 * existing contacts.
 */
Fixture.prototype.setFriction = function(friction) {
  this.m_friction = friction;
}

/**
 * Get the coefficient of restitution.
 */
Fixture.prototype.getRestitution = function() {
  return this.m_restitution;
}

/**
 * Set the coefficient of restitution. This will not change the restitution of
 * existing contacts.
 */
Fixture.prototype.setRestitution = function(restitution) {
  this.m_restitution = restitution;
}

/**
 * Test a point in world coordinates for containment in this fixture.
 */
Fixture.prototype.testPoint = function(p) {
  return this.m_shape.testPoint(this.m_body.getTransform(), p);
}

/**
 * Cast a ray against this shape.
 */
Fixture.prototype.rayCast = function(output, input, childIndex) {
  return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
}

/**
 * Get the mass data for this fixture. The mass data is based on the density and
 * the shape. The rotational inertia is about the shape's origin. This operation
 * may be expensive.
 */
Fixture.prototype.getMassData = function(massData) {
  this.m_shape.computeMass(massData, this.m_density);
}

/**
 * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
 * more accurate AABB, compute it using the shape and the body transform.
 */
Fixture.prototype.getAABB = function(childIndex) {
  _ASSERT && common.assert(0 <= childIndex && childIndex < this.m_proxyCount);
  return this.m_proxies[childIndex].aabb;
}

/**
 * These support body activation/deactivation.
 */
Fixture.prototype.createProxies = function(broadPhase, xf) {
  _ASSERT && common.assert(this.m_proxyCount == 0);

  // Create proxies in the broad-phase.
  this.m_proxyCount = this.m_shape.getChildCount();

  for (var i = 0; i < this.m_proxyCount; ++i) {
    var proxy = this.m_proxies[i];
    this.m_shape.computeAABB(proxy.aabb, xf, i);
    proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
  }
}

Fixture.prototype.destroyProxies = function(broadPhase) {
  // Destroy proxies in the broad-phase.
  for (var i = 0; i < this.m_proxyCount; ++i) {
    var proxy = this.m_proxies[i];
    broadPhase.destroyProxy(proxy.proxyId);
    proxy.proxyId = null;
  }

  this.m_proxyCount = 0;
}

/**
 * Updates this fixture proxy in broad-phase (with combined AABB of current and
 * next transformation).
 */
Fixture.prototype.synchronize = function(broadPhase, xf1, xf2) {
  for (var i = 0; i < this.m_proxyCount; ++i) {
    var proxy = this.m_proxies[i];
    // Compute an AABB that covers the swept shape (may miss some rotation
    // effect).
    var aabb1 = new AABB();
    var aabb2 = new AABB();
    this.m_shape.computeAABB(aabb1, xf1, proxy.childIndex);
    this.m_shape.computeAABB(aabb2, xf2, proxy.childIndex);

    proxy.aabb.combine(aabb1, aabb2);

    var displacement = Vec2.sub(xf2.p, xf1.p);

    broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
  }
}

/**
 * Set the contact filtering data. This will not update contacts until the next
 * time step when either parent body is active and awake. This automatically
 * calls refilter.
 */
Fixture.prototype.setFilterData = function(filter) {
  this.m_filterGroupIndex = filter.groupIndex;
  this.m_filterCategoryBits = filter.categoryBits;
  this.m_filterMaskBits = filter.maskBits;
  this.refilter();
}

Fixture.prototype.getFilterGroupIndex = function() {
  return this.m_filterGroupIndex;
}

Fixture.prototype.setFilterGroupIndex = function(groupIndex) {
  return this.m_filterGroupIndex = groupIndex;
}

Fixture.prototype.getFilterCategoryBits = function() {
  return this.m_filterCategoryBits;
}

Fixture.prototype.setFilterCategoryBits = function(categoryBits) {
  this.m_filterCategoryBits = categoryBits;
}

Fixture.prototype.getFilterMaskBits = function() {
  return this.m_filterMaskBits;
}

Fixture.prototype.setFilterMaskBits = function(maskBits) {
  this.m_filterMaskBits = maskBits;
}

/**
 * Call this if you want to establish collision that was previously disabled by
 * ContactFilter.
 */
Fixture.prototype.refilter = function() {
  if (this.m_body == null) {
    return;
  }

  // Flag associated contacts for filtering.
  var edge = this.m_body.getContactList();
  while (edge) {
    var contact = edge.contact;
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();
    if (fixtureA == this || fixtureB == this) {
      contact.flagForFiltering();
    }

    edge = edge.next;
  }

  var world = this.m_body.getWorld();

  if (world == null) {
    return;
  }

  // Touch each proxy so that new pairs may be created
  var broadPhase = world.m_broadPhase;
  for (var i = 0; i < this.m_proxyCount; ++i) {
    broadPhase.touchProxy(this.m_proxies[i].proxyId);
  }
}

/**
 * Implement this method to provide collision filtering, if you want finer
 * control over contact creation.
 * 
 * Return true if contact calculations should be performed between these two
 * fixtures.
 * 
 * Warning: for performance reasons this is only called when the AABBs begin to
 * overlap.
 * 
 * @param {Fixture} fixtureA
 * @param {Fixture} fixtureB
 */
Fixture.prototype.shouldCollide = function(that) {

  if (that.m_filterGroupIndex == this.m_filterGroupIndex && that.m_filterGroupIndex != 0) {
    return that.m_filterGroupIndex > 0;
  }

  var collide = (that.m_filterMaskBits & this.m_filterCategoryBits) != 0
      && (that.m_filterCategoryBits & this.m_filterMaskBits) != 0;
  return collide;
}
