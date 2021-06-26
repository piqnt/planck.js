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

import common from "../util/common";
import Vec2 from "../common/Vec2";
import Transform from "../common/Transform";
import Shape from "../collision/Shape";
import b2ParticleSystem from "./ParticleSystem";
import { b2ParticleColor } from "./Particle";


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

/** The particle group type.  Can be combined with the | operator. */
export const enum b2ParticleGroupFlag {
  /** Prevents overlapping or leaking. */
  b2_solidParticleGroup = 1 << 0,
  /** Keeps its shape. */
  b2_rigidParticleGroup = 1 << 1,
  /** Won't be destroyed if it gets empty. */
  b2_particleGroupCanBeEmpty = 1 << 2,
  /** Will be destroyed on next simulation step. */
  b2_particleGroupWillBeDestroyed = 1 << 3,
  /** Updates depth data on next simulation step. */
  b2_particleGroupNeedsUpdateDepth = 1 << 4,
  b2_particleGroupInternalMask =
    b2_particleGroupWillBeDestroyed |
    b2_particleGroupNeedsUpdateDepth,
};

/**
 * A particle group definition holds all the data needed to construct a
 * particle group.  You can safely re-use these definitions.
 */
export interface b2ParticleGroupDef {
  
  //   ~b2ParticleGroupDef()
  //   {
  // #if LIQUIDFUN_EXTERNAL_LANGUAGE_API
  //     FreeShapesMemory();
  // #endif // LIQUIDFUN_EXTERNAL_LANGUAGE_API
  //   }
  
  /** The particle-behavior flags (See #b2ParticleFlag). */
  flags: number;

  /** The group-construction flags (See #b2ParticleGroupFlag). */
  groupFlags: number;

  /**
   * The world position of the group.
   * Moves the group's shape a distance equal to the value of position.
   */
  position: Vec2;

  /**
   * The world angle of the group in radians.
   * Rotates the shape by an angle equal to the value of angle.
   */
  angle: number;

  /** The linear velocity of the group's origin in world co-ordinates. */
  linearVelocity: Vec2;

  /** The angular velocity of the group. */
  angularVelocity: number;

  /** The color of all particles in the group. */
  color: b2ParticleColor;

  /**
   * The strength of cohesion among the particles in a group with flag
   * b2_elasticParticle or b2_springParticle.
   */
  strength: number;

  /** The shape where particles will be added. */
  shape: Shape;

  /** A array of shapes where particles will be added. */
  shapes: Shape[];

  /** The number of shapes. */
  shapeCount: number;

  /**
   * The interval of particles in the shape.
   * If it is 0, b2_particleStride * particleDiameter is used instead.
   */
  stride: number;

  /** The number of particles in addition to ones added in the shape. */
  particleCount: number;

  /** The initial positions of the particleCount particles. */
  positionData: Vec2;

  /**
   * Lifetime of the particle group in seconds.  A value <= 0.0f indicates a
   * particle group with infinite lifetime.
   */
  lifetime: number;

  /** Use this to store application-specific group data. */
  userData: any;

  /** An existing particle group to which the particles will be added. */
  group: b2ParticleGroup;

  // #if LIQUIDFUN_EXTERNAL_LANGUAGE_API
  // /** Storage for constructed CircleShapes from an incoming vertex list */
  // circleShapes: CircleShape[];

  // /** True if we create the shapes array internally. */
  // ownShapesArray: Boolean;

  // /** Clean up all memory associated with SetCircleShapesFromVertexList */
  // freeShapesMemory {
  //   if (this.circleShapes) {
  //     delete[] circleShapes;
  //     circleShapes = NULL;
  //   }
  //   if (ownShapesArray && shapes) {
  //     delete[] shapes;
  //     shapes = NULL;
  //     ownShapesArray = false;
  //   }
  // }

  // /**
  //  * From a vertex list created by an external language API, construct
  //  * a list of circle shapes that can be used to create a b2ParticleGroup
  //  * This eliminates cumbersome array-interfaces between languages.
  //  */
  // void SetCircleShapesFromVertexList(void* inBuf,
  //                     int numShapes,
  //                     float radius) {
  //   float* points = (float*) inBuf;
  //   // Create circle shapes from vertex list and radius
  //   b2CircleShape* pCircleShapes = new b2CircleShape[numShapes];
  //   b2Shape** pShapes = new b2Shape*[numShapes];
  //   for (int i = 0; i < numShapes; ++i) {
  //     pCircleShapes[i].m_radius = radius;
  //     pCircleShapes[i].m_p = b2Vec2(points[i*2], points[i*2+1]);
  //     pShapes[i] = &pCircleShapes[i];
  //   }
  
