/*
* Copyright (c) 2013 Google, Inc.
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

import Body from '../dynamics/Body';
import Fixture from '../dynamics/Fixture';
import Vec2 from '../common/Vec2';
import { Shape } from '../../dist/planck-with-testbed';
import Transform from '../common/Transform';
import { TimeStep } from '../dynamics/Solver';
import options from '../util/options';
import { b2ParticleColor, b2ParticleHandle, ParticleDef, ParticleDefDefault, ParticleFlag } from './Particle';
import common from '../util/common';
import AABB, { RayCastInput, RayCastOutput } from '../collision/AABB';
import { b2ParticleGroup, b2ParticleGroupDef, b2ParticleGroupFlag, ParticleGroupDefDefault } from './ParticleGroup';
import math from '../common/Math';
import Rot from '../common/Rot';
import Settings from '../Settings';
import World from '../dynamics/World';
import b2GrowableBuffer from '../common/b2GrowableBuffer';
import CircleShape from '../collision/shape/CircleShape';
import ChainShape from '../collision/shape/ChainShape';
import EdgeShape from '../collision/shape/EdgeShape';

/**
 * TODO
 * For now we use assemblyscript just to ensure bitoperations are correct
 * Either use assemblyscript in the future or replace casts by faster methods
 */
import 'assemblyscript/std/portable';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

const {
  linearSlop,
  b2_invalidParticleIndex,
  b2_maxParticleIndex,
  b2_particleStride,
  b2_minParticleWeight,
  b2_maxParticlePressure,
  b2_maxParticleForce,
  b2_maxTriadDistance,
  b2_maxTriadDistanceSquared,
  b2_minParticleSystemBufferCapacity,
  b2_barrierCollisionTime,
} = Settings;

/**
 * Callback function for ray casts, see {@link World.rayCastParticles}.
 *
 * Called for each particle found in the query. You control how the ray
 * cast proceeds by returning a float:
 * return <=0: ignore the remaining particles in this particle system
 * return fraction: ignore particles that are 'fraction' percent farther
 *   along the line from 'point1' to 'point2'. Note that 'point1' and
 *   'point2' are parameters to b2World::RayCast.
 * @param particleSystem the particle system containing the particle
 * @param index the index of the particle in particleSystem
 * @param point the point of intersection bt the ray and the particle
 * @param normal the normal vector at the point of intersection
 * @param fraction percent (0.0~1.0) from 'point0' to 'point1' along the
 *   ray. Note that 'point1' and 'point2' are parameters to
 *   b2World::RayCast.
 * @return <=0 to ignore rest of particle system, fraction to ignore
 * particles that are farther away.
 */
export type ParticleRayCastCallback = (
  particleSystem: b2ParticleSystem,
  index: number,
  point: Vec2,
  normal: Vec2,
  fraction: number
) => number;

/**
 * Called for each particle found in the query AABB. It may return `false` to terminate the query.
 */
export type ParticleAABBQueryCallback = (particleSystem: b2ParticleSystem, index: number) => boolean;

/*#ifndef B2_PARTICLE_SYSTEM_H
#define B2_PARTICLE_SYSTEM_H

#include <Box2D/Common/b2SlabAllocator.h>
#include <Box2D/Common/b2GrowableBuffer.h>
#include <Box2D/Particle/b2Particle.h>
#include <Box2D/Dynamics/b2TimeStep.h>

#ifdef LIQUIDFUN_UNIT_TESTS
#include <gtest/gtest.h>
#endif // LIQUIDFUN_UNIT_TESTS

#if LIQUIDFUN_EXTERNAL_LANGUAGE_API
#include <cstring>
#endif // LIQUIDFUN_EXTERNAL_LANGUAGE_API

class b2World;
class b2Body;
class b2Shape;
class b2ParticleGroup;
class b2BlockAllocator;
class b2StackAllocator;
class b2QueryCallback;
class b2RayCastCallback;
class b2Fixture;
class b2ContactFilter;
class b2ContactListener;
class b2ParticlePairSet;
class FixtureParticleSet;
struct b2ParticleGroupDef;
struct b2Vec2;
struct b2AABB;
struct FindContactInput;
struct FindContactCheck;
*/



// Define LIQUIDFUN_SIMD_TEST_VS_REFERENCE to run both SIMD and reference
// versions, and assert that the results are identical. This is useful when
// modifying one of the functions, to help verify correctness.
// #define LIQUIDFUN_SIMD_TEST_VS_REFERENCE

// For ease of debugging, remove 'inline'. Then, when an assert hits in the
// test-vs-reference functions, you can easily jump the instruction pointer
// to the top of the function to re-run the test.
// #define LIQUIDFUN_SIMD_INLINE inline // TODO


// TODO ok?
const xTruncBits = 12;
const yTruncBits = 12;
const tagBits = 8 * 4; // 8 * sizeof<u32>;
const yOffset = 1 << (yTruncBits - 1);
const yShift = tagBits - yTruncBits;
const xShift = tagBits - yTruncBits - xTruncBits;
const xScale = 1 << xShift;
const xOffset = xScale * (1 << (xTruncBits - 1));
const yMask = u32(((1 << yTruncBits) - 1) << yShift);
const xMask = ~yMask;
const relativeTagRight = 1 << xShift;
const relativeTagBottomLeft = (1 << yShift) + ((~0) << xShift); // TODO cast to u32?

const relativeTagBottomRight = (1 << yShift) + (1 << xShift);


function computeTag(x: f32, y: f32): u32 {
	return (u32(y + yOffset) << yShift) + u32(xScale * x + xOffset);
}

function computeRelativeTag(tag: u32, x: i32, y: i32): u32 {
	return tag + (y << yShift) + (x << xShift);
}

function limitCapacity(capacity: i32, maxCount: i32): i32 {
	return maxCount && capacity > maxCount ? maxCount : capacity;
}

function particleCanBeConnected(flags: u32, group: b2ParticleGroup) {
	return (flags & (ParticleFlag.b2_wallParticle | ParticleFlag.b2_springParticle | ParticleFlag.b2_elasticParticle)) > 0 ||
		(group && (group.getGroupFlags() & b2ParticleGroupFlag.b2_rigidParticleGroup) > 0);
}

function b2ParticleContactIsZombie(contact: b2ParticleContact) {
	return (contact.getFlags() & ParticleFlag.b2_zombieParticle) == ParticleFlag.b2_zombieParticle;
}

// TODO to static member of TypedFixedSetAllocator?
/**
 * Search set for item returning the index of the item if it's found, -1
 * otherwise.
 */
function findItemIndexInFixedSet<T>(set: TypedFixedSetAllocator<T>,
									 item: T): number
{
	if (set.getCount())	{
	/*	const buffer = set.getBuffer();
		const T* last = buffer + set.GetCount();
		const T* found = std::lower_bound( buffer, buffer + set.GetCount(),
											item, T::Compare);
		if( found != last )
		{
			return set.GetIndex( found );
		}*/
    return set.getBuffer().indexOf(item);// TODO ok?
	}
	return -1;
}

function isSignificantForce(force: Vec2): boolean {
	return force.x != 0 || force.y != 0;
}



class b2ParticleContact {
// private:

  /// Indices of the respective particles making contact.
  private indexA: number = 0;
  private indexB: number = 0;

  /**
   * Weight of the contact. A value between 0.0f and 1.0f.
   * 0.0f ==> particles are just barely touching
   * 1.0f ==> particles are perfectly on top of each other
   */
  private weight: number = 0;

  /** The normalized direction from A to B. */
  private normal: Vec2 = Vec2.zero();

  /**
   * The logical sum of the particle behaviors that have been set.
   * See the b2ParticleFlag enum.
   */
  private flags: number = 0;

// public:

  setIndices(a: number, b: number) {
    _ASSERT && common.assert(a <= b2_maxParticleIndex && b <= b2_maxParticleIndex);
    this.indexA = a;
    this.indexB = b;
  }
  setWeight(w: number) {
    this.weight = w;
  }
  setNormal(n: Vec2) {
    this.normal = n;
  }
  setFlags(f: number) {
    this.flags = f;
  }

  getIndexA() {
    return this.indexA;
  }
  getIndexB() {
    return this.indexB;
  }
  getWeight() {
    return this.weight;
  }
  getNormal() {
    return this.normal;
  }
  getFlags() {
    return this.flags;
  }

  static areEqual(lhs: b2ParticleContact, rhs: b2ParticleContact) {
    return lhs.indexA == rhs.indexA
        && lhs.indexB == rhs.indexB
        && lhs.flags == rhs.flags
        && lhs.weight == rhs.weight
        && lhs.normal == rhs.normal;
  }
  static areNotEqual(lhs: b2ParticleContact, rhs: b2ParticleContact) {
    return !b2ParticleContact.areEqual(lhs, rhs);
  }
  // The reciprocal sqrt function differs between SIMD and non-SIMD, but they
  // should create approximately equal results.
  approximatelyEqual(rhs: b2ParticleContact) {
    const MAX_WEIGHT_DIFF = 0.01; // Weight 0 ~ 1, so about 1%
    const MAX_NORMAL_DIFF = 0.01; // Normal length = 1, so 1%
    return this.indexA == rhs.indexA
        && this.indexB == rhs.indexB
        && this.flags == rhs.flags
        && Math.abs(this.weight - rhs.weight) < MAX_WEIGHT_DIFF
        && Vec2.distance(this.normal, rhs.normal) < MAX_NORMAL_DIFF;
  }
}

interface b2ParticleBodyContact {
  /** Index of the particle making contact. */
  index: number;

  /** The body making contact. */
  body: Body;

  /** The specific fixture making contact */
  fixture: Fixture;

  /** Weight of the contact. A value between 0.0f and 1.0f. */
  weight: number;

  /** The normalized direction from the particle to the body. */
  normal: Vec2;

  /** The effective mass used in calculating force. */
  mass: number;
};

/** Connection between two particles */
interface b2ParticlePair {
  /** Indices of the respective particles making pair. */
  indexA: number, indexB: number;

  /** The logical sum of the particle flags. See the b2ParticleFlag enum. */
  flags: number;

  /** The strength of cohesion among the particles. */
  strength: number;

  /** The initial distance of the particles. */
  distance: number;
};

/** Connection between three particles */
interface b2ParticleTriad {
  /** Indices of the respective particles making triad. */
  indexA: number, indexB: number, indexC: number;

  /** The logical sum of the particle flags. See the b2ParticleFlag enum. */
  flags: number;

  /** The strength of cohesion among the particles. */
  strength: number;

  /** Values used for calculation. */
  pa: Vec2, pb: Vec2, pc: Vec2;
  ka: number, kb: number, kc: number, s: number;
};

export interface b2ParticleSystemDef {
  /** Enable strict Particle/Body contact check.
   * See SetStrictContactCheck for details.
   */
  strictContactCheck?: boolean;

  /** Set the particle density.
   * See SetDensity for details.
   */
  density?: number;

  /** Change the particle gravity scale. Adjusts the effect of the global
   * gravity vector on particles. Default value is 1.0f.
   */
  gravityScale?: number;

  /** Particles behave as circles with this radius. In Box2D units. */
  radius?: number;

  /** Set the maximum number of particles.
   * By default, there is no maximum. The particle buffers can continue to
   * grow while b2World's block allocator still has memory.
   * See SetMaxParticleCount for details.
   */
  maxCount?: number;

  /** Increases pressure in response to compression
   * Smaller values allow more compression
   */
  pressureStrength?: number;

  /** Reduces velocity along the collision normal
   * Smaller value reduces less
   */
  dampingStrength?: number;

  /** Restores shape of elastic particle groups
   * Larger values increase elastic particle velocity
   */
  elasticStrength?: number;

  /** Restores length of spring particle groups
   * Larger values increase spring particle velocity
   */
  springStrength?: number;

  /** Reduces relative velocity of viscous particles
   * Larger values slow down viscous particles more
   */
  viscousStrength?: number;

  /** Produces pressure on tensile particles
   * 0~0.2. Larger values increase the amount of surface tension.
   */
  surfaceTensionPressureStrength?: number;

  /** Smoothes outline of tensile particles
   * 0~0.2. Larger values result in rounder, smoother, water-drop-like
   * clusters of particles.
   */
  surfaceTensionNormalStrength?: number;

  /** Produces additional pressure on repulsive particles
   * Larger values repulse more
   * Negative values mean attraction. The range where particles behave
   * stably is about -0.2 to 2.0.
   */
  repulsiveStrength?: number;

  /** Produces repulsion between powder particles
   * Larger values repulse more
   */
  powderStrength?: number;

  /** Pushes particles out of solid particle group
   * Larger values repulse more
   */
  ejectionStrength?: number;

  /** Produces static pressure
   * Larger values increase the pressure on neighboring partilces
   * For a description of static pressure, see
   * http://en.wikipedia.org/wiki/Static_pressure#Static_pressure_in_fluid_dynamics
   */
  staticPressureStrength?: number;

  /** Reduces instability in static pressure calculation
   * Larger values make stabilize static pressure with fewer iterations
   */
  staticPressureRelaxation?: number;

  /** Computes static pressure more precisely
   * See SetStaticPressureIterations for details
   */
  staticPressureIterations?: number;

  /** Determines how fast colors are mixed
   * 1.0f ==> mixed immediately
   * 0.5f ==> mixed half way each simulation step (see b2World::Step())
   */
  colorMixingStrength?: number;

  /** Whether to destroy particles by age when no more particles can be
   * created.  See #b2ParticleSystem::SetDestructionByAge() for
   * more information.
   */
//  destroyByAge?: boolean; // LATER

  /** Granularity of particle lifetimes in seconds.  By default this is
   * set to (1.0f / 60.0f) seconds.  b2ParticleSystem uses a 32-bit signed
   * value to track particle lifetimes so the maximum lifetime of a
   * particle is (2^32 - 1) / (1.0f / lifetimeGranularity) seconds.
   * With the value set to 1/60 the maximum lifetime or age of a particle is
   * 2.27 years.
   */
  lifetimeGranularity?: number;
}

class UserOverridableBuffer<T> {
  data = null as T[] | null;
  userSuppliedCapacity = 0;
};

/** Used for detecting particle contacts */
class Proxy {
  index: number;
  tag: number;
  // static lessThan(a: Proxy, b: Proxy); // TODO maybe we can remove these functions
  // static lessThan(a: number, b: Proxy);
  // static lessThan(a: Proxy, b: number);
  // static lessThan(a: Proxy | number, b: Proxy | number) { // TODO divide for better performance
  //   if (typeof b === 'object') {
  //     if (typeof a === 'object') {
  //       return a.tag < b.tag;
  //     }
  //     return a < b.tag;
  //   }
  //   return (<Proxy>a).tag < b;
  // }
};

/// Class for filtering pairs or triads.
class ConnectionFilter {
/*public:
  virtual ~ConnectionFilter() {}*/
  /**
   * Is the particle necessary for connection?
   * A pair or a triad should contain at least one 'necessary' particle.
   */
  isNecessary(index: number) {
    return true;
  }
  /** An additional condition for creating a pair. */
  shouldCreatePair(a: number, b: number) {
    return true;
  }
  /// An additional condition for creating a triad.
  shouldCreateTriad(a: number, b: number, c: number) {
    return true;
  }
};

/** InsideBoundsEnumerator enumerates all particles inside the given bounds. */
class InsideBoundsEnumerator {
  /// The lower and upper bound of x component in the tag.
  private m_xLower: number;
  private m_xUpper: number;
  /// The lower and upper bound of y component in the tag.
  private m_yLower: number;
  private m_yUpper: number;
  /// The range of proxies.
  private m_first: number;
  private m_last: number;
  // TODO m_proxyBuffer in changelog
  private m_proxyBuffer: b2GrowableBuffer<Proxy>;

  /** Construct an enumerator with bounds of tags and a range of proxies. */
  constructor(
    lower: number, upper: number, proxyBuffer: b2GrowableBuffer<Proxy>,
    first: number, last: number) {
      this.m_xLower = lower & xMask;
      this.m_xUpper = upper & xMask;
      this.m_yLower = lower & yMask;
      this.m_yUpper = upper & yMask;
      this.m_proxyBuffer = proxyBuffer;
      this.m_first = first;
      this.m_last = last;
      _ASSERT && common.assert(this.m_first <= this.m_last);
    }

  /**
   * Get index of the next particle. Returns b2_invalidParticleIndex if
   * there are no more particles.
   */
  getNext(): i32 {
    while (this.m_first < this.m_last) {
      const first = this.m_proxyBuffer.getData()[this.m_first];
      const xTag = first.tag & xMask; // TODO cast to u32?
      if (_ASSERT) {
        const yTag = first.tag & yMask;
        common.assert(yTag >= this.m_yLower);
        common.assert(yTag <= this.m_yUpper);
      }
      if (xTag >= this.m_xLower && xTag <= this.m_xUpper) {
        return this.m_proxyBuffer.getData()[this.m_first++].index;
      }
      this.m_first++;
    }
    return b2_invalidParticleIndex;
  }
};

/** Node of linked lists of connected particles */
interface ParticleListNode {
  /** The head of the list. */
  list: ParticleListNode;
  /** The next node in the list. */
  next: ParticleListNode;
  /**
   * Number of entries in the list. Valid only for the node at the head
   * of the list.
   */
  count: number;
  /** Particle index. */
  index: number;
};

/**
 * This functor is passed to std::remove_if in RemoveSpuriousBodyContacts
 * to implement the algorithm described there.  It was hoisted out and friended
 * as it would not compile with g++ 4.6.3 as a local class.  It is only used in
 * that function.
 */
// class b2ParticleBodyContactRemovePredicate { // LATER
//   /**
//    * Max number of contacts processed per particle, from nearest to farthest.
//    * This must be at least 2 for correctness with concave shapes; 3 was
//    * experimentally arrived at as looking reasonable.
//    */
// 	private static k_maxContactsPerPoint = 3;
// 	private m_system: b2ParticleSystem;
// 	/** Index of last particle processed. */
// 	private m_lastIndex;
// 	/** Number of contacts processed for the current particle. */
// 	private m_currentContacts: number;
// 	/** Output the number of discarded contacts. */
// 	int32* m_discarded;

// 	constructor(system: b2ParticleSystem,
// 										 int32* discarded) {
//     this.m_system = system;
//     this.m_lastIndex = -1;
//     this.m_currentContacts = 0;
//     this.m_discarded = discarded;
//   }

// 	cb(contact: b2ParticleBodyContact) {
// 		// This implements the selection criteria described in
// 		// RemoveSpuriousBodyContacts().
// 		// This functor is iterating through a list of Body contacts per
// 		// Particle, ordered from near to far.  For up to the maximum number of
// 		// contacts we allow per point per step, we verify that the contact
// 		// normal of the Body that genenerated the contact makes physical sense
// 		// by projecting a point back along that normal and seeing if it
// 		// intersects the fixture generating the contact.

// 		if (contact.index != this.m_lastIndex)
// 		{
// 			this.m_currentContacts = // 0;
// 			this.m_lastIndex = contact.index;
// 		}

// 		if (this.m_currentContacts++ > b2ParticleBodyContactRemovePredicate.k_maxContactsPerPoint)
// 		{
// 			++(*this.m_discarded);
// 			return true;
// 		}

// 		// Project along inverse normal (as returned in the contact) to get the
// 		// point to check.
// 		let n = contact.normal;
// 		// weight is 1-(inv(diameter) * distance)
// 		n = Vec2.mul(n, this.m_system.m_particleDiameter * (1 - contact.weight));
// 		const pos = Vec2.add(this.m_system.m_positionBuffer.data[contact.index], n);

// 		// pos is now a point projected back along the contact normal to the
// 		// contact distance. If the surface makes sense for a contact, pos will
// 		// now lie on or in the fixture generating
// 		if (!contact.fixture.testPoint(pos)) {
// 			const childCount = contact.fixture.getShape().getChildCount();
// 			for (let childIndex = 0; childIndex < childCount; childIndex++) {
// 				const normal = new Vec2();
// 				const distance = contact.fixture.computeDistance(pos, normal,
// 																	childIndex);
// 				if (distance < linearSlop) {
// 					return false;
// 				}
// 			}
// 			++(*m_discarded);
// 			return true;
// 		}

// 		return false;
// 	}
// };

/** Compares the expiration time of two particle indices. */
class ExpirationTimeComparator {
  private m_expirationTimes: number[];

	// Initialize the class with a pointer to an array of particle
	// lifetimes.
	constructor(expirationTimes: number[]) {
		this.m_expirationTimes = expirationTimes
  }
	// Empty destructor.
	// ~ExpirationTimeComparator() { }

	// Compare the lifetime of particleIndexA and particleIndexB
	// returning true if the lifetime of A is greater than B for particles
	// that will expire.  If either particle's lifetime is infinite (<= 0.0f)
	// this function return true if the lifetime of A is lesser than B.
	// When used with std::sort() this results in an array of particle
	// indicies sorted in reverse order by particle lifetime.
	// For example, the set of lifetimes
	// (1.0, 0.7, 0.3, 0.0, -1.0, -2.0)
	// would be sorted as
	// (0.0, -1.0, -2.0, 1.0, 0.7, 0.3)
	cb(particleIndexA: number, particleIndexB: number) {
		const expirationTimeA = this.m_expirationTimes[particleIndexA];
		const expirationTimeB = this.m_expirationTimes[particleIndexB];
		const infiniteExpirationTimeA = expirationTimeA <= 0.0;
		const infiniteExpirationTimeB = expirationTimeB <= 0.0;
		return infiniteExpirationTimeA == infiniteExpirationTimeB ?
			expirationTimeA > expirationTimeB : infiniteExpirationTimeA;
	}

};

/** *Very* lightweight pair implementation. */
class LightweightPair<A, B> {
	first: A;
	second: B;

	/**
   * Compares the value of two FixtureParticle objects returning
   * true if left is a smaller value than right.
   */
	static Compare<A, B>(left: LightweightPair<A, B>,	right: LightweightPair<A, B>)
	{
		return left.first < right.first && // TODO does not work for A=Fixture
			left.second < right.second;
	}

};

// TODO we can probably remove this later (and remove this all with Sets), but lets keep it for now
/** Allocator for a fixed set of items. */
class FixedSetAllocator {
	/** Set buffer. */
	m_buffer: any[]; // TODO ok?
	/**
   * Array of size m_count which indicates whether an item is in the
   * corresponding index of m_set (1) or the item is invalid (0).
   */
	m_valid: number[]; // TOOD was int8*, but boolean should be enough
	/** Number of items in m_set. */
	private m_count: number;
	// Allocator used to allocate / free the set.
//  m_allocator: b2StackAllocator;

	/** Associate a memory allocator with this object. */
	constructor(/* allocator: b2StackAllocator */) {
    // b2Assert(allocator);
    this.m_buffer = null;
    this.m_valid = null;
    this.m_count = 0;
//    this.m_allocator = allocator;
  }
	// Deallocate storage for this class.
/*	~FixedSetAllocator()
	{
		Clear();
	}*/

	/** Allocate internal storage for this object returning the size. */
	allocate(/*itemSize: number,*/ count: number): number {
    this.clear();
    if (count) {
      this.m_buffer = new Array(count); // TODO probably not performant
      _ASSERT && common.assert(!!this.m_buffer);
      this.m_valid = new Array(count).fill(1);
      this.m_count = count;
    }
    return this.m_count;
  }

	/** Deallocate the internal buffer if it's allocated. */
	clear(): void {
    if (this.m_buffer) {
      this.m_buffer = null;
      this.m_valid = null;
      this.m_count = 0;
    }
  }

	/** Get the number of items in the set. */
	getCount() {
    return this.m_count;
  }

	/** Invalidate an item from the set by index. */
	invalidate(itemIndex: number) {
		_ASSERT && common.assert(!!this.m_valid);
		this.m_valid[itemIndex] = 0;
	}

	/** Get the buffer which indicates whether items are valid in the set. */
	getValidBuffer() {
    return this.m_valid;
  }

	/** Get the internal buffer. */
	protected getBuffer() {
    return this.m_buffer;
  }

	/** Reduce the number of items in the set. */
	protected setCount(count: number) {
		_ASSERT && common.assert(count <= this.m_count);
		this.m_count = count;
	}

}

/** Allocator for a fixed set of objects. */
class TypedFixedSetAllocator<T> extends FixedSetAllocator {
//public:
/*	// Initialize members of this class.
	TypedFixedSetAllocator(b2StackAllocator* allocator) :
		FixedSetAllocator(allocator) { }*/

	/** Allocate a set of objects, returning the new size of the set. */
	allocate(numberOfObjects: number)	{
		this.clear(); // TODO useless in JS
		return super.allocate(/*sizeof(T),*/ numberOfObjects);
	}

	/**
   * Get the index of an item in the set if it's valid return an index
   * >= 0, -1 otherwise.
   */
	getIndex(item: T) {
		if (item)	{
/*			b2Assert(item >= GetBuffer() &&
					 item < GetBuffer() + GetCount()); // TODO
			const int32 index =
				(int32)(((uint8*)item - (uint8*)GetBuffer()) /
						sizeof(*item));*/
      const index = this.getBuffer().indexOf(item); // TODO too slow, find better solution for JS
			if (this.getValidBuffer()[index]) { // TODO we currently assume the element is in the buffer
				return index;
			}
		}
		return -1;
	}

