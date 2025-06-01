/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../../common/Matrix";
import type { MassData } from "../../dynamics/Body";
import { AABBValue, RayCastOutput, RayCastInput, AABB } from "../AABB";
import { DistanceProxy } from "../Distance";
import { Transform, TransformValue } from "../../common/Transform";
import { Vec2, Vec2Value } from "../../common/Vec2";
import { SettingsInternal as Settings } from "../../Settings";
import { Shape } from "../Shape";
import { EdgeShape } from "./EdgeShape";

/** @internal */ const _ASSERT = typeof ASSERT === "undefined" ? false : ASSERT;
/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;

/** @internal */ const v1 = matrix.vec2(0, 0);
/** @internal */ const v2 = matrix.vec2(0, 0);

declare module "./ChainShape" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function ChainShape(vertices?: Vec2Value[], loop?: boolean): ChainShape;
}

/**
 * A chain shape is a free form sequence of line segments. The chain has
 * two-sided collision, so you can use inside and outside collision. Therefore,
 * you may use any winding order. Connectivity information is used to create
 * smooth collisions.
 *
 * WARNING: The chain will not collide properly if there are self-intersections.
 */
// @ts-expect-error
export class ChainShape extends Shape {
  static TYPE = "chain" as const;
  /** @hidden */ m_type: "chain";

  /** @hidden */ m_radius: number;

  /** @hidden */ m_vertices: Vec2[];
  /** @hidden */ m_count: number;
  /** @hidden */ m_prevVertex: Vec2 | null;
  /** @hidden */ m_nextVertex: Vec2 | null;
  /** @hidden */ m_hasPrevVertex: boolean;
  /** @hidden */ m_hasNextVertex: boolean;

  /** @hidden */ m_isLoop: boolean;

