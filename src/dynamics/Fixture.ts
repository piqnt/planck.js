/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../common/Matrix";
import { options } from "../util/options";
import { Vec2Value } from "../common/Vec2";
import { AABB, RayCastInput, RayCastOutput } from "../collision/AABB";
import { Shape, ShapeType } from "../collision/Shape";
import { Body, MassData } from "./Body";
import { BroadPhase } from "../collision/BroadPhase";
import { TransformValue } from "../common/Transform";
import { Style } from "../util/Testbed";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;

/** @internal */ const synchronize_aabb1 = new AABB();
/** @internal */ const synchronize_aabb2 = new AABB();
/** @internal */ const displacement = matrix.vec2(0, 0);

/**
 * A fixture definition is used to create a fixture. This class defines an
 * abstract fixture definition. You can reuse fixture definitions safely.
 */
export interface FixtureOpt {
  userData?: unknown;
  /**
   * The friction coefficient, usually in the range [0,1]
   */
  friction?: number;
  /**
   * The restitution (elasticity) usually in the range [0,1]
   */
  restitution?: number;
  /**
   * The density, usually in kg/m^2
   */
  density?: number;
  /**
   * A sensor shape collects contact information but never generates a collision response.
   */
  isSensor?: boolean;
  /**
   * Zero, positive or negative collision group.
   * Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.
   */
  filterGroupIndex?: number;
  /**
   * Collision category bit or bits that this fixture belongs to.
   * If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.
   */
  filterCategoryBits?: number;
  /**
   * Collision category bit or bits that this fixture accept for collision.
   */
  filterMaskBits?: number;

  /** Styling for dev-tools. */
  style?: Style;
}

export interface FixtureDef extends FixtureOpt {
  shape: Shape;
}

/** @internal */ const FixtureDefDefault: FixtureOpt = {
  userData: null,
  friction: 0.2,
  restitution: 0.0,
  density: 0.0,
  isSensor: false,

  filterGroupIndex: 0,
  filterCategoryBits: 0x0001,
  filterMaskBits: 0xffff,
};

/**
 * This proxy is used internally to connect shape children to the broad-phase.
 */
export class FixtureProxy {
  aabb: AABB;
  fixture: Fixture;
  childIndex: number;
  proxyId: number;
  constructor(fixture: Fixture, childIndex: number) {
    this.aabb = new AABB();
    this.fixture = fixture;
    this.childIndex = childIndex;
    // this.proxyId;
  }
}

/**
 * A fixture is used to attach a shape to a body for collision detection. A
 * fixture inherits its transform from its parent. Fixtures hold additional
 * non-geometric data such as friction, collision filters, etc.
 *
 * To create a new Fixture use {@link Body.createFixture}.
 */
export class Fixture {
  /** @internal */ m_body: Body;
  /** @internal */ m_friction: number;
  /** @internal */ m_restitution: number;
  /** @internal */ m_density: number;
  /** @internal */ m_isSensor: boolean;
  /** @internal */ m_filterGroupIndex: number;
  /** @internal */ m_filterCategoryBits: number;
  /** @internal */ m_filterMaskBits: number;
  /** @internal */ m_shape: Shape;
  /** @internal */ m_next: Fixture | null;
  /** @internal */ m_proxies: FixtureProxy[];
  // 0 indicates inactive state, this is not the same as m_proxies.length
  /** @internal */ m_proxyCount: number;
  /** @internal */ m_userData: unknown;

  /** Styling for dev-tools. */
  style: Style = {};

  /** @hidden @experimental Similar to userData, but used by dev-tools or runtime environment. */
  appData: Record<string, any> = {};

  constructor(body: Body, def: FixtureDef);
  constructor(body: Body, shape: Shape, def?: FixtureOpt);
  constructor(body: Body, shape: Shape, density?: number);
  /** @internal */
  constructor(body: Body, shape?, def?) {
    if (shape.shape) {
      def = shape;
      shape = shape.shape;
    } else if (typeof def === "number") {
      def = { density: def };
    }

    def = options(def, FixtureDefDefault);

    this.m_body = body;

    this.m_friction = def.friction;
    this.m_restitution = def.restitution;
    this.m_density = def.density;
    this.m_isSensor = def.isSensor;

    this.m_filterGroupIndex = def.filterGroupIndex;
    this.m_filterCategoryBits = def.filterCategoryBits;
    this.m_filterMaskBits = def.filterMaskBits;

    // TODO validate shape
    this.m_shape = shape; // .clone();

    this.m_next = null;

    this.m_proxies = [];
    this.m_proxyCount = 0;

    // fixture proxies are created here,
    // but they are activate in when a fixture is added to body
    const childCount = this.m_shape.getChildCount();
    for (let i = 0; i < childCount; ++i) {
      this.m_proxies[i] = new FixtureProxy(this, i);
    }

    this.m_userData = def.userData;

    if (typeof def.style === "object" && def.style !== null) {
      this.style = def.style;
    }
  }