	/** Get the internal buffer. */
	getBuffer(): T[] {
		return super.getBuffer();
	}
};

/** Associates a fixture with a particle index. */
type FixtureParticle = LightweightPair<Fixture, number>; // TODO LightweightPair<b2Fixture*,int32>

/** Associates a fixture with a particle index. */
type ParticlePair = LightweightPair<number, number>;

//}  // namespace

/** Set of fixture / particle indices. */
class FixtureParticleSet extends TypedFixedSetAllocator<FixtureParticle> {
/*public:
	// Initialize members of this class.
	FixtureParticleSet(b2StackAllocator* allocator) :
		TypedFixedSetAllocator<FixtureParticle>(allocator) { }
*/

	/**
   * Initialize from a set of particle / body contacts for particles
   * that have the b2_fixtureContactListenerParticle flag set.
   */
	initialize(bodyContacts: b2ParticleBodyContact[],
					numBodyContacts: number,
					particleFlagsBuffer: number[])
  {
    this.clear();
    if (this.allocate(numBodyContacts)) { // TODO set default values
      const set = this.getBuffer();
      let insertedContacts = 0;
      for (let i = 0; i < numBodyContacts; ++i) {
        const fixtureParticle = set[i];
        const bodyContact = bodyContacts[i];
        if (bodyContact.index == b2_invalidParticleIndex ||
          !(particleFlagsBuffer[bodyContact.index] &
            ParticleFlag.b2_fixtureContactListenerParticle)) {
          continue;
        }
        fixtureParticle.first = bodyContact.fixture;
        fixtureParticle.second = bodyContact.index;
        insertedContacts++;
      }
      this.setCount(insertedContacts);
      // std::sort(set, set + insertedContacts, FixtureParticle::Compare); // TODO this is a optimization we currently can't apply because we can't compare Fixture pointers
    }
  }

	/**
   * Find the index of a particle / fixture pair in the set or -1
   * if it's not present.
   * NOTE: This was not written as a template function to avoid
   * exposing any dependencies via this header.
   */
	find(fixtureParticle: FixtureParticle) {
    return findItemIndexInFixedSet(this, fixtureParticle);
  }
};

// Set of particle / particle pairs.
// class b2ParticlePairSet extends TypedFixedSetAllocator<ParticlePair> { // LATER
// /*public:
// 	// Initialize members of this class.
// 	b2ParticlePairSet(b2StackAllocator* allocator) :
// 		TypedFixedSetAllocator<ParticlePair>(allocator) { }
// */
// 	/** Initialize from a set of particle contacts. */
// 	initialize(contacts: b2ParticleContact[],
// 					numContacts: number,
// 					particleFlagsBuffer: number[])
//   {
//     this.clear();
//     if (this.allocate(numContacts)) {
//       const set = this.getBuffer();
//       let insertedContacts = 0;
//       for (let i = 0; i < numContacts; ++i) {
//         const pair = set[i];
//         const contact = contacts[i];
//         if (contact.getIndexA() == b2_invalidParticleIndex ||
//           contact.getIndexB() == b2_invalidParticleIndex ||
//           !((particleFlagsBuffer[contact.getIndexA()] |
//               particleFlagsBuffer[contact.getIndexB()]) &
//               ParticleFlag.b2_particleContactListenerParticle)) {
//           continue;
//         }
//         pair.first = contact.getIndexA();
//         pair.second = contact.getIndexB();
//         insertedContacts++;
//       }
//       this.setCount(insertedContacts);
//       std::sort(set, set + insertedContacts, ParticlePair::Compare);// TODO array.proptotye.sort expects number, not boolean
//     }
//   }

// 	/**
//    * Find the index of a particle pair in the set or -1
//    * if it's not present.
//    * NOTE: This was not written as a template function to avoid
//    * exposing any dependencies via this header.
//    */
// 	find(pair: ParticlePair) {
//     let index = findItemIndexInFixedSet(this, pair);
//     if (index < 0) {
//       const swapped = new LightweightPair<number, number>();
//       swapped.first = pair.second;
//       swapped.second = pair.first;
//       index = findItemIndexInFixedSet(this, swapped);
//     }
//     return index;
//   }
// };

// function b2ParticleContactRemovePredicate(
//   system: b2ParticleSystem,
//   contactFilter: b2ContactFilter
// ) {
//   return (contact: b2ParticleContact) => {
//     return (contact.getFlags() & ParticleFlag.b2_particleContactFilterParticle)
// 	        && !contactFilter.shouldCollide(system, contact.getIndexA(),
// 	        								   contact.getIndexB());
//   }
// }

/*class b2ParticleContactRemovePredicate
{
public:
	b2ParticleContactRemovePredicate(
		b2ParticleSystem* system,
		b2ContactFilter* contactFilter) :
		m_system(system),
		m_contactFilter(contactFilter)
	{}

	bool operator()(const b2ParticleContact& contact)
	{
	    return (contact.GetFlags() & b2_particleContactFilterParticle)
	        && !m_contactFilter->ShouldCollide(m_system, contact.GetIndexA(),
	        								   contact.GetIndexB());
	}

private:
	b2ParticleSystem* m_system;
	b2ContactFilter* m_contactFilter;
};*/

// TODO callbacks are just functions in planck, but this callback combines multiple functions
// TODO find some better solution in JS, for now just use classes
/// Callback class to receive pairs of fixtures and particles which may be
/// overlapping. Used as an argument of b2World::QueryAABB.
abstract class b2FixtureParticleQueryCallback { // TODO extends b2QueryCallback

  protected m_system: b2ParticleSystem;

	constructor(system: b2ParticleSystem)	{
		this.m_system = system;
	}

	// Skip reporting particles.
	shouldQueryParticleSystem(system: b2ParticleSystem): boolean {
		return false;
	}

	// Receive a fixture and call ReportFixtureAndParticle() for each particle
	// inside aabb of the fixture.
	reportFixture(fixture: Fixture): boolean {
		if (fixture.isSensor())	{
			return true;
		}
		const shape = fixture.getShape();
		const childCount = shape.getChildCount();
		for (let childIndex = 0; childIndex < childCount; childIndex++) {
			const aabb = fixture.getAABB(childIndex);
			const enumerator = this.m_system.getInsideBoundsEnumerator(aabb);
			let index: number;
			while ((index = enumerator.getNext()) >= 0) {
				this.reportFixtureAndParticle(fixture, childIndex, index);
			}
		}
		return true;
	}

	// Receive a fixture and a particle which may be overlapping.
	abstract reportFixtureAndParticle(
						fixture: Fixture, childIndex: number, index: number): void;

}

// TODO remove later
const std = {
  // TODO buffer is sorted, use log(n) algorithm
  lower_bound_buffer(buffer: b2GrowableBuffer<Proxy>, value: number) {
    const index = buffer.getData().findIndex(proxy => proxy.tag >= value)
    if(index == -1) {
      return buffer.end();
    }
    return index;
  },
  upper_bound_buffer(buffer: b2GrowableBuffer<Proxy>, value: number) {
    const index = buffer.getData().findIndex(proxy => proxy.tag > value)
    if(index == -1) {
      return buffer.end();
    }
    return index;
  },
}

const b2ParticleSystemDefDefault: b2ParticleSystemDef = {
  strictContactCheck: false,
  density: 1.0,
  gravityScale: 1.0,
  radius: 1.0,
  maxCount: 0,

  // Initialize physical coefficients to the maximum values that
  // maintain numerical stability.
  pressureStrength: 0.05,
  dampingStrength: 1.0,
  elasticStrength: 0.25,
  springStrength: 0.25,
  viscousStrength: 0.25,
  surfaceTensionPressureStrength: 0.2,
  surfaceTensionNormalStrength: 0.2,
  repulsiveStrength: 1.0,
  powderStrength: 0.5,
  ejectionStrength: 0.5,
  staticPressureStrength: 0.2,
  staticPressureRelaxation: 0.2,
  staticPressureIterations: 8,
  colorMixingStrength: 0.5,
//  destroyByAge: true, // LATER
  lifetimeGranularity: 1.0 / 60.0,
};

export default class b2ParticleSystem {
  /** @internal */ m_paused: boolean;
  /** @internal */ m_timestamp: number;
  /** @internal */ m_allParticleFlags: number;
  /** @internal */ m_needsUpdateAllParticleFlags: boolean;
  /** @internal */ m_allGroupFlags: number;
  /** @internal */ m_needsUpdateAllGroupFlags: boolean;
  /** @internal */ m_hasForce: boolean;
  /** @internal */ m_iterationIndex: number;
  /** @internal */ m_inverseDensity: number;
  /** @internal */ m_particleDiameter: number;
  /** @internal */ m_inverseDiameter: number;
  /** @internal */ m_squaredDiameter: number;

  /** @internal */ m_count: number;
  /** @internal */ m_internalAllocatedCapacity: number;
  /// Allocator for b2ParticleHandle instances.
  /** @internal */ m_handleAllocator: b2SlabAllocator<b2ParticleHandle>; // TODO
  /// Maps particle indicies to  handles.
  /** @internal */ m_handleIndexBuffer: UserOverridableBuffer<b2ParticleHandle>; // TODO
  /** @internal */ m_flagsBuffer: UserOverridableBuffer<number>;
  /** @internal */ m_positionBuffer: UserOverridableBuffer<Vec2>;
  /** @internal */ m_velocityBuffer: UserOverridableBuffer<Vec2>;
  /** @internal */ m_forceBuffer: Vec2[];
  /// m_weightBuffer is populated in ComputeWeight and used in
  /// ComputeDepth(), SolveStaticPressure() and SolvePressure().
  /** @internal */ m_weightBuffer: number[];
  /// When any particles have the flag b2_staticPressureParticle,
  /// m_staticPressureBuffer is first allocated and used in
  /// SolveStaticPressure() and SolvePressure().  It will be reallocated on
  /// subsequent CreateParticle() calls.
  /** @internal */ m_staticPressureBuffer: number[];
  /// m_accumulationBuffer is used in many functions as a temporary buffer
  /// for scalar values.
  /** @internal */ m_accumulationBuffer: number[];
  /// When any particles have the flag b2_tensileParticle,
  /// m_accumulation2Buffer is first allocated and used in SolveTensile()
  /// as a temporary buffer for vector values.  It will be reallocated on
  /// subsequent CreateParticle() calls.
  /** @internal */ m_accumulation2Buffer: Vec2[];
  /// When any particle groups have the flag b2_solidParticleGroup,
  /// m_depthBuffer is first allocated and populated in ComputeDepth() and
  /// used in SolveSolid(). It will be reallocated on subsequent
  /// CreateParticle() calls.
  /** @internal */ m_depthBuffer: number[];
  /** @internal */ m_colorBuffer: UserOverridableBuffer<b2ParticleColor>;
  /** @internal */ m_groupBuffer: b2ParticleGroup[]; // TODO ok? was b2ParticleGroup**
  /** @internal */ m_userDataBuffer: UserOverridableBuffer<any>;

  /// Stuck particle detection parameters and record keeping
  /** @internal */ m_stuckThreshold: number;
  /** @internal */ m_lastBodyContactStepBuffer: UserOverridableBuffer<number>;
  /** @internal */ m_bodyContactCountBuffer: UserOverridableBuffer<number>;
  /** @internal */ m_consecutiveContactStepsBuffer: UserOverridableBuffer<number>;
  /** @internal */ m_stuckParticleBuffer: b2GrowableBuffer<i32>;
  /** @internal */ m_proxyBuffer: b2GrowableBuffer<Proxy>;
  /** @internal */ m_contactBuffer: b2GrowableBuffer<b2ParticleContact>;
  /** @internal */ m_bodyContactBuffer: b2GrowableBuffer<b2ParticleBodyContact>;
  /** @internal */ m_pairBuffer: b2GrowableBuffer<b2ParticlePair>;
  /** @internal */ m_triadBuffer: b2GrowableBuffer<b2ParticleTriad>;

  /**
   * @internal
   * Time each particle should be destroyed relative to the last time
   * m_timeElapsed was initialized.  Each unit of time corresponds to
   * b2ParticleSystemDef::lifetimeGranularity seconds.
   */
//  m_expirationTimeBuffer: UserOverridableBuffer<int32>; // LATER
  /**
   * @internal
   * List of particle indices sorted by expiration time.
   */
  m_indexByExpirationTimeBuffer: UserOverridableBuffer<i32>;
  /// Time elapsed in 32:32 fixed point.  Each non-fractional unit of time
  /// corresponds to b2ParticleSystemDef::lifetimeGranularity seconds.
//  int64 m_timeElapsed: number; // LATER TODO was int64, is JS number enough?
  /// Whether the expiration time buffer has been modified and needs to be
  /// resorted.
//  /** @internal */ m_expirationTimeBufferRequiresSorting: boolean; // LATER

  /** @internal */ m_groupCount: number;
  /** @internal */ m_groupList: b2ParticleGroup;

  /** @internal */ m_def: b2ParticleSystemDef;

  /** @internal */ m_world: World;
  /** @internal */ m_prev: b2ParticleSystem;
  /** @internal */ m_next: b2ParticleSystem;

  constructor(def: b2ParticleSystemDef, world: World) {
    def = options(def, b2ParticleSystemDefDefault);

    m_handleAllocator(b2_minParticleSystemBufferCapacity), // TODO
    this.m_stuckParticleBuffer = new b2GrowableBuffer();
    this.m_proxyBuffer = new b2GrowableBuffer();
    this.m_contactBuffer = new b2GrowableBuffer();
    this.m_bodyContactBuffer = new b2GrowableBuffer();
    this.m_pairBuffer = new b2GrowableBuffer();
    this.m_triadBuffer = new b2GrowableBuffer();

    _ASSERT && common.assert(!!def);
    this.m_paused = false;
    this.m_timestamp = 0;
    this.m_allParticleFlags = 0;
    this.m_needsUpdateAllParticleFlags = false;
    this.m_allGroupFlags = 0;
    this.m_needsUpdateAllGroupFlags = false;
    this.m_hasForce = false;
    this.m_iterationIndex = 0;

    this.setStrictContactCheck(def.strictContactCheck);
    this.setDensity(def.density);
    this.setGravityScale(def.gravityScale);
    this.setRadius(def.radius);
    this.setMaxParticleCount(def.maxCount);

    this.m_count = 0;
    this.m_internalAllocatedCapacity = 0;
    this.m_forceBuffer = null;
    this.m_weightBuffer = null;
    this.m_staticPressureBuffer = null;
    this.m_accumulationBuffer = null;
    this.m_accumulation2Buffer = null;
    this.m_depthBuffer = null;
    this.m_groupBuffer = null;

    this.m_groupCount = 0;
    this.m_groupList = null;

    _ASSERT && common.assert(def.lifetimeGranularity > 0.0);
    this.m_def = def;

    this.m_world = world;

    this.m_stuckThreshold = 0;

//    this.m_timeElapsed = 0; // LATER
//    this.m_expirationTimeBufferRequiresSorting = false; // LATER

//    this.setDestructionByAge(this.m_def.destroyByAge); // LATER
  }
  
/* TODO
  ~b2ParticleSystem()
  {
    while (m_groupList)
    {
      DestroyParticleGroup(m_groupList);
    }
  
    FreeUserOverridableBuffer(&m_handleIndexBuffer);
    FreeUserOverridableBuffer(&m_flagsBuffer);
    FreeUserOverridableBuffer(&m_lastBodyContactStepBuffer);
    FreeUserOverridableBuffer(&m_bodyContactCountBuffer);
    FreeUserOverridableBuffer(&m_consecutiveContactStepsBuffer);
    FreeUserOverridableBuffer(&m_positionBuffer);
    FreeUserOverridableBuffer(&m_velocityBuffer);
    FreeUserOverridableBuffer(&m_colorBuffer);
    FreeUserOverridableBuffer(&m_userDataBuffer);
    FreeUserOverridableBuffer(&m_expirationTimeBuffer);
    FreeUserOverridableBuffer(&m_indexByExpirationTimeBuffer);
    FreeBuffer(&m_forceBuffer, m_internalAllocatedCapacity);
    FreeBuffer(&m_weightBuffer, m_internalAllocatedCapacity);
    FreeBuffer(&m_staticPressureBuffer, m_internalAllocatedCapacity);
    FreeBuffer(&m_accumulationBuffer, m_internalAllocatedCapacity);
    FreeBuffer(&m_accumulation2Buffer, m_internalAllocatedCapacity);
    FreeBuffer(&m_depthBuffer, m_internalAllocatedCapacity);
    FreeBuffer(&m_groupBuffer, m_internalAllocatedCapacity);
  }*/

// public:
  /**
   * Create a particle whose properties have been defined.
   * No reference to the definition is retained.
   * A simulation step must occur before it's possible to interact with a
   * newly created particle.  For example, DestroyParticleInShape() will
   * not destroy a particle until b2World::Step() has been called.
   * @warning This function is locked during callbacks.
   * @return the index of the particle.
   */
  createParticle(def: ParticleDef) {
    def = options(def, ParticleDefDefault);

    _ASSERT && common.assert(this.m_world.isLocked() == false);
    if (this.m_world.isLocked()) {
      return 0;
    }

    if (this.m_count >= this.m_internalAllocatedCapacity) {
      // Double the particle capacity.
      const capacity =
        this.m_count ? 2 * this.m_count : b2_minParticleSystemBufferCapacity;
      ReallocateInternalAllocatedBuffers(capacity); // TODO
    }
    if (this.m_count >= this.m_internalAllocatedCapacity) {
      // If the oldest particle should be destroyed...
/*      if (this.m_def.destroyByAge) { // LATER
        this.destroyOldestParticle(0, false);
        // Need to destroy this particle *now* so that it's possible to
        // create a new particle.
        this.solveZombie();
      } else {*/
        return b2_invalidParticleIndex; // TODO_google
//      }
    }
    const index = this.m_count++;
    this.m_flagsBuffer.data[index] = 0;
    if (this.m_lastBodyContactStepBuffer.data) {
      this.m_lastBodyContactStepBuffer.data[index] = 0;
    }
    if (this.m_bodyContactCountBuffer.data) {
      this.m_bodyContactCountBuffer.data[index] = 0;
    }
    if (this.m_consecutiveContactStepsBuffer.data) {
      this.m_consecutiveContactStepsBuffer.data[index] = 0;
    }
    this.m_positionBuffer.data[index] = def.position;
    this.m_velocityBuffer.data[index] = def.velocity;
    this.m_weightBuffer[index] = 0;
    this.m_forceBuffer[index] = Vec2.zero();
    if (this.m_staticPressureBuffer) {
      this.m_staticPressureBuffer[index] = 0;
    }
    if (this.m_depthBuffer) {
      this.m_depthBuffer[index] = 0;
    }
    if (this.m_colorBuffer.data || !def.color.isZero()) {
      this.m_colorBuffer.data = RequestBuffer(this.m_colorBuffer.data);
      this.m_colorBuffer.data[index] = def.color;
    }
    if (this.m_userDataBuffer.data || def.userData) {
      this.m_userDataBuffer.data= RequestBuffer(this.m_userDataBuffer.data);
      this.m_userDataBuffer.data[index] = def.userData;
    }
    if (this.m_handleIndexBuffer.data) {
      this.m_handleIndexBuffer.data[index] = null;
    }
    const proxy = this.m_proxyBuffer.Append();

    // If particle lifetimes are enabled or the lifetime is set in the particle
    // definition, initialize the lifetime.
/*    const finiteLifetime = def.lifetime > 0; // LATER
    if (this.m_expirationTimeBuffer.data || finiteLifetime) {
      this.setParticleLifetime(index, finiteLifetime ? def.lifetime :
                  this.expirationTimeToLifetime(
                    -this.getQuantizedTimeElapsed()));
      // Add a reference to the newly added particle to the end of the
      // queue.
      this.m_indexByExpirationTimeBuffer.data[index] = index;
    }*/

    proxy.index = index;
    const group = def.group;
    this.m_groupBuffer[index] = group;
    if (group) {
      if (group.m_firstIndex < group.m_lastIndex) {
        // Move particles in the group just before the new particle.
        this.rotateBuffer(group.m_firstIndex, group.m_lastIndex, index);
        _ASSERT && common.assert(group.m_lastIndex == index);
        // Update the index range of the group to contain the new particle.
        group.m_lastIndex = index + 1;
      } else {
        // If the group is empty, reset the index range to contain only the
        // new particle.
        group.m_firstIndex = index;
        group.m_lastIndex = index + 1;
      }
    }
    this.setParticleFlags(index, def.flags);
    return index;
  }

  /**
   * Retrieve a handle to the particle at the specified index.
   * Please see #b2ParticleHandle for why you might want a handle.
   */
  getParticleHandleFromIndex(index: number): b2ParticleHandle {
    _ASSERT && common.assert(index >= 0 && index < this.getParticleCount() &&
         index != b2_invalidParticleIndex);
    this.m_handleIndexBuffer.data = RequestBuffer(this.m_handleIndexBuffer.data); // TODO
    let handle = this.m_handleIndexBuffer.data[index];
    if (handle) {
      return handle;
    }
    // Create a handle.
    handle = this.m_handleAllocator.Allocate(); // TODO
    _ASSERT && common.assert(!!handle);
    handle.setIndex(index);
    this.m_handleIndexBuffer.data[index] = handle;
    return handle;
  }

  /**
   * Destroy a particle.
   * The particle is removed after the next step.
   * @param index Index of the particle to destroy.
   * @param callDestructionListener Whether to call the destruction listener just before the
   * particle is destroyed.
   */
  destroyParticle(index: number, callDestructionListener = false) {
    let flags = ParticleFlag.b2_zombieParticle;
    if (callDestructionListener) {
      flags |= ParticleFlag.b2_destructionListenerParticle;
    }
    this.setParticleFlags(index, this.m_flagsBuffer.data[index] | flags);
  }

  /**
   * Destroy the Nth oldest particle in the system.
   * The particle is removed after the next b2World::Step().
   * @param index Index of the Nth oldest particle to destroy, 0 will destroy the
   * oldest particle in the system, 1 will destroy the next oldest
   * particle etc.
   * @param callDestructionListener Whether to call the destruction listener just before the
   * particle is destroyed.
   */
/*  destroyOldestParticle(index: number, callDestructionListener: boolean) { // LATER
    const particleCount = this.getParticleCount();
    _ASSERT && common.assert(index >= 0 && index < particleCount);
    // Make sure particle lifetime tracking is enabled.
    _ASSERT && common.assert(this.m_indexByExpirationTimeBuffer.data);
    // Destroy the oldest particle (preferring to destroy finite
    // lifetime particles first) to free a slot in the buffer.
    const oldestFiniteLifetimeParticle =
      this.m_indexByExpirationTimeBuffer.data[particleCount - (index + 1)];
    const oldestInfiniteLifetimeParticle =
      this.m_indexByExpirationTimeBuffer.data[index];
    this.destroyParticle(
      this.m_expirationTimeBuffer.data[oldestFiniteLifetimeParticle] > 0.0 ?
        oldestFiniteLifetimeParticle : oldestInfiniteLifetimeParticle,
      callDestructionListener);
  }*/

  /**
   * Destroy particles inside a shape.
   * This function is locked during callbacks.
   * In addition, this function immediately destroys particles in the shape
   * in constrast to DestroyParticle() which defers the destruction until
   * the next simulation step.
   * @param shape Shape which encloses particles that should be destroyed.
   * @param xf Transform applied to the shape.
   * @param callDestructionListener Whether to call the world b2DestructionListener for each
   * particle destroyed.
   * @warning This function is locked during callbacks.
   * @return Number of particles destroyed.
   */
/*  destroyParticlesInShape(shape: Shape, xf: Transform, // LATER
                  callDestructionListener = false) {
    _ASSERT && common.assert(this.m_world.isLocked() == false);
    if (this.m_world.isLocked()) {
      return 0;
    }
  
    class DestroyParticlesInShapeCallback extends b2QueryCallback {
      private m_system: b2ParticleSystem;
      private m_shape: Shape;
      private m_xf: Transform;
      private m_callDestructionListener: boolean;
      private m_destroyed: number;
//    public:
      constructor(
        system: b2ParticleSystem, shape: Shape,
        xf: Transform, callDestructionListener: boolean)
      {
        this.m_system = system;
        this.m_shape = shape;
        this.m_xf = xf;
        this.m_callDestructionListener = callDestructionListener;
        this.m_destroyed = 0;
      }
  
      reportFixture(fixture: Fixture) {
        return false;
      }
  
      reportParticle(particleSystem: b2ParticleSystem, index: number) {
        if (particleSystem != this.m_system)
          return false;
  
        _ASSERT && common.assert(index >=0 && index < this.m_system.m_count);
        if (this.m_shape.testPoint(this.m_xf,
                     this.m_system.m_positionBuffer.data[index])) {
          this.m_system.destroyParticle(index, this.m_callDestructionListener);
          this.m_destroyed++;
        }
        return true;
      }
  
      destroyed() {
        return this.m_destroyed;
      }
    }
    const callback = new DestroyParticlesInShapeCallback(this, shape, xf, callDestructionListener);
    const aabb = new AABB();
    shape.computeAABB(aabb, xf, 0);
    this.m_world.queryAABB(callback, aabb);
    return callback.destroyed();
  }*/

