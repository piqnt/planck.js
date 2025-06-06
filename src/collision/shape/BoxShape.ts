/*
 * Planck.js
 *
 * Copyright (c) Erin Catto, Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Vec2Value } from "../../common/Vec2";
import { PolygonShape } from "./PolygonShape";

/**
 * A rectangle polygon which extend PolygonShape.
 */
export class BoxShape extends PolygonShape {
  // note that box is serialized/deserialized as polygon
  static TYPE = "polygon" as const;

  /**
   *
   * @param halfWidth
   * @param halfHeight
   * @param center coordinate of the center of the box relative to the body
   * @param angle angle of the box relative to the body
   */
  constructor(halfWidth: number, halfHeight: number, center?: Vec2Value, angle?: number) {
    super();

    this._setAsBox(halfWidth, halfHeight, center, angle);
  }
}

export { BoxShape as Box };