  constructor(vertices?: Vec2Value[], loop?: boolean) {
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof ChainShape)) {
      return new ChainShape(vertices, loop);
    }

    super();

    this.m_type = ChainShape.TYPE;
    this.m_radius = Settings.polygonRadius;
    this.m_vertices = [];
    this.m_count = 0;
    this.m_prevVertex = null;
    this.m_nextVertex = null;
    this.m_hasPrevVertex = false;
    this.m_hasNextVertex = false;

    this.m_isLoop = !!loop;

    if (vertices && vertices.length) {
      if (loop) {
        this._createLoop(vertices);
      } else {
        this._createChain(vertices);
      }
    }
  }

  /** @hidden */
  _serialize(): object {
    const data = {
      type: this.m_type,
      vertices: this.m_isLoop ? this.m_vertices.slice(0, this.m_vertices.length - 1) : this.m_vertices,
      isLoop: this.m_isLoop,
      hasPrevVertex: this.m_hasPrevVertex,
      hasNextVertex: this.m_hasNextVertex,
      prevVertex: null as Vec2 | null,
      nextVertex: null as Vec2 | null,
    };
    if (this.m_prevVertex) {
      data.prevVertex = this.m_prevVertex;
    }
    if (this.m_nextVertex) {
      data.nextVertex = this.m_nextVertex;
    }
    return data;
  }

  /** @hidden */
  static _deserialize(data: any, fixture: any, restore: any): ChainShape {
    const vertices: Vec2[] = [];
    if (data.vertices) {
      for (let i = 0; i < data.vertices.length; i++) {
        vertices.push(restore(Vec2, data.vertices[i]));
      }
    }
    const shape = new ChainShape(vertices, data.isLoop);
    if (data.prevVertex) {
      shape.setPrevVertex(data.prevVertex);
    }
    if (data.nextVertex) {
      shape.setNextVertex(data.nextVertex);
    }
    return shape;
  }

  // clear() {
  //   this.m_vertices.length = 0;
  //   this.m_count = 0;
  // }

  getType(): "chain" {
    return this.m_type;
  }

  getRadius(): number {
    return this.m_radius;
  }

  /**
   * @internal
   * Create a loop. This automatically adjusts connectivity.
   *
   * @param vertices an array of vertices, these are copied
   */
  _createLoop(vertices: Vec2Value[]): ChainShape {
    if (_ASSERT) console.assert(this.m_vertices.length == 0 && this.m_count == 0);
    if (_ASSERT) console.assert(vertices.length >= 3);
    if (vertices.length < 3) {
      return;
    }

    if (_ASSERT) {
      for (let i = 1; i < vertices.length; ++i) {
        const v1 = vertices[i - 1];
        const v2 = vertices[i];
        // If the code crashes here, it means your vertices are too close together.
        console.assert(Vec2.distanceSquared(v1, v2) > Settings.linearSlopSquared);
      }
    }

    this.m_vertices = [];
    this.m_count = vertices.length + 1;
    for (let i = 0; i < vertices.length; ++i) {
      this.m_vertices[i] = Vec2.clone(vertices[i]);
    }
    this.m_vertices[vertices.length] = Vec2.clone(vertices[0]);

    this.m_prevVertex = this.m_vertices[this.m_count - 2];
    this.m_nextVertex = this.m_vertices[1];
    this.m_hasPrevVertex = true;
    this.m_hasNextVertex = true;
    return this;
  }

  /**
   * @internal
   * Create a chain with isolated end vertices.
   *
   * @param vertices an array of vertices, these are copied
   */
  _createChain(vertices: Vec2Value[]): ChainShape {
    if (_ASSERT) console.assert(this.m_vertices.length == 0 && this.m_count == 0);
    if (_ASSERT) console.assert(vertices.length >= 2);
    if (_ASSERT) {
      for (let i = 1; i < vertices.length; ++i) {
        const v1 = vertices[i - 1];
        const v2 = vertices[i];
        // If the code crashes here, it means your vertices are too close together.
        console.assert(Vec2.distanceSquared(v1, v2) > Settings.linearSlopSquared);
      }
    }

    this.m_vertices = [];
    this.m_count = vertices.length;
    for (let i = 0; i < vertices.length; ++i) {
      this.m_vertices[i] = Vec2.clone(vertices[i]);
    }

    this.m_prevVertex = null;
    this.m_nextVertex = null;
    this.m_hasPrevVertex = false;
    this.m_hasNextVertex = false;
    return this;
  }

  /** @hidden */
  _reset(): void {
    if (this.m_isLoop) {
      this._createLoop(this.m_vertices.slice(0, this.m_vertices.length - 1));
    } else {
      this._createChain(this.m_vertices);
    }
  }

  /**
   * Establish connectivity to a vertex that precedes the first vertex. Don't call
   * this for loops.
   */
  setPrevVertex(prevVertex: Vec2): void {
    // todo: copy or reference
    this.m_prevVertex = prevVertex;
    this.m_hasPrevVertex = true;
  }

  getPrevVertex(): Vec2 {
    return this.m_prevVertex;
  }

  /**
   * Establish connectivity to a vertex that follows the last vertex. Don't call
   * this for loops.
   */
  setNextVertex(nextVertex: Vec2): void {
    // todo: copy or reference
    this.m_nextVertex = nextVertex;
    this.m_hasNextVertex = true;
  }

  getNextVertex(): Vec2 {
    return this.m_nextVertex;
  }

  /**
   * @internal @deprecated Shapes should be treated as immutable.
   *
   * clone the concrete shape.
   */
  _clone(): ChainShape {
    const clone = new ChainShape();
    clone._createChain(this.m_vertices);
    clone.m_type = this.m_type;
    clone.m_radius = this.m_radius;
    clone.m_prevVertex = this.m_prevVertex;
    clone.m_nextVertex = this.m_nextVertex;
    clone.m_hasPrevVertex = this.m_hasPrevVertex;
    clone.m_hasNextVertex = this.m_hasNextVertex;
    return clone;
  }

  /**
   * Get the number of child primitives.
   */
  getChildCount(): number {
    // edge count = vertex count - 1
    return this.m_count - 1;
  }

  // Get a child edge.
  getChildEdge(edge: EdgeShape, childIndex: number): void {
    if (_ASSERT) console.assert(0 <= childIndex && childIndex < this.m_count - 1);
    edge.m_type = EdgeShape.TYPE;
    edge.m_radius = this.m_radius;

    edge.m_vertex1 = this.m_vertices[childIndex];
    edge.m_vertex2 = this.m_vertices[childIndex + 1];

    if (childIndex > 0) {
      edge.m_vertex0 = this.m_vertices[childIndex - 1];
      edge.m_hasVertex0 = true;
    } else {
      edge.m_vertex0 = this.m_prevVertex;
      edge.m_hasVertex0 = this.m_hasPrevVertex;
    }

    if (childIndex < this.m_count - 2) {
      edge.m_vertex3 = this.m_vertices[childIndex + 2];
      edge.m_hasVertex3 = true;
    } else {
      edge.m_vertex3 = this.m_nextVertex;
      edge.m_hasVertex3 = this.m_hasNextVertex;
    }
  }

  getVertex(index: number): Vec2 {
    if (_ASSERT) console.assert(0 <= index && index <= this.m_count);
    if (index < this.m_count) {
      return this.m_vertices[index];
    } else {
      return this.m_vertices[0];
    }
  }

  isLoop(): boolean {
    return this.m_isLoop;
  }

  /**
   * Test a point for containment in this shape. This only works for convex
   * shapes.
   *
   * This always return false.
   *
   * @param xf The shape world transform.
   * @param p A point in world coordinates.
   */
  testPoint(xf: TransformValue, p: Vec2Value): false {
    return false;
  }

  /**
   * Cast a ray against a child shape.
   *
   * @param output The ray-cast results.
   * @param input The ray-cast input parameters.
   * @param xf The transform to be applied to the shape.
   * @param childIndex The child shape index
   */
  rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean {
    if (_ASSERT) console.assert(0 <= childIndex && childIndex < this.m_count);

    const edgeShape = new EdgeShape(this.getVertex(childIndex), this.getVertex(childIndex + 1));
    return edgeShape.rayCast(output, input, xf, 0);
  }

  /**
   * Given a transform, compute the associated axis aligned bounding box for a
   * child shape.
   *
   * @param aabb Returns the axis aligned box.
   * @param xf The world transform of the shape.
   * @param childIndex The child shape
   */
  computeAABB(aabb: AABBValue, xf: TransformValue, childIndex: number): void {
    if (_ASSERT) console.assert(0 <= childIndex && childIndex < this.m_count);

    matrix.transformVec2(v1, xf, this.getVertex(childIndex));
    matrix.transformVec2(v2, xf, this.getVertex(childIndex + 1));

    AABB.combinePoints(aabb, v1, v2);
  }

  /**
   * Compute the mass properties of this shape using its dimensions and density.
   * The inertia tensor is computed about the local origin.
   *
   * Chains have zero mass.
   *
   * @param massData Returns the mass data for this shape.
   * @param density The density in kilograms per meter squared.
   */
  computeMass(massData: MassData, density?: number): void {
    massData.mass = 0.0;
    matrix.zeroVec2(massData.center);
    massData.I = 0.0;
  }

  computeDistanceProxy(proxy: DistanceProxy, childIndex: number): void {
    if (_ASSERT) console.assert(0 <= childIndex && childIndex < this.m_count);
    proxy.m_vertices[0] = this.getVertex(childIndex);
    proxy.m_vertices[1] = this.getVertex(childIndex + 1);
    proxy.m_count = 2;
    proxy.m_radius = this.m_radius;
  }
}

export { ChainShape as Chain };