  /**
   * Create a particle group whose properties have been defined. No
   * reference to the definition is retained.
   * @warning This function is locked during callbacks.
   */
  createParticleGroup(groupDef: b2ParticleGroupDef): b2ParticleGroup {
    groupDef = options(groupDef, ParticleGroupDefDefault)

    _ASSERT && common.assert(this.m_world.isLocked() == false);
    if (this.m_world.isLocked()) {
      return null;
    }
  
    const transform = new Transform(groupDef.position, groupDef.angle);
    const firstIndex = this.m_count;
    if (groupDef.shape) {
      this.createParticlesWithShapeForGroup(groupDef.shape, groupDef, transform);
    }
    // if (groupDef.shapes) { // LATER
    //   this.createParticlesWithShapesForGroup(
    //         groupDef.shapes, groupDef.shapeCount, groupDef, transform);
    // }
    if (groupDef.particleCount) {
      _ASSERT && common.assert(!!groupDef.positionData);
      for (let i = 0; i < groupDef.particleCount; i++) {
        const p = groupDef.positionData[i];
        this.createParticleForGroup(groupDef, transform, p);
      }
    }
    const lastIndex = this.m_count;

    let group = new b2ParticleGroup();
    group.m_system = this;
    group.m_firstIndex = firstIndex;
    group.m_lastIndex = lastIndex;
    group.m_strength = groupDef.strength;
    group.m_userData = groupDef.userData;
    group.m_transform = transform;
    group.m_prev = null;
    group.m_next = this.m_groupList;
    if (this.m_groupList) {
      this.m_groupList.m_prev = group;
    }
    this.m_groupList = group;
    ++this.m_groupCount;
    for (let i = firstIndex; i < lastIndex; i++) {
      this.m_groupBuffer[i] = group;
    }
    this.setGroupFlags(group, groupDef.groupFlags);
  
    // Create pairs and triads between particles in the group.
    const filter = new ConnectionFilter();
    this.updateContacts(true);
    this.updatePairsAndTriads(firstIndex, lastIndex, filter);
  
    if (groupDef.group) {
      this.joinParticleGroups(groupDef.group, group);
      group = groupDef.group;
    }
  
    return group;
  }


  /// Join two particle groups.
  /// @param the first group. Expands to encompass the second group.
  /// @param the second group. It is destroyed.
  /// @warning This function is locked during callbacks.
/*  joinParticleGroups(groupA: b2ParticleGroup, groupB: b2ParticleGroup) { TODO
    b2Assert(m_world->IsLocked() == false);
    if (m_world->IsLocked())
    {
      return;
    }
  
    b2Assert(groupA != groupB);
    RotateBuffer(groupB->m_firstIndex, groupB->m_lastIndex, m_count);
    b2Assert(groupB->m_lastIndex == m_count);
    RotateBuffer(groupA->m_firstIndex, groupA->m_lastIndex,
           groupB->m_firstIndex);
    b2Assert(groupA->m_lastIndex == groupB->m_firstIndex);
  
    // Create pairs and triads connecting groupA and groupB.
    class JoinParticleGroupsFilter// : public ConnectionFilter
    {
      bool ShouldCreatePair(int32 a, int32 b) const
      {
        return
          (a < m_threshold && m_threshold <= b) ||
          (b < m_threshold && m_threshold <= a);
      }
      bool ShouldCreateTriad(int32 a, int32 b, int32 c) const
      {
        return
          (a < m_threshold || b < m_threshold || c < m_threshold) &&
          (m_threshold <= a || m_threshold <= b || m_threshold <= c);
      }
      int32 m_threshold;
//    public:
      JoinParticleGroupsFilter(int32 threshold)
      {
        m_threshold = threshold;
      }
    } filter(groupB->m_firstIndex);
    UpdateContacts(true);
    UpdatePairsAndTriads(groupA->m_firstIndex, groupB->m_lastIndex, filter);
  
    for (int32 i = groupB->m_firstIndex; i < groupB->m_lastIndex; i++)
    {
      m_groupBuffer[i] = groupA;
    }
    uint32 groupFlags = groupA->m_groupFlags | groupB->m_groupFlags;
    SetGroupFlags(groupA, groupFlags);
    groupA->m_lastIndex = groupB->m_lastIndex;
    groupB->m_firstIndex = groupB->m_lastIndex;
    DestroyParticleGroup(groupB);
  }
*/
  /**
   * Split particle group into multiple disconnected groups.
   * @param group the group to be split.
   * @warning This function is locked during callbacks.
   */
  splitParticleGroup(group: b2ParticleGroup) {
    this.updateContacts(true);
    const particleCount = group.getParticleCount();
    // We create several linked lists. Each list represents a set of connected
    // particles.
/*    ParticleListNode* nodeBuffer =
      (ParticleListNode*) m_world->m_stackAllocator.Allocate(
                    sizeof(ParticleListNode) * particleCount);*/
    const nodeBuffer = new Array(particleCount); // TODO we can probably let InitializeParticleLists directly create and return the buffer
    b2ParticleSystem.initializeParticleLists(group, nodeBuffer);
    this.mergeParticleListsInContact(group, nodeBuffer);
    const survivingList = b2ParticleSystem.findLongestParticleList(group, nodeBuffer);
    this.mergeZombieParticleListNodes(group, nodeBuffer, survivingList);
    this.createParticleGroupsFromParticleList(group, nodeBuffer, survivingList);
    this.updatePairsAndTriadsWithParticleList(group, nodeBuffer);
//    m_world->m_stackAllocator.Free(nodeBuffer);
  }

  /**
   * Get the world particle group list. With the returned group, use
   * b2ParticleGroup::GetNext to get the next group in the world list.
   * A NULL group indicates the end of the list.
   * @return the head of the world particle group list.
   */
  getParticleGroupList(): b2ParticleGroup {
    return this.m_groupList;
  }

  /** Get the number of particle groups. */
  getParticleGroupCount() {
    return this.m_groupCount;
  }

  /** Get the number of particles. */
  getParticleCount() {
    return this.m_count;
  }

  /** Get the maximum number of particles. */
  getMaxParticleCount() {
    return this.m_def.maxCount;
  }

  /**
   * Set the maximum number of particles.
   * A value of 0 means there is no maximum. The particle buffers can
   * continue to grow while b2World's block allocator still has memory.
   * Note: If you try to CreateParticle() with more than this count,
   * b2_invalidParticleIndex is returned unless
   * SetDestructionByAge() is used to enable the destruction of the
   * oldest particles in the system.
   */
  setMaxParticleCount(count: number) {
    _ASSERT && common.assert(this.m_count <= count);
    this.m_def.maxCount = count;
  }

  /** Get all existing particle flags. */
  getAllParticleFlags() {
    return this.m_allParticleFlags;
  }

  /** Get all existing particle group flags. */
  getAllGroupFlags() {
    return this.m_allGroupFlags;
  }

  /**
   * Pause or unpause the particle system. When paused, b2World::Step()
   * skips over this particle system. All b2ParticleSystem function calls
   * still work.
   * @param paused is true to pause, false to un-pause.
   */
  setPaused(paused: boolean) {
    this.m_paused = paused;
  }

  /**
   * @return true if the particle system is being updated in
   * b2World::Step().
   * Initially, true, then, the last value passed into SetPaused().
   */
  getPaused() {
    return this.m_paused;
  }

  /**
   * Change the particle density.
   * Particle density affects the mass of the particles, which in turn
   * affects how the particles interact with b2Bodies. Note that the density
   * does not affect how the particles interact with each other.
   */
  setDensity(density: number) {
    this.m_def.density = density;
    this.m_inverseDensity =  1 / this.m_def.density;
  }

  /** Get the particle density. */
  getDensity() {
    return this.m_def.density;
  }

  /**
   * Change the particle gravity scale. Adjusts the effect of the global
   * gravity vector on particles.
   */
  setGravityScale(gravityScale: number) {
    this.m_def.gravityScale = gravityScale;
  }

  /** Get the particle gravity scale. */
  getGravityScale() {
    return this.m_def.gravityScale;
  }

  /**
   * Damping is used to reduce the velocity of particles. The damping
   * parameter can be larger than 1.0f but the damping effect becomes
   * sensitive to the time step when the damping parameter is large.
   */
  setDamping(damping: number) {
    this.m_def.dampingStrength = damping;
  }

  /** Get damping for particles */
  getDamping() {
    return this.m_def.dampingStrength;
  }

  /**
   * Change the number of iterations when calculating the static pressure of
   * particles. By default, 8 iterations. You can reduce the number of
   * iterations down to 1 in some situations, but this may cause
   * instabilities when many particles come together. If you see particles
   * popping away from each other like popcorn, you may have to increase the
   * number of iterations.
   * For a description of static pressure, see
   * http://en.wikipedia.org/wiki/Static_pressure#Static_pressure_in_fluid_dynamics
   */
  setStaticPressureIterations(iterations: number) {
    this.m_def.staticPressureIterations = iterations;
  }

  /** Get the number of iterations for static pressure of particles. */
  getStaticPressureIterations() {
    return this.m_def.staticPressureIterations;
  }

  /**
   * Change the particle radius.
   * You should set this only once, on world start.
   * If you change the radius during execution, existing particles may
   * explode, shrink, or behave unexpectedly.
   */
  setRadius(radius: number) {
    this.m_particleDiameter = 2 * radius;
    this.m_squaredDiameter = this.m_particleDiameter * this.m_particleDiameter;
    this.m_inverseDiameter = 1 / this.m_particleDiameter;
  }

  /** Get the particle radius. */
  getRadius() {
    return this.m_particleDiameter / 2;
  }

  /**
   * Get the position of each particle
   * Array is length GetParticleCount()
   * @return the pointer to the head of the particle positions array.
   */
  getPositionBuffer() {
    return this.m_positionBuffer.data;
  }

  /**
   * Get the velocity of each particle
   * Array is length GetParticleCount()
   * @return the pointer to the head of the particle velocities array.
   */
  getVelocityBuffer() {
    return this.m_velocityBuffer.data;
  }
/* TODO
  /// Get the color of each particle
  /// Array is length GetParticleCount()
  /// @return the pointer to the head of the particle colors array.
  getColorBuffer() {
  return ((b2ParticleSystem*) this)->GetColorBuffer();
  }
  b2ParticleColor* b2ParticleSystem::GetColorBuffer()
{
	m_colorBuffer.data = RequestBuffer(m_colorBuffer.data);
	return m_colorBuffer.data;
}*/

  /**
   * Get the particle-group of each particle.
   * Array is length GetParticleCount()
   * @return the pointer to the head of the particle group array.
   */
  getGroupBuffer() {
    return this.m_groupBuffer;
  }

  /**
   * Get the weight of each particle
   * Array is length GetParticleCount()
   * @return the pointer to the head of the particle positions array.
   */
  getWeightBuffer() {
    return this.m_weightBuffer;
  }
/* TODO
  /// Get the user-specified data of each particle.
  /// Array is length GetParticleCount()
  /// @return the pointer to the head of the particle user-data array.
  void** GetUserDataBuffer();
  void* const* GetUserDataBuffer() const;
  inline void* const* b2ParticleSystem::GetUserDataBuffer() const
{
  return ((b2ParticleSystem*) this)->GetUserDataBuffer();
}
void** b2ParticleSystem::GetUserDataBuffer()
{
	m_userDataBuffer.data = RequestBuffer(m_userDataBuffer.data);
	return m_userDataBuffer.data;
}
*/

  /**
   * Get the flags for each particle. See the b2ParticleFlag enum.
   * Array is length GetParticleCount()
   * @return the pointer to the head of the particle-flags array.
   */
  getFlagsBuffer() {
    return this.m_flagsBuffer.data;
  }

  /** Set flags for a particle. See the b2ParticleFlag enum. */
  setParticleFlags(index: number, newFlags: number) {
    const oldFlags = this.m_flagsBuffer.data[index];
    if (oldFlags & ~newFlags) {
      // If any flags might be removed
      this.m_needsUpdateAllParticleFlags = true;
    }
    if (~this.m_allParticleFlags & newFlags) {
      // If any flags were added
      if (newFlags & ParticleFlag.b2_tensileParticle) {
        this.m_accumulation2Buffer = RequestBuffer(
          this.m_accumulation2Buffer); // TODO
      }
      if (newFlags & ParticleFlag.b2_colorMixingParticle) {
        this.m_colorBuffer.data = RequestBuffer(this.m_colorBuffer.data); // TODO
      }
      this.m_allParticleFlags |= newFlags;
    }
    this.m_flagsBuffer.data[index] = newFlags;
  }
  /** Get flags for a particle. See the b2ParticleFlag enum. */
  getParticleFlags(index: number) {
    return this.getFlagsBuffer()[index];
  }

  /// Set an external buffer for particle data.
  /// Normally, the b2World's block allocator is used for particle data.
  /// However, sometimes you may have an OpenGL or Java buffer for particle
  /// data. To avoid data duplication, you may supply this external buffer.
  ///
  /// Note that, when b2World's block allocator is used, the particle data
  /// buffers can grow as required. However, when external buffers are used,
  /// the maximum number of particles is clamped to the size of the smallest
  /// external buffer.
  ///
  /// @param buffer is a pointer to a block of memory.
  /// @param size is the number of values in the block.
/* TODO (for now we can ignore these functions)
  void SetFlagsBuffer(uint32* buffer, int32 capacity);
  void SetPositionBuffer(b2Vec2* buffer, int32 capacity);
  void SetVelocityBuffer(b2Vec2* buffer, int32 capacity);
  void SetColorBuffer(b2ParticleColor* buffer, int32 capacity);
  void SetUserDataBuffer(void** buffer, int32 capacity);
  void b2ParticleSystem::SetFlagsBuffer(uint32* buffer, int32 capacity)
{
	SetUserOverridableBuffer(&m_flagsBuffer, buffer, capacity);
}

void b2ParticleSystem::SetPositionBuffer(b2Vec2* buffer,
												 int32 capacity)
{
	SetUserOverridableBuffer(&m_positionBuffer, buffer, capacity);
}

void b2ParticleSystem::SetVelocityBuffer(b2Vec2* buffer,
												 int32 capacity)
{
	SetUserOverridableBuffer(&m_velocityBuffer, buffer, capacity);
}

void b2ParticleSystem::SetColorBuffer(b2ParticleColor* buffer,
											  int32 capacity)
{
	SetUserOverridableBuffer(&m_colorBuffer, buffer, capacity);
}

void b2ParticleSystem::SetUserDataBuffer(void** buffer, int32 capacity)
{
	SetUserOverridableBuffer(&m_userDataBuffer, buffer, capacity);
}
*/
  /**
   * Get contacts between particles
   * Contact data can be used for many reasons, for example to trigger
   * rendering or audio effects.
   */
  getContacts(): b2ParticleContact[] {
    return this.m_contactBuffer.data;
  }
  getContactCount(): number {
    return this.m_contactBuffer.getCount();
  }

  /**
   * Get contacts between particles and bodies
   * Contact data can be used for many reasons, for example to trigger
   * rendering or audio effects.
   */
  getBodyContacts(): b2ParticleBodyContact[] {
    return this.m_bodyContactBuffer.data;
  }
  getBodyContactCount(): number {
    return this.m_bodyContactBuffer.getCount();
  }

  /**
   * Get array of particle pairs. The particles in a pair:
   *   1. are contacting,
   *   2. are in the same particle group,
   *   3. are part of a rigid particle group, or are spring, elastic,
   *       or wall particles.
   *   4. have at least one particle that is a spring or barrier
   *       particle (i.e. one of the types in k_pairFlags),
   *   5. have at least one particle that returns true for
   *       ConnectionFilter::IsNecessary,
   *   6. are not zombie particles.
   *
   * Essentially, this is an array of spring or barrier particles that
   * are interacting. The array is sorted by b2ParticlePair's indexA,
   * and then indexB. There are no duplicate entries.
   */
  getPairs(): b2ParticlePair[] {
    return this.m_pairBuffer.data;
  }
  getPairCount(): number {
    return this.m_pairBuffer.getCount();
  }

  /**
   * Get array of particle triads. The particles in a triad:
   *   1. are in the same particle group,
   *   2. are in a Voronoi triangle together,
   *   3. are within b2_maxTriadDistance particle diameters of each
   *       other,
   *   4. return true for ConnectionFilter::ShouldCreateTriad
   *   5. have at least one particle of type elastic (i.e. one of the
   *       types in k_triadFlags),
   *   6. are part of a rigid particle group, or are spring, elastic,
   *       or wall particles.
   *   7. are not zombie particles.
   *
   * Essentially, this is an array of elastic particles that are
   * interacting. The array is sorted by b2ParticleTriad's indexA,
   * then indexB, then indexC. There are no duplicate entries.
   */
  getTriads(): b2ParticleTriad[] {
    return this.m_triadBuffer.data;
  }
  getTriadCount(): number {
    return this.m_triadBuffer.getCount();
  }

  /**
   * Set an optional threshold for the maximum number of
   * consecutive particle iterations that a particle may contact
   * multiple bodies before it is considered a candidate for being
   * "stuck". Setting to zero or less disables.
   */
  setStuckThreshold(steps: number) {
    this.m_stuckThreshold = steps;

    if (steps > 0) {
      this.m_lastBodyContactStepBuffer.data = RequestBuffer( // TODO
        this.m_lastBodyContactStepBuffer.data);
      this.m_bodyContactCountBuffer.data = RequestBuffer( // TODO
        this.m_bodyContactCountBuffer.data);
      this.m_consecutiveContactStepsBuffer.data = RequestBuffer( // TODO
        this.m_consecutiveContactStepsBuffer.data);
    }
  };

  /**
   * Get potentially stuck particles from the last step; the user must
   * decide if they are stuck or not, and if so, delete or move them
   */
  GetStuckCandidates(): number[] {
    return this.m_stuckParticleBuffer.data;
  }

  /** Get the number of stuck particle candidates from the last step. */
  getStuckCandidateCount(): number {
    return this.m_stuckParticleBuffer.getCount();
  }

  /** Compute the kinetic energy that can be lost by damping force */
  computeCollisionEnergy() {
    let sum_v2 = 0;
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const n = contact.getNormal();
      const v = Vec2.sub(this.m_velocityBuffer.data[b], this.m_velocityBuffer.data[a]);
      const vn = Vec2.dot(v, n);
      if (vn < 0) {
        sum_v2 += vn * vn;
      }
    }
    return 0.5 * this.getParticleMass() * sum_v2;
  };

  /**
   * Set strict Particle/Body contact check.
   * This is an option that will help ensure correct behavior if there are
   * corners in the world model where Particle/Body contact is ambiguous.
   * This option scales at n*log(n) of the number of Particle/Body contacts,
   * so it is best to only enable if it is necessary for your geometry.
   * Enable if you see strange particle behavior around b2Body
   * intersections.
   */
  setStrictContactCheck(enabled: boolean) {
    this.m_def.strictContactCheck = enabled;
  }
  /** Get the status of the strict contact check. */
  getStrictContactCheck(): boolean {
    return this.m_def.strictContactCheck;
  }

  /**
   * Set the lifetime (in seconds) of a particle relative to the current
   * time.  A lifetime of less than or equal to 0.0f results in the particle
   * living forever until it's manually destroyed by the application.
   */
/*  setParticleLifetime(index: number, lifetime: number) { // LATER
    _ASSERT && common.assert(this.validateParticleIndex(index));
    const initializeExpirationTimes =
      this.m_indexByExpirationTimeBuffer.data == null;
    this.m_expirationTimeBuffer.data = RequestBuffer( // TODO
      this.m_expirationTimeBuffer.data);
    this.m_indexByExpirationTimeBuffer.data = RequestBuffer( // TODO
      this.m_indexByExpirationTimeBuffer.data);
  
    // Initialize the inverse mapping buffer.
    if (initializeExpirationTimes) {
      const particleCount = this.getParticleCount();
      for (let i = 0; i < particleCount; ++i) {
        this.m_indexByExpirationTimeBuffer.data[i] = i;
      }
    }
    const quantizedLifetime = (lifetime /
                        m_def.lifetimeGranularity) | 0;
    // Use a negative lifetime so that it's possible to track which
    // of the infinite lifetime particles are older.
    const newExpirationTime = quantizedLifetime > 0 ?
      this.getQuantizedTimeElapsed() + quantizedLifetime : quantizedLifetime;
    if (newExpirationTime != this.m_expirationTimeBuffer.data[index]) {
      this.m_expirationTimeBuffer.data[index] = newExpirationTime;
      this.m_expirationTimeBufferRequiresSorting = true;
    }
  }*/
  /**
   * Get the lifetime (in seconds) of a particle relative to the current
   * time.  A value > 0.0f is returned if the particle is scheduled to be
   * destroyed in the future, values <= 0.0f indicate the particle has an
   * infinite lifetime.
   */
/*  getParticleLifetime(index: number): number { // LATER
    _ASSERT && common.assert(this.validateParticleIndex(index));
    return this.expirationTimeToLifetime(this.getExpirationTimeBuffer()[index]);
  }*/

  /**
   * Enable / disable destruction of particles in CreateParticle() when
   * no more particles can be created due to a prior call to
   * SetMaxParticleCount().  When this is enabled, the oldest particle is
   * destroyed in CreateParticle() favoring the destruction of particles
   * with a finite lifetime over particles with infinite lifetimes.
   * This feature is enabled by default when particle lifetimes are
   * tracked.  Explicitly enabling this feature using this function enables
   * particle lifetime tracking.
   */
/*  setDestructionByAge(enable: boolean) { // LATER
    if (enable) {
      this.getExpirationTimeBuffer();
    }
    this.m_def.destroyByAge = enable;
  }*/
  /**
   * Get whether the oldest particle will be destroyed in CreateParticle()
   * when the maximum number of particles are present in the system.
   */
/*  getDestructionByAge(): boolean { // LATER
    return this.m_def.destroyByAge;
  }*/

  /**
   * Get the array of particle expiration times indexed by particle index.
   * GetParticleCount() items are in the returned array.
   */
/*  getExpirationTimeBuffer(): number[] { // LATER
    this.m_expirationTimeBuffer.data = RequestBuffer(// TODO
      this.m_expirationTimeBuffer.data);
    return this.m_expirationTimeBuffer.data;
  }*/
  /**
   * Convert a expiration time value in returned by
   * GetExpirationTimeBuffer() to a time in seconds relative to the
   * current simulation time.
   */
/*  expirationTimeToLifetime(expirationTime: number): number { // LATER
    return (expirationTime > 0 ?
               expirationTime - this.getQuantizedTimeElapsed() :
               expirationTime) * this.m_def.lifetimeGranularity;
  }*/
  /**
   * Get the array of particle indices ordered by reverse lifetime.
   * The oldest particle indexes are at the end of the array with the
   * newest at the start.  Particles with infinite lifetimes
   * (i.e expiration times less than or equal to 0) are placed at the start
   *  of the array.
   * GetExpirationTimeBuffer(
   *    GetIndexByExpirationTimeBuffer()[index])
   * is equivalent to GetParticleLifetime(index).
   * GetParticleCount() items are in the returned array.
   */
