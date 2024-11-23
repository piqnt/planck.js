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

import type { Vec2Value } from "../../common/Vec2";
import { PolygonShape } from "./PolygonShape";


/** @internal */ const _CONSTRUCTOR_FACTORY = typeof CONSTRUCTOR_FACTORY === "undefined" ? false : CONSTRUCTOR_FACTORY;

declare module "./BoxShape" {
  /** @hidden @deprecated Use new keyword. */
  // @ts-expect-error
  function BoxShape(halfWidth: number, halfHeight: number, center?: Vec2Value, angle?: number): BoxShape;
}

/**
 * A rectangle polygon which extend PolygonShape.
 */
// @ts-expect-error
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
    // @ts-ignore
    if (_CONSTRUCTOR_FACTORY && !(this instanceof BoxShape)) {
      return new BoxShape(halfWidth, halfHeight, center, angle);
    }

    super();

    this._setAsBox(halfWidth, halfHeight, center, angle);
  }
}

export const Box = BoxShape;
