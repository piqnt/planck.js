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

import common from '../util/common';
import type Vec2 from '../common/Vec2';
import type Body from './Body';
import { TimeStep } from "./Solver";

const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

/**
 * A joint edge is used to connect bodies and joints together in a joint graph
 * where each body is a node and each joint is an edge. A joint edge belongs to
 * a doubly linked list maintained in each attached body. Each joint has two
 * joint nodes, one for each attached body.
 */
export class JointEdge {
  /**
   * provides quick access to the other body attached.
   */
  other: Body | null = null;
  /**
   * the joint
   */
  joint: Joint | null = null;
  /**
   * prev the previous joint edge in the body's joint list
   */
  prev: JointEdge | null = null;
  /**
   * the next joint edge in the body's joint list
   */
  next: JointEdge | null = null;
}

/**
 * Joint definitions are used to construct joints.
 */
export interface JointOpt {
  /**
   * Use this to attach application specific data to your joints.
   */
  userData?: any;
  /**
   * Set this flag to true if the attached bodies
   * should collide.
   */
  collideConnected?: boolean;
}
/**
 * Joint definitions are used to construct joints.
 */
export interface JointDef extends JointOpt {
  /**
   * The first attached body.
   */
  bodyA: Body;
  /**
   * The second attached body.
   */
  bodyB: Body;
}

const DEFAULTS = {
  userData : null,
  collideConnected : false
};

/**
 * The base joint class. Joints are used to constraint two bodies together in
 * various fashions. Some joints also feature limits and motors.
 */
export default abstract class Joint {

  /** @internal */ m_type: string = 'unknown-joint';

  /** @internal */ m_bodyA: Body;
  /** @internal */ m_bodyB: Body;

  /** @internal */ m_collideConnected: boolean;

  /** @internal */ m_prev: Joint | null = null;
  /** @internal */ m_next: Joint | null = null;

  /** @internal */ m_edgeA: JointEdge = new JointEdge();
  /** @internal */ m_edgeB: JointEdge = new JointEdge();

  /** @internal */ m_islandFlag: boolean = false;
  /** @internal */ m_userData: unknown;

  constructor(def: JointDef);
  constructor(def: JointOpt, bodyA: Body, bodyB: Body);
  constructor(def: JointDef | JointOpt, bodyA?: Body, bodyB?: Body) {
    bodyA = 'bodyA' in def ? def.bodyA : bodyA;
    bodyB = 'bodyB' in def ? def.bodyB : bodyB;

    _ASSERT && common.assert(!!bodyA);
    _ASSERT && common.assert(!!bodyB);
    _ASSERT && common.assert(bodyA != bodyB);

    this.m_bodyA = bodyA!;
    this.m_bodyB = bodyB!;

    this.m_collideConnected = !!def.collideConnected;
    this.m_userData = def.userData;
  }

  /**
   * Short-cut function to determine if either body is inactive.
   */
  isActive(): boolean {
    return this.m_bodyA.isActive() && this.m_bodyB.isActive();
  }

  /**
   * Get the type of the concrete joint.
   */
  getType(): string {
    return this.m_type;
  }

  /**
   * Get the first body attached to this joint.
   */
  getBodyA(): Body {
    return this.m_bodyA;
  }

  /**
   * Get the second body attached to this joint.
   */
  getBodyB(): Body {
    return this.m_bodyB;
  }

  /**
   * Get the next joint the world joint list.
   */
  getNext(): Joint {
    return this.m_next;
  }

  getUserData(): unknown {
    return this.m_userData;
  }

  setUserData(data: unknown): void {
    this.m_userData = data;
  }

  /**
   * Get collide connected. Note: modifying the collide connect flag won't work
   * correctly because the flag is only checked when fixture AABBs begin to
   * overlap.
   */
  getCollideConnected(): boolean {
    return this.m_collideConnected;
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
   */
  abstract getAnchorA(): Vec2;

  /**
   * Get the anchor point on bodyB in world coordinates.
   */
  abstract getAnchorB(): Vec2;

  /**
   * Get the reaction force on bodyB at the joint anchor in Newtons.
   */
  abstract getReactionForce(inv_dt: number): Vec2;

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  abstract getReactionTorque(inv_dt: number): number;

  /**
   * Shift the origin for any points stored in world coordinates.
   */
  shiftOrigin(newOrigin: Vec2): void {}

  abstract initVelocityConstraints(step: TimeStep): void;

  abstract solveVelocityConstraints(step: TimeStep): void;

  /**
   * This returns true if the position errors are within tolerance.
   */
  abstract solvePositionConstraints(step: TimeStep): boolean;

}