/*  getIndexByExpirationTimeBuffer(): number[] { // LATER
    // If this.particles are present, initialize / reinitialize the lifetime buffer.
    if (this.getParticleCount()) {
      this.setParticleLifetime(0, this.getParticleLifetime(0)); // TODO ok?
    } else {
      this.m_indexByExpirationTimeBuffer.data = RequestBuffer( // TODO
        this.m_indexByExpirationTimeBuffer.data);
    }
    return this.m_indexByExpirationTimeBuffer.data;
  }*/

  /**
   * Apply an impulse to one particle. This immediately modifies the
   * velocity. Similar to b2Body::ApplyLinearImpulse.
   * @param index the particle that will be modified.
   * @param impulse the world impulse vector, usually in N-seconds or
   *        kg-m/s.
   */
  particleApplyLinearImpulse(index: number, impulse: Vec2) {
    this.applyLinearImpulse(index, index + 1, impulse);
  }

  /**
   * Apply an impulse to all particles between 'firstIndex' and 'lastIndex'.
   * This immediately modifies the velocity. Note that the impulse is
   * applied to the total mass of all particles. So, calling
   * ParticleApplyLinearImpulse(0, impulse) and
   * ParticleApplyLinearImpulse(1, impulse) will impart twice as much
   * velocity as calling just ApplyLinearImpulse(0, 1, impulse).
   * @param firstIndex the first particle to be modified.
   * @param lastIndex the last particle to be modified.
   * @param impulse the world impulse vector, usually in N-seconds or
   *        kg-m/s.
   */
  applyLinearImpulse(firstIndex: number, lastIndex: number,
              impulse: Vec2) {
    const numParticles = lastIndex - firstIndex;
    const totalMass = numParticles * this.getParticleMass();
    const velocityDelta = Vec2.mul(impulse, 1 / totalMass);
    for (let i = firstIndex; i < lastIndex; i++) {
      this.m_velocityBuffer.data[i].add(velocityDelta);
    }
  }

  /**
   * Apply a force to the center of a particle.
   * @param index the particle that will be modified.
   * @param force the world force vector, usually in Newtons (N).
   */
  particleApplyForce(index: number, force: Vec2) {
    if (isSignificantForce(force) &&
      this.forceCanBeApplied(this.m_flagsBuffer.data[index])) {
      this.prepareForceBuffer();
      this.m_forceBuffer[index].add(force);
    }
  }

  /**
   * Distribute a force across several particles. The particles must not be
   * wall particles. Note that the force is distributed across all the
   * particles, so calling this function for indices 0..N is not the same as
   * calling ParticleApplyForce(i, force) for i in 0..N.
   * @param firstIndex the first particle to be modified.
   * @param lastIndex the last particle to be modified.
   * @param force the world force vector, usually in Newtons (N).
   */
  applyForce(firstIndex: number, lastIndex: number, force: Vec2) {
    // Ensure we're not trying to apply force to particles that can't move,
    // such as wall particles.
    if (_ASSERT) {
      let flags = 0;
      for (let i = firstIndex; i < lastIndex; i++) {
        flags |= this.m_flagsBuffer.data[i];
      }
      common.assert(this.forceCanBeApplied(flags));
    }
  
    // Early out if force does nothing (optimization).
    const distributedForce = Vec2.mul(force, 1 / (lastIndex - firstIndex));
    if (isSignificantForce(distributedForce)) {
      this.prepareForceBuffer();
  
      // Distribute the force over all the particles.
      for (let i = firstIndex; i < lastIndex; i++) {
        this.m_forceBuffer[i].add(distributedForce);
      }
    }
  }

  /** Get the next particle-system in the world's particle-system list. */
  getNext(): b2ParticleSystem {
    return this.m_next;
  }

  /**
   * Query the particle system for all particles that potentially overlap
   * the provided AABB. b2QueryCallback::ShouldQueryParticleSystem is
   * ignored.
   * @param callback a user implemented callback class.
   * @param aabb the query box.
   */
  queryAABB(callback: ParticleAABBQueryCallback, aabb: AABB) {
    if (this.m_proxyBuffer.getCount() == 0) {
      return;
    }
    // const Proxy* beginProxy = this.m_proxyBuffer.begin();
    // const Proxy* endProxy = this.m_proxyBuffer.end();
    const firstProxy = std.lower_bound_buffer(
      this.m_proxyBuffer,
      computeTag(
        this.m_inverseDiameter * aabb.lowerBound.x,
        this.m_inverseDiameter * aabb.lowerBound.y));
    const lastProxy = std.upper_bound_buffer(
      this.m_proxyBuffer,
      computeTag(
        this.m_inverseDiameter * aabb.upperBound.x,
        this.m_inverseDiameter * aabb.upperBound.y));
    for (let proxy_i = firstProxy; proxy_i < lastProxy; ++proxy_i) {
      const proxy = this.m_proxyBuffer.getData()[proxy_i];
      const i = proxy.index; // TODO useless? use proxy_i directly
      const p = this.m_positionBuffer.data[i];
      if (aabb.lowerBound.x < p.x && p.x < aabb.upperBound.x &&
        aabb.lowerBound.y < p.y && p.y < aabb.upperBound.y)
      {
        if (!callback(this, i)) {
          break;
        }
      }
    }
  }

  /**
   * Query the particle system for all particles that potentially overlap
   * the provided shape's AABB. Calls QueryAABB internally.
   * b2QueryCallback::ShouldQueryParticleSystem is ignored.
   * @param callback a user implemented callback class.
   * @param shape the query shape
   * @param xf the transform of the AABB
   */
  queryShapeAABB(callback: b2QueryCallback, shape: Shape,
            xf: Transform) {
    const aabb = new AABB();
    shape.computeAABB(aabb, xf, 0);
    this.queryAABB(callback, aabb);
  }

  /**
   * Ray-cast the particle system for all particles in the path of the ray.
   * Your callback controls whether you get the closest point, any point, or
   * n-points. The ray-cast ignores particles that contain the starting
   * point. b2RayCastCallback::ShouldQueryParticleSystem is ignored.
   * @param callback a user implemented callback class.
   * @param point1 the ray starting point
   * @param point2 the ray ending point
   */
  rayCast(callback: b2RayCastCallback, point1: Vec2,
    point2: Vec2) {
    if (this.m_proxyBuffer.getCount() == 0) {
      return;
    }
    const aabb = new AABB();
    aabb.lowerBound = Vec2.lower(point1, point2);
    aabb.upperBound = Vec2.upper(point1, point2);
    let fraction = 1;
    // solving the following equation:
    // ((1-t)*point1+t*point2-position)^2=diameter^2
    // where t is a potential fraction
    const v = Vec2.sub(point2, point1);
    const v2 = Vec2.dot(v, v);
    const enumerator = this.getInsideBoundsEnumerator(aabb);
    let i;
    while ((i = enumerator.getNext()) >= 0)
    {
      const p = Vec2.sub(point1, this.m_positionBuffer.data[i]);
      const pv = Vec2.dot(p, v);
      const p2 = Vec2.dot(p, p);
      const determinant = pv * pv - v2 * (p2 - this.m_squaredDiameter);
      if (determinant >= 0) {
        const sqrtDeterminant = math.sqrt(determinant);
        // find a solution between 0 and fraction
        let t = (-pv - sqrtDeterminant) / v2;
        if (t > fraction) {
          continue;
        }
        if (t < 0) {
          t = (-pv + sqrtDeterminant) / v2;
          if (t < 0 || t > fraction) {
            continue;
          }
        }
        const n = Vec2.combine(1, p, t, v);
        n.normalize();
        const f = callback.reportParticle(this, i, Vec2.combine(1, point1, t, v), n, t);
        fraction = math.min(fraction, f);
        if (fraction <= 0) {
          break;
        }
      }
    }
  }

  /**
   * Compute the axis-aligned bounding box for all particles contained
   * within this particle system.
   * @param aabb Returns the axis-aligned bounding box of the system.
   */
  computeAABB(aabb: AABB) {
    const particleCount = this.getParticleCount();
    _ASSERT && common.assert(!!aabb);
    aabb.lowerBound.x = +Infinity;
    aabb.lowerBound.y = +Infinity;
    aabb.upperBound.x = -Infinity;
    aabb.upperBound.y = -Infinity;
  
    for (let i = 0; i < particleCount; i++) {
      const p = this.m_positionBuffer.data[i];
      aabb.lowerBound = Vec2.lower(aabb.lowerBound, p); // TODO see code in PolygonShape
      aabb.upperBound = Vec2.upper(aabb.upperBound, p);
    }
    aabb.lowerBound.x -= this.m_particleDiameter;
    aabb.lowerBound.y -= this.m_particleDiameter;
    aabb.upperBound.x += this.m_particleDiameter;
    aabb.upperBound.y += this.m_particleDiameter;
  }
/* TODO
#if LIQUIDFUN_EXTERNAL_LANGUAGE_API
public:
  enum b2ExceptionType
  {
    b2_bufferTooSmall,
    b2_particleIndexOutOfBounds,
    b2_numErrors,
    b2_noExceptions,
  };

  /// Set the velocity of particle at index with direct floats.
  void SetParticleVelocity(int32 index, float32 vx, float32 vy)
  {
    b2Vec2& v = GetVelocityBuffer()[index];
    v.x = vx;
    v.y = vy;
  }

  /// Get the x-coordinate of particle at index.
  float GetParticlePositionX(int32 index)
  {
    return GetPositionBuffer()[index].x;
  }

  /// Get the y-coordinate of particle at index.
  float GetParticlePositionY(int32 index)
  {
    return GetPositionBuffer()[index].y;
  }

  /// Copy position buffer into a specified buffer, starting from startIndex.
  int CopyPositionBuffer(int startIndex, int numParticles, void* outBuf,
               int size)
  {
    int copySize = numParticles * sizeof(b2Vec2);
    void* inBufWithOffset = (void*) (GetPositionBuffer() + startIndex);
    return CopyBuffer(startIndex, numParticles, inBufWithOffset, outBuf, size,
              copySize);
  }

  /// Copy color buffer into a specified buffer, starting from startIndex.
  int CopyColorBuffer(int startIndex, int numParticles, void* outBuf,
            int size)
  {
    int copySize = numParticles * sizeof(b2ParticleColor);
    void* inBufWithOffset = (void*) (GetColorBuffer() + startIndex);
    return CopyBuffer(startIndex, numParticles, inBufWithOffset, outBuf, size,
              copySize);
  }

  /// Copy color buffer into a specified buffer, starting from startIndex.
  int CopyWeightBuffer(int startIndex, int numParticles, void* outBuf,
             int size) const;
  {
    int copySize = numParticles * sizeof(float32);
    void* inBufWithOffset = (void*) (GetWeightBuffer() + startIndex);
    return CopyBuffer(startIndex, numParticles, inBufWithOffset, outBuf, size,
              copySize);
  }

private:
  /// Helper function for buffer copies.
  int CopyBuffer(int startIndex, int numParticles, void* inBufWithOffset,
           void* outBuf, int outBufSize, int copySize)
  {
    b2ExceptionType exception = IsBufCopyValid(startIndex, numParticles,
                          copySize, outBufSize);
    if (exception != b2_noExceptions)
    {
      return exception;
    }

    memcpy(outBuf, inBufWithOffset, copySize);
    return b2_noExceptions;
  }

  /// Check if buffer copy is valid for the Get*Buffer functions that have
  /// a user-supplied output buffer.
  b2ExceptionType IsBufCopyValid(int startIndex, int numParticles,
                   int copySize, int bufSize) const;
  b2ParticleSystem::b2ExceptionType b2ParticleSystem::IsBufCopyValid(
	int startIndex, int numParticles, int copySize, int bufSize) const
{
	const int maxNumParticles = GetParticleCount();

	// are we actually copying?
	if (copySize == 0)
	{
		return b2_noExceptions;
	}

	// is the index out of bounds?
	if (startIndex < 0 ||
		startIndex >= maxNumParticles ||
		numParticles < 0 ||
		numParticles + startIndex > maxNumParticles)
	{
		return b2_particleIndexOutOfBounds;
	}

	// are we copying within the boundaries?
	if (copySize > bufSize)
	{
		return b2_bufferTooSmall;
	}

	return b2_noExceptions;
}
#endif // LIQUIDFUN_EXTERNAL_LANGUAGE_API
*/
// private:
/*  friend class b2World;
  friend class b2ParticleGroup;
  friend class b2ParticleBodyContactRemovePredicate;
  friend class b2FixtureParticleQueryCallback;
#ifdef LIQUIDFUN_UNIT_TESTS
  FRIEND_TEST(FunctionTests, GetParticleMass);
  FRIEND_TEST(FunctionTests, AreProxyBuffersTheSame);
#endif // LIQUIDFUN_UNIT_TESTS*/

  /** All particle types that require creating pairs */
  private static k_pairFlags =
    ParticleFlag.b2_springParticle |
    ParticleFlag.b2_barrierParticle;
  /** All particle types that require creating triads */
  private static k_triadFlags =
    ParticleFlag.b2_elasticParticle;
  /** All particle types that do not produce dynamic pressure */
  private static k_noPressureFlags =
    ParticleFlag.b2_powderParticle |
    ParticleFlag.b2_tensileParticle;
  /** All particle types that apply extra damping force with bodies */
  private static k_extraDampingFlags =
    ParticleFlag.b2_staticPressureParticle;

 /* template <typename T> void FreeBuffer(T** b, int capacity)
  {
    if (*b == NULL)
      return;
  
    m_world->m_blockAllocator.Free(*b, sizeof(**b) * capacity);
    *b = NULL;
  }*/
  // Free buffer, if it was allocated with b2World's block allocator
 /* template <typename T> void FreeUserOverridableBuffer(
    UserOverridableBuffer<T>* b)
  {
    if (b->userSuppliedCapacity == 0)
    {
      FreeBuffer(&b->data, m_internalAllocatedCapacity);
    }
  }*/
  // Reallocate a buffer
 /* reallocateBuffer<T>(oldBuffer: T[], oldCapacity, // TODO
                        newCapacity: number): T[]
  {
    _ASSERT && common.assert(newCapacity > oldCapacity);
    T* newBuffer = (T*) m_world->m_blockAllocator.Allocate(
      sizeof(T) * newCapacity);
    if (oldBuffer)
    {
      memcpy(newBuffer, oldBuffer, sizeof(T) * oldCapacity);
      m_world->m_blockAllocator.Free(oldBuffer, sizeof(T) * oldCapacity);
    }
    return newBuffer;
  }
  // Reallocate a buffer
  template <typename T> T* ReallocateBuffer(
    T* buffer, int32 userSuppliedCapacity, int32 oldCapacity,
    int32 newCapacity, bool deferred)
  {
    b2Assert(newCapacity > oldCapacity);
    // A 'deferred' buffer is reallocated only if it is not NULL.
    // If 'userSuppliedCapacity' is not zero, buffer is user supplied and must
    // be kept.
    b2Assert(!userSuppliedCapacity || newCapacity <= userSuppliedCapacity);
    if ((!deferred || buffer) && !userSuppliedCapacity)
    {
      buffer = ReallocateBuffer(buffer, oldCapacity, newCapacity);
    }
    return buffer;
  }
  // Reallocate a buffer
  template <typename T> T* ReallocateBuffer(
    UserOverridableBuffer<T>* buffer, int32 oldCapacity, int32 newCapacity,
    bool deferred)
  {
    b2Assert(newCapacity > oldCapacity);
    return ReallocateBuffer(buffer->data, buffer->userSuppliedCapacity,
                oldCapacity, newCapacity, deferred);
  }
  template <typename T> T* RequestBuffer(T* buffer)
  {
    if (!buffer)
    {
      if (m_internalAllocatedCapacity == 0)
      {
        ReallocateInternalAllocatedBuffers(
          b2_minParticleSystemBufferCapacity);
      }
      buffer = (T*) (m_world->m_blockAllocator.Allocate(
                 sizeof(T) * m_internalAllocatedCapacity));
      b2Assert(buffer);
      memset(buffer, 0, sizeof(T) * m_internalAllocatedCapacity);
    }
    return buffer;
  }

  /// Reallocate the handle / index map and schedule the allocation of a new
  /// pool for handle allocation.
  void ReallocateHandleBuffers(int32 newCapacity)
  {
    b2Assert(newCapacity > m_internalAllocatedCapacity);
    // Reallocate a new handle / index map buffer, copying old handle pointers
    // is fine since they're kept around.
    m_handleIndexBuffer.data = ReallocateBuffer(
      &m_handleIndexBuffer, m_internalAllocatedCapacity, newCapacity,
      true);
    // Set the size of the next handle allocation.
    m_handleAllocator.SetItemsPerSlab(newCapacity -
                      m_internalAllocatedCapacity);
  }

  void ReallocateInternalAllocatedBuffers(int32 capacity)
  {
    // Don't increase capacity beyond the smallest user-supplied buffer size.
    capacity = LimitCapacity(capacity, m_def.maxCount);
    capacity = LimitCapacity(capacity, m_flagsBuffer.userSuppliedCapacity);
    capacity = LimitCapacity(capacity, m_positionBuffer.userSuppliedCapacity);
    capacity = LimitCapacity(capacity, m_velocityBuffer.userSuppliedCapacity);
    capacity = LimitCapacity(capacity, m_colorBuffer.userSuppliedCapacity);
    capacity = LimitCapacity(capacity, m_userDataBuffer.userSuppliedCapacity);
    if (m_internalAllocatedCapacity < capacity)
    {
      ReallocateHandleBuffers(capacity);
      m_flagsBuffer.data = ReallocateBuffer(
        &m_flagsBuffer, m_internalAllocatedCapacity, capacity, false);
  
      // Conditionally defer these as they are optional if the feature is
      // not enabled.
      const bool stuck = m_stuckThreshold > 0;
      m_lastBodyContactStepBuffer.data = ReallocateBuffer(
        &m_lastBodyContactStepBuffer, m_internalAllocatedCapacity,
        capacity, stuck);
      m_bodyContactCountBuffer.data = ReallocateBuffer(
        &m_bodyContactCountBuffer, m_internalAllocatedCapacity, capacity,
        stuck);
      m_consecutiveContactStepsBuffer.data = ReallocateBuffer(
        &m_consecutiveContactStepsBuffer, m_internalAllocatedCapacity,
        capacity, stuck);
      m_positionBuffer.data = ReallocateBuffer(
        &m_positionBuffer, m_internalAllocatedCapacity, capacity, false);
      m_velocityBuffer.data = ReallocateBuffer(
        &m_velocityBuffer, m_internalAllocatedCapacity, capacity, false);
      m_forceBuffer = ReallocateBuffer(
        m_forceBuffer, 0, m_internalAllocatedCapacity, capacity, false);
      m_weightBuffer = ReallocateBuffer(
        m_weightBuffer, 0, m_internalAllocatedCapacity, capacity, false);
      m_staticPressureBuffer = ReallocateBuffer(
        m_staticPressureBuffer, 0, m_internalAllocatedCapacity, capacity,
        true);
      m_accumulationBuffer = ReallocateBuffer(
        m_accumulationBuffer, 0, m_internalAllocatedCapacity, capacity,
        false);
      m_accumulation2Buffer = ReallocateBuffer(
        m_accumulation2Buffer, 0, m_internalAllocatedCapacity, capacity,
        true);
      m_depthBuffer = ReallocateBuffer(
        m_depthBuffer, 0, m_internalAllocatedCapacity, capacity, true);
      m_colorBuffer.data = ReallocateBuffer(
        &m_colorBuffer, m_internalAllocatedCapacity, capacity, true);
      m_groupBuffer = ReallocateBuffer(
        m_groupBuffer, 0, m_internalAllocatedCapacity, capacity, false);
      m_userDataBuffer.data = ReallocateBuffer(
        &m_userDataBuffer, m_internalAllocatedCapacity, capacity, true);
      m_expirationTimeBuffer.data = ReallocateBuffer(
        &m_expirationTimeBuffer, m_internalAllocatedCapacity, capacity,
        true);
      m_indexByExpirationTimeBuffer.data = ReallocateBuffer(
        &m_indexByExpirationTimeBuffer, m_internalAllocatedCapacity,
        capacity, true);
      m_internalAllocatedCapacity = capacity;
    }
  }*/
  createParticleForGroup(
    groupDef: b2ParticleGroupDef,
    xf: Transform, p: Vec2): number {
    const particleDef = { ...ParticleDefDefault } as ParticleDef;
    particleDef.flags = groupDef.flags;
    particleDef.position = Transform.mul(xf, p);
    particleDef.velocity = Vec2.addCross(
      groupDef.linearVelocity,
      groupDef.angularVelocity,
      Vec2.sub(particleDef.position, groupDef.position));
    particleDef.color = groupDef.color;
    particleDef.lifetime = groupDef.lifetime;
    particleDef.userData = groupDef.userData;
    return this.createParticle(particleDef);
  }
  createParticlesStrokeShapeForGroup(
    shape: Shape,
    groupDef: b2ParticleGroupDef, xf: Transform) {
    let stride = groupDef.stride;
    if (stride == 0) {
      stride = this.getParticleStride();
    }
    let positionOnEdge = 0;
    const childCount = shape.getChildCount();
    for (let childIndex = 0; childIndex < childCount; childIndex++) {
      let edge: EdgeShape;
      if (shape.getType() == EdgeShape.TYPE) {
        edge = shape as EdgeShape;
      } else {
        _ASSERT && common.assert(shape.getType() == ChainShape.TYPE);
        (shape as ChainShape).getChildEdge(edge, childIndex);
      }
      const d = Vec2.sub(edge.m_vertex2, edge.m_vertex1);
      const edgeLength = d.length();
      while (positionOnEdge < edgeLength) {
        const p = Vec2.combine(1, edge.m_vertex1, positionOnEdge / edgeLength, d);
        this.createParticleForGroup(groupDef, xf, p);
        positionOnEdge += stride;
      }
      positionOnEdge -= edgeLength;
    }
  }
  createParticlesFillShapeForGroup(
    shape: Shape,
    groupDef: b2ParticleGroupDef, xf: Transform)
  {
    let stride = groupDef.stride;
    if (stride == 0) {
      stride = this.getParticleStride();
    }
    const identity = Transform.identity();
    const aabb = new AABB();
    _ASSERT && common.assert(shape.getChildCount() == 1);
    shape.computeAABB(aabb, identity, 0);
    for (let y = math.floor(aabb.lowerBound.y / stride) * stride;
      y < aabb.upperBound.y; y += stride) {
      for (let x = math.floor(aabb.lowerBound.x / stride) * stride;
        x < aabb.upperBound.x; x += stride) {
          const p = Vec2.neo(x, y);
          if (shape.testPoint(identity, p)) {
            this.createParticleForGroup(groupDef, xf, p);
          }
      }
    }
  }
  createParticlesWithShapeForGroup(
    shape: Shape,
    groupDef: b2ParticleGroupDef, xf: Transform) {
    switch (shape.getType()) {
    case 'edge':
    case 'chain':
      this.createParticlesStrokeShapeForGroup(shape, groupDef, xf);
      break;
    case 'polygon':
    case 'circle':
      this.createParticlesFillShapeForGroup(shape, groupDef, xf);
      break;
    default:
      _ASSERT && common.assert(false);
      break;
    }
  }