  /** @hidden Re-setup fixture. */
  _reset(): void {
    const body = this.getBody();
    const broadPhase = body.m_world.m_broadPhase;
    this.destroyProxies(broadPhase);
    if (this.m_shape._reset) {
      this.m_shape._reset();
    }
    const childCount = this.m_shape.getChildCount();
    for (let i = 0; i < childCount; ++i) {
      this.m_proxies[i] = new FixtureProxy(this, i);
    }
    this.createProxies(broadPhase, body.m_xf);
    body.resetMassData();
  }

  /** @hidden */
  _serialize(): object {
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
  }

  /** @hidden */
  static _deserialize(data: any, body: any, restore: any): Fixture {
    const shape = restore(Shape, data.shape);
    const fixture = shape && new Fixture(body, shape, data);
    return fixture;
  }

  /**
   * Get the type of the child shape. You can use this to down cast to the
   * concrete shape.
   */
  getType(): ShapeType {
    return this.m_shape.m_type;
  }

  /**
   * Get the child shape. You can modify the child shape, however you should not
   * change the number of vertices because this will crash some collision caching
   * mechanisms. Manipulating the shape may lead to non-physical behavior.
   */
  getShape(): Shape {
    return this.m_shape;
  }

  /**
   * A sensor shape collects contact information but never generates a collision
   * response.
   */
  isSensor(): boolean {
    return this.m_isSensor;
  }

  /**
   * Set if this fixture is a sensor.
   */
  setSensor(sensor: boolean): void {
    if (sensor != this.m_isSensor) {
      this.m_body.setAwake(true);
      this.m_isSensor = sensor;
    }
  }

  // /**
  //  * Get the contact filtering data.
  //  */
  // getFilterData() {
  //   return this.m_filter;
  // }

  /**
   * Get the user data that was assigned in the fixture definition. Use this to
   * store your application specific data.
   */
  getUserData(): unknown {
    return this.m_userData;
  }

  /**
   * Set the user data. Use this to store your application specific data.
   */
  setUserData(data: unknown): void {
    this.m_userData = data;
  }

  /**
   * Get the parent body of this fixture. This is null if the fixture is not
   * attached.
   */
  getBody(): Body {
    return this.m_body;
  }

  /**
   * Get the next fixture in the parent body's fixture list.
   */
  getNext(): Fixture | null {
    return this.m_next;
  }

  /**
   * Get the density of this fixture.
   */
  getDensity(): number {
    return this.m_density;
  }

  /**
   * Set the density of this fixture. This will _not_ automatically adjust the
   * mass of the body. You must call Body.resetMassData to update the body's mass.
   */
  setDensity(density: number): void {
    if (_ASSERT) console.assert(Number.isFinite(density) && density >= 0.0);
    this.m_density = density;
  }

  /**
   * Get the coefficient of friction, usually in the range [0,1].
   */
  getFriction(): number {
    return this.m_friction;
  }

  /**
   * Set the coefficient of friction. This will not change the friction of
   * existing contacts.
   */
  setFriction(friction: number): void {
    this.m_friction = friction;
  }

  /**
   * Get the coefficient of restitution.
   */
  getRestitution(): number {
    return this.m_restitution;
  }

  /**
   * Set the coefficient of restitution. This will not change the restitution of
   * existing contacts.
   */
  setRestitution(restitution: number): void {
    this.m_restitution = restitution;
  }

  /**
   * Test a point in world coordinates for containment in this fixture.
   */
  testPoint(p: Vec2Value): boolean {
    return this.m_shape.testPoint(this.m_body.getTransform(), p);
  }

  /**
   * Cast a ray against this shape.
   */
  rayCast(output: RayCastOutput, input: RayCastInput, childIndex: number): boolean {
    return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
  }

