/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2Value } from "../common/Vec2";

/**
 * Ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
 */
export interface RayCastInput {
  p1: Vec2Value;
  p2: Vec2Value;
  maxFraction: number;
}

export type RayCastCallback = (subInput: RayCastInput, id: number) => number;

/**
 * Ray-cast output data. The ray hits at `p1 + fraction * (p2 - p1)`,
 * where `p1` and `p2` come from RayCastInput.
 */
export interface RayCastOutput {
  normal: Vec2Value;
  fraction: number;
}