/*  void CreateParticlesWithShapesForGroup( // LATER
    const b2Shape* const* shapes, int32 shapeCount,
    const b2ParticleGroupDef& groupDef, const b2Transform& xf)
  {
    class CompositeShape : public b2Shape
    {
    public:
      CompositeShape(const b2Shape* const* shapes, int32 shapeCount)
      {
        m_shapes = shapes;
        m_shapeCount = shapeCount;
      }
      b2Shape* Clone(b2BlockAllocator* allocator) const
      {
        b2Assert(false);
        B2_NOT_USED(allocator);
        return NULL;
      }
      int32 GetChildCount() const
      {
        return 1;
      }
      bool TestPoint(const b2Transform& xf, const b2Vec2& p) const
      {
        for (int32 i = 0; i < m_shapeCount; i++)
        {
          if (m_shapes[i]->TestPoint(xf, p))
          {
            return true;
          }
        }
        return false;
      }
      void ComputeDistance(const b2Transform& xf, const b2Vec2& p,
            float32* distance, b2Vec2* normal, int32 childIndex) const
      {
        b2Assert(false);
        B2_NOT_USED(xf);
        B2_NOT_USED(p);
        B2_NOT_USED(distance);
        B2_NOT_USED(normal);
        B2_NOT_USED(childIndex);
      }
      bool RayCast(b2RayCastOutput* output, const b2RayCastInput& input,
              const b2Transform& transform, int32 childIndex) const
      {
        b2Assert(false);
        B2_NOT_USED(output);
        B2_NOT_USED(input);
        B2_NOT_USED(transform);
        B2_NOT_USED(childIndex);
        return false;
      }
      void ComputeAABB(
          b2AABB* aabb, const b2Transform& xf, int32 childIndex) const
      {
        B2_NOT_USED(childIndex);
        aabb->lowerBound.x = +FLT_MAX;
        aabb->lowerBound.y = +FLT_MAX;
        aabb->upperBound.x = -FLT_MAX;
        aabb->upperBound.y = -FLT_MAX;
        b2Assert(childIndex == 0);
        for (int32 i = 0; i < m_shapeCount; i++)
        {
          int32 childCount = m_shapes[i]->GetChildCount();
          for (int32 j = 0; j < childCount; j++)
          {
            b2AABB subaabb;
            m_shapes[i]->ComputeAABB(&subaabb, xf, j);
            aabb->Combine(subaabb);
          }
        }
      }
      void ComputeMass(b2MassData* massData, float32 density) const
      {
        b2Assert(false);
        B2_NOT_USED(massData);
        B2_NOT_USED(density);
      }
    private:
      const b2Shape* const* m_shapes;
      int32 m_shapeCount;
    } compositeShape(shapes, shapeCount);
    CreateParticlesFillShapeForGroup(&compositeShape, groupDef, xf);
  }*/
  cloneParticle(oldIndex: number, group: b2ParticleGroup) {
    const def = { ...ParticleDefDefault };
    def.flags = this.m_flagsBuffer.data[oldIndex];
    def.position = this.m_positionBuffer.data[oldIndex];
    def.velocity = this.m_velocityBuffer.data[oldIndex];
    if (this.m_colorBuffer.data) {
      def.color = this.m_colorBuffer.data[oldIndex];
    }
    if (this.m_userDataBuffer.data) {
      def.userData = this.m_userDataBuffer.data[oldIndex];
    }
    def.group = group;
    const newIndex = this.createParticle(def);
    if (this.m_handleIndexBuffer.data) {
      const handle = this.m_handleIndexBuffer.data[oldIndex];
      if (handle) handle.setIndex(newIndex);
      this.m_handleIndexBuffer.data[newIndex] = handle;
      this.m_handleIndexBuffer.data[oldIndex] = null;
    }
    if (this.m_lastBodyContactStepBuffer.data) {
      this.m_lastBodyContactStepBuffer.data[newIndex] =
        this.m_lastBodyContactStepBuffer.data[oldIndex];
    }
    if (this.m_bodyContactCountBuffer.data) {
      this.m_bodyContactCountBuffer.data[newIndex] =
        this.m_bodyContactCountBuffer.data[oldIndex];
    }
    if (this.m_consecutiveContactStepsBuffer.data) {
      this.m_consecutiveContactStepsBuffer.data[newIndex] =
        this.m_consecutiveContactStepsBuffer.data[oldIndex];
    }
    if (this.m_hasForce) {
      this.m_forceBuffer[newIndex] = this.m_forceBuffer[oldIndex];
    }
    if (this.m_staticPressureBuffer) {
      this.m_staticPressureBuffer[newIndex] = this.m_staticPressureBuffer[oldIndex];
    }
    if (this.m_depthBuffer) {
      this.m_depthBuffer[newIndex] = this.m_depthBuffer[oldIndex];
    }
/*    if (this.m_expirationTimeBuffer.data) { // LATER
      this.m_expirationTimeBuffer.data[newIndex] =
        this.m_expirationTimeBuffer.data[oldIndex];
    }*/
    return newIndex;
  }
  // Only called from SolveZombie() or JoinParticleGroups().
  destroyParticleGroup(group: b2ParticleGroup) {
    _ASSERT && common.assert(this.m_groupCount > 0);
    _ASSERT && common.assert(!!group);

    this.m_world.publish('remove-particle-group', group);

    this.setGroupFlags(group, 0);
    for (let i = group.m_firstIndex; i < group.m_lastIndex; i++) {
      this.m_groupBuffer[i] = null;
    }

    if (group.m_prev) {
      group.m_prev.m_next = group.m_next;
    }
    if (group.m_next) {
      group.m_next.m_prev = group.m_prev;
    }
    if (group == this.m_groupList) {
      this.m_groupList = group.m_next;
    }

    --this.m_groupCount;
    // group.~b2ParticleGroup();
    // this.m_world.m_blockAllocator.Free(group, sizeof(b2ParticleGroup));
  }

  // updatePairsAndTriads( // TODO
  //   firstIndex: number, lastIndex: number, filter: ConnectionFilter)
  // {
  //   // Create pairs or triads.
  //   // All particles in each pair/triad should satisfy the following:
  //   // * firstIndex <= index < lastIndex
  //   // * don't have b2_zombieParticle
  //   // * ParticleCanBeConnected returns true
  //   // * ShouldCreatePair/ShouldCreateTriad returns true
  //   // Any particles in each pair/triad should satisfy the following:
  //   // * filter.IsNeeded returns true
  //   // * have one of k_pairFlags/k_triadsFlags
  //   _ASSERT && common.assert(firstIndex <= lastIndex);
  //   let particleFlags = 0;
  //   for (let i = firstIndex; i < lastIndex; i++) {
  //     particleFlags |= this.m_flagsBuffer.data[i];
  //   }
  //   if (particleFlags & b2ParticleSystem.k_pairFlags) {
  //     for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
  //       const contact = this.m_contactBuffer.getData()[k];
  //       const a = contact.getIndexA();
  //       const b = contact.getIndexB();
  //       const af = this.m_flagsBuffer.data[a];
  //       const bf = this.m_flagsBuffer.data[b];
  //       const groupA = this.m_groupBuffer[a];
  //       const groupB = this.m_groupBuffer[b];
  //       if (a >= firstIndex && a < lastIndex &&
  //         b >= firstIndex && b < lastIndex &&
  //         !((af | bf) & ParticleFlag.b2_zombieParticle) &&
  //         ((af | bf) & b2ParticleSystem.k_pairFlags) &&
  //         (filter.isNecessary(a) || filter.isNecessary(b)) &&
  //         particleCanBeConnected(af, groupA) &&
  //         particleCanBeConnected(bf, groupB) &&
  //         filter.shouldCreatePair(a, b))
  //       {
  //         const pair = this.m_pairBuffer.append();
  //         pair.indexA = a;
  //         pair.indexB = b;
  //         pair.flags = contact.getFlags();
  //         pair.strength = math.min(
  //           groupA ? groupA.m_strength : 1,
  //           groupB ? groupB.m_strength : 1);
  //         pair.distance = Vec2.distance(this.m_positionBuffer.data[a],
  //                         this.m_positionBuffer.data[b]);
  //       }
  //     }
  //     std.stable_sort_buffer(
  //       m_pairBuffer.Begin(), m_pairBuffer.End(), ComparePairIndices); // TODO
  //     m_pairBuffer.Unique(MatchPairIndices); // TODO
  //   }
  //   if (particleFlags & b2ParticleSystem.k_triadFlags) {
  //     const diagram = new VoronoiDiagram(lastIndex - firstIndex);
  //     for (let i = firstIndex; i < lastIndex; i++) {
  //       const flags = this.m_flagsBuffer.data[i];
  //       const group = this.m_groupBuffer[i];
  //       if (!(flags & ParticleFlag.b2_zombieParticle) &&
  //         particleCanBeConnected(flags, group)) {
  //         diagram.addGenerator(
  //           this.m_positionBuffer.data[i], i, filter.isNecessary(i));
  //       }
  //     }
  //     const stride = this.getParticleStride();
  //     diagram.generate(stride / 2, stride * 2);
  //     const updateTriadsCallback = (a: number, b: number, c: number) => {
  //       const af = this.m_flagsBuffer.data[a];
  //       const bf = this.m_flagsBuffer.data[b];
  //       const cf = this.m_flagsBuffer.data[c];
  //       if (((af | bf | cf) & b2ParticleSystem.k_triadFlags) &&
  //         filter.shouldCreateTriad(a, b, c))
  //       {
  //         const pa = this.m_positionBuffer.data[a];
  //         const pb = this.m_positionBuffer.data[b];
  //         const pc = this.m_positionBuffer.data[c];
  //         const dab = Vec2.sub(pa, pb);
  //         const dbc = Vec2.sub(pb, pc);
  //         const dca = Vec2.sub(pc, pa);
  //         const maxDistanceSquared = b2_maxTriadDistanceSquared *
  //                         this.m_squaredDiameter;
  //         if (Vec2.dot(dab, dab) > maxDistanceSquared ||
  //           Vec2.dot(dbc, dbc) > maxDistanceSquared ||
  //           Vec2.dot(dca, dca) > maxDistanceSquared)
  //         {
  //           return;
  //         }
  //         const groupA = this.m_groupBuffer[a];
  //         const groupB = this.m_groupBuffer[b];
  //         const groupC = this.m_groupBuffer[c];
  //         const triad = this.m_triadBuffer.append();
  //         triad.indexA = a;
  //         triad.indexB = b;
  //         triad.indexC = c;
  //         triad.flags = af | bf | cf;
  //         triad.strength = math.min(
  //           groupA ? groupA.m_strength : 1,
  //           groupB ? groupB.m_strength : 1,
  //           groupC ? groupC.m_strength : 1);
  //         const midPoint = Vec2.combine3(1 / 3, pa, 1 / 3, pb, 1 / 3, pc);
  //         triad.pa = Vec2.sub(pa, midPoint);
  //         triad.pb = Vec2.sub(pb, midPoint);
  //         triad.pc = Vec2.sub(pc, midPoint);
  //         triad.ka = -Vec2.dot(dca, dab);
  //         triad.kb = -Vec2.dot(dab, dbc);
  //         triad.kc = -Vec2.dot(dbc, dca);
  //         triad.s = Vec2.cross(pa, pb) + Vec2.cross(pb, pc) + Vec2.cross(pc, pa);
  //       }
  //     }
  //     diagram.getNodes(callback);
  //     std.stable_sort_buffer(
  //       m_triadBuffer.Begin(), m_triadBuffer.End(), CompareTriadIndices); // TODO
  //     m_triadBuffer.Unique(MatchTriadIndices);
  //   }
  // }
  updatePairsAndTriadsWithReactiveParticles() {
    class ReactiveFilter extends ConnectionFilter {
      private m_flagsBuffer: number[];

      constructor(flagsBuffer: number[]) {
        super();
        this.m_flagsBuffer = flagsBuffer;
      }
      
      isNecessary(index: number) {
        return (this.m_flagsBuffer[index] & ParticleFlag.b2_reactiveParticle) != 0;
      }
    }
    const filter = new ReactiveFilter(this.m_flagsBuffer.data);
    this.updatePairsAndTriads(0, this.m_count, filter);
  
    for (let i = 0; i < this.m_count; i++) {
      this.m_flagsBuffer.data[i] &= ~ParticleFlag.b2_reactiveParticle; // TODO do we have to cast to u32?
    }
    this.m_allParticleFlags &= ~ParticleFlag.b2_reactiveParticle;
  }
  static comparePairIndices(a: b2ParticlePair, b: b2ParticlePair) {
    const diffA = a.indexA - b.indexA;
    if (diffA != 0) return diffA < 0;
    return a.indexB < b.indexB;
  }
  static matchPairIndices(a: b2ParticlePair, b: b2ParticlePair) {
    return a.indexA == b.indexA && a.indexB == b.indexB;
  }
  static compareTriadIndices(a: b2ParticleTriad, b: b2ParticleTriad) {
    const diffA = a.indexA - b.indexA;
    if (diffA != 0) return diffA < 0;
    const diffB = a.indexB - b.indexB;
    if (diffB != 0) return diffB < 0;
    return a.indexC < b.indexC;
  }
  static matchTriadIndices(a: b2ParticleTriad, b: b2ParticleTriad) {
    return a.indexA == b.indexA && a.indexB == b.indexB && a.indexC == b.indexC;
  }

  static initializeParticleLists(
    group: b2ParticleGroup, nodeBuffer: ParticleListNode)
  {
    const bufferIndex = group.getBufferIndex();
    const particleCount = group.getParticleCount();
    for (let i = 0; i < particleCount; i++) {
      const node = nodeBuffer[i];
      node.list = node;
      node.next = null;
      node.count = 1;
      node.index = i + bufferIndex; // TODO ok?
    }
  }
  mergeParticleListsInContact(
    group: b2ParticleGroup, nodeBuffer: ParticleListNode)
  {
    const bufferIndex = group.getBufferIndex();
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      if (!group.containsParticle(a) || !group.containsParticle(b)) {
        continue;
      }
      let listA = nodeBuffer[a - bufferIndex].list;
      let listB = nodeBuffer[b - bufferIndex].list;
      if (listA == listB) {
        continue;
      }
      // To minimize the cost of insertion, make sure listA is longer than
      // listB.
      if (listA.count < listB.count) {
        [listA, listB] = [listB, listA];
      }
      _ASSERT && common.assert(listA.count >= listB.count);
      b2ParticleSystem.mergeParticleLists(listA, listB);
    }
  }
  static mergeParticleLists(
    listA: ParticleListNode, listB: ParticleListNode)
  {
    // Insert listB between index 0 and 1 of listA
    // Example:
    //     listA => a1 => a2 => a3 => NULL
    //     listB => b1 => b2 => NULL
    // to
    //     listA => listB => b1 => b2 => a1 => a2 => a3 => NULL
    _ASSERT && common.assert(listA != listB);
    for (let b = listB;;) { // TODO refactor?
      b.list = listA;
      const nextB = b.next;
      if (nextB) {
        b = nextB;
      } else {
        b.next = listA.next;
        break;
      }
    }
    listA.next = listB;
    listA.count += listB.count;
    listB.count = 0;
  }
  static findLongestParticleList(
    group: b2ParticleGroup, nodeBuffer: ParticleListNode): ParticleListNode
  {
    const particleCount = group.getParticleCount();
    let result = nodeBuffer;
    for (let i = 0; i < particleCount; i++) {
      const node = nodeBuffer[i];
      if (result.count < node.count) {
        result = node;
      }
    }
    return result;
  }
  mergeZombieParticleListNodes(
    group: b2ParticleGroup, nodeBuffer: ParticleListNode[],
    survivingList: ParticleListNode)
  {
    const particleCount = group.getParticleCount();
    for (let i = 0; i < particleCount; i++) {
      const node = nodeBuffer[i];
      if (node != survivingList &&
        (this.m_flagsBuffer.data[node.index] & ParticleFlag.b2_zombieParticle))
      {
        b2ParticleSystem.mergeParticleListAndNode(survivingList, node);
      }
    }
  }
  static mergeParticleListAndNode(
    list: ParticleListNode, node: ParticleListNode)
  {
    // Insert node between index 0 and 1 of list
    // Example:
    //     list => a1 => a2 => a3 => NULL
    //     node => NULL
    // to
    //     list => node => a1 => a2 => a3 => NULL
    _ASSERT && common.assert(node != list);
    _ASSERT && common.assert(node.list == node);
    _ASSERT && common.assert(node.count == 1);
    node.list = list;
    node.next = list.next;
    list.next = node;
    list.count++;
    node.count = 0;
  }
  createParticleGroupsFromParticleList(
    group: b2ParticleGroup, nodeBuffer: ParticleListNode[],
    survivingList: ParticleListNode)
  {
    const particleCount = group.getParticleCount();
    const def = {
      ...ParticleGroupDefDefault,
      groupFlags: group.getGroupFlags(),
      userData: group.getUserData(),
    };
    for (let i = 0; i < particleCount; i++) {
      const list = nodeBuffer[i];
      if (!list.count || list == survivingList) {
        continue;
      }
      _ASSERT && common.assert(list.list == list);
      const newGroup = this.createParticleGroup(def);
      for (let node = list; node; node = node.next) {
        const oldIndex = node.index;
        _ASSERT && common.assert(!(this.m_flagsBuffer.data[oldIndex] & ParticleFlag.b2_zombieParticle));
        const newIndex = this.cloneParticle(oldIndex, newGroup);
        this.m_flagsBuffer.data[oldIndex] |= ParticleFlag.b2_zombieParticle;
        node.index = newIndex;
      }
    }
  }
  updatePairsAndTriadsWithParticleList(
    group: b2ParticleGroup, nodeBuffer: ParticleListNode[])
  {
    const bufferIndex = group.getBufferIndex();
    // Update indices in pairs and triads. If an index belongs to the group,
    // replace it with the corresponding value in nodeBuffer.
    // Note that nodeBuffer is allocated only for the group and the index should
    // be shifted by bufferIndex.
    for (let k = 0; k < this.m_pairBuffer.getCount(); k++) {
      const pair = this.m_pairBuffer.getData()[k];
      const a = pair.indexA;
      const b = pair.indexB;
      if (group.containsParticle(a)) {
        pair.indexA = nodeBuffer[a - bufferIndex].index;
      }
      if (group.containsParticle(b)) {
        pair.indexB = nodeBuffer[b - bufferIndex].index;
      }
    }
    for (let k = 0; k < this.m_triadBuffer.getCount(); k++) {
      const triad = this.m_triadBuffer.getData()[k];
      const a = triad.indexA;
      const b = triad.indexB;
      const c = triad.indexC;
      if (group.containsParticle(a)) {
        triad.indexA = nodeBuffer[a - bufferIndex].index;
      }
      if (group.containsParticle(b)) {
        triad.indexB = nodeBuffer[b - bufferIndex].index;
      }
      if (group.containsParticle(c)) {
        triad.indexC = nodeBuffer[c - bufferIndex].index;
      }
    }
  }

  computeDepth() {
    // b2ParticleContact* contactGroups = (b2ParticleContact*) m_world->
    //   m_stackAllocator.Allocate(sizeof(b2ParticleContact) * m_contactBuffer.GetCount()); // TODO ok?
    const contactGroups = new Array(this.m_contactBuffer.getCount()).fill(null) as b2ParticleContact[];
    let contactGroupsCount = 0;
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = new b2ParticleContact();
      this.m_contactBuffer.getData()[k] = contact;
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const groupA = this.m_groupBuffer[a];
      const groupB = this.m_groupBuffer[b];
      if (groupA && groupA == groupB &&
        (groupA.m_groupFlags & b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth))
      {
        contactGroups[contactGroupsCount++] = contact;
      }
    }
    // b2ParticleGroup** groupsToUpdate = (b2ParticleGroup**) m_world->
    //   m_stackAllocator.Allocate(sizeof(b2ParticleGroup*) * m_groupCount); // TODO ok?
    const groupsToUpdate = new Array(this.m_groupCount).fill(null) as b2ParticleGroup[];
    let groupsToUpdateCount = 0;
    for (let group = this.m_groupList; group; group = group.getNext()) {
      if (group.m_groupFlags & b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth) {
        groupsToUpdate[groupsToUpdateCount++] = group;
        this.setGroupFlags(group,
                group.m_groupFlags &
                ~b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth); // TODO cast?
        for (let i = group.m_firstIndex; i < group.m_lastIndex; i++) {
          this.m_accumulationBuffer[i] = 0;
        }
      }
    }
    // Compute sum of weight of contacts except between different groups.
    for (let k = 0; k < contactGroupsCount; k++) {
      const contact = contactGroups[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const w = contact.getWeight();
      this.m_accumulationBuffer[a] += w;
      this.m_accumulationBuffer[b] += w;
    }
    _ASSERT && common.assert(!!this.m_depthBuffer);
    for (let i = 0; i < groupsToUpdateCount; i++) {
      const group = groupsToUpdate[i];
      for (let i = group.m_firstIndex; i < group.m_lastIndex; i++) {
        const w = this.m_accumulationBuffer[i];
        this.m_depthBuffer[i] = w < 0.8 ? 0 : Infinity;
      }
    }
    // The number of iterations is equal to particle number from the deepest
    // particle to the nearest surface particle, and in general it is smaller
    // than sqrt of total particle number.
    const iterationCount = i32(math.sqrt(this.m_count));
    for (let t = 0; t < iterationCount; t++) {
      let updated = false;
      for (let k = 0; k < contactGroupsCount; k++) {
        const contact = contactGroups[k];
        const a = contact.getIndexA();
        const b = contact.getIndexB();
        const r = 1 - contact.getWeight();
        const ap0 = this.m_depthBuffer[a];
        const bp0 = this.m_depthBuffer[b];
        const ap1 = bp0 + r;
        const bp1 = ap0 + r;
        if (ap0 > ap1) {
          this.m_depthBuffer[a] = ap1;
          updated = true;
        }
        if (bp0 > bp1) {
          this.m_depthBuffer[b] = bp1;
          updated = true;
        }
      }
      if (!updated) {
        break;
      }
    }
    for (let i = 0; i < groupsToUpdateCount; i++) {
      const group = groupsToUpdate[i];
      for (let i = group.m_firstIndex; i < group.m_lastIndex; i++) {
        const p = this.m_depthBuffer[i];
        if (p < Infinity) {
          this.m_depthBuffer[i] *= this.m_particleDiameter;
        } else {
          this.m_depthBuffer[i] = 0;
        }
      }
    }
    // m_world->m_stackAllocator.Free(groupsToUpdate);
    // m_world->m_stackAllocator.Free(contactGroups);
  }

  getInsideBoundsEnumerator(aabb: AABB): InsideBoundsEnumerator {
    const lowerTag = computeTag(
      this.m_inverseDiameter * aabb.lowerBound.x - 1,
      this.m_inverseDiameter * aabb.lowerBound.y - 1
    );
    const upperTag = computeTag(
      this.m_inverseDiameter * aabb.upperBound.x + 1,
      this.m_inverseDiameter * aabb.upperBound.y + 1
    );
    // const beginProxy = this.m_proxyBuffer.begin();
    // const endProxy = this.m_proxyBuffer.end();
    const firstProxy = std.lower_bound_buffer(this.m_proxyBuffer, lowerTag);
    const lastProxy = std.upper_bound_buffer(this.m_proxyBuffer, upperTag); // TODO this was optimized by only searching between firstProxy and endProxy
    return new InsideBoundsEnumerator(lowerTag, upperTag, this.m_proxyBuffer, firstProxy, lastProxy);
  }

  updateAllParticleFlags() {
    this.m_allParticleFlags = 0;
    for (let i = 0; i < this.m_count; i++) {
      this.m_allParticleFlags |= this.m_flagsBuffer.data[i];
    }
    this.m_needsUpdateAllParticleFlags = false;
  }
  updateAllGroupFlags() {
    this.m_allGroupFlags = 0;
    for (let group = this.m_groupList; group; group = group.getNext()) {
      this.m_allGroupFlags |= group.m_groupFlags;
    }
    this.m_needsUpdateAllGroupFlags = false;
  }
  addContact(a: number, b: number,
    contacts: b2GrowableBuffer<b2ParticleContact>)
  {
    const d = Vec2.sub(this.m_positionBuffer.data[b], this.m_positionBuffer.data[a]);
    const distBtParticlesSq = Vec2.dot(d, d);
    if (distBtParticlesSq < this.m_squaredDiameter) {
      const invD = math.invSqrt(distBtParticlesSq);
      const contact = contacts.append();
      contact.setIndices(a, b);
      contact.setFlags(this.m_flagsBuffer.data[a] | this.m_flagsBuffer.data[b]);
      // 1 - distBtParticles / diameter
      contact.setWeight(1 - distBtParticlesSq * invD * this.m_inverseDiameter);
      contact.setNormal(Vec2.mul(invD, d));
    }
  }
  findContacts_Reference(contacts: b2GrowableBuffer<b2ParticleContact>) {
    const beginProxy = this.m_proxyBuffer.begin();
    const endProxy = this.m_proxyBuffer.end();

    // TODO check
    contacts.setCount(0);
    for (let a_i = beginProxy, c_i = beginProxy; a_i < endProxy; a_i++) {
      const a = this.m_proxyBuffer.getData()[a_i];
      const rightTag = computeRelativeTag(a.tag, 1, 0);
      for (let b_i = a_i + 1; b_i < endProxy; b_i++) {
        const b = this.m_proxyBuffer.getData()[b_i];
        if (rightTag < b.tag) break;
        this.addContact(a.index, b.index, contacts); // TODO can we use a_i, b_i directly?
      }
      const bottomLeftTag = computeRelativeTag(a.tag, -1, 1);
      for (; c_i < endProxy; c_i++) {
        const c = this.m_proxyBuffer.getData()[c_i];
        if (bottomLeftTag <= c.tag) break;
      }
      const bottomRightTag = computeRelativeTag(a.tag, 1, 1);
      for (let b_i = c_i; b_i < endProxy; b_i++) {
        const b = this.m_proxyBuffer.getData()[b_i];
        if (bottomRightTag < b.tag) break;
        this.addContact(a.index, b.index, contacts); // TODO can we use a_i, b_i directly?
      }
    }
  }
  /**
   * Put the positions and indices in proxy-order. This allows us to process
   * particles with SIMD, since adjacent particles are adjacent in memory.
   */
  // reorderForFindContact(reordered: FindContactInput[],
  //                alignedCount: number)
  // {
  //   int i = 0;
  //   for (; i < m_count; ++i)
  //   {
  //     const int proxyIndex = m_proxyBuffer[i].index;
  //     FindContactInput& r = reordered[i];
  //     r.proxyIndex = proxyIndex;
  //     r.position = m_positionBuffer.data[proxyIndex];
  //   }

  //   // We process multiple elements at a time, so we may read off the end of
  //   // the array. Pad the array with a few elements, so we don't end up
  //   // outputing spurious contacts.
  //   for (; i < alignedCount; ++i)
  //   {
  //     FindContactInput& r = reordered[i];
  //     r.proxyIndex = 0;
  //     r.position = b2Vec2(b2_maxFloat, b2_maxFloat);
  //   }
  // }
  /**
   * Check particles to the right of 'startIndex', outputing FindContactChecks
   * until we find an index that is greater than 'bound'. We skip over the
   * indices NUM_V32_SLOTS at a time, because they are processed in groups
   * in the SIMD function.
   */
  // gatherChecksOneParticle(
  //   bound: number,
  //   startIndex: number,
  //   particleIndex: number,
  //  int* nextUncheckedIndex,
  //   checks: b2GrowableBuffer<FindContactCheck>)
  // {
  //   // The particles have to be heavily packed together in order for this
  //   // loop to iterate more than once. In almost all situations, it will
  //   // iterate less than twice.
  //   for (int comparatorIndex = startIndex;
  //       comparatorIndex < m_count;
  //         comparatorIndex += NUM_V32_SLOTS)
  //   {
  //     if (m_proxyBuffer[comparatorIndex].tag > bound)
  //       break;
  
  //     FindContactCheck& out = checks.Append();
  //     out.particleIndex = (uint16)particleIndex;
  //     out.comparatorIndex = (uint16)comparatorIndex;
  
  //     // This is faster inside the 'for' since there are so few iterations.
  //     if (nextUncheckedIndex != NULL)
  //     {
  //       *nextUncheckedIndex = comparatorIndex + NUM_V32_SLOTS;
  //     }
  //   }
  // }
  // gatherChecks(checks: b2GrowableBuffer<FindContactCheck>) {
  //   int bottomLeftIndex = 0;
  //   for (int particleIndex = 0; particleIndex < m_count; ++particleIndex)
  //   {
  //     const uint32 particleTag = m_proxyBuffer[particleIndex].tag;
  
  //     // Add checks for particles to the right.
  //     const uint32 rightBound = particleTag + relativeTagRight;
  //     int nextUncheckedIndex = particleIndex + 1;
  //     GatherChecksOneParticle(rightBound,
  //                 particleIndex + 1,
  //                 particleIndex,
  //                 &nextUncheckedIndex,
  //                 checks);
  
  //     // Find comparator index below and to left of particle.
  //     const uint32 bottomLeftTag = particleTag + relativeTagBottomLeft;
  //     for (; bottomLeftIndex < m_count; ++bottomLeftIndex)
  //     {
  //       if (bottomLeftTag <= m_proxyBuffer[bottomLeftIndex].tag)
  //         break;
  //     }
  
  //     // Add checks for particles below.
  //     const uint32 bottomRightBound = particleTag + relativeTagBottomRight;
  //     const int bottomStartIndex = b2Max(bottomLeftIndex, nextUncheckedIndex);
  //     GatherChecksOneParticle(bottomRightBound,
  //                 bottomStartIndex,
  //                 particleIndex,
  //                 NULL,
  //                 checks);
  //   }
  // }
  // #if defined(LIQUIDFUN_SIMD_NEON)
