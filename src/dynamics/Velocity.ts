/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as matrix from "../common/Matrix";

export class Velocity {
  /** linear */
  v = matrix.vec2(0, 0);

  /** angular */
  w = 0;
}
