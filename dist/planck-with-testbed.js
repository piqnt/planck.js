/**
 * Planck.js v1.0.0-alpha.4
 * @license The MIT license
 * @copyright Copyright (c) 2021 Erin Catto, Ali Shakiba
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

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.planck = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function options (input, defaults) {
        if (input === null || typeof input === 'undefined') {
            // tslint:disable-next-line:no-object-literal-type-assertion
            input = {};
        }
        var output = __assign({}, input);
        // tslint:disable-next-line:no-for-in
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key) && typeof input[key] === 'undefined') {
                output[key] = defaults[key];
            }
        }
        if (typeof Object.getOwnPropertySymbols === 'function') {
            var symbols = Object.getOwnPropertySymbols(defaults);
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                if (defaults.propertyIsEnumerable(symbol) && typeof input[symbol] === 'undefined') {
                    output[symbol] = defaults[symbol];
                }
            }
        }
        return output;
    }

    var debug = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return;
    };
    var assert = function (statement, err, log) {
        return;
    };
    var common = {
        assert: assert,
        debug: debug,
    };

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
    var math$1 = Object.create(Math);
    // @ts-ignore
    // noinspection JSConstantReassignment
    math$1.EPSILON = 1e-9; // TODO
    math$1.isFinite = function (x) {
        return (typeof x === 'number') && isFinite(x) && !isNaN(x);
    };
    math$1.assert = function (x) {
        return;
    };
    math$1.invSqrt = function (x) {
        // TODO:
        return 1 / Math.sqrt(x);
    };
    math$1.nextPowerOfTwo = function (x) {
        // TODO
        x |= (x >> 1);
        x |= (x >> 2);
        x |= (x >> 4);
        x |= (x >> 8);
        x |= (x >> 16);
        return x + 1;
    };
    math$1.isPowerOfTwo = function (x) {
        return x > 0 && (x & (x - 1)) === 0;
    };
    math$1.mod = function (num, min, max) {
        if (typeof min === 'undefined') {
            max = 1;
            min = 0;
        }
        else if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        if (max > min) {
            num = (num - min) % (max - min);
            return num + (num < 0 ? max : min);
        }
        else {
            num = (num - max) % (min - max);
            return num + (num <= 0 ? min : max);
        }
    };
    math$1.clamp = function (num, min, max) {
        if (num < min) {
            return min;
        }
        else if (num > max) {
            return max;
        }
        else {
            return num;
        }
    };
    math$1.random = function (min, max) {
        if (typeof min === 'undefined') {
            max = 1;
            min = 0;
        }
        else if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        return min === max ? min : Math.random() * (max - min) + min;
    };

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
    var Vec2 = /** @class */ (function () {
        // tslint:disable-next-line:typedef
        function Vec2(x, y) {
            if (!(this instanceof Vec2)) {
                return new Vec2(x, y);
            }
            if (typeof x === 'undefined') {
                this.x = 0;
                this.y = 0;
            }
            else if (typeof x === 'object') {
                this.x = x.x;
                this.y = x.y;
            }
            else {
                this.x = x;
                this.y = y;
            }
        }
        /** @internal */
        Vec2.prototype._serialize = function () {
            return {
                x: this.x,
                y: this.y
            };
        };
        /** @internal */
        Vec2._deserialize = function (data) {
            var obj = Object.create(Vec2.prototype);
            obj.x = data.x;
            obj.y = data.y;
            return obj;
        };
        Vec2.zero = function () {
            var obj = Object.create(Vec2.prototype);
            obj.x = 0;
            obj.y = 0;
            return obj;
        };
        /** @internal */
        Vec2.neo = function (x, y) {
            var obj = Object.create(Vec2.prototype);
            obj.x = x;
            obj.y = y;
            return obj;
        };
        Vec2.clone = function (v) {
            return Vec2.neo(v.x, v.y);
        };
        /** @internal */
        Vec2.prototype.toString = function () {
            return JSON.stringify(this);
        };
        /**
         * Does this vector contain finite coordinates?
         */
        Vec2.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return math$1.isFinite(obj.x) && math$1.isFinite(obj.y);
        };
        Vec2.assert = function (o) {
            return;
        };
        Vec2.prototype.clone = function () {
            return Vec2.clone(this);
        };
        /**
         * Set this vector to all zeros.
         *
         * @returns this
         */
        Vec2.prototype.setZero = function () {
            this.x = 0.0;
            this.y = 0.0;
            return this;
        };
        /**
         * Set this vector to some specified coordinates.
         *
         * @returns this
         */
        // tslint:disable-next-line:typedef
        Vec2.prototype.set = function (x, y) {
            if (typeof x === 'object') {
                this.x = x.x;
                this.y = x.y;
            }
            else {
                this.x = x;
                this.y = y;
            }
            return this;
        };
        /**
         * Set this vector to some specified coordinates.
         *
         * @returns this
         */
        Vec2.prototype.setNum = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * Set this vector to some specified coordinates.
         *
         * @returns this
         */
        Vec2.prototype.setVec2 = function (value) {
            this.x = value.x;
            this.y = value.y;
            return this;
        };
        /**
         * @internal
         * @deprecated Use setCombine or setMul
         */
        Vec2.prototype.wSet = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return this.setCombine(a, v, b, w);
            }
            else {
                return this.setMul(a, v);
            }
        };
        /**
         * Set linear combination of v and w: `a * v + b * w`
         */
        Vec2.prototype.setCombine = function (a, v, b, w) {
            var x = a * v.x + b * w.x;
            var y = a * v.y + b * w.y;
            // `this` may be `w`
            this.x = x;
            this.y = y;
            return this;
        };
        Vec2.prototype.setMul = function (a, v) {
            var x = a * v.x;
            var y = a * v.y;
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * Add a vector to this vector.
         *
         * @returns this
         */
        Vec2.prototype.add = function (w) {
            this.x += w.x;
            this.y += w.y;
            return this;
        };
        /**
         * @internal
         * @deprecated Use addCombine or addMul
         */
        Vec2.prototype.wAdd = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return this.addCombine(a, v, b, w);
            }
            else {
                return this.addMul(a, v);
            }
        };
        /**
         * Add linear combination of v and w: `a * v + b * w`
         */
        Vec2.prototype.addCombine = function (a, v, b, w) {
            var x = a * v.x + b * w.x;
            var y = a * v.y + b * w.y;
            // `this` may be `w`
            this.x += x;
            this.y += y;
            return this;
        };
        Vec2.prototype.addMul = function (a, v) {
            var x = a * v.x;
            var y = a * v.y;
            this.x += x;
            this.y += y;
            return this;
        };
        /**
         * @deprecated Use subCombine or subMul
         */
        Vec2.prototype.wSub = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return this.subCombine(a, v, b, w);
            }
            else {
                return this.subMul(a, v);
            }
        };
        /**
         * Subtract linear combination of v and w: `a * v + b * w`
         */
        Vec2.prototype.subCombine = function (a, v, b, w) {
            var x = a * v.x + b * w.x;
            var y = a * v.y + b * w.y;
            // `this` may be `w`
            this.x -= x;
            this.y -= y;
            return this;
        };
        Vec2.prototype.subMul = function (a, v) {
            var x = a * v.x;
            var y = a * v.y;
            this.x -= x;
            this.y -= y;
            return this;
        };
        /**
         * Subtract a vector from this vector
         *
         * @returns this
         */
        Vec2.prototype.sub = function (w) {
            this.x -= w.x;
            this.y -= w.y;
            return this;
        };
        /**
         * Multiply this vector by a scalar.
         *
         * @returns this
         */
        Vec2.prototype.mul = function (m) {
            this.x *= m;
            this.y *= m;
            return this;
        };
        /**
         * Get the length of this vector (the norm).
         *
         * For performance, use this instead of lengthSquared (if possible).
         */
        Vec2.prototype.length = function () {
            return Vec2.lengthOf(this);
        };
        /**
         * Get the length squared.
         */
        Vec2.prototype.lengthSquared = function () {
            return Vec2.lengthSquared(this);
        };
        /**
         * Convert this vector into a unit vector.
         *
         * @returns old length
         */
        Vec2.prototype.normalize = function () {
            var length = this.length();
            if (length < math$1.EPSILON) {
                return 0.0;
            }
            var invLength = 1.0 / length;
            this.x *= invLength;
            this.y *= invLength;
            return length;
        };
        /**
         * Get the length of this vector (the norm).
         *
         * For performance, use this instead of lengthSquared (if possible).
         */
        Vec2.lengthOf = function (v) {
            return math$1.sqrt(v.x * v.x + v.y * v.y);
        };
        /**
         * Get the length squared.
         */
        Vec2.lengthSquared = function (v) {
            return v.x * v.x + v.y * v.y;
        };
        Vec2.distance = function (v, w) {
            var dx = v.x - w.x;
            var dy = v.y - w.y;
            return math$1.sqrt(dx * dx + dy * dy);
        };
        Vec2.distanceSquared = function (v, w) {
            var dx = v.x - w.x;
            var dy = v.y - w.y;
            return dx * dx + dy * dy;
        };
        Vec2.areEqual = function (v, w) {
            return v === w || typeof w === 'object' && w !== null && v.x === w.x && v.y === w.y;
        };
        /**
         * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
         */
        Vec2.skew = function (v) {
            return Vec2.neo(-v.y, v.x);
        };
        /**
         * Perform the dot product on two vectors.
         */
        Vec2.dot = function (v, w) {
            return v.x * w.x + v.y * w.y;
        };
        /**
         * Perform the cross product on two vectors. In 2D this produces a scalar.
         *
         * Perform the cross product on a vector and a scalar. In 2D this produces a
         * vector.
         */
        // tslint:disable-next-line:typedef
        Vec2.cross = function (v, w) {
            if (typeof w === 'number') {
                return Vec2.neo(w * v.y, -w * v.x);
            }
            else if (typeof v === 'number') {
                return Vec2.neo(-v * w.y, v * w.x);
            }
            else {
                return v.x * w.y - v.y * w.x;
            }
        };
        /**
         * Perform the cross product on two vectors. In 2D this produces a scalar.
         */
        Vec2.crossVec2Vec2 = function (v, w) {
            return v.x * w.y - v.y * w.x;
        };
        /**
         * Perform the cross product on a vector and a scalar. In 2D this produces a
         * vector.
         */
        Vec2.crossVec2Num = function (v, w) {
            return Vec2.neo(w * v.y, -w * v.x);
        };
        /**
         * Perform the cross product on a vector and a scalar. In 2D this produces a
         * vector.
         */
        Vec2.crossNumVec2 = function (v, w) {
            return Vec2.neo(-v * w.y, v * w.x);
        };
        /**
         * Returns `a + (v x w)`
         */
        // tslint:disable-next-line:typedef
        Vec2.addCross = function (a, v, w) {
            if (typeof w === 'number') {
                return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
            }
            else if (typeof v === 'number') {
                return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
            }
        };
        /**
         * Returns `a + (v x w)`
         */
        Vec2.addCrossVec2Num = function (a, v, w) {
            return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
        };
        /**
         * Returns `a + (v x w)`
         */
        Vec2.addCrossNumVec2 = function (a, v, w) {
            return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
        };
        Vec2.add = function (v, w) {
            return Vec2.neo(v.x + w.x, v.y + w.y);
        };
        /** @internal @deprecated */
        Vec2.wAdd = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return Vec2.combine(a, v, b, w);
            }
            else {
                return Vec2.mulNumVec2(a, v);
            }
        };
        Vec2.combine = function (a, v, b, w) {
            return Vec2.zero().setCombine(a, v, b, w);
        };
        Vec2.sub = function (v, w) {
            return Vec2.neo(v.x - w.x, v.y - w.y);
        };
        // tslint:disable-next-line:typedef
        Vec2.mul = function (a, b) {
            if (typeof a === 'object') {
                return Vec2.neo(a.x * b, a.y * b);
            }
            else if (typeof b === 'object') {
                return Vec2.neo(a * b.x, a * b.y);
            }
        };
        Vec2.mulVec2Num = function (a, b) {
            return Vec2.neo(a.x * b, a.y * b);
        };
        Vec2.mulNumVec2 = function (a, b) {
            return Vec2.neo(a * b.x, a * b.y);
        };
        Vec2.prototype.neg = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        Vec2.neg = function (v) {
            return Vec2.neo(-v.x, -v.y);
        };
        Vec2.abs = function (v) {
            return Vec2.neo(math$1.abs(v.x), math$1.abs(v.y));
        };
        Vec2.mid = function (v, w) {
            return Vec2.neo((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
        };
        Vec2.upper = function (v, w) {
            return Vec2.neo(math$1.max(v.x, w.x), math$1.max(v.y, w.y));
        };
        Vec2.lower = function (v, w) {
            return Vec2.neo(math$1.min(v.x, w.x), math$1.min(v.y, w.y));
        };
        Vec2.prototype.clamp = function (max) {
            var lengthSqr = this.x * this.x + this.y * this.y;
            if (lengthSqr > max * max) {
                var invLength = math$1.invSqrt(lengthSqr);
                this.x *= invLength * max;
                this.y *= invLength * max;
            }
            return this;
        };
        Vec2.clamp = function (v, max) {
            v = Vec2.neo(v.x, v.y);
            v.clamp(max);
            return v;
        };
        /**  @internal @deprecated */
        // tslint:disable-next-line:typedef
        Vec2.scaleFn = function (x, y) {
            return function (v) {
                return Vec2.neo(v.x * x, v.y * y);
            };
        };
        /**  @internal @deprecated */
        // tslint:disable-next-line:typedef
        Vec2.translateFn = function (x, y) {
            return function (v) {
                return Vec2.neo(v.x + x, v.y + y);
            };
        };
        return Vec2;
    }());

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
    var AABB = /** @class */ (function () {
        function AABB(lower, upper) {
            if (!(this instanceof AABB)) {
                return new AABB(lower, upper);
            }
            this.lowerBound = Vec2.zero();
            this.upperBound = Vec2.zero();
            if (typeof lower === 'object') {
                this.lowerBound.setVec2(lower);
            }
            if (typeof upper === 'object') {
                this.upperBound.setVec2(upper);
            }
            else if (typeof lower === 'object') {
                this.upperBound.setVec2(lower);
            }
        }
        /**
         * Verify that the bounds are sorted.
         */
        AABB.prototype.isValid = function () {
            return AABB.isValid(this);
        };
        AABB.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec2.isValid(obj.lowerBound) && Vec2.isValid(obj.upperBound) && Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0;
        };
        AABB.assert = function (o) {
            return;
        };
        /**
         * Get the center of the AABB.
         */
        AABB.prototype.getCenter = function () {
            return Vec2.neo((this.lowerBound.x + this.upperBound.x) * 0.5, (this.lowerBound.y + this.upperBound.y) * 0.5);
        };
        /**
         * Get the extents of the AABB (half-widths).
         */
        AABB.prototype.getExtents = function () {
            return Vec2.neo((this.upperBound.x - this.lowerBound.x) * 0.5, (this.upperBound.y - this.lowerBound.y) * 0.5);
        };
        /**
         * Get the perimeter length.
         */
        AABB.prototype.getPerimeter = function () {
            return 2.0 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
        };
        /**
         * Combine one or two AABB into this one.
         */
        AABB.prototype.combine = function (a, b) {
            b = b || this;
            var lowerA = a.lowerBound;
            var upperA = a.upperBound;
            var lowerB = b.lowerBound;
            var upperB = b.upperBound;
            var lowerX = math$1.min(lowerA.x, lowerB.x);
            var lowerY = math$1.min(lowerA.y, lowerB.y);
            var upperX = math$1.max(upperB.x, upperA.x);
            var upperY = math$1.max(upperB.y, upperA.y);
            this.lowerBound.setNum(lowerX, lowerY);
            this.upperBound.setNum(upperX, upperY);
        };
        AABB.prototype.combinePoints = function (a, b) {
            this.lowerBound.setNum(math$1.min(a.x, b.x), math$1.min(a.y, b.y));
            this.upperBound.setNum(math$1.max(a.x, b.x), math$1.max(a.y, b.y));
        };
        AABB.prototype.set = function (aabb) {
            this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
            this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
        };
        AABB.prototype.contains = function (aabb) {
            var result = true;
            result = result && this.lowerBound.x <= aabb.lowerBound.x;
            result = result && this.lowerBound.y <= aabb.lowerBound.y;
            result = result && aabb.upperBound.x <= this.upperBound.x;
            result = result && aabb.upperBound.y <= this.upperBound.y;
            return result;
        };
        AABB.prototype.extend = function (value) {
            AABB.extend(this, value);
            return this;
        };
        AABB.extend = function (aabb, value) {
            aabb.lowerBound.x -= value;
            aabb.lowerBound.y -= value;
            aabb.upperBound.x += value;
            aabb.upperBound.y += value;
        };
        AABB.testOverlap = function (a, b) {
            var d1x = b.lowerBound.x - a.upperBound.x;
            var d2x = a.lowerBound.x - b.upperBound.x;
            var d1y = b.lowerBound.y - a.upperBound.y;
            var d2y = a.lowerBound.y - b.upperBound.y;
            if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
                return false;
            }
            return true;
        };
        AABB.areEqual = function (a, b) {
            return Vec2.areEqual(a.lowerBound, b.lowerBound) && Vec2.areEqual(a.upperBound, b.upperBound);
        };
        AABB.diff = function (a, b) {
            var wD = math$1.max(0, math$1.min(a.upperBound.x, b.upperBound.x) - math$1.max(b.lowerBound.x, a.lowerBound.x));
            var hD = math$1.max(0, math$1.min(a.upperBound.y, b.upperBound.y) - math$1.max(b.lowerBound.y, a.lowerBound.y));
            var wA = a.upperBound.x - a.lowerBound.x;
            var hA = a.upperBound.y - a.lowerBound.y;
            var wB = b.upperBound.x - b.lowerBound.x;
            var hB = b.upperBound.y - b.lowerBound.y;
            return wA * hA + wB * hB - wD * hD;
        };
        AABB.prototype.rayCast = function (output, input) {
            // From Real-time Collision Detection, p179.
            var tmin = -Infinity;
            var tmax = Infinity;
            var p = input.p1;
            var d = Vec2.sub(input.p2, input.p1);
            var absD = Vec2.abs(d);
            var normal = Vec2.zero();
            for (var f = 'x'; f !== null; f = (f === 'x' ? 'y' : null)) {
                if (absD.x < math$1.EPSILON) {
                    // Parallel.
                    if (p[f] < this.lowerBound[f] || this.upperBound[f] < p[f]) {
                        return false;
                    }
                }
                else {
                    var inv_d = 1.0 / d[f];
                    var t1 = (this.lowerBound[f] - p[f]) * inv_d;
                    var t2 = (this.upperBound[f] - p[f]) * inv_d;
                    // Sign of the normal vector.
                    var s = -1.0;
                    if (t1 > t2) {
                        var temp = t1;
                        t1 = t2;
                        t2 = temp;
                        s = 1.0;
                    }
                    // Push the min up
                    if (t1 > tmin) {
                        normal.setZero();
                        normal[f] = s;
                        tmin = t1;
                    }
                    // Pull the max down
                    tmax = math$1.min(tmax, t2);
                    if (tmin > tmax) {
                        return false;
                    }
                }
            }
            // Does the ray start inside the box?
            // Does the ray intersect beyond the max fraction?
            if (tmin < 0.0 || input.maxFraction < tmin) {
                return false;
            }
            // Intersection.
            output.fraction = tmin;
            output.normal = normal;
            return true;
        };
        /** @internal */
        AABB.prototype.toString = function () {
            return JSON.stringify(this);
        };
        return AABB;
    }());

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
    // TODO merge with World options?
    /**
     * Tuning constants based on meters-kilograms-seconds (MKS) units.
     */
    // tslint:disable-next-line:no-unnecessary-class
    var Settings = /** @class */ (function () {
        function Settings() {
        }
        Object.defineProperty(Settings, "linearSlopSquared", {
            get: function () { return Settings.linearSlop * Settings.linearSlop; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Settings, "polygonRadius", {
            /**
             * The radius of the polygon/edge shape skin. This should not be modified.
             * Making this smaller means polygons will have an insufficient buffer for
             * continuous collision. Making it larger may create artifacts for vertex
             * collision.
             */
            get: function () { return 2.0 * Settings.linearSlop; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Settings, "maxTranslationSquared", {
            get: function () { return Settings.maxTranslation * Settings.maxTranslation; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Settings, "maxRotationSquared", {
            get: function () { return Settings.maxRotation * Settings.maxRotation; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Settings, "linearSleepToleranceSqr", {
            get: function () { return Math.pow(Settings.linearSleepTolerance, 2); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Settings, "angularSleepToleranceSqr", {
            get: function () { return Math.pow(Settings.angularSleepTolerance, 2); },
            enumerable: false,
            configurable: true
        });
        // Collision
        /**
         * The maximum number of contact points between two convex shapes. Do not change
         * this value.
         */
        Settings.maxManifoldPoints = 2;
        /**
         * The maximum number of vertices on a convex polygon. You cannot increase this
         * too much because BlockAllocator has a maximum object size.
         */
        Settings.maxPolygonVertices = 12;
        /**
         * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
         * by a small amount without triggering a tree adjustment. This is in meters.
         */
        Settings.aabbExtension = 0.1;
        /**
         * This is used to fatten AABBs in the dynamic tree. This is used to predict the
         * future position based on the current displacement. This is a dimensionless
         * multiplier.
         */
        Settings.aabbMultiplier = 2.0;
        /**
         * A small length used as a collision and constraint tolerance. Usually it is
         * chosen to be numerically significant, but visually insignificant.
         */
        Settings.linearSlop = 0.005;
        /**
         * A small angle used as a collision and constraint tolerance. Usually it is
         * chosen to be numerically significant, but visually insignificant.
         */
        Settings.angularSlop = (2.0 / 180.0 * Math.PI);
        /**
         * Maximum number of sub-steps per contact in continuous physics simulation.
         */
        Settings.maxSubSteps = 8;
        // Dynamics
        /**
         * Maximum number of contacts to be handled to solve a TOI impact.
         */
        Settings.maxTOIContacts = 32;
        /**
         * Maximum iterations to solve a TOI.
         */
        Settings.maxTOIIterations = 20;
        /**
         * Maximum iterations to find Distance.
         */
        Settings.maxDistnceIterations = 20;
        /**
         * A velocity threshold for elastic collisions. Any collision with a relative
         * linear velocity below this threshold will be treated as inelastic.
         */
        Settings.velocityThreshold = 1.0;
        /**
         * The maximum linear position correction used when solving constraints. This
         * helps to prevent overshoot.
         */
        Settings.maxLinearCorrection = 0.2;
        /**
         * The maximum angular position correction used when solving constraints. This
         * helps to prevent overshoot.
         */
        Settings.maxAngularCorrection = (8.0 / 180.0 * Math.PI);
        /**
         * The maximum linear velocity of a body. This limit is very large and is used
         * to prevent numerical problems. You shouldn't need to adjust Settings.
         */
        Settings.maxTranslation = 2.0;
        /**
         * The maximum angular velocity of a body. This limit is very large and is used
         * to prevent numerical problems. You shouldn't need to adjust Settings.
         */
        Settings.maxRotation = (0.5 * Math.PI);
        /**
         * This scale factor controls how fast overlap is resolved. Ideally this would
         * be 1 so that overlap is removed in one time step. However using values close
         * to 1 often lead to overshoot.
         */
        Settings.baumgarte = 0.2;
        Settings.toiBaugarte = 0.75;
        // Sleep
        /**
         * The time that a body must be still before it will go to sleep.
         */
        Settings.timeToSleep = 0.5;
        /**
         * A body cannot sleep if its linear velocity is above this tolerance.
         */
        Settings.linearSleepTolerance = 0.01;
        /**
         * A body cannot sleep if its angular velocity is above this tolerance.
         */
        Settings.angularSleepTolerance = (2.0 / 180.0 * Math.PI);
        return Settings;
    }());

    /*
     * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
     *
     * This software is provided 'as-is', without any express or implied
     * warranty.  In no event will the authors be held liable for any damages
     * arising from the use of this software.
     * Permission is granted to anyone to use this software for any purpose,
     * including commercial applications, and to alter it and redistribute it
     * freely, subject to the following restrictions:
     * 1. The origin of this software must not be misrepresented; you must not
     * claim that you wrote the original software. If you use this software
     * in a product, an acknowledgment in the product documentation would be
     * appreciated but is not required.
     * 2. Altered source versions must be plainly marked as such, and must not be
     * misrepresented as being the original software.
     * 3. This notice may not be removed or altered from any source distribution.
     */
    var Pool = /** @class */ (function () {
        function Pool(opts) {
            this._list = [];
            this._max = Infinity;
            this._createCount = 0;
            this._outCount = 0;
            this._inCount = 0;
            this._discardCount = 0;
            this._list = [];
            this._max = opts.max || this._max;
            this._createFn = opts.create;
            this._outFn = opts.allocate;
            this._inFn = opts.release;
            this._discardFn = opts.discard;
        }
        Pool.prototype.max = function (n) {
            if (typeof n === 'number') {
                this._max = n;
                return this;
            }
            return this._max;
        };
        Pool.prototype.size = function () {
            return this._list.length;
        };
        Pool.prototype.allocate = function () {
            var item;
            if (this._list.length > 0) {
                item = this._list.shift();
            }
            else {
                this._createCount++;
                if (typeof this._createFn === 'function') {
                    item = this._createFn();
                }
                else {
                    // tslint:disable-next-line:no-object-literal-type-assertion
                    item = {};
                }
            }
            this._outCount++;
            if (typeof this._outFn === 'function') {
                this._outFn(item);
            }
            return item;
        };
        Pool.prototype.release = function (item) {
            if (this._list.length < this._max) {
                this._inCount++;
                if (typeof this._inFn === 'function') {
                    this._inFn(item);
                }
                this._list.push(item);
            }
            else {
                this._discardCount++;
                if (typeof this._discardFn === 'function') {
                    item = this._discardFn(item);
                }
            }
        };
        /** @internal */
        Pool.prototype.toString = function () {
            return " +" + this._createCount + " >" + this._outCount + " <" + this._inCount + " -"
                + this._discardCount + " =" + this._list.length + "/" + this._max;
        };
        return Pool;
    }());

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
    /**
     * A node in the dynamic tree. The client does not interact with this directly.
     */
    var TreeNode = /** @class */ (function () {
        function TreeNode(id) {
            /** Enlarged AABB */
            this.aabb = new AABB();
            this.userData = null;
            this.parent = null;
            this.child1 = null;
            this.child2 = null;
            /** 0: leaf, -1: free node */
            this.height = -1;
            this.id = id;
        }
        /** @internal */
        TreeNode.prototype.toString = function () {
            return this.id + ": " + this.userData;
        };
        TreeNode.prototype.isLeaf = function () {
            return this.child1 == null;
        };
        return TreeNode;
    }());
    /**
     * A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt. A
     * dynamic tree arranges data in a binary tree to accelerate queries such as
     * volume queries and ray casts. Leafs are proxies with an AABB. In the tree we
     * expand the proxy AABB by `aabbExtension` so that the proxy AABB is bigger
     * than the client object. This allows the client object to move by small
     * amounts without triggering a tree update.
     *
     * Nodes are pooled and relocatable, so we use node indices rather than
     * pointers.
     */
    var DynamicTree = /** @class */ (function () {
        function DynamicTree() {
            this.inputPool = new Pool({
                create: function () {
                    // tslint:disable-next-line:no-object-literal-type-assertion
                    return {};
                },
                release: function (stack) {
                }
            });
            this.stackPool = new Pool({
                create: function () {
                    return [];
                },
                release: function (stack) {
                    stack.length = 0;
                }
            });
            this.iteratorPool = new Pool({
                create: function () {
                    return new Iterator();
                },
                release: function (iterator) {
                    iterator.close();
                }
            });
            this.m_root = null;
            this.m_nodes = {};
            this.m_lastProxyId = 0;
            this.m_pool = new Pool({
                create: function () {
                    return new TreeNode();
                }
            });
        }
        /**
         * Get proxy user data.
         *
         * @return the proxy user data or 0 if the id is invalid.
         */
        DynamicTree.prototype.getUserData = function (id) {
            var node = this.m_nodes[id];
            return node.userData;
        };
        /**
         * Get the fat AABB for a node id.
         *
         * @return the proxy user data or 0 if the id is invalid.
         */
        DynamicTree.prototype.getFatAABB = function (id) {
            var node = this.m_nodes[id];
            return node.aabb;
        };
        DynamicTree.prototype.allocateNode = function () {
            var node = this.m_pool.allocate();
            node.id = ++this.m_lastProxyId;
            node.userData = null;
            node.parent = null;
            node.child1 = null;
            node.child2 = null;
            node.height = -1;
            this.m_nodes[node.id] = node;
            return node;
        };
        DynamicTree.prototype.freeNode = function (node) {
            this.m_pool.release(node);
            node.height = -1;
            // tslint:disable-next-line:no-dynamic-delete
            delete this.m_nodes[node.id];
        };
        /**
         * Create a proxy in the tree as a leaf node. We return the index of the node
         * instead of a pointer so that we can grow the node pool.
         *
         * Create a proxy. Provide a tight fitting AABB and a userData pointer.
         */
        DynamicTree.prototype.createProxy = function (aabb, userData) {
            var node = this.allocateNode();
            node.aabb.set(aabb);
            // Fatten the aabb.
            AABB.extend(node.aabb, Settings.aabbExtension);
            node.userData = userData;
            node.height = 0;
            this.insertLeaf(node);
            return node.id;
        };
        /**
         * Destroy a proxy. This asserts if the id is invalid.
         */
        DynamicTree.prototype.destroyProxy = function (id) {
            var node = this.m_nodes[id];
            this.removeLeaf(node);
            this.freeNode(node);
        };
        /**
         * Move a proxy with a swepted AABB. If the proxy has moved outside of its
         * fattened AABB, then the proxy is removed from the tree and re-inserted.
         * Otherwise the function returns immediately.
         *
         * @param d Displacement
         *
         * @return true if the proxy was re-inserted.
         */
        DynamicTree.prototype.moveProxy = function (id, aabb, d) {
            var node = this.m_nodes[id];
            if (node.aabb.contains(aabb)) {
                return false;
            }
            this.removeLeaf(node);
            node.aabb.set(aabb);
            // Extend AABB.
            aabb = node.aabb;
            AABB.extend(aabb, Settings.aabbExtension);
            // Predict AABB displacement.
            // const d = Vec2.mul(Settings.aabbMultiplier, displacement);
            if (d.x < 0.0) {
                aabb.lowerBound.x += d.x * Settings.aabbMultiplier;
            }
            else {
                aabb.upperBound.x += d.x * Settings.aabbMultiplier;
            }
            if (d.y < 0.0) {
                aabb.lowerBound.y += d.y * Settings.aabbMultiplier;
            }
            else {
                aabb.upperBound.y += d.y * Settings.aabbMultiplier;
            }
            this.insertLeaf(node);
            return true;
        };
        DynamicTree.prototype.insertLeaf = function (leaf) {
            if (this.m_root == null) {
                this.m_root = leaf;
                this.m_root.parent = null;
                return;
            }
            // Find the best sibling for this node
            var leafAABB = leaf.aabb;
            var index = this.m_root;
            while (!index.isLeaf()) {
                var child1 = index.child1;
                var child2 = index.child2;
                var area = index.aabb.getPerimeter();
                var combinedAABB = new AABB();
                combinedAABB.combine(index.aabb, leafAABB);
                var combinedArea = combinedAABB.getPerimeter();
                // Cost of creating a new parent for this node and the new leaf
                var cost = 2.0 * combinedArea;
                // Minimum cost of pushing the leaf further down the tree
                var inheritanceCost = 2.0 * (combinedArea - area);
                // Cost of descending into child1
                var cost1 = void 0;
                if (child1.isLeaf()) {
                    var aabb = new AABB();
                    aabb.combine(leafAABB, child1.aabb);
                    cost1 = aabb.getPerimeter() + inheritanceCost;
                }
                else {
                    var aabb = new AABB();
                    aabb.combine(leafAABB, child1.aabb);
                    var oldArea = child1.aabb.getPerimeter();
                    var newArea = aabb.getPerimeter();
                    cost1 = (newArea - oldArea) + inheritanceCost;
                }
                // Cost of descending into child2
                var cost2 = void 0;
                if (child2.isLeaf()) {
                    var aabb = new AABB();
                    aabb.combine(leafAABB, child2.aabb);
                    cost2 = aabb.getPerimeter() + inheritanceCost;
                }
                else {
                    var aabb = new AABB();
                    aabb.combine(leafAABB, child2.aabb);
                    var oldArea = child2.aabb.getPerimeter();
                    var newArea = aabb.getPerimeter();
                    cost2 = newArea - oldArea + inheritanceCost;
                }
                // Descend according to the minimum cost.
                if (cost < cost1 && cost < cost2) {
                    break;
                }
                // Descend
                if (cost1 < cost2) {
                    index = child1;
                }
                else {
                    index = child2;
                }
            }
            var sibling = index;
            // Create a new parent.
            var oldParent = sibling.parent;
            var newParent = this.allocateNode();
            newParent.parent = oldParent;
            newParent.userData = null;
            newParent.aabb.combine(leafAABB, sibling.aabb);
            newParent.height = sibling.height + 1;
            if (oldParent != null) {
                // The sibling was not the root.
                if (oldParent.child1 === sibling) {
                    oldParent.child1 = newParent;
                }
                else {
                    oldParent.child2 = newParent;
                }
                newParent.child1 = sibling;
                newParent.child2 = leaf;
                sibling.parent = newParent;
                leaf.parent = newParent;
            }
            else {
                // The sibling was the root.
                newParent.child1 = sibling;
                newParent.child2 = leaf;
                sibling.parent = newParent;
                leaf.parent = newParent;
                this.m_root = newParent;
            }
            // Walk back up the tree fixing heights and AABBs
            index = leaf.parent;
            while (index != null) {
                index = this.balance(index);
                var child1 = index.child1;
                var child2 = index.child2;
                index.height = 1 + math$1.max(child1.height, child2.height);
                index.aabb.combine(child1.aabb, child2.aabb);
                index = index.parent;
            }
            // validate();
        };
        DynamicTree.prototype.removeLeaf = function (leaf) {
            if (leaf === this.m_root) {
                this.m_root = null;
                return;
            }
            var parent = leaf.parent;
            var grandParent = parent.parent;
            var sibling;
            if (parent.child1 === leaf) {
                sibling = parent.child2;
            }
            else {
                sibling = parent.child1;
            }
            if (grandParent != null) {
                // Destroy parent and connect sibling to grandParent.
                if (grandParent.child1 === parent) {
                    grandParent.child1 = sibling;
                }
                else {
                    grandParent.child2 = sibling;
                }
                sibling.parent = grandParent;
                this.freeNode(parent);
                // Adjust ancestor bounds.
                var index = grandParent;
                while (index != null) {
                    index = this.balance(index);
                    var child1 = index.child1;
                    var child2 = index.child2;
                    index.aabb.combine(child1.aabb, child2.aabb);
                    index.height = 1 + math$1.max(child1.height, child2.height);
                    index = index.parent;
                }
            }
            else {
                this.m_root = sibling;
                sibling.parent = null;
                this.freeNode(parent);
            }
            // validate();
        };
        /**
         * Perform a left or right rotation if node A is imbalanced. Returns the new
         * root index.
         */
        DynamicTree.prototype.balance = function (iA) {
            var A = iA;
            if (A.isLeaf() || A.height < 2) {
                return iA;
            }
            var B = A.child1;
            var C = A.child2;
            var balance = C.height - B.height;
            // Rotate C up
            if (balance > 1) {
                var F = C.child1;
                var G = C.child2;
                // Swap A and C
                C.child1 = A;
                C.parent = A.parent;
                A.parent = C;
                // A's old parent should point to C
                if (C.parent != null) {
                    if (C.parent.child1 === iA) {
                        C.parent.child1 = C;
                    }
                    else {
                        C.parent.child2 = C;
                    }
                }
                else {
                    this.m_root = C;
                }
                // Rotate
                if (F.height > G.height) {
                    C.child2 = F;
                    A.child2 = G;
                    G.parent = A;
                    A.aabb.combine(B.aabb, G.aabb);
                    C.aabb.combine(A.aabb, F.aabb);
                    A.height = 1 + math$1.max(B.height, G.height);
                    C.height = 1 + math$1.max(A.height, F.height);
                }
                else {
                    C.child2 = G;
                    A.child2 = F;
                    F.parent = A;
                    A.aabb.combine(B.aabb, F.aabb);
                    C.aabb.combine(A.aabb, G.aabb);
                    A.height = 1 + math$1.max(B.height, F.height);
                    C.height = 1 + math$1.max(A.height, G.height);
                }
                return C;
            }
            // Rotate B up
            if (balance < -1) {
                var D = B.child1;
                var E = B.child2;
                // Swap A and B
                B.child1 = A;
                B.parent = A.parent;
                A.parent = B;
                // A's old parent should point to B
                if (B.parent != null) {
                    if (B.parent.child1 === A) {
                        B.parent.child1 = B;
                    }
                    else {
                        B.parent.child2 = B;
                    }
                }
                else {
                    this.m_root = B;
                }
                // Rotate
                if (D.height > E.height) {
                    B.child2 = D;
                    A.child1 = E;
                    E.parent = A;
                    A.aabb.combine(C.aabb, E.aabb);
                    B.aabb.combine(A.aabb, D.aabb);
                    A.height = 1 + math$1.max(C.height, E.height);
                    B.height = 1 + math$1.max(A.height, D.height);
                }
                else {
                    B.child2 = E;
                    A.child1 = D;
                    D.parent = A;
                    A.aabb.combine(C.aabb, D.aabb);
                    B.aabb.combine(A.aabb, E.aabb);
                    A.height = 1 + math$1.max(C.height, D.height);
                    B.height = 1 + math$1.max(A.height, E.height);
                }
                return B;
            }
            return A;
        };
        /**
         * Compute the height of the binary tree in O(N) time. Should not be called
         * often.
         */
        DynamicTree.prototype.getHeight = function () {
            if (this.m_root == null) {
                return 0;
            }
            return this.m_root.height;
        };
        /**
         * Get the ratio of the sum of the node areas to the root area.
         */
        DynamicTree.prototype.getAreaRatio = function () {
            if (this.m_root == null) {
                return 0.0;
            }
            var root = this.m_root;
            var rootArea = root.aabb.getPerimeter();
            var totalArea = 0.0;
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                if (node.height < 0) {
                    // Free node in pool
                    continue;
                }
                totalArea += node.aabb.getPerimeter();
            }
            this.iteratorPool.release(it);
            return totalArea / rootArea;
        };
        /**
         * Compute the height of a sub-tree.
         */
        DynamicTree.prototype.computeHeight = function (id) {
            var node;
            if (typeof id !== 'undefined') {
                node = this.m_nodes[id];
            }
            else {
                node = this.m_root;
            }
            // _ASSERT && common.assert(0 <= id && id < this.m_nodeCapacity);
            if (node.isLeaf()) {
                return 0;
            }
            var height1 = this.computeHeight(node.child1.id);
            var height2 = this.computeHeight(node.child2.id);
            return 1 + math$1.max(height1, height2);
        };
        DynamicTree.prototype.validateStructure = function (node) {
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
        DynamicTree.prototype.validateMetrics = function (node) {
            if (node == null) {
                return;
            }
            var child1 = node.child1;
            var child2 = node.child2;
            if (node.isLeaf()) {
                return;
            }
            // _ASSERT && common.assert(0 <= child1 && child1 < this.m_nodeCapacity);
            // _ASSERT && common.assert(0 <= child2 && child2 < this.m_nodeCapacity);
            var height1 = child1.height;
            var height2 = child2.height;
            1 + math$1.max(height1, height2);
            var aabb = new AABB();
            aabb.combine(child1.aabb, child2.aabb);
            this.validateMetrics(child1);
            this.validateMetrics(child2);
        };
        /**
         * Validate this tree. For testing.
         */
        DynamicTree.prototype.validate = function () {
            this.validateStructure(this.m_root);
            this.validateMetrics(this.m_root);
        };
        /**
         * Get the maximum balance of an node in the tree. The balance is the difference
         * in height of the two children of a node.
         */
        DynamicTree.prototype.getMaxBalance = function () {
            var maxBalance = 0;
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                if (node.height <= 1) {
                    continue;
                }
                var balance = math$1.abs(node.child2.height - node.child1.height);
                maxBalance = math$1.max(maxBalance, balance);
            }
            this.iteratorPool.release(it);
            return maxBalance;
        };
        /**
         * Build an optimal tree. Very expensive. For testing.
         */
        DynamicTree.prototype.rebuildBottomUp = function () {
            var nodes = [];
            var count = 0;
            // Build array of leaves. Free the rest.
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                if (node.height < 0) {
                    // free node in pool
                    continue;
                }
                if (node.isLeaf()) {
                    node.parent = null;
                    nodes[count] = node;
                    ++count;
                }
                else {
                    this.freeNode(node);
                }
            }
            this.iteratorPool.release(it);
            while (count > 1) {
                var minCost = Infinity;
                var iMin = -1;
                var jMin = -1;
                for (var i = 0; i < count; ++i) {
                    var aabbi = nodes[i].aabb;
                    for (var j = i + 1; j < count; ++j) {
                        var aabbj = nodes[j].aabb;
                        var b = new AABB();
                        b.combine(aabbi, aabbj);
                        var cost = b.getPerimeter();
                        if (cost < minCost) {
                            iMin = i;
                            jMin = j;
                            minCost = cost;
                        }
                    }
                }
                var child1 = nodes[iMin];
                var child2 = nodes[jMin];
                var parent_1 = this.allocateNode();
                parent_1.child1 = child1;
                parent_1.child2 = child2;
                parent_1.height = 1 + math$1.max(child1.height, child2.height);
                parent_1.aabb.combine(child1.aabb, child2.aabb);
                parent_1.parent = null;
                child1.parent = parent_1;
                child2.parent = parent_1;
                nodes[jMin] = nodes[count - 1];
                nodes[iMin] = parent_1;
                --count;
            }
            this.m_root = nodes[0];
            this.validate();
        };
        /**
         * Shift the world origin. Useful for large worlds. The shift formula is:
         * position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        DynamicTree.prototype.shiftOrigin = function (newOrigin) {
            // Build array of leaves. Free the rest.
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
        /**
         * Query an AABB for overlapping proxies. The callback class is called for each
         * proxy that overlaps the supplied AABB.
         */
        DynamicTree.prototype.query = function (aabb, queryCallback) {
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
                    }
                    else {
                        stack.push(node.child1);
                        stack.push(node.child2);
                    }
                }
            }
            this.stackPool.release(stack);
        };
        /**
         * Ray-cast against the proxies in the tree. This relies on the callback to
         * perform a exact ray-cast in the case were the proxy contains a shape. The
         * callback also performs the any collision filtering. This has performance
         * roughly equal to k * log(n), where k is the number of collisions and n is the
         * number of proxies in the tree.
         *
         * @param input The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
         * @param rayCastCallback A function that is called for each proxy that is hit by the ray.
         */
        DynamicTree.prototype.rayCast = function (input, rayCastCallback) {
            var p1 = input.p1;
            var p2 = input.p2;
            var r = Vec2.sub(p2, p1);
            r.normalize();
            // v is perpendicular to the segment.
            var v = Vec2.crossNumVec2(1.0, r);
            var abs_v = Vec2.abs(v);
            // Separating axis for segment (Gino, p80).
            // |dot(v, p1 - c)| > dot(|v|, h)
            var maxFraction = input.maxFraction;
            // Build a bounding box for the segment.
            var segmentAABB = new AABB();
            var t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
            segmentAABB.combinePoints(p1, t);
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
                // Separating axis for segment (Gino, p80).
                // |dot(v, p1 - c)| > dot(|v|, h)
                var c = node.aabb.getCenter();
                var h = node.aabb.getExtents();
                var separation = math$1.abs(Vec2.dot(v, Vec2.sub(p1, c))) - Vec2.dot(abs_v, h);
                if (separation > 0.0) {
                    continue;
                }
                if (node.isLeaf()) {
                    subInput.p1 = Vec2.clone(input.p1);
                    subInput.p2 = Vec2.clone(input.p2);
                    subInput.maxFraction = maxFraction;
                    var value = rayCastCallback(subInput, node.id);
                    if (value === 0.0) {
                        // The client has terminated the ray cast.
                        return;
                    }
                    if (value > 0.0) {
                        // update segment bounding box.
                        maxFraction = value;
                        t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
                        segmentAABB.combinePoints(p1, t);
                    }
                }
                else {
                    stack.push(node.child1);
                    stack.push(node.child2);
                }
            }
            this.stackPool.release(stack);
            this.inputPool.release(subInput);
        };
        return DynamicTree;
    }());
    var Iterator = /** @class */ (function () {
        function Iterator() {
            this.parents = [];
            this.states = [];
        }
        Iterator.prototype.preorder = function (root) {
            this.parents.length = 0;
            this.parents.push(root);
            this.states.length = 0;
            this.states.push(0);
            return this;
        };
        Iterator.prototype.next = function () {
            while (this.parents.length > 0) {
                var i = this.parents.length - 1;
                var node = this.parents[i];
                if (this.states[i] === 0) {
                    this.states[i] = 1;
                    return node;
                }
                if (this.states[i] === 1) {
                    this.states[i] = 2;
                    if (node.child1) {
                        this.parents.push(node.child1);
                        this.states.push(1);
                        return node.child1;
                    }
                }
                if (this.states[i] === 2) {
                    this.states[i] = 3;
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
        Iterator.prototype.close = function () {
            this.parents.length = 0;
        };
        return Iterator;
    }());

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
    /**
     * The broad-phase wraps and extends a dynamic-tree to keep track of moved
     * objects and query them on update.
     */
    var BroadPhase = /** @class */ (function () {
        function BroadPhase() {
            var _this = this;
            this.m_tree = new DynamicTree();
            this.m_proxyCount = 0;
            this.m_moveBuffer = [];
            /**
             * Query an AABB for overlapping proxies. The callback class is called for each
             * proxy that overlaps the supplied AABB.
             */
            this.query = function (aabb, queryCallback) {
                _this.m_tree.query(aabb, queryCallback);
            };
            this.queryCallback = function (proxyId) {
                // A proxy cannot form a pair with itself.
                if (proxyId === _this.m_queryProxyId) {
                    return true;
                }
                var proxyIdA = math$1.min(proxyId, _this.m_queryProxyId);
                var proxyIdB = math$1.max(proxyId, _this.m_queryProxyId);
                // TODO: Skip any duplicate pairs.
                var userDataA = _this.m_tree.getUserData(proxyIdA);
                var userDataB = _this.m_tree.getUserData(proxyIdB);
                // Send the pairs back to the client.
                _this.m_callback(userDataA, userDataB);
                return true;
            };
        }
        /**
         * Get user data from a proxy. Returns null if the id is invalid.
         */
        BroadPhase.prototype.getUserData = function (proxyId) {
            return this.m_tree.getUserData(proxyId);
        };
        /**
         * Test overlap of fat AABBs.
         */
        BroadPhase.prototype.testOverlap = function (proxyIdA, proxyIdB) {
            var aabbA = this.m_tree.getFatAABB(proxyIdA);
            var aabbB = this.m_tree.getFatAABB(proxyIdB);
            return AABB.testOverlap(aabbA, aabbB);
        };
        /**
         * Get the fat AABB for a proxy.
         */
        BroadPhase.prototype.getFatAABB = function (proxyId) {
            return this.m_tree.getFatAABB(proxyId);
        };
        /**
         * Get the number of proxies.
         */
        BroadPhase.prototype.getProxyCount = function () {
            return this.m_proxyCount;
        };
        /**
         * Get the height of the embedded tree.
         */
        BroadPhase.prototype.getTreeHeight = function () {
            return this.m_tree.getHeight();
        };
        /**
         * Get the balance (integer) of the embedded tree.
         */
        BroadPhase.prototype.getTreeBalance = function () {
            return this.m_tree.getMaxBalance();
        };
        /**
         * Get the quality metric of the embedded tree.
         */
        BroadPhase.prototype.getTreeQuality = function () {
            return this.m_tree.getAreaRatio();
        };
        /**
         * Ray-cast against the proxies in the tree. This relies on the callback to
         * perform a exact ray-cast in the case were the proxy contains a shape. The
         * callback also performs the any collision filtering. This has performance
         * roughly equal to k * log(n), where k is the number of collisions and n is the
         * number of proxies in the tree.
         *
         * @param input The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
         * @param rayCastCallback A function that is called for each proxy that is hit by the ray.
         */
        BroadPhase.prototype.rayCast = function (input, rayCastCallback) {
            this.m_tree.rayCast(input, rayCastCallback);
        };
        /**
         * Shift the world origin. Useful for large worlds. The shift formula is:
         * position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        BroadPhase.prototype.shiftOrigin = function (newOrigin) {
            this.m_tree.shiftOrigin(newOrigin);
        };
        /**
         * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
         * is called.
         */
        BroadPhase.prototype.createProxy = function (aabb, userData) {
            var proxyId = this.m_tree.createProxy(aabb, userData);
            this.m_proxyCount++;
            this.bufferMove(proxyId);
            return proxyId;
        };
        /**
         * Destroy a proxy. It is up to the client to remove any pairs.
         */
        BroadPhase.prototype.destroyProxy = function (proxyId) {
            this.unbufferMove(proxyId);
            this.m_proxyCount--;
            this.m_tree.destroyProxy(proxyId);
        };
        /**
         * Call moveProxy as many times as you like, then when you are done call
         * UpdatePairs to finalized the proxy pairs (for your time step).
         */
        BroadPhase.prototype.moveProxy = function (proxyId, aabb, displacement) {
            var changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
            if (changed) {
                this.bufferMove(proxyId);
            }
        };
        /**
         * Call to trigger a re-processing of it's pairs on the next call to
         * UpdatePairs.
         */
        BroadPhase.prototype.touchProxy = function (proxyId) {
            this.bufferMove(proxyId);
        };
        BroadPhase.prototype.bufferMove = function (proxyId) {
            this.m_moveBuffer.push(proxyId);
        };
        BroadPhase.prototype.unbufferMove = function (proxyId) {
            for (var i = 0; i < this.m_moveBuffer.length; ++i) {
                if (this.m_moveBuffer[i] === proxyId) {
                    this.m_moveBuffer[i] = null;
                }
            }
        };
        /**
         * Update the pairs. This results in pair callbacks. This can only add pairs.
         */
        BroadPhase.prototype.updatePairs = function (addPairCallback) {
            this.m_callback = addPairCallback;
            // Perform tree queries for all moving proxies.
            while (this.m_moveBuffer.length > 0) {
                this.m_queryProxyId = this.m_moveBuffer.pop();
                if (this.m_queryProxyId === null) {
                    continue;
                }
                // We have to query the tree with the fat AABB so that
                // we don't fail to create a pair that may touch later.
                var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
                // Query tree, create pairs and add them pair buffer.
                this.m_tree.query(fatAABB, this.queryCallback);
            }
            // Try to keep the tree balanced.
            // this.m_tree.rebalance(4);
        };
        return BroadPhase;
    }());

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
    var Rot = /** @class */ (function () {
        /** Initialize from an angle in radians. */
        function Rot(angle) {
            if (!(this instanceof Rot)) {
                return new Rot(angle);
            }
            if (typeof angle === 'number') {
                this.setAngle(angle);
            }
            else if (typeof angle === 'object') {
                this.setRot(angle);
            }
            else {
                this.setIdentity();
            }
        }
        /** @internal */
        Rot.neo = function (angle) {
            var obj = Object.create(Rot.prototype);
            obj.setAngle(angle);
            return obj;
        };
        Rot.clone = function (rot) {
            var obj = Object.create(Rot.prototype);
            obj.s = rot.s;
            obj.c = rot.c;
            return obj;
        };
        Rot.identity = function () {
            var obj = Object.create(Rot.prototype);
            obj.s = 0.0;
            obj.c = 1.0;
            return obj;
        };
        Rot.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return math$1.isFinite(obj.s) && math$1.isFinite(obj.c);
        };
        Rot.assert = function (o) {
            return;
        };
        /** Set to the identity rotation. */
        Rot.prototype.setIdentity = function () {
            this.s = 0.0;
            this.c = 1.0;
        };
        Rot.prototype.set = function (angle) {
            if (typeof angle === 'object') {
                this.s = angle.s;
                this.c = angle.c;
            }
            else {
                // TODO_ERIN optimize
                this.s = math$1.sin(angle);
                this.c = math$1.cos(angle);
            }
        };
        Rot.prototype.setRot = function (angle) {
            this.s = angle.s;
            this.c = angle.c;
        };
        /** Set using an angle in radians. */
        Rot.prototype.setAngle = function (angle) {
            // TODO_ERIN optimize
            this.s = math$1.sin(angle);
            this.c = math$1.cos(angle);
        };
        /** Get the angle in radians. */
        Rot.prototype.getAngle = function () {
            return math$1.atan2(this.s, this.c);
        };
        /** Get the x-axis. */
        Rot.prototype.getXAxis = function () {
            return Vec2.neo(this.c, this.s);
        };
        /** Get the u-axis. */
        Rot.prototype.getYAxis = function () {
            return Vec2.neo(-this.s, this.c);
        };
        // tslint:disable-next-line:typedef
        Rot.mul = function (rot, m) {
            if ('c' in m && 's' in m) {
                // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
                // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
                // s = qs * rc + qc * rs
                // c = qc * rc - qs * rs
                var qr = Rot.identity();
                qr.s = rot.s * m.c + rot.c * m.s;
                qr.c = rot.c * m.c - rot.s * m.s;
                return qr;
            }
            else if ('x' in m && 'y' in m) {
                return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
            }
        };
        /** Multiply two rotations: q * r */
        Rot.mulRot = function (rot, m) {
            // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
            // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
            // s = qs * rc + qc * rs
            // c = qc * rc - qs * rs
            var qr = Rot.identity();
            qr.s = rot.s * m.c + rot.c * m.s;
            qr.c = rot.c * m.c - rot.s * m.s;
            return qr;
        };
        /** Rotate a vector */
        Rot.mulVec2 = function (rot, m) {
            return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
        };
        Rot.mulSub = function (rot, v, w) {
            var x = rot.c * (v.x - w.x) - rot.s * (v.y - w.y);
            var y = rot.s * (v.x - w.x) + rot.c * (v.y - w.y);
            return Vec2.neo(x, y);
        };
        // tslint:disable-next-line:typedef
        Rot.mulT = function (rot, m) {
            if ('c' in m && 's' in m) {
                // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
                // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
                // s = qc * rs - qs * rc
                // c = qc * rc + qs * rs
                var qr = Rot.identity();
                qr.s = rot.c * m.s - rot.s * m.c;
                qr.c = rot.c * m.c + rot.s * m.s;
                return qr;
            }
            else if ('x' in m && 'y' in m) {
                return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
            }
        };
        /** Transpose multiply two rotations: qT * r */
        Rot.mulTRot = function (rot, m) {
            // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
            // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
            // s = qc * rs - qs * rc
            // c = qc * rc + qs * rs
            var qr = Rot.identity();
            qr.s = rot.c * m.s - rot.s * m.c;
            qr.c = rot.c * m.c + rot.s * m.s;
            return qr;
        };
        /** Inverse rotate a vector */
        Rot.mulTVec2 = function (rot, m) {
            return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
        };
        return Rot;
    }());

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
    /**
     * A transform contains translation and rotation. It is used to represent the
     * position and orientation of rigid frames. Initialize using a position vector
     * and a rotation.
     */
    var Transform = /** @class */ (function () {
        function Transform(position, rotation) {
            if (!(this instanceof Transform)) {
                return new Transform(position, rotation);
            }
            this.p = Vec2.zero();
            this.q = Rot.identity();
            if (typeof position !== 'undefined') {
                this.p.setVec2(position);
            }
            if (typeof rotation !== 'undefined') {
                this.q.setAngle(rotation);
            }
        }
        Transform.clone = function (xf) {
            var obj = Object.create(Transform.prototype);
            obj.p = Vec2.clone(xf.p);
            obj.q = Rot.clone(xf.q);
            return obj;
        };
        /** @internal */
        Transform.neo = function (position, rotation) {
            var obj = Object.create(Transform.prototype);
            obj.p = Vec2.clone(position);
            obj.q = Rot.clone(rotation);
            return obj;
        };
        Transform.identity = function () {
            var obj = Object.create(Transform.prototype);
            obj.p = Vec2.zero();
            obj.q = Rot.identity();
            return obj;
        };
        /**
         * Set this to the identity transform.
         */
        Transform.prototype.setIdentity = function () {
            this.p.setZero();
            this.q.setIdentity();
        };
        /**
         * Set this based on the position and angle.
         */
        // tslint:disable-next-line:typedef
        Transform.prototype.set = function (a, b) {
            if (typeof b === 'undefined') {
                this.p.set(a.p);
                this.q.set(a.q);
            }
            else {
                this.p.set(a);
                this.q.set(b);
            }
        };
        /**
         * Set this based on the position and angle.
         */
        Transform.prototype.setNum = function (position, rotation) {
            this.p.setVec2(position);
            this.q.setAngle(rotation);
        };
        Transform.prototype.setTransform = function (xf) {
            this.p.setVec2(xf.p);
            this.q.setRot(xf.q);
        };
        Transform.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
        };
        Transform.assert = function (o) {
            return;
        };
        // static mul(a: Transform, b: Vec2[]): Vec2[];
        // static mul(a: Transform, b: Transform[]): Transform[];
        // tslint:disable-next-line:typedef
        Transform.mul = function (a, b) {
            if (Array.isArray(b)) {
                var arr = [];
                for (var i = 0; i < b.length; i++) {
                    arr[i] = Transform.mul(a, b[i]);
                }
                return arr;
            }
            else if ('x' in b && 'y' in b) {
                return Transform.mulVec2(a, b);
            }
            else if ('p' in b && 'q' in b) {
                return Transform.mulXf(a, b);
            }
        };
        // tslint:disable-next-line:typedef
        Transform.mulAll = function (a, b) {
            var arr = [];
            for (var i = 0; i < b.length; i++) {
                arr[i] = Transform.mul(a, b[i]);
            }
            return arr;
        };
        /** @internal @deprecated */
        // tslint:disable-next-line:typedef
        Transform.mulFn = function (a) {
            return function (b) {
                return Transform.mul(a, b);
            };
        };
        Transform.mulVec2 = function (a, b) {
            var x = (a.q.c * b.x - a.q.s * b.y) + a.p.x;
            var y = (a.q.s * b.x + a.q.c * b.y) + a.p.y;
            return Vec2.neo(x, y);
        };
        Transform.mulXf = function (a, b) {
            // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
            // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
            var xf = Transform.identity();
            xf.q = Rot.mulRot(a.q, b.q);
            xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
            return xf;
        };
        // tslint:disable-next-line:typedef
        Transform.mulT = function (a, b) {
            if ('x' in b && 'y' in b) {
                return Transform.mulTVec2(a, b);
            }
            else if ('p' in b && 'q' in b) {
                return Transform.mulTXf(a, b);
            }
        };
        Transform.mulTVec2 = function (a, b) {
            var px = b.x - a.p.x;
            var py = b.y - a.p.y;
            var x = (a.q.c * px + a.q.s * py);
            var y = (-a.q.s * px + a.q.c * py);
            return Vec2.neo(x, y);
        };
        Transform.mulTXf = function (a, b) {
            // v2 = A.q' * (B.q * v1 + B.p - A.p)
            // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
            var xf = Transform.identity();
            xf.q.setRot(Rot.mulTRot(a.q, b.q));
            xf.p.setVec2(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
            return xf;
        };
        return Transform;
    }());

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
    /**
     * This describes the motion of a body/shape for TOI computation. Shapes are
     * defined with respect to the body origin, which may not coincide with the
     * center of mass. However, to support dynamics we must interpolate the center
     * of mass position.
     */
    var Sweep = /** @class */ (function () {
        function Sweep(c, a) {
            this.localCenter = Vec2.zero();
            this.c = Vec2.zero();
            this.a = 0;
            this.alpha0 = 0;
            this.c0 = Vec2.zero();
            this.a0 = 0;
        }
        Sweep.prototype.setTransform = function (xf) {
            var c = Transform.mulVec2(xf, this.localCenter);
            this.c.setVec2(c);
            this.c0.setVec2(c);
            this.a = xf.q.getAngle();
            this.a0 = xf.q.getAngle();
        };
        Sweep.prototype.setLocalCenter = function (localCenter, xf) {
            this.localCenter.setVec2(localCenter);
            var c = Transform.mulVec2(xf, this.localCenter);
            this.c.setVec2(c);
            this.c0.setVec2(c);
        };
        /**
         * Get the interpolated transform at a specific time.
         *
         * @param xf
         * @param beta A factor in [0,1], where 0 indicates alpha0
         */
        Sweep.prototype.getTransform = function (xf, beta) {
            if (beta === void 0) { beta = 0; }
            xf.q.setAngle((1.0 - beta) * this.a0 + beta * this.a);
            xf.p.setCombine((1.0 - beta), this.c0, beta, this.c);
            // shift to origin
            xf.p.sub(Rot.mulVec2(xf.q, this.localCenter));
        };
        /**
         * Advance the sweep forward, yielding a new initial state.
         *
         * @param alpha The new initial time
         */
        Sweep.prototype.advance = function (alpha) {
            var beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
            this.c0.setCombine(beta, this.c, 1 - beta, this.c0);
            this.a0 = beta * this.a + (1 - beta) * this.a0;
            this.alpha0 = alpha;
        };
        Sweep.prototype.forward = function () {
            this.a0 = this.a;
            this.c0.setVec2(this.c);
        };
        /**
         * normalize the angles in radians to be between -pi and pi.
         */
        Sweep.prototype.normalize = function () {
            var a0 = math$1.mod(this.a0, -math$1.PI, +math$1.PI);
            this.a -= this.a0 - a0;
            this.a0 = a0;
        };
        Sweep.prototype.clone = function () {
            var clone = new Sweep();
            clone.localCenter.setVec2(this.localCenter);
            clone.alpha0 = this.alpha0;
            clone.a0 = this.a0;
            clone.a = this.a;
            clone.c0.setVec2(this.c0);
            clone.c.setVec2(this.c);
            return clone;
        };
        Sweep.prototype.set = function (that) {
            this.localCenter.setVec2(that.localCenter);
            this.alpha0 = that.alpha0;
            this.a0 = that.a0;
            this.a = that.a;
            this.c0.setVec2(that.c0);
            this.c.setVec2(that.c);
        };
        return Sweep;
    }());

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
    var Velocity = /** @class */ (function () {
        function Velocity() {
            this.v = Vec2.zero();
            this.w = 0;
        }
        return Velocity;
    }());

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
    var Position = /** @class */ (function () {
        function Position() {
            this.c = Vec2.zero();
            this.a = 0;
        }
        Position.prototype.getTransform = function (xf, p) {
            xf.q.setAngle(this.a);
            xf.p.setVec2(Vec2.sub(this.c, Rot.mulVec2(xf.q, p)));
            return xf;
        };
        return Position;
    }());

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
    /**
     * A shape is used for collision detection. You can create a shape however you
     * like. Shapes used for simulation in World are created automatically when a
     * Fixture is created. Shapes may encapsulate one or more child shapes.
     */
    var Shape = /** @class */ (function () {
        function Shape() {
        }
        /** @internal */
        Shape.prototype._reset = function () {
        };
        Shape.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return typeof obj.m_type === 'string' && typeof obj.m_radius === 'number';
        };
        Shape.prototype.getRadius = function () {
            return this.m_radius;
        };
        /**
         * Get the type of this shape. You can use this to down cast to the concrete
         * shape.
         *
         * @return the shape type.
         */
        Shape.prototype.getType = function () {
            return this.m_type;
        };
        return Shape;
    }());

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
    var FixtureDefDefault = {
        userData: null,
        friction: 0.2,
        restitution: 0.0,
        density: 0.0,
        isSensor: false,
        filterGroupIndex: 0,
        filterCategoryBits: 0x0001,
        filterMaskBits: 0xFFFF
    };
    /**
     * This proxy is used internally to connect shape children to the broad-phase.
     */
    var FixtureProxy = /** @class */ (function () {
        function FixtureProxy(fixture, childIndex) {
            this.aabb = new AABB();
            this.fixture = fixture;
            this.childIndex = childIndex;
            this.proxyId;
        }
        return FixtureProxy;
    }());
    /**
     * A fixture is used to attach a shape to a body for collision detection. A
     * fixture inherits its transform from its parent. Fixtures hold additional
     * non-geometric data such as friction, collision filters, etc.
     *
     * To create a new Fixture use {@link Body.createFixture}.
     */
    var Fixture = /** @class */ (function () {
        // tslint:disable-next-line:typedef
        /** @internal */ function Fixture(body, shape, def) {
            if (shape.shape) {
                def = shape;
                shape = shape.shape;
            }
            else if (typeof def === 'number') {
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
            // TODO validate shape
            this.m_shape = shape; // .clone();
            this.m_next = null;
            this.m_proxies = [];
            this.m_proxyCount = 0;
            var childCount = this.m_shape.getChildCount();
            for (var i = 0; i < childCount; ++i) {
                this.m_proxies[i] = new FixtureProxy(this, i);
            }
            this.m_userData = def.userData;
        }
        /**
         * Re-setup fixture.
         * @internal
         */
        Fixture.prototype._reset = function () {
            var body = this.getBody();
            var broadPhase = body.m_world.m_broadPhase;
            this.destroyProxies(broadPhase);
            if (this.m_shape._reset) {
                this.m_shape._reset();
            }
            var childCount = this.m_shape.getChildCount();
            for (var i = 0; i < childCount; ++i) {
                this.m_proxies[i] = new FixtureProxy(this, i);
            }
            this.createProxies(broadPhase, body.m_xf);
            body.resetMassData();
        };
        /** @internal */
        Fixture.prototype._serialize = function () {
            return {
                friction: this.m_friction,
                restitution: this.m_restitution,
                density: this.m_density,
                isSensor: this.m_isSensor,
                filterGroupIndex: this.m_filterGroupIndex,
                filterCategoryBits: this.m_filterCategoryBits,
                filterMaskBits: this.m_filterMaskBits,
                shape: this.m_shape,
            };
        };
        /** @internal */
        Fixture._deserialize = function (data, body, restore) {
            var shape = restore(Shape, data.shape);
            var fixture = shape && new Fixture(body, shape, data);
            return fixture;
        };
        /**
         * Get the type of the child shape. You can use this to down cast to the
         * concrete shape.
         */
        Fixture.prototype.getType = function () {
            return this.m_shape.getType();
        };
        /**
         * Get the child shape. You can modify the child shape, however you should not
         * change the number of vertices because this will crash some collision caching
         * mechanisms. Manipulating the shape may lead to non-physical behavior.
         */
        Fixture.prototype.getShape = function () {
            return this.m_shape;
        };
        /**
         * A sensor shape collects contact information but never generates a collision
         * response.
         */
        Fixture.prototype.isSensor = function () {
            return this.m_isSensor;
        };
        /**
         * Set if this fixture is a sensor.
         */
        Fixture.prototype.setSensor = function (sensor) {
            if (sensor != this.m_isSensor) {
                this.m_body.setAwake(true);
                this.m_isSensor = sensor;
            }
        };
        // /**
        //  * Get the contact filtering data.
        //  */
        // getFilterData() {
        //   return this.m_filter;
        // }
        /**
         * Get the user data that was assigned in the fixture definition. Use this to
         * store your application specific data.
         */
        Fixture.prototype.getUserData = function () {
            return this.m_userData;
        };
        /**
         * Set the user data. Use this to store your application specific data.
         */
        Fixture.prototype.setUserData = function (data) {
            this.m_userData = data;
        };
        /**
         * Get the parent body of this fixture. This is null if the fixture is not
         * attached.
         */
        Fixture.prototype.getBody = function () {
            return this.m_body;
        };
        /**
         * Get the next fixture in the parent body's fixture list.
         */
        Fixture.prototype.getNext = function () {
            return this.m_next;
        };
        /**
         * Get the density of this fixture.
         */
        Fixture.prototype.getDensity = function () {
            return this.m_density;
        };
        /**
         * Set the density of this fixture. This will _not_ automatically adjust the
         * mass of the body. You must call Body.resetMassData to update the body's mass.
         */
        Fixture.prototype.setDensity = function (density) {
            this.m_density = density;
        };
        /**
         * Get the coefficient of friction, usually in the range [0,1].
         */
        Fixture.prototype.getFriction = function () {
            return this.m_friction;
        };
        /**
         * Set the coefficient of friction. This will not change the friction of
         * existing contacts.
         */
        Fixture.prototype.setFriction = function (friction) {
            this.m_friction = friction;
        };
        /**
         * Get the coefficient of restitution.
         */
        Fixture.prototype.getRestitution = function () {
            return this.m_restitution;
        };
        /**
         * Set the coefficient of restitution. This will not change the restitution of
         * existing contacts.
         */
        Fixture.prototype.setRestitution = function (restitution) {
            this.m_restitution = restitution;
        };
        /**
         * Test a point in world coordinates for containment in this fixture.
         */
        Fixture.prototype.testPoint = function (p) {
            return this.m_shape.testPoint(this.m_body.getTransform(), p);
        };
        /**
         * Cast a ray against this shape.
         */
        Fixture.prototype.rayCast = function (output, input, childIndex) {
            return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
        };
        /**
         * Get the mass data for this fixture. The mass data is based on the density and
         * the shape. The rotational inertia is about the shape's origin. This operation
         * may be expensive.
         */
        Fixture.prototype.getMassData = function (massData) {
            this.m_shape.computeMass(massData, this.m_density);
        };
        /**
         * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
         * more accurate AABB, compute it using the shape and the body transform.
         */
        Fixture.prototype.getAABB = function (childIndex) {
            return this.m_proxies[childIndex].aabb;
        };
        /**
         * These support body activation/deactivation.
         */
        Fixture.prototype.createProxies = function (broadPhase, xf) {
            // Create proxies in the broad-phase.
            this.m_proxyCount = this.m_shape.getChildCount();
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                this.m_shape.computeAABB(proxy.aabb, xf, i);
                proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
            }
        };
        Fixture.prototype.destroyProxies = function (broadPhase) {
            // Destroy proxies in the broad-phase.
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                broadPhase.destroyProxy(proxy.proxyId);
                proxy.proxyId = null;
            }
            this.m_proxyCount = 0;
        };
        /**
         * Updates this fixture proxy in broad-phase (with combined AABB of current and
         * next transformation).
         */
        Fixture.prototype.synchronize = function (broadPhase, xf1, xf2) {
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                // Compute an AABB that covers the swept shape (may miss some rotation
                // effect).
                var aabb1 = new AABB();
                var aabb2 = new AABB();
                this.m_shape.computeAABB(aabb1, xf1, proxy.childIndex);
                this.m_shape.computeAABB(aabb2, xf2, proxy.childIndex);
                proxy.aabb.combine(aabb1, aabb2);
                var displacement = Vec2.sub(xf2.p, xf1.p);
                broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
            }
        };
        /**
         * Set the contact filtering data. This will not update contacts until the next
         * time step when either parent body is active and awake. This automatically
         * calls refilter.
         */
        Fixture.prototype.setFilterData = function (filter) {
            this.m_filterGroupIndex = filter.groupIndex;
            this.m_filterCategoryBits = filter.categoryBits;
            this.m_filterMaskBits = filter.maskBits;
            this.refilter();
        };
        Fixture.prototype.getFilterGroupIndex = function () {
            return this.m_filterGroupIndex;
        };
        Fixture.prototype.setFilterGroupIndex = function (groupIndex) {
            this.m_filterGroupIndex = groupIndex;
        };
        Fixture.prototype.getFilterCategoryBits = function () {
            return this.m_filterCategoryBits;
        };
        Fixture.prototype.setFilterCategoryBits = function (categoryBits) {
            this.m_filterCategoryBits = categoryBits;
        };
        Fixture.prototype.getFilterMaskBits = function () {
            return this.m_filterMaskBits;
        };
        Fixture.prototype.setFilterMaskBits = function (maskBits) {
            this.m_filterMaskBits = maskBits;
        };
        /**
         * Call this if you want to establish collision that was previously disabled by
         * ContactFilter.
         */
        Fixture.prototype.refilter = function () {
            if (this.m_body == null) {
                return;
            }
            // Flag associated contacts for filtering.
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
            // Touch each proxy so that new pairs may be created
            var broadPhase = world.m_broadPhase;
            for (var i = 0; i < this.m_proxyCount; ++i) {
                broadPhase.touchProxy(this.m_proxies[i].proxyId);
            }
        };
        /**
         * Implement this method to provide collision filtering, if you want finer
         * control over contact creation.
         *
         * Return true if contact calculations should be performed between these two
         * fixtures.
         *
         * Warning: for performance reasons this is only called when the AABBs begin to
         * overlap.
         */
        Fixture.prototype.shouldCollide = function (that) {
            if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
                return that.m_filterGroupIndex > 0;
            }
            var collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
            var collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
            var collide = collideA && collideB;
            return collide;
        };
        return Fixture;
    }());

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
    var STATIC = 'static';
    var KINEMATIC = 'kinematic';
    var DYNAMIC = 'dynamic';
    var BodyDefDefault = {
        type: STATIC,
        position: Vec2.zero(),
        angle: 0.0,
        linearVelocity: Vec2.zero(),
        angularVelocity: 0.0,
        linearDamping: 0.0,
        angularDamping: 0.0,
        fixedRotation: false,
        bullet: false,
        gravityScale: 1.0,
        allowSleep: true,
        awake: true,
        active: true,
        userData: null
    };
    /**
     * MassData This holds the mass data computed for a shape.
     */
    var MassData = /** @class */ (function () {
        function MassData() {
            /** The mass of the shape, usually in kilograms. */
            this.mass = 0;
            /** The position of the shape's centroid relative to the shape's origin. */
            this.center = Vec2.zero();
            /** The rotational inertia of the shape about the local origin. */
            this.I = 0;
        }
        return MassData;
    }());
    /**
     * A rigid body composed of one or more fixtures.
     *
     * To create a new Body use {@link World.createBody}.
     */
    var Body = /** @class */ (function () {
        /** @internal */
        function Body(world, def) {
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
                this.m_mass = 1.0;
                this.m_invMass = 1.0;
            }
            else {
                this.m_mass = 0.0;
                this.m_invMass = 0.0;
            }
            // Rotational inertia about the center of mass.
            this.m_I = 0.0;
            this.m_invI = 0.0;
            // the body origin transform
            this.m_xf = Transform.identity();
            this.m_xf.p = Vec2.clone(def.position);
            this.m_xf.q.setAngle(def.angle);
            // the swept motion for CCD
            this.m_sweep = new Sweep();
            this.m_sweep.setTransform(this.m_xf);
            // position and velocity correction
            this.c_velocity = new Velocity();
            this.c_position = new Position();
            this.m_force = Vec2.zero();
            this.m_torque = 0.0;
            this.m_linearVelocity = Vec2.clone(def.linearVelocity);
            this.m_angularVelocity = def.angularVelocity;
            this.m_linearDamping = def.linearDamping;
            this.m_angularDamping = def.angularDamping;
            this.m_gravityScale = def.gravityScale;
            this.m_sleepTime = 0.0;
            this.m_jointList = null;
            this.m_contactList = null;
            this.m_fixtureList = null;
            this.m_prev = null;
            this.m_next = null;
            this.m_destroyed = false;
        }
        /** @internal */
        Body.prototype._serialize = function () {
            var fixtures = [];
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                fixtures.push(f);
            }
            return {
                type: this.m_type,
                bullet: this.m_bulletFlag,
                position: this.m_xf.p,
                angle: this.m_xf.q.getAngle(),
                linearVelocity: this.m_linearVelocity,
                angularVelocity: this.m_angularVelocity,
                fixtures: fixtures,
            };
        };
        /** @internal */
        Body._deserialize = function (data, world, restore) {
            var body = new Body(world, data);
            if (data.fixtures) {
                for (var i = data.fixtures.length - 1; i >= 0; i--) {
                    var fixture = restore(Fixture, data.fixtures[i], body);
                    body._addFixture(fixture);
                }
            }
            return body;
        };
        Body.prototype.isWorldLocked = function () {
            return this.m_world && this.m_world.isLocked() ? true : false;
        };
        Body.prototype.getWorld = function () {
            return this.m_world;
        };
        Body.prototype.getNext = function () {
            return this.m_next;
        };
        Body.prototype.setUserData = function (data) {
            this.m_userData = data;
        };
        Body.prototype.getUserData = function () {
            return this.m_userData;
        };
        Body.prototype.getFixtureList = function () {
            return this.m_fixtureList;
        };
        Body.prototype.getJointList = function () {
            return this.m_jointList;
        };
        /**
         * Warning: this list changes during the time step and you may miss some
         * collisions if you don't use ContactListener.
         */
        Body.prototype.getContactList = function () {
            return this.m_contactList;
        };
        Body.prototype.isStatic = function () {
            return this.m_type == STATIC;
        };
        Body.prototype.isDynamic = function () {
            return this.m_type == DYNAMIC;
        };
        Body.prototype.isKinematic = function () {
            return this.m_type == KINEMATIC;
        };
        /**
         * This will alter the mass and velocity.
         */
        Body.prototype.setStatic = function () {
            this.setType(STATIC);
            return this;
        };
        Body.prototype.setDynamic = function () {
            this.setType(DYNAMIC);
            return this;
        };
        Body.prototype.setKinematic = function () {
            this.setType(KINEMATIC);
            return this;
        };
        /**
         * @internal
         */
        Body.prototype.getType = function () {
            return this.m_type;
        };
        /**
         * @internal
         */
        Body.prototype.setType = function (type) {
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
                this.m_angularVelocity = 0.0;
                this.m_sweep.forward();
                this.synchronizeFixtures();
            }
            this.setAwake(true);
            this.m_force.setZero();
            this.m_torque = 0.0;
            // Delete the attached contacts.
            var ce = this.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.m_world.destroyContact(ce0.contact);
            }
            this.m_contactList = null;
            // Touch the proxies so that new contacts will be created (when appropriate)
            var broadPhase = this.m_world.m_broadPhase;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                var proxyCount = f.m_proxyCount;
                for (var i = 0; i < proxyCount; ++i) {
                    broadPhase.touchProxy(f.m_proxies[i].proxyId);
                }
            }
        };
        Body.prototype.isBullet = function () {
            return this.m_bulletFlag;
        };
        /**
         * Should this body be treated like a bullet for continuous collision detection?
         */
        Body.prototype.setBullet = function (flag) {
            this.m_bulletFlag = !!flag;
        };
        Body.prototype.isSleepingAllowed = function () {
            return this.m_autoSleepFlag;
        };
        Body.prototype.setSleepingAllowed = function (flag) {
            this.m_autoSleepFlag = !!flag;
            if (this.m_autoSleepFlag == false) {
                this.setAwake(true);
            }
        };
        Body.prototype.isAwake = function () {
            return this.m_awakeFlag;
        };
        /**
         * Set the sleep state of the body. A sleeping body has very low CPU cost.
         *
         * @param flag Set to true to wake the body, false to put it to sleep.
         */
        Body.prototype.setAwake = function (flag) {
            if (flag) {
                if (this.m_awakeFlag == false) {
                    this.m_awakeFlag = true;
                    this.m_sleepTime = 0.0;
                }
            }
            else {
                this.m_awakeFlag = false;
                this.m_sleepTime = 0.0;
                this.m_linearVelocity.setZero();
                this.m_angularVelocity = 0.0;
                this.m_force.setZero();
                this.m_torque = 0.0;
            }
        };
        Body.prototype.isActive = function () {
            return this.m_activeFlag;
        };
        /**
         * Set the active state of the body. An inactive body is not simulated and
         * cannot be collided with or woken up. If you pass a flag of true, all fixtures
         * will be added to the broad-phase. If you pass a flag of false, all fixtures
         * will be removed from the broad-phase and all contacts will be destroyed.
         * Fixtures and joints are otherwise unaffected.
         *
         * You may continue to create/destroy fixtures and joints on inactive bodies.
         * Fixtures on an inactive body are implicitly inactive and will not participate
         * in collisions, ray-casts, or queries. Joints connected to an inactive body
         * are implicitly inactive. An inactive body is still owned by a World object
         * and remains
         */
        Body.prototype.setActive = function (flag) {
            if (flag == this.m_activeFlag) {
                return;
            }
            this.m_activeFlag = !!flag;
            if (this.m_activeFlag) {
                // Create all proxies.
                var broadPhase = this.m_world.m_broadPhase;
                for (var f = this.m_fixtureList; f; f = f.m_next) {
                    f.createProxies(broadPhase, this.m_xf);
                }
                // Contacts are created the next time step.
            }
            else {
                // Destroy all proxies.
                var broadPhase = this.m_world.m_broadPhase;
                for (var f = this.m_fixtureList; f; f = f.m_next) {
                    f.destroyProxies(broadPhase);
                }
                // Destroy the attached contacts.
                var ce = this.m_contactList;
                while (ce) {
                    var ce0 = ce;
                    ce = ce.next;
                    this.m_world.destroyContact(ce0.contact);
                }
                this.m_contactList = null;
            }
        };
        Body.prototype.isFixedRotation = function () {
            return this.m_fixedRotationFlag;
        };
        /**
         * Set this body to have fixed rotation. This causes the mass to be reset.
         */
        Body.prototype.setFixedRotation = function (flag) {
            if (this.m_fixedRotationFlag == flag) {
                return;
            }
            this.m_fixedRotationFlag = !!flag;
            this.m_angularVelocity = 0.0;
            this.resetMassData();
        };
        /**
         * Get the world transform for the body's origin.
         */
        Body.prototype.getTransform = function () {
            return this.m_xf;
        };
        /**
         * Set the position of the body's origin and rotation. Manipulating a body's
         * transform may cause non-physical behavior. Note: contacts are updated on the
         * next call to World.step.
         *
         * @param position The world position of the body's local origin.
         * @param angle The world rotation in radians.
         */
        Body.prototype.setTransform = function (position, angle) {
            if (this.isWorldLocked() == true) {
                return;
            }
            this.m_xf.setNum(position, angle);
            this.m_sweep.setTransform(this.m_xf);
            var broadPhase = this.m_world.m_broadPhase;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.synchronize(broadPhase, this.m_xf, this.m_xf);
            }
        };
        Body.prototype.synchronizeTransform = function () {
            this.m_sweep.getTransform(this.m_xf, 1);
        };
        /**
         * Update fixtures in broad-phase.
         */
        Body.prototype.synchronizeFixtures = function () {
            var xf = Transform.identity();
            this.m_sweep.getTransform(xf, 0);
            var broadPhase = this.m_world.m_broadPhase;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.synchronize(broadPhase, xf, this.m_xf);
            }
        };
        /**
         * Used in TOI.
         */
        Body.prototype.advance = function (alpha) {
            // Advance to the new safe time. This doesn't sync the broad-phase.
            this.m_sweep.advance(alpha);
            this.m_sweep.c.setVec2(this.m_sweep.c0);
            this.m_sweep.a = this.m_sweep.a0;
            this.m_sweep.getTransform(this.m_xf, 1);
        };
        /**
         * Get the world position for the body's origin.
         */
        Body.prototype.getPosition = function () {
            return this.m_xf.p;
        };
        Body.prototype.setPosition = function (p) {
            this.setTransform(p, this.m_sweep.a);
        };
        /**
         * Get the current world rotation angle in radians.
         */
        Body.prototype.getAngle = function () {
            return this.m_sweep.a;
        };
        Body.prototype.setAngle = function (angle) {
            this.setTransform(this.m_xf.p, angle);
        };
        /**
         * Get the world position of the center of mass.
         */
        Body.prototype.getWorldCenter = function () {
            return this.m_sweep.c;
        };
        /**
         * Get the local position of the center of mass.
         */
        Body.prototype.getLocalCenter = function () {
            return this.m_sweep.localCenter;
        };
        /**
         * Get the linear velocity of the center of mass.
         *
         * @return the linear velocity of the center of mass.
         */
        Body.prototype.getLinearVelocity = function () {
            return this.m_linearVelocity;
        };
        /**
         * Get the world linear velocity of a world point attached to this body.
         *
         * @param worldPoint A point in world coordinates.
         */
        Body.prototype.getLinearVelocityFromWorldPoint = function (worldPoint) {
            var localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
            return Vec2.add(this.m_linearVelocity, Vec2.crossNumVec2(this.m_angularVelocity, localCenter));
        };
        /**
         * Get the world velocity of a local point.
         *
         * @param localPoint A point in local coordinates.
         */
        Body.prototype.getLinearVelocityFromLocalPoint = function (localPoint) {
            return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
        };
        /**
         * Set the linear velocity of the center of mass.
         *
         * @param v The new linear velocity of the center of mass.
         */
        Body.prototype.setLinearVelocity = function (v) {
            if (this.m_type == STATIC) {
                return;
            }
            if (Vec2.dot(v, v) > 0.0) {
                this.setAwake(true);
            }
            this.m_linearVelocity.setVec2(v);
        };
        /**
         * Get the angular velocity.
         *
         * @returns the angular velocity in radians/second.
         */
        Body.prototype.getAngularVelocity = function () {
            return this.m_angularVelocity;
        };
        /**
         * Set the angular velocity.
         *
         * @param omega The new angular velocity in radians/second.
         */
        Body.prototype.setAngularVelocity = function (w) {
            if (this.m_type == STATIC) {
                return;
            }
            if (w * w > 0.0) {
                this.setAwake(true);
            }
            this.m_angularVelocity = w;
        };
        Body.prototype.getLinearDamping = function () {
            return this.m_linearDamping;
        };
        Body.prototype.setLinearDamping = function (linearDamping) {
            this.m_linearDamping = linearDamping;
        };
        Body.prototype.getAngularDamping = function () {
            return this.m_angularDamping;
        };
        Body.prototype.setAngularDamping = function (angularDamping) {
            this.m_angularDamping = angularDamping;
        };
        Body.prototype.getGravityScale = function () {
            return this.m_gravityScale;
        };
        /**
         * Scale the gravity applied to this body.
         */
        Body.prototype.setGravityScale = function (scale) {
            this.m_gravityScale = scale;
        };
        /**
         * Get the total mass of the body.
         *
         * @returns The mass, usually in kilograms (kg).
         */
        Body.prototype.getMass = function () {
            return this.m_mass;
        };
        /**
         * Get the rotational inertia of the body about the local origin.
         *
         * @return the rotational inertia, usually in kg-m^2.
         */
        Body.prototype.getInertia = function () {
            return this.m_I + this.m_mass
                * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
        };
        /**
         * Copy the mass data of the body to data.
         */
        Body.prototype.getMassData = function (data) {
            data.mass = this.m_mass;
            data.I = this.getInertia();
            data.center.setVec2(this.m_sweep.localCenter);
        };
        /**
         * This resets the mass properties to the sum of the mass properties of the
         * fixtures. This normally does not need to be called unless you called
         * SetMassData to override the mass and you later want to reset the mass.
         */
        Body.prototype.resetMassData = function () {
            // Compute mass data from shapes. Each shape has its own density.
            this.m_mass = 0.0;
            this.m_invMass = 0.0;
            this.m_I = 0.0;
            this.m_invI = 0.0;
            this.m_sweep.localCenter.setZero();
            // Static and kinematic bodies have zero mass.
            if (this.isStatic() || this.isKinematic()) {
                this.m_sweep.c0.setVec2(this.m_xf.p);
                this.m_sweep.c.setVec2(this.m_xf.p);
                this.m_sweep.a0 = this.m_sweep.a;
                return;
            }
            // Accumulate mass over all fixtures.
            var localCenter = Vec2.zero();
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                if (f.m_density == 0.0) {
                    continue;
                }
                var massData = new MassData();
                f.getMassData(massData);
                this.m_mass += massData.mass;
                localCenter.addMul(massData.mass, massData.center);
                this.m_I += massData.I;
            }
            // Compute center of mass.
            if (this.m_mass > 0.0) {
                this.m_invMass = 1.0 / this.m_mass;
                localCenter.mul(this.m_invMass);
            }
            else {
                // Force all dynamic bodies to have a positive mass.
                this.m_mass = 1.0;
                this.m_invMass = 1.0;
            }
            if (this.m_I > 0.0 && this.m_fixedRotationFlag == false) {
                // Center the inertia about the center of mass.
                this.m_I -= this.m_mass * Vec2.dot(localCenter, localCenter);
                this.m_invI = 1.0 / this.m_I;
            }
            else {
                this.m_I = 0.0;
                this.m_invI = 0.0;
            }
            // Move center of mass.
            var oldCenter = Vec2.clone(this.m_sweep.c);
            this.m_sweep.setLocalCenter(localCenter, this.m_xf);
            // Update center of mass velocity.
            this.m_linearVelocity.add(Vec2.crossNumVec2(this.m_angularVelocity, Vec2.sub(this.m_sweep.c, oldCenter)));
        };
        /**
         * Set the mass properties to override the mass properties of the fixtures. Note
         * that this changes the center of mass position. Note that creating or
         * destroying fixtures can also alter the mass. This function has no effect if
         * the body isn't dynamic.
         *
         * @param massData The mass properties.
         */
        Body.prototype.setMassData = function (massData) {
            if (this.isWorldLocked() == true) {
                return;
            }
            if (this.m_type != DYNAMIC) {
                return;
            }
            this.m_invMass = 0.0;
            this.m_I = 0.0;
            this.m_invI = 0.0;
            this.m_mass = massData.mass;
            if (this.m_mass <= 0.0) {
                this.m_mass = 1.0;
            }
            this.m_invMass = 1.0 / this.m_mass;
            if (massData.I > 0.0 && this.m_fixedRotationFlag == false) {
                this.m_I = massData.I - this.m_mass
                    * Vec2.dot(massData.center, massData.center);
                this.m_invI = 1.0 / this.m_I;
            }
            // Move center of mass.
            var oldCenter = Vec2.clone(this.m_sweep.c);
            this.m_sweep.setLocalCenter(massData.center, this.m_xf);
            // Update center of mass velocity.
            this.m_linearVelocity.add(Vec2.crossNumVec2(this.m_angularVelocity, Vec2.sub(this.m_sweep.c, oldCenter)));
        };
        /**
         * Apply a force at a world point. If the force is not applied at the center of
         * mass, it will generate a torque and affect the angular velocity. This wakes
         * up the body.
         *
         * @param force The world force vector, usually in Newtons (N).
         * @param point The world position of the point of application.
         * @param wake Also wake up the body
         */
        Body.prototype.applyForce = function (force, point, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate a force if the body is sleeping.
            if (this.m_awakeFlag) {
                this.m_force.add(force);
                this.m_torque += Vec2.crossVec2Vec2(Vec2.sub(point, this.m_sweep.c), force);
            }
        };
        /**
         * Apply a force to the center of mass. This wakes up the body.
         *
         * @param force The world force vector, usually in Newtons (N).
         * @param wake Also wake up the body
         */
        Body.prototype.applyForceToCenter = function (force, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate a force if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_force.add(force);
            }
        };
        /**
         * Apply a torque. This affects the angular velocity without affecting the
         * linear velocity of the center of mass. This wakes up the body.
         *
         * @param torque About the z-axis (out of the screen), usually in N-m.
         * @param wake Also wake up the body
         */
        Body.prototype.applyTorque = function (torque, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate a force if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_torque += torque;
            }
        };
        /**
         * Apply an impulse at a point. This immediately modifies the velocity. It also
         * modifies the angular velocity if the point of application is not at the
         * center of mass. This wakes up the body.
         *
         * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
         * @param point The world position of the point of application.
         * @param wake Also wake up the body
         */
        Body.prototype.applyLinearImpulse = function (impulse, point, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate velocity if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_linearVelocity.addMul(this.m_invMass, impulse);
                this.m_angularVelocity += this.m_invI * Vec2.crossVec2Vec2(Vec2.sub(point, this.m_sweep.c), impulse);
            }
        };
        /**
         * Apply an angular impulse.
         *
         * @param impulse The angular impulse in units of kg*m*m/s
         * @param wake Also wake up the body
         */
        Body.prototype.applyAngularImpulse = function (impulse, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate velocity if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_angularVelocity += this.m_invI * impulse;
            }
        };
        /**
         * This is used to prevent connected bodies (by joints) from colliding,
         * depending on the joint's collideConnected flag.
         */
        Body.prototype.shouldCollide = function (that) {
            // At least one body should be dynamic.
            if (this.m_type != DYNAMIC && that.m_type != DYNAMIC) {
                return false;
            }
            // Does a joint prevent collision?
            for (var jn = this.m_jointList; jn; jn = jn.next) {
                if (jn.other == that) {
                    if (jn.joint.m_collideConnected == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        /**
         * @internal Used for deserialize.
         */
        Body.prototype._addFixture = function (fixture) {
            if (this.isWorldLocked() == true) {
                return null;
            }
            if (this.m_activeFlag) {
                var broadPhase = this.m_world.m_broadPhase;
                fixture.createProxies(broadPhase, this.m_xf);
            }
            fixture.m_next = this.m_fixtureList;
            this.m_fixtureList = fixture;
            // Adjust mass properties if needed.
            if (fixture.m_density > 0.0) {
                this.resetMassData();
            }
            // Let the world know we have a new fixture. This will cause new contacts
            // to be created at the beginning of the next time step.
            this.m_world.m_newFixture = true;
            return fixture;
        };
        // tslint:disable-next-line:typedef
        Body.prototype.createFixture = function (shape, fixdef) {
            if (this.isWorldLocked() == true) {
                return null;
            }
            var fixture = new Fixture(this, shape, fixdef);
            this._addFixture(fixture);
            return fixture;
        };
        /**
         * Destroy a fixture. This removes the fixture from the broad-phase and destroys
         * all contacts associated with this fixture. This will automatically adjust the
         * mass of the body if the body is dynamic and the fixture has positive density.
         * All fixtures attached to a body are implicitly destroyed when the body is
         * destroyed.
         *
         * Warning: This function is locked during callbacks.
         *
         * @param fixture The fixture to be removed.
         */
        Body.prototype.destroyFixture = function (fixture) {
            if (this.isWorldLocked() == true) {
                return;
            }
            if (this.m_fixtureList === fixture) {
                this.m_fixtureList = fixture.m_next;
            }
            else {
                var node = this.m_fixtureList;
                while (node != null) {
                    if (node.m_next === fixture) {
                        node.m_next = fixture.m_next;
                        break;
                    }
                    node = node.m_next;
                }
            }
            // Destroy any contacts associated with the fixture.
            var edge = this.m_contactList;
            while (edge) {
                var c = edge.contact;
                edge = edge.next;
                var fixtureA = c.getFixtureA();
                var fixtureB = c.getFixtureB();
                if (fixture == fixtureA || fixture == fixtureB) {
                    // This destroys the contact and removes it from
                    // this body's contact list.
                    this.m_world.destroyContact(c);
                }
            }
            if (this.m_activeFlag) {
                var broadPhase = this.m_world.m_broadPhase;
                fixture.destroyProxies(broadPhase);
            }
            fixture.m_body = null;
            fixture.m_next = null;
            this.m_world.publish('remove-fixture', fixture);
            // Reset the mass data.
            this.resetMassData();
        };
        /**
         * Get the corresponding world point of a local point.
         */
        Body.prototype.getWorldPoint = function (localPoint) {
            return Transform.mulVec2(this.m_xf, localPoint);
        };
        /**
         * Get the corresponding world vector of a local vector.
         */
        Body.prototype.getWorldVector = function (localVector) {
            return Rot.mulVec2(this.m_xf.q, localVector);
        };
        /**
         * Gets the corresponding local point of a world point.
         */
        Body.prototype.getLocalPoint = function (worldPoint) {
            return Transform.mulTVec2(this.m_xf, worldPoint);
        };
        /**
         * Gets the corresponding local vector of a world vector.
         */
        Body.prototype.getLocalVector = function (worldVector) {
            return Rot.mulTVec2(this.m_xf.q, worldVector);
        };
        /**
         * A static body does not move under simulation and behaves as if it has infinite mass.
         * Internally, zero is stored for the mass and the inverse mass.
         * Static bodies can be moved manually by the user.
         * A static body has zero velocity.
         * Static bodies do not collide with other static or kinematic bodies.
         */
        Body.STATIC = 'static';
        /**
         * A kinematic body moves under simulation according to its velocity.
         * Kinematic bodies do not respond to forces.
         * They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
         * A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
         * Kinematic bodies do not collide with other kinematic or static bodies.
         */
        Body.KINEMATIC = 'kinematic';
        /**
         * A dynamic body is fully simulated.
         * They can be moved manually by the user, but normally they move according to forces.
         * A dynamic body can collide with all body types.
         * A dynamic body always has finite, non-zero mass.
         * If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.
         */
        Body.DYNAMIC = 'dynamic';
        return Body;
    }());

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
    /**
     * A 2-by-2 matrix. Stored in column-major order.
     */
    var Mat22 = /** @class */ (function () {
        // tslint:disable-next-line:typedef
        function Mat22(a, b, c, d) {
            if (typeof a === 'object' && a !== null) {
                this.ex = Vec2.clone(a);
                this.ey = Vec2.clone(b);
            }
            else if (typeof a === 'number') {
                this.ex = Vec2.neo(a, c);
                this.ey = Vec2.neo(b, d);
            }
            else {
                this.ex = Vec2.zero();
                this.ey = Vec2.zero();
            }
        }
        /** @internal */
        Mat22.prototype.toString = function () {
            return JSON.stringify(this);
        };
        Mat22.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
        };
        Mat22.assert = function (o) {
            return;
        };
        // tslint:disable-next-line:typedef
        Mat22.prototype.set = function (a, b, c, d) {
            if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number'
                && typeof d === 'number') {
                this.ex.setNum(a, c);
                this.ey.setNum(b, d);
            }
            else if (typeof a === 'object' && typeof b === 'object') {
                this.ex.setVec2(a);
                this.ey.setVec2(b);
            }
            else if (typeof a === 'object') {
                this.ex.setVec2(a.ex);
                this.ey.setVec2(a.ey);
            }
            else ;
        };
        Mat22.prototype.setIdentity = function () {
            this.ex.x = 1.0;
            this.ey.x = 0.0;
            this.ex.y = 0.0;
            this.ey.y = 1.0;
        };
        Mat22.prototype.setZero = function () {
            this.ex.x = 0.0;
            this.ey.x = 0.0;
            this.ex.y = 0.0;
            this.ey.y = 0.0;
        };
        Mat22.prototype.getInverse = function () {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var imx = new Mat22();
            imx.ex.x = det * d;
            imx.ey.x = -det * b;
            imx.ex.y = -det * c;
            imx.ey.y = det * a;
            return imx;
        };
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient than
         * computing the inverse in one-shot cases.
         */
        Mat22.prototype.solve = function (v) {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var w = Vec2.zero();
            w.x = det * (d * v.x - b * v.y);
            w.y = det * (a * v.y - c * v.x);
            return w;
        };
        // tslint:disable-next-line:typedef
        Mat22.mul = function (mx, v) {
            if (v && 'x' in v && 'y' in v) {
                var x = mx.ex.x * v.x + mx.ey.x * v.y;
                var y = mx.ex.y * v.x + mx.ey.y * v.y;
                return Vec2.neo(x, y);
            }
            else if (v && 'ex' in v && 'ey' in v) { // Mat22
                // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
                var a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
                var b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
                var c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
                var d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
                return new Mat22(a, b, c, d);
            }
        };
        Mat22.mulVec2 = function (mx, v) {
            var x = mx.ex.x * v.x + mx.ey.x * v.y;
            var y = mx.ex.y * v.x + mx.ey.y * v.y;
            return Vec2.neo(x, y);
        };
        Mat22.mulMat22 = function (mx, v) {
            // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
            var a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
            var b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
            var c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
            var d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
            return new Mat22(a, b, c, d);
        };
        // tslint:disable-next-line:typedef
        Mat22.mulT = function (mx, v) {
            if (v && 'x' in v && 'y' in v) { // Vec2
                return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
            }
            else if (v && 'ex' in v && 'ey' in v) { // Mat22
                var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
                var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
                return new Mat22(c1, c2);
            }
        };
        Mat22.mulTVec2 = function (mx, v) {
            return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
        };
        Mat22.mulTMat22 = function (mx, v) {
            var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
            var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
            return new Mat22(c1, c2);
        };
        Mat22.abs = function (mx) {
            return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
        };
        Mat22.add = function (mx1, mx2) {
            return new Mat22(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
        };
        return Mat22;
    }());

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
    var ManifoldType;
    (function (ManifoldType) {
        ManifoldType[ManifoldType["e_circles"] = 0] = "e_circles";
        ManifoldType[ManifoldType["e_faceA"] = 1] = "e_faceA";
        ManifoldType[ManifoldType["e_faceB"] = 2] = "e_faceB";
    })(ManifoldType || (ManifoldType = {}));
    var ContactFeatureType;
    (function (ContactFeatureType) {
        ContactFeatureType[ContactFeatureType["e_vertex"] = 0] = "e_vertex";
        ContactFeatureType[ContactFeatureType["e_face"] = 1] = "e_face";
    })(ContactFeatureType || (ContactFeatureType = {}));
    /**
     * This is used for determining the state of contact points.
     */
    var PointState;
    (function (PointState) {
        /** Point does not exist */
        PointState[PointState["nullState"] = 0] = "nullState";
        /** Point was added in the update */
        PointState[PointState["addState"] = 1] = "addState";
        /** Point persisted across the update */
        PointState[PointState["persistState"] = 2] = "persistState";
        /** Point was removed in the update */
        PointState[PointState["removeState"] = 3] = "removeState";
    })(PointState || (PointState = {}));
    /**
     * Used for computing contact manifolds.
     */
    var ClipVertex = /** @class */ (function () {
        function ClipVertex() {
            this.v = Vec2.zero();
            this.id = new ContactID();
        }
        ClipVertex.prototype.set = function (o) {
            this.v.setVec2(o.v);
            this.id.set(o.id);
        };
        return ClipVertex;
    }());
    /**
     * A manifold for two touching convex shapes. Manifolds are created in `evaluate`
     * method of Contact subclasses.
     *
     * Supported manifold types are e_faceA or e_faceB for clip point versus plane
     * with radius and e_circles point versus point with radius.
     *
     * We store contacts in this way so that position correction can account for
     * movement, which is critical for continuous physics. All contact scenarios
     * must be expressed in one of these types. This structure is stored across time
     * steps, so we keep it small.
     *
     * @prop type e_circle, e_faceA, e_faceB
     * @prop localPoint Usage depends on manifold type:<br>
     *       e_circles: the local center of circleA <br>
     *       e_faceA: the center of faceA <br>
     *       e_faceB: the center of faceB
     * @prop localNormal Usage depends on manifold type:<br>
     *       e_circles: not used <br>
     *       e_faceA: the normal on polygonA <br>
     *       e_faceB: the normal on polygonB
     * @prop points The points of contact {ManifoldPoint[]}
     * @prop pointCount The number of manifold points
     */
    var Manifold = /** @class */ (function () {
        function Manifold() {
            this.localNormal = Vec2.zero();
            this.localPoint = Vec2.zero();
            this.points = [new ManifoldPoint(), new ManifoldPoint()];
            this.pointCount = 0;
        }
        /**
         * Evaluate the manifold with supplied transforms. This assumes modest motion
         * from the original state. This does not change the point count, impulses, etc.
         * The radii must come from the shapes that generated the manifold.
         */
        Manifold.prototype.getWorldManifold = function (wm, xfA, radiusA, xfB, radiusB) {
            if (this.pointCount == 0) {
                return;
            }
            wm = wm || new WorldManifold();
            var normal = wm.normal;
            var points = wm.points;
            var separations = wm.separations;
            // TODO: improve
            switch (this.type) {
                case ManifoldType.e_circles: {
                    normal = Vec2.neo(1.0, 0.0);
                    var pointA = Transform.mulVec2(xfA, this.localPoint);
                    var pointB = Transform.mulVec2(xfB, this.points[0].localPoint);
                    var dist = Vec2.sub(pointB, pointA);
                    if (Vec2.lengthSquared(dist) > math$1.EPSILON * math$1.EPSILON) {
                        normal.setVec2(dist);
                        normal.normalize();
                    }
                    var cA = pointA.clone().addMul(radiusA, normal);
                    var cB = pointB.clone().addMul(-radiusB, normal);
                    points[0] = Vec2.mid(cA, cB);
                    separations[0] = Vec2.dot(Vec2.sub(cB, cA), normal);
                    points.length = 1;
                    separations.length = 1;
                    break;
                }
                case ManifoldType.e_faceA: {
                    normal = Rot.mulVec2(xfA.q, this.localNormal);
                    var planePoint = Transform.mulVec2(xfA, this.localPoint);
                    for (var i = 0; i < this.pointCount; ++i) {
                        var clipPoint = Transform.mulVec2(xfB, this.points[i].localPoint);
                        var cA = Vec2.clone(clipPoint).addMul(radiusA - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
                        var cB = Vec2.clone(clipPoint).subMul(radiusB, normal);
                        points[i] = Vec2.mid(cA, cB);
                        separations[i] = Vec2.dot(Vec2.sub(cB, cA), normal);
                    }
                    points.length = this.pointCount;
                    separations.length = this.pointCount;
                    break;
                }
                case ManifoldType.e_faceB: {
                    normal = Rot.mulVec2(xfB.q, this.localNormal);
                    var planePoint = Transform.mulVec2(xfB, this.localPoint);
                    for (var i = 0; i < this.pointCount; ++i) {
                        var clipPoint = Transform.mulVec2(xfA, this.points[i].localPoint);
                        var cB = Vec2.combine(1, clipPoint, radiusB - Vec2.dot(Vec2.sub(clipPoint, planePoint), normal), normal);
                        var cA = Vec2.combine(1, clipPoint, -radiusA, normal);
                        points[i] = Vec2.mid(cA, cB);
                        separations[i] = Vec2.dot(Vec2.sub(cA, cB), normal);
                    }
                    points.length = this.pointCount;
                    separations.length = this.pointCount;
                    // Ensure normal points from A to B.
                    normal.mul(-1);
                    break;
                }
            }
            wm.normal = normal;
            wm.points = points;
            wm.separations = separations;
            return wm;
        };
        Manifold.clipSegmentToLine = clipSegmentToLine;
        Manifold.ClipVertex = ClipVertex;
        Manifold.getPointStates = getPointStates;
        Manifold.PointState = PointState;
        return Manifold;
    }());
    /**
     * A manifold point is a contact point belonging to a contact manifold. It holds
     * details related to the geometry and dynamics of the contact points.
     *
     * This structure is stored across time steps, so we keep it small.
     *
     * Note: impulses are used for internal caching and may not provide reliable
     * contact forces, especially for high speed collisions.
     */
    var ManifoldPoint = /** @class */ (function () {
        function ManifoldPoint() {
            /**
             * Usage depends on manifold type.
             *       e_circles: the local center of circleB,
             *       e_faceA: the local center of cirlceB or the clip point of polygonB,
             *       e_faceB: the clip point of polygonA.
             */
            this.localPoint = Vec2.zero();
            /**
             * The non-penetration impulse
             */
            this.normalImpulse = 0;
            /**
             * The friction impulse
             */
            this.tangentImpulse = 0;
            /**
             * Uniquely identifies a contact point between two shapes to facilatate warm starting
             */
            this.id = new ContactID();
        }
        return ManifoldPoint;
    }());
    /**
     * Contact ids to facilitate warm starting.
     */
    var ContactID = /** @class */ (function () {
        function ContactID() {
            this.cf = new ContactFeature();
        }
        Object.defineProperty(ContactID.prototype, "key", {
            /**
             * Used to quickly compare contact ids.
             */
            get: function () {
                return this.cf.indexA + this.cf.indexB * 4 + this.cf.typeA * 16 + this.cf.typeB * 64;
            },
            enumerable: false,
            configurable: true
        });
        ContactID.prototype.set = function (o) {
            // this.key = o.key;
            this.cf.set(o.cf);
        };
        return ContactID;
    }());
    /**
     * The features that intersect to form the contact point.
     */
    var ContactFeature = /** @class */ (function () {
        function ContactFeature() {
        }
        ContactFeature.prototype.set = function (o) {
            this.indexA = o.indexA;
            this.indexB = o.indexB;
            this.typeA = o.typeA;
            this.typeB = o.typeB;
        };
        return ContactFeature;
    }());
    /**
     * This is used to compute the current state of a contact manifold.
     */
    var WorldManifold = /** @class */ (function () {
        function WorldManifold() {
            /**
             * World contact point (point of intersection)
             */
            this.points = []; // [maxManifoldPoints]
            /**
             * A negative value indicates overlap, in meters
             */
            this.separations = []; // [maxManifoldPoints]
        }
        return WorldManifold;
    }());
    /**
     * Compute the point states given two manifolds. The states pertain to the
     * transition from manifold1 to manifold2. So state1 is either persist or remove
     * while state2 is either add or persist.
     */
    function getPointStates(state1, state2, manifold1, manifold2) {
        // state1, state2: PointState[Settings.maxManifoldPoints]
        // for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
        // state1[i] = PointState.nullState;
        // state2[i] = PointState.nullState;
        // }
        // Detect persists and removes.
        for (var i = 0; i < manifold1.pointCount; ++i) {
            var id = manifold1.points[i].id;
            state1[i] = PointState.removeState;
            for (var j = 0; j < manifold2.pointCount; ++j) {
                if (manifold2.points[j].id.key == id.key) {
                    state1[i] = PointState.persistState;
                    break;
                }
            }
        }
        // Detect persists and adds.
        for (var i = 0; i < manifold2.pointCount; ++i) {
            var id = manifold2.points[i].id;
            state2[i] = PointState.addState;
            for (var j = 0; j < manifold1.pointCount; ++j) {
                if (manifold1.points[j].id.key == id.key) {
                    state2[i] = PointState.persistState;
                    break;
                }
            }
        }
    }
    /**
     * Clipping for contact manifolds. Sutherland-Hodgman clipping.
     */
    function clipSegmentToLine(vOut, vIn, normal, offset, vertexIndexA) {
        // Start with no output points
        var numOut = 0;
        // Calculate the distance of end points to the line
        var distance0 = Vec2.dot(normal, vIn[0].v) - offset;
        var distance1 = Vec2.dot(normal, vIn[1].v) - offset;
        // If the points are behind the plane
        if (distance0 <= 0.0)
            vOut[numOut++].set(vIn[0]);
        if (distance1 <= 0.0)
            vOut[numOut++].set(vIn[1]);
        // If the points are on different sides of the plane
        if (distance0 * distance1 < 0.0) {
            // Find intersection point of edge and plane
            var interp = distance0 / (distance0 - distance1);
            vOut[numOut].v.setCombine(1 - interp, vIn[0].v, interp, vIn[1].v);
            // VertexA is hitting edgeB.
            vOut[numOut].id.cf.indexA = vertexIndexA;
            vOut[numOut].id.cf.indexB = vIn[0].id.cf.indexB;
            vOut[numOut].id.cf.typeA = ContactFeatureType.e_vertex;
            vOut[numOut].id.cf.typeB = ContactFeatureType.e_face;
            ++numOut;
        }
        return numOut;
    }

    var stats$1 = {
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
        toString: function (newline) {
            newline = typeof newline === 'string' ? newline : '\n';
            var string = "";
            // tslint:disable-next-line:no-for-in
            for (var name_1 in this) {
                if (typeof this[name_1] !== 'function' && typeof this[name_1] !== 'object') {
                    string += name_1 + ': ' + this[name_1] + newline;
                }
            }
            return string;
        }
    };

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
    /**
     * GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates.
     */
    stats$1.gjkCalls = 0;
    stats$1.gjkIters = 0;
    stats$1.gjkMaxIters = 0;
    /**
     * Input for Distance. You have to option to use the shape radii in the
     * computation. Even
     */
    var DistanceInput = /** @class */ (function () {
        function DistanceInput() {
            this.proxyA = new DistanceProxy();
            this.proxyB = new DistanceProxy();
            this.transformA = null;
            this.transformB = null;
            this.useRadii = false;
        }
        return DistanceInput;
    }());
    /**
     * Output for Distance.
     *
     * @prop {Vec2} pointA closest point on shapeA
     * @prop {Vec2} pointB closest point on shapeB
     * @prop distance
     * @prop iterations number of GJK iterations used
     */
    var DistanceOutput = /** @class */ (function () {
        function DistanceOutput() {
            this.pointA = Vec2.zero();
            this.pointB = Vec2.zero();
        }
        return DistanceOutput;
    }());
    /**
     * Used to warm start Distance. Set count to zero on first call.
     *
     * @prop {number} metric length or area
     * @prop {array} indexA vertices on shape A
     * @prop {array} indexB vertices on shape B
     * @prop {number} count
     */
    var SimplexCache = /** @class */ (function () {
        function SimplexCache() {
            this.metric = 0;
            this.indexA = [];
            this.indexB = [];
            this.count = 0;
        }
        return SimplexCache;
    }());
    /**
     * Compute the closest points between two shapes. Supports any combination of:
     * CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
     * the first call set SimplexCache.count to zero.
     */
    function Distance(output, cache, input) {
        ++stats$1.gjkCalls;
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var xfA = input.transformA;
        var xfB = input.transformB;
        // Initialize the simplex.
        var simplex = new Simplex();
        simplex.readCache(cache, proxyA, xfA, proxyB, xfB);
        // Get simplex vertices as an array.
        var vertices = simplex.m_v;
        var k_maxIters = Settings.maxDistnceIterations;
        // These store the vertices of the last simplex so that we
        // can check for duplicates and prevent cycling.
        var saveA = [];
        var saveB = []; // int[3]
        var saveCount = 0;
        // Main iteration loop.
        var iter = 0;
        while (iter < k_maxIters) {
            // Copy simplex so we can identify duplicates.
            saveCount = simplex.m_count;
            for (var i = 0; i < saveCount; ++i) {
                saveA[i] = vertices[i].indexA;
                saveB[i] = vertices[i].indexB;
            }
            simplex.solve();
            // If we have 3 points, then the origin is in the corresponding triangle.
            if (simplex.m_count === 3) {
                break;
            }
            // Compute closest point.
            var p = simplex.getClosestPoint();
            p.lengthSquared();
            // Get search direction.
            var d = simplex.getSearchDirection();
            // Ensure the search direction is numerically fit.
            if (d.lengthSquared() < math$1.EPSILON * math$1.EPSILON) {
                // The origin is probably contained by a line segment
                // or triangle. Thus the shapes are overlapped.
                // We can't return zero here even though there may be overlap.
                // In case the simplex is a point, segment, or triangle it is difficult
                // to determine if the origin is contained in the CSO or very close to it.
                break;
            }
            // Compute a tentative new simplex vertex using support points.
            var vertex = vertices[simplex.m_count]; // SimplexVertex
            vertex.indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(d)));
            vertex.wA = Transform.mulVec2(xfA, proxyA.getVertex(vertex.indexA));
            vertex.indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, d));
            vertex.wB = Transform.mulVec2(xfB, proxyB.getVertex(vertex.indexB));
            vertex.w = Vec2.sub(vertex.wB, vertex.wA);
            // Iteration count is equated to the number of support point calls.
            ++iter;
            ++stats$1.gjkIters;
            // Check for duplicate support points. This is the main termination
            // criteria.
            var duplicate = false;
            for (var i = 0; i < saveCount; ++i) {
                if (vertex.indexA === saveA[i] && vertex.indexB === saveB[i]) {
                    duplicate = true;
                    break;
                }
            }
            // If we found a duplicate support point we must exit to avoid cycling.
            if (duplicate) {
                break;
            }
            // New vertex is ok and needed.
            ++simplex.m_count;
        }
        stats$1.gjkMaxIters = math$1.max(stats$1.gjkMaxIters, iter);
        // Prepare output.
        simplex.getWitnessPoints(output.pointA, output.pointB);
        output.distance = Vec2.distance(output.pointA, output.pointB);
        output.iterations = iter;
        // Cache the simplex.
        simplex.writeCache(cache);
        // Apply radii if requested.
        if (input.useRadii) {
            var rA = proxyA.m_radius;
            var rB = proxyB.m_radius;
            if (output.distance > rA + rB && output.distance > math$1.EPSILON) {
                // Shapes are still no overlapped.
                // Move the witness points to the outer surface.
                output.distance -= rA + rB;
                var normal = Vec2.sub(output.pointB, output.pointA);
                normal.normalize();
                output.pointA.addMul(rA, normal);
                output.pointB.subMul(rB, normal);
            }
            else {
                // Shapes are overlapped when radii are considered.
                // Move the witness points to the middle.
                var p = Vec2.mid(output.pointA, output.pointB);
                output.pointA.setVec2(p);
                output.pointB.setVec2(p);
                output.distance = 0.0;
            }
        }
    }
    /**
     * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
     */
    var DistanceProxy = /** @class */ (function () {
        function DistanceProxy() {
            this.m_buffer = []; // Vec2[2]
            this.m_vertices = []; // Vec2[]
            this.m_count = 0;
            this.m_radius = 0;
        }
        /**
         * Get the vertex count.
         */
        DistanceProxy.prototype.getVertexCount = function () {
            return this.m_count;
        };
        /**
         * Get a vertex by index. Used by Distance.
         */
        DistanceProxy.prototype.getVertex = function (index) {
            return this.m_vertices[index];
        };
        /**
         * Get the supporting vertex index in the given direction.
         */
        DistanceProxy.prototype.getSupport = function (d) {
            var bestIndex = 0;
            var bestValue = Vec2.dot(this.m_vertices[0], d);
            for (var i = 0; i < this.m_count; ++i) {
                var value = Vec2.dot(this.m_vertices[i], d);
                if (value > bestValue) {
                    bestIndex = i;
                    bestValue = value;
                }
            }
            return bestIndex;
        };
        /**
         * Get the supporting vertex in the given direction.
         */
        DistanceProxy.prototype.getSupportVertex = function (d) {
            return this.m_vertices[this.getSupport(d)];
        };
        /**
         * Initialize the proxy using the given shape. The shape must remain in scope
         * while the proxy is in use.
         */
        DistanceProxy.prototype.set = function (shape, index) {
            shape.computeDistanceProxy(this, index);
        };
        return DistanceProxy;
    }());
    var SimplexVertex = /** @class */ (function () {
        function SimplexVertex() {
            /** support point in proxyA */
            this.wA = Vec2.zero();
            /** support point in proxyB */
            this.wB = Vec2.zero();
            /** wB - wA; */
            this.w = Vec2.zero();
        }
        SimplexVertex.prototype.set = function (v) {
            this.indexA = v.indexA;
            this.indexB = v.indexB;
            this.wA = Vec2.clone(v.wA);
            this.wB = Vec2.clone(v.wB);
            this.w = Vec2.clone(v.w);
            this.a = v.a;
        };
        return SimplexVertex;
    }());
    var Simplex = /** @class */ (function () {
        function Simplex() {
            this.m_v1 = new SimplexVertex();
            this.m_v2 = new SimplexVertex();
            this.m_v3 = new SimplexVertex();
            this.m_v = [this.m_v1, this.m_v2, this.m_v3];
            this.m_count;
        }
        /** @internal */
        Simplex.prototype.toString = function () {
            if (this.m_count === 3) {
                return ["+" + this.m_count,
                    this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y,
                    this.m_v2.a, this.m_v2.wA.x, this.m_v2.wA.y, this.m_v2.wB.x, this.m_v2.wB.y,
                    this.m_v3.a, this.m_v3.wA.x, this.m_v3.wA.y, this.m_v3.wB.x, this.m_v3.wB.y
                ].toString();
            }
            else if (this.m_count === 2) {
                return ["+" + this.m_count,
                    this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y,
                    this.m_v2.a, this.m_v2.wA.x, this.m_v2.wA.y, this.m_v2.wB.x, this.m_v2.wB.y
                ].toString();
            }
            else if (this.m_count === 1) {
                return ["+" + this.m_count,
                    this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y
                ].toString();
            }
            else {
                return "+" + this.m_count;
            }
        };
        Simplex.prototype.readCache = function (cache, proxyA, transformA, proxyB, transformB) {
            // Copy data from cache.
            this.m_count = cache.count;
            for (var i = 0; i < this.m_count; ++i) {
                var v = this.m_v[i];
                v.indexA = cache.indexA[i];
                v.indexB = cache.indexB[i];
                var wALocal = proxyA.getVertex(v.indexA);
                var wBLocal = proxyB.getVertex(v.indexB);
                v.wA = Transform.mulVec2(transformA, wALocal);
                v.wB = Transform.mulVec2(transformB, wBLocal);
                v.w = Vec2.sub(v.wB, v.wA);
                v.a = 0.0;
            }
            // Compute the new simplex metric, if it is substantially different than
            // old metric then flush the simplex.
            if (this.m_count > 1) {
                var metric1 = cache.metric;
                var metric2 = this.getMetric();
                if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2
                    || metric2 < math$1.EPSILON) {
                    // Reset the simplex.
                    this.m_count = 0;
                }
            }
            // If the cache is empty or invalid...
            if (this.m_count === 0) {
                var v = this.m_v[0];
                v.indexA = 0;
                v.indexB = 0;
                var wALocal = proxyA.getVertex(0);
                var wBLocal = proxyB.getVertex(0);
                v.wA = Transform.mulVec2(transformA, wALocal);
                v.wB = Transform.mulVec2(transformB, wBLocal);
                v.w = Vec2.sub(v.wB, v.wA);
                v.a = 1.0;
                this.m_count = 1;
            }
        };
        Simplex.prototype.writeCache = function (cache) {
            cache.metric = this.getMetric();
            cache.count = this.m_count;
            for (var i = 0; i < this.m_count; ++i) {
                cache.indexA[i] = this.m_v[i].indexA;
                cache.indexB[i] = this.m_v[i].indexB;
            }
        };
        Simplex.prototype.getSearchDirection = function () {
            switch (this.m_count) {
                case 1:
                    return Vec2.neg(this.m_v1.w);
                case 2: {
                    var e12 = Vec2.sub(this.m_v2.w, this.m_v1.w);
                    var sgn = Vec2.crossVec2Vec2(e12, Vec2.neg(this.m_v1.w));
                    if (sgn > 0.0) {
                        // Origin is left of e12.
                        return Vec2.crossNumVec2(1.0, e12);
                    }
                    else {
                        // Origin is right of e12.
                        return Vec2.crossVec2Num(e12, 1.0);
                    }
                }
                default:
                    return Vec2.zero();
            }
        };
        Simplex.prototype.getClosestPoint = function () {
            switch (this.m_count) {
                case 0:
                    return Vec2.zero();
                case 1:
                    return Vec2.clone(this.m_v1.w);
                case 2:
                    return Vec2.combine(this.m_v1.a, this.m_v1.w, this.m_v2.a, this.m_v2.w);
                case 3:
                    return Vec2.zero();
                default:
                    return Vec2.zero();
            }
        };
        Simplex.prototype.getWitnessPoints = function (pA, pB) {
            switch (this.m_count) {
                case 0:
                    break;
                case 1:
                    pA.setVec2(this.m_v1.wA);
                    pB.setVec2(this.m_v1.wB);
                    break;
                case 2:
                    pA.setCombine(this.m_v1.a, this.m_v1.wA, this.m_v2.a, this.m_v2.wA);
                    pB.setCombine(this.m_v1.a, this.m_v1.wB, this.m_v2.a, this.m_v2.wB);
                    break;
                case 3:
                    pA.setCombine(this.m_v1.a, this.m_v1.wA, this.m_v2.a, this.m_v2.wA);
                    pA.addMul(this.m_v3.a, this.m_v3.wA);
                    pB.setVec2(pA);
                    break;
            }
        };
        Simplex.prototype.getMetric = function () {
            switch (this.m_count) {
                case 0:
                    return 0.0;
                case 1:
                    return 0.0;
                case 2:
                    return Vec2.distance(this.m_v1.w, this.m_v2.w);
                case 3:
                    return Vec2.crossVec2Vec2(Vec2.sub(this.m_v2.w, this.m_v1.w), Vec2.sub(this.m_v3.w, this.m_v1.w));
                default:
                    return 0.0;
            }
        };
        Simplex.prototype.solve = function () {
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
        // Solve a line segment using barycentric coordinates.
        //
        // p = a1 * w1 + a2 * w2
        // a1 + a2 = 1
        //
        // The vector from the origin to the closest point on the line is
        // perpendicular to the line.
        // e12 = w2 - w1
        // dot(p, e) = 0
        // a1 * dot(w1, e) + a2 * dot(w2, e) = 0
        //
        // 2-by-2 linear system
        // [1 1 ][a1] = [1]
        // [w1.e12 w2.e12][a2] = [0]
        //
        // Define
        // d12_1 = dot(w2, e12)
        // d12_2 = -dot(w1, e12)
        // d12 = d12_1 + d12_2
        //
        // Solution
        // a1 = d12_1 / d12
        // a2 = d12_2 / d12
        Simplex.prototype.solve2 = function () {
            var w1 = this.m_v1.w;
            var w2 = this.m_v2.w;
            var e12 = Vec2.sub(w2, w1);
            // w1 region
            var d12_2 = -Vec2.dot(w1, e12);
            if (d12_2 <= 0.0) {
                // a2 <= 0, so we clamp it to 0
                this.m_v1.a = 1.0;
                this.m_count = 1;
                return;
            }
            // w2 region
            var d12_1 = Vec2.dot(w2, e12);
            if (d12_1 <= 0.0) {
                // a1 <= 0, so we clamp it to 0
                this.m_v2.a = 1.0;
                this.m_count = 1;
                this.m_v1.set(this.m_v2);
                return;
            }
            // Must be in e12 region.
            var inv_d12 = 1.0 / (d12_1 + d12_2);
            this.m_v1.a = d12_1 * inv_d12;
            this.m_v2.a = d12_2 * inv_d12;
            this.m_count = 2;
        };
        // Possible regions:
        // - points[2]
        // - edge points[0]-points[2]
        // - edge points[1]-points[2]
        // - inside the triangle
        Simplex.prototype.solve3 = function () {
            var w1 = this.m_v1.w;
            var w2 = this.m_v2.w;
            var w3 = this.m_v3.w;
            // Edge12
            // [1 1 ][a1] = [1]
            // [w1.e12 w2.e12][a2] = [0]
            // a3 = 0
            var e12 = Vec2.sub(w2, w1);
            var w1e12 = Vec2.dot(w1, e12);
            var w2e12 = Vec2.dot(w2, e12);
            var d12_1 = w2e12;
            var d12_2 = -w1e12;
            // Edge13
            // [1 1 ][a1] = [1]
            // [w1.e13 w3.e13][a3] = [0]
            // a2 = 0
            var e13 = Vec2.sub(w3, w1);
            var w1e13 = Vec2.dot(w1, e13);
            var w3e13 = Vec2.dot(w3, e13);
            var d13_1 = w3e13;
            var d13_2 = -w1e13;
            // Edge23
            // [1 1 ][a2] = [1]
            // [w2.e23 w3.e23][a3] = [0]
            // a1 = 0
            var e23 = Vec2.sub(w3, w2);
            var w2e23 = Vec2.dot(w2, e23);
            var w3e23 = Vec2.dot(w3, e23);
            var d23_1 = w3e23;
            var d23_2 = -w2e23;
            // Triangle123
            var n123 = Vec2.crossVec2Vec2(e12, e13);
            var d123_1 = n123 * Vec2.crossVec2Vec2(w2, w3);
            var d123_2 = n123 * Vec2.crossVec2Vec2(w3, w1);
            var d123_3 = n123 * Vec2.crossVec2Vec2(w1, w2);
            // w1 region
            if (d12_2 <= 0.0 && d13_2 <= 0.0) {
                this.m_v1.a = 1.0;
                this.m_count = 1;
                return;
            }
            // e12
            if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
                var inv_d12 = 1.0 / (d12_1 + d12_2);
                this.m_v1.a = d12_1 * inv_d12;
                this.m_v2.a = d12_2 * inv_d12;
                this.m_count = 2;
                return;
            }
            // e13
            if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
                var inv_d13 = 1.0 / (d13_1 + d13_2);
                this.m_v1.a = d13_1 * inv_d13;
                this.m_v3.a = d13_2 * inv_d13;
                this.m_count = 2;
                this.m_v2.set(this.m_v3);
                return;
            }
            // w2 region
            if (d12_1 <= 0.0 && d23_2 <= 0.0) {
                this.m_v2.a = 1.0;
                this.m_count = 1;
                this.m_v1.set(this.m_v2);
                return;
            }
            // w3 region
            if (d13_1 <= 0.0 && d23_1 <= 0.0) {
                this.m_v3.a = 1.0;
                this.m_count = 1;
                this.m_v1.set(this.m_v3);
                return;
            }
            // e23
            if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
                var inv_d23 = 1.0 / (d23_1 + d23_2);
                this.m_v2.a = d23_1 * inv_d23;
                this.m_v3.a = d23_2 * inv_d23;
                this.m_count = 2;
                this.m_v1.set(this.m_v3);
                return;
            }
            // Must be in triangle123
            var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
            this.m_v1.a = d123_1 * inv_d123;
            this.m_v2.a = d123_2 * inv_d123;
            this.m_v3.a = d123_3 * inv_d123;
            this.m_count = 3;
        };
        return Simplex;
    }());
    /**
     * Determine if two generic shapes overlap.
     */
    function testOverlap(shapeA, indexA, shapeB, indexB, xfA, xfB) {
        var input = new DistanceInput();
        input.proxyA.set(shapeA, indexA);
        input.proxyB.set(shapeB, indexB);
        input.transformA = xfA;
        input.transformB = xfB;
        input.useRadii = true;
        var cache = new SimplexCache();
        var output = new DistanceOutput();
        Distance(output, cache, input);
        return output.distance < 10.0 * math$1.EPSILON;
    }

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
    /**
     * A contact edge is used to connect bodies and contacts together in a contact
     * graph where each body is a node and each contact is an edge. A contact edge
     * belongs to a doubly linked list maintained in each attached body. Each
     * contact has two contact nodes, one for each attached body.
     *
     * @prop {Contact} contact The contact
     * @prop {ContactEdge} prev The previous contact edge in the body's contact list
     * @prop {ContactEdge} next The next contact edge in the body's contact list
     * @prop {Body} other Provides quick access to the other body attached.
     */
    var ContactEdge = /** @class */ (function () {
        function ContactEdge(contact) {
            this.contact = contact;
        }
        return ContactEdge;
    }());
    /**
     * Friction mixing law. The idea is to allow either fixture to drive the
     * restitution to zero. For example, anything slides on ice.
     */
    function mixFriction(friction1, friction2) {
        return math$1.sqrt(friction1 * friction2);
    }
    /**
     * Restitution mixing law. The idea is allow for anything to bounce off an
     * inelastic surface. For example, a superball bounces on anything.
     */
    function mixRestitution(restitution1, restitution2) {
        return restitution1 > restitution2 ? restitution1 : restitution2;
    }
    // TODO: move this to Settings?
    var s_registers = [];
    // TODO: merge with ManifoldPoint?
    var VelocityConstraintPoint = /** @class */ (function () {
        function VelocityConstraintPoint() {
            this.rA = Vec2.zero();
            this.rB = Vec2.zero();
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.normalMass = 0;
            this.tangentMass = 0;
            this.velocityBias = 0;
        }
        return VelocityConstraintPoint;
    }());
    /**
     * The class manages contact between two shapes. A contact exists for each
     * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
     * object may exist that has no contact points.
     */
    var Contact = /** @class */ (function () {
        function Contact(fA, indexA, fB, indexB, evaluateFcn) {
            /** @internal */
            this.m_manifold = new Manifold();
            /** @internal */
            this.m_prev = null;
            /** @internal */
            this.m_next = null;
            /** @internal */
            this.m_toi = 1.0;
            /** @internal */
            this.m_toiCount = 0;
            /** @internal This contact has a valid TOI in m_toi */
            this.m_toiFlag = false;
            /** @internal */
            this.m_tangentSpeed = 0.0;
            /** @internal This contact can be disabled (by user) */
            this.m_enabledFlag = true;
            /** @internal Used when crawling contact graph when forming islands. */
            this.m_islandFlag = false;
            /** @internal Set when the shapes are touching. */
            this.m_touchingFlag = false;
            /** @internal This contact needs filtering because a fixture filter was changed. */
            this.m_filterFlag = false;
            /** @internal This bullet contact had a TOI event */
            this.m_bulletHitFlag = false;
            /** @internal Contact reporting impulse object cache */
            this.m_impulse = new ContactImpulse(this);
            // VelocityConstraint
            /** @internal */ this.v_points = []; // [maxManifoldPoints];
            /** @internal */ this.v_normal = Vec2.zero();
            /** @internal */ this.v_normalMass = new Mat22();
            /** @internal */ this.v_K = new Mat22();
            // PositionConstraint
            /** @internal */ this.p_localPoints = []; // [maxManifoldPoints];
            /** @internal */ this.p_localNormal = Vec2.zero();
            /** @internal */ this.p_localPoint = Vec2.zero();
            /** @internal */ this.p_localCenterA = Vec2.zero();
            /** @internal */ this.p_localCenterB = Vec2.zero();
            // Nodes for connecting bodies.
            this.m_nodeA = new ContactEdge(this);
            this.m_nodeB = new ContactEdge(this);
            this.m_fixtureA = fA;
            this.m_fixtureB = fB;
            this.m_indexA = indexA;
            this.m_indexB = indexB;
            this.m_evaluateFcn = evaluateFcn;
            this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
            this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
        }
        Contact.prototype.initConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            var shapeA = fixtureA.getShape();
            var shapeB = fixtureB.getShape();
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            var manifold = this.getManifold();
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
            this.p_localCenterA = Vec2.clone(bodyA.m_sweep.localCenter);
            this.p_localCenterB = Vec2.clone(bodyB.m_sweep.localCenter);
            this.p_radiusA = shapeA.m_radius;
            this.p_radiusB = shapeB.m_radius;
            this.p_type = manifold.type;
            this.p_localNormal = Vec2.clone(manifold.localNormal);
            this.p_localPoint = Vec2.clone(manifold.localPoint);
            this.p_pointCount = pointCount;
            for (var j = 0; j < pointCount; ++j) {
                var cp = manifold.points[j];
                var vcp = this.v_points[j] = new VelocityConstraintPoint();
                if (step.warmStarting) {
                    vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
                    vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
                }
                else {
                    vcp.normalImpulse = 0.0;
                    vcp.tangentImpulse = 0.0;
                }
                vcp.rA.setZero();
                vcp.rB.setZero();
                vcp.normalMass = 0.0;
                vcp.tangentMass = 0.0;
                vcp.velocityBias = 0.0;
                this.p_localPoints[j] = Vec2.clone(cp.localPoint);
            }
        };
        /**
         * Get the contact manifold. Do not modify the manifold unless you understand
         * the internals of the library.
         */
        Contact.prototype.getManifold = function () {
            return this.m_manifold;
        };
        /**
         * Get the world manifold.
         */
        Contact.prototype.getWorldManifold = function (worldManifold) {
            var bodyA = this.m_fixtureA.getBody();
            var bodyB = this.m_fixtureB.getBody();
            var shapeA = this.m_fixtureA.getShape();
            var shapeB = this.m_fixtureB.getShape();
            return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
        };
        /**
         * Enable/disable this contact. This can be used inside the pre-solve contact
         * listener. The contact is only disabled for the current time step (or sub-step
         * in continuous collisions).
         */
        Contact.prototype.setEnabled = function (flag) {
            this.m_enabledFlag = !!flag;
        };
        /**
         * Has this contact been disabled?
         */
        Contact.prototype.isEnabled = function () {
            return this.m_enabledFlag;
        };
        /**
         * Is this contact touching?
         */
        Contact.prototype.isTouching = function () {
            return this.m_touchingFlag;
        };
        /**
         * Get the next contact in the world's contact list.
         */
        Contact.prototype.getNext = function () {
            return this.m_next;
        };
        /**
         * Get fixture A in this contact.
         */
        Contact.prototype.getFixtureA = function () {
            return this.m_fixtureA;
        };
        /**
         * Get fixture B in this contact.
         */
        Contact.prototype.getFixtureB = function () {
            return this.m_fixtureB;
        };
        /**
         * Get the child primitive index for fixture A.
         */
        Contact.prototype.getChildIndexA = function () {
            return this.m_indexA;
        };
        /**
         * Get the child primitive index for fixture B.
         */
        Contact.prototype.getChildIndexB = function () {
            return this.m_indexB;
        };
        /**
         * Flag this contact for filtering. Filtering will occur the next time step.
         */
        Contact.prototype.flagForFiltering = function () {
            this.m_filterFlag = true;
        };
        /**
         * Override the default friction mixture. You can call this in
         * ContactListener.preSolve. This value persists until set or reset.
         */
        Contact.prototype.setFriction = function (friction) {
            this.m_friction = friction;
        };
        /**
         * Get the friction.
         */
        Contact.prototype.getFriction = function () {
            return this.m_friction;
        };
        /**
         * Reset the friction mixture to the default value.
         */
        Contact.prototype.resetFriction = function () {
            this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
        };
        /**
         * Override the default restitution mixture. You can call this in
         * ContactListener.preSolve. The value persists until you set or reset.
         */
        Contact.prototype.setRestitution = function (restitution) {
            this.m_restitution = restitution;
        };
        /**
         * Get the restitution.
         */
        Contact.prototype.getRestitution = function () {
            return this.m_restitution;
        };
        /**
         * Reset the restitution to the default value.
         */
        Contact.prototype.resetRestitution = function () {
            this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
        };
        /**
         * Set the desired tangent speed for a conveyor belt behavior. In meters per
         * second.
         */
        Contact.prototype.setTangentSpeed = function (speed) {
            this.m_tangentSpeed = speed;
        };
        /**
         * Get the desired tangent speed. In meters per second.
         */
        Contact.prototype.getTangentSpeed = function () {
            return this.m_tangentSpeed;
        };
        /**
         * Called by Update method, and implemented by subclasses.
         */
        Contact.prototype.evaluate = function (manifold, xfA, xfB) {
            this.m_evaluateFcn(manifold, xfA, this.m_fixtureA, this.m_indexA, xfB, this.m_fixtureB, this.m_indexB);
        };
        /**
         * Updates the contact manifold and touching status.
         *
         * Note: do not assume the fixture AABBs are overlapping or are valid.
         *
         * @param listener.beginContact
         * @param listener.endContact
         * @param listener.preSolve
         */
        Contact.prototype.update = function (listener) {
            // Re-enable this contact.
            this.m_enabledFlag = true;
            var touching = false;
            var wasTouching = this.m_touchingFlag;
            var sensorA = this.m_fixtureA.isSensor();
            var sensorB = this.m_fixtureB.isSensor();
            var sensor = sensorA || sensorB;
            var bodyA = this.m_fixtureA.getBody();
            var bodyB = this.m_fixtureB.getBody();
            var xfA = bodyA.getTransform();
            var xfB = bodyB.getTransform();
            var oldManifold;
            // Is this contact a sensor?
            if (sensor) {
                var shapeA = this.m_fixtureA.getShape();
                var shapeB = this.m_fixtureB.getShape();
                touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
                // Sensors don't generate manifolds.
                this.m_manifold.pointCount = 0;
            }
            else {
                // TODO reuse manifold
                oldManifold = this.m_manifold;
                this.m_manifold = new Manifold();
                this.evaluate(this.m_manifold, xfA, xfB);
                touching = this.m_manifold.pointCount > 0;
                // Match old contact ids to new contact ids and copy the
                // stored impulses to warm start the solver.
                for (var i = 0; i < this.m_manifold.pointCount; ++i) {
                    var nmp = this.m_manifold.points[i];
                    nmp.normalImpulse = 0.0;
                    nmp.tangentImpulse = 0.0;
                    for (var j = 0; j < oldManifold.pointCount; ++j) {
                        var omp = oldManifold.points[j];
                        if (omp.id.key == nmp.id.key) {
                            nmp.normalImpulse = omp.normalImpulse;
                            nmp.tangentImpulse = omp.tangentImpulse;
                            break;
                        }
                    }
                }
                if (touching != wasTouching) {
                    bodyA.setAwake(true);
                    bodyB.setAwake(true);
                }
            }
            this.m_touchingFlag = touching;
            if (!wasTouching && touching && listener) {
                listener.beginContact(this);
            }
            if (wasTouching && !touching && listener) {
                listener.endContact(this);
            }
            if (!sensor && touching && listener) {
                listener.preSolve(this, oldManifold);
            }
        };
        Contact.prototype.solvePositionConstraint = function (step) {
            return this._solvePositionConstraint(step);
        };
        Contact.prototype.solvePositionConstraintTOI = function (step, toiA, toiB) {
            return this._solvePositionConstraint(step, toiA, toiB);
        };
        Contact.prototype._solvePositionConstraint = function (step, toiA, toiB) {
            var toi = !!toiA && !!toiB;
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            bodyA.c_velocity;
            bodyB.c_velocity;
            var positionA = bodyA.c_position;
            var positionB = bodyB.c_position;
            var localCenterA = Vec2.clone(this.p_localCenterA);
            var localCenterB = Vec2.clone(this.p_localCenterB);
            var mA = 0.0;
            var iA = 0.0;
            if (!toi || (bodyA == toiA || bodyA == toiB)) {
                mA = this.p_invMassA;
                iA = this.p_invIA;
            }
            var mB = 0.0;
            var iB = 0.0;
            if (!toi || (bodyB == toiA || bodyB == toiB)) {
                mB = this.p_invMassB;
                iB = this.p_invIB;
            }
            var cA = Vec2.clone(positionA.c);
            var aA = positionA.a;
            var cB = Vec2.clone(positionB.c);
            var aB = positionB.a;
            var minSeparation = 0.0;
            // Solve normal constraints
            for (var j = 0; j < this.p_pointCount; ++j) {
                var xfA = Transform.identity();
                var xfB = Transform.identity();
                xfA.q.setAngle(aA);
                xfB.q.setAngle(aB);
                xfA.p = Vec2.sub(cA, Rot.mulVec2(xfA.q, localCenterA));
                xfB.p = Vec2.sub(cB, Rot.mulVec2(xfB.q, localCenterB));
                // PositionSolverManifold
                var normal = void 0;
                var point = void 0;
                var separation = void 0;
                switch (this.p_type) {
                    case ManifoldType.e_circles: {
                        var pointA = Transform.mulVec2(xfA, this.p_localPoint);
                        var pointB = Transform.mulVec2(xfB, this.p_localPoints[0]);
                        normal = Vec2.sub(pointB, pointA);
                        normal.normalize();
                        point = Vec2.combine(0.5, pointA, 0.5, pointB);
                        separation = Vec2.dot(Vec2.sub(pointB, pointA), normal) - this.p_radiusA - this.p_radiusB;
                        break;
                    }
                    case ManifoldType.e_faceA: {
                        normal = Rot.mulVec2(xfA.q, this.p_localNormal);
                        var planePoint = Transform.mulVec2(xfA, this.p_localPoint);
                        var clipPoint = Transform.mulVec2(xfB, this.p_localPoints[j]);
                        separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal) - this.p_radiusA - this.p_radiusB;
                        point = clipPoint;
                        break;
                    }
                    case ManifoldType.e_faceB: {
                        normal = Rot.mulVec2(xfB.q, this.p_localNormal);
                        var planePoint = Transform.mulVec2(xfB, this.p_localPoint);
                        var clipPoint = Transform.mulVec2(xfA, this.p_localPoints[j]);
                        separation = Vec2.dot(Vec2.sub(clipPoint, planePoint), normal) - this.p_radiusA - this.p_radiusB;
                        point = clipPoint;
                        // Ensure normal points from A to B
                        normal.mul(-1);
                        break;
                    }
                }
                var rA = Vec2.sub(point, cA);
                var rB = Vec2.sub(point, cB);
                // Track max constraint error.
                minSeparation = math$1.min(minSeparation, separation);
                var baumgarte = toi ? Settings.toiBaugarte : Settings.baumgarte;
                var linearSlop = Settings.linearSlop;
                var maxLinearCorrection = Settings.maxLinearCorrection;
                // Prevent large corrections and allow slop.
                var C = math$1.clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0.0);
                // Compute the effective mass.
                var rnA = Vec2.crossVec2Vec2(rA, normal);
                var rnB = Vec2.crossVec2Vec2(rB, normal);
                var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                // Compute normal impulse
                var impulse = K > 0.0 ? -C / K : 0.0;
                var P = Vec2.mulNumVec2(impulse, normal);
                cA.subMul(mA, P);
                aA -= iA * Vec2.crossVec2Vec2(rA, P);
                cB.addMul(mB, P);
                aB += iB * Vec2.crossVec2Vec2(rB, P);
            }
            positionA.c.setVec2(cA);
            positionA.a = aA;
            positionB.c.setVec2(cB);
            positionB.a = aB;
            return minSeparation;
        };
        Contact.prototype.initVelocityConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            var velocityA = bodyA.c_velocity;
            var velocityB = bodyB.c_velocity;
            var positionA = bodyA.c_position;
            var positionB = bodyB.c_position;
            var radiusA = this.p_radiusA;
            var radiusB = this.p_radiusB;
            var manifold = this.getManifold();
            var mA = this.v_invMassA;
            var mB = this.v_invMassB;
            var iA = this.v_invIA;
            var iB = this.v_invIB;
            var localCenterA = Vec2.clone(this.p_localCenterA);
            var localCenterB = Vec2.clone(this.p_localCenterB);
            var cA = Vec2.clone(positionA.c);
            var aA = positionA.a;
            var vA = Vec2.clone(velocityA.v);
            var wA = velocityA.w;
            var cB = Vec2.clone(positionB.c);
            var aB = positionB.a;
            var vB = Vec2.clone(velocityB.v);
            var wB = velocityB.w;
            var xfA = Transform.identity();
            var xfB = Transform.identity();
            xfA.q.setAngle(aA);
            xfB.q.setAngle(aB);
            xfA.p.setCombine(1, cA, -1, Rot.mulVec2(xfA.q, localCenterA));
            xfB.p.setCombine(1, cB, -1, Rot.mulVec2(xfB.q, localCenterB));
            var worldManifold = manifold.getWorldManifold(null, xfA, radiusA, xfB, radiusB);
            this.v_normal.setVec2(worldManifold.normal);
            for (var j = 0; j < this.v_pointCount; ++j) {
                var vcp = this.v_points[j]; // VelocityConstraintPoint
                vcp.rA.setVec2(Vec2.sub(worldManifold.points[j], cA));
                vcp.rB.setVec2(Vec2.sub(worldManifold.points[j], cB));
                var rnA = Vec2.crossVec2Vec2(vcp.rA, this.v_normal);
                var rnB = Vec2.crossVec2Vec2(vcp.rB, this.v_normal);
                var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;
                var tangent = Vec2.crossVec2Num(this.v_normal, 1.0);
                var rtA = Vec2.crossVec2Vec2(vcp.rA, tangent);
                var rtB = Vec2.crossVec2Vec2(vcp.rB, tangent);
                var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
                vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;
                // Setup a velocity bias for restitution.
                vcp.velocityBias = 0.0;
                var vRel = Vec2.dot(this.v_normal, vB)
                    + Vec2.dot(this.v_normal, Vec2.crossNumVec2(wB, vcp.rB))
                    - Vec2.dot(this.v_normal, vA)
                    - Vec2.dot(this.v_normal, Vec2.crossNumVec2(wA, vcp.rA));
                if (vRel < -Settings.velocityThreshold) {
                    vcp.velocityBias = -this.v_restitution * vRel;
                }
            }
            // If we have two points, then prepare the block solver.
            if (this.v_pointCount == 2 && step.blockSolve) {
                var vcp1 = this.v_points[0]; // VelocityConstraintPoint
                var vcp2 = this.v_points[1]; // VelocityConstraintPoint
                var rn1A = Vec2.crossVec2Vec2(vcp1.rA, this.v_normal);
                var rn1B = Vec2.crossVec2Vec2(vcp1.rB, this.v_normal);
                var rn2A = Vec2.crossVec2Vec2(vcp2.rA, this.v_normal);
                var rn2B = Vec2.crossVec2Vec2(vcp2.rB, this.v_normal);
                var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
                var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
                var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
                // Ensure a reasonable condition number.
                var k_maxConditionNumber = 1000.0;
                if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                    // K is safe to invert.
                    this.v_K.ex.setNum(k11, k12);
                    this.v_K.ey.setNum(k12, k22);
                    this.v_normalMass.set(this.v_K.getInverse());
                }
                else {
                    // The constraints are redundant, just use one.
                    // TODO_ERIN use deepest?
                    this.v_pointCount = 1;
                }
            }
            positionA.c.setVec2(cA);
            positionA.a = aA;
            velocityA.v.setVec2(vA);
            velocityA.w = wA;
            positionB.c.setVec2(cB);
            positionB.a = aB;
            velocityB.v.setVec2(vB);
            velocityB.w = wB;
        };
        Contact.prototype.warmStartConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            var velocityA = bodyA.c_velocity;
            var velocityB = bodyB.c_velocity;
            bodyA.c_position;
            bodyB.c_position;
            var mA = this.v_invMassA;
            var iA = this.v_invIA;
            var mB = this.v_invMassB;
            var iB = this.v_invIB;
            var vA = Vec2.clone(velocityA.v);
            var wA = velocityA.w;
            var vB = Vec2.clone(velocityB.v);
            var wB = velocityB.w;
            var normal = this.v_normal;
            var tangent = Vec2.crossVec2Num(normal, 1.0);
            for (var j = 0; j < this.v_pointCount; ++j) {
                var vcp = this.v_points[j]; // VelocityConstraintPoint
                var P = Vec2.combine(vcp.normalImpulse, normal, vcp.tangentImpulse, tangent);
                wA -= iA * Vec2.crossVec2Vec2(vcp.rA, P);
                vA.subMul(mA, P);
                wB += iB * Vec2.crossVec2Vec2(vcp.rB, P);
                vB.addMul(mB, P);
            }
            velocityA.v.setVec2(vA);
            velocityA.w = wA;
            velocityB.v.setVec2(vB);
            velocityB.w = wB;
        };
        Contact.prototype.storeConstraintImpulses = function (step) {
            var manifold = this.m_manifold;
            for (var j = 0; j < this.v_pointCount; ++j) {
                manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
                manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
            }
        };
        Contact.prototype.solveVelocityConstraint = function (step) {
            var bodyA = this.m_fixtureA.m_body;
            var bodyB = this.m_fixtureB.m_body;
            var velocityA = bodyA.c_velocity;
            bodyA.c_position;
            var velocityB = bodyB.c_velocity;
            bodyB.c_position;
            var mA = this.v_invMassA;
            var iA = this.v_invIA;
            var mB = this.v_invMassB;
            var iB = this.v_invIB;
            var vA = Vec2.clone(velocityA.v);
            var wA = velocityA.w;
            var vB = Vec2.clone(velocityB.v);
            var wB = velocityB.w;
            var normal = this.v_normal;
            var tangent = Vec2.crossVec2Num(normal, 1.0);
            var friction = this.v_friction;
            // Solve tangent constraints first because non-penetration is more important
            // than friction.
            for (var j = 0; j < this.v_pointCount; ++j) {
                var vcp = this.v_points[j]; // VelocityConstraintPoint
                // Relative velocity at contact
                var dv = Vec2.zero();
                dv.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, vcp.rB));
                dv.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, vcp.rA));
                // Compute tangent force
                var vt = Vec2.dot(dv, tangent) - this.v_tangentSpeed;
                var lambda = vcp.tangentMass * (-vt);
                // Clamp the accumulated force
                var maxFriction = friction * vcp.normalImpulse;
                var newImpulse = math$1.clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
                lambda = newImpulse - vcp.tangentImpulse;
                vcp.tangentImpulse = newImpulse;
                // Apply contact impulse
                var P = Vec2.mulNumVec2(lambda, tangent);
                vA.subMul(mA, P);
                wA -= iA * Vec2.crossVec2Vec2(vcp.rA, P);
                vB.addMul(mB, P);
                wB += iB * Vec2.crossVec2Vec2(vcp.rB, P);
            }
            // Solve normal constraints
            if (this.v_pointCount == 1 || step.blockSolve == false) {
                for (var i = 0; i < this.v_pointCount; ++i) {
                    var vcp = this.v_points[i]; // VelocityConstraintPoint
                    // Relative velocity at contact
                    var dv = Vec2.zero();
                    dv.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, vcp.rB));
                    dv.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, vcp.rA));
                    // Compute normal impulse
                    var vn = Vec2.dot(dv, normal);
                    var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
                    // Clamp the accumulated impulse
                    var newImpulse = math$1.max(vcp.normalImpulse + lambda, 0.0);
                    lambda = newImpulse - vcp.normalImpulse;
                    vcp.normalImpulse = newImpulse;
                    // Apply contact impulse
                    var P = Vec2.mulNumVec2(lambda, normal);
                    vA.subMul(mA, P);
                    wA -= iA * Vec2.crossVec2Vec2(vcp.rA, P);
                    vB.addMul(mB, P);
                    wB += iB * Vec2.crossVec2Vec2(vcp.rB, P);
                }
            }
            else {
                // Block solver developed in collaboration with Dirk Gregorius (back in
                // 01/07 on Box2D_Lite).
                // Build the mini LCP for this contact patch
                //
                // vn = A * x + b, vn >= 0, , vn >= 0, x >= 0 and vn_i * x_i = 0 with i =
                // 1..2
                //
                // A = J * W * JT and J = ( -n, -r1 x n, n, r2 x n )
                // b = vn0 - velocityBias
                //
                // The system is solved using the "Total enumeration method" (s. Murty).
                // The complementary constraint vn_i * x_i
                // implies that we must have in any solution either vn_i = 0 or x_i = 0.
                // So for the 2D contact problem the cases
                // vn1 = 0 and vn2 = 0, x1 = 0 and x2 = 0, x1 = 0 and vn2 = 0, x2 = 0 and
                // vn1 = 0 need to be tested. The first valid
                // solution that satisfies the problem is chosen.
                //
                // In order to account of the accumulated impulse 'a' (because of the
                // iterative nature of the solver which only requires
                // that the accumulated impulse is clamped and not the incremental
                // impulse) we change the impulse variable (x_i).
                //
                // Substitute:
                //
                // x = a + d
                //
                // a := old total impulse
                // x := new total impulse
                // d := incremental impulse
                //
                // For the current iteration we extend the formula for the incremental
                // impulse
                // to compute the new total impulse:
                //
                // vn = A * d + b
                // = A * (x - a) + b
                // = A * x + b - A * a
                // = A * x + b'
                // b' = b - A * a;
                var vcp1 = this.v_points[0]; // VelocityConstraintPoint
                var vcp2 = this.v_points[1]; // VelocityConstraintPoint
                var a = Vec2.neo(vcp1.normalImpulse, vcp2.normalImpulse);
                // Relative velocity at contact
                var dv1 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp1.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp1.rA));
                var dv2 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp2.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp2.rA));
                // Compute normal velocity
                var vn1 = Vec2.dot(dv1, normal);
                var vn2 = Vec2.dot(dv2, normal);
                var b = Vec2.neo(vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
                // Compute b'
                b.sub(Mat22.mulVec2(this.v_K, a));
                // NOT_USED(k_errorTol);
                while (true) {
                    //
                    // Case 1: vn = 0
                    //
                    // 0 = A * x + b'
                    //
                    // Solve for x:
                    //
                    // x = - inv(A) * b'
                    //
                    var x = Mat22.mulVec2(this.v_normalMass, b).neg();
                    if (x.x >= 0.0 && x.y >= 0.0) {
                        // Get the incremental impulse
                        var d = Vec2.sub(x, a);
                        // Apply incremental impulse
                        var P1 = Vec2.mulNumVec2(d.x, normal);
                        var P2 = Vec2.mulNumVec2(d.y, normal);
                        vA.subCombine(mA, P1, mA, P2);
                        wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));
                        vB.addCombine(mB, P1, mB, P2);
                        wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 2: vn1 = 0 and x2 = 0
                    //
                    // 0 = a11 * x1 + a12 * 0 + b1'
                    // vn2 = a21 * x1 + a22 * 0 + b2'
                    //
                    x.x = -vcp1.normalMass * b.x;
                    x.y = 0.0;
                    vn1 = 0.0;
                    vn2 = this.v_K.ex.y * x.x + b.y;
                    if (x.x >= 0.0 && vn2 >= 0.0) {
                        // Get the incremental impulse
                        var d = Vec2.sub(x, a);
                        // Apply incremental impulse
                        var P1 = Vec2.mulNumVec2(d.x, normal);
                        var P2 = Vec2.mulNumVec2(d.y, normal);
                        vA.subCombine(mA, P1, mA, P2);
                        wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));
                        vB.addCombine(mB, P1, mB, P2);
                        wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 3: vn2 = 0 and x1 = 0
                    //
                    // vn1 = a11 * 0 + a12 * x2 + b1'
                    // 0 = a21 * 0 + a22 * x2 + b2'
                    //
                    x.x = 0.0;
                    x.y = -vcp2.normalMass * b.y;
                    vn1 = this.v_K.ey.x * x.y + b.x;
                    vn2 = 0.0;
                    if (x.y >= 0.0 && vn1 >= 0.0) {
                        // Resubstitute for the incremental impulse
                        var d = Vec2.sub(x, a);
                        // Apply incremental impulse
                        var P1 = Vec2.mulNumVec2(d.x, normal);
                        var P2 = Vec2.mulNumVec2(d.y, normal);
                        vA.subCombine(mA, P1, mA, P2);
                        wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));
                        vB.addCombine(mB, P1, mB, P2);
                        wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 4: x1 = 0 and x2 = 0
                    //
                    // vn1 = b1
                    // vn2 = b2;
                    //
                    x.x = 0.0;
                    x.y = 0.0;
                    vn1 = b.x;
                    vn2 = b.y;
                    if (vn1 >= 0.0 && vn2 >= 0.0) {
                        // Resubstitute for the incremental impulse
                        var d = Vec2.sub(x, a);
                        // Apply incremental impulse
                        var P1 = Vec2.mulNumVec2(d.x, normal);
                        var P2 = Vec2.mulNumVec2(d.y, normal);
                        vA.subCombine(mA, P1, mA, P2);
                        wA -= iA * (Vec2.crossVec2Vec2(vcp1.rA, P1) + Vec2.crossVec2Vec2(vcp2.rA, P2));
                        vB.addCombine(mB, P1, mB, P2);
                        wB += iB * (Vec2.crossVec2Vec2(vcp1.rB, P1) + Vec2.crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    // No solution, give up. This is hit sometimes, but it doesn't seem to
                    // matter.
                    break;
                }
            }
            velocityA.v.setVec2(vA);
            velocityA.w = wA;
            velocityB.v.setVec2(vB);
            velocityB.w = wB;
        };
        /**
         * @internal
         */
        Contact.addType = function (type1, type2, callback) {
            s_registers[type1] = s_registers[type1] || {};
            s_registers[type1][type2] = callback;
        };
        /**
         * @internal
         */
        Contact.create = function (fixtureA, indexA, fixtureB, indexB) {
            var typeA = fixtureA.getType();
            var typeB = fixtureB.getType();
            // TODO: pool contacts
            var contact;
            var evaluateFcn;
            if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
                contact = new Contact(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
            }
            else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
                contact = new Contact(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
            }
            else {
                return null;
            }
            // Contact creation may swap fixtures.
            fixtureA = contact.getFixtureA();
            fixtureB = contact.getFixtureB();
            indexA = contact.getChildIndexA();
            indexB = contact.getChildIndexB();
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            // Connect to body A
            contact.m_nodeA.contact = contact;
            contact.m_nodeA.other = bodyB;
            contact.m_nodeA.prev = null;
            contact.m_nodeA.next = bodyA.m_contactList;
            if (bodyA.m_contactList != null) {
                bodyA.m_contactList.prev = contact.m_nodeA;
            }
            bodyA.m_contactList = contact.m_nodeA;
            // Connect to body B
            contact.m_nodeB.contact = contact;
            contact.m_nodeB.other = bodyA;
            contact.m_nodeB.prev = null;
            contact.m_nodeB.next = bodyB.m_contactList;
            if (bodyB.m_contactList != null) {
                bodyB.m_contactList.prev = contact.m_nodeB;
            }
            bodyB.m_contactList = contact.m_nodeB;
            // Wake up the bodies
            if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
                bodyA.setAwake(true);
                bodyB.setAwake(true);
            }
            return contact;
        };
        /**
         * @internal
         */
        Contact.destroy = function (contact, listener) {
            var fixtureA = contact.m_fixtureA;
            var fixtureB = contact.m_fixtureB;
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            if (contact.isTouching()) {
                listener.endContact(contact);
            }
            // Remove from body 1
            if (contact.m_nodeA.prev) {
                contact.m_nodeA.prev.next = contact.m_nodeA.next;
            }
            if (contact.m_nodeA.next) {
                contact.m_nodeA.next.prev = contact.m_nodeA.prev;
            }
            if (contact.m_nodeA == bodyA.m_contactList) {
                bodyA.m_contactList = contact.m_nodeA.next;
            }
            // Remove from body 2
            if (contact.m_nodeB.prev) {
                contact.m_nodeB.prev.next = contact.m_nodeB.next;
            }
            if (contact.m_nodeB.next) {
                contact.m_nodeB.next.prev = contact.m_nodeB.prev;
            }
            if (contact.m_nodeB == bodyB.m_contactList) {
                bodyB.m_contactList = contact.m_nodeB.next;
            }
            if (contact.m_manifold.pointCount > 0 && fixtureA.isSensor() == false
                && fixtureB.isSensor() == false) {
                bodyA.setAwake(true);
                bodyB.setAwake(true);
            }
            fixtureA.getType();
            fixtureB.getType();
            // const destroyFcn = s_registers[typeA][typeB].destroyFcn;
            // if (typeof destroyFcn === 'function') {
            //   destroyFcn(contact);
            // }
        };
        return Contact;
    }());

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
    /**
     * A joint edge is used to connect bodies and joints together in a joint graph
     * where each body is a node and each joint is an edge. A joint edge belongs to
     * a doubly linked list maintained in each attached body. Each joint has two
     * joint nodes, one for each attached body.
     */
    var JointEdge = /** @class */ (function () {
        function JointEdge() {
            /**
             * provides quick access to the other body attached.
             */
            this.other = null;
            /**
             * the joint
             */
            this.joint = null;
            /**
             * prev the previous joint edge in the body's joint list
             */
            this.prev = null;
            /**
             * the next joint edge in the body's joint list
             */
            this.next = null;
        }
        return JointEdge;
    }());
    /**
     * The base joint class. Joints are used to constraint two bodies together in
     * various fashions. Some joints also feature limits and motors.
     */
    var Joint = /** @class */ (function () {
        function Joint(def, bodyA, bodyB) {
            /** @internal */ this.m_type = 'unknown-joint';
            /** @internal */ this.m_prev = null;
            /** @internal */ this.m_next = null;
            /** @internal */ this.m_edgeA = new JointEdge();
            /** @internal */ this.m_edgeB = new JointEdge();
            /** @internal */ this.m_islandFlag = false;
            bodyA = 'bodyA' in def ? def.bodyA : bodyA;
            bodyB = 'bodyB' in def ? def.bodyB : bodyB;
            this.m_bodyA = bodyA;
            this.m_bodyB = bodyB;
            this.m_collideConnected = !!def.collideConnected;
            this.m_userData = def.userData;
        }
        /**
         * Short-cut function to determine if either body is inactive.
         */
        Joint.prototype.isActive = function () {
            return this.m_bodyA.isActive() && this.m_bodyB.isActive();
        };
        /**
         * Get the type of the concrete joint.
         */
        Joint.prototype.getType = function () {
            return this.m_type;
        };
        /**
         * Get the first body attached to this joint.
         */
        Joint.prototype.getBodyA = function () {
            return this.m_bodyA;
        };
        /**
         * Get the second body attached to this joint.
         */
        Joint.prototype.getBodyB = function () {
            return this.m_bodyB;
        };
        /**
         * Get the next joint the world joint list.
         */
        Joint.prototype.getNext = function () {
            return this.m_next;
        };
        Joint.prototype.getUserData = function () {
            return this.m_userData;
        };
        Joint.prototype.setUserData = function (data) {
            this.m_userData = data;
        };
        /**
         * Get collide connected. Note: modifying the collide connect flag won't work
         * correctly because the flag is only checked when fixture AABBs begin to
         * overlap.
         */
        Joint.prototype.getCollideConnected = function () {
            return this.m_collideConnected;
        };
        /**
         * Shift the origin for any points stored in world coordinates.
         */
        Joint.prototype.shiftOrigin = function (newOrigin) { };
        return Joint;
    }());

    var now = function () {
        return Date.now();
    };
    var diff = function (time) {
        return Date.now() - time;
    };
    var Timer = {
        now: now,
        diff: diff,
    };

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
    /**
     * Input parameters for TimeOfImpact.
     */
    var TOIInput = /** @class */ (function () {
        function TOIInput() {
            this.proxyA = new DistanceProxy();
            this.proxyB = new DistanceProxy();
            this.sweepA = new Sweep();
            this.sweepB = new Sweep();
        }
        return TOIInput;
    }());
    var TOIOutputState;
    (function (TOIOutputState) {
        TOIOutputState[TOIOutputState["e_unknown"] = 0] = "e_unknown";
        TOIOutputState[TOIOutputState["e_failed"] = 1] = "e_failed";
        TOIOutputState[TOIOutputState["e_overlapped"] = 2] = "e_overlapped";
        TOIOutputState[TOIOutputState["e_touching"] = 3] = "e_touching";
        TOIOutputState[TOIOutputState["e_separated"] = 4] = "e_separated";
    })(TOIOutputState || (TOIOutputState = {}));
    /**
     * Output parameters for TimeOfImpact.
     */
    var TOIOutput = /** @class */ (function () {
        function TOIOutput() {
        }
        return TOIOutput;
    }());
    stats$1.toiTime = 0;
    stats$1.toiMaxTime = 0;
    stats$1.toiCalls = 0;
    stats$1.toiIters = 0;
    stats$1.toiMaxIters = 0;
    stats$1.toiRootIters = 0;
    stats$1.toiMaxRootIters = 0;
    /**
     * Compute the upper bound on time before two shapes penetrate. Time is
     * represented as a fraction between [0,tMax]. This uses a swept separating axis
     * and may miss some intermediate, non-tunneling collision. If you change the
     * time interval, you should call this function again.
     *
     * Note: use Distance to compute the contact point and normal at the time of
     * impact.
     *
     * CCD via the local separating axis method. This seeks progression by computing
     * the largest time at which separation is maintained.
     */
    function TimeOfImpact(output, input) {
        var timer = Timer.now();
        ++stats$1.toiCalls;
        output.state = TOIOutputState.e_unknown;
        output.t = input.tMax;
        var proxyA = input.proxyA; // DistanceProxy
        var proxyB = input.proxyB; // DistanceProxy
        var sweepA = input.sweepA; // Sweep
        var sweepB = input.sweepB; // Sweep
        // Large rotations can make the root finder fail, so we normalize the
        // sweep angles.
        sweepA.normalize();
        sweepB.normalize();
        var tMax = input.tMax;
        var totalRadius = proxyA.m_radius + proxyB.m_radius;
        var target = math$1.max(Settings.linearSlop, totalRadius - 3.0 * Settings.linearSlop);
        var tolerance = 0.25 * Settings.linearSlop;
        var t1 = 0.0;
        var k_maxIterations = Settings.maxTOIIterations;
        var iter = 0;
        // Prepare input for distance query.
        var cache = new SimplexCache();
        var distanceInput = new DistanceInput();
        distanceInput.proxyA = input.proxyA;
        distanceInput.proxyB = input.proxyB;
        distanceInput.useRadii = false;
        // The outer loop progressively attempts to compute new separating axes.
        // This loop terminates when an axis is repeated (no progress is made).
        while (true) {
            var xfA = Transform.identity();
            var xfB = Transform.identity();
            sweepA.getTransform(xfA, t1);
            sweepB.getTransform(xfB, t1);
            // Get the distance between shapes. We can also use the results
            // to get a separating axis.
            distanceInput.transformA = xfA;
            distanceInput.transformB = xfB;
            var distanceOutput = new DistanceOutput();
            Distance(distanceOutput, cache, distanceInput);
            // If the shapes are overlapped, we give up on continuous collision.
            if (distanceOutput.distance <= 0.0) {
                // Failure!
                output.state = TOIOutputState.e_overlapped;
                output.t = 0.0;
                break;
            }
            if (distanceOutput.distance < target + tolerance) {
                // Victory!
                output.state = TOIOutputState.e_touching;
                output.t = t1;
                break;
            }
            // Initialize the separating axis.
            var fcn = new SeparationFunction();
            fcn.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
            // if (false) {
            //   // Dump the curve seen by the root finder
            //   const N = 100;
            //   const dx = 1.0 / N;
            //   const xs = []; // [ N + 1 ];
            //   const fs = []; // [ N + 1 ];
            //   const x = 0.0;
            //   for (const i = 0; i <= N; ++i) {
            //     sweepA.getTransform(xfA, x);
            //     sweepB.getTransform(xfB, x);
            //     const f = fcn.evaluate(xfA, xfB) - target;
            //     printf("%g %g\n", x, f);
            //     xs[i] = x;
            //     fs[i] = f;
            //     x += dx;
            //   }
            // }
            // Compute the TOI on the separating axis. We do this by successively
            // resolving the deepest point. This loop is bounded by the number of
            // vertices.
            var done = false;
            var t2 = tMax;
            var pushBackIter = 0;
            while (true) {
                // Find the deepest point at t2. Store the witness point indices.
                var s2 = fcn.findMinSeparation(t2);
                // const indexA = fcn.indexA;
                // const indexB = fcn.indexB;
                // Is the final configuration separated?
                if (s2 > target + tolerance) {
                    // Victory!
                    output.state = TOIOutputState.e_separated;
                    output.t = tMax;
                    done = true;
                    break;
                }
                // Has the separation reached tolerance?
                if (s2 > target - tolerance) {
                    // Advance the sweeps
                    t1 = t2;
                    break;
                }
                // Compute the initial separation of the witness points.
                var s1 = fcn.evaluate(t1);
                // const indexA = fcn.indexA;
                // const indexB = fcn.indexB;
                // Check for initial overlap. This might happen if the root finder
                // runs out of iterations.
                if (s1 < target - tolerance) {
                    output.state = TOIOutputState.e_failed;
                    output.t = t1;
                    done = true;
                    break;
                }
                // Check for touching
                if (s1 <= target + tolerance) {
                    // Victory! t1 should hold the TOI (could be 0.0).
                    output.state = TOIOutputState.e_touching;
                    output.t = t1;
                    done = true;
                    break;
                }
                // Compute 1D root of: f(x) - target = 0
                var rootIterCount = 0;
                var a1 = t1;
                var a2 = t2;
                while (true) {
                    // Use a mix of the secant rule and bisection.
                    var t = void 0;
                    if (rootIterCount & 1) {
                        // Secant rule to improve convergence.
                        t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
                    }
                    else {
                        // Bisection to guarantee progress.
                        t = 0.5 * (a1 + a2);
                    }
                    ++rootIterCount;
                    ++stats$1.toiRootIters;
                    var s = fcn.evaluate(t);
                    fcn.indexA;
                    fcn.indexB;
                    if (math$1.abs(s - target) < tolerance) {
                        // t2 holds a tentative value for t1
                        t2 = t;
                        break;
                    }
                    // Ensure we continue to bracket the root.
                    if (s > target) {
                        a1 = t;
                        s1 = s;
                    }
                    else {
                        a2 = t;
                        s2 = s;
                    }
                    if (rootIterCount === 50) {
                        break;
                    }
                }
                stats$1.toiMaxRootIters = math$1.max(stats$1.toiMaxRootIters, rootIterCount);
                ++pushBackIter;
                if (pushBackIter === Settings.maxPolygonVertices) {
                    break;
                }
            }
            ++iter;
            ++stats$1.toiIters;
            if (done) {
                break;
            }
            if (iter === k_maxIterations) {
                // Root finder got stuck. Semi-victory.
                output.state = TOIOutputState.e_failed;
                output.t = t1;
                break;
            }
        }
        stats$1.toiMaxIters = math$1.max(stats$1.toiMaxIters, iter);
        var time = Timer.diff(timer);
        stats$1.toiMaxTime = math$1.max(stats$1.toiMaxTime, time);
        stats$1.toiTime += time;
    }
    var SeparationFunctionType;
    (function (SeparationFunctionType) {
        SeparationFunctionType[SeparationFunctionType["e_points"] = 1] = "e_points";
        SeparationFunctionType[SeparationFunctionType["e_faceA"] = 2] = "e_faceA";
        SeparationFunctionType[SeparationFunctionType["e_faceB"] = 3] = "e_faceB";
    })(SeparationFunctionType || (SeparationFunctionType = {}));
    var SeparationFunction = /** @class */ (function () {
        function SeparationFunction() {
            this.m_proxyA = new DistanceProxy();
            this.m_proxyB = new DistanceProxy();
            this.m_localPoint = Vec2.zero();
            this.m_axis = Vec2.zero();
        }
        // TODO_ERIN might not need to return the separation
        SeparationFunction.prototype.initialize = function (cache, proxyA, sweepA, proxyB, sweepB, t1) {
            this.m_proxyA = proxyA;
            this.m_proxyB = proxyB;
            var count = cache.count;
            this.m_sweepA = sweepA;
            this.m_sweepB = sweepB;
            var xfA = Transform.identity();
            var xfB = Transform.identity();
            this.m_sweepA.getTransform(xfA, t1);
            this.m_sweepB.getTransform(xfB, t1);
            if (count === 1) {
                this.m_type = SeparationFunctionType.e_points;
                var localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
                var localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
                var pointA = Transform.mulVec2(xfA, localPointA);
                var pointB = Transform.mulVec2(xfB, localPointB);
                this.m_axis.setCombine(1, pointB, -1, pointA);
                var s = this.m_axis.normalize();
                return s;
            }
            else if (cache.indexA[0] === cache.indexA[1]) {
                // Two points on B and one on A.
                this.m_type = SeparationFunctionType.e_faceB;
                var localPointB1 = proxyB.getVertex(cache.indexB[0]);
                var localPointB2 = proxyB.getVertex(cache.indexB[1]);
                this.m_axis = Vec2.crossVec2Num(Vec2.sub(localPointB2, localPointB1), 1.0);
                this.m_axis.normalize();
                var normal = Rot.mulVec2(xfB.q, this.m_axis);
                this.m_localPoint = Vec2.mid(localPointB1, localPointB2);
                var pointB = Transform.mulVec2(xfB, this.m_localPoint);
                var localPointA = proxyA.getVertex(cache.indexA[0]);
                var pointA = Transform.mulVec2(xfA, localPointA);
                var s = Vec2.dot(pointA, normal) - Vec2.dot(pointB, normal);
                if (s < 0.0) {
                    this.m_axis = Vec2.neg(this.m_axis);
                    s = -s;
                }
                return s;
            }
            else {
                // Two points on A and one or two points on B.
                this.m_type = SeparationFunctionType.e_faceA;
                var localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
                var localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
                this.m_axis = Vec2.crossVec2Num(Vec2.sub(localPointA2, localPointA1), 1.0);
                this.m_axis.normalize();
                var normal = Rot.mulVec2(xfA.q, this.m_axis);
                this.m_localPoint = Vec2.mid(localPointA1, localPointA2);
                var pointA = Transform.mulVec2(xfA, this.m_localPoint);
                var localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
                var pointB = Transform.mulVec2(xfB, localPointB);
                var s = Vec2.dot(pointB, normal) - Vec2.dot(pointA, normal);
                if (s < 0.0) {
                    this.m_axis = Vec2.neg(this.m_axis);
                    s = -s;
                }
                return s;
            }
        };
        SeparationFunction.prototype.compute = function (find, t) {
            // It was findMinSeparation and evaluate
            var xfA = Transform.identity();
            var xfB = Transform.identity();
            this.m_sweepA.getTransform(xfA, t);
            this.m_sweepB.getTransform(xfB, t);
            switch (this.m_type) {
                case SeparationFunctionType.e_points: {
                    if (find) {
                        var axisA = Rot.mulTVec2(xfA.q, this.m_axis);
                        var axisB = Rot.mulTVec2(xfB.q, Vec2.neg(this.m_axis));
                        this.indexA = this.m_proxyA.getSupport(axisA);
                        this.indexB = this.m_proxyB.getSupport(axisB);
                    }
                    var localPointA = this.m_proxyA.getVertex(this.indexA);
                    var localPointB = this.m_proxyB.getVertex(this.indexB);
                    var pointA = Transform.mulVec2(xfA, localPointA);
                    var pointB = Transform.mulVec2(xfB, localPointB);
                    var sep = Vec2.dot(pointB, this.m_axis) - Vec2.dot(pointA, this.m_axis);
                    return sep;
                }
                case SeparationFunctionType.e_faceA: {
                    var normal = Rot.mulVec2(xfA.q, this.m_axis);
                    var pointA = Transform.mulVec2(xfA, this.m_localPoint);
                    if (find) {
                        var axisB = Rot.mulTVec2(xfB.q, Vec2.neg(normal));
                        this.indexA = -1;
                        this.indexB = this.m_proxyB.getSupport(axisB);
                    }
                    var localPointB = this.m_proxyB.getVertex(this.indexB);
                    var pointB = Transform.mulVec2(xfB, localPointB);
                    var sep = Vec2.dot(pointB, normal) - Vec2.dot(pointA, normal);
                    return sep;
                }
                case SeparationFunctionType.e_faceB: {
                    var normal = Rot.mulVec2(xfB.q, this.m_axis);
                    var pointB = Transform.mulVec2(xfB, this.m_localPoint);
                    if (find) {
                        var axisA = Rot.mulTVec2(xfA.q, Vec2.neg(normal));
                        this.indexB = -1;
                        this.indexA = this.m_proxyA.getSupport(axisA);
                    }
                    var localPointA = this.m_proxyA.getVertex(this.indexA);
                    var pointA = Transform.mulVec2(xfA, localPointA);
                    var sep = Vec2.dot(pointA, normal) - Vec2.dot(pointB, normal);
                    return sep;
                }
                default:
                    if (find) {
                        this.indexA = -1;
                        this.indexB = -1;
                    }
                    return 0.0;
            }
        };
        SeparationFunction.prototype.findMinSeparation = function (t) {
            return this.compute(true, t);
        };
        SeparationFunction.prototype.evaluate = function (t) {
            return this.compute(false, t);
        };
        return SeparationFunction;
    }());

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
    var TimeStep = /** @class */ (function () {
        function TimeStep() {
            /** time step */
            this.dt = 0;
            /** inverse time step (0 if dt == 0) */
            this.inv_dt = 0;
            this.velocityIterations = 0;
            this.positionIterations = 0;
            this.warmStarting = false;
            this.blockSolve = true;
            /** timestep ratio for variable timestep */
            this.inv_dt0 = 0.0;
            /** dt * inv_dt0 */
            this.dtRatio = 1;
        }
        TimeStep.prototype.reset = function (dt) {
            if (this.dt > 0.0) {
                this.inv_dt0 = this.inv_dt;
            }
            this.dt = dt;
            this.inv_dt = dt == 0 ? 0 : 1 / dt;
            this.dtRatio = dt * this.inv_dt0;
        };
        return TimeStep;
    }());
    // reuse
    var s_subStep = new TimeStep();
    /**
     * Contact impulses for reporting. Impulses are used instead of forces because
     * sub-step forces may approach infinity for rigid body collisions. These match
     * up one-to-one with the contact points in Manifold.
     */
    var ContactImpulse = /** @class */ (function () {
        function ContactImpulse(contact) {
            this.contact = contact;
            this.normals = [];
            this.tangents = [];
        }
        Object.defineProperty(ContactImpulse.prototype, "normalImpulses", {
            get: function () {
                var contact = this.contact;
                var normals = this.normals;
                normals.length = 0;
                for (var p = 0; p < contact.v_points.length; ++p) {
                    normals.push(contact.v_points[p].normalImpulse);
                }
                return normals;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ContactImpulse.prototype, "tangentImpulses", {
            get: function () {
                var contact = this.contact;
                var tangents = this.tangents;
                tangents.length = 0;
                for (var p = 0; p < contact.v_points.length; ++p) {
                    tangents.push(contact.v_points[p].tangentImpulse);
                }
                return tangents;
            },
            enumerable: false,
            configurable: true
        });
        return ContactImpulse;
    }());
    /**
     * Finds and solves islands. An island is a connected subset of the world.
     */
    var Solver = /** @class */ (function () {
        function Solver(world) {
            this.m_world = world;
            this.m_stack = [];
            this.m_bodies = [];
            this.m_contacts = [];
            this.m_joints = [];
        }
        Solver.prototype.clear = function () {
            this.m_stack.length = 0;
            this.m_bodies.length = 0;
            this.m_contacts.length = 0;
            this.m_joints.length = 0;
        };
        Solver.prototype.addBody = function (body) {
            this.m_bodies.push(body);
            // why?
            // body.c_position.c.setZero();
            // body.c_position.a = 0;
            // body.c_velocity.v.setZero();
            // body.c_velocity.w = 0;
        };
        Solver.prototype.addContact = function (contact) {
            this.m_contacts.push(contact);
        };
        Solver.prototype.addJoint = function (joint) {
            this.m_joints.push(joint);
        };
        Solver.prototype.solveWorld = function (step) {
            var world = this.m_world;
            // Clear all the island flags.
            for (var b = world.m_bodyList; b; b = b.m_next) {
                b.m_islandFlag = false;
            }
            for (var c = world.m_contactList; c; c = c.m_next) {
                c.m_islandFlag = false;
            }
            for (var j = world.m_jointList; j; j = j.m_next) {
                j.m_islandFlag = false;
            }
            // Build and simulate all awake islands.
            var stack = this.m_stack;
            for (var seed = world.m_bodyList; seed; seed = seed.m_next) {
                if (seed.m_islandFlag) {
                    continue;
                }
                if (seed.isAwake() == false || seed.isActive() == false) {
                    continue;
                }
                // The seed can be dynamic or kinematic.
                if (seed.isStatic()) {
                    continue;
                }
                // Reset island and stack.
                this.clear();
                stack.push(seed);
                seed.m_islandFlag = true;
                // Perform a depth first search (DFS) on the constraint graph.
                while (stack.length > 0) {
                    // Grab the next body off the stack and add it to the island.
                    var b = stack.pop();
                    this.addBody(b);
                    // Make sure the body is awake.
                    b.setAwake(true);
                    // To keep islands as small as possible, we don't
                    // propagate islands across static bodies.
                    if (b.isStatic()) {
                        continue;
                    }
                    // Search all contacts connected to this body.
                    for (var ce = b.m_contactList; ce; ce = ce.next) {
                        var contact = ce.contact;
                        // Has this contact already been added to an island?
                        if (contact.m_islandFlag) {
                            continue;
                        }
                        // Is this contact solid and touching?
                        if (contact.isEnabled() == false || contact.isTouching() == false) {
                            continue;
                        }
                        // Skip sensors.
                        var sensorA = contact.m_fixtureA.m_isSensor;
                        var sensorB = contact.m_fixtureB.m_isSensor;
                        if (sensorA || sensorB) {
                            continue;
                        }
                        this.addContact(contact);
                        contact.m_islandFlag = true;
                        var other = ce.other;
                        // Was the other body already added to this island?
                        if (other.m_islandFlag) {
                            continue;
                        }
                        // _ASSERT && common.assert(stack.length < world.m_bodyCount);
                        stack.push(other);
                        other.m_islandFlag = true;
                    }
                    // Search all joints connect to this body.
                    for (var je = b.m_jointList; je; je = je.next) {
                        if (je.joint.m_islandFlag == true) {
                            continue;
                        }
                        var other = je.other;
                        // Don't simulate joints connected to inactive bodies.
                        if (other.isActive() == false) {
                            continue;
                        }
                        this.addJoint(je.joint);
                        je.joint.m_islandFlag = true;
                        if (other.m_islandFlag) {
                            continue;
                        }
                        // _ASSERT && common.assert(stack.length < world.m_bodyCount);
                        stack.push(other);
                        other.m_islandFlag = true;
                    }
                }
                this.solveIsland(step);
                // Post solve cleanup.
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    // Allow static bodies to participate in other islands.
                    // TODO: are they added at all?
                    var b = this.m_bodies[i];
                    if (b.isStatic()) {
                        b.m_islandFlag = false;
                    }
                }
            }
        };
        Solver.prototype.solveIsland = function (step) {
            // B2: Island Solve
            var world = this.m_world;
            var gravity = world.m_gravity;
            var allowSleep = world.m_allowSleep;
            var h = step.dt;
            // Integrate velocities and apply damping. Initialize the body state.
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var c = Vec2.clone(body.m_sweep.c);
                var a = body.m_sweep.a;
                var v = Vec2.clone(body.m_linearVelocity);
                var w = body.m_angularVelocity;
                // Store positions for continuous collision.
                body.m_sweep.c0.setVec2(body.m_sweep.c);
                body.m_sweep.a0 = body.m_sweep.a;
                if (body.isDynamic()) {
                    // Integrate velocities.
                    v.addMul(h * body.m_gravityScale, gravity);
                    v.addMul(h * body.m_invMass, body.m_force);
                    w += h * body.m_invI * body.m_torque;
                    /**
                     * <pre>
                     * Apply damping.
                     * ODE: dv/dt + c * v = 0
                     * Solution: v(t) = v0 * exp(-c * t)
                     * Time step: v(t + dt) = v0 * exp(-c * (t + dt)) = v0 * exp(-c * t) * exp(-c * dt) = v * exp(-c * dt)
                     * v2 = exp(-c * dt) * v1
                     * Pade approximation:
                     * v2 = v1 * 1 / (1 + c * dt)
                     * </pre>
                     */
                    v.mul(1.0 / (1.0 + h * body.m_linearDamping));
                    w *= 1.0 / (1.0 + h * body.m_angularDamping);
                }
                body.c_position.c = c;
                body.c_position.a = a;
                body.c_velocity.v = v;
                body.c_velocity.w = w;
            }
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initConstraint(step);
            }
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initVelocityConstraint(step);
            }
            if (step.warmStarting) {
                // Warm start.
                for (var i = 0; i < this.m_contacts.length; ++i) {
                    var contact = this.m_contacts[i];
                    contact.warmStartConstraint(step);
                }
            }
            for (var i = 0; i < this.m_joints.length; ++i) {
                var joint = this.m_joints[i];
                joint.initVelocityConstraints(step);
            }
            // Solve velocity constraints
            for (var i = 0; i < step.velocityIterations; ++i) {
                for (var j = 0; j < this.m_joints.length; ++j) {
                    var joint = this.m_joints[j];
                    joint.solveVelocityConstraints(step);
                }
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    contact.solveVelocityConstraint(step);
                }
            }
            // Store impulses for warm starting
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.storeConstraintImpulses(step);
            }
            // Integrate positions
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var c = Vec2.clone(body.c_position.c);
                var a = body.c_position.a;
                var v = Vec2.clone(body.c_velocity.v);
                var w = body.c_velocity.w;
                // Check for large velocities
                var translation = Vec2.mulNumVec2(h, v);
                if (Vec2.lengthSquared(translation) > Settings.maxTranslationSquared) {
                    var ratio = Settings.maxTranslation / translation.length();
                    v.mul(ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > Settings.maxRotationSquared) {
                    var ratio = Settings.maxRotation / math$1.abs(rotation);
                    w *= ratio;
                }
                // Integrate
                c.addMul(h, v);
                a += h * w;
                body.c_position.c.setVec2(c);
                body.c_position.a = a;
                body.c_velocity.v.setVec2(v);
                body.c_velocity.w = w;
            }
            // Solve position constraints
            var positionSolved = false;
            for (var i = 0; i < step.positionIterations; ++i) {
                var minSeparation = 0.0;
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    var separation = contact.solvePositionConstraint(step);
                    minSeparation = math$1.min(minSeparation, separation);
                }
                // We can't expect minSpeparation >= -Settings.linearSlop because we don't
                // push the separation above -Settings.linearSlop.
                var contactsOkay = minSeparation >= -3.0 * Settings.linearSlop;
                var jointsOkay = true;
                for (var j = 0; j < this.m_joints.length; ++j) {
                    var joint = this.m_joints[j];
                    var jointOkay = joint.solvePositionConstraints(step);
                    jointsOkay = jointsOkay && jointOkay;
                }
                if (contactsOkay && jointsOkay) {
                    // Exit early if the position errors are small.
                    positionSolved = true;
                    break;
                }
            }
            // Copy state buffers back to the bodies
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                body.m_sweep.c.setVec2(body.c_position.c);
                body.m_sweep.a = body.c_position.a;
                body.m_linearVelocity.setVec2(body.c_velocity.v);
                body.m_angularVelocity = body.c_velocity.w;
                body.synchronizeTransform();
            }
            this.postSolveIsland();
            if (allowSleep) {
                var minSleepTime = Infinity;
                var linTolSqr = Settings.linearSleepToleranceSqr;
                var angTolSqr = Settings.angularSleepToleranceSqr;
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var body = this.m_bodies[i];
                    if (body.isStatic()) {
                        continue;
                    }
                    if ((body.m_autoSleepFlag == false)
                        || (body.m_angularVelocity * body.m_angularVelocity > angTolSqr)
                        || (Vec2.lengthSquared(body.m_linearVelocity) > linTolSqr)) {
                        body.m_sleepTime = 0.0;
                        minSleepTime = 0.0;
                    }
                    else {
                        body.m_sleepTime += h;
                        minSleepTime = math$1.min(minSleepTime, body.m_sleepTime);
                    }
                }
                if (minSleepTime >= Settings.timeToSleep && positionSolved) {
                    for (var i = 0; i < this.m_bodies.length; ++i) {
                        var body = this.m_bodies[i];
                        body.setAwake(false);
                    }
                }
            }
        };
        /** @internal */
        Solver.prototype.printBodies = function (tag) {
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var b = this.m_bodies[i];
                common.debug(tag, b.c_position.a, b.c_position.c.x, b.c_position.c.y, b.c_velocity.w, b.c_velocity.v.x, b.c_velocity.v.y);
            }
        };
        /**
         * Find TOI contacts and solve them.
         */
        Solver.prototype.solveWorldTOI = function (step) {
            var world = this.m_world;
            if (world.m_stepComplete) {
                for (var b = world.m_bodyList; b; b = b.m_next) {
                    b.m_islandFlag = false;
                    b.m_sweep.alpha0 = 0.0;
                }
                for (var c = world.m_contactList; c; c = c.m_next) {
                    // Invalidate TOI
                    c.m_toiFlag = false;
                    c.m_islandFlag = false;
                    c.m_toiCount = 0;
                    c.m_toi = 1.0;
                }
            }
            // Find TOI events and solve them.
            while (true) {
                // Find the first TOI.
                var minContact = null; // Contact
                var minAlpha = 1.0;
                for (var c = world.m_contactList; c; c = c.m_next) {
                    // Is this contact disabled?
                    if (c.isEnabled() == false) {
                        continue;
                    }
                    // Prevent excessive sub-stepping.
                    if (c.m_toiCount > Settings.maxSubSteps) {
                        continue;
                    }
                    var alpha = 1.0;
                    if (c.m_toiFlag) {
                        // This contact has a valid cached TOI.
                        alpha = c.m_toi;
                    }
                    else {
                        var fA_1 = c.getFixtureA();
                        var fB_1 = c.getFixtureB();
                        // Is there a sensor?
                        if (fA_1.isSensor() || fB_1.isSensor()) {
                            continue;
                        }
                        var bA_1 = fA_1.getBody();
                        var bB_1 = fB_1.getBody();
                        var activeA = bA_1.isAwake() && !bA_1.isStatic();
                        var activeB = bB_1.isAwake() && !bB_1.isStatic();
                        // Is at least one body active (awake and dynamic or kinematic)?
                        if (activeA == false && activeB == false) {
                            continue;
                        }
                        var collideA = bA_1.isBullet() || !bA_1.isDynamic();
                        var collideB = bB_1.isBullet() || !bB_1.isDynamic();
                        // Are these two non-bullet dynamic bodies?
                        if (collideA == false && collideB == false) {
                            continue;
                        }
                        // Compute the TOI for this contact.
                        // Put the sweeps onto the same time interval.
                        var alpha0 = bA_1.m_sweep.alpha0;
                        if (bA_1.m_sweep.alpha0 < bB_1.m_sweep.alpha0) {
                            alpha0 = bB_1.m_sweep.alpha0;
                            bA_1.m_sweep.advance(alpha0);
                        }
                        else if (bB_1.m_sweep.alpha0 < bA_1.m_sweep.alpha0) {
                            alpha0 = bA_1.m_sweep.alpha0;
                            bB_1.m_sweep.advance(alpha0);
                        }
                        var indexA = c.getChildIndexA();
                        var indexB = c.getChildIndexB();
                        bA_1.m_sweep;
                        bB_1.m_sweep;
                        // Compute the time of impact in interval [0, minTOI]
                        var input = new TOIInput(); // TODO: reuse
                        input.proxyA.set(fA_1.getShape(), indexA);
                        input.proxyB.set(fB_1.getShape(), indexB);
                        input.sweepA.set(bA_1.m_sweep);
                        input.sweepB.set(bB_1.m_sweep);
                        input.tMax = 1.0;
                        var output = new TOIOutput(); // TODO: reuse
                        TimeOfImpact(output, input);
                        // Beta is the fraction of the remaining portion of the [time?].
                        var beta = output.t;
                        if (output.state == TOIOutputState.e_touching) {
                            alpha = math$1.min(alpha0 + (1.0 - alpha0) * beta, 1.0);
                        }
                        else {
                            alpha = 1.0;
                        }
                        c.m_toi = alpha;
                        c.m_toiFlag = true;
                    }
                    if (alpha < minAlpha) {
                        // This is the minimum TOI found so far.
                        minContact = c;
                        minAlpha = alpha;
                    }
                }
                if (minContact == null || 1.0 - 10.0 * math$1.EPSILON < minAlpha) {
                    // No more TOI events. Done!
                    world.m_stepComplete = true;
                    break;
                }
                // Advance the bodies to the TOI.
                var fA = minContact.getFixtureA();
                var fB = minContact.getFixtureB();
                var bA = fA.getBody();
                var bB = fB.getBody();
                var backup1 = bA.m_sweep.clone();
                var backup2 = bB.m_sweep.clone();
                bA.advance(minAlpha);
                bB.advance(minAlpha);
                // The TOI contact likely has some new contact points.
                minContact.update(world);
                minContact.m_toiFlag = false;
                ++minContact.m_toiCount;
                // Is the contact solid?
                if (minContact.isEnabled() == false || minContact.isTouching() == false) {
                    // Restore the sweeps.
                    minContact.setEnabled(false);
                    bA.m_sweep.set(backup1);
                    bB.m_sweep.set(backup2);
                    bA.synchronizeTransform();
                    bB.synchronizeTransform();
                    continue;
                }
                bA.setAwake(true);
                bB.setAwake(true);
                // Build the island
                this.clear();
                this.addBody(bA);
                this.addBody(bB);
                this.addContact(minContact);
                bA.m_islandFlag = true;
                bB.m_islandFlag = true;
                minContact.m_islandFlag = true;
                // Get contacts on bodyA and bodyB.
                var bodies = [bA, bB];
                for (var i = 0; i < bodies.length; ++i) {
                    var body = bodies[i];
                    if (body.isDynamic()) {
                        for (var ce = body.m_contactList; ce; ce = ce.next) {
                            // if (this.m_bodyCount == this.m_bodyCapacity) { break; }
                            // if (this.m_contactCount == this.m_contactCapacity) { break; }
                            var contact = ce.contact;
                            // Has this contact already been added to the island?
                            if (contact.m_islandFlag) {
                                continue;
                            }
                            // Only add if either is static, kinematic or bullet.
                            var other = ce.other;
                            if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                                continue;
                            }
                            // Skip sensors.
                            var sensorA = contact.m_fixtureA.m_isSensor;
                            var sensorB = contact.m_fixtureB.m_isSensor;
                            if (sensorA || sensorB) {
                                continue;
                            }
                            // Tentatively advance the body to the TOI.
                            var backup = other.m_sweep.clone();
                            if (other.m_islandFlag == false) {
                                other.advance(minAlpha);
                            }
                            // Update the contact points
                            contact.update(world);
                            // Was the contact disabled by the user?
                            // Are there contact points?
                            if (contact.isEnabled() == false || contact.isTouching() == false) {
                                other.m_sweep.set(backup);
                                other.synchronizeTransform();
                                continue;
                            }
                            // Add the contact to the island
                            contact.m_islandFlag = true;
                            this.addContact(contact);
                            // Has the other body already been added to the island?
                            if (other.m_islandFlag) {
                                continue;
                            }
                            // Add the other body to the island.
                            other.m_islandFlag = true;
                            if (!other.isStatic()) {
                                other.setAwake(true);
                            }
                            this.addBody(other);
                        }
                    }
                }
                s_subStep.reset((1.0 - minAlpha) * step.dt);
                s_subStep.dtRatio = 1.0;
                s_subStep.positionIterations = 20;
                s_subStep.velocityIterations = step.velocityIterations;
                s_subStep.warmStarting = false;
                this.solveIslandTOI(s_subStep, bA, bB);
                // Reset island flags and synchronize broad-phase proxies.
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var body = this.m_bodies[i];
                    body.m_islandFlag = false;
                    if (!body.isDynamic()) {
                        continue;
                    }
                    body.synchronizeFixtures();
                    // Invalidate all contact TOIs on this displaced body.
                    for (var ce = body.m_contactList; ce; ce = ce.next) {
                        ce.contact.m_toiFlag = false;
                        ce.contact.m_islandFlag = false;
                    }
                }
                // Commit fixture proxy movements to the broad-phase so that new contacts
                // are created.
                // Also, some contacts can be destroyed.
                world.findNewContacts();
                if (world.m_subStepping) {
                    world.m_stepComplete = false;
                    break;
                }
            }
            var b, c; 
        };
        Solver.prototype.solveIslandTOI = function (subStep, toiA, toiB) {
            this.m_world;
            // Initialize the body state.
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                body.c_position.c.setVec2(body.m_sweep.c);
                body.c_position.a = body.m_sweep.a;
                body.c_velocity.v.setVec2(body.m_linearVelocity);
                body.c_velocity.w = body.m_angularVelocity;
            }
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initConstraint(subStep);
            }
            // Solve position constraints.
            for (var i = 0; i < subStep.positionIterations; ++i) {
                var minSeparation = 0.0;
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
                    minSeparation = math$1.min(minSeparation, separation);
                }
                // We can't expect minSpeparation >= -Settings.linearSlop because we don't
                // push the separation above -Settings.linearSlop.
                var contactsOkay = minSeparation >= -1.5 * Settings.linearSlop;
                if (contactsOkay) {
                    break;
                }
            }
            var i, c; 
            // Leap of faith to new safe state.
            toiA.m_sweep.c0.setVec2(toiA.c_position.c);
            toiA.m_sweep.a0 = toiA.c_position.a;
            toiB.m_sweep.c0.setVec2(toiB.c_position.c);
            toiB.m_sweep.a0 = toiB.c_position.a;
            // No warm starting is needed for TOI events because warm
            // starting impulses were applied in the discrete solver.
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initVelocityConstraint(subStep);
            }
            // Solve velocity constraints.
            for (var i = 0; i < subStep.velocityIterations; ++i) {
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    contact.solveVelocityConstraint(subStep);
                }
            }
            // Don't store the TOI contact forces for warm starting
            // because they can be quite large.
            var h = subStep.dt;
            // Integrate positions
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                var c = Vec2.clone(body.c_position.c);
                var a = body.c_position.a;
                var v = Vec2.clone(body.c_velocity.v);
                var w = body.c_velocity.w;
                // Check for large velocities
                var translation = Vec2.mulNumVec2(h, v);
                if (Vec2.dot(translation, translation) > Settings.maxTranslationSquared) {
                    var ratio = Settings.maxTranslation / translation.length();
                    v.mul(ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > Settings.maxRotationSquared) {
                    var ratio = Settings.maxRotation / math$1.abs(rotation);
                    w *= ratio;
                }
                // Integrate
                c.addMul(h, v);
                a += h * w;
                body.c_position.c = c;
                body.c_position.a = a;
                body.c_velocity.v = v;
                body.c_velocity.w = w;
                // Sync bodies
                body.m_sweep.c = c;
                body.m_sweep.a = a;
                body.m_linearVelocity = v;
                body.m_angularVelocity = w;
                body.synchronizeTransform();
            }
            this.postSolveIsland();
        };
        /** @internal */
        Solver.prototype.postSolveIsland = function () {
            for (var c = 0; c < this.m_contacts.length; ++c) {
                var contact = this.m_contacts[c];
                this.m_world.postSolve(contact, contact.m_impulse);
            }
        };
        return Solver;
    }());

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
    var WorldDefDefault = {
        gravity: Vec2.zero(),
        allowSleep: true,
        warmStarting: true,
        continuousPhysics: true,
        subStepping: false,
        blockSolve: true,
        velocityIterations: 8,
        positionIterations: 3
    };
    var World = /** @class */ (function () {
        /**
         * @param def World definition or gravity vector.
         */
        function World(def) {
            var _this = this;
            /** @internal */
            this.s_step = new TimeStep(); // reuse
            /**
             * @internal
             * Callback for broad-phase.
             */
            this.createContact = function (proxyA, proxyB) {
                var fixtureA = proxyA.fixture;
                var fixtureB = proxyB.fixture;
                var indexA = proxyA.childIndex;
                var indexB = proxyB.childIndex;
                var bodyA = fixtureA.getBody();
                var bodyB = fixtureB.getBody();
                // Are the fixtures on the same body?
                if (bodyA == bodyB) {
                    return;
                }
                // TODO_ERIN use a hash table to remove a potential bottleneck when both
                // bodies have a lot of contacts.
                // Does a contact already exist?
                var edge = bodyB.getContactList(); // ContactEdge
                while (edge) {
                    if (edge.other == bodyA) {
                        var fA = edge.contact.getFixtureA();
                        var fB = edge.contact.getFixtureB();
                        var iA = edge.contact.getChildIndexA();
                        var iB = edge.contact.getChildIndexB();
                        if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
                            // A contact already exists.
                            return;
                        }
                        if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
                            // A contact already exists.
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
                // Call the factory.
                var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
                if (contact == null) {
                    return;
                }
                // Insert into the world.
                contact.m_prev = null;
                if (_this.m_contactList != null) {
                    contact.m_next = _this.m_contactList;
                    _this.m_contactList.m_prev = contact;
                }
                _this.m_contactList = contact;
                ++_this.m_contactCount;
            };
            if (!(this instanceof World)) {
                return new World(def);
            }
            if (def && Vec2.isValid(def)) {
                def = { gravity: def };
            }
            def = options(def, WorldDefDefault);
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
            // These are for debugging the solver.
            this.m_warmStarting = def.warmStarting;
            this.m_continuousPhysics = def.continuousPhysics;
            this.m_subStepping = def.subStepping;
            this.m_blockSolve = def.blockSolve;
            this.m_velocityIterations = def.velocityIterations;
            this.m_positionIterations = def.positionIterations;
            this.m_t = 0;
        }
        /** @internal */
        World.prototype._serialize = function () {
            var bodies = [];
            var joints = [];
            for (var b = this.getBodyList(); b; b = b.getNext()) {
                bodies.push(b);
            }
            for (var j = this.getJointList(); j; j = j.getNext()) {
                // @ts-ignore
                if (typeof j._serialize === 'function') {
                    joints.push(j);
                }
            }
            return {
                gravity: this.m_gravity,
                bodies: bodies,
                joints: joints,
            };
        };
        /** @internal */
        World._deserialize = function (data, context, restore) {
            if (!data) {
                return new World();
            }
            var world = new World(data.gravity);
            if (data.bodies) {
                for (var i = data.bodies.length - 1; i >= 0; i -= 1) {
                    world._addBody(restore(Body, data.bodies[i], world));
                }
            }
            if (data.joints) {
                for (var i = data.joints.length - 1; i >= 0; i--) {
                    world.createJoint(restore(Joint, data.joints[i], world));
                }
            }
            return world;
        };
        /**
         * Get the world body list. With the returned body, use Body.getNext to get the
         * next body in the world list. A null body indicates the end of the list.
         *
         * @return the head of the world body list.
         */
        World.prototype.getBodyList = function () {
            return this.m_bodyList;
        };
        /**
         * Get the world joint list. With the returned joint, use Joint.getNext to get
         * the next joint in the world list. A null joint indicates the end of the list.
         *
         * @return the head of the world joint list.
         */
        World.prototype.getJointList = function () {
            return this.m_jointList;
        };
        /**
         * Get the world contact list. With the returned contact, use Contact.getNext to
         * get the next contact in the world list. A null contact indicates the end of
         * the list.
         *
         * Warning: contacts are created and destroyed in the middle of a time step.
         * Use ContactListener to avoid missing contacts.
         *
         * @return the head of the world contact list.
         */
        World.prototype.getContactList = function () {
            return this.m_contactList;
        };
        World.prototype.getBodyCount = function () {
            return this.m_bodyCount;
        };
        World.prototype.getJointCount = function () {
            return this.m_jointCount;
        };
        /**
         * Get the number of contacts (each may have 0 or more contact points).
         */
        World.prototype.getContactCount = function () {
            return this.m_contactCount;
        };
        /**
         * Change the global gravity vector.
         */
        World.prototype.setGravity = function (gravity) {
            this.m_gravity = gravity;
        };
        /**
         * Get the global gravity vector.
         */
        World.prototype.getGravity = function () {
            return this.m_gravity;
        };
        /**
         * Is the world locked (in the middle of a time step).
         */
        World.prototype.isLocked = function () {
            return this.m_locked;
        };
        /**
         * Enable/disable sleep.
         */
        World.prototype.setAllowSleeping = function (flag) {
            if (flag == this.m_allowSleep) {
                return;
            }
            this.m_allowSleep = flag;
            if (this.m_allowSleep == false) {
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    b.setAwake(true);
                }
            }
        };
        World.prototype.getAllowSleeping = function () {
            return this.m_allowSleep;
        };
        /**
         * Enable/disable warm starting. For testing.
         */
        World.prototype.setWarmStarting = function (flag) {
            this.m_warmStarting = flag;
        };
        World.prototype.getWarmStarting = function () {
            return this.m_warmStarting;
        };
        /**
         * Enable/disable continuous physics. For testing.
         */
        World.prototype.setContinuousPhysics = function (flag) {
            this.m_continuousPhysics = flag;
        };
        World.prototype.getContinuousPhysics = function () {
            return this.m_continuousPhysics;
        };
        /**
         * Enable/disable single stepped continuous physics. For testing.
         */
        World.prototype.setSubStepping = function (flag) {
            this.m_subStepping = flag;
        };
        World.prototype.getSubStepping = function () {
            return this.m_subStepping;
        };
        /**
         * Set flag to control automatic clearing of forces after each time step.
         */
        World.prototype.setAutoClearForces = function (flag) {
            this.m_clearForces = flag;
        };
        /**
         * Get the flag that controls automatic clearing of forces after each time step.
         */
        World.prototype.getAutoClearForces = function () {
            return this.m_clearForces;
        };
        /**
         * Manually clear the force buffer on all bodies. By default, forces are cleared
         * automatically after each call to step. The default behavior is modified by
         * calling setAutoClearForces. The purpose of this function is to support
         * sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
         * under a variable frame-rate. When you perform sub-stepping you will disable
         * auto clearing of forces and instead call clearForces after all sub-steps are
         * complete in one pass of your game loop.
         *
         * See {@link World.setAutoClearForces}
         */
        World.prototype.clearForces = function () {
            for (var body = this.m_bodyList; body; body = body.getNext()) {
                body.m_force.setZero();
                body.m_torque = 0.0;
            }
        };
        /**
         * Query the world for all fixtures that potentially overlap the provided AABB.
         *
         * @param aabb The query box.
         * @param callback Called for each fixture found in the query AABB. It may return `false` to terminate the query.
         */
        World.prototype.queryAABB = function (aabb, callback) {
            var broadPhase = this.m_broadPhase;
            this.m_broadPhase.query(aabb, function (proxyId) {
                var proxy = broadPhase.getUserData(proxyId);
                return callback(proxy.fixture);
            });
        };
        /**
         * Ray-cast the world for all fixtures in the path of the ray. Your callback
         * controls whether you get the closest point, any point, or n-points. The
         * ray-cast ignores shapes that contain the starting point.
         *
         * @param point1 The ray starting point
         * @param point2 The ray ending point
         * @param callback A user implemented callback function.
         */
        World.prototype.rayCast = function (point1, point2, callback) {
            var broadPhase = this.m_broadPhase;
            this.m_broadPhase.rayCast({
                maxFraction: 1.0,
                p1: point1,
                p2: point2
            }, function (input, proxyId) {
                var proxy = broadPhase.getUserData(proxyId);
                var fixture = proxy.fixture;
                var index = proxy.childIndex;
                // @ts-ignore
                var output = {}; // TODO GC
                var hit = fixture.rayCast(output, input, index);
                if (hit) {
                    var fraction = output.fraction;
                    var point = Vec2.add(Vec2.mulNumVec2((1.0 - fraction), input.p1), Vec2.mulNumVec2(fraction, input.p2));
                    return callback(fixture, point, output.normal, fraction);
                }
                return input.maxFraction;
            });
        };
        /**
         * Get the number of broad-phase proxies.
         */
        World.prototype.getProxyCount = function () {
            return this.m_broadPhase.getProxyCount();
        };
        /**
         * Get the height of broad-phase dynamic tree.
         */
        World.prototype.getTreeHeight = function () {
            return this.m_broadPhase.getTreeHeight();
        };
        /**
         * Get the balance of broad-phase dynamic tree.
         */
        World.prototype.getTreeBalance = function () {
            return this.m_broadPhase.getTreeBalance();
        };
        /**
         * Get the quality metric of broad-phase dynamic tree. The smaller the better.
         * The minimum is 1.
         */
        World.prototype.getTreeQuality = function () {
            return this.m_broadPhase.getTreeQuality();
        };
        /**
         * Shift the world origin. Useful for large worlds. The body shift formula is:
         * position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        World.prototype.shiftOrigin = function (newOrigin) {
            if (this.m_locked) {
                return;
            }
            for (var b = this.m_bodyList; b; b = b.m_next) {
                b.m_xf.p.sub(newOrigin);
                b.m_sweep.c0.sub(newOrigin);
                b.m_sweep.c.sub(newOrigin);
            }
            for (var j = this.m_jointList; j; j = j.m_next) {
                j.shiftOrigin(newOrigin);
            }
            this.m_broadPhase.shiftOrigin(newOrigin);
        };
        /**
         * @internal Used for deserialize.
         */
        World.prototype._addBody = function (body) {
            if (this.isLocked()) {
                return;
            }
            // Add to world doubly linked list.
            body.m_prev = null;
            body.m_next = this.m_bodyList;
            if (this.m_bodyList) {
                this.m_bodyList.m_prev = body;
            }
            this.m_bodyList = body;
            ++this.m_bodyCount;
        };
        // tslint:disable-next-line:typedef
        World.prototype.createBody = function (arg1, arg2) {
            if (this.isLocked()) {
                return null;
            }
            var def = {};
            if (!arg1) ;
            else if (Vec2.isValid(arg1)) {
                def = { position: arg1, angle: arg2 };
            }
            else if (typeof arg1 === 'object') {
                def = arg1;
            }
            var body = new Body(this, def);
            this._addBody(body);
            return body;
        };
        // tslint:disable-next-line:typedef
        World.prototype.createDynamicBody = function (arg1, arg2) {
            var def = {};
            if (!arg1) ;
            else if (Vec2.isValid(arg1)) {
                def = { position: arg1, angle: arg2 };
            }
            else if (typeof arg1 === 'object') {
                def = arg1;
            }
            def.type = 'dynamic';
            return this.createBody(def);
        };
        // tslint:disable-next-line:typedef
        World.prototype.createKinematicBody = function (arg1, arg2) {
            var def = {};
            if (!arg1) ;
            else if (Vec2.isValid(arg1)) {
                def = { position: arg1, angle: arg2 };
            }
            else if (typeof arg1 === 'object') {
                def = arg1;
            }
            def.type = 'kinematic';
            return this.createBody(def);
        };
        /**
         * Destroy a rigid body given a definition. No reference to the definition is
         * retained.
         *
         * Warning: This automatically deletes all associated shapes and joints.
         *
         * Warning: This function is locked during callbacks.
         */
        World.prototype.destroyBody = function (b) {
            if (this.isLocked()) {
                return;
            }
            if (b.m_destroyed) {
                return false;
            }
            // Delete the attached joints.
            var je = b.m_jointList;
            while (je) {
                var je0 = je;
                je = je.next;
                this.publish('remove-joint', je0.joint);
                this.destroyJoint(je0.joint);
                b.m_jointList = je;
            }
            b.m_jointList = null;
            // Delete the attached contacts.
            var ce = b.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.destroyContact(ce0.contact);
                b.m_contactList = ce;
            }
            b.m_contactList = null;
            // Delete the attached fixtures. This destroys broad-phase proxies.
            var f = b.m_fixtureList;
            while (f) {
                var f0 = f;
                f = f.m_next;
                this.publish('remove-fixture', f0);
                f0.destroyProxies(this.m_broadPhase);
                b.m_fixtureList = f;
            }
            b.m_fixtureList = null;
            // Remove world body list.
            if (b.m_prev) {
                b.m_prev.m_next = b.m_next;
            }
            if (b.m_next) {
                b.m_next.m_prev = b.m_prev;
            }
            if (b == this.m_bodyList) {
                this.m_bodyList = b.m_next;
            }
            b.m_destroyed = true;
            --this.m_bodyCount;
            this.publish('remove-body', b);
            return true;
        };
        /**
         * Create a joint to constrain bodies together. No reference to the definition
         * is retained. This may cause the connected bodies to cease colliding.
         *
         * Warning: This function is locked during callbacks.
         */
        World.prototype.createJoint = function (joint) {
            if (this.isLocked()) {
                return null;
            }
            // Connect to the world list.
            joint.m_prev = null;
            joint.m_next = this.m_jointList;
            if (this.m_jointList) {
                this.m_jointList.m_prev = joint;
            }
            this.m_jointList = joint;
            ++this.m_jointCount;
            // Connect to the bodies' doubly linked lists.
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
            // If the joint prevents collisions, then flag any contacts for filtering.
            if (joint.m_collideConnected == false) {
                for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
                    if (edge.other == joint.m_bodyA) {
                        // Flag the contact for filtering at the next time step (where either
                        // body is awake).
                        edge.contact.flagForFiltering();
                    }
                }
            }
            // Note: creating a joint doesn't wake the bodies.
            return joint;
        };
        /**
         * Destroy a joint. This may cause the connected bodies to begin colliding.
         * Warning: This function is locked during callbacks.
         */
        World.prototype.destroyJoint = function (joint) {
            if (this.isLocked()) {
                return;
            }
            // Remove from the doubly linked list.
            if (joint.m_prev) {
                joint.m_prev.m_next = joint.m_next;
            }
            if (joint.m_next) {
                joint.m_next.m_prev = joint.m_prev;
            }
            if (joint == this.m_jointList) {
                this.m_jointList = joint.m_next;
            }
            // Disconnect from bodies.
            var bodyA = joint.m_bodyA;
            var bodyB = joint.m_bodyB;
            // Wake up connected bodies.
            bodyA.setAwake(true);
            bodyB.setAwake(true);
            // Remove from body 1.
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
            // Remove from body 2
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
            // If the joint prevents collisions, then flag any contacts for filtering.
            if (joint.m_collideConnected == false) {
                var edge = bodyB.getContactList();
                while (edge) {
                    if (edge.other == bodyA) {
                        // Flag the contact for filtering at the next time step (where either
                        // body is awake).
                        edge.contact.flagForFiltering();
                    }
                    edge = edge.next;
                }
            }
            this.publish('remove-joint', joint);
        };
        /**
         * Take a time step. This performs collision detection, integration, and
         * constraint solution.
         *
         * Broad-phase, narrow-phase, solve and solve time of impacts.
         *
         * @param timeStep Time step, this should not vary.
         */
        World.prototype.step = function (timeStep, velocityIterations, positionIterations) {
            this.publish('pre-step', timeStep);
            if ((velocityIterations | 0) !== velocityIterations) {
                // TODO: remove this in future
                velocityIterations = 0;
            }
            velocityIterations = velocityIterations || this.m_velocityIterations;
            positionIterations = positionIterations || this.m_positionIterations;
            // If new fixtures were added, we need to find the new contacts.
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
            // Update contacts. This is where some contacts are destroyed.
            this.updateContacts();
            // Integrate velocities, solve velocity constraints, and integrate positions.
            if (this.m_stepComplete && timeStep > 0.0) {
                this.m_solver.solveWorld(this.s_step);
                // Synchronize fixtures, check for out of range bodies.
                for (var b = this.m_bodyList; b; b = b.getNext()) {
                    // If a body was not in an island then it did not move.
                    if (b.m_islandFlag == false) {
                        continue;
                    }
                    if (b.isStatic()) {
                        continue;
                    }
                    // Update fixtures (for broad-phase).
                    b.synchronizeFixtures();
                }
                // Look for new contacts.
                this.findNewContacts();
            }
            // Handle TOI events.
            if (this.m_continuousPhysics && timeStep > 0.0) {
                this.m_solver.solveWorldTOI(this.s_step);
            }
            if (this.m_clearForces) {
                this.clearForces();
            }
            this.m_locked = false;
            this.publish('post-step', timeStep);
        };
        /**
         * @internal
         * Call this method to find new contacts.
         */
        World.prototype.findNewContacts = function () {
            this.m_broadPhase.updatePairs(this.createContact);
        };
        /**
         * @internal
         * Removes old non-overlapping contacts, applies filters and updates contacts.
         */
        World.prototype.updateContacts = function () {
            // Update awake contacts.
            var c;
            var next_c = this.m_contactList;
            while (c = next_c) {
                next_c = c.getNext();
                var fixtureA = c.getFixtureA();
                var fixtureB = c.getFixtureB();
                var indexA = c.getChildIndexA();
                var indexB = c.getChildIndexB();
                var bodyA = fixtureA.getBody();
                var bodyB = fixtureB.getBody();
                // Is this contact flagged for filtering?
                if (c.m_filterFlag) {
                    if (bodyB.shouldCollide(bodyA) == false) {
                        this.destroyContact(c);
                        continue;
                    }
                    if (fixtureB.shouldCollide(fixtureA) == false) {
                        this.destroyContact(c);
                        continue;
                    }
                    // Clear the filtering flag.
                    c.m_filterFlag = false;
                }
                var activeA = bodyA.isAwake() && !bodyA.isStatic();
                var activeB = bodyB.isAwake() && !bodyB.isStatic();
                // At least one body must be awake and it must be dynamic or kinematic.
                if (activeA == false && activeB == false) {
                    continue;
                }
                var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
                var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
                var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
                // Here we destroy contacts that cease to overlap in the broad-phase.
                if (overlap == false) {
                    this.destroyContact(c);
                    continue;
                }
                // The contact persists.
                c.update(this);
            }
        };
        /**
         * @internal
         */
        World.prototype.destroyContact = function (contact) {
            Contact.destroy(contact, this);
            // Remove from the world.
            if (contact.m_prev) {
                contact.m_prev.m_next = contact.m_next;
            }
            if (contact.m_next) {
                contact.m_next.m_prev = contact.m_prev;
            }
            if (contact == this.m_contactList) {
                this.m_contactList = contact.m_next;
            }
            --this.m_contactCount;
        };
        /**
         * Register an event listener.
         */
        // tslint:disable-next-line:typedef
        World.prototype.on = function (name, listener) {
            if (typeof name !== 'string' || typeof listener !== 'function') {
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
        /**
         * Remove an event listener.
         */
        // tslint:disable-next-line:typedef
        World.prototype.off = function (name, listener) {
            if (typeof name !== 'string' || typeof listener !== 'function') {
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
        World.prototype.publish = function (name, arg1, arg2, arg3) {
            var listeners = this._listeners && this._listeners[name];
            if (!listeners || !listeners.length) {
                return 0;
            }
            for (var l = 0; l < listeners.length; l++) {
                listeners[l].call(this, arg1, arg2, arg3);
            }
            return listeners.length;
        };
        /**
         * @internal
         */
        World.prototype.beginContact = function (contact) {
            this.publish('begin-contact', contact);
        };
        /**
         * @internal
         */
        World.prototype.endContact = function (contact) {
            this.publish('end-contact', contact);
        };
        /**
         * @internal
         */
        World.prototype.preSolve = function (contact, oldManifold) {
            this.publish('pre-solve', contact, oldManifold);
        };
        /**
         * @internal
         */
        World.prototype.postSolve = function (contact, impulse) {
            this.publish('post-solve', contact, impulse);
        };
        return World;
    }());

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
    var Vec3 = /** @class */ (function () {
        // tslint:disable-next-line:typedef
        function Vec3(x, y, z) {
            if (!(this instanceof Vec3)) {
                return new Vec3(x, y, z);
            }
            if (typeof x === 'undefined') {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }
            else if (typeof x === 'object') {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            }
            else {
                this.x = x;
                this.y = y;
                this.z = z;
            }
        }
        /** @internal */
        Vec3.prototype._serialize = function () {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            };
        };
        /** @internal */
        Vec3._deserialize = function (data) {
            var obj = Object.create(Vec3.prototype);
            obj.x = data.x;
            obj.y = data.y;
            obj.z = data.z;
            return obj;
        };
        /** @internal */
        Vec3.neo = function (x, y, z) {
            var obj = Object.create(Vec3.prototype);
            obj.x = x;
            obj.y = y;
            obj.z = z;
            return obj;
        };
        Vec3.zero = function () {
            var obj = Object.create(Vec3.prototype);
            obj.x = 0;
            obj.y = 0;
            obj.z = 0;
            return obj;
        };
        Vec3.clone = function (v) {
            return Vec3.neo(v.x, v.y, v.z);
        };
        /** @internal */
        Vec3.prototype.toString = function () {
            return JSON.stringify(this);
        };
        /**
         * Does this vector contain finite coordinates?
         */
        Vec3.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return math$1.isFinite(obj.x) && math$1.isFinite(obj.y) && math$1.isFinite(obj.z);
        };
        Vec3.assert = function (o) {
            return;
        };
        Vec3.prototype.setZero = function () {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            return this;
        };
        Vec3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        Vec3.prototype.add = function (w) {
            this.x += w.x;
            this.y += w.y;
            this.z += w.z;
            return this;
        };
        Vec3.prototype.sub = function (w) {
            this.x -= w.x;
            this.y -= w.y;
            this.z -= w.z;
            return this;
        };
        Vec3.prototype.mul = function (m) {
            this.x *= m;
            this.y *= m;
            this.z *= m;
            return this;
        };
        Vec3.areEqual = function (v, w) {
            return v === w ||
                typeof v === 'object' && v !== null &&
                    typeof w === 'object' && w !== null &&
                    v.x === w.x && v.y === w.y && v.z === w.z;
        };
        /**
         * Perform the dot product on two vectors.
         */
        Vec3.dot = function (v, w) {
            return v.x * w.x + v.y * w.y + v.z * w.z;
        };
        /**
         * Perform the cross product on two vectors. In 2D this produces a scalar.
         */
        Vec3.cross = function (v, w) {
            return new Vec3(v.y * w.z - v.z * w.y, v.z * w.x - v.x * w.z, v.x * w.y - v.y * w.x);
        };
        Vec3.add = function (v, w) {
            return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
        };
        Vec3.sub = function (v, w) {
            return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
        };
        Vec3.mul = function (v, m) {
            return new Vec3(m * v.x, m * v.y, m * v.z);
        };
        Vec3.prototype.neg = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        };
        Vec3.neg = function (v) {
            return new Vec3(-v.x, -v.y, -v.z);
        };
        return Vec3;
    }());

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
    /**
     * A line segment (edge) shape. These can be connected in chains or loops to
     * other edge shapes. The connectivity information is used to ensure correct
     * contact normals.
     */
    var EdgeShape = /** @class */ (function (_super) {
        __extends(EdgeShape, _super);
        function EdgeShape(v1, v2) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof EdgeShape)) {
                return new EdgeShape(v1, v2);
            }
            _this = _super.call(this) || this;
            _this.m_type = EdgeShape.TYPE;
            _this.m_radius = Settings.polygonRadius;
            _this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
            _this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();
            _this.m_vertex0 = Vec2.zero();
            _this.m_vertex3 = Vec2.zero();
            _this.m_hasVertex0 = false;
            _this.m_hasVertex3 = false;
            return _this;
        }
        /** @internal */
        EdgeShape.prototype._serialize = function () {
            return {
                type: this.m_type,
                vertex1: this.m_vertex1,
                vertex2: this.m_vertex2,
                vertex0: this.m_vertex0,
                vertex3: this.m_vertex3,
                hasVertex0: this.m_hasVertex0,
                hasVertex3: this.m_hasVertex3,
            };
        };
        /** @internal */
        EdgeShape._deserialize = function (data) {
            var shape = new EdgeShape(data.vertex1, data.vertex2);
            if (shape.m_hasVertex0) {
                shape.setPrevVertex(data.vertex0);
            }
            if (shape.m_hasVertex3) {
                shape.setNextVertex(data.vertex3);
            }
            return shape;
        };
        /** @internal @deprecated */
        EdgeShape.prototype.setNext = function (v) {
            return this.setNextVertex(v);
        };
        /**
         * Optional next vertex, used for smooth collision.
         */
        EdgeShape.prototype.setNextVertex = function (v) {
            if (v) {
                this.m_vertex3.setVec2(v);
                this.m_hasVertex3 = true;
            }
            else {
                this.m_vertex3.setZero();
                this.m_hasVertex3 = false;
            }
            return this;
        };
        /**
         * Optional next vertex, used for smooth collision.
         */
        EdgeShape.prototype.getNextVertex = function () {
            return this.m_vertex3;
        };
        /** @internal @deprecated */
        EdgeShape.prototype.setPrev = function (v) {
            return this.setPrevVertex(v);
        };
        /**
         * Optional prev vertex, used for smooth collision.
         */
        EdgeShape.prototype.setPrevVertex = function (v) {
            if (v) {
                this.m_vertex0.setVec2(v);
                this.m_hasVertex0 = true;
            }
            else {
                this.m_vertex0.setZero();
                this.m_hasVertex0 = false;
            }
            return this;
        };
        /**
         * Optional prev vertex, used for smooth collision.
         */
        EdgeShape.prototype.getPrevVertex = function () {
            return this.m_vertex0;
        };
        /**
         * Set this as an isolated edge.
         */
        EdgeShape.prototype._set = function (v1, v2) {
            this.m_vertex1.setVec2(v1);
            this.m_vertex2.setVec2(v2);
            this.m_hasVertex0 = false;
            this.m_hasVertex3 = false;
            return this;
        };
        /**
         * @internal
         * @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        EdgeShape.prototype._clone = function () {
            var clone = new EdgeShape();
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
        /**
         * Get the number of child primitives.
         */
        EdgeShape.prototype.getChildCount = function () {
            return 1;
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        EdgeShape.prototype.testPoint = function (xf, p) {
            return false;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        EdgeShape.prototype.rayCast = function (output, input, xf, childIndex) {
            // p = p1 + t * d
            // v = v1 + s * e
            // p1 + t * d = v1 + s * e
            // s * e - t * d = p1 - v1
            // NOT_USED(childIndex);
            // Put the ray into the edge's frame of reference.
            var p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
            var p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
            var d = Vec2.sub(p2, p1);
            var v1 = this.m_vertex1;
            var v2 = this.m_vertex2;
            var e = Vec2.sub(v2, v1);
            var normal = Vec2.neo(e.y, -e.x);
            normal.normalize();
            // q = p1 + t * d
            // dot(normal, q - v1) = 0
            // dot(normal, p1 - v1) + t * dot(normal, d) = 0
            var numerator = Vec2.dot(normal, Vec2.sub(v1, p1));
            var denominator = Vec2.dot(normal, d);
            if (denominator == 0.0) {
                return false;
            }
            var t = numerator / denominator;
            if (t < 0.0 || input.maxFraction < t) {
                return false;
            }
            var q = Vec2.add(p1, Vec2.mulNumVec2(t, d));
            // q = v1 + s * r
            // s = dot(q - v1, r) / dot(r, r)
            var r = Vec2.sub(v2, v1);
            var rr = Vec2.dot(r, r);
            if (rr == 0.0) {
                return false;
            }
            var s = Vec2.dot(Vec2.sub(q, v1), r) / rr;
            if (s < 0.0 || 1.0 < s) {
                return false;
            }
            output.fraction = t;
            if (numerator > 0.0) {
                output.normal = Rot.mulVec2(xf.q, normal).neg();
            }
            else {
                output.normal = Rot.mulVec2(xf.q, normal);
            }
            return true;
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        EdgeShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            var v1 = Transform.mulVec2(xf, this.m_vertex1);
            var v2 = Transform.mulVec2(xf, this.m_vertex2);
            aabb.combinePoints(v1, v2);
            aabb.extend(this.m_radius);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        EdgeShape.prototype.computeMass = function (massData, density) {
            massData.mass = 0.0;
            massData.center.setCombine(0.5, this.m_vertex1, 0.5, this.m_vertex2);
            massData.I = 0.0;
        };
        EdgeShape.prototype.computeDistanceProxy = function (proxy) {
            proxy.m_vertices.push(this.m_vertex1);
            proxy.m_vertices.push(this.m_vertex2);
            proxy.m_count = 2;
            proxy.m_radius = this.m_radius;
        };
        EdgeShape.TYPE = 'edge';
        return EdgeShape;
    }(Shape));

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
    /**
     * A chain shape is a free form sequence of line segments. The chain has
     * two-sided collision, so you can use inside and outside collision. Therefore,
     * you may use any winding order. Connectivity information is used to create
     * smooth collisions.
     *
     * WARNING: The chain will not collide properly if there are self-intersections.
     */
    var ChainShape = /** @class */ (function (_super) {
        __extends(ChainShape, _super);
        function ChainShape(vertices, loop) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof ChainShape)) {
                return new ChainShape(vertices, loop);
            }
            _this = _super.call(this) || this;
            _this.m_type = ChainShape.TYPE;
            _this.m_radius = Settings.polygonRadius;
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
                }
                else {
                    _this._createChain(vertices);
                }
            }
            return _this;
        }
        /** @internal */
        ChainShape.prototype._serialize = function () {
            var data = {
                type: this.m_type,
                vertices: this.m_vertices,
                isLoop: this.m_isLoop,
                hasPrevVertex: this.m_hasPrevVertex,
                hasNextVertex: this.m_hasNextVertex,
                prevVertex: null,
                nextVertex: null,
            };
            if (this.m_prevVertex) {
                data.prevVertex = this.m_prevVertex;
            }
            if (this.m_nextVertex) {
                data.nextVertex = this.m_nextVertex;
            }
            return data;
        };
        /** @internal */
        ChainShape._deserialize = function (data, fixture, restore) {
            var vertices = [];
            if (data.vertices) {
                for (var i = 0; i < data.vertices.length; i++) {
                    vertices.push(restore(Vec2, data.vertices[i]));
                }
            }
            var shape = new ChainShape(vertices, data.isLoop);
            if (data.prevVertex) {
                shape.setPrevVertex(data.prevVertex);
            }
            if (data.nextVertex) {
                shape.setNextVertex(data.nextVertex);
            }
            return shape;
        };
        // clear() {
        //   this.m_vertices.length = 0;
        //   this.m_count = 0;
        // }
        /**
         * @internal
         * Create a loop. This automatically adjusts connectivity.
         *
         * @param vertices an array of vertices, these are copied
         * @param count the vertex count
         */
        ChainShape.prototype._createLoop = function (vertices) {
            for (var i = 1; i < vertices.length; ++i) {
                vertices[i - 1];
                vertices[i];
            }
            this.m_vertices = [];
            this.m_count = vertices.length + 1;
            for (var i = 0; i < vertices.length; ++i) {
                this.m_vertices[i] = Vec2.clone(vertices[i]);
            }
            this.m_vertices[vertices.length] = Vec2.clone(vertices[0]);
            this.m_prevVertex = this.m_vertices[this.m_count - 2];
            this.m_nextVertex = this.m_vertices[1];
            this.m_hasPrevVertex = true;
            this.m_hasNextVertex = true;
            return this;
        };
        /**
         * @internal
         * Create a chain with isolated end vertices.
         *
         * @param vertices an array of vertices, these are copied
         * @param count the vertex count
         */
        ChainShape.prototype._createChain = function (vertices) {
            for (var i = 1; i < vertices.length; ++i) {
                // If the code crashes here, it means your vertices are too close together.
                vertices[i - 1];
                vertices[i];
            }
            this.m_count = vertices.length;
            for (var i = 0; i < vertices.length; ++i) {
                this.m_vertices[i] = Vec2.clone(vertices[i]);
            }
            this.m_hasPrevVertex = false;
            this.m_hasNextVertex = false;
            this.m_prevVertex = null;
            this.m_nextVertex = null;
            return this;
        };
        /** @internal */
        ChainShape.prototype._reset = function () {
            if (this.m_isLoop) {
                this._createLoop(this.m_vertices);
            }
            else {
                this._createChain(this.m_vertices);
            }
        };
        /**
         * Establish connectivity to a vertex that precedes the first vertex. Don't call
         * this for loops.
         */
        ChainShape.prototype.setPrevVertex = function (prevVertex) {
            this.m_prevVertex = prevVertex;
            this.m_hasPrevVertex = true;
        };
        ChainShape.prototype.getPrevVertex = function () {
            return this.m_prevVertex;
        };
        /**
         * Establish connectivity to a vertex that follows the last vertex. Don't call
         * this for loops.
         */
        ChainShape.prototype.setNextVertex = function (nextVertex) {
            this.m_nextVertex = nextVertex;
            this.m_hasNextVertex = true;
        };
        ChainShape.prototype.getNextVertex = function () {
            return this.m_nextVertex;
        };
        /**
         * @internal
         * @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        ChainShape.prototype._clone = function () {
            var clone = new ChainShape();
            clone._createChain(this.m_vertices);
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_prevVertex = this.m_prevVertex;
            clone.m_nextVertex = this.m_nextVertex;
            clone.m_hasPrevVertex = this.m_hasPrevVertex;
            clone.m_hasNextVertex = this.m_hasNextVertex;
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        ChainShape.prototype.getChildCount = function () {
            // edge count = vertex count - 1
            return this.m_count - 1;
        };
        // Get a child edge.
        ChainShape.prototype.getChildEdge = function (edge, childIndex) {
            edge.m_type = EdgeShape.TYPE;
            edge.m_radius = this.m_radius;
            edge.m_vertex1 = this.m_vertices[childIndex];
            edge.m_vertex2 = this.m_vertices[childIndex + 1];
            if (childIndex > 0) {
                edge.m_vertex0 = this.m_vertices[childIndex - 1];
                edge.m_hasVertex0 = true;
            }
            else {
                edge.m_vertex0 = this.m_prevVertex;
                edge.m_hasVertex0 = this.m_hasPrevVertex;
            }
            if (childIndex < this.m_count - 2) {
                edge.m_vertex3 = this.m_vertices[childIndex + 2];
                edge.m_hasVertex3 = true;
            }
            else {
                edge.m_vertex3 = this.m_nextVertex;
                edge.m_hasVertex3 = this.m_hasNextVertex;
            }
        };
        ChainShape.prototype.getVertex = function (index) {
            if (index < this.m_count) {
                return this.m_vertices[index];
            }
            else {
                return this.m_vertices[0];
            }
        };
        ChainShape.prototype.isLoop = function () {
            return this.m_isLoop;
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * This always return false.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        ChainShape.prototype.testPoint = function (xf, p) {
            return false;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        ChainShape.prototype.rayCast = function (output, input, xf, childIndex) {
            var edgeShape = new EdgeShape(this.getVertex(childIndex), this.getVertex(childIndex + 1));
            return edgeShape.rayCast(output, input, xf, 0);
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        ChainShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            var v1 = Transform.mulVec2(xf, this.getVertex(childIndex));
            var v2 = Transform.mulVec2(xf, this.getVertex(childIndex + 1));
            aabb.combinePoints(v1, v2);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * Chains have zero mass.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        ChainShape.prototype.computeMass = function (massData, density) {
            massData.mass = 0.0;
            massData.center = Vec2.zero();
            massData.I = 0.0;
        };
        ChainShape.prototype.computeDistanceProxy = function (proxy, childIndex) {
            proxy.m_buffer[0] = this.getVertex(childIndex);
            proxy.m_buffer[1] = this.getVertex(childIndex + 1);
            proxy.m_vertices = proxy.m_buffer;
            proxy.m_count = 2;
            proxy.m_radius = this.m_radius;
        };
        ChainShape.TYPE = 'chain';
        return ChainShape;
    }(Shape));

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
    /**
     * A convex polygon. It is assumed that the interior of the polygon is to the
     * left of each edge. Polygons have a maximum number of vertices equal to
     * Settings.maxPolygonVertices. In most cases you should not need many vertices
     * for a convex polygon. extends Shape
     */
    var PolygonShape = /** @class */ (function (_super) {
        __extends(PolygonShape, _super);
        // @ts-ignore
        function PolygonShape(vertices) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof PolygonShape)) {
                return new PolygonShape(vertices);
            }
            _this = _super.call(this) || this;
            _this.m_type = PolygonShape.TYPE;
            _this.m_radius = Settings.polygonRadius;
            _this.m_centroid = Vec2.zero();
            _this.m_vertices = [];
            _this.m_normals = [];
            _this.m_count = 0;
            if (vertices && vertices.length) {
                _this._set(vertices);
            }
            return _this;
        }
        /** @internal */
        PolygonShape.prototype._serialize = function () {
            return {
                type: this.m_type,
                vertices: this.m_vertices,
            };
        };
        /** @internal */
        PolygonShape._deserialize = function (data, fixture, restore) {
            var vertices = [];
            if (data.vertices) {
                for (var i = 0; i < data.vertices.length; i++) {
                    vertices.push(restore(Vec2, data.vertices[i]));
                }
            }
            var shape = new PolygonShape(vertices);
            return shape;
        };
        PolygonShape.prototype.getVertex = function (index) {
            return this.m_vertices[index];
        };
        /**
         * @internal
         * @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        PolygonShape.prototype._clone = function () {
            var clone = new PolygonShape();
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_count = this.m_count;
            clone.m_centroid.setVec2(this.m_centroid);
            for (var i = 0; i < this.m_count; i++) {
                clone.m_vertices.push(this.m_vertices[i].clone());
            }
            for (var i = 0; i < this.m_normals.length; i++) {
                clone.m_normals.push(this.m_normals[i].clone());
            }
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        PolygonShape.prototype.getChildCount = function () {
            return 1;
        };
        /** @internal */
        PolygonShape.prototype._reset = function () {
            this._set(this.m_vertices);
        };
        /**
         * @internal
         *
         * Create a convex hull from the given array of local points. The count must be
         * in the range [3, Settings.maxPolygonVertices].
         *
         * Warning: the points may be re-ordered, even if they form a convex polygon
         * Warning: collinear points are handled but not removed. Collinear points may
         * lead to poor stacking behavior.
         */
        PolygonShape.prototype._set = function (vertices) {
            if (vertices.length < 3) {
                this._setAsBox(1.0, 1.0);
                return;
            }
            var n = math$1.min(vertices.length, Settings.maxPolygonVertices);
            // Perform welding and copy vertices into local buffer.
            var ps = []; // [Settings.maxPolygonVertices];
            for (var i = 0; i < n; ++i) {
                var v = vertices[i];
                var unique = true;
                for (var j = 0; j < ps.length; ++j) {
                    if (Vec2.distanceSquared(v, ps[j]) < 0.25 * Settings.linearSlopSquared) {
                        unique = false;
                        break;
                    }
                }
                if (unique) {
                    ps.push(v);
                }
            }
            n = ps.length;
            if (n < 3) {
                this._setAsBox(1.0, 1.0);
                return;
            }
            // Create the convex hull using the Gift wrapping algorithm
            // http://en.wikipedia.org/wiki/Gift_wrapping_algorithm
            // Find the right most point on the hull (in case of multiple points bottom most is used)
            var i0 = 0;
            var x0 = ps[0].x;
            for (var i = 1; i < n; ++i) {
                var x = ps[i].x;
                if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
                    i0 = i;
                    x0 = x;
                }
            }
            var hull = []; // [Settings.maxPolygonVertices];
            var m = 0;
            var ih = i0;
            while (true) {
                hull[m] = ih;
                var ie = 0;
                for (var j = 1; j < n; ++j) {
                    if (ie === ih) {
                        ie = j;
                        continue;
                    }
                    var r = Vec2.sub(ps[ie], ps[hull[m]]);
                    var v = Vec2.sub(ps[j], ps[hull[m]]);
                    var c = Vec2.crossVec2Vec2(r, v);
                    // c < 0 means counter-clockwise wrapping, c > 0 means clockwise wrapping
                    if (c < 0.0) {
                        ie = j;
                    }
                    // Collinearity check
                    if (c === 0.0 && v.lengthSquared() > r.lengthSquared()) {
                        ie = j;
                    }
                }
                ++m;
                ih = ie;
                if (ie === i0) {
                    break;
                }
            }
            if (m < 3) {
                this._setAsBox(1.0, 1.0);
                return;
            }
            this.m_count = m;
            // Copy vertices.
            this.m_vertices = [];
            for (var i = 0; i < m; ++i) {
                this.m_vertices[i] = ps[hull[i]];
            }
            // Compute normals. Ensure the edges have non-zero length.
            for (var i = 0; i < m; ++i) {
                var i1 = i;
                var i2 = i + 1 < m ? i + 1 : 0;
                var edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
                this.m_normals[i] = Vec2.crossVec2Num(edge, 1.0);
                this.m_normals[i].normalize();
            }
            // Compute the polygon centroid.
            this.m_centroid = ComputeCentroid(this.m_vertices, m);
        };
        /** @internal */
        PolygonShape.prototype._setAsBox = function (hx, hy, center, angle) {
            // start with right-bottom, counter-clockwise, as in Gift wrapping algorithm in PolygonShape._set()
            this.m_vertices[0] = Vec2.neo(hx, -hy);
            this.m_vertices[1] = Vec2.neo(hx, hy);
            this.m_vertices[2] = Vec2.neo(-hx, hy);
            this.m_vertices[3] = Vec2.neo(-hx, -hy);
            this.m_normals[0] = Vec2.neo(1.0, 0.0);
            this.m_normals[1] = Vec2.neo(0.0, 1.0);
            this.m_normals[2] = Vec2.neo(-1.0, 0.0);
            this.m_normals[3] = Vec2.neo(0.0, -1.0);
            this.m_count = 4;
            if (Vec2.isValid(center)) {
                angle = angle || 0;
                this.m_centroid.setVec2(center);
                var xf = Transform.identity();
                xf.p.setVec2(center);
                xf.q.setAngle(angle);
                // Transform vertices and normals.
                for (var i = 0; i < this.m_count; ++i) {
                    this.m_vertices[i] = Transform.mulVec2(xf, this.m_vertices[i]);
                    this.m_normals[i] = Rot.mulVec2(xf.q, this.m_normals[i]);
                }
            }
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        PolygonShape.prototype.testPoint = function (xf, p) {
            var pLocal = Rot.mulTVec2(xf.q, Vec2.sub(p, xf.p));
            for (var i = 0; i < this.m_count; ++i) {
                var dot = Vec2.dot(this.m_normals[i], Vec2.sub(pLocal, this.m_vertices[i]));
                if (dot > 0.0) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        PolygonShape.prototype.rayCast = function (output, input, xf, childIndex) {
            // Put the ray into the polygon's frame of reference.
            var p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
            var p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
            var d = Vec2.sub(p2, p1);
            var lower = 0.0;
            var upper = input.maxFraction;
            var index = -1;
            for (var i = 0; i < this.m_count; ++i) {
                // p = p1 + a * d
                // dot(normal, p - v) = 0
                // dot(normal, p1 - v) + a * dot(normal, d) = 0
                var numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
                var denominator = Vec2.dot(this.m_normals[i], d);
                if (denominator == 0.0) {
                    if (numerator < 0.0) {
                        return false;
                    }
                }
                else {
                    // Note: we want this predicate without division:
                    // lower < numerator / denominator, where denominator < 0
                    // Since denominator < 0, we have to flip the inequality:
                    // lower < numerator / denominator <==> denominator * lower > numerator.
                    if (denominator < 0.0 && numerator < lower * denominator) {
                        // Increase lower.
                        // The segment enters this half-space.
                        lower = numerator / denominator;
                        index = i;
                    }
                    else if (denominator > 0.0 && numerator < upper * denominator) {
                        // Decrease upper.
                        // The segment exits this half-space.
                        upper = numerator / denominator;
                    }
                }
                // The use of epsilon here causes the assert on lower to trip
                // in some cases. Apparently the use of epsilon was to make edge
                // shapes work, but now those are handled separately.
                // if (upper < lower - Math.EPSILON)
                if (upper < lower) {
                    return false;
                }
            }
            if (index >= 0) {
                output.fraction = lower;
                output.normal = Rot.mulVec2(xf.q, this.m_normals[index]);
                return true;
            }
            return false;
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        PolygonShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            var minX = Infinity;
            var minY = Infinity;
            var maxX = -Infinity;
            var maxY = -Infinity;
            for (var i = 0; i < this.m_count; ++i) {
                var v = Transform.mulVec2(xf, this.m_vertices[i]);
                minX = math$1.min(minX, v.x);
                maxX = math$1.max(maxX, v.x);
                minY = math$1.min(minY, v.y);
                maxY = math$1.max(maxY, v.y);
            }
            aabb.lowerBound.setNum(minX, minY);
            aabb.upperBound.setNum(maxX, maxY);
            aabb.extend(this.m_radius);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        PolygonShape.prototype.computeMass = function (massData, density) {
            var center = Vec2.zero();
            var area = 0.0;
            var I = 0.0;
            // s is the reference point for forming triangles.
            // It's location doesn't change the result (except for rounding error).
            var s = Vec2.zero();
            // This code would put the reference point inside the polygon.
            for (var i = 0; i < this.m_count; ++i) {
                s.add(this.m_vertices[i]);
            }
            s.mul(1.0 / this.m_count);
            var k_inv3 = 1.0 / 3.0;
            for (var i = 0; i < this.m_count; ++i) {
                // Triangle vertices.
                var e1 = Vec2.sub(this.m_vertices[i], s);
                var e2 = i + 1 < this.m_count ? Vec2.sub(this.m_vertices[i + 1], s) : Vec2.sub(this.m_vertices[0], s);
                var D = Vec2.crossVec2Vec2(e1, e2);
                var triangleArea = 0.5 * D;
                area += triangleArea;
                // Area weighted centroid
                center.addCombine(triangleArea * k_inv3, e1, triangleArea * k_inv3, e2);
                var ex1 = e1.x;
                var ey1 = e1.y;
                var ex2 = e2.x;
                var ey2 = e2.y;
                var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
                var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
                I += (0.25 * k_inv3 * D) * (intx2 + inty2);
            }
            // Total mass
            massData.mass = density * area;
            center.mul(1.0 / area);
            massData.center.setCombine(1, center, 1, s);
            // Inertia tensor relative to the local origin (point s).
            massData.I = density * I;
            // Shift to center of mass then to original body origin.
            massData.I += massData.mass * (Vec2.dot(massData.center, massData.center) - Vec2.dot(center, center));
        };
        /**
         * Validate convexity. This is a very time consuming operation.
         * @returns true if valid
         */
        PolygonShape.prototype.validate = function () {
            for (var i = 0; i < this.m_count; ++i) {
                var i1 = i;
                var i2 = i < this.m_count - 1 ? i1 + 1 : 0;
                var p = this.m_vertices[i1];
                var e = Vec2.sub(this.m_vertices[i2], p);
                for (var j = 0; j < this.m_count; ++j) {
                    if (j == i1 || j == i2) {
                        continue;
                    }
                    var v = Vec2.sub(this.m_vertices[j], p);
                    var c = Vec2.crossVec2Vec2(e, v);
                    if (c < 0.0) {
                        return false;
                    }
                }
            }
            return true;
        };
        PolygonShape.prototype.computeDistanceProxy = function (proxy) {
            proxy.m_vertices = this.m_vertices;
            proxy.m_count = this.m_count;
            proxy.m_radius = this.m_radius;
        };
        PolygonShape.TYPE = 'polygon';
        return PolygonShape;
    }(Shape));
    function ComputeCentroid(vs, count) {
        var c = Vec2.zero();
        var area = 0.0;
        // pRef is the reference point for forming triangles.
        // It's location doesn't change the result (except for rounding error).
        var pRef = Vec2.zero();
        var i; 
        var inv3 = 1.0 / 3.0;
        for (var i = 0; i < count; ++i) {
            // Triangle vertices.
            var p1 = pRef;
            var p2 = vs[i];
            var p3 = i + 1 < count ? vs[i + 1] : vs[0];
            var e1 = Vec2.sub(p2, p1);
            var e2 = Vec2.sub(p3, p1);
            var D = Vec2.crossVec2Vec2(e1, e2);
            var triangleArea = 0.5 * D;
            area += triangleArea;
            // Area weighted centroid
            c.addMul(triangleArea * inv3, p1);
            c.addMul(triangleArea * inv3, p2);
            c.addMul(triangleArea * inv3, p3);
        }
        c.mul(1.0 / area);
        return c;
    }

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
    /**
     * A rectangle polygon which extend PolygonShape.
     */
    var BoxShape = /** @class */ (function (_super) {
        __extends(BoxShape, _super);
        function BoxShape(hx, hy, center, angle) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof BoxShape)) {
                return new BoxShape(hx, hy, center, angle);
            }
            _this = _super.call(this) || this;
            _this._setAsBox(hx, hy, center, angle);
            return _this;
        }
        BoxShape.TYPE = 'polygon';
        return BoxShape;
    }(PolygonShape));

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
    var CircleShape = /** @class */ (function (_super) {
        __extends(CircleShape, _super);
        // tslint:disable-next-line:typedef
        function CircleShape(a, b) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof CircleShape)) {
                return new CircleShape(a, b);
            }
            _this = _super.call(this) || this;
            _this.m_type = CircleShape.TYPE;
            _this.m_p = Vec2.zero();
            _this.m_radius = 1;
            if (typeof a === 'object' && Vec2.isValid(a)) {
                _this.m_p.setVec2(a);
                if (typeof b === 'number') {
                    _this.m_radius = b;
                }
            }
            else if (typeof a === 'number') {
                _this.m_radius = a;
            }
            return _this;
        }
        /** @internal */
        CircleShape.prototype._serialize = function () {
            return {
                type: this.m_type,
                p: this.m_p,
                radius: this.m_radius,
            };
        };
        /** @internal */
        CircleShape._deserialize = function (data) {
            return new CircleShape(data.p, data.radius);
        };
        // TODO: already defined in Shape
        CircleShape.prototype.getRadius = function () {
            return this.m_radius;
        };
        CircleShape.prototype.getCenter = function () {
            return this.m_p;
        };
        CircleShape.prototype.getVertex = function (index) {
            return this.m_p;
        };
        /**
         * @internal
         * @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        CircleShape.prototype._clone = function () {
            var clone = new CircleShape();
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_p = this.m_p.clone();
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        CircleShape.prototype.getChildCount = function () {
            return 1;
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        CircleShape.prototype.testPoint = function (xf, p) {
            var center = Vec2.add(xf.p, Rot.mulVec2(xf.q, this.m_p));
            var d = Vec2.sub(p, center);
            return Vec2.dot(d, d) <= this.m_radius * this.m_radius;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        CircleShape.prototype.rayCast = function (output, input, xf, childIndex) {
            // Collision Detection in Interactive 3D Environments by Gino van den Bergen
            // From Section 3.1.2
            // x = s + a * r
            // norm(x) = radius
            var position = Vec2.add(xf.p, Rot.mulVec2(xf.q, this.m_p));
            var s = Vec2.sub(input.p1, position);
            var b = Vec2.dot(s, s) - this.m_radius * this.m_radius;
            // Solve quadratic equation.
            var r = Vec2.sub(input.p2, input.p1);
            var c = Vec2.dot(s, r);
            var rr = Vec2.dot(r, r);
            var sigma = c * c - rr * b;
            // Check for negative discriminant and short segment.
            if (sigma < 0.0 || rr < math$1.EPSILON) {
                return false;
            }
            // Find the point of intersection of the line with the circle.
            var a = -(c + math$1.sqrt(sigma));
            // Is the intersection point on the segment?
            if (0.0 <= a && a <= input.maxFraction * rr) {
                a /= rr;
                output.fraction = a;
                output.normal = Vec2.add(s, Vec2.mulNumVec2(a, r));
                output.normal.normalize();
                return true;
            }
            return false;
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        CircleShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            var p = Vec2.add(xf.p, Rot.mulVec2(xf.q, this.m_p));
            aabb.lowerBound.setNum(p.x - this.m_radius, p.y - this.m_radius);
            aabb.upperBound.setNum(p.x + this.m_radius, p.y + this.m_radius);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        CircleShape.prototype.computeMass = function (massData, density) {
            massData.mass = density * math$1.PI * this.m_radius * this.m_radius;
            massData.center = this.m_p;
            // inertia about the local origin
            massData.I = massData.mass
                * (0.5 * this.m_radius * this.m_radius + Vec2.dot(this.m_p, this.m_p));
        };
        CircleShape.prototype.computeDistanceProxy = function (proxy) {
            proxy.m_vertices.push(this.m_p);
            proxy.m_count = 1;
            proxy.m_radius = this.m_radius;
        };
        CircleShape.TYPE = 'circle';
        return CircleShape;
    }(Shape));

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
    var DEFAULTS$a = {
        frequencyHz: 0.0,
        dampingRatio: 0.0
    };
    /**
     * A distance joint constrains two points on two bodies to remain at a fixed
     * distance from each other. You can view this as a massless, rigid rod.
     *
     * @param anchorA Anchor A in global coordination.
     * @param anchorB Anchor B in global coordination.
     */
    var DistanceJoint = /** @class */ (function (_super) {
        __extends(DistanceJoint, _super);
        function DistanceJoint(def, bodyA, bodyB, anchorA, anchorB) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof DistanceJoint)) {
                return new DistanceJoint(def, bodyA, bodyB, anchorA, anchorB);
            }
            // order of constructor arguments is changed in v0.2
            if (bodyB && anchorA && ('m_type' in anchorA) && ('x' in bodyB) && ('y' in bodyB)) {
                var temp = bodyB;
                bodyB = anchorA;
                anchorA = temp;
            }
            def = options(def, DEFAULTS$a);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = DistanceJoint.TYPE;
            // Solver shared
            _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
            _this.m_length = math$1.isFinite(def.length) ? def.length :
                Vec2.distance(bodyA.getWorldPoint(_this.m_localAnchorA), bodyB.getWorldPoint(_this.m_localAnchorB));
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_impulse = 0.0;
            _this.m_gamma = 0.0;
            _this.m_bias = 0.0;
            return _this;
            // 1-D constrained system
            // m (v2 - v1) = lambda
            // v2 + (beta/h) * x1 + gamma * lambda = 0, gamma has units of inverse mass.
            // x2 = x1 + h * v2
            // 1-D mass-damper-spring system
            // m (v2 - v1) + h * d * v2 + h * k *
            // C = norm(p2 - p1) - L
            // u = (p2 - p1) / norm(p2 - p1)
            // Cdot = dot(u, v2 + cross(w2, r2) - v1 - cross(w1, r1))
            // J = [-u -cross(r1, u) u cross(r2, u)]
            // K = J * invM * JT
            // = invMass1 + invI1 * cross(r1, u)^2 + invMass2 + invI2 * cross(r2, u)^2
        }
        /** @internal */
        DistanceJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                length: this.m_length,
                impulse: this.m_impulse,
                gamma: this.m_gamma,
                bias: this.m_bias,
            };
        };
        /** @internal */
        DistanceJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new DistanceJoint(data);
            return joint;
        };
        /** @internal */
        DistanceJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
            if (def.length > 0) {
                this.m_length = +def.length;
            }
            else if (def.length < 0) ;
            else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
                this.m_length = Vec2.distance(this.m_bodyA.getWorldPoint(this.m_localAnchorA), this.m_bodyB.getWorldPoint(this.m_localAnchorB));
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        DistanceJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        DistanceJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Set the natural length. Manipulating the length can lead to non-physical
         * behavior when the frequency is zero.
         */
        DistanceJoint.prototype.setLength = function (length) {
            this.m_length = length;
        };
        /**
         * Get the natural length.
         */
        DistanceJoint.prototype.getLength = function () {
            return this.m_length;
        };
        DistanceJoint.prototype.setFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        DistanceJoint.prototype.getFrequency = function () {
            return this.m_frequencyHz;
        };
        DistanceJoint.prototype.setDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        DistanceJoint.prototype.getDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        DistanceJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        DistanceJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        DistanceJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        DistanceJoint.prototype.getReactionTorque = function (inv_dt) {
            return 0.0;
        };
        DistanceJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            this.m_u = Vec2.sub(Vec2.add(cB, this.m_rB), Vec2.add(cA, this.m_rA));
            // Handle singularity.
            var length = this.m_u.length();
            if (length > Settings.linearSlop) {
                this.m_u.mul(1.0 / length);
            }
            else {
                this.m_u.setNum(0.0, 0.0);
            }
            var crAu = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
            var crBu = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
            var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB
                + this.m_invIB * crBu * crBu;
            // Compute the effective mass matrix.
            this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
            if (this.m_frequencyHz > 0.0) {
                var C = length - this.m_length;
                // Frequency
                var omega = 2.0 * math$1.PI * this.m_frequencyHz;
                // Damping coefficient
                var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
                // Spring stiffness
                var k = this.m_mass * omega * omega;
                // magic formulas
                var h = step.dt;
                this.m_gamma = h * (d + h * k);
                this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
                this.m_bias = C * h * k * this.m_gamma;
                invMass += this.m_gamma;
                this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
            }
            else {
                this.m_gamma = 0.0;
                this.m_bias = 0.0;
            }
            if (step.warmStarting) {
                // Scale the impulse to support a variable time step.
                this.m_impulse *= step.dtRatio;
                var P = Vec2.mulNumVec2(this.m_impulse, this.m_u);
                vA.subMul(this.m_invMassA, P);
                wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
                vB.addMul(this.m_invMassB, P);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        DistanceJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            // Cdot = dot(u, v + cross(w, r))
            var vpA = Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA));
            var vpB = Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB));
            var Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);
            var impulse = -this.m_mass
                * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
            this.m_impulse += impulse;
            var P = Vec2.mulNumVec2(impulse, this.m_u);
            vA.subMul(this.m_invMassA, P);
            wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
            vB.addMul(this.m_invMassB, P);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        DistanceJoint.prototype.solvePositionConstraints = function (step) {
            if (this.m_frequencyHz > 0.0) {
                // There is no position correction for soft distance constraints.
                return true;
            }
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
            var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
            var u = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
            var length = u.normalize();
            var C = length - this.m_length;
            C = math$1
                .clamp(C, -Settings.maxLinearCorrection, Settings.maxLinearCorrection);
            var impulse = -this.m_mass * C;
            var P = Vec2.mulNumVec2(impulse, u);
            cA.subMul(this.m_invMassA, P);
            aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
            cB.addMul(this.m_invMassB, P);
            aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return math$1.abs(C) < Settings.linearSlop;
        };
        DistanceJoint.TYPE = 'distance-joint';
        return DistanceJoint;
    }(Joint));

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
    var DEFAULTS$9 = {
        maxForce: 0.0,
        maxTorque: 0.0,
    };
    /**
     * Friction joint. This is used for top-down friction. It provides 2D
     * translational friction and angular friction.
     *
     * @param anchor Anchor in global coordination.
     */
    var FrictionJoint = /** @class */ (function (_super) {
        __extends(FrictionJoint, _super);
        function FrictionJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof FrictionJoint)) {
                return new FrictionJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$9);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = FrictionJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            // Solver shared
            _this.m_linearImpulse = Vec2.zero();
            _this.m_angularImpulse = 0.0;
            _this.m_maxForce = def.maxForce;
            _this.m_maxTorque = def.maxTorque;
            return _this;
            // Point-to-point constraint
            // Cdot = v2 - v1
            // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Angle constraint
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        FrictionJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                maxForce: this.m_maxForce,
                maxTorque: this.m_maxTorque,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
            };
        };
        /** @internal */
        FrictionJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new FrictionJoint(data);
            return joint;
        };
        /** @internal */
        FrictionJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        FrictionJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        FrictionJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Set the maximum friction force in N.
         */
        FrictionJoint.prototype.setMaxForce = function (force) {
            this.m_maxForce = force;
        };
        /**
         * Get the maximum friction force in N.
         */
        FrictionJoint.prototype.getMaxForce = function () {
            return this.m_maxForce;
        };
        /**
         * Set the maximum friction torque in N*m.
         */
        FrictionJoint.prototype.setMaxTorque = function (torque) {
            this.m_maxTorque = torque;
        };
        /**
         * Get the maximum friction torque in N*m.
         */
        FrictionJoint.prototype.getMaxTorque = function () {
            return this.m_maxTorque;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        FrictionJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        FrictionJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        FrictionJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        FrictionJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_angularImpulse;
        };
        FrictionJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective mass matrix.
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var K = new Mat22();
            K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y
                * this.m_rB.y;
            K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x
                * this.m_rB.x;
            this.m_linearMass = K.getInverse();
            this.m_angularMass = iA + iB;
            if (this.m_angularMass > 0.0) {
                this.m_angularMass = 1.0 / this.m_angularMass;
            }
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_linearImpulse.mul(step.dtRatio);
                this.m_angularImpulse *= step.dtRatio;
                var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_angularImpulse);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_angularImpulse);
            }
            else {
                this.m_linearImpulse.setZero();
                this.m_angularImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        FrictionJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var h = step.dt; // float
            // Solve angular friction
            {
                var Cdot = wB - wA; // float
                var impulse = -this.m_angularMass * Cdot; // float
                var oldImpulse = this.m_angularImpulse; // float
                var maxImpulse = h * this.m_maxTorque; // float
                this.m_angularImpulse = math$1.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_angularImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve linear friction
            {
                var Cdot = Vec2.sub(Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB)), Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA))); // Vec2
                var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot)); // Vec2
                var oldImpulse = this.m_linearImpulse; // Vec2
                this.m_linearImpulse.add(impulse);
                var maxImpulse = h * this.m_maxForce; // float
                if (this.m_linearImpulse.lengthSquared() > maxImpulse * maxImpulse) {
                    this.m_linearImpulse.normalize();
                    this.m_linearImpulse.mul(maxImpulse);
                }
                impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
                vA.subMul(mA, impulse);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
                vB.addMul(mB, impulse);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        FrictionJoint.prototype.solvePositionConstraints = function (step) {
            return true;
        };
        FrictionJoint.TYPE = 'friction-joint';
        return FrictionJoint;
    }(Joint));

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
    /**
     * A 3-by-3 matrix. Stored in column-major order.
     */
    var Mat33 = /** @class */ (function () {
        function Mat33(a, b, c) {
            if (typeof a === 'object' && a !== null) {
                this.ex = Vec3.clone(a);
                this.ey = Vec3.clone(b);
                this.ez = Vec3.clone(c);
            }
            else {
                this.ex = Vec3.zero();
                this.ey = Vec3.zero();
                this.ez = Vec3.zero();
            }
        }
        /** @internal */
        Mat33.prototype.toString = function () {
            return JSON.stringify(this);
        };
        Mat33.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec3.isValid(obj.ex) && Vec3.isValid(obj.ey) && Vec3.isValid(obj.ez);
        };
        Mat33.assert = function (o) {
            return;
        };
        /**
         * Set this matrix to all zeros.
         */
        Mat33.prototype.setZero = function () {
            this.ex.setZero();
            this.ey.setZero();
            this.ez.setZero();
            return this;
        };
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient than
         * computing the inverse in one-shot cases.
         */
        Mat33.prototype.solve33 = function (v) {
            var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var r = new Vec3();
            r.x = det * Vec3.dot(v, Vec3.cross(this.ey, this.ez));
            r.y = det * Vec3.dot(this.ex, Vec3.cross(v, this.ez));
            r.z = det * Vec3.dot(this.ex, Vec3.cross(this.ey, v));
            return r;
        };
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient than
         * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
         * equation.
         */
        Mat33.prototype.solve22 = function (v) {
            var a11 = this.ex.x;
            var a12 = this.ey.x;
            var a21 = this.ex.y;
            var a22 = this.ey.y;
            var det = a11 * a22 - a12 * a21;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var r = Vec2.zero();
            r.x = det * (a22 * v.x - a12 * v.y);
            r.y = det * (a11 * v.y - a21 * v.x);
            return r;
        };
        /**
         * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
         * singular.
         */
        Mat33.prototype.getInverse22 = function (M) {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            M.ex.x = det * d;
            M.ey.x = -det * b;
            M.ex.z = 0.0;
            M.ex.y = -det * c;
            M.ey.y = det * a;
            M.ey.z = 0.0;
            M.ez.x = 0.0;
            M.ez.y = 0.0;
            M.ez.z = 0.0;
        };
        /**
         * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
         * if singular.
         */
        Mat33.prototype.getSymInverse33 = function (M) {
            var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
            if (det !== 0.0) {
                det = 1.0 / det;
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
        // tslint:disable-next-line:typedef
        Mat33.mul = function (a, b) {
            if (b && 'z' in b && 'y' in b && 'x' in b) {
                var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
                var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
                var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
                return new Vec3(x, y, z);
            }
            else if (b && 'y' in b && 'x' in b) {
                var x = a.ex.x * b.x + a.ey.x * b.y;
                var y = a.ex.y * b.x + a.ey.y * b.y;
                return Vec2.neo(x, y);
            }
        };
        Mat33.mulVec3 = function (a, b) {
            var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
            var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
            var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
            return new Vec3(x, y, z);
        };
        Mat33.mulVec2 = function (a, b) {
            var x = a.ex.x * b.x + a.ey.x * b.y;
            var y = a.ex.y * b.x + a.ey.y * b.y;
            return Vec2.neo(x, y);
        };
        Mat33.add = function (a, b) {
            return new Mat33(Vec3.add(a.ex, b.ex), Vec3.add(a.ey, b.ey), Vec3.add(a.ez, b.ez));
        };
        return Mat33;
    }());

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
    var inactiveLimit$2 = 0;
    var atLowerLimit$1 = 1;
    var atUpperLimit$2 = 2;
    var equalLimits$1 = 3;
    var DEFAULTS$8 = {
        lowerAngle: 0.0,
        upperAngle: 0.0,
        maxMotorTorque: 0.0,
        motorSpeed: 0.0,
        enableLimit: false,
        enableMotor: false
    };
    /**
     * A revolute joint constrains two bodies to share a common point while they are
     * free to rotate about the point. The relative rotation about the shared point
     * is the joint angle. You can limit the relative rotation with a joint limit
     * that specifies a lower and upper angle. You can use a motor to drive the
     * relative rotation about the shared point. A maximum motor torque is provided
     * so that infinite forces are not generated.
     */
    var RevoluteJoint = /** @class */ (function (_super) {
        __extends(RevoluteJoint, _super);
        // @ts-ignore
        function RevoluteJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof RevoluteJoint)) {
                return new RevoluteJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$8);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            // effective mass for point-to-point constraint.
            /** @internal */ _this.m_mass = new Mat33();
            /** @internal */ _this.m_limitState = inactiveLimit$2; // TODO enum
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = RevoluteJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            _this.m_referenceAngle = math$1.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
            _this.m_impulse = new Vec3();
            _this.m_motorImpulse = 0.0;
            _this.m_lowerAngle = def.lowerAngle;
            _this.m_upperAngle = def.upperAngle;
            _this.m_maxMotorTorque = def.maxMotorTorque;
            _this.m_motorSpeed = def.motorSpeed;
            _this.m_enableLimit = def.enableLimit;
            _this.m_enableMotor = def.enableMotor;
            return _this;
            // Point-to-point constraint
            // C = p2 - p1
            // Cdot = v2 - v1
            // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Motor constraint
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        RevoluteJoint.prototype._serialize = function () {
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
                referenceAngle: this.m_referenceAngle,
            };
        };
        /** @internal */
        RevoluteJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new RevoluteJoint(data);
            return joint;
        };
        /** @internal */
        RevoluteJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        RevoluteJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        RevoluteJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Get the reference angle.
         */
        RevoluteJoint.prototype.getReferenceAngle = function () {
            return this.m_referenceAngle;
        };
        /**
         * Get the current joint angle in radians.
         */
        RevoluteJoint.prototype.getJointAngle = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
        };
        /**
         * Get the current joint angle speed in radians per second.
         */
        RevoluteJoint.prototype.getJointSpeed = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            return bB.m_angularVelocity - bA.m_angularVelocity;
        };
        /**
         * Is the joint motor enabled?
         */
        RevoluteJoint.prototype.isMotorEnabled = function () {
            return this.m_enableMotor;
        };
        /**
         * Enable/disable the joint motor.
         */
        RevoluteJoint.prototype.enableMotor = function (flag) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableMotor = flag;
        };
        /**
         * Get the current motor torque given the inverse time step. Unit is N*m.
         */
        RevoluteJoint.prototype.getMotorTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        /**
         * Set the motor speed in radians per second.
         */
        RevoluteJoint.prototype.setMotorSpeed = function (speed) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_motorSpeed = speed;
        };
        /**
         * Get the motor speed in radians per second.
         */
        RevoluteJoint.prototype.getMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        /**
         * Set the maximum motor torque, usually in N-m.
         */
        RevoluteJoint.prototype.setMaxMotorTorque = function (torque) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_maxMotorTorque = torque;
        };
        RevoluteJoint.prototype.getMaxMotorTorque = function () {
            return this.m_maxMotorTorque;
        };
        /**
         * Is the joint limit enabled?
         */
        RevoluteJoint.prototype.isLimitEnabled = function () {
            return this.m_enableLimit;
        };
        /**
         * Enable/disable the joint limit.
         */
        RevoluteJoint.prototype.enableLimit = function (flag) {
            if (flag != this.m_enableLimit) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_enableLimit = flag;
                this.m_impulse.z = 0.0;
            }
        };
        /**
         * Get the lower joint limit in radians.
         */
        RevoluteJoint.prototype.getLowerLimit = function () {
            return this.m_lowerAngle;
        };
        /**
         * Get the upper joint limit in radians.
         */
        RevoluteJoint.prototype.getUpperLimit = function () {
            return this.m_upperAngle;
        };
        /**
         * Set the joint limits in radians.
         */
        RevoluteJoint.prototype.setLimits = function (lower, upper) {
            if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_impulse.z = 0.0;
                this.m_lowerAngle = lower;
                this.m_upperAngle = upper;
            }
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        RevoluteJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        RevoluteJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force given the inverse time step. Unit is N.
         */
        RevoluteJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
        };
        /**
         * Get the reaction torque due to the joint limit given the inverse time step.
         * Unit is N*m.
         */
        RevoluteJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.z;
        };
        RevoluteJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB; // float
            var iA = this.m_invIA;
            var iB = this.m_invIB; // float
            var fixedRotation = (iA + iB === 0.0); // bool
            this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y
                * this.m_rB.y * iB;
            this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y
                * this.m_rB.x * iB;
            this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
            this.m_mass.ex.y = this.m_mass.ey.x;
            this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x
                * this.m_rB.x * iB;
            this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
            this.m_mass.ex.z = this.m_mass.ez.x;
            this.m_mass.ey.z = this.m_mass.ez.y;
            this.m_mass.ez.z = iA + iB;
            this.m_motorMass = iA + iB;
            if (this.m_motorMass > 0.0) {
                this.m_motorMass = 1.0 / this.m_motorMass;
            }
            if (this.m_enableMotor == false || fixedRotation) {
                this.m_motorImpulse = 0.0;
            }
            if (this.m_enableLimit && fixedRotation == false) {
                var jointAngle = aB - aA - this.m_referenceAngle; // float
                if (math$1.abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * Settings.angularSlop) {
                    this.m_limitState = equalLimits$1;
                }
                else if (jointAngle <= this.m_lowerAngle) {
                    if (this.m_limitState != atLowerLimit$1) {
                        this.m_impulse.z = 0.0;
                    }
                    this.m_limitState = atLowerLimit$1;
                }
                else if (jointAngle >= this.m_upperAngle) {
                    if (this.m_limitState != atUpperLimit$2) {
                        this.m_impulse.z = 0.0;
                    }
                    this.m_limitState = atUpperLimit$2;
                }
                else {
                    this.m_limitState = inactiveLimit$2;
                    this.m_impulse.z = 0.0;
                }
            }
            else {
                this.m_limitState = inactiveLimit$2;
            }
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_impulse.mul(step.dtRatio);
                this.m_motorImpulse *= step.dtRatio;
                var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_motorImpulse + this.m_impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_motorImpulse + this.m_impulse.z);
            }
            else {
                this.m_impulse.setZero();
                this.m_motorImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        RevoluteJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB; // float
            var iA = this.m_invIA;
            var iB = this.m_invIB; // float
            var fixedRotation = (iA + iB === 0.0); // bool
            // Solve motor constraint.
            if (this.m_enableMotor && this.m_limitState != equalLimits$1
                && fixedRotation == false) {
                var Cdot = wB - wA - this.m_motorSpeed; // float
                var impulse = -this.m_motorMass * Cdot; // float
                var oldImpulse = this.m_motorImpulse; // float
                var maxImpulse = step.dt * this.m_maxMotorTorque; // float
                this.m_motorImpulse = math$1.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve limit constraint.
            if (this.m_enableLimit && this.m_limitState != inactiveLimit$2
                && fixedRotation == false) {
                var Cdot1 = Vec2.zero();
                Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                var Cdot2 = wB - wA; // float
                var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
                var impulse = Vec3.neg(this.m_mass.solve33(Cdot)); // Vec3
                if (this.m_limitState == equalLimits$1) {
                    this.m_impulse.add(impulse);
                }
                else if (this.m_limitState == atLowerLimit$1) {
                    var newImpulse = this.m_impulse.z + impulse.z; // float
                    if (newImpulse < 0.0) {
                        var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y)); // Vec2
                        var reduced = this.m_mass.solve22(rhs); // Vec2
                        impulse.x = reduced.x;
                        impulse.y = reduced.y;
                        impulse.z = -this.m_impulse.z;
                        this.m_impulse.x += reduced.x;
                        this.m_impulse.y += reduced.y;
                        this.m_impulse.z = 0.0;
                    }
                    else {
                        this.m_impulse.add(impulse);
                    }
                }
                else if (this.m_limitState == atUpperLimit$2) {
                    var newImpulse = this.m_impulse.z + impulse.z; // float
                    if (newImpulse > 0.0) {
                        var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y)); // Vec2
                        var reduced = this.m_mass.solve22(rhs); // Vec2
                        impulse.x = reduced.x;
                        impulse.y = reduced.y;
                        impulse.z = -this.m_impulse.z;
                        this.m_impulse.x += reduced.x;
                        this.m_impulse.y += reduced.y;
                        this.m_impulse.z = 0.0;
                    }
                    else {
                        this.m_impulse.add(impulse);
                    }
                }
                var P = Vec2.neo(impulse.x, impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
            }
            else {
                // Solve point-to-point constraint
                var Cdot = Vec2.zero();
                Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                var impulse = this.m_mass.solve22(Vec2.neg(Cdot)); // Vec2
                this.m_impulse.x += impulse.x;
                this.m_impulse.y += impulse.y;
                vA.subMul(mA, impulse);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
                vB.addMul(mB, impulse);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        RevoluteJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var angularError = 0.0; // float
            var positionError = 0.0; // float
            var fixedRotation = (this.m_invIA + this.m_invIB == 0.0); // bool
            // Solve angular limit constraint.
            if (this.m_enableLimit && this.m_limitState != inactiveLimit$2
                && fixedRotation == false) {
                var angle = aB - aA - this.m_referenceAngle; // float
                var limitImpulse = 0.0; // float
                if (this.m_limitState == equalLimits$1) {
                    // Prevent large angular corrections
                    var C = math$1.clamp(angle - this.m_lowerAngle, -Settings.maxAngularCorrection, Settings.maxAngularCorrection); // float
                    limitImpulse = -this.m_motorMass * C;
                    angularError = math$1.abs(C);
                }
                else if (this.m_limitState == atLowerLimit$1) {
                    var C = angle - this.m_lowerAngle; // float
                    angularError = -C;
                    // Prevent large angular corrections and allow some slop.
                    C = math$1.clamp(C + Settings.angularSlop, -Settings.maxAngularCorrection, 0.0);
                    limitImpulse = -this.m_motorMass * C;
                }
                else if (this.m_limitState == atUpperLimit$2) {
                    var C = angle - this.m_upperAngle; // float
                    angularError = C;
                    // Prevent large angular corrections and allow some slop.
                    C = math$1.clamp(C - Settings.angularSlop, 0.0, Settings.maxAngularCorrection);
                    limitImpulse = -this.m_motorMass * C;
                }
                aA -= this.m_invIA * limitImpulse;
                aB += this.m_invIB * limitImpulse;
            }
            // Solve point-to-point constraint.
            {
                qA.setAngle(aA);
                qB.setAngle(aB);
                var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
                var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2
                var C = Vec2.zero();
                C.addCombine(1, cB, 1, rB);
                C.subCombine(1, cA, 1, rA);
                positionError = C.length();
                var mA = this.m_invMassA;
                var mB = this.m_invMassB; // float
                var iA = this.m_invIA;
                var iB = this.m_invIB; // float
                var K = new Mat22();
                K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
                K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
                K.ey.x = K.ex.y;
                K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
                var impulse = Vec2.neg(K.solve(C)); // Vec2
                cA.subMul(mA, impulse);
                aA -= iA * Vec2.crossVec2Vec2(rA, impulse);
                cB.addMul(mB, impulse);
                aB += iB * Vec2.crossVec2Vec2(rB, impulse);
            }
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return positionError <= Settings.linearSlop
                && angularError <= Settings.angularSlop;
        };
        RevoluteJoint.TYPE = 'revolute-joint';
        return RevoluteJoint;
    }(Joint));

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
    var inactiveLimit$1 = 0;
    var atLowerLimit = 1;
    var atUpperLimit$1 = 2;
    var equalLimits = 3;
    var DEFAULTS$7 = {
        enableLimit: false,
        lowerTranslation: 0.0,
        upperTranslation: 0.0,
        enableMotor: false,
        maxMotorForce: 0.0,
        motorSpeed: 0.0
    };
    /**
     * A prismatic joint. This joint provides one degree of freedom: translation
     * along an axis fixed in bodyA. Relative rotation is prevented. You can use a
     * joint limit to restrict the range of motion and a joint motor to drive the
     * motion or to model joint friction.
     */
    var PrismaticJoint = /** @class */ (function (_super) {
        __extends(PrismaticJoint, _super);
        function PrismaticJoint(def, bodyA, bodyB, anchor, axis) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof PrismaticJoint)) {
                return new PrismaticJoint(def, bodyA, bodyB, anchor, axis);
            }
            def = options(def, DEFAULTS$7);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = PrismaticJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            _this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1.0, 0.0));
            _this.m_localXAxisA.normalize();
            _this.m_localYAxisA = Vec2.crossNumVec2(1.0, _this.m_localXAxisA);
            _this.m_referenceAngle = math$1.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
            _this.m_impulse = new Vec3();
            _this.m_motorMass = 0.0;
            _this.m_motorImpulse = 0.0;
            _this.m_lowerTranslation = def.lowerTranslation;
            _this.m_upperTranslation = def.upperTranslation;
            _this.m_maxMotorForce = def.maxMotorForce;
            _this.m_motorSpeed = def.motorSpeed;
            _this.m_enableLimit = def.enableLimit;
            _this.m_enableMotor = def.enableMotor;
            _this.m_limitState = inactiveLimit$1;
            _this.m_axis = Vec2.zero();
            _this.m_perp = Vec2.zero();
            _this.m_K = new Mat33();
            return _this;
            // Linear constraint (point-to-line)
            // d = p2 - p1 = x2 + r2 - x1 - r1
            // C = dot(perp, d)
            // Cdot = dot(d, cross(w1, perp)) + dot(perp, v2 + cross(w2, r2) - v1 -
            // cross(w1, r1))
            // = -dot(perp, v1) - dot(cross(d + r1, perp), w1) + dot(perp, v2) +
            // dot(cross(r2, perp), v2)
            // J = [-perp, -cross(d + r1, perp), perp, cross(r2,perp)]
            //
            // Angular constraint
            // C = a2 - a1 + a_initial
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            //
            // K = J * invM * JT
            //
            // J = [-a -s1 a s2]
            // [0 -1 0 1]
            // a = perp
            // s1 = cross(d + r1, a) = cross(p2 - x1, a)
            // s2 = cross(r2, a) = cross(p2 - x2, a)
            // Motor/Limit linear constraint
            // C = dot(ax1, d)
            // Cdot = = -dot(ax1, v1) - dot(cross(d + r1, ax1), w1) + dot(ax1, v2) +
            // dot(cross(r2, ax1), v2)
            // J = [-ax1 -cross(d+r1,ax1) ax1 cross(r2,ax1)]
            // Block Solver
            // We develop a block solver that includes the joint limit. This makes the
            // limit stiff (inelastic) even
            // when the mass has poor distribution (leading to large torques about the
            // joint anchor points).
            //
            // The Jacobian has 3 rows:
            // J = [-uT -s1 uT s2] // linear
            // [0 -1 0 1] // angular
            // [-vT -a1 vT a2] // limit
            //
            // u = perp
            // v = axis
            // s1 = cross(d + r1, u), s2 = cross(r2, u)
            // a1 = cross(d + r1, v), a2 = cross(r2, v)
            // M * (v2 - v1) = JT * df
            // J * v2 = bias
            //
            // v2 = v1 + invM * JT * df
            // J * (v1 + invM * JT * df) = bias
            // K * df = bias - J * v1 = -Cdot
            // K = J * invM * JT
            // Cdot = J * v1 - bias
            //
            // Now solve for f2.
            // df = f2 - f1
            // K * (f2 - f1) = -Cdot
            // f2 = invK * (-Cdot) + f1
            //
            // Clamp accumulated limit impulse.
            // lower: f2(3) = max(f2(3), 0)
            // upper: f2(3) = min(f2(3), 0)
            //
            // Solve for correct f2(1:2)
            // K(1:2, 1:2) * f2(1:2) = -Cdot(1:2) - K(1:2,3) * f2(3) + K(1:2,1:3) * f1
            // = -Cdot(1:2) - K(1:2,3) * f2(3) + K(1:2,1:2) * f1(1:2) + K(1:2,3) * f1(3)
            // K(1:2, 1:2) * f2(1:2) = -Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3)) +
            // K(1:2,1:2) * f1(1:2)
            // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
            // f1(1:2)
            //
            // Now compute impulse to be applied:
            // df = f2 - f1
        }
        /** @internal */
        PrismaticJoint.prototype._serialize = function () {
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
                referenceAngle: this.m_referenceAngle,
            };
        };
        /** @internal */
        PrismaticJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            data.localAxisA = Vec2.clone(data.localAxisA);
            var joint = new PrismaticJoint(data);
            return joint;
        };
        /** @internal */
        PrismaticJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
            if (def.localAxisA) {
                this.m_localXAxisA.setVec2(def.localAxisA);
                this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1.0, def.localAxisA));
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        PrismaticJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        PrismaticJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * The local joint axis relative to bodyA.
         */
        PrismaticJoint.prototype.getLocalAxisA = function () {
            return this.m_localXAxisA;
        };
        /**
         * Get the reference angle.
         */
        PrismaticJoint.prototype.getReferenceAngle = function () {
            return this.m_referenceAngle;
        };
        /**
         * Get the current joint translation, usually in meters.
         */
        PrismaticJoint.prototype.getJointTranslation = function () {
            var pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
            var pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
            var d = Vec2.sub(pB, pA);
            var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
            var translation = Vec2.dot(d, axis);
            return translation;
        };
        /**
         * Get the current joint translation speed, usually in meters per second.
         */
        PrismaticJoint.prototype.getJointSpeed = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            var rA = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter)); // Vec2
            var rB = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter)); // Vec2
            var p1 = Vec2.add(bA.m_sweep.c, rA); // Vec2
            var p2 = Vec2.add(bB.m_sweep.c, rB); // Vec2
            var d = Vec2.sub(p2, p1); // Vec2
            var axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA); // Vec2
            var vA = bA.m_linearVelocity; // Vec2
            var vB = bB.m_linearVelocity; // Vec2
            var wA = bA.m_angularVelocity; // float
            var wB = bB.m_angularVelocity; // float
            var speed = Vec2.dot(d, Vec2.crossNumVec2(wA, axis))
                + Vec2.dot(axis, Vec2.sub(Vec2.addCrossNumVec2(vB, wB, rB), Vec2.addCrossNumVec2(vA, wA, rA))); // float
            return speed;
        };
        /**
         * Is the joint limit enabled?
         */
        PrismaticJoint.prototype.isLimitEnabled = function () {
            return this.m_enableLimit;
        };
        /**
         * Enable/disable the joint limit.
         */
        PrismaticJoint.prototype.enableLimit = function (flag) {
            if (flag != this.m_enableLimit) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_enableLimit = flag;
                this.m_impulse.z = 0.0;
            }
        };
        /**
         * Get the lower joint limit, usually in meters.
         */
        PrismaticJoint.prototype.getLowerLimit = function () {
            return this.m_lowerTranslation;
        };
        /**
         * Get the upper joint limit, usually in meters.
         */
        PrismaticJoint.prototype.getUpperLimit = function () {
            return this.m_upperTranslation;
        };
        /**
         * Set the joint limits, usually in meters.
         */
        PrismaticJoint.prototype.setLimits = function (lower, upper) {
            if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_lowerTranslation = lower;
                this.m_upperTranslation = upper;
                this.m_impulse.z = 0.0;
            }
        };
        /**
         * Is the joint motor enabled?
         */
        PrismaticJoint.prototype.isMotorEnabled = function () {
            return this.m_enableMotor;
        };
        /**
         * Enable/disable the joint motor.
         */
        PrismaticJoint.prototype.enableMotor = function (flag) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableMotor = flag;
        };
        /**
         * Set the motor speed, usually in meters per second.
         */
        PrismaticJoint.prototype.setMotorSpeed = function (speed) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_motorSpeed = speed;
        };
        /**
         * Set the maximum motor force, usually in N.
         */
        PrismaticJoint.prototype.setMaxMotorForce = function (force) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_maxMotorForce = force;
        };
        PrismaticJoint.prototype.getMaxMotorForce = function () {
            return this.m_maxMotorForce;
        };
        /**
         * Get the motor speed, usually in meters per second.
         */
        PrismaticJoint.prototype.getMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        /**
         * Get the current motor force given the inverse time step, usually in N.
         */
        PrismaticJoint.prototype.getMotorForce = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        PrismaticJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        PrismaticJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        PrismaticJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        PrismaticJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.y;
        };
        PrismaticJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective masses.
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.zero();
            d.addCombine(1, cB, 1, rB);
            d.subCombine(1, cA, 1, rA);
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Compute motor Jacobian and effective mass.
            {
                this.m_axis = Rot.mulVec2(qA, this.m_localXAxisA);
                this.m_a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_axis);
                this.m_a2 = Vec2.crossVec2Vec2(rB, this.m_axis);
                this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2
                    * this.m_a2;
                if (this.m_motorMass > 0.0) {
                    this.m_motorMass = 1.0 / this.m_motorMass;
                }
            }
            // Prismatic constraint.
            {
                this.m_perp = Rot.mulVec2(qA, this.m_localYAxisA);
                this.m_s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_perp);
                this.m_s2 = Vec2.crossVec2Vec2(rB, this.m_perp);
                Vec2.crossVec2Vec2(rA, this.m_perp);
                var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
                var k12 = iA * this.m_s1 + iB * this.m_s2;
                var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
                var k22 = iA + iB;
                if (k22 == 0.0) {
                    // For bodies with fixed rotation.
                    k22 = 1.0;
                }
                var k23 = iA * this.m_a1 + iB * this.m_a2;
                var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
                this.m_K.ex.set(k11, k12, k13);
                this.m_K.ey.set(k12, k22, k23);
                this.m_K.ez.set(k13, k23, k33);
            }
            // Compute motor and limit terms.
            if (this.m_enableLimit) {
                var jointTranslation = Vec2.dot(this.m_axis, d); // float
                if (math$1.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * Settings.linearSlop) {
                    this.m_limitState = equalLimits;
                }
                else if (jointTranslation <= this.m_lowerTranslation) {
                    if (this.m_limitState != atLowerLimit) {
                        this.m_limitState = atLowerLimit;
                        this.m_impulse.z = 0.0;
                    }
                }
                else if (jointTranslation >= this.m_upperTranslation) {
                    if (this.m_limitState != atUpperLimit$1) {
                        this.m_limitState = atUpperLimit$1;
                        this.m_impulse.z = 0.0;
                    }
                }
                else {
                    this.m_limitState = inactiveLimit$1;
                    this.m_impulse.z = 0.0;
                }
            }
            else {
                this.m_limitState = inactiveLimit$1;
                this.m_impulse.z = 0.0;
            }
            if (this.m_enableMotor == false) {
                this.m_motorImpulse = 0.0;
            }
            if (step.warmStarting) {
                // Account for variable time step.
                this.m_impulse.mul(step.dtRatio);
                this.m_motorImpulse *= step.dtRatio;
                var P = Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse
                    + this.m_impulse.z, this.m_axis);
                var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y
                    + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
                var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y
                    + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            else {
                this.m_impulse.setZero();
                this.m_motorImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        PrismaticJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Solve linear motor constraint.
            if (this.m_enableMotor && this.m_limitState != equalLimits) {
                var Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB
                    - this.m_a1 * wA;
                var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = step.dt * this.m_maxMotorForce;
                this.m_motorImpulse = math$1.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                var P = Vec2.mulNumVec2(impulse, this.m_axis);
                var LA = impulse * this.m_a1;
                var LB = impulse * this.m_a2;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            var Cdot1 = Vec2.zero();
            Cdot1.x += Vec2.dot(this.m_perp, vB) + this.m_s2 * wB;
            Cdot1.x -= Vec2.dot(this.m_perp, vA) + this.m_s1 * wA;
            Cdot1.y = wB - wA;
            if (this.m_enableLimit && this.m_limitState != inactiveLimit$1) {
                // Solve prismatic and limit constraint in block form.
                var Cdot2 = 0;
                Cdot2 += Vec2.dot(this.m_axis, vB) + this.m_a2 * wB;
                Cdot2 -= Vec2.dot(this.m_axis, vA) + this.m_a1 * wA;
                var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
                var f1 = Vec3.clone(this.m_impulse);
                var df = this.m_K.solve33(Vec3.neg(Cdot)); // Vec3
                this.m_impulse.add(df);
                if (this.m_limitState == atLowerLimit) {
                    this.m_impulse.z = math$1.max(this.m_impulse.z, 0.0);
                }
                else if (this.m_limitState == atUpperLimit$1) {
                    this.m_impulse.z = math$1.min(this.m_impulse.z, 0.0);
                }
                // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
                // f1(1:2)
                var b = Vec2.combine(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y)); // Vec2
                var f2r = Vec2.add(this.m_K.solve22(b), Vec2.neo(f1.x, f1.y)); // Vec2
                this.m_impulse.x = f2r.x;
                this.m_impulse.y = f2r.y;
                df = Vec3.sub(this.m_impulse, f1);
                var P = Vec2.combine(df.x, this.m_perp, df.z, this.m_axis); // Vec2
                var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1; // float
                var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2; // float
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            else {
                // Limit is inactive, just solve the prismatic constraint in block form.
                var df = this.m_K.solve22(Vec2.neg(Cdot1)); // Vec2
                this.m_impulse.x += df.x;
                this.m_impulse.y += df.y;
                var P = Vec2.mulNumVec2(df.x, this.m_perp); // Vec2
                var LA = df.x * this.m_s1 + df.y; // float
                var LB = df.x * this.m_s2 + df.y; // float
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        PrismaticJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Compute fresh Jacobians
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2
            var d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA)); // Vec2
            var axis = Rot.mulVec2(qA, this.m_localXAxisA); // Vec2
            var a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), axis); // float
            var a2 = Vec2.crossVec2Vec2(rB, axis); // float
            var perp = Rot.mulVec2(qA, this.m_localYAxisA); // Vec2
            var s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), perp); // float
            var s2 = Vec2.crossVec2Vec2(rB, perp); // float
            var impulse = new Vec3();
            var C1 = Vec2.zero(); // Vec2
            C1.x = Vec2.dot(perp, d);
            C1.y = aB - aA - this.m_referenceAngle;
            var linearError = math$1.abs(C1.x); // float
            var angularError = math$1.abs(C1.y); // float
            var linearSlop = Settings.linearSlop;
            var maxLinearCorrection = Settings.maxLinearCorrection;
            var active = false; // bool
            var C2 = 0.0; // float
            if (this.m_enableLimit) {
                var translation = Vec2.dot(axis, d); // float
                if (math$1.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * linearSlop) {
                    // Prevent large angular corrections
                    C2 = math$1.clamp(translation, -maxLinearCorrection, maxLinearCorrection);
                    linearError = math$1.max(linearError, math$1.abs(translation));
                    active = true;
                }
                else if (translation <= this.m_lowerTranslation) {
                    // Prevent large linear corrections and allow some slop.
                    C2 = math$1.clamp(translation - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0.0);
                    linearError = math$1
                        .max(linearError, this.m_lowerTranslation - translation);
                    active = true;
                }
                else if (translation >= this.m_upperTranslation) {
                    // Prevent large linear corrections and allow some slop.
                    C2 = math$1.clamp(translation - this.m_upperTranslation - linearSlop, 0.0, maxLinearCorrection);
                    linearError = math$1
                        .max(linearError, translation - this.m_upperTranslation);
                    active = true;
                }
            }
            if (active) {
                var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
                var k12 = iA * s1 + iB * s2; // float
                var k13 = iA * s1 * a1 + iB * s2 * a2; // float
                var k22 = iA + iB; // float
                if (k22 == 0.0) {
                    // For fixed rotation
                    k22 = 1.0;
                }
                var k23 = iA * a1 + iB * a2; // float
                var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2; // float
                var K = new Mat33();
                K.ex.set(k11, k12, k13);
                K.ey.set(k12, k22, k23);
                K.ez.set(k13, k23, k33);
                var C = new Vec3();
                C.x = C1.x;
                C.y = C1.y;
                C.z = C2;
                impulse = K.solve33(Vec3.neg(C));
            }
            else {
                var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
                var k12 = iA * s1 + iB * s2; // float
                var k22 = iA + iB; // float
                if (k22 == 0.0) {
                    k22 = 1.0;
                }
                var K = new Mat22();
                K.ex.setNum(k11, k12);
                K.ey.setNum(k12, k22);
                var impulse1 = K.solve(Vec2.neg(C1)); // Vec2
                impulse.x = impulse1.x;
                impulse.y = impulse1.y;
                impulse.z = 0.0;
            }
            var P = Vec2.combine(impulse.x, perp, impulse.z, axis); // Vec2
            var LA = impulse.x * s1 + impulse.y + impulse.z * a1; // float
            var LB = impulse.x * s2 + impulse.y + impulse.z * a2; // float
            cA.subMul(mA, P);
            aA -= iA * LA;
            cB.addMul(mB, P);
            aB += iB * LB;
            this.m_bodyA.c_position.c = cA;
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c = cB;
            this.m_bodyB.c_position.a = aB;
            return linearError <= Settings.linearSlop
                && angularError <= Settings.angularSlop;
        };
        PrismaticJoint.TYPE = 'prismatic-joint';
        return PrismaticJoint;
    }(Joint));

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
    var DEFAULTS$6 = {
        ratio: 1.0
    };
    /**
     * A gear joint is used to connect two joints together. Either joint can be a
     * revolute or prismatic joint. You specify a gear ratio to bind the motions
     * together: coordinate1 + ratio * coordinate2 = constant
     *
     * The ratio can be negative or positive. If one joint is a revolute joint and
     * the other joint is a prismatic joint, then the ratio will have units of
     * length or units of 1/length. Warning: You have to manually destroy the gear
     * joint if joint1 or joint2 is destroyed.
     *
     * This definition requires two existing revolute or prismatic joints (any
     * combination will work).
     */
    var GearJoint = /** @class */ (function (_super) {
        __extends(GearJoint, _super);
        function GearJoint(def, bodyA, bodyB, joint1, joint2, ratio) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof GearJoint)) {
                return new GearJoint(def, bodyA, bodyB, joint1, joint2, ratio);
            }
            def = options(def, DEFAULTS$6);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = GearJoint.TYPE;
            _this.m_joint1 = joint1 ? joint1 : def.joint1;
            _this.m_joint2 = joint2 ? joint2 : def.joint2;
            _this.m_ratio = math$1.isFinite(ratio) ? ratio : def.ratio;
            _this.m_type1 = _this.m_joint1.getType();
            _this.m_type2 = _this.m_joint2.getType();
            // joint1 connects body A to body C
            // joint2 connects body B to body D
            var coordinateA;
            var coordinateB;
            // TODO_ERIN there might be some problem with the joint edges in Joint.
            _this.m_bodyC = _this.m_joint1.getBodyA();
            _this.m_bodyA = _this.m_joint1.getBodyB();
            // Get geometry of joint1
            var xfA = _this.m_bodyA.m_xf;
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
            }
            else {
                var prismatic = _this.m_joint1;
                _this.m_localAnchorC = prismatic.m_localAnchorA;
                _this.m_localAnchorA = prismatic.m_localAnchorB;
                _this.m_referenceAngleA = prismatic.m_referenceAngle;
                _this.m_localAxisC = prismatic.m_localXAxisA;
                var pC = _this.m_localAnchorC;
                var pA = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mulVec2(xfA.q, _this.m_localAnchorA), Vec2.sub(xfA.p, xfC.p)));
                coordinateA = Vec2.dot(pA, _this.m_localAxisC) - Vec2.dot(pC, _this.m_localAxisC);
            }
            _this.m_bodyD = _this.m_joint2.getBodyA();
            _this.m_bodyB = _this.m_joint2.getBodyB();
            // Get geometry of joint2
            var xfB = _this.m_bodyB.m_xf;
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
            }
            else {
                var prismatic = _this.m_joint2;
                _this.m_localAnchorD = prismatic.m_localAnchorA;
                _this.m_localAnchorB = prismatic.m_localAnchorB;
                _this.m_referenceAngleB = prismatic.m_referenceAngle;
                _this.m_localAxisD = prismatic.m_localXAxisA;
                var pD = _this.m_localAnchorD;
                var pB = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mulVec2(xfB.q, _this.m_localAnchorB), Vec2.sub(xfB.p, xfD.p)));
                coordinateB = Vec2.dot(pB, _this.m_localAxisD) - Vec2.dot(pD, _this.m_localAxisD);
            }
            _this.m_constant = coordinateA + _this.m_ratio * coordinateB;
            _this.m_impulse = 0.0;
            return _this;
            // Gear Joint:
            // C0 = (coordinate1 + ratio * coordinate2)_initial
            // C = (coordinate1 + ratio * coordinate2) - C0 = 0
            // J = [J1 ratio * J2]
            // K = J * invM * JT
            // = J1 * invM1 * J1T + ratio * ratio * J2 * invM2 * J2T
            //
            // Revolute:
            // coordinate = rotation
            // Cdot = angularVelocity
            // J = [0 0 1]
            // K = J * invM * JT = invI
            //
            // Prismatic:
            // coordinate = dot(p - pg, ug)
            // Cdot = dot(v + cross(w, r), ug)
            // J = [ug cross(r, ug)]
            // K = J * invM * JT = invMass + invI * cross(r, ug)^2
        }
        /** @internal */
        GearJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                joint1: this.m_joint1,
                joint2: this.m_joint2,
                ratio: this.m_ratio,
                // _constant: this.m_constant,
            };
        };
        /** @internal */
        GearJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            data.joint1 = restore(Joint, data.joint1, world);
            data.joint2 = restore(Joint, data.joint2, world);
            var joint = new GearJoint(data);
            // if (data._constant) joint.m_constant = data._constant;
            return joint;
        };
        /**
         * Get the first joint.
         */
        GearJoint.prototype.getJoint1 = function () {
            return this.m_joint1;
        };
        /**
         * Get the second joint.
         */
        GearJoint.prototype.getJoint2 = function () {
            return this.m_joint2;
        };
        /**
         * Set the gear ratio.
         */
        GearJoint.prototype.setRatio = function (ratio) {
            this.m_ratio = ratio;
        };
        /**
         * Get the gear ratio.
         */
        GearJoint.prototype.getRatio = function () {
            return this.m_ratio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        GearJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        GearJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        GearJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_JvAC).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        GearJoint.prototype.getReactionTorque = function (inv_dt) {
            var L = this.m_impulse * this.m_JwA; // float
            return inv_dt * L;
        };
        GearJoint.prototype.initVelocityConstraints = function (step) {
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
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
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
            this.m_mass = 0.0;
            if (this.m_type1 == RevoluteJoint.TYPE) {
                this.m_JvAC = Vec2.zero();
                this.m_JwA = 1.0;
                this.m_JwC = 1.0;
                this.m_mass += this.m_iA + this.m_iC;
            }
            else {
                var u = Rot.mulVec2(qC, this.m_localAxisC); // Vec2
                var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC); // Vec2
                var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA); // Vec2
                this.m_JvAC = u;
                this.m_JwC = Vec2.crossVec2Vec2(rC, u);
                this.m_JwA = Vec2.crossVec2Vec2(rA, u);
                this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
            }
            if (this.m_type2 == RevoluteJoint.TYPE) {
                this.m_JvBD = Vec2.zero();
                this.m_JwB = this.m_ratio;
                this.m_JwD = this.m_ratio;
                this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
            }
            else {
                var u = Rot.mulVec2(qD, this.m_localAxisD); // Vec2
                var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD); // Vec2
                var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB); // Vec2
                this.m_JvBD = Vec2.mulNumVec2(this.m_ratio, u);
                this.m_JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
                this.m_JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
                this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
            }
            // Compute effective mass.
            this.m_mass = this.m_mass > 0.0 ? 1.0 / this.m_mass : 0.0;
            if (step.warmStarting) {
                vA.addMul(this.m_mA * this.m_impulse, this.m_JvAC);
                wA += this.m_iA * this.m_impulse * this.m_JwA;
                vB.addMul(this.m_mB * this.m_impulse, this.m_JvBD);
                wB += this.m_iB * this.m_impulse * this.m_JwB;
                vC.subMul(this.m_mC * this.m_impulse, this.m_JvAC);
                wC -= this.m_iC * this.m_impulse * this.m_JwC;
                vD.subMul(this.m_mD * this.m_impulse, this.m_JvBD);
                wD -= this.m_iD * this.m_impulse * this.m_JwD;
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
            this.m_bodyC.c_velocity.v.setVec2(vC);
            this.m_bodyC.c_velocity.w = wC;
            this.m_bodyD.c_velocity.v.setVec2(vD);
            this.m_bodyD.c_velocity.w = wD;
        };
        GearJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var vC = this.m_bodyC.c_velocity.v;
            var wC = this.m_bodyC.c_velocity.w;
            var vD = this.m_bodyD.c_velocity.v;
            var wD = this.m_bodyD.c_velocity.w;
            var Cdot = Vec2.dot(this.m_JvAC, vA) - Vec2.dot(this.m_JvAC, vC)
                + Vec2.dot(this.m_JvBD, vB) - Vec2.dot(this.m_JvBD, vD); // float
            Cdot += (this.m_JwA * wA - this.m_JwC * wC)
                + (this.m_JwB * wB - this.m_JwD * wD);
            var impulse = -this.m_mass * Cdot; // float
            this.m_impulse += impulse;
            vA.addMul(this.m_mA * impulse, this.m_JvAC);
            wA += this.m_iA * impulse * this.m_JwA;
            vB.addMul(this.m_mB * impulse, this.m_JvBD);
            wB += this.m_iB * impulse * this.m_JwB;
            vC.subMul(this.m_mC * impulse, this.m_JvAC);
            wC -= this.m_iC * impulse * this.m_JwC;
            vD.subMul(this.m_mD * impulse, this.m_JvBD);
            wD -= this.m_iD * impulse * this.m_JwD;
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
            this.m_bodyC.c_velocity.v.setVec2(vC);
            this.m_bodyC.c_velocity.w = wC;
            this.m_bodyD.c_velocity.v.setVec2(vD);
            this.m_bodyD.c_velocity.w = wD;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        GearJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var cC = this.m_bodyC.c_position.c;
            var aC = this.m_bodyC.c_position.a;
            var cD = this.m_bodyD.c_position.c;
            var aD = this.m_bodyD.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var qC = Rot.neo(aC);
            var qD = Rot.neo(aD);
            var linearError = 0.0;
            var coordinateA;
            var coordinateB;
            var JvAC;
            var JvBD;
            var JwA;
            var JwB;
            var JwC;
            var JwD;
            var mass = 0.0;
            if (this.m_type1 == RevoluteJoint.TYPE) {
                JvAC = Vec2.zero();
                JwA = 1.0;
                JwC = 1.0;
                mass += this.m_iA + this.m_iC;
                coordinateA = aA - aC - this.m_referenceAngleA;
            }
            else {
                var u = Rot.mulVec2(qC, this.m_localAxisC); // Vec2
                var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC); // Vec2
                var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA); // Vec2
                JvAC = u;
                JwC = Vec2.crossVec2Vec2(rC, u);
                JwA = Vec2.crossVec2Vec2(rA, u);
                mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
                var pC = Vec2.sub(this.m_localAnchorC, this.m_lcC); // Vec2
                var pA = Rot.mulTVec2(qC, Vec2.add(rA, Vec2.sub(cA, cC))); // Vec2
                coordinateA = Vec2.dot(Vec2.sub(pA, pC), this.m_localAxisC);
            }
            if (this.m_type2 == RevoluteJoint.TYPE) {
                JvBD = Vec2.zero();
                JwB = this.m_ratio;
                JwD = this.m_ratio;
                mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
                coordinateB = aB - aD - this.m_referenceAngleB;
            }
            else {
                var u = Rot.mulVec2(qD, this.m_localAxisD);
                var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
                var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
                JvBD = Vec2.mulNumVec2(this.m_ratio, u);
                JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
                JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
                mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD
                    * JwD * JwD + this.m_iB * JwB * JwB;
                var pD = Vec2.sub(this.m_localAnchorD, this.m_lcD); // Vec2
                var pB = Rot.mulTVec2(qD, Vec2.add(rB, Vec2.sub(cB, cD))); // Vec2
                coordinateB = Vec2.dot(pB, this.m_localAxisD)
                    - Vec2.dot(pD, this.m_localAxisD);
            }
            var C = (coordinateA + this.m_ratio * coordinateB) - this.m_constant; // float
            var impulse = 0.0; // float
            if (mass > 0.0) {
                impulse = -C / mass;
            }
            cA.addMul(this.m_mA * impulse, JvAC);
            aA += this.m_iA * impulse * JwA;
            cB.addMul(this.m_mB * impulse, JvBD);
            aB += this.m_iB * impulse * JwB;
            cC.subMul(this.m_mC * impulse, JvAC);
            aC -= this.m_iC * impulse * JwC;
            cD.subMul(this.m_mD * impulse, JvBD);
            aD -= this.m_iD * impulse * JwD;
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            this.m_bodyC.c_position.c.setVec2(cC);
            this.m_bodyC.c_position.a = aC;
            this.m_bodyD.c_position.c.setVec2(cD);
            this.m_bodyD.c_position.a = aD;
            // TODO_ERIN not implemented
            return linearError < Settings.linearSlop;
        };
        GearJoint.TYPE = 'gear-joint';
        return GearJoint;
    }(Joint));

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
    var DEFAULTS$5 = {
        maxForce: 1.0,
        maxTorque: 1.0,
        correctionFactor: 0.3
    };
    /**
     * A motor joint is used to control the relative motion between two bodies. A
     * typical usage is to control the movement of a dynamic body with respect to
     * the ground.
     */
    var MotorJoint = /** @class */ (function (_super) {
        __extends(MotorJoint, _super);
        function MotorJoint(def, bodyA, bodyB) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof MotorJoint)) {
                return new MotorJoint(def, bodyA, bodyB);
            }
            def = options(def, DEFAULTS$5);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = MotorJoint.TYPE;
            _this.m_linearOffset = math$1.isFinite(def.linearOffset) ? def.linearOffset : bodyA.getLocalPoint(bodyB.getPosition());
            _this.m_angularOffset = math$1.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();
            _this.m_linearImpulse = Vec2.zero();
            _this.m_angularImpulse = 0.0;
            _this.m_maxForce = def.maxForce;
            _this.m_maxTorque = def.maxTorque;
            _this.m_correctionFactor = def.correctionFactor;
            return _this;
            // Point-to-point constraint
            // Cdot = v2 - v1
            // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Angle constraint
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        MotorJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                maxForce: this.m_maxForce,
                maxTorque: this.m_maxTorque,
                correctionFactor: this.m_correctionFactor,
                linearOffset: this.m_linearOffset,
                angularOffset: this.m_angularOffset,
            };
        };
        /** @internal */
        MotorJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new MotorJoint(data);
            return joint;
        };
        /** @internal */
        MotorJoint.prototype._setAnchors = function (def) {
        };
        /**
         * Set the maximum friction force in N.
         */
        MotorJoint.prototype.setMaxForce = function (force) {
            this.m_maxForce = force;
        };
        /**
         * Get the maximum friction force in N.
         */
        MotorJoint.prototype.getMaxForce = function () {
            return this.m_maxForce;
        };
        /**
         * Set the maximum friction torque in N*m.
         */
        MotorJoint.prototype.setMaxTorque = function (torque) {
            this.m_maxTorque = torque;
        };
        /**
         * Get the maximum friction torque in N*m.
         */
        MotorJoint.prototype.getMaxTorque = function () {
            return this.m_maxTorque;
        };
        /**
         * Set the position correction factor in the range [0,1].
         */
        MotorJoint.prototype.setCorrectionFactor = function (factor) {
            this.m_correctionFactor = factor;
        };
        /**
         * Get the position correction factor in the range [0,1].
         */
        MotorJoint.prototype.getCorrectionFactor = function () {
            return this.m_correctionFactor;
        };
        /**
         * Set/get the target linear offset, in frame A, in meters.
         */
        MotorJoint.prototype.setLinearOffset = function (linearOffset) {
            if (linearOffset.x != this.m_linearOffset.x
                || linearOffset.y != this.m_linearOffset.y) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_linearOffset = linearOffset;
            }
        };
        MotorJoint.prototype.getLinearOffset = function () {
            return this.m_linearOffset;
        };
        /**
         * Set/get the target angular offset, in radians.
         */
        MotorJoint.prototype.setAngularOffset = function (angularOffset) {
            if (angularOffset != this.m_angularOffset) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_angularOffset = angularOffset;
            }
        };
        MotorJoint.prototype.getAngularOffset = function () {
            return this.m_angularOffset;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        MotorJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getPosition();
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        MotorJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getPosition();
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        MotorJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        MotorJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_angularImpulse;
        };
        MotorJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective mass matrix.
            this.m_rA = Rot.mulVec2(qA, Vec2.neg(this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
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
            if (this.m_angularMass > 0.0) {
                this.m_angularMass = 1.0 / this.m_angularMass;
            }
            this.m_linearError = Vec2.zero();
            this.m_linearError.addCombine(1, cB, 1, this.m_rB);
            this.m_linearError.subCombine(1, cA, 1, this.m_rA);
            this.m_linearError.sub(Rot.mulVec2(qA, this.m_linearOffset));
            this.m_angularError = aB - aA - this.m_angularOffset;
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_linearImpulse.mul(step.dtRatio);
                this.m_angularImpulse *= step.dtRatio;
                var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_angularImpulse);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_angularImpulse);
            }
            else {
                this.m_linearImpulse.setZero();
                this.m_angularImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        MotorJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var h = step.dt;
            var inv_h = step.inv_dt;
            // Solve angular friction
            {
                var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
                var impulse = -this.m_angularMass * Cdot;
                var oldImpulse = this.m_angularImpulse;
                var maxImpulse = h * this.m_maxTorque;
                this.m_angularImpulse = math$1.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_angularImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve linear friction
            {
                var Cdot = Vec2.zero();
                Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);
                var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
                var oldImpulse = Vec2.clone(this.m_linearImpulse);
                this.m_linearImpulse.add(impulse);
                var maxImpulse = h * this.m_maxForce;
                this.m_linearImpulse.clamp(maxImpulse);
                impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
                vA.subMul(mA, impulse);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
                vB.addMul(mB, impulse);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        MotorJoint.prototype.solvePositionConstraints = function (step) {
            return true;
        };
        MotorJoint.TYPE = 'motor-joint';
        return MotorJoint;
    }(Joint));

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
    var DEFAULTS$4 = {
        maxForce: 0.0,
        frequencyHz: 5.0,
        dampingRatio: 0.7
    };
    /**
     * A mouse joint is used to make a point on a body track a specified world
     * point. This a soft constraint with a maximum force. This allows the
     * constraint to stretch and without applying huge forces.
     *
     * NOTE: this joint is not documented in the manual because it was developed to
     * be used in the testbed. If you want to learn how to use the mouse joint, look
     * at the testbed.
     */
    var MouseJoint = /** @class */ (function (_super) {
        __extends(MouseJoint, _super);
        function MouseJoint(def, bodyA, bodyB, target) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof MouseJoint)) {
                return new MouseJoint(def, bodyA, bodyB, target);
            }
            def = options(def, DEFAULTS$4);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = MouseJoint.TYPE;
            _this.m_targetA = target ? Vec2.clone(target) : def.target || Vec2.zero();
            _this.m_localAnchorB = Transform.mulTVec2(bodyB.getTransform(), _this.m_targetA);
            _this.m_maxForce = def.maxForce;
            _this.m_impulse = Vec2.zero();
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_beta = 0.0;
            _this.m_gamma = 0.0;
            // Solver temp
            _this.m_rB = Vec2.zero();
            _this.m_localCenterB = Vec2.zero();
            _this.m_invMassB = 0.0;
            _this.m_invIB = 0.0;
            _this.m_mass = new Mat22();
            _this.m_C = Vec2.zero();
            return _this;
            // p = attached point, m = mouse point
            // C = p - m
            // Cdot = v
            // = v + cross(w, r)
            // J = [I r_skew]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
        }
        /** @internal */
        MouseJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                target: this.m_targetA,
                maxForce: this.m_maxForce,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                _localAnchorB: this.m_localAnchorB,
            };
        };
        /** @internal */
        MouseJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            data.target = Vec2.clone(data.target);
            var joint = new MouseJoint(data);
            if (data._localAnchorB) {
                joint.m_localAnchorB = data._localAnchorB;
            }
            return joint;
        };
        /**
         * Use this to update the target point.
         */
        MouseJoint.prototype.setTarget = function (target) {
            if (this.m_bodyB.isAwake() == false) {
                this.m_bodyB.setAwake(true);
            }
            this.m_targetA = Vec2.clone(target);
        };
        MouseJoint.prototype.getTarget = function () {
            return this.m_targetA;
        };
        /**
         * Set the maximum force in Newtons.
         */
        MouseJoint.prototype.setMaxForce = function (force) {
            this.m_maxForce = force;
        };
        /**
         * Get the maximum force in Newtons.
         */
        MouseJoint.prototype.getMaxForce = function () {
            return this.m_maxForce;
        };
        /**
         * Set the frequency in Hertz.
         */
        MouseJoint.prototype.setFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        /**
         * Get the frequency in Hertz.
         */
        MouseJoint.prototype.getFrequency = function () {
            return this.m_frequencyHz;
        };
        /**
         * Set the damping ratio (dimensionless).
         */
        MouseJoint.prototype.setDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        /**
         * Get the damping ratio (dimensionless).
         */
        MouseJoint.prototype.getDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        MouseJoint.prototype.getAnchorA = function () {
            return Vec2.clone(this.m_targetA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        MouseJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        MouseJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(inv_dt, this.m_impulse);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        MouseJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * 0.0;
        };
        /**
         * Shift the origin for any points stored in world coordinates.
         */
        MouseJoint.prototype.shiftOrigin = function (newOrigin) {
            this.m_targetA.sub(newOrigin);
        };
        MouseJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIB = this.m_bodyB.m_invI;
            var position = this.m_bodyB.c_position;
            var velocity = this.m_bodyB.c_velocity;
            var cB = position.c;
            var aB = position.a;
            var vB = velocity.v;
            var wB = velocity.w;
            var qB = Rot.neo(aB);
            var mass = this.m_bodyB.getMass();
            // Frequency
            var omega = 2.0 * math$1.PI * this.m_frequencyHz;
            // Damping coefficient
            var d = 2.0 * mass * this.m_dampingRatio * omega;
            // Spring stiffness
            var k = mass * (omega * omega);
            // magic formulas
            // gamma has units of inverse mass.
            // beta has units of inverse time.
            var h = step.dt;
            this.m_gamma = h * (d + h * k);
            if (this.m_gamma != 0.0) {
                this.m_gamma = 1.0 / this.m_gamma;
            }
            this.m_beta = h * k * this.m_gamma;
            // Compute the effective mass matrix.
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // K = [(1/m1 + 1/m2) * eye(2) - skew(r1) * invI1 * skew(r1) - skew(r2) *
            // invI2 * skew(r2)]
            // = [1/m1+1/m2 0 ] + invI1 * [r1.y*r1.y -r1.x*r1.y] + invI2 * [r1.y*r1.y
            // -r1.x*r1.y]
            // [ 0 1/m1+1/m2] [-r1.x*r1.y r1.x*r1.x] [-r1.x*r1.y r1.x*r1.x]
            var K = new Mat22();
            K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y
                + this.m_gamma;
            K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x
                + this.m_gamma;
            this.m_mass = K.getInverse();
            this.m_C.setVec2(cB);
            this.m_C.addCombine(1, this.m_rB, -1, this.m_targetA);
            this.m_C.mul(this.m_beta);
            // Cheat with some damping
            wB *= 0.98;
            if (step.warmStarting) {
                this.m_impulse.mul(step.dtRatio);
                vB.addMul(this.m_invMassB, this.m_impulse);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, this.m_impulse);
            }
            else {
                this.m_impulse.setZero();
            }
            velocity.v.setVec2(vB);
            velocity.w = wB;
        };
        MouseJoint.prototype.solveVelocityConstraints = function (step) {
            var velocity = this.m_bodyB.c_velocity;
            var vB = Vec2.clone(velocity.v);
            var wB = velocity.w;
            // Cdot = v + cross(w, r)
            var Cdot = Vec2.crossNumVec2(wB, this.m_rB);
            Cdot.add(vB);
            Cdot.addCombine(1, this.m_C, this.m_gamma, this.m_impulse);
            Cdot.neg();
            var impulse = Mat22.mulVec2(this.m_mass, Cdot);
            var oldImpulse = Vec2.clone(this.m_impulse);
            this.m_impulse.add(impulse);
            var maxImpulse = step.dt * this.m_maxForce;
            this.m_impulse.clamp(maxImpulse);
            impulse = Vec2.sub(this.m_impulse, oldImpulse);
            vB.addMul(this.m_invMassB, impulse);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            velocity.v.setVec2(vB);
            velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        MouseJoint.prototype.solvePositionConstraints = function (step) {
            return true;
        };
        MouseJoint.TYPE = 'mouse-joint';
        return MouseJoint;
    }(Joint));

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
    var DEFAULTS$3 = {
        collideConnected: true
    };
    /**
     * The pulley joint is connected to two bodies and two fixed ground points. The
     * pulley supports a ratio such that: length1 + ratio * length2 <= constant
     *
     * Yes, the force transmitted is scaled by the ratio.
     *
     * Warning: the pulley joint can get a bit squirrelly by itself. They often work
     * better when combined with prismatic joints. You should also cover the the
     * anchor points with static shapes to prevent one side from going to zero
     * length.
     */
    var PulleyJoint = /** @class */ (function (_super) {
        __extends(PulleyJoint, _super);
        function PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof PulleyJoint)) {
                return new PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
            }
            def = options(def, DEFAULTS$3);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = PulleyJoint.TYPE;
            _this.m_groundAnchorA = groundA ? groundA : def.groundAnchorA || Vec2.neo(-1.0, 1.0);
            _this.m_groundAnchorB = groundB ? groundB : def.groundAnchorB || Vec2.neo(1.0, 1.0);
            _this.m_localAnchorA = anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
            _this.m_localAnchorB = anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1.0, 0.0);
            _this.m_lengthA = math$1.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
            _this.m_lengthB = math$1.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
            _this.m_ratio = math$1.isFinite(ratio) ? ratio : def.ratio;
            _this.m_constant = _this.m_lengthA + _this.m_ratio * _this.m_lengthB;
            _this.m_impulse = 0.0;
            return _this;
            // Pulley:
            // length1 = norm(p1 - s1)
            // length2 = norm(p2 - s2)
            // C0 = (length1 + ratio * length2)_initial
            // C = C0 - (length1 + ratio * length2)
            // u1 = (p1 - s1) / norm(p1 - s1)
            // u2 = (p2 - s2) / norm(p2 - s2)
            // Cdot = -dot(u1, v1 + cross(w1, r1)) - ratio * dot(u2, v2 + cross(w2, r2))
            // J = -[u1 cross(r1, u1) ratio * u2 ratio * cross(r2, u2)]
            // K = J * invM * JT
            // = invMass1 + invI1 * cross(r1, u1)^2 + ratio^2 * (invMass2 + invI2 *
            // cross(r2, u2)^2)
        }
        PulleyJoint.prototype._serialize = function () {
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
                ratio: this.m_ratio,
            };
        };
        /** @internal */
        PulleyJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new PulleyJoint(data);
            return joint;
        };
        /**
         * Get the first ground anchor.
         */
        PulleyJoint.prototype.getGroundAnchorA = function () {
            return this.m_groundAnchorA;
        };
        /**
         * Get the second ground anchor.
         */
        PulleyJoint.prototype.getGroundAnchorB = function () {
            return this.m_groundAnchorB;
        };
        /**
         * Get the current length of the segment attached to bodyA.
         */
        PulleyJoint.prototype.getLengthA = function () {
            return this.m_lengthA;
        };
        /**
         * Get the current length of the segment attached to bodyB.
         */
        PulleyJoint.prototype.getLengthB = function () {
            return this.m_lengthB;
        };
        /**
         * Get the pulley ratio.
         */
        PulleyJoint.prototype.getRatio = function () {
            return this.m_ratio;
        };
        /**
         * Get the current length of the segment attached to bodyA.
         */
        PulleyJoint.prototype.getCurrentLengthA = function () {
            var p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
            var s = this.m_groundAnchorA;
            return Vec2.distance(p, s);
        };
        /**
         * Get the current length of the segment attached to bodyB.
         */
        PulleyJoint.prototype.getCurrentLengthB = function () {
            var p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
            var s = this.m_groundAnchorB;
            return Vec2.distance(p, s);
        };
        /**
         * Shift the origin for any points stored in world coordinates.
         *
         * @param newOrigin
         */
        PulleyJoint.prototype.shiftOrigin = function (newOrigin) {
            this.m_groundAnchorA.sub(newOrigin);
            this.m_groundAnchorB.sub(newOrigin);
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        PulleyJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        PulleyJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        PulleyJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_uB).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        PulleyJoint.prototype.getReactionTorque = function (inv_dt) {
            return 0.0;
        };
        PulleyJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // Get the pulley axes.
            this.m_uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
            this.m_uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
            var lengthA = this.m_uA.length();
            var lengthB = this.m_uB.length();
            if (lengthA > 10.0 * Settings.linearSlop) {
                this.m_uA.mul(1.0 / lengthA);
            }
            else {
                this.m_uA.setZero();
            }
            if (lengthB > 10.0 * Settings.linearSlop) {
                this.m_uB.mul(1.0 / lengthB);
            }
            else {
                this.m_uB.setZero();
            }
            // Compute effective mass.
            var ruA = Vec2.crossVec2Vec2(this.m_rA, this.m_uA); // float
            var ruB = Vec2.crossVec2Vec2(this.m_rB, this.m_uB); // float
            var mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
            var mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float
            this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
            if (this.m_mass > 0.0) {
                this.m_mass = 1.0 / this.m_mass;
            }
            if (step.warmStarting) {
                // Scale impulses to support variable time steps.
                this.m_impulse *= step.dtRatio;
                // Warm starting.
                var PA = Vec2.mulNumVec2(-this.m_impulse, this.m_uA);
                var PB = Vec2.mulNumVec2(-this.m_ratio * this.m_impulse, this.m_uB);
                vA.addMul(this.m_invMassA, PA);
                wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
                vB.addMul(this.m_invMassB, PB);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        PulleyJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var vpA = Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA));
            var vpB = Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB));
            var Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio
                * Vec2.dot(this.m_uB, vpB); // float
            var impulse = -this.m_mass * Cdot; // float
            this.m_impulse += impulse;
            var PA = Vec2.mulNumVec2(-impulse, this.m_uA); // Vec2
            var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, this.m_uB); // Vec2
            vA.addMul(this.m_invMassA, PA);
            wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
            vB.addMul(this.m_invMassB, PB);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        PulleyJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // Get the pulley axes.
            var uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
            var uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
            var lengthA = uA.length();
            var lengthB = uB.length();
            if (lengthA > 10.0 * Settings.linearSlop) {
                uA.mul(1.0 / lengthA);
            }
            else {
                uA.setZero();
            }
            if (lengthB > 10.0 * Settings.linearSlop) {
                uB.mul(1.0 / lengthB);
            }
            else {
                uB.setZero();
            }
            // Compute effective mass.
            var ruA = Vec2.crossVec2Vec2(rA, uA);
            var ruB = Vec2.crossVec2Vec2(rB, uB);
            var mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
            var mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float
            var mass = mA + this.m_ratio * this.m_ratio * mB; // float
            if (mass > 0.0) {
                mass = 1.0 / mass;
            }
            var C = this.m_constant - lengthA - this.m_ratio * lengthB; // float
            var linearError = math$1.abs(C); // float
            var impulse = -mass * C; // float
            var PA = Vec2.mulNumVec2(-impulse, uA); // Vec2
            var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, uB); // Vec2
            cA.addMul(this.m_invMassA, PA);
            aA += this.m_invIA * Vec2.crossVec2Vec2(rA, PA);
            cB.addMul(this.m_invMassB, PB);
            aB += this.m_invIB * Vec2.crossVec2Vec2(rB, PB);
            this.m_bodyA.c_position.c = cA;
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c = cB;
            this.m_bodyB.c_position.a = aB;
            return linearError < Settings.linearSlop;
        };
        PulleyJoint.TYPE = 'pulley-joint';
        return PulleyJoint;
    }(Joint));

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
    var inactiveLimit = 0;
    var atUpperLimit = 2;
    var DEFAULTS$2 = {
        maxLength: 0.0,
    };
    /**
     * A rope joint enforces a maximum distance between two points on two bodies. It
     * has no other effect.
     *
     * Warning: if you attempt to change the maximum length during the simulation
     * you will get some non-physical behavior.
     *
     * A model that would allow you to dynamically modify the length would have some
     * sponginess, so I chose not to implement it that way. See {@link DistanceJoint} if you
     * want to dynamically control length.
     */
    var RopeJoint = /** @class */ (function (_super) {
        __extends(RopeJoint, _super);
        function RopeJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof RopeJoint)) {
                return new RopeJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$2);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = RopeJoint.TYPE;
            _this.m_localAnchorA = anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
            _this.m_localAnchorB = anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1.0, 0.0);
            _this.m_maxLength = def.maxLength;
            _this.m_mass = 0.0;
            _this.m_impulse = 0.0;
            _this.m_length = 0.0;
            _this.m_state = inactiveLimit;
            return _this;
            // Limit:
            // C = norm(pB - pA) - L
            // u = (pB - pA) / norm(pB - pA)
            // Cdot = dot(u, vB + cross(wB, rB) - vA - cross(wA, rA))
            // J = [-u -cross(rA, u) u cross(rB, u)]
            // K = J * invM * JT
            // = invMassA + invIA * cross(rA, u)^2 + invMassB + invIB * cross(rB, u)^2
        }
        /** @internal */
        RopeJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                maxLength: this.m_maxLength,
            };
        };
        /** @internal */
        RopeJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new RopeJoint(data);
            return joint;
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        RopeJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        RopeJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Set the maximum length of the rope.
         */
        RopeJoint.prototype.setMaxLength = function (length) {
            this.m_maxLength = length;
        };
        /**
         * Get the maximum length of the rope.
         */
        RopeJoint.prototype.getMaxLength = function () {
            return this.m_maxLength;
        };
        RopeJoint.prototype.getLimitState = function () {
            // TODO LimitState
            return this.m_state;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        RopeJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        RopeJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        RopeJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        RopeJoint.prototype.getReactionTorque = function (inv_dt) {
            return 0.0;
        };
        RopeJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
            this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
            this.m_u = Vec2.zero();
            this.m_u.addCombine(1, cB, 1, this.m_rB);
            this.m_u.subCombine(1, cA, 1, this.m_rA); // Vec2
            this.m_length = this.m_u.length();
            var C = this.m_length - this.m_maxLength; // float
            if (C > 0.0) {
                this.m_state = atUpperLimit;
            }
            else {
                this.m_state = inactiveLimit;
            }
            if (this.m_length > Settings.linearSlop) {
                this.m_u.mul(1.0 / this.m_length);
            }
            else {
                this.m_u.setZero();
                this.m_mass = 0.0;
                this.m_impulse = 0.0;
                return;
            }
            // Compute effective mass.
            var crA = Vec2.crossVec2Vec2(this.m_rA, this.m_u); // float
            var crB = Vec2.crossVec2Vec2(this.m_rB, this.m_u); // float
            var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB
                + this.m_invIB * crB * crB; // float
            this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
            if (step.warmStarting) {
                // Scale the impulse to support a variable time step.
                this.m_impulse *= step.dtRatio;
                var P = Vec2.mulNumVec2(this.m_impulse, this.m_u);
                vA.subMul(this.m_invMassA, P);
                wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
                vB.addMul(this.m_invMassB, P);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        RopeJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            // Cdot = dot(u, v + cross(w, r))
            var vpA = Vec2.addCrossNumVec2(vA, wA, this.m_rA); // Vec2
            var vpB = Vec2.addCrossNumVec2(vB, wB, this.m_rB); // Vec2
            var C = this.m_length - this.m_maxLength; // float
            var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA)); // float
            // Predictive constraint.
            if (C < 0.0) {
                Cdot += step.inv_dt * C;
            }
            var impulse = -this.m_mass * Cdot; // float
            var oldImpulse = this.m_impulse; // float
            this.m_impulse = math$1.min(0.0, this.m_impulse + impulse);
            impulse = this.m_impulse - oldImpulse;
            var P = Vec2.mulNumVec2(impulse, this.m_u); // Vec2
            vA.subMul(this.m_invMassA, P);
            wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
            vB.addMul(this.m_invMassB, P);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        RopeJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c; // Vec2
            var aA = this.m_bodyA.c_position.a; // float
            var cB = this.m_bodyB.c_position.c; // Vec2
            var aB = this.m_bodyB.c_position.a; // float
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
            var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
            var u = Vec2.zero();
            u.addCombine(1, cB, 1, rB);
            u.subCombine(1, cA, 1, rA); // Vec2
            var length = u.normalize(); // float
            var C = length - this.m_maxLength; // float
            C = math$1.clamp(C, 0.0, Settings.maxLinearCorrection);
            var impulse = -this.m_mass * C; // float
            var P = Vec2.mulNumVec2(impulse, u); // Vec2
            cA.subMul(this.m_invMassA, P);
            aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
            cB.addMul(this.m_invMassB, P);
            aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return length - this.m_maxLength < Settings.linearSlop;
        };
        RopeJoint.TYPE = 'rope-joint';
        return RopeJoint;
    }(Joint));

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
    var DEFAULTS$1 = {
        frequencyHz: 0.0,
        dampingRatio: 0.0,
    };
    /**
     * A weld joint essentially glues two bodies together. A weld joint may distort
     * somewhat because the island constraint solver is approximate.
     */
    var WeldJoint = /** @class */ (function (_super) {
        __extends(WeldJoint, _super);
        function WeldJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof WeldJoint)) {
                return new WeldJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$1);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = WeldJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            _this.m_referenceAngle = math$1.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_impulse = new Vec3();
            _this.m_bias = 0.0;
            _this.m_gamma = 0.0;
            // Solver temp
            _this.m_rA; // Vec2
            _this.m_rB; // Vec2
            _this.m_localCenterA; // Vec2
            _this.m_localCenterB; // Vec2
            _this.m_invMassA; // float
            _this.m_invMassB; // float
            _this.m_invIA; // float
            _this.m_invIB; // float
            _this.m_mass = new Mat33();
            return _this;
            // Point-to-point constraint
            // C = p2 - p1
            // Cdot = v2 - v1
            // / = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Angle constraint
            // C = angle2 - angle1 - referenceAngle
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        WeldJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                referenceAngle: this.m_referenceAngle,
            };
        };
        /** @internal */
        WeldJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new WeldJoint(data);
            return joint;
        };
        /** @internal */
        WeldJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        WeldJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        WeldJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Get the reference angle.
         */
        WeldJoint.prototype.getReferenceAngle = function () {
            return this.m_referenceAngle;
        };
        /**
         * Set frequency in Hz.
         */
        WeldJoint.prototype.setFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        /**
         * Get frequency in Hz.
         */
        WeldJoint.prototype.getFrequency = function () {
            return this.m_frequencyHz;
        };
        /**
         * Set damping ratio.
         */
        WeldJoint.prototype.setDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        /**
         * Get damping ratio.
         */
        WeldJoint.prototype.getDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        WeldJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        WeldJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        WeldJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        WeldJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.z;
        };
        WeldJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var K = new Mat33();
            K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y
                * iB;
            K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
            K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
            K.ex.y = K.ey.x;
            K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x
                * iB;
            K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
            K.ex.z = K.ez.x;
            K.ey.z = K.ez.y;
            K.ez.z = iA + iB;
            if (this.m_frequencyHz > 0.0) {
                K.getInverse22(this.m_mass);
                var invM = iA + iB; // float
                var m = invM > 0.0 ? 1.0 / invM : 0.0; // float
                var C = aB - aA - this.m_referenceAngle; // float
                // Frequency
                var omega = 2.0 * math$1.PI * this.m_frequencyHz; // float
                // Damping coefficient
                var d = 2.0 * m * this.m_dampingRatio * omega; // float
                // Spring stiffness
                var k = m * omega * omega; // float
                // magic formulas
                var h = step.dt; // float
                this.m_gamma = h * (d + h * k);
                this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
                this.m_bias = C * h * k * this.m_gamma;
                invM += this.m_gamma;
                this.m_mass.ez.z = invM != 0.0 ? 1.0 / invM : 0.0;
            }
            else if (K.ez.z == 0.0) {
                K.getInverse22(this.m_mass);
                this.m_gamma = 0.0;
                this.m_bias = 0.0;
            }
            else {
                K.getSymInverse33(this.m_mass);
                this.m_gamma = 0.0;
                this.m_bias = 0.0;
            }
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_impulse.mul(step.dtRatio);
                var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_impulse.z);
            }
            else {
                this.m_impulse.setZero();
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        WeldJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB; // float
            var iA = this.m_invIA;
            var iB = this.m_invIB; // float
            if (this.m_frequencyHz > 0.0) {
                var Cdot2 = wB - wA; // float
                var impulse2 = -this.m_mass.ez.z
                    * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z); // float
                this.m_impulse.z += impulse2;
                wA -= iA * impulse2;
                wB += iB * impulse2;
                var Cdot1 = Vec2.zero();
                Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA)); // Vec2
                var impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1)); // Vec2
                this.m_impulse.x += impulse1.x;
                this.m_impulse.y += impulse1.y;
                var P = Vec2.clone(impulse1); // Vec2
                vA.subMul(mA, P);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, P);
                vB.addMul(mB, P);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, P);
            }
            else {
                var Cdot1 = Vec2.zero();
                Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA)); // Vec2
                var Cdot2 = wB - wA; // float
                var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2); // Vec3
                var impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot)); // Vec3
                this.m_impulse.add(impulse);
                var P = Vec2.neo(impulse.x, impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        WeldJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var positionError;
            var angularError;
            var K = new Mat33();
            K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
            K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
            K.ez.x = -rA.y * iA - rB.y * iB;
            K.ex.y = K.ey.x;
            K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
            K.ez.y = rA.x * iA + rB.x * iB;
            K.ex.z = K.ez.x;
            K.ey.z = K.ez.y;
            K.ez.z = iA + iB;
            if (this.m_frequencyHz > 0.0) {
                var C1 = Vec2.zero();
                C1.addCombine(1, cB, 1, rB);
                C1.subCombine(1, cA, 1, rA); // Vec2
                positionError = C1.length();
                angularError = 0.0;
                var P = Vec2.neg(K.solve22(C1)); // Vec2
                cA.subMul(mA, P);
                aA -= iA * Vec2.crossVec2Vec2(rA, P);
                cB.addMul(mB, P);
                aB += iB * Vec2.crossVec2Vec2(rB, P);
            }
            else {
                var C1 = Vec2.zero();
                C1.addCombine(1, cB, 1, rB);
                C1.subCombine(1, cA, 1, rA);
                var C2 = aB - aA - this.m_referenceAngle; // float
                positionError = C1.length();
                angularError = math$1.abs(C2);
                var C = new Vec3(C1.x, C1.y, C2);
                var impulse = new Vec3();
                if (K.ez.z > 0.0) {
                    impulse = Vec3.neg(K.solve33(C));
                }
                else {
                    var impulse2 = Vec2.neg(K.solve22(C1));
                    impulse.set(impulse2.x, impulse2.y, 0.0);
                }
                var P = Vec2.neo(impulse.x, impulse.y);
                cA.subMul(mA, P);
                aA -= iA * (Vec2.crossVec2Vec2(rA, P) + impulse.z);
                cB.addMul(mB, P);
                aB += iB * (Vec2.crossVec2Vec2(rB, P) + impulse.z);
            }
            this.m_bodyA.c_position.c = cA;
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c = cB;
            this.m_bodyB.c_position.a = aB;
            return positionError <= Settings.linearSlop && angularError <= Settings.angularSlop;
        };
        WeldJoint.TYPE = 'weld-joint';
        return WeldJoint;
    }(Joint));

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
    var DEFAULTS = {
        enableMotor: false,
        maxMotorTorque: 0.0,
        motorSpeed: 0.0,
        frequencyHz: 2.0,
        dampingRatio: 0.7,
    };
    /**
     * A wheel joint. This joint provides two degrees of freedom: translation along
     * an axis fixed in bodyA and rotation in the plane. In other words, it is a
     * point to line constraint with a rotational motor and a linear spring/damper.
     * This joint is designed for vehicle suspensions.
     */
    var WheelJoint = /** @class */ (function (_super) {
        __extends(WheelJoint, _super);
        // @ts-ignore
        function WheelJoint(def, bodyA, bodyB, anchor, axis) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof WheelJoint)) {
                return new WheelJoint(def, bodyA, bodyB, anchor, axis);
            }
            def = options(def, DEFAULTS);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            /** @internal */ _this.m_ax = Vec2.zero();
            /** @internal */ _this.m_ay = Vec2.zero();
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = WheelJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            // @ts-ignore localAxis
            _this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || def.localAxis || Vec2.neo(1.0, 0.0));
            _this.m_localYAxisA = Vec2.crossNumVec2(1.0, _this.m_localXAxisA);
            _this.m_mass = 0.0;
            _this.m_impulse = 0.0;
            _this.m_motorMass = 0.0;
            _this.m_motorImpulse = 0.0;
            _this.m_springMass = 0.0;
            _this.m_springImpulse = 0.0;
            _this.m_maxMotorTorque = def.maxMotorTorque;
            _this.m_motorSpeed = def.motorSpeed;
            _this.m_enableMotor = def.enableMotor;
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_bias = 0.0;
            _this.m_gamma = 0.0;
            return _this;
            // Linear constraint (point-to-line)
            // d = pB - pA = xB + rB - xA - rA
            // C = dot(ay, d)
            // Cdot = dot(d, cross(wA, ay)) + dot(ay, vB + cross(wB, rB) - vA - cross(wA,
            // rA))
            // = -dot(ay, vA) - dot(cross(d + rA, ay), wA) + dot(ay, vB) + dot(cross(rB,
            // ay), vB)
            // J = [-ay, -cross(d + rA, ay), ay, cross(rB, ay)]
            // Spring linear constraint
            // C = dot(ax, d)
            // Cdot = = -dot(ax, vA) - dot(cross(d + rA, ax), wA) + dot(ax, vB) +
            // dot(cross(rB, ax), vB)
            // J = [-ax -cross(d+rA, ax) ax cross(rB, ax)]
            // Motor rotational constraint
            // Cdot = wB - wA
            // J = [0 0 -1 0 0 1]
        }
        /** @internal */
        WheelJoint.prototype._serialize = function () {
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
                localAxisA: this.m_localXAxisA,
            };
        };
        /** @internal */
        WheelJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new WheelJoint(data);
            return joint;
        };
        /** @internal */
        WheelJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
            if (def.localAxisA) {
                this.m_localXAxisA.setVec2(def.localAxisA);
                this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1.0, def.localAxisA));
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        WheelJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        WheelJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * The local joint axis relative to bodyA.
         */
        WheelJoint.prototype.getLocalAxisA = function () {
            return this.m_localXAxisA;
        };
        /**
         * Get the current joint translation, usually in meters.
         */
        WheelJoint.prototype.getJointTranslation = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            var pA = bA.getWorldPoint(this.m_localAnchorA); // Vec2
            var pB = bB.getWorldPoint(this.m_localAnchorB); // Vec2
            var d = Vec2.sub(pB, pA); // Vec2
            var axis = bA.getWorldVector(this.m_localXAxisA); // Vec2
            var translation = Vec2.dot(d, axis); // float
            return translation;
        };
        /**
         * Get the current joint translation speed, usually in meters per second.
         */
        WheelJoint.prototype.getJointSpeed = function () {
            var wA = this.m_bodyA.m_angularVelocity;
            var wB = this.m_bodyB.m_angularVelocity;
            return wB - wA;
        };
        /**
         * Is the joint motor enabled?
         */
        WheelJoint.prototype.isMotorEnabled = function () {
            return this.m_enableMotor;
        };
        /**
         * Enable/disable the joint motor.
         */
        WheelJoint.prototype.enableMotor = function (flag) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableMotor = flag;
        };
        /**
         * Set the motor speed, usually in radians per second.
         */
        WheelJoint.prototype.setMotorSpeed = function (speed) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_motorSpeed = speed;
        };
        /**
         * Get the motor speed, usually in radians per second.
         */
        WheelJoint.prototype.getMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        /**
         * Set/Get the maximum motor force, usually in N-m.
         */
        WheelJoint.prototype.setMaxMotorTorque = function (torque) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_maxMotorTorque = torque;
        };
        WheelJoint.prototype.getMaxMotorTorque = function () {
            return this.m_maxMotorTorque;
        };
        /**
         * Get the current motor torque given the inverse time step, usually in N-m.
         */
        WheelJoint.prototype.getMotorTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        /**
         * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
         * the spring.
         */
        WheelJoint.prototype.setSpringFrequencyHz = function (hz) {
            this.m_frequencyHz = hz;
        };
        WheelJoint.prototype.getSpringFrequencyHz = function () {
            return this.m_frequencyHz;
        };
        /**
         * Set/Get the spring damping ratio
         */
        WheelJoint.prototype.setSpringDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        WheelJoint.prototype.getSpringDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        WheelJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        WheelJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        WheelJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        WheelJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        WheelJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB; // float
            var iA = this.m_invIA;
            var iB = this.m_invIB; // float
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective masses.
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.zero();
            d.addCombine(1, cB, 1, rB);
            d.subCombine(1, cA, 1, rA); // Vec2
            // Point to line constraint
            {
                this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
                this.m_sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ay);
                this.m_sBy = Vec2.crossVec2Vec2(rB, this.m_ay);
                this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy
                    * this.m_sBy;
                if (this.m_mass > 0.0) {
                    this.m_mass = 1.0 / this.m_mass;
                }
            }
            // Spring constraint
            this.m_springMass = 0.0;
            this.m_bias = 0.0;
            this.m_gamma = 0.0;
            if (this.m_frequencyHz > 0.0) {
                this.m_ax = Rot.mulVec2(qA, this.m_localXAxisA);
                this.m_sAx = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ax);
                this.m_sBx = Vec2.crossVec2Vec2(rB, this.m_ax);
                var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx
                    * this.m_sBx; // float
                if (invMass > 0.0) {
                    this.m_springMass = 1.0 / invMass;
                    var C = Vec2.dot(d, this.m_ax); // float
                    // Frequency
                    var omega = 2.0 * math$1.PI * this.m_frequencyHz; // float
                    // Damping coefficient
                    var damp = 2.0 * this.m_springMass * this.m_dampingRatio * omega; // float
                    // Spring stiffness
                    var k = this.m_springMass * omega * omega; // float
                    // magic formulas
                    var h = step.dt; // float
                    this.m_gamma = h * (damp + h * k);
                    if (this.m_gamma > 0.0) {
                        this.m_gamma = 1.0 / this.m_gamma;
                    }
                    this.m_bias = C * h * k * this.m_gamma;
                    this.m_springMass = invMass + this.m_gamma;
                    if (this.m_springMass > 0.0) {
                        this.m_springMass = 1.0 / this.m_springMass;
                    }
                }
            }
            else {
                this.m_springImpulse = 0.0;
            }
            // Rotational motor
            if (this.m_enableMotor) {
                this.m_motorMass = iA + iB;
                if (this.m_motorMass > 0.0) {
                    this.m_motorMass = 1.0 / this.m_motorMass;
                }
            }
            else {
                this.m_motorMass = 0.0;
                this.m_motorImpulse = 0.0;
            }
            if (step.warmStarting) {
                // Account for variable time step.
                this.m_impulse *= step.dtRatio;
                this.m_springImpulse *= step.dtRatio;
                this.m_motorImpulse *= step.dtRatio;
                var P = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
                var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
                var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
                vA.subMul(this.m_invMassA, P);
                wA -= this.m_invIA * LA;
                vB.addMul(this.m_invMassB, P);
                wB += this.m_invIB * LB;
            }
            else {
                this.m_impulse = 0.0;
                this.m_springImpulse = 0.0;
                this.m_motorImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        WheelJoint.prototype.solveVelocityConstraints = function (step) {
            var mA = this.m_invMassA;
            var mB = this.m_invMassB; // float
            var iA = this.m_invIA;
            var iB = this.m_invIB; // float
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            // Solve spring constraint
            {
                var Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx
                    * wB - this.m_sAx * wA; // float
                var impulse = -this.m_springMass
                    * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse); // float
                this.m_springImpulse += impulse;
                var P = Vec2.mulNumVec2(impulse, this.m_ax); // Vec2
                var LA = impulse * this.m_sAx; // float
                var LB = impulse * this.m_sBx; // float
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            // Solve rotational motor constraint
            {
                var Cdot = wB - wA - this.m_motorSpeed; // float
                var impulse = -this.m_motorMass * Cdot; // float
                var oldImpulse = this.m_motorImpulse; // float
                var maxImpulse = step.dt * this.m_maxMotorTorque; // float
                this.m_motorImpulse = math$1.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve point to line constraint
            {
                var Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy
                    * wB - this.m_sAy * wA; // float
                var impulse = -this.m_mass * Cdot; // float
                this.m_impulse += impulse;
                var P = Vec2.mulNumVec2(impulse, this.m_ay); // Vec2
                var LA = impulse * this.m_sAy; // float
                var LB = impulse * this.m_sBy; // float
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        WheelJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.zero();
            d.addCombine(1, cB, 1, rB);
            d.subCombine(1, cA, 1, rA);
            var ay = Rot.mulVec2(qA, this.m_localYAxisA);
            var sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), ay); // float
            var sBy = Vec2.crossVec2Vec2(rB, ay); // float
            var C = Vec2.dot(d, ay); // float
            var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy
                * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy; // float
            var impulse; // float
            if (k != 0.0) {
                impulse = -C / k;
            }
            else {
                impulse = 0.0;
            }
            var P = Vec2.mulNumVec2(impulse, ay); // Vec2
            var LA = impulse * sAy; // float
            var LB = impulse * sBy; // float
            cA.subMul(this.m_invMassA, P);
            aA -= this.m_invIA * LA;
            cB.addMul(this.m_invMassB, P);
            aB += this.m_invIB * LB;
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return math$1.abs(C) <= Settings.linearSlop;
        };
        WheelJoint.TYPE = 'wheel-joint';
        return WheelJoint;
    }(Joint));

    var SID = 0;
    function Serializer(opts) {
        var _a;
        opts = opts || {};
        var rootClass = opts.rootClass || World;
        var preSerialize = opts.preSerialize || function (obj) { return obj; };
        var postSerialize = opts.postSerialize || function (data, obj) { return data; };
        var preDeserialize = opts.preDeserialize || function (data) { return data; };
        var postDeserialize = opts.postDeserialize || function (obj, data) { return obj; };
        // This is used to create ref objects during serialize
        var refTypes = {
            World: World,
            Body: Body,
            Joint: Joint,
            Fixture: Fixture,
            Shape: Shape,
        };
        // This is used by restore to deserialize objects and refs
        var restoreTypes = __assign({ Vec2: Vec2,
            Vec3: Vec3 }, refTypes);
        var CLASS_BY_TYPE_PROP = (_a = {},
            _a[Body.STATIC] = Body,
            _a[Body.DYNAMIC] = Body,
            _a[Body.KINEMATIC] = Body,
            _a[ChainShape.TYPE] = ChainShape,
            _a[BoxShape.TYPE] = BoxShape,
            _a[EdgeShape.TYPE] = EdgeShape,
            _a[PolygonShape.TYPE] = PolygonShape,
            _a[CircleShape.TYPE] = CircleShape,
            _a[DistanceJoint.TYPE] = DistanceJoint,
            _a[FrictionJoint.TYPE] = FrictionJoint,
            _a[GearJoint.TYPE] = GearJoint,
            _a[MotorJoint.TYPE] = MotorJoint,
            _a[MouseJoint.TYPE] = MouseJoint,
            _a[PrismaticJoint.TYPE] = PrismaticJoint,
            _a[PulleyJoint.TYPE] = PulleyJoint,
            _a[RevoluteJoint.TYPE] = RevoluteJoint,
            _a[RopeJoint.TYPE] = RopeJoint,
            _a[WeldJoint.TYPE] = WeldJoint,
            _a[WheelJoint.TYPE] = WheelJoint,
            _a);
        this.toJson = function (root) {
            var json = [];
            var queue = [root];
            var refMap = {};
            function storeRef(value, typeName) {
                value.__sid = value.__sid || ++SID;
                if (!refMap[value.__sid]) {
                    queue.push(value);
                    var index = json.length + queue.length;
                    var ref = {
                        refIndex: index,
                        refType: typeName
                    };
                    refMap[value.__sid] = ref;
                }
                return refMap[value.__sid];
            }
            function serialize(obj) {
                obj = preSerialize(obj);
                var data = obj._serialize();
                data = postSerialize(data, obj);
                return data;
            }
            function toJson(value, top) {
                if (typeof value !== 'object' || value === null) {
                    return value;
                }
                if (typeof value._serialize === 'function') {
                    if (value !== top) {
                        // tslint:disable-next-line:no-for-in
                        for (var typeName in refTypes) {
                            if (value instanceof refTypes[typeName]) {
                                return storeRef(value, typeName);
                            }
                        }
                    }
                    value = serialize(value);
                }
                if (Array.isArray(value)) {
                    var newValue = [];
                    for (var key = 0; key < value.length; key++) {
                        newValue[key] = toJson(value[key]);
                    }
                    value = newValue;
                }
                else {
                    var newValue = {};
                    // tslint:disable-next-line:no-for-in
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            newValue[key] = toJson(value[key]);
                        }
                    }
                    value = newValue;
                }
                return value;
            }
            while (queue.length) {
                var obj = queue.shift();
                var str = toJson(obj, obj);
                json.push(str);
            }
            return json;
        };
        this.fromJson = function (json) {
            var refMap = {};
            function findDeserilizer(data, cls) {
                if (!cls || !cls._deserialize) {
                    cls = CLASS_BY_TYPE_PROP[data.type];
                }
                return cls && cls._deserialize;
            }
            /**
             * Deserialize a data object.
             */
            function deserialize(cls, data, ctx) {
                var deserializer = findDeserilizer(data, cls);
                if (!deserializer) {
                    return;
                }
                data = preDeserialize(data);
                var obj = deserializer(data, ctx, restoreRef);
                obj = postDeserialize(obj, data);
                return obj;
            }
            /**
             * Restore a ref object or deserialize a data object.
             *
             * This is passed as callback to class deserializers.
             */
            function restoreRef(cls, ref, ctx) {
                if (!ref.refIndex) {
                    return cls && cls._deserialize && deserialize(cls, ref, ctx);
                }
                cls = restoreTypes[ref.refType] || cls;
                var index = ref.refIndex;
                if (!refMap[index]) {
                    var data = json[index];
                    var obj = deserialize(cls, data, ctx);
                    refMap[index] = obj;
                }
                return refMap[index];
            }
            var root = rootClass._deserialize(json[0], null, restoreRef);
            return root;
        };
    }
    var serializer = new Serializer();
    Serializer.toJson = serializer.toJson;
    Serializer.fromJson = serializer.fromJson;

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
    Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);
    function CircleCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        CollideCircles(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
    }
    function CollideCircles(manifold, circleA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        var pA = Transform.mulVec2(xfA, circleA.m_p);
        var pB = Transform.mulVec2(xfB, circleB.m_p);
        var distSqr = Vec2.distanceSquared(pB, pA);
        var rA = circleA.m_radius;
        var rB = circleB.m_radius;
        var radius = rA + rB;
        if (distSqr > radius * radius) {
            return;
        }
        manifold.type = ManifoldType.e_circles;
        manifold.localPoint.setVec2(circleA.m_p);
        manifold.localNormal.setZero();
        manifold.pointCount = 1;
        manifold.points[0].localPoint.setVec2(circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.cf.indexA = 0;
        manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
        manifold.points[0].id.cf.indexB = 0;
        manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
    }

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
    Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
    Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);
    function EdgeCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        var shapeA = fixtureA.getShape();
        var shapeB = fixtureB.getShape();
        CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
    }
    function ChainCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        var chain = fixtureA.getShape();
        var edge = new EdgeShape();
        chain.getChildEdge(edge, indexA);
        var shapeA = edge;
        var shapeB = fixtureB.getShape();
        CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
    }
    // Compute contact points for edge versus circle.
    // This accounts for edge connectivity.
    function CollideEdgeCircle(manifold, edgeA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        // Compute circle in frame of edge
        var Q = Transform.mulTVec2(xfA, Transform.mulVec2(xfB, circleB.m_p));
        var A = edgeA.m_vertex1;
        var B = edgeA.m_vertex2;
        var e = Vec2.sub(B, A);
        // Barycentric coordinates
        var u = Vec2.dot(e, Vec2.sub(B, Q));
        var v = Vec2.dot(e, Vec2.sub(Q, A));
        var radius = edgeA.m_radius + circleB.m_radius;
        // Region A
        if (v <= 0.0) {
            var P_1 = Vec2.clone(A);
            var d_1 = Vec2.sub(Q, P_1);
            var dd_1 = Vec2.dot(d_1, d_1);
            if (dd_1 > radius * radius) {
                return;
            }
            // Is there an edge connected to A?
            if (edgeA.m_hasVertex0) {
                var A1 = edgeA.m_vertex0;
                var B1 = A;
                var e1 = Vec2.sub(B1, A1);
                var u1 = Vec2.dot(e1, Vec2.sub(B1, Q));
                // Is the circle in Region AB of the previous edge?
                if (u1 > 0.0) {
                    return;
                }
            }
            manifold.type = ManifoldType.e_circles;
            manifold.localNormal.setZero();
            manifold.localPoint.setVec2(P_1);
            manifold.pointCount = 1;
            manifold.points[0].localPoint.setVec2(circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.cf.indexA = 0;
            manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
            manifold.points[0].id.cf.indexB = 0;
            manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
            return;
        }
        // Region B
        if (u <= 0.0) {
            var P_2 = Vec2.clone(B);
            var d_2 = Vec2.sub(Q, P_2);
            var dd_2 = Vec2.dot(d_2, d_2);
            if (dd_2 > radius * radius) {
                return;
            }
            // Is there an edge connected to B?
            if (edgeA.m_hasVertex3) {
                var B2 = edgeA.m_vertex3;
                var A2 = B;
                var e2 = Vec2.sub(B2, A2);
                var v2 = Vec2.dot(e2, Vec2.sub(Q, A2));
                // Is the circle in Region AB of the next edge?
                if (v2 > 0.0) {
                    return;
                }
            }
            manifold.type = ManifoldType.e_circles;
            manifold.localNormal.setZero();
            manifold.localPoint.setVec2(P_2);
            manifold.pointCount = 1;
            manifold.points[0].localPoint.setVec2(circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.cf.indexA = 1;
            manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
            manifold.points[0].id.cf.indexB = 0;
            manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
            return;
        }
        // Region AB
        var den = Vec2.dot(e, e);
        var P = Vec2.combine(u / den, A, v / den, B);
        var d = Vec2.sub(Q, P);
        var dd = Vec2.dot(d, d);
        if (dd > radius * radius) {
            return;
        }
        var n = Vec2.neo(-e.y, e.x);
        if (Vec2.dot(n, Vec2.sub(Q, A)) < 0.0) {
            n.setNum(-n.x, -n.y);
        }
        n.normalize();
        manifold.type = ManifoldType.e_faceA;
        manifold.localNormal = n;
        manifold.localPoint.setVec2(A);
        manifold.pointCount = 1;
        manifold.points[0].localPoint.setVec2(circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.cf.indexA = 0;
        manifold.points[0].id.cf.typeA = ContactFeatureType.e_face;
        manifold.points[0].id.cf.indexB = 0;
        manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
    }

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
    Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);
    function PolygonContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        CollidePolygons(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
    }
    /**
     * Find the max separation between poly1 and poly2 using edge normals from
     * poly1.
     */
    function findMaxSeparation(poly1, xf1, poly2, xf2, output) {
        var count1 = poly1.m_count;
        var count2 = poly2.m_count;
        var n1s = poly1.m_normals;
        var v1s = poly1.m_vertices;
        var v2s = poly2.m_vertices;
        var xf = Transform.mulTXf(xf2, xf1);
        var bestIndex = 0;
        var maxSeparation = -Infinity;
        for (var i = 0; i < count1; ++i) {
            // Get poly1 normal in frame2.
            var n = Rot.mulVec2(xf.q, n1s[i]);
            var v1 = Transform.mulVec2(xf, v1s[i]);
            // Find deepest point for normal i.
            var si = Infinity;
            for (var j = 0; j < count2; ++j) {
                var sij = Vec2.dot(n, v2s[j]) - Vec2.dot(n, v1);
                if (sij < si) {
                    si = sij;
                }
            }
            if (si > maxSeparation) {
                maxSeparation = si;
                bestIndex = i;
            }
        }
        // used to keep last FindMaxSeparation call values
        output.maxSeparation = maxSeparation;
        output.bestIndex = bestIndex;
    }
    function findIncidentEdge(c, poly1, xf1, edge1, poly2, xf2) {
        var normals1 = poly1.m_normals;
        var count2 = poly2.m_count;
        var vertices2 = poly2.m_vertices;
        var normals2 = poly2.m_normals;
        // Get the normal of the reference edge in poly2's frame.
        var normal1 = Rot.mulTVec2(xf2.q, Rot.mulVec2(xf1.q, normals1[edge1]));
        // Find the incident edge on poly2.
        var index = 0;
        var minDot = Infinity;
        for (var i = 0; i < count2; ++i) {
            var dot = Vec2.dot(normal1, normals2[i]);
            if (dot < minDot) {
                minDot = dot;
                index = i;
            }
        }
        // Build the clip vertices for the incident edge.
        var i1 = index;
        var i2 = i1 + 1 < count2 ? i1 + 1 : 0;
        c[0].v = Transform.mulVec2(xf2, vertices2[i1]);
        c[0].id.cf.indexA = edge1;
        c[0].id.cf.indexB = i1;
        c[0].id.cf.typeA = ContactFeatureType.e_face;
        c[0].id.cf.typeB = ContactFeatureType.e_vertex;
        c[1].v = Transform.mulVec2(xf2, vertices2[i2]);
        c[1].id.cf.indexA = edge1;
        c[1].id.cf.indexB = i2;
        c[1].id.cf.typeA = ContactFeatureType.e_face;
        c[1].id.cf.typeB = ContactFeatureType.e_vertex;
    }
    var maxSeparation = {
        maxSeparation: 0,
        bestIndex: 0,
    };
    /**
     *
     * Find edge normal of max separation on A - return if separating axis is found<br>
     * Find edge normal of max separation on B - return if separation axis is found<br>
     * Choose reference edge as min(minA, minB)<br>
     * Find incident edge<br>
     * Clip
     *
     * The normal points from 1 to 2
     */
    function CollidePolygons(manifold, polyA, xfA, polyB, xfB) {
        manifold.pointCount = 0;
        var totalRadius = polyA.m_radius + polyB.m_radius;
        findMaxSeparation(polyA, xfA, polyB, xfB, maxSeparation);
        var edgeA = maxSeparation.bestIndex;
        var separationA = maxSeparation.maxSeparation;
        if (separationA > totalRadius)
            return;
        findMaxSeparation(polyB, xfB, polyA, xfA, maxSeparation);
        var edgeB = maxSeparation.bestIndex;
        var separationB = maxSeparation.maxSeparation;
        if (separationB > totalRadius)
            return;
        var poly1; // reference polygon
        var poly2; // incident polygon
        var xf1;
        var xf2;
        var edge1; // reference edge
        var flip;
        var k_tol = 0.1 * Settings.linearSlop;
        if (separationB > separationA + k_tol) {
            poly1 = polyB;
            poly2 = polyA;
            xf1 = xfB;
            xf2 = xfA;
            edge1 = edgeB;
            manifold.type = ManifoldType.e_faceB;
            flip = 1;
        }
        else {
            poly1 = polyA;
            poly2 = polyB;
            xf1 = xfA;
            xf2 = xfB;
            edge1 = edgeA;
            manifold.type = ManifoldType.e_faceA;
            flip = 0;
        }
        var incidentEdge = [new ClipVertex(), new ClipVertex()];
        findIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
        var count1 = poly1.m_count;
        var vertices1 = poly1.m_vertices;
        var iv1 = edge1;
        var iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;
        var v11 = vertices1[iv1];
        var v12 = vertices1[iv2];
        var localTangent = Vec2.sub(v12, v11);
        localTangent.normalize();
        var localNormal = Vec2.crossVec2Num(localTangent, 1.0);
        var planePoint = Vec2.combine(0.5, v11, 0.5, v12);
        var tangent = Rot.mulVec2(xf1.q, localTangent);
        var normal = Vec2.crossVec2Num(tangent, 1.0);
        v11 = Transform.mulVec2(xf1, v11);
        v12 = Transform.mulVec2(xf1, v12);
        // Face offset.
        var frontOffset = Vec2.dot(normal, v11);
        // Side offsets, extended by polytope skin thickness.
        var sideOffset1 = -Vec2.dot(tangent, v11) + totalRadius;
        var sideOffset2 = Vec2.dot(tangent, v12) + totalRadius;
        // Clip incident edge against extruded edge1 side edges.
        var clipPoints1 = [new ClipVertex(), new ClipVertex()];
        var clipPoints2 = [new ClipVertex(), new ClipVertex()];
        var np;
        // Clip to box side 1
        np = clipSegmentToLine(clipPoints1, incidentEdge, Vec2.neg(tangent), sideOffset1, iv1);
        if (np < 2) {
            return;
        }
        // Clip to negative box side 1
        np = clipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2, iv2);
        if (np < 2) {
            return;
        }
        // Now clipPoints2 contains the clipped points.
        manifold.localNormal = localNormal;
        manifold.localPoint = planePoint;
        var pointCount = 0;
        for (var i = 0; i < clipPoints2.length /* maxManifoldPoints */; ++i) {
            var separation = Vec2.dot(normal, clipPoints2[i].v) - frontOffset;
            if (separation <= totalRadius) {
                var cp = manifold.points[pointCount];
                cp.localPoint.setVec2(Transform.mulTVec2(xf2, clipPoints2[i].v));
                cp.id = clipPoints2[i].id;
                if (flip) {
                    // Swap features
                    var cf = cp.id.cf;
                    var indexA = cf.indexA;
                    var indexB = cf.indexB;
                    var typeA = cf.typeA;
                    var typeB = cf.typeB;
                    cf.indexA = indexB;
                    cf.indexB = indexA;
                    cf.typeA = typeB;
                    cf.typeB = typeA;
                }
                ++pointCount;
            }
        }
        manifold.pointCount = pointCount;
    }

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
    Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);
    function PolygonCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        CollidePolygonCircle(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
    }
    function CollidePolygonCircle(manifold, polygonA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        // Compute circle position in the frame of the polygon.
        var c = Transform.mulVec2(xfB, circleB.m_p);
        var cLocal = Transform.mulTVec2(xfA, c);
        // Find the min separating edge.
        var normalIndex = 0;
        var separation = -Infinity;
        var radius = polygonA.m_radius + circleB.m_radius;
        var vertexCount = polygonA.m_count;
        var vertices = polygonA.m_vertices;
        var normals = polygonA.m_normals;
        for (var i = 0; i < vertexCount; ++i) {
            var s = Vec2.dot(normals[i], Vec2.sub(cLocal, vertices[i]));
            if (s > radius) {
                // Early out.
                return;
            }
            if (s > separation) {
                separation = s;
                normalIndex = i;
            }
        }
        // Vertices that subtend the incident face.
        var vertIndex1 = normalIndex;
        var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
        var v1 = vertices[vertIndex1];
        var v2 = vertices[vertIndex2];
        // If the center is inside the polygon ...
        if (separation < math$1.EPSILON) {
            manifold.pointCount = 1;
            manifold.type = ManifoldType.e_faceA;
            manifold.localNormal.setVec2(normals[normalIndex]);
            manifold.localPoint.setCombine(0.5, v1, 0.5, v2);
            manifold.points[0].localPoint = circleB.m_p;
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.cf.indexA = 0;
            manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
            manifold.points[0].id.cf.indexB = 0;
            manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
            return;
        }
        // Compute barycentric coordinates
        var u1 = Vec2.dot(Vec2.sub(cLocal, v1), Vec2.sub(v2, v1));
        var u2 = Vec2.dot(Vec2.sub(cLocal, v2), Vec2.sub(v1, v2));
        if (u1 <= 0.0) {
            if (Vec2.distanceSquared(cLocal, v1) > radius * radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = ManifoldType.e_faceA;
            manifold.localNormal.setCombine(1, cLocal, -1, v1);
            manifold.localNormal.normalize();
            manifold.localPoint = v1;
            manifold.points[0].localPoint.setVec2(circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.cf.indexA = 0;
            manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
            manifold.points[0].id.cf.indexB = 0;
            manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
        }
        else if (u2 <= 0.0) {
            if (Vec2.distanceSquared(cLocal, v2) > radius * radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = ManifoldType.e_faceA;
            manifold.localNormal.setCombine(1, cLocal, -1, v2);
            manifold.localNormal.normalize();
            manifold.localPoint.setVec2(v2);
            manifold.points[0].localPoint.setVec2(circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.cf.indexA = 0;
            manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
            manifold.points[0].id.cf.indexB = 0;
            manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
        }
        else {
            var faceCenter = Vec2.mid(v1, v2);
            var separation_1 = Vec2.dot(cLocal, normals[vertIndex1]) - Vec2.dot(faceCenter, normals[vertIndex1]);
            if (separation_1 > radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = ManifoldType.e_faceA;
            manifold.localNormal.setVec2(normals[vertIndex1]);
            manifold.localPoint.setVec2(faceCenter);
            manifold.points[0].localPoint.setVec2(circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.cf.indexA = 0;
            manifold.points[0].id.cf.typeA = ContactFeatureType.e_vertex;
            manifold.points[0].id.cf.indexB = 0;
            manifold.points[0].id.cf.typeB = ContactFeatureType.e_vertex;
        }
    }

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
    Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
    Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);
    function EdgePolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
        CollideEdgePolygon(manifold, fA.getShape(), xfA, fB.getShape(), xfB);
    }
    function ChainPolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
        var chain = fA.getShape();
        var edge = new EdgeShape();
        chain.getChildEdge(edge, indexA);
        CollideEdgePolygon(manifold, edge, xfA, fB.getShape(), xfB);
    }
    var EPAxisType;
    (function (EPAxisType) {
        EPAxisType[EPAxisType["e_unknown"] = -1] = "e_unknown";
        EPAxisType[EPAxisType["e_edgeA"] = 1] = "e_edgeA";
        EPAxisType[EPAxisType["e_edgeB"] = 2] = "e_edgeB";
    })(EPAxisType || (EPAxisType = {}));
    // unused?
    var VertexType;
    (function (VertexType) {
        VertexType[VertexType["e_isolated"] = 0] = "e_isolated";
        VertexType[VertexType["e_concave"] = 1] = "e_concave";
        VertexType[VertexType["e_convex"] = 2] = "e_convex";
    })(VertexType || (VertexType = {}));
    /**
     * This structure is used to keep track of the best separating axis.
     */
    var EPAxis = /** @class */ (function () {
        function EPAxis() {
        }
        return EPAxis;
    }());
    /**
     * This holds polygon B expressed in frame A.
     */
    var TempPolygon = /** @class */ (function () {
        function TempPolygon() {
            this.vertices = []; // [Settings.maxPolygonVertices]
            this.normals = []; // [Settings.maxPolygonVertices];
            this.count = 0;
        }
        return TempPolygon;
    }());
    /**
     * Reference face used for clipping
     */
    var ReferenceFace = /** @class */ (function () {
        function ReferenceFace() {
            this.normal = Vec2.zero();
            this.sideNormal1 = Vec2.zero();
            this.sideNormal2 = Vec2.zero();
        }
        return ReferenceFace;
    }());
    // reused
    var edgeAxis = new EPAxis();
    var polygonAxis = new EPAxis();
    var polygonBA = new TempPolygon();
    var rf = new ReferenceFace();
    /**
     * This function collides and edge and a polygon, taking into account edge
     * adjacency.
     */
    function CollideEdgePolygon(manifold, edgeA, xfA, polygonB, xfB) {
        // Algorithm:
        // 1. Classify v1 and v2
        // 2. Classify polygon centroid as front or back
        // 3. Flip normal if necessary
        // 4. Initialize normal range to [-pi, pi] about face normal
        // 5. Adjust normal range according to adjacent edges
        // 6. Visit each separating axes, only accept axes within the range
        // 7. Return if _any_ axis indicates separation
        // 8. Clip
        // let m_type1: VertexType;
        // let m_type2: VertexType;
        var xf = Transform.mulTXf(xfA, xfB);
        var centroidB = Transform.mulVec2(xf, polygonB.m_centroid);
        var v0 = edgeA.m_vertex0;
        var v1 = edgeA.m_vertex1;
        var v2 = edgeA.m_vertex2;
        var v3 = edgeA.m_vertex3;
        var hasVertex0 = edgeA.m_hasVertex0;
        var hasVertex3 = edgeA.m_hasVertex3;
        var edge1 = Vec2.sub(v2, v1);
        edge1.normalize();
        var normal1 = Vec2.neo(edge1.y, -edge1.x);
        var offset1 = Vec2.dot(normal1, Vec2.sub(centroidB, v1));
        var offset0 = 0.0;
        var offset2 = 0.0;
        var convex1 = false;
        var convex2 = false;
        var normal0;
        var normal2;
        // Is there a preceding edge?
        if (hasVertex0) {
            var edge0 = Vec2.sub(v1, v0);
            edge0.normalize();
            normal0 = Vec2.neo(edge0.y, -edge0.x);
            convex1 = Vec2.crossVec2Vec2(edge0, edge1) >= 0.0;
            offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
        }
        // Is there a following edge?
        if (hasVertex3) {
            var edge2 = Vec2.sub(v3, v2);
            edge2.normalize();
            normal2 = Vec2.neo(edge2.y, -edge2.x);
            convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0.0;
            offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
        }
        var front;
        var normal = Vec2.zero();
        var lowerLimit = Vec2.zero();
        var upperLimit = Vec2.zero();
        // Determine front or back collision. Determine collision normal limits.
        if (hasVertex0 && hasVertex3) {
            if (convex1 && convex2) {
                front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setVec2(normal0);
                    upperLimit.setVec2(normal2);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setMul(-1, normal1);
                    upperLimit.setMul(-1, normal1);
                }
            }
            else if (convex1) {
                front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setVec2(normal0);
                    upperLimit.setVec2(normal1);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setMul(-1, normal2);
                    upperLimit.setMul(-1, normal1);
                }
            }
            else if (convex2) {
                front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setVec2(normal1);
                    upperLimit.setVec2(normal2);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setMul(-1, normal1);
                    upperLimit.setMul(-1, normal0);
                }
            }
            else {
                front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setVec2(normal1);
                    upperLimit.setVec2(normal1);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setMul(-1, normal2);
                    upperLimit.setMul(-1, normal0);
                }
            }
        }
        else if (hasVertex0) {
            if (convex1) {
                front = offset0 >= 0.0 || offset1 >= 0.0;
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setVec2(normal0);
                    upperLimit.setMul(-1, normal1);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setVec2(normal1);
                    upperLimit.setMul(-1, normal1);
                }
            }
            else {
                front = offset0 >= 0.0 && offset1 >= 0.0;
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setVec2(normal1);
                    upperLimit.setMul(-1, normal1);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setVec2(normal1);
                    upperLimit.setMul(-1, normal0);
                }
            }
        }
        else if (hasVertex3) {
            if (convex2) {
                front = offset1 >= 0.0 || offset2 >= 0.0;
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setMul(-1, normal1);
                    upperLimit.setVec2(normal2);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setMul(-1, normal1);
                    upperLimit.setVec2(normal1);
                }
            }
            else {
                front = offset1 >= 0.0 && offset2 >= 0.0;
                if (front) {
                    normal.setVec2(normal1);
                    lowerLimit.setMul(-1, normal1);
                    upperLimit.setVec2(normal1);
                }
                else {
                    normal.setMul(-1, normal1);
                    lowerLimit.setMul(-1, normal2);
                    upperLimit.setVec2(normal1);
                }
            }
        }
        else {
            front = offset1 >= 0.0;
            if (front) {
                normal.setVec2(normal1);
                lowerLimit.setMul(-1, normal1);
                upperLimit.setMul(-1, normal1);
            }
            else {
                normal.setMul(-1, normal1);
                lowerLimit.setVec2(normal1);
                upperLimit.setVec2(normal1);
            }
        }
        // Get polygonB in frameA
        polygonBA.count = polygonB.m_count;
        for (var i = 0; i < polygonB.m_count; ++i) {
            polygonBA.vertices[i] = Transform.mulVec2(xf, polygonB.m_vertices[i]);
            polygonBA.normals[i] = Rot.mulVec2(xf.q, polygonB.m_normals[i]);
        }
        var radius = 2.0 * Settings.polygonRadius;
        manifold.pointCount = 0;
        { // ComputeEdgeSeparation
            edgeAxis.type = EPAxisType.e_edgeA;
            edgeAxis.index = front ? 0 : 1;
            edgeAxis.separation = Infinity;
            for (var i = 0; i < polygonBA.count; ++i) {
                var s = Vec2.dot(normal, Vec2.sub(polygonBA.vertices[i], v1));
                if (s < edgeAxis.separation) {
                    edgeAxis.separation = s;
                }
            }
        }
        // If no valid normal can be found than this edge should not collide.
        // @ts-ignore
        if (edgeAxis.type == EPAxisType.e_unknown) {
            return;
        }
        if (edgeAxis.separation > radius) {
            return;
        }
        { // ComputePolygonSeparation
            polygonAxis.type = EPAxisType.e_unknown;
            polygonAxis.index = -1;
            polygonAxis.separation = -Infinity;
            var perp = Vec2.neo(-normal.y, normal.x);
            for (var i = 0; i < polygonBA.count; ++i) {
                var n = Vec2.neg(polygonBA.normals[i]);
                var s1 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v1));
                var s2 = Vec2.dot(n, Vec2.sub(polygonBA.vertices[i], v2));
                var s = math$1.min(s1, s2);
                if (s > radius) {
                    // No collision
                    polygonAxis.type = EPAxisType.e_edgeB;
                    polygonAxis.index = i;
                    polygonAxis.separation = s;
                    break;
                }
                // Adjacency
                if (Vec2.dot(n, perp) >= 0.0) {
                    if (Vec2.dot(Vec2.sub(n, upperLimit), normal) < -Settings.angularSlop) {
                        continue;
                    }
                }
                else {
                    if (Vec2.dot(Vec2.sub(n, lowerLimit), normal) < -Settings.angularSlop) {
                        continue;
                    }
                }
                if (s > polygonAxis.separation) {
                    polygonAxis.type = EPAxisType.e_edgeB;
                    polygonAxis.index = i;
                    polygonAxis.separation = s;
                }
            }
        }
        if (polygonAxis.type != EPAxisType.e_unknown && polygonAxis.separation > radius) {
            return;
        }
        // Use hysteresis for jitter reduction.
        var k_relativeTol = 0.98;
        var k_absoluteTol = 0.001;
        var primaryAxis;
        if (polygonAxis.type == EPAxisType.e_unknown) {
            primaryAxis = edgeAxis;
        }
        else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
            primaryAxis = polygonAxis;
        }
        else {
            primaryAxis = edgeAxis;
        }
        var ie = [new ClipVertex(), new ClipVertex()];
        if (primaryAxis.type == EPAxisType.e_edgeA) {
            manifold.type = ManifoldType.e_faceA;
            // Search for the polygon normal that is most anti-parallel to the edge
            // normal.
            var bestIndex = 0;
            var bestValue = Vec2.dot(normal, polygonBA.normals[0]);
            for (var i = 1; i < polygonBA.count; ++i) {
                var value = Vec2.dot(normal, polygonBA.normals[i]);
                if (value < bestValue) {
                    bestValue = value;
                    bestIndex = i;
                }
            }
            var i1 = bestIndex;
            var i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;
            ie[0].v = polygonBA.vertices[i1];
            ie[0].id.cf.indexA = 0;
            ie[0].id.cf.indexB = i1;
            ie[0].id.cf.typeA = ContactFeatureType.e_face;
            ie[0].id.cf.typeB = ContactFeatureType.e_vertex;
            ie[1].v = polygonBA.vertices[i2];
            ie[1].id.cf.indexA = 0;
            ie[1].id.cf.indexB = i2;
            ie[1].id.cf.typeA = ContactFeatureType.e_face;
            ie[1].id.cf.typeB = ContactFeatureType.e_vertex;
            if (front) {
                rf.i1 = 0;
                rf.i2 = 1;
                rf.v1 = v1;
                rf.v2 = v2;
                rf.normal.setVec2(normal1);
            }
            else {
                rf.i1 = 1;
                rf.i2 = 0;
                rf.v1 = v2;
                rf.v2 = v1;
                rf.normal.setMul(-1, normal1);
            }
        }
        else {
            manifold.type = ManifoldType.e_faceB;
            ie[0].v = v1;
            ie[0].id.cf.indexA = 0;
            ie[0].id.cf.indexB = primaryAxis.index;
            ie[0].id.cf.typeA = ContactFeatureType.e_vertex;
            ie[0].id.cf.typeB = ContactFeatureType.e_face;
            ie[1].v = v2;
            ie[1].id.cf.indexA = 0;
            ie[1].id.cf.indexB = primaryAxis.index;
            ie[1].id.cf.typeA = ContactFeatureType.e_vertex;
            ie[1].id.cf.typeB = ContactFeatureType.e_face;
            rf.i1 = primaryAxis.index;
            rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
            rf.v1 = polygonBA.vertices[rf.i1];
            rf.v2 = polygonBA.vertices[rf.i2];
            rf.normal.setVec2(polygonBA.normals[rf.i1]);
        }
        rf.sideNormal1.setNum(rf.normal.y, -rf.normal.x);
        rf.sideNormal2.setMul(-1, rf.sideNormal1);
        rf.sideOffset1 = Vec2.dot(rf.sideNormal1, rf.v1);
        rf.sideOffset2 = Vec2.dot(rf.sideNormal2, rf.v2);
        // Clip incident edge against extruded edge1 side edges.
        var clipPoints1 = [new ClipVertex(), new ClipVertex()];
        var clipPoints2 = [new ClipVertex(), new ClipVertex()];
        var np;
        // Clip to box side 1
        np = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
        if (np < Settings.maxManifoldPoints) {
            return;
        }
        // Clip to negative box side 1
        np = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
        if (np < Settings.maxManifoldPoints) {
            return;
        }
        // Now clipPoints2 contains the clipped points.
        if (primaryAxis.type == EPAxisType.e_edgeA) {
            manifold.localNormal = Vec2.clone(rf.normal);
            manifold.localPoint = Vec2.clone(rf.v1);
        }
        else {
            manifold.localNormal = Vec2.clone(polygonB.m_normals[rf.i1]);
            manifold.localPoint = Vec2.clone(polygonB.m_vertices[rf.i1]);
        }
        var pointCount = 0;
        for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
            var separation = Vec2.dot(rf.normal, Vec2.sub(clipPoints2[i].v, rf.v1));
            if (separation <= radius) {
                var cp = manifold.points[pointCount]; // ManifoldPoint
                if (primaryAxis.type == EPAxisType.e_edgeA) {
                    cp.localPoint = Transform.mulTVec2(xf, clipPoints2[i].v);
                    cp.id = clipPoints2[i].id;
                }
                else {
                    cp.localPoint = clipPoints2[i].v;
                    cp.id.cf.typeA = clipPoints2[i].id.cf.typeB;
                    cp.id.cf.typeB = clipPoints2[i].id.cf.typeA;
                    cp.id.cf.indexA = clipPoints2[i].id.cf.indexB;
                    cp.id.cf.indexB = clipPoints2[i].id.cf.indexA;
                }
                ++pointCount;
            }
        }
        manifold.pointCount = pointCount;
    }

    // @ts-ignore
    Solver.TimeStep = TimeStep;
    // @ts-ignore
    Distance.testOverlap = testOverlap;
    // @ts-ignore
    Distance.Input = DistanceInput;
    // @ts-ignore
    Distance.Output = DistanceOutput;
    // @ts-ignore
    Distance.Proxy = DistanceProxy;
    // @ts-ignore
    Distance.Cache = SimplexCache;
    // @ts-ignore
    TimeOfImpact.Input = TOIInput;
    // @ts-ignore
    TimeOfImpact.Output = TOIOutput;

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var stats = {};

    var extend = function(base) {
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        for ( var key in obj) {
          if (obj.hasOwnProperty(key)) {
            base[key] = obj[key];
          }
        }
      }
      return base;
    };

    /**
     * ! is the definitive JavaScript type testing library
     * 
     * @copyright 2013-2014 Enrico Marino / Jordan Harband
     * @license MIT
     */

    var is_1 = createCommonjsModule(function (module) {
    var objProto = Object.prototype;
    var owns = objProto.hasOwnProperty;
    var toStr = objProto.toString;

    var hexRegex = /^[A-Fa-f0-9]+$/;

    var is = module.exports = {};

    is.a = is.an = is.type = function(value, type) {
      return typeof value === type;
    };

    is.defined = function(value) {
      return typeof value !== 'undefined';
    };

    is.empty = function(value) {
      var type = toStr.call(value);
      var key;

      if ('[object Array]' === type || '[object Arguments]' === type
          || '[object String]' === type) {
        return value.length === 0;
      }

      if ('[object Object]' === type) {
        for (key in value) {
          if (owns.call(value, key)) {
            return false;
          }
        }
        return true;
      }

      return !value;
    };

    is.equal = function(value, other) {
      if (value === other) {
        return true;
      }

      var type = toStr.call(value);
      var key;

      if (type !== toStr.call(other)) {
        return false;
      }

      if ('[object Object]' === type) {
        for (key in value) {
          if (!is.equal(value[key], other[key]) || !(key in other)) {
            return false;
          }
        }
        for (key in other) {
          if (!is.equal(value[key], other[key]) || !(key in value)) {
            return false;
          }
        }
        return true;
      }

      if ('[object Array]' === type) {
        key = value.length;
        if (key !== other.length) {
          return false;
        }
        while (--key) {
          if (!is.equal(value[key], other[key])) {
            return false;
          }
        }
        return true;
      }

      if ('[object Function]' === type) {
        return value.prototype === other.prototype;
      }

      if ('[object Date]' === type) {
        return value.getTime() === other.getTime();
      }

      return false;
    };

    is.instance = function(value, constructor) {
      return value instanceof constructor;
    };

    is.nil = function(value) {
      return value === null;
    };

    is.undef = function(value) {
      return typeof value === 'undefined';
    };

    is.array = function(value) {
      return '[object Array]' === toStr.call(value);
    };

    is.emptyarray = function(value) {
      return is.array(value) && value.length === 0;
    };

    is.arraylike = function(value) {
      return !!value && !is.boolean(value) && owns.call(value, 'length')
          && isFinite(value.length) && is.number(value.length) && value.length >= 0;
    };

    is.boolean = function(value) {
      return '[object Boolean]' === toStr.call(value);
    };

    is.element = function(value) {
      return value !== undefined && typeof HTMLElement !== 'undefined'
          && value instanceof HTMLElement && value.nodeType === 1;
    };

    is.fn = function(value) {
      return '[object Function]' === toStr.call(value);
    };

    is.number = function(value) {
      return '[object Number]' === toStr.call(value);
    };

    is.nan = function(value) {
      return !is.number(value) || value !== value;
    };

    is.object = function(value) {
      return '[object Object]' === toStr.call(value);
    };

    is.hash = function(value) {
      return is.object(value) && value.constructor === Object && !value.nodeType
          && !value.setInterval;
    };

    is.regexp = function(value) {
      return '[object RegExp]' === toStr.call(value);
    };

    is.string = function(value) {
      return '[object String]' === toStr.call(value);
    };

    is.hex = function(value) {
      return is.string(value) && (!value.length || hexRegex.test(value));
    };
    });

    var _await = function() {
      var count = 0;
      function fork(fn, n) {
        count += n = (typeof n === 'number' && n >= 1 ? n : 1);
        return function() {
          fn && fn.apply(this, arguments);
          if (n > 0) {
            n--, count--, call();
          }
        };
      }
      var then = [];
      function call() {
        if (count === 0) {
          while (then.length) {
            setTimeout(then.shift(), 0);
          }
        }
      }
      fork.then = function(fn) {
        if (count === 0) {
          setTimeout(fn, 0);
        } else {
          then.push(fn);
        }
      };
      return fork;
    };

    stats.create = 0;

    function Class(arg) {
      if (!(this instanceof Class)) {
        if (is_1.fn(arg)) {
          return Class.app.apply(Class, arguments);
        } else if (is_1.object(arg)) {
          return Class.atlas.apply(Class, arguments);
        } else {
          return arg;
        }
      }

      stats.create++;

      for (var i = 0; i < _init.length; i++) {
        _init[i].call(this);
      }
    }

    var _init = [];

    Class._init = function(fn) {
      _init.push(fn);
    };

    var _load = [];

    Class._load = function(fn) {
      _load.push(fn);
    };

    var _config = {};

    Class.config = function() {
      if (arguments.length === 1 && is_1.string(arguments[0])) {
        return _config[arguments[0]];
      }
      if (arguments.length === 1 && is_1.object(arguments[0])) {
        extend(_config, arguments[0]);
      }
      if (arguments.length === 2 && is_1.string(arguments[0])) ;
    };

    var _app_queue = [];
    var _stages = [];
    var _loaded = false;
    var _paused = false;

    Class.app = function(app, opts) {
      if (!_loaded) {
        _app_queue.push(arguments);
        return;
      }
      var loader = Class.config('app-loader');
      loader(function(stage, canvas) {
        for (var i = 0; i < _load.length; i++) {
          _load[i].call(this, stage, canvas);
        }
        app(stage, canvas);
        _stages.push(stage);
        stage.start();
      }, opts);
    };

    var loading = _await();

    Class.preload = function(load) {
      if (typeof load === 'string') {
        var url = Class.resolve(load);
        if (/\.js($|\?|\#)/.test(url)) {
          load = function(callback) {
            loadScript(url, callback);
          };
        }
      }
      if (typeof load !== 'function') {
        return;
      }
      // if (!_started) {
      // _preload_queue.push(load);
      // return;
      // }
      load(loading());
    };

    Class.start = function(config) {

      Class.config(config);

      // false && console.log('Preloading...');
      // _started = true;
      // while (_preload_queue.length) {
      // var load = _preload_queue.shift();
      // load(loading());
      // }

      loading.then(function() {
        _loaded = true;
        while (_app_queue.length) {
          var args = _app_queue.shift();
          Class.app.apply(Class, args);
        }
      });
    };

    Class.pause = function() {
      if (!_paused) {
        _paused = true;
        for (var i = _stages.length - 1; i >= 0; i--) {
          _stages[i].pause();
        }
      }
    };

    Class.resume = function() {
      if (_paused) {
        _paused = false;
        for (var i = _stages.length - 1; i >= 0; i--) {
          _stages[i].resume();
        }
      }
    };

    Class.create = function() {
      return new Class();
    };

    Class.resolve = (function() {

      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return function(url) {
          return url;
        };
      }

      var scripts = document.getElementsByTagName('script');

      function getScriptSrc() {
        // HTML5
        if (document.currentScript) {
          return document.currentScript.src;
        }

        // IE>=10
        var stack;
        try {
          var err = new Error();
          if (err.stack) {
            stack = err.stack;
          } else {
            throw err;
          }
        } catch (err) {
          stack = err.stack;
        }
        if (typeof stack === 'string') {
          stack = stack.split('\n');
          // Uses the last line, where the call started
          for (var i = stack.length; i--;) {
            var url = stack[i].match(/(\w+\:\/\/[^/]*?\/.+?)(:\d+)(:\d+)?/);
            if (url) {
              return url[1];
            }
          }
        }

        // IE<11
        if (scripts.length && 'readyState' in scripts[0]) {
          for (var i = scripts.length; i--;) {
            if (scripts[i].readyState === 'interactive') {
              return scripts[i].src;
            }
          }
        }

        return location.href;
      }

      return function(url) {
        if (/^\.\//.test(url)) {
          var src = getScriptSrc();
          var base = src.substring(0, src.lastIndexOf('/') + 1);
          url = base + url.substring(2);
          // } else if (/^\.\.\//.test(url)) {
          // url = base + url;
        }
        return url;
      };
    })();

    var core = Class;

    function loadScript(src, callback) {
      var el = document.createElement('script');
      el.addEventListener('load', function() {
        callback();
      });
      el.addEventListener('error', function(err) {
        callback(err || 'Error loading script: ' + src);
      });
      el.src = src;
      el.id = 'preload-' + Date.now();
      document.body.appendChild(el);
    }

    function Matrix$1(a, b, c, d, e, f) {
      this.reset(a, b, c, d, e, f);
    }
    Matrix$1.prototype.toString = function() {
      return '[' + this.a + ', ' + this.b + ', ' + this.c + ', ' + this.d + ', '
          + this.e + ', ' + this.f + ']';
    };

    Matrix$1.prototype.clone = function() {
      return new Matrix$1(this.a, this.b, this.c, this.d, this.e, this.f);
    };

    Matrix$1.prototype.reset = function(a, b, c, d, e, f) {
      this._dirty = true;
      if (typeof a === 'object') {
        this.a = a.a, this.d = a.d;
        this.b = a.b, this.c = a.c;
        this.e = a.e, this.f = a.f;
      } else {
        this.a = a || 1, this.d = d || 1;
        this.b = b || 0, this.c = c || 0;
        this.e = e || 0, this.f = f || 0;
      }
      return this;
    };

    Matrix$1.prototype.identity = function() {
      this._dirty = true;
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
      return this;
    };

    Matrix$1.prototype.rotate = function(angle) {
      if (!angle) {
        return this;
      }

      this._dirty = true;

      var u = angle ? Math.cos(angle) : 1;
      // android bug may give bad 0 values
      var v = angle ? Math.sin(angle) : 0;

      var a = u * this.a - v * this.b;
      var b = u * this.b + v * this.a;
      var c = u * this.c - v * this.d;
      var d = u * this.d + v * this.c;
      var e = u * this.e - v * this.f;
      var f = u * this.f + v * this.e;

      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.f = f;

      return this;
    };

    Matrix$1.prototype.translate = function(x, y) {
      if (!x && !y) {
        return this;
      }
      this._dirty = true;
      this.e += x;
      this.f += y;
      return this;
    };

    Matrix$1.prototype.scale = function(x, y) {
      if (!(x - 1) && !(y - 1)) {
        return this;
      }
      this._dirty = true;
      this.a *= x;
      this.b *= y;
      this.c *= x;
      this.d *= y;
      this.e *= x;
      this.f *= y;
      return this;
    };

    Matrix$1.prototype.skew = function(x, y) {
      if (!x && !y) {
        return this;
      }
      this._dirty = true;

      var a = this.a + this.b * x;
      var b = this.b + this.a * y;
      var c = this.c + this.d * x;
      var d = this.d + this.c * y;
      var e = this.e + this.f * x;
      var f = this.f + this.e * y;

      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.f = f;
      return this;
    };

    Matrix$1.prototype.concat = function(m) {
      this._dirty = true;

      var n = this;

      var a = n.a * m.a + n.b * m.c;
      var b = n.b * m.d + n.a * m.b;
      var c = n.c * m.a + n.d * m.c;
      var d = n.d * m.d + n.c * m.b;
      var e = n.e * m.a + m.e + n.f * m.c;
      var f = n.f * m.d + m.f + n.e * m.b;

      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.f = f;

      return this;
    };

    Matrix$1.prototype.inverse = Matrix$1.prototype.reverse = function() {
      if (this._dirty) {
        this._dirty = false;
        this.inversed = this.inversed || new Matrix$1();
        var z = this.a * this.d - this.b * this.c;
        this.inversed.a = this.d / z;
        this.inversed.b = -this.b / z;
        this.inversed.c = -this.c / z;
        this.inversed.d = this.a / z;
        this.inversed.e = (this.c * this.f - this.e * this.d) / z;
        this.inversed.f = (this.e * this.b - this.a * this.f) / z;
      }
      return this.inversed;
    };

    Matrix$1.prototype.map = function(p, q) {
      q = q || {};
      q.x = this.a * p.x + this.c * p.y + this.e;
      q.y = this.b * p.x + this.d * p.y + this.f;
      return q;
    };

    Matrix$1.prototype.mapX = function(x, y) {
      if (typeof x === 'object')
        y = x.y, x = x.x;
      return this.a * x + this.c * y + this.e;
    };

    Matrix$1.prototype.mapY = function(x, y) {
      if (typeof x === 'object')
        y = x.y, x = x.x;
      return this.b * x + this.d * y + this.f;
    };

    var matrix = Matrix$1;

    var create = createCommonjsModule(function (module) {
    if (typeof Object.create == 'function') {
      module.exports = function(proto, props) {
        return Object.create.call(Object, proto, props);
      };
    } else {
      module.exports = function(proto, props) {
        if (props)
          throw Error('Second argument is not supported!');
        if (typeof proto !== 'object' || proto === null)
          throw Error('Invalid prototype!');
        noop.prototype = proto;
        return new noop;
      };
      function noop() {
      }
    }
    });

    var native = Math;

    var math = create(Math);

    var random = function(min, max) {
      if (typeof min === 'undefined') {
        max = 1, min = 0;
      } else if (typeof max === 'undefined') {
        max = min, min = 0;
      }
      return min == max ? min : native.random() * (max - min) + min;
    };

    var rotate = function(num, min, max) {
      if (typeof min === 'undefined') {
        max = 1, min = 0;
      } else if (typeof max === 'undefined') {
        max = min, min = 0;
      }
      if (max > min) {
        num = (num - min) % (max - min);
        return num + (num < 0 ? max : min);
      } else {
        num = (num - max) % (min - max);
        return num + (num <= 0 ? min : max);
      }
    };

    var limit = function(num, min, max) {
      if (num < min) {
        return min;
      } else if (num > max) {
        return max;
      } else {
        return num;
      }
    };

    var length = function(x, y) {
      return native.sqrt(x * x + y * y);
    };
    math.random = random;
    math.rotate = rotate;
    math.limit = limit;
    math.length = length;

    function Texture$1(image, ratio) {
      if (typeof image === 'object') {
        this.src(image, ratio);
      }
    }

    Texture$1.prototype.pipe = function() {
      return new Texture$1(this);
    };

    /**
     * Signatures: (image), (x, y, w, h), (w, h)
     */
    Texture$1.prototype.src = function(x, y, w, h) {
      if (typeof x === 'object') {
        var image = x, ratio = y || 1;

        this._image = image;
        this._sx = this._dx = 0;
        this._sy = this._dy = 0;
        this._sw = this._dw = image.width / ratio;
        this._sh = this._dh = image.height / ratio;

        this.width = image.width / ratio;
        this.height = image.height / ratio;

        this.ratio = ratio;

      } else {
        if (typeof w === 'undefined') {
          w = x, h = y;
        } else {
          this._sx = x, this._sy = y;
        }
        this._sw = this._dw = w;
        this._sh = this._dh = h;

        this.width = w;
        this.height = h;
      }
      return this;
    };

    /**
     * Signatures: (x, y, w, h), (x, y)
     */
    Texture$1.prototype.dest = function(x, y, w, h) {
      this._dx = x, this._dy = y;
      this._dx = x, this._dy = y;
      if (typeof w !== 'undefined') {
        this._dw = w, this._dh = h;
        this.width = w, this.height = h;
      }
      return this;
    };

    Texture$1.prototype.draw = function(context, x1, y1, x2, y2, x3, y3, x4, y4) {
      var image = this._image;
      if (image === null || typeof image !== 'object') {
        return;
      }

      var sx = this._sx, sy = this._sy;
      var sw = this._sw, sh = this._sh;
      var dx = this._dx, dy = this._dy;
      var dw = this._dw, dh = this._dh;

      if (typeof x3 !== 'undefined') {
        x1 = math.limit(x1, 0, this._sw), x2 = math.limit(x2, 0, this._sw - x1);
        y1 = math.limit(y1, 0, this._sh), y2 = math.limit(y2, 0, this._sh - y1);
        sx += x1, sy += y1, sw = x2, sh = y2;
        dx = x3, dy = y3, dw = x4, dh = y4;

      } else if (typeof x2 !== 'undefined') {
        dx = x1, dy = y1, dw = x2, dh = y2;

      } else if (typeof x1 !== 'undefined') {
        dw = x1, dh = y1;
      }

      var ratio = this.ratio || 1;
      sx *= ratio, sy *= ratio, sw *= ratio, sh *= ratio;

      try {
        if (typeof image.draw === 'function') {
          image.draw(context, sx, sy, sw, sh, dx, dy, dw, dh);
        } else {
          stats.draw++;
          context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
      } catch (ex) {
        if (!image._draw_failed) {
          console.log('Unable to draw: ', image);
          console.log(ex);
          image._draw_failed = true;
        }
      }
    };

    var texture = Texture$1;

    var startsWith = function(str, sub) {
      return typeof str === 'string' && typeof sub === 'string'
          && str.substring(0, sub.length) == sub;
    };

    var string = {
    	startsWith: startsWith
    };

    // name : atlas
    var _atlases_map = {};
    // [atlas]
    var _atlases_arr = [];

    // TODO: print subquery not found error
    // TODO: index textures

    core.atlas = function(def) {
      var atlas = is_1.fn(def.draw) ? def : new Atlas(def);
      if (def.name) {
        _atlases_map[def.name] = atlas;
      }
      _atlases_arr.push(atlas);

      deprecated(def, 'imagePath');
      deprecated(def, 'imageRatio');

      var url = def.imagePath;
      var ratio = def.imageRatio || 1;
      if (is_1.string(def.image)) {
        url = def.image;
      } else if (is_1.hash(def.image)) {
        url = def.image.src || def.image.url;
        ratio = def.image.ratio || ratio;
      }
      url && core.preload(function(done) {
        url = core.resolve(url);
        var imageloader = core.config('image-loader');

        imageloader(url, function(image) {
          atlas.src(image, ratio);
          done();

        }, function(err) {
          done();
        });
      });

      return atlas;
    };

    Atlas._super = texture;
    Atlas.prototype = create(Atlas._super.prototype);

    function Atlas(def) {
      Atlas._super.call(this);

      var atlas = this;

      deprecated(def, 'filter');
      deprecated(def, 'cutouts');
      deprecated(def, 'sprites');
      deprecated(def, 'factory');

      var map = def.map || def.filter;
      var ppu = def.ppu || def.ratio || 1;
      var trim = def.trim || 0;
      var textures = def.textures;
      var factory = def.factory;
      var cutouts = def.cutouts || def.sprites;

      function make(def) {
        if (!def || is_1.fn(def.draw)) {
          return def;
        }

        def = extend({}, def);

        if (is_1.fn(map)) {
          def = map(def);
        }

        if (ppu != 1) {
          def.x *= ppu, def.y *= ppu;
          def.width *= ppu, def.height *= ppu;
          def.top *= ppu, def.bottom *= ppu;
          def.left *= ppu, def.right *= ppu;
        }

        if (trim != 0) {
          def.x += trim, def.y += trim;
          def.width -= 2 * trim, def.height -= 2 * trim;
          def.top -= trim, def.bottom -= trim;
          def.left -= trim, def.right -= trim;
        }

        var texture = atlas.pipe();
        texture.top = def.top, texture.bottom = def.bottom;
        texture.left = def.left, texture.right = def.right;
        texture.src(def.x, def.y, def.width, def.height);
        return texture;
      }

      function find(query) {
        if (textures) {
          if (is_1.fn(textures)) {
            return textures(query);
          } else if (is_1.hash(textures)) {
            return textures[query];
          }
        }
        if (cutouts) { // deprecated
          var result = null, n = 0;
          for (var i = 0; i < cutouts.length; i++) {
            if (string.startsWith(cutouts[i].name, query)) {
              if (n === 0) {
                result = cutouts[i];
              } else if (n === 1) {
                result = [ result, cutouts[i] ];
              } else {
                result.push(cutouts[i]);
              }
              n++;
            }
          }
          if (n === 0 && is_1.fn(factory)) {
            result = function(subquery) {
              return factory(query + (subquery ? subquery : ''));
            };
          }
          return result;
        }
      }

      this.select = function(query) {
        if (!query) {
          // TODO: if `textures` is texture def, map or fn?
          return new Selection(this.pipe());
        }
        var found = find(query);
        if (found) {
          return new Selection(found, find, make);
        }
      };

    }
    var nfTexture = new texture();
    nfTexture.x = nfTexture.y = nfTexture.width = nfTexture.height = 0;
    nfTexture.pipe = nfTexture.src = nfTexture.dest = function() {
      return this;
    };
    nfTexture.draw = function() {
    };

    var nfSelection = new Selection(nfTexture);

    function Selection(result, find, make) {
      function link(result, subquery) {
        if (!result) {
          return nfTexture;

        } else if (is_1.fn(result.draw)) {
          return result;

        } else if (is_1.hash(result) && is_1.number(result.width)
            && is_1.number(result.height) && is_1.fn(make)) {
          return make(result);

        } else if (is_1.hash(result) && is_1.defined(subquery)) {
          return link(result[subquery]);

        } else if (is_1.fn(result)) {
          return link(result(subquery));

        } else if (is_1.array(result)) {
          return link(result[0]);

        } else if (is_1.string(result) && is_1.fn(find)) {
          return link(find(result));
        }
      }

      this.one = function(subquery) {
        return link(result, subquery);
      };

      this.array = function(arr) {
        var array = is_1.array(arr) ? arr : [];
        if (is_1.array(result)) {
          for (var i = 0; i < result.length; i++) {
            array[i] = link(result[i]);
          }
        } else {
          array[0] = link(result);
        }
        return array;
      };
    }

    core.texture = function(query) {
      if (!is_1.string(query)) {
        return new Selection(query);
      }

      var result = null, atlas, i;

      if ((i = query.indexOf(':')) > 0 && query.length > i + 1) {
        atlas = _atlases_map[query.slice(0, i)];
        result = atlas && atlas.select(query.slice(i + 1));
      }

      if (!result && (atlas = _atlases_map[query])) {
        result = atlas.select();
      }

      for (i = 0; !result && i < _atlases_arr.length; i++) {
        result = _atlases_arr[i].select(query);
      }

      if (!result) {
        console.error('Texture not found: ' + query);
        result = nfSelection;
      }

      return result;
    };

    function deprecated(hash, name, msg) {
      if (name in hash)
        console.log(msg ? msg.replace('%name', name) : '\'' + name
            + '\' field of texture atlas is deprecated.');
    }

    var iid$1 = 0;

    // TODO: do not clear next/prev/parent on remove

    core.prototype._label = '';

    core.prototype._visible = true;

    core.prototype._parent = null;
    core.prototype._next = null;
    core.prototype._prev = null;

    core.prototype._first = null;
    core.prototype._last = null;

    core.prototype._attrs = null;
    core.prototype._flags = null;

    core.prototype.toString = function() {
      return '[' + this._label + ']';
    };

    /**
     * @deprecated Use label()
     */
    core.prototype.id = function(id) {
      return this.label(id);
    };

    core.prototype.label = function(label) {
      if (typeof label === 'undefined') {
        return this._label;
      }
      this._label = label;
      return this;
    };

    core.prototype.attr = function(name, value) {
      if (typeof value === 'undefined') {
        return this._attrs !== null ? this._attrs[name] : undefined;
      }
      (this._attrs !== null ? this._attrs : this._attrs = {})[name] = value;
      return this;
    };

    core.prototype.visible = function(visible) {
      if (typeof visible === 'undefined') {
        return this._visible;
      }
      this._visible = visible;
      this._parent && (this._parent._ts_children = ++iid$1);
      this._ts_pin = ++iid$1;
      this.touch();
      return this;
    };

    core.prototype.hide = function() {
      return this.visible(false);
    };

    core.prototype.show = function() {
      return this.visible(true);
    };

    core.prototype.parent = function() {
      return this._parent;
    };

    core.prototype.next = function(visible) {
      var next = this._next;
      while (next && visible && !next._visible) {
        next = next._next;
      }
      return next;
    };

    core.prototype.prev = function(visible) {
      var prev = this._prev;
      while (prev && visible && !prev._visible) {
        prev = prev._prev;
      }
      return prev;
    };

    core.prototype.first = function(visible) {
      var next = this._first;
      while (next && visible && !next._visible) {
        next = next._next;
      }
      return next;
    };

    core.prototype.last = function(visible) {
      var prev = this._last;
      while (prev && visible && !prev._visible) {
        prev = prev._prev;
      }
      return prev;
    };

    core.prototype.visit = function(visitor, data) {
      var reverse = visitor.reverse;
      var visible = visitor.visible;
      if (visitor.start && visitor.start(this, data)) {
        return;
      }
      var child, next = reverse ? this.last(visible) : this.first(visible);
      while (child = next) {
        next = reverse ? child.prev(visible) : child.next(visible);
        if (child.visit(visitor, data)) {
          return true;
        }
      }
      return visitor.end && visitor.end(this, data);
    };

    core.prototype.append = function(child, more) {
      if (is_1.array(child))
        for (var i = 0; i < child.length; i++)
          append(this, child[i]);

      else if (typeof more !== 'undefined') // deprecated
        for (var i = 0; i < arguments.length; i++)
          append(this, arguments[i]);

      else if (typeof child !== 'undefined')
        append(this, child);

      return this;
    };

    core.prototype.prepend = function(child, more) {
      if (is_1.array(child))
        for (var i = child.length - 1; i >= 0; i--)
          prepend(this, child[i]);

      else if (typeof more !== 'undefined') // deprecated
        for (var i = arguments.length - 1; i >= 0; i--)
          prepend(this, arguments[i]);

      else if (typeof child !== 'undefined')
        prepend(this, child);

      return this;
    };

    core.prototype.appendTo = function(parent) {
      append(parent, this);
      return this;
    };

    core.prototype.prependTo = function(parent) {
      prepend(parent, this);
      return this;
    };

    core.prototype.insertNext = function(sibling, more) {
      if (is_1.array(sibling))
        for (var i = 0; i < sibling.length; i++)
          insertAfter(sibling[i], this);

      else if (typeof more !== 'undefined') // deprecated
        for (var i = 0; i < arguments.length; i++)
          insertAfter(arguments[i], this);

      else if (typeof sibling !== 'undefined')
        insertAfter(sibling, this);

      return this;
    };

    core.prototype.insertPrev = function(sibling, more) {
      if (is_1.array(sibling))
        for (var i = sibling.length - 1; i >= 0; i--)
          insertBefore(sibling[i], this);

      else if (typeof more !== 'undefined') // deprecated
        for (var i = arguments.length - 1; i >= 0; i--)
          insertBefore(arguments[i], this);

      else if (typeof sibling !== 'undefined')
        insertBefore(sibling, this);

      return this;
    };

    core.prototype.insertAfter = function(prev) {
      insertAfter(this, prev);
      return this;
    };

    core.prototype.insertBefore = function(next) {
      insertBefore(this, next);
      return this;
    };

    function append(parent, child) {
      _ensure(child);
      _ensure(parent);

      child.remove();

      if (parent._last) {
        parent._last._next = child;
        child._prev = parent._last;
      }

      child._parent = parent;
      parent._last = child;

      if (!parent._first) {
        parent._first = child;
      }

      child._parent._flag(child, true);

      child._ts_parent = ++iid$1;
      parent._ts_children = ++iid$1;
      parent.touch();
    }

    function prepend(parent, child) {
      _ensure(child);
      _ensure(parent);

      child.remove();

      if (parent._first) {
        parent._first._prev = child;
        child._next = parent._first;
      }

      child._parent = parent;
      parent._first = child;

      if (!parent._last) {
        parent._last = child;
      }

      child._parent._flag(child, true);

      child._ts_parent = ++iid$1;
      parent._ts_children = ++iid$1;
      parent.touch();
    }
    function insertBefore(self, next) {
      _ensure(self);
      _ensure(next);

      self.remove();

      var parent = next._parent;
      var prev = next._prev;

      next._prev = self;
      prev && (prev._next = self) || parent && (parent._first = self);

      self._parent = parent;
      self._prev = prev;
      self._next = next;

      self._parent._flag(self, true);

      self._ts_parent = ++iid$1;
      self.touch();
    }
    function insertAfter(self, prev) {
      _ensure(self);
      _ensure(prev);

      self.remove();

      var parent = prev._parent;
      var next = prev._next;

      prev._next = self;
      next && (next._prev = self) || parent && (parent._last = self);

      self._parent = parent;
      self._prev = prev;
      self._next = next;

      self._parent._flag(self, true);

      self._ts_parent = ++iid$1;
      self.touch();
    }
    core.prototype.remove = function(child, more) {
      if (typeof child !== 'undefined') {
        if (is_1.array(child)) {
          for (var i = 0; i < child.length; i++)
            _ensure(child[i]).remove();

        } else if (typeof more !== 'undefined') {
          for (var i = 0; i < arguments.length; i++)
            _ensure(arguments[i]).remove();

        } else {
          _ensure(child).remove();
        }
        return this;
      }

      if (this._prev) {
        this._prev._next = this._next;
      }
      if (this._next) {
        this._next._prev = this._prev;
      }

      if (this._parent) {
        if (this._parent._first === this) {
          this._parent._first = this._next;
        }
        if (this._parent._last === this) {
          this._parent._last = this._prev;
        }

        this._parent._flag(this, false);

        this._parent._ts_children = ++iid$1;
        this._parent.touch();
      }

      this._prev = this._next = this._parent = null;
      this._ts_parent = ++iid$1;
      // this._parent.touch();

      return this;
    };

    core.prototype.empty = function() {
      var child, next = this._first;
      while (child = next) {
        next = child._next;
        child._prev = child._next = child._parent = null;

        this._flag(child, false);
      }

      this._first = this._last = null;

      this._ts_children = ++iid$1;
      this.touch();
      return this;
    };

    core.prototype.touch = function() {
      this._ts_touch = ++iid$1;
      this._parent && this._parent.touch();
      return this;
    };

    /**
     * Deep flags used for optimizing event distribution.
     */
    core.prototype._flag = function(obj, name) {
      if (typeof name === 'undefined') {
        return this._flags !== null && this._flags[obj] || 0;
      }
      if (typeof obj === 'string') {
        if (name) {
          this._flags = this._flags || {};
          if (!this._flags[obj] && this._parent) {
            this._parent._flag(obj, true);
          }
          this._flags[obj] = (this._flags[obj] || 0) + 1;

        } else if (this._flags && this._flags[obj] > 0) {
          if (this._flags[obj] == 1 && this._parent) {
            this._parent._flag(obj, false);
          }
          this._flags[obj] = this._flags[obj] - 1;
        }
      }
      if (typeof obj === 'object') {
        if (obj._flags) {
          for ( var type in obj._flags) {
            if (obj._flags[type] > 0) {
              this._flag(type, name);
            }
          }
        }
      }
      return this;
    };

    /**
     * @private
     */
    core.prototype.hitTest = function(hit) {
      var width = this._pin._width;
      var height = this._pin._height;
      return hit.x >= 0 && hit.x <= width && hit.y >= 0 && hit.y <= height;
    };

    function _ensure(obj) {
      if (obj && obj instanceof core) {
        return obj;
      }
      throw 'Invalid node: ' + obj;
    }

    var event = function(prototype, callback) {

      prototype._listeners = null;

      prototype.on = prototype.listen = function(types, listener) {
        if (!types || !types.length || typeof listener !== 'function') {
          return this;
        }
        if (this._listeners === null) {
          this._listeners = {};
        }
        var isarray = typeof types !== 'string' && typeof types.join === 'function';
        if (types = (isarray ? types.join(' ') : types).match(/\S+/g)) {
          for (var i = 0; i < types.length; i++) {
            var type = types[i];
            this._listeners[type] = this._listeners[type] || [];
            this._listeners[type].push(listener);
            if (typeof callback === 'function') {
              callback(this, type, true);
            }
          }
        }
        return this;
      };

      prototype.off = function(types, listener) {
        if (!types || !types.length || typeof listener !== 'function') {
          return this;
        }
        if (this._listeners === null) {
          return this;
        }
        var isarray = typeof types !== 'string' && typeof types.join === 'function';
        if (types = (isarray ? types.join(' ') : types).match(/\S+/g)) {
          for (var i = 0; i < types.length; i++) {
            var type = types[i], all = this._listeners[type], index;
            if (all && (index = all.indexOf(listener)) >= 0) {
              all.splice(index, 1);
              if (!all.length) {
                delete this._listeners[type];
              }
              if (typeof callback === 'function') {
                callback(this, type, false);
              }
            }
          }
        }
        return this;
      };

      prototype.listeners = function(type) {
        return this._listeners && this._listeners[type];
      };

      prototype.publish = function(name, args) {
        var listeners = this.listeners(name);
        if (!listeners || !listeners.length) {
          return 0;
        }
        for (var l = 0; l < listeners.length; l++) {
          listeners[l].apply(this, args);
        }
        return listeners.length;
      };

      prototype.trigger = function(name, args) {
        this.publish(name, args);
        return this;
      };

    };

    event(core.prototype, function(obj, name, on) {
      obj._flag(name, on);
    });

    var iid = 0;

    core._init(function() {
      this._pin = new Pin(this);
    });

    core.prototype.matrix = function(relative) {
      if (relative === true) {
        return this._pin.relativeMatrix();
      }
      return this._pin.absoluteMatrix();
    };

    core.prototype.pin = function(a, b) {
      if (typeof a === 'object') {
        this._pin.set(a);
        return this;

      } else if (typeof a === 'string') {
        if (typeof b === 'undefined') {
          return this._pin.get(a);
        } else {
          this._pin.set(a, b);
          return this;
        }
      } else if (typeof a === 'undefined') {
        return this._pin;
      }
    };

    function Pin(owner) {

      this._owner = owner;
      this._parent = null;

      // relative to parent
      this._relativeMatrix = new matrix();

      // relative to stage
      this._absoluteMatrix = new matrix();

      this.reset();
    }
    Pin.prototype.reset = function() {

      this._textureAlpha = 1;
      this._alpha = 1;

      this._width = 0;
      this._height = 0;

      this._scaleX = 1;
      this._scaleY = 1;
      this._skewX = 0;
      this._skewY = 0;
      this._rotation = 0;

      // scale/skew/rotate center
      this._pivoted = false;
      this._pivotX = null;
      this._pivotY = null;

      // self pin point
      this._handled = false;
      this._handleX = 0;
      this._handleY = 0;

      // parent pin point
      this._aligned = false;
      this._alignX = 0;
      this._alignY = 0;

      // as seen by parent px
      this._offsetX = 0;
      this._offsetY = 0;

      this._boxX = 0;
      this._boxY = 0;
      this._boxWidth = this._width;
      this._boxHeight = this._height;

      // TODO: also set for owner
      this._ts_translate = ++iid;
      this._ts_transform = ++iid;
      this._ts_matrix = ++iid;
    };

    Pin.prototype._update = function() {
      this._parent = this._owner._parent && this._owner._parent._pin;

      // if handled and transformed then be translated
      if (this._handled && this._mo_handle != this._ts_transform) {
        this._mo_handle = this._ts_transform;
        this._ts_translate = ++iid;
      }

      if (this._aligned && this._parent
          && this._mo_align != this._parent._ts_transform) {
        this._mo_align = this._parent._ts_transform;
        this._ts_translate = ++iid;
      }

      return this;
    };

    Pin.prototype.toString = function() {
      return this._owner + ' (' + (this._parent ? this._parent._owner : null) + ')';
    };

    // TODO: ts fields require refactoring

    Pin.prototype.absoluteMatrix = function() {
      this._update();
      var ts = Math.max(
        this._ts_transform,
        this._ts_translate,
        this._parent ? this._parent._ts_matrix : 0
      );
      if (this._mo_abs == ts) {
        return this._absoluteMatrix;
      }
      this._mo_abs = ts;

      var abs = this._absoluteMatrix;
      abs.reset(this.relativeMatrix());

      this._parent && abs.concat(this._parent._absoluteMatrix);

      this._ts_matrix = ++iid;

      return abs;
    };

    Pin.prototype.relativeMatrix = function() {
      this._update();
      var ts = Math.max(this._ts_transform, this._ts_translate,
          this._parent ? this._parent._ts_transform : 0);
      if (this._mo_rel == ts) {
        return this._relativeMatrix;
      }
      this._mo_rel = ts;

      var rel = this._relativeMatrix;

      rel.identity();
      if (this._pivoted) {
        rel.translate(-this._pivotX * this._width, -this._pivotY * this._height);
      }
      rel.scale(this._scaleX, this._scaleY);
      rel.skew(this._skewX, this._skewY);
      rel.rotate(this._rotation);
      if (this._pivoted) {
        rel.translate(this._pivotX * this._width, this._pivotY * this._height);
      }

      // calculate effective box
      if (this._pivoted) {
        // origin
        this._boxX = 0;
        this._boxY = 0;
        this._boxWidth = this._width;
        this._boxHeight = this._height;

      } else {
        // aabb
        var p, q;
        if (rel.a > 0 && rel.c > 0 || rel.a < 0 && rel.c < 0) {
          p = 0, q = rel.a * this._width + rel.c * this._height;
        } else {
          p = rel.a * this._width, q = rel.c * this._height;
        }
        if (p > q) {
          this._boxX = q;
          this._boxWidth = p - q;
        } else {
          this._boxX = p;
          this._boxWidth = q - p;
        }
        if (rel.b > 0 && rel.d > 0 || rel.b < 0 && rel.d < 0) {
          p = 0, q = rel.b * this._width + rel.d * this._height;
        } else {
          p = rel.b * this._width, q = rel.d * this._height;
        }
        if (p > q) {
          this._boxY = q;
          this._boxHeight = p - q;
        } else {
          this._boxY = p;
          this._boxHeight = q - p;
        }
      }

      this._x = this._offsetX;
      this._y = this._offsetY;

      this._x -= this._boxX + this._handleX * this._boxWidth;
      this._y -= this._boxY + this._handleY * this._boxHeight;

      if (this._aligned && this._parent) {
        this._parent.relativeMatrix();
        this._x += this._alignX * this._parent._width;
        this._y += this._alignY * this._parent._height;
      }

      rel.translate(this._x, this._y);

      return this._relativeMatrix;
    };

    Pin.prototype.get = function(key) {
      if (typeof getters[key] === 'function') {
        return getters[key](this);
      }
    };

    // TODO: Use defineProperty instead? What about multi-field pinning?
    Pin.prototype.set = function(a, b) {
      if (typeof a === 'string') {
        if (typeof setters[a] === 'function' && typeof b !== 'undefined') {
          setters[a](this, b);
        }
      } else if (typeof a === 'object') {
        for (b in a) {
          if (typeof setters[b] === 'function' && typeof a[b] !== 'undefined') {
            setters[b](this, a[b], a);
          }
        }
      }
      if (this._owner) {
        this._owner._ts_pin = ++iid;
        this._owner.touch();
      }
      return this;
    };

    var getters = {
      alpha : function(pin) {
        return pin._alpha;
      },

      textureAlpha : function(pin) {
        return pin._textureAlpha;
      },

      width : function(pin) {
        return pin._width;
      },

      height : function(pin) {
        return pin._height;
      },

      boxWidth : function(pin) {
        return pin._boxWidth;
      },

      boxHeight : function(pin) {
        return pin._boxHeight;
      },

      // scale : function(pin) {
      // },

      scaleX : function(pin) {
        return pin._scaleX;
      },

      scaleY : function(pin) {
        return pin._scaleY;
      },

      // skew : function(pin) {
      // },

      skewX : function(pin) {
        return pin._skewX;
      },

      skewY : function(pin) {
        return pin._skewY;
      },

      rotation : function(pin) {
        return pin._rotation;
      },

      // pivot : function(pin) {
      // },

      pivotX : function(pin) {
        return pin._pivotX;
      },

      pivotY : function(pin) {
        return pin._pivotY;
      },

      // offset : function(pin) {
      // },

      offsetX : function(pin) {
        return pin._offsetX;
      },

      offsetY : function(pin) {
        return pin._offsetY;
      },

      // align : function(pin) {
      // },

      alignX : function(pin) {
        return pin._alignX;
      },

      alignY : function(pin) {
        return pin._alignY;
      },

      // handle : function(pin) {
      // },

      handleX : function(pin) {
        return pin._handleX;
      },

      handleY : function(pin) {
        return pin._handleY;
      }
    };

    var setters = {
      alpha : function(pin, value) {
        pin._alpha = value;
      },

      textureAlpha : function(pin, value) {
        pin._textureAlpha = value;
      },

      width : function(pin, value) {
        pin._width_ = value;
        pin._width = value;
        pin._ts_transform = ++iid;
      },

      height : function(pin, value) {
        pin._height_ = value;
        pin._height = value;
        pin._ts_transform = ++iid;
      },

      scale : function(pin, value) {
        pin._scaleX = value;
        pin._scaleY = value;
        pin._ts_transform = ++iid;
      },

      scaleX : function(pin, value) {
        pin._scaleX = value;
        pin._ts_transform = ++iid;
      },

      scaleY : function(pin, value) {
        pin._scaleY = value;
        pin._ts_transform = ++iid;
      },

      skew : function(pin, value) {
        pin._skewX = value;
        pin._skewY = value;
        pin._ts_transform = ++iid;
      },

      skewX : function(pin, value) {
        pin._skewX = value;
        pin._ts_transform = ++iid;
      },

      skewY : function(pin, value) {
        pin._skewY = value;
        pin._ts_transform = ++iid;
      },

      rotation : function(pin, value) {
        pin._rotation = value;
        pin._ts_transform = ++iid;
      },

      pivot : function(pin, value) {
        pin._pivotX = value;
        pin._pivotY = value;
        pin._pivoted = true;
        pin._ts_transform = ++iid;
      },

      pivotX : function(pin, value) {
        pin._pivotX = value;
        pin._pivoted = true;
        pin._ts_transform = ++iid;
      },

      pivotY : function(pin, value) {
        pin._pivotY = value;
        pin._pivoted = true;
        pin._ts_transform = ++iid;
      },

      offset : function(pin, value) {
        pin._offsetX = value;
        pin._offsetY = value;
        pin._ts_translate = ++iid;
      },

      offsetX : function(pin, value) {
        pin._offsetX = value;
        pin._ts_translate = ++iid;
      },

      offsetY : function(pin, value) {
        pin._offsetY = value;
        pin._ts_translate = ++iid;
      },

      align : function(pin, value) {
        this.alignX(pin, value);
        this.alignY(pin, value);
      },

      alignX : function(pin, value) {
        pin._alignX = value;
        pin._aligned = true;
        pin._ts_translate = ++iid;

        this.handleX(pin, value);
      },

      alignY : function(pin, value) {
        pin._alignY = value;
        pin._aligned = true;
        pin._ts_translate = ++iid;

        this.handleY(pin, value);
      },

      handle : function(pin, value) {
        this.handleX(pin, value);
        this.handleY(pin, value);
      },

      handleX : function(pin, value) {
        pin._handleX = value;
        pin._handled = true;
        pin._ts_translate = ++iid;
      },

      handleY : function(pin, value) {
        pin._handleY = value;
        pin._handled = true;
        pin._ts_translate = ++iid;
      },

      resizeMode : function(pin, value, all) {
        if (all) {
          if (value == 'in') {
            value = 'in-pad';
          } else if (value == 'out') {
            value = 'out-crop';
          }
          scaleTo(pin, all.resizeWidth, all.resizeHeight, value);
        }
      },

      resizeWidth : function(pin, value, all) {
        if (!all || !all.resizeMode) {
          scaleTo(pin, value, null);
        }
      },

      resizeHeight : function(pin, value, all) {
        if (!all || !all.resizeMode) {
          scaleTo(pin, null, value);
        }
      },

      scaleMode : function(pin, value, all) {
        if (all) {
          scaleTo(pin, all.scaleWidth, all.scaleHeight, value);
        }
      },

      scaleWidth : function(pin, value, all) {
        if (!all || !all.scaleMode) {
          scaleTo(pin, value, null);
        }
      },

      scaleHeight : function(pin, value, all) {
        if (!all || !all.scaleMode) {
          scaleTo(pin, null, value);
        }
      },

      matrix : function(pin, value) {
        this.scaleX(pin, value.a);
        this.skewX(pin, value.c / value.d);
        this.skewY(pin, value.b / value.a);
        this.scaleY(pin, value.d);
        this.offsetX(pin, value.e);
        this.offsetY(pin, value.f);
        this.rotation(pin, 0);
      }
    };

    function scaleTo(pin, width, height, mode) {
      var w = typeof width === 'number';
      var h = typeof height === 'number';
      var m = typeof mode === 'string';
      pin._ts_transform = ++iid;
      if (w) {
        pin._scaleX = width / pin._width_;
        pin._width = pin._width_;
      }
      if (h) {
        pin._scaleY = height / pin._height_;
        pin._height = pin._height_;
      }
      if (w && h && m) {
        if (mode == 'out' || mode == 'out-crop') {
          pin._scaleX = pin._scaleY = Math.max(pin._scaleX, pin._scaleY);
        } else if (mode == 'in' || mode == 'in-pad') {
          pin._scaleX = pin._scaleY = Math.min(pin._scaleX, pin._scaleY);
        }
        if (mode == 'out-crop' || mode == 'in-pad') {
          pin._width = width / pin._scaleX;
          pin._height = height / pin._scaleY;
        }
      }
    }
    core.prototype.scaleTo = function(a, b, c) {
      if (typeof a === 'object')
        c = b, b = a.y, a = a.x;
      scaleTo(this._pin, a, b, c);
      return this;
    };

    // Used by Tween class
    Pin._add_shortcuts = function(Class) {
      Class.prototype.size = function(w, h) {
        this.pin('width', w);
        this.pin('height', h);
        return this;
      };

      Class.prototype.width = function(w) {
        if (typeof w === 'undefined') {
          return this.pin('width');
        }
        this.pin('width', w);
        return this;
      };

      Class.prototype.height = function(h) {
        if (typeof h === 'undefined') {
          return this.pin('height');
        }
        this.pin('height', h);
        return this;
      };

      Class.prototype.offset = function(a, b) {
        if (typeof a === 'object')
          b = a.y, a = a.x;
        this.pin('offsetX', a);
        this.pin('offsetY', b);
        return this;
      };

      Class.prototype.rotate = function(a) {
        this.pin('rotation', a);
        return this;
      };

      Class.prototype.skew = function(a, b) {
        if (typeof a === 'object')
          b = a.y, a = a.x;
        else if (typeof b === 'undefined')
          b = a;
        this.pin('skewX', a);
        this.pin('skewY', b);
        return this;
      };

      Class.prototype.scale = function(a, b) {
        if (typeof a === 'object')
          b = a.y, a = a.x;
        else if (typeof b === 'undefined')
          b = a;
        this.pin('scaleX', a);
        this.pin('scaleY', b);
        return this;
      };

      Class.prototype.alpha = function(a, ta) {
        this.pin('alpha', a);
        if (typeof ta !== 'undefined') {
          this.pin('textureAlpha', ta);
        }
        return this;
      };
    };

    Pin._add_shortcuts(core);

    var pin = Pin;

    core.prototype._textures = null;
    core.prototype._alpha = 1;

    core.prototype.render = function(context) {
      if (!this._visible) {
        return;
      }
      stats.node++;

      var m = this.matrix();
      context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);

      // move this elsewhere!
      this._alpha = this._pin._alpha * (this._parent ? this._parent._alpha : 1);
      var alpha = this._pin._textureAlpha * this._alpha;

      if (context.globalAlpha != alpha) {
        context.globalAlpha = alpha;
      }

      if (this._textures !== null) {
        for (var i = 0, n = this._textures.length; i < n; i++) {
          this._textures[i].draw(context);
        }
      }

      if (context.globalAlpha != this._alpha) {
        context.globalAlpha = this._alpha;
      }

      var child, next = this._first;
      while (child = next) {
        next = child._next;
        child.render(context);
      }
    };

    core.prototype._tickBefore = null;
    core.prototype._tickAfter = null;
    core.prototype.MAX_ELAPSE = Infinity;

    core.prototype._tick = function(elapsed, now, last) {
      if (!this._visible) {
        return;
      }

      if (elapsed > this.MAX_ELAPSE) {
        elapsed = this.MAX_ELAPSE;
      }

      var ticked = false;

      if (this._tickBefore !== null) {
        for (var i = 0; i < this._tickBefore.length; i++) {
          stats.tick++;
          var tickFn = this._tickBefore[i];
          ticked = tickFn.call(this, elapsed, now, last) === true || ticked;
        }
      }

      var child, next = this._first;
      while (child = next) {
        next = child._next;
        if (child._flag('_tick')) {
          ticked = child._tick(elapsed, now, last) === true ? true : ticked;
        }
      }

      if (this._tickAfter !== null) {
        for (var i = 0; i < this._tickAfter.length; i++) {
          stats.tick++;
          var tickFn = this._tickAfter[i];
          ticked = tickFn.call(this, elapsed, now, last) === true || ticked;
        }
      }

      return ticked;
    };

    core.prototype.tick = function(ticker, before) {
      if (typeof ticker !== 'function') {
        return;
      }
      if (before) {
        if (this._tickBefore === null) {
          this._tickBefore = [];
        }
        this._tickBefore.push(ticker);
      } else {
        if (this._tickAfter === null) {
          this._tickAfter = [];
        }
        this._tickAfter.push(ticker);
      }
      this._flag('_tick', this._tickAfter !== null && this._tickAfter.length > 0
          || this._tickBefore !== null && this._tickBefore.length > 0);
    };

    core.prototype.untick = function(ticker) {
      if (typeof ticker !== 'function') {
        return;
      }
      var i;
      if (this._tickBefore !== null && (i = this._tickBefore.indexOf(ticker)) >= 0) {
        this._tickBefore.splice(i, 1);
      }
      if (this._tickAfter !== null && (i = this._tickAfter.indexOf(ticker)) >= 0) {
        this._tickAfter.splice(i, 1);
      }
    };

    core.prototype.timeout = function(fn, time) {
      this.setTimeout(fn, time);
    };

    core.prototype.setTimeout = function(fn, time) {
      function timer(t) {
        if ((time -= t) < 0) {
          this.untick(timer);
          fn.call(this);
        } else {
          return true;
        }
      }
      this.tick(timer);
      return timer;
    };

    core.prototype.clearTimeout = function(timer) {
      this.untick(timer);
    };

    Root._super = core;
    Root.prototype = create(Root._super.prototype);

    core.root = function(request, render) {
      return new Root(request, render);
    };

    function Root(request, render) {
      Root._super.call(this);
      this.label('Root');

      var paused = true;
      var stopped = true;

      var self = this;
      var lastTime = 0;
      var loop = function(now) {
        if (paused === true || stopped === true) {
          return;
        }

        stats.tick = stats.node = stats.draw = 0;

        var last = lastTime || now;
        var elapsed = now - last;
        lastTime = now;

        var ticked = self._tick(elapsed, now, last);
        if (self._mo_touch != self._ts_touch) {
          self._mo_touch = self._ts_touch;
          render(self);
          request(loop);
        } else if (ticked) {
          request(loop);
        } else {
          paused = true;
        }

        stats.fps = elapsed ? 1000 / elapsed : 0;
      };

      this.start = function() {
        stopped = false;
        return this.resume();
      };

      this.resume = function() {
        if (paused) {
          this.publish('resume');
          paused = false;
          request(loop);
        }
        return this;
      };

      this.pause = function() {
        if (!paused) {
          this.publish('pause');
        }
        paused = true;
        return this;
      };

      this.touch_root = this.touch;
      this.touch = function() {
        this.resume();
        return this.touch_root();
      };
      this.stop = function() {
        stopped = true;
        return this;
      };
    }
    Root.prototype.background = function(color) {
      // to be implemented by loaders
      return this;
    };

    Root.prototype.viewport = function(width, height, ratio) {
      if (typeof width === 'undefined') {
        return extend({}, this._viewport);
      }
      this._viewport = {
        width : width,
        height : height,
        ratio : ratio || 1
      };
      this.viewbox();
      var data = extend({}, this._viewport);
      this.visit({
        start : function(node) {
          if (!node._flag('viewport')) {
            return true;
          }
          node.publish('viewport', [ data ]);
        }
      });
      return this;
    };

    // TODO: static/fixed viewbox
    Root.prototype.viewbox = function(width, height, mode) {
      if (typeof width === 'number' && typeof height === 'number') {
        this._viewbox = {
          width : width,
          height : height,
          mode : /^(in|out|in-pad|out-crop)$/.test(mode) ? mode : 'in-pad'
        };
      }

      var box = this._viewbox;
      var size = this._viewport;
      if (size && box) {
        this.pin({
          width : box.width,
          height : box.height
        });
        this.scaleTo(size.width, size.height, box.mode);
      } else if (size) {
        this.pin({
          width : size.width,
          height : size.height
        });
      }

      return this;
    };

    var lib = core;
    var Matrix = matrix;
    var Texture = texture;
    lib.Matrix = Matrix;
    lib.Texture = Texture;

    core.canvas = function(type, attributes, drawFn) {
      if (typeof type === 'string') {
        if (typeof attributes === 'object') ; else {
          if (typeof attributes === 'function') {
            drawFn = attributes;
          }
          attributes = {};
        }
      } else {
        if (typeof type === 'function') {
          drawFn = type;
        }
        attributes = {};
        type = '2d';
      }

      var canvas = document.createElement('canvas');
      var context = canvas.getContext(type, attributes);
      var texture$1 = new texture(canvas);

      texture$1.context = function() {
        return context;
      };

      texture$1.size = function(width, height, ratio) {
        ratio = ratio || 1;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        this.src(canvas, ratio);
        return this;
      };

      texture$1.canvas = function(fn) {
        if (typeof fn === 'function') {
          fn.call(this, context);
        } else if (typeof fn === 'undefined' && typeof drawFn === 'function') {
          drawFn.call(this, context);
        }
        return this;
      };

      if (typeof drawFn === 'function') {
        drawFn.call(texture$1, context);
      }

      return texture$1;
    };

    var repeat = function(img, owidth, oheight, stretch, inner, insert) {

      var width = img.width;
      var height = img.height;
      var left = img.left;
      var right = img.right;
      var top = img.top;
      var bottom = img.bottom;

      left = typeof left === 'number' && left === left ? left : 0;
      right = typeof right === 'number' && right === right ? right : 0;
      top = typeof top === 'number' && top === top ? top : 0;
      bottom = typeof bottom === 'number' && bottom === bottom ? bottom : 0;

      width = width - left - right;
      height = height - top - bottom;

      if (!inner) {
        owidth = Math.max(owidth - left - right, 0);
        oheight = Math.max(oheight - top - bottom, 0);
      }

      var i = 0;

      if (top > 0 && left > 0)
        insert(i++, 0, 0, left, top, 0, 0, left, top);
      if (bottom > 0 && left > 0)
        insert(i++, 0, height + top, left, bottom, 0, oheight + top, left, bottom);
      if (top > 0 && right > 0)
        insert(i++, width + left, 0, right, top, owidth + left, 0, right, top);
      if (bottom > 0 && right > 0)
        insert(i++, width + left, height + top, right, bottom, owidth + left,
            oheight + top, right, bottom);

      if (stretch) {
        if (top > 0)
          insert(i++, left, 0, width, top, left, 0, owidth, top);
        if (bottom > 0)
          insert(i++, left, height + top, width, bottom, left, oheight + top,
              owidth, bottom);
        if (left > 0)
          insert(i++, 0, top, left, height, 0, top, left, oheight);
        if (right > 0)
          insert(i++, width + left, top, right, height, owidth + left, top, right,
              oheight);
        // center
        insert(i++, left, top, width, height, left, top, owidth, oheight);

      } else { // tile
        var l = left, r = owidth, w;
        while (r > 0) {
          w = Math.min(width, r), r -= width;
          var t = top, b = oheight, h;
          while (b > 0) {
            h = Math.min(height, b), b -= height;
            insert(i++, left, top, w, h, l, t, w, h);
            if (r <= 0) {
              if (left)
                insert(i++, 0, top, left, h, 0, t, left, h);
              if (right)
                insert(i++, width + left, top, right, h, l + w, t, right, h);
            }
            t += h;
          }
          if (top)
            insert(i++, left, 0, w, top, l, 0, w, top);
          if (bottom)
            insert(i++, left, height + top, w, bottom, l, t, w, bottom);
          l += w;
        }
      }

      return i;
    };

    var image = Image$1;

    core.image = function(image) {
      var img = new Image$1();
      image && img.image(image);
      return img;
    };

    Image$1._super = core;
    Image$1.prototype = create(Image$1._super.prototype);

    function Image$1() {
      Image$1._super.call(this);
      this.label('Image');
      this._textures = [];
      this._image = null;
    }
    /**
     * @deprecated Use image
     */
    Image$1.prototype.setImage = function(a, b, c) {
      return this.image(a, b, c);
    };

    Image$1.prototype.image = function(image) {
      this._image = core.texture(image).one();
      this.pin('width', this._image ? this._image.width : 0);
      this.pin('height', this._image ? this._image.height : 0);
      this._textures[0] = this._image.pipe();
      this._textures.length = 1;
      return this;
    };

    Image$1.prototype.tile = function(inner) {
      this._repeat(false, inner);
      return this;
    };

    Image$1.prototype.stretch = function(inner) {
      this._repeat(true, inner);
      return this;
    };

    Image$1.prototype._repeat = function(stretch, inner) {
      var self = this;
      this.untick(this._repeatTicker);
      this.tick(this._repeatTicker = function() {
        if (this._mo_stretch == this._pin._ts_transform) {
          return;
        }
        this._mo_stretch = this._pin._ts_transform;
        var width = this.pin('width');
        var height = this.pin('height');
        this._textures.length = repeat(this._image, width, height, stretch, inner,
            insert);
      });

      function insert(i, sx, sy, sw, sh, dx, dy, dw, dh) {
        var repeat = self._textures.length > i ? self._textures[i]
            : self._textures[i] = self._image.pipe();
        repeat.src(sx, sy, sw, sh);
        repeat.dest(dx, dy, dw, dh);
      }
    };

    core.anim = function(frames, fps) {
      var anim = new Anim();
      anim.frames(frames).gotoFrame(0);
      fps && anim.fps(fps);
      return anim;
    };

    Anim._super = core;
    Anim.prototype = create(Anim._super.prototype);

    // TODO: replace with atlas fps or texture time
    core.Anim = {
      FPS : 15
    };

    function Anim() {
      Anim._super.call(this);
      this.label('Anim');

      this._textures = [];

      this._fps = core.Anim.FPS;
      this._ft = 1000 / this._fps;

      this._time = -1;
      this._repeat = 0;

      this._index = 0;
      this._frames = [];

      var lastTime = 0;
      this.tick(function(t, now, last) {
        if (this._time < 0 || this._frames.length <= 1) {
          return;
        }

        // ignore old elapsed
        var ignore = lastTime != last;
        lastTime = now;
        if (ignore) {
          return true;
        }

        this._time += t;
        if (this._time < this._ft) {
          return true;
        }
        var n = this._time / this._ft | 0;
        this._time -= n * this._ft;
        this.moveFrame(n);
        if (this._repeat > 0 && (this._repeat -= n) <= 0) {
          this.stop();
          this._callback && this._callback();
          return false;
        }
        return true;
      }, false);
    }
    Anim.prototype.fps = function(fps) {
      if (typeof fps === 'undefined') {
        return this._fps;
      }
      this._fps = fps > 0 ? fps : core.Anim.FPS;
      this._ft = 1000 / this._fps;
      return this;
    };

    /**
     * @deprecated Use frames
     */
    Anim.prototype.setFrames = function(a, b, c) {
      return this.frames(a, b, c);
    };

    Anim.prototype.frames = function(frames) {
      this._index = 0;
      this._frames = core.texture(frames).array();
      this.touch();
      return this;
    };

    Anim.prototype.length = function() {
      return this._frames ? this._frames.length : 0;
    };

    Anim.prototype.gotoFrame = function(frame, resize) {
      this._index = math.rotate(frame, this._frames.length) | 0;
      resize = resize || !this._textures[0];
      this._textures[0] = this._frames[this._index];
      if (resize) {
        this.pin('width', this._textures[0].width);
        this.pin('height', this._textures[0].height);
      }
      this.touch();
      return this;
    };

    Anim.prototype.moveFrame = function(move) {
      return this.gotoFrame(this._index + move);
    };

    Anim.prototype.repeat = function(repeat, callback) {
      this._repeat = repeat * this._frames.length - 1;
      this._callback = callback;
      this.play();
      return this;
    };

    Anim.prototype.play = function(frame) {
      if (typeof frame !== 'undefined') {
        this.gotoFrame(frame);
        this._time = 0;
      } else if (this._time < 0) {
        this._time = 0;
      }

      this.touch();
      return this;
    };

    Anim.prototype.stop = function(frame) {
      this._time = -1;
      if (typeof frame !== 'undefined') {
        this.gotoFrame(frame);
      }
      return this;
    };

    core.string = function(frames) {
      return new Str().frames(frames);
    };

    Str._super = core;
    Str.prototype = create(Str._super.prototype);

    function Str() {
      Str._super.call(this);
      this.label('String');
      this._textures = [];
    }
    /**
     * @deprecated Use frames
     */
    Str.prototype.setFont = function(a, b, c) {
      return this.frames(a, b, c);
    };

    Str.prototype.frames = function(frames) {
      this._textures = [];
      if (typeof frames == 'string') {
        frames = core.texture(frames);
        this._item = function(value) {
          return frames.one(value);
        };
      } else if (typeof frames === 'object') {
        this._item = function(value) {
          return frames[value];
        };
      } else if (typeof frames === 'function') {
        this._item = frames;
      }
      return this;
    };

    /**
     * @deprecated Use value
     */
    Str.prototype.setValue = function(a, b, c) {
      return this.value(a, b, c);
    };

    Str.prototype.value = function(value) {
      if (typeof value === 'undefined') {
        return this._value;
      }
      if (this._value === value) {
        return this;
      }
      this._value = value;

      if (value === null) {
        value = '';
      } else if (typeof value !== 'string' && !is_1.array(value)) {
        value = value.toString();
      }

      this._spacing = this._spacing || 0;

      var width = 0, height = 0;
      for (var i = 0; i < value.length; i++) {
        var image = this._textures[i] = this._item(value[i]);
        width += i > 0 ? this._spacing : 0;
        image.dest(width, 0);
        width = width + image.width;
        height = Math.max(height, image.height);
      }
      this.pin('width', width);
      this.pin('height', height);
      this._textures.length = value.length;
      return this;
    };

    core.row = function(align) {
      return core.create().row(align).label('Row');
    };

    core.prototype.row = function(align) {
      this.sequence('row', align);
      return this;
    };

    core.column = function(align) {
      return core.create().column(align).label('Row');
    };

    core.prototype.column = function(align) {
      this.sequence('column', align);
      return this;
    };

    core.sequence = function(type, align) {
      return core.create().sequence(type, align).label('Sequence');
    };

    core.prototype.sequence = function(type, align) {

      this._padding = this._padding || 0;
      this._spacing = this._spacing || 0;

      this.untick(this._layoutTiker);
      this.tick(this._layoutTiker = function() {
        if (this._mo_seq == this._ts_touch) {
          return;
        }
        this._mo_seq = this._ts_touch;

        var alignChildren = (this._mo_seqAlign != this._ts_children);
        this._mo_seqAlign = this._ts_children;

        var width = 0, height = 0;

        var child, next = this.first(true);
        var first = true;
        while (child = next) {
          next = child.next(true);

          child.matrix(true);
          var w = child.pin('boxWidth');
          var h = child.pin('boxHeight');

          if (type == 'column') {
            !first && (height += this._spacing);
            child.pin('offsetY') != height && child.pin('offsetY', height);
            width = Math.max(width, w);
            height = height + h;
            alignChildren && child.pin('alignX', align);

          } else if (type == 'row') {
            !first && (width += this._spacing);
            child.pin('offsetX') != width && child.pin('offsetX', width);
            width = width + w;
            height = Math.max(height, h);
            alignChildren && child.pin('alignY', align);
          }
          first = false;
        }
        width += 2 * this._padding;
        height += 2 * this._padding;
        this.pin('width') != width && this.pin('width', width);
        this.pin('height') != height && this.pin('height', height);
      });
      return this;
    };

    core.box = function() {
      return core.create().box().label('Box');
    };

    core.prototype.box = function() {
      this._padding = this._padding || 0;

      this.untick(this._layoutTiker);
      this.tick(this._layoutTiker = function() {
        if (this._mo_box == this._ts_touch) {
          return;
        }
        this._mo_box = this._ts_touch;

        var width = 0, height = 0;
        var child, next = this.first(true);
        while (child = next) {
          next = child.next(true);
          child.matrix(true);
          var w = child.pin('boxWidth');
          var h = child.pin('boxHeight');
          width = Math.max(width, w);
          height = Math.max(height, h);
        }
        width += 2 * this._padding;
        height += 2 * this._padding;
        this.pin('width') != width && this.pin('width', width);
        this.pin('height') != height && this.pin('height', height);
      });
      return this;
    };

    core.layer = function() {
      return core.create().layer().label('Layer');
    };

    core.prototype.layer = function() {

      this.untick(this._layoutTiker);
      this.tick(this._layoutTiker = function() {
        var parent = this.parent();
        if (parent) {
          var width = parent.pin('width');
          if (this.pin('width') != width) {
            this.pin('width', width);
          }
          var height = parent.pin('height');
          if (this.pin('height') != height) {
            this.pin('height', height);
          }
        }
      }, true);
      return this;
    };

    // TODO: move padding to pin
    core.prototype.padding = function(pad) {
      this._padding = pad;
      return this;
    };

    core.prototype.spacing = function(space) {
      this._spacing = space;
      return this;
    };

    function _identity(x) {
      return x;
    }var _cache = {};
    var _modes = {};
    var _easings = {};

    function Easing(token) {
      if (typeof token === 'function') {
        return token;
      }
      if (typeof token !== 'string') {
        return _identity;
      }
      var fn = _cache[token];
      if (fn) {
        return fn;
      }
      var match = /^(\w+)(-(in|out|in-out|out-in))?(\((.*)\))?$/i.exec(token);
      if (!match || !match.length) {
        return _identity;
      }
      var easing = _easings[match[1]];
      var mode = _modes[match[3]];
      var params = match[5];
      if (easing && easing.fn) {
        fn = easing.fn;
      } else if (easing && easing.fc) {
        fn = easing.fc.apply(easing.fc, params
            && params.replace(/\s+/, '').split(','));
      } else {
        fn = _identity;
      }
      if (mode) {
        fn = mode.fn(fn);
      }
      // TODO: It can be a memory leak with different `params`.
      _cache[token] = fn;
      return fn;
    }
    Easing.add = function(data) {
      // TODO: create a map of all { name-mode : data }
      var names = (data.name || data.mode).split(/\s+/);
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        if (name) {
          (data.name ? _easings : _modes)[name] = data;
        }
      }
    };

    Easing.add({
      mode : 'in',
      fn : function(f) {
        return f;
      }
    });

    Easing.add({
      mode : 'out',
      fn : function(f) {
        return function(t) {
          return 1 - f(1 - t);
        };
      }
    });

    Easing.add({
      mode : 'in-out',
      fn : function(f) {
        return function(t) {
          return (t < 0.5) ? (f(2 * t) / 2) : (1 - f(2 * (1 - t)) / 2);
        };
      }
    });

    Easing.add({
      mode : 'out-in',
      fn : function(f) {
        return function(t) {
          return (t < 0.5) ? (1 - f(2 * (1 - t)) / 2) : (f(2 * t) / 2);
        };
      }
    });

    Easing.add({
      name : 'linear',
      fn : function(t) {
        return t;
      }
    });

    Easing.add({
      name : 'quad',
      fn : function(t) {
        return t * t;
      }
    });

    Easing.add({
      name : 'cubic',
      fn : function(t) {
        return t * t * t;
      }
    });

    Easing.add({
      name : 'quart',
      fn : function(t) {
        return t * t * t * t;
      }
    });

    Easing.add({
      name : 'quint',
      fn : function(t) {
        return t * t * t * t * t;
      }
    });

    Easing.add({
      name : 'sin sine',
      fn : function(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      }
    });

    Easing.add({
      name : 'exp expo',
      fn : function(t) {
        return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
      }
    });

    Easing.add({
      name : 'circle circ',
      fn : function(t) {
        return 1 - Math.sqrt(1 - t * t);
      }
    });

    Easing.add({
      name : 'bounce',
      fn : function(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625
            * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625
            * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t
            + .984375;
      }
    });

    Easing.add({
      name : 'poly',
      fc : function(e) {
        return function(t) {
          return Math.pow(t, e);
        };
      }
    });

    Easing.add({
      name : 'elastic',
      fc : function(a, p) {
        p = p || 0.45;
        a = a || 1;
        var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return function(t) {
          return 1 + a * Math.pow(2, -10 * t)
              * Math.sin((t - s) * (2 * Math.PI) / p);
        };
      }
    });

    Easing.add({
      name : 'back',
      fc : function(s) {
        s = typeof s !== 'undefined' ? s : 1.70158;
        return function(t) {
          return t * t * ((s + 1) * t - s);
        };
      }
    });

    var easing = Easing;

    core.prototype.tween = function(duration, delay, append) {
      if (typeof duration !== 'number') {
        append = duration, delay = 0, duration = 0;
      } else if (typeof delay !== 'number') {
        append = delay, delay = 0;
      }

      if (!this._tweens) {
        this._tweens = [];
        var ticktime = 0;
        this.tick(function(elapsed, now, last) {
          if (!this._tweens.length) {
            return;
          }

          // ignore old elapsed
          var ignore = ticktime != last;
          ticktime = now;
          if (ignore) {
            return true;
          }

          var head = this._tweens[0];

          var next = head.tick(this, elapsed, now, last);

          if (next && head === this._tweens[0]) {
            this._tweens.shift();
          }

          if (Array.isArray(next)) {
            for (var i = 0; i < next.length; i++) {
              try {
                next[i].call(this);
              } catch (e) {
                console.log(e);
              }
            }
          } else if (typeof next === 'object') {
            this._tweens.unshift(next);
          }

          return true;
        }, true);
      }

      this.touch();
      if (!append) {
        this._tweens.length = 0;
      }
      var tween = new Tween(this, duration, delay);
      this._tweens.push(tween);
      return tween;
    };

    function Tween(owner, duration, delay) {
      this._end = {};
      this._duration = duration || 400;
      this._delay = delay || 0;

      this._owner = owner;
      this._time = 0;
    }
    Tween.prototype.tick = function(node, elapsed, now, last) {
      this._time += elapsed;

      if (this._time < this._delay) {
        return;
      }

      var time = this._time - this._delay;

      if (!this._start) {
        this._start = {};
        for ( var key in this._end) {
          this._start[key] = this._owner.pin(key);
        }
      }

      var p, over;
      if (time < this._duration) {
        p = time / this._duration;
        over = false;
      } else {
        p = 1;
        over = true;
      }

      if (typeof this._easing == 'function') {
        p = this._easing(p);
      }

      var q = 1 - p;

      for ( var key in this._end) {
        this._owner.pin(key, this._start[key] * q + this._end[key] * p);
      }

      if (over) {
        var actions = [this._hide, this._remove, this._done];
        actions = actions.filter(function( element ) {
          return typeof element === 'function';
        });
        return this._next || actions;
      }
    };

    Tween.prototype.tween = function(duration, delay) {
      return this._next = new Tween(this._owner, duration, delay);
    };

    Tween.prototype.duration = function(duration) {
      this._duration = duration;
      return this;
    };

    Tween.prototype.delay = function(delay) {
      this._delay = delay;
      return this;
    };

    Tween.prototype.ease = function(easing$1) {
      this._easing = easing(easing$1);
      return this;
    };

    Tween.prototype.done = function(fn) {
      this._done = fn;
      return this;
    };

    Tween.prototype.hide = function() {
      this._hide = function() {
        this.hide();
      };
      return this;
    };

    Tween.prototype.remove = function() {
      this._remove = function() {
        this.remove();
      };
      return this;
    };

    Tween.prototype.pin = function(a, b) {
      if (typeof a === 'object') {
        for ( var attr in a) {
          pinning(this._owner, this._end, attr, a[attr]);
        }
      } else if (typeof b !== 'undefined') {
        pinning(this._owner, this._end, a, b);
      }
      return this;
    };

    function pinning(node, map, key, value) {
      if (typeof node.pin(key) === 'number') {
        map[key] = value;
      } else if (typeof node.pin(key + 'X') === 'number'
          && typeof node.pin(key + 'Y') === 'number') {
        map[key + 'X'] = value;
        map[key + 'Y'] = value;
      }
    }

    pin._add_shortcuts(Tween);

    /**
     * @deprecated Use .done(fn) instead.
     */
    Tween.prototype.then = function(fn) {
      this.done(fn);
      return this;
    };

    /**
     * @deprecated NOOP
     */
    Tween.prototype.clear = function(forward) {
      return this;
    };

    core._load(function(stage, elem) {
      Mouse.subscribe(stage, elem);
    });

    // TODO: capture mouse

    Mouse.CLICK = 'click';
    Mouse.START = 'touchstart mousedown';
    Mouse.MOVE = 'touchmove mousemove';
    Mouse.END = 'touchend mouseup';
    Mouse.CANCEL = 'touchcancel mousecancel';

    Mouse.subscribe = function(stage, elem) {
      if (stage.mouse) {
        return;
      }

      stage.mouse = new Mouse(stage, elem);

      // `click` events are synthesized from start/end events on same nodes
      // `mousecancel` events are synthesized on blur or mouseup outside element

      elem.addEventListener('touchstart', handleStart);
      elem.addEventListener('touchend', handleEnd);
      elem.addEventListener('touchmove', handleMove);
      elem.addEventListener('touchcancel', handleCancel);

      elem.addEventListener('mousedown', handleStart);
      elem.addEventListener('mouseup', handleEnd);
      elem.addEventListener('mousemove', handleMove);

      document.addEventListener('mouseup', handleCancel);
      window.addEventListener("blur", handleCancel);

      var clicklist = [], cancellist = [];

      function handleStart(event) {
        event.preventDefault();
        stage.mouse.locate(event);
        // false && console.log('Mouse Start: ' + event.type + ' ' + mouse);
        stage.mouse.publish(event.type, event);

        stage.mouse.lookup('click', clicklist);
        stage.mouse.lookup('mousecancel', cancellist);
      }

      function handleMove(event) {
        event.preventDefault();
        stage.mouse.locate(event);
        stage.mouse.publish(event.type, event);
      }

      function handleEnd(event) {
        event.preventDefault();
        // up/end location is not available, last one is used instead
        // false && console.log('Mouse End: ' + event.type + ' ' + mouse);
        stage.mouse.publish(event.type, event);

        if (clicklist.length) {
          // false && console.log('Mouse Click: ' + clicklist.length);
          stage.mouse.publish('click', event, clicklist);
        }
        cancellist.length = 0;
      }

      function handleCancel(event) {
        if (cancellist.length) {
          // false && console.log('Mouse Cancel: ' + event.type);
          stage.mouse.publish('mousecancel', event, cancellist);
        }
        clicklist.length = 0;
      }
    };

    function Mouse(stage, elem) {
      if (!(this instanceof Mouse)) {
        // old-style mouse subscription
        return;
      }

      var ratio = stage.viewport().ratio || 1;

      stage.on('viewport', function(size) {
        ratio = size.ratio || ratio;
      });

      this.x = 0;
      this.y = 0;
      this.toString = function() {
        return (this.x | 0) + 'x' + (this.y | 0);
      };
      this.locate = function(event) {
        locateElevent(elem, event, this);
        this.x *= ratio;
        this.y *= ratio;
      };
      this.lookup = function(type, collect) {
        this.type = type;
        this.root = stage;
        this.event = null;
        collect.length = 0;
        this.collect = collect;

        this.root.visit(this.visitor, this);
      };
      this.publish = function(type, event, targets) {
        this.type = type;
        this.root = stage;
        this.event = event;
        this.collect = false;
        this.timeStamp = Date.now();

        if (targets) {
          while (targets.length)
            if (this.visitor.end(targets.shift(), this))
              break;
          targets.length = 0;
        } else {
          this.root.visit(this.visitor, this);
        }
      };
      this.visitor = {
        reverse : true,
        visible : true,
        start : function(node, mouse) {
          return !node._flag(mouse.type);
        },
        end : function(node, mouse) {
          // mouse: event/collect, type, root
          rel.raw = mouse.event;
          rel.type = mouse.type;
          rel.timeStamp = mouse.timeStamp;
          rel.abs.x = mouse.x;
          rel.abs.y = mouse.y;

          var listeners = node.listeners(mouse.type);
          if (!listeners) {
            return;
          }
          node.matrix().inverse().map(mouse, rel);
          if (!(node === mouse.root || node.attr('spy') || node.hitTest(rel))) {
            return;
          }
          if (mouse.collect) {
            mouse.collect.push(node);
          }
          if (mouse.event) {
            var cancel = false;
            for (var l = 0; l < listeners.length; l++) {
              cancel = listeners[l].call(node, rel) ? true : cancel;
            }
            return cancel;
          }
        }
      };
    }
    // TODO: define per mouse object with get-only x and y
    var rel = {}, abs = {};

    defineValue(rel, 'clone', function(obj) {
      obj = obj || {}, obj.x = this.x, obj.y = this.y;
      return obj;
    });
    defineValue(rel, 'toString', function() {
      return (this.x | 0) + 'x' + (this.y | 0) + ' (' + this.abs + ')';
    });
    defineValue(rel, 'abs', abs);
    defineValue(abs, 'clone', function(obj) {
      obj = obj || {}, obj.x = this.x, obj.y = this.y;
      return obj;
    });
    defineValue(abs, 'toString', function() {
      return (this.x | 0) + 'x' + (this.y | 0);
    });

    function defineValue(obj, name, value) {
      Object.defineProperty(obj, name, {
        value : value
      });
    }

    function locateElevent(el, ev, loc) {
      // pageX/Y if available?
      if (ev.touches && ev.touches.length) {
        loc.x = ev.touches[0].clientX;
        loc.y = ev.touches[0].clientY;
      } else {
        loc.x = ev.clientX;
        loc.y = ev.clientY;
      }
      var rect = el.getBoundingClientRect();
      loc.x -= rect.left;
      loc.y -= rect.top;
      loc.x -= el.clientLeft | 0;
      loc.y -= el.clientTop | 0;
      return loc;
    }
    var mouse = Mouse;

    /**
     * Default loader for web.
     */



    core._supported = (function() {
      var elem = document.createElement('canvas');
      return (elem.getContext && elem.getContext('2d')) ? true : false;
    })();

    window.addEventListener('load', function() {
      if (core._supported) {
        core.start();
      }
      // TODO if not supported
    }, false);

    core.config({
      'app-loader' : AppLoader,
      'image-loader' : ImageLoader
    });

    function AppLoader(app, configs) {
      configs = configs || {};
      var canvas = configs.canvas, context = null, full = false;
      var width = 0, height = 0, ratio = 1;

      if (typeof canvas === 'string') {
        canvas = document.getElementById(canvas);
      }

      if (!canvas) {
        canvas = document.getElementById('cutjs')
            || document.getElementById('stage');
      }

      if (!canvas) {
        full = true;
        canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        var body = document.body;
        body.insertBefore(canvas, body.firstChild);
      }

      context = canvas.getContext('2d');

      var devicePixelRatio = window.devicePixelRatio || 1;
      var backingStoreRatio = context.webkitBackingStorePixelRatio
          || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio
          || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      ratio = devicePixelRatio / backingStoreRatio;

      var requestAnimationFrame = window.requestAnimationFrame
          || window.msRequestAnimationFrame || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame
          || function(callback) {
            return window.setTimeout(callback, 1000 / 60);
          };
      var root = core.root(requestAnimationFrame, render);

      function render() {
        if (width > 0 && height > 0) {
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, width, height);
          root.render(context);
        }
      }

      root.background = function(color) {
        canvas.style.backgroundColor = color;
        return this;
      };

      app(root, canvas);

      // resize();
      // window.addEventListener('resize', resize, false);
      // window.addEventListener('orientationchange', resize, false);

      var lastWidth = -1;
      var lastHeight = -1;
      (function resizeLoop() {
        var width, height;
        if (full) {
          // screen.availWidth/Height?
          width = (window.innerWidth > 0 ? window.innerWidth : screen.width);
          height = (window.innerHeight > 0 ? window.innerHeight : screen.height);
        } else {
          width = canvas.clientWidth;
          height = canvas.clientHeight;
        }
        if (lastWidth !== width || lastHeight !== height) {
          lastWidth = width;
          lastHeight = height;
          resize();
        }
        requestAnimationFrame(resizeLoop);
      })();

      function resize() {

        if (full) {
          // screen.availWidth/Height?
          width = (window.innerWidth > 0 ? window.innerWidth : screen.width);
          height = (window.innerHeight > 0 ? window.innerHeight : screen.height);

          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';

        } else {
          width = canvas.clientWidth;
          height = canvas.clientHeight;
        }

        width *= ratio;
        height *= ratio;

        if (canvas.width === width && canvas.height === height) {
          return;
        }

        canvas.width = width;
        canvas.height = height;

        root.viewport(width, height, ratio);

        render();
      }
    }

    function ImageLoader(src, success, error) {
      var image = new Image();
      image.onload = function() {
        success(image);
      };
      image.onerror = error;
      image.src = src;
    }

    var web = createCommonjsModule(function (module) {
    module.exports = lib;

    module.exports.internal = {};


    module.exports.internal.Image = image;




    module.exports.Mouse = mouse;
    module.exports.Math = math;
    module.exports._extend = extend;
    module.exports._create = create;
    });

    function testbed(opts, callback) {
        if (typeof opts === 'function') {
            callback = opts;
            opts = null;
        }
        web(function (stage, canvas) {
            stage.on(web.Mouse.START, function () {
                window.focus();
                // @ts-ignore
                document.activeElement && document.activeElement.blur();
                canvas.focus();
            });
            stage.MAX_ELAPSE = 1000 / 30;
            // @ts-ignore
            var testbed = {};
            testbed.canvas = canvas;
            var paused = false;
            stage.on('resume', function () {
                paused = false;
                testbed._resume && testbed._resume();
            });
            stage.on('pause', function () {
                paused = true;
                testbed._pause && testbed._pause();
            });
            testbed.isPaused = function () {
                return paused;
            };
            testbed.togglePause = function () {
                paused ? testbed.resume() : testbed.pause();
            };
            testbed.pause = function () {
                stage.pause();
            };
            testbed.resume = function () {
                stage.resume();
                testbed.focus();
            };
            testbed.focus = function () {
                // @ts-ignore
                document.activeElement && document.activeElement.blur();
                canvas.focus();
            };
            testbed.width = 80;
            testbed.height = 60;
            testbed.x = 0;
            testbed.y = -10;
            testbed.scaleY = -1;
            testbed.ratio = 16;
            testbed.hz = 60;
            testbed.speed = 1;
            testbed.activeKeys = {};
            testbed.background = '#222222';
            testbed.findOne = function () {
                // todo: implement
                return null;
            };
            testbed.findAll = function () {
                // todo: implement
                return [];
            };
            var statusText = '';
            var statusMap = {};
            function statusSet(name, value) {
                if (typeof value !== 'function' && typeof value !== 'object') {
                    statusMap[name] = value;
                }
            }
            function statusMerge(obj) {
                // tslint:disable-next-line:no-for-in
                for (var key in obj) {
                    statusSet(key, obj[key]);
                }
            }
            testbed.status = function (a, b) {
                if (typeof b !== 'undefined') {
                    statusSet(a, b);
                }
                else if (a && typeof a === 'object') {
                    statusMerge(a);
                }
                else if (typeof a === 'string') {
                    statusText = a;
                }
                testbed._status && testbed._status(statusText, statusMap);
            };
            testbed.info = function (text) {
                testbed._info && testbed._info(text);
            };
            var lastDrawHash = "";
            var drawHash = "";
            (function () {
                var drawingTexture = new web.Texture();
                stage.append(web.image(drawingTexture));
                var buffer = [];
                stage.tick(function () {
                    buffer.length = 0;
                }, true);
                drawingTexture.draw = function (ctx) {
                    ctx.save();
                    ctx.transform(1, 0, 0, testbed.scaleY, -testbed.x, -testbed.y);
                    ctx.lineWidth = 2 / testbed.ratio;
                    ctx.lineCap = 'round';
                    for (var drawing = buffer.shift(); drawing; drawing = buffer.shift()) {
                        drawing(ctx, testbed.ratio);
                    }
                    ctx.restore();
                };
                testbed.drawPoint = function (p, r, color) {
                    buffer.push(function (ctx, ratio) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 5 / ratio, 0, 2 * Math.PI);
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    });
                    drawHash += "point" + p.x + ',' + p.y + ',' + r + ',' + color;
                };
                testbed.drawCircle = function (p, r, color) {
                    buffer.push(function (ctx) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    });
                    drawHash += "circle" + p.x + ',' + p.y + ',' + r + ',' + color;
                };
                testbed.drawSegment = function (a, b, color) {
                    buffer.push(function (ctx) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    });
                    drawHash += "segment" + a.x + ',' + a.y + ',' + b.x + ',' + b.y + ',' + color;
                };
                testbed.drawPolygon = function (points, color) {
                    if (!points || !points.length) {
                        return;
                    }
                    buffer.push(function (ctx) {
                        ctx.beginPath();
                        ctx.moveTo(points[0].x, points[0].y);
                        for (var i = 1; i < points.length; i++) {
                            ctx.lineTo(points[i].x, points[i].y);
                        }
                        ctx.strokeStyle = color;
                        ctx.closePath();
                        ctx.stroke();
                    });
                    drawHash += "segment";
                    for (var i = 1; i < points.length; i++) {
                        drawHash += points[i].x + ',' + points[i].y + ',';
                    }
                    drawHash += color;
                };
                testbed.drawAABB = function (aabb, color) {
                    buffer.push(function (ctx) {
                        ctx.beginPath();
                        ctx.moveTo(aabb.lowerBound.x, aabb.lowerBound.y);
                        ctx.lineTo(aabb.upperBound.x, aabb.lowerBound.y);
                        ctx.lineTo(aabb.upperBound.x, aabb.upperBound.y);
                        ctx.lineTo(aabb.lowerBound.x, aabb.upperBound.y);
                        ctx.strokeStyle = color;
                        ctx.closePath();
                        ctx.stroke();
                    });
                    drawHash += "aabb";
                    drawHash += aabb.lowerBound.x + ',' + aabb.lowerBound.y + ',';
                    drawHash += aabb.upperBound.x + ',' + aabb.upperBound.y + ',';
                    drawHash += color;
                };
                testbed.color = function (r, g, b) {
                    r = r * 256 | 0;
                    g = g * 256 | 0;
                    b = b * 256 | 0;
                    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
                };
            })();
            var world = callback(testbed);
            var viewer = new Viewer(world, testbed);
            var lastX = 0;
            var lastY = 0;
            stage.tick(function (dt, t) {
                // update camera position
                if (lastX !== testbed.x || lastY !== testbed.y) {
                    viewer.offset(-testbed.x, -testbed.y);
                    lastX = testbed.x;
                    lastY = testbed.y;
                }
            });
            viewer.tick(function (dt, t) {
                // call testbed step, if provided
                if (typeof testbed.step === 'function') {
                    testbed.step(dt, t);
                }
                if (targetBody) {
                    testbed.drawSegment(targetBody.getPosition(), mouseMove, 'rgba(255,255,255,0.2)');
                }
                if (lastDrawHash !== drawHash) {
                    lastDrawHash = drawHash;
                    stage.touch();
                }
                drawHash = "";
                return true;
            });
            // stage.empty();
            stage.background(testbed.background);
            stage.viewbox(testbed.width, testbed.height);
            stage.pin('alignX', -0.5);
            stage.pin('alignY', -0.5);
            stage.prepend(viewer);
            function findBody(point) {
                var body;
                var aabb = new AABB(point, point);
                world.queryAABB(aabb, function (fixture) {
                    if (body) {
                        return;
                    }
                    if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
                        return;
                    }
                    body = fixture.getBody();
                    return true;
                });
                return body;
            }
            var mouseGround = world.createBody();
            var mouseJoint;
            var targetBody;
            var mouseMove = { x: 0, y: 0 };
            viewer.attr('spy', true).on(web.Mouse.START, function (point) {
                point = { x: point.x, y: testbed.scaleY * point.y };
                if (targetBody) {
                    return;
                }
                var body = findBody(point);
                if (!body) {
                    return;
                }
                if (testbed.mouseForce) {
                    targetBody = body;
                }
                else {
                    mouseJoint = new MouseJoint({ maxForce: 1000 }, mouseGround, body, Vec2.clone(point));
                    world.createJoint(mouseJoint);
                }
            }).on(web.Mouse.MOVE, function (point) {
                point = { x: point.x, y: testbed.scaleY * point.y };
                if (mouseJoint) {
                    mouseJoint.setTarget(point);
                }
                mouseMove.x = point.x;
                mouseMove.y = point.y;
            }).on(web.Mouse.END, function (point) {
                point = { x: point.x, y: testbed.scaleY * point.y };
                if (mouseJoint) {
                    world.destroyJoint(mouseJoint);
                    mouseJoint = null;
                }
                if (targetBody) {
                    var force = Vec2.sub(point, targetBody.getPosition());
                    targetBody.applyForceToCenter(force.mul(testbed.mouseForce), true);
                    targetBody = null;
                }
            }).on(web.Mouse.CANCEL, function (point) {
                point = { x: point.x, y: testbed.scaleY * point.y };
                if (mouseJoint) {
                    world.destroyJoint(mouseJoint);
                    mouseJoint = null;
                }
                if (targetBody) {
                    targetBody = null;
                }
            });
            window.addEventListener("keydown", function (e) {
                switch (e.keyCode) {
                    case 'P'.charCodeAt(0):
                        testbed.togglePause();
                        break;
                }
            }, false);
            var downKeys = {};
            window.addEventListener("keydown", function (e) {
                var keyCode = e.keyCode;
                downKeys[keyCode] = true;
                updateActiveKeys(keyCode, true);
                testbed.keydown && testbed.keydown(keyCode, String.fromCharCode(keyCode));
            });
            window.addEventListener("keyup", function (e) {
                var keyCode = e.keyCode;
                downKeys[keyCode] = false;
                updateActiveKeys(keyCode, false);
                testbed.keyup && testbed.keyup(keyCode, String.fromCharCode(keyCode));
            });
            var activeKeys = testbed.activeKeys;
            function updateActiveKeys(keyCode, down) {
                var char = String.fromCharCode(keyCode);
                if (/\w/.test(char)) {
                    activeKeys[char] = down;
                }
                activeKeys.right = downKeys[39] || activeKeys['D'];
                activeKeys.left = downKeys[37] || activeKeys['A'];
                activeKeys.up = downKeys[38] || activeKeys['W'];
                activeKeys.down = downKeys[40] || activeKeys['S'];
                activeKeys.fire = downKeys[32] || downKeys[13];
            }
        });
    }
    Viewer._super = web;
    Viewer.prototype = web._create(Viewer._super.prototype);
    function Viewer(world, opts) {
        var _this = this;
        Viewer._super.call(this);
        this.label('Planck');
        opts = opts || {};
        this._options = {};
        this._options.speed = opts.speed || 1;
        this._options.hz = opts.hz || 60;
        if (Math.abs(this._options.hz) < 1) {
            this._options.hz = 1 / this._options.hz;
        }
        this._options.scaleY = opts.scaleY || -1;
        this._options.ratio = opts.ratio || 16;
        this._options.lineWidth = 2 / this._options.ratio;
        this._world = world;
        var timeStep = 1 / this._options.hz;
        var elapsedTime = 0;
        this.tick(function (dt) {
            dt = dt * 0.001 * _this._options.speed;
            elapsedTime += dt;
            while (elapsedTime > timeStep) {
                world.step(timeStep);
                elapsedTime -= timeStep;
            }
            _this.renderWorld();
            return true;
        }, true);
        world.on('remove-fixture', function (obj) {
            obj.ui && obj.ui.remove();
        });
        world.on('remove-joint', function (obj) {
            obj.ui && obj.ui.remove();
        });
    }
    Viewer.prototype.renderWorld = function () {
        var world = this._world;
        var options = this._options;
        var viewer = this;
        for (var b = world.getBodyList(); b; b = b.getNext()) {
            for (var f = b.getFixtureList(); f; f = f.getNext()) {
                if (!f.ui) {
                    if (f.render && f.render.stroke) {
                        options.strokeStyle = f.render.stroke;
                    }
                    else if (b.render && b.render.stroke) {
                        options.strokeStyle = b.render.stroke;
                    }
                    else if (b.isDynamic()) {
                        options.strokeStyle = 'rgba(255,255,255,0.9)';
                    }
                    else if (b.isKinematic()) {
                        options.strokeStyle = 'rgba(255,255,255,0.7)';
                    }
                    else if (b.isStatic()) {
                        options.strokeStyle = 'rgba(255,255,255,0.5)';
                    }
                    if (f.render && f.render.fill) {
                        options.fillStyle = f.render.fill;
                    }
                    else if (b.render && b.render.fill) {
                        options.fillStyle = b.render.fill;
                    }
                    else {
                        options.fillStyle = '';
                    }
                    var type = f.getType();
                    var shape = f.getShape();
                    if (type == 'circle') {
                        f.ui = viewer.drawCircle(shape, options);
                    }
                    if (type == 'edge') {
                        f.ui = viewer.drawEdge(shape, options);
                    }
                    if (type == 'polygon') {
                        f.ui = viewer.drawPolygon(shape, options);
                    }
                    if (type == 'chain') {
                        f.ui = viewer.drawChain(shape, options);
                    }
                    if (f.ui) {
                        f.ui.appendTo(viewer);
                    }
                }
                if (f.ui) {
                    var p = b.getPosition();
                    var r = b.getAngle();
                    if (f.ui.__lastX !== p.x || f.ui.__lastY !== p.y || f.ui.__lastR !== r) {
                        f.ui.__lastX = p.x;
                        f.ui.__lastY = p.y;
                        f.ui.__lastR = r;
                        f.ui.offset(p.x, options.scaleY * p.y);
                        f.ui.rotate(options.scaleY * r);
                    }
                }
            }
        }
        for (var j = world.getJointList(); j; j = j.getNext()) {
            var type = j.getType();
            var a = j.getAnchorA();
            var b = j.getAnchorB();
            if (!j.ui) {
                options.strokeStyle = 'rgba(255,255,255,0.2)';
                j.ui = viewer.drawJoint(j, options);
                j.ui.pin('handle', 0.5);
                if (j.ui) {
                    j.ui.appendTo(viewer);
                }
            }
            if (j.ui) {
                var cx = (a.x + b.x) * 0.5;
                var cy = options.scaleY * (a.y + b.y) * 0.5;
                var dx = a.x - b.x;
                var dy = options.scaleY * (a.y - b.y);
                var d = Math.sqrt(dx * dx + dy * dy);
                j.ui.width(d);
                j.ui.rotate(Math.atan2(dy, dx));
                j.ui.offset(cx, cy);
            }
        }
    };
    Viewer.prototype.drawJoint = function (joint, options) {
        var lw = options.lineWidth;
        var ratio = options.ratio;
        var length = 10;
        var texture = web.canvas(function (ctx) {
            this.size(length + 2 * lw, 2 * lw, ratio);
            ctx.scale(ratio, ratio);
            ctx.beginPath();
            ctx.moveTo(lw, lw);
            ctx.lineTo(lw + length, lw);
            ctx.lineCap = 'round';
            ctx.lineWidth = options.lineWidth;
            ctx.strokeStyle = options.strokeStyle;
            ctx.stroke();
        });
        var image = web.image(texture).stretch();
        return image;
    };
    Viewer.prototype.drawCircle = function (shape, options) {
        var lw = options.lineWidth;
        var ratio = options.ratio;
        var r = shape.m_radius;
        var cx = r + lw;
        var cy = r + lw;
        var w = r * 2 + lw * 2;
        var h = r * 2 + lw * 2;
        var texture = web.canvas(function (ctx) {
            this.size(w, h, ratio);
            ctx.scale(ratio, ratio);
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            if (options.fillStyle) {
                ctx.fillStyle = options.fillStyle;
                ctx.fill();
            }
            ctx.lineTo(cx, cy);
            ctx.lineWidth = options.lineWidth;
            ctx.strokeStyle = options.strokeStyle;
            ctx.stroke();
        });
        var image = web.image(texture)
            .offset(shape.m_p.x - cx, options.scaleY * shape.m_p.y - cy);
        var node = web.create().append(image);
        return node;
    };
    Viewer.prototype.drawEdge = function (edge, options) {
        var lw = options.lineWidth;
        var ratio = options.ratio;
        var v1 = edge.m_vertex1;
        var v2 = edge.m_vertex2;
        var dx = v2.x - v1.x;
        var dy = v2.y - v1.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        var texture = web.canvas(function (ctx) {
            this.size(length + 2 * lw, 2 * lw, ratio);
            ctx.scale(ratio, ratio);
            ctx.beginPath();
            ctx.moveTo(lw, lw);
            ctx.lineTo(lw + length, lw);
            ctx.lineCap = 'round';
            ctx.lineWidth = options.lineWidth;
            ctx.strokeStyle = options.strokeStyle;
            ctx.stroke();
        });
        var minX = Math.min(v1.x, v2.x);
        var minY = Math.min(options.scaleY * v1.y, options.scaleY * v2.y);
        var image = web.image(texture);
        image.rotate(options.scaleY * Math.atan2(dy, dx));
        image.offset(minX - lw, minY - lw);
        var node = web.create().append(image);
        return node;
    };
    Viewer.prototype.drawPolygon = function (shape, options) {
        var lw = options.lineWidth;
        var ratio = options.ratio;
        var vertices = shape.m_vertices;
        if (!vertices.length) {
            return;
        }
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < vertices.length; ++i) {
            var v = vertices[i];
            minX = Math.min(minX, v.x);
            maxX = Math.max(maxX, v.x);
            minY = Math.min(minY, options.scaleY * v.y);
            maxY = Math.max(maxY, options.scaleY * v.y);
        }
        var width = maxX - minX;
        var height = maxY - minY;
        var texture = web.canvas(function (ctx) {
            this.size(width + 2 * lw, height + 2 * lw, ratio);
            ctx.scale(ratio, ratio);
            ctx.beginPath();
            for (var i = 0; i < vertices.length; ++i) {
                var v = vertices[i];
                var x = v.x - minX + lw;
                var y = options.scaleY * v.y - minY + lw;
                if (i == 0)
                    ctx.moveTo(x, y);
                else
                    ctx.lineTo(x, y);
            }
            if (vertices.length > 2) {
                ctx.closePath();
            }
            if (options.fillStyle) {
                ctx.fillStyle = options.fillStyle;
                ctx.fill();
                ctx.closePath();
            }
            ctx.lineCap = 'round';
            ctx.lineWidth = options.lineWidth;
            ctx.strokeStyle = options.strokeStyle;
            ctx.stroke();
        });
        var image = web.image(texture);
        image.offset(minX - lw, minY - lw);
        var node = web.create().append(image);
        return node;
    };
    Viewer.prototype.drawChain = function (shape, options) {
        var lw = options.lineWidth;
        var ratio = options.ratio;
        var vertices = shape.m_vertices;
        if (!vertices.length) {
            return;
        }
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        for (var i = 0; i < vertices.length; ++i) {
            var v = vertices[i];
            minX = Math.min(minX, v.x);
            maxX = Math.max(maxX, v.x);
            minY = Math.min(minY, options.scaleY * v.y);
            maxY = Math.max(maxY, options.scaleY * v.y);
        }
        var width = maxX - minX;
        var height = maxY - minY;
        var texture = web.canvas(function (ctx) {
            this.size(width + 2 * lw, height + 2 * lw, ratio);
            ctx.scale(ratio, ratio);
            ctx.beginPath();
            for (var i = 0; i < vertices.length; ++i) {
                var v = vertices[i];
                var x = v.x - minX + lw;
                var y = options.scaleY * v.y - minY + lw;
                if (i == 0)
                    ctx.moveTo(x, y);
                else
                    ctx.lineTo(x, y);
            }
            // TODO: if loop
            if (vertices.length > 2) ;
            if (options.fillStyle) {
                ctx.fillStyle = options.fillStyle;
                ctx.fill();
                ctx.closePath();
            }
            ctx.lineCap = 'round';
            ctx.lineWidth = options.lineWidth;
            ctx.strokeStyle = options.strokeStyle;
            ctx.stroke();
        });
        var image = web.image(texture);
        image.offset(minX - lw, minY - lw);
        var node = web.create().append(image);
        return node;
    };
    /** @deprecated Merged with main namespace */
    var internal = {};
    // @ts-ignore
    internal.CollidePolygons = CollidePolygons;
    // @ts-ignore
    internal.Settings = Settings;
    // @ts-ignore
    internal.Sweep = Sweep;
    // @ts-ignore
    internal.Manifold = Manifold;
    // @ts-ignore
    internal.Distance = Distance;
    // @ts-ignore
    internal.TimeOfImpact = TimeOfImpact;
    // @ts-ignore
    internal.DynamicTree = DynamicTree;
    // @ts-ignore
    internal.stats = stats$1;
    // @ts-ignore
    Solver.TimeStep = TimeStep;
    // @ts-ignore
    Distance.testOverlap = testOverlap;
    // @ts-ignore
    Distance.Input = DistanceInput;
    // @ts-ignore
    Distance.Output = DistanceOutput;
    // @ts-ignore
    Distance.Proxy = DistanceProxy;
    // @ts-ignore
    Distance.Cache = SimplexCache;
    // @ts-ignore
    TimeOfImpact.Input = TOIInput;
    // @ts-ignore
    TimeOfImpact.Output = TOIOutput;

    exports.AABB = AABB;
    exports.Body = Body;
    exports.Box = BoxShape;
    exports.Chain = ChainShape;
    exports.Circle = CircleShape;
    exports.CollideCircles = CollideCircles;
    exports.CollideEdgeCircle = CollideEdgeCircle;
    exports.CollideEdgePolygon = CollideEdgePolygon;
    exports.CollidePolygonCircle = CollidePolygonCircle;
    exports.CollidePolygons = CollidePolygons;
    exports.Contact = Contact;
    exports.Distance = Distance;
    exports.DistanceJoint = DistanceJoint;
    exports.DynamicTree = DynamicTree;
    exports.Edge = EdgeShape;
    exports.Fixture = Fixture;
    exports.FrictionJoint = FrictionJoint;
    exports.GearJoint = GearJoint;
    exports.Joint = Joint;
    exports.Manifold = Manifold;
    exports.Mat22 = Mat22;
    exports.Mat33 = Mat33;
    exports.Math = math$1;
    exports.MotorJoint = MotorJoint;
    exports.MouseJoint = MouseJoint;
    exports.Polygon = PolygonShape;
    exports.PrismaticJoint = PrismaticJoint;
    exports.PulleyJoint = PulleyJoint;
    exports.RevoluteJoint = RevoluteJoint;
    exports.RopeJoint = RopeJoint;
    exports.Rot = Rot;
    exports.Serializer = Serializer;
    exports.Settings = Settings;
    exports.Shape = Shape;
    exports.Sweep = Sweep;
    exports.TimeOfImpact = TimeOfImpact;
    exports.Transform = Transform;
    exports.Vec2 = Vec2;
    exports.Vec3 = Vec3;
    exports.WeldJoint = WeldJoint;
    exports.WheelJoint = WheelJoint;
    exports.World = World;
    exports.internal = internal;
    exports.testbed = testbed;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=planck-with-testbed.js.map