/*  void FindContacts_Simd(
    b2GrowableBuffer<b2ParticleContact>& contacts)
  {
    contacts.SetCount(0);
  
    const int alignedCount = m_count + NUM_V32_SLOTS;
    FindContactInput* reordered = (FindContactInput*)
      m_world->m_stackAllocator.Allocate(
        sizeof(FindContactInput) * alignedCount);
  
    // Put positions and indices into proxy-order.
    // This allows us to efficiently check for contacts using SIMD.
    ReorderForFindContact(reordered, alignedCount);
  
    // Perform broad-band contact check using tags to approximate
    // positions. This reduces the number of narrow-band contact checks
    // that use actual positions.
    static const int MAX_EXPECTED_CHECKS_PER_PARTICLE = 3;
    b2GrowableBuffer<FindContactCheck> checks(m_world->m_blockAllocator);
    checks.Reserve(MAX_EXPECTED_CHECKS_PER_PARTICLE * m_count);
    GatherChecks(checks);
  
    // Perform narrow-band contact checks using actual positions.
    // Any particles whose centers are within one diameter of each other are
    // considered contacting.
    FindContactsFromChecks_Simd(reordered, checks.Data(), checks.GetCount(),
                  m_squaredDiameter, m_inverseDiameter,
                  m_flagsBuffer.data, contacts);
  
    m_world->m_stackAllocator.Free(reordered);
  }*/
  // #endif // defined(LIQUIDFUN_SIMD_NEON)
  // LIQUIDFUN_SIMD_INLINE TODO
  findContacts(contacts: b2GrowableBuffer<b2ParticleContact>) {
//    #if defined(LIQUIDFUN_SIMD_NEON)
//      this.findContacts_Simd(contacts);
//    #else
      this.findContacts_Reference(contacts);
//    #endif
  
/*    #if defined(LIQUIDFUN_SIMD_TEST_VS_REFERENCE)
      b2GrowableBuffer<b2ParticleContact>
        reference(m_world->m_blockAllocator);
      FindContacts_Reference(reference);
  
      b2Assert(contacts.GetCount() == reference.GetCount());
      for (int32 i = 0; i < contacts.GetCount(); ++i)
      {
        b2Assert(contacts[i].ApproximatelyEqual(reference[i]));
      }
    #endif // defined(LIQUIDFUN_SIMD_TEST_VS_REFERENCE)*/
  }
//  #if defined(LIQUIDFUN_SIMD_NEON)
  // updateProxyTags(
  //   tags: number[],
  //   proxies: b2GrowableBuffer<Proxy>)
  // {
  //   const Proxy* const endProxy = proxies.End();
  //   for (Proxy* proxy = proxies.Begin(); proxy < endProxy; ++proxy) // TODO
  //   {
  //     proxy->tag = tags[proxy->index];
  //   }
  // }
//  #endif // defined(LIQUIDFUN_SIMD_NEON)
  // static proxyBufferHasIndex(
  //   index: number, a: Proxy, count: number)
  // {
  //   for (let j = 0; j < count; ++j)
  //   {
  //     if (a[j].index == index)
  //       return true;
  //   }
  //   return false;
  // }
  // static numProxiesWithSameTag(
  //   const Proxy* const a, const Proxy* const b, int count) // TODO
  // {
  //   const uint32 tag = a[0].tag;
  //   for (int num = 0; num < count; ++num)
  //   {
  //     if (a[num].tag != tag || b[num].tag != tag)
  //       return num;
  //   }
  //   return count;
  // }
  /**
   * Precondition: both 'a' and 'b' should be sorted by tag, but don't need to be
   * sorted by index.
   */
  // static areProxyBuffersTheSame(a: b2GrowableBuffer<Proxy>,
  //                       b: b2GrowableBuffer<Proxy>) // TODO
  // {
  //   if (a.GetCount() != b.GetCount())
  //     return false;
  
  //   // A given tag may have several indices. The order of these indices is
  //   // not important, but the set must be equivalent.
  //   for (int i = 0; i < a.GetCount();)
  //   {
  //     const int numWithSameTag = NumProxiesWithSameTag(
  //       &a[i], &b[i], a.GetCount() - i);
  //     if (numWithSameTag == 0)
  //       return false;
  
  //     for (int j = 0; j < numWithSameTag; ++j)
  //     {
  //       const bool hasIndex = ProxyBufferHasIndex(
  //         a[i + j].index, &b[i], numWithSameTag);
  //       if (!hasIndex)
  //         return false;
  //     }
  
  //     i += numWithSameTag;
  //   }
  //   return true;
  // }
  /**
   * Recalculate 'tag' in proxies using m_positionBuffer.
   * The 'tag' is an approximation of position, in left-right, top-bottom order.
   */
  updateProxies_Reference(proxies: b2GrowableBuffer<Proxy>) {
    for (const proxy of proxies.getData()) {
      const i = proxy.index;
      const p = this.m_positionBuffer.data[i];
      proxy.tag = computeTag(
        this.m_inverseDiameter * p.x,
        this.m_inverseDiameter * p.y
      );
    }
  }
//  #if defined(LIQUIDFUN_SIMD_NEON)
/*  void UpdateProxies_Simd(b2GrowableBuffer<Proxy>& proxies)
  {
    uint32* tags = (uint32*)
      m_world->m_stackAllocator.Allocate(m_count * sizeof(uint32));
  
    // Calculate tag for every position.
    // 'tags' array is in position-order.
    CalculateTags_Simd(m_positionBuffer.data, m_count,
               m_inverseDiameter, tags);
  
    // Update 'tag' element in the 'proxies' array to the new values.
    UpdateProxyTags(tags, proxies);
  
    m_world->m_stackAllocator.Free(tags);
  }*/