  /**
   * Get the mass data for this fixture. The mass data is based on the density and
   * the shape. The rotational inertia is about the shape's origin. This operation
   * may be expensive.
   */
  getMassData(massData: MassData): void {
    this.m_shape.computeMass(massData, this.m_density);
  }

  /**
   * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
   * more accurate AABB, compute it using the shape and the body transform.
   */
  getAABB(childIndex: number): AABB {
    if (_ASSERT) console.assert(0 <= childIndex && childIndex < this.m_proxies.length);
    return this.m_proxies[childIndex].aabb;
  }

  /**
   * These support body activation/deactivation.
   */
  createProxies(broadPhase: BroadPhase, xf: TransformValue): void {
    if (_ASSERT) console.assert(this.m_proxyCount == 0);

    // Create proxies in the broad-phase.
    this.m_proxyCount = this.m_shape.getChildCount();

    for (let i = 0; i < this.m_proxyCount; ++i) {
      const proxy = this.m_proxies[i];
      this.m_shape.computeAABB(proxy.aabb, xf, i);
      proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
    }
  }

  destroyProxies(broadPhase: BroadPhase): void {
    // Destroy proxies in the broad-phase.
    for (let i = 0; i < this.m_proxyCount; ++i) {
      const proxy = this.m_proxies[i];
      broadPhase.destroyProxy(proxy.proxyId);
      proxy.proxyId = null;
    }

    this.m_proxyCount = 0;
  }

  /**
   * Updates this fixture proxy in broad-phase (with combined AABB of current and
   * next transformation).
   */
  synchronize(broadPhase: BroadPhase, xf1: TransformValue, xf2: TransformValue): void {
    for (let i = 0; i < this.m_proxyCount; ++i) {
      const proxy = this.m_proxies[i];
      // Compute an AABB that covers the swept shape (may miss some rotation
      // effect).
      this.m_shape.computeAABB(synchronize_aabb1, xf1, proxy.childIndex);
      this.m_shape.computeAABB(synchronize_aabb2, xf2, proxy.childIndex);

      proxy.aabb.combine(synchronize_aabb1, synchronize_aabb2);

      matrix.subVec2(displacement, xf2.p, xf1.p);

      broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
    }
  }

  /**
   * Set the contact filtering data. This will not update contacts until the next
   * time step when either parent body is active and awake. This automatically
   * calls refilter.
   */
  setFilterData(filter: { groupIndex: number; categoryBits: number; maskBits: number }): void {
    this.m_filterGroupIndex = filter.groupIndex;
    this.m_filterCategoryBits = filter.categoryBits;
    this.m_filterMaskBits = filter.maskBits;
    this.refilter();
  }

  getFilterGroupIndex(): number {
    return this.m_filterGroupIndex;
  }

  setFilterGroupIndex(groupIndex: number): void {
    this.m_filterGroupIndex = groupIndex;
    this.refilter();
  }

  getFilterCategoryBits(): number {
    return this.m_filterCategoryBits;
  }

  setFilterCategoryBits(categoryBits: number): void {
    this.m_filterCategoryBits = categoryBits;
    this.refilter();
  }

  getFilterMaskBits(): number {
    return this.m_filterMaskBits;
  }

  setFilterMaskBits(maskBits: number): void {
    this.m_filterMaskBits = maskBits;
    this.refilter();
  }

  /**
   * Call this if you want to establish collision that was previously disabled by
   * ContactFilter.
   */
  refilter(): void {
    if (this.m_body == null) {
      return;
    }

    // Flag associated contacts for filtering.
    let edge = this.m_body.getContactList();
    while (edge) {
      const contact = edge.contact;
      const fixtureA = contact.getFixtureA();
      const fixtureB = contact.getFixtureB();
      if (fixtureA == this || fixtureB == this) {
        contact.flagForFiltering();
      }

      edge = edge.next;
    }

    const world = this.m_body.getWorld();

    if (world == null) {
      return;
    }

    // Touch each proxy so that new pairs may be created
    const broadPhase = world.m_broadPhase;
    for (let i = 0; i < this.m_proxyCount; ++i) {
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
   */
  shouldCollide(that: Fixture): boolean {
    if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
      return that.m_filterGroupIndex > 0;
    }

    const collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
    const collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
    const collide = collideA && collideB;
    return collide;
  }
}
