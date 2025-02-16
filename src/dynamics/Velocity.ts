/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2 } from "../common/Vec2";

export class Velocity {
  /** linear */
  v = Vec2.zero();

  /** angular */
  w = 0;
}