//  #endif // defined(LIQUIDFUN_SIMD_NEON)
//  LIQUIDFUN_SIMD_INLINE TODO
  updateProxies(proxies: b2GrowableBuffer<Proxy>) {
/*    #if defined(LIQUIDFUN_SIMD_TEST_VS_REFERENCE)
      b2GrowableBuffer<Proxy> reference(proxies);
    #endif
  
    #if defined(LIQUIDFUN_SIMD_NEON)
      UpdateProxies_Simd(proxies);
    #else*/
      this.updateProxies_Reference(proxies);
 /*   #endif
  
    #if defined(LIQUIDFUN_SIMD_TEST_VS_REFERENCE)
      UpdateProxies_Reference(reference);
      b2Assert(AreProxyBuffersTheSame(proxies, reference));
    #endif*/
  }
  /**
   * Sort the proxy array by 'tag'. This orders the particles into rows that
   * run left-to-right, top-to-bottom. The rows are spaced m_particleDiameter
   * apart, such that a particle in one row can only collide with the rows
   * immediately above and below it. This ordering makes collision computation
   * tractable.
   *
   * TODO_google OPT: The sort is a hot spot on the profiles. We could use SIMD to
   * speed this up. See http://www.vldb.org/pvldb/1/1454171.pdf for an excellent
   * explanation of a SIMD mergesort algorithm.
   */
  sortProxies(proxies: b2GrowableBuffer<Proxy>) {
    proxies.getData().sort((a, b) => a.tag - b.tag);
  }
  /**
   * Only changes 'contacts', but the contact filter has a non-const 'this'
   * pointer, so this member function cannot be const.
   */
  // filterContacts(contacts: b2GrowableBuffer<b2ParticleContact>) { // LATER
  //   // Optionally filter the contact.
  //   const contactFilter = this.getParticleContactFilter();
  //   if (contactFilter == null)
  //     return;
  
  //   contacts.removeIf(b2ParticleContactRemovePredicate(this, contactFilter));
  // }
  // notifyContactListenerPreContact(particlePairs: b2ParticlePairSet) { // LATER
  //   const contactListener = this.getParticleContactListener();
  //   if (contactListener == null)
  //     return;
  
  //   particlePairs.initialize(this.m_contactBuffer.begin(),
  //                 this.m_contactBuffer.getCount(),
  //                   this.getFlagsBuffer());
  // }
  // Note: This function is not const because 'this' in BeginContact and
  // EndContact callbacks must be non-const. However, this function itself
  // does not change any internal data (though the callbacks might).
  // notifyContactListenerPostContact(particlePairs: b2ParticlePairSet) { // LATER
  //   const contactListener = this.getParticleContactListener();
  //   if (contactListener == null)
  //     return;
  
  //   // Loop through all new contacts, reporting any new ones, and
  //   // "invalidating" the ones that still exist.
  //   const endContact = this.m_contactBuffer.end();
  //   for (let contact = this.m_contactBuffer.begin();
  //      contact < endContact; ++contact) // TODO
  //   {
  //     const pair = new ParticlePair();
  //     pair.first = contact.getIndexA();
  //     pair.second = contact.getIndexB();
  //     const itemIndex = particlePairs.find(pair);
  //     if (itemIndex >= 0) {
  //       // Already touching, ignore this contact.
  //       particlePairs.invalidate(itemIndex);
  //     } else {
  //       // Just started touching, inform the listener.
  //       contactListener.beginContact(this, contact);
  //     }
  //   }
  
  //   // Report particles that are no longer touching.
  //   // That is, any pairs that were not invalidated above.
  //   const pairCount = particlePairs.getCount();
  //   const pairs = particlePairs.getBuffer();
  //   const valid = particlePairs.getValidBuffer();
  //   for (let i = 0; i < pairCount; ++i) {
  //     if (valid[i]) {
  //       contactListener.endContact(this, pairs[i].first,
  //                     pairs[i].second);
  //     }
  //   }
  // }
  updateContacts(exceptZombie: boolean) {
    this.updateProxies(this.m_proxyBuffer);
    this.sortProxies(this.m_proxyBuffer);

    // const particlePairs = new b2ParticlePairSet();
    // this.notifyContactListenerPreContact(particlePairs); // LATER

    this.findContacts(this.m_contactBuffer);
    // this.filterContacts(this.m_contactBuffer); // LATER

    // this.notifyContactListenerPostContact(particlePairs); // LATER

    if (exceptZombie) {
      this.m_contactBuffer.removeIf(b2ParticleContactIsZombie);
    }
  }
  // notifyBodyContactListenerPreContact( // LATER
  //   fixtureSet: FixtureParticleSet) {
  //   const contactListener = this.getFixtureContactListener();
  //   if (contactListener == null)
  //     return;

  //   fixtureSet.initialize(this.m_bodyContactBuffer.begin(),
  //                 this.m_bodyContactBuffer.getCount(),
  //                 this.getFlagsBuffer());
  // }
  /**
   * If a contact listener is present and the contact is just starting
   * report the contact.  If the contact is already in progress invalid
   * the contact from m_fixtureSet.
   */
  // notifyBodyContactListenerPostContact(fixtureSet: FixtureParticleSet) { // LATER
  //   const contactListener = this.getFixtureContactListener();
  //   if (contactListener == null)
  //     return;

  //   // Loop through all new contacts, reporting any new ones, and
  //   // "invalidating" the ones that still exist.
  //   for (let contact = this.m_bodyContactBuffer.begin();
  //     contact != this.m_bodyContactBuffer.end(); ++contact)
  //   {
  //     b2Assert(contact);
  //     FixtureParticle fixtureParticleToFind;
  //     fixtureParticleToFind.first = contact->fixture;
  //     fixtureParticleToFind.second = contact->index;
  //     const int32 index = fixtureSet.Find(fixtureParticleToFind);
  //     if (index >= 0)
  //     {
  //       // Already touching remove this from the set.
  //       fixtureSet.Invalidate(index);
  //     }
  //     else
  //     {
  //       // Just started touching, report it!
  //       contactListener->BeginContact(this, contact);
  //     }
  //   }

  //   // If the contact listener is enabled, report all fixtures that are no
  //   // longer in contact with particles.
  //   const FixtureParticle* const fixtureParticles = fixtureSet.GetBuffer();
  //   const int8* const fixtureParticlesValid = fixtureSet.GetValidBuffer();
  //   const int32 fixtureParticleCount = fixtureSet.GetCount();
  //   for (int32 i = 0; i < fixtureParticleCount; ++i)
  //   {
  //     if (fixtureParticlesValid[i])
  //     {
  //       const FixtureParticle* const fixtureParticle =
  //         &fixtureParticles[i];
  //       contactListener->EndContact(fixtureParticle->first, this,
  //                     fixtureParticle->second);
  //     }
  //   }
  // }
  // updateBodyContacts() { // TODO
  //   // If the particle contact listener is enabled, generate a set of
  //   // fixture / particle contacts.
  //   const fixtureSet = new FixtureParticleSet(); // TODO ok?
  //   // this.notifyBodyContactListenerPreContact(fixtureSet); // LATER

  //   if (this.m_stuckThreshold > 0) {
  //     const particleCount = this.getParticleCount();
  //     for (let i = 0; i < particleCount; i++) {
  //       // Detect stuck particles, see comment in
  //       // b2ParticleSystem::DetectStuckParticle()
  //       this.m_bodyContactCountBuffer.data[i] = 0;
  //       if (this.m_timestamp > (this.m_lastBodyContactStepBuffer.data[i] + 1)) {
  //         this.m_consecutiveContactStepsBuffer.data[i] = 0;
  //       }
  //     }
  //   }
  //   this.m_bodyContactBuffer.setCount(0);
  //   this.m_stuckParticleBuffer.setCount(0);

  //   class UpdateBodyContactsCallback extends b2FixtureParticleQueryCallback {
  //     private m_contactFilter: b2ContactFilter;

  //     constructor(system: b2ParticleSystem, contactFilter: b2ContactFilter) {
  //       super(system);
  //       this.m_contactFilter = contactFilter;
  //     }

  //     // Call the contact filter if it's set, to determine whether to
  //     // filter this contact.  Returns true if contact calculations should
  //     // be performed, false otherwise.
  //     shouldCollide(fixture: Fixture,
  //                   particleIndex: number)
  //     {
  //       if (this.m_contactFilter) {
  //         const flags = this.m_system.getFlagsBuffer();
  //         if (flags[particleIndex] & ParticleFlag.b2_fixtureContactFilterParticle) {
  //           return this.m_contactFilter.shouldCollide(fixture, this.m_system,
  //                               particleIndex);
  //         }
  //       }
  //       return true;
  //     }

  //     reportFixtureAndParticle(
  //                 fixture: Fixture, childIndex: number, a: number)
  //     {
  //       const ap = this.m_system.m_positionBuffer.data[a];
  //       const n = new Vec2();
  //       const d = fixture.computeDistance(ap, n, childIndex);
  //       if (d < this.m_system.m_particleDiameter && this.shouldCollide(fixture, a)) {
  //         const b = fixture.getBody();
  //         const bp = b.getWorldCenter();
  //         const bm = b.getMass();
  //         const bI = b.getInertia() - bm * b.getLocalCenter().lengthSquared();
  //         const invBm = bm > 0 ? 1 / bm : 0;
  //         const invBI = bI > 0 ? 1 / bI : 0;
  //         const invAm =
  //           this.m_system.m_flagsBuffer.data[a] &
  //           ParticleFlag.b2_wallParticle ? 0 : this.m_system.getParticleInvMass();
  //         const rp = Vec2.sub(ap, bp);
  //         const rpn = Vec2.cross(rp, n);
  //         const invM = invAm + invBm + invBI * rpn * rpn;

  //         const contact =
  //           this.m_system.m_bodyContactBuffer.append();
  //         contact.index = a;
  //         contact.body = b;
  //         contact.fixture = fixture;
  //         contact.weight = 1 - d * this.m_system.m_inverseDiameter;
  //         contact.normal.set(Vec2.neg(n));
  //         contact.mass = invM > 0 ? 1 / invM : 0;
  //         this.m_system.detectStuckParticle(a);
  //       }
  //     }
  //   }
  //   const callback = new UpdateBodyContactsCallback(this, this.getFixtureContactFilter());

  //   const aabb = new AABB();
  //   this.computeAABB(aabb);
  //   this.m_world.queryAABB(callback, aabb); // TODO

  //   // if (this.m_def.strictContactCheck) { // LATER
  //   //   this.removeSpuriousBodyContacts();
  //   // }

  //   // this.notifyBodyContactListenerPostContact(fixtureSet); // LATER
  // }

  solve(step: TimeStep) {
    if (this.m_count == 0) {
      return;
    }
    // If particle lifetimes are enabled, destroy particles that are too old.
/*    if (this.m_expirationTimeBuffer.data) { // LATER
      this.solveLifetimes(step);
    }*/
    if (this.m_allParticleFlags & ParticleFlag.b2_zombieParticle) {
      this.solveZombie(); // TODO
    }
    if (this.m_needsUpdateAllParticleFlags) {
      this.updateAllParticleFlags();
    }
    if (this.m_needsUpdateAllGroupFlags) {
      this.updateAllGroupFlags();
    }
    if (this.m_paused) {
      return;
    }
    for (this.m_iterationIndex = 0;
      this.m_iterationIndex < step.particleIterations;
      this.m_iterationIndex++)
    {
      ++this.m_timestamp;
      const subStep = new TimeStep(); // TODO reuse instance (also we don't need all properties)
      subStep.dt = step.dt / step.particleIterations;
      subStep.inv_dt = step.inv_dt * step.particleIterations;
      subStep.velocityIterations = step.velocityIterations;
      subStep.positionIterations = step.positionIterations;
      subStep.particleIterations = step.particleIterations;
      subStep.warmStarting = step.warmStarting;
      subStep.blockSolve = step.blockSolve;
      subStep.inv_dt0 = step.inv_dt0;
      subStep.dtRatio = step.dtRatio;
      this.updateContacts(false);
      this.updateBodyContacts(); // TODO
      this.computeWeight();
      if (this.m_allGroupFlags & b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth) {
        this.computeDepth(); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_reactiveParticle) {
        this.updatePairsAndTriadsWithReactiveParticles(); // TODO
      }
      if (this.m_hasForce) {
        this.solveForce(subStep);
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_viscousParticle) {
        this.solveViscous(); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_repulsiveParticle) {
        this.solveRepulsive(subStep); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_powderParticle) {
        this.solvePowder(subStep); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_tensileParticle) {
        this.solveTensile(subStep); // TODO
      }
      if (this.m_allGroupFlags & b2ParticleGroupFlag.b2_solidParticleGroup) {
        this.solveSolid(subStep); // TODO
      }
      // if (this.m_allParticleFlags & ParticleFlag.b2_colorMixingParticle) {
      //   this.solveColorMixing(); // LATER
      // }
      this.solveGravity(subStep);
      if (this.m_allParticleFlags & ParticleFlag.b2_staticPressureParticle) {
        this.solveStaticPressure(subStep); // TODO
      }
      this.solvePressure(subStep); // TODO
      this.solveDamping(subStep); // TODO
      if (this.m_allParticleFlags & b2ParticleSystem.k_extraDampingFlags) {
        this.solveExtraDamping(); // TODO
      }
      // SolveElastic and SolveSpring refer the current velocities for
      // numerical stability, they should be called as late as possible.
      if (this.m_allParticleFlags & ParticleFlag.b2_elasticParticle) {
        this.solveElastic(subStep); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_springParticle) {
        this.solveSpring(subStep);
      }
      this.limitVelocity(subStep);
      if (this.m_allGroupFlags & b2ParticleGroupFlag.b2_rigidParticleGroup) {
        this.solveRigidDamping(); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_barrierParticle) {
        this.solveBarrier(subStep); // TODO
      }
      // SolveCollision, SolveRigid and SolveWall should be called after
      // other force functions because they may require particles to have
      // specific velocities.
      this.solveCollision(subStep); // TODO
      if (this.m_allGroupFlags & b2ParticleGroupFlag.b2_rigidParticleGroup) {
        this.solveRigid(subStep); // TODO
      }
      if (this.m_allParticleFlags & ParticleFlag.b2_wallParticle) {
        this.solveWall();
      }
      // The particle positions can be updated only at the end of substep.
      for (let i = 0; i < this.m_count; i++) {
        this.m_positionBuffer.data[i].addMul(subStep.dt, this.m_velocityBuffer.data[i]);
      }
    }
  }
  solveCollision(step: TimeStep) {
    // This function detects particles which are crossing boundary of bodies
    // and modifies velocities of them so that they will move just in front of
    // boundary. This function function also applies the reaction force to
    // bodies as precisely as the numerical stability is kept.
    const aabb = new AABB();
    aabb.lowerBound.x = +Infinity;
    aabb.lowerBound.y = +Infinity;
    aabb.upperBound.x = -Infinity;
    aabb.upperBound.y = -Infinity;
    for (let i = 0; i < this.m_count; i++) {
      const v = this.m_velocityBuffer.data[i];
      const p1 = this.m_positionBuffer.data[i];
      const p2 = Vec2.combine(1, p1, step.dt, v);
      aabb.lowerBound = Vec2.lower(aabb.lowerBound, Vec2.lower(p1, p2));
      aabb.upperBound = Vec2.upper(aabb.upperBound, Vec2.upper(p1, p2)); // TODO more performant Solution
    }
    class SolveCollisionCallback extends b2FixtureParticleQueryCallback {
      private m_step: TimeStep;
      private m_contactFilter: b2ContactFilter;

      constructor(system: b2ParticleSystem, step: TimeStep, contactFilter: b2ContactFilter) {
        super(system)
        this.m_step = step;
        this.m_contactFilter = contactFilter;
      }

      // Call the contact filter if it's set, to determine whether to
      // filter this contact.  Returns true if contact calculations should
      // be performed, false otherwise.
      shouldCollide(fixture: Fixture,
                    particleIndex: number) {
        if (this.m_contactFilter) {
          const flags = this.m_system.getFlagsBuffer();
          if (flags[particleIndex] & ParticleFlag.b2_fixtureContactFilterParticle) {
            return this.m_contactFilter.shouldCollide(fixture, this.m_system,
                                particleIndex);
          }
        }
        return true;
      }
  
      reportFixtureAndParticle(
                  fixture: Fixture, childIndex: number, a: number)
      {
        if (this.shouldCollide(fixture, a)) {
          const body = fixture.getBody();
          const ap = this.m_system.m_positionBuffer.data[a];
          const av = this.m_system.m_velocityBuffer.data[a];
          const output = {} as RayCastOutput; // TODO shape not constant -> deoptimization?
          const input = {} as RayCastInput;
          if (this.m_system.m_iterationIndex == 0) {
            // Put 'ap' in the local space of the previous frame
            let p1 = Transform.mulTVec2(body.m_xf0, ap);
            if (fixture.getShape().getType() == CircleShape.TYPE) {
              // Make relative to the center of the circle
              p1.sub(body.getLocalCenter());
              // Re-apply rotation about the center of the
              // circle
              p1 = Rot.mulVec2(body.m_xf0.q, p1); // TODO can we mutate p1 directly?
              // Subtract rotation of the current frame
              p1 = Rot.mulTVec2(body.m_xf.q, p1);
              // Return to local space
              p1.add(body.getLocalCenter());
            }
            // Return to global space and apply rotation of current frame
            input.p1 = Transform.mulVec2(body.m_xf, p1);
          } else {
            input.p1 = ap; // TODO maybe clone here
          }
          input.p2 = Vec2.combine(1, ap, this.m_step.dt, av);
          input.maxFraction = 1;
          if (fixture.rayCast(output, input, childIndex)) {
            const n = output.normal;
            const p = Vec2.combine3(
              (1 - output.fraction), input.p1,
              output.fraction, input.p2,
              linearSlop, n
            );
            const v = Vec2.sub(p, ap).mul(this.m_step.inv_dt);
            this.m_system.m_velocityBuffer.data[a] = v;
            const f = Vec2.sub(av, v).mul(this.m_step.inv_dt *
              this.m_system.getParticleMass());
            this.m_system.particleApplyForce(a, f);
          }
        }
      }
    }
    const callback = new SolveCollisionCallback(this, step, this.getFixtureContactFilter());
    this.m_world.queryAABB(callback, aabb);
  }
  limitVelocity(step: TimeStep) {
    const criticalVelocitySquared = this.getCriticalVelocitySquared(step);
    for (let i = 0; i < this.m_count; i++) {
      const v = this.m_velocityBuffer.data[i];
      const v2 = Vec2.dot(v, v);
      if (v2 > criticalVelocitySquared) {
        v.mul(Math.sqrt(criticalVelocitySquared / v2));
      }
    }
  }
  solveGravity(step: TimeStep) {
    const gravity = Vec2.mul(step.dt * this.m_def.gravityScale, this.m_world.getGravity());
    for (let i = 0; i < this.m_count; i++) {
      this.m_velocityBuffer.data[i].add(gravity);
    }
  }
  solveBarrier(step: TimeStep) {
    // If a particle is passing between paired barrier particles,
    // its velocity will be decelerated to avoid passing.
    for (let i = 0; i < this.m_count; i++) {
      const flags = this.m_flagsBuffer.data[i];
      const k_barrierWallFlags = // TODO this was static
                      ParticleFlag.b2_barrierParticle | ParticleFlag.b2_wallParticle;
      if ((flags & k_barrierWallFlags) == k_barrierWallFlags)
      {
        this.m_velocityBuffer.data[i].setZero();
      }
    }
    const tmax = b2_barrierCollisionTime * step.dt;
    for (let k = 0; k < this.m_pairBuffer.getCount(); k++) {
      const pair = this.m_pairBuffer.getData()[k];
      if (pair.flags & ParticleFlag.b2_barrierParticle) {
        const a = pair.indexA;
        const b = pair.indexB;
        const pa = this.m_positionBuffer.data[a];
        const pb = this.m_positionBuffer.data[b];
        const aabb = new AABB();
        aabb.lowerBound = Vec2.lower(pa, pb); // TODO directly use constructor?
        aabb.upperBound = Vec2.upper(pa, pb);
        const aGroup = this.m_groupBuffer[a];
        const bGroup = this.m_groupBuffer[b];
        const va = this.getLinearVelocity(aGroup, a, pa);
        const vb = this.getLinearVelocity(bGroup, b, pb);
        const pba = Vec2.sub(pb, pa);
        const vba = Vec2.sub(vb, va);
        const enumerator = this.getInsideBoundsEnumerator(aabb);
        let c;
        while ((c = enumerator.getNext()) >= 0) { // TODO ok?
          const pc = this.m_positionBuffer.data[c];
          const cGroup = this.m_groupBuffer[c];
          if (aGroup != cGroup && bGroup != cGroup) {
            const vc = this.getLinearVelocity(cGroup, c, pc);
            // Solve the equation below:
            //   (1-s)*(pa+t*va)+s*(pb+t*vb) = pc+t*vc
            // which expresses that the particle c will pass a line
            // connecting the particles a and b at the time of t.
            // if s is between 0 and 1, c will pass between a and b.
            const pca = Vec2.sub(pc, pa);
            const vca = Vec2.sub(vc, va);
            const e2 = Vec2.cross(vba, vca);
            const e1 = Vec2.cross(pba, vca) - Vec2.cross(pca, vba);
            const e0 = Vec2.cross(pba, pca);
            let s: number, t: number;
            let qba: Vec2, qca: Vec2;
            if (e2 == 0) { // TODO really == 0?
              if (e1 == 0) continue;
              t = - e0 / e1;
              if (!(t >= 0 && t < tmax)) continue;
              qba = Vec2.combine(1, pba, t, vba);
              qca = Vec2.combine(1, pca, t, vca);
              s = Vec2.dot(qba, qca) / Vec2.dot(qba, qba);
              if (!(s >= 0 && s <= 1)) continue;
            } else {
              const det = e1 * e1 - 4 * e0 * e2;
              if (det < 0) continue;
              const sqrtDet = math.sqrt(det);
              let t1 = (- e1 - sqrtDet) / (2 * e2);
              let t2 = (- e1 + sqrtDet) / (2 * e2);
              if (t1 > t2) {
                [t1, t2] = [t2, t1];
              }
              t = t1;
              qba = Vec2.combine(1, pba, t, vba);
              qca = Vec2.combine(1, pca, t, vca);
              s = Vec2.dot(qba, qca) / Vec2.dot(qba, qba);
              if (!(t >= 0 && t < tmax && s >= 0 && s <= 1)) {
                t = t2;
                if (!(t >= 0 && t < tmax)) continue;
                qba = Vec2.combine(1, pba, t, vba);
                qca = Vec2.combine(1, pca, t, vca);
                s = Vec2.dot(qba, qca) / Vec2.dot(qba, qba);
                if (!(s >= 0 && s <= 1)) continue;
              }
            }
            // Apply a force to particle c so that it will have the
            // interpolated velocity at the collision point on line ab.
            const dv = Vec2.combine3(1, va, s, vba, -1, vc);
            const f = Vec2.mul(this.getParticleMass(), dv);
            if (this.isRigidGroup(cGroup)) {
              // If c belongs to a rigid group, the force will be
              // distributed in the group.
              const mass = cGroup.getMass();
              const inertia = cGroup.getInertia();
              if (mass > 0) {
                cGroup.m_linearVelocity.add(Vec2.mul(1 / mass, f));
              }
              if (inertia > 0)
              {
                cGroup.m_angularVelocity +=
                Vec2.cross(Vec2.sub(pc, cGroup.getCenter()), f) / inertia;
              }
            }
            else {
              this.m_velocityBuffer.data[c].add(dv);
            }
            // Apply a reversed force to particle c after particle
            // movement so that momentum will be preserved.
            this.particleApplyForce(c, Vec2.mul(-step.inv_dt, f));
          }
        }
      }
    }
  }
  solveStaticPressure(step: TimeStep) {
    this.m_staticPressureBuffer = RequestBuffer(this.m_staticPressureBuffer); // TODO
    const criticalPressure = this.getCriticalPressure(step);
    const pressurePerWeight = this.m_def.staticPressureStrength * criticalPressure;
    const maxPressure = b2_maxParticlePressure * criticalPressure;
    const relaxation = this.m_def.staticPressureRelaxation;
    /// Compute pressure satisfying the modified Poisson equation:
    ///     Sum_for_j((p_i - p_j) * w_ij) + relaxation * p_i =
    ///     pressurePerWeight * (w_i - b2_minParticleWeight)
    /// by iterating the calculation:
    ///     p_i = (Sum_for_j(p_j * w_ij) + pressurePerWeight *
    ///           (w_i - b2_minParticleWeight)) / (w_i + relaxation)
    /// where
    ///     p_i and p_j are static pressure of particle i and j
    ///     w_ij is contact weight between particle i and j
    ///     w_i is sum of contact weight of particle i
    for (let t = 0; t < this.m_def.staticPressureIterations; t++) {
      // memset(m_accumulationBuffer, 0,
      //      sizeof(*m_accumulationBuffer) * m_count);
      this.m_accumulationBuffer.fill(0); // TODO ok?
      for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
        const contact = this.m_contactBuffer.getData()[k];
        if (contact.getFlags() & ParticleFlag.b2_staticPressureParticle) {
          const a = contact.getIndexA();
          const b = contact.getIndexB();
          const w = contact.getWeight();
          this.m_accumulationBuffer[a] +=
            w * this.m_staticPressureBuffer[b]; // a <- b
          this.m_accumulationBuffer[b] +=
            w * this.m_staticPressureBuffer[a]; // b <- a
        }
      }
      for (let i = 0; i < this.m_count; i++) {
        const w = this.m_weightBuffer[i];
        if (this.m_flagsBuffer.data[i] & ParticleFlag.b2_staticPressureParticle) {
          const wh = this.m_accumulationBuffer[i];
          const h =
            (wh + pressurePerWeight * (w - b2_minParticleWeight)) /
            (w + relaxation);
          this.m_staticPressureBuffer[i] = math.clamp(h, 0.0, maxPressure);
        } else {
          this.m_staticPressureBuffer[i] = 0;
        }
      }
    }
  }
  computeWeight() {
    // calculates the sum of contact-weights for each particle
    // that means dimensionless density
    this.m_weightBuffer.fill(0); // TODO memset(m_weightBuffer, 0, sizeof(*m_weightBuffer) * m_count);
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      const a = contact.index;
      const w = contact.weight;
      this.m_weightBuffer[a] += w;
    }
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const w = contact.getWeight();
      this.m_weightBuffer[a] += w;
      this.m_weightBuffer[b] += w;
    }
  }
  solvePressure(step: TimeStep) {
    // calculates pressure as a linear function of density
    const criticalPressure = this.getCriticalPressure(step);
    const pressurePerWeight = this.m_def.pressureStrength * criticalPressure;
    const maxPressure = b2_maxParticlePressure * criticalPressure;
    for (let i = 0; i < this.m_count; i++) {
      const w = this.m_weightBuffer[i];
      const h = pressurePerWeight * math.max(0.0, w - b2_minParticleWeight);
      this.m_accumulationBuffer[i] = math.min(h, maxPressure);
    }
    // ignores particles which have their own repulsive force
    if (this.m_allParticleFlags & b2ParticleSystem.k_noPressureFlags) {
      for (let i = 0; i < this.m_count; i++) {
        if (this.m_flagsBuffer.data[i] & b2ParticleSystem.k_noPressureFlags) {
          this.m_accumulationBuffer[i] = 0;
        }
      }
    }
    // static pressure
    if (this.m_allParticleFlags & ParticleFlag.b2_staticPressureParticle) {
      _ASSERT && common.assert(!!this.m_staticPressureBuffer);
      for (let i = 0; i < this.m_count; i++) {
        if (this.m_flagsBuffer.data[i] & ParticleFlag.b2_staticPressureParticle) {
          this.m_accumulationBuffer[i] += this.m_staticPressureBuffer[i];
        }
      }
    }
    // applies pressure between each particles in contact
    const velocityPerPressure = step.dt / (this.m_def.density * this.m_particleDiameter);
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      const a = contact.index;
      const b = contact.body;
      const w = contact.weight;
      const m = contact.mass;
      const n = contact.normal;
      const p = this.m_positionBuffer.data[a];
      const h = this.m_accumulationBuffer[a] + pressurePerWeight * w;
      const f = Vec2.mul(velocityPerPressure * w * m * h, n);
      this.m_velocityBuffer.data[a].subMul(this.getParticleInvMass(), f);
      b.applyLinearImpulse(f, p, true);
    }
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const w = contact.getWeight();
      const n = contact.getNormal();
      const h = this.m_accumulationBuffer[a] + this.m_accumulationBuffer[b];
      const f = Vec2.mul(velocityPerPressure * w * h, n);
      this.m_velocityBuffer.data[a].sub(f);
      this.m_velocityBuffer.data[b].add(f);
    }
  }
  solveDamping(step: TimeStep) {
    // reduces normal velocity of each contact
    const linearDamping = this.m_def.dampingStrength;
    const quadraticDamping = 1 / this.getCriticalVelocity(step);
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      const a = contact.index;
      const b = contact.body;
      const w = contact.weight;
      const m = contact.mass;
      const n = contact.normal;
      const p = this.m_positionBuffer.data[a];
      const v = Vec2.sub(b.getLinearVelocityFromWorldPoint(p),
             this.m_velocityBuffer.data[a]);
      const vn = Vec2.dot(v, n);
      if (vn < 0) {
        const damping =
          math.max(linearDamping * w, math.min(-quadraticDamping * vn, 0.5)); // TODO use clamp?
        const f = Vec2.mul(damping * m * vn, n);
        this.m_velocityBuffer.data[a].addMul(this.getParticleInvMass(), f);
        b.applyLinearImpulse(Vec2.neg(f), p, true);
      }
    }
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const w = contact.getWeight();
      const n = contact.getNormal();
      const v = Vec2.sub(this.m_velocityBuffer.data[b], this.m_velocityBuffer.data[a]);
      const vn = Vec2.dot(v, n);
      if (vn < 0) {
        const damping =
          math.max(linearDamping * w, math.min(-quadraticDamping * vn, 0.5)); // TODO use clamp?
        const f = Vec2.mul(damping * vn, n);
        this.m_velocityBuffer.data[a].add(f);
        this.m_velocityBuffer.data[b].sub(f);
      }
    }
  }
  solveRigidDamping() {
    // Apply impulse to rigid particle groups colliding with other objects
    // to reduce relative velocity at the colliding point.
    const damping = this.m_def.dampingStrength;
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      const a = contact.index;
      const aGroup = this.m_groupBuffer[a];
      if (this.isRigidGroup(aGroup)) {
        const b = contact.body;
        const n = contact.normal;
        const w = contact.weight;
        const p = this.m_positionBuffer.data[a];
        const v = Vec2.sub(b.getLinearVelocityFromWorldPoint(p),
               aGroup.getLinearVelocityFromWorldPoint(p));
        const vn = Vec2.dot(v, n);
        if (vn < 0) {
          // The group's average velocity at particle position 'p' is pushing
          // the particle into the body.
          const [invMassA, invInertiaA, tangentDistanceA] =
            this.initDampingParameterWithRigidGroupOrParticle(
//              &invMassA, &invInertiaA, &tangentDistanceA,
              true, aGroup, a, p, n);
          const [invMassB, invInertiaB, tangentDistanceB] =
            this.initDampingParameter(
//              &invMassB, &invInertiaB, &tangentDistanceB,
              b.getMass(),
              // Calculate b->m_I from public functions of b2Body.
              b.getInertia() -
                  b.getMass() * b.getLocalCenter().lengthSquared(),
              b.getWorldCenter(),
              p, n);
          const f = damping * math.min(w, 1.0) * this.computeDampingImpulse(
            invMassA, invInertiaA, tangentDistanceA,
            invMassB, invInertiaB, tangentDistanceB,
            vn);
          this.applyDamping(
            invMassA, invInertiaA, tangentDistanceA,
            true, aGroup, a, f, n);
          b.applyLinearImpulse(Vec2.mul(-f, n), p, true);
        }
      }
    }
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      const n = contact.getNormal();
      const w = contact.getWeight();
      const aGroup = this.m_groupBuffer[a];
      const bGroup = this.m_groupBuffer[b];
      const aRigid = this.isRigidGroup(aGroup);
      const bRigid = this.isRigidGroup(bGroup);
      if (aGroup != bGroup && (aRigid || bRigid)) {
        const p =
          Vec2.mid(this.m_positionBuffer.data[a], this.m_positionBuffer.data[b]);
        const v = Vec2.sub(
          this.getLinearVelocity(bGroup, b, p),
          this.getLinearVelocity(aGroup, a, p));
        const vn = Vec2.dot(v, n);
        if (vn < 0) {
          const [invMassA, invInertiaA, tangentDistanceA] =
            this.initDampingParameterWithRigidGroupOrParticle(
//              &invMassA, &invInertiaA, &tangentDistanceA,
              aRigid, aGroup, a,
              p, n);
          const [invMassB, invInertiaB, tangentDistanceB] =
            this.initDampingParameterWithRigidGroupOrParticle(
//              &invMassB, &invInertiaB, &tangentDistanceB,
              bRigid, bGroup, b,
              p, n);
          const f = damping * w * this.computeDampingImpulse(
            invMassA, invInertiaA, tangentDistanceA,
            invMassB, invInertiaB, tangentDistanceB,
            vn);
          this.applyDamping(
            invMassA, invInertiaA, tangentDistanceA,
            aRigid, aGroup, a, f, n);
          this.applyDamping(
            invMassB, invInertiaB, tangentDistanceB,
            bRigid, bGroup, b, -f, n);
        }
      }
    }
  }
  solveExtraDamping() {
    // Applies additional damping force between bodies and particles which can
    // produce strong repulsive force. Applying damping force multiple times
    // is effective in suppressing vibration.
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      const a = contact.index;
      if (this.m_flagsBuffer.data[a] & b2ParticleSystem.k_extraDampingFlags) {
        const b = contact.body;
        const m = contact.mass;
        const n = contact.normal;
        const p = this.m_positionBuffer.data[a];
        const v = Vec2.sub(
          b.getLinearVelocityFromWorldPoint(p),
          this.m_velocityBuffer.data[a]);
        const vn = Vec2.dot(v, n);
        if (vn < 0) {
          const f = Vec2.mul(0.5 * m * vn, n);
          this.m_velocityBuffer.data[a].addMul(this.getParticleInvMass(), f);
          b.applyLinearImpulse(f.neg(), p, true);
        }
      }
    }
  }
  solveWall() {
    for (let i = 0; i < this.m_count; i++) {
      if (this.m_flagsBuffer.data[i] & ParticleFlag.b2_wallParticle) {
        this.m_velocityBuffer.data[i].setZero();
      }
    }
  }
  solveRigid(step: TimeStep) {
    for (let group = this.m_groupList; group; group = group.getNext()) {
      if (group.m_groupFlags & b2ParticleGroupFlag.b2_rigidParticleGroup) {
        group.updateStatistics();
        const rotation = step.dt * group.m_angularVelocity;
        const transform = new Transform(Vec2.combine3(
          1, group.m_center,
          step.dt, group.m_linearVelocity,
          -1, Vec2.mul(rotation, group.m_center)
        ), rotation)
        group.m_transform = Transform.mulXf(transform, group.m_transform);
        const velocityTransform = new Transform();
        velocityTransform.p.x = step.inv_dt * transform.p.x;
        velocityTransform.p.y = step.inv_dt * transform.p.y;
        velocityTransform.q.s = step.inv_dt * transform.q.s;
        velocityTransform.q.c = step.inv_dt * (transform.q.c - 1);
        for (let i = group.m_firstIndex; i < group.m_lastIndex; i++) {
          this.m_velocityBuffer.data[i] = Transform.mulVec2(velocityTransform,
                           this.m_positionBuffer.data[i]);
        }
      }
    }
  }
  solveElastic(step: TimeStep) {
    const elasticStrength = step.inv_dt * this.m_def.elasticStrength;
    for (let k = 0; k < this.m_triadBuffer.getCount(); k++) {
      const triad = this.m_triadBuffer.getData()[k];
      if (triad.flags & ParticleFlag.b2_elasticParticle) {
        const a = triad.indexA;
        const b = triad.indexB;
        const c = triad.indexC;
        const oa = triad.pa;
        const ob = triad.pb;
        const oc = triad.pc;
        const pa = this.m_positionBuffer.data[a].clone();
        const pb = this.m_positionBuffer.data[b].clone();
        const pc = this.m_positionBuffer.data[c].clone();
        const va = this.m_velocityBuffer.data[a];
        const vb = this.m_velocityBuffer.data[b];
        const vc = this.m_velocityBuffer.data[c];
        pa.addMul(step.dt, va);
        pb.addMul(step.dt, vb);
        pc.addMul(step.dt, vc);
        const midPoint = Vec2.combine3(1 / 3, pa, 1 / 3, pb, 1 / 3, pc);
        pa.sub(midPoint);
        pb.sub(midPoint);
        pc.sub(midPoint);
        const r = new Rot();
        r.s = Vec2.cross(oa, pa) + Vec2.cross(ob, pb) + Vec2.cross(oc, pc);
        r.c = Vec2.dot(oa, pa) + Vec2.dot(ob, pb) + Vec2.dot(oc, pc);
        const r2 = r.s * r.s + r.c * r.c;
        const invR = math.invSqrt(r2);
        r.s *= invR;
        r.c *= invR;
        const strength = elasticStrength * triad.strength;
        va.addMul(strength, Vec2.sub(Rot.mulVec2(r, oa), pa));
        vb.addMul(strength, Vec2.sub(Rot.mulVec2(r, ob), pb));
        vc.addMul(strength, Vec2.sub(Rot.mulVec2(r, oc), pc));
      }
    }
  }
  solveSpring(step: TimeStep) {
    const springStrength = step.inv_dt * this.m_def.springStrength;
    for (let k = 0; k < this.m_pairBuffer.getCount(); k++) {
      const pair = this.m_pairBuffer.getData()[k];
      if (pair.flags & ParticleFlag.b2_springParticle) {
        const a = pair.indexA;
        const b = pair.indexB;
        const pa = this.m_positionBuffer.data[a].clone();
        const pb = this.m_positionBuffer.data[b].clone();
        const va = this.m_velocityBuffer.data[a];
        const vb = this.m_velocityBuffer.data[b];
        pa.addMul(step.dt, va);
        pb.addMul(step.dt, vb);
        const d = Vec2.sub(pb, pa);
        const r0 = pair.distance;
        const r1 = d.length();
        const strength = springStrength * pair.strength;
        const f = Vec2.mul(strength * (r0 - r1) / r1, d);
        va.sub(f);
        vb.add(f);
      }
    }
  }
  solveTensile(step: TimeStep) {
    _ASSERT && common.assert(!!this.m_accumulation2Buffer);
    for (let i = 0; i < this.m_count; i++) {
      this.m_accumulation2Buffer[i] = Vec2.zero(); // TODO would setZero() also be ok?
    }
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      if (contact.getFlags() & ParticleFlag.b2_tensileParticle) {
        const a = contact.getIndexA();
        const b = contact.getIndexB();
        const w = contact.getWeight();
        const n = contact.getNormal();
        const weightedNormal = Vec2.mul((1 - w) * w, n);
        this.m_accumulation2Buffer[a].sub(weightedNormal);
        this.m_accumulation2Buffer[b].add(weightedNormal);
      }
    }
    const criticalVelocity = this.getCriticalVelocity(step);
    const pressureStrength = this.m_def.surfaceTensionPressureStrength
                 * criticalVelocity;
    const normalStrength = this.m_def.surfaceTensionNormalStrength
                 * criticalVelocity;
    const maxVelocityVariation = b2_maxParticleForce * criticalVelocity;
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      if (contact.getFlags() & ParticleFlag.b2_tensileParticle) {
        const a = contact.getIndexA();
        const b = contact.getIndexB();
        const w = contact.getWeight();
        const n = contact.getNormal();
        const h = this.m_weightBuffer[a] + this.m_weightBuffer[b];
        const s = Vec2.sub(this.m_accumulation2Buffer[b], this.m_accumulation2Buffer[a]);
        const fn = math.min(
            pressureStrength * (h - 2) + normalStrength * Vec2.dot(s, n),
            maxVelocityVariation) * w;
        const f = Vec2.mul(fn, n);
        this.m_velocityBuffer.data[a].sub(f);
        this.m_velocityBuffer.data[b].add(f);
      }
    }
  }
  solveViscous() {
    const viscousStrength = this.m_def.viscousStrength;
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      let a = contact.index;
      if (this.m_flagsBuffer.data[a] & ParticleFlag.b2_viscousParticle) {
        const b = contact.body;
        const w = contact.weight;
        const m = contact.mass;
        const p = this.m_positionBuffer.data[a];
        const v = Vec2.sub(b.getLinearVelocityFromWorldPoint(p),
               this.m_velocityBuffer.data[a]);
        const f = Vec2.mul(viscousStrength * m * w, v);
        this.m_velocityBuffer.data[a].addMul(this.getParticleInvMass(), f);
        b.applyLinearImpulse(f.neg(), p, true);
      }
    }
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      if (contact.getFlags() & ParticleFlag.b2_viscousParticle) {
        const a = contact.getIndexA();
        const b = contact.getIndexB();
        const w = contact.getWeight();
        const v = Vec2.sub(this.m_velocityBuffer.data[b], this.m_velocityBuffer.data[a]);
        const f = Vec2.mul(viscousStrength * w, v);
        this.m_velocityBuffer.data[a].add(f);
        this.m_velocityBuffer.data[b].sub(f);
      }
    }
  }
  solveRepulsive(step: TimeStep) {
    const repulsiveStrength =
      this.m_def.repulsiveStrength * this.getCriticalVelocity(step);
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      if (contact.getFlags() & ParticleFlag.b2_repulsiveParticle) {
        const a = contact.getIndexA();
        const b = contact.getIndexB();
        if (this.m_groupBuffer[a] != this.m_groupBuffer[b]) {
          const w = contact.getWeight();
          const n = contact.getNormal();
          const f = Vec2.mul(repulsiveStrength * w, n);
          this.m_velocityBuffer.data[a].sub(f);
          this.m_velocityBuffer.data[b].add(f);
        }
      }
    }
  }
  solvePowder(step: TimeStep) {
    const powderStrength = this.m_def.powderStrength * this.getCriticalVelocity(step);
    const minWeight = 1.0 - b2_particleStride;
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      if (contact.getFlags() & ParticleFlag.b2_powderParticle) {
        const w = contact.getWeight();
        if (w > minWeight) {
          const a = contact.getIndexA();
          const b = contact.getIndexB();
          const n = contact.getNormal();
          const f = Vec2.mul(powderStrength * (w - minWeight), n);
          this.m_velocityBuffer.data[a].sub(f);
          this.m_velocityBuffer.data[b].add(f);
        }
      }
    }
  }
  solveSolid(step: TimeStep) {
    // applies extra repulsive force from solid particle groups
    _ASSERT && common.assert(!!this.m_depthBuffer);
    const ejectionStrength = step.inv_dt * this.m_def.ejectionStrength;
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      const a = contact.getIndexA();
      const b = contact.getIndexB();
      if (this.m_groupBuffer[a] != this.m_groupBuffer[b]) {
        const w = contact.getWeight();
        const n = contact.getNormal();
        const h = this.m_depthBuffer[a] + this.m_depthBuffer[b];
        const f = Vec2.mul(ejectionStrength * h * w, n);
        this.m_velocityBuffer.data[a].sub(f);
        this.m_velocityBuffer.data[b].add(f);
      }
    }
  }
  solveForce(step: TimeStep) {
    const velocityPerForce = step.dt * this.getParticleInvMass();
    for (let i = 0; i < this.m_count; i++) {
      this.m_velocityBuffer.data[i].addMul(velocityPerForce, this.m_forceBuffer[i]);
    }
    this.m_hasForce = false;
  }
  // solveColorMixing() { // LATER
  //   // mixes color between contacting particles
  //   _ASSERT && common.assert(!!this.m_colorBuffer.data);
  //   const colorMixing128 = (int32) (128 * this.m_def.colorMixingStrength);
  //   if (colorMixing128) {
  //     for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
  //       const contact = this.m_contactBuffer[k];
  //       const a = contact.getIndexA();
  //       const b = contact.getIndexB();
  //       if (this.m_flagsBuffer.data[a] & this.m_flagsBuffer.data[b] &
  //         ParticleFlag.b2_colorMixingParticle)
  //       {
  //         const colorA = this.m_colorBuffer.data[a];
  //         const colorB = this.m_colorBuffer.data[b];
  //         // Use the static method to ensure certain compilers inline
  //         // this correctly.
  //         b2ParticleColor.mixColors(colorA, colorB, colorMixing128);
  //       }
  //     }
  //   }
  // }
  solveZombie() {
    // removes particles with zombie flag
    let newCount = 0;
    const newIndices = new Array(this.m_count).fill(0) as i32[]; // TODO better init
    let allParticleFlags = 0;
    for (let i = 0; i < this.m_count; i++) {
      const flags = this.m_flagsBuffer.data[i];
      if (flags & ParticleFlag.b2_zombieParticle) {
        if (flags & ParticleFlag.b2_destructionListenerParticle) {
          this.m_world.publish('remove-particle', this, i);
        }
        // Destroy particle handle.
        if (this.m_handleIndexBuffer.data) {
          const handle = this.m_handleIndexBuffer.data[i];
          if (handle) {
            handle.setIndex(b2_invalidParticleIndex);
            this.m_handleIndexBuffer.data[i] = null;
            this.m_handleAllocator.Free(handle); // TODO
          }
        }
        newIndices[i] = b2_invalidParticleIndex;
      } else {
        newIndices[i] = newCount;
        if (i != newCount) {
          // Update handle to reference new particle index.
          if (this.m_handleIndexBuffer.data) {
            const handle =
              this.m_handleIndexBuffer.data[i];
            if (handle) handle.setIndex(newCount);
            this.m_handleIndexBuffer.data[newCount] = handle;
          }
          this.m_flagsBuffer.data[newCount] = this.m_flagsBuffer.data[i];
          if (this.m_lastBodyContactStepBuffer.data) {
            this.m_lastBodyContactStepBuffer.data[newCount] =
              this.m_lastBodyContactStepBuffer.data[i];
          }
          if (this.m_bodyContactCountBuffer.data) {
            this.m_bodyContactCountBuffer.data[newCount] =
              this.m_bodyContactCountBuffer.data[i];
          }
          if (this.m_consecutiveContactStepsBuffer.data) {
            this.m_consecutiveContactStepsBuffer.data[newCount] =
              this.m_consecutiveContactStepsBuffer.data[i];
          }
          this.m_positionBuffer.data[newCount] = this.m_positionBuffer.data[i];
          this.m_velocityBuffer.data[newCount] = this.m_velocityBuffer.data[i];
          this.m_groupBuffer[newCount] = this.m_groupBuffer[i];
          if (this.m_hasForce) {
            this.m_forceBuffer[newCount] = this.m_forceBuffer[i];
          }
          if (this.m_staticPressureBuffer) {
            this.m_staticPressureBuffer[newCount] =
              this.m_staticPressureBuffer[i];
          }
          if (this.m_depthBuffer) {
            this.m_depthBuffer[newCount] = this.m_depthBuffer[i];
          }
          if (this.m_colorBuffer.data) {
            this.m_colorBuffer.data[newCount] = this.m_colorBuffer.data[i];
          }
          if (this.m_userDataBuffer.data) {
            this.m_userDataBuffer.data[newCount] = this.m_userDataBuffer.data[i];
          }
/*          if (this.m_expirationTimeBuffer.data) { // LATER
            this.m_expirationTimeBuffer.data[newCount] =
              this.m_expirationTimeBuffer.data[i];
          }*/
        }
        newCount++;
        allParticleFlags |= flags;
      }
    }
  
    // predicate functions
    const Test = {
      isProxyInvalid(proxy: Proxy) {
        return proxy.index < 0;
      },
      isContactInvalid(contact: b2ParticleContact) {
        return contact.getIndexA() < 0 || contact.getIndexB() < 0;
      },
      isBodyContactInvalid(contact: b2ParticleBodyContact) {
        return contact.index < 0;
      },
      isPairInvalid(pair: b2ParticlePair) {
        return pair.indexA < 0 || pair.indexB < 0;
      },
      isTriadInvalid(triad: b2ParticleTriad) {
        return triad.indexA < 0 || triad.indexB < 0 || triad.indexC < 0;
      },
    };
  
    // update proxies
    for (let k = 0; k < this.m_proxyBuffer.getCount(); k++) {
      const proxy = this.m_proxyBuffer.getData()[k]; // TODO why was this written as m_proxyBuffer.Begin()[k] and not m_proxyBuffer[k]?
      proxy.index = newIndices[proxy.index];
    }
    this.m_proxyBuffer.removeIf(Test.isProxyInvalid);
  
    // update contacts
    for (let k = 0; k < this.m_contactBuffer.getCount(); k++) {
      const contact = this.m_contactBuffer.getData()[k];
      contact.setIndices(newIndices[contact.getIndexA()],
                 newIndices[contact.getIndexB()]);
    }
    this.m_contactBuffer.removeIf(Test.isContactInvalid);
  
    // update particle-body contacts
    for (let k = 0; k < this.m_bodyContactBuffer.getCount(); k++) {
      const contact = this.m_bodyContactBuffer.getData()[k];
      contact.index = newIndices[contact.index];
    }
    this.m_bodyContactBuffer.removeIf(Test.isBodyContactInvalid);
  
    // update pairs
    for (let k = 0; k < this.m_pairBuffer.getCount(); k++) {
      const pair: b2ParticlePair = this.m_pairBuffer.getData()[k];
      pair.indexA = newIndices[pair.indexA];
      pair.indexB = newIndices[pair.indexB];
    }
    this.m_pairBuffer.removeIf(Test.isPairInvalid);
  
    // update triads
    for (let k = 0; k < this.m_triadBuffer.getCount(); k++) {
      const triad = this.m_triadBuffer.getData()[k];
      triad.indexA = newIndices[triad.indexA];
      triad.indexB = newIndices[triad.indexB];
      triad.indexC = newIndices[triad.indexC];
    }
    this.m_triadBuffer.removeIf(Test.isTriadInvalid);
  
    // Update lifetime indices.
    if (this.m_indexByExpirationTimeBuffer.data) {
      let writeOffset = 0;
      for (let readOffset = 0; readOffset < this.m_count; readOffset++) {
        const newIndex = newIndices[
          this.m_indexByExpirationTimeBuffer.data[readOffset]];
        if (newIndex != b2_invalidParticleIndex) {
          this.m_indexByExpirationTimeBuffer.data[writeOffset++] = newIndex;
        }
      }
    }
  
    // update groups
    for (let group = this.m_groupList; group; group = group.getNext()) {
      let firstIndex = newCount;
      let lastIndex = 0;
      let modified = false;
      for (let i = group.m_firstIndex; i < group.m_lastIndex; i++) {
        let j = newIndices[i];
        if (j >= 0) {
          firstIndex = math.min(firstIndex, j);
          lastIndex = math.max(lastIndex, j + 1);
        } else {
          modified = true;
        }
      }
      if (firstIndex < lastIndex) {
        group.m_firstIndex = firstIndex;
        group.m_lastIndex = lastIndex;
        if (modified) {
          if (group.m_groupFlags & b2ParticleGroupFlag.b2_solidParticleGroup) {
            this.setGroupFlags(group,
                    group.m_groupFlags |
                    b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth);
          }
        }
      } else {
        group.m_firstIndex = 0;
        group.m_lastIndex = 0;
        if (!(group.m_groupFlags & b2ParticleGroupFlag.b2_particleGroupCanBeEmpty)) {
          this.setGroupFlags(group,
            group.m_groupFlags | b2ParticleGroupFlag.b2_particleGroupWillBeDestroyed);
        }
      }
    }
  
    // update particle count
    this.m_count = newCount;
    // m_world->m_stackAllocator.Free(newIndices);
    this.m_allParticleFlags = allParticleFlags;
    this.m_needsUpdateAllParticleFlags = false;
  
    // destroy bodies with no particles
    for (let group = this.m_groupList; group;) {
      const next = group.getNext();
      if (group.m_groupFlags & b2ParticleGroupFlag.b2_particleGroupWillBeDestroyed) {
        this.destroyParticleGroup(group);
      }
      group = next;
    }
  }
  /**
   * Destroy all particles which have outlived their lifetimes set by
   * SetParticleLifetime().
   */
