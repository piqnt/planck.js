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

import type { MassData } from '../dynamics/Body';
import { RayCastOutput, RayCastInput, AABBValue } from './AABB';
import { DistanceProxy } from './Distance';
import type { Transform, TransformValue }  from '../common/Transform';
import type { Vec2Value }  from '../common/Vec2';
import { Style } from '../util/Testbed';

// todo make shape an interface

/**
 * A shape is used for collision detection. You can create a shape however you
 * like. Shapes used for simulation in World are created automatically when a
 * Fixture is created. Shapes may encapsulate one or more child shapes.
 */
export abstract class Shape {
  m_type: ShapeType;

  /**
   * Radius of a shape. For polygonal shapes this must be b2_polygonRadius.
   * There is no support for making rounded polygons.
   */
  m_radius: number;

  /** Styling for dev-tools. */
  style: Style = {};

  /** @hidden @experimental Similar to userData, but used by dev-tools or runtime environment. */
  appData: Record<string, any> = {};

  /** @internal */
  abstract _reset(): void;

  static isValid(obj: any): boolean {
    if (obj === null || typeof obj === 'undefined') {
      return false;
    }
    return typeof obj.m_type === 'string' && typeof obj.m_radius === 'number';
  }

  abstract getRadius(): number;

  /**
   * Get the type of this shape. You can use this to down cast to the concrete
   * shape.
   *
   * @return the shape type.
   */
  abstract getType(): ShapeType;

  /**
   * @internal @deprecated Shapes should be treated as immutable.
   *
   * clone the concrete shape.
   */
  abstract _clone(): Shape;

  /**
   * Get the number of child primitives.
   */
  abstract getChildCount(): number;

  /**
   * Test a point for containment in this shape. This only works for convex
   * shapes.
   *
   * @param xf The shape world transform.
   * @param p A point in world coordinates.
   */
  abstract testPoint(xf: TransformValue, p: Vec2Value): boolean;

  /**
   * Cast a ray against a child shape.
   *
   * @param output The ray-cast results.
   * @param input The ray-cast input parameters.
   * @param xf The transform to be applied to the shape.
   * @param childIndex The child shape index
   */
  abstract rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean;

  /**
   * Given a transform, compute the associated axis aligned bounding box for a
   * child shape.
   *
   * @param aabb Returns the axis aligned box.
   * @param xf The world transform of the shape.
   * @param childIndex The child shape
   */
  abstract computeAABB(aabb: AABBValue, xf: TransformValue, childIndex: number): void;

  /**
   * Compute the mass properties of this shape using its dimensions and density.
   * The inertia tensor is computed about the local origin.
   *
   * @param massData Returns the mass data for this shape.
   * @param density The density in kilograms per meter squared.
   */
  abstract computeMass(massData: MassData, density?: number): void;

  abstract computeDistanceProxy(proxy: DistanceProxy, childIndex: number): void;

}

export type ShapeType = "circle" | "edge" | "polygon" | "chain";
