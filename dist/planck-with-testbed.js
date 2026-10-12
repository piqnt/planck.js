(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.planck = {}));
})(this, (function(exports2) {
  "use strict";/**
 * Planck.js v1.5.1
 * @license The MIT license
 * @copyright Copyright (c) 2026 Erin Catto, Ali Shakiba
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

  /**
   * Planck.js v1.5.1
   * @license The MIT license
   * @copyright Copyright (c) 2026 Erin Catto, Ali Shakiba
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
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3) if (Object.prototype.hasOwnProperty.call(b3, p2)) d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  function __extends(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t2) {
      for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
        s2 = arguments[i2];
        for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
      }
      return t2;
    };
    return __assign.apply(this, arguments);
  };
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e3 = new Error(message);
    return e3.name = "SuppressedError", e3.error = error, e3.suppressed = suppressed, e3;
  };
  var options = function(input2, defaults) {
    if (input2 === null || typeof input2 === "undefined") {
      input2 = {};
    }
    var output2 = __assign({}, input2);
    for (var key in defaults) {
      if (defaults.hasOwnProperty(key) && typeof input2[key] === "undefined") {
        output2[key] = defaults[key];
      }
    }
    if (typeof Object.getOwnPropertySymbols === "function") {
      var symbols = Object.getOwnPropertySymbols(defaults);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        var symbol = symbols[i2];
        if (defaults.propertyIsEnumerable(symbol) && typeof input2[symbol] === "undefined") {
          output2[symbol] = defaults[symbol];
        }
      }
    }
    return output2;
  };
  var math_random = Math.random;
  var EPSILON = 1e-9;
  var isFinite = Number.isFinite;
  function nextPowerOfTwo(x2) {
    x2 |= x2 >> 1;
    x2 |= x2 >> 2;
    x2 |= x2 >> 4;
    x2 |= x2 >> 8;
    x2 |= x2 >> 16;
    return x2 + 1;
  }
  function isPowerOfTwo(x2) {
    return x2 > 0 && (x2 & x2 - 1) === 0;
  }
  function mod(num, min, max) {
    if (typeof min === "undefined") {
      max = 1;
      min = 0;
    } else if (typeof max === "undefined") {
      max = min;
      min = 0;
    }
    if (max > min) {
      num = (num - min) % (max - min);
      return num + (num < 0 ? max : min);
    } else {
      num = (num - max) % (min - max);
      return num + (num <= 0 ? min : max);
    }
  }
  function clamp(num, min, max) {
    if (num < min) {
      return min;
    } else if (num > max) {
      return max;
    } else {
      return num;
    }
  }
  function random$1(min, max) {
    if (typeof min === "undefined") {
      max = 1;
      min = 0;
    } else if (typeof max === "undefined") {
      max = min;
      min = 0;
    }
    return min === max ? min : math_random() * (max - min) + min;
  }
  var math = Object.create(Math);
  math.EPSILON = EPSILON;
  math.isFinite = isFinite;
  math.nextPowerOfTwo = nextPowerOfTwo;
  math.isPowerOfTwo = isPowerOfTwo;
  math.mod = mod;
  math.clamp = clamp;
  math.random = random$1;
  var math_abs$9 = Math.abs;
  var math_sqrt$5 = Math.sqrt;
  var math_max$8 = Math.max;
  var math_min$8 = Math.min;
  var Vec2 = (
    /** @class */
    (function() {
      function Vec22(x2, y2) {
        if (!(this instanceof Vec22)) {
          return new Vec22(x2, y2);
        }
        if (typeof x2 === "undefined") {
          this.x = 0;
          this.y = 0;
        } else if (typeof x2 === "object") {
          this.x = x2.x;
          this.y = x2.y;
        } else {
          this.x = x2;
          this.y = y2;
        }
      }
      Vec22.prototype._serialize = function() {
        return {
          x: this.x,
          y: this.y
        };
      };
      Vec22._deserialize = function(data) {
        var obj = Object.create(Vec22.prototype);
        obj.x = data.x;
        obj.y = data.y;
        return obj;
      };
      Vec22.zero = function() {
        var obj = Object.create(Vec22.prototype);
        obj.x = 0;
        obj.y = 0;
        return obj;
      };
      Vec22.neo = function(x2, y2) {
        var obj = Object.create(Vec22.prototype);
        obj.x = x2;
        obj.y = y2;
        return obj;
      };
      Vec22.clone = function(v3) {
        return Vec22.neo(v3.x, v3.y);
      };
      Vec22.prototype.toString = function() {
        return JSON.stringify(this);
      };
      Vec22.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Number.isFinite(obj.x) && Number.isFinite(obj.y);
      };
      Vec22.assert = function(o2) {
      };
      Vec22.prototype.clone = function() {
        return Vec22.clone(this);
      };
      Vec22.prototype.setZero = function() {
        this.x = 0;
        this.y = 0;
        return this;
      };
      Vec22.prototype.set = function(x2, y2) {
        if (typeof x2 === "object") {
          this.x = x2.x;
          this.y = x2.y;
        } else {
          this.x = x2;
          this.y = y2;
        }
        return this;
      };
      Vec22.prototype.setNum = function(x2, y2) {
        this.x = x2;
        this.y = y2;
        return this;
      };
      Vec22.prototype.setVec2 = function(value) {
        this.x = value.x;
        this.y = value.y;
        return this;
      };
      Vec22.prototype.wSet = function(a2, v3, b2, w2) {
        if (typeof b2 !== "undefined" || typeof w2 !== "undefined") {
          return this.setCombine(a2, v3, b2, w2);
        } else {
          return this.setMul(a2, v3);
        }
      };
      Vec22.prototype.setCombine = function(a2, v3, b2, w2) {
        var x2 = a2 * v3.x + b2 * w2.x;
        var y2 = a2 * v3.y + b2 * w2.y;
        this.x = x2;
        this.y = y2;
        return this;
      };
      Vec22.prototype.setMul = function(a2, v3) {
        var x2 = a2 * v3.x;
        var y2 = a2 * v3.y;
        this.x = x2;
        this.y = y2;
        return this;
      };
      Vec22.prototype.add = function(w2) {
        this.x += w2.x;
        this.y += w2.y;
        return this;
      };
      Vec22.prototype.wAdd = function(a2, v3, b2, w2) {
        if (typeof b2 !== "undefined" || typeof w2 !== "undefined") {
          return this.addCombine(a2, v3, b2, w2);
        } else {
          return this.addMul(a2, v3);
        }
      };
      Vec22.prototype.addCombine = function(a2, v3, b2, w2) {
        var x2 = a2 * v3.x + b2 * w2.x;
        var y2 = a2 * v3.y + b2 * w2.y;
        this.x += x2;
        this.y += y2;
        return this;
      };
      Vec22.prototype.addMul = function(a2, v3) {
        var x2 = a2 * v3.x;
        var y2 = a2 * v3.y;
        this.x += x2;
        this.y += y2;
        return this;
      };
      Vec22.prototype.wSub = function(a2, v3, b2, w2) {
        if (typeof b2 !== "undefined" || typeof w2 !== "undefined") {
          return this.subCombine(a2, v3, b2, w2);
        } else {
          return this.subMul(a2, v3);
        }
      };
      Vec22.prototype.subCombine = function(a2, v3, b2, w2) {
        var x2 = a2 * v3.x + b2 * w2.x;
        var y2 = a2 * v3.y + b2 * w2.y;
        this.x -= x2;
        this.y -= y2;
        return this;
      };
      Vec22.prototype.subMul = function(a2, v3) {
        var x2 = a2 * v3.x;
        var y2 = a2 * v3.y;
        this.x -= x2;
        this.y -= y2;
        return this;
      };
      Vec22.prototype.sub = function(w2) {
        this.x -= w2.x;
        this.y -= w2.y;
        return this;
      };
      Vec22.prototype.mul = function(m2) {
        this.x *= m2;
        this.y *= m2;
        return this;
      };
      Vec22.prototype.length = function() {
        return Vec22.lengthOf(this);
      };
      Vec22.prototype.lengthSquared = function() {
        return Vec22.lengthSquared(this);
      };
      Vec22.prototype.normalize = function() {
        var length = this.length();
        if (length < EPSILON) {
          return 0;
        }
        var invLength = 1 / length;
        this.x *= invLength;
        this.y *= invLength;
        return length;
      };
      Vec22.normalize = function(v3) {
        var length = Vec22.lengthOf(v3);
        if (length < EPSILON) {
          return Vec22.zero();
        }
        var invLength = 1 / length;
        return Vec22.neo(v3.x * invLength, v3.y * invLength);
      };
      Vec22.lengthOf = function(v3) {
        return math_sqrt$5(v3.x * v3.x + v3.y * v3.y);
      };
      Vec22.lengthSquared = function(v3) {
        return v3.x * v3.x + v3.y * v3.y;
      };
      Vec22.distance = function(v3, w2) {
        var dx = v3.x - w2.x;
        var dy = v3.y - w2.y;
        return math_sqrt$5(dx * dx + dy * dy);
      };
      Vec22.distanceSquared = function(v3, w2) {
        var dx = v3.x - w2.x;
        var dy = v3.y - w2.y;
        return dx * dx + dy * dy;
      };
      Vec22.areEqual = function(v3, w2) {
        return v3 === w2 || typeof w2 === "object" && w2 !== null && v3.x === w2.x && v3.y === w2.y;
      };
      Vec22.skew = function(v3) {
        return Vec22.neo(-v3.y, v3.x);
      };
      Vec22.dot = function(v3, w2) {
        return v3.x * w2.x + v3.y * w2.y;
      };
      Vec22.cross = function(v3, w2) {
        if (typeof w2 === "number") {
          return Vec22.neo(w2 * v3.y, -w2 * v3.x);
        } else if (typeof v3 === "number") {
          return Vec22.neo(-v3 * w2.y, v3 * w2.x);
        } else {
          return v3.x * w2.y - v3.y * w2.x;
        }
      };
      Vec22.crossVec2Vec2 = function(v3, w2) {
        return v3.x * w2.y - v3.y * w2.x;
      };
      Vec22.crossVec2Num = function(v3, w2) {
        return Vec22.neo(w2 * v3.y, -w2 * v3.x);
      };
      Vec22.crossNumVec2 = function(v3, w2) {
        return Vec22.neo(-v3 * w2.y, v3 * w2.x);
      };
      Vec22.addCross = function(a2, v3, w2) {
        if (typeof w2 === "number") {
          return Vec22.neo(w2 * v3.y + a2.x, -w2 * v3.x + a2.y);
        } else if (typeof v3 === "number") {
          return Vec22.neo(-v3 * w2.y + a2.x, v3 * w2.x + a2.y);
        }
      };
      Vec22.addCrossVec2Num = function(a2, v3, w2) {
        return Vec22.neo(w2 * v3.y + a2.x, -w2 * v3.x + a2.y);
      };
      Vec22.addCrossNumVec2 = function(a2, v3, w2) {
        return Vec22.neo(-v3 * w2.y + a2.x, v3 * w2.x + a2.y);
      };
      Vec22.add = function(v3, w2) {
        return Vec22.neo(v3.x + w2.x, v3.y + w2.y);
      };
      Vec22.wAdd = function(a2, v3, b2, w2) {
        if (typeof b2 !== "undefined" || typeof w2 !== "undefined") {
          return Vec22.combine(a2, v3, b2, w2);
        } else {
          return Vec22.mulNumVec2(a2, v3);
        }
      };
      Vec22.combine = function(a2, v3, b2, w2) {
        return Vec22.zero().setCombine(a2, v3, b2, w2);
      };
      Vec22.sub = function(v3, w2) {
        return Vec22.neo(v3.x - w2.x, v3.y - w2.y);
      };
      Vec22.mul = function(a2, b2) {
        if (typeof a2 === "object") {
          return Vec22.neo(a2.x * b2, a2.y * b2);
        } else if (typeof b2 === "object") {
          return Vec22.neo(a2 * b2.x, a2 * b2.y);
        }
      };
      Vec22.mulVec2Num = function(a2, b2) {
        return Vec22.neo(a2.x * b2, a2.y * b2);
      };
      Vec22.mulNumVec2 = function(a2, b2) {
        return Vec22.neo(a2 * b2.x, a2 * b2.y);
      };
      Vec22.prototype.neg = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
      };
      Vec22.neg = function(v3) {
        return Vec22.neo(-v3.x, -v3.y);
      };
      Vec22.abs = function(v3) {
        return Vec22.neo(math_abs$9(v3.x), math_abs$9(v3.y));
      };
      Vec22.mid = function(v3, w2) {
        return Vec22.neo((v3.x + w2.x) * 0.5, (v3.y + w2.y) * 0.5);
      };
      Vec22.upper = function(v3, w2) {
        return Vec22.neo(math_max$8(v3.x, w2.x), math_max$8(v3.y, w2.y));
      };
      Vec22.lower = function(v3, w2) {
        return Vec22.neo(math_min$8(v3.x, w2.x), math_min$8(v3.y, w2.y));
      };
      Vec22.prototype.clamp = function(max) {
        var lengthSqr = this.x * this.x + this.y * this.y;
        if (lengthSqr > max * max) {
          var scale = max / math_sqrt$5(lengthSqr);
          this.x *= scale;
          this.y *= scale;
        }
        return this;
      };
      Vec22.clamp = function(v3, max) {
        var r2 = Vec22.neo(v3.x, v3.y);
        r2.clamp(max);
        return r2;
      };
      Vec22.clampVec2 = function(v3, min, max) {
        return {
          x: clamp(v3.x, min === null || min === void 0 ? void 0 : min.x, max === null || max === void 0 ? void 0 : max.x),
          y: clamp(v3.y, min === null || min === void 0 ? void 0 : min.y, max === null || max === void 0 ? void 0 : max.y)
        };
      };
      Vec22.scaleFn = function(x2, y2) {
        return function(v3) {
          return Vec22.neo(v3.x * x2, v3.y * y2);
        };
      };
      Vec22.translateFn = function(x2, y2) {
        return function(v3) {
          return Vec22.neo(v3.x + x2, v3.y + y2);
        };
      };
      return Vec22;
    })()
  );
  var math_max$7 = Math.max;
  var math_min$7 = Math.min;
  var AABB = (
    /** @class */
    (function() {
      function AABB2(lower, upper) {
        if (!(this instanceof AABB2)) {
          return new AABB2(lower, upper);
        }
        this.lowerBound = Vec2.zero();
        this.upperBound = Vec2.zero();
        if (typeof lower === "object") {
          this.lowerBound.setVec2(lower);
        }
        if (typeof upper === "object") {
          this.upperBound.setVec2(upper);
        } else if (typeof lower === "object") {
          this.upperBound.setVec2(lower);
        }
      }
      AABB2.prototype.isValid = function() {
        return AABB2.isValid(this);
      };
      AABB2.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Vec2.isValid(obj.lowerBound) && Vec2.isValid(obj.upperBound) && Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0;
      };
      AABB2.assert = function(o2) {
      };
      AABB2.prototype.getCenter = function() {
        return Vec2.neo((this.lowerBound.x + this.upperBound.x) * 0.5, (this.lowerBound.y + this.upperBound.y) * 0.5);
      };
      AABB2.prototype.getExtents = function() {
        return Vec2.neo((this.upperBound.x - this.lowerBound.x) * 0.5, (this.upperBound.y - this.lowerBound.y) * 0.5);
      };
      AABB2.prototype.getPerimeter = function() {
        return 2 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
      };
      AABB2.prototype.combine = function(a2, b2) {
        b2 = b2 || this;
        var lowerA = a2.lowerBound;
        var upperA = a2.upperBound;
        var lowerB = b2.lowerBound;
        var upperB = b2.upperBound;
        var lowerX = math_min$7(lowerA.x, lowerB.x);
        var lowerY = math_min$7(lowerA.y, lowerB.y);
        var upperX = math_max$7(upperB.x, upperA.x);
        var upperY = math_max$7(upperB.y, upperA.y);
        this.lowerBound.setNum(lowerX, lowerY);
        this.upperBound.setNum(upperX, upperY);
      };
      AABB2.prototype.combinePoints = function(a2, b2) {
        this.lowerBound.setNum(math_min$7(a2.x, b2.x), math_min$7(a2.y, b2.y));
        this.upperBound.setNum(math_max$7(a2.x, b2.x), math_max$7(a2.y, b2.y));
      };
      AABB2.prototype.set = function(aabb) {
        this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
        this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
      };
      AABB2.prototype.contains = function(aabb) {
        var result = true;
        result = result && this.lowerBound.x <= aabb.lowerBound.x;
        result = result && this.lowerBound.y <= aabb.lowerBound.y;
        result = result && aabb.upperBound.x <= this.upperBound.x;
        result = result && aabb.upperBound.y <= this.upperBound.y;
        return result;
      };
      AABB2.prototype.extend = function(value) {
        AABB2.extend(this, value);
        return this;
      };
      AABB2.extend = function(out, value) {
        out.lowerBound.x -= value;
        out.lowerBound.y -= value;
        out.upperBound.x += value;
        out.upperBound.y += value;
        return out;
      };
      AABB2.testOverlap = function(a2, b2) {
        var d1x = b2.lowerBound.x - a2.upperBound.x;
        var d2x = a2.lowerBound.x - b2.upperBound.x;
        var d1y = b2.lowerBound.y - a2.upperBound.y;
        var d2y = a2.lowerBound.y - b2.upperBound.y;
        if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
          return false;
        }
        return true;
      };
      AABB2.areEqual = function(a2, b2) {
        return Vec2.areEqual(a2.lowerBound, b2.lowerBound) && Vec2.areEqual(a2.upperBound, b2.upperBound);
      };
      AABB2.diff = function(a2, b2) {
        var wD = math_max$7(0, math_min$7(a2.upperBound.x, b2.upperBound.x) - math_max$7(b2.lowerBound.x, a2.lowerBound.x));
        var hD = math_max$7(0, math_min$7(a2.upperBound.y, b2.upperBound.y) - math_max$7(b2.lowerBound.y, a2.lowerBound.y));
        var wA = a2.upperBound.x - a2.lowerBound.x;
        var hA = a2.upperBound.y - a2.lowerBound.y;
        var wB = b2.upperBound.x - b2.lowerBound.x;
        var hB = b2.upperBound.y - b2.lowerBound.y;
        return wA * hA + wB * hB - wD * hD;
      };
      AABB2.prototype.rayCast = function(output2, input2) {
        var tmin = -Infinity;
        var tmax = Infinity;
        var p2 = input2.p1;
        var d2 = Vec2.sub(input2.p2, input2.p1);
        var absD = Vec2.abs(d2);
        var normal3 = Vec2.zero();
        {
          if (absD.x < EPSILON) {
            if (p2.x < this.lowerBound.x || this.upperBound.x < p2.x) {
              return false;
            }
          } else {
            var inv_d = 1 / d2.x;
            var t1 = (this.lowerBound.x - p2.x) * inv_d;
            var t2 = (this.upperBound.x - p2.x) * inv_d;
            var s2 = -1;
            if (t1 > t2) {
              var temp3 = t1;
              t1 = t2;
              t2 = temp3;
              s2 = 1;
            }
            if (t1 > tmin) {
              normal3.setZero();
              normal3.x = s2;
              tmin = t1;
            }
            tmax = math_min$7(tmax, t2);
            if (tmin > tmax) {
              return false;
            }
          }
        }
        {
          if (absD.y < EPSILON) {
            if (p2.y < this.lowerBound.y || this.upperBound.y < p2.y) {
              return false;
            }
          } else {
            var inv_d = 1 / d2.y;
            var t1 = (this.lowerBound.y - p2.y) * inv_d;
            var t2 = (this.upperBound.y - p2.y) * inv_d;
            var s2 = -1;
            if (t1 > t2) {
              var temp3 = t1;
              t1 = t2;
              t2 = temp3;
              s2 = 1;
            }
            if (t1 > tmin) {
              normal3.setZero();
              normal3.y = s2;
              tmin = t1;
            }
            tmax = math_min$7(tmax, t2);
            if (tmin > tmax) {
              return false;
            }
          }
        }
        if (tmin < 0 || input2.maxFraction < tmin) {
          return false;
        }
        output2.fraction = tmin;
        output2.normal = normal3;
        return true;
      };
      AABB2.prototype.toString = function() {
        return JSON.stringify(this);
      };
      AABB2.combinePoints = function(out, a2, b2) {
        out.lowerBound.x = math_min$7(a2.x, b2.x);
        out.lowerBound.y = math_min$7(a2.y, b2.y);
        out.upperBound.x = math_max$7(a2.x, b2.x);
        out.upperBound.y = math_max$7(a2.y, b2.y);
        return out;
      };
      AABB2.combinedPerimeter = function(a2, b2) {
        var lx = math_min$7(a2.lowerBound.x, b2.lowerBound.x);
        var ly = math_min$7(a2.lowerBound.y, b2.lowerBound.y);
        var ux = math_max$7(a2.upperBound.x, b2.upperBound.x);
        var uy = math_max$7(a2.upperBound.y, b2.upperBound.y);
        return 2 * (ux - lx + uy - ly);
      };
      return AABB2;
    })()
  );
  var math_PI$6 = Math.PI;
  var Settings = (
    /** @class */
    (function() {
      function Settings2() {
      }
      Object.defineProperty(Settings2, "polygonRadius", {
        /**
         * The radius of the polygon/edge shape skin. This should not be modified.
         * Making this smaller means polygons will have an insufficient buffer for
         * continuous collision. Making it larger may create artifacts for vertex
         * collision.
         */
        get: function() {
          return 2 * Settings2.linearSlop;
        },
        enumerable: false,
        configurable: true
      });
      Settings2.lengthUnitsPerMeter = 1;
      Settings2.maxManifoldPoints = 2;
      Settings2.maxPolygonVertices = 12;
      Settings2.aabbExtension = 0.1;
      Settings2.aabbMultiplier = 2;
      Settings2.linearSlop = 5e-3;
      Settings2.angularSlop = 2 / 180 * math_PI$6;
      Settings2.maxSubSteps = 8;
      Settings2.maxTOIContacts = 32;
      Settings2.maxTOIIterations = 20;
      Settings2.maxDistanceIterations = 20;
      Settings2.velocityThreshold = 1;
      Settings2.maxLinearCorrection = 0.2;
      Settings2.maxAngularCorrection = 8 / 180 * math_PI$6;
      Settings2.maxTranslation = 2;
      Settings2.maxRotation = 0.5 * math_PI$6;
      Settings2.baumgarte = 0.2;
      Settings2.toiBaugarte = 0.75;
      Settings2.timeToSleep = 0.5;
      Settings2.linearSleepTolerance = 0.01;
      Settings2.angularSleepTolerance = 2 / 180 * math_PI$6;
      return Settings2;
    })()
  );
  var SettingsInternal = (
    /** @class */
    (function() {
      function SettingsInternal2() {
      }
      Object.defineProperty(SettingsInternal2, "maxManifoldPoints", {
        get: function() {
          return Settings.maxManifoldPoints;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxPolygonVertices", {
        get: function() {
          return Settings.maxPolygonVertices;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "aabbExtension", {
        get: function() {
          return Settings.aabbExtension * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "aabbMultiplier", {
        get: function() {
          return Settings.aabbMultiplier;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "linearSlop", {
        get: function() {
          return Settings.linearSlop * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "linearSlopSquared", {
        get: function() {
          return Settings.linearSlop * Settings.lengthUnitsPerMeter * Settings.linearSlop * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "angularSlop", {
        get: function() {
          return Settings.angularSlop;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "polygonRadius", {
        get: function() {
          return 2 * Settings.linearSlop;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxSubSteps", {
        get: function() {
          return Settings.maxSubSteps;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxTOIContacts", {
        get: function() {
          return Settings.maxTOIContacts;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxTOIIterations", {
        get: function() {
          return Settings.maxTOIIterations;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxDistanceIterations", {
        get: function() {
          return Settings.maxDistanceIterations;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "velocityThreshold", {
        get: function() {
          return Settings.velocityThreshold * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxLinearCorrection", {
        get: function() {
          return Settings.maxLinearCorrection * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxAngularCorrection", {
        get: function() {
          return Settings.maxAngularCorrection;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxTranslation", {
        get: function() {
          return Settings.maxTranslation * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxTranslationSquared", {
        get: function() {
          return Settings.maxTranslation * Settings.lengthUnitsPerMeter * Settings.maxTranslation * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxRotation", {
        get: function() {
          return Settings.maxRotation;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "maxRotationSquared", {
        get: function() {
          return Settings.maxRotation * Settings.maxRotation;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "baumgarte", {
        get: function() {
          return Settings.baumgarte;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "toiBaugarte", {
        get: function() {
          return Settings.toiBaugarte;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "timeToSleep", {
        get: function() {
          return Settings.timeToSleep;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "linearSleepTolerance", {
        get: function() {
          return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "linearSleepToleranceSqr", {
        get: function() {
          return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter * Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "angularSleepTolerance", {
        get: function() {
          return Settings.angularSleepTolerance;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SettingsInternal2, "angularSleepToleranceSqr", {
        get: function() {
          return Settings.angularSleepTolerance * Settings.angularSleepTolerance;
        },
        enumerable: false,
        configurable: true
      });
      return SettingsInternal2;
    })()
  );
  var Pool = (
    /** @class */
    (function() {
      function Pool2(opts) {
        this._list = [];
        this._max = Infinity;
        this._hasCreateFn = false;
        this._createCount = 0;
        this._hasAllocateFn = false;
        this._allocateCount = 0;
        this._hasReleaseFn = false;
        this._releaseCount = 0;
        this._hasDisposeFn = false;
        this._disposeCount = 0;
        this._list = [];
        this._max = opts.max || this._max;
        this._createFn = opts.create;
        this._hasCreateFn = typeof this._createFn === "function";
        this._allocateFn = opts.allocate;
        this._hasAllocateFn = typeof this._allocateFn === "function";
        this._releaseFn = opts.release;
        this._hasReleaseFn = typeof this._releaseFn === "function";
        this._disposeFn = opts.dispose;
        this._hasDisposeFn = typeof this._disposeFn === "function";
      }
      Pool2.prototype.max = function(n2) {
        if (typeof n2 === "number") {
          this._max = n2;
          return this;
        }
        return this._max;
      };
      Pool2.prototype.size = function() {
        return this._list.length;
      };
      Pool2.prototype.allocate = function() {
        var item;
        if (this._list.length > 0) {
          item = this._list.shift();
        } else {
          this._createCount++;
          if (this._hasCreateFn) {
            item = this._createFn();
          } else {
            item = {};
          }
        }
        this._allocateCount++;
        if (this._hasAllocateFn) {
          this._allocateFn(item);
        }
        return item;
      };
      Pool2.prototype.release = function(item) {
        if (this._list.length < this._max) {
          this._releaseCount++;
          if (this._hasReleaseFn) {
            this._releaseFn(item);
          }
          this._list.push(item);
        } else {
          this._disposeCount++;
          if (this._hasDisposeFn) {
            item = this._disposeFn(item);
          }
        }
      };
      Pool2.prototype.toString = function() {
        return " +" + this._createCount + " >" + this._allocateCount + " <" + this._releaseCount + " -" + this._disposeCount + " =" + this._list.length + "/" + this._max;
      };
      return Pool2;
    })()
  );
  var math_abs$8 = Math.abs;
  var math_max$6 = Math.max;
  var TreeNode = (
    /** @class */
    (function() {
      function TreeNode2(id) {
        this.aabb = new AABB();
        this.userData = null;
        this.parent = null;
        this.child1 = null;
        this.child2 = null;
        this.height = -1;
        this.id = id;
      }
      TreeNode2.prototype.toString = function() {
        return this.id + ": " + this.userData;
      };
      TreeNode2.prototype.isLeaf = function() {
        return this.child1 == null;
      };
      return TreeNode2;
    })()
  );
  var poolTreeNode = new Pool({
    create: function() {
      return new TreeNode();
    },
    release: function(node) {
      node.userData = null;
      node.parent = null;
      node.child1 = null;
      node.child2 = null;
      node.height = -1;
      node.id = void 0;
    }
  });
  var DynamicTree = (
    /** @class */
    (function() {
      function DynamicTree2() {
        this.inputPool = new Pool({
          create: function() {
            return {};
          },
          release: function(stack) {
          }
        });
        this.stackPool = new Pool({
          create: function() {
            return [];
          },
          release: function(stack) {
            stack.length = 0;
          }
        });
        this.iteratorPool = new Pool({
          create: function() {
            return new Iterator();
          },
          release: function(iterator) {
            iterator.close();
          }
        });
        this.m_root = null;
        this.m_nodes = {};
        this.m_lastProxyId = 0;
      }
      DynamicTree2.prototype.getUserData = function(id) {
        var node = this.m_nodes[id];
        return node.userData;
      };
      DynamicTree2.prototype.getFatAABB = function(id) {
        var node = this.m_nodes[id];
        return node.aabb;
      };
      DynamicTree2.prototype.allocateNode = function() {
        var node = poolTreeNode.allocate();
        node.id = ++this.m_lastProxyId;
        this.m_nodes[node.id] = node;
        return node;
      };
      DynamicTree2.prototype.freeNode = function(node) {
        delete this.m_nodes[node.id];
        poolTreeNode.release(node);
      };
      DynamicTree2.prototype.createProxy = function(aabb, userData) {
        var node = this.allocateNode();
        node.aabb.set(aabb);
        AABB.extend(node.aabb, SettingsInternal.aabbExtension);
        node.userData = userData;
        node.height = 0;
        this.insertLeaf(node);
        return node.id;
      };
      DynamicTree2.prototype.destroyProxy = function(id) {
        var node = this.m_nodes[id];
        this.removeLeaf(node);
        this.freeNode(node);
      };
      DynamicTree2.prototype.moveProxy = function(id, aabb, d2) {
        var node = this.m_nodes[id];
        if (node.aabb.contains(aabb)) {
          return false;
        }
        this.removeLeaf(node);
        node.aabb.set(aabb);
        aabb = node.aabb;
        AABB.extend(aabb, SettingsInternal.aabbExtension);
        if (d2.x < 0) {
          aabb.lowerBound.x += d2.x * SettingsInternal.aabbMultiplier;
        } else {
          aabb.upperBound.x += d2.x * SettingsInternal.aabbMultiplier;
        }
        if (d2.y < 0) {
          aabb.lowerBound.y += d2.y * SettingsInternal.aabbMultiplier;
        } else {
          aabb.upperBound.y += d2.y * SettingsInternal.aabbMultiplier;
        }
        this.insertLeaf(node);
        return true;
      };
      DynamicTree2.prototype.insertLeaf = function(leaf) {
        if (this.m_root == null) {
          this.m_root = leaf;
          this.m_root.parent = null;
          return;
        }
        var leafAABB = leaf.aabb;
        var index = this.m_root;
        while (!index.isLeaf()) {
          var child1 = index.child1;
          var child2 = index.child2;
          var area = index.aabb.getPerimeter();
          var combinedArea = AABB.combinedPerimeter(index.aabb, leafAABB);
          var cost = 2 * combinedArea;
          var inheritanceCost = 2 * (combinedArea - area);
          var newArea1 = AABB.combinedPerimeter(leafAABB, child1.aabb);
          var cost1 = newArea1 + inheritanceCost;
          if (!child1.isLeaf()) {
            var oldArea = child1.aabb.getPerimeter();
            cost1 -= oldArea;
          }
          var newArea2 = AABB.combinedPerimeter(leafAABB, child2.aabb);
          var cost2 = newArea2 + inheritanceCost;
          if (!child2.isLeaf()) {
            var oldArea = child2.aabb.getPerimeter();
            cost2 -= oldArea;
          }
          if (cost < cost1 && cost < cost2) {
            break;
          }
          if (cost1 < cost2) {
            index = child1;
          } else {
            index = child2;
          }
        }
        var sibling = index;
        var oldParent = sibling.parent;
        var newParent = this.allocateNode();
        newParent.parent = oldParent;
        newParent.userData = null;
        newParent.aabb.combine(leafAABB, sibling.aabb);
        newParent.height = sibling.height + 1;
        if (oldParent != null) {
          if (oldParent.child1 === sibling) {
            oldParent.child1 = newParent;
          } else {
            oldParent.child2 = newParent;
          }
          newParent.child1 = sibling;
          newParent.child2 = leaf;
          sibling.parent = newParent;
          leaf.parent = newParent;
        } else {
          newParent.child1 = sibling;
          newParent.child2 = leaf;
          sibling.parent = newParent;
          leaf.parent = newParent;
          this.m_root = newParent;
        }
        index = leaf.parent;
        while (index != null) {
          index = this.balance(index);
          var child1 = index.child1;
          var child2 = index.child2;
          index.height = 1 + math_max$6(child1.height, child2.height);
          index.aabb.combine(child1.aabb, child2.aabb);
          index = index.parent;
        }
      };
      DynamicTree2.prototype.removeLeaf = function(leaf) {
        if (leaf === this.m_root) {
          this.m_root = null;
          return;
        }
        var parent = leaf.parent;
        var grandParent = parent.parent;
        var sibling;
        if (parent.child1 === leaf) {
          sibling = parent.child2;
        } else {
          sibling = parent.child1;
        }
        if (grandParent != null) {
          if (grandParent.child1 === parent) {
            grandParent.child1 = sibling;
          } else {
            grandParent.child2 = sibling;
          }
          sibling.parent = grandParent;
          this.freeNode(parent);
          var index = grandParent;
          while (index != null) {
            index = this.balance(index);
            var child1 = index.child1;
            var child2 = index.child2;
            index.aabb.combine(child1.aabb, child2.aabb);
            index.height = 1 + math_max$6(child1.height, child2.height);
            index = index.parent;
          }
        } else {
          this.m_root = sibling;
          sibling.parent = null;
          this.freeNode(parent);
        }
      };
      DynamicTree2.prototype.balance = function(iA) {
        var A = iA;
        if (A.isLeaf() || A.height < 2) {
          return iA;
        }
        var B = A.child1;
        var C = A.child2;
        var balance = C.height - B.height;
        if (balance > 1) {
          var F = C.child1;
          var G = C.child2;
          C.child1 = A;
          C.parent = A.parent;
          A.parent = C;
          if (C.parent != null) {
            if (C.parent.child1 === iA) {
              C.parent.child1 = C;
            } else {
              C.parent.child2 = C;
            }
          } else {
            this.m_root = C;
          }
          if (F.height > G.height) {
            C.child2 = F;
            A.child2 = G;
            G.parent = A;
            A.aabb.combine(B.aabb, G.aabb);
            C.aabb.combine(A.aabb, F.aabb);
            A.height = 1 + math_max$6(B.height, G.height);
            C.height = 1 + math_max$6(A.height, F.height);
          } else {
            C.child2 = G;
            A.child2 = F;
            F.parent = A;
            A.aabb.combine(B.aabb, F.aabb);
            C.aabb.combine(A.aabb, G.aabb);
            A.height = 1 + math_max$6(B.height, F.height);
            C.height = 1 + math_max$6(A.height, G.height);
          }
          return C;
        }
        if (balance < -1) {
          var D = B.child1;
          var E2 = B.child2;
          B.child1 = A;
          B.parent = A.parent;
          A.parent = B;
          if (B.parent != null) {
            if (B.parent.child1 === A) {
              B.parent.child1 = B;
            } else {
              B.parent.child2 = B;
            }
          } else {
            this.m_root = B;
          }
          if (D.height > E2.height) {
            B.child2 = D;
            A.child1 = E2;
            E2.parent = A;
            A.aabb.combine(C.aabb, E2.aabb);
            B.aabb.combine(A.aabb, D.aabb);
            A.height = 1 + math_max$6(C.height, E2.height);
            B.height = 1 + math_max$6(A.height, D.height);
          } else {
            B.child2 = E2;
            A.child1 = D;
            D.parent = A;
            A.aabb.combine(C.aabb, D.aabb);
            B.aabb.combine(A.aabb, E2.aabb);
            A.height = 1 + math_max$6(C.height, D.height);
            B.height = 1 + math_max$6(A.height, E2.height);
          }
          return B;
        }
        return A;
      };
      DynamicTree2.prototype.getHeight = function() {
        if (this.m_root == null) {
          return 0;
        }
        return this.m_root.height;
      };
      DynamicTree2.prototype.getAreaRatio = function() {
        if (this.m_root == null) {
          return 0;
        }
        var root = this.m_root;
        var rootArea = root.aabb.getPerimeter();
        var totalArea = 0;
        var node;
        var it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
          if (node.height < 0) {
            continue;
          }
          totalArea += node.aabb.getPerimeter();
        }
        this.iteratorPool.release(it);
        return totalArea / rootArea;
      };
      DynamicTree2.prototype.computeHeight = function(id) {
        var node;
        if (typeof id !== "undefined") {
          node = this.m_nodes[id];
        } else {
          node = this.m_root;
        }
        if (node.isLeaf()) {
          return 0;
        }
        var height1 = this.computeHeight(node.child1.id);
        var height2 = this.computeHeight(node.child2.id);
        return 1 + math_max$6(height1, height2);
      };
      DynamicTree2.prototype.validateStructure = function(node) {
        if (node == null) {
          return;
        }
        if (node === this.m_root) ;
        var child1 = node.child1;
        var child2 = node.child2;
        if (node.isLeaf()) {
          return;
        }
        this.validateStructure(child1);
        this.validateStructure(child2);
      };
      DynamicTree2.prototype.validateMetrics = function(node) {
        if (node == null) {
          return;
        }
        var child1 = node.child1;
        var child2 = node.child2;
        if (node.isLeaf()) {
          return;
        }
        this.validateMetrics(child1);
        this.validateMetrics(child2);
      };
      DynamicTree2.prototype.validate = function() {
        return;
      };
      DynamicTree2.prototype.getMaxBalance = function() {
        var maxBalance = 0;
        var node;
        var it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
          if (node.height <= 1) {
            continue;
          }
          var balance = math_abs$8(node.child2.height - node.child1.height);
          maxBalance = math_max$6(maxBalance, balance);
        }
        this.iteratorPool.release(it);
        return maxBalance;
      };
      DynamicTree2.prototype.rebuildBottomUp = function() {
        var nodes = [];
        var count = 0;
        var node;
        var it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
          if (node.height < 0) {
            continue;
          }
          if (node.isLeaf()) {
            node.parent = null;
            nodes[count] = node;
            ++count;
          } else {
            this.freeNode(node);
          }
        }
        this.iteratorPool.release(it);
        while (count > 1) {
          var minCost = Infinity;
          var iMin = -1;
          var jMin = -1;
          for (var i2 = 0; i2 < count; ++i2) {
            var aabbi = nodes[i2].aabb;
            for (var j2 = i2 + 1; j2 < count; ++j2) {
              var aabbj = nodes[j2].aabb;
              var cost = AABB.combinedPerimeter(aabbi, aabbj);
              if (cost < minCost) {
                iMin = i2;
                jMin = j2;
                minCost = cost;
              }
            }
          }
          var child1 = nodes[iMin];
          var child2 = nodes[jMin];
          var parent_1 = this.allocateNode();
          parent_1.child1 = child1;
          parent_1.child2 = child2;
          parent_1.height = 1 + math_max$6(child1.height, child2.height);
          parent_1.aabb.combine(child1.aabb, child2.aabb);
          parent_1.parent = null;
          child1.parent = parent_1;
          child2.parent = parent_1;
          nodes[jMin] = nodes[count - 1];
          nodes[iMin] = parent_1;
          --count;
        }
        this.m_root = nodes[0];
      };
      DynamicTree2.prototype.shiftOrigin = function(newOrigin) {
        var node;
        var it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
          var aabb = node.aabb;
          aabb.lowerBound.x -= newOrigin.x;
          aabb.lowerBound.y -= newOrigin.y;
          aabb.upperBound.x -= newOrigin.x;
          aabb.upperBound.y -= newOrigin.y;
        }
        this.iteratorPool.release(it);
      };
      DynamicTree2.prototype.query = function(aabb, queryCallback) {
        var stack = this.stackPool.allocate();
        stack.push(this.m_root);
        while (stack.length > 0) {
          var node = stack.pop();
          if (node == null) {
            continue;
          }
          if (AABB.testOverlap(node.aabb, aabb)) {
            if (node.isLeaf()) {
              var proceed = queryCallback(node.id);
              if (proceed === false) {
                return;
              }
            } else {
              stack.push(node.child1);
              stack.push(node.child2);
            }
          }
        }
        this.stackPool.release(stack);
      };
      DynamicTree2.prototype.rayCast = function(input2, rayCastCallback) {
        var p1 = input2.p1;
        var p2 = input2.p2;
        var r2 = Vec2.sub(p2, p1);
        r2.normalize();
        var v3 = Vec2.crossNumVec2(1, r2);
        var abs_v = Vec2.abs(v3);
        var maxFraction = input2.maxFraction;
        var segmentAABB = new AABB();
        var t2 = Vec2.combine(1 - maxFraction, p1, maxFraction, p2);
        segmentAABB.combinePoints(p1, t2);
        var stack = this.stackPool.allocate();
        var subInput = this.inputPool.allocate();
        stack.push(this.m_root);
        while (stack.length > 0) {
          var node = stack.pop();
          if (node == null) {
            continue;
          }
          if (AABB.testOverlap(node.aabb, segmentAABB) === false) {
            continue;
          }
          var c2 = node.aabb.getCenter();
          var h2 = node.aabb.getExtents();
          var separation = math_abs$8(Vec2.dot(v3, Vec2.sub(p1, c2))) - Vec2.dot(abs_v, h2);
          if (separation > 0) {
            continue;
          }
          if (node.isLeaf()) {
            subInput.p1 = Vec2.clone(input2.p1);
            subInput.p2 = Vec2.clone(input2.p2);
            subInput.maxFraction = maxFraction;
            var value = rayCastCallback(subInput, node.id);
            if (value === 0) {
              break;
            } else if (value > 0) {
              maxFraction = value;
              t2 = Vec2.combine(1 - maxFraction, p1, maxFraction, p2);
              segmentAABB.combinePoints(p1, t2);
            }
          } else {
            stack.push(node.child1);
            stack.push(node.child2);
          }
        }
        this.stackPool.release(stack);
        this.inputPool.release(subInput);
      };
      return DynamicTree2;
    })()
  );
  var Iterator = (
    /** @class */
    (function() {
      function Iterator2() {
        this.parents = [];
        this.states = [];
      }
      Iterator2.prototype.preorder = function(root) {
        this.parents.length = 0;
        this.parents.push(root);
        this.states.length = 0;
        this.states.push(0);
        return this;
      };
      Iterator2.prototype.next = function() {
        while (this.parents.length > 0) {
          var i2 = this.parents.length - 1;
          var node = this.parents[i2];
          if (this.states[i2] === 0) {
            this.states[i2] = 1;
            return node;
          }
          if (this.states[i2] === 1) {
            this.states[i2] = 2;
            if (node.child1) {
              this.parents.push(node.child1);
              this.states.push(1);
              return node.child1;
            }
          }
          if (this.states[i2] === 2) {
            this.states[i2] = 3;
            if (node.child2) {
              this.parents.push(node.child2);
              this.states.push(1);
              return node.child2;
            }
          }
          this.parents.pop();
          this.states.pop();
        }
      };
      Iterator2.prototype.close = function() {
        this.parents.length = 0;
      };
      return Iterator2;
    })()
  );
  var math_max$5 = Math.max;
  var math_min$6 = Math.min;
  var BroadPhase = (
    /** @class */
    (function() {
      function BroadPhase2() {
        var _this = this;
        this.m_tree = new DynamicTree();
        this.m_moveBuffer = [];
        this.query = function(aabb, queryCallback) {
          _this.m_tree.query(aabb, queryCallback);
        };
        this.queryCallback = function(proxyId) {
          if (proxyId === _this.m_queryProxyId) {
            return true;
          }
          var proxyIdA = math_min$6(proxyId, _this.m_queryProxyId);
          var proxyIdB = math_max$5(proxyId, _this.m_queryProxyId);
          var userDataA = _this.m_tree.getUserData(proxyIdA);
          var userDataB = _this.m_tree.getUserData(proxyIdB);
          _this.m_callback(userDataA, userDataB);
          return true;
        };
      }
      BroadPhase2.prototype.getUserData = function(proxyId) {
        return this.m_tree.getUserData(proxyId);
      };
      BroadPhase2.prototype.testOverlap = function(proxyIdA, proxyIdB) {
        var aabbA = this.m_tree.getFatAABB(proxyIdA);
        var aabbB = this.m_tree.getFatAABB(proxyIdB);
        return AABB.testOverlap(aabbA, aabbB);
      };
      BroadPhase2.prototype.getFatAABB = function(proxyId) {
        return this.m_tree.getFatAABB(proxyId);
      };
      BroadPhase2.prototype.getProxyCount = function() {
        return this.m_moveBuffer.length;
      };
      BroadPhase2.prototype.getTreeHeight = function() {
        return this.m_tree.getHeight();
      };
      BroadPhase2.prototype.getTreeBalance = function() {
        return this.m_tree.getMaxBalance();
      };
      BroadPhase2.prototype.getTreeQuality = function() {
        return this.m_tree.getAreaRatio();
      };
      BroadPhase2.prototype.rayCast = function(input2, rayCastCallback) {
        this.m_tree.rayCast(input2, rayCastCallback);
      };
      BroadPhase2.prototype.shiftOrigin = function(newOrigin) {
        this.m_tree.shiftOrigin(newOrigin);
      };
      BroadPhase2.prototype.createProxy = function(aabb, userData) {
        var proxyId = this.m_tree.createProxy(aabb, userData);
        this.bufferMove(proxyId);
        return proxyId;
      };
      BroadPhase2.prototype.destroyProxy = function(proxyId) {
        this.unbufferMove(proxyId);
        this.m_tree.destroyProxy(proxyId);
      };
      BroadPhase2.prototype.moveProxy = function(proxyId, aabb, displacement2) {
        var changed = this.m_tree.moveProxy(proxyId, aabb, displacement2);
        if (changed) {
          this.bufferMove(proxyId);
        }
      };
      BroadPhase2.prototype.touchProxy = function(proxyId) {
        this.bufferMove(proxyId);
      };
      BroadPhase2.prototype.bufferMove = function(proxyId) {
        this.m_moveBuffer.push(proxyId);
      };
      BroadPhase2.prototype.unbufferMove = function(proxyId) {
        for (var i2 = 0; i2 < this.m_moveBuffer.length; ++i2) {
          if (this.m_moveBuffer[i2] === proxyId) {
            this.m_moveBuffer[i2] = null;
          }
        }
      };
      BroadPhase2.prototype.updatePairs = function(addPairCallback) {
        this.m_callback = addPairCallback;
        while (this.m_moveBuffer.length > 0) {
          this.m_queryProxyId = this.m_moveBuffer.pop();
          if (this.m_queryProxyId === null) {
            continue;
          }
          var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
          this.m_tree.query(fatAABB, this.queryCallback);
        }
      };
      return BroadPhase2;
    })()
  );
  var math_sin$2 = Math.sin;
  var math_cos$2 = Math.cos;
  var math_sqrt$4 = Math.sqrt;
  function vec2(x2, y2) {
    return { x: x2, y: y2 };
  }
  function rotation(angle) {
    return { s: math_sin$2(angle), c: math_cos$2(angle) };
  }
  function setVec2(out, x2, y2) {
    out.x = x2;
    out.y = y2;
    return out;
  }
  function copyVec2(out, w2) {
    out.x = w2.x;
    out.y = w2.y;
    return out;
  }
  function zeroVec2(out) {
    out.x = 0;
    out.y = 0;
    return out;
  }
  function negVec2(out) {
    out.x = -out.x;
    out.y = -out.y;
    return out;
  }
  function plusVec2(out, w2) {
    out.x += w2.x;
    out.y += w2.y;
    return out;
  }
  function addVec2(out, v3, w2) {
    out.x = v3.x + w2.x;
    out.y = v3.y + w2.y;
    return out;
  }
  function minusVec2(out, w2) {
    out.x -= w2.x;
    out.y -= w2.y;
    return out;
  }
  function subVec2(out, v3, w2) {
    out.x = v3.x - w2.x;
    out.y = v3.y - w2.y;
    return out;
  }
  function mulVec2(out, m2) {
    out.x *= m2;
    out.y *= m2;
    return out;
  }
  function scaleVec2(out, m2, w2) {
    out.x = m2 * w2.x;
    out.y = m2 * w2.y;
    return out;
  }
  function plusScaleVec2(out, m2, w2) {
    out.x += m2 * w2.x;
    out.y += m2 * w2.y;
    return out;
  }
  function minusScaleVec2(out, m2, w2) {
    out.x -= m2 * w2.x;
    out.y -= m2 * w2.y;
    return out;
  }
  function combine2Vec2(out, am, a2, bm, b2) {
    out.x = am * a2.x + bm * b2.x;
    out.y = am * a2.y + bm * b2.y;
    return out;
  }
  function combine3Vec2(out, am, a2, bm, b2, cm, c2) {
    out.x = am * a2.x + bm * b2.x + cm * c2.x;
    out.y = am * a2.y + bm * b2.y + cm * c2.y;
    return out;
  }
  function normalizeVec2Length(out) {
    var length = math_sqrt$4(out.x * out.x + out.y * out.y);
    if (length !== 0) {
      var invLength = 1 / length;
      out.x *= invLength;
      out.y *= invLength;
    }
    return length;
  }
  function normalizeVec2(out) {
    var length = math_sqrt$4(out.x * out.x + out.y * out.y);
    if (length > 0) {
      var invLength = 1 / length;
      out.x *= invLength;
      out.y *= invLength;
    }
    return out;
  }
  function crossVec2Num(out, v3, w2) {
    var x2 = w2 * v3.y;
    var y2 = -w2 * v3.x;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function crossNumVec2(out, w2, v3) {
    var x2 = -w2 * v3.y;
    var y2 = w2 * v3.x;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function crossVec2Vec2(a2, b2) {
    return a2.x * b2.y - a2.y * b2.x;
  }
  function dotVec2(a2, b2) {
    return a2.x * b2.x + a2.y * b2.y;
  }
  function lengthSqrVec2(a2) {
    return a2.x * a2.x + a2.y * a2.y;
  }
  function distVec2(a2, b2) {
    var dx = a2.x - b2.x;
    var dy = a2.y - b2.y;
    return math_sqrt$4(dx * dx + dy * dy);
  }
  function distSqrVec2(a2, b2) {
    var dx = a2.x - b2.x;
    var dy = a2.y - b2.y;
    return dx * dx + dy * dy;
  }
  function setRotAngle(out, a2) {
    out.c = math_cos$2(a2);
    out.s = math_sin$2(a2);
    return out;
  }
  function rotVec2(out, q, v3) {
    out.x = q.c * v3.x - q.s * v3.y;
    out.y = q.s * v3.x + q.c * v3.y;
    return out;
  }
  function derotVec2(out, q, v3) {
    var x2 = q.c * v3.x + q.s * v3.y;
    var y2 = -q.s * v3.x + q.c * v3.y;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function rerotVec2(out, before, after, v3) {
    var x0 = before.c * v3.x + before.s * v3.y;
    var y0 = -before.s * v3.x + before.c * v3.y;
    var x2 = after.c * x0 - after.s * y0;
    var y2 = after.s * x0 + after.c * y0;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function transform(x2, y2, a2) {
    return { p: vec2(x2, y2), q: rotation(a2) };
  }
  function copyTransform(out, transform2) {
    out.p.x = transform2.p.x;
    out.p.y = transform2.p.y;
    out.q.s = transform2.q.s;
    out.q.c = transform2.q.c;
    return out;
  }
  function transformVec2$1(out, xf2, v3) {
    var x2 = xf2.q.c * v3.x - xf2.q.s * v3.y + xf2.p.x;
    var y2 = xf2.q.s * v3.x + xf2.q.c * v3.y + xf2.p.y;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function detransformVec2(out, xf2, v3) {
    var px = v3.x - xf2.p.x;
    var py = v3.y - xf2.p.y;
    var x2 = xf2.q.c * px + xf2.q.s * py;
    var y2 = -xf2.q.s * px + xf2.q.c * py;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function retransformVec2(out, from, to, v3) {
    var x0 = from.q.c * v3.x - from.q.s * v3.y + from.p.x;
    var y0 = from.q.s * v3.x + from.q.c * v3.y + from.p.y;
    var px = x0 - to.p.x;
    var py = y0 - to.p.y;
    var x2 = to.q.c * px + to.q.s * py;
    var y2 = -to.q.s * px + to.q.c * py;
    out.x = x2;
    out.y = y2;
    return out;
  }
  function detransformTransform(out, a2, b2) {
    var c2 = a2.q.c * b2.q.c + a2.q.s * b2.q.s;
    var s2 = a2.q.c * b2.q.s - a2.q.s * b2.q.c;
    var x2 = a2.q.c * (b2.p.x - a2.p.x) + a2.q.s * (b2.p.y - a2.p.y);
    var y2 = -a2.q.s * (b2.p.x - a2.p.x) + a2.q.c * (b2.p.y - a2.p.y);
    out.q.c = c2;
    out.q.s = s2;
    out.p.x = x2;
    out.p.y = y2;
    return out;
  }
  var math_sin$1 = Math.sin;
  var math_cos$1 = Math.cos;
  var math_atan2$1 = Math.atan2;
  var Rot = (
    /** @class */
    (function() {
      function Rot2(angle) {
        if (!(this instanceof Rot2)) {
          return new Rot2(angle);
        }
        if (typeof angle === "number") {
          this.setAngle(angle);
        } else if (typeof angle === "object") {
          this.setRot(angle);
        } else {
          this.setIdentity();
        }
      }
      Rot2.neo = function(angle) {
        var obj = Object.create(Rot2.prototype);
        obj.setAngle(angle);
        return obj;
      };
      Rot2.clone = function(rot) {
        var obj = Object.create(Rot2.prototype);
        obj.s = rot.s;
        obj.c = rot.c;
        return obj;
      };
      Rot2.identity = function() {
        var obj = Object.create(Rot2.prototype);
        obj.s = 0;
        obj.c = 1;
        return obj;
      };
      Rot2.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Number.isFinite(obj.s) && Number.isFinite(obj.c);
      };
      Rot2.assert = function(o2) {
      };
      Rot2.prototype.setIdentity = function() {
        this.s = 0;
        this.c = 1;
      };
      Rot2.prototype.set = function(angle) {
        if (typeof angle === "object") {
          this.s = angle.s;
          this.c = angle.c;
        } else {
          this.s = math_sin$1(angle);
          this.c = math_cos$1(angle);
        }
      };
      Rot2.prototype.setRot = function(angle) {
        this.s = angle.s;
        this.c = angle.c;
      };
      Rot2.prototype.setAngle = function(angle) {
        this.s = math_sin$1(angle);
        this.c = math_cos$1(angle);
      };
      Rot2.prototype.getAngle = function() {
        return math_atan2$1(this.s, this.c);
      };
      Rot2.prototype.getXAxis = function() {
        return Vec2.neo(this.c, this.s);
      };
      Rot2.prototype.getYAxis = function() {
        return Vec2.neo(-this.s, this.c);
      };
      Rot2.mul = function(rot, m2) {
        if ("c" in m2 && "s" in m2) {
          var qr = Rot2.identity();
          qr.s = rot.s * m2.c + rot.c * m2.s;
          qr.c = rot.c * m2.c - rot.s * m2.s;
          return qr;
        } else if ("x" in m2 && "y" in m2) {
          return Vec2.neo(rot.c * m2.x - rot.s * m2.y, rot.s * m2.x + rot.c * m2.y);
        }
      };
      Rot2.mulRot = function(rot, m2) {
        var qr = Rot2.identity();
        qr.s = rot.s * m2.c + rot.c * m2.s;
        qr.c = rot.c * m2.c - rot.s * m2.s;
        return qr;
      };
      Rot2.mulVec2 = function(rot, m2) {
        return Vec2.neo(rot.c * m2.x - rot.s * m2.y, rot.s * m2.x + rot.c * m2.y);
      };
      Rot2.mulSub = function(rot, v3, w2) {
        var x2 = rot.c * (v3.x - w2.x) - rot.s * (v3.y - w2.y);
        var y2 = rot.s * (v3.x - w2.x) + rot.c * (v3.y - w2.y);
        return Vec2.neo(x2, y2);
      };
      Rot2.mulT = function(rot, m2) {
        if ("c" in m2 && "s" in m2) {
          var qr = Rot2.identity();
          qr.s = rot.c * m2.s - rot.s * m2.c;
          qr.c = rot.c * m2.c + rot.s * m2.s;
          return qr;
        } else if ("x" in m2 && "y" in m2) {
          return Vec2.neo(rot.c * m2.x + rot.s * m2.y, -rot.s * m2.x + rot.c * m2.y);
        }
      };
      Rot2.mulTRot = function(rot, m2) {
        var qr = Rot2.identity();
        qr.s = rot.c * m2.s - rot.s * m2.c;
        qr.c = rot.c * m2.c + rot.s * m2.s;
        return qr;
      };
      Rot2.mulTVec2 = function(rot, m2) {
        return Vec2.neo(rot.c * m2.x + rot.s * m2.y, -rot.s * m2.x + rot.c * m2.y);
      };
      return Rot2;
    })()
  );
  var math_atan2 = Math.atan2;
  var math_PI$5 = Math.PI;
  var temp$7 = vec2(0, 0);
  var Sweep = (
    /** @class */
    (function() {
      function Sweep2() {
        this.localCenter = Vec2.zero();
        this.c = Vec2.zero();
        this.a = 0;
        this.alpha0 = 0;
        this.c0 = Vec2.zero();
        this.a0 = 0;
      }
      Sweep2.prototype.recycle = function() {
        zeroVec2(this.localCenter);
        zeroVec2(this.c);
        this.a = 0;
        this.alpha0 = 0;
        zeroVec2(this.c0);
        this.a0 = 0;
      };
      Sweep2.prototype.setTransform = function(xf2) {
        transformVec2$1(temp$7, xf2, this.localCenter);
        copyVec2(this.c, temp$7);
        copyVec2(this.c0, temp$7);
        this.a = this.a0 = math_atan2(xf2.q.s, xf2.q.c);
      };
      Sweep2.prototype.setLocalCenter = function(localCenter2, xf2) {
        copyVec2(this.localCenter, localCenter2);
        transformVec2$1(temp$7, xf2, this.localCenter);
        copyVec2(this.c, temp$7);
        copyVec2(this.c0, temp$7);
      };
      Sweep2.prototype.getTransform = function(xf2, beta) {
        if (beta === void 0) {
          beta = 0;
        }
        setRotAngle(xf2.q, (1 - beta) * this.a0 + beta * this.a);
        combine2Vec2(xf2.p, 1 - beta, this.c0, beta, this.c);
        minusVec2(xf2.p, rotVec2(temp$7, xf2.q, this.localCenter));
      };
      Sweep2.prototype.advance = function(alpha) {
        var beta = (alpha - this.alpha0) / (1 - this.alpha0);
        combine2Vec2(this.c0, beta, this.c, 1 - beta, this.c0);
        this.a0 = beta * this.a + (1 - beta) * this.a0;
        this.alpha0 = alpha;
      };
      Sweep2.prototype.forward = function() {
        this.a0 = this.a;
        copyVec2(this.c0, this.c);
      };
      Sweep2.prototype.normalize = function() {
        var a0 = mod(this.a0, -math_PI$5, +math_PI$5);
        this.a -= this.a0 - a0;
        this.a0 = a0;
      };
      Sweep2.prototype.isValid = function() {
        return Number.isFinite(this.localCenter.x) && Number.isFinite(this.localCenter.y) && Number.isFinite(this.c0.x) && Number.isFinite(this.c0.y) && Number.isFinite(this.c.x) && Number.isFinite(this.c.y) && Number.isFinite(this.a0) && Number.isFinite(this.a) && Number.isFinite(this.alpha0);
      };
      Sweep2.prototype.set = function(that) {
        copyVec2(this.localCenter, that.localCenter);
        copyVec2(this.c, that.c);
        this.a = that.a;
        this.alpha0 = that.alpha0;
        copyVec2(this.c0, that.c0);
        this.a0 = that.a0;
      };
      return Sweep2;
    })()
  );
  var Transform = (
    /** @class */
    (function() {
      function Transform2(position, rotation2) {
        if (!(this instanceof Transform2)) {
          return new Transform2(position, rotation2);
        }
        this.p = Vec2.zero();
        this.q = Rot.identity();
        if (typeof position !== "undefined") {
          this.p.setVec2(position);
        }
        if (typeof rotation2 !== "undefined") {
          this.q.setAngle(rotation2);
        }
      }
      Transform2.clone = function(xf2) {
        var obj = Object.create(Transform2.prototype);
        obj.p = Vec2.clone(xf2.p);
        obj.q = Rot.clone(xf2.q);
        return obj;
      };
      Transform2.neo = function(position, rotation2) {
        var obj = Object.create(Transform2.prototype);
        obj.p = Vec2.clone(position);
        obj.q = Rot.clone(rotation2);
        return obj;
      };
      Transform2.identity = function() {
        var obj = Object.create(Transform2.prototype);
        obj.p = Vec2.zero();
        obj.q = Rot.identity();
        return obj;
      };
      Transform2.prototype.setIdentity = function() {
        this.p.setZero();
        this.q.setIdentity();
      };
      Transform2.prototype.set = function(a2, b2) {
        if (typeof b2 === "undefined") {
          this.p.set(a2.p);
          this.q.set(a2.q);
        } else {
          this.p.set(a2);
          this.q.set(b2);
        }
      };
      Transform2.prototype.setNum = function(position, rotation2) {
        this.p.setVec2(position);
        this.q.setAngle(rotation2);
      };
      Transform2.prototype.setTransform = function(xf2) {
        this.p.setVec2(xf2.p);
        this.q.setRot(xf2.q);
      };
      Transform2.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
      };
      Transform2.assert = function(o2) {
      };
      Transform2.mul = function(a2, b2) {
        if (Array.isArray(b2)) {
          var arr = [];
          for (var i2 = 0; i2 < b2.length; i2++) {
            arr[i2] = Transform2.mul(a2, b2[i2]);
          }
          return arr;
        } else if ("x" in b2 && "y" in b2) {
          return Transform2.mulVec2(a2, b2);
        } else if ("p" in b2 && "q" in b2) {
          return Transform2.mulXf(a2, b2);
        }
      };
      Transform2.mulAll = function(a2, b2) {
        var arr = [];
        for (var i2 = 0; i2 < b2.length; i2++) {
          arr[i2] = Transform2.mul(a2, b2[i2]);
        }
        return arr;
      };
      Transform2.mulFn = function(a2) {
        return function(b2) {
          return Transform2.mul(a2, b2);
        };
      };
      Transform2.mulVec2 = function(a2, b2) {
        var x2 = a2.q.c * b2.x - a2.q.s * b2.y + a2.p.x;
        var y2 = a2.q.s * b2.x + a2.q.c * b2.y + a2.p.y;
        return Vec2.neo(x2, y2);
      };
      Transform2.mulXf = function(a2, b2) {
        var xf2 = Transform2.identity();
        xf2.q = Rot.mulRot(a2.q, b2.q);
        xf2.p = Vec2.add(Rot.mulVec2(a2.q, b2.p), a2.p);
        return xf2;
      };
      Transform2.mulT = function(a2, b2) {
        if ("x" in b2 && "y" in b2) {
          return Transform2.mulTVec2(a2, b2);
        } else if ("p" in b2 && "q" in b2) {
          return Transform2.mulTXf(a2, b2);
        }
      };
      Transform2.mulTVec2 = function(a2, b2) {
        var px = b2.x - a2.p.x;
        var py = b2.y - a2.p.y;
        var x2 = a2.q.c * px + a2.q.s * py;
        var y2 = -a2.q.s * px + a2.q.c * py;
        return Vec2.neo(x2, y2);
      };
      Transform2.mulTXf = function(a2, b2) {
        var xf2 = Transform2.identity();
        xf2.q.setRot(Rot.mulTRot(a2.q, b2.q));
        xf2.p.setVec2(Rot.mulTVec2(a2.q, Vec2.sub(b2.p, a2.p)));
        return xf2;
      };
      return Transform2;
    })()
  );
  var Velocity = (
    /** @class */
    /* @__PURE__ */ (function() {
      function Velocity2() {
        this.v = Vec2.zero();
        this.w = 0;
      }
      return Velocity2;
    })()
  );
  var math_sin = Math.sin;
  var math_cos = Math.cos;
  var Position = (
    /** @class */
    (function() {
      function Position2() {
        this.c = Vec2.zero();
        this.a = 0;
      }
      Position2.prototype.getTransform = function(xf2, p2) {
        xf2.q.c = math_cos(this.a);
        xf2.q.s = math_sin(this.a);
        xf2.p.x = this.c.x - (xf2.q.c * p2.x - xf2.q.s * p2.y);
        xf2.p.y = this.c.y - (xf2.q.s * p2.x + xf2.q.c * p2.y);
        return xf2;
      };
      return Position2;
    })()
  );
  function getTransform(xf2, p2, c2, a2) {
    xf2.q.c = math_cos(a2);
    xf2.q.s = math_sin(a2);
    xf2.p.x = c2.x - (xf2.q.c * p2.x - xf2.q.s * p2.y);
    xf2.p.y = c2.y - (xf2.q.s * p2.x + xf2.q.c * p2.y);
    return xf2;
  }
  var Shape = (
    /** @class */
    (function() {
      function Shape2() {
        this.style = {};
        this.appData = {};
      }
      Shape2.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return typeof obj.m_type === "string" && typeof obj.m_radius === "number";
      };
      return Shape2;
    })()
  );
  var synchronize_aabb1 = new AABB();
  var synchronize_aabb2 = new AABB();
  var displacement = vec2(0, 0);
  var FixtureDefDefault = {
    userData: null,
    friction: 0.2,
    restitution: 0,
    density: 0,
    isSensor: false,
    filterGroupIndex: 0,
    filterCategoryBits: 1,
    filterMaskBits: 65535
  };
  var FixtureProxy = (
    /** @class */
    /* @__PURE__ */ (function() {
      function FixtureProxy2(fixture, childIndex) {
        this.aabb = new AABB();
        this.fixture = fixture;
        this.childIndex = childIndex;
      }
      return FixtureProxy2;
    })()
  );
  var Fixture = (
    /** @class */
    (function() {
      function Fixture2(body, shape, def) {
        this.style = {};
        this.appData = {};
        if (shape.shape) {
          def = shape;
          shape = shape.shape;
        } else if (typeof def === "number") {
          def = { density: def };
        }
        def = options(def, FixtureDefDefault);
        this.m_body = body;
        this.m_friction = def.friction;
        this.m_restitution = def.restitution;
        this.m_density = def.density;
        this.m_isSensor = def.isSensor;
        this.m_filterGroupIndex = def.filterGroupIndex;
        this.m_filterCategoryBits = def.filterCategoryBits;
        this.m_filterMaskBits = def.filterMaskBits;
        this.m_shape = shape;
        this.m_next = null;
        this.m_proxies = [];
        this.m_proxyCount = 0;
        var childCount = this.m_shape.getChildCount();
        for (var i2 = 0; i2 < childCount; ++i2) {
          this.m_proxies[i2] = new FixtureProxy(this, i2);
        }
        this.m_userData = def.userData;
        if (typeof def.style === "object" && def.style !== null) {
          this.style = def.style;
        }
      }
      Fixture2.prototype._reset = function() {
        var body = this.getBody();
        var broadPhase = body.m_world.m_broadPhase;
        this.destroyProxies(broadPhase);
        if (this.m_shape._reset) {
          this.m_shape._reset();
        }
        var childCount = this.m_shape.getChildCount();
        for (var i2 = 0; i2 < childCount; ++i2) {
          this.m_proxies[i2] = new FixtureProxy(this, i2);
        }
        this.createProxies(broadPhase, body.m_xf);
        body.resetMassData();
      };
      Fixture2.prototype._serialize = function() {
        return {
          friction: this.m_friction,
          restitution: this.m_restitution,
          density: this.m_density,
          isSensor: this.m_isSensor,
          filterGroupIndex: this.m_filterGroupIndex,
          filterCategoryBits: this.m_filterCategoryBits,
          filterMaskBits: this.m_filterMaskBits,
          shape: this.m_shape
        };
      };
      Fixture2._deserialize = function(data, body, restore) {
        var shape = restore(Shape, data.shape);
        var fixture = shape && new Fixture2(body, shape, data);
        return fixture;
      };
      Fixture2.prototype.getType = function() {
        return this.m_shape.m_type;
      };
      Fixture2.prototype.getShape = function() {
        return this.m_shape;
      };
      Fixture2.prototype.isSensor = function() {
        return this.m_isSensor;
      };
      Fixture2.prototype.setSensor = function(sensor) {
        if (sensor != this.m_isSensor) {
          this.m_body.setAwake(true);
          this.m_isSensor = sensor;
        }
      };
      Fixture2.prototype.getUserData = function() {
        return this.m_userData;
      };
      Fixture2.prototype.setUserData = function(data) {
        this.m_userData = data;
      };
      Fixture2.prototype.getBody = function() {
        return this.m_body;
      };
      Fixture2.prototype.getNext = function() {
        return this.m_next;
      };
      Fixture2.prototype.getDensity = function() {
        return this.m_density;
      };
      Fixture2.prototype.setDensity = function(density) {
        this.m_density = density;
      };
      Fixture2.prototype.getFriction = function() {
        return this.m_friction;
      };
      Fixture2.prototype.setFriction = function(friction) {
        this.m_friction = friction;
      };
      Fixture2.prototype.getRestitution = function() {
        return this.m_restitution;
      };
      Fixture2.prototype.setRestitution = function(restitution) {
        this.m_restitution = restitution;
      };
      Fixture2.prototype.testPoint = function(p2) {
        return this.m_shape.testPoint(this.m_body.getTransform(), p2);
      };
      Fixture2.prototype.rayCast = function(output2, input2, childIndex) {
        return this.m_shape.rayCast(output2, input2, this.m_body.getTransform(), childIndex);
      };
      Fixture2.prototype.getMassData = function(massData) {
        this.m_shape.computeMass(massData, this.m_density);
      };
      Fixture2.prototype.getAABB = function(childIndex) {
        return this.m_proxies[childIndex].aabb;
      };
      Fixture2.prototype.createProxies = function(broadPhase, xf2) {
        this.m_proxyCount = this.m_shape.getChildCount();
        for (var i2 = 0; i2 < this.m_proxyCount; ++i2) {
          var proxy = this.m_proxies[i2];
          this.m_shape.computeAABB(proxy.aabb, xf2, i2);
          proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
        }
      };
      Fixture2.prototype.destroyProxies = function(broadPhase) {
        for (var i2 = 0; i2 < this.m_proxyCount; ++i2) {
          var proxy = this.m_proxies[i2];
          broadPhase.destroyProxy(proxy.proxyId);
          proxy.proxyId = null;
        }
        this.m_proxyCount = 0;
      };
      Fixture2.prototype.synchronize = function(broadPhase, xf1, xf2) {
        for (var i2 = 0; i2 < this.m_proxyCount; ++i2) {
          var proxy = this.m_proxies[i2];
          this.m_shape.computeAABB(synchronize_aabb1, xf1, proxy.childIndex);
          this.m_shape.computeAABB(synchronize_aabb2, xf2, proxy.childIndex);
          proxy.aabb.combine(synchronize_aabb1, synchronize_aabb2);
          subVec2(displacement, xf2.p, xf1.p);
          broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
        }
      };
      Fixture2.prototype.setFilterData = function(filter) {
        this.m_filterGroupIndex = filter.groupIndex;
        this.m_filterCategoryBits = filter.categoryBits;
        this.m_filterMaskBits = filter.maskBits;
        this.refilter();
      };
      Fixture2.prototype.getFilterGroupIndex = function() {
        return this.m_filterGroupIndex;
      };
      Fixture2.prototype.setFilterGroupIndex = function(groupIndex) {
        this.m_filterGroupIndex = groupIndex;
        this.refilter();
      };
      Fixture2.prototype.getFilterCategoryBits = function() {
        return this.m_filterCategoryBits;
      };
      Fixture2.prototype.setFilterCategoryBits = function(categoryBits) {
        this.m_filterCategoryBits = categoryBits;
        this.refilter();
      };
      Fixture2.prototype.getFilterMaskBits = function() {
        return this.m_filterMaskBits;
      };
      Fixture2.prototype.setFilterMaskBits = function(maskBits) {
        this.m_filterMaskBits = maskBits;
        this.refilter();
      };
      Fixture2.prototype.refilter = function() {
        if (this.m_body == null) {
          return;
        }
        var edge = this.m_body.getContactList();
        while (edge) {
          var contact = edge.contact;
          var fixtureA = contact.getFixtureA();
          var fixtureB = contact.getFixtureB();
          if (fixtureA == this || fixtureB == this) {
            contact.flagForFiltering();
          }
          edge = edge.next;
        }
        var world = this.m_body.getWorld();
        if (world == null) {
          return;
        }
        var broadPhase = world.m_broadPhase;
        for (var i2 = 0; i2 < this.m_proxyCount; ++i2) {
          broadPhase.touchProxy(this.m_proxies[i2].proxyId);
        }
      };
      Fixture2.prototype.shouldCollide = function(that) {
        if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
          return that.m_filterGroupIndex > 0;
        }
        var collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
        var collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
        var collide = collideA && collideB;
        return collide;
      };
      return Fixture2;
    })()
  );
  var STATIC = "static";
  var KINEMATIC = "kinematic";
  var DYNAMIC = "dynamic";
  var oldCenter = vec2(0, 0);
  var localCenter = vec2(0, 0);
  var shift = vec2(0, 0);
  var temp$6 = vec2(0, 0);
  var xf$2 = transform(0, 0, 0);
  var BodyDefDefault = {
    type: STATIC,
    position: Vec2.zero(),
    angle: 0,
    linearVelocity: Vec2.zero(),
    angularVelocity: 0,
    linearDamping: 0,
    angularDamping: 0,
    fixedRotation: false,
    bullet: false,
    gravityScale: 1,
    allowSleep: true,
    awake: true,
    active: true,
    userData: null
  };
  var Body = (
    /** @class */
    (function() {
      function Body2(world, def) {
        this.style = {};
        this.appData = {};
        def = options(def, BodyDefDefault);
        this.m_world = world;
        this.m_awakeFlag = def.awake;
        this.m_autoSleepFlag = def.allowSleep;
        this.m_bulletFlag = def.bullet;
        this.m_fixedRotationFlag = def.fixedRotation;
        this.m_activeFlag = def.active;
        this.m_islandFlag = false;
        this.m_toiFlag = false;
        this.m_userData = def.userData;
        this.m_type = def.type;
        if (this.m_type == DYNAMIC) {
          this.m_mass = 1;
          this.m_invMass = 1;
        } else {
          this.m_mass = 0;
          this.m_invMass = 0;
        }
        this.m_I = 0;
        this.m_invI = 0;
        this.m_xf = Transform.identity();
        this.m_xf.p.setVec2(def.position);
        this.m_xf.q.setAngle(def.angle);
        this.m_sweep = new Sweep();
        this.m_sweep.setTransform(this.m_xf);
        this.c_velocity = new Velocity();
        this.c_position = new Position();
        this.m_force = Vec2.zero();
        this.m_torque = 0;
        this.m_linearVelocity = Vec2.clone(def.linearVelocity);
        this.m_angularVelocity = def.angularVelocity;
        this.m_linearDamping = def.linearDamping;
        this.m_angularDamping = def.angularDamping;
        this.m_gravityScale = def.gravityScale;
        this.m_sleepTime = 0;
        this.m_jointList = null;
        this.m_contactList = null;
        this.m_fixtureList = null;
        this.m_prev = null;
        this.m_next = null;
        this.m_destroyed = false;
        if (typeof def.style === "object" && def.style !== null) {
          this.style = def.style;
        }
      }
      Body2.prototype._serialize = function() {
        var fixtures = [];
        for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
          fixtures.push(f2);
        }
        return {
          type: this.m_type,
          bullet: this.m_bulletFlag,
          fixedRotation: this.m_fixedRotationFlag,
          position: this.m_xf.p,
          angle: this.m_xf.q.getAngle(),
          linearVelocity: this.m_linearVelocity,
          angularVelocity: this.m_angularVelocity,
          fixtures
        };
      };
      Body2._deserialize = function(data, world, restore) {
        var body = new Body2(world, data);
        if (data.fixtures) {
          for (var i2 = data.fixtures.length - 1; i2 >= 0; i2--) {
            var fixture = restore(Fixture, data.fixtures[i2], body);
            body._addFixture(fixture);
          }
        }
        return body;
      };
      Body2.prototype.isWorldLocked = function() {
        return this.m_world && this.m_world.isLocked() ? true : false;
      };
      Body2.prototype.getWorld = function() {
        return this.m_world;
      };
      Body2.prototype.getNext = function() {
        return this.m_next;
      };
      Body2.prototype.setUserData = function(data) {
        this.m_userData = data;
      };
      Body2.prototype.getUserData = function() {
        return this.m_userData;
      };
      Body2.prototype.getFixtureList = function() {
        return this.m_fixtureList;
      };
      Body2.prototype.getJointList = function() {
        return this.m_jointList;
      };
      Body2.prototype.getContactList = function() {
        return this.m_contactList;
      };
      Body2.prototype.isStatic = function() {
        return this.m_type == STATIC;
      };
      Body2.prototype.isDynamic = function() {
        return this.m_type == DYNAMIC;
      };
      Body2.prototype.isKinematic = function() {
        return this.m_type == KINEMATIC;
      };
      Body2.prototype.setStatic = function() {
        this.setType(STATIC);
        return this;
      };
      Body2.prototype.setDynamic = function() {
        this.setType(DYNAMIC);
        return this;
      };
      Body2.prototype.setKinematic = function() {
        this.setType(KINEMATIC);
        return this;
      };
      Body2.prototype.getType = function() {
        return this.m_type;
      };
      Body2.prototype.setType = function(type) {
        if (this.isWorldLocked() == true) {
          return;
        }
        if (this.m_type == type) {
          return;
        }
        this.m_type = type;
        this.resetMassData();
        if (this.m_type == STATIC) {
          this.m_linearVelocity.setZero();
          this.m_angularVelocity = 0;
          this.m_sweep.forward();
          this.synchronizeFixtures();
        }
        this.setAwake(true);
        this.m_force.setZero();
        this.m_torque = 0;
        var ce = this.m_contactList;
        while (ce) {
          var ce0 = ce;
          ce = ce.next;
          this.m_world.destroyContact(ce0.contact);
        }
        this.m_contactList = null;
        var broadPhase = this.m_world.m_broadPhase;
        for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
          for (var i2 = 0; i2 < f2.m_proxyCount; ++i2) {
            broadPhase.touchProxy(f2.m_proxies[i2].proxyId);
          }
        }
      };
      Body2.prototype.isBullet = function() {
        return this.m_bulletFlag;
      };
      Body2.prototype.setBullet = function(flag) {
        this.m_bulletFlag = !!flag;
      };
      Body2.prototype.isSleepingAllowed = function() {
        return this.m_autoSleepFlag;
      };
      Body2.prototype.setSleepingAllowed = function(flag) {
        this.m_autoSleepFlag = !!flag;
        if (this.m_autoSleepFlag == false) {
          this.setAwake(true);
        }
      };
      Body2.prototype.isAwake = function() {
        return this.m_awakeFlag;
      };
      Body2.prototype.setAwake = function(flag) {
        if (flag) {
          this.m_awakeFlag = true;
          this.m_sleepTime = 0;
        } else {
          this.m_awakeFlag = false;
          this.m_sleepTime = 0;
          this.m_linearVelocity.setZero();
          this.m_angularVelocity = 0;
          this.m_force.setZero();
          this.m_torque = 0;
        }
      };
      Body2.prototype.isActive = function() {
        return this.m_activeFlag;
      };
      Body2.prototype.setActive = function(flag) {
        if (flag == this.m_activeFlag) {
          return;
        }
        this.m_activeFlag = !!flag;
        if (this.m_activeFlag) {
          var broadPhase = this.m_world.m_broadPhase;
          for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
            f2.createProxies(broadPhase, this.m_xf);
          }
          this.m_world.m_newFixture = true;
        } else {
          var broadPhase = this.m_world.m_broadPhase;
          for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
            f2.destroyProxies(broadPhase);
          }
          var ce = this.m_contactList;
          while (ce) {
            var ce0 = ce;
            ce = ce.next;
            this.m_world.destroyContact(ce0.contact);
          }
          this.m_contactList = null;
        }
      };
      Body2.prototype.isFixedRotation = function() {
        return this.m_fixedRotationFlag;
      };
      Body2.prototype.setFixedRotation = function(flag) {
        if (this.m_fixedRotationFlag == flag) {
          return;
        }
        this.m_fixedRotationFlag = !!flag;
        this.m_angularVelocity = 0;
        this.resetMassData();
      };
      Body2.prototype.getTransform = function() {
        return this.m_xf;
      };
      Body2.prototype.setTransform = function(a2, b2) {
        if (this.isWorldLocked() == true) {
          return;
        }
        if (typeof b2 === "number") {
          this.m_xf.setNum(a2, b2);
        } else {
          this.m_xf.setTransform(a2);
        }
        this.m_sweep.setTransform(this.m_xf);
        var broadPhase = this.m_world.m_broadPhase;
        for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
          f2.synchronize(broadPhase, this.m_xf, this.m_xf);
        }
        this.setAwake(true);
      };
      Body2.prototype.synchronizeTransform = function() {
        this.m_sweep.getTransform(this.m_xf, 1);
      };
      Body2.prototype.synchronizeFixtures = function() {
        this.m_sweep.getTransform(xf$2, 0);
        var broadPhase = this.m_world.m_broadPhase;
        for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
          f2.synchronize(broadPhase, xf$2, this.m_xf);
        }
      };
      Body2.prototype.advance = function(alpha) {
        this.m_sweep.advance(alpha);
        copyVec2(this.m_sweep.c, this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.m_sweep.getTransform(this.m_xf, 1);
      };
      Body2.prototype.getPosition = function() {
        return this.m_xf.p;
      };
      Body2.prototype.setPosition = function(p2) {
        this.setTransform(p2, this.m_sweep.a);
      };
      Body2.prototype.getAngle = function() {
        return this.m_sweep.a;
      };
      Body2.prototype.setAngle = function(angle) {
        this.setTransform(this.m_xf.p, angle);
      };
      Body2.prototype.getWorldCenter = function() {
        return this.m_sweep.c;
      };
      Body2.prototype.getLocalCenter = function() {
        return this.m_sweep.localCenter;
      };
      Body2.prototype.getLinearVelocity = function() {
        return this.m_linearVelocity;
      };
      Body2.prototype.getLinearVelocityFromWorldPoint = function(worldPoint) {
        var localCenter2 = Vec2.sub(worldPoint, this.m_sweep.c);
        return Vec2.add(this.m_linearVelocity, Vec2.crossNumVec2(this.m_angularVelocity, localCenter2));
      };
      Body2.prototype.getLinearVelocityFromLocalPoint = function(localPoint) {
        return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
      };
      Body2.prototype.setLinearVelocity = function(v3) {
        if (this.m_type == STATIC) {
          return;
        }
        if (Vec2.dot(v3, v3) > 0) {
          this.setAwake(true);
        }
        this.m_linearVelocity.setVec2(v3);
      };
      Body2.prototype.getAngularVelocity = function() {
        return this.m_angularVelocity;
      };
      Body2.prototype.setAngularVelocity = function(w2) {
        if (this.m_type == STATIC) {
          return;
        }
        if (w2 * w2 > 0) {
          this.setAwake(true);
        }
        this.m_angularVelocity = w2;
      };
      Body2.prototype.getLinearDamping = function() {
        return this.m_linearDamping;
      };
      Body2.prototype.setLinearDamping = function(linearDamping) {
        this.m_linearDamping = linearDamping;
      };
      Body2.prototype.getAngularDamping = function() {
        return this.m_angularDamping;
      };
      Body2.prototype.setAngularDamping = function(angularDamping) {
        this.m_angularDamping = angularDamping;
      };
      Body2.prototype.getGravityScale = function() {
        return this.m_gravityScale;
      };
      Body2.prototype.setGravityScale = function(scale) {
        this.m_gravityScale = scale;
      };
      Body2.prototype.getMass = function() {
        return this.m_mass;
      };
      Body2.prototype.getInertia = function() {
        return this.m_I + this.m_mass * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
      };
      Body2.prototype.getMassData = function(data) {
        data.mass = this.m_mass;
        data.I = this.getInertia();
        copyVec2(data.center, this.m_sweep.localCenter);
      };
      Body2.prototype.resetMassData = function() {
        this.m_mass = 0;
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        zeroVec2(this.m_sweep.localCenter);
        if (this.isStatic() || this.isKinematic()) {
          copyVec2(this.m_sweep.c0, this.m_xf.p);
          copyVec2(this.m_sweep.c, this.m_xf.p);
          this.m_sweep.a0 = this.m_sweep.a;
          return;
        }
        zeroVec2(localCenter);
        for (var f2 = this.m_fixtureList; f2; f2 = f2.m_next) {
          if (f2.m_density == 0) {
            continue;
          }
          var massData = {
            mass: 0,
            center: vec2(0, 0),
            I: 0
          };
          f2.getMassData(massData);
          this.m_mass += massData.mass;
          plusScaleVec2(localCenter, massData.mass, massData.center);
          this.m_I += massData.I;
        }
        if (this.m_mass > 0) {
          this.m_invMass = 1 / this.m_mass;
          scaleVec2(localCenter, this.m_invMass, localCenter);
        } else {
          this.m_mass = 1;
          this.m_invMass = 1;
        }
        if (this.m_I > 0 && this.m_fixedRotationFlag == false) {
          this.m_I -= this.m_mass * dotVec2(localCenter, localCenter);
          this.m_invI = 1 / this.m_I;
        } else {
          this.m_I = 0;
          this.m_invI = 0;
        }
        copyVec2(oldCenter, this.m_sweep.c);
        this.m_sweep.setLocalCenter(localCenter, this.m_xf);
        subVec2(shift, this.m_sweep.c, oldCenter);
        crossNumVec2(temp$6, this.m_angularVelocity, shift);
        plusVec2(this.m_linearVelocity, temp$6);
      };
      Body2.prototype.setMassData = function(massData) {
        if (this.isWorldLocked() == true) {
          return;
        }
        if (this.m_type != DYNAMIC) {
          return;
        }
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        this.m_mass = massData.mass;
        if (this.m_mass <= 0) {
          this.m_mass = 1;
        }
        this.m_invMass = 1 / this.m_mass;
        if (massData.I > 0 && this.m_fixedRotationFlag == false) {
          this.m_I = massData.I - this.m_mass * dotVec2(massData.center, massData.center);
          this.m_invI = 1 / this.m_I;
        }
        copyVec2(oldCenter, this.m_sweep.c);
        this.m_sweep.setLocalCenter(massData.center, this.m_xf);
        subVec2(shift, this.m_sweep.c, oldCenter);
        crossNumVec2(temp$6, this.m_angularVelocity, shift);
        plusVec2(this.m_linearVelocity, temp$6);
      };
      Body2.prototype.applyForce = function(force, point2, wake) {
        if (wake === void 0) {
          wake = true;
        }
        if (this.m_type != DYNAMIC) {
          return;
        }
        if (wake && this.m_awakeFlag == false) {
          this.setAwake(true);
        }
        if (this.m_awakeFlag) {
          this.m_force.add(force);
          this.m_torque += Vec2.crossVec2Vec2(Vec2.sub(point2, this.m_sweep.c), force);
        }
      };
      Body2.prototype.applyForceToCenter = function(force, wake) {
        if (wake === void 0) {
          wake = true;
        }
        if (this.m_type != DYNAMIC) {
          return;
        }
        if (wake && this.m_awakeFlag == false) {
          this.setAwake(true);
        }
        if (this.m_awakeFlag) {
          this.m_force.add(force);
        }
      };
      Body2.prototype.applyTorque = function(torque, wake) {
        if (wake === void 0) {
          wake = true;
        }
        if (this.m_type != DYNAMIC) {
          return;
        }
        if (wake && this.m_awakeFlag == false) {
          this.setAwake(true);
        }
        if (this.m_awakeFlag) {
          this.m_torque += torque;
        }
      };
      Body2.prototype.applyLinearImpulse = function(impulse, point2, wake) {
        if (wake === void 0) {
          wake = true;
        }
        if (this.m_type != DYNAMIC) {
          return;
        }
        if (wake && this.m_awakeFlag == false) {
          this.setAwake(true);
        }
        if (this.m_awakeFlag) {
          this.m_linearVelocity.addMul(this.m_invMass, impulse);
          this.m_angularVelocity += this.m_invI * Vec2.crossVec2Vec2(Vec2.sub(point2, this.m_sweep.c), impulse);
        }
      };
      Body2.prototype.applyAngularImpulse = function(impulse, wake) {
        if (wake === void 0) {
          wake = true;
        }
        if (this.m_type != DYNAMIC) {
          return;
        }
        if (wake && this.m_awakeFlag == false) {
          this.setAwake(true);
        }
        if (this.m_awakeFlag) {
          this.m_angularVelocity += this.m_invI * impulse;
        }
      };
      Body2.prototype.shouldCollide = function(that) {
        if (this.m_type != DYNAMIC && that.m_type != DYNAMIC) {
          return false;
        }
        for (var jn = this.m_jointList; jn; jn = jn.next) {
          if (jn.other == that) {
            if (jn.joint.m_collideConnected == false) {
              return false;
            }
          }
        }
        return true;
      };
      Body2.prototype._addFixture = function(fixture) {
        if (this.isWorldLocked() == true) {
          return null;
        }
        if (this.m_activeFlag) {
          var broadPhase = this.m_world.m_broadPhase;
          fixture.createProxies(broadPhase, this.m_xf);
        }
        fixture.m_next = this.m_fixtureList;
        this.m_fixtureList = fixture;
        if (fixture.m_density > 0) {
          this.resetMassData();
        }
        this.m_world.m_newFixture = true;
        return fixture;
      };
      Body2.prototype.createFixture = function(shape, fixdef) {
        if (this.isWorldLocked() == true) {
          return null;
        }
        var fixture = new Fixture(this, shape, fixdef);
        this._addFixture(fixture);
        this.m_world.publish("add-fixture", fixture);
        return fixture;
      };
      Body2.prototype.destroyFixture = function(fixture) {
        if (this.isWorldLocked() == true) {
          return;
        }
        if (this.m_fixtureList === fixture) {
          this.m_fixtureList = fixture.m_next;
        } else {
          var node = this.m_fixtureList;
          while (node != null) {
            if (node.m_next === fixture) {
              node.m_next = fixture.m_next;
              break;
            }
            node = node.m_next;
          }
        }
        var edge = this.m_contactList;
        while (edge) {
          var c2 = edge.contact;
          edge = edge.next;
          var fixtureA = c2.getFixtureA();
          var fixtureB = c2.getFixtureB();
          if (fixture == fixtureA || fixture == fixtureB) {
            this.m_world.destroyContact(c2);
          }
        }
        if (this.m_activeFlag) {
          var broadPhase = this.m_world.m_broadPhase;
          fixture.destroyProxies(broadPhase);
        }
        fixture.m_body = null;
        fixture.m_next = null;
        this.m_world.publish("remove-fixture", fixture);
        this.resetMassData();
      };
      Body2.prototype.getWorldPoint = function(localPoint) {
        return Transform.mulVec2(this.m_xf, localPoint);
      };
      Body2.prototype.getWorldVector = function(localVector) {
        return Rot.mulVec2(this.m_xf.q, localVector);
      };
      Body2.prototype.getLocalPoint = function(worldPoint) {
        return Transform.mulTVec2(this.m_xf, worldPoint);
      };
      Body2.prototype.getLocalVector = function(worldVector) {
        return Rot.mulTVec2(this.m_xf.q, worldVector);
      };
      Body2.STATIC = "static";
      Body2.KINEMATIC = "kinematic";
      Body2.DYNAMIC = "dynamic";
      return Body2;
    })()
  );
  var JointEdge = (
    /** @class */
    /* @__PURE__ */ (function() {
      function JointEdge2() {
        this.other = null;
        this.joint = null;
        this.prev = null;
        this.next = null;
      }
      return JointEdge2;
    })()
  );
  var Joint = (
    /** @class */
    (function() {
      function Joint2(def, bodyA, bodyB) {
        this.m_type = "unknown-joint";
        this.m_prev = null;
        this.m_next = null;
        this.m_edgeA = new JointEdge();
        this.m_edgeB = new JointEdge();
        this.m_islandFlag = false;
        this.style = {};
        this.appData = {};
        bodyA = "bodyA" in def ? def.bodyA : bodyA;
        bodyB = "bodyB" in def ? def.bodyB : bodyB;
        this.m_bodyA = bodyA;
        this.m_bodyB = bodyB;
        this.m_collideConnected = !!def.collideConnected;
        this.m_userData = def.userData;
        if (typeof def.style === "object" && def.style !== null) {
          this.style = def.style;
        }
      }
      Joint2.prototype.isActive = function() {
        return this.m_bodyA.isActive() && this.m_bodyB.isActive();
      };
      Joint2.prototype.getType = function() {
        return this.m_type;
      };
      Joint2.prototype.getBodyA = function() {
        return this.m_bodyA;
      };
      Joint2.prototype.getBodyB = function() {
        return this.m_bodyB;
      };
      Joint2.prototype.getNext = function() {
        return this.m_next;
      };
      Joint2.prototype.getUserData = function() {
        return this.m_userData;
      };
      Joint2.prototype.setUserData = function(data) {
        this.m_userData = data;
      };
      Joint2.prototype.getCollideConnected = function() {
        return this.m_collideConnected;
      };
      Joint2.prototype.shiftOrigin = function(newOrigin) {
      };
      Joint2.prototype._resetAnchors = function(def) {
        return this._reset(def);
      };
      return Joint2;
    })()
  );
  var stats = {
    gjkCalls: 0,
    gjkIters: 0,
    gjkMaxIters: 0,
    toiTime: 0,
    toiMaxTime: 0,
    toiCalls: 0,
    toiIters: 0,
    toiMaxIters: 0,
    toiRootIters: 0,
    toiMaxRootIters: 0,
    toString: function(newline) {
      newline = typeof newline === "string" ? newline : "\n";
      var string = "";
      for (var name_1 in this) {
        if (typeof this[name_1] !== "function" && typeof this[name_1] !== "object") {
          string += name_1 + ": " + this[name_1] + newline;
        }
      }
      return string;
    }
  };
  var now = function() {
    return Date.now();
  };
  var diff = function(time) {
    return Date.now() - time;
  };
  const Timer = {
    now,
    diff
  };
  var math_max$4 = Math.max;
  var temp$5 = vec2(0, 0);
  var normal$4 = vec2(0, 0);
  var e12 = vec2(0, 0);
  var e13 = vec2(0, 0);
  var e23 = vec2(0, 0);
  var temp1$1 = vec2(0, 0);
  var temp2$1 = vec2(0, 0);
  stats.gjkCalls = 0;
  stats.gjkIters = 0;
  stats.gjkMaxIters = 0;
  var DistanceInput = (
    /** @class */
    (function() {
      function DistanceInput2() {
        this.proxyA = new DistanceProxy();
        this.proxyB = new DistanceProxy();
        this.transformA = Transform.identity();
        this.transformB = Transform.identity();
        this.useRadii = false;
      }
      DistanceInput2.prototype.recycle = function() {
        this.proxyA.recycle();
        this.proxyB.recycle();
        this.transformA.setIdentity();
        this.transformB.setIdentity();
        this.useRadii = false;
      };
      return DistanceInput2;
    })()
  );
  var DistanceOutput = (
    /** @class */
    (function() {
      function DistanceOutput2() {
        this.pointA = vec2(0, 0);
        this.pointB = vec2(0, 0);
        this.distance = 0;
        this.iterations = 0;
      }
      DistanceOutput2.prototype.recycle = function() {
        zeroVec2(this.pointA);
        zeroVec2(this.pointB);
        this.distance = 0;
        this.iterations = 0;
      };
      return DistanceOutput2;
    })()
  );
  var SimplexCache = (
    /** @class */
    (function() {
      function SimplexCache2() {
        this.metric = 0;
        this.indexA = [];
        this.indexB = [];
        this.count = 0;
      }
      SimplexCache2.prototype.recycle = function() {
        this.metric = 0;
        this.indexA.length = 0;
        this.indexB.length = 0;
        this.count = 0;
      };
      return SimplexCache2;
    })()
  );
  var Distance = function(output2, cache2, input2) {
    ++stats.gjkCalls;
    var proxyA = input2.proxyA;
    var proxyB = input2.proxyB;
    var xfA2 = input2.transformA;
    var xfB2 = input2.transformB;
    simplex.recycle();
    simplex.readCache(cache2, proxyA, xfA2, proxyB, xfB2);
    var vertices = simplex.m_v;
    var k_maxIters = SettingsInternal.maxDistanceIterations;
    var saveA = [];
    var saveB = [];
    var saveCount = 0;
    var iter = 0;
    while (iter < k_maxIters) {
      saveCount = simplex.m_count;
      for (var i2 = 0; i2 < saveCount; ++i2) {
        saveA[i2] = vertices[i2].indexA;
        saveB[i2] = vertices[i2].indexB;
      }
      simplex.solve();
      if (simplex.m_count === 3) {
        break;
      }
      var d2 = simplex.getSearchDirection();
      if (lengthSqrVec2(d2) < EPSILON * EPSILON) {
        break;
      }
      var vertex = vertices[simplex.m_count];
      vertex.indexA = proxyA.getSupport(derotVec2(temp$5, xfA2.q, scaleVec2(temp$5, -1, d2)));
      transformVec2$1(vertex.wA, xfA2, proxyA.getVertex(vertex.indexA));
      vertex.indexB = proxyB.getSupport(derotVec2(temp$5, xfB2.q, d2));
      transformVec2$1(vertex.wB, xfB2, proxyB.getVertex(vertex.indexB));
      subVec2(vertex.w, vertex.wB, vertex.wA);
      ++iter;
      ++stats.gjkIters;
      var duplicate = false;
      for (var i2 = 0; i2 < saveCount; ++i2) {
        if (vertex.indexA === saveA[i2] && vertex.indexB === saveB[i2]) {
          duplicate = true;
          break;
        }
      }
      if (duplicate) {
        break;
      }
      ++simplex.m_count;
    }
    stats.gjkMaxIters = math_max$4(stats.gjkMaxIters, iter);
    simplex.getWitnessPoints(output2.pointA, output2.pointB);
    output2.distance = distVec2(output2.pointA, output2.pointB);
    output2.iterations = iter;
    simplex.writeCache(cache2);
    if (input2.useRadii) {
      var rA2 = proxyA.m_radius;
      var rB2 = proxyB.m_radius;
      if (output2.distance > rA2 + rB2 && output2.distance > EPSILON) {
        output2.distance -= rA2 + rB2;
        subVec2(normal$4, output2.pointB, output2.pointA);
        normalizeVec2(normal$4);
        plusScaleVec2(output2.pointA, rA2, normal$4);
        minusScaleVec2(output2.pointB, rB2, normal$4);
      } else {
        var p2 = subVec2(temp$5, output2.pointA, output2.pointB);
        copyVec2(output2.pointA, p2);
        copyVec2(output2.pointB, p2);
        output2.distance = 0;
      }
    }
  };
  var DistanceProxy = (
    /** @class */
    (function() {
      function DistanceProxy2() {
        this.m_vertices = [];
        this.m_count = 0;
        this.m_radius = 0;
      }
      DistanceProxy2.prototype.recycle = function() {
        this.m_vertices.length = 0;
        this.m_count = 0;
        this.m_radius = 0;
      };
      DistanceProxy2.prototype.getVertexCount = function() {
        return this.m_count;
      };
      DistanceProxy2.prototype.getVertex = function(index) {
        return this.m_vertices[index];
      };
      DistanceProxy2.prototype.getSupport = function(d2) {
        var bestIndex = 0;
        var bestValue = -Infinity;
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          var value = dotVec2(this.m_vertices[i2], d2);
          if (value > bestValue) {
            bestIndex = i2;
            bestValue = value;
          }
        }
        return bestIndex;
      };
      DistanceProxy2.prototype.getSupportVertex = function(d2) {
        return this.m_vertices[this.getSupport(d2)];
      };
      DistanceProxy2.prototype.set = function(shape, index) {
        shape.computeDistanceProxy(this, index);
      };
      DistanceProxy2.prototype.setVertices = function(vertices, count, radius) {
        this.m_vertices = vertices;
        this.m_count = count;
        this.m_radius = radius;
      };
      return DistanceProxy2;
    })()
  );
  var SimplexVertex = (
    /** @class */
    (function() {
      function SimplexVertex2() {
        this.wA = vec2(0, 0);
        this.indexA = 0;
        this.wB = vec2(0, 0);
        this.indexB = 0;
        this.w = vec2(0, 0);
        this.a = 0;
      }
      SimplexVertex2.prototype.recycle = function() {
        this.indexA = 0;
        this.indexB = 0;
        zeroVec2(this.wA);
        zeroVec2(this.wB);
        zeroVec2(this.w);
        this.a = 0;
      };
      SimplexVertex2.prototype.set = function(v3) {
        this.indexA = v3.indexA;
        this.indexB = v3.indexB;
        copyVec2(this.wA, v3.wA);
        copyVec2(this.wB, v3.wB);
        copyVec2(this.w, v3.w);
        this.a = v3.a;
      };
      return SimplexVertex2;
    })()
  );
  var searchDirection_reuse = vec2(0, 0);
  var closestPoint_reuse = vec2(0, 0);
  var Simplex = (
    /** @class */
    (function() {
      function Simplex2() {
        this.m_v1 = new SimplexVertex();
        this.m_v2 = new SimplexVertex();
        this.m_v3 = new SimplexVertex();
        this.m_v = [this.m_v1, this.m_v2, this.m_v3];
      }
      Simplex2.prototype.recycle = function() {
        this.m_v1.recycle();
        this.m_v2.recycle();
        this.m_v3.recycle();
        this.m_count = 0;
      };
      Simplex2.prototype.toString = function() {
        if (this.m_count === 3) {
          return [
            "+" + this.m_count,
            this.m_v1.a,
            this.m_v1.wA.x,
            this.m_v1.wA.y,
            this.m_v1.wB.x,
            this.m_v1.wB.y,
            this.m_v2.a,
            this.m_v2.wA.x,
            this.m_v2.wA.y,
            this.m_v2.wB.x,
            this.m_v2.wB.y,
            this.m_v3.a,
            this.m_v3.wA.x,
            this.m_v3.wA.y,
            this.m_v3.wB.x,
            this.m_v3.wB.y
          ].toString();
        } else if (this.m_count === 2) {
          return [
            "+" + this.m_count,
            this.m_v1.a,
            this.m_v1.wA.x,
            this.m_v1.wA.y,
            this.m_v1.wB.x,
            this.m_v1.wB.y,
            this.m_v2.a,
            this.m_v2.wA.x,
            this.m_v2.wA.y,
            this.m_v2.wB.x,
            this.m_v2.wB.y
          ].toString();
        } else if (this.m_count === 1) {
          return [
            "+" + this.m_count,
            this.m_v1.a,
            this.m_v1.wA.x,
            this.m_v1.wA.y,
            this.m_v1.wB.x,
            this.m_v1.wB.y
          ].toString();
        } else {
          return "+" + this.m_count;
        }
      };
      Simplex2.prototype.readCache = function(cache2, proxyA, transformA, proxyB, transformB) {
        this.m_count = cache2.count;
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          var v3 = this.m_v[i2];
          v3.indexA = cache2.indexA[i2];
          v3.indexB = cache2.indexB[i2];
          var wALocal = proxyA.getVertex(v3.indexA);
          var wBLocal = proxyB.getVertex(v3.indexB);
          transformVec2$1(v3.wA, transformA, wALocal);
          transformVec2$1(v3.wB, transformB, wBLocal);
          subVec2(v3.w, v3.wB, v3.wA);
          v3.a = 0;
        }
        if (this.m_count > 1) {
          var metric1 = cache2.metric;
          var metric2 = this.getMetric();
          if (metric2 < 0.5 * metric1 || 2 * metric1 < metric2 || metric2 < EPSILON) {
            this.m_count = 0;
          }
        }
        if (this.m_count === 0) {
          var v3 = this.m_v[0];
          v3.indexA = 0;
          v3.indexB = 0;
          var wALocal = proxyA.getVertex(0);
          var wBLocal = proxyB.getVertex(0);
          transformVec2$1(v3.wA, transformA, wALocal);
          transformVec2$1(v3.wB, transformB, wBLocal);
          subVec2(v3.w, v3.wB, v3.wA);
          v3.a = 1;
          this.m_count = 1;
        }
      };
      Simplex2.prototype.writeCache = function(cache2) {
        cache2.metric = this.getMetric();
        cache2.count = this.m_count;
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          cache2.indexA[i2] = this.m_v[i2].indexA;
          cache2.indexB[i2] = this.m_v[i2].indexB;
        }
      };
      Simplex2.prototype.getSearchDirection = function() {
        var v13 = this.m_v1;
        var v22 = this.m_v2;
        switch (this.m_count) {
          case 1:
            return setVec2(searchDirection_reuse, -v13.w.x, -v13.w.y);
          case 2: {
            subVec2(e12, v22.w, v13.w);
            var sgn = -crossVec2Vec2(e12, v13.w);
            if (sgn > 0) {
              return setVec2(searchDirection_reuse, -e12.y, e12.x);
            } else {
              return setVec2(searchDirection_reuse, e12.y, -e12.x);
            }
          }
          default:
            return zeroVec2(searchDirection_reuse);
        }
      };
      Simplex2.prototype.getClosestPoint = function() {
        var v13 = this.m_v1;
        var v22 = this.m_v2;
        switch (this.m_count) {
          case 0:
            return zeroVec2(closestPoint_reuse);
          case 1:
            return copyVec2(closestPoint_reuse, v13.w);
          case 2:
            return combine2Vec2(closestPoint_reuse, v13.a, v13.w, v22.a, v22.w);
          case 3:
            return zeroVec2(closestPoint_reuse);
          default:
            return zeroVec2(closestPoint_reuse);
        }
      };
      Simplex2.prototype.getWitnessPoints = function(pA2, pB2) {
        var v13 = this.m_v1;
        var v22 = this.m_v2;
        var v3 = this.m_v3;
        switch (this.m_count) {
          case 0:
            break;
          case 1:
            copyVec2(pA2, v13.wA);
            copyVec2(pB2, v13.wB);
            break;
          case 2:
            combine2Vec2(pA2, v13.a, v13.wA, v22.a, v22.wA);
            combine2Vec2(pB2, v13.a, v13.wB, v22.a, v22.wB);
            break;
          case 3:
            combine3Vec2(pA2, v13.a, v13.wA, v22.a, v22.wA, v3.a, v3.wA);
            copyVec2(pB2, pA2);
            break;
        }
      };
      Simplex2.prototype.getMetric = function() {
        switch (this.m_count) {
          case 0:
            return 0;
          case 1:
            return 0;
          case 2:
            return distVec2(this.m_v1.w, this.m_v2.w);
          case 3:
            return crossVec2Vec2(subVec2(temp1$1, this.m_v2.w, this.m_v1.w), subVec2(temp2$1, this.m_v3.w, this.m_v1.w));
          default:
            return 0;
        }
      };
      Simplex2.prototype.solve = function() {
        switch (this.m_count) {
          case 1:
            break;
          case 2:
            this.solve2();
            break;
          case 3:
            this.solve3();
            break;
        }
      };
      Simplex2.prototype.solve2 = function() {
        var w1 = this.m_v1.w;
        var w2 = this.m_v2.w;
        subVec2(e12, w2, w1);
        var d12_2 = -dotVec2(w1, e12);
        if (d12_2 <= 0) {
          this.m_v1.a = 1;
          this.m_count = 1;
          return;
        }
        var d12_1 = dotVec2(w2, e12);
        if (d12_1 <= 0) {
          this.m_v2.a = 1;
          this.m_count = 1;
          this.m_v1.set(this.m_v2);
          return;
        }
        var inv_d12 = 1 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
      };
      Simplex2.prototype.solve3 = function() {
        var w1 = this.m_v1.w;
        var w2 = this.m_v2.w;
        var w3 = this.m_v3.w;
        subVec2(e12, w2, w1);
        var w1e12 = dotVec2(w1, e12);
        var w2e12 = dotVec2(w2, e12);
        var d12_1 = w2e12;
        var d12_2 = -w1e12;
        subVec2(e13, w3, w1);
        var w1e13 = dotVec2(w1, e13);
        var w3e13 = dotVec2(w3, e13);
        var d13_1 = w3e13;
        var d13_2 = -w1e13;
        subVec2(e23, w3, w2);
        var w2e23 = dotVec2(w2, e23);
        var w3e23 = dotVec2(w3, e23);
        var d23_1 = w3e23;
        var d23_2 = -w2e23;
        var n123 = crossVec2Vec2(e12, e13);
        var d123_1 = n123 * crossVec2Vec2(w2, w3);
        var d123_2 = n123 * crossVec2Vec2(w3, w1);
        var d123_3 = n123 * crossVec2Vec2(w1, w2);
        if (d12_2 <= 0 && d13_2 <= 0) {
          this.m_v1.a = 1;
          this.m_count = 1;
          return;
        }
        if (d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
          var inv_d12 = 1 / (d12_1 + d12_2);
          this.m_v1.a = d12_1 * inv_d12;
          this.m_v2.a = d12_2 * inv_d12;
          this.m_count = 2;
          return;
        }
        if (d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
          var inv_d13 = 1 / (d13_1 + d13_2);
          this.m_v1.a = d13_1 * inv_d13;
          this.m_v3.a = d13_2 * inv_d13;
          this.m_count = 2;
          this.m_v2.set(this.m_v3);
          return;
        }
        if (d12_1 <= 0 && d23_2 <= 0) {
          this.m_v2.a = 1;
          this.m_count = 1;
          this.m_v1.set(this.m_v2);
          return;
        }
        if (d13_1 <= 0 && d23_1 <= 0) {
          this.m_v3.a = 1;
          this.m_count = 1;
          this.m_v1.set(this.m_v3);
          return;
        }
        if (d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
          var inv_d23 = 1 / (d23_1 + d23_2);
          this.m_v2.a = d23_1 * inv_d23;
          this.m_v3.a = d23_2 * inv_d23;
          this.m_count = 2;
          this.m_v1.set(this.m_v3);
          return;
        }
        var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
        this.m_v1.a = d123_1 * inv_d123;
        this.m_v2.a = d123_2 * inv_d123;
        this.m_v3.a = d123_3 * inv_d123;
        this.m_count = 3;
      };
      return Simplex2;
    })()
  );
  var simplex = new Simplex();
  var input$1 = new DistanceInput();
  var cache$1 = new SimplexCache();
  var output$1 = new DistanceOutput();
  var testOverlap = function(shapeA, indexA, shapeB, indexB, xfA2, xfB2) {
    input$1.recycle();
    input$1.proxyA.set(shapeA, indexA);
    input$1.proxyB.set(shapeB, indexB);
    copyTransform(input$1.transformA, xfA2);
    copyTransform(input$1.transformB, xfB2);
    input$1.useRadii = true;
    output$1.recycle();
    cache$1.recycle();
    Distance(output$1, cache$1, input$1);
    return output$1.distance < 10 * EPSILON;
  };
  Distance.testOverlap = testOverlap;
  Distance.Input = DistanceInput;
  Distance.Output = DistanceOutput;
  Distance.Proxy = DistanceProxy;
  Distance.Cache = SimplexCache;
  var ShapeCastInput = (
    /** @class */
    (function() {
      function ShapeCastInput2() {
        this.proxyA = new DistanceProxy();
        this.proxyB = new DistanceProxy();
        this.transformA = Transform.identity();
        this.transformB = Transform.identity();
        this.translationB = Vec2.zero();
      }
      ShapeCastInput2.prototype.recycle = function() {
        this.proxyA.recycle();
        this.proxyB.recycle();
        this.transformA.setIdentity();
        this.transformB.setIdentity();
        zeroVec2(this.translationB);
      };
      return ShapeCastInput2;
    })()
  );
  var ShapeCastOutput = (
    /** @class */
    /* @__PURE__ */ (function() {
      function ShapeCastOutput2() {
        this.point = Vec2.zero();
        this.normal = Vec2.zero();
        this.lambda = 1;
        this.iterations = 0;
      }
      return ShapeCastOutput2;
    })()
  );
  var ShapeCast = function(output2, input2) {
    output2.iterations = 0;
    output2.lambda = 1;
    output2.normal.setZero();
    output2.point.setZero();
    var proxyA = input2.proxyA;
    var proxyB = input2.proxyB;
    var radiusA = math_max$4(proxyA.m_radius, SettingsInternal.polygonRadius);
    var radiusB = math_max$4(proxyB.m_radius, SettingsInternal.polygonRadius);
    var radius = radiusA + radiusB;
    var xfA2 = input2.transformA;
    var xfB2 = input2.transformB;
    var r2 = input2.translationB;
    var n2 = Vec2.zero();
    var lambda = 0;
    var simplex2 = new Simplex();
    simplex2.m_count = 0;
    var vertices = simplex2.m_v;
    var indexA = proxyA.getSupport(Rot.mulTVec2(xfA2.q, Vec2.neg(r2)));
    var wA = Transform.mulVec2(xfA2, proxyA.getVertex(indexA));
    var indexB = proxyB.getSupport(Rot.mulTVec2(xfB2.q, r2));
    var wB = Transform.mulVec2(xfB2, proxyB.getVertex(indexB));
    var v3 = Vec2.sub(wA, wB);
    var sigma = math_max$4(SettingsInternal.polygonRadius, radius - SettingsInternal.polygonRadius);
    var tolerance = 0.5 * SettingsInternal.linearSlop;
    var k_maxIters = 20;
    var iter = 0;
    while (iter < k_maxIters && v3.length() - sigma > tolerance) {
      output2.iterations += 1;
      indexA = proxyA.getSupport(Rot.mulTVec2(xfA2.q, Vec2.neg(v3)));
      wA = Transform.mulVec2(xfA2, proxyA.getVertex(indexA));
      indexB = proxyB.getSupport(Rot.mulTVec2(xfB2.q, v3));
      wB = Transform.mulVec2(xfB2, proxyB.getVertex(indexB));
      var p2 = Vec2.sub(wA, wB);
      v3.normalize();
      var vp = Vec2.dot(v3, p2);
      var vr = Vec2.dot(v3, r2);
      if (vp - sigma > lambda * vr) {
        if (vr <= 0) {
          return false;
        }
        lambda = (vp - sigma) / vr;
        if (lambda > 1) {
          return false;
        }
        n2.setMul(-1, v3);
        simplex2.m_count = 0;
      }
      var vertex = vertices[simplex2.m_count];
      vertex.indexA = indexB;
      vertex.wA = Vec2.combine(1, wB, lambda, r2);
      vertex.indexB = indexA;
      vertex.wB = wA;
      vertex.w = Vec2.sub(vertex.wB, vertex.wA);
      vertex.a = 1;
      simplex2.m_count += 1;
      switch (simplex2.m_count) {
        case 1:
          break;
        case 2:
          simplex2.solve2();
          break;
        case 3:
          simplex2.solve3();
          break;
      }
      if (simplex2.m_count == 3) {
        return false;
      }
      v3.setVec2(simplex2.getClosestPoint());
      ++iter;
    }
    if (iter == 0) {
      return false;
    }
    var pointA2 = Vec2.zero();
    var pointB2 = Vec2.zero();
    simplex2.getWitnessPoints(pointB2, pointA2);
    if (v3.lengthSquared() > 0) {
      n2.setMul(-1, v3);
      n2.normalize();
    }
    output2.point = Vec2.combine(1, pointA2, radiusA, n2);
    output2.normal = n2;
    output2.lambda = lambda;
    output2.iterations = iter;
    return true;
  };
  var math_abs$7 = Math.abs;
  var math_max$3 = Math.max;
  var TOIInput = (
    /** @class */
    (function() {
      function TOIInput2() {
        this.proxyA = new DistanceProxy();
        this.proxyB = new DistanceProxy();
        this.sweepA = new Sweep();
        this.sweepB = new Sweep();
      }
      TOIInput2.prototype.recycle = function() {
        this.proxyA.recycle();
        this.proxyB.recycle();
        this.sweepA.recycle();
        this.sweepB.recycle();
        this.tMax = -1;
      };
      return TOIInput2;
    })()
  );
  exports2.TOIOutputState = void 0;
  (function(TOIOutputState2) {
    TOIOutputState2[TOIOutputState2["e_unset"] = -1] = "e_unset";
    TOIOutputState2[TOIOutputState2["e_unknown"] = 0] = "e_unknown";
    TOIOutputState2[TOIOutputState2["e_failed"] = 1] = "e_failed";
    TOIOutputState2[TOIOutputState2["e_overlapped"] = 2] = "e_overlapped";
    TOIOutputState2[TOIOutputState2["e_touching"] = 3] = "e_touching";
    TOIOutputState2[TOIOutputState2["e_separated"] = 4] = "e_separated";
  })(exports2.TOIOutputState || (exports2.TOIOutputState = {}));
  var TOIOutput = (
    /** @class */
    (function() {
      function TOIOutput2() {
        this.state = exports2.TOIOutputState.e_unset;
        this.t = -1;
      }
      TOIOutput2.prototype.recycle = function() {
        this.state = exports2.TOIOutputState.e_unset;
        this.t = -1;
      };
      return TOIOutput2;
    })()
  );
  stats.toiTime = 0;
  stats.toiMaxTime = 0;
  stats.toiCalls = 0;
  stats.toiIters = 0;
  stats.toiMaxIters = 0;
  stats.toiRootIters = 0;
  stats.toiMaxRootIters = 0;
  var distanceInput = new DistanceInput();
  var distanceOutput = new DistanceOutput();
  var cache = new SimplexCache();
  var xfA$1 = transform(0, 0, 0);
  var xfB$1 = transform(0, 0, 0);
  var temp$4 = vec2(0, 0);
  var pointA$2 = vec2(0, 0);
  var pointB$2 = vec2(0, 0);
  var normal$3 = vec2(0, 0);
  var axisA = vec2(0, 0);
  var axisB = vec2(0, 0);
  var localPointA = vec2(0, 0);
  var localPointB = vec2(0, 0);
  var TimeOfImpact = function(output2, input2) {
    var timer = Timer.now();
    ++stats.toiCalls;
    output2.state = exports2.TOIOutputState.e_unknown;
    output2.t = input2.tMax;
    var proxyA = input2.proxyA;
    var proxyB = input2.proxyB;
    var sweepA = input2.sweepA;
    var sweepB = input2.sweepB;
    sweepA.normalize();
    sweepB.normalize();
    if (!sweepA.isValid() || !sweepB.isValid()) {
      output2.state = exports2.TOIOutputState.e_failed;
      return;
    }
    var tMax = input2.tMax;
    var totalRadius = proxyA.m_radius + proxyB.m_radius;
    var target = math_max$3(SettingsInternal.linearSlop, totalRadius - 3 * SettingsInternal.linearSlop);
    var tolerance = 0.25 * SettingsInternal.linearSlop;
    var t1 = 0;
    var k_maxIterations = SettingsInternal.maxTOIIterations;
    var iter = 0;
    cache.recycle();
    distanceInput.proxyA.setVertices(proxyA.m_vertices, proxyA.m_count, proxyA.m_radius);
    distanceInput.proxyB.setVertices(proxyB.m_vertices, proxyB.m_count, proxyB.m_radius);
    distanceInput.useRadii = false;
    while (true) {
      sweepA.getTransform(xfA$1, t1);
      sweepB.getTransform(xfB$1, t1);
      copyTransform(distanceInput.transformA, xfA$1);
      copyTransform(distanceInput.transformB, xfB$1);
      Distance(distanceOutput, cache, distanceInput);
      if (distanceOutput.distance <= 0) {
        output2.state = exports2.TOIOutputState.e_overlapped;
        output2.t = 0;
        break;
      }
      if (distanceOutput.distance < target + tolerance) {
        output2.state = exports2.TOIOutputState.e_touching;
        output2.t = t1;
        break;
      }
      separationFunction.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
      var done = false;
      var t2 = tMax;
      var pushBackIter = 0;
      while (true) {
        var s2 = separationFunction.findMinSeparation(t2);
        if (s2 > target + tolerance) {
          output2.state = exports2.TOIOutputState.e_separated;
          output2.t = tMax;
          done = true;
          break;
        }
        if (s2 > target - tolerance) {
          t1 = t2;
          break;
        }
        var s1 = separationFunction.evaluate(t1);
        if (s1 < target - tolerance) {
          output2.state = exports2.TOIOutputState.e_failed;
          output2.t = t1;
          done = true;
          break;
        }
        if (s1 <= target + tolerance) {
          output2.state = exports2.TOIOutputState.e_touching;
          output2.t = t1;
          done = true;
          break;
        }
        var rootIterCount = 0;
        var a1 = t1;
        var a2 = t2;
        while (true) {
          var t3 = void 0;
          if (rootIterCount & 1) {
            t3 = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
          } else {
            t3 = 0.5 * (a1 + a2);
          }
          ++rootIterCount;
          ++stats.toiRootIters;
          var s3 = separationFunction.evaluate(t3);
          if (math_abs$7(s3 - target) < tolerance) {
            t2 = t3;
            break;
          }
          if (s3 > target) {
            a1 = t3;
            s1 = s3;
          } else {
            a2 = t3;
            s2 = s3;
          }
          if (rootIterCount === 50) {
            break;
          }
        }
        stats.toiMaxRootIters = math_max$3(stats.toiMaxRootIters, rootIterCount);
        ++pushBackIter;
        if (pushBackIter === SettingsInternal.maxPolygonVertices) {
          break;
        }
      }
      ++iter;
      ++stats.toiIters;
      if (done) {
        break;
      }
      if (iter === k_maxIterations) {
        output2.state = exports2.TOIOutputState.e_failed;
        output2.t = t1;
        break;
      }
    }
    stats.toiMaxIters = math_max$3(stats.toiMaxIters, iter);
    var time = Timer.diff(timer);
    stats.toiMaxTime = math_max$3(stats.toiMaxTime, time);
    stats.toiTime += time;
    separationFunction.recycle();
  };
  var SeparationFunctionType;
  (function(SeparationFunctionType2) {
    SeparationFunctionType2[SeparationFunctionType2["e_unset"] = -1] = "e_unset";
    SeparationFunctionType2[SeparationFunctionType2["e_points"] = 1] = "e_points";
    SeparationFunctionType2[SeparationFunctionType2["e_faceA"] = 2] = "e_faceA";
    SeparationFunctionType2[SeparationFunctionType2["e_faceB"] = 3] = "e_faceB";
  })(SeparationFunctionType || (SeparationFunctionType = {}));
  var SeparationFunction = (
    /** @class */
    (function() {
      function SeparationFunction2() {
        this.m_proxyA = null;
        this.m_proxyB = null;
        this.m_sweepA = null;
        this.m_sweepB = null;
        this.m_type = SeparationFunctionType.e_unset;
        this.m_localPoint = vec2(0, 0);
        this.m_axis = vec2(0, 0);
        this.indexA = -1;
        this.indexB = -1;
      }
      SeparationFunction2.prototype.recycle = function() {
        this.m_proxyA = null;
        this.m_proxyB = null;
        this.m_sweepA = null;
        this.m_sweepB = null;
        this.m_type = SeparationFunctionType.e_unset;
        zeroVec2(this.m_localPoint);
        zeroVec2(this.m_axis);
        this.indexA = -1;
        this.indexB = -1;
      };
      SeparationFunction2.prototype.initialize = function(cache2, proxyA, sweepA, proxyB, sweepB, t1) {
        var count = cache2.count;
        this.m_proxyA = proxyA;
        this.m_proxyB = proxyB;
        this.m_sweepA = sweepA;
        this.m_sweepB = sweepB;
        this.m_sweepA.getTransform(xfA$1, t1);
        this.m_sweepB.getTransform(xfB$1, t1);
        if (count === 1) {
          this.m_type = SeparationFunctionType.e_points;
          var localPointA_1 = this.m_proxyA.getVertex(cache2.indexA[0]);
          var localPointB_1 = this.m_proxyB.getVertex(cache2.indexB[0]);
          transformVec2$1(pointA$2, xfA$1, localPointA_1);
          transformVec2$1(pointB$2, xfB$1, localPointB_1);
          subVec2(this.m_axis, pointB$2, pointA$2);
          var s2 = normalizeVec2Length(this.m_axis);
          return s2;
        } else if (cache2.indexA[0] === cache2.indexA[1]) {
          this.m_type = SeparationFunctionType.e_faceB;
          var localPointB1 = proxyB.getVertex(cache2.indexB[0]);
          var localPointB2 = proxyB.getVertex(cache2.indexB[1]);
          crossVec2Num(this.m_axis, subVec2(temp$4, localPointB2, localPointB1), 1);
          normalizeVec2(this.m_axis);
          rotVec2(normal$3, xfB$1.q, this.m_axis);
          combine2Vec2(this.m_localPoint, 0.5, localPointB1, 0.5, localPointB2);
          transformVec2$1(pointB$2, xfB$1, this.m_localPoint);
          var localPointA_2 = proxyA.getVertex(cache2.indexA[0]);
          var pointA_1 = Transform.mulVec2(xfA$1, localPointA_2);
          var s2 = dotVec2(pointA_1, normal$3) - dotVec2(pointB$2, normal$3);
          if (s2 < 0) {
            negVec2(this.m_axis);
            s2 = -s2;
          }
          return s2;
        } else {
          this.m_type = SeparationFunctionType.e_faceA;
          var localPointA1 = this.m_proxyA.getVertex(cache2.indexA[0]);
          var localPointA2 = this.m_proxyA.getVertex(cache2.indexA[1]);
          crossVec2Num(this.m_axis, subVec2(temp$4, localPointA2, localPointA1), 1);
          normalizeVec2(this.m_axis);
          rotVec2(normal$3, xfA$1.q, this.m_axis);
          combine2Vec2(this.m_localPoint, 0.5, localPointA1, 0.5, localPointA2);
          transformVec2$1(pointA$2, xfA$1, this.m_localPoint);
          var localPointB_2 = this.m_proxyB.getVertex(cache2.indexB[0]);
          transformVec2$1(pointB$2, xfB$1, localPointB_2);
          var s2 = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
          if (s2 < 0) {
            negVec2(this.m_axis);
            s2 = -s2;
          }
          return s2;
        }
      };
      SeparationFunction2.prototype.compute = function(find, t2) {
        this.m_sweepA.getTransform(xfA$1, t2);
        this.m_sweepB.getTransform(xfB$1, t2);
        switch (this.m_type) {
          case SeparationFunctionType.e_points: {
            if (find) {
              derotVec2(axisA, xfA$1.q, this.m_axis);
              derotVec2(axisB, xfB$1.q, scaleVec2(temp$4, -1, this.m_axis));
              this.indexA = this.m_proxyA.getSupport(axisA);
              this.indexB = this.m_proxyB.getSupport(axisB);
            }
            copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
            copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
            transformVec2$1(pointA$2, xfA$1, localPointA);
            transformVec2$1(pointB$2, xfB$1, localPointB);
            var sep = dotVec2(pointB$2, this.m_axis) - dotVec2(pointA$2, this.m_axis);
            return sep;
          }
          case SeparationFunctionType.e_faceA: {
            rotVec2(normal$3, xfA$1.q, this.m_axis);
            transformVec2$1(pointA$2, xfA$1, this.m_localPoint);
            if (find) {
              derotVec2(axisB, xfB$1.q, scaleVec2(temp$4, -1, normal$3));
              this.indexA = -1;
              this.indexB = this.m_proxyB.getSupport(axisB);
            }
            copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
            transformVec2$1(pointB$2, xfB$1, localPointB);
            var sep = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
            return sep;
          }
          case SeparationFunctionType.e_faceB: {
            rotVec2(normal$3, xfB$1.q, this.m_axis);
            transformVec2$1(pointB$2, xfB$1, this.m_localPoint);
            if (find) {
              derotVec2(axisA, xfA$1.q, scaleVec2(temp$4, -1, normal$3));
              this.indexB = -1;
              this.indexA = this.m_proxyA.getSupport(axisA);
            }
            copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
            transformVec2$1(pointA$2, xfA$1, localPointA);
            var sep = dotVec2(pointA$2, normal$3) - dotVec2(pointB$2, normal$3);
            return sep;
          }
          default:
            if (find) {
              this.indexA = -1;
              this.indexB = -1;
            }
            return 0;
        }
      };
      SeparationFunction2.prototype.findMinSeparation = function(t2) {
        return this.compute(true, t2);
      };
      SeparationFunction2.prototype.evaluate = function(t2) {
        return this.compute(false, t2);
      };
      return SeparationFunction2;
    })()
  );
  var separationFunction = new SeparationFunction();
  TimeOfImpact.Input = TOIInput;
  TimeOfImpact.Output = TOIOutput;
  var math_abs$6 = Math.abs;
  var math_sqrt$3 = Math.sqrt;
  var math_min$5 = Math.min;
  var TimeStep = (
    /** @class */
    (function() {
      function TimeStep2() {
        this.dt = 0;
        this.inv_dt = 0;
        this.velocityIterations = 0;
        this.positionIterations = 0;
        this.warmStarting = false;
        this.blockSolve = true;
        this.inv_dt0 = 0;
        this.dtRatio = 1;
      }
      TimeStep2.prototype.reset = function(dt) {
        if (this.dt > 0) {
          this.inv_dt0 = this.inv_dt;
        }
        this.dt = dt;
        this.inv_dt = dt == 0 ? 0 : 1 / dt;
        this.dtRatio = dt * this.inv_dt0;
      };
      return TimeStep2;
    })()
  );
  var s_subStep = new TimeStep();
  var c$1 = vec2(0, 0);
  var v$1 = vec2(0, 0);
  var translation = vec2(0, 0);
  var input = new TOIInput();
  var output = new TOIOutput();
  var backup = new Sweep();
  var backup1 = new Sweep();
  var backup2 = new Sweep();
  var ContactImpulse = (
    /** @class */
    (function() {
      function ContactImpulse2(contact) {
        this.contact = contact;
        this.normals = [];
        this.tangents = [];
      }
      ContactImpulse2.prototype.recycle = function() {
        this.normals.length = 0;
        this.tangents.length = 0;
      };
      Object.defineProperty(ContactImpulse2.prototype, "normalImpulses", {
        get: function() {
          var contact = this.contact;
          var normals = this.normals;
          normals.length = 0;
          for (var p2 = 0; p2 < contact.v_points.length; ++p2) {
            normals.push(contact.v_points[p2].normalImpulse);
          }
          return normals;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ContactImpulse2.prototype, "tangentImpulses", {
        get: function() {
          var contact = this.contact;
          var tangents = this.tangents;
          tangents.length = 0;
          for (var p2 = 0; p2 < contact.v_points.length; ++p2) {
            tangents.push(contact.v_points[p2].tangentImpulse);
          }
          return tangents;
        },
        enumerable: false,
        configurable: true
      });
      return ContactImpulse2;
    })()
  );
  var Solver = (
    /** @class */
    (function() {
      function Solver2(world) {
        this.m_world = world;
        this.m_stack = [];
        this.m_bodies = [];
        this.m_contacts = [];
        this.m_joints = [];
      }
      Solver2.prototype.clear = function() {
        this.m_stack.length = 0;
        this.m_bodies.length = 0;
        this.m_contacts.length = 0;
        this.m_joints.length = 0;
      };
      Solver2.prototype.addBody = function(body) {
        this.m_bodies.push(body);
      };
      Solver2.prototype.addContact = function(contact) {
        this.m_contacts.push(contact);
      };
      Solver2.prototype.addJoint = function(joint) {
        this.m_joints.push(joint);
      };
      Solver2.prototype.solveWorld = function(step) {
        var world = this.m_world;
        for (var b2 = world.m_bodyList; b2; b2 = b2.m_next) {
          b2.m_islandFlag = false;
        }
        for (var c_1 = world.m_contactList; c_1; c_1 = c_1.m_next) {
          c_1.m_islandFlag = false;
        }
        for (var j2 = world.m_jointList; j2; j2 = j2.m_next) {
          j2.m_islandFlag = false;
        }
        var stack = this.m_stack;
        for (var seed = world.m_bodyList; seed; seed = seed.m_next) {
          if (seed.m_islandFlag) {
            continue;
          }
          if (seed.isAwake() == false || seed.isActive() == false) {
            continue;
          }
          if (seed.isStatic()) {
            continue;
          }
          this.clear();
          stack.push(seed);
          seed.m_islandFlag = true;
          while (stack.length > 0) {
            var b2 = stack.pop();
            this.addBody(b2);
            b2.m_awakeFlag = true;
            if (b2.isStatic()) {
              continue;
            }
            for (var ce = b2.m_contactList; ce; ce = ce.next) {
              var contact = ce.contact;
              if (contact.m_islandFlag) {
                continue;
              }
              if (contact.isEnabled() == false || contact.isTouching() == false) {
                continue;
              }
              var sensorA = contact.m_fixtureA.m_isSensor;
              var sensorB = contact.m_fixtureB.m_isSensor;
              if (sensorA || sensorB) {
                continue;
              }
              this.addContact(contact);
              contact.m_islandFlag = true;
              var other = ce.other;
              if (other.m_islandFlag) {
                continue;
              }
              stack.push(other);
              other.m_islandFlag = true;
            }
            for (var je = b2.m_jointList; je; je = je.next) {
              if (je.joint.m_islandFlag == true) {
                continue;
              }
              var other = je.other;
              if (other.isActive() == false) {
                continue;
              }
              this.addJoint(je.joint);
              je.joint.m_islandFlag = true;
              if (other.m_islandFlag) {
                continue;
              }
              stack.push(other);
              other.m_islandFlag = true;
            }
          }
          this.solveIsland(step);
          for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
            var b2 = this.m_bodies[i2];
            if (b2.isStatic()) {
              b2.m_islandFlag = false;
            }
          }
        }
      };
      Solver2.prototype.solveIsland = function(step) {
        var world = this.m_world;
        var gravity = world.m_gravity;
        var allowSleep = world.m_allowSleep;
        var h2 = step.dt;
        for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
          var body = this.m_bodies[i2];
          copyVec2(c$1, body.m_sweep.c);
          var a2 = body.m_sweep.a;
          copyVec2(v$1, body.m_linearVelocity);
          var w2 = body.m_angularVelocity;
          copyVec2(body.m_sweep.c0, body.m_sweep.c);
          body.m_sweep.a0 = body.m_sweep.a;
          if (body.isDynamic()) {
            plusScaleVec2(v$1, h2 * body.m_gravityScale, gravity);
            plusScaleVec2(v$1, h2 * body.m_invMass, body.m_force);
            w2 += h2 * body.m_invI * body.m_torque;
            scaleVec2(v$1, 1 / (1 + h2 * body.m_linearDamping), v$1);
            w2 *= 1 / (1 + h2 * body.m_angularDamping);
          }
          copyVec2(body.c_position.c, c$1);
          body.c_position.a = a2;
          copyVec2(body.c_velocity.v, v$1);
          body.c_velocity.w = w2;
        }
        for (var i2 = 0; i2 < this.m_contacts.length; ++i2) {
          var contact = this.m_contacts[i2];
          contact.initConstraint(step);
        }
        for (var i2 = 0; i2 < this.m_contacts.length; ++i2) {
          var contact = this.m_contacts[i2];
          contact.initVelocityConstraint(step);
        }
        if (step.warmStarting) {
          for (var i2 = 0; i2 < this.m_contacts.length; ++i2) {
            var contact = this.m_contacts[i2];
            contact.warmStartConstraint(step);
          }
        }
        for (var i2 = 0; i2 < this.m_joints.length; ++i2) {
          var joint = this.m_joints[i2];
          joint.initVelocityConstraints(step);
        }
        for (var i2 = 0; i2 < step.velocityIterations; ++i2) {
          for (var j2 = 0; j2 < this.m_joints.length; ++j2) {
            var joint = this.m_joints[j2];
            joint.solveVelocityConstraints(step);
          }
          for (var j2 = 0; j2 < this.m_contacts.length; ++j2) {
            var contact = this.m_contacts[j2];
            contact.solveVelocityConstraint(step);
          }
        }
        for (var i2 = 0; i2 < this.m_contacts.length; ++i2) {
          var contact = this.m_contacts[i2];
          contact.storeConstraintImpulses(step);
        }
        for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
          var body = this.m_bodies[i2];
          copyVec2(c$1, body.c_position.c);
          var a2 = body.c_position.a;
          copyVec2(v$1, body.c_velocity.v);
          var w2 = body.c_velocity.w;
          scaleVec2(translation, h2, v$1);
          var translationLengthSqr = lengthSqrVec2(translation);
          if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
            var ratio = SettingsInternal.maxTranslation / math_sqrt$3(translationLengthSqr);
            mulVec2(v$1, ratio);
          }
          var rotation2 = h2 * w2;
          if (rotation2 * rotation2 > SettingsInternal.maxRotationSquared) {
            var ratio = SettingsInternal.maxRotation / math_abs$6(rotation2);
            w2 *= ratio;
          }
          plusScaleVec2(c$1, h2, v$1);
          a2 += h2 * w2;
          copyVec2(body.c_position.c, c$1);
          body.c_position.a = a2;
          copyVec2(body.c_velocity.v, v$1);
          body.c_velocity.w = w2;
        }
        var positionSolved = false;
        for (var i2 = 0; i2 < step.positionIterations; ++i2) {
          var minSeparation = 0;
          for (var j2 = 0; j2 < this.m_contacts.length; ++j2) {
            var contact = this.m_contacts[j2];
            var separation = contact.solvePositionConstraint(step);
            minSeparation = math_min$5(minSeparation, separation);
          }
          var contactsOkay = minSeparation >= -3 * SettingsInternal.linearSlop;
          var jointsOkay = true;
          for (var j2 = 0; j2 < this.m_joints.length; ++j2) {
            var joint = this.m_joints[j2];
            var jointOkay = joint.solvePositionConstraints(step);
            jointsOkay = jointsOkay && jointOkay;
          }
          if (contactsOkay && jointsOkay) {
            positionSolved = true;
            break;
          }
        }
        for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
          var body = this.m_bodies[i2];
          copyVec2(body.m_sweep.c, body.c_position.c);
          body.m_sweep.a = body.c_position.a;
          copyVec2(body.m_linearVelocity, body.c_velocity.v);
          body.m_angularVelocity = body.c_velocity.w;
          body.synchronizeTransform();
        }
        this.postSolveIsland();
        if (allowSleep) {
          var minSleepTime = Infinity;
          var linTolSqr = SettingsInternal.linearSleepToleranceSqr;
          var angTolSqr = SettingsInternal.angularSleepToleranceSqr;
          for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
            var body = this.m_bodies[i2];
            if (body.isStatic()) {
              continue;
            }
            if (body.m_autoSleepFlag == false || body.m_angularVelocity * body.m_angularVelocity > angTolSqr || lengthSqrVec2(body.m_linearVelocity) > linTolSqr) {
              body.m_sleepTime = 0;
              minSleepTime = 0;
            } else {
              body.m_sleepTime += h2;
              minSleepTime = math_min$5(minSleepTime, body.m_sleepTime);
            }
          }
          if (minSleepTime >= SettingsInternal.timeToSleep && positionSolved) {
            for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
              var body = this.m_bodies[i2];
              body.setAwake(false);
            }
          }
        }
      };
      Solver2.prototype.solveWorldTOI = function(step) {
        var world = this.m_world;
        if (world.m_stepComplete) {
          for (var b2 = world.m_bodyList; b2; b2 = b2.m_next) {
            b2.m_islandFlag = false;
            b2.m_sweep.alpha0 = 0;
          }
          for (var c_2 = world.m_contactList; c_2; c_2 = c_2.m_next) {
            c_2.m_toiFlag = false;
            c_2.m_islandFlag = false;
            c_2.m_toiCount = 0;
            c_2.m_toi = 1;
          }
        }
        while (true) {
          var minContact = null;
          var minAlpha = 1;
          for (var c_3 = world.m_contactList; c_3; c_3 = c_3.m_next) {
            if (c_3.isEnabled() == false) {
              continue;
            }
            if (c_3.m_toiCount > SettingsInternal.maxSubSteps) {
              continue;
            }
            var alpha = 1;
            if (c_3.m_toiFlag) {
              alpha = c_3.m_toi;
            } else {
              var fA_1 = c_3.getFixtureA();
              var fB_1 = c_3.getFixtureB();
              if (fA_1.isSensor() || fB_1.isSensor()) {
                continue;
              }
              var bA_1 = fA_1.getBody();
              var bB_1 = fB_1.getBody();
              var activeA = bA_1.isAwake() && !bA_1.isStatic();
              var activeB = bB_1.isAwake() && !bB_1.isStatic();
              if (activeA == false && activeB == false) {
                continue;
              }
              var collideA = bA_1.isBullet() || !bA_1.isDynamic();
              var collideB = bB_1.isBullet() || !bB_1.isDynamic();
              if (collideA == false && collideB == false) {
                continue;
              }
              var alpha0 = bA_1.m_sweep.alpha0;
              if (bA_1.m_sweep.alpha0 < bB_1.m_sweep.alpha0) {
                alpha0 = bB_1.m_sweep.alpha0;
                bA_1.m_sweep.advance(alpha0);
              } else if (bB_1.m_sweep.alpha0 < bA_1.m_sweep.alpha0) {
                alpha0 = bA_1.m_sweep.alpha0;
                bB_1.m_sweep.advance(alpha0);
              }
              var indexA = c_3.getChildIndexA();
              var indexB = c_3.getChildIndexB();
              input.proxyA.set(fA_1.getShape(), indexA);
              input.proxyB.set(fB_1.getShape(), indexB);
              input.sweepA.set(bA_1.m_sweep);
              input.sweepB.set(bB_1.m_sweep);
              input.tMax = 1;
              TimeOfImpact(output, input);
              var beta = output.t;
              if (output.state == exports2.TOIOutputState.e_touching) {
                alpha = math_min$5(alpha0 + (1 - alpha0) * beta, 1);
              } else {
                alpha = 1;
              }
              c_3.m_toi = alpha;
              c_3.m_toiFlag = true;
            }
            if (alpha < minAlpha) {
              minContact = c_3;
              minAlpha = alpha;
            }
          }
          if (minContact == null || 1 - 10 * EPSILON < minAlpha) {
            world.m_stepComplete = true;
            break;
          }
          var fA = minContact.getFixtureA();
          var fB = minContact.getFixtureB();
          var bA = fA.getBody();
          var bB = fB.getBody();
          backup1.set(bA.m_sweep);
          backup2.set(bB.m_sweep);
          bA.advance(minAlpha);
          bB.advance(minAlpha);
          minContact.update(world);
          minContact.m_toiFlag = false;
          ++minContact.m_toiCount;
          if (minContact.isEnabled() == false || minContact.isTouching() == false) {
            minContact.setEnabled(false);
            bA.m_sweep.set(backup1);
            bB.m_sweep.set(backup2);
            bA.synchronizeTransform();
            bB.synchronizeTransform();
            continue;
          }
          bA.setAwake(true);
          bB.setAwake(true);
          this.clear();
          this.addBody(bA);
          this.addBody(bB);
          this.addContact(minContact);
          bA.m_islandFlag = true;
          bB.m_islandFlag = true;
          minContact.m_islandFlag = true;
          var bodies = [bA, bB];
          for (var i2 = 0; i2 < bodies.length; ++i2) {
            var body = bodies[i2];
            if (body.isDynamic()) {
              for (var ce = body.m_contactList; ce; ce = ce.next) {
                var contact = ce.contact;
                if (contact.m_islandFlag) {
                  continue;
                }
                var other = ce.other;
                if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                  continue;
                }
                var sensorA = contact.m_fixtureA.m_isSensor;
                var sensorB = contact.m_fixtureB.m_isSensor;
                if (sensorA || sensorB) {
                  continue;
                }
                backup.set(other.m_sweep);
                if (other.m_islandFlag == false) {
                  other.advance(minAlpha);
                }
                contact.update(world);
                if (contact.isEnabled() == false || contact.isTouching() == false) {
                  other.m_sweep.set(backup);
                  other.synchronizeTransform();
                  continue;
                }
                contact.m_islandFlag = true;
                this.addContact(contact);
                if (other.m_islandFlag) {
                  continue;
                }
                other.m_islandFlag = true;
                if (!other.isStatic()) {
                  other.setAwake(true);
                }
                this.addBody(other);
              }
            }
          }
          s_subStep.reset((1 - minAlpha) * step.dt);
          s_subStep.dtRatio = 1;
          s_subStep.positionIterations = 20;
          s_subStep.velocityIterations = step.velocityIterations;
          s_subStep.warmStarting = false;
          this.solveIslandTOI(s_subStep, bA, bB);
          for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
            var body = this.m_bodies[i2];
            body.m_islandFlag = false;
            if (!body.isDynamic()) {
              continue;
            }
            body.synchronizeFixtures();
            for (var ce = body.m_contactList; ce; ce = ce.next) {
              ce.contact.m_toiFlag = false;
              ce.contact.m_islandFlag = false;
            }
          }
          world.findNewContacts();
          if (world.m_subStepping) {
            world.m_stepComplete = false;
            break;
          }
        }
      };
      Solver2.prototype.solveIslandTOI = function(subStep, toiA, toiB) {
        for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
          var body = this.m_bodies[i2];
          copyVec2(body.c_position.c, body.m_sweep.c);
          body.c_position.a = body.m_sweep.a;
          copyVec2(body.c_velocity.v, body.m_linearVelocity);
          body.c_velocity.w = body.m_angularVelocity;
        }
        for (var i2 = 0; i2 < this.m_contacts.length; ++i2) {
          var contact = this.m_contacts[i2];
          contact.initConstraint(subStep);
        }
        for (var i2 = 0; i2 < subStep.positionIterations; ++i2) {
          var minSeparation = 0;
          for (var j2 = 0; j2 < this.m_contacts.length; ++j2) {
            var contact = this.m_contacts[j2];
            var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
            minSeparation = math_min$5(minSeparation, separation);
          }
          var contactsOkay = minSeparation >= -1.5 * SettingsInternal.linearSlop;
          if (contactsOkay) {
            break;
          }
        }
        var i2;
        copyVec2(toiA.m_sweep.c0, toiA.c_position.c);
        toiA.m_sweep.a0 = toiA.c_position.a;
        copyVec2(toiB.m_sweep.c0, toiB.c_position.c);
        toiB.m_sweep.a0 = toiB.c_position.a;
        for (var i2 = 0; i2 < this.m_contacts.length; ++i2) {
          var contact = this.m_contacts[i2];
          contact.initVelocityConstraint(subStep);
        }
        for (var i2 = 0; i2 < subStep.velocityIterations; ++i2) {
          for (var j2 = 0; j2 < this.m_contacts.length; ++j2) {
            var contact = this.m_contacts[j2];
            contact.solveVelocityConstraint(subStep);
          }
        }
        var h2 = subStep.dt;
        for (var i2 = 0; i2 < this.m_bodies.length; ++i2) {
          var body = this.m_bodies[i2];
          copyVec2(c$1, body.c_position.c);
          var a2 = body.c_position.a;
          copyVec2(v$1, body.c_velocity.v);
          var w2 = body.c_velocity.w;
          scaleVec2(translation, h2, v$1);
          var translationLengthSqr = lengthSqrVec2(translation);
          if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
            var ratio = SettingsInternal.maxTranslation / math_sqrt$3(translationLengthSqr);
            mulVec2(v$1, ratio);
          }
          var rotation2 = h2 * w2;
          if (rotation2 * rotation2 > SettingsInternal.maxRotationSquared) {
            var ratio = SettingsInternal.maxRotation / math_abs$6(rotation2);
            w2 *= ratio;
          }
          plusScaleVec2(c$1, h2, v$1);
          a2 += h2 * w2;
          copyVec2(body.c_position.c, c$1);
          body.c_position.a = a2;
          copyVec2(body.c_velocity.v, v$1);
          body.c_velocity.w = w2;
          copyVec2(body.m_sweep.c, c$1);
          body.m_sweep.a = a2;
          copyVec2(body.m_linearVelocity, v$1);
          body.m_angularVelocity = w2;
          body.synchronizeTransform();
        }
        this.postSolveIsland();
      };
      Solver2.prototype.postSolveIsland = function() {
        for (var c_5 = 0; c_5 < this.m_contacts.length; ++c_5) {
          var contact = this.m_contacts[c_5];
          this.m_world.postSolve(contact, contact.m_impulse);
        }
      };
      return Solver2;
    })()
  );
  Solver.TimeStep = TimeStep;
  var Mat22 = (
    /** @class */
    (function() {
      function Mat222(a2, b2, c2, d2) {
        if (typeof a2 === "object" && a2 !== null) {
          this.ex = Vec2.clone(a2);
          this.ey = Vec2.clone(b2);
        } else if (typeof a2 === "number") {
          this.ex = Vec2.neo(a2, c2);
          this.ey = Vec2.neo(b2, d2);
        } else {
          this.ex = Vec2.zero();
          this.ey = Vec2.zero();
        }
      }
      Mat222.prototype.toString = function() {
        return JSON.stringify(this);
      };
      Mat222.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
      };
      Mat222.assert = function(o2) {
      };
      Mat222.prototype.set = function(a2, b2, c2, d2) {
        if (typeof a2 === "number" && typeof b2 === "number" && typeof c2 === "number" && typeof d2 === "number") {
          this.ex.setNum(a2, c2);
          this.ey.setNum(b2, d2);
        } else if (typeof a2 === "object" && typeof b2 === "object") {
          this.ex.setVec2(a2);
          this.ey.setVec2(b2);
        } else if (typeof a2 === "object") {
          this.ex.setVec2(a2.ex);
          this.ey.setVec2(a2.ey);
        } else ;
      };
      Mat222.prototype.setIdentity = function() {
        this.ex.x = 1;
        this.ey.x = 0;
        this.ex.y = 0;
        this.ey.y = 1;
      };
      Mat222.prototype.setZero = function() {
        this.ex.x = 0;
        this.ey.x = 0;
        this.ex.y = 0;
        this.ey.y = 0;
      };
      Mat222.prototype.getInverse = function() {
        var a2 = this.ex.x;
        var b2 = this.ey.x;
        var c2 = this.ex.y;
        var d2 = this.ey.y;
        var det = a2 * d2 - b2 * c2;
        if (det !== 0) {
          det = 1 / det;
        }
        var imx = new Mat222();
        imx.ex.x = det * d2;
        imx.ey.x = -det * b2;
        imx.ex.y = -det * c2;
        imx.ey.y = det * a2;
        return imx;
      };
      Mat222.prototype.solve = function(v3) {
        var a2 = this.ex.x;
        var b2 = this.ey.x;
        var c2 = this.ex.y;
        var d2 = this.ey.y;
        var det = a2 * d2 - b2 * c2;
        if (det !== 0) {
          det = 1 / det;
        }
        var w2 = Vec2.zero();
        w2.x = det * (d2 * v3.x - b2 * v3.y);
        w2.y = det * (a2 * v3.y - c2 * v3.x);
        return w2;
      };
      Mat222.mul = function(mx, v3) {
        if (v3 && "x" in v3 && "y" in v3) {
          var x2 = mx.ex.x * v3.x + mx.ey.x * v3.y;
          var y2 = mx.ex.y * v3.x + mx.ey.y * v3.y;
          return Vec2.neo(x2, y2);
        } else if (v3 && "ex" in v3 && "ey" in v3) {
          var a2 = mx.ex.x * v3.ex.x + mx.ey.x * v3.ex.y;
          var b2 = mx.ex.x * v3.ey.x + mx.ey.x * v3.ey.y;
          var c2 = mx.ex.y * v3.ex.x + mx.ey.y * v3.ex.y;
          var d2 = mx.ex.y * v3.ey.x + mx.ey.y * v3.ey.y;
          return new Mat222(a2, b2, c2, d2);
        }
      };
      Mat222.mulVec2 = function(mx, v3) {
        var x2 = mx.ex.x * v3.x + mx.ey.x * v3.y;
        var y2 = mx.ex.y * v3.x + mx.ey.y * v3.y;
        return Vec2.neo(x2, y2);
      };
      Mat222.mulMat22 = function(mx, v3) {
        var a2 = mx.ex.x * v3.ex.x + mx.ey.x * v3.ex.y;
        var b2 = mx.ex.x * v3.ey.x + mx.ey.x * v3.ey.y;
        var c2 = mx.ex.y * v3.ex.x + mx.ey.y * v3.ex.y;
        var d2 = mx.ex.y * v3.ey.x + mx.ey.y * v3.ey.y;
        return new Mat222(a2, b2, c2, d2);
      };
      Mat222.mulT = function(mx, v3) {
        if (v3 && "x" in v3 && "y" in v3) {
          return Vec2.neo(Vec2.dot(v3, mx.ex), Vec2.dot(v3, mx.ey));
        } else if (v3 && "ex" in v3 && "ey" in v3) {
          var c1 = Vec2.neo(Vec2.dot(mx.ex, v3.ex), Vec2.dot(mx.ey, v3.ex));
          var c2 = Vec2.neo(Vec2.dot(mx.ex, v3.ey), Vec2.dot(mx.ey, v3.ey));
          return new Mat222(c1, c2);
        }
      };
      Mat222.mulTVec2 = function(mx, v3) {
        return Vec2.neo(Vec2.dot(v3, mx.ex), Vec2.dot(v3, mx.ey));
      };
      Mat222.mulTMat22 = function(mx, v3) {
        var c1 = Vec2.neo(Vec2.dot(mx.ex, v3.ex), Vec2.dot(mx.ey, v3.ex));
        var c2 = Vec2.neo(Vec2.dot(mx.ex, v3.ey), Vec2.dot(mx.ey, v3.ey));
        return new Mat222(c1, c2);
      };
      Mat222.abs = function(mx) {
        return new Mat222(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
      };
      Mat222.add = function(mx1, mx2) {
        return new Mat222(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
      };
      return Mat222;
    })()
  );
  var math_sqrt$2 = Math.sqrt;
  var pointA$1 = vec2(0, 0);
  var pointB$1 = vec2(0, 0);
  var temp$3 = vec2(0, 0);
  var cA$1 = vec2(0, 0);
  var cB$1 = vec2(0, 0);
  var dist = vec2(0, 0);
  var planePoint$2 = vec2(0, 0);
  var clipPoint$1 = vec2(0, 0);
  exports2.ManifoldType = void 0;
  (function(ManifoldType2) {
    ManifoldType2[ManifoldType2["e_unset"] = -1] = "e_unset";
    ManifoldType2[ManifoldType2["e_circles"] = 0] = "e_circles";
    ManifoldType2[ManifoldType2["e_faceA"] = 1] = "e_faceA";
    ManifoldType2[ManifoldType2["e_faceB"] = 2] = "e_faceB";
  })(exports2.ManifoldType || (exports2.ManifoldType = {}));
  exports2.ContactFeatureType = void 0;
  (function(ContactFeatureType2) {
    ContactFeatureType2[ContactFeatureType2["e_unset"] = -1] = "e_unset";
    ContactFeatureType2[ContactFeatureType2["e_vertex"] = 0] = "e_vertex";
    ContactFeatureType2[ContactFeatureType2["e_face"] = 1] = "e_face";
  })(exports2.ContactFeatureType || (exports2.ContactFeatureType = {}));
  exports2.PointState = void 0;
  (function(PointState2) {
    PointState2[PointState2["nullState"] = 0] = "nullState";
    PointState2[PointState2["addState"] = 1] = "addState";
    PointState2[PointState2["persistState"] = 2] = "persistState";
    PointState2[PointState2["removeState"] = 3] = "removeState";
  })(exports2.PointState || (exports2.PointState = {}));
  var ClipVertex = (
    /** @class */
    (function() {
      function ClipVertex2() {
        this.v = vec2(0, 0);
        this.id = new ContactID();
      }
      ClipVertex2.prototype.set = function(o2) {
        copyVec2(this.v, o2.v);
        this.id.set(o2.id);
      };
      ClipVertex2.prototype.recycle = function() {
        zeroVec2(this.v);
        this.id.recycle();
      };
      return ClipVertex2;
    })()
  );
  var Manifold = (
    /** @class */
    (function() {
      function Manifold2() {
        this.localNormal = vec2(0, 0);
        this.localPoint = vec2(0, 0);
        this.points = [new ManifoldPoint(), new ManifoldPoint()];
        this.pointCount = 0;
      }
      Manifold2.prototype.set = function(that) {
        this.type = that.type;
        copyVec2(this.localNormal, that.localNormal);
        copyVec2(this.localPoint, that.localPoint);
        this.pointCount = that.pointCount;
        this.points[0].set(that.points[0]);
        this.points[1].set(that.points[1]);
      };
      Manifold2.prototype.recycle = function() {
        this.type = exports2.ManifoldType.e_unset;
        zeroVec2(this.localNormal);
        zeroVec2(this.localPoint);
        this.pointCount = 0;
        this.points[0].recycle();
        this.points[1].recycle();
      };
      Manifold2.prototype.getWorldManifold = function(wm, xfA2, radiusA, xfB2, radiusB) {
        if (this.pointCount == 0) {
          return wm;
        }
        wm = wm || new WorldManifold();
        wm.pointCount = this.pointCount;
        var normal3 = wm.normal;
        var points = wm.points;
        var separations = wm.separations;
        switch (this.type) {
          case exports2.ManifoldType.e_circles: {
            setVec2(normal3, 1, 0);
            var manifoldPoint = this.points[0];
            transformVec2$1(pointA$1, xfA2, this.localPoint);
            transformVec2$1(pointB$1, xfB2, manifoldPoint.localPoint);
            subVec2(dist, pointB$1, pointA$1);
            var lengthSqr = lengthSqrVec2(dist);
            if (lengthSqr > EPSILON * EPSILON) {
              var length_1 = math_sqrt$2(lengthSqr);
              scaleVec2(normal3, 1 / length_1, dist);
            }
            combine2Vec2(cA$1, 1, pointA$1, radiusA, normal3);
            combine2Vec2(cB$1, 1, pointB$1, -radiusB, normal3);
            combine2Vec2(points[0], 0.5, cA$1, 0.5, cB$1);
            separations[0] = dotVec2(subVec2(temp$3, cB$1, cA$1), normal3);
            break;
          }
          case exports2.ManifoldType.e_faceA: {
            rotVec2(normal3, xfA2.q, this.localNormal);
            transformVec2$1(planePoint$2, xfA2, this.localPoint);
            for (var i2 = 0; i2 < this.pointCount; ++i2) {
              var manifoldPoint = this.points[i2];
              transformVec2$1(clipPoint$1, xfB2, manifoldPoint.localPoint);
              combine2Vec2(cA$1, 1, clipPoint$1, radiusA - dotVec2(subVec2(temp$3, clipPoint$1, planePoint$2), normal3), normal3);
              combine2Vec2(cB$1, 1, clipPoint$1, -radiusB, normal3);
              combine2Vec2(points[i2], 0.5, cA$1, 0.5, cB$1);
              separations[i2] = dotVec2(subVec2(temp$3, cB$1, cA$1), normal3);
            }
            break;
          }
          case exports2.ManifoldType.e_faceB: {
            rotVec2(normal3, xfB2.q, this.localNormal);
            transformVec2$1(planePoint$2, xfB2, this.localPoint);
            for (var i2 = 0; i2 < this.pointCount; ++i2) {
              var manifoldPoint = this.points[i2];
              transformVec2$1(clipPoint$1, xfA2, manifoldPoint.localPoint);
              combine2Vec2(cB$1, 1, clipPoint$1, radiusB - dotVec2(subVec2(temp$3, clipPoint$1, planePoint$2), normal3), normal3);
              combine2Vec2(cA$1, 1, clipPoint$1, -radiusA, normal3);
              combine2Vec2(points[i2], 0.5, cA$1, 0.5, cB$1);
              separations[i2] = dotVec2(subVec2(temp$3, cA$1, cB$1), normal3);
            }
            negVec2(normal3);
            break;
          }
        }
        return wm;
      };
      Manifold2.clipSegmentToLine = clipSegmentToLine;
      Manifold2.ClipVertex = ClipVertex;
      Manifold2.getPointStates = getPointStates;
      Manifold2.PointState = exports2.PointState;
      return Manifold2;
    })()
  );
  var ManifoldPoint = (
    /** @class */
    (function() {
      function ManifoldPoint2() {
        this.localPoint = vec2(0, 0);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.id = new ContactID();
      }
      ManifoldPoint2.prototype.set = function(that) {
        copyVec2(this.localPoint, that.localPoint);
        this.normalImpulse = that.normalImpulse;
        this.tangentImpulse = that.tangentImpulse;
        this.id.set(that.id);
      };
      ManifoldPoint2.prototype.recycle = function() {
        zeroVec2(this.localPoint);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.id.recycle();
      };
      return ManifoldPoint2;
    })()
  );
  var ContactID = (
    /** @class */
    (function() {
      function ContactID2() {
        this.key = -1;
        this.indexA = -1;
        this.indexB = -1;
        this.typeA = exports2.ContactFeatureType.e_unset;
        this.typeB = exports2.ContactFeatureType.e_unset;
      }
      ContactID2.prototype.setFeatures = function(indexA, typeA, indexB, typeB) {
        this.indexA = indexA;
        this.indexB = indexB;
        this.typeA = typeA;
        this.typeB = typeB;
        this.key = this.indexA + this.indexB * 256 + this.typeA * 65536 + this.typeB * 16777216;
      };
      ContactID2.prototype.set = function(that) {
        this.indexA = that.indexA;
        this.indexB = that.indexB;
        this.typeA = that.typeA;
        this.typeB = that.typeB;
        this.key = this.indexA + this.indexB * 256 + this.typeA * 65536 + this.typeB * 16777216;
      };
      ContactID2.prototype.swapFeatures = function() {
        var indexA = this.indexA;
        var indexB = this.indexB;
        var typeA = this.typeA;
        var typeB = this.typeB;
        this.indexA = indexB;
        this.indexB = indexA;
        this.typeA = typeB;
        this.typeB = typeA;
        this.key = this.indexA + this.indexB * 256 + this.typeA * 65536 + this.typeB * 16777216;
      };
      ContactID2.prototype.recycle = function() {
        this.indexA = 0;
        this.indexB = 0;
        this.typeA = exports2.ContactFeatureType.e_unset;
        this.typeB = exports2.ContactFeatureType.e_unset;
        this.key = -1;
      };
      return ContactID2;
    })()
  );
  var WorldManifold = (
    /** @class */
    (function() {
      function WorldManifold2() {
        this.normal = vec2(0, 0);
        this.points = [vec2(0, 0), vec2(0, 0)];
        this.separations = [0, 0];
        this.pointCount = 0;
      }
      WorldManifold2.prototype.recycle = function() {
        zeroVec2(this.normal);
        zeroVec2(this.points[0]);
        zeroVec2(this.points[1]);
        this.separations[0] = 0;
        this.separations[1] = 0;
        this.pointCount = 0;
      };
      return WorldManifold2;
    })()
  );
  function getPointStates(state1, state2, manifold1, manifold2) {
    for (var i2 = 0; i2 < manifold1.pointCount; ++i2) {
      var id = manifold1.points[i2].id;
      state1[i2] = exports2.PointState.removeState;
      for (var j2 = 0; j2 < manifold2.pointCount; ++j2) {
        if (manifold2.points[j2].id.key === id.key) {
          state1[i2] = exports2.PointState.persistState;
          break;
        }
      }
    }
    for (var i2 = 0; i2 < manifold2.pointCount; ++i2) {
      var id = manifold2.points[i2].id;
      state2[i2] = exports2.PointState.addState;
      for (var j2 = 0; j2 < manifold1.pointCount; ++j2) {
        if (manifold1.points[j2].id.key === id.key) {
          state2[i2] = exports2.PointState.persistState;
          break;
        }
      }
    }
  }
  function clipSegmentToLine(vOut, vIn, normal3, offset, vertexIndexA) {
    var numOut = 0;
    var distance0 = dotVec2(normal3, vIn[0].v) - offset;
    var distance1 = dotVec2(normal3, vIn[1].v) - offset;
    if (distance0 <= 0)
      vOut[numOut++].set(vIn[0]);
    if (distance1 <= 0)
      vOut[numOut++].set(vIn[1]);
    if (distance0 * distance1 < 0) {
      var interp = distance0 / (distance0 - distance1);
      combine2Vec2(vOut[numOut].v, 1 - interp, vIn[0].v, interp, vIn[1].v);
      vOut[numOut].id.setFeatures(vertexIndexA, exports2.ContactFeatureType.e_vertex, vIn[0].id.indexB, exports2.ContactFeatureType.e_face);
      ++numOut;
    }
    return numOut;
  }
  var math_sqrt$1 = Math.sqrt;
  var math_max$2 = Math.max;
  var math_min$4 = Math.min;
  var contactPool = new Pool({
    create: function() {
      return new Contact();
    },
    release: function(contact) {
      contact.recycle();
    }
  });
  var oldManifold = new Manifold();
  var worldManifold = new WorldManifold();
  var ContactEdge = (
    /** @class */
    (function() {
      function ContactEdge2(contact) {
        this.prev = null;
        this.next = null;
        this.other = null;
        this.contact = contact;
      }
      ContactEdge2.prototype.recycle = function() {
        this.prev = null;
        this.next = null;
        this.other = null;
      };
      return ContactEdge2;
    })()
  );
  function mixFriction(friction1, friction2) {
    return math_sqrt$1(friction1 * friction2);
  }
  function mixRestitution(restitution1, restitution2) {
    return restitution1 > restitution2 ? restitution1 : restitution2;
  }
  var s_registers = [];
  var VelocityConstraintPoint = (
    /** @class */
    (function() {
      function VelocityConstraintPoint2() {
        this.rA = vec2(0, 0);
        this.rB = vec2(0, 0);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.normalMass = 0;
        this.tangentMass = 0;
        this.velocityBias = 0;
      }
      VelocityConstraintPoint2.prototype.recycle = function() {
        zeroVec2(this.rA);
        zeroVec2(this.rB);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.normalMass = 0;
        this.tangentMass = 0;
        this.velocityBias = 0;
      };
      return VelocityConstraintPoint2;
    })()
  );
  var cA = vec2(0, 0);
  var vA = vec2(0, 0);
  var cB = vec2(0, 0);
  var vB = vec2(0, 0);
  var tangent$1 = vec2(0, 0);
  var xfA = transform(0, 0, 0);
  var xfB = transform(0, 0, 0);
  var pointA = vec2(0, 0);
  var pointB = vec2(0, 0);
  var clipPoint = vec2(0, 0);
  var planePoint$1 = vec2(0, 0);
  var rA = vec2(0, 0);
  var rB = vec2(0, 0);
  var P$1 = vec2(0, 0);
  var normal$2 = vec2(0, 0);
  var point = vec2(0, 0);
  var dv = vec2(0, 0);
  var dv1 = vec2(0, 0);
  var dv2 = vec2(0, 0);
  var b$1 = vec2(0, 0);
  var a$1 = vec2(0, 0);
  var x$1 = vec2(0, 0);
  var d$1 = vec2(0, 0);
  var P1 = vec2(0, 0);
  var P2 = vec2(0, 0);
  var temp$2 = vec2(0, 0);
  var Contact = (
    /** @class */
    (function() {
      function Contact2() {
        this.m_nodeA = new ContactEdge(this);
        this.m_nodeB = new ContactEdge(this);
        this.m_fixtureA = null;
        this.m_fixtureB = null;
        this.m_indexA = -1;
        this.m_indexB = -1;
        this.m_evaluateFcn = null;
        this.m_manifold = new Manifold();
        this.m_prev = null;
        this.m_next = null;
        this.m_toi = 1;
        this.m_toiCount = 0;
        this.m_toiFlag = false;
        this.m_friction = 0;
        this.m_restitution = 0;
        this.m_tangentSpeed = 0;
        this.m_enabledFlag = true;
        this.m_islandFlag = false;
        this.m_touchingFlag = false;
        this.m_filterFlag = false;
        this.m_bulletHitFlag = false;
        this.m_impulse = new ContactImpulse(this);
        this.v_points = [new VelocityConstraintPoint(), new VelocityConstraintPoint()];
        this.v_normal = vec2(0, 0);
        this.v_normalMass = new Mat22();
        this.v_K = new Mat22();
        this.v_pointCount = 0;
        this.v_tangentSpeed = 0;
        this.v_friction = 0;
        this.v_restitution = 0;
        this.v_invMassA = 0;
        this.v_invMassB = 0;
        this.v_invIA = 0;
        this.v_invIB = 0;
        this.p_localPoints = [vec2(0, 0), vec2(0, 0)];
        this.p_localNormal = vec2(0, 0);
        this.p_localPoint = vec2(0, 0);
        this.p_localCenterA = vec2(0, 0);
        this.p_localCenterB = vec2(0, 0);
        this.p_type = exports2.ManifoldType.e_unset;
        this.p_radiusA = 0;
        this.p_radiusB = 0;
        this.p_pointCount = 0;
        this.p_invMassA = 0;
        this.p_invMassB = 0;
        this.p_invIA = 0;
        this.p_invIB = 0;
      }
      Contact2.prototype.initialize = function(fA, indexA, fB, indexB, evaluateFcn) {
        this.m_fixtureA = fA;
        this.m_fixtureB = fB;
        this.m_indexA = indexA;
        this.m_indexB = indexB;
        this.m_evaluateFcn = evaluateFcn;
        this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
        this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
      };
      Contact2.prototype.recycle = function() {
        this.m_nodeA.recycle();
        this.m_nodeB.recycle();
        this.m_fixtureA = null;
        this.m_fixtureB = null;
        this.m_indexA = -1;
        this.m_indexB = -1;
        this.m_evaluateFcn = null;
        this.m_manifold.recycle();
        this.m_prev = null;
        this.m_next = null;
        this.m_toi = 1;
        this.m_toiCount = 0;
        this.m_toiFlag = false;
        this.m_friction = 0;
        this.m_restitution = 0;
        this.m_tangentSpeed = 0;
        this.m_enabledFlag = true;
        this.m_islandFlag = false;
        this.m_touchingFlag = false;
        this.m_filterFlag = false;
        this.m_bulletHitFlag = false;
        this.m_impulse.recycle();
        for (var _i = 0, _a2 = this.v_points; _i < _a2.length; _i++) {
          var point_1 = _a2[_i];
          point_1.recycle();
        }
        zeroVec2(this.v_normal);
        this.v_normalMass.setZero();
        this.v_K.setZero();
        this.v_pointCount = 0;
        this.v_tangentSpeed = 0;
        this.v_friction = 0;
        this.v_restitution = 0;
        this.v_invMassA = 0;
        this.v_invMassB = 0;
        this.v_invIA = 0;
        this.v_invIB = 0;
        for (var _b = 0, _c = this.p_localPoints; _b < _c.length; _b++) {
          var point_2 = _c[_b];
          zeroVec2(point_2);
        }
        zeroVec2(this.p_localNormal);
        zeroVec2(this.p_localPoint);
        zeroVec2(this.p_localCenterA);
        zeroVec2(this.p_localCenterB);
        this.p_type = exports2.ManifoldType.e_unset;
        this.p_radiusA = 0;
        this.p_radiusB = 0;
        this.p_pointCount = 0;
        this.p_invMassA = 0;
        this.p_invMassB = 0;
        this.p_invIA = 0;
        this.p_invIB = 0;
      };
      Contact2.prototype.initConstraint = function(step) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        var shapeA = fixtureA.m_shape;
        var shapeB = fixtureB.m_shape;
        if (shapeA === null || shapeB === null)
          return;
        var manifold = this.m_manifold;
        var pointCount = manifold.pointCount;
        this.v_invMassA = bodyA.m_invMass;
        this.v_invMassB = bodyB.m_invMass;
        this.v_invIA = bodyA.m_invI;
        this.v_invIB = bodyB.m_invI;
        this.v_friction = this.m_friction;
        this.v_restitution = this.m_restitution;
        this.v_tangentSpeed = this.m_tangentSpeed;
        this.v_pointCount = pointCount;
        this.v_K.setZero();
        this.v_normalMass.setZero();
        this.p_invMassA = bodyA.m_invMass;
        this.p_invMassB = bodyB.m_invMass;
        this.p_invIA = bodyA.m_invI;
        this.p_invIB = bodyB.m_invI;
        copyVec2(this.p_localCenterA, bodyA.m_sweep.localCenter);
        copyVec2(this.p_localCenterB, bodyB.m_sweep.localCenter);
        this.p_radiusA = shapeA.m_radius;
        this.p_radiusB = shapeB.m_radius;
        this.p_type = manifold.type;
        copyVec2(this.p_localNormal, manifold.localNormal);
        copyVec2(this.p_localPoint, manifold.localPoint);
        this.p_pointCount = pointCount;
        for (var j2 = 0; j2 < SettingsInternal.maxManifoldPoints; ++j2) {
          this.v_points[j2].recycle();
          zeroVec2(this.p_localPoints[j2]);
        }
        for (var j2 = 0; j2 < pointCount; ++j2) {
          var cp = manifold.points[j2];
          var vcp = this.v_points[j2];
          if (step.warmStarting) {
            vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
            vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
          }
          copyVec2(this.p_localPoints[j2], cp.localPoint);
        }
      };
      Contact2.prototype.getManifold = function() {
        return this.m_manifold;
      };
      Contact2.prototype.getWorldManifold = function(worldManifold2) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        var shapeA = fixtureA.m_shape;
        var shapeB = fixtureB.m_shape;
        if (shapeA === null || shapeB === null)
          return;
        return this.m_manifold.getWorldManifold(worldManifold2, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
      };
      Contact2.prototype.setEnabled = function(flag) {
        this.m_enabledFlag = !!flag;
      };
      Contact2.prototype.isEnabled = function() {
        return this.m_enabledFlag;
      };
      Contact2.prototype.isTouching = function() {
        return this.m_touchingFlag;
      };
      Contact2.prototype.getNext = function() {
        return this.m_next;
      };
      Contact2.prototype.getFixtureA = function() {
        return this.m_fixtureA;
      };
      Contact2.prototype.getFixtureB = function() {
        return this.m_fixtureB;
      };
      Contact2.prototype.getChildIndexA = function() {
        return this.m_indexA;
      };
      Contact2.prototype.getChildIndexB = function() {
        return this.m_indexB;
      };
      Contact2.prototype.flagForFiltering = function() {
        this.m_filterFlag = true;
      };
      Contact2.prototype.setFriction = function(friction) {
        this.m_friction = friction;
      };
      Contact2.prototype.getFriction = function() {
        return this.m_friction;
      };
      Contact2.prototype.resetFriction = function() {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        this.m_friction = mixFriction(fixtureA.m_friction, fixtureB.m_friction);
      };
      Contact2.prototype.setRestitution = function(restitution) {
        this.m_restitution = restitution;
      };
      Contact2.prototype.getRestitution = function() {
        return this.m_restitution;
      };
      Contact2.prototype.resetRestitution = function() {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        this.m_restitution = mixRestitution(fixtureA.m_restitution, fixtureB.m_restitution);
      };
      Contact2.prototype.setTangentSpeed = function(speed) {
        this.m_tangentSpeed = speed;
      };
      Contact2.prototype.getTangentSpeed = function() {
        return this.m_tangentSpeed;
      };
      Contact2.prototype.evaluate = function(manifold, xfA2, xfB2) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        this.m_evaluateFcn(manifold, xfA2, fixtureA, this.m_indexA, xfB2, fixtureB, this.m_indexB);
      };
      Contact2.prototype.update = function(listener) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        var shapeA = fixtureA.m_shape;
        var shapeB = fixtureB.m_shape;
        if (shapeA === null || shapeB === null)
          return;
        this.m_enabledFlag = true;
        var touching = false;
        var wasTouching = this.m_touchingFlag;
        var sensorA = fixtureA.m_isSensor;
        var sensorB = fixtureB.m_isSensor;
        var sensor = sensorA || sensorB;
        var xfA2 = bodyA.m_xf;
        var xfB2 = bodyB.m_xf;
        if (sensor) {
          touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA2, xfB2);
          this.m_manifold.pointCount = 0;
        } else {
          oldManifold.recycle();
          oldManifold.set(this.m_manifold);
          this.m_manifold.recycle();
          this.evaluate(this.m_manifold, xfA2, xfB2);
          touching = this.m_manifold.pointCount > 0;
          for (var i2 = 0; i2 < this.m_manifold.pointCount; ++i2) {
            var nmp = this.m_manifold.points[i2];
            nmp.normalImpulse = 0;
            nmp.tangentImpulse = 0;
            for (var j2 = 0; j2 < oldManifold.pointCount; ++j2) {
              var omp = oldManifold.points[j2];
              if (omp.id.key === nmp.id.key) {
                nmp.normalImpulse = omp.normalImpulse;
                nmp.tangentImpulse = omp.tangentImpulse;
                break;
              }
            }
          }
          if (touching !== wasTouching) {
            bodyA.setAwake(true);
            bodyB.setAwake(true);
          }
        }
        this.m_touchingFlag = touching;
        var hasListener = typeof listener === "object" && listener !== null;
        if (!wasTouching && touching && hasListener) {
          listener.beginContact(this);
        }
        if (wasTouching && !touching && hasListener) {
          listener.endContact(this);
        }
        if (!sensor && touching && hasListener && oldManifold) {
          listener.preSolve(this, oldManifold);
        }
      };
      Contact2.prototype.solvePositionConstraint = function(step) {
        return this._solvePositionConstraint(step, null, null);
      };
      Contact2.prototype.solvePositionConstraintTOI = function(step, toiA, toiB) {
        return this._solvePositionConstraint(step, toiA, toiB);
      };
      Contact2.prototype._solvePositionConstraint = function(step, toiA, toiB) {
        var toi = toiA !== null && toiB !== null ? true : false;
        var minSeparation = 0;
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return minSeparation;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return minSeparation;
        var positionA = bodyA.c_position;
        var positionB = bodyB.c_position;
        var localCenterA = this.p_localCenterA;
        var localCenterB = this.p_localCenterB;
        var mA = 0;
        var iA = 0;
        if (!toi || bodyA === toiA || bodyA === toiB) {
          mA = this.p_invMassA;
          iA = this.p_invIA;
        }
        var mB = 0;
        var iB = 0;
        if (!toi || bodyB === toiA || bodyB === toiB) {
          mB = this.p_invMassB;
          iB = this.p_invIB;
        }
        copyVec2(cA, positionA.c);
        var aA = positionA.a;
        copyVec2(cB, positionB.c);
        var aB = positionB.a;
        for (var j2 = 0; j2 < this.p_pointCount; ++j2) {
          getTransform(xfA, localCenterA, cA, aA);
          getTransform(xfB, localCenterB, cB, aB);
          var separation = void 0;
          switch (this.p_type) {
            case exports2.ManifoldType.e_circles: {
              transformVec2$1(pointA, xfA, this.p_localPoint);
              transformVec2$1(pointB, xfB, this.p_localPoints[0]);
              subVec2(normal$2, pointB, pointA);
              normalizeVec2(normal$2);
              combine2Vec2(point, 0.5, pointA, 0.5, pointB);
              separation = dotVec2(pointB, normal$2) - dotVec2(pointA, normal$2) - this.p_radiusA - this.p_radiusB;
              break;
            }
            case exports2.ManifoldType.e_faceA: {
              rotVec2(normal$2, xfA.q, this.p_localNormal);
              transformVec2$1(planePoint$1, xfA, this.p_localPoint);
              transformVec2$1(clipPoint, xfB, this.p_localPoints[j2]);
              separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
              copyVec2(point, clipPoint);
              break;
            }
            case exports2.ManifoldType.e_faceB: {
              rotVec2(normal$2, xfB.q, this.p_localNormal);
              transformVec2$1(planePoint$1, xfB, this.p_localPoint);
              transformVec2$1(clipPoint, xfA, this.p_localPoints[j2]);
              separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
              copyVec2(point, clipPoint);
              negVec2(normal$2);
              break;
            }
            // todo: what should we do here?
            default: {
              return minSeparation;
            }
          }
          subVec2(rA, point, cA);
          subVec2(rB, point, cB);
          minSeparation = math_min$4(minSeparation, separation);
          var baumgarte = toi ? SettingsInternal.toiBaugarte : SettingsInternal.baumgarte;
          var linearSlop = SettingsInternal.linearSlop;
          var maxLinearCorrection = SettingsInternal.maxLinearCorrection;
          var C = clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0);
          var rnA = crossVec2Vec2(rA, normal$2);
          var rnB = crossVec2Vec2(rB, normal$2);
          var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
          var impulse = K > 0 ? -C / K : 0;
          scaleVec2(P$1, impulse, normal$2);
          minusScaleVec2(cA, mA, P$1);
          aA -= iA * crossVec2Vec2(rA, P$1);
          plusScaleVec2(cB, mB, P$1);
          aB += iB * crossVec2Vec2(rB, P$1);
        }
        copyVec2(positionA.c, cA);
        positionA.a = aA;
        copyVec2(positionB.c, cB);
        positionB.a = aB;
        return minSeparation;
      };
      Contact2.prototype.initVelocityConstraint = function(step) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        var velocityA = bodyA.c_velocity;
        var velocityB = bodyB.c_velocity;
        var positionA = bodyA.c_position;
        var positionB = bodyB.c_position;
        var radiusA = this.p_radiusA;
        var radiusB = this.p_radiusB;
        var manifold = this.m_manifold;
        var mA = this.v_invMassA;
        var mB = this.v_invMassB;
        var iA = this.v_invIA;
        var iB = this.v_invIB;
        var localCenterA = this.p_localCenterA;
        var localCenterB = this.p_localCenterB;
        copyVec2(cA, positionA.c);
        var aA = positionA.a;
        copyVec2(vA, velocityA.v);
        var wA = velocityA.w;
        copyVec2(cB, positionB.c);
        var aB = positionB.a;
        copyVec2(vB, velocityB.v);
        var wB = velocityB.w;
        getTransform(xfA, localCenterA, cA, aA);
        getTransform(xfB, localCenterB, cB, aB);
        worldManifold.recycle();
        manifold.getWorldManifold(worldManifold, xfA, radiusA, xfB, radiusB);
        copyVec2(this.v_normal, worldManifold.normal);
        for (var j2 = 0; j2 < this.v_pointCount; ++j2) {
          var vcp = this.v_points[j2];
          var wmp = worldManifold.points[j2];
          subVec2(vcp.rA, wmp, cA);
          subVec2(vcp.rB, wmp, cB);
          var rnA = crossVec2Vec2(vcp.rA, this.v_normal);
          var rnB = crossVec2Vec2(vcp.rB, this.v_normal);
          var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
          vcp.normalMass = kNormal > 0 ? 1 / kNormal : 0;
          crossVec2Num(tangent$1, this.v_normal, 1);
          var rtA = crossVec2Vec2(vcp.rA, tangent$1);
          var rtB = crossVec2Vec2(vcp.rB, tangent$1);
          var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
          vcp.tangentMass = kTangent > 0 ? 1 / kTangent : 0;
          vcp.velocityBias = 0;
          var vRel = 0;
          vRel += dotVec2(this.v_normal, vB);
          vRel += dotVec2(this.v_normal, crossNumVec2(temp$2, wB, vcp.rB));
          vRel -= dotVec2(this.v_normal, vA);
          vRel -= dotVec2(this.v_normal, crossNumVec2(temp$2, wA, vcp.rA));
          if (vRel < -SettingsInternal.velocityThreshold) {
            vcp.velocityBias = -this.v_restitution * vRel;
          }
        }
        if (this.v_pointCount == 2 && step.blockSolve) {
          var vcp1 = this.v_points[0];
          var vcp2 = this.v_points[1];
          var rn1A = crossVec2Vec2(vcp1.rA, this.v_normal);
          var rn1B = crossVec2Vec2(vcp1.rB, this.v_normal);
          var rn2A = crossVec2Vec2(vcp2.rA, this.v_normal);
          var rn2B = crossVec2Vec2(vcp2.rB, this.v_normal);
          var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
          var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
          var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
          var k_maxConditionNumber = 1e3;
          if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
            this.v_K.ex.setNum(k11, k12);
            this.v_K.ey.setNum(k12, k22);
            var a_1 = this.v_K.ex.x;
            var b_1 = this.v_K.ey.x;
            var c2 = this.v_K.ex.y;
            var d_1 = this.v_K.ey.y;
            var det = a_1 * d_1 - b_1 * c2;
            if (det !== 0) {
              det = 1 / det;
            }
            this.v_normalMass.ex.x = det * d_1;
            this.v_normalMass.ey.x = -det * b_1;
            this.v_normalMass.ex.y = -det * c2;
            this.v_normalMass.ey.y = det * a_1;
          } else {
            this.v_pointCount = 1;
          }
        }
        copyVec2(positionA.c, cA);
        positionA.a = aA;
        copyVec2(velocityA.v, vA);
        velocityA.w = wA;
        copyVec2(positionB.c, cB);
        positionB.a = aB;
        copyVec2(velocityB.v, vB);
        velocityB.w = wB;
      };
      Contact2.prototype.warmStartConstraint = function(step) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        var velocityA = bodyA.c_velocity;
        var velocityB = bodyB.c_velocity;
        var mA = this.v_invMassA;
        var iA = this.v_invIA;
        var mB = this.v_invMassB;
        var iB = this.v_invIB;
        copyVec2(vA, velocityA.v);
        var wA = velocityA.w;
        copyVec2(vB, velocityB.v);
        var wB = velocityB.w;
        copyVec2(normal$2, this.v_normal);
        crossVec2Num(tangent$1, normal$2, 1);
        for (var j2 = 0; j2 < this.v_pointCount; ++j2) {
          var vcp = this.v_points[j2];
          combine2Vec2(P$1, vcp.normalImpulse, normal$2, vcp.tangentImpulse, tangent$1);
          wA -= iA * crossVec2Vec2(vcp.rA, P$1);
          minusScaleVec2(vA, mA, P$1);
          wB += iB * crossVec2Vec2(vcp.rB, P$1);
          plusScaleVec2(vB, mB, P$1);
        }
        copyVec2(velocityA.v, vA);
        velocityA.w = wA;
        copyVec2(velocityB.v, vB);
        velocityB.w = wB;
      };
      Contact2.prototype.storeConstraintImpulses = function(step) {
        var manifold = this.m_manifold;
        for (var j2 = 0; j2 < this.v_pointCount; ++j2) {
          manifold.points[j2].normalImpulse = this.v_points[j2].normalImpulse;
          manifold.points[j2].tangentImpulse = this.v_points[j2].tangentImpulse;
        }
      };
      Contact2.prototype.solveVelocityConstraint = function(step) {
        var fixtureA = this.m_fixtureA;
        var fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        var velocityA = bodyA.c_velocity;
        var velocityB = bodyB.c_velocity;
        var mA = this.v_invMassA;
        var iA = this.v_invIA;
        var mB = this.v_invMassB;
        var iB = this.v_invIB;
        copyVec2(vA, velocityA.v);
        var wA = velocityA.w;
        copyVec2(vB, velocityB.v);
        var wB = velocityB.w;
        copyVec2(normal$2, this.v_normal);
        crossVec2Num(tangent$1, normal$2, 1);
        var friction = this.v_friction;
        for (var j2 = 0; j2 < this.v_pointCount; ++j2) {
          var vcp = this.v_points[j2];
          zeroVec2(dv);
          plusVec2(dv, vB);
          plusVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
          minusVec2(dv, vA);
          minusVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
          var vt = dotVec2(dv, tangent$1) - this.v_tangentSpeed;
          var lambda = vcp.tangentMass * -vt;
          var maxFriction = friction * vcp.normalImpulse;
          var newImpulse = clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
          lambda = newImpulse - vcp.tangentImpulse;
          vcp.tangentImpulse = newImpulse;
          scaleVec2(P$1, lambda, tangent$1);
          minusScaleVec2(vA, mA, P$1);
          wA -= iA * crossVec2Vec2(vcp.rA, P$1);
          plusScaleVec2(vB, mB, P$1);
          wB += iB * crossVec2Vec2(vcp.rB, P$1);
        }
        if (this.v_pointCount == 1 || step.blockSolve == false) {
          for (var i2 = 0; i2 < this.v_pointCount; ++i2) {
            var vcp = this.v_points[i2];
            zeroVec2(dv);
            plusVec2(dv, vB);
            plusVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
            minusVec2(dv, vA);
            minusVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
            var vn = dotVec2(dv, normal$2);
            var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
            var newImpulse = math_max$2(vcp.normalImpulse + lambda, 0);
            lambda = newImpulse - vcp.normalImpulse;
            vcp.normalImpulse = newImpulse;
            scaleVec2(P$1, lambda, normal$2);
            minusScaleVec2(vA, mA, P$1);
            wA -= iA * crossVec2Vec2(vcp.rA, P$1);
            plusScaleVec2(vB, mB, P$1);
            wB += iB * crossVec2Vec2(vcp.rB, P$1);
          }
        } else {
          var vcp1 = this.v_points[0];
          var vcp2 = this.v_points[1];
          setVec2(a$1, vcp1.normalImpulse, vcp2.normalImpulse);
          zeroVec2(dv1);
          plusVec2(dv1, vB);
          plusVec2(dv1, crossNumVec2(temp$2, wB, vcp1.rB));
          minusVec2(dv1, vA);
          minusVec2(dv1, crossNumVec2(temp$2, wA, vcp1.rA));
          zeroVec2(dv2);
          plusVec2(dv2, vB);
          plusVec2(dv2, crossNumVec2(temp$2, wB, vcp2.rB));
          minusVec2(dv2, vA);
          minusVec2(dv2, crossNumVec2(temp$2, wA, vcp2.rA));
          var vn1 = dotVec2(dv1, normal$2);
          var vn2 = dotVec2(dv2, normal$2);
          setVec2(b$1, vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
          b$1.x -= this.v_K.ex.x * a$1.x + this.v_K.ey.x * a$1.y;
          b$1.y -= this.v_K.ex.y * a$1.x + this.v_K.ey.y * a$1.y;
          while (true) {
            zeroVec2(x$1);
            x$1.x = -(this.v_normalMass.ex.x * b$1.x + this.v_normalMass.ey.x * b$1.y);
            x$1.y = -(this.v_normalMass.ex.y * b$1.x + this.v_normalMass.ey.y * b$1.y);
            if (x$1.x >= 0 && x$1.y >= 0) {
              subVec2(d$1, x$1, a$1);
              scaleVec2(P1, d$1.x, normal$2);
              scaleVec2(P2, d$1.y, normal$2);
              combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
              wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
              combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
              wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
              vcp1.normalImpulse = x$1.x;
              vcp2.normalImpulse = x$1.y;
              break;
            }
            x$1.x = -vcp1.normalMass * b$1.x;
            x$1.y = 0;
            vn1 = 0;
            vn2 = this.v_K.ex.y * x$1.x + b$1.y;
            if (x$1.x >= 0 && vn2 >= 0) {
              subVec2(d$1, x$1, a$1);
              scaleVec2(P1, d$1.x, normal$2);
              scaleVec2(P2, d$1.y, normal$2);
              combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
              wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
              combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
              wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
              vcp1.normalImpulse = x$1.x;
              vcp2.normalImpulse = x$1.y;
              break;
            }
            x$1.x = 0;
            x$1.y = -vcp2.normalMass * b$1.y;
            vn1 = this.v_K.ey.x * x$1.y + b$1.x;
            vn2 = 0;
            if (x$1.y >= 0 && vn1 >= 0) {
              subVec2(d$1, x$1, a$1);
              scaleVec2(P1, d$1.x, normal$2);
              scaleVec2(P2, d$1.y, normal$2);
              combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
              wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
              combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
              wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
              vcp1.normalImpulse = x$1.x;
              vcp2.normalImpulse = x$1.y;
              break;
            }
            x$1.x = 0;
            x$1.y = 0;
            vn1 = b$1.x;
            vn2 = b$1.y;
            if (vn1 >= 0 && vn2 >= 0) {
              subVec2(d$1, x$1, a$1);
              scaleVec2(P1, d$1.x, normal$2);
              scaleVec2(P2, d$1.y, normal$2);
              combine3Vec2(vA, -mA, P1, -mA, P2, 1, vA);
              wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
              combine3Vec2(vB, mB, P1, mB, P2, 1, vB);
              wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
              vcp1.normalImpulse = x$1.x;
              vcp2.normalImpulse = x$1.y;
              break;
            }
            break;
          }
        }
        copyVec2(velocityA.v, vA);
        velocityA.w = wA;
        copyVec2(velocityB.v, vB);
        velocityB.w = wB;
      };
      Contact2.addType = function(type1, type2, callback) {
        s_registers[type1] = s_registers[type1] || {};
        s_registers[type1][type2] = callback;
      };
      Contact2.create = function(fixtureA, indexA, fixtureB, indexB) {
        var typeA = fixtureA.m_shape.m_type;
        var typeB = fixtureB.m_shape.m_type;
        var contact = contactPool.allocate();
        var evaluateFcn;
        if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
          contact.initialize(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
        } else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
          contact.initialize(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
        } else {
          return null;
        }
        fixtureA = contact.m_fixtureA;
        fixtureB = contact.m_fixtureB;
        indexA = contact.getChildIndexA();
        indexB = contact.getChildIndexB();
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        contact.m_nodeA.contact = contact;
        contact.m_nodeA.other = bodyB;
        contact.m_nodeA.prev = null;
        contact.m_nodeA.next = bodyA.m_contactList;
        if (bodyA.m_contactList != null) {
          bodyA.m_contactList.prev = contact.m_nodeA;
        }
        bodyA.m_contactList = contact.m_nodeA;
        contact.m_nodeB.contact = contact;
        contact.m_nodeB.other = bodyA;
        contact.m_nodeB.prev = null;
        contact.m_nodeB.next = bodyB.m_contactList;
        if (bodyB.m_contactList != null) {
          bodyB.m_contactList.prev = contact.m_nodeB;
        }
        bodyB.m_contactList = contact.m_nodeB;
        if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
          bodyA.setAwake(true);
          bodyB.setAwake(true);
        }
        return contact;
      };
      Contact2.destroy = function(contact, listener) {
        var fixtureA = contact.m_fixtureA;
        var fixtureB = contact.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
          return;
        var bodyA = fixtureA.m_body;
        var bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
          return;
        if (contact.isTouching()) {
          listener.endContact(contact);
        }
        if (contact.m_nodeA.prev) {
          contact.m_nodeA.prev.next = contact.m_nodeA.next;
        }
        if (contact.m_nodeA.next) {
          contact.m_nodeA.next.prev = contact.m_nodeA.prev;
        }
        if (contact.m_nodeA == bodyA.m_contactList) {
          bodyA.m_contactList = contact.m_nodeA.next;
        }
        if (contact.m_nodeB.prev) {
          contact.m_nodeB.prev.next = contact.m_nodeB.next;
        }
        if (contact.m_nodeB.next) {
          contact.m_nodeB.next.prev = contact.m_nodeB.prev;
        }
        if (contact.m_nodeB == bodyB.m_contactList) {
          bodyB.m_contactList = contact.m_nodeB.next;
        }
        if (contact.m_manifold.pointCount > 0 && !fixtureA.m_isSensor && !fixtureB.m_isSensor) {
          bodyA.setAwake(true);
          bodyB.setAwake(true);
        }
        contactPool.release(contact);
      };
      return Contact2;
    })()
  );
  var DEFAULTS$b = {
    gravity: Vec2.zero(),
    allowSleep: true,
    warmStarting: true,
    continuousPhysics: true,
    subStepping: false,
    blockSolve: true,
    velocityIterations: 8,
    positionIterations: 3
  };
  var World = (
    /** @class */
    (function() {
      function World2(def) {
        if (!(this instanceof World2)) {
          return new World2(def);
        }
        this.s_step = new TimeStep();
        if (!def) {
          def = {};
        } else if (Vec2.isValid(def)) {
          def = { gravity: def };
        }
        def = options(def, DEFAULTS$b);
        this.m_solver = new Solver(this);
        this.m_broadPhase = new BroadPhase();
        this.m_contactList = null;
        this.m_contactCount = 0;
        this.m_bodyList = null;
        this.m_bodyCount = 0;
        this.m_jointList = null;
        this.m_jointCount = 0;
        this.m_stepComplete = true;
        this.m_allowSleep = def.allowSleep;
        this.m_gravity = Vec2.clone(def.gravity);
        this.m_clearForces = true;
        this.m_newFixture = false;
        this.m_locked = false;
        this.m_warmStarting = def.warmStarting;
        this.m_continuousPhysics = def.continuousPhysics;
        this.m_subStepping = def.subStepping;
        this.m_blockSolve = def.blockSolve;
        this.m_velocityIterations = def.velocityIterations;
        this.m_positionIterations = def.positionIterations;
        this.m_t = 0;
        this.m_step_callback = [];
      }
      World2.prototype._serialize = function() {
        var bodies = [];
        var joints = [];
        for (var b2 = this.getBodyList(); b2; b2 = b2.getNext()) {
          bodies.push(b2);
        }
        for (var j2 = this.getJointList(); j2; j2 = j2.getNext()) {
          if (typeof j2._serialize === "function") {
            joints.push(j2);
          }
        }
        return {
          gravity: this.m_gravity,
          bodies,
          joints
        };
      };
      World2._deserialize = function(data, context, restore) {
        if (!data) {
          return new World2();
        }
        var world = new World2(data.gravity);
        if (data.bodies) {
          for (var i2 = data.bodies.length - 1; i2 >= 0; i2 -= 1) {
            world._addBody(restore(Body, data.bodies[i2], world));
          }
        }
        if (data.joints) {
          for (var i2 = data.joints.length - 1; i2 >= 0; i2--) {
            world.createJoint(restore(Joint, data.joints[i2], world));
          }
        }
        return world;
      };
      World2.prototype.getBodyList = function() {
        return this.m_bodyList;
      };
      World2.prototype.getJointList = function() {
        return this.m_jointList;
      };
      World2.prototype.getContactList = function() {
        return this.m_contactList;
      };
      World2.prototype.getBodyCount = function() {
        return this.m_bodyCount;
      };
      World2.prototype.getJointCount = function() {
        return this.m_jointCount;
      };
      World2.prototype.getContactCount = function() {
        return this.m_contactCount;
      };
      World2.prototype.setGravity = function(gravity) {
        this.m_gravity.set(gravity);
      };
      World2.prototype.getGravity = function() {
        return this.m_gravity;
      };
      World2.prototype.isLocked = function() {
        return this.m_locked;
      };
      World2.prototype.setAllowSleeping = function(flag) {
        if (flag == this.m_allowSleep) {
          return;
        }
        this.m_allowSleep = flag;
        if (this.m_allowSleep == false) {
          for (var b2 = this.m_bodyList; b2; b2 = b2.m_next) {
            b2.setAwake(true);
          }
        }
      };
      World2.prototype.getAllowSleeping = function() {
        return this.m_allowSleep;
      };
      World2.prototype.setWarmStarting = function(flag) {
        this.m_warmStarting = flag;
      };
      World2.prototype.getWarmStarting = function() {
        return this.m_warmStarting;
      };
      World2.prototype.setContinuousPhysics = function(flag) {
        this.m_continuousPhysics = flag;
      };
      World2.prototype.getContinuousPhysics = function() {
        return this.m_continuousPhysics;
      };
      World2.prototype.setSubStepping = function(flag) {
        this.m_subStepping = flag;
      };
      World2.prototype.getSubStepping = function() {
        return this.m_subStepping;
      };
      World2.prototype.setAutoClearForces = function(flag) {
        this.m_clearForces = flag;
      };
      World2.prototype.getAutoClearForces = function() {
        return this.m_clearForces;
      };
      World2.prototype.clearForces = function() {
        for (var body = this.m_bodyList; body; body = body.getNext()) {
          body.m_force.setZero();
          body.m_torque = 0;
        }
      };
      World2.prototype.queryAABB = function(aabb, callback) {
        var broadPhase = this.m_broadPhase;
        this.m_broadPhase.query(aabb, function(proxyId) {
          var proxy = broadPhase.getUserData(proxyId);
          return callback(proxy.fixture);
        });
      };
      World2.prototype.rayCast = function(point1, point2, callback) {
        var broadPhase = this.m_broadPhase;
        this.m_broadPhase.rayCast({
          maxFraction: 1,
          p1: point1,
          p2: point2
        }, function(input2, proxyId) {
          var proxy = broadPhase.getUserData(proxyId);
          var fixture = proxy.fixture;
          var index = proxy.childIndex;
          var output2 = {};
          var hit = fixture.rayCast(output2, input2, index);
          if (hit) {
            var fraction = output2.fraction;
            var point3 = Vec2.add(Vec2.mulNumVec2(1 - fraction, input2.p1), Vec2.mulNumVec2(fraction, input2.p2));
            return callback(fixture, point3, output2.normal, fraction);
          }
          return input2.maxFraction;
        });
      };
      World2.prototype.getProxyCount = function() {
        return this.m_broadPhase.getProxyCount();
      };
      World2.prototype.getTreeHeight = function() {
        return this.m_broadPhase.getTreeHeight();
      };
      World2.prototype.getTreeBalance = function() {
        return this.m_broadPhase.getTreeBalance();
      };
      World2.prototype.getTreeQuality = function() {
        return this.m_broadPhase.getTreeQuality();
      };
      World2.prototype.shiftOrigin = function(newOrigin) {
        if (this.isLocked()) {
          return;
        }
        for (var b2 = this.m_bodyList; b2; b2 = b2.m_next) {
          b2.m_xf.p.sub(newOrigin);
          b2.m_sweep.c0.sub(newOrigin);
          b2.m_sweep.c.sub(newOrigin);
        }
        for (var j2 = this.m_jointList; j2; j2 = j2.m_next) {
          j2.shiftOrigin(newOrigin);
        }
        this.m_broadPhase.shiftOrigin(newOrigin);
      };
      World2.prototype._addBody = function(body) {
        if (this.isLocked()) {
          return;
        }
        body.m_prev = null;
        body.m_next = this.m_bodyList;
        if (this.m_bodyList) {
          this.m_bodyList.m_prev = body;
        }
        this.m_bodyList = body;
        ++this.m_bodyCount;
        this.publish("add-body", body);
      };
      World2.prototype.createBody = function(arg1, arg2) {
        if (this.isLocked()) {
          return null;
        }
        var def = {};
        if (!arg1) ;
        else if (Vec2.isValid(arg1)) {
          def = { position: arg1, angle: arg2 };
        } else if (typeof arg1 === "object") {
          def = arg1;
        }
        var body = new Body(this, def);
        this._addBody(body);
        return body;
      };
      World2.prototype.createDynamicBody = function(arg1, arg2) {
        var def = {};
        if (!arg1) ;
        else if (Vec2.isValid(arg1)) {
          def = { position: arg1, angle: arg2 };
        } else if (typeof arg1 === "object") {
          def = arg1;
        }
        def.type = "dynamic";
        return this.createBody(def);
      };
      World2.prototype.createKinematicBody = function(arg1, arg2) {
        var def = {};
        if (!arg1) ;
        else if (Vec2.isValid(arg1)) {
          def = { position: arg1, angle: arg2 };
        } else if (typeof arg1 === "object") {
          def = arg1;
        }
        def.type = "kinematic";
        return this.createBody(def);
      };
      World2.prototype.destroyBody = function(b2) {
        if (this.isLocked()) {
          return;
        }
        if (b2.m_destroyed) {
          return false;
        }
        var je = b2.m_jointList;
        while (je) {
          var je0 = je;
          je = je.next;
          this.publish("remove-joint", je0.joint);
          this.destroyJoint(je0.joint);
          b2.m_jointList = je;
        }
        b2.m_jointList = null;
        var ce = b2.m_contactList;
        while (ce) {
          var ce0 = ce;
          ce = ce.next;
          this.destroyContact(ce0.contact);
          b2.m_contactList = ce;
        }
        b2.m_contactList = null;
        var f2 = b2.m_fixtureList;
        while (f2) {
          var f0 = f2;
          f2 = f2.m_next;
          this.publish("remove-fixture", f0);
          f0.destroyProxies(this.m_broadPhase);
          b2.m_fixtureList = f2;
        }
        b2.m_fixtureList = null;
        if (b2.m_prev) {
          b2.m_prev.m_next = b2.m_next;
        }
        if (b2.m_next) {
          b2.m_next.m_prev = b2.m_prev;
        }
        if (b2 == this.m_bodyList) {
          this.m_bodyList = b2.m_next;
        }
        b2.m_destroyed = true;
        --this.m_bodyCount;
        this.publish("remove-body", b2);
        return true;
      };
      World2.prototype.createJoint = function(joint) {
        if (this.isLocked()) {
          return null;
        }
        joint.m_prev = null;
        joint.m_next = this.m_jointList;
        if (this.m_jointList) {
          this.m_jointList.m_prev = joint;
        }
        this.m_jointList = joint;
        ++this.m_jointCount;
        joint.m_edgeA.joint = joint;
        joint.m_edgeA.other = joint.m_bodyB;
        joint.m_edgeA.prev = null;
        joint.m_edgeA.next = joint.m_bodyA.m_jointList;
        if (joint.m_bodyA.m_jointList)
          joint.m_bodyA.m_jointList.prev = joint.m_edgeA;
        joint.m_bodyA.m_jointList = joint.m_edgeA;
        joint.m_edgeB.joint = joint;
        joint.m_edgeB.other = joint.m_bodyA;
        joint.m_edgeB.prev = null;
        joint.m_edgeB.next = joint.m_bodyB.m_jointList;
        if (joint.m_bodyB.m_jointList)
          joint.m_bodyB.m_jointList.prev = joint.m_edgeB;
        joint.m_bodyB.m_jointList = joint.m_edgeB;
        if (joint.m_collideConnected == false) {
          for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
            if (edge.other == joint.m_bodyA) {
              edge.contact.flagForFiltering();
            }
          }
        }
        this.publish("add-joint", joint);
        return joint;
      };
      World2.prototype.destroyJoint = function(joint) {
        if (this.isLocked()) {
          return;
        }
        if (joint.m_prev) {
          joint.m_prev.m_next = joint.m_next;
        }
        if (joint.m_next) {
          joint.m_next.m_prev = joint.m_prev;
        }
        if (joint == this.m_jointList) {
          this.m_jointList = joint.m_next;
        }
        var bodyA = joint.m_bodyA;
        var bodyB = joint.m_bodyB;
        bodyA.setAwake(true);
        bodyB.setAwake(true);
        if (joint.m_edgeA.prev) {
          joint.m_edgeA.prev.next = joint.m_edgeA.next;
        }
        if (joint.m_edgeA.next) {
          joint.m_edgeA.next.prev = joint.m_edgeA.prev;
        }
        if (joint.m_edgeA == bodyA.m_jointList) {
          bodyA.m_jointList = joint.m_edgeA.next;
        }
        joint.m_edgeA.prev = null;
        joint.m_edgeA.next = null;
        if (joint.m_edgeB.prev) {
          joint.m_edgeB.prev.next = joint.m_edgeB.next;
        }
        if (joint.m_edgeB.next) {
          joint.m_edgeB.next.prev = joint.m_edgeB.prev;
        }
        if (joint.m_edgeB == bodyB.m_jointList) {
          bodyB.m_jointList = joint.m_edgeB.next;
        }
        joint.m_edgeB.prev = null;
        joint.m_edgeB.next = null;
        --this.m_jointCount;
        if (joint.m_collideConnected == false) {
          var edge = bodyB.getContactList();
          while (edge) {
            if (edge.other == bodyA) {
              edge.contact.flagForFiltering();
            }
            edge = edge.next;
          }
        }
        this.publish("remove-joint", joint);
      };
      World2.prototype.step = function(timeStep, velocityIterations, positionIterations) {
        this.publish("pre-step", timeStep);
        if ((velocityIterations | 0) !== velocityIterations) {
          velocityIterations = 0;
        }
        velocityIterations = velocityIterations || this.m_velocityIterations;
        positionIterations = positionIterations || this.m_positionIterations;
        if (this.m_newFixture) {
          this.findNewContacts();
          this.m_newFixture = false;
        }
        this.m_locked = true;
        this.s_step.reset(timeStep);
        this.s_step.velocityIterations = velocityIterations;
        this.s_step.positionIterations = positionIterations;
        this.s_step.warmStarting = this.m_warmStarting;
        this.s_step.blockSolve = this.m_blockSolve;
        this.updateContacts();
        if (this.m_stepComplete && timeStep > 0) {
          this.m_solver.solveWorld(this.s_step);
          for (var b2 = this.m_bodyList; b2; b2 = b2.getNext()) {
            if (b2.m_islandFlag == false) {
              continue;
            }
            if (b2.isStatic()) {
              continue;
            }
            b2.synchronizeFixtures();
          }
          this.findNewContacts();
        }
        if (this.m_continuousPhysics && timeStep > 0) {
          this.m_solver.solveWorldTOI(this.s_step);
        }
        if (this.m_clearForces) {
          this.clearForces();
        }
        this.m_locked = false;
        var callback;
        while (callback = this.m_step_callback.shift()) {
          callback(this);
        }
        this.publish("post-step", timeStep);
      };
      World2.prototype.queueUpdate = function(callback) {
        if (!this.isLocked()) {
          callback(this);
        } else {
          this.m_step_callback.push(callback);
        }
      };
      World2.prototype.findNewContacts = function() {
        var _this = this;
        this.m_broadPhase.updatePairs(function(proxyA, proxyB) {
          return _this.createContact(proxyA, proxyB);
        });
      };
      World2.prototype.createContact = function(proxyA, proxyB) {
        var fixtureA = proxyA.fixture;
        var fixtureB = proxyB.fixture;
        var indexA = proxyA.childIndex;
        var indexB = proxyB.childIndex;
        var bodyA = fixtureA.getBody();
        var bodyB = fixtureB.getBody();
        if (bodyA == bodyB) {
          return;
        }
        var edge = bodyB.getContactList();
        while (edge) {
          if (edge.other == bodyA) {
            var fA = edge.contact.getFixtureA();
            var fB = edge.contact.getFixtureB();
            var iA = edge.contact.getChildIndexA();
            var iB = edge.contact.getChildIndexB();
            if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
              return;
            }
            if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
              return;
            }
          }
          edge = edge.next;
        }
        if (bodyB.shouldCollide(bodyA) == false) {
          return;
        }
        if (fixtureB.shouldCollide(fixtureA) == false) {
          return;
        }
        var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
        if (contact == null) {
          return;
        }
        contact.m_prev = null;
        if (this.m_contactList != null) {
          contact.m_next = this.m_contactList;
          this.m_contactList.m_prev = contact;
        }
        this.m_contactList = contact;
        ++this.m_contactCount;
      };
      World2.prototype.updateContacts = function() {
        var c2;
        var next_c = this.m_contactList;
        while (c2 = next_c) {
          next_c = c2.getNext();
          var fixtureA = c2.getFixtureA();
          var fixtureB = c2.getFixtureB();
          var indexA = c2.getChildIndexA();
          var indexB = c2.getChildIndexB();
          var bodyA = fixtureA.getBody();
          var bodyB = fixtureB.getBody();
          if (c2.m_filterFlag) {
            if (bodyB.shouldCollide(bodyA) == false) {
              this.destroyContact(c2);
              continue;
            }
            if (fixtureB.shouldCollide(fixtureA) == false) {
              this.destroyContact(c2);
              continue;
            }
            c2.m_filterFlag = false;
          }
          var activeA = bodyA.isAwake() && !bodyA.isStatic();
          var activeB = bodyB.isAwake() && !bodyB.isStatic();
          if (activeA == false && activeB == false) {
            continue;
          }
          var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
          var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
          var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
          if (overlap == false) {
            this.destroyContact(c2);
            continue;
          }
          c2.update(this);
        }
      };
      World2.prototype.destroyContact = function(contact) {
        if (contact.m_prev) {
          contact.m_prev.m_next = contact.m_next;
        }
        if (contact.m_next) {
          contact.m_next.m_prev = contact.m_prev;
        }
        if (contact == this.m_contactList) {
          this.m_contactList = contact.m_next;
        }
        Contact.destroy(contact, this);
        --this.m_contactCount;
      };
      World2.prototype.on = function(name, listener) {
        if (typeof name !== "string" || typeof listener !== "function") {
          return this;
        }
        if (!this._listeners) {
          this._listeners = {};
        }
        if (!this._listeners[name]) {
          this._listeners[name] = [];
        }
        this._listeners[name].push(listener);
        return this;
      };
      World2.prototype.off = function(name, listener) {
        if (typeof name !== "string" || typeof listener !== "function") {
          return this;
        }
        var listeners = this._listeners && this._listeners[name];
        if (!listeners || !listeners.length) {
          return this;
        }
        var index = listeners.indexOf(listener);
        if (index >= 0) {
          listeners.splice(index, 1);
        }
        return this;
      };
      World2.prototype.publish = function(name, arg1, arg2, arg3) {
        var listeners = this._listeners && this._listeners[name];
        if (!listeners || !listeners.length) {
          return 0;
        }
        for (var l2 = 0; l2 < listeners.length; l2++) {
          listeners[l2].call(this, arg1, arg2, arg3);
        }
        return listeners.length;
      };
      World2.prototype.beginContact = function(contact) {
        this.publish("begin-contact", contact);
      };
      World2.prototype.endContact = function(contact) {
        this.publish("end-contact", contact);
      };
      World2.prototype.preSolve = function(contact, oldManifold2) {
        this.publish("pre-solve", contact, oldManifold2);
      };
      World2.prototype.postSolve = function(contact, impulse) {
        this.publish("post-solve", contact, impulse);
      };
      return World2;
    })()
  );
  var Vec3 = (
    /** @class */
    (function() {
      function Vec32(x2, y2, z) {
        if (!(this instanceof Vec32)) {
          return new Vec32(x2, y2, z);
        }
        if (typeof x2 === "undefined") {
          this.x = 0;
          this.y = 0;
          this.z = 0;
        } else if (typeof x2 === "object") {
          this.x = x2.x;
          this.y = x2.y;
          this.z = x2.z;
        } else {
          this.x = x2;
          this.y = y2;
          this.z = z;
        }
      }
      Vec32.prototype._serialize = function() {
        return {
          x: this.x,
          y: this.y,
          z: this.z
        };
      };
      Vec32._deserialize = function(data) {
        var obj = Object.create(Vec32.prototype);
        obj.x = data.x;
        obj.y = data.y;
        obj.z = data.z;
        return obj;
      };
      Vec32.neo = function(x2, y2, z) {
        var obj = Object.create(Vec32.prototype);
        obj.x = x2;
        obj.y = y2;
        obj.z = z;
        return obj;
      };
      Vec32.zero = function() {
        var obj = Object.create(Vec32.prototype);
        obj.x = 0;
        obj.y = 0;
        obj.z = 0;
        return obj;
      };
      Vec32.clone = function(v3) {
        return Vec32.neo(v3.x, v3.y, v3.z);
      };
      Vec32.prototype.toString = function() {
        return JSON.stringify(this);
      };
      Vec32.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Number.isFinite(obj.x) && Number.isFinite(obj.y) && Number.isFinite(obj.z);
      };
      Vec32.assert = function(o2) {
      };
      Vec32.prototype.setZero = function() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
      };
      Vec32.prototype.set = function(x2, y2, z) {
        this.x = x2;
        this.y = y2;
        this.z = z;
        return this;
      };
      Vec32.prototype.add = function(w2) {
        this.x += w2.x;
        this.y += w2.y;
        this.z += w2.z;
        return this;
      };
      Vec32.prototype.sub = function(w2) {
        this.x -= w2.x;
        this.y -= w2.y;
        this.z -= w2.z;
        return this;
      };
      Vec32.prototype.mul = function(m2) {
        this.x *= m2;
        this.y *= m2;
        this.z *= m2;
        return this;
      };
      Vec32.areEqual = function(v3, w2) {
        return v3 === w2 || typeof v3 === "object" && v3 !== null && typeof w2 === "object" && w2 !== null && v3.x === w2.x && v3.y === w2.y && v3.z === w2.z;
      };
      Vec32.dot = function(v3, w2) {
        return v3.x * w2.x + v3.y * w2.y + v3.z * w2.z;
      };
      Vec32.cross = function(v3, w2) {
        return new Vec32(v3.y * w2.z - v3.z * w2.y, v3.z * w2.x - v3.x * w2.z, v3.x * w2.y - v3.y * w2.x);
      };
      Vec32.add = function(v3, w2) {
        return new Vec32(v3.x + w2.x, v3.y + w2.y, v3.z + w2.z);
      };
      Vec32.sub = function(v3, w2) {
        return new Vec32(v3.x - w2.x, v3.y - w2.y, v3.z - w2.z);
      };
      Vec32.mul = function(v3, m2) {
        return new Vec32(m2 * v3.x, m2 * v3.y, m2 * v3.z);
      };
      Vec32.prototype.neg = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
      };
      Vec32.neg = function(v3) {
        return new Vec32(-v3.x, -v3.y, -v3.z);
      };
      return Vec32;
    })()
  );
  var v1$2 = vec2(0, 0);
  var v2$1 = vec2(0, 0);
  var EdgeShape = (
    /** @class */
    (function(_super) {
      __extends(EdgeShape2, _super);
      function EdgeShape2(v122, v22) {
        var _this = this;
        if (!(_this instanceof EdgeShape2)) {
          return new EdgeShape2(v122, v22);
        }
        _this = _super.call(this) || this;
        _this.m_type = EdgeShape2.TYPE;
        _this.m_radius = SettingsInternal.polygonRadius;
        _this.m_vertex1 = v122 ? Vec2.clone(v122) : Vec2.zero();
        _this.m_vertex2 = v22 ? Vec2.clone(v22) : Vec2.zero();
        _this.m_vertex0 = Vec2.zero();
        _this.m_vertex3 = Vec2.zero();
        _this.m_hasVertex0 = false;
        _this.m_hasVertex3 = false;
        return _this;
      }
      EdgeShape2.prototype._serialize = function() {
        return {
          type: this.m_type,
          vertex1: this.m_vertex1,
          vertex2: this.m_vertex2,
          vertex0: this.m_vertex0,
          vertex3: this.m_vertex3
        };
      };
      EdgeShape2._deserialize = function(data) {
        var shape = new EdgeShape2(data.vertex1, data.vertex2);
        if (shape.m_hasVertex0) {
          shape.setPrevVertex(data.vertex0);
        }
        if (shape.m_hasVertex3) {
          shape.setNextVertex(data.vertex3);
        }
        return shape;
      };
      EdgeShape2.prototype._reset = function() {
      };
      EdgeShape2.prototype.getRadius = function() {
        return this.m_radius;
      };
      EdgeShape2.prototype.getType = function() {
        return this.m_type;
      };
      EdgeShape2.prototype.setNext = function(v3) {
        return this.setNextVertex(v3);
      };
      EdgeShape2.prototype.setNextVertex = function(v3) {
        if (v3) {
          this.m_vertex3.setVec2(v3);
          this.m_hasVertex3 = true;
        } else {
          this.m_vertex3.setZero();
          this.m_hasVertex3 = false;
        }
        return this;
      };
      EdgeShape2.prototype.getNextVertex = function() {
        return this.m_vertex3;
      };
      EdgeShape2.prototype.setPrev = function(v3) {
        return this.setPrevVertex(v3);
      };
      EdgeShape2.prototype.setPrevVertex = function(v3) {
        if (v3) {
          this.m_vertex0.setVec2(v3);
          this.m_hasVertex0 = true;
        } else {
          this.m_vertex0.setZero();
          this.m_hasVertex0 = false;
        }
        return this;
      };
      EdgeShape2.prototype.getPrevVertex = function() {
        return this.m_vertex0;
      };
      EdgeShape2.prototype._set = function(v122, v22) {
        this.m_vertex1.setVec2(v122);
        this.m_vertex2.setVec2(v22);
        this.m_hasVertex0 = false;
        this.m_hasVertex3 = false;
        return this;
      };
      EdgeShape2.prototype._clone = function() {
        var clone = new EdgeShape2();
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_vertex1.setVec2(this.m_vertex1);
        clone.m_vertex2.setVec2(this.m_vertex2);
        clone.m_vertex0.setVec2(this.m_vertex0);
        clone.m_vertex3.setVec2(this.m_vertex3);
        clone.m_hasVertex0 = this.m_hasVertex0;
        clone.m_hasVertex3 = this.m_hasVertex3;
        return clone;
      };
      EdgeShape2.prototype.getChildCount = function() {
        return 1;
      };
      EdgeShape2.prototype.testPoint = function(xf2, p2) {
        return false;
      };
      EdgeShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
        var p1 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p1, xf2.p));
        var p2 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p2, xf2.p));
        var d2 = Vec2.sub(p2, p1);
        var v122 = this.m_vertex1;
        var v22 = this.m_vertex2;
        var e3 = Vec2.sub(v22, v122);
        var normal3 = Vec2.neo(e3.y, -e3.x);
        normal3.normalize();
        var numerator = Vec2.dot(normal3, Vec2.sub(v122, p1));
        var denominator = Vec2.dot(normal3, d2);
        if (denominator == 0) {
          return false;
        }
        var t2 = numerator / denominator;
        if (t2 < 0 || input2.maxFraction < t2) {
          return false;
        }
        var q = Vec2.add(p1, Vec2.mulNumVec2(t2, d2));
        var r2 = Vec2.sub(v22, v122);
        var rr = Vec2.dot(r2, r2);
        if (rr == 0) {
          return false;
        }
        var s2 = Vec2.dot(Vec2.sub(q, v122), r2) / rr;
        if (s2 < 0 || 1 < s2) {
          return false;
        }
        output2.fraction = t2;
        if (numerator > 0) {
          output2.normal = Rot.mulVec2(xf2.q, normal3).neg();
        } else {
          output2.normal = Rot.mulVec2(xf2.q, normal3);
        }
        return true;
      };
      EdgeShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
        transformVec2$1(v1$2, xf2, this.m_vertex1);
        transformVec2$1(v2$1, xf2, this.m_vertex2);
        AABB.combinePoints(aabb, v1$2, v2$1);
        AABB.extend(aabb, this.m_radius);
      };
      EdgeShape2.prototype.computeMass = function(massData, density) {
        massData.mass = 0;
        combine2Vec2(massData.center, 0.5, this.m_vertex1, 0.5, this.m_vertex2);
        massData.I = 0;
      };
      EdgeShape2.prototype.computeDistanceProxy = function(proxy) {
        proxy.m_vertices[0] = this.m_vertex1;
        proxy.m_vertices[1] = this.m_vertex2;
        proxy.m_vertices.length = 2;
        proxy.m_count = 2;
        proxy.m_radius = this.m_radius;
      };
      EdgeShape2.TYPE = "edge";
      return EdgeShape2;
    })(Shape)
  );
  var v1$1 = vec2(0, 0);
  var v2 = vec2(0, 0);
  var ChainShape = (
    /** @class */
    (function(_super) {
      __extends(ChainShape2, _super);
      function ChainShape2(vertices, loop) {
        var _this = this;
        if (!(_this instanceof ChainShape2)) {
          return new ChainShape2(vertices, loop);
        }
        _this = _super.call(this) || this;
        _this.m_type = ChainShape2.TYPE;
        _this.m_radius = SettingsInternal.polygonRadius;
        _this.m_vertices = [];
        _this.m_count = 0;
        _this.m_prevVertex = null;
        _this.m_nextVertex = null;
        _this.m_hasPrevVertex = false;
        _this.m_hasNextVertex = false;
        _this.m_isLoop = !!loop;
        if (vertices && vertices.length) {
          if (loop) {
            _this._createLoop(vertices);
          } else {
            _this._createChain(vertices);
          }
        }
        return _this;
      }
      ChainShape2.prototype._serialize = function() {
        var data = {
          type: this.m_type,
          vertices: this.m_isLoop ? this.m_vertices.slice(0, this.m_vertices.length - 1) : this.m_vertices,
          isLoop: this.m_isLoop,
          hasPrevVertex: this.m_hasPrevVertex,
          hasNextVertex: this.m_hasNextVertex,
          prevVertex: null,
          nextVertex: null
        };
        if (this.m_prevVertex) {
          data.prevVertex = this.m_prevVertex;
        }
        if (this.m_nextVertex) {
          data.nextVertex = this.m_nextVertex;
        }
        return data;
      };
      ChainShape2._deserialize = function(data, fixture, restore) {
        var vertices = [];
        if (data.vertices) {
          for (var i2 = 0; i2 < data.vertices.length; i2++) {
            vertices.push(data.vertices[i2]);
          }
        }
        var shape = new ChainShape2(vertices, data.isLoop);
        if (data.prevVertex) {
          shape.setPrevVertex(data.prevVertex);
        }
        if (data.nextVertex) {
          shape.setNextVertex(data.nextVertex);
        }
        return shape;
      };
      ChainShape2.prototype.getType = function() {
        return this.m_type;
      };
      ChainShape2.prototype.getRadius = function() {
        return this.m_radius;
      };
      ChainShape2.prototype._createLoop = function(vertices) {
        if (vertices.length < 3) {
          return;
        }
        var i2;
        this.m_vertices = [];
        this.m_count = vertices.length + 1;
        for (var i2 = 0; i2 < vertices.length; ++i2) {
          this.m_vertices[i2] = Vec2.clone(vertices[i2]);
        }
        this.m_vertices[vertices.length] = Vec2.clone(vertices[0]);
        this.m_prevVertex = this.m_vertices[this.m_count - 2];
        this.m_nextVertex = this.m_vertices[1];
        this.m_hasPrevVertex = true;
        this.m_hasNextVertex = true;
        return this;
      };
      ChainShape2.prototype._createChain = function(vertices) {
        var i2;
        this.m_vertices = [];
        this.m_count = vertices.length;
        for (var i2 = 0; i2 < vertices.length; ++i2) {
          this.m_vertices[i2] = Vec2.clone(vertices[i2]);
        }
        this.m_prevVertex = null;
        this.m_nextVertex = null;
        this.m_hasPrevVertex = false;
        this.m_hasNextVertex = false;
        return this;
      };
      ChainShape2.prototype._reset = function() {
        if (this.m_isLoop) {
          this._createLoop(this.m_vertices.slice(0, this.m_vertices.length - 1));
        } else {
          this._createChain(this.m_vertices);
        }
      };
      ChainShape2.prototype.setPrevVertex = function(prevVertex) {
        this.m_prevVertex = prevVertex;
        this.m_hasPrevVertex = true;
      };
      ChainShape2.prototype.getPrevVertex = function() {
        return this.m_prevVertex;
      };
      ChainShape2.prototype.setNextVertex = function(nextVertex) {
        this.m_nextVertex = nextVertex;
        this.m_hasNextVertex = true;
      };
      ChainShape2.prototype.getNextVertex = function() {
        return this.m_nextVertex;
      };
      ChainShape2.prototype._clone = function() {
        var clone = new ChainShape2();
        clone._createChain(this.m_vertices);
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_prevVertex = this.m_prevVertex;
        clone.m_nextVertex = this.m_nextVertex;
        clone.m_hasPrevVertex = this.m_hasPrevVertex;
        clone.m_hasNextVertex = this.m_hasNextVertex;
        return clone;
      };
      ChainShape2.prototype.getChildCount = function() {
        return this.m_count - 1;
      };
      ChainShape2.prototype.getChildEdge = function(edge, childIndex) {
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
      };
      ChainShape2.prototype.getVertex = function(index) {
        if (index < this.m_count) {
          return this.m_vertices[index];
        } else {
          return this.m_vertices[0];
        }
      };
      ChainShape2.prototype.isLoop = function() {
        return this.m_isLoop;
      };
      ChainShape2.prototype.testPoint = function(xf2, p2) {
        return false;
      };
      ChainShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
        var edgeShape = new EdgeShape(this.getVertex(childIndex), this.getVertex(childIndex + 1));
        return edgeShape.rayCast(output2, input2, xf2, 0);
      };
      ChainShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
        transformVec2$1(v1$1, xf2, this.getVertex(childIndex));
        transformVec2$1(v2, xf2, this.getVertex(childIndex + 1));
        AABB.combinePoints(aabb, v1$1, v2);
      };
      ChainShape2.prototype.computeMass = function(massData, density) {
        massData.mass = 0;
        zeroVec2(massData.center);
        massData.I = 0;
      };
      ChainShape2.prototype.computeDistanceProxy = function(proxy, childIndex) {
        proxy.m_vertices[0] = this.getVertex(childIndex);
        proxy.m_vertices[1] = this.getVertex(childIndex + 1);
        proxy.m_count = 2;
        proxy.m_radius = this.m_radius;
      };
      ChainShape2.TYPE = "chain";
      return ChainShape2;
    })(Shape)
  );
  var math_max$1 = Math.max;
  var math_min$3 = Math.min;
  var temp$1 = vec2(0, 0);
  var e$1 = vec2(0, 0);
  var e1$1 = vec2(0, 0);
  var e2$1 = vec2(0, 0);
  var center = vec2(0, 0);
  var s$1 = vec2(0, 0);
  var PolygonShape = (
    /** @class */
    (function(_super) {
      __extends(PolygonShape2, _super);
      function PolygonShape2(vertices) {
        var _this = this;
        if (!(_this instanceof PolygonShape2)) {
          return new PolygonShape2(vertices);
        }
        _this = _super.call(this) || this;
        _this.m_type = PolygonShape2.TYPE;
        _this.m_radius = SettingsInternal.polygonRadius;
        _this.m_centroid = Vec2.zero();
        _this.m_vertices = [];
        _this.m_normals = [];
        _this.m_count = 0;
        if (vertices && vertices.length) {
          _this._set(vertices);
        }
        return _this;
      }
      PolygonShape2.prototype._serialize = function() {
        return {
          type: this.m_type,
          vertices: this.m_vertices
        };
      };
      PolygonShape2._deserialize = function(data, fixture, restore) {
        var vertices = [];
        if (data.vertices) {
          for (var i2 = 0; i2 < data.vertices.length; i2++) {
            vertices.push(data.vertices[i2]);
          }
        }
        var shape = new PolygonShape2(vertices);
        return shape;
      };
      PolygonShape2.prototype.getType = function() {
        return this.m_type;
      };
      PolygonShape2.prototype.getRadius = function() {
        return this.m_radius;
      };
      PolygonShape2.prototype._clone = function() {
        var clone = new PolygonShape2();
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_count = this.m_count;
        clone.m_centroid.setVec2(this.m_centroid);
        for (var i2 = 0; i2 < this.m_count; i2++) {
          clone.m_vertices.push(this.m_vertices[i2].clone());
        }
        for (var i2 = 0; i2 < this.m_normals.length; i2++) {
          clone.m_normals.push(this.m_normals[i2].clone());
        }
        return clone;
      };
      PolygonShape2.prototype.getChildCount = function() {
        return 1;
      };
      PolygonShape2.prototype._reset = function() {
        this._set(this.m_vertices);
      };
      PolygonShape2.prototype._set = function(vertices) {
        if (vertices.length < 3) {
          this._setAsBox(1, 1);
          return;
        }
        var n2 = math_min$3(vertices.length, SettingsInternal.maxPolygonVertices);
        var ps = [];
        for (var i2 = 0; i2 < n2; ++i2) {
          var v3 = vertices[i2];
          var unique = true;
          for (var j2 = 0; j2 < ps.length; ++j2) {
            if (Vec2.distanceSquared(v3, ps[j2]) < 0.25 * SettingsInternal.linearSlopSquared) {
              unique = false;
              break;
            }
          }
          if (unique) {
            ps.push(Vec2.clone(v3));
          }
        }
        n2 = ps.length;
        if (n2 < 3) {
          this._setAsBox(1, 1);
          return;
        }
        var i0 = 0;
        var x0 = ps[0].x;
        for (var i2 = 1; i2 < n2; ++i2) {
          var x2 = ps[i2].x;
          if (x2 > x0 || x2 === x0 && ps[i2].y < ps[i0].y) {
            i0 = i2;
            x0 = x2;
          }
        }
        var hull = [];
        var m2 = 0;
        var ih = i0;
        while (true) {
          hull[m2] = ih;
          var ie2 = 0;
          for (var j2 = 1; j2 < n2; ++j2) {
            if (ie2 === ih) {
              ie2 = j2;
              continue;
            }
            var r2 = Vec2.sub(ps[ie2], ps[hull[m2]]);
            var v3 = Vec2.sub(ps[j2], ps[hull[m2]]);
            var c2 = Vec2.crossVec2Vec2(r2, v3);
            if (c2 < 0) {
              ie2 = j2;
            }
            if (c2 === 0 && v3.lengthSquared() > r2.lengthSquared()) {
              ie2 = j2;
            }
          }
          ++m2;
          ih = ie2;
          if (ie2 === i0) {
            break;
          }
        }
        if (m2 < 3) {
          this._setAsBox(1, 1);
          return;
        }
        this.m_count = m2;
        this.m_vertices = [];
        for (var i2 = 0; i2 < m2; ++i2) {
          this.m_vertices[i2] = ps[hull[i2]];
        }
        for (var i2 = 0; i2 < m2; ++i2) {
          var i1 = i2;
          var i22 = i2 + 1 < m2 ? i2 + 1 : 0;
          var edge = Vec2.sub(this.m_vertices[i22], this.m_vertices[i1]);
          this.m_normals[i2] = Vec2.crossVec2Num(edge, 1);
          this.m_normals[i2].normalize();
        }
        this.m_centroid = computeCentroid(this.m_vertices, m2);
      };
      PolygonShape2.prototype._setAsBox = function(hx, hy, center2, angle) {
        this.m_vertices[0] = Vec2.neo(hx, -hy);
        this.m_vertices[1] = Vec2.neo(hx, hy);
        this.m_vertices[2] = Vec2.neo(-hx, hy);
        this.m_vertices[3] = Vec2.neo(-hx, -hy);
        this.m_normals[0] = Vec2.neo(1, 0);
        this.m_normals[1] = Vec2.neo(0, 1);
        this.m_normals[2] = Vec2.neo(-1, 0);
        this.m_normals[3] = Vec2.neo(0, -1);
        this.m_count = 4;
        if (center2 && Vec2.isValid(center2)) {
          angle = angle || 0;
          copyVec2(this.m_centroid, center2);
          var xf2 = Transform.identity();
          xf2.p.setVec2(center2);
          xf2.q.setAngle(angle);
          for (var i2 = 0; i2 < this.m_count; ++i2) {
            this.m_vertices[i2] = Transform.mulVec2(xf2, this.m_vertices[i2]);
            this.m_normals[i2] = Rot.mulVec2(xf2.q, this.m_normals[i2]);
          }
        }
      };
      PolygonShape2.prototype.testPoint = function(xf2, p2) {
        var pLocal = detransformVec2(temp$1, xf2, p2);
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          var dot = dotVec2(this.m_normals[i2], pLocal) - dotVec2(this.m_normals[i2], this.m_vertices[i2]);
          if (dot > 0) {
            return false;
          }
        }
        return true;
      };
      PolygonShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
        var p1 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p1, xf2.p));
        var p2 = Rot.mulTVec2(xf2.q, Vec2.sub(input2.p2, xf2.p));
        var d2 = Vec2.sub(p2, p1);
        var lower = 0;
        var upper = input2.maxFraction;
        var index = -1;
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          var numerator = Vec2.dot(this.m_normals[i2], Vec2.sub(this.m_vertices[i2], p1));
          var denominator = Vec2.dot(this.m_normals[i2], d2);
          if (denominator == 0) {
            if (numerator < 0) {
              return false;
            }
          } else {
            if (denominator < 0 && numerator < lower * denominator) {
              lower = numerator / denominator;
              index = i2;
            } else if (denominator > 0 && numerator < upper * denominator) {
              upper = numerator / denominator;
            }
          }
          if (upper < lower) {
            return false;
          }
        }
        if (index >= 0) {
          output2.fraction = lower;
          output2.normal = Rot.mulVec2(xf2.q, this.m_normals[index]);
          return true;
        }
        return false;
      };
      PolygonShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          var v3 = transformVec2$1(temp$1, xf2, this.m_vertices[i2]);
          minX = math_min$3(minX, v3.x);
          maxX = math_max$1(maxX, v3.x);
          minY = math_min$3(minY, v3.y);
          maxY = math_max$1(maxY, v3.y);
        }
        setVec2(aabb.lowerBound, minX - this.m_radius, minY - this.m_radius);
        setVec2(aabb.upperBound, maxX + this.m_radius, maxY + this.m_radius);
      };
      PolygonShape2.prototype.computeMass = function(massData, density) {
        zeroVec2(center);
        var area = 0;
        var I = 0;
        zeroVec2(s$1);
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          plusVec2(s$1, this.m_vertices[i2]);
        }
        scaleVec2(s$1, 1 / this.m_count, s$1);
        var k_inv3 = 1 / 3;
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          subVec2(e1$1, this.m_vertices[i2], s$1);
          if (i2 + 1 < this.m_count) {
            subVec2(e2$1, this.m_vertices[i2 + 1], s$1);
          } else {
            subVec2(e2$1, this.m_vertices[0], s$1);
          }
          var D = crossVec2Vec2(e1$1, e2$1);
          var triangleArea = 0.5 * D;
          area += triangleArea;
          combine2Vec2(temp$1, triangleArea * k_inv3, e1$1, triangleArea * k_inv3, e2$1);
          plusVec2(center, temp$1);
          var ex1 = e1$1.x;
          var ey1 = e1$1.y;
          var ex2 = e2$1.x;
          var ey2 = e2$1.y;
          var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
          var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
          I += 0.25 * k_inv3 * D * (intx2 + inty2);
        }
        massData.mass = density * area;
        scaleVec2(center, 1 / area, center);
        addVec2(massData.center, center, s$1);
        massData.I = density * I;
        massData.I += massData.mass * (dotVec2(massData.center, massData.center) - dotVec2(center, center));
      };
      PolygonShape2.prototype.validate = function() {
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          var i1 = i2;
          var i22 = i2 < this.m_count - 1 ? i1 + 1 : 0;
          var p2 = this.m_vertices[i1];
          subVec2(e$1, this.m_vertices[i22], p2);
          for (var j2 = 0; j2 < this.m_count; ++j2) {
            if (j2 == i1 || j2 == i22) {
              continue;
            }
            var c2 = crossVec2Vec2(e$1, subVec2(temp$1, this.m_vertices[j2], p2));
            if (c2 < 0) {
              return false;
            }
          }
        }
        return true;
      };
      PolygonShape2.prototype.computeDistanceProxy = function(proxy) {
        for (var i2 = 0; i2 < this.m_count; ++i2) {
          proxy.m_vertices[i2] = this.m_vertices[i2];
        }
        proxy.m_vertices.length = this.m_count;
        proxy.m_count = this.m_count;
        proxy.m_radius = this.m_radius;
      };
      PolygonShape2.TYPE = "polygon";
      return PolygonShape2;
    })(Shape)
  );
  function computeCentroid(vs, count) {
    var c2 = Vec2.zero();
    var area = 0;
    var pRef = Vec2.zero();
    var i2;
    var inv3 = 1 / 3;
    for (var i2 = 0; i2 < count; ++i2) {
      var p1 = pRef;
      var p2 = vs[i2];
      var p3 = i2 + 1 < count ? vs[i2 + 1] : vs[0];
      var e1_1 = Vec2.sub(p2, p1);
      var e2_1 = Vec2.sub(p3, p1);
      var D = Vec2.crossVec2Vec2(e1_1, e2_1);
      var triangleArea = 0.5 * D;
      area += triangleArea;
      combine3Vec2(temp$1, 1, p1, 1, p2, 1, p3);
      plusScaleVec2(c2, triangleArea * inv3, temp$1);
    }
    c2.mul(1 / area);
    return c2;
  }
  var math_sqrt = Math.sqrt;
  var math_PI$4 = Math.PI;
  var temp = vec2(0, 0);
  var CircleShape = (
    /** @class */
    (function(_super) {
      __extends(CircleShape2, _super);
      function CircleShape2(a2, b2) {
        var _this = this;
        if (!(_this instanceof CircleShape2)) {
          return new CircleShape2(a2, b2);
        }
        _this = _super.call(this) || this;
        _this.m_type = CircleShape2.TYPE;
        _this.m_p = Vec2.zero();
        _this.m_radius = 1;
        if (typeof a2 === "object" && Vec2.isValid(a2)) {
          _this.m_p.setVec2(a2);
          if (typeof b2 === "number") {
            _this.m_radius = b2;
          }
        } else if (typeof a2 === "number") {
          _this.m_radius = a2;
        }
        return _this;
      }
      CircleShape2.prototype._serialize = function() {
        return {
          type: this.m_type,
          p: this.m_p,
          radius: this.m_radius
        };
      };
      CircleShape2._deserialize = function(data) {
        return new CircleShape2(data.p, data.radius);
      };
      CircleShape2.prototype._reset = function() {
      };
      CircleShape2.prototype.getType = function() {
        return this.m_type;
      };
      CircleShape2.prototype.getRadius = function() {
        return this.m_radius;
      };
      CircleShape2.prototype.getCenter = function() {
        return this.m_p;
      };
      CircleShape2.prototype._clone = function() {
        var clone = new CircleShape2();
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_p = this.m_p.clone();
        return clone;
      };
      CircleShape2.prototype.getChildCount = function() {
        return 1;
      };
      CircleShape2.prototype.testPoint = function(xf2, p2) {
        var center2 = transformVec2$1(temp, xf2, this.m_p);
        return distSqrVec2(p2, center2) <= this.m_radius * this.m_radius;
      };
      CircleShape2.prototype.rayCast = function(output2, input2, xf2, childIndex) {
        var position = Vec2.add(xf2.p, Rot.mulVec2(xf2.q, this.m_p));
        var s2 = Vec2.sub(input2.p1, position);
        var b2 = Vec2.dot(s2, s2) - this.m_radius * this.m_radius;
        var r2 = Vec2.sub(input2.p2, input2.p1);
        var c2 = Vec2.dot(s2, r2);
        var rr = Vec2.dot(r2, r2);
        var sigma = c2 * c2 - rr * b2;
        if (sigma < 0 || rr < EPSILON) {
          return false;
        }
        var a2 = -(c2 + math_sqrt(sigma));
        if (0 <= a2 && a2 <= input2.maxFraction * rr) {
          a2 /= rr;
          output2.fraction = a2;
          output2.normal = Vec2.add(s2, Vec2.mulNumVec2(a2, r2));
          output2.normal.normalize();
          return true;
        }
        return false;
      };
      CircleShape2.prototype.computeAABB = function(aabb, xf2, childIndex) {
        var p2 = transformVec2$1(temp, xf2, this.m_p);
        setVec2(aabb.lowerBound, p2.x - this.m_radius, p2.y - this.m_radius);
        setVec2(aabb.upperBound, p2.x + this.m_radius, p2.y + this.m_radius);
      };
      CircleShape2.prototype.computeMass = function(massData, density) {
        massData.mass = density * math_PI$4 * this.m_radius * this.m_radius;
        copyVec2(massData.center, this.m_p);
        massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + lengthSqrVec2(this.m_p));
      };
      CircleShape2.prototype.computeDistanceProxy = function(proxy) {
        proxy.m_vertices[0] = this.m_p;
        proxy.m_vertices.length = 1;
        proxy.m_count = 1;
        proxy.m_radius = this.m_radius;
      };
      CircleShape2.TYPE = "circle";
      return CircleShape2;
    })(Shape)
  );
  var math_abs$5 = Math.abs;
  var math_PI$3 = Math.PI;
  var DEFAULTS$a = {
    frequencyHz: 0,
    dampingRatio: 0
  };
  var DistanceJoint = (
    /** @class */
    (function(_super) {
      __extends(DistanceJoint2, _super);
      function DistanceJoint2(def, bodyA, bodyB, anchorA, anchorB) {
        var _this = this;
        if (!(_this instanceof DistanceJoint2)) {
          return new DistanceJoint2(def, bodyA, bodyB, anchorA, anchorB);
        }
        if (bodyB && anchorA && "m_type" in anchorA && "x" in bodyB && "y" in bodyB) {
          var temp3 = bodyB;
          bodyB = anchorA;
          anchorA = temp3;
        }
        def = options(def, DEFAULTS$a);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = DistanceJoint2.TYPE;
        _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
        _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
        _this.m_length = Number.isFinite(def.length) ? def.length : Vec2.distance(bodyA.getWorldPoint(_this.m_localAnchorA), bodyB.getWorldPoint(_this.m_localAnchorB));
        _this.m_frequencyHz = def.frequencyHz;
        _this.m_dampingRatio = def.dampingRatio;
        _this.m_impulse = 0;
        _this.m_gamma = 0;
        _this.m_bias = 0;
        return _this;
      }
      DistanceJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          frequencyHz: this.m_frequencyHz,
          dampingRatio: this.m_dampingRatio,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          length: this.m_length
        };
      };
      DistanceJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new DistanceJoint2(data);
        return joint;
      };
      DistanceJoint2.prototype._reset = function(def) {
        if (def.anchorA) {
          this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
        } else if (def.localAnchorA) {
          this.m_localAnchorA.setVec2(def.localAnchorA);
        }
        if (def.anchorB) {
          this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
        } else if (def.localAnchorB) {
          this.m_localAnchorB.setVec2(def.localAnchorB);
        }
        if (def.length > 0) {
          this.m_length = +def.length;
        } else if (def.length < 0) ;
        else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
          this.m_length = Vec2.distance(this.m_bodyA.getWorldPoint(this.m_localAnchorA), this.m_bodyB.getWorldPoint(this.m_localAnchorB));
        }
        if (Number.isFinite(def.frequencyHz)) {
          this.m_frequencyHz = def.frequencyHz;
        }
        if (Number.isFinite(def.dampingRatio)) {
          this.m_dampingRatio = def.dampingRatio;
        }
      };
      DistanceJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      DistanceJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      DistanceJoint2.prototype.setLength = function(length) {
        this.m_length = length;
      };
      DistanceJoint2.prototype.getLength = function() {
        return this.m_length;
      };
      DistanceJoint2.prototype.setFrequency = function(hz) {
        this.m_frequencyHz = hz;
      };
      DistanceJoint2.prototype.getFrequency = function() {
        return this.m_frequencyHz;
      };
      DistanceJoint2.prototype.setDampingRatio = function(ratio) {
        this.m_dampingRatio = ratio;
      };
      DistanceJoint2.prototype.getDampingRatio = function() {
        return this.m_dampingRatio;
      };
      DistanceJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      DistanceJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      DistanceJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
      };
      DistanceJoint2.prototype.getReactionTorque = function(inv_dt) {
        return 0;
      };
      DistanceJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        this.m_u = Vec2.sub(Vec2.add(cB2, this.m_rB), Vec2.add(cA2, this.m_rA));
        var length = this.m_u.length();
        if (length > SettingsInternal.linearSlop) {
          this.m_u.mul(1 / length);
        } else {
          this.m_u.setNum(0, 0);
        }
        var crAu = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
        var crBu = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
        var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
        this.m_mass = invMass != 0 ? 1 / invMass : 0;
        if (this.m_frequencyHz > 0) {
          var C = length - this.m_length;
          var omega = 2 * math_PI$3 * this.m_frequencyHz;
          var d2 = 2 * this.m_mass * this.m_dampingRatio * omega;
          var k = this.m_mass * omega * omega;
          var h2 = step.dt;
          this.m_gamma = h2 * (d2 + h2 * k);
          this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
          this.m_bias = C * h2 * k * this.m_gamma;
          invMass += this.m_gamma;
          this.m_mass = invMass != 0 ? 1 / invMass : 0;
        } else {
          this.m_gamma = 0;
          this.m_bias = 0;
        }
        if (step.warmStarting) {
          this.m_impulse *= step.dtRatio;
          var P3 = Vec2.mulNumVec2(this.m_impulse, this.m_u);
          vA2.subMul(this.m_invMassA, P3);
          wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
          vB2.addMul(this.m_invMassB, P3);
          wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
        } else {
          this.m_impulse = 0;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
      };
      DistanceJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var vpA = Vec2.add(vA2, Vec2.crossNumVec2(wA, this.m_rA));
        var vpB = Vec2.add(vB2, Vec2.crossNumVec2(wB, this.m_rB));
        var Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);
        var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += impulse;
        var P3 = Vec2.mulNumVec2(impulse, this.m_u);
        vA2.subMul(this.m_invMassA, P3);
        wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
        vB2.addMul(this.m_invMassB, P3);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
      };
      DistanceJoint2.prototype.solvePositionConstraints = function(step) {
        if (this.m_frequencyHz > 0) {
          return true;
        }
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
        var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
        var u = Vec2.sub(Vec2.add(cB2, rB2), Vec2.add(cA2, rA2));
        var length = u.normalize();
        var C = clamp(length - this.m_length, -SettingsInternal.maxLinearCorrection, SettingsInternal.maxLinearCorrection);
        var impulse = -this.m_mass * C;
        var P3 = Vec2.mulNumVec2(impulse, u);
        cA2.subMul(this.m_invMassA, P3);
        aA -= this.m_invIA * Vec2.crossVec2Vec2(rA2, P3);
        cB2.addMul(this.m_invMassB, P3);
        aB += this.m_invIB * Vec2.crossVec2Vec2(rB2, P3);
        this.m_bodyA.c_position.c.setVec2(cA2);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB2);
        this.m_bodyB.c_position.a = aB;
        return math_abs$5(C) < SettingsInternal.linearSlop;
      };
      DistanceJoint2.TYPE = "distance-joint";
      return DistanceJoint2;
    })(Joint)
  );
  var DEFAULTS$9 = {
    maxForce: 0,
    maxTorque: 0
  };
  var FrictionJoint = (
    /** @class */
    (function(_super) {
      __extends(FrictionJoint2, _super);
      function FrictionJoint2(def, bodyA, bodyB, anchor) {
        var _this = this;
        if (!(_this instanceof FrictionJoint2)) {
          return new FrictionJoint2(def, bodyA, bodyB, anchor);
        }
        def = options(def, DEFAULTS$9);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = FrictionJoint2.TYPE;
        _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        _this.m_linearImpulse = Vec2.zero();
        _this.m_angularImpulse = 0;
        _this.m_maxForce = def.maxForce;
        _this.m_maxTorque = def.maxTorque;
        return _this;
      }
      FrictionJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          maxForce: this.m_maxForce,
          maxTorque: this.m_maxTorque,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB
        };
      };
      FrictionJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new FrictionJoint2(data);
        return joint;
      };
      FrictionJoint2.prototype._reset = function(def) {
        if (def.anchorA) {
          this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
        } else if (def.localAnchorA) {
          this.m_localAnchorA.setVec2(def.localAnchorA);
        }
        if (def.anchorB) {
          this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
        } else if (def.localAnchorB) {
          this.m_localAnchorB.setVec2(def.localAnchorB);
        }
        if (Number.isFinite(def.maxForce)) {
          this.m_maxForce = def.maxForce;
        }
        if (Number.isFinite(def.maxTorque)) {
          this.m_maxTorque = def.maxTorque;
        }
      };
      FrictionJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      FrictionJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      FrictionJoint2.prototype.setMaxForce = function(force) {
        this.m_maxForce = force;
      };
      FrictionJoint2.prototype.getMaxForce = function() {
        return this.m_maxForce;
      };
      FrictionJoint2.prototype.setMaxTorque = function(torque) {
        this.m_maxTorque = torque;
      };
      FrictionJoint2.prototype.getMaxTorque = function() {
        return this.m_maxTorque;
      };
      FrictionJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      FrictionJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      FrictionJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
      };
      FrictionJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * this.m_angularImpulse;
      };
      FrictionJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var K = new Mat22();
        K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
        K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
        this.m_linearMass = K.getInverse();
        this.m_angularMass = iA + iB;
        if (this.m_angularMass > 0) {
          this.m_angularMass = 1 / this.m_angularMass;
        }
        if (step.warmStarting) {
          this.m_linearImpulse.mul(step.dtRatio);
          this.m_angularImpulse *= step.dtRatio;
          var P3 = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
          vA2.subMul(mA, P3);
          wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_angularImpulse);
          vB2.addMul(mB, P3);
          wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_angularImpulse);
        } else {
          this.m_linearImpulse.setZero();
          this.m_angularImpulse = 0;
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      FrictionJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var h2 = step.dt;
        {
          var Cdot = wB - wA;
          var impulse = -this.m_angularMass * Cdot;
          var oldImpulse = this.m_angularImpulse;
          var maxImpulse = h2 * this.m_maxTorque;
          this.m_angularImpulse = clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
          impulse = this.m_angularImpulse - oldImpulse;
          wA -= iA * impulse;
          wB += iB * impulse;
        }
        {
          var Cdot = Vec2.sub(Vec2.add(vB2, Vec2.crossNumVec2(wB, this.m_rB)), Vec2.add(vA2, Vec2.crossNumVec2(wA, this.m_rA)));
          var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
          var oldImpulse = this.m_linearImpulse;
          this.m_linearImpulse.add(impulse);
          var maxImpulse = h2 * this.m_maxForce;
          if (this.m_linearImpulse.lengthSquared() > maxImpulse * maxImpulse) {
            this.m_linearImpulse.normalize();
            this.m_linearImpulse.mul(maxImpulse);
          }
          impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
          vA2.subMul(mA, impulse);
          wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
          vB2.addMul(mB, impulse);
          wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      FrictionJoint2.prototype.solvePositionConstraints = function(step) {
        return true;
      };
      FrictionJoint2.TYPE = "friction-joint";
      return FrictionJoint2;
    })(Joint)
  );
  var Mat33 = (
    /** @class */
    (function() {
      function Mat332(a2, b2, c2) {
        if (typeof a2 === "object" && a2 !== null) {
          this.ex = Vec3.clone(a2);
          this.ey = Vec3.clone(b2);
          this.ez = Vec3.clone(c2);
        } else {
          this.ex = Vec3.zero();
          this.ey = Vec3.zero();
          this.ez = Vec3.zero();
        }
      }
      Mat332.prototype.toString = function() {
        return JSON.stringify(this);
      };
      Mat332.isValid = function(obj) {
        if (obj === null || typeof obj === "undefined") {
          return false;
        }
        return Vec3.isValid(obj.ex) && Vec3.isValid(obj.ey) && Vec3.isValid(obj.ez);
      };
      Mat332.assert = function(o2) {
      };
      Mat332.prototype.setZero = function() {
        this.ex.setZero();
        this.ey.setZero();
        this.ez.setZero();
        return this;
      };
      Mat332.prototype.solve33 = function(v3) {
        var cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
        var cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
        var cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
        var det = this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z;
        if (det !== 0) {
          det = 1 / det;
        }
        var r2 = new Vec3();
        cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
        cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
        cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
        r2.x = det * (v3.x * cross_x + v3.y * cross_y + v3.z * cross_z);
        cross_x = v3.y * this.ez.z - v3.z * this.ez.y;
        cross_y = v3.z * this.ez.x - v3.x * this.ez.z;
        cross_z = v3.x * this.ez.y - v3.y * this.ez.x;
        r2.y = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
        cross_x = this.ey.y * v3.z - this.ey.z * v3.y;
        cross_y = this.ey.z * v3.x - this.ey.x * v3.z;
        cross_z = this.ey.x * v3.y - this.ey.y * v3.x;
        r2.z = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
        return r2;
      };
      Mat332.prototype.solve22 = function(v3) {
        var a11 = this.ex.x;
        var a12 = this.ey.x;
        var a21 = this.ex.y;
        var a22 = this.ey.y;
        var det = a11 * a22 - a12 * a21;
        if (det !== 0) {
          det = 1 / det;
        }
        var r2 = Vec2.zero();
        r2.x = det * (a22 * v3.x - a12 * v3.y);
        r2.y = det * (a11 * v3.y - a21 * v3.x);
        return r2;
      };
      Mat332.prototype.getInverse22 = function(M) {
        var a2 = this.ex.x;
        var b2 = this.ey.x;
        var c2 = this.ex.y;
        var d2 = this.ey.y;
        var det = a2 * d2 - b2 * c2;
        if (det !== 0) {
          det = 1 / det;
        }
        M.ex.x = det * d2;
        M.ey.x = -det * b2;
        M.ex.z = 0;
        M.ex.y = -det * c2;
        M.ey.y = det * a2;
        M.ey.z = 0;
        M.ez.x = 0;
        M.ez.y = 0;
        M.ez.z = 0;
      };
      Mat332.prototype.getSymInverse33 = function(M) {
        var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
        if (det !== 0) {
          det = 1 / det;
        }
        var a11 = this.ex.x;
        var a12 = this.ey.x;
        var a13 = this.ez.x;
        var a22 = this.ey.y;
        var a23 = this.ez.y;
        var a33 = this.ez.z;
        M.ex.x = det * (a22 * a33 - a23 * a23);
        M.ex.y = det * (a13 * a23 - a12 * a33);
        M.ex.z = det * (a12 * a23 - a13 * a22);
        M.ey.x = M.ex.y;
        M.ey.y = det * (a11 * a33 - a13 * a13);
        M.ey.z = det * (a13 * a12 - a11 * a23);
        M.ez.x = M.ex.z;
        M.ez.y = M.ey.z;
        M.ez.z = det * (a11 * a22 - a12 * a12);
      };
      Mat332.mul = function(a2, b2) {
        if (b2 && "z" in b2 && "y" in b2 && "x" in b2) {
          var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y + a2.ez.x * b2.z;
          var y2 = a2.ex.y * b2.x + a2.ey.y * b2.y + a2.ez.y * b2.z;
          var z = a2.ex.z * b2.x + a2.ey.z * b2.y + a2.ez.z * b2.z;
          return new Vec3(x2, y2, z);
        } else if (b2 && "y" in b2 && "x" in b2) {
          var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y;
          var y2 = a2.ex.y * b2.x + a2.ey.y * b2.y;
          return Vec2.neo(x2, y2);
        }
      };
      Mat332.mulVec3 = function(a2, b2) {
        var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y + a2.ez.x * b2.z;
        var y2 = a2.ex.y * b2.x + a2.ey.y * b2.y + a2.ez.y * b2.z;
        var z = a2.ex.z * b2.x + a2.ey.z * b2.y + a2.ez.z * b2.z;
        return new Vec3(x2, y2, z);
      };
      Mat332.mulVec2 = function(a2, b2) {
        var x2 = a2.ex.x * b2.x + a2.ey.x * b2.y;
        var y2 = a2.ex.y * b2.x + a2.ey.y * b2.y;
        return Vec2.neo(x2, y2);
      };
      Mat332.add = function(a2, b2) {
        return new Mat332(Vec3.add(a2.ex, b2.ex), Vec3.add(a2.ey, b2.ey), Vec3.add(a2.ez, b2.ez));
      };
      return Mat332;
    })()
  );
  var math_abs$4 = Math.abs;
  var LimitState$2;
  (function(LimitState2) {
    LimitState2[LimitState2["inactiveLimit"] = 0] = "inactiveLimit";
    LimitState2[LimitState2["atLowerLimit"] = 1] = "atLowerLimit";
    LimitState2[LimitState2["atUpperLimit"] = 2] = "atUpperLimit";
    LimitState2[LimitState2["equalLimits"] = 3] = "equalLimits";
  })(LimitState$2 || (LimitState$2 = {}));
  var DEFAULTS$8 = {
    lowerAngle: 0,
    upperAngle: 0,
    maxMotorTorque: 0,
    motorSpeed: 0,
    enableLimit: false,
    enableMotor: false
  };
  var RevoluteJoint = (
    /** @class */
    (function(_super) {
      __extends(RevoluteJoint2, _super);
      function RevoluteJoint2(def, bodyA, bodyB, anchor) {
        var _this = this;
        var _a2, _b, _c, _d, _e, _f;
        if (!(_this instanceof RevoluteJoint2)) {
          return new RevoluteJoint2(def, bodyA, bodyB, anchor);
        }
        def = def !== null && def !== void 0 ? def : {};
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_mass = new Mat33();
        _this.m_limitState = LimitState$2.inactiveLimit;
        _this.m_type = RevoluteJoint2.TYPE;
        if (Vec2.isValid(anchor)) {
          _this.m_localAnchorA = bodyA.getLocalPoint(anchor);
        } else if (Vec2.isValid(def.localAnchorA)) {
          _this.m_localAnchorA = Vec2.clone(def.localAnchorA);
        } else {
          _this.m_localAnchorA = Vec2.zero();
        }
        if (Vec2.isValid(anchor)) {
          _this.m_localAnchorB = bodyB.getLocalPoint(anchor);
        } else if (Vec2.isValid(def.localAnchorB)) {
          _this.m_localAnchorB = Vec2.clone(def.localAnchorB);
        } else {
          _this.m_localAnchorB = Vec2.zero();
        }
        if (Number.isFinite(def.referenceAngle)) {
          _this.m_referenceAngle = def.referenceAngle;
        } else {
          _this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
        }
        _this.m_impulse = new Vec3();
        _this.m_motorImpulse = 0;
        _this.m_lowerAngle = (_a2 = def.lowerAngle) !== null && _a2 !== void 0 ? _a2 : DEFAULTS$8.lowerAngle;
        _this.m_upperAngle = (_b = def.upperAngle) !== null && _b !== void 0 ? _b : DEFAULTS$8.upperAngle;
        _this.m_maxMotorTorque = (_c = def.maxMotorTorque) !== null && _c !== void 0 ? _c : DEFAULTS$8.maxMotorTorque;
        _this.m_motorSpeed = (_d = def.motorSpeed) !== null && _d !== void 0 ? _d : DEFAULTS$8.motorSpeed;
        _this.m_enableLimit = (_e = def.enableLimit) !== null && _e !== void 0 ? _e : DEFAULTS$8.enableLimit;
        _this.m_enableMotor = (_f = def.enableMotor) !== null && _f !== void 0 ? _f : DEFAULTS$8.enableMotor;
        return _this;
      }
      RevoluteJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          lowerAngle: this.m_lowerAngle,
          upperAngle: this.m_upperAngle,
          maxMotorTorque: this.m_maxMotorTorque,
          motorSpeed: this.m_motorSpeed,
          enableLimit: this.m_enableLimit,
          enableMotor: this.m_enableMotor,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          referenceAngle: this.m_referenceAngle
        };
      };
      RevoluteJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new RevoluteJoint2(data);
        return joint;
      };
      RevoluteJoint2.prototype._reset = function(def) {
        if (def.anchorA) {
          this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
        } else if (def.localAnchorA) {
          this.m_localAnchorA.setVec2(def.localAnchorA);
        }
        if (def.anchorB) {
          this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
        } else if (def.localAnchorB) {
          this.m_localAnchorB.setVec2(def.localAnchorB);
        }
        if (Number.isFinite(def.referenceAngle)) {
          this.m_referenceAngle = def.referenceAngle;
        }
        if (def.enableLimit !== void 0) {
          this.m_enableLimit = def.enableLimit;
        }
        if (Number.isFinite(def.lowerAngle)) {
          this.m_lowerAngle = def.lowerAngle;
        }
        if (Number.isFinite(def.upperAngle)) {
          this.m_upperAngle = def.upperAngle;
        }
        if (Number.isFinite(def.maxMotorTorque)) {
          this.m_maxMotorTorque = def.maxMotorTorque;
        }
        if (Number.isFinite(def.motorSpeed)) {
          this.m_motorSpeed = def.motorSpeed;
        }
        if (def.enableMotor !== void 0) {
          this.m_enableMotor = def.enableMotor;
        }
      };
      RevoluteJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      RevoluteJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      RevoluteJoint2.prototype.getReferenceAngle = function() {
        return this.m_referenceAngle;
      };
      RevoluteJoint2.prototype.getJointAngle = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
      };
      RevoluteJoint2.prototype.getJointSpeed = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        return bB.m_angularVelocity - bA.m_angularVelocity;
      };
      RevoluteJoint2.prototype.isMotorEnabled = function() {
        return this.m_enableMotor;
      };
      RevoluteJoint2.prototype.enableMotor = function(flag) {
        if (flag == this.m_enableMotor)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableMotor = flag;
      };
      RevoluteJoint2.prototype.getMotorTorque = function(inv_dt) {
        return inv_dt * this.m_motorImpulse;
      };
      RevoluteJoint2.prototype.setMotorSpeed = function(speed) {
        if (speed == this.m_motorSpeed)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_motorSpeed = speed;
      };
      RevoluteJoint2.prototype.getMotorSpeed = function() {
        return this.m_motorSpeed;
      };
      RevoluteJoint2.prototype.setMaxMotorTorque = function(torque) {
        if (torque == this.m_maxMotorTorque)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_maxMotorTorque = torque;
      };
      RevoluteJoint2.prototype.getMaxMotorTorque = function() {
        return this.m_maxMotorTorque;
      };
      RevoluteJoint2.prototype.isLimitEnabled = function() {
        return this.m_enableLimit;
      };
      RevoluteJoint2.prototype.enableLimit = function(flag) {
        if (flag != this.m_enableLimit) {
          this.m_bodyA.setAwake(true);
          this.m_bodyB.setAwake(true);
          this.m_enableLimit = flag;
          this.m_impulse.z = 0;
        }
      };
      RevoluteJoint2.prototype.getLowerLimit = function() {
        return this.m_lowerAngle;
      };
      RevoluteJoint2.prototype.getUpperLimit = function() {
        return this.m_upperAngle;
      };
      RevoluteJoint2.prototype.setLimits = function(lower, upper) {
        if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
          this.m_bodyA.setAwake(true);
          this.m_bodyB.setAwake(true);
          this.m_impulse.z = 0;
          this.m_lowerAngle = lower;
          this.m_upperAngle = upper;
        }
      };
      RevoluteJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      RevoluteJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      RevoluteJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
      };
      RevoluteJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * this.m_impulse.z;
      };
      RevoluteJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var fixedRotation = iA + iB === 0;
        this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
        this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
        this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
        this.m_mass.ex.y = this.m_mass.ey.x;
        this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
        this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
        this.m_mass.ex.z = this.m_mass.ez.x;
        this.m_mass.ey.z = this.m_mass.ez.y;
        this.m_mass.ez.z = iA + iB;
        this.m_motorMass = iA + iB;
        if (this.m_motorMass > 0) {
          this.m_motorMass = 1 / this.m_motorMass;
        }
        if (this.m_enableMotor == false || fixedRotation) {
          this.m_motorImpulse = 0;
        }
        if (this.m_enableLimit && fixedRotation == false) {
          var jointAngle = aB - aA - this.m_referenceAngle;
          if (math_abs$4(this.m_upperAngle - this.m_lowerAngle) < 2 * SettingsInternal.angularSlop) {
            this.m_limitState = LimitState$2.equalLimits;
          } else if (jointAngle <= this.m_lowerAngle) {
            if (this.m_limitState != LimitState$2.atLowerLimit) {
              this.m_impulse.z = 0;
            }
            this.m_limitState = LimitState$2.atLowerLimit;
          } else if (jointAngle >= this.m_upperAngle) {
            if (this.m_limitState != LimitState$2.atUpperLimit) {
              this.m_impulse.z = 0;
            }
            this.m_limitState = LimitState$2.atUpperLimit;
          } else {
            this.m_limitState = LimitState$2.inactiveLimit;
            this.m_impulse.z = 0;
          }
        } else {
          this.m_limitState = LimitState$2.inactiveLimit;
        }
        if (step.warmStarting) {
          this.m_impulse.mul(step.dtRatio);
          this.m_motorImpulse *= step.dtRatio;
          var P3 = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
          vA2.subMul(mA, P3);
          wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_motorImpulse + this.m_impulse.z);
          vB2.addMul(mB, P3);
          wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_motorImpulse + this.m_impulse.z);
        } else {
          this.m_impulse.setZero();
          this.m_motorImpulse = 0;
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      RevoluteJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var fixedRotation = iA + iB === 0;
        if (this.m_enableMotor && this.m_limitState != LimitState$2.equalLimits && fixedRotation == false) {
          var Cdot = wB - wA - this.m_motorSpeed;
          var impulse = -this.m_motorMass * Cdot;
          var oldImpulse = this.m_motorImpulse;
          var maxImpulse = step.dt * this.m_maxMotorTorque;
          this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
          impulse = this.m_motorImpulse - oldImpulse;
          wA -= iA * impulse;
          wB += iB * impulse;
        }
        if (this.m_enableLimit && this.m_limitState != LimitState$2.inactiveLimit && fixedRotation == false) {
          var Cdot1 = Vec2.zero();
          Cdot1.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
          Cdot1.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
          var Cdot2 = wB - wA;
          var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
          var impulse = Vec3.neg(this.m_mass.solve33(Cdot));
          if (this.m_limitState == LimitState$2.equalLimits) {
            this.m_impulse.add(impulse);
          } else if (this.m_limitState == LimitState$2.atLowerLimit) {
            var newImpulse = this.m_impulse.z + impulse.z;
            if (newImpulse < 0) {
              var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
              var reduced = this.m_mass.solve22(rhs);
              impulse.x = reduced.x;
              impulse.y = reduced.y;
              impulse.z = -this.m_impulse.z;
              this.m_impulse.x += reduced.x;
              this.m_impulse.y += reduced.y;
              this.m_impulse.z = 0;
            } else {
              this.m_impulse.add(impulse);
            }
          } else if (this.m_limitState == LimitState$2.atUpperLimit) {
            var newImpulse = this.m_impulse.z + impulse.z;
            if (newImpulse > 0) {
              var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
              var reduced = this.m_mass.solve22(rhs);
              impulse.x = reduced.x;
              impulse.y = reduced.y;
              impulse.z = -this.m_impulse.z;
              this.m_impulse.x += reduced.x;
              this.m_impulse.y += reduced.y;
              this.m_impulse.z = 0;
            } else {
              this.m_impulse.add(impulse);
            }
          }
          var P3 = Vec2.neo(impulse.x, impulse.y);
          vA2.subMul(mA, P3);
          wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + impulse.z);
          vB2.addMul(mB, P3);
          wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + impulse.z);
        } else {
          var Cdot = Vec2.zero();
          Cdot.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
          Cdot.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
          var impulse = this.m_mass.solve22(Vec2.neg(Cdot));
          this.m_impulse.x += impulse.x;
          this.m_impulse.y += impulse.y;
          vA2.subMul(mA, impulse);
          wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
          vB2.addMul(mB, impulse);
          wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      RevoluteJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var angularError = 0;
        var positionError = 0;
        var fixedRotation = this.m_invIA + this.m_invIB == 0;
        if (this.m_enableLimit && this.m_limitState != LimitState$2.inactiveLimit && fixedRotation == false) {
          var angle = aB - aA - this.m_referenceAngle;
          var limitImpulse = 0;
          if (this.m_limitState == LimitState$2.equalLimits) {
            var C = clamp(angle - this.m_lowerAngle, -SettingsInternal.maxAngularCorrection, SettingsInternal.maxAngularCorrection);
            limitImpulse = -this.m_motorMass * C;
            angularError = math_abs$4(C);
          } else if (this.m_limitState == LimitState$2.atLowerLimit) {
            var C = angle - this.m_lowerAngle;
            angularError = -C;
            C = clamp(C + SettingsInternal.angularSlop, -SettingsInternal.maxAngularCorrection, 0);
            limitImpulse = -this.m_motorMass * C;
          } else if (this.m_limitState == LimitState$2.atUpperLimit) {
            var C = angle - this.m_upperAngle;
            angularError = C;
            C = clamp(C - SettingsInternal.angularSlop, 0, SettingsInternal.maxAngularCorrection);
            limitImpulse = -this.m_motorMass * C;
          }
          aA -= this.m_invIA * limitImpulse;
          aB += this.m_invIB * limitImpulse;
        }
        {
          qA.setAngle(aA);
          qB.setAngle(aB);
          var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
          var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
          var C = Vec2.zero();
          C.addCombine(1, cB2, 1, rB2);
          C.subCombine(1, cA2, 1, rA2);
          positionError = C.length();
          var mA = this.m_invMassA;
          var mB = this.m_invMassB;
          var iA = this.m_invIA;
          var iB = this.m_invIB;
          var K = new Mat22();
          K.ex.x = mA + mB + iA * rA2.y * rA2.y + iB * rB2.y * rB2.y;
          K.ex.y = -iA * rA2.x * rA2.y - iB * rB2.x * rB2.y;
          K.ey.x = K.ex.y;
          K.ey.y = mA + mB + iA * rA2.x * rA2.x + iB * rB2.x * rB2.x;
          var impulse = Vec2.neg(K.solve(C));
          cA2.subMul(mA, impulse);
          aA -= iA * Vec2.crossVec2Vec2(rA2, impulse);
          cB2.addMul(mB, impulse);
          aB += iB * Vec2.crossVec2Vec2(rB2, impulse);
        }
        this.m_bodyA.c_position.c.setVec2(cA2);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB2);
        this.m_bodyB.c_position.a = aB;
        return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
      };
      RevoluteJoint2.TYPE = "revolute-joint";
      return RevoluteJoint2;
    })(Joint)
  );
  var math_abs$3 = Math.abs;
  var math_max = Math.max;
  var math_min$2 = Math.min;
  var LimitState$1;
  (function(LimitState2) {
    LimitState2[LimitState2["inactiveLimit"] = 0] = "inactiveLimit";
    LimitState2[LimitState2["atLowerLimit"] = 1] = "atLowerLimit";
    LimitState2[LimitState2["atUpperLimit"] = 2] = "atUpperLimit";
    LimitState2[LimitState2["equalLimits"] = 3] = "equalLimits";
  })(LimitState$1 || (LimitState$1 = {}));
  var DEFAULTS$7 = {
    enableLimit: false,
    lowerTranslation: 0,
    upperTranslation: 0,
    enableMotor: false,
    maxMotorForce: 0,
    motorSpeed: 0
  };
  var PrismaticJoint = (
    /** @class */
    (function(_super) {
      __extends(PrismaticJoint2, _super);
      function PrismaticJoint2(def, bodyA, bodyB, anchor, axis) {
        var _this = this;
        if (!(_this instanceof PrismaticJoint2)) {
          return new PrismaticJoint2(def, bodyA, bodyB, anchor, axis);
        }
        def = options(def, DEFAULTS$7);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = PrismaticJoint2.TYPE;
        _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        _this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1, 0));
        _this.m_localXAxisA.normalize();
        _this.m_localYAxisA = Vec2.crossNumVec2(1, _this.m_localXAxisA);
        _this.m_referenceAngle = Number.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
        _this.m_impulse = new Vec3();
        _this.m_motorMass = 0;
        _this.m_motorImpulse = 0;
        _this.m_lowerTranslation = def.lowerTranslation;
        _this.m_upperTranslation = def.upperTranslation;
        _this.m_maxMotorForce = def.maxMotorForce;
        _this.m_motorSpeed = def.motorSpeed;
        _this.m_enableLimit = def.enableLimit;
        _this.m_enableMotor = def.enableMotor;
        _this.m_limitState = LimitState$1.inactiveLimit;
        _this.m_axis = Vec2.zero();
        _this.m_perp = Vec2.zero();
        _this.m_K = new Mat33();
        return _this;
      }
      PrismaticJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          lowerTranslation: this.m_lowerTranslation,
          upperTranslation: this.m_upperTranslation,
          maxMotorForce: this.m_maxMotorForce,
          motorSpeed: this.m_motorSpeed,
          enableLimit: this.m_enableLimit,
          enableMotor: this.m_enableMotor,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          localAxisA: this.m_localXAxisA,
          referenceAngle: this.m_referenceAngle
        };
      };
      PrismaticJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        data.localAxisA = Vec2.clone(data.localAxisA);
        var joint = new PrismaticJoint2(data);
        return joint;
      };
      PrismaticJoint2.prototype._reset = function(def) {
        if (def.anchorA) {
          this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
        } else if (def.localAnchorA) {
          this.m_localAnchorA.setVec2(def.localAnchorA);
        }
        if (def.anchorB) {
          this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
        } else if (def.localAnchorB) {
          this.m_localAnchorB.setVec2(def.localAnchorB);
        }
        if (def.localAxisA) {
          this.m_localXAxisA.setVec2(def.localAxisA);
          this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1, def.localAxisA));
        }
        if (Number.isFinite(def.referenceAngle)) {
          this.m_referenceAngle = def.referenceAngle;
        }
        if (typeof def.enableLimit !== "undefined") {
          this.m_enableLimit = !!def.enableLimit;
        }
        if (Number.isFinite(def.lowerTranslation)) {
          this.m_lowerTranslation = def.lowerTranslation;
        }
        if (Number.isFinite(def.upperTranslation)) {
          this.m_upperTranslation = def.upperTranslation;
        }
        if (typeof def.enableMotor !== "undefined") {
          this.m_enableMotor = !!def.enableMotor;
        }
        if (Number.isFinite(def.maxMotorForce)) {
          this.m_maxMotorForce = def.maxMotorForce;
        }
        if (Number.isFinite(def.motorSpeed)) {
          this.m_motorSpeed = def.motorSpeed;
        }
      };
      PrismaticJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      PrismaticJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      PrismaticJoint2.prototype.getLocalAxisA = function() {
        return this.m_localXAxisA;
      };
      PrismaticJoint2.prototype.getReferenceAngle = function() {
        return this.m_referenceAngle;
      };
      PrismaticJoint2.prototype.getJointTranslation = function() {
        var pA2 = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        var pB2 = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        var d2 = Vec2.sub(pB2, pA2);
        var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
        var translation2 = Vec2.dot(d2, axis);
        return translation2;
      };
      PrismaticJoint2.prototype.getJointSpeed = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var rA2 = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter));
        var rB2 = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter));
        var p1 = Vec2.add(bA.m_sweep.c, rA2);
        var p2 = Vec2.add(bB.m_sweep.c, rB2);
        var d2 = Vec2.sub(p2, p1);
        var axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA);
        var vA2 = bA.m_linearVelocity;
        var vB2 = bB.m_linearVelocity;
        var wA = bA.m_angularVelocity;
        var wB = bB.m_angularVelocity;
        var speed = Vec2.dot(d2, Vec2.crossNumVec2(wA, axis)) + Vec2.dot(axis, Vec2.sub(Vec2.addCrossNumVec2(vB2, wB, rB2), Vec2.addCrossNumVec2(vA2, wA, rA2)));
        return speed;
      };
      PrismaticJoint2.prototype.isLimitEnabled = function() {
        return this.m_enableLimit;
      };
      PrismaticJoint2.prototype.enableLimit = function(flag) {
        if (flag != this.m_enableLimit) {
          this.m_bodyA.setAwake(true);
          this.m_bodyB.setAwake(true);
          this.m_enableLimit = flag;
          this.m_impulse.z = 0;
        }
      };
      PrismaticJoint2.prototype.getLowerLimit = function() {
        return this.m_lowerTranslation;
      };
      PrismaticJoint2.prototype.getUpperLimit = function() {
        return this.m_upperTranslation;
      };
      PrismaticJoint2.prototype.setLimits = function(lower, upper) {
        if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
          this.m_bodyA.setAwake(true);
          this.m_bodyB.setAwake(true);
          this.m_lowerTranslation = lower;
          this.m_upperTranslation = upper;
          this.m_impulse.z = 0;
        }
      };
      PrismaticJoint2.prototype.isMotorEnabled = function() {
        return this.m_enableMotor;
      };
      PrismaticJoint2.prototype.enableMotor = function(flag) {
        if (flag == this.m_enableMotor)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableMotor = flag;
      };
      PrismaticJoint2.prototype.setMotorSpeed = function(speed) {
        if (speed == this.m_motorSpeed)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_motorSpeed = speed;
      };
      PrismaticJoint2.prototype.setMaxMotorForce = function(force) {
        if (force == this.m_maxMotorForce)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_maxMotorForce = force;
      };
      PrismaticJoint2.prototype.getMaxMotorForce = function() {
        return this.m_maxMotorForce;
      };
      PrismaticJoint2.prototype.getMotorSpeed = function() {
        return this.m_motorSpeed;
      };
      PrismaticJoint2.prototype.getMotorForce = function(inv_dt) {
        return inv_dt * this.m_motorImpulse;
      };
      PrismaticJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      PrismaticJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      PrismaticJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis).mul(inv_dt);
      };
      PrismaticJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * this.m_impulse.y;
      };
      PrismaticJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var d2 = Vec2.zero();
        d2.addCombine(1, cB2, 1, rB2);
        d2.subCombine(1, cA2, 1, rA2);
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        {
          this.m_axis = Rot.mulVec2(qA, this.m_localXAxisA);
          this.m_a1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_axis);
          this.m_a2 = Vec2.crossVec2Vec2(rB2, this.m_axis);
          this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
          if (this.m_motorMass > 0) {
            this.m_motorMass = 1 / this.m_motorMass;
          }
        }
        {
          this.m_perp = Rot.mulVec2(qA, this.m_localYAxisA);
          this.m_s1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_perp);
          this.m_s2 = Vec2.crossVec2Vec2(rB2, this.m_perp);
          Vec2.crossVec2Vec2(rA2, this.m_perp);
          var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
          var k12 = iA * this.m_s1 + iB * this.m_s2;
          var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
          var k22 = iA + iB;
          if (k22 == 0) {
            k22 = 1;
          }
          var k23 = iA * this.m_a1 + iB * this.m_a2;
          var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
          this.m_K.ex.set(k11, k12, k13);
          this.m_K.ey.set(k12, k22, k23);
          this.m_K.ez.set(k13, k23, k33);
        }
        if (this.m_enableLimit) {
          var jointTranslation = Vec2.dot(this.m_axis, d2);
          if (math_abs$3(this.m_upperTranslation - this.m_lowerTranslation) < 2 * SettingsInternal.linearSlop) {
            this.m_limitState = LimitState$1.equalLimits;
          } else if (jointTranslation <= this.m_lowerTranslation) {
            if (this.m_limitState != LimitState$1.atLowerLimit) {
              this.m_limitState = LimitState$1.atLowerLimit;
              this.m_impulse.z = 0;
            }
          } else if (jointTranslation >= this.m_upperTranslation) {
            if (this.m_limitState != LimitState$1.atUpperLimit) {
              this.m_limitState = LimitState$1.atUpperLimit;
              this.m_impulse.z = 0;
            }
          } else {
            this.m_limitState = LimitState$1.inactiveLimit;
            this.m_impulse.z = 0;
          }
        } else {
          this.m_limitState = LimitState$1.inactiveLimit;
          this.m_impulse.z = 0;
        }
        if (this.m_enableMotor == false) {
          this.m_motorImpulse = 0;
        }
        if (step.warmStarting) {
          this.m_impulse.mul(step.dtRatio);
          this.m_motorImpulse *= step.dtRatio;
          var P3 = Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis);
          var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
          var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
          vA2.subMul(mA, P3);
          wA -= iA * LA;
          vB2.addMul(mB, P3);
          wB += iB * LB;
        } else {
          this.m_impulse.setZero();
          this.m_motorImpulse = 0;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
      };
      PrismaticJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        if (this.m_enableMotor && this.m_limitState != LimitState$1.equalLimits) {
          var Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB2, vA2)) + this.m_a2 * wB - this.m_a1 * wA;
          var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
          var oldImpulse = this.m_motorImpulse;
          var maxImpulse = step.dt * this.m_maxMotorForce;
          this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
          impulse = this.m_motorImpulse - oldImpulse;
          var P3 = Vec2.mulNumVec2(impulse, this.m_axis);
          var LA = impulse * this.m_a1;
          var LB = impulse * this.m_a2;
          vA2.subMul(mA, P3);
          wA -= iA * LA;
          vB2.addMul(mB, P3);
          wB += iB * LB;
        }
        var Cdot1 = Vec2.zero();
        Cdot1.x += Vec2.dot(this.m_perp, vB2) + this.m_s2 * wB;
        Cdot1.x -= Vec2.dot(this.m_perp, vA2) + this.m_s1 * wA;
        Cdot1.y = wB - wA;
        if (this.m_enableLimit && this.m_limitState != LimitState$1.inactiveLimit) {
          var Cdot2 = 0;
          Cdot2 += Vec2.dot(this.m_axis, vB2) + this.m_a2 * wB;
          Cdot2 -= Vec2.dot(this.m_axis, vA2) + this.m_a1 * wA;
          var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
          var f1 = Vec3.clone(this.m_impulse);
          var df = this.m_K.solve33(Vec3.neg(Cdot));
          this.m_impulse.add(df);
          if (this.m_limitState == LimitState$1.atLowerLimit) {
            this.m_impulse.z = math_max(this.m_impulse.z, 0);
          } else if (this.m_limitState == LimitState$1.atUpperLimit) {
            this.m_impulse.z = math_min$2(this.m_impulse.z, 0);
          }
          var b2 = Vec2.combine(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y));
          var f2r = Vec2.add(this.m_K.solve22(b2), Vec2.neo(f1.x, f1.y));
          this.m_impulse.x = f2r.x;
          this.m_impulse.y = f2r.y;
          df = Vec3.sub(this.m_impulse, f1);
          var P3 = Vec2.combine(df.x, this.m_perp, df.z, this.m_axis);
          var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1;
          var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2;
          vA2.subMul(mA, P3);
          wA -= iA * LA;
          vB2.addMul(mB, P3);
          wB += iB * LB;
        } else {
          var df = this.m_K.solve22(Vec2.neg(Cdot1));
          this.m_impulse.x += df.x;
          this.m_impulse.y += df.y;
          var P3 = Vec2.mulNumVec2(df.x, this.m_perp);
          var LA = df.x * this.m_s1 + df.y;
          var LB = df.x * this.m_s2 + df.y;
          vA2.subMul(mA, P3);
          wA -= iA * LA;
          vB2.addMul(mB, P3);
          wB += iB * LB;
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      PrismaticJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var d2 = Vec2.sub(Vec2.add(cB2, rB2), Vec2.add(cA2, rA2));
        var axis = Rot.mulVec2(qA, this.m_localXAxisA);
        var a1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), axis);
        var a2 = Vec2.crossVec2Vec2(rB2, axis);
        var perp2 = Rot.mulVec2(qA, this.m_localYAxisA);
        var s1 = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), perp2);
        var s2 = Vec2.crossVec2Vec2(rB2, perp2);
        var impulse = new Vec3();
        var C1 = Vec2.zero();
        C1.x = Vec2.dot(perp2, d2);
        C1.y = aB - aA - this.m_referenceAngle;
        var linearError = math_abs$3(C1.x);
        var angularError = math_abs$3(C1.y);
        var linearSlop = SettingsInternal.linearSlop;
        var maxLinearCorrection = SettingsInternal.maxLinearCorrection;
        var active = false;
        var C2 = 0;
        if (this.m_enableLimit) {
          var translation2 = Vec2.dot(axis, d2);
          if (math_abs$3(this.m_upperTranslation - this.m_lowerTranslation) < 2 * linearSlop) {
            C2 = clamp(translation2, -maxLinearCorrection, maxLinearCorrection);
            linearError = math_max(linearError, math_abs$3(translation2));
            active = true;
          } else if (translation2 <= this.m_lowerTranslation) {
            C2 = clamp(translation2 - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0);
            linearError = Math.max(linearError, this.m_lowerTranslation - translation2);
            active = true;
          } else if (translation2 >= this.m_upperTranslation) {
            C2 = clamp(translation2 - this.m_upperTranslation - linearSlop, 0, maxLinearCorrection);
            linearError = Math.max(linearError, translation2 - this.m_upperTranslation);
            active = true;
          }
        }
        if (active) {
          var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
          var k12 = iA * s1 + iB * s2;
          var k13 = iA * s1 * a1 + iB * s2 * a2;
          var k22 = iA + iB;
          if (k22 == 0) {
            k22 = 1;
          }
          var k23 = iA * a1 + iB * a2;
          var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
          var K = new Mat33();
          K.ex.set(k11, k12, k13);
          K.ey.set(k12, k22, k23);
          K.ez.set(k13, k23, k33);
          var C = new Vec3();
          C.x = C1.x;
          C.y = C1.y;
          C.z = C2;
          impulse = K.solve33(Vec3.neg(C));
        } else {
          var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
          var k12 = iA * s1 + iB * s2;
          var k22 = iA + iB;
          if (k22 == 0) {
            k22 = 1;
          }
          var K = new Mat22();
          K.ex.setNum(k11, k12);
          K.ey.setNum(k12, k22);
          var impulse1 = K.solve(Vec2.neg(C1));
          impulse.x = impulse1.x;
          impulse.y = impulse1.y;
          impulse.z = 0;
        }
        var P3 = Vec2.combine(impulse.x, perp2, impulse.z, axis);
        var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
        var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
        cA2.subMul(mA, P3);
        aA -= iA * LA;
        cB2.addMul(mB, P3);
        aB += iB * LB;
        this.m_bodyA.c_position.c = cA2;
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c = cB2;
        this.m_bodyB.c_position.a = aB;
        return linearError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
      };
      PrismaticJoint2.TYPE = "prismatic-joint";
      return PrismaticJoint2;
    })(Joint)
  );
  var DEFAULTS$6 = {
    ratio: 1
  };
  var GearJoint = (
    /** @class */
    (function(_super) {
      __extends(GearJoint2, _super);
      function GearJoint2(def, bodyA, bodyB, joint1, joint2, ratio) {
        var _this = this;
        if (!(_this instanceof GearJoint2)) {
          return new GearJoint2(def, bodyA, bodyB, joint1, joint2, ratio);
        }
        def = options(def, DEFAULTS$6);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = GearJoint2.TYPE;
        _this.m_joint1 = joint1 ? joint1 : def.joint1;
        _this.m_joint2 = joint2 ? joint2 : def.joint2;
        _this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;
        _this.m_type1 = _this.m_joint1.getType();
        _this.m_type2 = _this.m_joint2.getType();
        var coordinateA;
        var coordinateB;
        _this.m_bodyC = _this.m_joint1.getBodyA();
        _this.m_bodyA = _this.m_joint1.getBodyB();
        var xfA2 = _this.m_bodyA.m_xf;
        var aA = _this.m_bodyA.m_sweep.a;
        var xfC = _this.m_bodyC.m_xf;
        var aC = _this.m_bodyC.m_sweep.a;
        if (_this.m_type1 === RevoluteJoint.TYPE) {
          var revolute = _this.m_joint1;
          _this.m_localAnchorC = revolute.m_localAnchorA;
          _this.m_localAnchorA = revolute.m_localAnchorB;
          _this.m_referenceAngleA = revolute.m_referenceAngle;
          _this.m_localAxisC = Vec2.zero();
          coordinateA = aA - aC - _this.m_referenceAngleA;
        } else {
          var prismatic = _this.m_joint1;
          _this.m_localAnchorC = prismatic.m_localAnchorA;
          _this.m_localAnchorA = prismatic.m_localAnchorB;
          _this.m_referenceAngleA = prismatic.m_referenceAngle;
          _this.m_localAxisC = prismatic.m_localXAxisA;
          var pC = _this.m_localAnchorC;
          var pA2 = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mulVec2(xfA2.q, _this.m_localAnchorA), Vec2.sub(xfA2.p, xfC.p)));
          coordinateA = Vec2.dot(pA2, _this.m_localAxisC) - Vec2.dot(pC, _this.m_localAxisC);
        }
        _this.m_bodyD = _this.m_joint2.getBodyA();
        _this.m_bodyB = _this.m_joint2.getBodyB();
        var xfB2 = _this.m_bodyB.m_xf;
        var aB = _this.m_bodyB.m_sweep.a;
        var xfD = _this.m_bodyD.m_xf;
        var aD = _this.m_bodyD.m_sweep.a;
        if (_this.m_type2 === RevoluteJoint.TYPE) {
          var revolute = _this.m_joint2;
          _this.m_localAnchorD = revolute.m_localAnchorA;
          _this.m_localAnchorB = revolute.m_localAnchorB;
          _this.m_referenceAngleB = revolute.m_referenceAngle;
          _this.m_localAxisD = Vec2.zero();
          coordinateB = aB - aD - _this.m_referenceAngleB;
        } else {
          var prismatic = _this.m_joint2;
          _this.m_localAnchorD = prismatic.m_localAnchorA;
          _this.m_localAnchorB = prismatic.m_localAnchorB;
          _this.m_referenceAngleB = prismatic.m_referenceAngle;
          _this.m_localAxisD = prismatic.m_localXAxisA;
          var pD = _this.m_localAnchorD;
          var pB2 = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mulVec2(xfB2.q, _this.m_localAnchorB), Vec2.sub(xfB2.p, xfD.p)));
          coordinateB = Vec2.dot(pB2, _this.m_localAxisD) - Vec2.dot(pD, _this.m_localAxisD);
        }
        _this.m_constant = coordinateA + _this.m_ratio * coordinateB;
        _this.m_impulse = 0;
        return _this;
      }
      GearJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          joint1: this.m_joint1,
          joint2: this.m_joint2,
          ratio: this.m_ratio
          // _constant: this.m_constant,
        };
      };
      GearJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        data.joint1 = restore(Joint, data.joint1, world);
        data.joint2 = restore(Joint, data.joint2, world);
        var joint = new GearJoint2(data);
        return joint;
      };
      GearJoint2.prototype._reset = function(def) {
        if (Number.isFinite(def.ratio)) {
          this.m_ratio = def.ratio;
        }
      };
      GearJoint2.prototype.getJoint1 = function() {
        return this.m_joint1;
      };
      GearJoint2.prototype.getJoint2 = function() {
        return this.m_joint2;
      };
      GearJoint2.prototype.setRatio = function(ratio) {
        this.m_ratio = ratio;
      };
      GearJoint2.prototype.getRatio = function() {
        return this.m_ratio;
      };
      GearJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      GearJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      GearJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_JvAC).mul(inv_dt);
      };
      GearJoint2.prototype.getReactionTorque = function(inv_dt) {
        var L = this.m_impulse * this.m_JwA;
        return inv_dt * L;
      };
      GearJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_lcA = this.m_bodyA.m_sweep.localCenter;
        this.m_lcB = this.m_bodyB.m_sweep.localCenter;
        this.m_lcC = this.m_bodyC.m_sweep.localCenter;
        this.m_lcD = this.m_bodyD.m_sweep.localCenter;
        this.m_mA = this.m_bodyA.m_invMass;
        this.m_mB = this.m_bodyB.m_invMass;
        this.m_mC = this.m_bodyC.m_invMass;
        this.m_mD = this.m_bodyD.m_invMass;
        this.m_iA = this.m_bodyA.m_invI;
        this.m_iB = this.m_bodyB.m_invI;
        this.m_iC = this.m_bodyC.m_invI;
        this.m_iD = this.m_bodyD.m_invI;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var aC = this.m_bodyC.c_position.a;
        var vC = this.m_bodyC.c_velocity.v;
        var wC = this.m_bodyC.c_velocity.w;
        var aD = this.m_bodyD.c_position.a;
        var vD = this.m_bodyD.c_velocity.v;
        var wD = this.m_bodyD.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var qC = Rot.neo(aC);
        var qD = Rot.neo(aD);
        this.m_mass = 0;
        if (this.m_type1 == RevoluteJoint.TYPE) {
          this.m_JvAC = Vec2.zero();
          this.m_JwA = 1;
          this.m_JwC = 1;
          this.m_mass += this.m_iA + this.m_iC;
        } else {
          var u = Rot.mulVec2(qC, this.m_localAxisC);
          var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
          var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
          this.m_JvAC = u;
          this.m_JwC = Vec2.crossVec2Vec2(rC, u);
          this.m_JwA = Vec2.crossVec2Vec2(rA2, u);
          this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
        }
        if (this.m_type2 == RevoluteJoint.TYPE) {
          this.m_JvBD = Vec2.zero();
          this.m_JwB = this.m_ratio;
          this.m_JwD = this.m_ratio;
          this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
        } else {
          var u = Rot.mulVec2(qD, this.m_localAxisD);
          var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
          var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
          this.m_JvBD = Vec2.mulNumVec2(this.m_ratio, u);
          this.m_JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
          this.m_JwB = this.m_ratio * Vec2.crossVec2Vec2(rB2, u);
          this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
        }
        this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0;
        if (step.warmStarting) {
          vA2.addMul(this.m_mA * this.m_impulse, this.m_JvAC);
          wA += this.m_iA * this.m_impulse * this.m_JwA;
          vB2.addMul(this.m_mB * this.m_impulse, this.m_JvBD);
          wB += this.m_iB * this.m_impulse * this.m_JwB;
          vC.subMul(this.m_mC * this.m_impulse, this.m_JvAC);
          wC -= this.m_iC * this.m_impulse * this.m_JwC;
          vD.subMul(this.m_mD * this.m_impulse, this.m_JvBD);
          wD -= this.m_iD * this.m_impulse * this.m_JwD;
        } else {
          this.m_impulse = 0;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
        this.m_bodyC.c_velocity.v.setVec2(vC);
        this.m_bodyC.c_velocity.w = wC;
        this.m_bodyD.c_velocity.v.setVec2(vD);
        this.m_bodyD.c_velocity.w = wD;
      };
      GearJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var vC = this.m_bodyC.c_velocity.v;
        var wC = this.m_bodyC.c_velocity.w;
        var vD = this.m_bodyD.c_velocity.v;
        var wD = this.m_bodyD.c_velocity.w;
        var Cdot = Vec2.dot(this.m_JvAC, vA2) - Vec2.dot(this.m_JvAC, vC) + Vec2.dot(this.m_JvBD, vB2) - Vec2.dot(this.m_JvBD, vD);
        Cdot += this.m_JwA * wA - this.m_JwC * wC + (this.m_JwB * wB - this.m_JwD * wD);
        var impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        vA2.addMul(this.m_mA * impulse, this.m_JvAC);
        wA += this.m_iA * impulse * this.m_JwA;
        vB2.addMul(this.m_mB * impulse, this.m_JvBD);
        wB += this.m_iB * impulse * this.m_JwB;
        vC.subMul(this.m_mC * impulse, this.m_JvAC);
        wC -= this.m_iC * impulse * this.m_JwC;
        vD.subMul(this.m_mD * impulse, this.m_JvBD);
        wD -= this.m_iD * impulse * this.m_JwD;
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
        this.m_bodyC.c_velocity.v.setVec2(vC);
        this.m_bodyC.c_velocity.w = wC;
        this.m_bodyD.c_velocity.v.setVec2(vD);
        this.m_bodyD.c_velocity.w = wD;
      };
      GearJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var cC = this.m_bodyC.c_position.c;
        var aC = this.m_bodyC.c_position.a;
        var cD = this.m_bodyD.c_position.c;
        var aD = this.m_bodyD.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var qC = Rot.neo(aC);
        var qD = Rot.neo(aD);
        var linearError = 0;
        var coordinateA;
        var coordinateB;
        var JvAC;
        var JvBD;
        var JwA;
        var JwB;
        var JwC;
        var JwD;
        var mass = 0;
        if (this.m_type1 == RevoluteJoint.TYPE) {
          JvAC = Vec2.zero();
          JwA = 1;
          JwC = 1;
          mass += this.m_iA + this.m_iC;
          coordinateA = aA - aC - this.m_referenceAngleA;
        } else {
          var u = Rot.mulVec2(qC, this.m_localAxisC);
          var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
          var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
          JvAC = u;
          JwC = Vec2.crossVec2Vec2(rC, u);
          JwA = Vec2.crossVec2Vec2(rA2, u);
          mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
          var pC = Vec2.sub(this.m_localAnchorC, this.m_lcC);
          var pA2 = Rot.mulTVec2(qC, Vec2.add(rA2, Vec2.sub(cA2, cC)));
          coordinateA = Vec2.dot(Vec2.sub(pA2, pC), this.m_localAxisC);
        }
        if (this.m_type2 == RevoluteJoint.TYPE) {
          JvBD = Vec2.zero();
          JwB = this.m_ratio;
          JwD = this.m_ratio;
          mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
          coordinateB = aB - aD - this.m_referenceAngleB;
        } else {
          var u = Rot.mulVec2(qD, this.m_localAxisD);
          var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
          var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
          JvBD = Vec2.mulNumVec2(this.m_ratio, u);
          JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
          JwB = this.m_ratio * Vec2.crossVec2Vec2(rB2, u);
          mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
          var pD = Vec2.sub(this.m_localAnchorD, this.m_lcD);
          var pB2 = Rot.mulTVec2(qD, Vec2.add(rB2, Vec2.sub(cB2, cD)));
          coordinateB = Vec2.dot(pB2, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
        }
        var C = coordinateA + this.m_ratio * coordinateB - this.m_constant;
        var impulse = 0;
        if (mass > 0) {
          impulse = -C / mass;
        }
        cA2.addMul(this.m_mA * impulse, JvAC);
        aA += this.m_iA * impulse * JwA;
        cB2.addMul(this.m_mB * impulse, JvBD);
        aB += this.m_iB * impulse * JwB;
        cC.subMul(this.m_mC * impulse, JvAC);
        aC -= this.m_iC * impulse * JwC;
        cD.subMul(this.m_mD * impulse, JvBD);
        aD -= this.m_iD * impulse * JwD;
        this.m_bodyA.c_position.c.setVec2(cA2);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB2);
        this.m_bodyB.c_position.a = aB;
        this.m_bodyC.c_position.c.setVec2(cC);
        this.m_bodyC.c_position.a = aC;
        this.m_bodyD.c_position.c.setVec2(cD);
        this.m_bodyD.c_position.a = aD;
        return linearError < SettingsInternal.linearSlop;
      };
      GearJoint2.TYPE = "gear-joint";
      return GearJoint2;
    })(Joint)
  );
  var DEFAULTS$5 = {
    maxForce: 1,
    maxTorque: 1,
    correctionFactor: 0.3
  };
  var MotorJoint = (
    /** @class */
    (function(_super) {
      __extends(MotorJoint2, _super);
      function MotorJoint2(def, bodyA, bodyB) {
        var _this = this;
        if (!(_this instanceof MotorJoint2)) {
          return new MotorJoint2(def, bodyA, bodyB);
        }
        def = options(def, DEFAULTS$5);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = MotorJoint2.TYPE;
        _this.m_linearOffset = Vec2.isValid(def.linearOffset) ? Vec2.clone(def.linearOffset) : bodyA.getLocalPoint(bodyB.getPosition());
        _this.m_angularOffset = Number.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();
        _this.m_linearImpulse = Vec2.zero();
        _this.m_angularImpulse = 0;
        _this.m_maxForce = def.maxForce;
        _this.m_maxTorque = def.maxTorque;
        _this.m_correctionFactor = def.correctionFactor;
        return _this;
      }
      MotorJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          maxForce: this.m_maxForce,
          maxTorque: this.m_maxTorque,
          correctionFactor: this.m_correctionFactor,
          linearOffset: this.m_linearOffset,
          angularOffset: this.m_angularOffset
        };
      };
      MotorJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new MotorJoint2(data);
        return joint;
      };
      MotorJoint2.prototype._reset = function(def) {
        if (Number.isFinite(def.angularOffset)) {
          this.m_angularOffset = def.angularOffset;
        }
        if (Number.isFinite(def.maxForce)) {
          this.m_maxForce = def.maxForce;
        }
        if (Number.isFinite(def.maxTorque)) {
          this.m_maxTorque = def.maxTorque;
        }
        if (Number.isFinite(def.correctionFactor)) {
          this.m_correctionFactor = def.correctionFactor;
        }
        if (Vec2.isValid(def.linearOffset)) {
          this.m_linearOffset.set(def.linearOffset);
        }
      };
      MotorJoint2.prototype.setMaxForce = function(force) {
        this.m_maxForce = force;
      };
      MotorJoint2.prototype.getMaxForce = function() {
        return this.m_maxForce;
      };
      MotorJoint2.prototype.setMaxTorque = function(torque) {
        this.m_maxTorque = torque;
      };
      MotorJoint2.prototype.getMaxTorque = function() {
        return this.m_maxTorque;
      };
      MotorJoint2.prototype.setCorrectionFactor = function(factor) {
        this.m_correctionFactor = factor;
      };
      MotorJoint2.prototype.getCorrectionFactor = function() {
        return this.m_correctionFactor;
      };
      MotorJoint2.prototype.setLinearOffset = function(linearOffset) {
        if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
          this.m_bodyA.setAwake(true);
          this.m_bodyB.setAwake(true);
          this.m_linearOffset.set(linearOffset);
        }
      };
      MotorJoint2.prototype.getLinearOffset = function() {
        return this.m_linearOffset;
      };
      MotorJoint2.prototype.setAngularOffset = function(angularOffset) {
        if (angularOffset != this.m_angularOffset) {
          this.m_bodyA.setAwake(true);
          this.m_bodyB.setAwake(true);
          this.m_angularOffset = angularOffset;
        }
      };
      MotorJoint2.prototype.getAngularOffset = function() {
        return this.m_angularOffset;
      };
      MotorJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getPosition();
      };
      MotorJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getPosition();
      };
      MotorJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
      };
      MotorJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * this.m_angularImpulse;
      };
      MotorJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_linearOffset, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var K = new Mat22();
        K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
        K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
        this.m_linearMass = K.getInverse();
        this.m_angularMass = iA + iB;
        if (this.m_angularMass > 0) {
          this.m_angularMass = 1 / this.m_angularMass;
        }
        this.m_linearError = Vec2.zero();
        this.m_linearError.addCombine(1, cB2, 1, this.m_rB);
        this.m_linearError.subCombine(1, cA2, 1, this.m_rA);
        this.m_angularError = aB - aA - this.m_angularOffset;
        if (step.warmStarting) {
          this.m_linearImpulse.mul(step.dtRatio);
          this.m_angularImpulse *= step.dtRatio;
          var P3 = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
          vA2.subMul(mA, P3);
          wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_angularImpulse);
          vB2.addMul(mB, P3);
          wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_angularImpulse);
        } else {
          this.m_linearImpulse.setZero();
          this.m_angularImpulse = 0;
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      MotorJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var h2 = step.dt;
        var inv_h = step.inv_dt;
        {
          var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
          var impulse = -this.m_angularMass * Cdot;
          var oldImpulse = this.m_angularImpulse;
          var maxImpulse = h2 * this.m_maxTorque;
          this.m_angularImpulse = clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
          impulse = this.m_angularImpulse - oldImpulse;
          wA -= iA * impulse;
          wB += iB * impulse;
        }
        {
          var Cdot = Vec2.zero();
          Cdot.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
          Cdot.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
          Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);
          var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
          var oldImpulse = Vec2.clone(this.m_linearImpulse);
          this.m_linearImpulse.add(impulse);
          var maxImpulse = h2 * this.m_maxForce;
          this.m_linearImpulse.clamp(maxImpulse);
          impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
          vA2.subMul(mA, impulse);
          wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
          vB2.addMul(mB, impulse);
          wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      MotorJoint2.prototype.solvePositionConstraints = function(step) {
        return true;
      };
      MotorJoint2.TYPE = "motor-joint";
      return MotorJoint2;
    })(Joint)
  );
  var math_PI$2 = Math.PI;
  var DEFAULTS$4 = {
    maxForce: 0,
    frequencyHz: 5,
    dampingRatio: 0.7
  };
  var MouseJoint = (
    /** @class */
    (function(_super) {
      __extends(MouseJoint2, _super);
      function MouseJoint2(def, bodyA, bodyB, target) {
        var _this = this;
        if (!(_this instanceof MouseJoint2)) {
          return new MouseJoint2(def, bodyA, bodyB, target);
        }
        def = options(def, DEFAULTS$4);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = MouseJoint2.TYPE;
        if (Vec2.isValid(target)) {
          _this.m_targetA = Vec2.clone(target);
        } else if (Vec2.isValid(def.target)) {
          _this.m_targetA = Vec2.clone(def.target);
        } else {
          _this.m_targetA = Vec2.zero();
        }
        _this.m_localAnchorB = Transform.mulTVec2(bodyB.getTransform(), _this.m_targetA);
        _this.m_maxForce = def.maxForce;
        _this.m_impulse = Vec2.zero();
        _this.m_frequencyHz = def.frequencyHz;
        _this.m_dampingRatio = def.dampingRatio;
        _this.m_beta = 0;
        _this.m_gamma = 0;
        _this.m_rB = Vec2.zero();
        _this.m_localCenterB = Vec2.zero();
        _this.m_invMassB = 0;
        _this.m_invIB = 0;
        _this.m_mass = new Mat22();
        _this.m_C = Vec2.zero();
        return _this;
      }
      MouseJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          target: this.m_targetA,
          maxForce: this.m_maxForce,
          frequencyHz: this.m_frequencyHz,
          dampingRatio: this.m_dampingRatio,
          _localAnchorB: this.m_localAnchorB
        };
      };
      MouseJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        data.target = Vec2.clone(data.target);
        var joint = new MouseJoint2(data);
        if (data._localAnchorB) {
          joint.m_localAnchorB = data._localAnchorB;
        }
        return joint;
      };
      MouseJoint2.prototype._reset = function(def) {
        if (Number.isFinite(def.maxForce)) {
          this.m_maxForce = def.maxForce;
        }
        if (Number.isFinite(def.frequencyHz)) {
          this.m_frequencyHz = def.frequencyHz;
        }
        if (Number.isFinite(def.dampingRatio)) {
          this.m_dampingRatio = def.dampingRatio;
        }
      };
      MouseJoint2.prototype.setTarget = function(target) {
        if (Vec2.areEqual(target, this.m_targetA))
          return;
        this.m_bodyB.setAwake(true);
        this.m_targetA.set(target);
      };
      MouseJoint2.prototype.getTarget = function() {
        return this.m_targetA;
      };
      MouseJoint2.prototype.setMaxForce = function(force) {
        this.m_maxForce = force;
      };
      MouseJoint2.prototype.getMaxForce = function() {
        return this.m_maxForce;
      };
      MouseJoint2.prototype.setFrequency = function(hz) {
        this.m_frequencyHz = hz;
      };
      MouseJoint2.prototype.getFrequency = function() {
        return this.m_frequencyHz;
      };
      MouseJoint2.prototype.setDampingRatio = function(ratio) {
        this.m_dampingRatio = ratio;
      };
      MouseJoint2.prototype.getDampingRatio = function() {
        return this.m_dampingRatio;
      };
      MouseJoint2.prototype.getAnchorA = function() {
        return Vec2.clone(this.m_targetA);
      };
      MouseJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      MouseJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(inv_dt, this.m_impulse);
      };
      MouseJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * 0;
      };
      MouseJoint2.prototype.shiftOrigin = function(newOrigin) {
        this.m_targetA.sub(newOrigin);
      };
      MouseJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIB = this.m_bodyB.m_invI;
        var position = this.m_bodyB.c_position;
        var velocity = this.m_bodyB.c_velocity;
        var cB2 = position.c;
        var aB = position.a;
        var vB2 = velocity.v;
        var wB = velocity.w;
        var qB = Rot.neo(aB);
        var mass = this.m_bodyB.getMass();
        var omega = 2 * math_PI$2 * this.m_frequencyHz;
        var d2 = 2 * mass * this.m_dampingRatio * omega;
        var k = mass * (omega * omega);
        var h2 = step.dt;
        this.m_gamma = h2 * (d2 + h2 * k);
        if (this.m_gamma != 0) {
          this.m_gamma = 1 / this.m_gamma;
        }
        this.m_beta = h2 * k * this.m_gamma;
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var K = new Mat22();
        K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma;
        K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
        K.ey.x = K.ex.y;
        K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma;
        this.m_mass = K.getInverse();
        this.m_C.setVec2(cB2);
        this.m_C.addCombine(1, this.m_rB, -1, this.m_targetA);
        this.m_C.mul(this.m_beta);
        wB *= 0.98;
        if (step.warmStarting) {
          this.m_impulse.mul(step.dtRatio);
          vB2.addMul(this.m_invMassB, this.m_impulse);
          wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, this.m_impulse);
        } else {
          this.m_impulse.setZero();
        }
        velocity.v.setVec2(vB2);
        velocity.w = wB;
      };
      MouseJoint2.prototype.solveVelocityConstraints = function(step) {
        var velocity = this.m_bodyB.c_velocity;
        var vB2 = Vec2.clone(velocity.v);
        var wB = velocity.w;
        var Cdot = Vec2.crossNumVec2(wB, this.m_rB);
        Cdot.add(vB2);
        Cdot.addCombine(1, this.m_C, this.m_gamma, this.m_impulse);
        Cdot.neg();
        var impulse = Mat22.mulVec2(this.m_mass, Cdot);
        var oldImpulse = Vec2.clone(this.m_impulse);
        this.m_impulse.add(impulse);
        var maxImpulse = step.dt * this.m_maxForce;
        this.m_impulse.clamp(maxImpulse);
        impulse = Vec2.sub(this.m_impulse, oldImpulse);
        vB2.addMul(this.m_invMassB, impulse);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, impulse);
        velocity.v.setVec2(vB2);
        velocity.w = wB;
      };
      MouseJoint2.prototype.solvePositionConstraints = function(step) {
        return true;
      };
      MouseJoint2.TYPE = "mouse-joint";
      return MouseJoint2;
    })(Joint)
  );
  var math_abs$2 = Math.abs;
  var DEFAULTS$3 = {
    collideConnected: true
  };
  var PulleyJoint = (
    /** @class */
    (function(_super) {
      __extends(PulleyJoint2, _super);
      function PulleyJoint2(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
        var _this = this;
        if (!(_this instanceof PulleyJoint2)) {
          return new PulleyJoint2(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
        }
        def = options(def, DEFAULTS$3);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = PulleyJoint2.TYPE;
        _this.m_groundAnchorA = Vec2.clone(groundA ? groundA : def.groundAnchorA || Vec2.neo(-1, 1));
        _this.m_groundAnchorB = Vec2.clone(groundB ? groundB : def.groundAnchorB || Vec2.neo(1, 1));
        _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1, 0));
        _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1, 0));
        _this.m_lengthA = Number.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
        _this.m_lengthB = Number.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
        _this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;
        _this.m_constant = _this.m_lengthA + _this.m_ratio * _this.m_lengthB;
        _this.m_impulse = 0;
        return _this;
      }
      PulleyJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          groundAnchorA: this.m_groundAnchorA,
          groundAnchorB: this.m_groundAnchorB,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          lengthA: this.m_lengthA,
          lengthB: this.m_lengthB,
          ratio: this.m_ratio
        };
      };
      PulleyJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new PulleyJoint2(data);
        return joint;
      };
      PulleyJoint2.prototype._reset = function(def) {
        if (Vec2.isValid(def.groundAnchorA)) {
          this.m_groundAnchorA.set(def.groundAnchorA);
        }
        if (Vec2.isValid(def.groundAnchorB)) {
          this.m_groundAnchorB.set(def.groundAnchorB);
        }
        if (Vec2.isValid(def.localAnchorA)) {
          this.m_localAnchorA.set(def.localAnchorA);
        } else if (Vec2.isValid(def.anchorA)) {
          this.m_localAnchorA.set(this.m_bodyA.getLocalPoint(def.anchorA));
        }
        if (Vec2.isValid(def.localAnchorB)) {
          this.m_localAnchorB.set(def.localAnchorB);
        } else if (Vec2.isValid(def.anchorB)) {
          this.m_localAnchorB.set(this.m_bodyB.getLocalPoint(def.anchorB));
        }
        if (Number.isFinite(def.lengthA)) {
          this.m_lengthA = def.lengthA;
        }
        if (Number.isFinite(def.lengthB)) {
          this.m_lengthB = def.lengthB;
        }
        if (Number.isFinite(def.ratio)) {
          this.m_ratio = def.ratio;
        }
      };
      PulleyJoint2.prototype.getGroundAnchorA = function() {
        return this.m_groundAnchorA;
      };
      PulleyJoint2.prototype.getGroundAnchorB = function() {
        return this.m_groundAnchorB;
      };
      PulleyJoint2.prototype.getLengthA = function() {
        return this.m_lengthA;
      };
      PulleyJoint2.prototype.getLengthB = function() {
        return this.m_lengthB;
      };
      PulleyJoint2.prototype.getRatio = function() {
        return this.m_ratio;
      };
      PulleyJoint2.prototype.getCurrentLengthA = function() {
        var p2 = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        var s2 = this.m_groundAnchorA;
        return Vec2.distance(p2, s2);
      };
      PulleyJoint2.prototype.getCurrentLengthB = function() {
        var p2 = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        var s2 = this.m_groundAnchorB;
        return Vec2.distance(p2, s2);
      };
      PulleyJoint2.prototype.shiftOrigin = function(newOrigin) {
        this.m_groundAnchorA.sub(newOrigin);
        this.m_groundAnchorB.sub(newOrigin);
      };
      PulleyJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      PulleyJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      PulleyJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_uB).mul(inv_dt);
      };
      PulleyJoint2.prototype.getReactionTorque = function(inv_dt) {
        return 0;
      };
      PulleyJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        this.m_uA = Vec2.sub(Vec2.add(cA2, this.m_rA), this.m_groundAnchorA);
        this.m_uB = Vec2.sub(Vec2.add(cB2, this.m_rB), this.m_groundAnchorB);
        var lengthA = this.m_uA.length();
        var lengthB = this.m_uB.length();
        if (lengthA > 10 * SettingsInternal.linearSlop) {
          this.m_uA.mul(1 / lengthA);
        } else {
          this.m_uA.setZero();
        }
        if (lengthB > 10 * SettingsInternal.linearSlop) {
          this.m_uB.mul(1 / lengthB);
        } else {
          this.m_uB.setZero();
        }
        var ruA = Vec2.crossVec2Vec2(this.m_rA, this.m_uA);
        var ruB = Vec2.crossVec2Vec2(this.m_rB, this.m_uB);
        var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
        var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
        this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
        if (this.m_mass > 0) {
          this.m_mass = 1 / this.m_mass;
        }
        if (step.warmStarting) {
          this.m_impulse *= step.dtRatio;
          var PA = Vec2.mulNumVec2(-this.m_impulse, this.m_uA);
          var PB = Vec2.mulNumVec2(-this.m_ratio * this.m_impulse, this.m_uB);
          vA2.addMul(this.m_invMassA, PA);
          wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
          vB2.addMul(this.m_invMassB, PB);
          wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
        } else {
          this.m_impulse = 0;
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      PulleyJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var vpA = Vec2.add(vA2, Vec2.crossNumVec2(wA, this.m_rA));
        var vpB = Vec2.add(vB2, Vec2.crossNumVec2(wB, this.m_rB));
        var Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio * Vec2.dot(this.m_uB, vpB);
        var impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        var PA = Vec2.mulNumVec2(-impulse, this.m_uA);
        var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, this.m_uB);
        vA2.addMul(this.m_invMassA, PA);
        wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
        vB2.addMul(this.m_invMassB, PB);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      PulleyJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var uA = Vec2.sub(Vec2.add(cA2, this.m_rA), this.m_groundAnchorA);
        var uB = Vec2.sub(Vec2.add(cB2, this.m_rB), this.m_groundAnchorB);
        var lengthA = uA.length();
        var lengthB = uB.length();
        if (lengthA > 10 * SettingsInternal.linearSlop) {
          uA.mul(1 / lengthA);
        } else {
          uA.setZero();
        }
        if (lengthB > 10 * SettingsInternal.linearSlop) {
          uB.mul(1 / lengthB);
        } else {
          uB.setZero();
        }
        var ruA = Vec2.crossVec2Vec2(rA2, uA);
        var ruB = Vec2.crossVec2Vec2(rB2, uB);
        var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
        var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
        var mass = mA + this.m_ratio * this.m_ratio * mB;
        if (mass > 0) {
          mass = 1 / mass;
        }
        var C = this.m_constant - lengthA - this.m_ratio * lengthB;
        var linearError = math_abs$2(C);
        var impulse = -mass * C;
        var PA = Vec2.mulNumVec2(-impulse, uA);
        var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, uB);
        cA2.addMul(this.m_invMassA, PA);
        aA += this.m_invIA * Vec2.crossVec2Vec2(rA2, PA);
        cB2.addMul(this.m_invMassB, PB);
        aB += this.m_invIB * Vec2.crossVec2Vec2(rB2, PB);
        this.m_bodyA.c_position.c = cA2;
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c = cB2;
        this.m_bodyB.c_position.a = aB;
        return linearError < SettingsInternal.linearSlop;
      };
      PulleyJoint2.TYPE = "pulley-joint";
      return PulleyJoint2;
    })(Joint)
  );
  var math_min$1 = Math.min;
  var LimitState;
  (function(LimitState2) {
    LimitState2[LimitState2["inactiveLimit"] = 0] = "inactiveLimit";
    LimitState2[LimitState2["atLowerLimit"] = 1] = "atLowerLimit";
    LimitState2[LimitState2["atUpperLimit"] = 2] = "atUpperLimit";
    LimitState2[LimitState2["equalLimits"] = 3] = "equalLimits";
  })(LimitState || (LimitState = {}));
  var DEFAULTS$2 = {
    maxLength: 0
  };
  var RopeJoint = (
    /** @class */
    (function(_super) {
      __extends(RopeJoint2, _super);
      function RopeJoint2(def, bodyA, bodyB, anchor) {
        var _this = this;
        if (!(_this instanceof RopeJoint2)) {
          return new RopeJoint2(def, bodyA, bodyB, anchor);
        }
        def = options(def, DEFAULTS$2);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = RopeJoint2.TYPE;
        _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1, 0));
        _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1, 0));
        _this.m_maxLength = def.maxLength;
        _this.m_mass = 0;
        _this.m_impulse = 0;
        _this.m_length = 0;
        _this.m_state = LimitState.inactiveLimit;
        return _this;
      }
      RopeJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          maxLength: this.m_maxLength
        };
      };
      RopeJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new RopeJoint2(data);
        return joint;
      };
      RopeJoint2.prototype._reset = function(def) {
        if (Number.isFinite(def.maxLength)) {
          this.m_maxLength = def.maxLength;
        }
      };
      RopeJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      RopeJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      RopeJoint2.prototype.setMaxLength = function(length) {
        this.m_maxLength = length;
      };
      RopeJoint2.prototype.getMaxLength = function() {
        return this.m_maxLength;
      };
      RopeJoint2.prototype.getLimitState = function() {
        return this.m_state;
      };
      RopeJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      RopeJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      RopeJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
      };
      RopeJoint2.prototype.getReactionTorque = function(inv_dt) {
        return 0;
      };
      RopeJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
        this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
        this.m_u = Vec2.zero();
        this.m_u.addCombine(1, cB2, 1, this.m_rB);
        this.m_u.subCombine(1, cA2, 1, this.m_rA);
        this.m_length = this.m_u.length();
        var C = this.m_length - this.m_maxLength;
        if (C > 0) {
          this.m_state = LimitState.atUpperLimit;
        } else {
          this.m_state = LimitState.inactiveLimit;
        }
        if (this.m_length > SettingsInternal.linearSlop) {
          this.m_u.mul(1 / this.m_length);
        } else {
          this.m_u.setZero();
          this.m_mass = 0;
          this.m_impulse = 0;
          return;
        }
        var crA = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
        var crB = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
        var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
        this.m_mass = invMass != 0 ? 1 / invMass : 0;
        if (step.warmStarting) {
          this.m_impulse *= step.dtRatio;
          var P3 = Vec2.mulNumVec2(this.m_impulse, this.m_u);
          vA2.subMul(this.m_invMassA, P3);
          wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
          vB2.addMul(this.m_invMassB, P3);
          wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
        } else {
          this.m_impulse = 0;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
      };
      RopeJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var vpA = Vec2.addCrossNumVec2(vA2, wA, this.m_rA);
        var vpB = Vec2.addCrossNumVec2(vB2, wB, this.m_rB);
        var C = this.m_length - this.m_maxLength;
        var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA));
        if (C < 0) {
          Cdot += step.inv_dt * C;
        }
        var impulse = -this.m_mass * Cdot;
        var oldImpulse = this.m_impulse;
        this.m_impulse = math_min$1(0, this.m_impulse + impulse);
        impulse = this.m_impulse - oldImpulse;
        var P3 = Vec2.mulNumVec2(impulse, this.m_u);
        vA2.subMul(this.m_invMassA, P3);
        wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P3);
        vB2.addMul(this.m_invMassB, P3);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P3);
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      RopeJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var rA2 = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
        var rB2 = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
        var u = Vec2.zero();
        u.addCombine(1, cB2, 1, rB2);
        u.subCombine(1, cA2, 1, rA2);
        var length = u.normalize();
        var C = length - this.m_maxLength;
        C = clamp(C, 0, SettingsInternal.maxLinearCorrection);
        var impulse = -this.m_mass * C;
        var P3 = Vec2.mulNumVec2(impulse, u);
        cA2.subMul(this.m_invMassA, P3);
        aA -= this.m_invIA * Vec2.crossVec2Vec2(rA2, P3);
        cB2.addMul(this.m_invMassB, P3);
        aB += this.m_invIB * Vec2.crossVec2Vec2(rB2, P3);
        this.m_bodyA.c_position.c.setVec2(cA2);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB2);
        this.m_bodyB.c_position.a = aB;
        return length - this.m_maxLength < SettingsInternal.linearSlop;
      };
      RopeJoint2.TYPE = "rope-joint";
      return RopeJoint2;
    })(Joint)
  );
  var math_abs$1 = Math.abs;
  var math_PI$1 = Math.PI;
  var DEFAULTS$1 = {
    frequencyHz: 0,
    dampingRatio: 0
  };
  var WeldJoint = (
    /** @class */
    (function(_super) {
      __extends(WeldJoint2, _super);
      function WeldJoint2(def, bodyA, bodyB, anchor) {
        var _this = this;
        if (!(_this instanceof WeldJoint2)) {
          return new WeldJoint2(def, bodyA, bodyB, anchor);
        }
        def = options(def, DEFAULTS$1);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_type = WeldJoint2.TYPE;
        _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        _this.m_referenceAngle = Number.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
        _this.m_frequencyHz = def.frequencyHz;
        _this.m_dampingRatio = def.dampingRatio;
        _this.m_impulse = new Vec3();
        _this.m_bias = 0;
        _this.m_gamma = 0;
        _this.m_mass = new Mat33();
        return _this;
      }
      WeldJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          frequencyHz: this.m_frequencyHz,
          dampingRatio: this.m_dampingRatio,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          referenceAngle: this.m_referenceAngle
        };
      };
      WeldJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new WeldJoint2(data);
        return joint;
      };
      WeldJoint2.prototype._reset = function(def) {
        if (def.anchorA) {
          this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
        } else if (def.localAnchorA) {
          this.m_localAnchorA.setVec2(def.localAnchorA);
        }
        if (def.anchorB) {
          this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
        } else if (def.localAnchorB) {
          this.m_localAnchorB.setVec2(def.localAnchorB);
        }
        if (Number.isFinite(def.frequencyHz)) {
          this.m_frequencyHz = def.frequencyHz;
        }
        if (Number.isFinite(def.dampingRatio)) {
          this.m_dampingRatio = def.dampingRatio;
        }
      };
      WeldJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      WeldJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      WeldJoint2.prototype.getReferenceAngle = function() {
        return this.m_referenceAngle;
      };
      WeldJoint2.prototype.setFrequency = function(hz) {
        this.m_frequencyHz = hz;
      };
      WeldJoint2.prototype.getFrequency = function() {
        return this.m_frequencyHz;
      };
      WeldJoint2.prototype.setDampingRatio = function(ratio) {
        this.m_dampingRatio = ratio;
      };
      WeldJoint2.prototype.getDampingRatio = function() {
        return this.m_dampingRatio;
      };
      WeldJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      WeldJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      WeldJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
      };
      WeldJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * this.m_impulse.z;
      };
      WeldJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var K = new Mat33();
        K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
        K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
        K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
        K.ex.y = K.ey.x;
        K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
        K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
        K.ex.z = K.ez.x;
        K.ey.z = K.ez.y;
        K.ez.z = iA + iB;
        if (this.m_frequencyHz > 0) {
          K.getInverse22(this.m_mass);
          var invM = iA + iB;
          var m2 = invM > 0 ? 1 / invM : 0;
          var C = aB - aA - this.m_referenceAngle;
          var omega = 2 * math_PI$1 * this.m_frequencyHz;
          var d2 = 2 * m2 * this.m_dampingRatio * omega;
          var k = m2 * omega * omega;
          var h2 = step.dt;
          this.m_gamma = h2 * (d2 + h2 * k);
          this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
          this.m_bias = C * h2 * k * this.m_gamma;
          invM += this.m_gamma;
          this.m_mass.ez.z = invM != 0 ? 1 / invM : 0;
        } else if (K.ez.z == 0) {
          K.getInverse22(this.m_mass);
          this.m_gamma = 0;
          this.m_bias = 0;
        } else {
          K.getSymInverse33(this.m_mass);
          this.m_gamma = 0;
          this.m_bias = 0;
        }
        if (step.warmStarting) {
          this.m_impulse.mul(step.dtRatio);
          var P3 = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
          vA2.subMul(mA, P3);
          wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + this.m_impulse.z);
          vB2.addMul(mB, P3);
          wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + this.m_impulse.z);
        } else {
          this.m_impulse.setZero();
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      WeldJoint2.prototype.solveVelocityConstraints = function(step) {
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        if (this.m_frequencyHz > 0) {
          var Cdot2 = wB - wA;
          var impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
          this.m_impulse.z += impulse2;
          wA -= iA * impulse2;
          wB += iB * impulse2;
          var Cdot1 = Vec2.zero();
          Cdot1.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
          Cdot1.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
          var impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1));
          this.m_impulse.x += impulse1.x;
          this.m_impulse.y += impulse1.y;
          var P3 = Vec2.clone(impulse1);
          vA2.subMul(mA, P3);
          wA -= iA * Vec2.crossVec2Vec2(this.m_rA, P3);
          vB2.addMul(mB, P3);
          wB += iB * Vec2.crossVec2Vec2(this.m_rB, P3);
        } else {
          var Cdot1 = Vec2.zero();
          Cdot1.addCombine(1, vB2, 1, Vec2.crossNumVec2(wB, this.m_rB));
          Cdot1.subCombine(1, vA2, 1, Vec2.crossNumVec2(wA, this.m_rA));
          var Cdot2 = wB - wA;
          var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
          var impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot));
          this.m_impulse.add(impulse);
          var P3 = Vec2.neo(impulse.x, impulse.y);
          vA2.subMul(mA, P3);
          wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P3) + impulse.z);
          vB2.addMul(mB, P3);
          wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P3) + impulse.z);
        }
        this.m_bodyA.c_velocity.v = vA2;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB2;
        this.m_bodyB.c_velocity.w = wB;
      };
      WeldJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var positionError;
        var angularError;
        var K = new Mat33();
        K.ex.x = mA + mB + rA2.y * rA2.y * iA + rB2.y * rB2.y * iB;
        K.ey.x = -rA2.y * rA2.x * iA - rB2.y * rB2.x * iB;
        K.ez.x = -rA2.y * iA - rB2.y * iB;
        K.ex.y = K.ey.x;
        K.ey.y = mA + mB + rA2.x * rA2.x * iA + rB2.x * rB2.x * iB;
        K.ez.y = rA2.x * iA + rB2.x * iB;
        K.ex.z = K.ez.x;
        K.ey.z = K.ez.y;
        K.ez.z = iA + iB;
        if (this.m_frequencyHz > 0) {
          var C1 = Vec2.zero();
          C1.addCombine(1, cB2, 1, rB2);
          C1.subCombine(1, cA2, 1, rA2);
          positionError = C1.length();
          angularError = 0;
          var P3 = Vec2.neg(K.solve22(C1));
          cA2.subMul(mA, P3);
          aA -= iA * Vec2.crossVec2Vec2(rA2, P3);
          cB2.addMul(mB, P3);
          aB += iB * Vec2.crossVec2Vec2(rB2, P3);
        } else {
          var C1 = Vec2.zero();
          C1.addCombine(1, cB2, 1, rB2);
          C1.subCombine(1, cA2, 1, rA2);
          var C2 = aB - aA - this.m_referenceAngle;
          positionError = C1.length();
          angularError = math_abs$1(C2);
          var C = new Vec3(C1.x, C1.y, C2);
          var impulse = new Vec3();
          if (K.ez.z > 0) {
            impulse = Vec3.neg(K.solve33(C));
          } else {
            var impulse2 = Vec2.neg(K.solve22(C1));
            impulse.set(impulse2.x, impulse2.y, 0);
          }
          var P3 = Vec2.neo(impulse.x, impulse.y);
          cA2.subMul(mA, P3);
          aA -= iA * (Vec2.crossVec2Vec2(rA2, P3) + impulse.z);
          cB2.addMul(mB, P3);
          aB += iB * (Vec2.crossVec2Vec2(rB2, P3) + impulse.z);
        }
        this.m_bodyA.c_position.c = cA2;
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c = cB2;
        this.m_bodyB.c_position.a = aB;
        return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
      };
      WeldJoint2.TYPE = "weld-joint";
      return WeldJoint2;
    })(Joint)
  );
  var math_abs = Math.abs;
  var math_PI = Math.PI;
  var DEFAULTS$c = {
    enableMotor: false,
    maxMotorTorque: 0,
    motorSpeed: 0,
    frequencyHz: 2,
    dampingRatio: 0.7
  };
  var WheelJoint = (
    /** @class */
    (function(_super) {
      __extends(WheelJoint2, _super);
      function WheelJoint2(def, bodyA, bodyB, anchor, axis) {
        var _this = this;
        if (!(_this instanceof WheelJoint2)) {
          return new WheelJoint2(def, bodyA, bodyB, anchor, axis);
        }
        def = options(def, DEFAULTS$c);
        _this = _super.call(this, def, bodyA, bodyB) || this;
        bodyA = _this.m_bodyA;
        bodyB = _this.m_bodyB;
        _this.m_ax = Vec2.zero();
        _this.m_ay = Vec2.zero();
        _this.m_type = WheelJoint2.TYPE;
        _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        if (Vec2.isValid(axis)) {
          _this.m_localXAxisA = bodyA.getLocalVector(axis);
        } else if (Vec2.isValid(def.localAxisA)) {
          _this.m_localXAxisA = Vec2.clone(def.localAxisA);
        } else if (Vec2.isValid(def.localAxis)) {
          _this.m_localXAxisA = Vec2.clone(def.localAxis);
        } else {
          _this.m_localXAxisA = Vec2.neo(1, 0);
        }
        _this.m_localYAxisA = Vec2.crossNumVec2(1, _this.m_localXAxisA);
        _this.m_mass = 0;
        _this.m_impulse = 0;
        _this.m_motorMass = 0;
        _this.m_motorImpulse = 0;
        _this.m_springMass = 0;
        _this.m_springImpulse = 0;
        _this.m_maxMotorTorque = def.maxMotorTorque;
        _this.m_motorSpeed = def.motorSpeed;
        _this.m_enableMotor = def.enableMotor;
        _this.m_frequencyHz = def.frequencyHz;
        _this.m_dampingRatio = def.dampingRatio;
        _this.m_bias = 0;
        _this.m_gamma = 0;
        return _this;
      }
      WheelJoint2.prototype._serialize = function() {
        return {
          type: this.m_type,
          bodyA: this.m_bodyA,
          bodyB: this.m_bodyB,
          collideConnected: this.m_collideConnected,
          enableMotor: this.m_enableMotor,
          maxMotorTorque: this.m_maxMotorTorque,
          motorSpeed: this.m_motorSpeed,
          frequencyHz: this.m_frequencyHz,
          dampingRatio: this.m_dampingRatio,
          localAnchorA: this.m_localAnchorA,
          localAnchorB: this.m_localAnchorB,
          localAxisA: this.m_localXAxisA
        };
      };
      WheelJoint2._deserialize = function(data, world, restore) {
        data = __assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        var joint = new WheelJoint2(data);
        return joint;
      };
      WheelJoint2.prototype._reset = function(def) {
        if (def.anchorA) {
          this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
        } else if (def.localAnchorA) {
          this.m_localAnchorA.setVec2(def.localAnchorA);
        }
        if (def.anchorB) {
          this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
        } else if (def.localAnchorB) {
          this.m_localAnchorB.setVec2(def.localAnchorB);
        }
        if (def.localAxisA) {
          this.m_localXAxisA.setVec2(def.localAxisA);
          this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1, def.localAxisA));
        }
        if (def.enableMotor !== void 0) {
          this.m_enableMotor = def.enableMotor;
        }
        if (Number.isFinite(def.maxMotorTorque)) {
          this.m_maxMotorTorque = def.maxMotorTorque;
        }
        if (Number.isFinite(def.motorSpeed)) {
          this.m_motorSpeed = def.motorSpeed;
        }
        if (Number.isFinite(def.frequencyHz)) {
          this.m_frequencyHz = def.frequencyHz;
        }
        if (Number.isFinite(def.dampingRatio)) {
          this.m_dampingRatio = def.dampingRatio;
        }
      };
      WheelJoint2.prototype.getLocalAnchorA = function() {
        return this.m_localAnchorA;
      };
      WheelJoint2.prototype.getLocalAnchorB = function() {
        return this.m_localAnchorB;
      };
      WheelJoint2.prototype.getLocalAxisA = function() {
        return this.m_localXAxisA;
      };
      WheelJoint2.prototype.getJointTranslation = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var pA2 = bA.getWorldPoint(this.m_localAnchorA);
        var pB2 = bB.getWorldPoint(this.m_localAnchorB);
        var d2 = Vec2.sub(pB2, pA2);
        var axis = bA.getWorldVector(this.m_localXAxisA);
        var translation2 = Vec2.dot(d2, axis);
        return translation2;
      };
      WheelJoint2.prototype.getJointSpeed = function() {
        var wA = this.m_bodyA.m_angularVelocity;
        var wB = this.m_bodyB.m_angularVelocity;
        return wB - wA;
      };
      WheelJoint2.prototype.isMotorEnabled = function() {
        return this.m_enableMotor;
      };
      WheelJoint2.prototype.enableMotor = function(flag) {
        if (flag == this.m_enableMotor)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableMotor = flag;
      };
      WheelJoint2.prototype.setMotorSpeed = function(speed) {
        if (speed == this.m_motorSpeed)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_motorSpeed = speed;
      };
      WheelJoint2.prototype.getMotorSpeed = function() {
        return this.m_motorSpeed;
      };
      WheelJoint2.prototype.setMaxMotorTorque = function(torque) {
        if (torque == this.m_maxMotorTorque)
          return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_maxMotorTorque = torque;
      };
      WheelJoint2.prototype.getMaxMotorTorque = function() {
        return this.m_maxMotorTorque;
      };
      WheelJoint2.prototype.getMotorTorque = function(inv_dt) {
        return inv_dt * this.m_motorImpulse;
      };
      WheelJoint2.prototype.setSpringFrequencyHz = function(hz) {
        this.m_frequencyHz = hz;
      };
      WheelJoint2.prototype.getSpringFrequencyHz = function() {
        return this.m_frequencyHz;
      };
      WheelJoint2.prototype.setSpringDampingRatio = function(ratio) {
        this.m_dampingRatio = ratio;
      };
      WheelJoint2.prototype.getSpringDampingRatio = function() {
        return this.m_dampingRatio;
      };
      WheelJoint2.prototype.getAnchorA = function() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
      };
      WheelJoint2.prototype.getAnchorB = function() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
      };
      WheelJoint2.prototype.getReactionForce = function(inv_dt) {
        return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
      };
      WheelJoint2.prototype.getReactionTorque = function(inv_dt) {
        return inv_dt * this.m_motorImpulse;
      };
      WheelJoint2.prototype.initVelocityConstraints = function(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var d2 = Vec2.zero();
        d2.addCombine(1, cB2, 1, rB2);
        d2.subCombine(1, cA2, 1, rA2);
        {
          this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
          this.m_sAy = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_ay);
          this.m_sBy = Vec2.crossVec2Vec2(rB2, this.m_ay);
          this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy * this.m_sBy;
          if (this.m_mass > 0) {
            this.m_mass = 1 / this.m_mass;
          }
        }
        this.m_springMass = 0;
        this.m_bias = 0;
        this.m_gamma = 0;
        if (this.m_frequencyHz > 0) {
          this.m_ax = Rot.mulVec2(qA, this.m_localXAxisA);
          this.m_sAx = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), this.m_ax);
          this.m_sBx = Vec2.crossVec2Vec2(rB2, this.m_ax);
          var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx * this.m_sBx;
          if (invMass > 0) {
            this.m_springMass = 1 / invMass;
            var C = Vec2.dot(d2, this.m_ax);
            var omega = 2 * math_PI * this.m_frequencyHz;
            var damp = 2 * this.m_springMass * this.m_dampingRatio * omega;
            var k = this.m_springMass * omega * omega;
            var h2 = step.dt;
            this.m_gamma = h2 * (damp + h2 * k);
            if (this.m_gamma > 0) {
              this.m_gamma = 1 / this.m_gamma;
            }
            this.m_bias = C * h2 * k * this.m_gamma;
            this.m_springMass = invMass + this.m_gamma;
            if (this.m_springMass > 0) {
              this.m_springMass = 1 / this.m_springMass;
            }
          }
        } else {
          this.m_springImpulse = 0;
        }
        if (this.m_enableMotor) {
          this.m_motorMass = iA + iB;
          if (this.m_motorMass > 0) {
            this.m_motorMass = 1 / this.m_motorMass;
          }
        } else {
          this.m_motorMass = 0;
          this.m_motorImpulse = 0;
        }
        if (step.warmStarting) {
          this.m_impulse *= step.dtRatio;
          this.m_springImpulse *= step.dtRatio;
          this.m_motorImpulse *= step.dtRatio;
          var P3 = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
          var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
          var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
          vA2.subMul(this.m_invMassA, P3);
          wA -= this.m_invIA * LA;
          vB2.addMul(this.m_invMassB, P3);
          wB += this.m_invIB * LB;
        } else {
          this.m_impulse = 0;
          this.m_springImpulse = 0;
          this.m_motorImpulse = 0;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
      };
      WheelJoint2.prototype.solveVelocityConstraints = function(step) {
        var mA = this.m_invMassA;
        var mB = this.m_invMassB;
        var iA = this.m_invIA;
        var iB = this.m_invIB;
        var vA2 = this.m_bodyA.c_velocity.v;
        var wA = this.m_bodyA.c_velocity.w;
        var vB2 = this.m_bodyB.c_velocity.v;
        var wB = this.m_bodyB.c_velocity.w;
        {
          var Cdot = Vec2.dot(this.m_ax, vB2) - Vec2.dot(this.m_ax, vA2) + this.m_sBx * wB - this.m_sAx * wA;
          var impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
          this.m_springImpulse += impulse;
          var P3 = Vec2.mulNumVec2(impulse, this.m_ax);
          var LA = impulse * this.m_sAx;
          var LB = impulse * this.m_sBx;
          vA2.subMul(mA, P3);
          wA -= iA * LA;
          vB2.addMul(mB, P3);
          wB += iB * LB;
        }
        {
          var Cdot = wB - wA - this.m_motorSpeed;
          var impulse = -this.m_motorMass * Cdot;
          var oldImpulse = this.m_motorImpulse;
          var maxImpulse = step.dt * this.m_maxMotorTorque;
          this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
          impulse = this.m_motorImpulse - oldImpulse;
          wA -= iA * impulse;
          wB += iB * impulse;
        }
        {
          var Cdot = Vec2.dot(this.m_ay, vB2) - Vec2.dot(this.m_ay, vA2) + this.m_sBy * wB - this.m_sAy * wA;
          var impulse = -this.m_mass * Cdot;
          this.m_impulse += impulse;
          var P3 = Vec2.mulNumVec2(impulse, this.m_ay);
          var LA = impulse * this.m_sAy;
          var LB = impulse * this.m_sBy;
          vA2.subMul(mA, P3);
          wA -= iA * LA;
          vB2.addMul(mB, P3);
          wB += iB * LB;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA2);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB2);
        this.m_bodyB.c_velocity.w = wB;
      };
      WheelJoint2.prototype.solvePositionConstraints = function(step) {
        var cA2 = this.m_bodyA.c_position.c;
        var aA = this.m_bodyA.c_position.a;
        var cB2 = this.m_bodyB.c_position.c;
        var aB = this.m_bodyB.c_position.a;
        var qA = Rot.neo(aA);
        var qB = Rot.neo(aB);
        var rA2 = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        var rB2 = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        var d2 = Vec2.zero();
        d2.addCombine(1, cB2, 1, rB2);
        d2.subCombine(1, cA2, 1, rA2);
        var ay = Rot.mulVec2(qA, this.m_localYAxisA);
        var sAy = Vec2.crossVec2Vec2(Vec2.add(d2, rA2), ay);
        var sBy = Vec2.crossVec2Vec2(rB2, ay);
        var C = Vec2.dot(d2, ay);
        var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
        var impulse = k != 0 ? -C / k : 0;
        var P3 = Vec2.mulNumVec2(impulse, ay);
        var LA = impulse * sAy;
        var LB = impulse * sBy;
        cA2.subMul(this.m_invMassA, P3);
        aA -= this.m_invIA * LA;
        cB2.addMul(this.m_invMassB, P3);
        aB += this.m_invIB * LB;
        this.m_bodyA.c_position.c.setVec2(cA2);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB2);
        this.m_bodyB.c_position.a = aB;
        return math_abs(C) <= SettingsInternal.linearSlop;
      };
      WheelJoint2.TYPE = "wheel-joint";
      return WheelJoint2;
    })(Joint)
  );
  var _a;
  var SID = 0;
  var SERIALIZE_REF_TYPES = {
    "World": World,
    "Body": Body,
    "Joint": Joint,
    "Fixture": Fixture,
    "Shape": Shape
  };
  var DESERIALIZE_BY_REF_TYPE = {
    "Vec2": Vec2,
    "Vec3": Vec3,
    "World": World,
    "Body": Body,
    "Joint": Joint,
    "Fixture": Fixture,
    "Shape": Shape
  };
  var DESERIALIZE_BY_TYPE_FIELD = (_a = {}, _a[Body.STATIC] = Body, _a[Body.DYNAMIC] = Body, _a[Body.KINEMATIC] = Body, _a[ChainShape.TYPE] = ChainShape, // [BoxShape.TYPE]: BoxShape,
  _a[PolygonShape.TYPE] = PolygonShape, _a[EdgeShape.TYPE] = EdgeShape, _a[CircleShape.TYPE] = CircleShape, _a[DistanceJoint.TYPE] = DistanceJoint, _a[FrictionJoint.TYPE] = FrictionJoint, _a[GearJoint.TYPE] = GearJoint, _a[MotorJoint.TYPE] = MotorJoint, _a[MouseJoint.TYPE] = MouseJoint, _a[PrismaticJoint.TYPE] = PrismaticJoint, _a[PulleyJoint.TYPE] = PulleyJoint, _a[RevoluteJoint.TYPE] = RevoluteJoint, _a[RopeJoint.TYPE] = RopeJoint, _a[WeldJoint.TYPE] = WeldJoint, _a[WheelJoint.TYPE] = WheelJoint, _a);
  var DEFAULT_OPTIONS = {
    rootClass: World,
    preSerialize: function(obj) {
      return obj;
    },
    postSerialize: function(data, obj) {
      return data;
    },
    preDeserialize: function(data) {
      return data;
    },
    postDeserialize: function(obj, data) {
      return obj;
    }
  };
  var Serializer = (
    /** @class */
    /* @__PURE__ */ (function() {
      function Serializer2(options2) {
        var _this = this;
        this.toJson = function(root) {
          var preSerialize = _this.options.preSerialize;
          var postSerialize = _this.options.postSerialize;
          var json = [];
          var refQueue = [root];
          var refMemoById = {};
          function addToRefQueue(value, typeName) {
            value.__sid = value.__sid || ++SID;
            if (!refMemoById[value.__sid]) {
              refQueue.push(value);
              var index = json.length + refQueue.length;
              var ref = {
                refIndex: index,
                refType: typeName
              };
              refMemoById[value.__sid] = ref;
            }
            return refMemoById[value.__sid];
          }
          function serializeWithHooks(obj2) {
            obj2 = preSerialize(obj2);
            var data = obj2._serialize();
            data = postSerialize(data, obj2);
            return data;
          }
          function traverse(value, noRefType) {
            if (noRefType === void 0) {
              noRefType = false;
            }
            if (typeof value !== "object" || value === null) {
              return value;
            }
            if (typeof value._serialize === "function") {
              if (!noRefType) {
                for (var typeName in SERIALIZE_REF_TYPES) {
                  if (value instanceof SERIALIZE_REF_TYPES[typeName]) {
                    return addToRefQueue(value, typeName);
                  }
                }
              }
              value = serializeWithHooks(value);
            }
            if (Array.isArray(value)) {
              var newValue = [];
              for (var key = 0; key < value.length; key++) {
                newValue[key] = traverse(value[key]);
              }
              value = newValue;
            } else {
              var newValue = {};
              for (var key in value) {
                if (value.hasOwnProperty(key)) {
                  newValue[key] = traverse(value[key]);
                }
              }
              value = newValue;
            }
            return value;
          }
          while (refQueue.length) {
            var obj = refQueue.shift();
            var str = traverse(obj, true);
            json.push(str);
          }
          return json;
        };
        this.fromJson = function(json) {
          var preDeserialize = _this.options.preDeserialize;
          var postDeserialize = _this.options.postDeserialize;
          var rootClass = _this.options.rootClass;
          var deserializedRefMemoByIndex = {};
          function deserializeWithHooks(classHint, data, context) {
            if (!classHint || !classHint._deserialize) {
              classHint = DESERIALIZE_BY_TYPE_FIELD[data.type];
            }
            var deserializer = classHint && classHint._deserialize;
            if (!deserializer) {
              return;
            }
            data = preDeserialize(data);
            var classDeserializeFn = classHint._deserialize;
            var obj = classDeserializeFn(data, context, deserializeChild);
            obj = postDeserialize(obj, data);
            return obj;
          }
          function deserializeChild(classHint, dataOrRef, context) {
            var isRefObject = dataOrRef.refIndex && dataOrRef.refType;
            if (!isRefObject) {
              return deserializeWithHooks(classHint, dataOrRef, context);
            }
            var ref = dataOrRef;
            if (DESERIALIZE_BY_REF_TYPE[ref.refType]) {
              classHint = DESERIALIZE_BY_REF_TYPE[ref.refType];
            }
            var refIndex = ref.refIndex;
            if (!deserializedRefMemoByIndex[refIndex]) {
              var data = json[refIndex];
              var obj = deserializeWithHooks(classHint, data, context);
              deserializedRefMemoByIndex[refIndex] = obj;
            }
            return deserializedRefMemoByIndex[refIndex];
          }
          var root = deserializeWithHooks(rootClass, json[0], null);
          return root;
        };
        this.options = __assign(__assign({}, DEFAULT_OPTIONS), options2);
      }
      return Serializer2;
    })()
  );
  var worldSerializer = new Serializer({
    rootClass: World
  });
  Serializer.fromJson = worldSerializer.fromJson;
  Serializer.toJson = worldSerializer.toJson;
  var Testbed = (
    /** @class */
    (function() {
      function Testbed2() {
      }
      Testbed2.mount = function(options2) {
        throw new Error("Not implemented");
      };
      Testbed2.start = function(world) {
        var testbed2 = Testbed2.mount();
        testbed2.start(world);
        return testbed2;
      };
      return Testbed2;
    })()
  );
  function testbed(a2, b2) {
    var callback;
    var options2;
    if (typeof a2 === "function") {
      callback = a2;
      options2 = b2;
    } else if (typeof b2 === "function") {
      callback = b2;
      options2 = a2;
    } else {
      options2 = a2 !== null && a2 !== void 0 ? a2 : b2;
    }
    var testbed2 = Testbed.mount(options2);
    if (callback) {
      var world = callback(testbed2) || testbed2.world;
      testbed2.start(world);
    } else {
      return testbed2;
    }
  }
  var BoxShape = (
    /** @class */
    (function(_super) {
      __extends(BoxShape2, _super);
      function BoxShape2(halfWidth, halfHeight, center2, angle) {
        var _this = this;
        if (!(_this instanceof BoxShape2)) {
          return new BoxShape2(halfWidth, halfHeight, center2, angle);
        }
        _this = _super.call(this) || this;
        _this._setAsBox(halfWidth, halfHeight, center2, angle);
        return _this;
      }
      BoxShape2.TYPE = "polygon";
      return BoxShape2;
    })(PolygonShape)
  );
  Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);
  function CircleCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
    CollideCircles(manifold, fixtureA.getShape(), xfA2, fixtureB.getShape(), xfB2);
  }
  var pA = vec2(0, 0);
  var pB = vec2(0, 0);
  var CollideCircles = function(manifold, circleA, xfA2, circleB, xfB2) {
    manifold.pointCount = 0;
    transformVec2$1(pA, xfA2, circleA.m_p);
    transformVec2$1(pB, xfB2, circleB.m_p);
    var distSqr = distSqrVec2(pB, pA);
    var rA2 = circleA.m_radius;
    var rB2 = circleB.m_radius;
    var radius = rA2 + rB2;
    if (distSqr > radius * radius) {
      return;
    }
    manifold.type = exports2.ManifoldType.e_circles;
    copyVec2(manifold.localPoint, circleA.m_p);
    zeroVec2(manifold.localNormal);
    manifold.pointCount = 1;
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
  };
  Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
  Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);
  function EdgeCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
    var shapeA = fixtureA.getShape();
    var shapeB = fixtureB.getShape();
    CollideEdgeCircle(manifold, shapeA, xfA2, shapeB, xfB2);
  }
  function ChainCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
    var chain = fixtureA.getShape();
    var edge = new EdgeShape();
    chain.getChildEdge(edge, indexA);
    var shapeA = edge;
    var shapeB = fixtureB.getShape();
    CollideEdgeCircle(manifold, shapeA, xfA2, shapeB, xfB2);
  }
  var e$2 = vec2(0, 0);
  var e1 = vec2(0, 0);
  var e2 = vec2(0, 0);
  var Q = vec2(0, 0);
  var P = vec2(0, 0);
  var n$2 = vec2(0, 0);
  var CollideEdgeCircle = function(manifold, edgeA, xfA2, circleB, xfB2) {
    manifold.pointCount = 0;
    retransformVec2(Q, xfB2, xfA2, circleB.m_p);
    var A = edgeA.m_vertex1;
    var B = edgeA.m_vertex2;
    subVec2(e$2, B, A);
    var u = dotVec2(e$2, B) - dotVec2(e$2, Q);
    var v3 = dotVec2(e$2, Q) - dotVec2(e$2, A);
    var radius = edgeA.m_radius + circleB.m_radius;
    if (v3 <= 0) {
      copyVec2(P, A);
      var dd_1 = distSqrVec2(Q, A);
      if (dd_1 > radius * radius) {
        return;
      }
      if (edgeA.m_hasVertex0) {
        var A1 = edgeA.m_vertex0;
        var B1 = A;
        subVec2(e1, B1, A1);
        var u1 = dotVec2(e1, B1) - dotVec2(e1, Q);
        if (u1 > 0) {
          return;
        }
      }
      manifold.type = exports2.ManifoldType.e_circles;
      zeroVec2(manifold.localNormal);
      copyVec2(manifold.localPoint, P);
      manifold.pointCount = 1;
      copyVec2(manifold.points[0].localPoint, circleB.m_p);
      manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
      return;
    }
    if (u <= 0) {
      copyVec2(P, B);
      var dd_2 = distSqrVec2(Q, P);
      if (dd_2 > radius * radius) {
        return;
      }
      if (edgeA.m_hasVertex3) {
        var B2 = edgeA.m_vertex3;
        var A2 = B;
        subVec2(e2, B2, A2);
        var v22 = dotVec2(e2, Q) - dotVec2(e2, A2);
        if (v22 > 0) {
          return;
        }
      }
      manifold.type = exports2.ManifoldType.e_circles;
      zeroVec2(manifold.localNormal);
      copyVec2(manifold.localPoint, P);
      manifold.pointCount = 1;
      copyVec2(manifold.points[0].localPoint, circleB.m_p);
      manifold.points[0].id.setFeatures(1, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
      return;
    }
    var den = lengthSqrVec2(e$2);
    combine2Vec2(P, u / den, A, v3 / den, B);
    var dd = distSqrVec2(Q, P);
    if (dd > radius * radius) {
      return;
    }
    crossNumVec2(n$2, 1, e$2);
    if (dotVec2(n$2, Q) - dotVec2(n$2, A) < 0) {
      negVec2(n$2);
    }
    normalizeVec2(n$2);
    manifold.type = exports2.ManifoldType.e_faceA;
    copyVec2(manifold.localNormal, n$2);
    copyVec2(manifold.localPoint, A);
    manifold.pointCount = 1;
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_face, 0, exports2.ContactFeatureType.e_vertex);
  };
  var incidentEdge = [new ClipVertex(), new ClipVertex()];
  var clipPoints1$1 = [new ClipVertex(), new ClipVertex()];
  var clipPoints2$1 = [new ClipVertex(), new ClipVertex()];
  var clipSegmentToLineNormal = vec2(0, 0);
  var v1 = vec2(0, 0);
  var n$1 = vec2(0, 0);
  var xf$1 = transform(0, 0, 0);
  var v11 = vec2(0, 0);
  var v12 = vec2(0, 0);
  var localTangent = vec2(0, 0);
  var localNormal = vec2(0, 0);
  var planePoint = vec2(0, 0);
  var tangent = vec2(0, 0);
  var normal$1 = vec2(0, 0);
  var normal1$1 = vec2(0, 0);
  Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);
  function PolygonContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
    CollidePolygons(manifold, fixtureA.getShape(), xfA2, fixtureB.getShape(), xfB2);
  }
  function findMaxSeparation(poly1, xf1, poly2, xf2, output2) {
    var count1 = poly1.m_count;
    var count2 = poly2.m_count;
    var n1s = poly1.m_normals;
    var v1s = poly1.m_vertices;
    var v2s = poly2.m_vertices;
    detransformTransform(xf$1, xf2, xf1);
    var bestIndex = 0;
    var maxSeparation2 = -Infinity;
    for (var i2 = 0; i2 < count1; ++i2) {
      rotVec2(n$1, xf$1.q, n1s[i2]);
      transformVec2$1(v1, xf$1, v1s[i2]);
      var si = Infinity;
      for (var j2 = 0; j2 < count2; ++j2) {
        var sij = dotVec2(n$1, v2s[j2]) - dotVec2(n$1, v1);
        if (sij < si) {
          si = sij;
        }
      }
      if (si > maxSeparation2) {
        maxSeparation2 = si;
        bestIndex = i2;
      }
    }
    output2.maxSeparation = maxSeparation2;
    output2.bestIndex = bestIndex;
  }
  function findIncidentEdge(clipVertex, poly1, xf1, edge12, poly2, xf2) {
    var normals1 = poly1.m_normals;
    var count2 = poly2.m_count;
    var vertices2 = poly2.m_vertices;
    var normals2 = poly2.m_normals;
    rerotVec2(normal1$1, xf2.q, xf1.q, normals1[edge12]);
    var index = 0;
    var minDot = Infinity;
    for (var i2 = 0; i2 < count2; ++i2) {
      var dot = dotVec2(normal1$1, normals2[i2]);
      if (dot < minDot) {
        minDot = dot;
        index = i2;
      }
    }
    var i1 = index;
    var i22 = i1 + 1 < count2 ? i1 + 1 : 0;
    transformVec2$1(clipVertex[0].v, xf2, vertices2[i1]);
    clipVertex[0].id.setFeatures(edge12, exports2.ContactFeatureType.e_face, i1, exports2.ContactFeatureType.e_vertex);
    transformVec2$1(clipVertex[1].v, xf2, vertices2[i22]);
    clipVertex[1].id.setFeatures(edge12, exports2.ContactFeatureType.e_face, i22, exports2.ContactFeatureType.e_vertex);
  }
  var maxSeparation = {
    maxSeparation: 0,
    bestIndex: 0
  };
  var CollidePolygons = function(manifold, polyA, xfA2, polyB, xfB2) {
    manifold.pointCount = 0;
    var totalRadius = polyA.m_radius + polyB.m_radius;
    findMaxSeparation(polyA, xfA2, polyB, xfB2, maxSeparation);
    var edgeA = maxSeparation.bestIndex;
    var separationA = maxSeparation.maxSeparation;
    if (separationA > totalRadius)
      return;
    findMaxSeparation(polyB, xfB2, polyA, xfA2, maxSeparation);
    var edgeB = maxSeparation.bestIndex;
    var separationB = maxSeparation.maxSeparation;
    if (separationB > totalRadius)
      return;
    var poly1;
    var poly2;
    var xf1;
    var xf2;
    var edge12;
    var flip;
    var k_tol = 0.1 * SettingsInternal.linearSlop;
    if (separationB > separationA + k_tol) {
      poly1 = polyB;
      poly2 = polyA;
      xf1 = xfB2;
      xf2 = xfA2;
      edge12 = edgeB;
      manifold.type = exports2.ManifoldType.e_faceB;
      flip = true;
    } else {
      poly1 = polyA;
      poly2 = polyB;
      xf1 = xfA2;
      xf2 = xfB2;
      edge12 = edgeA;
      manifold.type = exports2.ManifoldType.e_faceA;
      flip = false;
    }
    incidentEdge[0].recycle();
    incidentEdge[1].recycle();
    findIncidentEdge(incidentEdge, poly1, xf1, edge12, poly2, xf2);
    var count1 = poly1.m_count;
    var vertices1 = poly1.m_vertices;
    var iv1 = edge12;
    var iv2 = edge12 + 1 < count1 ? edge12 + 1 : 0;
    copyVec2(v11, vertices1[iv1]);
    copyVec2(v12, vertices1[iv2]);
    subVec2(localTangent, v12, v11);
    normalizeVec2(localTangent);
    crossVec2Num(localNormal, localTangent, 1);
    combine2Vec2(planePoint, 0.5, v11, 0.5, v12);
    rotVec2(tangent, xf1.q, localTangent);
    crossVec2Num(normal$1, tangent, 1);
    transformVec2$1(v11, xf1, v11);
    transformVec2$1(v12, xf1, v12);
    var frontOffset = dotVec2(normal$1, v11);
    var sideOffset1 = -dotVec2(tangent, v11) + totalRadius;
    var sideOffset2 = dotVec2(tangent, v12) + totalRadius;
    clipPoints1$1[0].recycle();
    clipPoints1$1[1].recycle();
    clipPoints2$1[0].recycle();
    clipPoints2$1[1].recycle();
    setVec2(clipSegmentToLineNormal, -tangent.x, -tangent.y);
    var np1 = clipSegmentToLine(clipPoints1$1, incidentEdge, clipSegmentToLineNormal, sideOffset1, iv1);
    if (np1 < 2) {
      return;
    }
    setVec2(clipSegmentToLineNormal, tangent.x, tangent.y);
    var np2 = clipSegmentToLine(clipPoints2$1, clipPoints1$1, clipSegmentToLineNormal, sideOffset2, iv2);
    if (np2 < 2) {
      return;
    }
    copyVec2(manifold.localNormal, localNormal);
    copyVec2(manifold.localPoint, planePoint);
    var pointCount = 0;
    for (var i2 = 0; i2 < clipPoints2$1.length; ++i2) {
      var separation = dotVec2(normal$1, clipPoints2$1[i2].v) - frontOffset;
      if (separation <= totalRadius) {
        var cp = manifold.points[pointCount];
        detransformVec2(cp.localPoint, xf2, clipPoints2$1[i2].v);
        cp.id.set(clipPoints2$1[i2].id);
        if (flip) {
          cp.id.swapFeatures();
        }
        ++pointCount;
      }
    }
    manifold.pointCount = pointCount;
  };
  Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);
  function PolygonCircleContact(manifold, xfA2, fixtureA, indexA, xfB2, fixtureB, indexB) {
    CollidePolygonCircle(manifold, fixtureA.getShape(), xfA2, fixtureB.getShape(), xfB2);
  }
  var cLocal = vec2(0, 0);
  var faceCenter = vec2(0, 0);
  var CollidePolygonCircle = function(manifold, polygonA, xfA2, circleB, xfB2) {
    manifold.pointCount = 0;
    retransformVec2(cLocal, xfB2, xfA2, circleB.m_p);
    var normalIndex = 0;
    var separation = -Infinity;
    var radius = polygonA.m_radius + circleB.m_radius;
    var vertexCount = polygonA.m_count;
    var vertices = polygonA.m_vertices;
    var normals = polygonA.m_normals;
    for (var i2 = 0; i2 < vertexCount; ++i2) {
      var s2 = dotVec2(normals[i2], cLocal) - dotVec2(normals[i2], vertices[i2]);
      if (s2 > radius) {
        return;
      }
      if (s2 > separation) {
        separation = s2;
        normalIndex = i2;
      }
    }
    var vertIndex1 = normalIndex;
    var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    var v13 = vertices[vertIndex1];
    var v22 = vertices[vertIndex2];
    if (separation < EPSILON) {
      manifold.pointCount = 1;
      manifold.type = exports2.ManifoldType.e_faceA;
      copyVec2(manifold.localNormal, normals[normalIndex]);
      combine2Vec2(manifold.localPoint, 0.5, v13, 0.5, v22);
      copyVec2(manifold.points[0].localPoint, circleB.m_p);
      manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
      return;
    }
    var u1 = dotVec2(cLocal, v22) - dotVec2(cLocal, v13) - dotVec2(v13, v22) + dotVec2(v13, v13);
    var u2 = dotVec2(cLocal, v13) - dotVec2(cLocal, v22) - dotVec2(v22, v13) + dotVec2(v22, v22);
    if (u1 <= 0) {
      if (distSqrVec2(cLocal, v13) > radius * radius) {
        return;
      }
      manifold.pointCount = 1;
      manifold.type = exports2.ManifoldType.e_faceA;
      subVec2(manifold.localNormal, cLocal, v13);
      normalizeVec2(manifold.localNormal);
      copyVec2(manifold.localPoint, v13);
      copyVec2(manifold.points[0].localPoint, circleB.m_p);
      manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
    } else if (u2 <= 0) {
      if (distSqrVec2(cLocal, v22) > radius * radius) {
        return;
      }
      manifold.pointCount = 1;
      manifold.type = exports2.ManifoldType.e_faceA;
      subVec2(manifold.localNormal, cLocal, v22);
      normalizeVec2(manifold.localNormal);
      copyVec2(manifold.localPoint, v22);
      copyVec2(manifold.points[0].localPoint, circleB.m_p);
      manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
    } else {
      combine2Vec2(faceCenter, 0.5, v13, 0.5, v22);
      var separation_1 = dotVec2(cLocal, normals[vertIndex1]) - dotVec2(faceCenter, normals[vertIndex1]);
      if (separation_1 > radius) {
        return;
      }
      manifold.pointCount = 1;
      manifold.type = exports2.ManifoldType.e_faceA;
      copyVec2(manifold.localNormal, normals[vertIndex1]);
      copyVec2(manifold.localPoint, faceCenter);
      copyVec2(manifold.points[0].localPoint, circleB.m_p);
      manifold.points[0].id.setFeatures(0, exports2.ContactFeatureType.e_vertex, 0, exports2.ContactFeatureType.e_vertex);
    }
  };
  var math_min = Math.min;
  Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
  Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);
  function EdgePolygonContact(manifold, xfA2, fA, indexA, xfB2, fB, indexB) {
    CollideEdgePolygon(manifold, fA.getShape(), xfA2, fB.getShape(), xfB2);
  }
  var edge_reuse = new EdgeShape();
  function ChainPolygonContact(manifold, xfA2, fA, indexA, xfB2, fB, indexB) {
    var chain = fA.getShape();
    chain.getChildEdge(edge_reuse, indexA);
    CollideEdgePolygon(manifold, edge_reuse, xfA2, fB.getShape(), xfB2);
  }
  var EPAxisType;
  (function(EPAxisType2) {
    EPAxisType2[EPAxisType2["e_unknown"] = -1] = "e_unknown";
    EPAxisType2[EPAxisType2["e_edgeA"] = 1] = "e_edgeA";
    EPAxisType2[EPAxisType2["e_edgeB"] = 2] = "e_edgeB";
  })(EPAxisType || (EPAxisType = {}));
  var VertexType;
  (function(VertexType2) {
    VertexType2[VertexType2["e_isolated"] = 0] = "e_isolated";
    VertexType2[VertexType2["e_concave"] = 1] = "e_concave";
    VertexType2[VertexType2["e_convex"] = 2] = "e_convex";
  })(VertexType || (VertexType = {}));
  var EPAxis = (
    /** @class */
    /* @__PURE__ */ (function() {
      function EPAxis2() {
      }
      return EPAxis2;
    })()
  );
  var TempPolygon = (
    /** @class */
    /* @__PURE__ */ (function() {
      function TempPolygon2() {
        this.vertices = [];
        this.normals = [];
        this.count = 0;
        for (var i2 = 0; i2 < SettingsInternal.maxPolygonVertices; i2++) {
          this.vertices.push(vec2(0, 0));
          this.normals.push(vec2(0, 0));
        }
      }
      return TempPolygon2;
    })()
  );
  var ReferenceFace = (
    /** @class */
    (function() {
      function ReferenceFace2() {
        this.v1 = vec2(0, 0);
        this.v2 = vec2(0, 0);
        this.normal = vec2(0, 0);
        this.sideNormal1 = vec2(0, 0);
        this.sideNormal2 = vec2(0, 0);
      }
      ReferenceFace2.prototype.recycle = function() {
        zeroVec2(this.v1);
        zeroVec2(this.v2);
        zeroVec2(this.normal);
        zeroVec2(this.sideNormal1);
        zeroVec2(this.sideNormal2);
      };
      return ReferenceFace2;
    })()
  );
  var clipPoints1 = [new ClipVertex(), new ClipVertex()];
  var clipPoints2 = [new ClipVertex(), new ClipVertex()];
  var ie = [new ClipVertex(), new ClipVertex()];
  var edgeAxis = new EPAxis();
  var polygonAxis = new EPAxis();
  var polygonBA = new TempPolygon();
  var rf = new ReferenceFace();
  var centroidB = vec2(0, 0);
  var edge0 = vec2(0, 0);
  var edge1 = vec2(0, 0);
  var edge2 = vec2(0, 0);
  var xf = transform(0, 0, 0);
  var normal = vec2(0, 0);
  var normal0 = vec2(0, 0);
  var normal1 = vec2(0, 0);
  var normal2 = vec2(0, 0);
  var lowerLimit = vec2(0, 0);
  var upperLimit = vec2(0, 0);
  var perp = vec2(0, 0);
  var n = vec2(0, 0);
  var CollideEdgePolygon = function(manifold, edgeA, xfA2, polygonB, xfB2) {
    detransformTransform(xf, xfA2, xfB2);
    transformVec2$1(centroidB, xf, polygonB.m_centroid);
    var v0 = edgeA.m_vertex0;
    var v13 = edgeA.m_vertex1;
    var v22 = edgeA.m_vertex2;
    var v3 = edgeA.m_vertex3;
    var hasVertex0 = edgeA.m_hasVertex0;
    var hasVertex3 = edgeA.m_hasVertex3;
    subVec2(edge1, v22, v13);
    normalizeVec2(edge1);
    setVec2(normal1, edge1.y, -edge1.x);
    var offset1 = dotVec2(normal1, centroidB) - dotVec2(normal1, v13);
    var offset0 = 0;
    var offset2 = 0;
    var convex1 = false;
    var convex2 = false;
    zeroVec2(normal0);
    zeroVec2(normal2);
    if (hasVertex0) {
      subVec2(edge0, v13, v0);
      normalizeVec2(edge0);
      setVec2(normal0, edge0.y, -edge0.x);
      convex1 = crossVec2Vec2(edge0, edge1) >= 0;
      offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
    }
    if (hasVertex3) {
      subVec2(edge2, v3, v22);
      normalizeVec2(edge2);
      setVec2(normal2, edge2.y, -edge2.x);
      convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0;
      offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v22);
    }
    var front;
    zeroVec2(normal);
    zeroVec2(lowerLimit);
    zeroVec2(upperLimit);
    if (hasVertex0 && hasVertex3) {
      if (convex1 && convex2) {
        front = offset0 >= 0 || offset1 >= 0 || offset2 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          copyVec2(lowerLimit, normal0);
          copyVec2(upperLimit, normal2);
        } else {
          scaleVec2(normal, -1, normal1);
          scaleVec2(lowerLimit, -1, normal1);
          scaleVec2(upperLimit, -1, normal1);
        }
      } else if (convex1) {
        front = offset0 >= 0 || offset1 >= 0 && offset2 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          copyVec2(lowerLimit, normal0);
          copyVec2(upperLimit, normal1);
        } else {
          scaleVec2(normal, -1, normal1);
          scaleVec2(lowerLimit, -1, normal2);
          scaleVec2(upperLimit, -1, normal1);
        }
      } else if (convex2) {
        front = offset2 >= 0 || offset0 >= 0 && offset1 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          copyVec2(lowerLimit, normal1);
          copyVec2(upperLimit, normal2);
        } else {
          scaleVec2(normal, -1, normal1);
          scaleVec2(lowerLimit, -1, normal1);
          scaleVec2(upperLimit, -1, normal0);
        }
      } else {
        front = offset0 >= 0 && offset1 >= 0 && offset2 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          copyVec2(lowerLimit, normal1);
          copyVec2(upperLimit, normal1);
        } else {
          scaleVec2(normal, -1, normal1);
          scaleVec2(lowerLimit, -1, normal2);
          scaleVec2(upperLimit, -1, normal0);
        }
      }
    } else if (hasVertex0) {
      if (convex1) {
        front = offset0 >= 0 || offset1 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          copyVec2(lowerLimit, normal0);
          scaleVec2(upperLimit, -1, normal1);
        } else {
          scaleVec2(normal, -1, normal1);
          copyVec2(lowerLimit, normal1);
          scaleVec2(upperLimit, -1, normal1);
        }
      } else {
        front = offset0 >= 0 && offset1 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          copyVec2(lowerLimit, normal1);
          scaleVec2(upperLimit, -1, normal1);
        } else {
          scaleVec2(normal, -1, normal1);
          copyVec2(lowerLimit, normal1);
          scaleVec2(upperLimit, -1, normal0);
        }
      }
    } else if (hasVertex3) {
      if (convex2) {
        front = offset1 >= 0 || offset2 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          scaleVec2(lowerLimit, -1, normal1);
          copyVec2(upperLimit, normal2);
        } else {
          scaleVec2(normal, -1, normal1);
          scaleVec2(lowerLimit, -1, normal1);
          copyVec2(upperLimit, normal1);
        }
      } else {
        front = offset1 >= 0 && offset2 >= 0;
        if (front) {
          copyVec2(normal, normal1);
          scaleVec2(lowerLimit, -1, normal1);
          copyVec2(upperLimit, normal1);
        } else {
          scaleVec2(normal, -1, normal1);
          scaleVec2(lowerLimit, -1, normal2);
          copyVec2(upperLimit, normal1);
        }
      }
    } else {
      front = offset1 >= 0;
      if (front) {
        copyVec2(normal, normal1);
        scaleVec2(lowerLimit, -1, normal1);
        scaleVec2(upperLimit, -1, normal1);
      } else {
        scaleVec2(normal, -1, normal1);
        copyVec2(lowerLimit, normal1);
        copyVec2(upperLimit, normal1);
      }
    }
    polygonBA.count = polygonB.m_count;
    for (var i2 = 0; i2 < polygonB.m_count; ++i2) {
      transformVec2$1(polygonBA.vertices[i2], xf, polygonB.m_vertices[i2]);
      rotVec2(polygonBA.normals[i2], xf.q, polygonB.m_normals[i2]);
    }
    var radius = polygonB.m_radius + edgeA.m_radius;
    manifold.pointCount = 0;
    {
      edgeAxis.type = EPAxisType.e_edgeA;
      edgeAxis.index = front ? 0 : 1;
      edgeAxis.separation = Infinity;
      for (var i2 = 0; i2 < polygonBA.count; ++i2) {
        var v4 = polygonBA.vertices[i2];
        var s2 = dotVec2(normal, v4) - dotVec2(normal, v13);
        if (s2 < edgeAxis.separation) {
          edgeAxis.separation = s2;
        }
      }
    }
    if (edgeAxis.type == EPAxisType.e_unknown) {
      return;
    }
    if (edgeAxis.separation > radius) {
      return;
    }
    {
      polygonAxis.type = EPAxisType.e_unknown;
      polygonAxis.index = -1;
      polygonAxis.separation = -Infinity;
      setVec2(perp, -normal.y, normal.x);
      for (var i2 = 0; i2 < polygonBA.count; ++i2) {
        scaleVec2(n, -1, polygonBA.normals[i2]);
        var s1 = dotVec2(n, polygonBA.vertices[i2]) - dotVec2(n, v13);
        var s22 = dotVec2(n, polygonBA.vertices[i2]) - dotVec2(n, v22);
        var s2 = math_min(s1, s22);
        if (s2 > radius) {
          polygonAxis.type = EPAxisType.e_edgeB;
          polygonAxis.index = i2;
          polygonAxis.separation = s2;
          break;
        }
        if (dotVec2(n, perp) >= 0) {
          if (dotVec2(n, normal) - dotVec2(upperLimit, normal) < -SettingsInternal.angularSlop) {
            continue;
          }
        } else {
          if (dotVec2(n, normal) - dotVec2(lowerLimit, normal) < -SettingsInternal.angularSlop) {
            continue;
          }
        }
        if (s2 > polygonAxis.separation) {
          polygonAxis.type = EPAxisType.e_edgeB;
          polygonAxis.index = i2;
          polygonAxis.separation = s2;
        }
      }
    }
    if (polygonAxis.type != EPAxisType.e_unknown && polygonAxis.separation > radius) {
      return;
    }
    var k_relativeTol = 0.98;
    var k_absoluteTol = 1e-3;
    var primaryAxis;
    if (polygonAxis.type == EPAxisType.e_unknown) {
      primaryAxis = edgeAxis;
    } else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
      primaryAxis = polygonAxis;
    } else {
      primaryAxis = edgeAxis;
    }
    ie[0].recycle();
    ie[1].recycle();
    if (primaryAxis.type == EPAxisType.e_edgeA) {
      manifold.type = exports2.ManifoldType.e_faceA;
      var bestIndex = 0;
      var bestValue = dotVec2(normal, polygonBA.normals[0]);
      for (var i2 = 1; i2 < polygonBA.count; ++i2) {
        var value = dotVec2(normal, polygonBA.normals[i2]);
        if (value < bestValue) {
          bestValue = value;
          bestIndex = i2;
        }
      }
      var i1 = bestIndex;
      var i22 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;
      copyVec2(ie[0].v, polygonBA.vertices[i1]);
      ie[0].id.setFeatures(0, exports2.ContactFeatureType.e_face, i1, exports2.ContactFeatureType.e_vertex);
      copyVec2(ie[1].v, polygonBA.vertices[i22]);
      ie[1].id.setFeatures(0, exports2.ContactFeatureType.e_face, i22, exports2.ContactFeatureType.e_vertex);
      if (front) {
        rf.i1 = 0;
        rf.i2 = 1;
        copyVec2(rf.v1, v13);
        copyVec2(rf.v2, v22);
        copyVec2(rf.normal, normal1);
      } else {
        rf.i1 = 1;
        rf.i2 = 0;
        copyVec2(rf.v1, v22);
        copyVec2(rf.v2, v13);
        scaleVec2(rf.normal, -1, normal1);
      }
    } else {
      manifold.type = exports2.ManifoldType.e_faceB;
      copyVec2(ie[0].v, v13);
      ie[0].id.setFeatures(primaryAxis.index, exports2.ContactFeatureType.e_face, 0, exports2.ContactFeatureType.e_vertex);
      copyVec2(ie[1].v, v22);
      ie[1].id.setFeatures(primaryAxis.index, exports2.ContactFeatureType.e_face, 1, exports2.ContactFeatureType.e_vertex);
      rf.i1 = primaryAxis.index;
      rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
      copyVec2(rf.v1, polygonBA.vertices[rf.i1]);
      copyVec2(rf.v2, polygonBA.vertices[rf.i2]);
      copyVec2(rf.normal, polygonBA.normals[rf.i1]);
    }
    setVec2(rf.sideNormal1, rf.normal.y, -rf.normal.x);
    setVec2(rf.sideNormal2, -rf.sideNormal1.x, -rf.sideNormal1.y);
    rf.sideOffset1 = dotVec2(rf.sideNormal1, rf.v1);
    rf.sideOffset2 = dotVec2(rf.sideNormal2, rf.v2);
    clipPoints1[0].recycle();
    clipPoints1[1].recycle();
    clipPoints2[0].recycle();
    clipPoints2[1].recycle();
    var np1 = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
    if (np1 < SettingsInternal.maxManifoldPoints) {
      return;
    }
    var np2 = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
    if (np2 < SettingsInternal.maxManifoldPoints) {
      return;
    }
    if (primaryAxis.type == EPAxisType.e_edgeA) {
      copyVec2(manifold.localNormal, rf.normal);
      copyVec2(manifold.localPoint, rf.v1);
    } else {
      copyVec2(manifold.localNormal, polygonB.m_normals[rf.i1]);
      copyVec2(manifold.localPoint, polygonB.m_vertices[rf.i1]);
    }
    var pointCount = 0;
    for (var i2 = 0; i2 < SettingsInternal.maxManifoldPoints; ++i2) {
      var separation = dotVec2(rf.normal, clipPoints2[i2].v) - dotVec2(rf.normal, rf.v1);
      if (separation <= radius) {
        var cp = manifold.points[pointCount];
        if (primaryAxis.type == EPAxisType.e_edgeA) {
          detransformVec2(cp.localPoint, xf, clipPoints2[i2].v);
          cp.id.set(clipPoints2[i2].id);
        } else {
          copyVec2(cp.localPoint, clipPoints2[i2].v);
          cp.id.set(clipPoints2[i2].id);
          cp.id.swapFeatures();
        }
        ++pointCount;
      }
    }
    manifold.pointCount = pointCount;
  };
  var internal = {
    CollidePolygons,
    Settings,
    Sweep,
    Manifold,
    Distance,
    TimeOfImpact,
    DynamicTree,
    stats
  };
  var DataDriver = (
    /** @class */
    (function() {
      function DataDriver2(key, listener) {
        this._refMap = {};
        this._map = {};
        this._xmap = {};
        this._data = [];
        this._entered = [];
        this._exited = [];
        this._key = key;
        this._listener = listener;
      }
      DataDriver2.prototype.update = function(data) {
        if (!Array.isArray(data))
          throw "Invalid data: " + data;
        this._entered.length = 0;
        this._exited.length = 0;
        this._data.length = data.length;
        for (var i2 = 0; i2 < data.length; i2++) {
          if (typeof data[i2] !== "object" || data[i2] === null)
            continue;
          var d2 = data[i2];
          var id = this._key(d2);
          if (!this._map[id]) {
            this._entered.push(d2);
          } else {
            delete this._map[id];
          }
          this._data[i2] = d2;
          this._xmap[id] = d2;
        }
        for (var id in this._map) {
          this._exited.push(this._map[id]);
          delete this._map[id];
        }
        var temp3 = this._map;
        this._map = this._xmap;
        this._xmap = temp3;
        for (var i2 = 0; i2 < this._exited.length; i2++) {
          var d2 = this._exited[i2];
          var key = this._key(d2);
          var ref = this._refMap[key];
          this._listener.exit(d2, ref);
          delete this._refMap[key];
        }
        for (var i2 = 0; i2 < this._entered.length; i2++) {
          var d2 = this._entered[i2];
          var key = this._key(d2);
          var ref = this._listener.enter(d2);
          if (ref) {
            this._refMap[key] = ref;
          }
        }
        for (var i2 = 0; i2 < this._data.length; i2++) {
          if (typeof data[i2] !== "object" || data[i2] === null)
            continue;
          var d2 = this._data[i2];
          var key = this._key(d2);
          var ref = this._refMap[key];
          this._listener.update(d2, ref);
        }
        this._entered.length = 0;
        this._exited.length = 0;
        this._data.length = 0;
      };
      DataDriver2.prototype.ref = function(d2) {
        return this._refMap[this._key(d2)];
      };
      return DataDriver2;
    })()
  );
  var i = Symbol.for("preact-signals");
  function t() {
    if (!(v > 1)) {
      var i2, t2 = false;
      !(function() {
        var i3 = c;
        c = void 0;
        while (void 0 !== i3) {
          var t3 = i3.S;
          if (t3.v === i3.v) {
            for (var n3 = t3.t; void 0 !== n3; n3 = n3.x) if (n3.i === i3.i) n3.i = t3.i;
          }
          i3 = i3.o;
        }
      })();
      while (void 0 !== h) {
        var n2 = h;
        h = void 0;
        s++;
        while (void 0 !== n2) {
          var r2 = n2.u;
          n2.u = void 0;
          n2.f &= -3;
          if (!(8 & n2.f) && w(n2)) try {
            n2.c();
          } catch (n3) {
            if (!t2) {
              i2 = n3;
              t2 = true;
            }
          }
          n2 = r2;
        }
      }
      s = 0;
      v--;
      if (t2) throw i2;
    } else v--;
  }
  var r, o = void 0;
  function f(i2) {
    var t2 = o, n2 = r;
    o = void 0;
    r = void 0;
    try {
      return i2();
    } finally {
      o = t2;
      r = n2;
    }
  }
  var h = void 0, v = 0, s = 0, e = 0, c = void 0, d = 0;
  function a(i2) {
    if (void 0 !== o) {
      var t2 = i2.n;
      if (void 0 === t2 || t2.t !== o) {
        t2 = { i: 0, S: i2, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 };
        if (void 0 !== o.s) o.s.n = t2;
        o.s = t2;
        i2.n = t2;
        if (32 & o.f) i2.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = o.s;
          t2.n = void 0;
          o.s.n = t2;
          o.s = t2;
        }
        return t2;
      }
    }
  }
  function l(i2, t2) {
    this.v = i2;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.l = 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  l.prototype.brand = i;
  l.prototype.h = function() {
    return true;
  };
  l.prototype.S = function(i2) {
    var t2 = this, n2 = this.t;
    if (n2 !== i2 && void 0 === i2.e) {
      i2.x = n2;
      this.t = i2;
      if (void 0 !== n2) n2.e = i2;
      else f(function() {
        var i3;
        null == (i3 = t2.W) || i3.call(t2);
      });
    }
  };
  l.prototype.U = function(i2) {
    var t2 = this;
    if (void 0 !== this.t) {
      var n2 = i2.e, r2 = i2.x;
      if (void 0 !== n2) {
        n2.x = r2;
        i2.e = void 0;
      }
      if (void 0 !== r2) {
        r2.e = n2;
        i2.x = void 0;
      }
      if (i2 === this.t) {
        this.t = r2;
        if (void 0 === r2) f(function() {
          var i3;
          null == (i3 = t2.Z) || i3.call(t2);
        });
      }
    }
  };
  l.prototype.subscribe = function(i2) {
    var t2 = this;
    return j(function() {
      var n2 = t2.value;
      f(function() {
        return i2(n2);
      });
    }, { name: "sub" });
  };
  l.prototype.valueOf = function() {
    return this.value;
  };
  l.prototype.toString = function() {
    return this.value + "";
  };
  l.prototype.toJSON = function() {
    return this.value;
  };
  l.prototype.peek = function() {
    var i2 = this;
    return f(function() {
      return i2.value;
    });
  };
  Object.defineProperty(l.prototype, "value", { get: function() {
    var i2 = a(this);
    if (void 0 !== i2) i2.i = this.i;
    return this.v;
  }, set: function(i2) {
    if (i2 !== this.v) {
      if (s > 100) throw new Error("Cycle detected");
      !(function(i3) {
        if (0 !== v && 0 === s) {
          if (i3.l !== e) {
            i3.l = e;
            c = { S: i3, v: i3.v, i: i3.i, o: c };
          }
        }
      })(this);
      this.v = i2;
      this.i++;
      d++;
      v++;
      try {
        for (var n2 = this.t; void 0 !== n2; n2 = n2.x) n2.t.N();
      } finally {
        t();
      }
    }
  } });
  function y(i2, t2) {
    return new l(i2, t2);
  }
  function w(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function _(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
      var n2 = t2.S.n;
      if (void 0 !== n2) t2.r = n2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i2.s = t2;
        break;
      }
    }
  }
  function b(i2) {
    var t2 = i2.s, n2 = void 0;
    while (void 0 !== t2) {
      var r2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== r2) r2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = r2;
      } else n2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = r2;
    }
    i2.s = n2;
  }
  function p(i2, t2) {
    l.call(this, void 0, t2);
    this.x = i2;
    this.s = void 0;
    this.g = d - 1;
    this.f = 4;
  }
  p.prototype = new l();
  p.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === d) return true;
    this.g = d;
    this.f |= 1;
    if (this.i > 0 && !w(this)) {
      this.f &= -2;
      return true;
    }
    var i2 = o;
    try {
      _(this);
      o = this;
      var t2 = this.x();
      if (16 & this.f || this.v !== t2 || 0 === this.i) {
        this.v = t2;
        this.f &= -17;
        this.i++;
      }
    } catch (i3) {
      this.v = i3;
      this.f |= 16;
      this.i++;
    }
    o = i2;
    b(this);
    this.f &= -2;
    return true;
  };
  p.prototype.S = function(i2) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
    }
    l.prototype.S.call(this, i2);
  };
  p.prototype.U = function(i2) {
    if (void 0 !== this.t) {
      l.prototype.U.call(this, i2);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
      }
    }
  };
  p.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
    }
  };
  Object.defineProperty(p.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i2 = a(this);
    this.h();
    if (void 0 !== i2) i2.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function S(i2) {
    var n2 = i2.m;
    i2.m = void 0;
    if ("function" == typeof n2) {
      v++;
      var r2 = o;
      o = void 0;
      try {
        n2();
      } catch (t2) {
        i2.f &= -2;
        i2.f |= 8;
        m(i2);
        throw t2;
      } finally {
        o = r2;
        t();
      }
    }
  }
  function m(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i2.x = void 0;
    i2.s = void 0;
    S(i2);
  }
  function x(i2) {
    if (o !== this) throw new Error("Out-of-order effect");
    b(this);
    o = i2;
    this.f &= -2;
    if (8 & this.f) m(this);
    t();
  }
  function E(i2, t2) {
    this.x = i2;
    this.m = void 0;
    this.s = void 0;
    this.u = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
    if (r) r.push(this);
  }
  E.prototype.c = function() {
    var i2 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t2 = this.x();
      if ("function" == typeof t2) this.m = t2;
    } finally {
      i2();
    }
  };
  E.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    S(this);
    _(this);
    v++;
    var i2 = o;
    o = this;
    return x.bind(this, i2);
  };
  E.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.u = h;
      h = this;
    }
  };
  E.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) m(this);
  };
  E.prototype.dispose = function() {
    this.d();
  };
  function j(i2, t2) {
    var n2 = new E(i2, t2);
    try {
      n2.c();
    } catch (i3) {
      n2.d();
      throw i3;
    }
    var r2 = n2.d.bind(n2);
    r2[Symbol.dispose] = r2;
    return r2;
  }
  class ProviderCollection {
    constructor() {
      this.list = [];
    }
    register(provider) {
      this.list.push(provider);
    }
  }
  y();
  const toolbarTool = new ProviderCollection();
  const runtime = y();
  let random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
  let customRandom = (alphabet, defaultSize, getRandom) => {
    let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
    let step = -~(1.6 * mask * defaultSize / alphabet.length);
    return (size = defaultSize) => {
      let id = "";
      while (true) {
        let bytes = getRandom(step);
        let j2 = step | 0;
        while (j2--) {
          id += alphabet[bytes[j2] & mask] || "";
          if (id.length === size) return id;
        }
      }
    };
  };
  let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
  const generateKey = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
  function getKey(obj) {
    if (obj && typeof obj["__key"] === "string") {
      return obj["__key"];
    }
  }
  function setKey(obj, key) {
    if (!obj)
      return;
    if (!obj["__key"]) {
      obj["__key"] = generateKey();
    }
    return obj["__key"];
  }
  const getLabel = (obj) => {
    if (obj.lookupId) {
      return obj.lookupId;
    }
    if (obj.spaceName) {
      return obj.spaceName;
    }
    return null;
  };
  const findOne = (world, query) => {
    if (query.indexOf("#")) {
      const [type, label] = query.split("#", 2);
      if (type === "body") {
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          if (getLabel(body) === label) {
            return body;
          }
        }
      } else if (type === "fixture") {
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            if (getLabel(fixture) === label) {
              return fixture;
            }
          }
        }
      } else if (type === "joint") {
        for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
          if (getLabel(joint) === label) {
            return joint;
          }
        }
      }
    }
    return null;
  };
  const findAll = (world, query) => {
    const result = [];
    if (query.indexOf("#")) {
      const [type, label] = query.split("#", 2);
      if (type === "body") {
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          if (getLabel(body) === label) {
            result.push(body);
          }
        }
      } else if (type === "fixture") {
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            if (getLabel(fixture) === label) {
              result.push(fixture);
            }
          }
        }
      } else if (type === "joint") {
        for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
          if (getLabel(joint) === label) {
            result.push(joint);
          }
        }
      }
    }
    return result;
  };
  class Multiselect {
    constructor(selected = []) {
      this.selected = [];
      this.selected = selected;
    }
  }
  function isSelected(selection, key) {
    return !!selection?.selected.some((s2) => s2.key === key);
  }
  function setSelection(context, selection) {
    context.multiselect.value = new Multiselect(selection?.key ? [selection] : []);
  }
  function emptySelection(context) {
    setSelection(context, null);
  }
  function removeSelection(context, selection) {
    if (isSelected(context.multiselect.value, selection.key))
      emptySelection(context);
  }
  function selectBody(body) {
    return { type: "body", key: body };
  }
  function selectFixture(fixture, body) {
    return { type: "fixture", key: fixture, up: { type: "body", key: body } };
  }
  function selectJoint(joint) {
    return { type: "joint", key: joint };
  }
  /**
   * Polymatic v0.3.1
   * @copyright Copyright 2026 Ali Shakiba
   * @license Licensed under the MIT (https://github.com/piqnt/polymatic/blob/main/LICENSE.md)
   */
  class EventType {
    static create(name) {
      return new EventType(name);
    }
    constructor(name) {
      this.name = name;
    }
  }
  const Failure = EventType.create("polymatic:failure");
  const INSPECTOR_KEY = "__POLYMATIC_INSPECTOR__";
  function inspector() {
    return globalThis[INSPECTOR_KEY];
  }
  let bubbling = false;
  let handled = 0;
  function next(children, i2, child) {
    if (children[i2] === child)
      return i2;
    const at = children.indexOf(child);
    return at >= 0 ? at : i2 - 1;
  }
  class Middleware {
    constructor() {
      this.__handlers = {};
      this.__children = [];
      this.__parent = null;
      this.__pendingActivate = false;
      this.__deactivated = false;
      this._swap = (children) => {
        const current = this.__children;
        const removed = [];
        const added = [];
        for (const child of children) {
          if (current.indexOf(child) === -1) {
            added.push(child);
          }
        }
        for (const child of current) {
          if (children.indexOf(child) === -1) {
            removed.push(child);
          }
        }
        this.__children.length = 0;
        this.__children.push(...children);
        for (const child of removed) {
          child.__deactivate();
          child.__detach();
        }
        if (this.activated) {
          for (const child of added) {
            child.__attach(this);
            child.__activate();
          }
        }
      };
    }
    get activated() {
      return this.__parent ? this.__parent.activated : false;
    }
    /**
     * Add a child middleware.
     *
     * The child's context type is what it needs, and this middleware's context type must provide
     * all of it: fields it declares with the same types. A middleware that uses children with
     * different needs declares all of them in its own context type.
     */
    use(middleware) {
      const index = this.__children.indexOf(middleware);
      if (index !== -1)
        return;
      if (this.activated) {
        middleware.__attach(this);
        middleware.__activate();
      }
      this.__children.push(middleware);
    }
    unuse(middleware) {
      const index = this.__children.indexOf(middleware);
      if (index !== -1) {
        this.__children.splice(index, 1);
        middleware === null || middleware === void 0 ? void 0 : middleware.__deactivate();
        middleware === null || middleware === void 0 ? void 0 : middleware.__detach();
      }
    }
    /**
     * Activation runs in two passes over the subtree: `__attach` links every middleware to its
     * parent, then `__activate` calls activate handlers, parents before children. So an activate
     * handler can rely on the whole subtree being attached. Deactivation mirrors it: `__deactivate`
     * calls deactivate handlers while the subtree is still attached, then `__detach` unlinks it.
     *
     * @internal @hidden
     */
    __attach(parent) {
      if (this.__parent) {
        return;
      }
      this.__parent = parent;
      this.__pendingActivate = true;
      this.__deactivated = false;
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        this.__children[i2].__attach(this);
      }
    }
    /** @internal @hidden */
    __activate() {
      var _a2, _b;
      if (!this.__pendingActivate) {
        return;
      }
      this.__pendingActivate = false;
      (_b = (_a2 = inspector()) === null || _a2 === void 0 ? void 0 : _a2.activate) === null || _b === void 0 ? void 0 : _b.call(_a2, this);
      this._handle("activate");
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        const child = this.__children[i2];
        child.__activate();
        i2 = next(this.__children, i2, child);
      }
    }
    /** @internal @hidden */
    __deactivate() {
      var _a2, _b;
      if (!this.__parent || this.__deactivated) {
        return;
      }
      this.__deactivated = true;
      if (!this.__pendingActivate) {
        (_b = (_a2 = inspector()) === null || _a2 === void 0 ? void 0 : _a2.deactivate) === null || _b === void 0 ? void 0 : _b.call(_a2, this);
        this._handle("deactivate");
      }
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        const child = this.__children[i2];
        child.__deactivate();
        i2 = next(this.__children, i2, child);
      }
    }
    /** @internal @hidden */
    __detach() {
      if (!this.__parent) {
        return;
      }
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        this.__children[i2].__detach();
      }
      this.__pendingActivate = false;
      this.__deactivated = false;
      this.__parent = null;
    }
    get context() {
      if (this.__parent) {
        return this.__parent.context;
      } else {
        return null;
      }
    }
    /** @hidden @deprecated Set context directly */
    setContext(setter) {
      if (this.__parent) {
        this.__parent.setContext(setter);
      } else {
        console.error("Middleware is not activated");
      }
    }
    /**
     * Add an event handler.
     *
     * If an event handler function returns true, it will stop propagation to any other middlewares.
     *
     * If it throws, or returns a promise that is rejected, the event is still delivered to the other
     * middlewares, and the error goes to `Failure` handlers up the parent chain.
     *
     * A middleware can have up to one handler for each event `type`.
     *
     * `type` is an event type, and the handler receives its payload type, or an event name.
     */
    on(type, handler) {
      const name = typeof type === "string" ? type : type.name;
      if (this.__handlers[name])
        throw Error(`Handler for ${name} already exists`);
      this.__handlers[name] = handler;
    }
    /**
     * This is used internally, calls event handler and passes down event to children.
     */
    _consume(type, ev) {
      const stop = this._handle(type, ev);
      if (stop)
        return true;
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        const child = this.__children[i2];
        const stop2 = child._consume(type, ev);
        if (stop2)
          return true;
        i2 = next(this.__children, i2, child);
      }
      return false;
    }
    /**
     * This is used internally, calls event handler.
     */
    _handle(type, ev) {
      var _a2;
      if (!this.activated)
        return;
      const handler = this.__handlers && this.__handlers[type];
      if (handler) {
        if (typeof handler === "function") {
          handled++;
          const inspect2 = inspector();
          const start = (inspect2 === null || inspect2 === void 0 ? void 0 : inspect2.handle) ? performance.now() : 0;
          let result;
          let failed = false;
          let error;
          try {
            result = handler.call(this, ev);
          } catch (e3) {
            failed = true;
            error = e3;
          }
          const stop = result === true;
          (_a2 = inspect2 === null || inspect2 === void 0 ? void 0 : inspect2.handle) === null || _a2 === void 0 ? void 0 : _a2.call(inspect2, type, ev, this, performance.now() - start, stop);
          if (failed) {
            fail({ error, middleware: this, type, ev });
          } else if (result && typeof result.then === "function") {
            result.then(void 0, (e3) => fail({ error: e3, middleware: this, type, ev }));
          }
          return stop;
        }
      }
      return false;
    }
    /**
     * Send an event to all active middlewares.
     *
     * An event is first bubbled to the runtime through middleware parent chain.
     * Runtime queues events as microtask -- they are asynchronously but in the same animation frame.
     * Events are then recursively passed down to all active middlewares and their children.
     *
     * If an event handler returns true, delivering the event is stopped.
     *
     * `type` is an event type, and `ev` must be its payload type, or an event name.
     */
    emit(type, ...[ev]) {
      var _a2, _b;
      if (!this.activated)
        return;
      const name = typeof type === "string" ? type : type.name;
      if (!bubbling)
        (_b = (_a2 = inspector()) === null || _a2 === void 0 ? void 0 : _a2.emit) === null || _b === void 0 ? void 0 : _b.call(_a2, name, ev, this);
      if (this.__parent) {
        const outer = bubbling;
        bubbling = true;
        try {
          this.__parent.emit(name, ev);
        } finally {
          bubbling = outer;
        }
      } else {
        console.error(Error("Not active!"));
      }
    }
    /** @hidden @deprecated */
    static activate(middleware, context) {
      return Runtime.activate(middleware, context);
    }
  }
  function fail(failure) {
    var _a2, _b, _c;
    let stoppedBy = null;
    let m2 = failure.middleware.__parent;
    while (m2 && !stoppedBy) {
      const handler = m2.activated && ((_a2 = m2.__handlers) === null || _a2 === void 0 ? void 0 : _a2[Failure.name]);
      if (typeof handler === "function") {
        try {
          if (handler.call(m2, failure) === true)
            stoppedBy = m2;
        } catch (e3) {
          report(e3);
        }
      }
      m2 = m2.__parent;
    }
    (_c = (_b = inspector()) === null || _b === void 0 ? void 0 : _b.failure) === null || _c === void 0 ? void 0 : _c.call(_b, failure, stoppedBy);
    if (!stoppedBy)
      report(failure.error);
  }
  function report(error) {
    const reportError = globalThis.reportError;
    if (typeof reportError === "function")
      reportError(error);
    else
      console.error(error);
  }
  class Runtime extends Middleware {
    constructor() {
      super(...arguments);
      this.displayName = "Runtime";
      this.__handlers = {};
      this.__children = [];
      this._activated = false;
      this.contextUpdateEmit = () => {
        this.emit("context-change");
      };
      this._microtask = Promise.resolve();
    }
    get activated() {
      return this._activated;
    }
    _activate(context) {
      var _a2, _b;
      if (this._activated) {
        return;
      }
      this._context = context;
      this._activated = true;
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        this.__children[i2].__attach(this);
      }
      (_b = (_a2 = inspector()) === null || _a2 === void 0 ? void 0 : _a2.activate) === null || _b === void 0 ? void 0 : _b.call(_a2, this);
      this._handle("activate");
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        const child = this.__children[i2];
        child.__activate();
        i2 = next(this.__children, i2, child);
      }
    }
    _deactivate() {
      var _a2, _b;
      if (!this._activated) {
        return;
      }
      (_b = (_a2 = inspector()) === null || _a2 === void 0 ? void 0 : _a2.deactivate) === null || _b === void 0 ? void 0 : _b.call(_a2, this);
      this._handle("deactivate");
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        const child = this.__children[i2];
        child.__deactivate();
        i2 = next(this.__children, i2, child);
      }
      for (let i2 = 0; i2 < this.__children.length; i2++) {
        this.__children[i2].__detach();
      }
      this._activated = false;
    }
    get context() {
      return this._context;
    }
    setContext(setter) {
      if (typeof setter !== "function") {
        console.error("Setter is not a function: ", setter);
        return;
      }
      setter(this.context);
      clearTimeout(this.contextUpdateEmitTimeout);
      this.contextUpdateEmitTimeout = setTimeout(this.contextUpdateEmit);
    }
    emit(type, ...[ev]) {
      var _a2, _b;
      const name = typeof type === "string" ? type : type.name;
      if (!bubbling)
        (_b = (_a2 = inspector()) === null || _a2 === void 0 ? void 0 : _a2.emit) === null || _b === void 0 ? void 0 : _b.call(_a2, name, ev, this);
      this._microtask.then(() => this.__dispatch(name, ev));
    }
    /** @internal @hidden delivers a queued event down the tree */
    __dispatch(name, ev) {
      var _a2, _b;
      const inspect2 = inspector();
      if (!inspect2) {
        this._consume(name, ev);
        return;
      }
      (_a2 = inspect2.dispatch) === null || _a2 === void 0 ? void 0 : _a2.call(inspect2, name, ev, this);
      const outer = handled;
      handled = 0;
      try {
        this._consume(name, ev);
      } finally {
        const count = handled;
        handled = outer;
        (_b = inspect2.dispatched) === null || _b === void 0 ? void 0 : _b.call(inspect2, name, ev, count);
      }
    }
    static activate(middleware, context) {
      const manager = new Runtime();
      manager.use(middleware);
      manager._activate(context);
    }
    static deactivate(middleware) {
      if ("_deactivate" in middleware && typeof middleware._deactivate === "function") {
        middleware._deactivate();
        return true;
      }
      const parent = middleware.__parent;
      if (parent && "_deactivate" in parent && typeof parent._deactivate === "function") {
        parent._deactivate();
        return true;
      }
      return false;
    }
  }
  class Memo {
    constructor() {
      this.memory = [];
    }
    static init(...args) {
      const memo = new Memo();
      if (args.length)
        memo.update(...args);
      return memo;
    }
    /**
     * Returns true if args are updated.
     */
    update(...args) {
      let equal = this.memory.length === args.length;
      for (let i2 = 0; i2 < args.length; i2++) {
        equal = equal && this.memory[i2] === args[i2];
        this.memory[i2] = args[i2];
      }
      this.memory.length = args.length;
      return !equal;
    }
    clear() {
      this.memory.length = 0;
    }
  }
  function makeMat2d() {
    return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  }
  function identityMat2d(out) {
    out.a = 1;
    out.b = 0;
    out.c = 0;
    out.d = 1;
    out.e = 0;
    out.f = 0;
  }
  function translateMat2d(m2, x2, y2) {
    m2.e += x2;
    m2.f += y2;
  }
  function scaleMat2d(m2, x2, y2) {
    m2.a *= x2;
    m2.c *= x2;
    m2.e *= x2;
    m2.b *= y2;
    m2.d *= y2;
    m2.f *= y2;
  }
  function mulMat2ds(out, A, B) {
    const a2 = A.a * B.a + A.c * B.b;
    const b2 = A.b * B.a + A.d * B.b;
    const c2 = A.a * B.c + A.c * B.d;
    const d2 = A.b * B.c + A.d * B.d;
    const e3 = A.a * B.e + A.c * B.f + A.e;
    const f2 = A.b * B.e + A.d * B.f + A.f;
    out.a = a2;
    out.b = b2;
    out.c = c2;
    out.d = d2;
    out.e = e3;
    out.f = f2;
  }
  function mulMat2dVec2(out, m2, v3) {
    const x2 = v3.x;
    const y2 = v3.y;
    out.x = m2.a * x2 + m2.c * y2 + m2.e;
    out.y = m2.b * x2 + m2.d * y2 + m2.f;
  }
  function invMat2dVec2(out, m2, v3) {
    const id = 1 / (m2.a * m2.d - m2.c * m2.b);
    const x2 = v3.x;
    const y2 = v3.y;
    out.x = m2.d * id * x2 - m2.c * id * y2 + (m2.f * m2.c - m2.e * m2.d) * id;
    out.y = m2.a * id * y2 - m2.b * id * x2 + (m2.e * m2.b - m2.f * m2.a) * id;
  }
  function mat2dToProjection(out, m2, screenWidth, screenHeight) {
    const sx = 2 / screenWidth;
    const sy = -2 / screenHeight;
    const a2 = sx * m2.a;
    const b2 = sy * m2.b;
    const c2 = sx * m2.c;
    const d2 = sy * m2.d;
    const tx = sx * m2.e - 1;
    const ty = sy * m2.f + 1;
    out.fill(0);
    out[0] = a2;
    out[1] = b2;
    out[4] = c2;
    out[5] = d2;
    out[10] = 1;
    out[12] = tx;
    out[13] = ty;
    out[15] = 1;
  }
  function initTestbedContext() {
    const ctx = {};
    ctx.activity = y("mode:play");
    ctx.activeTool = y(void 0);
    ctx.paused = y(false);
    ctx.editable = y(false);
    ctx.pointerCaptured = false;
    ctx.style = { background: "#111" };
    ctx.camera = {
      x: 0,
      y: 10,
      width: 80,
      height: 60
    };
    ctx.containerElement = y(void 0);
    ctx.canvasElement = y(void 0);
    ctx.gl = y(void 0);
    ctx.worldMatrix = makeMat2d();
    ctx.mouseForce = y(1e3);
    ctx.pixelPerUnit = 1;
    ctx.pointerRadius = 20;
    ctx.showOutline = y(true);
    ctx.showToolbar = y(true);
    ctx.activeKeys = {};
    ctx.multiselect = y(new Multiselect([]));
    ctx.world = y();
    ctx.simulation = {
      speed: 1,
      hz: 60,
      velocityIterations: 8,
      positionIterations: 3
    };
    ctx.renderConfig = y({
      shapes: true,
      bounds: false,
      mass: false,
      bodyNames: false,
      joints: true,
      contact: false,
      contactNormals: false
    });
    ctx.textOverlay = y(void 0);
    return ctx;
  }
  class ToolSwitch extends Middleware {
    constructor(name, tool) {
      super();
      this.disposers = [];
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const activeTool = this.context.activeTool.value;
          const isMe = activeTool?.name === this.name;
          if (isMe && !this.tool.activated) {
            this.use(this.tool);
          } else if (!isMe && this.tool.activated) {
            this.unuse(this.tool);
          }
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
        this.unuse(this.tool);
      };
      this.name = name;
      this.tool = tool;
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
    }
  }
  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${info}`);
    }
    return shader;
  }
  function compileProgram(gl, vertexSrc, fragmentSrc) {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Program link error: ${info}`);
    }
    return program;
  }
  function createUnitQuadBuffer(gl) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1
    ]), gl.STATIC_DRAW);
    return buffer;
  }
  function createInstancedVAO(gl, quadBuffer, instanceBuffer, instanceAttribSizes) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const stride = instanceAttribSizes.reduce((sum, size) => sum + size, 0) * 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    let offset = 0;
    for (let i2 = 0; i2 < instanceAttribSizes.length; i2++) {
      const location = i2 + 1;
      const size = instanceAttribSizes[i2];
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset);
      gl.vertexAttribDivisor(location, 1);
      offset += size * 4;
    }
    gl.bindVertexArray(null);
    return vao;
  }
  function createShapeProgram(gl, vertexSrc, fragmentSrc) {
    const program = compileProgram(gl, vertexSrc, fragmentSrc);
    return {
      program,
      uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
      uPixelScale: gl.getUniformLocation(program, "pixelScale")
    };
  }
  function createPolygonProgram(gl, vertexSrc, fragmentSrc) {
    const program = compileProgram(gl, vertexSrc, fragmentSrc);
    return {
      program,
      uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
      uPixelScale: gl.getUniformLocation(program, "pixelScale"),
      uVertexTex: gl.getUniformLocation(program, "uVertexTex"),
      uVertexTexWidth: gl.getUniformLocation(program, "uVertexTexWidth")
    };
  }
  function createDataTexture(gl) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  }
  function createLineProgram(gl, vertexSrc, fragmentSrc) {
    const program = compileProgram(gl, vertexSrc, fragmentSrc);
    return {
      program,
      uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix")
    };
  }
  const colorCache = /* @__PURE__ */ new Map();
  let colorCanvasCtx = null;
  function parseColor(css) {
    const cached = colorCache.get(css);
    if (cached)
      return cached;
    if (!colorCanvasCtx) {
      colorCanvasCtx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      colorCanvasCtx.canvas.width = 1;
      colorCanvasCtx.canvas.height = 1;
    }
    colorCanvasCtx.clearRect(0, 0, 1, 1);
    colorCanvasCtx.fillStyle = css;
    colorCanvasCtx.fillRect(0, 0, 1, 1);
    const [r2, g, b2, a2] = colorCanvasCtx.getImageData(0, 0, 1, 1).data;
    const parsed = [r2 / 255, g / 255, b2 / 255, a2 / 255];
    colorCache.set(css, parsed);
    return parsed;
  }
  var solidCircle_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceRadius;\nlayout(location = 3) in vec4 v_instanceColor;\nlayout(location = 4) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvoid main() {\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n  float radius = v_instanceRadius;\n  \n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  \n  \n  \n  float scale = radius + thicknessWorld;\n\n  f_position = v_localPosition;\n  f_radius = radius / scale;\n  f_thickness = thicknessWorld / scale;\n\n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
  var solidCircle_default = "#version 300 es\nprecision highp float;\n\nin vec2 f_position;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nvoid main() {\n  float radius = f_radius;\n\n  \n  vec2 e = vec2(radius, 0.0);\n  vec2 w = f_position;\n  float we = dot(w, e);\n  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n  float da = length(b);\n\n  \n  float dw = length(w);\n  float dc = abs(dw - radius);\n\n  \n  float d = min(da, dc);\n\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
  var solidCapsule_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceRadius;\nlayout(location = 3) in float v_instanceLength;\nlayout(location = 4) in vec4 v_instanceColor;\nlayout(location = 5) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nout float f_length;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvoid main() {\n  f_position = v_localPosition;\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n\n  float radius = v_instanceRadius;\n  float capsuleLength = v_instanceLength;\n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  float scale = radius + 0.5 * capsuleLength + thicknessWorld;\n\n  \n  f_length = capsuleLength / scale;\n  f_radius = radius / scale;\n  f_thickness = thicknessWorld / scale;\n\n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
  var solidCapsule_default = "#version 300 es\nprecision highp float;\n\nin vec2 f_position;\nin float f_length;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nvoid main() {\n  float radius = f_radius;\n\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  vec2 v1 = vec2(-0.5 * f_length, 0.0);\n  vec2 v2 = vec2(0.5 * f_length, 0.0);\n\n  \n  vec2 e = v2 - v1;\n  vec2 w = f_position - v1;\n  float we = dot(w, e);\n  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n  float dw = length(b);\n\n  \n  float d = min(dw, abs(dw - radius));\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
  var solidPolygon_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nuniform sampler2D uVertexTex;\n\nuniform highp int uVertexTexWidth;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceVertexOffset;\nlayout(location = 3) in float v_instanceVertexCount;\nlayout(location = 4) in float v_instanceRadius;\nlayout(location = 5) in vec4 v_instanceColor;\nlayout(location = 6) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nflat out highp int f_vertexOffset;\nflat out highp int f_vertexCount;\nout vec2 f_center;\nout float f_invScale;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvec2 fetchVertex(int index) {\n  return texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;\n}\n\nvoid main() {\n  f_position = v_localPosition;\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n\n  int offset = int(v_instanceVertexOffset + 0.5);\n  int count = int(v_instanceVertexCount + 0.5);\n  f_vertexOffset = offset;\n  f_vertexCount = count;\n\n  \n  vec2 lower = fetchVertex(offset);\n  vec2 upper = lower;\n  for (int i = 1; i < count; ++i) {\n    vec2 v = fetchVertex(offset + i);\n    lower = min(lower, v);\n    upper = max(upper, v);\n  }\n\n  vec2 center = 0.5 * (lower + upper);\n  vec2 width = upper - lower;\n  float maxWidth = max(width.x, width.y);\n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  float scale = v_instanceRadius + 0.5 * maxWidth + thicknessWorld;\n  float invScale = 1.0 / scale;\n\n  \n  \n  \n  f_center = center;\n  f_invScale = invScale;\n  f_radius = invScale * v_instanceRadius;\n  f_thickness = thicknessWorld * invScale;\n\n  \n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y) + center;\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
  var solidPolygon_default = "#version 300 es\nprecision highp float;\n\nuniform sampler2D uVertexTex;\n\nuniform highp int uVertexTexWidth;\n\nin vec2 f_position;\nflat in highp int f_vertexOffset;\nflat in highp int f_vertexCount;\nin vec2 f_center;\nin float f_invScale;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nfloat cross2d(in vec2 v1, in vec2 v2) {\n  return v1.x * v2.y - v1.y * v2.x;\n}\n\nvec2 fetchVertex(in int index, in vec2 center, in float invScale) {\n  vec2 raw = texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;\n  return invScale * (raw - center);\n}\n\nfloat sdConvexPolygon(in vec2 p, in int offset, in int count, in vec2 center, in float invScale) {\n  vec2 v0 = fetchVertex(offset, center, invScale);\n  float d = dot(p - v0, p - v0);\n\n  \n  float side = -1.0;\n  vec2 vj = fetchVertex(offset + count - 1, center, invScale);\n  for (int i = 0; i < count; ++i) {\n    vec2 vi = fetchVertex(offset + i, center, invScale);\n    vec2 e = vi - vj;\n    vec2 w = p - vj;\n    float we = dot(w, e);\n    vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n    float bb = dot(b, b);\n\n    if (bb < d) {\n      d = bb;\n    }\n\n    \n    \n    float s = cross2d(w, e);\n    if (s >= 0.0) {\n      side = 1.0;\n    }\n\n    vj = vi;\n  }\n\n  return side * sqrt(d);\n}\n\nvoid main() {\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  float dw = sdConvexPolygon(f_position, f_vertexOffset, f_vertexCount, f_center, f_invScale);\n  float d = abs(dw - f_radius);\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(f_radius + f_thickness, f_radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
  var line_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\n\nlayout(location = 0) in vec2 v_position;\nlayout(location = 1) in vec4 v_color;\n\nout vec4 f_color;\n\nvoid main() {\n  f_color = v_color;\n  gl_Position = projectionMatrix * vec4(v_position, 0.0, 1.0);\n}";
  var line_default = "#version 300 es\nprecision highp float;\n\nin vec4 f_color;\nout vec4 fragColor;\n\nvoid main() {\n  fragColor = f_color;\n}";
  class GLLoader extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.backgroundMemo = Memo.init();
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const containerElement = this.context.containerElement?.value;
          if (!containerElement)
            return;
          const canvas = document.createElement("canvas");
          canvas.tabIndex = 1;
          containerElement.appendChild(canvas);
          this.canvas = canvas;
          this.context.canvasElement.value = canvas;
          const gl = canvas.getContext("webgl2", {
            alpha: true,
            antialias: true,
            premultipliedAlpha: false
          });
          if (!gl) {
            throw new Error("WebGL2 is not supported by this browser");
          }
          this.resources = {
            gl,
            quadBuffer: createUnitQuadBuffer(gl),
            circleProgram: createShapeProgram(gl, solidCircle_default$1, solidCircle_default),
            capsuleProgram: createShapeProgram(gl, solidCapsule_default$1, solidCapsule_default),
            polygonProgram: createPolygonProgram(gl, solidPolygon_default$1, solidPolygon_default),
            lineProgram: createLineProgram(gl, line_default$1, line_default),
            projectionMatrix: new Float32Array(16),
            pixelScale: 1
          };
          gl.clearColor(0, 0, 0, 0);
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          this.resizeObserver = new ResizeObserver(this.handleResize);
          this.resizeObserver.observe(containerElement);
          this.handleResize();
          this.handleUpdateState();
          this.context.gl.value = this.resources;
          this.emit("stage-ready");
          return () => {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
            this.context.canvasElement.value = null;
            this.context.gl.value = null;
            gl.deleteProgram(this.resources.circleProgram.program);
            gl.deleteProgram(this.resources.capsuleProgram.program);
            gl.deleteProgram(this.resources.polygonProgram.program);
            gl.deleteProgram(this.resources.lineProgram.program);
            gl.deleteBuffer(this.resources.quadBuffer);
            this.resources = null;
            canvas.remove();
            this.canvas = null;
          };
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.handleResize = () => {
        if (!this.canvas || !this.resources)
          return;
        const containerElement = this.context.containerElement.peek();
        const ratio = window.devicePixelRatio || 1;
        const pixelWidth = Math.max(1, Math.round(containerElement.clientWidth * ratio));
        const pixelHeight = Math.max(1, Math.round(containerElement.clientHeight * ratio));
        if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
          this.canvas.width = pixelWidth;
          this.canvas.height = pixelHeight;
        }
        this.resources.gl.viewport(0, 0, pixelWidth, pixelHeight);
      };
      this.handleUpdateState = () => {
        if (!this.resources)
          return;
        const background = this.context.style.background;
        if (this.backgroundMemo.update(background)) {
          if (background)
            this.canvas.style.backgroundColor = background;
        }
      };
      this.handleFrameBefore = () => {
        this.handleUpdateState();
        if (!this.resources)
          return;
        const m2 = this.context.worldMatrix;
        this.context.pixelPerUnit = Math.max(m2.a, m2.d) || 1;
        this.context.pointerRadius = 20 / this.context.pixelPerUnit;
        this.resources.pixelScale = this.context.pixelPerUnit;
        const gl = this.resources.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
      this.on("frame-before", this.handleFrameBefore);
    }
  }
  class CameraTransform extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.viewboxMemo = Memo.init();
      this.panZoom = makeMat2d();
      this.fitMatrix = makeMat2d();
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const canvas = this.context.canvasElement.value;
          const resources = this.context.gl.value;
          if (!canvas || !resources)
            return;
          this.canvas = canvas;
          this.resizeObserver = new ResizeObserver(this.rescale);
          this.resizeObserver.observe(canvas);
          this.rescale();
          return () => {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
            this.canvas = null;
          };
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.handleFrameBefore = () => {
        const camera = this.context.camera;
        if (this.viewboxMemo.update(camera.x, camera.y, camera.width, camera.height)) {
          this.rescale();
        }
      };
      this.rescale = () => {
        if (!this.canvas)
          return;
        const camera = this.context.camera;
        const screenWidth = this.canvas.clientWidth;
        const screenHeight = this.canvas.clientHeight;
        const fitScale = Math.min(screenWidth / camera.width, screenHeight / camera.height) || 1;
        identityMat2d(this.fitMatrix);
        scaleMat2d(this.fitMatrix, fitScale, -fitScale);
        translateMat2d(this.fitMatrix, screenWidth / 2 - camera.x * fitScale, screenHeight / 2 + camera.y * fitScale);
        this.applyTransform();
      };
      this.applyTransform = () => {
        const resources = this.context.gl.peek();
        if (!this.canvas || !resources)
          return;
        mulMat2ds(this.context.worldMatrix, this.panZoom, this.fitMatrix);
        mat2dToProjection(resources.projectionMatrix, this.context.worldMatrix, this.canvas.clientWidth, this.canvas.clientHeight);
      };
      this.handleZoom = ({ center: center2, zoom }) => {
        translateMat2d(this.panZoom, -center2.x, -center2.y);
        scaleMat2d(this.panZoom, zoom, zoom);
        translateMat2d(this.panZoom, center2.x, center2.y);
        this.applyTransform();
      };
      this.handlePan = ({ delta }) => {
        translateMat2d(this.panZoom, -delta.x, -delta.y);
        this.applyTransform();
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
      this.on("frame-before", this.handleFrameBefore);
      this.on("display-zoom", this.handleZoom);
      this.on("display-pan", this.handlePan);
    }
  }
  class AutoFocus extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.pausedMemo = Memo.init();
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const canvas = this.context.canvasElement.value;
          if (!canvas)
            return;
          this.canvas = canvas;
          canvas.addEventListener("mousedown", this.focus);
          canvas.addEventListener("touchstart", this.focus);
          return () => {
            canvas.removeEventListener("mousedown", this.focus);
            canvas.removeEventListener("touchstart", this.focus);
            this.canvas = null;
          };
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.handleFrameBefore = () => {
        const paused = this.context.paused.peek();
        if (this.pausedMemo.update(paused)) {
          if (!paused)
            this.focus();
        }
      };
      this.focus = () => {
        window.focus();
        document.activeElement?.blur?.();
        this.canvas?.focus();
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
      this.on("frame-before", this.handleFrameBefore);
    }
  }
  class ContainerLoader extends Middleware {
    constructor() {
      super();
      this.handleActivate = () => {
        if (document.readyState !== "loading") {
          this.handleDomReady();
        } else {
          document.addEventListener("DOMContentLoaded", this.handleDomReady);
        }
      };
      this.handleDomReady = () => {
        let containerElement = document.getElementById("space");
        if (!containerElement) {
          containerElement = document.createElement("div");
          containerElement.id = "space";
          Object.assign(containerElement.style, {
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            width: "100%",
            height: "100%"
          });
          document.body.insertBefore(containerElement, document.body.firstChild);
        }
        this.context.containerElement.value = containerElement;
      };
      this.on("activate", this.handleActivate);
    }
  }
  const DEFAULTS = {
    speed: 1,
    hz: 60,
    velocityIterations: 8,
    positionIterations: 3
  };
  class FrameLoop extends Middleware {
    constructor() {
      super();
      this.lastTime = 0;
      this.timeBuffer = 0;
      this.event = {
        dt: 0,
        now: 0
      };
      this.stepEvent = {
        timeStep: 0,
        velocityIterations: 0,
        positionIterations: 0
      };
      this.handleActivate = () => {
        this.lastTime = performance.now();
        this.requestFrame();
      };
      this.handleFrame = () => {
        if (!this.activated)
          return;
        const now2 = performance.now();
        const delta = now2 - this.lastTime;
        this.lastTime = now2;
        this.event.now = now2;
        this.event.dt = delta;
        this.emit("frame-before", this.event);
        if (this.context.world?.value && !this.context.paused?.value) {
          const config = this.context.simulation;
          const speed = config?.speed ?? DEFAULTS.speed;
          let hz = config?.hz ?? DEFAULTS.hz;
          if (Math.abs(hz) < 1) {
            hz = 1 / hz;
          }
          const timeStep = 1 / hz;
          this.stepEvent.timeStep = timeStep;
          this.stepEvent.velocityIterations = config?.velocityIterations ?? DEFAULTS.velocityIterations;
          this.stepEvent.positionIterations = config?.positionIterations ?? DEFAULTS.positionIterations;
          this.timeBuffer += delta * 1e-3 * speed;
          while (this.timeBuffer > timeStep) {
            this.timeBuffer -= timeStep;
            this.emit("step-before", this.stepEvent);
            this.emit("step-physics", this.stepEvent);
            this.emit("step-after", this.stepEvent);
          }
        }
        this.emit("frame-update", this.event);
        this.emit("frame-render", this.event);
        this.emit("frame-after", this.event);
        this.requestFrame();
      };
      this.requestFrame = () => {
        if (!this.activated)
          return;
        window.requestAnimationFrame(this.handleFrame);
      };
      this.on("activate", this.handleActivate);
    }
  }
  class PointerManager extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const canvas = this.context.canvasElement.value;
          if (!canvas)
            return;
          canvas.addEventListener("pointerdown", this.handlePointerDown);
          canvas.addEventListener("pointermove", this.handlePointerMove);
          canvas.addEventListener("pointerup", this.handlePointerUp);
          canvas.addEventListener("pointercancel", this.handlePointerCancel);
          return () => {
            canvas.removeEventListener("pointerdown", this.handlePointerDown);
            canvas.removeEventListener("pointermove", this.handlePointerMove);
            canvas.removeEventListener("pointerup", this.handlePointerUp);
            canvas.removeEventListener("pointercancel", this.handlePointerCancel);
          };
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.handleCapturePointer = () => {
        this.context.pointerCaptured = true;
      };
      this.handleReleasePointer = () => {
        this.context.pointerCaptured = false;
      };
      this.pointerStart = { x: 0, y: 0 };
      this.pointerLast = { x: 0, y: 0 };
      this.pointerDragged = false;
      this.pointerDown = false;
      this.toWorldPoint = (raw) => {
        const canvas = this.context.canvasElement.value;
        const rect = canvas.getBoundingClientRect();
        const point2 = { x: raw.clientX - rect.left, y: raw.clientY - rect.top };
        invMat2dVec2(point2, this.context.worldMatrix, point2);
        return point2;
      };
      this.handlePointerDown = (raw) => {
        const point2 = this.toWorldPoint(raw);
        this.emit("pointer-down", { point: point2, raw });
        this.pointerStart.x = point2.x;
        this.pointerStart.y = point2.y;
        this.pointerLast.x = point2.x;
        this.pointerLast.y = point2.y;
        this.pointerDown = true;
        this.pointerDragged = false;
      };
      this.handlePointerMove = (raw) => {
        const point2 = this.toWorldPoint(raw);
        this.emit("pointer-move", { point: point2, raw });
        if (!this.pointerDown)
          return;
        const move = {
          x: point2.x - this.pointerStart.x,
          y: point2.y - this.pointerStart.y
        };
        const delta = {
          x: point2.x - this.pointerLast.x,
          y: point2.y - this.pointerLast.y
        };
        if (this.pointerDragged) {
          this.pointerLast.x = point2.x;
          this.pointerLast.y = point2.y;
          this.emit("pointer-drag-move", {
            point: point2,
            raw,
            delta,
            move
          });
        } else if (move.x !== 0 || move.y !== 0) {
          this.pointerDragged = true;
          this.emit("pointer-drag-start", { point: point2, raw });
        }
      };
      this.handlePointerUp = (raw) => {
        const point2 = this.toWorldPoint(raw);
        this.emit("pointer-up", { point: point2, raw });
        if (!this.pointerDown)
          return;
        this.pointerDown = false;
        const move = {
          x: point2.x - this.pointerStart.x,
          y: point2.y - this.pointerStart.y
        };
        const delta = {
          x: point2.x - this.pointerLast.x,
          y: point2.y - this.pointerLast.y
        };
        this.pointerLast.x = point2.x;
        this.pointerLast.y = point2.y;
        if (this.pointerDragged) {
          this.emit("pointer-drag-end", {
            point: point2,
            raw,
            delta,
            move
          });
        } else {
          this.emit("pointer-click", { point: point2, raw });
        }
        this.emit("release-pointer");
      };
      this.handlePointerCancel = (raw) => {
        this.emit("pointer-cancel", { raw });
        if (!this.pointerDown)
          return;
        this.pointerDown = false;
        if (this.pointerDragged) {
          this.emit("pointer-drag-cancel");
        }
        this.emit("release-pointer");
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
      this.on("capture-pointer", this.handleCapturePointer);
      this.on("release-pointer", this.handleReleasePointer);
    }
  }
  class KeyboardManager extends Middleware {
    constructor() {
      super();
      this.handleActivate = () => {
        window.addEventListener("keydown", this.handleKeydown);
        window.addEventListener("keyup", this.handleKeyup);
        window.addEventListener("keypress", this.handleKeypress);
      };
      this.handleDeactivate = () => {
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("keyup", this.handleKeyup);
        window.removeEventListener("keypress", this.handleKeypress);
      };
      this.downKeys = {};
      this.handleKeydown = (ev) => {
        this.downKeys[ev.keyCode] = true;
        this.updateActiveKeys(ev.keyCode, true);
        this.emit("keydown", ev);
      };
      this.handleKeyup = (ev) => {
        this.downKeys[ev.keyCode] = false;
        this.updateActiveKeys(ev.keyCode, false);
        this.emit("keyup", ev);
      };
      this.handleKeypress = (ev) => {
        this.emit("keypress", ev);
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
    }
    // `left`/`right`/`up`/`down` (arrows or WASD), `fire` (space or enter), and characters
    updateActiveKeys(keyCode, down) {
      const activeKeys = this.context.activeKeys;
      const downKeys = this.downKeys;
      const char = String.fromCharCode(keyCode);
      if (/[A-Z0-9]/.test(char)) {
        activeKeys[char] = down;
      }
      activeKeys.right = downKeys[39] || activeKeys["D"];
      activeKeys.left = downKeys[37] || activeKeys["A"];
      activeKeys.up = downKeys[38] || activeKeys["W"];
      activeKeys.down = downKeys[40] || activeKeys["S"];
      activeKeys.fire = downKeys[32] || downKeys[13];
    }
  }
  const IDLE_TIMEOUT = 15e3;
  class AutoPause extends Middleware {
    constructor() {
      super();
      this.handleActivate = () => {
        window.addEventListener("pointerdown", this.handleInteraction);
        window.addEventListener("pointermove", this.handleInteraction);
        window.addEventListener("keydown", this.handleInteraction);
        window.addEventListener("wheel", this.handleInteraction);
        window.addEventListener("touchstart", this.handleInteraction);
        this.resetIdleTimeout();
      };
      this.handleDeactivate = () => {
        window.removeEventListener("pointerdown", this.handleInteraction);
        window.removeEventListener("pointermove", this.handleInteraction);
        window.removeEventListener("keydown", this.handleInteraction);
        window.removeEventListener("wheel", this.handleInteraction);
        window.removeEventListener("touchstart", this.handleInteraction);
        clearTimeout(this.idleTimeout);
      };
      this.handleInteraction = () => {
        this.resetIdleTimeout();
      };
      this.handleIdleTimeout = () => {
        this.context.paused.value = true;
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
    }
    resetIdleTimeout() {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = setTimeout(this.handleIdleTimeout, IDLE_TIMEOUT);
    }
  }
  const noxf = { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } };
  const transformVec2 = (out, xf2, v3) => {
    const x2 = xf2.q.c * v3.x - xf2.q.s * v3.y + xf2.p.x;
    const y2 = xf2.q.s * v3.x + xf2.q.c * v3.y + xf2.p.y;
    out.x = x2;
    out.y = y2;
  };
  const temp1 = { x: 0, y: 0 };
  const temp2 = { x: 0, y: 0 };
  const POLYGON_VERTEX_TEX_WIDTH = 1024;
  const dimmedCache = /* @__PURE__ */ new Map();
  function fillColorOf(color, fill) {
    if (fill)
      return parseColor(fill);
    let dimmed = dimmedCache.get(color);
    if (!dimmed) {
      const [r2, g, b2, a2] = parseColor(color);
      dimmed = [0.6 * r2, 0.6 * g, 0.6 * b2, 0.6 * a2];
      dimmedCache.set(color, dimmed);
    }
    return dimmed;
  }
  class GLDraw extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.resources = null;
      this.circleVAO = null;
      this.circleBuffer = null;
      this.circleCapacity = 0;
      this.circleData = [];
      this.capsuleVAO = null;
      this.capsuleBuffer = null;
      this.capsuleCapacity = 0;
      this.capsuleData = [];
      this.polygonVAO = null;
      this.polygonBuffer = null;
      this.polygonCapacity = 0;
      this.polygonData = [];
      this.polygonVertexTexture = null;
      this.polygonVertexTexHeight = 0;
      this.polygonVertexData = [];
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const resources = this.context.gl.value;
          if (!resources)
            return;
          const gl = resources.gl;
          this.resources = resources;
          this.circleBuffer = gl.createBuffer();
          this.circleVAO = createInstancedVAO(gl, resources.quadBuffer, this.circleBuffer, [4, 1, 4, 4]);
          this.capsuleBuffer = gl.createBuffer();
          this.capsuleVAO = createInstancedVAO(gl, resources.quadBuffer, this.capsuleBuffer, [4, 1, 1, 4, 4]);
          this.polygonBuffer = gl.createBuffer();
          this.polygonVAO = createInstancedVAO(gl, resources.quadBuffer, this.polygonBuffer, [4, 1, 1, 1, 4, 4]);
          this.polygonVertexTexture = createDataTexture(gl);
          return () => {
            gl.deleteVertexArray(this.circleVAO);
            gl.deleteBuffer(this.circleBuffer);
            gl.deleteVertexArray(this.capsuleVAO);
            gl.deleteBuffer(this.capsuleBuffer);
            gl.deleteVertexArray(this.polygonVAO);
            gl.deleteBuffer(this.polygonBuffer);
            gl.deleteTexture(this.polygonVertexTexture);
            this.circleVAO = this.capsuleVAO = this.polygonVAO = null;
            this.circleBuffer = this.capsuleBuffer = this.polygonBuffer = null;
            this.circleCapacity = this.capsuleCapacity = this.polygonCapacity = 0;
            this.polygonVertexTexture = null;
            this.polygonVertexTexHeight = 0;
            this.resources = null;
          };
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.handleFrameBefore = () => {
        this.circleData.length = 0;
        this.capsuleData.length = 0;
        this.polygonData.length = 0;
        this.polygonVertexData.length = 0;
      };
      this.handleFrameRender = () => {
        if (!this.resources)
          return;
        this.uploadAndDraw(this.resources.circleProgram, this.circleVAO, this.circleBuffer, this.circleData, 13, () => this.circleCapacity, (n2) => this.circleCapacity = n2);
        this.uploadAndDraw(this.resources.capsuleProgram, this.capsuleVAO, this.capsuleBuffer, this.capsuleData, 14, () => this.capsuleCapacity, (n2) => this.capsuleCapacity = n2);
        this.uploadPolygonVertexTexture();
        this.uploadAndDraw(this.resources.polygonProgram, this.polygonVAO, this.polygonBuffer, this.polygonData, 15, () => this.polygonCapacity, (n2) => this.polygonCapacity = n2, () => {
          const gl = this.resources.gl;
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
          gl.uniform1i(this.resources.polygonProgram.uVertexTex, 0);
          gl.uniform1i(this.resources.polygonProgram.uVertexTexWidth, POLYGON_VERTEX_TEX_WIDTH);
        });
      };
      this.drawCircle = (p2, r2, color, xf2 = noxf, fill) => {
        transformVec2(temp1, xf2, p2);
        const [cr, cg, cb, ca] = parseColor(color);
        const [fr, fg, fb, fa] = fillColorOf(color, fill);
        this.circleData.push(temp1.x, temp1.y, xf2.q.c, xf2.q.s, r2, cr, cg, cb, ca, fr, fg, fb, fa);
      };
      this.drawPoint = this.drawCircle;
      this.drawScreenPoint = (p2, pixelSize, color, xf2 = noxf) => {
        const pixelScale = this.resources?.pixelScale || 1;
        this.drawCircle(p2, pixelSize / pixelScale, color, xf2);
      };
      this.drawCapsule = (a2, b2, r2, color, xf2 = noxf, fill) => {
        this.pushCapsule(xf2, a2, b2, r2, color, fill);
      };
      this.drawEdge = (a2, b2, color, xf2 = noxf) => {
        this.pushCapsule(xf2, a2, b2, 0, color);
      };
      this.drawSegment = this.drawEdge;
      this.drawPolygon = (points, color, xf2 = noxf, fill) => {
        this.pushPolygon(xf2, points, 0, color, fill);
      };
      this.drawRoundedPolygon = (points, count, r2, color, xf2 = noxf, fill) => {
        this.pushPolygon(xf2, points.slice(0, count), r2, color, fill);
      };
      this.drawChain = (points, color, xf2 = noxf) => {
        for (let i2 = 0; i2 < points.length - 1; i2++) {
          this.pushCapsule(xf2, points[i2], points[i2 + 1], 0, color);
        }
      };
      this.drawAABB = (aabb, color, xf2 = noxf) => {
        const { lowerBound: lo, upperBound: hi } = aabb;
        this.pushPolygon(xf2, [lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], 0, color);
      };
      this.drawHollowPolygon = (points, color, xf2 = noxf) => {
        let prev = points[points.length - 1];
        for (const p2 of points) {
          this.pushCapsule(xf2, prev, p2, 0, color);
          prev = p2;
        }
      };
      this.drawHollowAABB = (aabb, color, xf2 = noxf) => {
        const { lowerBound: lo, upperBound: hi } = aabb;
        this.drawHollowPolygon([lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], color, xf2);
      };
      this.drawHollowCircle = (center2, radius, color, xf2 = noxf, segments = 24) => {
        const points = [];
        for (let i2 = 0; i2 < segments; i2++) {
          const a2 = i2 / segments * Math.PI * 2;
          points.push({ x: center2.x + radius * Math.cos(a2), y: center2.y + radius * Math.sin(a2) });
        }
        this.drawHollowPolygon(points, color, xf2);
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
      this.on("frame-before", this.handleFrameBefore);
      this.on("frame-render", this.handleFrameRender);
    }
    // Uploads this frame's flat vertex list into polygonVertexTexture, growing its height (in
    // POLYGON_VERTEX_TEX_WIDTH-wide rows) only when the existing allocation is too small - mirrors
    // uploadAndDraw's grow-only buffer capacity pattern below.
    uploadPolygonVertexTexture() {
      const vertexCount = this.polygonVertexData.length / 2;
      if (vertexCount === 0)
        return;
      const gl = this.resources.gl;
      const width = POLYGON_VERTEX_TEX_WIDTH;
      const height = Math.ceil(vertexCount / width);
      const rowData = new Float32Array(width * height * 2);
      rowData.set(this.polygonVertexData);
      gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
      if (height > this.polygonVertexTexHeight) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, width, height, 0, gl.RG, gl.FLOAT, rowData);
        this.polygonVertexTexHeight = height;
      } else {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, gl.RG, gl.FLOAT, rowData);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    pushCapsule(xf2, a2, b2, radius, color, fill) {
      const mx = (a2.x + b2.x) * 0.5;
      const my = (a2.y + b2.y) * 0.5;
      const dx = b2.x - a2.x;
      const dy = b2.y - a2.y;
      const length = Math.hypot(dx, dy);
      const lc = length > 0 ? dx / length : 1;
      const ls = length > 0 ? dy / length : 0;
      const bc = xf2.q.c;
      const bs = xf2.q.s;
      const worldC = bc * lc - bs * ls;
      const worldS = bs * lc + bc * ls;
      temp1.x = mx;
      temp1.y = my;
      transformVec2(temp2, xf2, temp1);
      const [cr, cg, cb, ca] = parseColor(color);
      const [fr, fg, fb, fa] = fillColorOf(color, fill);
      this.capsuleData.push(temp2.x, temp2.y, worldC, worldS, radius, length, cr, cg, cb, ca, fr, fg, fb, fa);
    }
    pushPolygon(xf2, points, radius, color, fill) {
      const offset = this.polygonVertexData.length / 2;
      for (let i2 = 0; i2 < points.length; i2++) {
        this.polygonVertexData.push(points[i2].x, points[i2].y);
      }
      const [cr, cg, cb, ca] = parseColor(color);
      const [fr, fg, fb, fa] = fillColorOf(color, fill);
      this.polygonData.push(xf2.p.x, xf2.p.y, xf2.q.c, xf2.q.s, offset, points.length, radius, cr, cg, cb, ca, fr, fg, fb, fa);
    }
    uploadAndDraw(shapeProgram, vao, buffer, data, floatsPerInstance, getCapacity, setCapacity, bindExtra) {
      const instanceCount = data.length / floatsPerInstance;
      if (instanceCount === 0)
        return;
      const gl = this.resources.gl;
      const array = new Float32Array(data);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      if (array.length > getCapacity()) {
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);
        setCapacity(array.length);
      } else {
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, array);
      }
      gl.useProgram(shapeProgram.program);
      gl.uniformMatrix4fv(shapeProgram.uProjectionMatrix, false, this.resources.projectionMatrix);
      gl.uniform1f(shapeProgram.uPixelScale, this.resources.pixelScale);
      bindExtra?.();
      gl.bindVertexArray(vao);
      gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount);
      gl.bindVertexArray(null);
      gl.useProgram(null);
    }
  }
  class DrawWorld extends Middleware {
    constructor() {
      super();
      this.draw = new GLDraw();
      this.handleFrameRender = () => {
        const world = this.context.world.value;
        if (!world)
          return;
        if (!this.context.renderConfig.value.shapes)
          return;
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          this.drawBody(body);
        }
      };
      this.use(this.draw);
      this.on("frame-update", this.handleFrameRender);
    }
    drawBody(body) {
      const xf2 = body.getTransform();
      for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
        const style = getStyle(fixture.getShape()) ?? getStyle(fixture) ?? getStyle(body);
        const color = style?.stroke ?? shapeColor(body, fixture);
        const fill = style?.fill ?? DEFAULT_FILL;
        const type = fixture.getType();
        if (type === "circle") {
          const shape = fixture.getShape();
          this.draw.drawCircle(shape.m_p, shape.m_radius, color, xf2, fill);
        } else if (type === "polygon") {
          const shape = fixture.getShape();
          this.draw.drawPolygon(shape.m_vertices.slice(0, shape.m_count), color, xf2, fill);
        } else if (type === "edge") {
          const shape = fixture.getShape();
          this.draw.drawEdge(shape.m_vertex1, shape.m_vertex2, color, xf2);
        } else if (type === "chain") {
          const shape = fixture.getShape();
          const vertices = shape.m_vertices;
          const count = shape.m_count;
          for (let i2 = 1; i2 < count; i2++) {
            this.draw.drawEdge(vertices[i2 - 1], vertices[i2], color, xf2);
          }
          if (shape.isLoop() && count > 1) {
            this.draw.drawEdge(vertices[count - 1], vertices[0], color, xf2);
          }
        }
      }
    }
  }
  const DEFAULT_FILL = "rgba(255,255,255,0.1)";
  const hasStyle = (value) => typeof value === "object" && value !== null && ("stroke" in value || "fill" in value);
  function getStyle(obj) {
    if (hasStyle(obj["render"]))
      return obj["render"];
    if (hasStyle(obj["style"]))
      return obj["style"];
  }
  function shapeColor(body, fixture) {
    if (fixture.isSensor()) {
      return "wheat";
    }
    if (body.isDynamic()) {
      return "rgba(255,255,255,0.9)";
    }
    if (body.isKinematic()) {
      return "rgba(255,255,255,0.8)";
    }
    return "rgba(255,255,255,0.7)";
  }
  class DrawBounds extends Middleware {
    constructor() {
      super();
      this.draw = new GLDraw();
      this.handleFrameRender = () => {
        const world = this.context.world.value;
        if (!world)
          return;
        if (!this.context.renderConfig.value.bounds)
          return;
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            const children = fixture.getShape().getChildCount();
            for (let child = 0; child < children; child++) {
              this.draw.drawHollowAABB(fixture.getAABB(child), "gold");
            }
          }
        }
      };
      this.use(this.draw);
      this.on("frame-update", this.handleFrameRender);
    }
  }
  class TextOverlay extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.canvas = null;
      this.resizeObserver = null;
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          const containerElement = this.context.containerElement?.value;
          if (!containerElement)
            return;
          const canvas = document.createElement("canvas");
          canvas.style.position = "absolute";
          canvas.style.top = "0";
          canvas.style.left = "0";
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.background = "transparent";
          canvas.style.pointerEvents = "none";
          containerElement.appendChild(canvas);
          this.canvas = canvas;
          this.context.textOverlay.value = canvas.getContext("2d");
          this.resizeObserver = new ResizeObserver(this.handleResize);
          this.resizeObserver.observe(containerElement);
          this.handleResize();
          return () => {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
            this.context.textOverlay.value = void 0;
            canvas.remove();
            this.canvas = null;
          };
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.handleResize = () => {
        if (!this.canvas)
          return;
        const containerElement = this.context.containerElement.peek();
        const ratio = window.devicePixelRatio || 1;
        this.canvas.width = Math.max(1, Math.round(containerElement.clientWidth * ratio));
        this.canvas.height = Math.max(1, Math.round(containerElement.clientHeight * ratio));
      };
      this.handleFrameBefore = () => {
        const ctx = this.context.textOverlay.peek();
        if (!ctx)
          return;
        const ratio = window.devicePixelRatio || 1;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
      this.on("frame-before", this.handleFrameBefore);
    }
  }
  const screenPoint = { x: 0, y: 0 };
  function drawWorldString(context, p2, text, color, align = "left") {
    const ctx = context.textOverlay.value;
    if (!ctx)
      return;
    mulMat2dVec2(screenPoint, context.worldMatrix, p2);
    ctx.font = "12px monospace";
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(text, screenPoint.x, screenPoint.y);
  }
  class DrawBodyInfo extends Middleware {
    constructor() {
      super();
      this.draw = new GLDraw();
      this.handleFrameRender = () => {
        const world = this.context.world.value;
        if (!world)
          return;
        const renderConfig = this.context.renderConfig.value;
        if (!renderConfig.bodyNames && !renderConfig.mass)
          return;
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          if (renderConfig.bodyNames) {
            const label = getLabel(body);
            if (label)
              this.drawBodyName(body, label);
          }
          if (renderConfig.mass && body.isDynamic()) {
            this.drawMass(body);
          }
        }
      };
      this.use(this.draw);
      this.on("frame-update", this.handleFrameRender);
    }
    drawBodyName(body, label) {
      const { c: c2, s: s2 } = body.getTransform().q;
      const center2 = body.getWorldCenter();
      const p2 = { x: center2.x + c2 * 0.1 - s2 * 0.1, y: center2.y + s2 * 0.1 + c2 * 0.1 };
      drawWorldString(this.context, p2, label, "blueviolet");
    }
    drawMass(body) {
      const { c: c2, s: s2 } = body.getTransform().q;
      const center2 = body.getWorldCenter();
      this.draw.drawEdge(center2, { x: center2.x + c2, y: center2.y + s2 }, "red");
      this.draw.drawEdge(center2, { x: center2.x - s2, y: center2.y + c2 }, "green");
      const p2 = { x: center2.x + c2 * 0.1 - s2 * 0.1, y: center2.y + s2 * 0.1 + c2 * 0.1 };
      drawWorldString(this.context, p2, `  ${body.getMass().toFixed(2)}`, "white");
    }
  }
  const DEFAULT_COLOR = "rgba(255,255,255,0.9)";
  class DrawJoints extends Middleware {
    constructor() {
      super();
      this.draw = new GLDraw();
      this.handleFrameRender = () => {
        const world = this.context.world.value;
        if (!world)
          return;
        if (!this.context.renderConfig.value.joints)
          return;
        for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
          this.drawJoint(joint);
        }
      };
      this.use(this.draw);
      this.on("frame-update", this.handleFrameRender);
    }
    drawJoint(joint) {
      const style = joint["style"];
      const color = style?.stroke ?? DEFAULT_COLOR;
      const pA2 = joint.getAnchorA();
      const pB2 = joint.getAnchorB();
      switch (joint.getType()) {
        case "pulley-joint": {
          const pj = joint;
          const gA = pj.getGroundAnchorA();
          const gB = pj.getGroundAnchorB();
          this.draw.drawEdge(pA2, gA, color);
          this.draw.drawEdge(gA, gB, color);
          this.draw.drawEdge(gB, pB2, color);
          break;
        }
        case "prismatic-joint":
        case "wheel-joint": {
          const axis = joint.getLocalAxisA();
          const xfA2 = joint.getBodyA().getTransform();
          const end = Transform.mulVec2(xfA2, {
            x: joint["m_localAnchorA"].x + axis.x,
            y: joint["m_localAnchorA"].y + axis.y
          });
          this.draw.drawEdge(pA2, end, "gray");
          this.draw.drawEdge(pA2, pB2, color);
          break;
        }
        case "mouse-joint": {
          const target = joint.getTarget();
          this.draw.drawEdge(target, pB2, color);
          this.draw.drawScreenPoint(target, 4, color);
          break;
        }
        case "revolute-joint": {
          this.draw.drawEdge(pA2, pB2, color);
          this.draw.drawScreenPoint(pB2, 6, color);
          break;
        }
        default:
          this.draw.drawEdge(pA2, pB2, color);
          break;
      }
    }
  }
  const CONTACT_NORMAL_LENGTH = 0.3;
  class DrawContacts extends Middleware {
    constructor() {
      super();
      this.draw = new GLDraw();
      this.manifold = new WorldManifold();
      this.handleFrameRender = () => {
        const world = this.context.world.value;
        if (!world)
          return;
        const renderConfig = this.context.renderConfig.value;
        if (!renderConfig.contact)
          return;
        for (let contact = world.getContactList(); contact; contact = contact.getNext()) {
          if (!contact.isTouching())
            continue;
          const manifold = contact.getWorldManifold(this.manifold);
          if (!manifold)
            continue;
          const normal3 = manifold.normal;
          for (let i2 = 0; i2 < manifold.pointCount; i2++) {
            const point2 = manifold.points[i2];
            this.draw.drawScreenPoint(point2, 5, "blue");
            if (renderConfig.contactNormals) {
              const p2 = {
                x: point2.x + normal3.x * CONTACT_NORMAL_LENGTH,
                y: point2.y + normal3.y * CONTACT_NORMAL_LENGTH
              };
              this.draw.drawEdge(point2, p2, "dimgray");
            }
          }
        }
      };
      this.use(this.draw);
      this.on("frame-update", this.handleFrameRender);
    }
  }
  class WorldStep extends Middleware {
    constructor() {
      super();
      this.handleStep = (ev) => {
        const world = this.context.world.value;
        if (!world)
          return;
        try {
          world.step(ev.timeStep, ev.velocityIterations, ev.positionIterations);
        } catch (error) {
          console.error(error);
          this.context.paused.value = true;
        }
      };
      this.on("step-physics", this.handleStep);
    }
  }
  class WorldKeys extends Middleware {
    constructor() {
      super();
      this.handleActivate = () => {
        this.dispose = j(() => {
          const world = this.context.world.value;
          if (!world)
            return;
          for (let body = world.getBodyList(); body; body = body.getNext()) {
            setKey(body);
            for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
              setKey(fixture);
            }
          }
          for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
            setKey(joint);
          }
          world.on("add-body", this.keyOne);
          world.on("add-fixture", this.keyOne);
          world.on("add-joint", this.keyOne);
          return () => {
            world.off("add-body", this.keyOne);
            world.off("add-fixture", this.keyOne);
            world.off("add-joint", this.keyOne);
          };
        });
      };
      this.handleDeactivate = () => {
        this.dispose?.();
        this.dispose = void 0;
      };
      this.keyOne = (obj) => {
        setKey(obj);
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
    }
  }
  class PullTool extends Middleware {
    constructor() {
      super();
      this.body = null;
      this.ground = null;
      this.joint = null;
      this.handleDeactivate = () => {
        this.destroyJoint();
        this.body = null;
      };
      this.handlePointerDown = (ev) => {
        const world = this.context.world.value;
        if (!world)
          return;
        let mouseForce = this.context.mouseForce.value;
        if (mouseForce === 0)
          return;
        if (typeof mouseForce !== "number") {
          mouseForce = 1e3;
        }
        const match = this.context.worldQuery.testPoint(ev.point, (m2) => m2.worldBody.isDynamic());
        if (!match)
          return;
        const hit = match.worldBody;
        if (hit !== this.body) {
          this.destroyJoint();
        }
        this.body = hit;
        this.ground = world.createBody();
        this.joint = new MouseJoint({ maxForce: mouseForce }, this.ground, this.body, ev.point);
        world.createJoint(this.joint);
        this.emit("capture-pointer");
      };
      this.handlePointerMove = (ev) => {
        if (!this.joint)
          return;
        this.joint.setTarget(ev.point);
      };
      this.handlePointerUp = () => {
        if (!this.joint)
          return;
        this.body = null;
        this.destroyJoint();
      };
      this.handlePointerCancel = () => {
        if (!this.joint)
          return;
        this.body = null;
        this.destroyJoint();
      };
      this.destroyJoint = () => {
        const world = this.context.world.value;
        if (world && this.joint)
          world.destroyJoint(this.joint);
        if (world && this.ground)
          world.destroyBody(this.ground);
        this.joint = null;
        this.ground = null;
      };
      this.on("deactivate", this.handleDeactivate);
      this.on("pointer-down", this.handlePointerDown);
      this.on("pointer-move", this.handlePointerMove);
      this.on("pointer-up", this.handlePointerUp);
      this.on("pointer-cancel", this.handlePointerCancel);
    }
  }
  toolbarTool.register({
    name: "pull",
    activate: (context) => {
      context.activity.value = "mode:play";
      context.paused.value = false;
      context.editable.value = false;
      context.activeTool.value = { name: "interact-pull" };
    }
  });
  class ImpulseTool extends Middleware {
    constructor() {
      super();
      this.body = null;
      this.pointer = { x: 0, y: 0 };
      this.draw = new GLDraw();
      this.handleDeactivate = () => {
        this.body = null;
      };
      this.handlePointerDown = (ev) => {
        if (this.body)
          return;
        const mouseForce = this.context.mouseForce.value;
        if (mouseForce === 0)
          return;
        const match = this.context.worldQuery.testPoint(ev.point, (m2) => m2.worldBody.isDynamic());
        if (!match)
          return;
        this.body = match.worldBody;
        this.pointer.x = ev.point.x;
        this.pointer.y = ev.point.y;
        this.emit("capture-pointer");
      };
      this.handlePointerMove = (ev) => {
        if (!this.body)
          return;
        this.pointer.x = ev.point.x;
        this.pointer.y = ev.point.y;
      };
      this.handlePointerUp = (ev) => {
        if (!this.body)
          return;
        let mouseForce = this.context.mouseForce.value;
        if (mouseForce === 0)
          return;
        if (typeof mouseForce !== "number") {
          mouseForce = -1e3;
        }
        if (mouseForce > 0) {
          mouseForce = -mouseForce;
        }
        const pos = this.body.getPosition();
        const force = {
          x: (ev.point.x - pos.x) * mouseForce,
          y: (ev.point.y - pos.y) * mouseForce
        };
        this.body.applyForceToCenter(force, true);
        this.body = null;
      };
      this.handlePointerCancel = () => {
        this.body = null;
      };
      this.handleFrameUpdate = () => {
        if (!this.body)
          return;
        const pos = this.body.getPosition();
        this.draw.drawSegment(pos, this.pointer, "rgba(255,255,255,0.5)");
      };
      this.use(this.draw);
      this.on("deactivate", this.handleDeactivate);
      this.on("pointer-down", this.handlePointerDown);
      this.on("pointer-move", this.handlePointerMove);
      this.on("pointer-up", this.handlePointerUp);
      this.on("pointer-cancel", this.handlePointerCancel);
      this.on("frame-update", this.handleFrameUpdate);
    }
  }
  toolbarTool.register({
    name: "impulse",
    activate: (context) => {
      context.activity.value = "mode:play";
      context.paused.value = false;
      context.editable.value = false;
      context.activeTool.value = { name: "interact-impulse" };
    }
  });
  class InspectTool extends Middleware {
    constructor() {
      super();
      this.handleClick = (ev) => {
        const match = this.context.worldQuery.testPoint(ev.point);
        const was = this.context.multiselect.value.selected[0];
        if (!match?.fixture) {
          setSelection(this.context, was?.up ?? null);
        } else if (was?.key === match.body || was?.key !== match.fixture && was?.up?.key === match.body) {
          setSelection(this.context, selectFixture(match.fixture, match.body));
        } else {
          setSelection(this.context, selectBody(match.body));
        }
      };
      this.on("pointer-click", this.handleClick);
    }
  }
  class SelectionManager extends Middleware {
    constructor() {
      super();
      this.selectBody = (select) => {
        if (!select?.body)
          return;
        setSelection(this.context, selectBody(select.body));
      };
      this.deselectBody = (select) => {
        if (!select?.body)
          return;
        removeSelection(this.context, selectBody(select.body));
      };
      this.selectFixture = (select) => {
        if (!select?.fixture)
          return;
        setSelection(this.context, selectFixture(select.fixture, select.body));
      };
      this.deselectFixture = (select) => {
        if (!select?.fixture)
          return;
        removeSelection(this.context, selectFixture(select.fixture, select.body));
      };
      this.selectJoint = (select) => {
        if (!select?.joint)
          return;
        setSelection(this.context, selectJoint(select.joint));
      };
      this.deselectJoint = (select) => {
        if (!select?.joint)
          return;
        removeSelection(this.context, selectJoint(select.joint));
      };
      this.deselectAll = () => {
        emptySelection(this.context);
      };
      this.on("select-body", this.selectBody);
      this.on("deselect-body", this.deselectBody);
      this.on("select-fixture", this.selectFixture);
      this.on("deselect-fixture", this.deselectFixture);
      this.on("select-joint", this.selectJoint);
      this.on("deselect-joint", this.deselectJoint);
      this.on("deselect-all", this.deselectAll);
    }
  }
  const DEFAULT_POINTER_RADIUS = 0.1;
  class WorldQuery extends Middleware {
    constructor() {
      super();
      this.handleActivate = () => {
        this.context.worldQuery = this;
      };
      this.testPoint = (point2, filter) => {
        const world = this.context.world.value;
        if (!world)
          return void 0;
        const radius = this.context.pointerRadius ?? DEFAULT_POINTER_RADIUS;
        let bestMatch;
        let bestDistance = radius;
        const aabb = new AABB(point2, point2).extend(radius);
        const distanceInput2 = new DistanceInput();
        distanceInput2.useRadii = true;
        distanceInput2.proxyB.set(new CircleShape(1e-5), 0);
        distanceInput2.transformB.p.x = point2.x;
        distanceInput2.transformB.p.y = point2.y;
        distanceInput2.transformB.q.s = 0;
        distanceInput2.transformB.q.c = 1;
        world.queryAABB(aabb, function(fixture) {
          const body = fixture.getBody();
          const match = {
            worldBody: body,
            worldFixture: fixture,
            body: getKey(body),
            fixture: getKey(fixture)
          };
          if (filter && !filter(match)) {
            return true;
          }
          if (fixture.testPoint(point2)) {
            bestMatch = match;
            bestDistance = 0;
            return false;
          }
          for (let childIndex = fixture.getShape().getChildCount() - 1; childIndex >= 0; childIndex--) {
            distanceInput2.proxyA.set(fixture.getShape(), childIndex);
            const xf2 = fixture.getBody().getTransform();
            distanceInput2.transformA.p.x = xf2.p.x;
            distanceInput2.transformA.p.y = xf2.p.y;
            distanceInput2.transformA.q.s = xf2.q.s;
            distanceInput2.transformA.q.c = xf2.q.c;
            const cache2 = new SimplexCache();
            const output2 = new DistanceOutput();
            Distance(output2, cache2, distanceInput2);
            const distance = Vec2.distance(output2.pointA, output2.pointB);
            if (distance < bestDistance) {
              bestMatch = match;
              bestDistance = distance;
            }
          }
          return true;
        });
        return bestMatch;
      };
      this.testBox = (start, end, filter) => {
        const world = this.context.world.value;
        if (!world)
          return [];
        const aabb = {
          lowerBound: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
          upperBound: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) }
        };
        const results = [];
        world.queryAABB(aabb, function(fixture) {
          const body = fixture.getBody();
          const match = {
            worldBody: body,
            worldFixture: fixture,
            body: getKey(body),
            fixture: getKey(fixture)
          };
          if (filter && !filter(match))
            return true;
          results.push(match);
          return true;
        });
        return results;
      };
      this.on("activate", this.handleActivate);
    }
  }
  class DefaultTool extends Middleware {
    constructor() {
      super();
      this.disposers = [];
      this.handleActivate = () => {
        this.disposers.push(j(() => {
          this.resetTool();
        }));
        this.disposers.push(this.context.activeTool.subscribe((activeTool) => {
          if (activeTool?.name === "default-tool") {
            this.resetTool();
          }
        }));
      };
      this.handleDeactivate = () => {
        this.disposers.forEach((d2) => d2());
        this.disposers = [];
      };
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
    }
    resetTool() {
      const paused = this.context.paused.value;
      const mouseForce = this.context.mouseForce.value;
      let tool = { name: "inspect" };
      if (!paused) {
        if (mouseForce > 0) {
          tool = { name: "interact-pull" };
        } else if (mouseForce < 0) {
          tool = { name: "interact-impulse" };
        }
      }
      this.context.activeTool.value = tool;
    }
  }
  class ConsoleManager extends Middleware {
    constructor() {
      super();
      this.handleActivate = () => {
        this.context.console = this;
        this.statusElement = document.getElementById("testbed-status");
        this.lastStatus = "";
        if (this.statusElement) {
          this.statusElement.innerText = this.lastStatus;
        } else {
          console.warn("Element with id='testbed-status' not found!");
        }
        this.infoElement = document.getElementById("testbed-info");
        this.lastInfo = "";
        if (this.infoElement) {
          this.infoElement.innerText = this.lastInfo;
        } else {
          console.warn("Element with id='testbed-info' not found!");
        }
      };
      this.handleDeactivate = () => {
        this.context.console = null;
      };
      this._statusText = "";
      this._statusMap = {};
      this.on("activate", this.handleActivate);
      this.on("deactivate", this.handleDeactivate);
    }
    info(text) {
      this.updateInfo(text);
    }
    status(a2, b2) {
      if (typeof b2 !== "undefined") {
        const key = a2;
        const value = b2;
        if (typeof value !== "function" && typeof value !== "object") {
          this._statusMap[key] = value;
        }
      } else if (a2 && typeof a2 === "object") {
        for (const key in a2) {
          const value = a2[key];
          if (typeof value !== "function" && typeof value !== "object") {
            this._statusMap[key] = value;
          }
        }
      } else if (typeof a2 === "string") {
        this._statusText = a2;
      }
      const newline = "\n";
      let text = this._statusText || "";
      for (const key in this._statusMap) {
        const value = this._statusMap[key];
        if (typeof value === "function")
          continue;
        text += (text && newline) + key + ": " + value;
      }
      this.updateStatus(text);
    }
    updateInfo(text) {
      if (this.lastInfo === text)
        return;
      this.lastInfo = text;
      if (this.infoElement) {
        this.infoElement.innerText = text;
      }
    }
    updateStatus(text) {
      if (this.lastStatus === text)
        return;
      this.lastStatus = text;
      if (this.statusElement) {
        this.statusElement.innerText = text;
      }
    }
  }
  class TestbedMain extends Middleware {
    constructor() {
      super();
      this.draw = new GLDraw();
      this.handleFrameUpdate = (ev) => {
        if (this.context.paused.value)
          return;
        if (!this.context.world.value)
          return;
        this.step?.(ev.dt, ev.now);
      };
      this.handleKeydown = (ev) => {
        if (this.context.paused.value)
          return;
        this.keydown?.(ev.keyCode, String.fromCharCode(ev.keyCode));
      };
      this.handleKeyup = (ev) => {
        if (this.context.paused.value)
          return;
        this.keyup?.(ev.keyCode, String.fromCharCode(ev.keyCode));
      };
      this.use(this.draw);
      this.use(new WorldQuery());
      this.use(new FrameLoop());
      this.use(new ContainerLoader());
      this.use(new WorldStep());
      this.use(new AutoPause());
      this.use(new ConsoleManager());
      this.use(new KeyboardManager());
      this.use(new CameraTransform());
      this.use(new GLLoader());
      this.use(new TextOverlay());
      this.use(new AutoFocus());
      this.use(new DrawWorld());
      this.use(new DrawBounds());
      this.use(new DrawBodyInfo());
      this.use(new DrawJoints());
      this.use(new DrawContacts());
      this.use(new WorldKeys());
      this.use(new SelectionManager());
      this.use(new PointerManager());
      this.use(new DefaultTool());
      this.use(new ToolSwitch("inspect", new InspectTool()));
      this.use(new ToolSwitch("interact-pull", new PullTool()));
      this.use(new ToolSwitch("interact-impulse", new ImpulseTool()));
      this.on("frame-update", this.handleFrameUpdate);
      this.on("keydown", this.handleKeydown);
      this.on("keyup", this.handleKeyup);
    }
    color(r2, g, b2) {
      r2 = r2 * 255 | 0;
      g = g * 255 | 0;
      b2 = b2 * 255 | 0;
      return "rgb(" + r2 + ", " + g + ", " + b2 + ")";
    }
    findOne(query) {
      const world = this.context.world.value;
      return world ? findOne(world, query) : null;
    }
    findAll(query) {
      const world = this.context.world.value;
      return world ? findAll(world, query) : [];
    }
    // @on("tool-request")
    // handleToolRequest(config: ToolConfig) {
    //   this.context.activeTool.value = config;
    // }
    get width() {
      return this.context.camera.width;
    }
    set width(value) {
      this.context.camera.width = value;
    }
    get height() {
      return this.context.camera.height;
    }
    set height(value) {
      this.context.camera.height = value;
    }
    get x() {
      return this.context.camera.x;
    }
    set x(value) {
      this.context.camera.x = value;
    }
    // planck 1's testbed measured y downwards: `testbed.y = -20` centers the view on world y = 20
    get y() {
      return -this.context.camera.y;
    }
    set y(value) {
      this.context.camera.y = -value;
    }
    get background() {
      return this.context.style.background;
    }
    set background(value) {
      this.context.style.background = value;
    }
    get hz() {
      return this.context.simulation.hz;
    }
    set hz(value) {
      this.context.simulation.hz = value;
    }
    get speed() {
      return this.context.simulation.speed;
    }
    set speed(value) {
      this.context.simulation.speed = value;
    }
    get mouseForce() {
      return this.context.mouseForce.value;
    }
    set mouseForce(value) {
      this.context.mouseForce.value = value;
    }
    get activeKeys() {
      return this.context.activeKeys;
    }
    start(world) {
      if (world) {
        this.context.world.value = world;
      }
      this.resume();
    }
    // todo: how to add world to testbed api?
    // get/set world, or get/setWorld
    get world() {
      return this.context.world.value;
    }
    set world(world) {
      this.context.world.value = world;
    }
    drawPoint(p2, r2, color) {
      this.draw.drawPoint(p2, r2, color);
    }
    drawCircle(p2, r2, color) {
      this.draw.drawCircle(p2, r2, color);
    }
    drawCapsule(a2, b2, r2, color) {
      this.draw.drawCapsule(a2, b2, r2, color);
    }
    drawEdge(a2, b2, color) {
      this.draw.drawEdge(a2, b2, color);
    }
    drawSegment(a2, b2, color) {
      this.draw.drawEdge(a2, b2, color);
    }
    drawPolygon(points, color) {
      this.draw.drawPolygon(points, color);
    }
    drawChain(points, color) {
      this.draw.drawChain(points, color);
    }
    drawAABB(aabb, color) {
      this.draw.drawAABB(aabb, color);
    }
    /** @internal pass paused to WorldComponent */
    get paused() {
      return this.context.paused.value;
    }
    isPaused() {
      return this.context.paused.value;
    }
    pause() {
      this.context.paused.value = true;
    }
    resume() {
      this.context.paused.value = false;
    }
    info(text) {
      this.context.console?.info(text);
    }
    status(a2, b2) {
      this.context.console?.status(a2, b2);
    }
  }
  const mountTestbed = () => {
    if (runtime.value)
      return runtime.value.middleware;
    const main = new TestbedMain();
    const context = initTestbedContext();
    context.activeTool.value = { name: "interact-pull" };
    runtime.value = {
      middleware: main,
      context,
      emit: main.emit.bind(main)
    };
    window["runtime"] = main;
    Runtime.activate(main, context);
    return main;
  };
  Testbed.mount = mountTestbed;
  exports2.AABB = AABB;
  exports2.Body = Body;
  exports2.Box = BoxShape;
  exports2.BoxShape = BoxShape;
  exports2.BroadPhase = BroadPhase;
  exports2.Chain = ChainShape;
  exports2.ChainShape = ChainShape;
  exports2.Circle = CircleShape;
  exports2.CircleShape = CircleShape;
  exports2.ClipVertex = ClipVertex;
  exports2.CollideCircles = CollideCircles;
  exports2.CollideEdgeCircle = CollideEdgeCircle;
  exports2.CollideEdgePolygon = CollideEdgePolygon;
  exports2.CollidePolygonCircle = CollidePolygonCircle;
  exports2.CollidePolygons = CollidePolygons;
  exports2.Contact = Contact;
  exports2.ContactEdge = ContactEdge;
  exports2.ContactID = ContactID;
  exports2.ContactImpulse = ContactImpulse;
  exports2.DataDriver = DataDriver;
  exports2.Distance = Distance;
  exports2.DistanceInput = DistanceInput;
  exports2.DistanceJoint = DistanceJoint;
  exports2.DistanceOutput = DistanceOutput;
  exports2.DistanceProxy = DistanceProxy;
  exports2.DynamicTree = DynamicTree;
  exports2.Edge = EdgeShape;
  exports2.EdgeShape = EdgeShape;
  exports2.Fixture = Fixture;
  exports2.FixtureProxy = FixtureProxy;
  exports2.FrictionJoint = FrictionJoint;
  exports2.GearJoint = GearJoint;
  exports2.Joint = Joint;
  exports2.JointEdge = JointEdge;
  exports2.Manifold = Manifold;
  exports2.ManifoldPoint = ManifoldPoint;
  exports2.Mat22 = Mat22;
  exports2.Mat33 = Mat33;
  exports2.Math = math;
  exports2.MotorJoint = MotorJoint;
  exports2.MouseJoint = MouseJoint;
  exports2.Polygon = PolygonShape;
  exports2.PolygonShape = PolygonShape;
  exports2.PrismaticJoint = PrismaticJoint;
  exports2.PulleyJoint = PulleyJoint;
  exports2.RevoluteJoint = RevoluteJoint;
  exports2.RopeJoint = RopeJoint;
  exports2.Rot = Rot;
  exports2.Serializer = Serializer;
  exports2.Settings = Settings;
  exports2.SettingsInternal = SettingsInternal;
  exports2.Shape = Shape;
  exports2.ShapeCast = ShapeCast;
  exports2.ShapeCastInput = ShapeCastInput;
  exports2.ShapeCastOutput = ShapeCastOutput;
  exports2.SimplexCache = SimplexCache;
  exports2.Solver = Solver;
  exports2.Sweep = Sweep;
  exports2.TOIInput = TOIInput;
  exports2.TOIOutput = TOIOutput;
  exports2.Testbed = Testbed;
  exports2.TimeOfImpact = TimeOfImpact;
  exports2.TimeStep = TimeStep;
  exports2.Transform = Transform;
  exports2.TreeNode = TreeNode;
  exports2.Vec2 = Vec2;
  exports2.Vec3 = Vec3;
  exports2.VelocityConstraintPoint = VelocityConstraintPoint;
  exports2.WeldJoint = WeldJoint;
  exports2.WheelJoint = WheelJoint;
  exports2.World = World;
  exports2.WorldManifold = WorldManifold;
  exports2.clipSegmentToLine = clipSegmentToLine;
  exports2.getPointStates = getPointStates;
  exports2.internal = internal;
  exports2.mixFriction = mixFriction;
  exports2.mixRestitution = mixRestitution;
  exports2.stats = stats;
  exports2.testOverlap = testOverlap;
  exports2.testbed = testbed;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
//# sourceMappingURL=planck-with-testbed.js.map