  //   // Clean up existing buffers
  //   FreeShapesMemory();
  
  //   // Assign to newly created buffers
  //   ownShapesArray = true;
  //   circleShapes = pCircleShapes;
  //   shapes = pShapes;
  //   shapeCount = numShapes;
  // }

  // /** Set position with direct floats. */
  // setPosition(x: number, y: number) {
  //   this.position.set(x, y);
  // }

  // /** Set color with direct ints. */
  // setColor(r: number, g: number, b: number, a: number) {
  //   this.color.set((uint8)r, (uint8)g, (uint8)b, (uint8)a);
  // }
  // #endif // LIQUIDFUN_EXTERNAL_LANGUAGE_API

}

export const ParticleGroupDefDefault: b2ParticleGroupDef = {
  flags: 0,
  groupFlags: 0,
  position: Vec2.zero(),
  angle: 0,
  linearVelocity: Vec2.zero(),
  angularVelocity: 0,
  color: b2ParticleColor.zero(),
  strength: 1,
  shape: null,
  shapes: null,
  shapeCount: 0,
  stride: 0,
  particleCount: 0,
  positionData: null,
  lifetime: 0.0,
  userData: null,
  group: null,

  // #if LIQUIDFUN_EXTERNAL_LANGUAGE_API
  //   circleShapes = NULL;
  //   ownShapesArray = false;
  // #endif // LIQUIDFUN_EXTERNAL_LANGUAGE_API

};

/** A group of particles. b2ParticleGroup::CreateParticleGroup creates these. */
export class b2ParticleGroup {

  /** @internal */ m_system: b2ParticleSystem;
  /** @internal */ m_firstIndex: number;
  /** @internal */ m_lastIndex: number;
  /** @internal */ m_groupFlags: number;
  /** @internal */ m_strength: number;
  /** @internal */ m_prev: b2ParticleGroup;
  /** @internal */ m_next: b2ParticleGroup;

  /** @internal */ m_timestamp: number;
  /** @internal */ m_mass: number;
  /** @internal */ m_inertia: number;
  /** @internal */ m_center: Vec2;
  /** @internal */ m_linearVelocity: Vec2;
  /** @internal */ m_angularVelocity: number;
  /** @internal */ m_transform: Transform;

  /** @internal */ m_userData: any;

  constructor() {
    this.m_system = null;
    this.m_firstIndex = 0;
    this.m_lastIndex = 0;
    this.m_groupFlags = 0;
    this.m_strength = 1.0;
    this.m_prev = null;
    this.m_next = null;

    this.m_timestamp = -1;
    this.m_mass = 0;
    this.m_inertia = 0;
    this.m_center = Vec2.zero();
    this.m_linearVelocity = Vec2.zero();
    this.m_angularVelocity = 0;
    this.m_transform.setIdentity();

    this.m_userData = null;
  }

  /** Get the next particle group from the list in b2_World. */
  getNext() {
    return this.m_next;
  }

  /** Get the particle system that holds this particle group. */
  getParticleSystem() {
    return this.m_system;
  }

  /** Get the number of particles. */
  getParticleCount() {
    return this.m_lastIndex - this.m_firstIndex;
  }

  /** Get the offset of this group in the global particle buffer */
  getBufferIndex() {
    return this.m_firstIndex;
  }

  /** Does this group contain the particle. */
  containsParticle(index: number) {
    return this.m_firstIndex <= index && index < this.m_lastIndex;
  }


  /** Get the logical sum of particle flags. */
  getAllParticleFlags() {
    let flags = 0;
    for (let i = this.m_firstIndex; i < this.m_lastIndex; i++) {
      flags |= this.m_system.m_flagsBuffer.data[i];
    }
    return flags;
  }
  /** Get the construction flags for the group. */
  getGroupFlags() {
    return this.m_groupFlags & ~b2ParticleGroupFlag.b2_particleGroupInternalMask;
  }

  /** Set the construction flags for the group. */
  setGroupFlags(flags: number) {
    common.assert((flags & b2ParticleGroupFlag.b2_particleGroupInternalMask) == 0);
    flags |= this.m_groupFlags & b2ParticleGroupFlag.b2_particleGroupInternalMask;
    this.m_system.setGroupFlags(this, flags);
  }