/*  solveLifetimes(step: TimeStep) { // LATER
    _ASSERT && common.assert(this.m_expirationTimeBuffer.data);
    _ASSERT && common.assert(this.m_indexByExpirationTimeBuffer.data);
    // Update the time elapsed.
    this.m_timeElapsed = this.lifetimeToExpirationTime(step.dt);
    // Get the floor (non-fractional component) of the elapsed time.
    const quantizedTimeElapsed = this.getQuantizedTimeElapsed();
  
    const int32* const expirationTimes = this.m_expirationTimeBuffer.data;
    int32* const expirationTimeIndices = this.m_indexByExpirationTimeBuffer.data;
    const particleCount = this.getParticleCount();
    // Sort the lifetime buffer if it's required.
    if (m_expirationTimeBufferRequiresSorting)
	{
		const expirationTimeComparator = new ExpirationTimeComparator(
			expirationTimes);
		std::sort(expirationTimeIndices,
				  expirationTimeIndices + particleCount,
				  expirationTimeComparator); // TODO
		this.m_expirationTimeBufferRequiresSorting = false;
	}
  
    // Destroy particles which have expired.
    for (let i = particleCount - 1; i >= 0; --i) {
      const particleIndex = expirationTimeIndices[i];
      const expirationTime = expirationTimes[particleIndex];
      // If no particles need to be destroyed, skip this.
      if (quantizedTimeElapsed < expirationTime || expirationTime <= 0) {
        break;
      }
      // Destroy this particle.
      this.destroyParticle(particleIndex);
    }
  }*/
/*  rotateBuffer(start: i32, mid: i32, end: i32) { // TODO
    // move the particles assigned to the given group toward the end of array
    if (start == mid || mid == end)
    {
      return;
    }
    b2Assert(mid >= start && mid <= end);
    struct NewIndices
    {
      int32 operator[](int32 i) const
      {
        if (i < start)
        {
          return i;
        }
        else if (i < mid)
        {
          return i + end - mid;
        }
        else if (i < end)
        {
          return i + start - mid;
        }
        else
        {
          return i;
        }
      }
      int32 start, mid, end;
    } newIndices;
    newIndices.start = start;
    newIndices.mid = mid;
    newIndices.end = end;
  
    std::rotate(m_flagsBuffer.data + start, m_flagsBuffer.data + mid,
          m_flagsBuffer.data + end);
    if (m_lastBodyContactStepBuffer.data)
    {
      std::rotate(m_lastBodyContactStepBuffer.data + start,
            m_lastBodyContactStepBuffer.data + mid,
            m_lastBodyContactStepBuffer.data + end);
    }
    if (m_bodyContactCountBuffer.data)
    {
      std::rotate(m_bodyContactCountBuffer.data + start,
            m_bodyContactCountBuffer.data + mid,
            m_bodyContactCountBuffer.data + end);
    }
    if (m_consecutiveContactStepsBuffer.data)
    {
      std::rotate(m_consecutiveContactStepsBuffer.data + start,
            m_consecutiveContactStepsBuffer.data + mid,
            m_consecutiveContactStepsBuffer.data + end);
    }
    std::rotate(m_positionBuffer.data + start, m_positionBuffer.data + mid,
          m_positionBuffer.data + end);
    std::rotate(m_velocityBuffer.data + start, m_velocityBuffer.data + mid,
          m_velocityBuffer.data + end);
    std::rotate(m_groupBuffer + start, m_groupBuffer + mid,
          m_groupBuffer + end);
    if (m_hasForce)
    {
      std::rotate(m_forceBuffer + start, m_forceBuffer + mid,
            m_forceBuffer + end);
    }
    if (m_staticPressureBuffer)
    {
      std::rotate(m_staticPressureBuffer + start,
            m_staticPressureBuffer + mid,
            m_staticPressureBuffer + end);
    }
    if (m_depthBuffer)
    {
      std::rotate(m_depthBuffer + start, m_depthBuffer + mid,
            m_depthBuffer + end);
    }
    if (m_colorBuffer.data)
    {
      std::rotate(m_colorBuffer.data + start,
            m_colorBuffer.data + mid, m_colorBuffer.data + end);
    }
    if (m_userDataBuffer.data)
    {
      std::rotate(m_userDataBuffer.data + start,
            m_userDataBuffer.data + mid, m_userDataBuffer.data + end);
    }
  
    // Update handle indices.
    if (m_handleIndexBuffer.data)
    {
      std::rotate(m_handleIndexBuffer.data + start,
            m_handleIndexBuffer.data + mid,
            m_handleIndexBuffer.data + end);
      for (int32 i = start; i < end; ++i)
      {
        b2ParticleHandle * const handle = m_handleIndexBuffer.data[i];
        if (handle) handle->SetIndex(newIndices[handle->GetIndex()]);
      }
    }
  
    if (m_expirationTimeBuffer.data)
    {
      std::rotate(m_expirationTimeBuffer.data + start,
            m_expirationTimeBuffer.data + mid,
            m_expirationTimeBuffer.data + end);
      // Update expiration time buffer indices.
      const int32 particleCount = GetParticleCount();
      int32* const indexByExpirationTime =
        m_indexByExpirationTimeBuffer.data;
      for (int32 i = 0; i < particleCount; ++i)
      {
        indexByExpirationTime[i] = newIndices[indexByExpirationTime[i]];
      }
    }
  
    // update proxies
    for (int32 k = 0; k < m_proxyBuffer.GetCount(); k++)
    {
      Proxy& proxy = m_proxyBuffer.Begin()[k];
      proxy.index = newIndices[proxy.index];
    }
  
    // update contacts
    for (int32 k = 0; k < m_contactBuffer.GetCount(); k++)
    {
      b2ParticleContact& contact = m_contactBuffer[k];
      contact.SetIndices(newIndices[contact.GetIndexA()],
                 newIndices[contact.GetIndexB()]);
    }
  
    // update particle-body contacts
    for (int32 k = 0; k < m_bodyContactBuffer.GetCount(); k++)
    {
      b2ParticleBodyContact& contact = m_bodyContactBuffer[k];
      contact.index = newIndices[contact.index];
    }
  
    // update pairs
    for (int32 k = 0; k < m_pairBuffer.GetCount(); k++)
    {
      b2ParticlePair& pair = m_pairBuffer[k];
      pair.indexA = newIndices[pair.indexA];
      pair.indexB = newIndices[pair.indexB];
    }
  
    // update triads
    for (int32 k = 0; k < m_triadBuffer.GetCount(); k++)
    {
      b2ParticleTriad& triad = m_triadBuffer[k];
      triad.indexA = newIndices[triad.indexA];
      triad.indexB = newIndices[triad.indexB];
      triad.indexC = newIndices[triad.indexC];
    }
  
    // update groups
    for (b2ParticleGroup* group = m_groupList; group; group = group->GetNext())
    {
      group->m_firstIndex = newIndices[group->m_firstIndex];
      group->m_lastIndex = newIndices[group->m_lastIndex - 1] + 1;
    }
  }
*/
  getCriticalVelocity(step: TimeStep) {
    return this.m_particleDiameter * step.inv_dt;
  }
  getCriticalVelocitySquared(step: TimeStep) {
    const velocity = this.getCriticalVelocity(step);
    return velocity * velocity;
  }
  getCriticalPressure(step: TimeStep) {
    return this.m_def.density * this.getCriticalVelocitySquared(step);
  }
  getParticleStride() {
    return b2_particleStride * this.m_particleDiameter;
  }
  getParticleMass() {
    const stride = this.getParticleStride();
    return this.m_def.density * stride * stride;
  }
  getParticleInvMass() {
    // mass = density * stride^2, so we take the inverse of this.
    const inverseStride = this.m_inverseDiameter * (1.0 / b2_particleStride);
    return this.m_inverseDensity * inverseStride * inverseStride;
  }

  /**
   * Get the world's contact filter if any particles with the
   * b2_contactFilterParticle flag are present in the system.
   */
  getFixtureContactFilter(): b2ContactFilter | null {
    return (this.m_allParticleFlags & ParticleFlag.b2_fixtureContactFilterParticle) ?
      this.m_world.m_contactManager.m_contactFilter : null;
  }

  /**
   * Get the world's contact filter if any particles with the
   * b2_particleContactFilterParticle flag are present in the system.
   */
  // getParticleContactFilter(): b2ContactFilter | null { // LATER
  //   return (this.m_allParticleFlags & ParticleFlag.b2_particleContactFilterParticle) ?
  //     this.m_world.m_contactManager.m_contactFilter : null;
  // }

  /**
   * Get the world's contact listener if any particles with the
   * b2_fixtureContactListenerParticle flag are present in the system.
   */
  // getFixtureContactListener(): b2ContactListener { // LATER
  //   return (this.m_allParticleFlags & ParticleFlag.b2_fixtureContactListenerParticle) ?
  //     this.m_world.m_contactManager.m_contactListener : null;
  // }

  /**
   * Get the world's contact listener if any particles with the
   * b2_particleContactListenerParticle flag are present in the system.
   */
  // getParticleContactListener(): b2ContactListener | null { // LATER
  //   return (this.m_allParticleFlags & ParticleFlag.b2_particleContactListenerParticle) ?
  //     this.m_world.m_contactManager.m_contactListener : null;
  // }

  setUserOverridableBuffer<T>(
    buffer: UserOverridableBuffer<T>, newData: T[], newCapacity: number) {
    _ASSERT && common.assert((newData && !!newCapacity) || (!newData && !newCapacity));
    if (!buffer.userSuppliedCapacity && buffer.data) {
      // this.m_world.m_blockAllocator.Free(
      //   buffer.data, sizeof(T) * this.m_internalAllocatedCapacity);
    }
    buffer.data = newData;
    buffer.userSuppliedCapacity = newCapacity;
  }

  setGroupFlags(group: b2ParticleGroup, newFlags: number) {
    const oldFlags = group.m_groupFlags;
    if ((oldFlags ^ newFlags) & b2ParticleGroupFlag.b2_solidParticleGroup) {
      // If the b2_solidParticleGroup flag changed schedule depth update.
      newFlags |= b2ParticleGroupFlag.b2_particleGroupNeedsUpdateDepth;
    }
    if (oldFlags & ~newFlags) {
      // If any flags might be removed
      this.m_needsUpdateAllGroupFlags = true;
    }
    if (~this.m_allGroupFlags & newFlags) {
      // If any flags were added
      if (newFlags & b2ParticleGroupFlag.b2_solidParticleGroup) {
        this.m_depthBuffer = RequestBuffer(this.m_depthBuffer);
      }
      this.m_allGroupFlags |= newFlags;
    }
    group.m_groupFlags = newFlags;
  }

  // removeSpuriousBodyContacts() { // LATER
  //   // At this point we have a list of contact candidates based on AABB
  //   // overlap.The AABB query that  generated this returns all collidable
  //   // fixtures overlapping particle bounding boxes.  This breaks down around
  //   // vertices where two shapes intersect, such as a "ground" surface made
  //   // of multiple b2PolygonShapes; it potentially applies a lot of spurious
  //   // impulses from normals that should not actually contribute.  See the
  //   // Ramp example in Testbed.
  //   //
  //   // To correct for this, we apply this algorithm:
  //   //   * sort contacts by particle and subsort by weight (nearest to farthest)
  //   //   * for each contact per particle:
  //   //      - project a point at the contact distance along the inverse of the
  //   //        contact normal
  //   //      - if this intersects the fixture that generated the contact, apply
  //   //         it, otherwise discard as impossible
  //   //      - repeat for up to n nearest contacts, currently we get good results
  //   //        from n=3.
  //   std::sort(m_bodyContactBuffer.Begin(), m_bodyContactBuffer.End(),
  //   b2ParticleSystem::BodyContactCompare);

  //   int32 discarded = 0;
  //   std::remove_if(m_bodyContactBuffer.Begin(),
  //       m_bodyContactBuffer.End(),
  //       b2ParticleBodyContactRemovePredicate(this, &discarded)); // TODO pointer usage

  //   this.m_bodyContactBuffer.setCount(this.m_bodyContactBuffer.getCount() - discarded);
  // }
  static bodyContactCompare(lhs: b2ParticleBodyContact,// TODO name for operator
                   rhs: b2ParticleBodyContact) {
    if (lhs.index == rhs.index) {
      // Subsort by weight, decreasing.
      return lhs.weight > rhs.weight;
    }
    return lhs.index < rhs.index;
  }

  // detectStuckParticle(particle: number) { // TODO
  //   // Detect stuck particles
  //   //
  //   // The basic algorithm is to allow the user to specify an optional
  //   // threshold where we detect whenever a particle is contacting
  //   // more than one fixture for more than threshold consecutive
  //   // steps. This is considered to be "stuck", and these are put
  //   // in a list the user can query per step, if enabled, to deal with
  //   // such particles.
  
  //   if (this.m_stuckThreshold <= 0) {
  //     return;
  //   }
  
  //   // Get the state variables for this particle.
  //   int32 * const consecutiveCount =
  //       &m_consecutiveContactStepsBuffer.data[particle];
  //   int32 * const lastStep = &m_lastBodyContactStepBuffer.data[particle];
  //   int32 * const bodyCount = &m_bodyContactCountBuffer.data[particle];
  
  //   // This is only called when there is a body contact for this particle.
  //   ++(*bodyCount);
  
  //   // We want to only trigger detection once per step, the first time we
  //   // contact more than one fixture in a step for a given particle.
  //   if (*bodyCount == 2)
  //   {
  //     ++(*consecutiveCount);
  //     if (*consecutiveCount > m_stuckThreshold)
  //     {
  //       int32& newStuckParticle = m_stuckParticleBuffer.Append();
  //       newStuckParticle = particle;
  //     }
  //   }
  //   *lastStep = m_timestamp;
  // }

  /** Determine whether a particle index is valid. */
  validateParticleIndex(index: number) {
    return index >= 0 && index < this.getParticleCount() &&
      index != b2_invalidParticleIndex;
  }

  /** Get the time elapsed in b2ParticleSystemDef::lifetimeGranularity. */
/*  getQuantizedTimeElapsed(): number { // LATER
    return (int32)(this.m_timeElapsed >> 32);
  }*/
  /** Convert a lifetime in seconds to an expiration time. */
/*  lifetimeToExpirationTime(lifetime: number) { // LATER
    return this.m_timeElapsed + (int64)((lifetime / m_def.lifetimeGranularity) *
								   (float32)(1LL << 32)); // TODO
  }*/

  forceCanBeApplied(flags: number) {
    return !(flags & ParticleFlag.b2_wallParticle);
  }
  prepareForceBuffer() {
    if (!this.m_hasForce) {
      // memset(m_forceBuffer, 0, sizeof(*m_forceBuffer) * m_count);
      this.m_forceBuffer.forEach(v => v.setZero()); // TODO ok?
      this.m_hasForce = true;
    }
  }

  isRigidGroup(group: b2ParticleGroup) {
    return group && !!(group.m_groupFlags & b2ParticleGroupFlag.b2_rigidParticleGroup);
  }
  getLinearVelocity(
    group: b2ParticleGroup, particleIndex: number,
    point: Vec2
  ): Vec2 {
    if (this.isRigidGroup(group)) {
      return group.getLinearVelocityFromWorldPoint(point);
    } else {
      return this.m_velocityBuffer.data[particleIndex];
    }
  }
  initDampingParameter( // TODO ok? This was done via pointers
//    float32* invMass, float32* invInertia, float32* tangentDistance,
    mass: number, inertia: number, center: Vec2,
    point: Vec2, normal: Vec2
  ) {
    return [
      mass > 0 ? 1 / mass : 0, // invMass
      inertia > 0 ? 1 / inertia : 0, // invInertia
      Vec2.cross(Vec2.sub(point, center), normal) // tangentDistance
    ]
  }
  initDampingParameterWithRigidGroupOrParticle(
//    float32* invMass, float32* invInertia, float32* tangentDistance,
    isRigidGroup: boolean, group: b2ParticleGroup, particleIndex: number,
    point: Vec2, normal: Vec2
  ) {
    if (isRigidGroup) {
      return this.initDampingParameter(
//         invMass, invInertia, tangentDistance, TODO weg
        group.getMass(), group.getInertia(), group.getCenter(),
        point, normal);
    } else {
      const flags = this.m_flagsBuffer.data[particleIndex];
      return this.initDampingParameter(
//        invMass, invInertia, tangentDistance,
        flags & ParticleFlag.b2_wallParticle ? 0 : this.getParticleMass(), 0, point,
        point, normal);
    }
  }
  computeDampingImpulse(
    invMassA: number, invInertiaA: number, tangentDistanceA: number,
    invMassB: number, invInertiaB: number, tangentDistanceB: number,
    normalVelocity: number
  ) {
    const invMass =
      invMassA + invInertiaA * tangentDistanceA * tangentDistanceA +
      invMassB + invInertiaB * tangentDistanceB * tangentDistanceB;
    return invMass > 0 ? normalVelocity / invMass : 0;
  }
  applyDamping(
    invMass: number, invInertia: number, tangentDistance: number,
    isRigidGroup: boolean, group: b2ParticleGroup, particleIndex: number,
    impulse: number, normal: Vec2
  ) {
    if (isRigidGroup) {
      group.m_linearVelocity.addMul(impulse * invMass, normal);
      group.m_angularVelocity += impulse * tangentDistance * invInertia;
    } else {
      this.m_velocityBuffer.data[particleIndex].addMul(impulse * invMass, normal);
    }
  }

};
