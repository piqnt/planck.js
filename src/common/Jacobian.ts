/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2 } from "./Vec2";

/** @internal */
export class Jacobian {
  linear: Vec2;
  angularA: number;
  angularB: number;
}