  /** Get the total mass of the group: the sum of all particles in it. */
  getMass() {
    this.updateStatistics();
    return this.m_mass;
  }

  /** Get the moment of inertia for the group. */
  getInertia() {
    this.updateStatistics();
    return this.m_inertia;
  }

  /** Get the center of gravity for the group. */
  getCenter() {
    this.updateStatistics();
    return this.m_center;
  }

  /** Get the linear velocity of the group. */
  getLinearVelocity() {
    this.updateStatistics();
    return this.m_linearVelocity;
  }

  /** Get the angular velocity of the group. */
  getAngularVelocity() {
    this.updateStatistics();
    return this.m_angularVelocity;
  }

  /**
   * Get the position of the group's origin and rotation.
   * Used only with groups of rigid particles.
   */
  getTransform() {
    return this.m_transform;
  }

  /**
   * Get position of the particle group as a whole.
   * Used only with groups of rigid particles.
   */
  getPosition() {
    return this.m_transform.p;
  }

  /**
   * Get the rotational angle of the particle group as a whole.
   * Used only with groups of rigid particles.
   */
  getAngle() {
    return this.m_transform.q.getAngle();
  }


  /**
   * Get the world linear velocity of a world point, from the average linear
   * and angular velocities of the particle group.
   * @param worldPoint a point in world coordinates.
   * @return the world velocity of a point.
   */
  getLinearVelocityFromWorldPoint(worldPoint: Vec2) {
    this.updateStatistics();
    return Vec2.add(this.m_linearVelocity, Vec2.cross(this.m_angularVelocity, Vec2.sub(worldPoint, this.m_center)));
  }


  /** Get the user data pointer that was provided in the group definition. */
  getUserData(): unknown {
    return this.m_userData;
  }

  /** Set the user data. Use this to store your application specific data. */
  setUserData(data: any) {
    this.m_userData = data;
  }

  /** Call b2ParticleSystem::ApplyForce for every particle in the group. */
  applyForce(force: Vec2) {
    this.m_system.applyForce(this.m_firstIndex, this.m_lastIndex, force);
  }

  /**
   * Call b2ParticleSystem::ApplyLinearImpulse for every particle in the
   * group.
   */
  applyLinearImpulse(impulse: Vec2) {
    this.m_system.applyLinearImpulse(this.m_firstIndex, this.m_lastIndex, impulse);
  }

  /**
   * Destroy all the particles in this group.
   * This function is locked during callbacks.
   * @param callDestructionListener Whether to call the world b2DestructionListener for each
   * particle is destroyed.
   * @warning This function is locked during callbacks.
   */
  destroyParticles(callDestructionListener = false) {
    _ASSERT && common.assert(this.m_system.m_world.isLocked() == false);
    if (this.m_system.m_world.isLocked()) {
      return;
    }

    for (let i = this.m_firstIndex; i < this.m_lastIndex; i++) {
      this.m_system.destroyParticle(i, callDestructionListener);
    }
  }

  //	~b2ParticleGroup();

  private updateStatistics() {
    if (this.m_timestamp != this.m_system.m_timestamp) {
      const m = this.m_system.getParticleMass();
      let m_mass = 0;
      this.m_center.setZero();
      this.m_linearVelocity.setZero();
      for (let i = this.m_firstIndex; i < this.m_lastIndex; i++) {
        this.m_mass += m;
        this.m_center.addMul(m, this.m_system.m_positionBuffer.data[i]);
        this.m_linearVelocity.addMul(m, this.m_system.m_velocityBuffer.data[i]);
      }
      if (this.m_mass > 0) {
        this.m_center.mul(1 / m_mass);
        this.m_linearVelocity.mul(1 / m_mass);
      }
      this.m_inertia = 0;
      this.m_angularVelocity = 0;
      for (let i = this.m_firstIndex; i < this.m_lastIndex; i++) {
        const p = Vec2.sub(this.m_system.m_positionBuffer.data[i], this.m_center);
        const v = Vec2.sub(this.m_system.m_velocityBuffer.data[i], this.m_linearVelocity);
        this.m_inertia += m * Vec2.dot(p, p);
        this.m_angularVelocity += m * Vec2.cross(p, v);
      }
      if (this.m_inertia > 0) {
        this.m_angularVelocity *= 1 / this.m_inertia;
      }
      this.m_timestamp = this.m_system.m_timestamp;
    }
  }

}
