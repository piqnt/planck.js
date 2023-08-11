/**
 * Planck.js v2.0-dev.0
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

const options = function (input, defaults) {
    if (input === null || typeof input === 'undefined') {
        // tslint:disable-next-line:no-object-literal-type-assertion
        input = {};
    }
    const output = Object.assign({}, input);
    // tslint:disable-next-line:no-for-in
    for (const key in defaults) {
        if (defaults.hasOwnProperty(key) && typeof input[key] === 'undefined') {
            output[key] = defaults[key];
        }
    }
    if (typeof Object.getOwnPropertySymbols === 'function') {
        const symbols = Object.getOwnPropertySymbols(defaults);
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            if (defaults.propertyIsEnumerable(symbol) && typeof input[symbol] === 'undefined') {
                output[symbol] = defaults[symbol];
            }
        }
    }
    return output;
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
const math = Object.assign(Object.create(Math), {
    EPSILON: 1e-9,
    /**
     * This function is used to ensure that a floating point number is not a NaN or
     * infinity.
     */
    isFinite: function (x) {
        return (typeof x === 'number') && isFinite(x) && !isNaN(x);
    },
    assert: function (x) {
    },
    /**
     * Next Largest Power of 2 Given a binary integer value x, the next largest
     * power of 2 can be computed by a SWAR algorithm that recursively "folds" the
     * upper bits into the lower bits. This process yields a bit vector with the
     * same most significant 1 as x, but all 1's below it. Adding 1 to that value
     * yields the next largest power of 2. For a 32-bit value:
     */
    nextPowerOfTwo: function (x) {
        // TODO
        x |= (x >> 1);
        x |= (x >> 2);
        x |= (x >> 4);
        x |= (x >> 8);
        x |= (x >> 16);
        return x + 1;
    },
    isPowerOfTwo: function (x) {
        return x > 0 && (x & (x - 1)) === 0;
    },
    mod: function (num, min, max) {
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
    },
    /**
     * Returns a min if num is less than min, and max if more than max, otherwise returns num.
     */
    clamp: function (num, min, max) {
        if (num < min) {
            return min;
        }
        else if (num > max) {
            return max;
        }
        else {
            return num;
        }
    },
    /**
     * Returns a random number between min and max when two arguments are provided.
     * If one arg is provided between 0 to max.
     * If one arg is passed between 0 to 1.
     */
    random: function (min, max) {
        if (typeof min === 'undefined') {
            max = 1;
            min = 0;
        }
        else if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        return min === max ? min : Math.random() * (max - min) + min;
    }
});

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
class Vec2 {
    // tslint:disable-next-line:typedef
    constructor(x, y) {
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
    _serialize() {
        return {
            x: this.x,
            y: this.y
        };
    }
    /** @internal */
    static _deserialize(data) {
        const obj = Object.create(Vec2.prototype);
        obj.x = data.x;
        obj.y = data.y;
        return obj;
    }
    static zero() {
        const obj = Object.create(Vec2.prototype);
        obj.x = 0;
        obj.y = 0;
        return obj;
    }
    /** @internal */
    static neo(x, y) {
        const obj = Object.create(Vec2.prototype);
        obj.x = x;
        obj.y = y;
        return obj;
    }
    static clone(v) {
        return Vec2.neo(v.x, v.y);
    }
    /** @internal */
    toString() {
        return JSON.stringify(this);
    }
    /**
     * Does this vector contain finite coordinates?
     */
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return math.isFinite(obj.x) && math.isFinite(obj.y);
    }
    static assert(o) {
    }
    clone() {
        return Vec2.clone(this);
    }
    /**
     * Set this vector to all zeros.
     *
     * @returns this
     */
    setZero() {
        this.x = 0.0;
        this.y = 0.0;
        return this;
    }
    /**
     * Set this vector to some specified coordinates.
     *
     * @returns this
     */
    // tslint:disable-next-line:typedef
    set(x, y) {
        if (typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
        return this;
    }
    /**
     * Set this vector to some specified coordinates.
     *
     * @returns this
     */
    setNum(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Set this vector to some specified coordinates.
     *
     * @returns this
     */
    setVec2(value) {
        this.x = value.x;
        this.y = value.y;
        return this;
    }
    /**
     * @internal
     * @deprecated Use setCombine or setMul
     */
    wSet(a, v, b, w) {
        if (typeof b !== 'undefined' || typeof w !== 'undefined') {
            return this.setCombine(a, v, b, w);
        }
        else {
            return this.setMul(a, v);
        }
    }
    /**
     * Set linear combination of v and w: `a * v + b * w`
     */
    setCombine(a, v, b, w) {
        const x = a * v.x + b * w.x;
        const y = a * v.y + b * w.y;
        // `this` may be `w`
        this.x = x;
        this.y = y;
        return this;
    }
    setMul(a, v) {
        const x = a * v.x;
        const y = a * v.y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Add a vector to this vector.
     *
     * @returns this
     */
    add(w) {
        this.x += w.x;
        this.y += w.y;
        return this;
    }
    /**
     * @internal
     * @deprecated Use addCombine or addMul
     */
    wAdd(a, v, b, w) {
        if (typeof b !== 'undefined' || typeof w !== 'undefined') {
            return this.addCombine(a, v, b, w);
        }
        else {
            return this.addMul(a, v);
        }
    }
    /**
     * Add linear combination of v and w: `a * v + b * w`
     */
    addCombine(a, v, b, w) {
        const x = a * v.x + b * w.x;
        const y = a * v.y + b * w.y;
        // `this` may be `w`
        this.x += x;
        this.y += y;
        return this;
    }
    addMul(a, v) {
        const x = a * v.x;
        const y = a * v.y;
        this.x += x;
        this.y += y;
        return this;
    }
    /**
     * @deprecated Use subCombine or subMul
     */
    wSub(a, v, b, w) {
        if (typeof b !== 'undefined' || typeof w !== 'undefined') {
            return this.subCombine(a, v, b, w);
        }
        else {
            return this.subMul(a, v);
        }
    }
    /**
     * Subtract linear combination of v and w: `a * v + b * w`
     */
    subCombine(a, v, b, w) {
        const x = a * v.x + b * w.x;
        const y = a * v.y + b * w.y;
        // `this` may be `w`
        this.x -= x;
        this.y -= y;
        return this;
    }
    subMul(a, v) {
        const x = a * v.x;
        const y = a * v.y;
        this.x -= x;
        this.y -= y;
        return this;
    }
    /**
     * Subtract a vector from this vector
     *
     * @returns this
     */
    sub(w) {
        this.x -= w.x;
        this.y -= w.y;
        return this;
    }
    /**
     * Multiply this vector by a scalar.
     *
     * @returns this
     */
    mul(m) {
        this.x *= m;
        this.y *= m;
        return this;
    }
    /**
     * Get the length of this vector (the norm).
     *
     * For performance, use this instead of lengthSquared (if possible).
     */
    length() {
        return Vec2.lengthOf(this);
    }
    /**
     * Get the length squared.
     */
    lengthSquared() {
        return Vec2.lengthSquared(this);
    }
    /**
     * Convert this vector into a unit vector.
     *
     * @returns old length
     */
    normalize() {
        const length = this.length();
        if (length < math.EPSILON) {
            return 0.0;
        }
        const invLength = 1.0 / length;
        this.x *= invLength;
        this.y *= invLength;
        return length;
    }
    /**
     * Get the length of this vector (the norm).
     *
     * For performance, use this instead of lengthSquared (if possible).
     */
    static lengthOf(v) {
        return math.sqrt(v.x * v.x + v.y * v.y);
    }
    /**
     * Get the length squared.
     */
    static lengthSquared(v) {
        return v.x * v.x + v.y * v.y;
    }
    static distance(v, w) {
        const dx = v.x - w.x;
        const dy = v.y - w.y;
        return math.sqrt(dx * dx + dy * dy);
    }
    static distanceSquared(v, w) {
        const dx = v.x - w.x;
        const dy = v.y - w.y;
        return dx * dx + dy * dy;
    }
    static areEqual(v, w) {
        return v === w || typeof w === 'object' && w !== null && v.x === w.x && v.y === w.y;
    }
    /**
     * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
     */
    static skew(v) {
        return Vec2.neo(-v.y, v.x);
    }
    /**
     * Perform the dot product on two vectors.
     */
    static dot(v, w) {
        return v.x * w.x + v.y * w.y;
    }
    /**
     * Perform the cross product on two vectors. In 2D this produces a scalar.
     *
     * Perform the cross product on a vector and a scalar. In 2D this produces a
     * vector.
     */
    // tslint:disable-next-line:typedef
    static cross(v, w) {
        if (typeof w === 'number') {
            return Vec2.neo(w * v.y, -w * v.x);
        }
        else if (typeof v === 'number') {
            return Vec2.neo(-v * w.y, v * w.x);
        }
        else {
            return v.x * w.y - v.y * w.x;
        }
    }
    /**
     * Perform the cross product on two vectors. In 2D this produces a scalar.
     */
    static crossVec2Vec2(v, w) {
        return v.x * w.y - v.y * w.x;
    }
    /**
     * Perform the cross product on a vector and a scalar. In 2D this produces a
     * vector.
     */
    static crossVec2Num(v, w) {
        return Vec2.neo(w * v.y, -w * v.x);
    }
    /**
     * Perform the cross product on a vector and a scalar. In 2D this produces a
     * vector.
     */
    static crossNumVec2(v, w) {
        return Vec2.neo(-v * w.y, v * w.x);
    }
    /**
     * Returns `a + (v x w)`
     */
    // tslint:disable-next-line:typedef
    static addCross(a, v, w) {
        if (typeof w === 'number') {
            return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
        }
        else if (typeof v === 'number') {
            return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
        }
    }
    /**
     * Returns `a + (v x w)`
     */
    static addCrossVec2Num(a, v, w) {
        return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
    }
    /**
     * Returns `a + (v x w)`
     */
    static addCrossNumVec2(a, v, w) {
        return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
    }
    static add(v, w) {
        return Vec2.neo(v.x + w.x, v.y + w.y);
    }
    /** @internal @deprecated */
    static wAdd(a, v, b, w) {
        if (typeof b !== 'undefined' || typeof w !== 'undefined') {
            return Vec2.combine(a, v, b, w);
        }
        else {
            return Vec2.mulNumVec2(a, v);
        }
    }
    static combine(a, v, b, w) {
        return Vec2.zero().setCombine(a, v, b, w);
    }
    static sub(v, w) {
        return Vec2.neo(v.x - w.x, v.y - w.y);
    }
    // tslint:disable-next-line:typedef
    static mul(a, b) {
        if (typeof a === 'object') {
            return Vec2.neo(a.x * b, a.y * b);
        }
        else if (typeof b === 'object') {
            return Vec2.neo(a * b.x, a * b.y);
        }
    }
    static mulVec2Num(a, b) {
        return Vec2.neo(a.x * b, a.y * b);
    }
    static mulNumVec2(a, b) {
        return Vec2.neo(a * b.x, a * b.y);
    }
    neg() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    static neg(v) {
        return Vec2.neo(-v.x, -v.y);
    }
    static abs(v) {
        return Vec2.neo(math.abs(v.x), math.abs(v.y));
    }
    static mid(v, w) {
        return Vec2.neo((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
    }
    static upper(v, w) {
        return Vec2.neo(math.max(v.x, w.x), math.max(v.y, w.y));
    }
    static lower(v, w) {
        return Vec2.neo(math.min(v.x, w.x), math.min(v.y, w.y));
    }
    clamp(max) {
        const lengthSqr = this.x * this.x + this.y * this.y;
        if (lengthSqr > max * max) {
            const scale = max / math.sqrt(lengthSqr);
            this.x *= scale;
            this.y *= scale;
        }
        return this;
    }
    static clamp(v, max) {
        const r = Vec2.neo(v.x, v.y);
        r.clamp(max);
        return r;
    }
    /**  @internal @deprecated */
    // tslint:disable-next-line:typedef
    static scaleFn(x, y) {
        return function (v) {
            return Vec2.neo(v.x * x, v.y * y);
        };
    }
    /**  @internal @deprecated */
    // tslint:disable-next-line:typedef
    static translateFn(x, y) {
        return function (v) {
            return Vec2.neo(v.x + x, v.y + y);
        };
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
class AABB {
    constructor(lower, upper) {
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
    isValid() {
        return AABB.isValid(this);
    }
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return Vec2.isValid(obj.lowerBound) && Vec2.isValid(obj.upperBound) && Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0;
    }
    static assert(o) {
    }
    /**
     * Get the center of the AABB.
     */
    getCenter() {
        return Vec2.neo((this.lowerBound.x + this.upperBound.x) * 0.5, (this.lowerBound.y + this.upperBound.y) * 0.5);
    }
    /**
     * Get the extents of the AABB (half-widths).
     */
    getExtents() {
        return Vec2.neo((this.upperBound.x - this.lowerBound.x) * 0.5, (this.upperBound.y - this.lowerBound.y) * 0.5);
    }
    /**
     * Get the perimeter length.
     */
    getPerimeter() {
        return 2.0 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
    }
    /**
     * Combine one or two AABB into this one.
     */
    combine(a, b) {
        b = b || this;
        const lowerA = a.lowerBound;
        const upperA = a.upperBound;
        const lowerB = b.lowerBound;
        const upperB = b.upperBound;
        const lowerX = math.min(lowerA.x, lowerB.x);
        const lowerY = math.min(lowerA.y, lowerB.y);
        const upperX = math.max(upperB.x, upperA.x);
        const upperY = math.max(upperB.y, upperA.y);
        this.lowerBound.setNum(lowerX, lowerY);
        this.upperBound.setNum(upperX, upperY);
    }
    combinePoints(a, b) {
        this.lowerBound.setNum(math.min(a.x, b.x), math.min(a.y, b.y));
        this.upperBound.setNum(math.max(a.x, b.x), math.max(a.y, b.y));
    }
    set(aabb) {
        this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
        this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
    }
    contains(aabb) {
        let result = true;
        result = result && this.lowerBound.x <= aabb.lowerBound.x;
        result = result && this.lowerBound.y <= aabb.lowerBound.y;
        result = result && aabb.upperBound.x <= this.upperBound.x;
        result = result && aabb.upperBound.y <= this.upperBound.y;
        return result;
    }
    extend(value) {
        AABB.extend(this, value);
        return this;
    }
    static extend(out, value) {
        out.lowerBound.x -= value;
        out.lowerBound.y -= value;
        out.upperBound.x += value;
        out.upperBound.y += value;
        return out;
    }
    static testOverlap(a, b) {
        const d1x = b.lowerBound.x - a.upperBound.x;
        const d2x = a.lowerBound.x - b.upperBound.x;
        const d1y = b.lowerBound.y - a.upperBound.y;
        const d2y = a.lowerBound.y - b.upperBound.y;
        if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
            return false;
        }
        return true;
    }
    static areEqual(a, b) {
        return Vec2.areEqual(a.lowerBound, b.lowerBound) && Vec2.areEqual(a.upperBound, b.upperBound);
    }
    static diff(a, b) {
        const wD = math.max(0, math.min(a.upperBound.x, b.upperBound.x) - math.max(b.lowerBound.x, a.lowerBound.x));
        const hD = math.max(0, math.min(a.upperBound.y, b.upperBound.y) - math.max(b.lowerBound.y, a.lowerBound.y));
        const wA = a.upperBound.x - a.lowerBound.x;
        const hA = a.upperBound.y - a.lowerBound.y;
        const wB = b.upperBound.x - b.lowerBound.x;
        const hB = b.upperBound.y - b.lowerBound.y;
        return wA * hA + wB * hB - wD * hD;
    }
    rayCast(output, input) {
        // From Real-time Collision Detection, p179.
        let tmin = -Infinity;
        let tmax = Infinity;
        const p = input.p1;
        const d = Vec2.sub(input.p2, input.p1);
        const absD = Vec2.abs(d);
        const normal = Vec2.zero();
        for (let f = 'x'; f !== null; f = (f === 'x' ? 'y' : null)) {
            if (absD.x < math.EPSILON) {
                // Parallel.
                if (p[f] < this.lowerBound[f] || this.upperBound[f] < p[f]) {
                    return false;
                }
            }
            else {
                const inv_d = 1.0 / d[f];
                let t1 = (this.lowerBound[f] - p[f]) * inv_d;
                let t2 = (this.upperBound[f] - p[f]) * inv_d;
                // Sign of the normal vector.
                let s = -1.0;
                if (t1 > t2) {
                    const temp = t1;
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
                tmax = math.min(tmax, t2);
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
    }
    /** @internal */
    toString() {
        return JSON.stringify(this);
    }
    static combinePoints(out, a, b) {
        out.lowerBound.x = math.min(a.x, b.x);
        out.lowerBound.y = math.min(a.y, b.y);
        out.upperBound.x = math.max(a.x, b.x);
        out.upperBound.y = math.max(a.y, b.y);
        return out;
    }
    static combinedPerimeter(a, b) {
        const lx = math.min(a.lowerBound.x, b.lowerBound.x);
        const ly = math.min(a.lowerBound.y, b.lowerBound.y);
        const ux = math.max(a.upperBound.x, b.upperBound.x);
        const uy = math.max(a.upperBound.y, b.upperBound.y);
        return 2.0 * (ux - lx + uy - ly);
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
/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */
class Settings {
    /**
     * The radius of the polygon/edge shape skin. This should not be modified.
     * Making this smaller means polygons will have an insufficient buffer for
     * continuous collision. Making it larger may create artifacts for vertex
     * collision.
     */
    static get polygonRadius() { return 2.0 * Settings.linearSlop; }
}
/**
 * You can use this to change the length scale used by your game.
 *
 * For example for inches you could use 39.4.
 */
Settings.lengthUnitsPerMeter = 1.0;
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
/** @internal */
class SettingsInternal {
    static get maxManifoldPoints() {
        return Settings.maxManifoldPoints;
    }
    static get maxPolygonVertices() {
        return Settings.maxPolygonVertices;
    }
    static get aabbExtension() {
        return Settings.aabbExtension * Settings.lengthUnitsPerMeter;
    }
    static get aabbMultiplier() {
        return Settings.aabbMultiplier;
    }
    static get linearSlop() {
        return Settings.linearSlop * Settings.lengthUnitsPerMeter;
    }
    static get linearSlopSquared() {
        return Settings.linearSlop * Settings.lengthUnitsPerMeter * Settings.linearSlop * Settings.lengthUnitsPerMeter;
    }
    static get angularSlop() {
        return Settings.angularSlop;
    }
    static get polygonRadius() {
        return 2.0 * Settings.linearSlop;
    }
    static get maxSubSteps() {
        return Settings.maxSubSteps;
    }
    static get maxTOIContacts() {
        return Settings.maxTOIContacts;
    }
    static get maxTOIIterations() {
        return Settings.maxTOIIterations;
    }
    static get maxDistnceIterations() {
        return Settings.maxDistnceIterations;
    }
    static get velocityThreshold() {
        return Settings.velocityThreshold * Settings.lengthUnitsPerMeter;
    }
    static get maxLinearCorrection() {
        return Settings.maxLinearCorrection * Settings.lengthUnitsPerMeter;
    }
    static get maxAngularCorrection() {
        return Settings.maxAngularCorrection;
    }
    static get maxTranslation() {
        return Settings.maxTranslation * Settings.lengthUnitsPerMeter;
    }
    static get maxTranslationSquared() {
        return Settings.maxTranslation * Settings.lengthUnitsPerMeter * Settings.maxTranslation * Settings.lengthUnitsPerMeter;
    }
    static get maxRotation() {
        return Settings.maxRotation;
    }
    static get maxRotationSquared() {
        return Settings.maxRotation * Settings.maxRotation;
    }
    static get baumgarte() {
        return Settings.baumgarte;
    }
    static get toiBaugarte() {
        return Settings.toiBaugarte;
    }
    static get timeToSleep() {
        return Settings.timeToSleep;
    }
    static get linearSleepTolerance() {
        return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
    }
    static get linearSleepToleranceSqr() {
        return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter * Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
    }
    static get angularSleepTolerance() {
        return Settings.angularSleepTolerance;
    }
    static get angularSleepToleranceSqr() {
        return Settings.angularSleepTolerance * Settings.angularSleepTolerance;
    }
}

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
class Pool {
    constructor(opts) {
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
        this._hasCreateFn = typeof this._createFn === 'function';
        this._allocateFn = opts.allocate;
        this._hasAllocateFn = typeof this._allocateFn === 'function';
        this._releaseFn = opts.release;
        this._hasReleaseFn = typeof this._releaseFn === 'function';
        this._disposeFn = opts.dispose;
        this._hasDisposeFn = typeof this._disposeFn === 'function';
    }
    max(n) {
        if (typeof n === 'number') {
            this._max = n;
            return this;
        }
        return this._max;
    }
    size() {
        return this._list.length;
    }
    allocate() {
        let item;
        if (this._list.length > 0) {
            item = this._list.shift();
        }
        else {
            this._createCount++;
            if (this._hasCreateFn) {
                item = this._createFn();
            }
            else {
                // tslint:disable-next-line:no-object-literal-type-assertion
                item = {};
            }
        }
        this._allocateCount++;
        if (this._hasAllocateFn) {
            this._allocateFn(item);
        }
        return item;
    }
    release(item) {
        if (this._list.length < this._max) {
            this._releaseCount++;
            if (this._hasReleaseFn) {
                this._releaseFn(item);
            }
            this._list.push(item);
        }
        else {
            this._disposeCount++;
            if (this._hasDisposeFn) {
                item = this._disposeFn(item);
            }
        }
    }
    /** @internal */
    toString() {
        return " +" + this._createCount + " >" + this._allocateCount + " <" + this._releaseCount + " -"
            + this._disposeCount + " =" + this._list.length + "/" + this._max;
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
/**
 * A node in the dynamic tree. The client does not interact with this directly.
 */
class TreeNode {
    constructor(id) {
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
    toString() {
        return this.id + ": " + this.userData;
    }
    isLeaf() {
        return this.child1 == null;
    }
}
const poolTreeNode = new Pool({
    create() {
        return new TreeNode();
    },
    release(node) {
        node.userData = null;
        node.parent = null;
        node.child1 = null;
        node.child2 = null;
        node.height = -1;
        node.id = undefined;
    }
});
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
class DynamicTree {
    constructor() {
        this.inputPool = new Pool({
            create() {
                // tslint:disable-next-line:no-object-literal-type-assertion
                return {};
            },
            release(stack) {
            }
        });
        this.stackPool = new Pool({
            create() {
                return [];
            },
            release(stack) {
                stack.length = 0;
            }
        });
        this.iteratorPool = new Pool({
            create() {
                return new Iterator();
            },
            release(iterator) {
                iterator.close();
            }
        });
        this.m_root = null;
        this.m_nodes = {};
        this.m_lastProxyId = 0;
    }
    /**
     * Get proxy user data.
     *
     * @return the proxy user data or 0 if the id is invalid.
     */
    getUserData(id) {
        const node = this.m_nodes[id];
        return node.userData;
    }
    /**
     * Get the fat AABB for a node id.
     *
     * @return the proxy user data or 0 if the id is invalid.
     */
    getFatAABB(id) {
        const node = this.m_nodes[id];
        return node.aabb;
    }
    allocateNode() {
        const node = poolTreeNode.allocate();
        node.id = ++this.m_lastProxyId;
        this.m_nodes[node.id] = node;
        return node;
    }
    freeNode(node) {
        // tslint:disable-next-line:no-dynamic-delete
        delete this.m_nodes[node.id];
        poolTreeNode.release(node);
    }
    /**
     * Create a proxy in the tree as a leaf node. We return the index of the node
     * instead of a pointer so that we can grow the node pool.
     *
     * Create a proxy. Provide a tight fitting AABB and a userData pointer.
     */
    createProxy(aabb, userData) {
        const node = this.allocateNode();
        node.aabb.set(aabb);
        // Fatten the aabb.
        AABB.extend(node.aabb, SettingsInternal.aabbExtension);
        node.userData = userData;
        node.height = 0;
        this.insertLeaf(node);
        return node.id;
    }
    /**
     * Destroy a proxy. This asserts if the id is invalid.
     */
    destroyProxy(id) {
        const node = this.m_nodes[id];
        this.removeLeaf(node);
        this.freeNode(node);
    }
    /**
     * Move a proxy with a swepted AABB. If the proxy has moved outside of its
     * fattened AABB, then the proxy is removed from the tree and re-inserted.
     * Otherwise the function returns immediately.
     *
     * @param d Displacement
     *
     * @return true if the proxy was re-inserted.
     */
    moveProxy(id, aabb, d) {
        const node = this.m_nodes[id];
        if (node.aabb.contains(aabb)) {
            return false;
        }
        this.removeLeaf(node);
        node.aabb.set(aabb);
        // Extend AABB.
        aabb = node.aabb;
        AABB.extend(aabb, SettingsInternal.aabbExtension);
        // Predict AABB displacement.
        // const d = Vec2.mul(Settings.aabbMultiplier, displacement);
        if (d.x < 0.0) {
            aabb.lowerBound.x += d.x * SettingsInternal.aabbMultiplier;
        }
        else {
            aabb.upperBound.x += d.x * SettingsInternal.aabbMultiplier;
        }
        if (d.y < 0.0) {
            aabb.lowerBound.y += d.y * SettingsInternal.aabbMultiplier;
        }
        else {
            aabb.upperBound.y += d.y * SettingsInternal.aabbMultiplier;
        }
        this.insertLeaf(node);
        return true;
    }
    insertLeaf(leaf) {
        if (this.m_root == null) {
            this.m_root = leaf;
            this.m_root.parent = null;
            return;
        }
        // Find the best sibling for this node
        const leafAABB = leaf.aabb;
        let index = this.m_root;
        while (!index.isLeaf()) {
            const child1 = index.child1;
            const child2 = index.child2;
            const area = index.aabb.getPerimeter();
            const combinedArea = AABB.combinedPerimeter(index.aabb, leafAABB);
            // Cost of creating a new parent for this node and the new leaf
            const cost = 2.0 * combinedArea;
            // Minimum cost of pushing the leaf further down the tree
            const inheritanceCost = 2.0 * (combinedArea - area);
            // Cost of descending into child1
            const newArea1 = AABB.combinedPerimeter(leafAABB, child1.aabb);
            let cost1 = newArea1 + inheritanceCost;
            if (!child1.isLeaf()) {
                const oldArea = child1.aabb.getPerimeter();
                cost1 -= oldArea;
            }
            // Cost of descending into child2
            const newArea2 = AABB.combinedPerimeter(leafAABB, child2.aabb);
            let cost2 = newArea2 + inheritanceCost;
            if (!child2.isLeaf()) {
                const oldArea = child2.aabb.getPerimeter();
                cost2 -= oldArea;
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
        const sibling = index;
        // Create a new parent.
        const oldParent = sibling.parent;
        const newParent = this.allocateNode();
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
            const child1 = index.child1;
            const child2 = index.child2;
            index.height = 1 + Math.max(child1.height, child2.height);
            index.aabb.combine(child1.aabb, child2.aabb);
            index = index.parent;
        }
        // validate();
    }
    removeLeaf(leaf) {
        if (leaf === this.m_root) {
            this.m_root = null;
            return;
        }
        const parent = leaf.parent;
        const grandParent = parent.parent;
        let sibling;
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
            let index = grandParent;
            while (index != null) {
                index = this.balance(index);
                const child1 = index.child1;
                const child2 = index.child2;
                index.aabb.combine(child1.aabb, child2.aabb);
                index.height = 1 + Math.max(child1.height, child2.height);
                index = index.parent;
            }
        }
        else {
            this.m_root = sibling;
            sibling.parent = null;
            this.freeNode(parent);
        }
        // validate();
    }
    /**
     * Perform a left or right rotation if node A is imbalanced. Returns the new
     * root index.
     */
    balance(iA) {
        const A = iA;
        if (A.isLeaf() || A.height < 2) {
            return iA;
        }
        const B = A.child1;
        const C = A.child2;
        const balance = C.height - B.height;
        // Rotate C up
        if (balance > 1) {
            const F = C.child1;
            const G = C.child2;
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
                A.height = 1 + Math.max(B.height, G.height);
                C.height = 1 + Math.max(A.height, F.height);
            }
            else {
                C.child2 = G;
                A.child2 = F;
                F.parent = A;
                A.aabb.combine(B.aabb, F.aabb);
                C.aabb.combine(A.aabb, G.aabb);
                A.height = 1 + Math.max(B.height, F.height);
                C.height = 1 + Math.max(A.height, G.height);
            }
            return C;
        }
        // Rotate B up
        if (balance < -1) {
            const D = B.child1;
            const E = B.child2;
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
                A.height = 1 + Math.max(C.height, E.height);
                B.height = 1 + Math.max(A.height, D.height);
            }
            else {
                B.child2 = E;
                A.child1 = D;
                D.parent = A;
                A.aabb.combine(C.aabb, D.aabb);
                B.aabb.combine(A.aabb, E.aabb);
                A.height = 1 + Math.max(C.height, D.height);
                B.height = 1 + Math.max(A.height, E.height);
            }
            return B;
        }
        return A;
    }
    /**
     * Compute the height of the binary tree in O(N) time. Should not be called
     * often.
     */
    getHeight() {
        if (this.m_root == null) {
            return 0;
        }
        return this.m_root.height;
    }
    /**
     * Get the ratio of the sum of the node areas to the root area.
     */
    getAreaRatio() {
        if (this.m_root == null) {
            return 0.0;
        }
        const root = this.m_root;
        const rootArea = root.aabb.getPerimeter();
        let totalArea = 0.0;
        let node;
        const it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
            if (node.height < 0) {
                // Free node in pool
                continue;
            }
            totalArea += node.aabb.getPerimeter();
        }
        this.iteratorPool.release(it);
        return totalArea / rootArea;
    }
    /**
     * Compute the height of a sub-tree.
     */
    computeHeight(id) {
        let node;
        if (typeof id !== 'undefined') {
            node = this.m_nodes[id];
        }
        else {
            node = this.m_root;
        }
        // false && console.assert(0 <= id && id < this.m_nodeCapacity);
        if (node.isLeaf()) {
            return 0;
        }
        const height1 = this.computeHeight(node.child1.id);
        const height2 = this.computeHeight(node.child2.id);
        return 1 + Math.max(height1, height2);
    }
    validateStructure(node) {
        if (node == null) {
            return;
        }
        if (node === this.m_root) ;
        const child1 = node.child1;
        const child2 = node.child2;
        if (node.isLeaf()) {
            return;
        }
        this.validateStructure(child1);
        this.validateStructure(child2);
    }
    validateMetrics(node) {
        if (node == null) {
            return;
        }
        const child1 = node.child1;
        const child2 = node.child2;
        if (node.isLeaf()) {
            return;
        }
        // false && console.assert(0 <= child1 && child1 < this.m_nodeCapacity);
        // false && console.assert(0 <= child2 && child2 < this.m_nodeCapacity);
        child1.height;
        child2.height;
        const aabb = new AABB();
        aabb.combine(child1.aabb, child2.aabb);
        this.validateMetrics(child1);
        this.validateMetrics(child2);
    }
    /**
     * Validate this tree. For testing.
     */
    validate() {
        return;
    }
    /**
     * Get the maximum balance of an node in the tree. The balance is the difference
     * in height of the two children of a node.
     */
    getMaxBalance() {
        let maxBalance = 0;
        let node;
        const it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
            if (node.height <= 1) {
                continue;
            }
            const balance = Math.abs(node.child2.height - node.child1.height);
            maxBalance = Math.max(maxBalance, balance);
        }
        this.iteratorPool.release(it);
        return maxBalance;
    }
    /**
     * Build an optimal tree. Very expensive. For testing.
     */
    rebuildBottomUp() {
        const nodes = [];
        let count = 0;
        // Build array of leaves. Free the rest.
        let node;
        const it = this.iteratorPool.allocate().preorder(this.m_root);
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
            let minCost = Infinity;
            let iMin = -1;
            let jMin = -1;
            for (let i = 0; i < count; ++i) {
                const aabbi = nodes[i].aabb;
                for (let j = i + 1; j < count; ++j) {
                    const aabbj = nodes[j].aabb;
                    const cost = AABB.combinedPerimeter(aabbi, aabbj);
                    if (cost < minCost) {
                        iMin = i;
                        jMin = j;
                        minCost = cost;
                    }
                }
            }
            const child1 = nodes[iMin];
            const child2 = nodes[jMin];
            const parent = this.allocateNode();
            parent.child1 = child1;
            parent.child2 = child2;
            parent.height = 1 + Math.max(child1.height, child2.height);
            parent.aabb.combine(child1.aabb, child2.aabb);
            parent.parent = null;
            child1.parent = parent;
            child2.parent = parent;
            nodes[jMin] = nodes[count - 1];
            nodes[iMin] = parent;
            --count;
        }
        this.m_root = nodes[0];
    }
    /**
     * Shift the world origin. Useful for large worlds. The shift formula is:
     * position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    shiftOrigin(newOrigin) {
        // Build array of leaves. Free the rest.
        let node;
        const it = this.iteratorPool.allocate().preorder(this.m_root);
        while (node = it.next()) {
            const aabb = node.aabb;
            aabb.lowerBound.x -= newOrigin.x;
            aabb.lowerBound.y -= newOrigin.y;
            aabb.upperBound.x -= newOrigin.x;
            aabb.upperBound.y -= newOrigin.y;
        }
        this.iteratorPool.release(it);
    }
    /**
     * Query an AABB for overlapping proxies. The callback class is called for each
     * proxy that overlaps the supplied AABB.
     */
    query(aabb, queryCallback) {
        const stack = this.stackPool.allocate();
        stack.push(this.m_root);
        while (stack.length > 0) {
            const node = stack.pop();
            if (node == null) {
                continue;
            }
            if (AABB.testOverlap(node.aabb, aabb)) {
                if (node.isLeaf()) {
                    const proceed = queryCallback(node.id);
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
    }
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
    rayCast(input, rayCastCallback) {
        const p1 = input.p1;
        const p2 = input.p2;
        const r = Vec2.sub(p2, p1);
        r.normalize();
        // v is perpendicular to the segment.
        const v = Vec2.crossNumVec2(1.0, r);
        const abs_v = Vec2.abs(v);
        // Separating axis for segment (Gino, p80).
        // |dot(v, p1 - c)| > dot(|v|, h)
        let maxFraction = input.maxFraction;
        // Build a bounding box for the segment.
        const segmentAABB = new AABB();
        let t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
        segmentAABB.combinePoints(p1, t);
        const stack = this.stackPool.allocate();
        const subInput = this.inputPool.allocate();
        stack.push(this.m_root);
        while (stack.length > 0) {
            const node = stack.pop();
            if (node == null) {
                continue;
            }
            if (AABB.testOverlap(node.aabb, segmentAABB) === false) {
                continue;
            }
            // Separating axis for segment (Gino, p80).
            // |dot(v, p1 - c)| > dot(|v|, h)
            const c = node.aabb.getCenter();
            const h = node.aabb.getExtents();
            const separation = Math.abs(Vec2.dot(v, Vec2.sub(p1, c))) - Vec2.dot(abs_v, h);
            if (separation > 0.0) {
                continue;
            }
            if (node.isLeaf()) {
                subInput.p1 = Vec2.clone(input.p1);
                subInput.p2 = Vec2.clone(input.p2);
                subInput.maxFraction = maxFraction;
                const value = rayCastCallback(subInput, node.id);
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
    }
}
class Iterator {
    constructor() {
        this.parents = [];
        this.states = [];
    }
    preorder(root) {
        this.parents.length = 0;
        this.parents.push(root);
        this.states.length = 0;
        this.states.push(0);
        return this;
    }
    next() {
        while (this.parents.length > 0) {
            const i = this.parents.length - 1;
            const node = this.parents[i];
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
    }
    close() {
        this.parents.length = 0;
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
/**
 * The broad-phase wraps and extends a dynamic-tree to keep track of moved
 * objects and query them on update.
 */
class BroadPhase {
    constructor() {
        this.m_tree = new DynamicTree();
        this.m_moveBuffer = [];
        /**
         * Query an AABB for overlapping proxies. The callback class is called for each
         * proxy that overlaps the supplied AABB.
         */
        this.query = (aabb, queryCallback) => {
            this.m_tree.query(aabb, queryCallback);
        };
        this.queryCallback = (proxyId) => {
            // A proxy cannot form a pair with itself.
            if (proxyId === this.m_queryProxyId) {
                return true;
            }
            const proxyIdA = Math.min(proxyId, this.m_queryProxyId);
            const proxyIdB = Math.max(proxyId, this.m_queryProxyId);
            // TODO: Skip any duplicate pairs.
            const userDataA = this.m_tree.getUserData(proxyIdA);
            const userDataB = this.m_tree.getUserData(proxyIdB);
            // Send the pairs back to the client.
            this.m_callback(userDataA, userDataB);
            return true;
        };
    }
    /**
     * Get user data from a proxy. Returns null if the id is invalid.
     */
    getUserData(proxyId) {
        return this.m_tree.getUserData(proxyId);
    }
    /**
     * Test overlap of fat AABBs.
     */
    testOverlap(proxyIdA, proxyIdB) {
        const aabbA = this.m_tree.getFatAABB(proxyIdA);
        const aabbB = this.m_tree.getFatAABB(proxyIdB);
        return AABB.testOverlap(aabbA, aabbB);
    }
    /**
     * Get the fat AABB for a proxy.
     */
    getFatAABB(proxyId) {
        return this.m_tree.getFatAABB(proxyId);
    }
    /**
     * Get the number of proxies.
     */
    getProxyCount() {
        return this.m_moveBuffer.length;
    }
    /**
     * Get the height of the embedded tree.
     */
    getTreeHeight() {
        return this.m_tree.getHeight();
    }
    /**
     * Get the balance (integer) of the embedded tree.
     */
    getTreeBalance() {
        return this.m_tree.getMaxBalance();
    }
    /**
     * Get the quality metric of the embedded tree.
     */
    getTreeQuality() {
        return this.m_tree.getAreaRatio();
    }
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
    rayCast(input, rayCastCallback) {
        this.m_tree.rayCast(input, rayCastCallback);
    }
    /**
     * Shift the world origin. Useful for large worlds. The shift formula is:
     * position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    shiftOrigin(newOrigin) {
        this.m_tree.shiftOrigin(newOrigin);
    }
    /**
     * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
     * is called.
     */
    createProxy(aabb, userData) {
        const proxyId = this.m_tree.createProxy(aabb, userData);
        this.bufferMove(proxyId);
        return proxyId;
    }
    /**
     * Destroy a proxy. It is up to the client to remove any pairs.
     */
    destroyProxy(proxyId) {
        this.unbufferMove(proxyId);
        this.m_tree.destroyProxy(proxyId);
    }
    /**
     * Call moveProxy as many times as you like, then when you are done call
     * UpdatePairs to finalized the proxy pairs (for your time step).
     */
    moveProxy(proxyId, aabb, displacement) {
        const changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
        if (changed) {
            this.bufferMove(proxyId);
        }
    }
    /**
     * Call to trigger a re-processing of it's pairs on the next call to
     * UpdatePairs.
     */
    touchProxy(proxyId) {
        this.bufferMove(proxyId);
    }
    bufferMove(proxyId) {
        this.m_moveBuffer.push(proxyId);
    }
    unbufferMove(proxyId) {
        for (let i = 0; i < this.m_moveBuffer.length; ++i) {
            if (this.m_moveBuffer[i] === proxyId) {
                this.m_moveBuffer[i] = null;
            }
        }
    }
    /**
     * Update the pairs. This results in pair callbacks. This can only add pairs.
     */
    updatePairs(addPairCallback) {
        this.m_callback = addPairCallback;
        // Perform tree queries for all moving proxies.
        while (this.m_moveBuffer.length > 0) {
            this.m_queryProxyId = this.m_moveBuffer.pop();
            if (this.m_queryProxyId === null) {
                continue;
            }
            // We have to query the tree with the fat AABB so that
            // we don't fail to create a pair that may touch later.
            const fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
            // Query tree, create pairs and add them pair buffer.
            this.m_tree.query(fatAABB, this.queryCallback);
        }
        // Try to keep the tree balanced.
        // this.m_tree.rebalance(4);
    }
}

/*
 * Planck.js
 * The MIT License
 * Copyright (c) 2023 Ali Shakiba
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
function vec2(x, y) {
    return { x, y };
}
function rotation(angle) {
    return { s: Math.sin(angle), c: Math.cos(angle) };
}
function setVec2(out, x, y) {
    out.x = x;
    out.y = y;
    return out;
}
function copyVec2(out, w) {
    out.x = w.x;
    out.y = w.y;
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
function addVec2(out, w) {
    out.x += w.x;
    out.y += w.y;
    return out;
}
function sumVec2(out, v, w) {
    out.x = v.x + w.x;
    out.y = v.x + w.y;
    return out;
}
function subVec2(out, w) {
    out.x -= w.x;
    out.y -= w.y;
    return out;
}
function diffVec2(out, v, w) {
    out.x = v.x - w.x;
    out.y = v.y - w.y;
    return out;
}
function scaleVec2(out, m) {
    out.x *= m;
    out.y *= m;
    return out;
}
function setMulVec2(out, m, w) {
    out.x = m * w.x;
    out.y = m * w.y;
    return out;
}
function addMulVec2(out, m, w) {
    out.x += m * w.x;
    out.y += m * w.y;
    return out;
}
function subMulVec2(out, m, w) {
    out.x -= m * w.x;
    out.y -= m * w.y;
    return out;
}
function combineVec2(out, am, a, bm, b) {
    out.x = am * a.x + bm * b.x;
    out.y = am * a.y + bm * b.y;
    return out;
}
function normalizeVec2Length(out) {
    const length = Math.sqrt(out.x * out.x + out.y * out.y);
    if (length !== 0) {
        const invLength = 1 / length;
        out.x *= invLength;
        out.y *= invLength;
    }
    return length;
}
function normalizeVec2(out) {
    const length = Math.sqrt(out.x * out.x + out.y * out.y);
    if (length > 0) {
        const invLength = 1 / length;
        out.x *= invLength;
        out.y *= invLength;
    }
    return out;
}
function crossVec2Num(out, v, w) {
    const x = w * v.y;
    const y = -w * v.x;
    out.x = x;
    out.y = y;
    return out;
}
function crossNumVec2(out, w, v) {
    const x = -w * v.y;
    const y = w * v.x;
    out.x = x;
    out.y = y;
    return out;
}
function crossVec2Vec2(a, b) {
    return a.x * b.y - a.y * b.x;
}
function dotVec2(a, b) {
    return a.x * b.x + a.y * b.y;
}
function lengthSqrVec2(a) {
    return a.x * a.x + a.y * a.y;
}
function distVec2(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
function distSqrVec2(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
}
function setRotAngle(out, a) {
    out.c = Math.cos(a);
    out.s = Math.sin(a);
    return out;
}
function rotVec2(out, q, v) {
    out.x = q.c * v.x - q.s * v.y;
    out.y = q.s * v.x + q.c * v.y;
    return out;
}
function invRotVec2(out, q, v) {
    const x = q.c * v.x + q.s * v.y;
    const y = -q.s * v.x + q.c * v.y;
    out.x = x;
    out.y = y;
    return out;
}
function rerotVec2(out, before, after, v) {
    const x0 = before.c * v.x + before.s * v.y;
    const y0 = -before.s * v.x + before.c * v.y;
    const x = after.c * x0 - after.s * y0;
    const y = after.s * x0 + after.c * y0;
    out.x = x;
    out.y = y;
    return out;
}
function transform(x, y, a) {
    return { p: vec2(x, y), q: rotation(a) };
}
function copyTransform(out, transform) {
    out.p.x = transform.p.x;
    out.p.y = transform.p.y;
    out.q.s = transform.q.s;
    out.q.c = transform.q.c;
    return out;
}
function transformVec2(out, xf, v) {
    const x = xf.q.c * v.x - xf.q.s * v.y + xf.p.x;
    const y = xf.q.s * v.x + xf.q.c * v.y + xf.p.y;
    out.x = x;
    out.y = y;
    return out;
}
function invTransformVec2(out, xf, v) {
    const px = v.x - xf.p.x;
    const py = v.y - xf.p.y;
    const x = (xf.q.c * px + xf.q.s * py);
    const y = (-xf.q.s * px + xf.q.c * py);
    out.x = x;
    out.y = y;
    return out;
}
function retransformVec2(out, from, to, v) {
    const x0 = from.q.c * v.x - from.q.s * v.y + from.p.x;
    const y0 = from.q.s * v.x + from.q.c * v.y + from.p.y;
    const px = x0 - to.p.x;
    const py = y0 - to.p.y;
    const x = to.q.c * px + to.q.s * py;
    const y = -to.q.s * px + to.q.c * py;
    out.x = x;
    out.y = y;
    return out;
}
function invTransformTransform(out, a, b) {
    const c = a.q.c * b.q.c + a.q.s * b.q.s;
    const s = a.q.c * b.q.s - a.q.s * b.q.c;
    const x = a.q.c * (b.p.x - a.p.x) + a.q.s * (b.p.y - a.p.y);
    const y = -a.q.s * (b.p.x - a.p.x) + a.q.c * (b.p.y - a.p.y);
    out.q.c = c;
    out.q.s = s;
    out.p.x = x;
    out.p.y = y;
    return out;
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
class Rot {
    /** Initialize from an angle in radians. */
    constructor(angle) {
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
    static neo(angle) {
        const obj = Object.create(Rot.prototype);
        obj.setAngle(angle);
        return obj;
    }
    static clone(rot) {
        const obj = Object.create(Rot.prototype);
        obj.s = rot.s;
        obj.c = rot.c;
        return obj;
    }
    static identity() {
        const obj = Object.create(Rot.prototype);
        obj.s = 0.0;
        obj.c = 1.0;
        return obj;
    }
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return math.isFinite(obj.s) && math.isFinite(obj.c);
    }
    static assert(o) {
    }
    /** Set to the identity rotation. */
    setIdentity() {
        this.s = 0.0;
        this.c = 1.0;
    }
    set(angle) {
        if (typeof angle === 'object') {
            this.s = angle.s;
            this.c = angle.c;
        }
        else {
            // TODO_ERIN optimize
            this.s = math.sin(angle);
            this.c = math.cos(angle);
        }
    }
    setRot(angle) {
        this.s = angle.s;
        this.c = angle.c;
    }
    /** Set using an angle in radians. */
    setAngle(angle) {
        // TODO_ERIN optimize
        this.s = math.sin(angle);
        this.c = math.cos(angle);
    }
    /** Get the angle in radians. */
    getAngle() {
        return math.atan2(this.s, this.c);
    }
    /** Get the x-axis. */
    getXAxis() {
        return Vec2.neo(this.c, this.s);
    }
    /** Get the u-axis. */
    getYAxis() {
        return Vec2.neo(-this.s, this.c);
    }
    // tslint:disable-next-line:typedef
    static mul(rot, m) {
        if ('c' in m && 's' in m) {
            // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
            // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
            // s = qs * rc + qc * rs
            // c = qc * rc - qs * rs
            const qr = Rot.identity();
            qr.s = rot.s * m.c + rot.c * m.s;
            qr.c = rot.c * m.c - rot.s * m.s;
            return qr;
        }
        else if ('x' in m && 'y' in m) {
            return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
        }
    }
    /** Multiply two rotations: q * r */
    static mulRot(rot, m) {
        // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
        // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
        // s = qs * rc + qc * rs
        // c = qc * rc - qs * rs
        const qr = Rot.identity();
        qr.s = rot.s * m.c + rot.c * m.s;
        qr.c = rot.c * m.c - rot.s * m.s;
        return qr;
    }
    /** Rotate a vector */
    static mulVec2(rot, m) {
        return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
    }
    static mulSub(rot, v, w) {
        const x = rot.c * (v.x - w.x) - rot.s * (v.y - w.y);
        const y = rot.s * (v.x - w.x) + rot.c * (v.y - w.y);
        return Vec2.neo(x, y);
    }
    // tslint:disable-next-line:typedef
    static mulT(rot, m) {
        if ('c' in m && 's' in m) {
            // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
            // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
            // s = qc * rs - qs * rc
            // c = qc * rc + qs * rs
            const qr = Rot.identity();
            qr.s = rot.c * m.s - rot.s * m.c;
            qr.c = rot.c * m.c + rot.s * m.s;
            return qr;
        }
        else if ('x' in m && 'y' in m) {
            return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
        }
    }
    /** Transpose multiply two rotations: qT * r */
    static mulTRot(rot, m) {
        // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
        // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
        // s = qc * rs - qs * rc
        // c = qc * rc + qs * rs
        const qr = Rot.identity();
        qr.s = rot.c * m.s - rot.s * m.c;
        qr.c = rot.c * m.c + rot.s * m.s;
        return qr;
    }
    /** Inverse rotate a vector */
    static mulTVec2(rot, m) {
        return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
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
const temp$6 = vec2(0, 0);
/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 */
class Sweep {
    constructor() {
        /** Local center of mass position */
        this.localCenter = Vec2.zero();
        /** World center position */
        this.c = Vec2.zero();
        /** World angle */
        this.a = 0;
        /** Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0. */
        this.alpha0 = 0;
        this.c0 = Vec2.zero();
        this.a0 = 0;
    }
    /** @internal */
    recycle() {
        zeroVec2(this.localCenter);
        zeroVec2(this.c);
        this.a = 0;
        this.alpha0 = 0;
        zeroVec2(this.c0);
        this.a0 = 0;
    }
    setTransform(xf) {
        transformVec2(temp$6, xf, this.localCenter);
        copyVec2(this.c, temp$6);
        copyVec2(this.c0, temp$6);
        this.a = this.a0 = math.atan2(xf.q.s, xf.q.c);
    }
    setLocalCenter(localCenter, xf) {
        copyVec2(this.localCenter, localCenter);
        transformVec2(temp$6, xf, this.localCenter);
        copyVec2(this.c, temp$6);
        copyVec2(this.c0, temp$6);
    }
    /**
     * Get the interpolated transform at a specific time.
     *
     * @param xf
     * @param beta A factor in [0,1], where 0 indicates alpha0
     */
    getTransform(xf, beta = 0) {
        setRotAngle(xf.q, (1.0 - beta) * this.a0 + beta * this.a);
        combineVec2(xf.p, (1.0 - beta), this.c0, beta, this.c);
        // shift to origin
        subVec2(xf.p, rotVec2(temp$6, xf.q, this.localCenter));
    }
    /**
     * Advance the sweep forward, yielding a new initial state.
     *
     * @param alpha The new initial time
     */
    advance(alpha) {
        const beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
        combineVec2(this.c0, beta, this.c, 1 - beta, this.c0);
        this.a0 = beta * this.a + (1 - beta) * this.a0;
        this.alpha0 = alpha;
    }
    forward() {
        this.a0 = this.a;
        copyVec2(this.c0, this.c);
    }
    /**
     * normalize the angles in radians to be between -pi and pi.
     */
    normalize() {
        const a0 = math.mod(this.a0, -math.PI, +math.PI);
        this.a -= this.a0 - a0;
        this.a0 = a0;
    }
    set(that) {
        copyVec2(this.localCenter, that.localCenter);
        copyVec2(this.c, that.c);
        this.a = that.a;
        this.alpha0 = that.alpha0;
        copyVec2(this.c0, that.c0);
        this.a0 = that.a0;
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
/**
 * A transform contains translation and rotation. It is used to represent the
 * position and orientation of rigid frames. Initialize using a position vector
 * and a rotation.
 */
class Transform {
    constructor(position, rotation) {
        this.p = Vec2.zero();
        this.q = Rot.identity();
        if (typeof position !== 'undefined') {
            this.p.setVec2(position);
        }
        if (typeof rotation !== 'undefined') {
            this.q.setAngle(rotation);
        }
    }
    static clone(xf) {
        const obj = Object.create(Transform.prototype);
        obj.p = Vec2.clone(xf.p);
        obj.q = Rot.clone(xf.q);
        return obj;
    }
    /** @internal */
    static neo(position, rotation) {
        const obj = Object.create(Transform.prototype);
        obj.p = Vec2.clone(position);
        obj.q = Rot.clone(rotation);
        return obj;
    }
    static identity() {
        const obj = Object.create(Transform.prototype);
        obj.p = Vec2.zero();
        obj.q = Rot.identity();
        return obj;
    }
    /**
     * Set this to the identity transform.
     */
    setIdentity() {
        this.p.setZero();
        this.q.setIdentity();
    }
    /**
     * Set this based on the position and angle.
     */
    // tslint:disable-next-line:typedef
    set(a, b) {
        if (typeof b === 'undefined') {
            this.p.set(a.p);
            this.q.set(a.q);
        }
        else {
            this.p.set(a);
            this.q.set(b);
        }
    }
    /**
     * Set this based on the position and angle.
     */
    setNum(position, rotation) {
        this.p.setVec2(position);
        this.q.setAngle(rotation);
    }
    setTransform(xf) {
        this.p.setVec2(xf.p);
        this.q.setRot(xf.q);
    }
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
    }
    static assert(o) {
    }
    // static mul(a: Transform, b: Vec2Value[]): Vec2[];
    // static mul(a: Transform, b: Transform[]): Transform[];
    // tslint:disable-next-line:typedef
    static mul(a, b) {
        if (Array.isArray(b)) {
            const arr = [];
            for (let i = 0; i < b.length; i++) {
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
    }
    // tslint:disable-next-line:typedef
    static mulAll(a, b) {
        const arr = [];
        for (let i = 0; i < b.length; i++) {
            arr[i] = Transform.mul(a, b[i]);
        }
        return arr;
    }
    /** @internal @deprecated */
    // tslint:disable-next-line:typedef
    static mulFn(a) {
        return function (b) {
            return Transform.mul(a, b);
        };
    }
    static mulVec2(a, b) {
        const x = (a.q.c * b.x - a.q.s * b.y) + a.p.x;
        const y = (a.q.s * b.x + a.q.c * b.y) + a.p.y;
        return Vec2.neo(x, y);
    }
    static mulXf(a, b) {
        // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
        // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
        const xf = Transform.identity();
        xf.q = Rot.mulRot(a.q, b.q);
        xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
        return xf;
    }
    // tslint:disable-next-line:typedef
    static mulT(a, b) {
        if ('x' in b && 'y' in b) {
            return Transform.mulTVec2(a, b);
        }
        else if ('p' in b && 'q' in b) {
            return Transform.mulTXf(a, b);
        }
    }
    static mulTVec2(a, b) {
        const px = b.x - a.p.x;
        const py = b.y - a.p.y;
        const x = (a.q.c * px + a.q.s * py);
        const y = (-a.q.s * px + a.q.c * py);
        return Vec2.neo(x, y);
    }
    static mulTXf(a, b) {
        // v2 = A.q' * (B.q * v1 + B.p - A.p)
        // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
        const xf = Transform.identity();
        xf.q.setRot(Rot.mulTRot(a.q, b.q));
        xf.p.setVec2(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
        return xf;
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
class Velocity {
    constructor() {
        /** linear */
        this.v = Vec2.zero();
        /** angular */
        this.w = 0;
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
class Position {
    constructor() {
        /** location */
        this.c = Vec2.zero();
        /** angle */
        this.a = 0;
    }
    // todo: cache sin/cos
    getTransform(xf, p) {
        // xf.q = rotation(this.a);
        // xf.p = this.c - xf.q * p
        xf.q.c = Math.cos(this.a);
        xf.q.s = Math.sin(this.a);
        xf.p.x = this.c.x - (xf.q.c * p.x - xf.q.s * p.y);
        xf.p.y = this.c.y - (xf.q.s * p.x + xf.q.c * p.y);
        return xf;
    }
}
function getTransform(xf, p, c, a) {
    // xf.q = rotation(a);
    // xf.p = this.c - xf.q * p
    xf.q.c = Math.cos(a);
    xf.q.s = Math.sin(a);
    xf.p.x = c.x - (xf.q.c * p.x - xf.q.s * p.y);
    xf.p.y = c.y - (xf.q.s * p.x + xf.q.c * p.y);
    return xf;
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
// todo make shape an interface
/**
 * A shape is used for collision detection. You can create a shape however you
 * like. Shapes used for simulation in World are created automatically when a
 * Fixture is created. Shapes may encapsulate one or more child shapes.
 */
class Shape {
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return typeof obj.m_type === 'string' && typeof obj.m_radius === 'number';
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
const synchronize_aabb1 = new AABB();
const synchronize_aabb2 = new AABB();
const displacement = vec2(0, 0);
const FixtureDefDefault = {
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
class FixtureProxy {
    constructor(fixture, childIndex) {
        this.aabb = new AABB();
        this.fixture = fixture;
        this.childIndex = childIndex;
        this.proxyId;
    }
}
/**
 * A fixture is used to attach a shape to a body for collision detection. A
 * fixture inherits its transform from its parent. Fixtures hold additional
 * non-geometric data such as friction, collision filters, etc.
 *
 * To create a new Fixture use {@link Body.createFixture}.
 */
class Fixture {
    // tslint:disable-next-line:typedef
    /** @internal */ constructor(body, shape, def) {
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
        const childCount = this.m_shape.getChildCount();
        for (let i = 0; i < childCount; ++i) {
            this.m_proxies[i] = new FixtureProxy(this, i);
        }
        this.m_userData = def.userData;
    }
    /**
     * Re-setup fixture.
     * @internal
     */
    _reset() {
        const body = this.getBody();
        const broadPhase = body.m_world.m_broadPhase;
        this.destroyProxies(broadPhase);
        if (this.m_shape._reset) {
            this.m_shape._reset();
        }
        const childCount = this.m_shape.getChildCount();
        for (let i = 0; i < childCount; ++i) {
            this.m_proxies[i] = new FixtureProxy(this, i);
        }
        this.createProxies(broadPhase, body.m_xf);
        body.resetMassData();
    }
    /** @internal */
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, body, restore) {
        const shape = restore(Shape, data.shape);
        const fixture = shape && new Fixture(body, shape, data);
        return fixture;
    }
    /**
     * Get the type of the child shape. You can use this to down cast to the
     * concrete shape.
     */
    getType() {
        return this.m_shape.m_type;
    }
    /**
     * Get the child shape. You can modify the child shape, however you should not
     * change the number of vertices because this will crash some collision caching
     * mechanisms. Manipulating the shape may lead to non-physical behavior.
     */
    getShape() {
        return this.m_shape;
    }
    /**
     * A sensor shape collects contact information but never generates a collision
     * response.
     */
    isSensor() {
        return this.m_isSensor;
    }
    /**
     * Set if this fixture is a sensor.
     */
    setSensor(sensor) {
        if (sensor != this.m_isSensor) {
            this.m_body.setAwake(true);
            this.m_isSensor = sensor;
        }
    }
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
    getUserData() {
        return this.m_userData;
    }
    /**
     * Set the user data. Use this to store your application specific data.
     */
    setUserData(data) {
        this.m_userData = data;
    }
    /**
     * Get the parent body of this fixture. This is null if the fixture is not
     * attached.
     */
    getBody() {
        return this.m_body;
    }
    /**
     * Get the next fixture in the parent body's fixture list.
     */
    getNext() {
        return this.m_next;
    }
    /**
     * Get the density of this fixture.
     */
    getDensity() {
        return this.m_density;
    }
    /**
     * Set the density of this fixture. This will _not_ automatically adjust the
     * mass of the body. You must call Body.resetMassData to update the body's mass.
     */
    setDensity(density) {
        this.m_density = density;
    }
    /**
     * Get the coefficient of friction, usually in the range [0,1].
     */
    getFriction() {
        return this.m_friction;
    }
    /**
     * Set the coefficient of friction. This will not change the friction of
     * existing contacts.
     */
    setFriction(friction) {
        this.m_friction = friction;
    }
    /**
     * Get the coefficient of restitution.
     */
    getRestitution() {
        return this.m_restitution;
    }
    /**
     * Set the coefficient of restitution. This will not change the restitution of
     * existing contacts.
     */
    setRestitution(restitution) {
        this.m_restitution = restitution;
    }
    /**
     * Test a point in world coordinates for containment in this fixture.
     */
    testPoint(p) {
        return this.m_shape.testPoint(this.m_body.getTransform(), p);
    }
    /**
     * Cast a ray against this shape.
     */
    rayCast(output, input, childIndex) {
        return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
    }
    /**
     * Get the mass data for this fixture. The mass data is based on the density and
     * the shape. The rotational inertia is about the shape's origin. This operation
     * may be expensive.
     */
    getMassData(massData) {
        this.m_shape.computeMass(massData, this.m_density);
    }
    /**
     * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
     * more accurate AABB, compute it using the shape and the body transform.
     */
    getAABB(childIndex) {
        return this.m_proxies[childIndex].aabb;
    }
    /**
     * These support body activation/deactivation.
     */
    createProxies(broadPhase, xf) {
        // Create proxies in the broad-phase.
        const childCount = this.m_shape.getChildCount();
        for (let i = 0; i < childCount; ++i) {
            const proxy = this.m_proxies[i];
            this.m_shape.computeAABB(proxy.aabb, xf, i);
            proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
        }
    }
    destroyProxies(broadPhase) {
        // Destroy proxies in the broad-phase.
        for (let i = 0; i < this.m_proxies.length; ++i) {
            const proxy = this.m_proxies[i];
            broadPhase.destroyProxy(proxy.proxyId);
            proxy.proxyId = null;
            proxy.fixture = null;
        }
        this.m_proxies.length = 0;
    }
    /**
     * Updates this fixture proxy in broad-phase (with combined AABB of current and
     * next transformation).
     */
    synchronize(broadPhase, xf1, xf2) {
        for (let i = 0; i < this.m_proxies.length; ++i) {
            const proxy = this.m_proxies[i];
            // Compute an AABB that covers the swept shape (may miss some rotation
            // effect).
            this.m_shape.computeAABB(synchronize_aabb1, xf1, proxy.childIndex);
            this.m_shape.computeAABB(synchronize_aabb2, xf2, proxy.childIndex);
            proxy.aabb.combine(synchronize_aabb1, synchronize_aabb2);
            diffVec2(displacement, xf2.p, xf1.p);
            broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
        }
    }
    /**
     * Set the contact filtering data. This will not update contacts until the next
     * time step when either parent body is active and awake. This automatically
     * calls refilter.
     */
    setFilterData(filter) {
        this.m_filterGroupIndex = filter.groupIndex;
        this.m_filterCategoryBits = filter.categoryBits;
        this.m_filterMaskBits = filter.maskBits;
        this.refilter();
    }
    getFilterGroupIndex() {
        return this.m_filterGroupIndex;
    }
    setFilterGroupIndex(groupIndex) {
        this.m_filterGroupIndex = groupIndex;
    }
    getFilterCategoryBits() {
        return this.m_filterCategoryBits;
    }
    setFilterCategoryBits(categoryBits) {
        this.m_filterCategoryBits = categoryBits;
    }
    getFilterMaskBits() {
        return this.m_filterMaskBits;
    }
    setFilterMaskBits(maskBits) {
        this.m_filterMaskBits = maskBits;
    }
    /**
     * Call this if you want to establish collision that was previously disabled by
     * ContactFilter.
     */
    refilter() {
        if (this.m_body == null) {
            return;
        }
        // Flag associated contacts for filtering.
        let edge = this.m_body.getContactList();
        while (edge) {
            const contact = edge.contact;
            const fixtureA = contact.getFixtureA();
            const fixtureB = contact.getFixtureB();
            if (fixtureA == this || fixtureB == this) {
                contact.flagForFiltering();
            }
            edge = edge.next;
        }
        const world = this.m_body.getWorld();
        if (world == null) {
            return;
        }
        // Touch each proxy so that new pairs may be created
        const broadPhase = world.m_broadPhase;
        for (let i = 0; i < this.m_proxies.length; ++i) {
            broadPhase.touchProxy(this.m_proxies[i].proxyId);
        }
    }
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
    shouldCollide(that) {
        if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
            return that.m_filterGroupIndex > 0;
        }
        const collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
        const collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
        const collide = collideA && collideB;
        return collide;
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
const STATIC = 'static';
const KINEMATIC = 'kinematic';
const DYNAMIC = 'dynamic';
const oldCenter = vec2(0, 0);
const localCenter = vec2(0, 0);
const shift = vec2(0, 0);
const xf$2 = transform(0, 0, 0);
const BodyDefDefault = {
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
class MassData {
    constructor() {
        /** The mass of the shape, usually in kilograms. */
        this.mass = 0;
        /** The position of the shape's centroid relative to the shape's origin. */
        this.center = Vec2.zero();
        /** The rotational inertia of the shape about the local origin. */
        this.I = 0;
    }
}
/**
 * A rigid body composed of one or more fixtures.
 *
 * To create a new Body use {@link World.createBody}.
 */
class Body {
    /** @internal */
    constructor(world, def) {
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
        this.m_xf.p.setVec2(def.position);
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
    _serialize() {
        const fixtures = [];
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            fixtures.push(f);
        }
        return {
            type: this.m_type,
            bullet: this.m_bulletFlag,
            position: this.m_xf.p,
            angle: this.m_xf.q.getAngle(),
            linearVelocity: this.m_linearVelocity,
            angularVelocity: this.m_angularVelocity,
            fixtures,
        };
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        const body = new Body(world, data);
        if (data.fixtures) {
            for (let i = data.fixtures.length - 1; i >= 0; i--) {
                const fixture = restore(Fixture, data.fixtures[i], body);
                body._addFixture(fixture);
            }
        }
        return body;
    }
    isWorldLocked() {
        return this.m_world && this.m_world.isLocked() ? true : false;
    }
    getWorld() {
        return this.m_world;
    }
    getNext() {
        return this.m_next;
    }
    setUserData(data) {
        this.m_userData = data;
    }
    getUserData() {
        return this.m_userData;
    }
    getFixtureList() {
        return this.m_fixtureList;
    }
    getJointList() {
        return this.m_jointList;
    }
    /**
     * Warning: this list changes during the time step and you may miss some
     * collisions if you don't use ContactListener.
     */
    getContactList() {
        return this.m_contactList;
    }
    isStatic() {
        return this.m_type == STATIC;
    }
    isDynamic() {
        return this.m_type == DYNAMIC;
    }
    isKinematic() {
        return this.m_type == KINEMATIC;
    }
    /**
     * This will alter the mass and velocity.
     */
    setStatic() {
        this.setType(STATIC);
        return this;
    }
    setDynamic() {
        this.setType(DYNAMIC);
        return this;
    }
    setKinematic() {
        this.setType(KINEMATIC);
        return this;
    }
    /**
     * @internal
     */
    getType() {
        return this.m_type;
    }
    /**
     * @internal
     */
    setType(type) {
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
        let ce = this.m_contactList;
        while (ce) {
            const ce0 = ce;
            ce = ce.next;
            this.m_world.destroyContact(ce0.contact);
        }
        this.m_contactList = null;
        // Touch the proxies so that new contacts will be created (when appropriate)
        const broadPhase = this.m_world.m_broadPhase;
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            for (let i = 0; i < f.m_proxies.length; ++i) {
                broadPhase.touchProxy(f.m_proxies[i].proxyId);
            }
        }
    }
    isBullet() {
        return this.m_bulletFlag;
    }
    /**
     * Should this body be treated like a bullet for continuous collision detection?
     */
    setBullet(flag) {
        this.m_bulletFlag = !!flag;
    }
    isSleepingAllowed() {
        return this.m_autoSleepFlag;
    }
    setSleepingAllowed(flag) {
        this.m_autoSleepFlag = !!flag;
        if (this.m_autoSleepFlag == false) {
            this.setAwake(true);
        }
    }
    isAwake() {
        return this.m_awakeFlag;
    }
    /**
     * Set the sleep state of the body. A sleeping body has very low CPU cost.
     *
     * @param flag Set to true to wake the body, false to put it to sleep.
     */
    setAwake(flag) {
        if (flag) {
            this.m_awakeFlag = true;
            this.m_sleepTime = 0.0;
        }
        else {
            this.m_awakeFlag = false;
            this.m_sleepTime = 0.0;
            this.m_linearVelocity.setZero();
            this.m_angularVelocity = 0.0;
            this.m_force.setZero();
            this.m_torque = 0.0;
        }
    }
    isActive() {
        return this.m_activeFlag;
    }
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
    setActive(flag) {
        if (flag == this.m_activeFlag) {
            return;
        }
        this.m_activeFlag = !!flag;
        if (this.m_activeFlag) {
            // Create all proxies.
            const broadPhase = this.m_world.m_broadPhase;
            for (let f = this.m_fixtureList; f; f = f.m_next) {
                f.createProxies(broadPhase, this.m_xf);
            }
            // Contacts are created the next time step.
        }
        else {
            // Destroy all proxies.
            const broadPhase = this.m_world.m_broadPhase;
            for (let f = this.m_fixtureList; f; f = f.m_next) {
                f.destroyProxies(broadPhase);
            }
            // Destroy the attached contacts.
            let ce = this.m_contactList;
            while (ce) {
                const ce0 = ce;
                ce = ce.next;
                this.m_world.destroyContact(ce0.contact);
            }
            this.m_contactList = null;
        }
    }
    isFixedRotation() {
        return this.m_fixedRotationFlag;
    }
    /**
     * Set this body to have fixed rotation. This causes the mass to be reset.
     */
    setFixedRotation(flag) {
        if (this.m_fixedRotationFlag == flag) {
            return;
        }
        this.m_fixedRotationFlag = !!flag;
        this.m_angularVelocity = 0.0;
        this.resetMassData();
    }
    /**
     * Get the world transform for the body's origin.
     */
    getTransform() {
        return this.m_xf;
    }
    /**
     * Set the position of the body's origin and rotation. Manipulating a body's
     * transform may cause non-physical behavior. Note: contacts are updated on the
     * next call to World.step.
     *
     * @param position The world position of the body's local origin.
     * @param angle The world rotation in radians.
     */
    setTransform(position, angle) {
        if (this.isWorldLocked() == true) {
            return;
        }
        this.m_xf.setNum(position, angle);
        this.m_sweep.setTransform(this.m_xf);
        const broadPhase = this.m_world.m_broadPhase;
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            f.synchronize(broadPhase, this.m_xf, this.m_xf);
        }
    }
    synchronizeTransform() {
        this.m_sweep.getTransform(this.m_xf, 1);
    }
    /**
     * Update fixtures in broad-phase.
     */
    synchronizeFixtures() {
        this.m_sweep.getTransform(xf$2, 0);
        const broadPhase = this.m_world.m_broadPhase;
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            f.synchronize(broadPhase, xf$2, this.m_xf);
        }
    }
    /**
     * Used in TOI.
     */
    advance(alpha) {
        // Advance to the new safe time. This doesn't sync the broad-phase.
        this.m_sweep.advance(alpha);
        copyVec2(this.m_sweep.c, this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.m_sweep.getTransform(this.m_xf, 1);
    }
    /**
     * Get the world position for the body's origin.
     */
    getPosition() {
        return this.m_xf.p;
    }
    setPosition(p) {
        this.setTransform(p, this.m_sweep.a);
    }
    /**
     * Get the current world rotation angle in radians.
     */
    getAngle() {
        return this.m_sweep.a;
    }
    setAngle(angle) {
        this.setTransform(this.m_xf.p, angle);
    }
    /**
     * Get the world position of the center of mass.
     */
    getWorldCenter() {
        return this.m_sweep.c;
    }
    /**
     * Get the local position of the center of mass.
     */
    getLocalCenter() {
        return this.m_sweep.localCenter;
    }
    /**
     * Get the linear velocity of the center of mass.
     *
     * @return the linear velocity of the center of mass.
     */
    getLinearVelocity() {
        return this.m_linearVelocity;
    }
    /**
     * Get the world linear velocity of a world point attached to this body.
     *
     * @param worldPoint A point in world coordinates.
     */
    getLinearVelocityFromWorldPoint(worldPoint) {
        const localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
        return Vec2.add(this.m_linearVelocity, Vec2.crossNumVec2(this.m_angularVelocity, localCenter));
    }
    /**
     * Get the world velocity of a local point.
     *
     * @param localPoint A point in local coordinates.
     */
    getLinearVelocityFromLocalPoint(localPoint) {
        return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
    }
    /**
     * Set the linear velocity of the center of mass.
     *
     * @param v The new linear velocity of the center of mass.
     */
    setLinearVelocity(v) {
        if (this.m_type == STATIC) {
            return;
        }
        if (Vec2.dot(v, v) > 0.0) {
            this.setAwake(true);
        }
        this.m_linearVelocity.setVec2(v);
    }
    /**
     * Get the angular velocity.
     *
     * @returns the angular velocity in radians/second.
     */
    getAngularVelocity() {
        return this.m_angularVelocity;
    }
    /**
     * Set the angular velocity.
     *
     * @param omega The new angular velocity in radians/second.
     */
    setAngularVelocity(w) {
        if (this.m_type == STATIC) {
            return;
        }
        if (w * w > 0.0) {
            this.setAwake(true);
        }
        this.m_angularVelocity = w;
    }
    getLinearDamping() {
        return this.m_linearDamping;
    }
    setLinearDamping(linearDamping) {
        this.m_linearDamping = linearDamping;
    }
    getAngularDamping() {
        return this.m_angularDamping;
    }
    setAngularDamping(angularDamping) {
        this.m_angularDamping = angularDamping;
    }
    getGravityScale() {
        return this.m_gravityScale;
    }
    /**
     * Scale the gravity applied to this body.
     */
    setGravityScale(scale) {
        this.m_gravityScale = scale;
    }
    /**
     * Get the total mass of the body.
     *
     * @returns The mass, usually in kilograms (kg).
     */
    getMass() {
        return this.m_mass;
    }
    /**
     * Get the rotational inertia of the body about the local origin.
     *
     * @return the rotational inertia, usually in kg-m^2.
     */
    getInertia() {
        return this.m_I + this.m_mass
            * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
    }
    /**
     * Copy the mass data of the body to data.
     */
    getMassData(data) {
        data.mass = this.m_mass;
        data.I = this.getInertia();
        data.center.setVec2(this.m_sweep.localCenter);
    }
    /**
     * This resets the mass properties to the sum of the mass properties of the
     * fixtures. This normally does not need to be called unless you called
     * SetMassData to override the mass and you later want to reset the mass.
     */
    resetMassData() {
        // Compute mass data from shapes. Each shape has its own density.
        this.m_mass = 0.0;
        this.m_invMass = 0.0;
        this.m_I = 0.0;
        this.m_invI = 0.0;
        zeroVec2(this.m_sweep.localCenter);
        // Static and kinematic bodies have zero mass.
        if (this.isStatic() || this.isKinematic()) {
            copyVec2(this.m_sweep.c0, this.m_xf.p);
            copyVec2(this.m_sweep.c, this.m_xf.p);
            this.m_sweep.a0 = this.m_sweep.a;
            return;
        }
        // Accumulate mass over all fixtures.
        zeroVec2(localCenter);
        for (let f = this.m_fixtureList; f; f = f.m_next) {
            if (f.m_density == 0.0) {
                continue;
            }
            const massData = new MassData();
            f.getMassData(massData);
            this.m_mass += massData.mass;
            addMulVec2(localCenter, massData.mass, massData.center);
            this.m_I += massData.I;
        }
        // Compute center of mass.
        if (this.m_mass > 0.0) {
            this.m_invMass = 1.0 / this.m_mass;
            setMulVec2(localCenter, this.m_invMass, localCenter);
        }
        else {
            // Force all dynamic bodies to have a positive mass.
            this.m_mass = 1.0;
            this.m_invMass = 1.0;
        }
        if (this.m_I > 0.0 && this.m_fixedRotationFlag == false) {
            // Center the inertia about the center of mass.
            this.m_I -= this.m_mass * dotVec2(localCenter, localCenter);
            this.m_invI = 1.0 / this.m_I;
        }
        else {
            this.m_I = 0.0;
            this.m_invI = 0.0;
        }
        // Move center of mass.
        copyVec2(oldCenter, this.m_sweep.c);
        this.m_sweep.setLocalCenter(localCenter, this.m_xf);
        // Update center of mass velocity.
        diffVec2(shift, this.m_sweep.c, oldCenter);
        crossNumVec2(this.m_linearVelocity, this.m_angularVelocity, shift);
    }
    /**
     * Set the mass properties to override the mass properties of the fixtures. Note
     * that this changes the center of mass position. Note that creating or
     * destroying fixtures can also alter the mass. This function has no effect if
     * the body isn't dynamic.
     *
     * @param massData The mass properties.
     */
    setMassData(massData) {
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
            this.m_I = massData.I - this.m_mass * dotVec2(massData.center, massData.center);
            this.m_invI = 1.0 / this.m_I;
        }
        // Move center of mass.
        copyVec2(oldCenter, this.m_sweep.c);
        this.m_sweep.setLocalCenter(massData.center, this.m_xf);
        // Update center of mass velocity.
        diffVec2(shift, this.m_sweep.c, oldCenter);
        crossNumVec2(this.m_linearVelocity, this.m_angularVelocity, shift);
    }
    /**
     * Apply a force at a world point. If the force is not applied at the center of
     * mass, it will generate a torque and affect the angular velocity. This wakes
     * up the body.
     *
     * @param force The world force vector, usually in Newtons (N).
     * @param point The world position of the point of application.
     * @param wake Also wake up the body
     */
    applyForce(force, point, wake = true) {
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
    }
    /**
     * Apply a force to the center of mass. This wakes up the body.
     *
     * @param force The world force vector, usually in Newtons (N).
     * @param wake Also wake up the body
     */
    applyForceToCenter(force, wake = true) {
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
    }
    /**
     * Apply a torque. This affects the angular velocity without affecting the
     * linear velocity of the center of mass. This wakes up the body.
     *
     * @param torque About the z-axis (out of the screen), usually in N-m.
     * @param wake Also wake up the body
     */
    applyTorque(torque, wake = true) {
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
    }
    /**
     * Apply an impulse at a point. This immediately modifies the velocity. It also
     * modifies the angular velocity if the point of application is not at the
     * center of mass. This wakes up the body.
     *
     * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
     * @param point The world position of the point of application.
     * @param wake Also wake up the body
     */
    applyLinearImpulse(impulse, point, wake = true) {
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
    }
    /**
     * Apply an angular impulse.
     *
     * @param impulse The angular impulse in units of kg*m*m/s
     * @param wake Also wake up the body
     */
    applyAngularImpulse(impulse, wake = true) {
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
    }
    /**
     * This is used to prevent connected bodies (by joints) from colliding,
     * depending on the joint's collideConnected flag.
     */
    shouldCollide(that) {
        // At least one body should be dynamic.
        if (this.m_type != DYNAMIC && that.m_type != DYNAMIC) {
            return false;
        }
        // Does a joint prevent collision?
        for (let jn = this.m_jointList; jn; jn = jn.next) {
            if (jn.other == that) {
                if (jn.joint.m_collideConnected == false) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * @internal Used for deserialize.
     */
    _addFixture(fixture) {
        if (this.isWorldLocked() == true) {
            return null;
        }
        if (this.m_activeFlag) {
            const broadPhase = this.m_world.m_broadPhase;
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
    }
    // tslint:disable-next-line:typedef
    createFixture(shape, fixdef) {
        if (this.isWorldLocked() == true) {
            return null;
        }
        const fixture = new Fixture(this, shape, fixdef);
        this._addFixture(fixture);
        return fixture;
    }
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
    destroyFixture(fixture) {
        if (this.isWorldLocked() == true) {
            return;
        }
        if (this.m_fixtureList === fixture) {
            this.m_fixtureList = fixture.m_next;
        }
        else {
            let node = this.m_fixtureList;
            while (node != null) {
                if (node.m_next === fixture) {
                    node.m_next = fixture.m_next;
                    break;
                }
                node = node.m_next;
            }
        }
        // Destroy any contacts associated with the fixture.
        let edge = this.m_contactList;
        while (edge) {
            const c = edge.contact;
            edge = edge.next;
            const fixtureA = c.getFixtureA();
            const fixtureB = c.getFixtureB();
            if (fixture == fixtureA || fixture == fixtureB) {
                // This destroys the contact and removes it from
                // this body's contact list.
                this.m_world.destroyContact(c);
            }
        }
        if (this.m_activeFlag) {
            const broadPhase = this.m_world.m_broadPhase;
            fixture.destroyProxies(broadPhase);
        }
        fixture.m_body = null;
        fixture.m_next = null;
        this.m_world.publish('remove-fixture', fixture);
        // Reset the mass data.
        this.resetMassData();
    }
    /**
     * Get the corresponding world point of a local point.
     */
    getWorldPoint(localPoint) {
        return Transform.mulVec2(this.m_xf, localPoint);
    }
    /**
     * Get the corresponding world vector of a local vector.
     */
    getWorldVector(localVector) {
        return Rot.mulVec2(this.m_xf.q, localVector);
    }
    /**
     * Gets the corresponding local point of a world point.
     */
    getLocalPoint(worldPoint) {
        return Transform.mulTVec2(this.m_xf, worldPoint);
    }
    /**
     * Gets the corresponding local vector of a world vector.
     */
    getLocalVector(worldVector) {
        return Rot.mulTVec2(this.m_xf.q, worldVector);
    }
}
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
class JointEdge {
    constructor() {
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
}
/**
 * The base joint class. Joints are used to constraint two bodies together in
 * various fashions. Some joints also feature limits and motors.
 */
class Joint {
    constructor(def, bodyA, bodyB) {
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
    isActive() {
        return this.m_bodyA.isActive() && this.m_bodyB.isActive();
    }
    /**
     * Get the type of the concrete joint.
     */
    getType() {
        return this.m_type;
    }
    /**
     * Get the first body attached to this joint.
     */
    getBodyA() {
        return this.m_bodyA;
    }
    /**
     * Get the second body attached to this joint.
     */
    getBodyB() {
        return this.m_bodyB;
    }
    /**
     * Get the next joint the world joint list.
     */
    getNext() {
        return this.m_next;
    }
    getUserData() {
        return this.m_userData;
    }
    setUserData(data) {
        this.m_userData = data;
    }
    /**
     * Get collide connected. Note: modifying the collide connect flag won't work
     * correctly because the flag is only checked when fixture AABBs begin to
     * overlap.
     */
    getCollideConnected() {
        return this.m_collideConnected;
    }
    /**
     * Shift the origin for any points stored in world coordinates.
     */
    shiftOrigin(newOrigin) { }
}

const stats = {
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
    toString(newline) {
        newline = typeof newline === 'string' ? newline : '\n';
        let string = "";
        // tslint:disable-next-line:no-for-in
        for (const name in this) {
            if (typeof this[name] !== 'function' && typeof this[name] !== 'object') {
                string += name + ': ' + this[name] + newline;
            }
        }
        return string;
    }
};

const now = function () {
    return Date.now();
};
const diff = function (time) {
    return Date.now() - time;
};
var Timer = {
    now,
    diff,
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
const temp$5 = vec2(0, 0);
const normal$4 = vec2(0, 0);
const e12 = vec2(0, 0);
const e13 = vec2(0, 0);
const e23 = vec2(0, 0);
const temp1 = vec2(0, 0);
const temp2 = vec2(0, 0);
/**
 * GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates.
 */
stats.gjkCalls = 0;
stats.gjkIters = 0;
stats.gjkMaxIters = 0;
/**
 * Input for Distance. You have to option to use the shape radii in the
 * computation. Even
 */
class DistanceInput {
    constructor() {
        this.proxyA = new DistanceProxy();
        this.proxyB = new DistanceProxy();
        this.transformA = Transform.identity();
        this.transformB = Transform.identity();
        this.useRadii = false;
    }
    recycle() {
        this.proxyA.recycle();
        this.proxyB.recycle();
        this.transformA.setIdentity();
        this.transformB.setIdentity();
        this.useRadii = false;
    }
}
/**
 * Output for Distance.
 */
class DistanceOutput {
    constructor() {
        /** closest point on shapeA */
        this.pointA = vec2(0, 0);
        /** closest point on shapeB */
        this.pointB = vec2(0, 0);
        this.distance = 0;
        /** iterations number of GJK iterations used */
        this.iterations = 0;
    }
    recycle() {
        zeroVec2(this.pointA);
        zeroVec2(this.pointB);
        this.distance = 0;
        this.iterations = 0;
    }
}
/**
 * Used to warm start Distance. Set count to zero on first call.
 */
class SimplexCache {
    constructor() {
        /** length or area */
        this.metric = 0;
        /** vertices on shape A */
        this.indexA = [];
        /** vertices on shape B */
        this.indexB = [];
        this.count = 0;
    }
    recycle() {
        this.metric = 0;
        this.indexA.length = 0;
        this.indexB.length = 0;
        this.count = 0;
    }
}
/**
 * Compute the closest points between two shapes. Supports any combination of:
 * CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
 * the first call set SimplexCache.count to zero.
 */
const Distance = function (output, cache, input) {
    ++stats.gjkCalls;
    const proxyA = input.proxyA;
    const proxyB = input.proxyB;
    const xfA = input.transformA;
    const xfB = input.transformB;
    // Initialize the simplex.
    // const simplex = new Simplex();
    simplex.recycle();
    simplex.readCache(cache, proxyA, xfA, proxyB, xfB);
    // Get simplex vertices as an array.
    const vertices = simplex.m_v;
    const k_maxIters = SettingsInternal.maxDistnceIterations;
    // These store the vertices of the last simplex so that we
    // can check for duplicates and prevent cycling.
    const saveA = [];
    const saveB = []; // int[3]
    let saveCount = 0;
    // Main iteration loop.
    let iter = 0;
    while (iter < k_maxIters) {
        // Copy simplex so we can identify duplicates.
        saveCount = simplex.m_count;
        for (let i = 0; i < saveCount; ++i) {
            saveA[i] = vertices[i].indexA;
            saveB[i] = vertices[i].indexB;
        }
        simplex.solve();
        // If we have 3 points, then the origin is in the corresponding triangle.
        if (simplex.m_count === 3) {
            break;
        }
        // Get search direction.
        const d = simplex.getSearchDirection();
        // Ensure the search direction is numerically fit.
        if (lengthSqrVec2(d) < math.EPSILON * math.EPSILON) {
            // The origin is probably contained by a line segment
            // or triangle. Thus the shapes are overlapped.
            // We can't return zero here even though there may be overlap.
            // In case the simplex is a point, segment, or triangle it is difficult
            // to determine if the origin is contained in the CSO or very close to it.
            break;
        }
        // Compute a tentative new simplex vertex using support points.
        const vertex = vertices[simplex.m_count]; // SimplexVertex
        vertex.indexA = proxyA.getSupport(invRotVec2(temp$5, xfA.q, setMulVec2(temp$5, -1, d)));
        transformVec2(vertex.wA, xfA, proxyA.getVertex(vertex.indexA));
        vertex.indexB = proxyB.getSupport(invRotVec2(temp$5, xfB.q, d));
        transformVec2(vertex.wB, xfB, proxyB.getVertex(vertex.indexB));
        diffVec2(vertex.w, vertex.wB, vertex.wA);
        // Iteration count is equated to the number of support point calls.
        ++iter;
        ++stats.gjkIters;
        // Check for duplicate support points. This is the main termination
        // criteria.
        let duplicate = false;
        for (let i = 0; i < saveCount; ++i) {
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
    stats.gjkMaxIters = math.max(stats.gjkMaxIters, iter);
    // Prepare output.
    simplex.getWitnessPoints(output.pointA, output.pointB);
    output.distance = distVec2(output.pointA, output.pointB);
    output.iterations = iter;
    // Cache the simplex.
    simplex.writeCache(cache);
    // Apply radii if requested.
    if (input.useRadii) {
        const rA = proxyA.m_radius;
        const rB = proxyB.m_radius;
        if (output.distance > rA + rB && output.distance > math.EPSILON) {
            // Shapes are still no overlapped.
            // Move the witness points to the outer surface.
            output.distance -= rA + rB;
            diffVec2(normal$4, output.pointB, output.pointA);
            normalizeVec2(normal$4);
            addMulVec2(output.pointA, rA, normal$4);
            subMulVec2(output.pointB, rB, normal$4);
        }
        else {
            // Shapes are overlapped when radii are considered.
            // Move the witness points to the middle.
            const p = diffVec2(temp$5, output.pointA, output.pointB);
            copyVec2(output.pointA, p);
            copyVec2(output.pointB, p);
            output.distance = 0.0;
        }
    }
};
/**
 * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
 */
class DistanceProxy {
    constructor() {
        /** @internal */ this.m_vertices = [];
        // todo: remove this?
        /** @internal */ this.m_count = 0;
        /** @internal */ this.m_radius = 0;
    }
    recycle() {
        this.m_vertices.length = 0;
        this.m_count = 0;
        this.m_radius = 0;
    }
    /**
     * Get the vertex count.
     */
    getVertexCount() {
        return this.m_count;
    }
    /**
     * Get a vertex by index. Used by Distance.
     */
    getVertex(index) {
        return this.m_vertices[index];
    }
    /**
     * Get the supporting vertex index in the given direction.
     */
    getSupport(d) {
        let bestIndex = -1;
        let bestValue = -Infinity;
        for (let i = 0; i < this.m_count; ++i) {
            const value = dotVec2(this.m_vertices[i], d);
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value;
            }
        }
        return bestIndex;
    }
    /**
     * Get the supporting vertex in the given direction.
     */
    getSupportVertex(d) {
        return this.m_vertices[this.getSupport(d)];
    }
    /**
     * Initialize the proxy using the given shape. The shape must remain in scope
     * while the proxy is in use.
     */
    set(shape, index) {
        shape.computeDistanceProxy(this, index);
    }
    /**
     * Initialize the proxy using a vertex cloud and radius. The vertices
     * must remain in scope while the proxy is in use.
     */
    setVertices(vertices, count, radius) {
        this.m_vertices = vertices;
        this.m_count = count;
        this.m_radius = radius;
    }
}
class SimplexVertex {
    constructor() {
        /** support point in proxyA */
        this.wA = vec2(0, 0);
        /** wA index */
        this.indexA = 0;
        /** support point in proxyB */
        this.wB = vec2(0, 0);
        /** wB index */
        this.indexB = 0;
        /** wB - wA; */
        this.w = vec2(0, 0);
        /** barycentric coordinate for closest point */
        this.a = 0;
    }
    recycle() {
        this.indexA = 0;
        this.indexB = 0;
        zeroVec2(this.wA);
        zeroVec2(this.wB);
        zeroVec2(this.w);
        this.a = 0;
    }
    set(v) {
        this.indexA = v.indexA;
        this.indexB = v.indexB;
        copyVec2(this.wA, v.wA);
        copyVec2(this.wB, v.wB);
        copyVec2(this.w, v.w);
        this.a = v.a;
    }
}
const searchDirection_reuse = vec2(0, 0);
const closestPoint_reuse = vec2(0, 0);
class Simplex {
    constructor() {
        this.m_v1 = new SimplexVertex();
        this.m_v2 = new SimplexVertex();
        this.m_v3 = new SimplexVertex();
        this.m_v = [this.m_v1, this.m_v2, this.m_v3];
    }
    recycle() {
        this.m_v1.recycle();
        this.m_v2.recycle();
        this.m_v3.recycle();
        this.m_count = 0;
    }
    /** @internal */
    toString() {
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
    }
    readCache(cache, proxyA, transformA, proxyB, transformB) {
        // Copy data from cache.
        this.m_count = cache.count;
        for (let i = 0; i < this.m_count; ++i) {
            const v = this.m_v[i];
            v.indexA = cache.indexA[i];
            v.indexB = cache.indexB[i];
            const wALocal = proxyA.getVertex(v.indexA);
            const wBLocal = proxyB.getVertex(v.indexB);
            transformVec2(v.wA, transformA, wALocal);
            transformVec2(v.wB, transformB, wBLocal);
            diffVec2(v.w, v.wB, v.wA);
            v.a = 0.0;
        }
        // Compute the new simplex metric, if it is substantially different than
        // old metric then flush the simplex.
        if (this.m_count > 1) {
            const metric1 = cache.metric;
            const metric2 = this.getMetric();
            if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 < math.EPSILON) {
                // Reset the simplex.
                this.m_count = 0;
            }
        }
        // If the cache is empty or invalid...
        if (this.m_count === 0) {
            const v = this.m_v[0];
            v.indexA = 0;
            v.indexB = 0;
            const wALocal = proxyA.getVertex(0);
            const wBLocal = proxyB.getVertex(0);
            transformVec2(v.wA, transformA, wALocal);
            transformVec2(v.wB, transformB, wBLocal);
            diffVec2(v.w, v.wB, v.wA);
            v.a = 1.0;
            this.m_count = 1;
        }
    }
    writeCache(cache) {
        cache.metric = this.getMetric();
        cache.count = this.m_count;
        for (let i = 0; i < this.m_count; ++i) {
            cache.indexA[i] = this.m_v[i].indexA;
            cache.indexB[i] = this.m_v[i].indexB;
        }
    }
    getSearchDirection() {
        const v1 = this.m_v1;
        const v2 = this.m_v2;
        this.m_v3;
        switch (this.m_count) {
            case 1:
                return setVec2(searchDirection_reuse, -v1.w.x, -v1.w.y);
            case 2: {
                diffVec2(e12, v2.w, v1.w);
                const sgn = -crossVec2Vec2(e12, v1.w);
                if (sgn > 0.0) {
                    // Origin is left of e12.
                    return setVec2(searchDirection_reuse, -e12.y, e12.x);
                }
                else {
                    // Origin is right of e12.
                    return setVec2(searchDirection_reuse, e12.y, -e12.x);
                }
            }
            default:
                return zeroVec2(searchDirection_reuse);
        }
    }
    getClosestPoint() {
        const v1 = this.m_v1;
        const v2 = this.m_v2;
        this.m_v3;
        switch (this.m_count) {
            case 0:
                return zeroVec2(closestPoint_reuse);
            case 1:
                return copyVec2(closestPoint_reuse, v1.w);
            case 2:
                return combineVec2(closestPoint_reuse, v1.a, v1.w, v2.a, v2.w);
            case 3:
                return zeroVec2(closestPoint_reuse);
            default:
                return zeroVec2(closestPoint_reuse);
        }
    }
    getWitnessPoints(pA, pB) {
        const v1 = this.m_v1;
        const v2 = this.m_v2;
        const v3 = this.m_v3;
        switch (this.m_count) {
            case 0:
                break;
            case 1:
                copyVec2(pA, v1.wA);
                copyVec2(pB, v1.wB);
                break;
            case 2:
                combineVec2(pA, v1.a, v1.wA, v2.a, v2.wA);
                combineVec2(pB, v1.a, v1.wB, v2.a, v2.wB);
                break;
            case 3:
                pB.x = pA.x = v1.a * v1.wA.x + v2.a * v2.wA.x + v3.a * v3.wA.x;
                pB.y = pA.y = v1.a * v1.wA.y + v2.a * v2.wA.y + v3.a * v3.wA.y;
                break;
        }
    }
    getMetric() {
        switch (this.m_count) {
            case 0:
                return 0.0;
            case 1:
                return 0.0;
            case 2:
                return distVec2(this.m_v1.w, this.m_v2.w);
            case 3:
                return crossVec2Vec2(diffVec2(temp1, this.m_v2.w, this.m_v1.w), diffVec2(temp2, this.m_v3.w, this.m_v1.w));
            default:
                return 0.0;
        }
    }
    solve() {
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
    }
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
    solve2() {
        const w1 = this.m_v1.w;
        const w2 = this.m_v2.w;
        diffVec2(e12, w2, w1);
        // w1 region
        const d12_2 = -dotVec2(w1, e12);
        if (d12_2 <= 0.0) {
            // a2 <= 0, so we clamp it to 0
            this.m_v1.a = 1.0;
            this.m_count = 1;
            return;
        }
        // w2 region
        const d12_1 = dotVec2(w2, e12);
        if (d12_1 <= 0.0) {
            // a1 <= 0, so we clamp it to 0
            this.m_v2.a = 1.0;
            this.m_count = 1;
            this.m_v1.set(this.m_v2);
            return;
        }
        // Must be in e12 region.
        const inv_d12 = 1.0 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
    }
    // Possible regions:
    // - points[2]
    // - edge points[0]-points[2]
    // - edge points[1]-points[2]
    // - inside the triangle
    solve3() {
        const w1 = this.m_v1.w;
        const w2 = this.m_v2.w;
        const w3 = this.m_v3.w;
        // Edge12
        // [1 1 ][a1] = [1]
        // [w1.e12 w2.e12][a2] = [0]
        // a3 = 0
        diffVec2(e12, w2, w1);
        const w1e12 = dotVec2(w1, e12);
        const w2e12 = dotVec2(w2, e12);
        const d12_1 = w2e12;
        const d12_2 = -w1e12;
        // Edge13
        // [1 1 ][a1] = [1]
        // [w1.e13 w3.e13][a3] = [0]
        // a2 = 0
        diffVec2(e13, w3, w1);
        const w1e13 = dotVec2(w1, e13);
        const w3e13 = dotVec2(w3, e13);
        const d13_1 = w3e13;
        const d13_2 = -w1e13;
        // Edge23
        // [1 1 ][a2] = [1]
        // [w2.e23 w3.e23][a3] = [0]
        // a1 = 0
        diffVec2(e23, w3, w2);
        const w2e23 = dotVec2(w2, e23);
        const w3e23 = dotVec2(w3, e23);
        const d23_1 = w3e23;
        const d23_2 = -w2e23;
        // Triangle123
        const n123 = crossVec2Vec2(e12, e13);
        const d123_1 = n123 * crossVec2Vec2(w2, w3);
        const d123_2 = n123 * crossVec2Vec2(w3, w1);
        const d123_3 = n123 * crossVec2Vec2(w1, w2);
        // w1 region
        if (d12_2 <= 0.0 && d13_2 <= 0.0) {
            this.m_v1.a = 1.0;
            this.m_count = 1;
            return;
        }
        // e12
        if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
            const inv_d12 = 1.0 / (d12_1 + d12_2);
            this.m_v1.a = d12_1 * inv_d12;
            this.m_v2.a = d12_2 * inv_d12;
            this.m_count = 2;
            return;
        }
        // e13
        if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
            const inv_d13 = 1.0 / (d13_1 + d13_2);
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
            const inv_d23 = 1.0 / (d23_1 + d23_2);
            this.m_v2.a = d23_1 * inv_d23;
            this.m_v3.a = d23_2 * inv_d23;
            this.m_count = 2;
            this.m_v1.set(this.m_v3);
            return;
        }
        // Must be in triangle123
        const inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
        this.m_v1.a = d123_1 * inv_d123;
        this.m_v2.a = d123_2 * inv_d123;
        this.m_v3.a = d123_3 * inv_d123;
        this.m_count = 3;
    }
}
const simplex = new Simplex();
const input$1 = new DistanceInput();
const cache$1 = new SimplexCache();
const output$1 = new DistanceOutput();
/**
 * Determine if two generic shapes overlap.
 */
const testOverlap = function (shapeA, indexA, shapeB, indexB, xfA, xfB) {
    input$1.recycle();
    input$1.proxyA.set(shapeA, indexA);
    input$1.proxyB.set(shapeB, indexB);
    copyTransform(input$1.transformA, xfA);
    copyTransform(input$1.transformB, xfB);
    input$1.useRadii = true;
    output$1.recycle();
    cache$1.recycle();
    Distance(output$1, cache$1, input$1);
    return output$1.distance < 10.0 * math.EPSILON;
};
// legacy exports
Distance.testOverlap = testOverlap;
Distance.Input = DistanceInput;
Distance.Output = DistanceOutput;
Distance.Proxy = DistanceProxy;
Distance.Cache = SimplexCache;
/**
 * Input parameters for ShapeCast
 */
class ShapeCastInput {
    constructor() {
        this.proxyA = new DistanceProxy();
        this.proxyB = new DistanceProxy();
        this.transformA = Transform.identity();
        this.transformB = Transform.identity();
        this.translationB = Vec2.zero();
    }
    recycle() {
        this.proxyA.recycle();
        this.proxyB.recycle();
        this.transformA.setIdentity();
        this.transformB.setIdentity();
        zeroVec2(this.translationB);
    }
}
/**
 * Output results for b2ShapeCast
 */
class ShapeCastOutput {
    constructor() {
        this.point = Vec2.zero();
        this.normal = Vec2.zero();
        this.lambda = 1.0;
        this.iterations = 0;
    }
}
/**
 * Perform a linear shape cast of shape B moving and shape A fixed. Determines
 * the hit point, normal, and translation fraction.
 *
 * @returns true if hit, false if there is no hit or an initial overlap
 */
//
// GJK-raycast
// Algorithm by Gino van den Bergen.
// "Smooth Mesh Contacts with GJK" in Game Physics Pearls. 2010
const ShapeCast = function (output, input) {
    output.iterations = 0;
    output.lambda = 1.0;
    output.normal.setZero();
    output.point.setZero();
    const proxyA = input.proxyA;
    const proxyB = input.proxyB;
    const radiusA = math.max(proxyA.m_radius, SettingsInternal.polygonRadius);
    const radiusB = math.max(proxyB.m_radius, SettingsInternal.polygonRadius);
    const radius = radiusA + radiusB;
    const xfA = input.transformA;
    const xfB = input.transformB;
    const r = input.translationB;
    const n = Vec2.zero();
    let lambda = 0.0;
    // Initial simplex
    const simplex = new Simplex();
    simplex.m_count = 0;
    // Get simplex vertices as an array.
    const vertices = simplex.m_v;
    // Get support point in -r direction
    let indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(r)));
    let wA = Transform.mulVec2(xfA, proxyA.getVertex(indexA));
    let indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, r));
    let wB = Transform.mulVec2(xfB, proxyB.getVertex(indexB));
    const v = Vec2.sub(wA, wB);
    // Sigma is the target distance between polygons
    const sigma = math.max(SettingsInternal.polygonRadius, radius - SettingsInternal.polygonRadius);
    const tolerance = 0.5 * SettingsInternal.linearSlop;
    // Main iteration loop.
    const k_maxIters = 20;
    let iter = 0;
    while (iter < k_maxIters && v.length() - sigma > tolerance) {
        output.iterations += 1;
        // Support in direction -v (A - B)
        indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(v)));
        wA = Transform.mulVec2(xfA, proxyA.getVertex(indexA));
        indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, v));
        wB = Transform.mulVec2(xfB, proxyB.getVertex(indexB));
        const p = Vec2.sub(wA, wB);
        // -v is a normal at p
        v.normalize();
        // Intersect ray with plane
        const vp = Vec2.dot(v, p);
        const vr = Vec2.dot(v, r);
        if (vp - sigma > lambda * vr) {
            if (vr <= 0.0) {
                return false;
            }
            lambda = (vp - sigma) / vr;
            if (lambda > 1.0) {
                return false;
            }
            n.setMul(-1, v);
            simplex.m_count = 0;
        }
        // Reverse simplex since it works with B - A.
        // Shift by lambda * r because we want the closest point to the current clip point.
        // Note that the support point p is not shifted because we want the plane equation
        // to be formed in unshifted space.
        const vertex = vertices[simplex.m_count];
        vertex.indexA = indexB;
        vertex.wA = Vec2.combine(1, wB, lambda, r);
        vertex.indexB = indexA;
        vertex.wB = wA;
        vertex.w = Vec2.sub(vertex.wB, vertex.wA);
        vertex.a = 1.0;
        simplex.m_count += 1;
        switch (simplex.m_count) {
            case 1:
                break;
            case 2:
                simplex.solve2();
                break;
            case 3:
                simplex.solve3();
                break;
        }
        // If we have 3 points, then the origin is in the corresponding triangle.
        if (simplex.m_count == 3) {
            // Overlap
            return false;
        }
        // Get search direction.
        v.setVec2(simplex.getClosestPoint());
        // Iteration count is equated to the number of support point calls.
        ++iter;
    }
    if (iter == 0) {
        // Initial overlap
        return false;
    }
    // Prepare output.
    const pointA = Vec2.zero();
    const pointB = Vec2.zero();
    simplex.getWitnessPoints(pointB, pointA);
    if (v.lengthSquared() > 0.0) {
        n.setMul(-1, v);
        n.normalize();
    }
    output.point = Vec2.combine(1, pointA, radiusA, n);
    output.normal = n;
    output.lambda = lambda;
    output.iterations = iter;
    return true;
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
class TOIInput {
    constructor() {
        this.proxyA = new DistanceProxy();
        this.proxyB = new DistanceProxy();
        this.sweepA = new Sweep();
        this.sweepB = new Sweep();
    }
    recycle() {
        this.proxyA.recycle();
        this.proxyB.recycle();
        this.sweepA.recycle();
        this.sweepB.recycle();
        this.tMax = -1;
    }
}
var TOIOutputState;
(function (TOIOutputState) {
    TOIOutputState[TOIOutputState["e_unset"] = -1] = "e_unset";
    TOIOutputState[TOIOutputState["e_unknown"] = 0] = "e_unknown";
    TOIOutputState[TOIOutputState["e_failed"] = 1] = "e_failed";
    TOIOutputState[TOIOutputState["e_overlapped"] = 2] = "e_overlapped";
    TOIOutputState[TOIOutputState["e_touching"] = 3] = "e_touching";
    TOIOutputState[TOIOutputState["e_separated"] = 4] = "e_separated";
})(TOIOutputState || (TOIOutputState = {}));
/**
 * Output parameters for TimeOfImpact.
 */
class TOIOutput {
    constructor() {
        this.state = TOIOutputState.e_unset;
        this.t = -1;
    }
    recycle() {
        this.state = TOIOutputState.e_unset;
        this.t = -1;
    }
}
stats.toiTime = 0;
stats.toiMaxTime = 0;
stats.toiCalls = 0;
stats.toiIters = 0;
stats.toiMaxIters = 0;
stats.toiRootIters = 0;
stats.toiMaxRootIters = 0;
const distanceInput = new DistanceInput();
const distanceOutput = new DistanceOutput();
// this is passed to Distance and SeparationFunction
const cache = new SimplexCache();
const xfA$1 = transform(0, 0, 0);
const xfB$1 = transform(0, 0, 0);
const temp$4 = vec2(0, 0);
const pointA$2 = vec2(0, 0);
const pointB$2 = vec2(0, 0);
const normal$3 = vec2(0, 0);
const axisA = vec2(0, 0);
const axisB = vec2(0, 0);
const localPointA = vec2(0, 0);
const localPointB = vec2(0, 0);
/**
 * Compute the upper bound on time before two shapes penetrate. Time is
 * represented as a fraction between [0,tMax]. This uses a swept separating axis
 * and may miss some intermediate, non-tunneling collisions. If you change the
 * time interval, you should call this function again.
 *
 * Note: use Distance to compute the contact point and normal at the time of
 * impact.
 *
 * CCD via the local separating axis method. This seeks progression by computing
 * the largest time at which separation is maintained.
 */
const TimeOfImpact = function (output, input) {
    const timer = Timer.now();
    ++stats.toiCalls;
    output.state = TOIOutputState.e_unknown;
    output.t = input.tMax;
    const proxyA = input.proxyA; // DistanceProxy
    const proxyB = input.proxyB; // DistanceProxy
    const sweepA = input.sweepA; // Sweep
    const sweepB = input.sweepB; // Sweep
    // Large rotations can make the root finder fail, so we normalize the
    // sweep angles.
    sweepA.normalize();
    sweepB.normalize();
    const tMax = input.tMax;
    const totalRadius = proxyA.m_radius + proxyB.m_radius;
    const target = math.max(SettingsInternal.linearSlop, totalRadius - 3.0 * SettingsInternal.linearSlop);
    const tolerance = 0.25 * SettingsInternal.linearSlop;
    let t1 = 0.0;
    const k_maxIterations = SettingsInternal.maxTOIIterations;
    let iter = 0;
    // Prepare input for distance query.
    // const cache = new SimplexCache();
    cache.recycle();
    distanceInput.proxyA.setVertices(proxyA.m_vertices, proxyA.m_count, proxyA.m_radius);
    distanceInput.proxyB.setVertices(proxyB.m_vertices, proxyB.m_count, proxyB.m_radius);
    distanceInput.useRadii = false;
    // The outer loop progressively attempts to compute new separating axes.
    // This loop terminates when an axis is repeated (no progress is made).
    while (true) {
        sweepA.getTransform(xfA$1, t1);
        sweepB.getTransform(xfB$1, t1);
        // Get the distance between shapes. We can also use the results
        // to get a separating axis.
        copyTransform(distanceInput.transformA, xfA$1);
        copyTransform(distanceInput.transformB, xfB$1);
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
        separationFunction.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
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
        let done = false;
        let t2 = tMax;
        let pushBackIter = 0;
        while (true) {
            // Find the deepest point at t2. Store the witness point indices.
            let s2 = separationFunction.findMinSeparation(t2);
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
            let s1 = separationFunction.evaluate(t1);
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
            let rootIterCount = 0;
            let a1 = t1;
            let a2 = t2;
            while (true) {
                // Use a mix of the secant rule and bisection.
                let t;
                if (rootIterCount & 1) {
                    // Secant rule to improve convergence.
                    t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
                }
                else {
                    // Bisection to guarantee progress.
                    t = 0.5 * (a1 + a2);
                }
                ++rootIterCount;
                ++stats.toiRootIters;
                const s = separationFunction.evaluate(t);
                if (math.abs(s - target) < tolerance) {
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
            stats.toiMaxRootIters = math.max(stats.toiMaxRootIters, rootIterCount);
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
            // Root finder got stuck. Semi-victory.
            output.state = TOIOutputState.e_failed;
            output.t = t1;
            break;
        }
    }
    stats.toiMaxIters = math.max(stats.toiMaxIters, iter);
    const time = Timer.diff(timer);
    stats.toiMaxTime = math.max(stats.toiMaxTime, time);
    stats.toiTime += time;
    separationFunction.recycle();
};
var SeparationFunctionType;
(function (SeparationFunctionType) {
    SeparationFunctionType[SeparationFunctionType["e_unset"] = -1] = "e_unset";
    SeparationFunctionType[SeparationFunctionType["e_points"] = 1] = "e_points";
    SeparationFunctionType[SeparationFunctionType["e_faceA"] = 2] = "e_faceA";
    SeparationFunctionType[SeparationFunctionType["e_faceB"] = 3] = "e_faceB";
})(SeparationFunctionType || (SeparationFunctionType = {}));
class SeparationFunction {
    constructor() {
        // input cache
        // todo: maybe assign by copy instead of reference?
        this.m_proxyA = null;
        this.m_proxyB = null;
        this.m_sweepA = null;
        this.m_sweepB = null;
        // initialize cache
        this.m_type = SeparationFunctionType.e_unset;
        this.m_localPoint = vec2(0, 0);
        this.m_axis = vec2(0, 0);
        // compute output
        this.indexA = -1;
        this.indexB = -1;
    }
    recycle() {
        this.m_proxyA = null;
        this.m_proxyB = null;
        this.m_sweepA = null;
        this.m_sweepB = null;
        this.m_type = SeparationFunctionType.e_unset;
        zeroVec2(this.m_localPoint);
        zeroVec2(this.m_axis);
        this.indexA = -1;
        this.indexB = -1;
    }
    // TODO_ERIN might not need to return the separation
    initialize(cache, proxyA, sweepA, proxyB, sweepB, t1) {
        const count = cache.count;
        this.m_proxyA = proxyA;
        this.m_proxyB = proxyB;
        this.m_sweepA = sweepA;
        this.m_sweepB = sweepB;
        this.m_sweepA.getTransform(xfA$1, t1);
        this.m_sweepB.getTransform(xfB$1, t1);
        if (count === 1) {
            this.m_type = SeparationFunctionType.e_points;
            const localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
            const localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
            transformVec2(pointA$2, xfA$1, localPointA);
            transformVec2(pointB$2, xfB$1, localPointB);
            diffVec2(this.m_axis, pointB$2, pointA$2);
            const s = normalizeVec2Length(this.m_axis);
            return s;
        }
        else if (cache.indexA[0] === cache.indexA[1]) {
            // Two points on B and one on A.
            this.m_type = SeparationFunctionType.e_faceB;
            const localPointB1 = proxyB.getVertex(cache.indexB[0]);
            const localPointB2 = proxyB.getVertex(cache.indexB[1]);
            crossVec2Num(this.m_axis, diffVec2(temp$4, localPointB2, localPointB1), 1.0);
            normalizeVec2(this.m_axis);
            rotVec2(normal$3, xfB$1.q, this.m_axis);
            combineVec2(this.m_localPoint, 0.5, localPointB1, 0.5, localPointB2);
            transformVec2(pointB$2, xfB$1, this.m_localPoint);
            const localPointA = proxyA.getVertex(cache.indexA[0]);
            const pointA = Transform.mulVec2(xfA$1, localPointA);
            let s = dotVec2(pointA, normal$3) - dotVec2(pointB$2, normal$3);
            if (s < 0.0) {
                negVec2(this.m_axis);
                s = -s;
            }
            return s;
        }
        else {
            // Two points on A and one or two points on B.
            this.m_type = SeparationFunctionType.e_faceA;
            const localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
            const localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
            crossVec2Num(this.m_axis, diffVec2(temp$4, localPointA2, localPointA1), 1.0);
            normalizeVec2(this.m_axis);
            rotVec2(normal$3, xfA$1.q, this.m_axis);
            combineVec2(this.m_localPoint, 0.5, localPointA1, 0.5, localPointA2);
            transformVec2(pointA$2, xfA$1, this.m_localPoint);
            const localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
            transformVec2(pointB$2, xfB$1, localPointB);
            let s = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
            if (s < 0.0) {
                negVec2(this.m_axis);
                s = -s;
            }
            return s;
        }
    }
    compute(find, t) {
        // It was findMinSeparation and evaluate
        this.m_sweepA.getTransform(xfA$1, t);
        this.m_sweepB.getTransform(xfB$1, t);
        switch (this.m_type) {
            case SeparationFunctionType.e_points: {
                if (find) {
                    invRotVec2(axisA, xfA$1.q, this.m_axis);
                    invRotVec2(axisB, xfB$1.q, setMulVec2(temp$4, -1, this.m_axis));
                    this.indexA = this.m_proxyA.getSupport(axisA);
                    this.indexB = this.m_proxyB.getSupport(axisB);
                }
                copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
                copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
                transformVec2(pointA$2, xfA$1, localPointA);
                transformVec2(pointB$2, xfB$1, localPointB);
                const sep = dotVec2(pointB$2, this.m_axis) - dotVec2(pointA$2, this.m_axis);
                return sep;
            }
            case SeparationFunctionType.e_faceA: {
                rotVec2(normal$3, xfA$1.q, this.m_axis);
                transformVec2(pointA$2, xfA$1, this.m_localPoint);
                if (find) {
                    invRotVec2(axisB, xfB$1.q, setMulVec2(temp$4, -1, normal$3));
                    this.indexA = -1;
                    this.indexB = this.m_proxyB.getSupport(axisB);
                }
                copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
                transformVec2(pointB$2, xfB$1, localPointB);
                const sep = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
                return sep;
            }
            case SeparationFunctionType.e_faceB: {
                rotVec2(normal$3, xfB$1.q, this.m_axis);
                transformVec2(pointB$2, xfB$1, this.m_localPoint);
                if (find) {
                    invRotVec2(axisA, xfA$1.q, setMulVec2(temp$4, -1, normal$3));
                    this.indexB = -1;
                    this.indexA = this.m_proxyA.getSupport(axisA);
                }
                copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
                transformVec2(pointA$2, xfA$1, localPointA);
                const sep = dotVec2(pointA$2, normal$3) - dotVec2(pointB$2, normal$3);
                return sep;
            }
            default:
                if (find) {
                    this.indexA = -1;
                    this.indexB = -1;
                }
                return 0.0;
        }
    }
    findMinSeparation(t) {
        return this.compute(true, t);
    }
    evaluate(t) {
        return this.compute(false, t);
    }
}
const separationFunction = new SeparationFunction();
// legacy exports
TimeOfImpact.Input = TOIInput;
TimeOfImpact.Output = TOIOutput;

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
class TimeStep {
    constructor() {
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
    reset(dt) {
        if (this.dt > 0.0) {
            this.inv_dt0 = this.inv_dt;
        }
        this.dt = dt;
        this.inv_dt = dt == 0 ? 0 : 1 / dt;
        this.dtRatio = dt * this.inv_dt0;
    }
}
// reuse
const s_subStep = new TimeStep();
const c = vec2(0, 0);
const v = vec2(0, 0);
const translation = vec2(0, 0);
const input = new TOIInput();
const output = new TOIOutput();
const backup = new Sweep();
const backup1 = new Sweep();
const backup2 = new Sweep();
/**
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These match
 * up one-to-one with the contact points in Manifold.
 */
class ContactImpulse {
    constructor(contact) {
        this.contact = contact;
        this.normals = [];
        this.tangents = [];
    }
    recycle() {
        this.normals.length = 0;
        this.tangents.length = 0;
    }
    get normalImpulses() {
        const contact = this.contact;
        const normals = this.normals;
        normals.length = 0;
        for (let p = 0; p < contact.v_points.length; ++p) {
            normals.push(contact.v_points[p].normalImpulse);
        }
        return normals;
    }
    get tangentImpulses() {
        const contact = this.contact;
        const tangents = this.tangents;
        tangents.length = 0;
        for (let p = 0; p < contact.v_points.length; ++p) {
            tangents.push(contact.v_points[p].tangentImpulse);
        }
        return tangents;
    }
}
/**
 * Finds and solves islands. An island is a connected subset of the world.
 */
class Solver {
    constructor(world) {
        this.m_world = world;
        this.m_stack = [];
        this.m_bodies = [];
        this.m_contacts = [];
        this.m_joints = [];
    }
    clear() {
        this.m_stack.length = 0;
        this.m_bodies.length = 0;
        this.m_contacts.length = 0;
        this.m_joints.length = 0;
    }
    addBody(body) {
        this.m_bodies.push(body);
        // why?
        // body.c_position.c.setZero();
        // body.c_position.a = 0;
        // body.c_velocity.v.setZero();
        // body.c_velocity.w = 0;
    }
    addContact(contact) {
        // false && console.assert(contact instanceof Contact, 'Not a Contact!', contact);
        this.m_contacts.push(contact);
    }
    addJoint(joint) {
        this.m_joints.push(joint);
    }
    solveWorld(step) {
        const world = this.m_world;
        // Clear all the island flags.
        for (let b = world.m_bodyList; b; b = b.m_next) {
            b.m_islandFlag = false;
        }
        for (let c = world.m_contactList; c; c = c.m_next) {
            c.m_islandFlag = false;
        }
        for (let j = world.m_jointList; j; j = j.m_next) {
            j.m_islandFlag = false;
        }
        // Build and simulate all awake islands.
        const stack = this.m_stack;
        for (let seed = world.m_bodyList; seed; seed = seed.m_next) {
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
                const b = stack.pop();
                this.addBody(b);
                // Make sure the body is awake (without resetting sleep timer).
                b.m_awakeFlag = true;
                // To keep islands as small as possible, we don't
                // propagate islands across static bodies.
                if (b.isStatic()) {
                    continue;
                }
                // Search all contacts connected to this body.
                for (let ce = b.m_contactList; ce; ce = ce.next) {
                    const contact = ce.contact;
                    // Has this contact already been added to an island?
                    if (contact.m_islandFlag) {
                        continue;
                    }
                    // Is this contact solid and touching?
                    if (contact.isEnabled() == false || contact.isTouching() == false) {
                        continue;
                    }
                    // Skip sensors.
                    const sensorA = contact.m_fixtureA.m_isSensor;
                    const sensorB = contact.m_fixtureB.m_isSensor;
                    if (sensorA || sensorB) {
                        continue;
                    }
                    this.addContact(contact);
                    contact.m_islandFlag = true;
                    const other = ce.other;
                    // Was the other body already added to this island?
                    if (other.m_islandFlag) {
                        continue;
                    }
                    // false && console.assert(stack.length < world.m_bodyCount);
                    stack.push(other);
                    other.m_islandFlag = true;
                }
                // Search all joints connect to this body.
                for (let je = b.m_jointList; je; je = je.next) {
                    if (je.joint.m_islandFlag == true) {
                        continue;
                    }
                    const other = je.other;
                    // Don't simulate joints connected to inactive bodies.
                    if (other.isActive() == false) {
                        continue;
                    }
                    this.addJoint(je.joint);
                    je.joint.m_islandFlag = true;
                    if (other.m_islandFlag) {
                        continue;
                    }
                    // false && console.assert(stack.length < world.m_bodyCount);
                    stack.push(other);
                    other.m_islandFlag = true;
                }
            }
            this.solveIsland(step);
            // Post solve cleanup.
            for (let i = 0; i < this.m_bodies.length; ++i) {
                // Allow static bodies to participate in other islands.
                // TODO: are they added at all?
                const b = this.m_bodies[i];
                if (b.isStatic()) {
                    b.m_islandFlag = false;
                }
            }
        }
    }
    solveIsland(step) {
        // B2: Island Solve
        const world = this.m_world;
        const gravity = world.m_gravity;
        const allowSleep = world.m_allowSleep;
        const h = step.dt;
        // Integrate velocities and apply damping. Initialize the body state.
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            copyVec2(c, body.m_sweep.c);
            const a = body.m_sweep.a;
            copyVec2(v, body.m_linearVelocity);
            let w = body.m_angularVelocity;
            // Store positions for continuous collision.
            copyVec2(body.m_sweep.c0, body.m_sweep.c);
            body.m_sweep.a0 = body.m_sweep.a;
            if (body.isDynamic()) {
                // Integrate velocities.
                addMulVec2(v, h * body.m_gravityScale, gravity);
                addMulVec2(v, h * body.m_invMass, body.m_force);
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
                setMulVec2(v, 1.0 / (1.0 + h * body.m_linearDamping), v);
                w *= 1.0 / (1.0 + h * body.m_angularDamping);
            }
            copyVec2(body.c_position.c, c);
            body.c_position.a = a;
            copyVec2(body.c_velocity.v, v);
            body.c_velocity.w = w;
        }
        for (let i = 0; i < this.m_contacts.length; ++i) {
            const contact = this.m_contacts[i];
            contact.initConstraint(step);
        }
        for (let i = 0; i < this.m_contacts.length; ++i) {
            const contact = this.m_contacts[i];
            contact.initVelocityConstraint(step);
        }
        if (step.warmStarting) {
            // Warm start.
            for (let i = 0; i < this.m_contacts.length; ++i) {
                const contact = this.m_contacts[i];
                contact.warmStartConstraint(step);
            }
        }
        for (let i = 0; i < this.m_joints.length; ++i) {
            const joint = this.m_joints[i];
            joint.initVelocityConstraints(step);
        }
        // Solve velocity constraints
        for (let i = 0; i < step.velocityIterations; ++i) {
            for (let j = 0; j < this.m_joints.length; ++j) {
                const joint = this.m_joints[j];
                joint.solveVelocityConstraints(step);
            }
            for (let j = 0; j < this.m_contacts.length; ++j) {
                const contact = this.m_contacts[j];
                contact.solveVelocityConstraint(step);
            }
        }
        // Store impulses for warm starting
        for (let i = 0; i < this.m_contacts.length; ++i) {
            const contact = this.m_contacts[i];
            contact.storeConstraintImpulses(step);
        }
        // Integrate positions
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            copyVec2(c, body.c_position.c);
            let a = body.c_position.a;
            copyVec2(v, body.c_velocity.v);
            let w = body.c_velocity.w;
            // Check for large velocities
            setMulVec2(translation, h, v);
            const translationLengthSqr = lengthSqrVec2(translation);
            if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
                const ratio = SettingsInternal.maxTranslation / math.sqrt(translationLengthSqr);
                scaleVec2(v, ratio);
            }
            const rotation = h * w;
            if (rotation * rotation > SettingsInternal.maxRotationSquared) {
                const ratio = SettingsInternal.maxRotation / math.abs(rotation);
                w *= ratio;
            }
            // Integrate
            addMulVec2(c, h, v);
            a += h * w;
            copyVec2(body.c_position.c, c);
            body.c_position.a = a;
            copyVec2(body.c_velocity.v, v);
            body.c_velocity.w = w;
        }
        // Solve position constraints
        let positionSolved = false;
        for (let i = 0; i < step.positionIterations; ++i) {
            let minSeparation = 0.0;
            for (let j = 0; j < this.m_contacts.length; ++j) {
                const contact = this.m_contacts[j];
                const separation = contact.solvePositionConstraint(step);
                minSeparation = math.min(minSeparation, separation);
            }
            // We can't expect minSpeparation >= -Settings.linearSlop because we don't
            // push the separation above -Settings.linearSlop.
            const contactsOkay = minSeparation >= -3.0 * SettingsInternal.linearSlop;
            let jointsOkay = true;
            for (let j = 0; j < this.m_joints.length; ++j) {
                const joint = this.m_joints[j];
                const jointOkay = joint.solvePositionConstraints(step);
                jointsOkay = jointsOkay && jointOkay;
            }
            if (contactsOkay && jointsOkay) {
                // Exit early if the position errors are small.
                positionSolved = true;
                break;
            }
        }
        // Copy state buffers back to the bodies
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            copyVec2(body.m_sweep.c, body.c_position.c);
            body.m_sweep.a = body.c_position.a;
            copyVec2(body.m_linearVelocity, body.c_velocity.v);
            body.m_angularVelocity = body.c_velocity.w;
            body.synchronizeTransform();
        }
        this.postSolveIsland();
        if (allowSleep) {
            let minSleepTime = Infinity;
            const linTolSqr = SettingsInternal.linearSleepToleranceSqr;
            const angTolSqr = SettingsInternal.angularSleepToleranceSqr;
            for (let i = 0; i < this.m_bodies.length; ++i) {
                const body = this.m_bodies[i];
                if (body.isStatic()) {
                    continue;
                }
                if ((body.m_autoSleepFlag == false)
                    || (body.m_angularVelocity * body.m_angularVelocity > angTolSqr)
                    || (lengthSqrVec2(body.m_linearVelocity) > linTolSqr)) {
                    body.m_sleepTime = 0.0;
                    minSleepTime = 0.0;
                }
                else {
                    body.m_sleepTime += h;
                    minSleepTime = math.min(minSleepTime, body.m_sleepTime);
                }
            }
            if (minSleepTime >= SettingsInternal.timeToSleep && positionSolved) {
                for (let i = 0; i < this.m_bodies.length; ++i) {
                    const body = this.m_bodies[i];
                    body.setAwake(false);
                }
            }
        }
    }
    /**
     * Find TOI contacts and solve them.
     */
    solveWorldTOI(step) {
        const world = this.m_world;
        if (world.m_stepComplete) {
            for (let b = world.m_bodyList; b; b = b.m_next) {
                b.m_islandFlag = false;
                b.m_sweep.alpha0 = 0.0;
            }
            for (let c = world.m_contactList; c; c = c.m_next) {
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
            let minContact = null;
            let minAlpha = 1.0;
            for (let c = world.m_contactList; c; c = c.m_next) {
                // Is this contact disabled?
                if (c.isEnabled() == false) {
                    continue;
                }
                // Prevent excessive sub-stepping.
                if (c.m_toiCount > SettingsInternal.maxSubSteps) {
                    continue;
                }
                let alpha = 1.0;
                if (c.m_toiFlag) {
                    // This contact has a valid cached TOI.
                    alpha = c.m_toi;
                }
                else {
                    const fA = c.getFixtureA();
                    const fB = c.getFixtureB();
                    // Is there a sensor?
                    if (fA.isSensor() || fB.isSensor()) {
                        continue;
                    }
                    const bA = fA.getBody();
                    const bB = fB.getBody();
                    const activeA = bA.isAwake() && !bA.isStatic();
                    const activeB = bB.isAwake() && !bB.isStatic();
                    // Is at least one body active (awake and dynamic or kinematic)?
                    if (activeA == false && activeB == false) {
                        continue;
                    }
                    const collideA = bA.isBullet() || !bA.isDynamic();
                    const collideB = bB.isBullet() || !bB.isDynamic();
                    // Are these two non-bullet dynamic bodies?
                    if (collideA == false && collideB == false) {
                        continue;
                    }
                    // Compute the TOI for this contact.
                    // Put the sweeps onto the same time interval.
                    let alpha0 = bA.m_sweep.alpha0;
                    if (bA.m_sweep.alpha0 < bB.m_sweep.alpha0) {
                        alpha0 = bB.m_sweep.alpha0;
                        bA.m_sweep.advance(alpha0);
                    }
                    else if (bB.m_sweep.alpha0 < bA.m_sweep.alpha0) {
                        alpha0 = bA.m_sweep.alpha0;
                        bB.m_sweep.advance(alpha0);
                    }
                    const indexA = c.getChildIndexA();
                    const indexB = c.getChildIndexB();
                    bA.m_sweep;
                    bB.m_sweep;
                    // Compute the time of impact in interval [0, minTOI]
                    input.proxyA.set(fA.getShape(), indexA);
                    input.proxyB.set(fB.getShape(), indexB);
                    input.sweepA.set(bA.m_sweep);
                    input.sweepB.set(bB.m_sweep);
                    input.tMax = 1.0;
                    TimeOfImpact(output, input);
                    // Beta is the fraction of the remaining portion of the [time?].
                    const beta = output.t;
                    if (output.state == TOIOutputState.e_touching) {
                        alpha = math.min(alpha0 + (1.0 - alpha0) * beta, 1.0);
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
            if (minContact == null || 1.0 - 10.0 * math.EPSILON < minAlpha) {
                // No more TOI events. Done!
                world.m_stepComplete = true;
                break;
            }
            // Advance the bodies to the TOI.
            const fA = minContact.getFixtureA();
            const fB = minContact.getFixtureB();
            const bA = fA.getBody();
            const bB = fB.getBody();
            backup1.set(bA.m_sweep);
            backup2.set(bB.m_sweep);
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
            const bodies = [bA, bB];
            for (let i = 0; i < bodies.length; ++i) {
                const body = bodies[i];
                if (body.isDynamic()) {
                    for (let ce = body.m_contactList; ce; ce = ce.next) {
                        // if (this.m_bodyCount == this.m_bodyCapacity) { break; }
                        // if (this.m_contactCount == this.m_contactCapacity) { break; }
                        const contact = ce.contact;
                        // Has this contact already been added to the island?
                        if (contact.m_islandFlag) {
                            continue;
                        }
                        // Only add if either is static, kinematic or bullet.
                        const other = ce.other;
                        if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                            continue;
                        }
                        // Skip sensors.
                        const sensorA = contact.m_fixtureA.m_isSensor;
                        const sensorB = contact.m_fixtureB.m_isSensor;
                        if (sensorA || sensorB) {
                            continue;
                        }
                        // Tentatively advance the body to the TOI.
                        backup.set(other.m_sweep);
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
            for (let i = 0; i < this.m_bodies.length; ++i) {
                const body = this.m_bodies[i];
                body.m_islandFlag = false;
                if (!body.isDynamic()) {
                    continue;
                }
                body.synchronizeFixtures();
                // Invalidate all contact TOIs on this displaced body.
                for (let ce = body.m_contactList; ce; ce = ce.next) {
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
    }
    solveIslandTOI(subStep, toiA, toiB) {
        // Initialize the body state.
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            copyVec2(body.c_position.c, body.m_sweep.c);
            body.c_position.a = body.m_sweep.a;
            copyVec2(body.c_velocity.v, body.m_linearVelocity);
            body.c_velocity.w = body.m_angularVelocity;
        }
        for (let i = 0; i < this.m_contacts.length; ++i) {
            const contact = this.m_contacts[i];
            contact.initConstraint(subStep);
        }
        // Solve position constraints.
        for (let i = 0; i < subStep.positionIterations; ++i) {
            let minSeparation = 0.0;
            for (let j = 0; j < this.m_contacts.length; ++j) {
                const contact = this.m_contacts[j];
                const separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
                minSeparation = math.min(minSeparation, separation);
            }
            // We can't expect minSpeparation >= -Settings.linearSlop because we don't
            // push the separation above -Settings.linearSlop.
            const contactsOkay = minSeparation >= -1.5 * SettingsInternal.linearSlop;
            if (contactsOkay) {
                break;
            }
        }
        // Leap of faith to new safe state.
        copyVec2(toiA.m_sweep.c0, toiA.c_position.c);
        toiA.m_sweep.a0 = toiA.c_position.a;
        copyVec2(toiB.m_sweep.c0, toiB.c_position.c);
        toiB.m_sweep.a0 = toiB.c_position.a;
        // No warm starting is needed for TOI events because warm
        // starting impulses were applied in the discrete solver.
        for (let i = 0; i < this.m_contacts.length; ++i) {
            const contact = this.m_contacts[i];
            contact.initVelocityConstraint(subStep);
        }
        // Solve velocity constraints.
        for (let i = 0; i < subStep.velocityIterations; ++i) {
            for (let j = 0; j < this.m_contacts.length; ++j) {
                const contact = this.m_contacts[j];
                contact.solveVelocityConstraint(subStep);
            }
        }
        // Don't store the TOI contact forces for warm starting
        // because they can be quite large.
        const h = subStep.dt;
        // Integrate positions
        for (let i = 0; i < this.m_bodies.length; ++i) {
            const body = this.m_bodies[i];
            copyVec2(c, body.c_position.c);
            let a = body.c_position.a;
            copyVec2(v, body.c_velocity.v);
            let w = body.c_velocity.w;
            // Check for large velocities
            setMulVec2(translation, h, v);
            const translationLengthSqr = lengthSqrVec2(translation);
            if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
                const ratio = SettingsInternal.maxTranslation / math.sqrt(translationLengthSqr);
                scaleVec2(v, ratio);
            }
            const rotation = h * w;
            if (rotation * rotation > SettingsInternal.maxRotationSquared) {
                const ratio = SettingsInternal.maxRotation / math.abs(rotation);
                w *= ratio;
            }
            // Integrate
            addMulVec2(c, h, v);
            a += h * w;
            copyVec2(body.c_position.c, c);
            body.c_position.a = a;
            copyVec2(body.c_velocity.v, v);
            body.c_velocity.w = w;
            // Sync bodies
            copyVec2(body.m_sweep.c, c);
            body.m_sweep.a = a;
            copyVec2(body.m_linearVelocity, v);
            body.m_angularVelocity = w;
            body.synchronizeTransform();
        }
        this.postSolveIsland();
    }
    /** @internal */
    postSolveIsland() {
        for (let c = 0; c < this.m_contacts.length; ++c) {
            const contact = this.m_contacts[c];
            this.m_world.postSolve(contact, contact.m_impulse);
        }
    }
}
// @ts-ignore
Solver.TimeStep = TimeStep;

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
class Mat22 {
    // tslint:disable-next-line:typedef
    constructor(a, b, c, d) {
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
    toString() {
        return JSON.stringify(this);
    }
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
    }
    static assert(o) {
    }
    // tslint:disable-next-line:typedef
    set(a, b, c, d) {
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
    }
    setIdentity() {
        this.ex.x = 1.0;
        this.ey.x = 0.0;
        this.ex.y = 0.0;
        this.ey.y = 1.0;
    }
    setZero() {
        this.ex.x = 0.0;
        this.ey.x = 0.0;
        this.ex.y = 0.0;
        this.ey.y = 0.0;
    }
    getInverse() {
        const a = this.ex.x;
        const b = this.ey.x;
        const c = this.ex.y;
        const d = this.ey.y;
        let det = a * d - b * c;
        if (det !== 0.0) {
            det = 1.0 / det;
        }
        const imx = new Mat22();
        imx.ex.x = det * d;
        imx.ey.x = -det * b;
        imx.ex.y = -det * c;
        imx.ey.y = det * a;
        return imx;
    }
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient than
     * computing the inverse in one-shot cases.
     */
    solve(v) {
        const a = this.ex.x;
        const b = this.ey.x;
        const c = this.ex.y;
        const d = this.ey.y;
        let det = a * d - b * c;
        if (det !== 0.0) {
            det = 1.0 / det;
        }
        const w = Vec2.zero();
        w.x = det * (d * v.x - b * v.y);
        w.y = det * (a * v.y - c * v.x);
        return w;
    }
    // tslint:disable-next-line:typedef
    static mul(mx, v) {
        if (v && 'x' in v && 'y' in v) {
            const x = mx.ex.x * v.x + mx.ey.x * v.y;
            const y = mx.ex.y * v.x + mx.ey.y * v.y;
            return Vec2.neo(x, y);
        }
        else if (v && 'ex' in v && 'ey' in v) { // Mat22
            // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
            const a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
            const b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
            const c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
            const d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
            return new Mat22(a, b, c, d);
        }
    }
    static mulVec2(mx, v) {
        const x = mx.ex.x * v.x + mx.ey.x * v.y;
        const y = mx.ex.y * v.x + mx.ey.y * v.y;
        return Vec2.neo(x, y);
    }
    static mulMat22(mx, v) {
        // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
        const a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
        const b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
        const c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
        const d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
        return new Mat22(a, b, c, d);
    }
    // tslint:disable-next-line:typedef
    static mulT(mx, v) {
        if (v && 'x' in v && 'y' in v) { // Vec2
            return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
        }
        else if (v && 'ex' in v && 'ey' in v) { // Mat22
            const c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
            const c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
            return new Mat22(c1, c2);
        }
    }
    static mulTVec2(mx, v) {
        return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
    }
    static mulTMat22(mx, v) {
        const c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
        const c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
        return new Mat22(c1, c2);
    }
    static abs(mx) {
        return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
    }
    static add(mx1, mx2) {
        return new Mat22(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
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
const pointA$1 = vec2(0, 0);
const pointB$1 = vec2(0, 0);
const temp$3 = vec2(0, 0);
const cA$1 = vec2(0, 0);
const cB$1 = vec2(0, 0);
const dist = vec2(0, 0);
const planePoint$2 = vec2(0, 0);
const clipPoint$1 = vec2(0, 0);
var ManifoldType;
(function (ManifoldType) {
    ManifoldType[ManifoldType["e_unset"] = -1] = "e_unset";
    ManifoldType[ManifoldType["e_circles"] = 0] = "e_circles";
    ManifoldType[ManifoldType["e_faceA"] = 1] = "e_faceA";
    ManifoldType[ManifoldType["e_faceB"] = 2] = "e_faceB";
})(ManifoldType || (ManifoldType = {}));
var ContactFeatureType;
(function (ContactFeatureType) {
    ContactFeatureType[ContactFeatureType["e_unset"] = -1] = "e_unset";
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
class ClipVertex {
    constructor() {
        this.v = vec2(0, 0);
        this.id = new ContactID();
    }
    set(o) {
        copyVec2(this.v, o.v);
        this.id.set(o.id);
    }
    recycle() {
        zeroVec2(this.v);
        this.id.recycle();
    }
}
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
 */
class Manifold {
    constructor() {
        /**
         * Usage depends on manifold type:
         * - circles: not used
         * - faceA: the normal on polygonA
         * - faceB: the normal on polygonB
         */
        this.localNormal = vec2(0, 0);
        /**
         * Usage depends on manifold type:
         * - circles: the local center of circleA
         * - faceA: the center of faceA
         * - faceB: the center of faceB
         */
        this.localPoint = vec2(0, 0);
        /** The points of contact */
        this.points = [new ManifoldPoint(), new ManifoldPoint()];
        /** The number of manifold points */
        this.pointCount = 0;
    }
    set(that) {
        this.type = that.type;
        copyVec2(this.localNormal, that.localNormal);
        copyVec2(this.localPoint, that.localPoint);
        this.pointCount = that.pointCount;
        this.points[0].set(that.points[0]);
        this.points[1].set(that.points[1]);
    }
    recycle() {
        this.type = ManifoldType.e_unset;
        zeroVec2(this.localNormal);
        zeroVec2(this.localPoint);
        this.pointCount = 0;
        this.points[0].recycle();
        this.points[1].recycle();
    }
    /**
     * Evaluate the manifold with supplied transforms. This assumes modest motion
     * from the original state. This does not change the point count, impulses, etc.
     * The radii must come from the shapes that generated the manifold.
     */
    getWorldManifold(wm, xfA, radiusA, xfB, radiusB) {
        if (this.pointCount == 0) {
            return wm;
        }
        wm = wm || new WorldManifold();
        wm.pointCount = this.pointCount;
        const normal = wm.normal;
        const points = wm.points;
        const separations = wm.separations;
        switch (this.type) {
            case ManifoldType.e_circles: {
                setVec2(normal, 1.0, 0.0);
                const manifoldPoint = this.points[0];
                transformVec2(pointA$1, xfA, this.localPoint);
                transformVec2(pointB$1, xfB, manifoldPoint.localPoint);
                diffVec2(dist, pointB$1, pointA$1);
                const lengthSqr = lengthSqrVec2(dist);
                if (lengthSqr > math.EPSILON * math.EPSILON) {
                    const length = math.sqrt(lengthSqr);
                    setMulVec2(normal, 1 / length, dist);
                }
                combineVec2(cA$1, 1, pointA$1, radiusA, normal);
                combineVec2(cB$1, 1, pointB$1, -radiusB, normal);
                combineVec2(points[0], 0.5, cA$1, 0.5, cB$1);
                separations[0] = dotVec2(diffVec2(temp$3, cB$1, cA$1), normal);
                break;
            }
            case ManifoldType.e_faceA: {
                rotVec2(normal, xfA.q, this.localNormal);
                transformVec2(planePoint$2, xfA, this.localPoint);
                for (let i = 0; i < this.pointCount; ++i) {
                    const manifoldPoint = this.points[i];
                    transformVec2(clipPoint$1, xfB, manifoldPoint.localPoint);
                    combineVec2(cA$1, 1, clipPoint$1, radiusA - dotVec2(diffVec2(temp$3, clipPoint$1, planePoint$2), normal), normal);
                    combineVec2(cB$1, 1, clipPoint$1, -radiusB, normal);
                    combineVec2(points[i], 0.5, cA$1, 0.5, cB$1);
                    separations[i] = dotVec2(diffVec2(temp$3, cB$1, cA$1), normal);
                }
                break;
            }
            case ManifoldType.e_faceB: {
                rotVec2(normal, xfB.q, this.localNormal);
                transformVec2(planePoint$2, xfB, this.localPoint);
                for (let i = 0; i < this.pointCount; ++i) {
                    const manifoldPoint = this.points[i];
                    transformVec2(clipPoint$1, xfA, manifoldPoint.localPoint);
                    combineVec2(cB$1, 1, clipPoint$1, radiusB - dotVec2(diffVec2(temp$3, clipPoint$1, planePoint$2), normal), normal);
                    combineVec2(cA$1, 1, clipPoint$1, -radiusA, normal);
                    combineVec2(points[i], 0.5, cA$1, 0.5, cB$1);
                    separations[i] = dotVec2(diffVec2(temp$3, cA$1, cB$1), normal);
                }
                // Ensure normal points from A to B.
                negVec2(normal);
                break;
            }
        }
        return wm;
    }
}
Manifold.clipSegmentToLine = clipSegmentToLine;
Manifold.ClipVertex = ClipVertex;
Manifold.getPointStates = getPointStates;
Manifold.PointState = PointState;
/**
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * details related to the geometry and dynamics of the contact points.
 *
 * This structure is stored across time steps, so we keep it small.
 *
 * Note: impulses are used for internal caching and may not provide reliable
 * contact forces, especially for high speed collisions.
 */
class ManifoldPoint {
    constructor() {
        /**
         * Usage depends on manifold type:
         * - circles: the local center of circleB
         * - faceA: the local center of circleB or the clip point of polygonB
         * - faceB: the clip point of polygonA
         */
        this.localPoint = vec2(0, 0);
        /**
         * The non-penetration impulse
         */
        this.normalImpulse = 0;
        /**
         * The friction impulse
         */
        this.tangentImpulse = 0;
        /**
         * Uniquely identifies a contact point between two shapes to facilitate warm starting
         */
        this.id = new ContactID();
    }
    set(that) {
        copyVec2(this.localPoint, that.localPoint);
        this.normalImpulse = that.normalImpulse;
        this.tangentImpulse = that.tangentImpulse;
        this.id.set(that.id);
    }
    recycle() {
        zeroVec2(this.localPoint);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.id.recycle();
    }
}
/**
 * Contact ids to facilitate warm starting.
 *
 * ContactFeature: The features that intersect to form the contact point.
 */
class ContactID {
    constructor() {
        /**
         * Used to quickly compare contact ids.
         */
        this.key = -1;
        /** ContactFeature index on shapeA */
        this.indexA = -1;
        /** ContactFeature index on shapeB */
        this.indexB = -1;
        /** ContactFeature type on shapeA */
        this.typeA = ContactFeatureType.e_unset;
        /** ContactFeature type on shapeB */
        this.typeB = ContactFeatureType.e_unset;
    }
    setFeatures(indexA, typeA, indexB, typeB) {
        this.indexA = indexA;
        this.indexB = indexB;
        this.typeA = typeA;
        this.typeB = typeB;
        this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
    }
    set(that) {
        this.indexA = that.indexA;
        this.indexB = that.indexB;
        this.typeA = that.typeA;
        this.typeB = that.typeB;
        this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
    }
    swapFeatures() {
        const indexA = this.indexA;
        const indexB = this.indexB;
        const typeA = this.typeA;
        const typeB = this.typeB;
        this.indexA = indexB;
        this.indexB = indexA;
        this.typeA = typeB;
        this.typeB = typeA;
        this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
    }
    recycle() {
        this.indexA = 0;
        this.indexB = 0;
        this.typeA = ContactFeatureType.e_unset;
        this.typeB = ContactFeatureType.e_unset;
        this.key = -1;
    }
}
/**
 * This is used to compute the current state of a contact manifold.
 */
class WorldManifold {
    constructor() {
        /** World vector pointing from A to B */
        this.normal = vec2(0, 0);
        /** World contact point (point of intersection) */
        this.points = [vec2(0, 0), vec2(0, 0)]; // [maxManifoldPoints]
        /** A negative value indicates overlap, in meters */
        this.separations = [0, 0]; // [maxManifoldPoints]
        /** The number of manifold points */
        this.pointCount = 0;
    }
    recycle() {
        zeroVec2(this.normal);
        zeroVec2(this.points[0]);
        zeroVec2(this.points[1]);
        this.separations[0] = 0;
        this.separations[1] = 0;
        this.pointCount = 0;
    }
}
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
    for (let i = 0; i < manifold1.pointCount; ++i) {
        const id = manifold1.points[i].id;
        state1[i] = PointState.removeState;
        for (let j = 0; j < manifold2.pointCount; ++j) {
            if (manifold2.points[j].id.key === id.key) {
                state1[i] = PointState.persistState;
                break;
            }
        }
    }
    // Detect persists and adds.
    for (let i = 0; i < manifold2.pointCount; ++i) {
        const id = manifold2.points[i].id;
        state2[i] = PointState.addState;
        for (let j = 0; j < manifold1.pointCount; ++j) {
            if (manifold1.points[j].id.key === id.key) {
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
    let numOut = 0;
    // Calculate the distance of end points to the line
    const distance0 = dotVec2(normal, vIn[0].v) - offset;
    const distance1 = dotVec2(normal, vIn[1].v) - offset;
    // If the points are behind the plane
    if (distance0 <= 0.0)
        vOut[numOut++].set(vIn[0]);
    if (distance1 <= 0.0)
        vOut[numOut++].set(vIn[1]);
    // If the points are on different sides of the plane
    if (distance0 * distance1 < 0.0) {
        // Find intersection point of edge and plane
        const interp = distance0 / (distance0 - distance1);
        combineVec2(vOut[numOut].v, 1 - interp, vIn[0].v, interp, vIn[1].v);
        // VertexA is hitting edgeB.
        vOut[numOut].id.setFeatures(vertexIndexA, ContactFeatureType.e_vertex, vIn[0].id.indexB, ContactFeatureType.e_face);
        ++numOut;
    }
    return numOut;
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
const contactPool = new Pool({
    create() {
        return new Contact();
    },
    release(contact) {
        contact.recycle();
    }
});
const oldManifold = new Manifold();
const worldManifold = new WorldManifold();
/**
 * A contact edge is used to connect bodies and contacts together in a contact
 * graph where each body is a node and each contact is an edge. A contact edge
 * belongs to a doubly linked list maintained in each attached body. Each
 * contact has two contact nodes, one for each attached body.
 */
class ContactEdge {
    constructor(contact) {
        this.prev = null;
        this.next = null;
        this.other = null;
        this.contact = contact;
    }
    /** @internal */
    recycle() {
        this.prev = null;
        this.next = null;
        this.other = null;
    }
}
/**
 * Friction mixing law. The idea is to allow either fixture to drive the
 * friction to zero. For example, anything slides on ice.
 */
function mixFriction(friction1, friction2) {
    return math.sqrt(friction1 * friction2);
}
/**
 * Restitution mixing law. The idea is allow for anything to bounce off an
 * inelastic surface. For example, a superball bounces on anything.
 */
function mixRestitution(restitution1, restitution2) {
    return restitution1 > restitution2 ? restitution1 : restitution2;
}
// TODO: move this to Settings?
const s_registers = [];
// TODO: merge with ManifoldPoint?
class VelocityConstraintPoint {
    constructor() {
        this.rA = vec2(0, 0);
        this.rB = vec2(0, 0);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.normalMass = 0;
        this.tangentMass = 0;
        this.velocityBias = 0;
    }
    recycle() {
        zeroVec2(this.rA);
        zeroVec2(this.rB);
        this.normalImpulse = 0;
        this.tangentImpulse = 0;
        this.normalMass = 0;
        this.tangentMass = 0;
        this.velocityBias = 0;
    }
}
const cA = vec2(0, 0);
const vA = vec2(0, 0);
const cB = vec2(0, 0);
const vB = vec2(0, 0);
const tangent$1 = vec2(0, 0);
const xfA = transform(0, 0, 0);
const xfB = transform(0, 0, 0);
const pointA = vec2(0, 0);
const pointB = vec2(0, 0);
const clipPoint = vec2(0, 0);
const planePoint$1 = vec2(0, 0);
const rA = vec2(0, 0);
const rB = vec2(0, 0);
const P$1 = vec2(0, 0);
const normal$2 = vec2(0, 0);
const point = vec2(0, 0);
const dv = vec2(0, 0);
const dv1 = vec2(0, 0);
const dv2 = vec2(0, 0);
const b = vec2(0, 0);
const a = vec2(0, 0);
const x = vec2(0, 0);
const d = vec2(0, 0);
const P1 = vec2(0, 0);
const P2 = vec2(0, 0);
const temp$2 = vec2(0, 0);
/**
 * The class manages contact between two shapes. A contact exists for each
 * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
 * object may exist that has no contact points.
 */
class Contact {
    constructor() {
        // Nodes for connecting bodies.
        /** @internal */
        this.m_nodeA = new ContactEdge(this);
        /** @internal */
        this.m_nodeB = new ContactEdge(this);
        /** @internal */
        this.m_fixtureA = null;
        /** @internal */
        this.m_fixtureB = null;
        /** @internal */
        this.m_indexA = -1;
        /** @internal */
        this.m_indexB = -1;
        /** @internal */
        this.m_evaluateFcn = null;
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
        this.m_friction = 0.0;
        /** @internal */
        this.m_restitution = 0.0;
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
        /** @internal */
        this.v_points = [new VelocityConstraintPoint(), new VelocityConstraintPoint()]; // [maxManifoldPoints];
        /** @internal */
        this.v_normal = vec2(0, 0);
        /** @internal */ this.v_normalMass = new Mat22();
        /** @internal */ this.v_K = new Mat22();
        /** @internal */ this.v_pointCount = 0;
        /** @internal */ this.v_tangentSpeed = 0;
        /** @internal */ this.v_friction = 0;
        /** @internal */ this.v_restitution = 0;
        /** @internal */ this.v_invMassA = 0;
        /** @internal */ this.v_invMassB = 0;
        /** @internal */ this.v_invIA = 0;
        /** @internal */ this.v_invIB = 0;
        // PositionConstraint
        /** @internal */ this.p_localPoints = [vec2(0, 0), vec2(0, 0)]; // [maxManifoldPoints];
        /** @internal */ this.p_localNormal = vec2(0, 0);
        /** @internal */ this.p_localPoint = vec2(0, 0);
        /** @internal */ this.p_localCenterA = vec2(0, 0);
        /** @internal */ this.p_localCenterB = vec2(0, 0);
        /** @internal */ this.p_type = ManifoldType.e_unset;
        /** @internal */ this.p_radiusA = 0;
        /** @internal */ this.p_radiusB = 0;
        /** @internal */ this.p_pointCount = 0;
        /** @internal */ this.p_invMassA = 0;
        /** @internal */ this.p_invMassB = 0;
        /** @internal */ this.p_invIA = 0;
        /** @internal */ this.p_invIB = 0;
    }
    initialize(fA, indexA, fB, indexB, evaluateFcn) {
        this.m_fixtureA = fA;
        this.m_fixtureB = fB;
        this.m_indexA = indexA;
        this.m_indexB = indexB;
        this.m_evaluateFcn = evaluateFcn;
        this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
        this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
    }
    recycle() {
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
        // VelocityConstraint
        for (const point of this.v_points) {
            point.recycle();
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
        // PositionConstraint
        for (const point of this.p_localPoints) {
            zeroVec2(point);
        }
        zeroVec2(this.p_localNormal);
        zeroVec2(this.p_localPoint);
        zeroVec2(this.p_localCenterA);
        zeroVec2(this.p_localCenterB);
        this.p_type = ManifoldType.e_unset;
        this.p_radiusA = 0;
        this.p_radiusB = 0;
        this.p_pointCount = 0;
        this.p_invMassA = 0;
        this.p_invMassB = 0;
        this.p_invIA = 0;
        this.p_invIB = 0;
    }
    initConstraint(step) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
        const shapeA = fixtureA.m_shape;
        const shapeB = fixtureB.m_shape;
        if (shapeA === null || shapeB === null)
            return;
        const manifold = this.m_manifold;
        const pointCount = manifold.pointCount;
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
        for (let j = 0; j < SettingsInternal.maxManifoldPoints; ++j) {
            this.v_points[j].recycle();
            zeroVec2(this.p_localPoints[j]);
        }
        for (let j = 0; j < pointCount; ++j) {
            const cp = manifold.points[j];
            const vcp = this.v_points[j];
            if (step.warmStarting) {
                vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
                vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
            }
            copyVec2(this.p_localPoints[j], cp.localPoint);
        }
    }
    /**
     * Get the contact manifold. Do not modify the manifold unless you understand
     * the internals of the library.
     */
    getManifold() {
        return this.m_manifold;
    }
    /**
     * Get the world manifold.
     */
    getWorldManifold(worldManifold) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
        const shapeA = fixtureA.m_shape;
        const shapeB = fixtureB.m_shape;
        if (shapeA === null || shapeB === null)
            return;
        return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
    }
    /**
     * Enable/disable this contact. This can be used inside the pre-solve contact
     * listener. The contact is only disabled for the current time step (or sub-step
     * in continuous collisions).
     */
    setEnabled(flag) {
        this.m_enabledFlag = !!flag;
    }
    /**
     * Has this contact been disabled?
     */
    isEnabled() {
        return this.m_enabledFlag;
    }
    /**
     * Is this contact touching?
     */
    isTouching() {
        return this.m_touchingFlag;
    }
    /**
     * Get the next contact in the world's contact list.
     */
    getNext() {
        return this.m_next;
    }
    /**
     * Get fixture A in this contact.
     */
    getFixtureA() {
        return this.m_fixtureA;
    }
    /**
     * Get fixture B in this contact.
     */
    getFixtureB() {
        return this.m_fixtureB;
    }
    /**
     * Get the child primitive index for fixture A.
     */
    getChildIndexA() {
        return this.m_indexA;
    }
    /**
     * Get the child primitive index for fixture B.
     */
    getChildIndexB() {
        return this.m_indexB;
    }
    /**
     * Flag this contact for filtering. Filtering will occur the next time step.
     */
    flagForFiltering() {
        this.m_filterFlag = true;
    }
    /**
     * Override the default friction mixture. You can call this in
     * ContactListener.preSolve. This value persists until set or reset.
     */
    setFriction(friction) {
        this.m_friction = friction;
    }
    /**
     * Get the friction.
     */
    getFriction() {
        return this.m_friction;
    }
    /**
     * Reset the friction mixture to the default value.
     */
    resetFriction() {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        this.m_friction = mixFriction(fixtureA.m_friction, fixtureB.m_friction);
    }
    /**
     * Override the default restitution mixture. You can call this in
     * ContactListener.preSolve. The value persists until you set or reset.
     */
    setRestitution(restitution) {
        this.m_restitution = restitution;
    }
    /**
     * Get the restitution.
     */
    getRestitution() {
        return this.m_restitution;
    }
    /**
     * Reset the restitution to the default value.
     */
    resetRestitution() {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        this.m_restitution = mixRestitution(fixtureA.m_restitution, fixtureB.m_restitution);
    }
    /**
     * Set the desired tangent speed for a conveyor belt behavior. In meters per
     * second.
     */
    setTangentSpeed(speed) {
        this.m_tangentSpeed = speed;
    }
    /**
     * Get the desired tangent speed. In meters per second.
     */
    getTangentSpeed() {
        return this.m_tangentSpeed;
    }
    /**
     * Called by Update method, and implemented by subclasses.
     */
    evaluate(manifold, xfA, xfB) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        this.m_evaluateFcn(manifold, xfA, fixtureA, this.m_indexA, xfB, fixtureB, this.m_indexB);
    }
    /**
     * Updates the contact manifold and touching status.
     *
     * Note: do not assume the fixture AABBs are overlapping or are valid.
     *
     * @param listener.beginContact
     * @param listener.endContact
     * @param listener.preSolve
     */
    update(listener) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
        const shapeA = fixtureA.m_shape;
        const shapeB = fixtureB.m_shape;
        if (shapeA === null || shapeB === null)
            return;
        // Re-enable this contact.
        this.m_enabledFlag = true;
        let touching = false;
        const wasTouching = this.m_touchingFlag;
        const sensorA = fixtureA.m_isSensor;
        const sensorB = fixtureB.m_isSensor;
        const sensor = sensorA || sensorB;
        const xfA = bodyA.m_xf;
        const xfB = bodyB.m_xf;
        // Is this contact a sensor?
        if (sensor) {
            touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
            // Sensors don't generate manifolds.
            this.m_manifold.pointCount = 0;
        }
        else {
            oldManifold.recycle();
            oldManifold.set(this.m_manifold);
            this.m_manifold.recycle();
            this.evaluate(this.m_manifold, xfA, xfB);
            touching = this.m_manifold.pointCount > 0;
            // Match old contact ids to new contact ids and copy the
            // stored impulses to warm start the solver.
            for (let i = 0; i < this.m_manifold.pointCount; ++i) {
                const nmp = this.m_manifold.points[i];
                nmp.normalImpulse = 0.0;
                nmp.tangentImpulse = 0.0;
                for (let j = 0; j < oldManifold.pointCount; ++j) {
                    const omp = oldManifold.points[j];
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
        const hasListener = typeof listener === 'object' && listener !== null;
        if (!wasTouching && touching && hasListener) {
            listener.beginContact(this);
        }
        if (wasTouching && !touching && hasListener) {
            listener.endContact(this);
        }
        if (!sensor && touching && hasListener && oldManifold) {
            listener.preSolve(this, oldManifold);
        }
    }
    solvePositionConstraint(step) {
        return this._solvePositionConstraint(step, null, null);
    }
    solvePositionConstraintTOI(step, toiA, toiB) {
        return this._solvePositionConstraint(step, toiA, toiB);
    }
    _solvePositionConstraint(step, toiA, toiB) {
        const toi = toiA !== null && toiB !== null ? true : false;
        let minSeparation = 0.0;
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return minSeparation;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return minSeparation;
        bodyA.c_velocity;
        bodyB.c_velocity;
        const positionA = bodyA.c_position;
        const positionB = bodyB.c_position;
        const localCenterA = this.p_localCenterA;
        const localCenterB = this.p_localCenterB;
        let mA = 0.0;
        let iA = 0.0;
        if (!toi || (bodyA === toiA || bodyA === toiB)) {
            mA = this.p_invMassA;
            iA = this.p_invIA;
        }
        let mB = 0.0;
        let iB = 0.0;
        if (!toi || (bodyB === toiA || bodyB === toiB)) {
            mB = this.p_invMassB;
            iB = this.p_invIB;
        }
        copyVec2(cA, positionA.c);
        let aA = positionA.a;
        copyVec2(cB, positionB.c);
        let aB = positionB.a;
        // Solve normal constraints
        for (let j = 0; j < this.p_pointCount; ++j) {
            getTransform(xfA, localCenterA, cA, aA);
            getTransform(xfB, localCenterB, cB, aB);
            // PositionSolverManifold
            let separation;
            switch (this.p_type) {
                case ManifoldType.e_circles: {
                    transformVec2(pointA, xfA, this.p_localPoint);
                    transformVec2(pointB, xfB, this.p_localPoints[0]);
                    diffVec2(normal$2, pointB, pointA);
                    normalizeVec2(normal$2);
                    combineVec2(point, 0.5, pointA, 0.5, pointB);
                    separation = dotVec2(pointB, normal$2) - dotVec2(pointA, normal$2) - this.p_radiusA - this.p_radiusB;
                    break;
                }
                case ManifoldType.e_faceA: {
                    rotVec2(normal$2, xfA.q, this.p_localNormal);
                    transformVec2(planePoint$1, xfA, this.p_localPoint);
                    transformVec2(clipPoint, xfB, this.p_localPoints[j]);
                    separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
                    copyVec2(point, clipPoint);
                    break;
                }
                case ManifoldType.e_faceB: {
                    rotVec2(normal$2, xfB.q, this.p_localNormal);
                    transformVec2(planePoint$1, xfB, this.p_localPoint);
                    transformVec2(clipPoint, xfA, this.p_localPoints[j]);
                    separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
                    copyVec2(point, clipPoint);
                    // Ensure normal points from A to B
                    negVec2(normal$2);
                    break;
                }
                // todo: what should we do here?
                default: {
                    return minSeparation;
                }
            }
            diffVec2(rA, point, cA);
            diffVec2(rB, point, cB);
            // Track max constraint error.
            minSeparation = math.min(minSeparation, separation);
            const baumgarte = toi ? SettingsInternal.toiBaugarte : SettingsInternal.baumgarte;
            const linearSlop = SettingsInternal.linearSlop;
            const maxLinearCorrection = SettingsInternal.maxLinearCorrection;
            // Prevent large corrections and allow slop.
            const C = math.clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0.0);
            // Compute the effective mass.
            const rnA = crossVec2Vec2(rA, normal$2);
            const rnB = crossVec2Vec2(rB, normal$2);
            const K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
            // Compute normal impulse
            const impulse = K > 0.0 ? -C / K : 0.0;
            setMulVec2(P$1, impulse, normal$2);
            subMulVec2(cA, mA, P$1);
            aA -= iA * crossVec2Vec2(rA, P$1);
            addMulVec2(cB, mB, P$1);
            aB += iB * crossVec2Vec2(rB, P$1);
        }
        copyVec2(positionA.c, cA);
        positionA.a = aA;
        copyVec2(positionB.c, cB);
        positionB.a = aB;
        return minSeparation;
    }
    initVelocityConstraint(step) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
        const velocityA = bodyA.c_velocity;
        const velocityB = bodyB.c_velocity;
        const positionA = bodyA.c_position;
        const positionB = bodyB.c_position;
        const radiusA = this.p_radiusA;
        const radiusB = this.p_radiusB;
        const manifold = this.m_manifold;
        const mA = this.v_invMassA;
        const mB = this.v_invMassB;
        const iA = this.v_invIA;
        const iB = this.v_invIB;
        const localCenterA = this.p_localCenterA;
        const localCenterB = this.p_localCenterB;
        copyVec2(cA, positionA.c);
        const aA = positionA.a;
        copyVec2(vA, velocityA.v);
        const wA = velocityA.w;
        copyVec2(cB, positionB.c);
        const aB = positionB.a;
        copyVec2(vB, velocityB.v);
        const wB = velocityB.w;
        getTransform(xfA, localCenterA, cA, aA);
        getTransform(xfB, localCenterB, cB, aB);
        worldManifold.recycle();
        manifold.getWorldManifold(worldManifold, xfA, radiusA, xfB, radiusB);
        copyVec2(this.v_normal, worldManifold.normal);
        for (let j = 0; j < this.v_pointCount; ++j) {
            const vcp = this.v_points[j]; // VelocityConstraintPoint
            const wmp = worldManifold.points[j];
            diffVec2(vcp.rA, wmp, cA);
            diffVec2(vcp.rB, wmp, cB);
            const rnA = crossVec2Vec2(vcp.rA, this.v_normal);
            const rnB = crossVec2Vec2(vcp.rB, this.v_normal);
            const kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
            vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;
            crossVec2Num(tangent$1, this.v_normal, 1.0);
            const rtA = crossVec2Vec2(vcp.rA, tangent$1);
            const rtB = crossVec2Vec2(vcp.rB, tangent$1);
            const kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
            vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;
            // Setup a velocity bias for restitution.
            vcp.velocityBias = 0.0;
            let vRel = 0;
            vRel += dotVec2(this.v_normal, vB);
            vRel += dotVec2(this.v_normal, crossNumVec2(temp$2, wB, vcp.rB));
            vRel -= dotVec2(this.v_normal, vA);
            vRel -= dotVec2(this.v_normal, crossNumVec2(temp$2, wA, vcp.rA));
            if (vRel < -SettingsInternal.velocityThreshold) {
                vcp.velocityBias = -this.v_restitution * vRel;
            }
        }
        // If we have two points, then prepare the block solver.
        if (this.v_pointCount == 2 && step.blockSolve) {
            const vcp1 = this.v_points[0]; // VelocityConstraintPoint
            const vcp2 = this.v_points[1]; // VelocityConstraintPoint
            const rn1A = crossVec2Vec2(vcp1.rA, this.v_normal);
            const rn1B = crossVec2Vec2(vcp1.rB, this.v_normal);
            const rn2A = crossVec2Vec2(vcp2.rA, this.v_normal);
            const rn2B = crossVec2Vec2(vcp2.rB, this.v_normal);
            const k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
            const k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
            const k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
            // Ensure a reasonable condition number.
            const k_maxConditionNumber = 1000.0;
            if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                // K is safe to invert.
                this.v_K.ex.setNum(k11, k12);
                this.v_K.ey.setNum(k12, k22);
                // this.v_normalMass.set(this.v_K.getInverse());
                const a = this.v_K.ex.x;
                const b = this.v_K.ey.x;
                const c = this.v_K.ex.y;
                const d = this.v_K.ey.y;
                let det = a * d - b * c;
                if (det !== 0.0) {
                    det = 1.0 / det;
                }
                this.v_normalMass.ex.x = det * d;
                this.v_normalMass.ey.x = -det * b;
                this.v_normalMass.ex.y = -det * c;
                this.v_normalMass.ey.y = det * a;
            }
            else {
                // The constraints are redundant, just use one.
                // TODO_ERIN use deepest?
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
    }
    warmStartConstraint(step) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
        const velocityA = bodyA.c_velocity;
        const velocityB = bodyB.c_velocity;
        bodyA.c_position;
        bodyB.c_position;
        const mA = this.v_invMassA;
        const iA = this.v_invIA;
        const mB = this.v_invMassB;
        const iB = this.v_invIB;
        copyVec2(vA, velocityA.v);
        let wA = velocityA.w;
        copyVec2(vB, velocityB.v);
        let wB = velocityB.w;
        copyVec2(normal$2, this.v_normal);
        crossVec2Num(tangent$1, normal$2, 1.0);
        for (let j = 0; j < this.v_pointCount; ++j) {
            const vcp = this.v_points[j]; // VelocityConstraintPoint
            combineVec2(P$1, vcp.normalImpulse, normal$2, vcp.tangentImpulse, tangent$1);
            wA -= iA * crossVec2Vec2(vcp.rA, P$1);
            subMulVec2(vA, mA, P$1);
            wB += iB * crossVec2Vec2(vcp.rB, P$1);
            addMulVec2(vB, mB, P$1);
        }
        copyVec2(velocityA.v, vA);
        velocityA.w = wA;
        copyVec2(velocityB.v, vB);
        velocityB.w = wB;
    }
    storeConstraintImpulses(step) {
        const manifold = this.m_manifold;
        for (let j = 0; j < this.v_pointCount; ++j) {
            manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
            manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
        }
    }
    solveVelocityConstraint(step) {
        const fixtureA = this.m_fixtureA;
        const fixtureB = this.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
        const velocityA = bodyA.c_velocity;
        bodyA.c_position;
        const velocityB = bodyB.c_velocity;
        bodyB.c_position;
        const mA = this.v_invMassA;
        const iA = this.v_invIA;
        const mB = this.v_invMassB;
        const iB = this.v_invIB;
        copyVec2(vA, velocityA.v);
        let wA = velocityA.w;
        copyVec2(vB, velocityB.v);
        let wB = velocityB.w;
        copyVec2(normal$2, this.v_normal);
        crossVec2Num(tangent$1, normal$2, 1.0);
        const friction = this.v_friction;
        // Solve tangent constraints first because non-penetration is more important
        // than friction.
        for (let j = 0; j < this.v_pointCount; ++j) {
            const vcp = this.v_points[j]; // VelocityConstraintPoint
            // Relative velocity at contact
            zeroVec2(dv);
            addVec2(dv, vB);
            addVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
            subVec2(dv, vA);
            subVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
            // Compute tangent force
            const vt = dotVec2(dv, tangent$1) - this.v_tangentSpeed;
            let lambda = vcp.tangentMass * (-vt);
            // Clamp the accumulated force
            const maxFriction = friction * vcp.normalImpulse;
            const newImpulse = math.clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
            lambda = newImpulse - vcp.tangentImpulse;
            vcp.tangentImpulse = newImpulse;
            // Apply contact impulse
            setMulVec2(P$1, lambda, tangent$1);
            subMulVec2(vA, mA, P$1);
            wA -= iA * crossVec2Vec2(vcp.rA, P$1);
            addMulVec2(vB, mB, P$1);
            wB += iB * crossVec2Vec2(vcp.rB, P$1);
        }
        // Solve normal constraints
        if (this.v_pointCount == 1 || step.blockSolve == false) {
            for (let i = 0; i < this.v_pointCount; ++i) {
                const vcp = this.v_points[i]; // VelocityConstraintPoint
                // Relative velocity at contact
                zeroVec2(dv);
                addVec2(dv, vB);
                addVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
                subVec2(dv, vA);
                subVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
                // Compute normal impulse
                const vn = dotVec2(dv, normal$2);
                let lambda = -vcp.normalMass * (vn - vcp.velocityBias);
                // Clamp the accumulated impulse
                const newImpulse = math.max(vcp.normalImpulse + lambda, 0.0);
                lambda = newImpulse - vcp.normalImpulse;
                vcp.normalImpulse = newImpulse;
                // Apply contact impulse
                setMulVec2(P$1, lambda, normal$2);
                subMulVec2(vA, mA, P$1);
                wA -= iA * crossVec2Vec2(vcp.rA, P$1);
                addMulVec2(vB, mB, P$1);
                wB += iB * crossVec2Vec2(vcp.rB, P$1);
            }
        }
        else {
            // Block solver developed in collaboration with Dirk Gregorius (back in
            // 01/07 on Box2D_Lite).
            // Build the mini LCP for this contact patch
            //
            // vn = A * x + b, vn >= 0, x >= 0 and vn_i * x_i = 0 with i = 1..2
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
            const vcp1 = this.v_points[0]; // VelocityConstraintPoint
            const vcp2 = this.v_points[1]; // VelocityConstraintPoint
            setVec2(a, vcp1.normalImpulse, vcp2.normalImpulse);
            // Relative velocity at contact
            // let dv1 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp1.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp1.rA));
            zeroVec2(dv1);
            addVec2(dv1, vB);
            addVec2(dv1, crossNumVec2(temp$2, wB, vcp1.rB));
            subVec2(dv1, vA);
            subVec2(dv1, crossNumVec2(temp$2, wA, vcp1.rA));
            // let dv2 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp2.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp2.rA));
            zeroVec2(dv2);
            addVec2(dv2, vB);
            addVec2(dv2, crossNumVec2(temp$2, wB, vcp2.rB));
            subVec2(dv2, vA);
            subVec2(dv2, crossNumVec2(temp$2, wA, vcp2.rA));
            // Compute normal velocity
            let vn1 = dotVec2(dv1, normal$2);
            let vn2 = dotVec2(dv2, normal$2);
            setVec2(b, vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
            // Compute b'
            // b.sub(Mat22.mulVec2(this.v_K, a));
            b.x -= this.v_K.ex.x * a.x + this.v_K.ey.x * a.y;
            b.y -= this.v_K.ex.y * a.x + this.v_K.ey.y * a.y;
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
                // const x = Mat22.mulVec2(this.v_normalMass, b).neg();
                zeroVec2(x);
                x.x = -(this.v_normalMass.ex.x * b.x + this.v_normalMass.ey.x * b.y);
                x.y = -(this.v_normalMass.ex.y * b.x + this.v_normalMass.ey.y * b.y);
                if (x.x >= 0.0 && x.y >= 0.0) {
                    // Get the incremental impulse
                    diffVec2(d, x, a);
                    // Apply incremental impulse
                    setMulVec2(P1, d.x, normal$2);
                    setMulVec2(P2, d.y, normal$2);
                    // vA.subCombine(mA, P1, mA, P2);
                    subMulVec2(vA, mA, P1);
                    subMulVec2(vA, mA, P2);
                    wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                    // vB.addCombine(mB, P1, mB, P2);
                    addMulVec2(vB, mB, P1);
                    addMulVec2(vB, mB, P2);
                    wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
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
                    diffVec2(d, x, a);
                    // Apply incremental impulse
                    setMulVec2(P1, d.x, normal$2);
                    setMulVec2(P2, d.y, normal$2);
                    // vA.subCombine(mA, P1, mA, P2);
                    subMulVec2(vA, mA, P1);
                    subMulVec2(vA, mA, P2);
                    wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                    // vB.addCombine(mB, P1, mB, P2);
                    addMulVec2(vB, mB, P1);
                    addMulVec2(vB, mB, P2);
                    wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
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
                    diffVec2(d, x, a);
                    // Apply incremental impulse
                    setMulVec2(P1, d.x, normal$2);
                    setMulVec2(P2, d.y, normal$2);
                    // vA.subCombine(mA, P1, mA, P2);
                    subMulVec2(vA, mA, P1);
                    subMulVec2(vA, mA, P2);
                    wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                    // vB.addCombine(mB, P1, mB, P2);
                    addMulVec2(vB, mB, P1);
                    addMulVec2(vB, mB, P2);
                    wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
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
                    diffVec2(d, x, a);
                    // Apply incremental impulse
                    setMulVec2(P1, d.x, normal$2);
                    setMulVec2(P2, d.y, normal$2);
                    // vA.subCombine(mA, P1, mA, P2);
                    subMulVec2(vA, mA, P1);
                    subMulVec2(vA, mA, P2);
                    wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                    // vB.addCombine(mB, P1, mB, P2);
                    addMulVec2(vB, mB, P1);
                    addMulVec2(vB, mB, P2);
                    wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
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
        copyVec2(velocityA.v, vA);
        velocityA.w = wA;
        copyVec2(velocityB.v, vB);
        velocityB.w = wB;
    }
    /**
     * @internal
     */
    static addType(type1, type2, callback) {
        s_registers[type1] = s_registers[type1] || {};
        s_registers[type1][type2] = callback;
    }
    /**
     * @internal
     */
    static create(fixtureA, indexA, fixtureB, indexB) {
        const typeA = fixtureA.m_shape.m_type;
        const typeB = fixtureB.m_shape.m_type;
        const contact = contactPool.allocate();
        let evaluateFcn;
        if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
            contact.initialize(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
        }
        else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
            contact.initialize(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
        }
        else {
            return null;
        }
        // Contact creation may swap fixtures.
        fixtureA = contact.m_fixtureA;
        fixtureB = contact.m_fixtureB;
        indexA = contact.getChildIndexA();
        indexB = contact.getChildIndexB();
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
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
    }
    /** @internal */
    static destroy(contact, listener) {
        const fixtureA = contact.m_fixtureA;
        const fixtureB = contact.m_fixtureB;
        if (fixtureA === null || fixtureB === null)
            return;
        const bodyA = fixtureA.m_body;
        const bodyB = fixtureB.m_body;
        if (bodyA === null || bodyB === null)
            return;
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
        if (contact.m_manifold.pointCount > 0 && !fixtureA.m_isSensor && !fixtureB.m_isSensor) {
            bodyA.setAwake(true);
            bodyB.setAwake(true);
        }
        // const typeA = fixtureA.getType();
        // const typeB = fixtureB.getType();
        // const destroyFcn = s_registers[typeA][typeB].destroyFcn;
        // if (typeof destroyFcn === 'function') {
        //   destroyFcn(contact);
        // }
        contactPool.release(contact);
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
const WorldDefDefault = {
    gravity: Vec2.zero(),
    allowSleep: true,
    warmStarting: true,
    continuousPhysics: true,
    subStepping: false,
    blockSolve: true,
    velocityIterations: 8,
    positionIterations: 3
};
class World {
    /**
     * @param def World definition or gravity vector.
     */
    constructor(def) {
        this.s_step = new TimeStep();
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
    _serialize() {
        const bodies = [];
        const joints = [];
        for (let b = this.getBodyList(); b; b = b.getNext()) {
            bodies.push(b);
        }
        for (let j = this.getJointList(); j; j = j.getNext()) {
            // @ts-ignore
            if (typeof j._serialize === 'function') {
                joints.push(j);
            }
        }
        return {
            gravity: this.m_gravity,
            bodies,
            joints,
        };
    }
    /** @internal */
    static _deserialize(data, context, restore) {
        if (!data) {
            return new World();
        }
        const world = new World(data.gravity);
        if (data.bodies) {
            for (let i = data.bodies.length - 1; i >= 0; i -= 1) {
                world._addBody(restore(Body, data.bodies[i], world));
            }
        }
        if (data.joints) {
            for (let i = data.joints.length - 1; i >= 0; i--) {
                world.createJoint(restore(Joint, data.joints[i], world));
            }
        }
        return world;
    }
    /**
     * Get the world body list. With the returned body, use Body.getNext to get the
     * next body in the world list. A null body indicates the end of the list.
     *
     * @return the head of the world body list.
     */
    getBodyList() {
        return this.m_bodyList;
    }
    /**
     * Get the world joint list. With the returned joint, use Joint.getNext to get
     * the next joint in the world list. A null joint indicates the end of the list.
     *
     * @return the head of the world joint list.
     */
    getJointList() {
        return this.m_jointList;
    }
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
    getContactList() {
        return this.m_contactList;
    }
    getBodyCount() {
        return this.m_bodyCount;
    }
    getJointCount() {
        return this.m_jointCount;
    }
    /**
     * Get the number of contacts (each may have 0 or more contact points).
     */
    getContactCount() {
        return this.m_contactCount;
    }
    /**
     * Change the global gravity vector.
     */
    setGravity(gravity) {
        this.m_gravity = gravity;
    }
    /**
     * Get the global gravity vector.
     */
    getGravity() {
        return this.m_gravity;
    }
    /**
     * Is the world locked (in the middle of a time step).
     */
    isLocked() {
        return this.m_locked;
    }
    /**
     * Enable/disable sleep.
     */
    setAllowSleeping(flag) {
        if (flag == this.m_allowSleep) {
            return;
        }
        this.m_allowSleep = flag;
        if (this.m_allowSleep == false) {
            for (let b = this.m_bodyList; b; b = b.m_next) {
                b.setAwake(true);
            }
        }
    }
    getAllowSleeping() {
        return this.m_allowSleep;
    }
    /**
     * Enable/disable warm starting. For testing.
     */
    setWarmStarting(flag) {
        this.m_warmStarting = flag;
    }
    getWarmStarting() {
        return this.m_warmStarting;
    }
    /**
     * Enable/disable continuous physics. For testing.
     */
    setContinuousPhysics(flag) {
        this.m_continuousPhysics = flag;
    }
    getContinuousPhysics() {
        return this.m_continuousPhysics;
    }
    /**
     * Enable/disable single stepped continuous physics. For testing.
     */
    setSubStepping(flag) {
        this.m_subStepping = flag;
    }
    getSubStepping() {
        return this.m_subStepping;
    }
    /**
     * Set flag to control automatic clearing of forces after each time step.
     */
    setAutoClearForces(flag) {
        this.m_clearForces = flag;
    }
    /**
     * Get the flag that controls automatic clearing of forces after each time step.
     */
    getAutoClearForces() {
        return this.m_clearForces;
    }
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
    clearForces() {
        for (let body = this.m_bodyList; body; body = body.getNext()) {
            body.m_force.setZero();
            body.m_torque = 0.0;
        }
    }
    /**
     * Query the world for all fixtures that potentially overlap the provided AABB.
     *
     * @param aabb The query box.
     * @param callback Called for each fixture found in the query AABB. It may return `false` to terminate the query.
     */
    queryAABB(aabb, callback) {
        const broadPhase = this.m_broadPhase;
        this.m_broadPhase.query(aabb, function (proxyId) {
            const proxy = broadPhase.getUserData(proxyId);
            return callback(proxy.fixture);
        });
    }
    /**
     * Ray-cast the world for all fixtures in the path of the ray. Your callback
     * controls whether you get the closest point, any point, or n-points. The
     * ray-cast ignores shapes that contain the starting point.
     *
     * @param point1 The ray starting point
     * @param point2 The ray ending point
     * @param callback A user implemented callback function.
     */
    rayCast(point1, point2, callback) {
        const broadPhase = this.m_broadPhase;
        this.m_broadPhase.rayCast({
            maxFraction: 1.0,
            p1: point1,
            p2: point2
        }, function (input, proxyId) {
            const proxy = broadPhase.getUserData(proxyId);
            const fixture = proxy.fixture;
            const index = proxy.childIndex;
            // @ts-ignore
            const output = {}; // TODO GC
            const hit = fixture.rayCast(output, input, index);
            if (hit) {
                const fraction = output.fraction;
                const point = Vec2.add(Vec2.mulNumVec2((1.0 - fraction), input.p1), Vec2.mulNumVec2(fraction, input.p2));
                return callback(fixture, point, output.normal, fraction);
            }
            return input.maxFraction;
        });
    }
    /**
     * Get the number of broad-phase proxies.
     */
    getProxyCount() {
        return this.m_broadPhase.getProxyCount();
    }
    /**
     * Get the height of broad-phase dynamic tree.
     */
    getTreeHeight() {
        return this.m_broadPhase.getTreeHeight();
    }
    /**
     * Get the balance of broad-phase dynamic tree.
     */
    getTreeBalance() {
        return this.m_broadPhase.getTreeBalance();
    }
    /**
     * Get the quality metric of broad-phase dynamic tree. The smaller the better.
     * The minimum is 1.
     */
    getTreeQuality() {
        return this.m_broadPhase.getTreeQuality();
    }
    /**
     * Shift the world origin. Useful for large worlds. The body shift formula is:
     * position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    shiftOrigin(newOrigin) {
        if (this.m_locked) {
            return;
        }
        for (let b = this.m_bodyList; b; b = b.m_next) {
            b.m_xf.p.sub(newOrigin);
            b.m_sweep.c0.sub(newOrigin);
            b.m_sweep.c.sub(newOrigin);
        }
        for (let j = this.m_jointList; j; j = j.m_next) {
            j.shiftOrigin(newOrigin);
        }
        this.m_broadPhase.shiftOrigin(newOrigin);
    }
    /**
     * @internal Used for deserialize.
     */
    _addBody(body) {
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
    }
    // tslint:disable-next-line:typedef
    /** @internal */ createBody(arg1, arg2) {
        if (this.isLocked()) {
            return null;
        }
        let def = {};
        if (!arg1) ;
        else if (Vec2.isValid(arg1)) {
            def = { position: arg1, angle: arg2 };
        }
        else if (typeof arg1 === 'object') {
            def = arg1;
        }
        const body = new Body(this, def);
        this._addBody(body);
        return body;
    }
    // tslint:disable-next-line:typedef
    /** @internal */ createDynamicBody(arg1, arg2) {
        let def = {};
        if (!arg1) ;
        else if (Vec2.isValid(arg1)) {
            def = { position: arg1, angle: arg2 };
        }
        else if (typeof arg1 === 'object') {
            def = arg1;
        }
        def.type = 'dynamic';
        return this.createBody(def);
    }
    // tslint:disable-next-line:typedef
    createKinematicBody(arg1, arg2) {
        let def = {};
        if (!arg1) ;
        else if (Vec2.isValid(arg1)) {
            def = { position: arg1, angle: arg2 };
        }
        else if (typeof arg1 === 'object') {
            def = arg1;
        }
        def.type = 'kinematic';
        return this.createBody(def);
    }
    /**
     * Destroy a rigid body given a definition. No reference to the definition is
     * retained.
     *
     * Warning: This automatically deletes all associated shapes and joints.
     *
     * Warning: This function is locked during callbacks.
     */
    destroyBody(b) {
        if (this.isLocked()) {
            return;
        }
        if (b.m_destroyed) {
            return false;
        }
        // Delete the attached joints.
        let je = b.m_jointList;
        while (je) {
            const je0 = je;
            je = je.next;
            this.publish('remove-joint', je0.joint);
            this.destroyJoint(je0.joint);
            b.m_jointList = je;
        }
        b.m_jointList = null;
        // Delete the attached contacts.
        let ce = b.m_contactList;
        while (ce) {
            const ce0 = ce;
            ce = ce.next;
            this.destroyContact(ce0.contact);
            b.m_contactList = ce;
        }
        b.m_contactList = null;
        // Delete the attached fixtures. This destroys broad-phase proxies.
        let f = b.m_fixtureList;
        while (f) {
            const f0 = f;
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
    }
    /**
     * Create a joint to constrain bodies together. No reference to the definition
     * is retained. This may cause the connected bodies to cease colliding.
     *
     * Warning: This function is locked during callbacks.
     */
    createJoint(joint) {
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
            for (let edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
                if (edge.other == joint.m_bodyA) {
                    // Flag the contact for filtering at the next time step (where either
                    // body is awake).
                    edge.contact.flagForFiltering();
                }
            }
        }
        // Note: creating a joint doesn't wake the bodies.
        return joint;
    }
    /**
     * Destroy a joint. This may cause the connected bodies to begin colliding.
     * Warning: This function is locked during callbacks.
     */
    destroyJoint(joint) {
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
        const bodyA = joint.m_bodyA;
        const bodyB = joint.m_bodyB;
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
            let edge = bodyB.getContactList();
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
    }
    /**
     * Take a time step. This performs collision detection, integration, and
     * constraint solution.
     *
     * Broad-phase, narrow-phase, solve and solve time of impacts.
     *
     * @param timeStep Time step, this should not vary.
     */
    step(timeStep, velocityIterations, positionIterations) {
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
            for (let b = this.m_bodyList; b; b = b.getNext()) {
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
    }
    /**
     * @internal
     * Call this method to find new contacts.
     */
    findNewContacts() {
        this.m_broadPhase.updatePairs((proxyA, proxyB) => this.createContact(proxyA, proxyB));
    }
    /**
     * @internal
     * Callback for broad-phase.
     */
    createContact(proxyA, proxyB) {
        const fixtureA = proxyA.fixture;
        const fixtureB = proxyB.fixture;
        const indexA = proxyA.childIndex;
        const indexB = proxyB.childIndex;
        const bodyA = fixtureA.getBody();
        const bodyB = fixtureB.getBody();
        // Are the fixtures on the same body?
        if (bodyA == bodyB) {
            return;
        }
        // TODO_ERIN use a hash table to remove a potential bottleneck when both
        // bodies have a lot of contacts.
        // Does a contact already exist?
        let edge = bodyB.getContactList(); // ContactEdge
        while (edge) {
            if (edge.other == bodyA) {
                const fA = edge.contact.getFixtureA();
                const fB = edge.contact.getFixtureB();
                const iA = edge.contact.getChildIndexA();
                const iB = edge.contact.getChildIndexB();
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
        const contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
        if (contact == null) {
            return;
        }
        // Insert into the world.
        contact.m_prev = null;
        if (this.m_contactList != null) {
            contact.m_next = this.m_contactList;
            this.m_contactList.m_prev = contact;
        }
        this.m_contactList = contact;
        ++this.m_contactCount;
    }
    /**
     * @internal
     * Removes old non-overlapping contacts, applies filters and updates contacts.
     */
    updateContacts() {
        // Update awake contacts.
        let c;
        let next_c = this.m_contactList;
        while (c = next_c) {
            next_c = c.getNext();
            const fixtureA = c.getFixtureA();
            const fixtureB = c.getFixtureB();
            const indexA = c.getChildIndexA();
            const indexB = c.getChildIndexB();
            const bodyA = fixtureA.getBody();
            const bodyB = fixtureB.getBody();
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
            const activeA = bodyA.isAwake() && !bodyA.isStatic();
            const activeB = bodyB.isAwake() && !bodyB.isStatic();
            // At least one body must be awake and it must be dynamic or kinematic.
            if (activeA == false && activeB == false) {
                continue;
            }
            const proxyIdA = fixtureA.m_proxies[indexA].proxyId;
            const proxyIdB = fixtureB.m_proxies[indexB].proxyId;
            const overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
            // Here we destroy contacts that cease to overlap in the broad-phase.
            if (overlap == false) {
                this.destroyContact(c);
                continue;
            }
            // The contact persists.
            c.update(this);
        }
    }
    /** @internal */
    destroyContact(contact) {
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
        Contact.destroy(contact, this);
        --this.m_contactCount;
    }
    /**
     * Register an event listener.
     */
    // tslint:disable-next-line:typedef
    on(name, listener) {
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
    }
    /**
     * Remove an event listener.
     */
    // tslint:disable-next-line:typedef
    off(name, listener) {
        if (typeof name !== 'string' || typeof listener !== 'function') {
            return this;
        }
        const listeners = this._listeners && this._listeners[name];
        if (!listeners || !listeners.length) {
            return this;
        }
        const index = listeners.indexOf(listener);
        if (index >= 0) {
            listeners.splice(index, 1);
        }
        return this;
    }
    publish(name, arg1, arg2, arg3) {
        const listeners = this._listeners && this._listeners[name];
        if (!listeners || !listeners.length) {
            return 0;
        }
        for (let l = 0; l < listeners.length; l++) {
            listeners[l].call(this, arg1, arg2, arg3);
        }
        return listeners.length;
    }
    /**
     * @internal
     */
    beginContact(contact) {
        this.publish('begin-contact', contact);
    }
    /**
     * @internal
     */
    endContact(contact) {
        this.publish('end-contact', contact);
    }
    /**
     * @internal
     */
    preSolve(contact, oldManifold) {
        this.publish('pre-solve', contact, oldManifold);
    }
    /**
     * @internal
     */
    postSolve(contact, impulse) {
        this.publish('post-solve', contact, impulse);
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
class Vec3 {
    // tslint:disable-next-line:typedef
    constructor(x, y, z) {
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
    _serialize() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
    /** @internal */
    static _deserialize(data) {
        const obj = Object.create(Vec3.prototype);
        obj.x = data.x;
        obj.y = data.y;
        obj.z = data.z;
        return obj;
    }
    /** @internal */
    static neo(x, y, z) {
        const obj = Object.create(Vec3.prototype);
        obj.x = x;
        obj.y = y;
        obj.z = z;
        return obj;
    }
    static zero() {
        const obj = Object.create(Vec3.prototype);
        obj.x = 0;
        obj.y = 0;
        obj.z = 0;
        return obj;
    }
    static clone(v) {
        return Vec3.neo(v.x, v.y, v.z);
    }
    /** @internal */
    toString() {
        return JSON.stringify(this);
    }
    /**
     * Does this vector contain finite coordinates?
     */
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return math.isFinite(obj.x) && math.isFinite(obj.y) && math.isFinite(obj.z);
    }
    static assert(o) {
    }
    setZero() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        return this;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    add(w) {
        this.x += w.x;
        this.y += w.y;
        this.z += w.z;
        return this;
    }
    sub(w) {
        this.x -= w.x;
        this.y -= w.y;
        this.z -= w.z;
        return this;
    }
    mul(m) {
        this.x *= m;
        this.y *= m;
        this.z *= m;
        return this;
    }
    static areEqual(v, w) {
        return v === w ||
            typeof v === 'object' && v !== null &&
                typeof w === 'object' && w !== null &&
                v.x === w.x && v.y === w.y && v.z === w.z;
    }
    /**
     * Perform the dot product on two vectors.
     */
    static dot(v, w) {
        return v.x * w.x + v.y * w.y + v.z * w.z;
    }
    /**
     * Perform the cross product on two vectors. In 2D this produces a scalar.
     */
    static cross(v, w) {
        return new Vec3(v.y * w.z - v.z * w.y, v.z * w.x - v.x * w.z, v.x * w.y - v.y * w.x);
    }
    static add(v, w) {
        return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
    }
    static sub(v, w) {
        return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
    }
    static mul(v, m) {
        return new Vec3(m * v.x, m * v.y, m * v.z);
    }
    neg() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    static neg(v) {
        return new Vec3(-v.x, -v.y, -v.z);
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
const v1$2 = vec2(0, 0);
const v2$1 = vec2(0, 0);
/**
 * A line segment (edge) shape. These can be connected in chains or loops to
 * other edge shapes. The connectivity information is used to ensure correct
 * contact normals.
 */
class EdgeShape extends Shape {
    constructor(v1, v2) {
        super();
        this.m_type = EdgeShape.TYPE;
        this.m_radius = SettingsInternal.polygonRadius;
        this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
        this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();
        this.m_vertex0 = Vec2.zero();
        this.m_vertex3 = Vec2.zero();
        this.m_hasVertex0 = false;
        this.m_hasVertex3 = false;
    }
    /** @internal */
    _serialize() {
        return {
            type: this.m_type,
            vertex1: this.m_vertex1,
            vertex2: this.m_vertex2,
            vertex0: this.m_vertex0,
            vertex3: this.m_vertex3,
            hasVertex0: this.m_hasVertex0,
            hasVertex3: this.m_hasVertex3,
        };
    }
    /** @internal */
    static _deserialize(data) {
        const shape = new EdgeShape(data.vertex1, data.vertex2);
        if (shape.m_hasVertex0) {
            shape.setPrevVertex(data.vertex0);
        }
        if (shape.m_hasVertex3) {
            shape.setNextVertex(data.vertex3);
        }
        return shape;
    }
    /** @internal */
    _reset() {
        // noop
    }
    getRadius() {
        return this.m_radius;
    }
    getType() {
        return this.m_type;
    }
    /** @internal @deprecated */
    setNext(v) {
        return this.setNextVertex(v);
    }
    /**
     * Optional next vertex, used for smooth collision.
     */
    setNextVertex(v) {
        if (v) {
            this.m_vertex3.setVec2(v);
            this.m_hasVertex3 = true;
        }
        else {
            this.m_vertex3.setZero();
            this.m_hasVertex3 = false;
        }
        return this;
    }
    /**
     * Optional next vertex, used for smooth collision.
     */
    getNextVertex() {
        return this.m_vertex3;
    }
    /** @internal @deprecated */
    setPrev(v) {
        return this.setPrevVertex(v);
    }
    /**
     * Optional prev vertex, used for smooth collision.
     */
    setPrevVertex(v) {
        if (v) {
            this.m_vertex0.setVec2(v);
            this.m_hasVertex0 = true;
        }
        else {
            this.m_vertex0.setZero();
            this.m_hasVertex0 = false;
        }
        return this;
    }
    /**
     * Optional prev vertex, used for smooth collision.
     */
    getPrevVertex() {
        return this.m_vertex0;
    }
    /**
     * Set this as an isolated edge.
     */
    _set(v1, v2) {
        this.m_vertex1.setVec2(v1);
        this.m_vertex2.setVec2(v2);
        this.m_hasVertex0 = false;
        this.m_hasVertex3 = false;
        return this;
    }
    /**
     * @internal
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone() {
        const clone = new EdgeShape();
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_vertex1.setVec2(this.m_vertex1);
        clone.m_vertex2.setVec2(this.m_vertex2);
        clone.m_vertex0.setVec2(this.m_vertex0);
        clone.m_vertex3.setVec2(this.m_vertex3);
        clone.m_hasVertex0 = this.m_hasVertex0;
        clone.m_hasVertex3 = this.m_hasVertex3;
        return clone;
    }
    /**
     * Get the number of child primitives.
     */
    getChildCount() {
        return 1;
    }
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * @param xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf, p) {
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
    rayCast(output, input, xf, childIndex) {
        // p = p1 + t * d
        // v = v1 + s * e
        // p1 + t * d = v1 + s * e
        // s * e - t * d = p1 - v1
        // NOT_USED(childIndex);
        // Put the ray into the edge's frame of reference.
        const p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
        const p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
        const d = Vec2.sub(p2, p1);
        const v1 = this.m_vertex1;
        const v2 = this.m_vertex2;
        const e = Vec2.sub(v2, v1);
        const normal = Vec2.neo(e.y, -e.x);
        normal.normalize();
        // q = p1 + t * d
        // dot(normal, q - v1) = 0
        // dot(normal, p1 - v1) + t * dot(normal, d) = 0
        const numerator = Vec2.dot(normal, Vec2.sub(v1, p1));
        const denominator = Vec2.dot(normal, d);
        if (denominator == 0.0) {
            return false;
        }
        const t = numerator / denominator;
        if (t < 0.0 || input.maxFraction < t) {
            return false;
        }
        const q = Vec2.add(p1, Vec2.mulNumVec2(t, d));
        // q = v1 + s * r
        // s = dot(q - v1, r) / dot(r, r)
        const r = Vec2.sub(v2, v1);
        const rr = Vec2.dot(r, r);
        if (rr == 0.0) {
            return false;
        }
        const s = Vec2.dot(Vec2.sub(q, v1), r) / rr;
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
    }
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param aabb Returns the axis aligned box.
     * @param xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb, xf, childIndex) {
        transformVec2(v1$2, xf, this.m_vertex1);
        transformVec2(v2$1, xf, this.m_vertex2);
        AABB.combinePoints(aabb, v1$2, v2$1);
        AABB.extend(aabb, this.m_radius);
    }
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * @param massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData, density) {
        massData.mass = 0.0;
        combineVec2(massData.center, 0.5, this.m_vertex1, 0.5, this.m_vertex2);
        massData.I = 0.0;
    }
    computeDistanceProxy(proxy) {
        proxy.m_vertices[0] = this.m_vertex1;
        proxy.m_vertices[1] = this.m_vertex2;
        proxy.m_vertices.length = 2;
        proxy.m_count = 2;
        proxy.m_radius = this.m_radius;
    }
}
EdgeShape.TYPE = 'edge';
const Edge = EdgeShape;

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
const v1$1 = vec2(0, 0);
const v2 = vec2(0, 0);
/**
 * A chain shape is a free form sequence of line segments. The chain has
 * two-sided collision, so you can use inside and outside collision. Therefore,
 * you may use any winding order. Connectivity information is used to create
 * smooth collisions.
 *
 * WARNING: The chain will not collide properly if there are self-intersections.
 */
class ChainShape extends Shape {
    constructor(vertices, loop) {
        super();
        this.m_type = ChainShape.TYPE;
        this.m_radius = SettingsInternal.polygonRadius;
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
            }
            else {
                this._createChain(vertices);
            }
        }
    }
    /** @internal */
    _serialize() {
        const data = {
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
    }
    /** @internal */
    static _deserialize(data, fixture, restore) {
        const vertices = [];
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
    getType() {
        return this.m_type;
    }
    getRadius() {
        return this.m_radius;
    }
    /**
     * @internal
     * Create a loop. This automatically adjusts connectivity.
     *
     * @param vertices an array of vertices, these are copied
     * @param count the vertex count
     */
    _createLoop(vertices) {
        if (vertices.length < 3) {
            return;
        }
        for (let i = 1; i < vertices.length; ++i) {
            vertices[i - 1];
            vertices[i];
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
     * @param count the vertex count
     */
    _createChain(vertices) {
        for (let i = 1; i < vertices.length; ++i) {
            // If the code crashes here, it means your vertices are too close together.
            vertices[i - 1];
            vertices[i];
        }
        this.m_count = vertices.length;
        for (let i = 0; i < vertices.length; ++i) {
            this.m_vertices[i] = Vec2.clone(vertices[i]);
        }
        this.m_hasPrevVertex = false;
        this.m_hasNextVertex = false;
        this.m_prevVertex = null;
        this.m_nextVertex = null;
        return this;
    }
    /** @internal */
    _reset() {
        if (this.m_isLoop) {
            this._createLoop(this.m_vertices);
        }
        else {
            this._createChain(this.m_vertices);
        }
    }
    /**
     * Establish connectivity to a vertex that precedes the first vertex. Don't call
     * this for loops.
     */
    setPrevVertex(prevVertex) {
        this.m_prevVertex = prevVertex;
        this.m_hasPrevVertex = true;
    }
    getPrevVertex() {
        return this.m_prevVertex;
    }
    /**
     * Establish connectivity to a vertex that follows the last vertex. Don't call
     * this for loops.
     */
    setNextVertex(nextVertex) {
        this.m_nextVertex = nextVertex;
        this.m_hasNextVertex = true;
    }
    getNextVertex() {
        return this.m_nextVertex;
    }
    /**
     * @internal
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone() {
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
    getChildCount() {
        // edge count = vertex count - 1
        return this.m_count - 1;
    }
    // Get a child edge.
    getChildEdge(edge, childIndex) {
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
    }
    getVertex(index) {
        if (index < this.m_count) {
            return this.m_vertices[index];
        }
        else {
            return this.m_vertices[0];
        }
    }
    isLoop() {
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
    testPoint(xf, p) {
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
    rayCast(output, input, xf, childIndex) {
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
    computeAABB(aabb, xf, childIndex) {
        transformVec2(v1$1, xf, this.getVertex(childIndex));
        transformVec2(v2, xf, this.getVertex(childIndex + 1));
        AABB.combinePoints(aabb, v1$1, v2);
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
    computeMass(massData, density) {
        massData.mass = 0.0;
        zeroVec2(massData.center);
        massData.I = 0.0;
    }
    computeDistanceProxy(proxy, childIndex) {
        proxy.m_vertices[0] = this.getVertex(childIndex);
        proxy.m_vertices[1] = this.getVertex(childIndex + 1);
        proxy.m_count = 2;
        proxy.m_radius = this.m_radius;
    }
}
ChainShape.TYPE = 'chain';
const Chain = ChainShape;

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
const temp$1 = vec2(0, 0);
const e$1 = vec2(0, 0);
const e1$1 = vec2(0, 0);
const e2$1 = vec2(0, 0);
const center = vec2(0, 0);
const s = vec2(0, 0);
/**
 * A convex polygon. It is assumed that the interior of the polygon is to the
 * left of each edge. Polygons have a maximum number of vertices equal to
 * Settings.maxPolygonVertices. In most cases you should not need many vertices
 * for a convex polygon. extends Shape
 */
class PolygonShape extends Shape {
    // @ts-ignore
    constructor(vertices) {
        super();
        this.m_type = PolygonShape.TYPE;
        this.m_radius = SettingsInternal.polygonRadius;
        this.m_centroid = Vec2.zero();
        this.m_vertices = [];
        this.m_normals = [];
        this.m_count = 0;
        if (vertices && vertices.length) {
            this._set(vertices);
        }
    }
    /** @internal */
    _serialize() {
        return {
            type: this.m_type,
            vertices: this.m_vertices,
        };
    }
    /** @internal */
    static _deserialize(data, fixture, restore) {
        const vertices = [];
        if (data.vertices) {
            for (let i = 0; i < data.vertices.length; i++) {
                vertices.push(restore(Vec2, data.vertices[i]));
            }
        }
        const shape = new PolygonShape(vertices);
        return shape;
    }
    getType() {
        return this.m_type;
    }
    getRadius() {
        return this.m_radius;
    }
    /**
     * @internal
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone() {
        const clone = new PolygonShape();
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_count = this.m_count;
        clone.m_centroid.setVec2(this.m_centroid);
        for (let i = 0; i < this.m_count; i++) {
            clone.m_vertices.push(this.m_vertices[i].clone());
        }
        for (let i = 0; i < this.m_normals.length; i++) {
            clone.m_normals.push(this.m_normals[i].clone());
        }
        return clone;
    }
    /**
     * Get the number of child primitives.
     */
    getChildCount() {
        return 1;
    }
    /** @internal */
    _reset() {
        this._set(this.m_vertices);
    }
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
    _set(vertices) {
        if (vertices.length < 3) {
            this._setAsBox(1.0, 1.0);
            return;
        }
        let n = math.min(vertices.length, SettingsInternal.maxPolygonVertices);
        // Perform welding and copy vertices into local buffer.
        const ps = []; // [Settings.maxPolygonVertices];
        for (let i = 0; i < n; ++i) {
            const v = vertices[i];
            let unique = true;
            for (let j = 0; j < ps.length; ++j) {
                if (Vec2.distanceSquared(v, ps[j]) < 0.25 * SettingsInternal.linearSlopSquared) {
                    unique = false;
                    break;
                }
            }
            if (unique) {
                ps.push(Vec2.clone(v));
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
        let i0 = 0;
        let x0 = ps[0].x;
        for (let i = 1; i < n; ++i) {
            const x = ps[i].x;
            if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
                i0 = i;
                x0 = x;
            }
        }
        const hull = []; // [Settings.maxPolygonVertices];
        let m = 0;
        let ih = i0;
        while (true) {
            hull[m] = ih;
            let ie = 0;
            for (let j = 1; j < n; ++j) {
                if (ie === ih) {
                    ie = j;
                    continue;
                }
                const r = Vec2.sub(ps[ie], ps[hull[m]]);
                const v = Vec2.sub(ps[j], ps[hull[m]]);
                const c = Vec2.crossVec2Vec2(r, v);
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
        for (let i = 0; i < m; ++i) {
            this.m_vertices[i] = ps[hull[i]];
        }
        // Compute normals. Ensure the edges have non-zero length.
        for (let i = 0; i < m; ++i) {
            const i1 = i;
            const i2 = i + 1 < m ? i + 1 : 0;
            const edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
            this.m_normals[i] = Vec2.crossVec2Num(edge, 1.0);
            this.m_normals[i].normalize();
        }
        // Compute the polygon centroid.
        this.m_centroid = ComputeCentroid(this.m_vertices, m);
    }
    /** @internal */
    _setAsBox(hx, hy, center, angle) {
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
        if (center && Vec2.isValid(center)) {
            angle = angle || 0;
            copyVec2(this.m_centroid, center);
            const xf = Transform.identity();
            xf.p.setVec2(center);
            xf.q.setAngle(angle);
            // Transform vertices and normals.
            for (let i = 0; i < this.m_count; ++i) {
                this.m_vertices[i] = Transform.mulVec2(xf, this.m_vertices[i]);
                this.m_normals[i] = Rot.mulVec2(xf.q, this.m_normals[i]);
            }
        }
    }
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * @param xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf, p) {
        const pLocal = invTransformVec2(temp$1, xf, p);
        for (let i = 0; i < this.m_count; ++i) {
            const dot = dotVec2(this.m_normals[i], pLocal) - dotVec2(this.m_normals[i], this.m_vertices[i]);
            if (dot > 0.0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Cast a ray against a child shape.
     *
     * @param output The ray-cast results.
     * @param input The ray-cast input parameters.
     * @param xf The transform to be applied to the shape.
     * @param childIndex The child shape index
     */
    rayCast(output, input, xf, childIndex) {
        // Put the ray into the polygon's frame of reference.
        const p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
        const p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
        const d = Vec2.sub(p2, p1);
        let lower = 0.0;
        let upper = input.maxFraction;
        let index = -1;
        for (let i = 0; i < this.m_count; ++i) {
            // p = p1 + a * d
            // dot(normal, p - v) = 0
            // dot(normal, p1 - v) + a * dot(normal, d) = 0
            const numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
            const denominator = Vec2.dot(this.m_normals[i], d);
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
            // if (upper < lower - matrix.EPSILON)
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
    }
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param aabb Returns the axis aligned box.
     * @param xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb, xf, childIndex) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (let i = 0; i < this.m_count; ++i) {
            const v = transformVec2(temp$1, xf, this.m_vertices[i]);
            minX = math.min(minX, v.x);
            maxX = math.max(maxX, v.x);
            minY = math.min(minY, v.y);
            maxY = math.max(maxY, v.y);
        }
        setVec2(aabb.lowerBound, minX - this.m_radius, minY - this.m_radius);
        setVec2(aabb.upperBound, maxX + this.m_radius, maxY + this.m_radius);
    }
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * @param massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData, density) {
        zeroVec2(center);
        let area = 0.0;
        let I = 0.0;
        // s is the reference point for forming triangles.
        // It's location doesn't change the result (except for rounding error).
        zeroVec2(s);
        // This code would put the reference point inside the polygon.
        for (let i = 0; i < this.m_count; ++i) {
            addVec2(s, this.m_vertices[i]);
        }
        setMulVec2(s, 1.0 / this.m_count, s);
        const k_inv3 = 1.0 / 3.0;
        for (let i = 0; i < this.m_count; ++i) {
            // Triangle vertices.
            diffVec2(e1$1, this.m_vertices[i], s);
            if (i + 1 < this.m_count) {
                diffVec2(e2$1, this.m_vertices[i + 1], s);
            }
            else {
                diffVec2(e2$1, this.m_vertices[0], s);
            }
            const D = crossVec2Vec2(e1$1, e2$1);
            const triangleArea = 0.5 * D;
            area += triangleArea;
            // Area weighted centroid
            combineVec2(center, 1, center, triangleArea * k_inv3, e1$1);
            combineVec2(center, 1, center, triangleArea * k_inv3, e2$1);
            const ex1 = e1$1.x;
            const ey1 = e1$1.y;
            const ex2 = e2$1.x;
            const ey2 = e2$1.y;
            const intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
            const inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
            I += (0.25 * k_inv3 * D) * (intx2 + inty2);
        }
        // Total mass
        massData.mass = density * area;
        setMulVec2(center, 1.0 / area, center);
        sumVec2(massData.center, center, s);
        // Inertia tensor relative to the local origin (point s).
        massData.I = density * I;
        // Shift to center of mass then to original body origin.
        massData.I += massData.mass * (dotVec2(massData.center, massData.center) - dotVec2(center, center));
    }
    /**
     * Validate convexity. This is a very time consuming operation.
     * @returns true if valid
     */
    validate() {
        for (let i = 0; i < this.m_count; ++i) {
            const i1 = i;
            const i2 = i < this.m_count - 1 ? i1 + 1 : 0;
            const p = this.m_vertices[i1];
            diffVec2(e$1, this.m_vertices[i2], p);
            for (let j = 0; j < this.m_count; ++j) {
                if (j == i1 || j == i2) {
                    continue;
                }
                const c = crossVec2Vec2(e$1, diffVec2(temp$1, this.m_vertices[j], p));
                if (c < 0.0) {
                    return false;
                }
            }
        }
        return true;
    }
    computeDistanceProxy(proxy) {
        for (let i = 0; i < this.m_count; ++i) {
            proxy.m_vertices[i] = this.m_vertices[i];
        }
        proxy.m_vertices.length = this.m_count;
        proxy.m_count = this.m_count;
        proxy.m_radius = this.m_radius;
    }
}
PolygonShape.TYPE = 'polygon';
function ComputeCentroid(vs, count) {
    const c = Vec2.zero();
    let area = 0.0;
    // pRef is the reference point for forming triangles.
    // It's location doesn't change the result (except for rounding error).
    const pRef = Vec2.zero();
    const inv3 = 1.0 / 3.0;
    for (let i = 0; i < count; ++i) {
        // Triangle vertices.
        const p1 = pRef;
        const p2 = vs[i];
        const p3 = i + 1 < count ? vs[i + 1] : vs[0];
        const e1 = Vec2.sub(p2, p1);
        const e2 = Vec2.sub(p3, p1);
        const D = Vec2.crossVec2Vec2(e1, e2);
        const triangleArea = 0.5 * D;
        area += triangleArea;
        // Area weighted centroid
        c.addMul(triangleArea * inv3, p1);
        c.addMul(triangleArea * inv3, p2);
        c.addMul(triangleArea * inv3, p3);
    }
    c.mul(1.0 / area);
    return c;
}
const Polygon = PolygonShape;

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
class BoxShape extends PolygonShape {
    constructor(hx, hy, center, angle) {
        super();
        this._setAsBox(hx, hy, center, angle);
    }
}
BoxShape.TYPE = 'polygon';
const Box = BoxShape;

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
const temp = vec2(0, 0);
class CircleShape extends Shape {
    // tslint:disable-next-line:typedef
    constructor(a, b) {
        super();
        this.m_type = CircleShape.TYPE;
        this.m_p = Vec2.zero();
        this.m_radius = 1;
        if (typeof a === 'object' && Vec2.isValid(a)) {
            this.m_p.setVec2(a);
            if (typeof b === 'number') {
                this.m_radius = b;
            }
        }
        else if (typeof a === 'number') {
            this.m_radius = a;
        }
    }
    /** @internal */
    _serialize() {
        return {
            type: this.m_type,
            p: this.m_p,
            radius: this.m_radius,
        };
    }
    /** @internal */
    static _deserialize(data) {
        return new CircleShape(data.p, data.radius);
    }
    /** @internal */
    _reset() {
        // noop
    }
    getType() {
        return this.m_type;
    }
    getRadius() {
        return this.m_radius;
    }
    getCenter() {
        return this.m_p;
    }
    /**
     * @internal
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone() {
        const clone = new CircleShape();
        clone.m_type = this.m_type;
        clone.m_radius = this.m_radius;
        clone.m_p = this.m_p.clone();
        return clone;
    }
    /**
     * Get the number of child primitives.
     */
    getChildCount() {
        return 1;
    }
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * @param xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf, p) {
        const center = transformVec2(temp, xf, this.m_p);
        return distSqrVec2(p, center) <= this.m_radius * this.m_radius;
    }
    /**
     * Cast a ray against a child shape.
     *
     * @param output The ray-cast results.
     * @param input The ray-cast input parameters.
     * @param xf The transform to be applied to the shape.
     * @param childIndex The child shape index
     */
    rayCast(output, input, xf, childIndex) {
        // Collision Detection in Interactive 3D Environments by Gino van den Bergen
        // From Section 3.1.2
        // x = s + a * r
        // norm(x) = radius
        const position = Vec2.add(xf.p, Rot.mulVec2(xf.q, this.m_p));
        const s = Vec2.sub(input.p1, position);
        const b = Vec2.dot(s, s) - this.m_radius * this.m_radius;
        // Solve quadratic equation.
        const r = Vec2.sub(input.p2, input.p1);
        const c = Vec2.dot(s, r);
        const rr = Vec2.dot(r, r);
        const sigma = c * c - rr * b;
        // Check for negative discriminant and short segment.
        if (sigma < 0.0 || rr < math.EPSILON) {
            return false;
        }
        // Find the point of intersection of the line with the circle.
        let a = -(c + math.sqrt(sigma));
        // Is the intersection point on the segment?
        if (0.0 <= a && a <= input.maxFraction * rr) {
            a /= rr;
            output.fraction = a;
            output.normal = Vec2.add(s, Vec2.mulNumVec2(a, r));
            output.normal.normalize();
            return true;
        }
        return false;
    }
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param aabb Returns the axis aligned box.
     * @param xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb, xf, childIndex) {
        const p = transformVec2(temp, xf, this.m_p);
        setVec2(aabb.lowerBound, p.x - this.m_radius, p.y - this.m_radius);
        setVec2(aabb.upperBound, p.x + this.m_radius, p.y + this.m_radius);
    }
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * @param massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData, density) {
        massData.mass = density * math.PI * this.m_radius * this.m_radius;
        copyVec2(massData.center, this.m_p);
        // inertia about the local origin
        massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + lengthSqrVec2(this.m_p));
    }
    computeDistanceProxy(proxy) {
        proxy.m_vertices[0] = this.m_p;
        proxy.m_vertices.length = 1;
        proxy.m_count = 1;
        proxy.m_radius = this.m_radius;
    }
}
CircleShape.TYPE = 'circle';
const Circle = CircleShape;

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
const DEFAULTS$a = {
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
class DistanceJoint extends Joint {
    constructor(def, bodyA, bodyB, anchorA, anchorB) {
        // order of constructor arguments is changed in v0.2
        if (bodyB && anchorA && ('m_type' in anchorA) && ('x' in bodyB) && ('y' in bodyB)) {
            const temp = bodyB;
            bodyB = anchorA;
            anchorA = temp;
        }
        def = options(def, DEFAULTS$a);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = DistanceJoint.TYPE;
        // Solver shared
        this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
        this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
        this.m_length = math.isFinite(def.length) ? def.length :
            Vec2.distance(bodyA.getWorldPoint(this.m_localAnchorA), bodyB.getWorldPoint(this.m_localAnchorB));
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_impulse = 0.0;
        this.m_gamma = 0.0;
        this.m_bias = 0.0;
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new DistanceJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
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
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * Set the natural length. Manipulating the length can lead to non-physical
     * behavior when the frequency is zero.
     */
    setLength(length) {
        this.m_length = length;
    }
    /**
     * Get the natural length.
     */
    getLength() {
        return this.m_length;
    }
    setFrequency(hz) {
        this.m_frequencyHz = hz;
    }
    getFrequency() {
        return this.m_frequencyHz;
    }
    setDampingRatio(ratio) {
        this.m_dampingRatio = ratio;
    }
    getDampingRatio() {
        return this.m_dampingRatio;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return 0.0;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = this.m_bodyA.c_position.c;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const cB = this.m_bodyB.c_position.c;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        this.m_u = Vec2.sub(Vec2.add(cB, this.m_rB), Vec2.add(cA, this.m_rA));
        // Handle singularity.
        const length = this.m_u.length();
        if (length > SettingsInternal.linearSlop) {
            this.m_u.mul(1.0 / length);
        }
        else {
            this.m_u.setNum(0.0, 0.0);
        }
        const crAu = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
        const crBu = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
        let invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB
            + this.m_invIB * crBu * crBu;
        // Compute the effective mass matrix.
        this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
        if (this.m_frequencyHz > 0.0) {
            const C = length - this.m_length;
            // Frequency
            const omega = 2.0 * math.PI * this.m_frequencyHz;
            // Damping coefficient
            const d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
            // Spring stiffness
            const k = this.m_mass * omega * omega;
            // magic formulas
            const h = step.dt;
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
            const P = Vec2.mulNumVec2(this.m_impulse, this.m_u);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        // Cdot = dot(u, v + cross(w, r))
        const vpA = Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA));
        const vpB = Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB));
        const Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);
        const impulse = -this.m_mass
            * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += impulse;
        const P = Vec2.mulNumVec2(impulse, this.m_u);
        vA.subMul(this.m_invMassA, P);
        wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
        vB.addMul(this.m_invMassB, P);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
        this.m_bodyA.c_velocity.v.setVec2(vA);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB);
        this.m_bodyB.c_velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        if (this.m_frequencyHz > 0.0) {
            // There is no position correction for soft distance constraints.
            return true;
        }
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
        const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
        const u = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
        const length = u.normalize();
        let C = length - this.m_length;
        C = math
            .clamp(C, -SettingsInternal.maxLinearCorrection, SettingsInternal.maxLinearCorrection);
        const impulse = -this.m_mass * C;
        const P = Vec2.mulNumVec2(impulse, u);
        cA.subMul(this.m_invMassA, P);
        aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
        cB.addMul(this.m_invMassB, P);
        aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);
        this.m_bodyA.c_position.c.setVec2(cA);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB);
        this.m_bodyB.c_position.a = aB;
        return math.abs(C) < SettingsInternal.linearSlop;
    }
}
DistanceJoint.TYPE = 'distance-joint';

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
const DEFAULTS$9 = {
    maxForce: 0.0,
    maxTorque: 0.0,
};
/**
 * Friction joint. This is used for top-down friction. It provides 2D
 * translational friction and angular friction.
 *
 * @param anchor Anchor in global coordination.
 */
class FrictionJoint extends Joint {
    constructor(def, bodyA, bodyB, anchor) {
        def = options(def, DEFAULTS$9);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = FrictionJoint.TYPE;
        this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        // Solver shared
        this.m_linearImpulse = Vec2.zero();
        this.m_angularImpulse = 0.0;
        this.m_maxForce = def.maxForce;
        this.m_maxTorque = def.maxTorque;
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new FrictionJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
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
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * Set the maximum friction force in N.
     */
    setMaxForce(force) {
        this.m_maxForce = force;
    }
    /**
     * Get the maximum friction force in N.
     */
    getMaxForce() {
        return this.m_maxForce;
    }
    /**
     * Set the maximum friction torque in N*m.
     */
    setMaxTorque(torque) {
        this.m_maxTorque = torque;
    }
    /**
     * Get the maximum friction torque in N*m.
     */
    getMaxTorque() {
        return this.m_maxTorque;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * this.m_angularImpulse;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
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
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const K = new Mat22();
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
            const P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const h = step.dt; // float
        // Solve angular friction
        {
            const Cdot = wB - wA; // float
            let impulse = -this.m_angularMass * Cdot; // float
            const oldImpulse = this.m_angularImpulse; // float
            const maxImpulse = h * this.m_maxTorque; // float
            this.m_angularImpulse = math.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_angularImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve linear friction
        {
            const Cdot = Vec2.sub(Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB)), Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA))); // Vec2
            let impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot)); // Vec2
            const oldImpulse = this.m_linearImpulse; // Vec2
            this.m_linearImpulse.add(impulse);
            const maxImpulse = h * this.m_maxForce; // float
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
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        return true;
    }
}
FrictionJoint.TYPE = 'friction-joint';

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
class Mat33 {
    constructor(a, b, c) {
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
    toString() {
        return JSON.stringify(this);
    }
    static isValid(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }
        return Vec3.isValid(obj.ex) && Vec3.isValid(obj.ey) && Vec3.isValid(obj.ez);
    }
    static assert(o) {
    }
    /**
     * Set this matrix to all zeros.
     */
    setZero() {
        this.ex.setZero();
        this.ey.setZero();
        this.ez.setZero();
        return this;
    }
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient than
     * computing the inverse in one-shot cases.
     */
    solve33(v) {
        // let det = matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, this.ez));
        let cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
        let cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
        let cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
        let det = this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z;
        if (det !== 0.0) {
            det = 1.0 / det;
        }
        const r = new Vec3();
        // r.x = det * matrix.dotVec3(v, matrix.newCrossVec3(this.ey, this.ez));
        cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
        cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
        cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
        r.x = det * (v.x * cross_x + v.y * cross_y + v.z * cross_z);
        // r.y = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(v, this.ez));
        cross_x = v.y * this.ez.z - v.z * this.ez.y;
        cross_y = v.z * this.ez.x - v.x * this.ez.z;
        cross_z = v.x * this.ez.y - v.y * this.ez.x;
        r.y = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
        // r.z = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, v));
        cross_x = this.ey.y * v.z - this.ey.z * v.y;
        cross_y = this.ey.z * v.x - this.ey.x * v.z;
        cross_z = this.ey.x * v.y - this.ey.y * v.x;
        r.z = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
        return r;
    }
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient than
     * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
     * equation.
     */
    solve22(v) {
        const a11 = this.ex.x;
        const a12 = this.ey.x;
        const a21 = this.ex.y;
        const a22 = this.ey.y;
        let det = a11 * a22 - a12 * a21;
        if (det !== 0.0) {
            det = 1.0 / det;
        }
        const r = Vec2.zero();
        r.x = det * (a22 * v.x - a12 * v.y);
        r.y = det * (a11 * v.y - a21 * v.x);
        return r;
    }
    /**
     * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
     * singular.
     */
    getInverse22(M) {
        const a = this.ex.x;
        const b = this.ey.x;
        const c = this.ex.y;
        const d = this.ey.y;
        let det = a * d - b * c;
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
    }
    /**
     * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
     * if singular.
     */
    getSymInverse33(M) {
        let det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
        if (det !== 0.0) {
            det = 1.0 / det;
        }
        const a11 = this.ex.x;
        const a12 = this.ey.x;
        const a13 = this.ez.x;
        const a22 = this.ey.y;
        const a23 = this.ez.y;
        const a33 = this.ez.z;
        M.ex.x = det * (a22 * a33 - a23 * a23);
        M.ex.y = det * (a13 * a23 - a12 * a33);
        M.ex.z = det * (a12 * a23 - a13 * a22);
        M.ey.x = M.ex.y;
        M.ey.y = det * (a11 * a33 - a13 * a13);
        M.ey.z = det * (a13 * a12 - a11 * a23);
        M.ez.x = M.ex.z;
        M.ez.y = M.ey.z;
        M.ez.z = det * (a11 * a22 - a12 * a12);
    }
    // tslint:disable-next-line:typedef
    static mul(a, b) {
        if (b && 'z' in b && 'y' in b && 'x' in b) {
            const x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
            const y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
            const z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
            return new Vec3(x, y, z);
        }
        else if (b && 'y' in b && 'x' in b) {
            const x = a.ex.x * b.x + a.ey.x * b.y;
            const y = a.ex.y * b.x + a.ey.y * b.y;
            return Vec2.neo(x, y);
        }
    }
    static mulVec3(a, b) {
        const x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
        const y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
        const z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
        return new Vec3(x, y, z);
    }
    static mulVec2(a, b) {
        const x = a.ex.x * b.x + a.ey.x * b.y;
        const y = a.ex.y * b.x + a.ey.y * b.y;
        return Vec2.neo(x, y);
    }
    static add(a, b) {
        return new Mat33(Vec3.add(a.ex, b.ex), Vec3.add(a.ey, b.ey), Vec3.add(a.ez, b.ez));
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
const inactiveLimit$2 = 0;
const atLowerLimit$1 = 1;
const atUpperLimit$2 = 2;
const equalLimits$1 = 3;
const DEFAULTS$8 = {
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
class RevoluteJoint extends Joint {
    // @ts-ignore
    constructor(def, bodyA, bodyB, anchor) {
        def = options(def, DEFAULTS$8);
        super(def, bodyA, bodyB);
        // effective mass for point-to-point constraint.
        /** @internal */ this.m_mass = new Mat33();
        /** @internal */ this.m_limitState = inactiveLimit$2; // TODO enum
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = RevoluteJoint.TYPE;
        this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        this.m_referenceAngle = math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
        this.m_impulse = new Vec3();
        this.m_motorImpulse = 0.0;
        this.m_lowerAngle = def.lowerAngle;
        this.m_upperAngle = def.upperAngle;
        this.m_maxMotorTorque = def.maxMotorTorque;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new RevoluteJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
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
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * Get the reference angle.
     */
    getReferenceAngle() {
        return this.m_referenceAngle;
    }
    /**
     * Get the current joint angle in radians.
     */
    getJointAngle() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
    }
    /**
     * Get the current joint angle speed in radians per second.
     */
    getJointSpeed() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        return bB.m_angularVelocity - bA.m_angularVelocity;
    }
    /**
     * Is the joint motor enabled?
     */
    isMotorEnabled() {
        return this.m_enableMotor;
    }
    /**
     * Enable/disable the joint motor.
     */
    enableMotor(flag) {
        if (flag == this.m_enableMotor)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableMotor = flag;
    }
    /**
     * Get the current motor torque given the inverse time step. Unit is N*m.
     */
    getMotorTorque(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    /**
     * Set the motor speed in radians per second.
     */
    setMotorSpeed(speed) {
        if (speed == this.m_motorSpeed)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_motorSpeed = speed;
    }
    /**
     * Get the motor speed in radians per second.
     */
    getMotorSpeed() {
        return this.m_motorSpeed;
    }
    /**
     * Set the maximum motor torque, usually in N-m.
     */
    setMaxMotorTorque(torque) {
        if (torque == this.m_maxMotorTorque)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_maxMotorTorque = torque;
    }
    getMaxMotorTorque() {
        return this.m_maxMotorTorque;
    }
    /**
     * Is the joint limit enabled?
     */
    isLimitEnabled() {
        return this.m_enableLimit;
    }
    /**
     * Enable/disable the joint limit.
     */
    enableLimit(flag) {
        if (flag != this.m_enableLimit) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableLimit = flag;
            this.m_impulse.z = 0.0;
        }
    }
    /**
     * Get the lower joint limit in radians.
     */
    getLowerLimit() {
        return this.m_lowerAngle;
    }
    /**
     * Get the upper joint limit in radians.
     */
    getUpperLimit() {
        return this.m_upperAngle;
    }
    /**
     * Set the joint limits in radians.
     */
    setLimits(lower, upper) {
        if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_impulse.z = 0.0;
            this.m_lowerAngle = lower;
            this.m_upperAngle = upper;
        }
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force given the inverse time step. Unit is N.
     */
    getReactionForce(inv_dt) {
        return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
    }
    /**
     * Get the reaction torque due to the joint limit given the inverse time step.
     * Unit is N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * this.m_impulse.z;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        // J = [-I -r1_skew I r2_skew]
        // [ 0 -1 0 1]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
        // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
        // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB; // float
        const iA = this.m_invIA;
        const iB = this.m_invIB; // float
        const fixedRotation = (iA + iB === 0.0); // bool
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
            const jointAngle = aB - aA - this.m_referenceAngle; // float
            if (math.abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * SettingsInternal.angularSlop) {
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
            const P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB; // float
        const iA = this.m_invIA;
        const iB = this.m_invIB; // float
        const fixedRotation = (iA + iB === 0.0); // bool
        // Solve motor constraint.
        if (this.m_enableMotor && this.m_limitState != equalLimits$1
            && fixedRotation == false) {
            const Cdot = wB - wA - this.m_motorSpeed; // float
            let impulse = -this.m_motorMass * Cdot; // float
            const oldImpulse = this.m_motorImpulse; // float
            const maxImpulse = step.dt * this.m_maxMotorTorque; // float
            this.m_motorImpulse = math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve limit constraint.
        if (this.m_enableLimit && this.m_limitState != inactiveLimit$2
            && fixedRotation == false) {
            const Cdot1 = Vec2.zero();
            Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
            Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
            const Cdot2 = wB - wA; // float
            const Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
            const impulse = Vec3.neg(this.m_mass.solve33(Cdot)); // Vec3
            if (this.m_limitState == equalLimits$1) {
                this.m_impulse.add(impulse);
            }
            else if (this.m_limitState == atLowerLimit$1) {
                const newImpulse = this.m_impulse.z + impulse.z; // float
                if (newImpulse < 0.0) {
                    const rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y)); // Vec2
                    const reduced = this.m_mass.solve22(rhs); // Vec2
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
                const newImpulse = this.m_impulse.z + impulse.z; // float
                if (newImpulse > 0.0) {
                    const rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y)); // Vec2
                    const reduced = this.m_mass.solve22(rhs); // Vec2
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
            const P = Vec2.neo(impulse.x, impulse.y);
            vA.subMul(mA, P);
            wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);
            vB.addMul(mB, P);
            wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
        }
        else {
            // Solve point-to-point constraint
            const Cdot = Vec2.zero();
            Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
            Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
            const impulse = this.m_mass.solve22(Vec2.neg(Cdot)); // Vec2
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
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        let angularError = 0.0; // float
        let positionError = 0.0; // float
        const fixedRotation = (this.m_invIA + this.m_invIB == 0.0); // bool
        // Solve angular limit constraint.
        if (this.m_enableLimit && this.m_limitState != inactiveLimit$2
            && fixedRotation == false) {
            const angle = aB - aA - this.m_referenceAngle; // float
            let limitImpulse = 0.0; // float
            if (this.m_limitState == equalLimits$1) {
                // Prevent large angular corrections
                const C = math.clamp(angle - this.m_lowerAngle, -SettingsInternal.maxAngularCorrection, SettingsInternal.maxAngularCorrection); // float
                limitImpulse = -this.m_motorMass * C;
                angularError = math.abs(C);
            }
            else if (this.m_limitState == atLowerLimit$1) {
                let C = angle - this.m_lowerAngle; // float
                angularError = -C;
                // Prevent large angular corrections and allow some slop.
                C = math.clamp(C + SettingsInternal.angularSlop, -SettingsInternal.maxAngularCorrection, 0.0);
                limitImpulse = -this.m_motorMass * C;
            }
            else if (this.m_limitState == atUpperLimit$2) {
                let C = angle - this.m_upperAngle; // float
                angularError = C;
                // Prevent large angular corrections and allow some slop.
                C = math.clamp(C - SettingsInternal.angularSlop, 0.0, SettingsInternal.maxAngularCorrection);
                limitImpulse = -this.m_motorMass * C;
            }
            aA -= this.m_invIA * limitImpulse;
            aB += this.m_invIB * limitImpulse;
        }
        // Solve point-to-point constraint.
        {
            qA.setAngle(aA);
            qB.setAngle(aB);
            const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
            const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2
            const C = Vec2.zero();
            C.addCombine(1, cB, 1, rB);
            C.subCombine(1, cA, 1, rA);
            positionError = C.length();
            const mA = this.m_invMassA;
            const mB = this.m_invMassB; // float
            const iA = this.m_invIA;
            const iB = this.m_invIB; // float
            const K = new Mat22();
            K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
            K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
            const impulse = Vec2.neg(K.solve(C)); // Vec2
            cA.subMul(mA, impulse);
            aA -= iA * Vec2.crossVec2Vec2(rA, impulse);
            cB.addMul(mB, impulse);
            aB += iB * Vec2.crossVec2Vec2(rB, impulse);
        }
        this.m_bodyA.c_position.c.setVec2(cA);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB);
        this.m_bodyB.c_position.a = aB;
        return positionError <= SettingsInternal.linearSlop
            && angularError <= SettingsInternal.angularSlop;
    }
}
RevoluteJoint.TYPE = 'revolute-joint';

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
const inactiveLimit$1 = 0;
const atLowerLimit = 1;
const atUpperLimit$1 = 2;
const equalLimits = 3;
const DEFAULTS$7 = {
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
class PrismaticJoint extends Joint {
    constructor(def, bodyA, bodyB, anchor, axis) {
        def = options(def, DEFAULTS$7);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = PrismaticJoint.TYPE;
        this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1.0, 0.0));
        this.m_localXAxisA.normalize();
        this.m_localYAxisA = Vec2.crossNumVec2(1.0, this.m_localXAxisA);
        this.m_referenceAngle = math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
        this.m_impulse = new Vec3();
        this.m_motorMass = 0.0;
        this.m_motorImpulse = 0.0;
        this.m_lowerTranslation = def.lowerTranslation;
        this.m_upperTranslation = def.upperTranslation;
        this.m_maxMotorForce = def.maxMotorForce;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = inactiveLimit$1;
        this.m_axis = Vec2.zero();
        this.m_perp = Vec2.zero();
        this.m_K = new Mat33();
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        data.localAxisA = Vec2.clone(data.localAxisA);
        const joint = new PrismaticJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
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
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * The local joint axis relative to bodyA.
     */
    getLocalAxisA() {
        return this.m_localXAxisA;
    }
    /**
     * Get the reference angle.
     */
    getReferenceAngle() {
        return this.m_referenceAngle;
    }
    /**
     * Get the current joint translation, usually in meters.
     */
    getJointTranslation() {
        const pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        const pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        const d = Vec2.sub(pB, pA);
        const axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
        const translation = Vec2.dot(d, axis);
        return translation;
    }
    /**
     * Get the current joint translation speed, usually in meters per second.
     */
    getJointSpeed() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const rA = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter)); // Vec2
        const rB = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter)); // Vec2
        const p1 = Vec2.add(bA.m_sweep.c, rA); // Vec2
        const p2 = Vec2.add(bB.m_sweep.c, rB); // Vec2
        const d = Vec2.sub(p2, p1); // Vec2
        const axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA); // Vec2
        const vA = bA.m_linearVelocity; // Vec2
        const vB = bB.m_linearVelocity; // Vec2
        const wA = bA.m_angularVelocity; // float
        const wB = bB.m_angularVelocity; // float
        const speed = Vec2.dot(d, Vec2.crossNumVec2(wA, axis))
            + Vec2.dot(axis, Vec2.sub(Vec2.addCrossNumVec2(vB, wB, rB), Vec2.addCrossNumVec2(vA, wA, rA))); // float
        return speed;
    }
    /**
     * Is the joint limit enabled?
     */
    isLimitEnabled() {
        return this.m_enableLimit;
    }
    /**
     * Enable/disable the joint limit.
     */
    enableLimit(flag) {
        if (flag != this.m_enableLimit) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableLimit = flag;
            this.m_impulse.z = 0.0;
        }
    }
    /**
     * Get the lower joint limit, usually in meters.
     */
    getLowerLimit() {
        return this.m_lowerTranslation;
    }
    /**
     * Get the upper joint limit, usually in meters.
     */
    getUpperLimit() {
        return this.m_upperTranslation;
    }
    /**
     * Set the joint limits, usually in meters.
     */
    setLimits(lower, upper) {
        if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_lowerTranslation = lower;
            this.m_upperTranslation = upper;
            this.m_impulse.z = 0.0;
        }
    }
    /**
     * Is the joint motor enabled?
     */
    isMotorEnabled() {
        return this.m_enableMotor;
    }
    /**
     * Enable/disable the joint motor.
     */
    enableMotor(flag) {
        if (flag == this.m_enableMotor)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableMotor = flag;
    }
    /**
     * Set the motor speed, usually in meters per second.
     */
    setMotorSpeed(speed) {
        if (speed == this.m_motorSpeed)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_motorSpeed = speed;
    }
    /**
     * Set the maximum motor force, usually in N.
     */
    setMaxMotorForce(force) {
        if (force == this.m_maxMotorForce)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_maxMotorForce = force;
    }
    getMaxMotorForce() {
        return this.m_maxMotorForce;
    }
    /**
     * Get the motor speed, usually in meters per second.
     */
    getMotorSpeed() {
        return this.m_motorSpeed;
    }
    /**
     * Get the current motor force given the inverse time step, usually in N.
     */
    getMotorForce(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * this.m_impulse.y;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = this.m_bodyA.c_position.c;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const cB = this.m_bodyB.c_position.c;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        // Compute the effective masses.
        const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        const d = Vec2.zero();
        d.addCombine(1, cB, 1, rB);
        d.subCombine(1, cA, 1, rA);
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
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
            const k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
            const k12 = iA * this.m_s1 + iB * this.m_s2;
            const k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
            let k22 = iA + iB;
            if (k22 == 0.0) {
                // For bodies with fixed rotation.
                k22 = 1.0;
            }
            const k23 = iA * this.m_a1 + iB * this.m_a2;
            const k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
            this.m_K.ex.set(k11, k12, k13);
            this.m_K.ey.set(k12, k22, k23);
            this.m_K.ez.set(k13, k23, k33);
        }
        // Compute motor and limit terms.
        if (this.m_enableLimit) {
            const jointTranslation = Vec2.dot(this.m_axis, d); // float
            if (math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * SettingsInternal.linearSlop) {
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
            const P = Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse
                + this.m_impulse.z, this.m_axis);
            const LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y
                + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
            const LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        // Solve linear motor constraint.
        if (this.m_enableMotor && this.m_limitState != equalLimits) {
            const Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB
                - this.m_a1 * wA;
            let impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
            const oldImpulse = this.m_motorImpulse;
            const maxImpulse = step.dt * this.m_maxMotorForce;
            this.m_motorImpulse = math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            const P = Vec2.mulNumVec2(impulse, this.m_axis);
            const LA = impulse * this.m_a1;
            const LB = impulse * this.m_a2;
            vA.subMul(mA, P);
            wA -= iA * LA;
            vB.addMul(mB, P);
            wB += iB * LB;
        }
        const Cdot1 = Vec2.zero();
        Cdot1.x += Vec2.dot(this.m_perp, vB) + this.m_s2 * wB;
        Cdot1.x -= Vec2.dot(this.m_perp, vA) + this.m_s1 * wA;
        Cdot1.y = wB - wA;
        if (this.m_enableLimit && this.m_limitState != inactiveLimit$1) {
            // Solve prismatic and limit constraint in block form.
            let Cdot2 = 0;
            Cdot2 += Vec2.dot(this.m_axis, vB) + this.m_a2 * wB;
            Cdot2 -= Vec2.dot(this.m_axis, vA) + this.m_a1 * wA;
            const Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
            const f1 = Vec3.clone(this.m_impulse);
            let df = this.m_K.solve33(Vec3.neg(Cdot)); // Vec3
            this.m_impulse.add(df);
            if (this.m_limitState == atLowerLimit) {
                this.m_impulse.z = math.max(this.m_impulse.z, 0.0);
            }
            else if (this.m_limitState == atUpperLimit$1) {
                this.m_impulse.z = math.min(this.m_impulse.z, 0.0);
            }
            // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
            // f1(1:2)
            const b = Vec2.combine(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y)); // Vec2
            const f2r = Vec2.add(this.m_K.solve22(b), Vec2.neo(f1.x, f1.y)); // Vec2
            this.m_impulse.x = f2r.x;
            this.m_impulse.y = f2r.y;
            df = Vec3.sub(this.m_impulse, f1);
            const P = Vec2.combine(df.x, this.m_perp, df.z, this.m_axis); // Vec2
            const LA = df.x * this.m_s1 + df.y + df.z * this.m_a1; // float
            const LB = df.x * this.m_s2 + df.y + df.z * this.m_a2; // float
            vA.subMul(mA, P);
            wA -= iA * LA;
            vB.addMul(mB, P);
            wB += iB * LB;
        }
        else {
            // Limit is inactive, just solve the prismatic constraint in block form.
            const df = this.m_K.solve22(Vec2.neg(Cdot1)); // Vec2
            this.m_impulse.x += df.x;
            this.m_impulse.y += df.y;
            const P = Vec2.mulNumVec2(df.x, this.m_perp); // Vec2
            const LA = df.x * this.m_s1 + df.y; // float
            const LB = df.x * this.m_s2 + df.y; // float
            vA.subMul(mA, P);
            wA -= iA * LA;
            vB.addMul(mB, P);
            wB += iB * LB;
        }
        this.m_bodyA.c_velocity.v = vA;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB;
        this.m_bodyB.c_velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        // Compute fresh Jacobians
        const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA)); // Vec2
        const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB)); // Vec2
        const d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA)); // Vec2
        const axis = Rot.mulVec2(qA, this.m_localXAxisA); // Vec2
        const a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), axis); // float
        const a2 = Vec2.crossVec2Vec2(rB, axis); // float
        const perp = Rot.mulVec2(qA, this.m_localYAxisA); // Vec2
        const s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), perp); // float
        const s2 = Vec2.crossVec2Vec2(rB, perp); // float
        let impulse = new Vec3();
        const C1 = Vec2.zero(); // Vec2
        C1.x = Vec2.dot(perp, d);
        C1.y = aB - aA - this.m_referenceAngle;
        let linearError = math.abs(C1.x); // float
        const angularError = math.abs(C1.y); // float
        const linearSlop = SettingsInternal.linearSlop;
        const maxLinearCorrection = SettingsInternal.maxLinearCorrection;
        let active = false; // bool
        let C2 = 0.0; // float
        if (this.m_enableLimit) {
            const translation = Vec2.dot(axis, d); // float
            if (math.abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * linearSlop) {
                // Prevent large angular corrections
                C2 = math.clamp(translation, -maxLinearCorrection, maxLinearCorrection);
                linearError = math.max(linearError, math.abs(translation));
                active = true;
            }
            else if (translation <= this.m_lowerTranslation) {
                // Prevent large linear corrections and allow some slop.
                C2 = math.clamp(translation - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0.0);
                linearError = math
                    .max(linearError, this.m_lowerTranslation - translation);
                active = true;
            }
            else if (translation >= this.m_upperTranslation) {
                // Prevent large linear corrections and allow some slop.
                C2 = math.clamp(translation - this.m_upperTranslation - linearSlop, 0.0, maxLinearCorrection);
                linearError = math
                    .max(linearError, translation - this.m_upperTranslation);
                active = true;
            }
        }
        if (active) {
            const k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
            const k12 = iA * s1 + iB * s2; // float
            const k13 = iA * s1 * a1 + iB * s2 * a2; // float
            let k22 = iA + iB; // float
            if (k22 == 0.0) {
                // For fixed rotation
                k22 = 1.0;
            }
            const k23 = iA * a1 + iB * a2; // float
            const k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2; // float
            const K = new Mat33();
            K.ex.set(k11, k12, k13);
            K.ey.set(k12, k22, k23);
            K.ez.set(k13, k23, k33);
            const C = new Vec3();
            C.x = C1.x;
            C.y = C1.y;
            C.z = C2;
            impulse = K.solve33(Vec3.neg(C));
        }
        else {
            const k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2; // float
            const k12 = iA * s1 + iB * s2; // float
            let k22 = iA + iB; // float
            if (k22 == 0.0) {
                k22 = 1.0;
            }
            const K = new Mat22();
            K.ex.setNum(k11, k12);
            K.ey.setNum(k12, k22);
            const impulse1 = K.solve(Vec2.neg(C1)); // Vec2
            impulse.x = impulse1.x;
            impulse.y = impulse1.y;
            impulse.z = 0.0;
        }
        const P = Vec2.combine(impulse.x, perp, impulse.z, axis); // Vec2
        const LA = impulse.x * s1 + impulse.y + impulse.z * a1; // float
        const LB = impulse.x * s2 + impulse.y + impulse.z * a2; // float
        cA.subMul(mA, P);
        aA -= iA * LA;
        cB.addMul(mB, P);
        aB += iB * LB;
        this.m_bodyA.c_position.c = cA;
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c = cB;
        this.m_bodyB.c_position.a = aB;
        return linearError <= SettingsInternal.linearSlop
            && angularError <= SettingsInternal.angularSlop;
    }
}
PrismaticJoint.TYPE = 'prismatic-joint';

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
const DEFAULTS$6 = {
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
class GearJoint extends Joint {
    constructor(def, bodyA, bodyB, joint1, joint2, ratio) {
        def = options(def, DEFAULTS$6);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = GearJoint.TYPE;
        this.m_joint1 = joint1 ? joint1 : def.joint1;
        this.m_joint2 = joint2 ? joint2 : def.joint2;
        this.m_ratio = math.isFinite(ratio) ? ratio : def.ratio;
        this.m_type1 = this.m_joint1.getType();
        this.m_type2 = this.m_joint2.getType();
        // joint1 connects body A to body C
        // joint2 connects body B to body D
        let coordinateA;
        let coordinateB;
        // TODO_ERIN there might be some problem with the joint edges in Joint.
        this.m_bodyC = this.m_joint1.getBodyA();
        this.m_bodyA = this.m_joint1.getBodyB();
        // Get geometry of joint1
        const xfA = this.m_bodyA.m_xf;
        const aA = this.m_bodyA.m_sweep.a;
        const xfC = this.m_bodyC.m_xf;
        const aC = this.m_bodyC.m_sweep.a;
        if (this.m_type1 === RevoluteJoint.TYPE) {
            const revolute = this.m_joint1;
            this.m_localAnchorC = revolute.m_localAnchorA;
            this.m_localAnchorA = revolute.m_localAnchorB;
            this.m_referenceAngleA = revolute.m_referenceAngle;
            this.m_localAxisC = Vec2.zero();
            coordinateA = aA - aC - this.m_referenceAngleA;
        }
        else {
            const prismatic = this.m_joint1;
            this.m_localAnchorC = prismatic.m_localAnchorA;
            this.m_localAnchorA = prismatic.m_localAnchorB;
            this.m_referenceAngleA = prismatic.m_referenceAngle;
            this.m_localAxisC = prismatic.m_localXAxisA;
            const pC = this.m_localAnchorC;
            const pA = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mulVec2(xfA.q, this.m_localAnchorA), Vec2.sub(xfA.p, xfC.p)));
            coordinateA = Vec2.dot(pA, this.m_localAxisC) - Vec2.dot(pC, this.m_localAxisC);
        }
        this.m_bodyD = this.m_joint2.getBodyA();
        this.m_bodyB = this.m_joint2.getBodyB();
        // Get geometry of joint2
        const xfB = this.m_bodyB.m_xf;
        const aB = this.m_bodyB.m_sweep.a;
        const xfD = this.m_bodyD.m_xf;
        const aD = this.m_bodyD.m_sweep.a;
        if (this.m_type2 === RevoluteJoint.TYPE) {
            const revolute = this.m_joint2;
            this.m_localAnchorD = revolute.m_localAnchorA;
            this.m_localAnchorB = revolute.m_localAnchorB;
            this.m_referenceAngleB = revolute.m_referenceAngle;
            this.m_localAxisD = Vec2.zero();
            coordinateB = aB - aD - this.m_referenceAngleB;
        }
        else {
            const prismatic = this.m_joint2;
            this.m_localAnchorD = prismatic.m_localAnchorA;
            this.m_localAnchorB = prismatic.m_localAnchorB;
            this.m_referenceAngleB = prismatic.m_referenceAngle;
            this.m_localAxisD = prismatic.m_localXAxisA;
            const pD = this.m_localAnchorD;
            const pB = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mulVec2(xfB.q, this.m_localAnchorB), Vec2.sub(xfB.p, xfD.p)));
            coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
        }
        this.m_constant = coordinateA + this.m_ratio * coordinateB;
        this.m_impulse = 0.0;
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        data.joint1 = restore(Joint, data.joint1, world);
        data.joint2 = restore(Joint, data.joint2, world);
        const joint = new GearJoint(data);
        // if (data._constant) joint.m_constant = data._constant;
        return joint;
    }
    /**
     * Get the first joint.
     */
    getJoint1() {
        return this.m_joint1;
    }
    /**
     * Get the second joint.
     */
    getJoint2() {
        return this.m_joint2;
    }
    /**
     * Set the gear ratio.
     */
    setRatio(ratio) {
        this.m_ratio = ratio;
    }
    /**
     * Get the gear ratio.
     */
    getRatio() {
        return this.m_ratio;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_JvAC).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        const L = this.m_impulse * this.m_JwA; // float
        return inv_dt * L;
    }
    initVelocityConstraints(step) {
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
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const aC = this.m_bodyC.c_position.a;
        const vC = this.m_bodyC.c_velocity.v;
        let wC = this.m_bodyC.c_velocity.w;
        const aD = this.m_bodyD.c_position.a;
        const vD = this.m_bodyD.c_velocity.v;
        let wD = this.m_bodyD.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const qC = Rot.neo(aC);
        const qD = Rot.neo(aD);
        this.m_mass = 0.0;
        if (this.m_type1 == RevoluteJoint.TYPE) {
            this.m_JvAC = Vec2.zero();
            this.m_JwA = 1.0;
            this.m_JwC = 1.0;
            this.m_mass += this.m_iA + this.m_iC;
        }
        else {
            const u = Rot.mulVec2(qC, this.m_localAxisC); // Vec2
            const rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC); // Vec2
            const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA); // Vec2
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
            const u = Rot.mulVec2(qD, this.m_localAxisD); // Vec2
            const rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD); // Vec2
            const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB); // Vec2
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const vC = this.m_bodyC.c_velocity.v;
        let wC = this.m_bodyC.c_velocity.w;
        const vD = this.m_bodyD.c_velocity.v;
        let wD = this.m_bodyD.c_velocity.w;
        let Cdot = Vec2.dot(this.m_JvAC, vA) - Vec2.dot(this.m_JvAC, vC)
            + Vec2.dot(this.m_JvBD, vB) - Vec2.dot(this.m_JvBD, vD); // float
        Cdot += (this.m_JwA * wA - this.m_JwC * wC)
            + (this.m_JwB * wB - this.m_JwD * wD);
        const impulse = -this.m_mass * Cdot; // float
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
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const cC = this.m_bodyC.c_position.c;
        let aC = this.m_bodyC.c_position.a;
        const cD = this.m_bodyD.c_position.c;
        let aD = this.m_bodyD.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const qC = Rot.neo(aC);
        const qD = Rot.neo(aD);
        const linearError = 0.0;
        let coordinateA;
        let coordinateB;
        let JvAC;
        let JvBD;
        let JwA;
        let JwB;
        let JwC;
        let JwD;
        let mass = 0.0;
        if (this.m_type1 == RevoluteJoint.TYPE) {
            JvAC = Vec2.zero();
            JwA = 1.0;
            JwC = 1.0;
            mass += this.m_iA + this.m_iC;
            coordinateA = aA - aC - this.m_referenceAngleA;
        }
        else {
            const u = Rot.mulVec2(qC, this.m_localAxisC); // Vec2
            const rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC); // Vec2
            const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA); // Vec2
            JvAC = u;
            JwC = Vec2.crossVec2Vec2(rC, u);
            JwA = Vec2.crossVec2Vec2(rA, u);
            mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
            const pC = Vec2.sub(this.m_localAnchorC, this.m_lcC); // Vec2
            const pA = Rot.mulTVec2(qC, Vec2.add(rA, Vec2.sub(cA, cC))); // Vec2
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
            const u = Rot.mulVec2(qD, this.m_localAxisD);
            const rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
            const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
            JvBD = Vec2.mulNumVec2(this.m_ratio, u);
            JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
            JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
            mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD
                * JwD * JwD + this.m_iB * JwB * JwB;
            const pD = Vec2.sub(this.m_localAnchorD, this.m_lcD); // Vec2
            const pB = Rot.mulTVec2(qD, Vec2.add(rB, Vec2.sub(cB, cD))); // Vec2
            coordinateB = Vec2.dot(pB, this.m_localAxisD)
                - Vec2.dot(pD, this.m_localAxisD);
        }
        const C = (coordinateA + this.m_ratio * coordinateB) - this.m_constant; // float
        let impulse = 0.0; // float
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
        return linearError < SettingsInternal.linearSlop;
    }
}
GearJoint.TYPE = 'gear-joint';

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
const DEFAULTS$5 = {
    maxForce: 1.0,
    maxTorque: 1.0,
    correctionFactor: 0.3
};
/**
 * A motor joint is used to control the relative motion between two bodies. A
 * typical usage is to control the movement of a dynamic body with respect to
 * the ground.
 */
class MotorJoint extends Joint {
    constructor(def, bodyA, bodyB) {
        def = options(def, DEFAULTS$5);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = MotorJoint.TYPE;
        this.m_linearOffset = math.isFinite(def.linearOffset) ? def.linearOffset : bodyA.getLocalPoint(bodyB.getPosition());
        this.m_angularOffset = math.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();
        this.m_linearImpulse = Vec2.zero();
        this.m_angularImpulse = 0.0;
        this.m_maxForce = def.maxForce;
        this.m_maxTorque = def.maxTorque;
        this.m_correctionFactor = def.correctionFactor;
        // Point-to-point constraint
        // Cdot = v2 - v1
        // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
        // J = [-I -r1_skew I r2_skew ]
        // Identity used:
        // w k % (rx i + ry j) = w * (-ry i + rx j)
        //
        // r1 = offset - c1
        // r2 = -c2
        // Angle constraint
        // Cdot = w2 - w1
        // J = [0 0 -1 0 0 1]
        // K = invI1 + invI2
    }
    /** @internal */
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new MotorJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
    }
    /**
     * Set the maximum friction force in N.
     */
    setMaxForce(force) {
        this.m_maxForce = force;
    }
    /**
     * Get the maximum friction force in N.
     */
    getMaxForce() {
        return this.m_maxForce;
    }
    /**
     * Set the maximum friction torque in N*m.
     */
    setMaxTorque(torque) {
        this.m_maxTorque = torque;
    }
    /**
     * Get the maximum friction torque in N*m.
     */
    getMaxTorque() {
        return this.m_maxTorque;
    }
    /**
     * Set the position correction factor in the range [0,1].
     */
    setCorrectionFactor(factor) {
        this.m_correctionFactor = factor;
    }
    /**
     * Get the position correction factor in the range [0,1].
     */
    getCorrectionFactor() {
        return this.m_correctionFactor;
    }
    /**
     * Set/get the target linear offset, in frame A, in meters.
     */
    setLinearOffset(linearOffset) {
        if (linearOffset.x != this.m_linearOffset.x
            || linearOffset.y != this.m_linearOffset.y) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_linearOffset = linearOffset;
        }
    }
    getLinearOffset() {
        return this.m_linearOffset;
    }
    /**
     * Set/get the target angular offset, in radians.
     */
    setAngularOffset(angularOffset) {
        if (angularOffset != this.m_angularOffset) {
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_angularOffset = angularOffset;
        }
    }
    getAngularOffset() {
        return this.m_angularOffset;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getPosition();
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getPosition();
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * this.m_angularImpulse;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = this.m_bodyA.c_position.c;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const cB = this.m_bodyB.c_position.c;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        // Compute the effective mass matrix.
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_linearOffset, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));
        // J = [-I -r1_skew I r2_skew]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
        // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
        // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        // Upper 2 by 2 of K for point to point
        const K = new Mat22();
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
        this.m_angularError = aB - aA - this.m_angularOffset;
        if (step.warmStarting) {
            // Scale impulses to support a variable time step.
            this.m_linearImpulse.mul(step.dtRatio);
            this.m_angularImpulse *= step.dtRatio;
            const P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const h = step.dt;
        const inv_h = step.inv_dt;
        // Solve angular friction
        {
            const Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
            let impulse = -this.m_angularMass * Cdot;
            const oldImpulse = this.m_angularImpulse;
            const maxImpulse = h * this.m_maxTorque;
            this.m_angularImpulse = math.clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_angularImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve linear friction
        {
            const Cdot = Vec2.zero();
            Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
            Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
            Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);
            let impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
            const oldImpulse = Vec2.clone(this.m_linearImpulse);
            this.m_linearImpulse.add(impulse);
            const maxImpulse = h * this.m_maxForce;
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
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        return true;
    }
}
MotorJoint.TYPE = 'motor-joint';

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
const DEFAULTS$4 = {
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
class MouseJoint extends Joint {
    constructor(def, bodyA, bodyB, target) {
        def = options(def, DEFAULTS$4);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = MouseJoint.TYPE;
        if (Vec2.isValid(target)) {
            this.m_targetA = Vec2.clone(target);
        }
        else if (Vec2.isValid(def.target)) {
            this.m_targetA = Vec2.clone(def.target);
        }
        else {
            this.m_targetA = Vec2.zero();
        }
        this.m_localAnchorB = Transform.mulTVec2(bodyB.getTransform(), this.m_targetA);
        this.m_maxForce = def.maxForce;
        this.m_impulse = Vec2.zero();
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_beta = 0.0;
        this.m_gamma = 0.0;
        // Solver temp
        this.m_rB = Vec2.zero();
        this.m_localCenterB = Vec2.zero();
        this.m_invMassB = 0.0;
        this.m_invIB = 0.0;
        this.m_mass = new Mat22();
        this.m_C = Vec2.zero();
        // p = attached point, m = mouse point
        // C = p - m
        // Cdot = v
        // = v + cross(w, r)
        // J = [I r_skew]
        // Identity used:
        // w k % (rx i + ry j) = w * (-ry i + rx j)
    }
    /** @internal */
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        data.target = Vec2.clone(data.target);
        const joint = new MouseJoint(data);
        if (data._localAnchorB) {
            joint.m_localAnchorB = data._localAnchorB;
        }
        return joint;
    }
    /**
     * Use this to update the target point.
     */
    setTarget(target) {
        if (Vec2.areEqual(target, this.m_targetA))
            return;
        this.m_bodyB.setAwake(true);
        this.m_targetA = Vec2.clone(target);
    }
    getTarget() {
        return this.m_targetA;
    }
    /**
     * Set the maximum force in Newtons.
     */
    setMaxForce(force) {
        this.m_maxForce = force;
    }
    /**
     * Get the maximum force in Newtons.
     */
    getMaxForce() {
        return this.m_maxForce;
    }
    /**
     * Set the frequency in Hertz.
     */
    setFrequency(hz) {
        this.m_frequencyHz = hz;
    }
    /**
     * Get the frequency in Hertz.
     */
    getFrequency() {
        return this.m_frequencyHz;
    }
    /**
     * Set the damping ratio (dimensionless).
     */
    setDampingRatio(ratio) {
        this.m_dampingRatio = ratio;
    }
    /**
     * Get the damping ratio (dimensionless).
     */
    getDampingRatio() {
        return this.m_dampingRatio;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return Vec2.clone(this.m_targetA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(inv_dt, this.m_impulse);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * 0.0;
    }
    /**
     * Shift the origin for any points stored in world coordinates.
     */
    shiftOrigin(newOrigin) {
        this.m_targetA.sub(newOrigin);
    }
    initVelocityConstraints(step) {
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIB = this.m_bodyB.m_invI;
        const position = this.m_bodyB.c_position;
        const velocity = this.m_bodyB.c_velocity;
        const cB = position.c;
        const aB = position.a;
        const vB = velocity.v;
        let wB = velocity.w;
        const qB = Rot.neo(aB);
        const mass = this.m_bodyB.getMass();
        // Frequency
        const omega = 2.0 * math.PI * this.m_frequencyHz;
        // Damping coefficient
        const d = 2.0 * mass * this.m_dampingRatio * omega;
        // Spring stiffness
        const k = mass * (omega * omega);
        // magic formulas
        // gamma has units of inverse mass.
        // beta has units of inverse time.
        const h = step.dt;
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
        const K = new Mat22();
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
    }
    solveVelocityConstraints(step) {
        const velocity = this.m_bodyB.c_velocity;
        const vB = Vec2.clone(velocity.v);
        let wB = velocity.w;
        // Cdot = v + cross(w, r)
        const Cdot = Vec2.crossNumVec2(wB, this.m_rB);
        Cdot.add(vB);
        Cdot.addCombine(1, this.m_C, this.m_gamma, this.m_impulse);
        Cdot.neg();
        let impulse = Mat22.mulVec2(this.m_mass, Cdot);
        const oldImpulse = Vec2.clone(this.m_impulse);
        this.m_impulse.add(impulse);
        const maxImpulse = step.dt * this.m_maxForce;
        this.m_impulse.clamp(maxImpulse);
        impulse = Vec2.sub(this.m_impulse, oldImpulse);
        vB.addMul(this.m_invMassB, impulse);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, impulse);
        velocity.v.setVec2(vB);
        velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        return true;
    }
}
MouseJoint.TYPE = 'mouse-joint';

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
const DEFAULTS$3 = {
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
class PulleyJoint extends Joint {
    constructor(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
        def = options(def, DEFAULTS$3);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = PulleyJoint.TYPE;
        this.m_groundAnchorA = groundA ? groundA : def.groundAnchorA || Vec2.neo(-1.0, 1.0);
        this.m_groundAnchorB = groundB ? groundB : def.groundAnchorB || Vec2.neo(1.0, 1.0);
        this.m_localAnchorA = anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
        this.m_localAnchorB = anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1.0, 0.0);
        this.m_lengthA = math.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
        this.m_lengthB = math.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
        this.m_ratio = math.isFinite(ratio) ? ratio : def.ratio;
        this.m_constant = this.m_lengthA + this.m_ratio * this.m_lengthB;
        this.m_impulse = 0.0;
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new PulleyJoint(data);
        return joint;
    }
    /**
     * Get the first ground anchor.
     */
    getGroundAnchorA() {
        return this.m_groundAnchorA;
    }
    /**
     * Get the second ground anchor.
     */
    getGroundAnchorB() {
        return this.m_groundAnchorB;
    }
    /**
     * Get the current length of the segment attached to bodyA.
     */
    getLengthA() {
        return this.m_lengthA;
    }
    /**
     * Get the current length of the segment attached to bodyB.
     */
    getLengthB() {
        return this.m_lengthB;
    }
    /**
     * Get the pulley ratio.
     */
    getRatio() {
        return this.m_ratio;
    }
    /**
     * Get the current length of the segment attached to bodyA.
     */
    getCurrentLengthA() {
        const p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        const s = this.m_groundAnchorA;
        return Vec2.distance(p, s);
    }
    /**
     * Get the current length of the segment attached to bodyB.
     */
    getCurrentLengthB() {
        const p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        const s = this.m_groundAnchorB;
        return Vec2.distance(p, s);
    }
    /**
     * Shift the origin for any points stored in world coordinates.
     *
     * @param newOrigin
     */
    shiftOrigin(newOrigin) {
        this.m_groundAnchorA.sub(newOrigin);
        this.m_groundAnchorB.sub(newOrigin);
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_uB).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return 0.0;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = this.m_bodyA.c_position.c;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const cB = this.m_bodyB.c_position.c;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        // Get the pulley axes.
        this.m_uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
        this.m_uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
        const lengthA = this.m_uA.length();
        const lengthB = this.m_uB.length();
        if (lengthA > 10.0 * SettingsInternal.linearSlop) {
            this.m_uA.mul(1.0 / lengthA);
        }
        else {
            this.m_uA.setZero();
        }
        if (lengthB > 10.0 * SettingsInternal.linearSlop) {
            this.m_uB.mul(1.0 / lengthB);
        }
        else {
            this.m_uB.setZero();
        }
        // Compute effective mass.
        const ruA = Vec2.crossVec2Vec2(this.m_rA, this.m_uA); // float
        const ruB = Vec2.crossVec2Vec2(this.m_rB, this.m_uB); // float
        const mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
        const mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float
        this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
        if (this.m_mass > 0.0) {
            this.m_mass = 1.0 / this.m_mass;
        }
        if (step.warmStarting) {
            // Scale impulses to support variable time steps.
            this.m_impulse *= step.dtRatio;
            // Warm starting.
            const PA = Vec2.mulNumVec2(-this.m_impulse, this.m_uA);
            const PB = Vec2.mulNumVec2(-this.m_ratio * this.m_impulse, this.m_uB);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const vpA = Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA));
        const vpB = Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB));
        const Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio
            * Vec2.dot(this.m_uB, vpB); // float
        const impulse = -this.m_mass * Cdot; // float
        this.m_impulse += impulse;
        const PA = Vec2.mulNumVec2(-impulse, this.m_uA); // Vec2
        const PB = Vec2.mulNumVec2(-this.m_ratio * impulse, this.m_uB); // Vec2
        vA.addMul(this.m_invMassA, PA);
        wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
        vB.addMul(this.m_invMassB, PB);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
        this.m_bodyA.c_velocity.v = vA;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB;
        this.m_bodyB.c_velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        // Get the pulley axes.
        const uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
        const uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
        const lengthA = uA.length();
        const lengthB = uB.length();
        if (lengthA > 10.0 * SettingsInternal.linearSlop) {
            uA.mul(1.0 / lengthA);
        }
        else {
            uA.setZero();
        }
        if (lengthB > 10.0 * SettingsInternal.linearSlop) {
            uB.mul(1.0 / lengthB);
        }
        else {
            uB.setZero();
        }
        // Compute effective mass.
        const ruA = Vec2.crossVec2Vec2(rA, uA);
        const ruB = Vec2.crossVec2Vec2(rB, uB);
        const mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
        const mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float
        let mass = mA + this.m_ratio * this.m_ratio * mB; // float
        if (mass > 0.0) {
            mass = 1.0 / mass;
        }
        const C = this.m_constant - lengthA - this.m_ratio * lengthB; // float
        const linearError = math.abs(C); // float
        const impulse = -mass * C; // float
        const PA = Vec2.mulNumVec2(-impulse, uA); // Vec2
        const PB = Vec2.mulNumVec2(-this.m_ratio * impulse, uB); // Vec2
        cA.addMul(this.m_invMassA, PA);
        aA += this.m_invIA * Vec2.crossVec2Vec2(rA, PA);
        cB.addMul(this.m_invMassB, PB);
        aB += this.m_invIB * Vec2.crossVec2Vec2(rB, PB);
        this.m_bodyA.c_position.c = cA;
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c = cB;
        this.m_bodyB.c_position.a = aB;
        return linearError < SettingsInternal.linearSlop;
    }
}
PulleyJoint.TYPE = 'pulley-joint';

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
const inactiveLimit = 0;
const atUpperLimit = 2;
const DEFAULTS$2 = {
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
class RopeJoint extends Joint {
    constructor(def, bodyA, bodyB, anchor) {
        def = options(def, DEFAULTS$2);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = RopeJoint.TYPE;
        this.m_localAnchorA = anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
        this.m_localAnchorB = anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1.0, 0.0);
        this.m_maxLength = def.maxLength;
        this.m_mass = 0.0;
        this.m_impulse = 0.0;
        this.m_length = 0.0;
        this.m_state = inactiveLimit;
        // Limit:
        // C = norm(pB - pA) - L
        // u = (pB - pA) / norm(pB - pA)
        // Cdot = dot(u, vB + cross(wB, rB) - vA - cross(wA, rA))
        // J = [-u -cross(rA, u) u cross(rB, u)]
        // K = J * invM * JT
        // = invMassA + invIA * cross(rA, u)^2 + invMassB + invIB * cross(rB, u)^2
    }
    /** @internal */
    _serialize() {
        return {
            type: this.m_type,
            bodyA: this.m_bodyA,
            bodyB: this.m_bodyB,
            collideConnected: this.m_collideConnected,
            localAnchorA: this.m_localAnchorA,
            localAnchorB: this.m_localAnchorB,
            maxLength: this.m_maxLength,
        };
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new RopeJoint(data);
        return joint;
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * Set the maximum length of the rope.
     */
    setMaxLength(length) {
        this.m_maxLength = length;
    }
    /**
     * Get the maximum length of the rope.
     */
    getMaxLength() {
        return this.m_maxLength;
    }
    getLimitState() {
        // TODO LimitState
        return this.m_state;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return 0.0;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const cA = this.m_bodyA.c_position.c;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const cB = this.m_bodyB.c_position.c;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
        this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
        this.m_u = Vec2.zero();
        this.m_u.addCombine(1, cB, 1, this.m_rB);
        this.m_u.subCombine(1, cA, 1, this.m_rA); // Vec2
        this.m_length = this.m_u.length();
        const C = this.m_length - this.m_maxLength; // float
        if (C > 0.0) {
            this.m_state = atUpperLimit;
        }
        else {
            this.m_state = inactiveLimit;
        }
        if (this.m_length > SettingsInternal.linearSlop) {
            this.m_u.mul(1.0 / this.m_length);
        }
        else {
            this.m_u.setZero();
            this.m_mass = 0.0;
            this.m_impulse = 0.0;
            return;
        }
        // Compute effective mass.
        const crA = Vec2.crossVec2Vec2(this.m_rA, this.m_u); // float
        const crB = Vec2.crossVec2Vec2(this.m_rB, this.m_u); // float
        const invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB
            + this.m_invIB * crB * crB; // float
        this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
        if (step.warmStarting) {
            // Scale the impulse to support a variable time step.
            this.m_impulse *= step.dtRatio;
            const P = Vec2.mulNumVec2(this.m_impulse, this.m_u);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        // Cdot = dot(u, v + cross(w, r))
        const vpA = Vec2.addCrossNumVec2(vA, wA, this.m_rA); // Vec2
        const vpB = Vec2.addCrossNumVec2(vB, wB, this.m_rB); // Vec2
        const C = this.m_length - this.m_maxLength; // float
        let Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA)); // float
        // Predictive constraint.
        if (C < 0.0) {
            Cdot += step.inv_dt * C;
        }
        let impulse = -this.m_mass * Cdot; // float
        const oldImpulse = this.m_impulse; // float
        this.m_impulse = math.min(0.0, this.m_impulse + impulse);
        impulse = this.m_impulse - oldImpulse;
        const P = Vec2.mulNumVec2(impulse, this.m_u); // Vec2
        vA.subMul(this.m_invMassA, P);
        wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
        vB.addMul(this.m_invMassB, P);
        wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
        this.m_bodyA.c_velocity.v = vA;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB;
        this.m_bodyB.c_velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c; // Vec2
        let aA = this.m_bodyA.c_position.a; // float
        const cB = this.m_bodyB.c_position.c; // Vec2
        let aB = this.m_bodyB.c_position.a; // float
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
        const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
        const u = Vec2.zero();
        u.addCombine(1, cB, 1, rB);
        u.subCombine(1, cA, 1, rA); // Vec2
        const length = u.normalize(); // float
        let C = length - this.m_maxLength; // float
        C = math.clamp(C, 0.0, SettingsInternal.maxLinearCorrection);
        const impulse = -this.m_mass * C; // float
        const P = Vec2.mulNumVec2(impulse, u); // Vec2
        cA.subMul(this.m_invMassA, P);
        aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
        cB.addMul(this.m_invMassB, P);
        aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);
        this.m_bodyA.c_position.c.setVec2(cA);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB);
        this.m_bodyB.c_position.a = aB;
        return length - this.m_maxLength < SettingsInternal.linearSlop;
    }
}
RopeJoint.TYPE = 'rope-joint';

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
const DEFAULTS$1 = {
    frequencyHz: 0.0,
    dampingRatio: 0.0,
};
/**
 * A weld joint essentially glues two bodies together. A weld joint may distort
 * somewhat because the island constraint solver is approximate.
 */
class WeldJoint extends Joint {
    constructor(def, bodyA, bodyB, anchor) {
        def = options(def, DEFAULTS$1);
        super(def, bodyA, bodyB);
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = WeldJoint.TYPE;
        this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        this.m_referenceAngle = math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_impulse = new Vec3();
        this.m_bias = 0.0;
        this.m_gamma = 0.0;
        // Solver temp
        this.m_rA; // Vec2
        this.m_rB; // Vec2
        this.m_localCenterA; // Vec2
        this.m_localCenterB; // Vec2
        this.m_invMassA; // float
        this.m_invMassB; // float
        this.m_invIA; // float
        this.m_invIB; // float
        this.m_mass = new Mat33();
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new WeldJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
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
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * Get the reference angle.
     */
    getReferenceAngle() {
        return this.m_referenceAngle;
    }
    /**
     * Set frequency in Hz.
     */
    setFrequency(hz) {
        this.m_frequencyHz = hz;
    }
    /**
     * Get frequency in Hz.
     */
    getFrequency() {
        return this.m_frequencyHz;
    }
    /**
     * Set damping ratio.
     */
    setDampingRatio(ratio) {
        this.m_dampingRatio = ratio;
    }
    /**
     * Get damping ratio.
     */
    getDampingRatio() {
        return this.m_dampingRatio;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * this.m_impulse.z;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        // J = [-I -r1_skew I r2_skew]
        // [ 0 -1 0 1]
        // r_skew = [-ry; rx]
        // Matlab
        // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
        // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
        // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const K = new Mat33();
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
            let invM = iA + iB; // float
            const m = invM > 0.0 ? 1.0 / invM : 0.0; // float
            const C = aB - aA - this.m_referenceAngle; // float
            // Frequency
            const omega = 2.0 * math.PI * this.m_frequencyHz; // float
            // Damping coefficient
            const d = 2.0 * m * this.m_dampingRatio * omega; // float
            // Spring stiffness
            const k = m * omega * omega; // float
            // magic formulas
            const h = step.dt; // float
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
            const P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
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
    }
    solveVelocityConstraints(step) {
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB; // float
        const iA = this.m_invIA;
        const iB = this.m_invIB; // float
        if (this.m_frequencyHz > 0.0) {
            const Cdot2 = wB - wA; // float
            const impulse2 = -this.m_mass.ez.z
                * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z); // float
            this.m_impulse.z += impulse2;
            wA -= iA * impulse2;
            wB += iB * impulse2;
            const Cdot1 = Vec2.zero();
            Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
            Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA)); // Vec2
            const impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1)); // Vec2
            this.m_impulse.x += impulse1.x;
            this.m_impulse.y += impulse1.y;
            const P = Vec2.clone(impulse1); // Vec2
            vA.subMul(mA, P);
            wA -= iA * Vec2.crossVec2Vec2(this.m_rA, P);
            vB.addMul(mB, P);
            wB += iB * Vec2.crossVec2Vec2(this.m_rB, P);
        }
        else {
            const Cdot1 = Vec2.zero();
            Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
            Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA)); // Vec2
            const Cdot2 = wB - wA; // float
            const Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2); // Vec3
            const impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot)); // Vec3
            this.m_impulse.add(impulse);
            const P = Vec2.neo(impulse.x, impulse.y);
            vA.subMul(mA, P);
            wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);
            vB.addMul(mB, P);
            wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
        }
        this.m_bodyA.c_velocity.v = vA;
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v = vB;
        this.m_bodyB.c_velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const mA = this.m_invMassA;
        const mB = this.m_invMassB;
        const iA = this.m_invIA;
        const iB = this.m_invIB;
        const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        let positionError;
        let angularError;
        const K = new Mat33();
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
            const C1 = Vec2.zero();
            C1.addCombine(1, cB, 1, rB);
            C1.subCombine(1, cA, 1, rA); // Vec2
            positionError = C1.length();
            angularError = 0.0;
            const P = Vec2.neg(K.solve22(C1)); // Vec2
            cA.subMul(mA, P);
            aA -= iA * Vec2.crossVec2Vec2(rA, P);
            cB.addMul(mB, P);
            aB += iB * Vec2.crossVec2Vec2(rB, P);
        }
        else {
            const C1 = Vec2.zero();
            C1.addCombine(1, cB, 1, rB);
            C1.subCombine(1, cA, 1, rA);
            const C2 = aB - aA - this.m_referenceAngle; // float
            positionError = C1.length();
            angularError = math.abs(C2);
            const C = new Vec3(C1.x, C1.y, C2);
            let impulse = new Vec3();
            if (K.ez.z > 0.0) {
                impulse = Vec3.neg(K.solve33(C));
            }
            else {
                const impulse2 = Vec2.neg(K.solve22(C1));
                impulse.set(impulse2.x, impulse2.y, 0.0);
            }
            const P = Vec2.neo(impulse.x, impulse.y);
            cA.subMul(mA, P);
            aA -= iA * (Vec2.crossVec2Vec2(rA, P) + impulse.z);
            cB.addMul(mB, P);
            aB += iB * (Vec2.crossVec2Vec2(rB, P) + impulse.z);
        }
        this.m_bodyA.c_position.c = cA;
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c = cB;
        this.m_bodyB.c_position.a = aB;
        return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
    }
}
WeldJoint.TYPE = 'weld-joint';

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
const DEFAULTS = {
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
class WheelJoint extends Joint {
    // @ts-ignore
    constructor(def, bodyA, bodyB, anchor, axis) {
        def = options(def, DEFAULTS);
        super(def, bodyA, bodyB);
        /** @internal */ this.m_ax = Vec2.zero();
        /** @internal */ this.m_ay = Vec2.zero();
        bodyA = this.m_bodyA;
        bodyB = this.m_bodyB;
        this.m_type = WheelJoint.TYPE;
        this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
        this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
        // @ts-ignore localAxis
        this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || def.localAxis || Vec2.neo(1.0, 0.0));
        this.m_localYAxisA = Vec2.crossNumVec2(1.0, this.m_localXAxisA);
        this.m_mass = 0.0;
        this.m_impulse = 0.0;
        this.m_motorMass = 0.0;
        this.m_motorImpulse = 0.0;
        this.m_springMass = 0.0;
        this.m_springImpulse = 0.0;
        this.m_maxMotorTorque = def.maxMotorTorque;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableMotor = def.enableMotor;
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_bias = 0.0;
        this.m_gamma = 0.0;
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
    _serialize() {
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
    }
    /** @internal */
    static _deserialize(data, world, restore) {
        data = Object.assign({}, data);
        data.bodyA = restore(Body, data.bodyA, world);
        data.bodyB = restore(Body, data.bodyB, world);
        const joint = new WheelJoint(data);
        return joint;
    }
    /** @internal */
    _setAnchors(def) {
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
    }
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA() {
        return this.m_localAnchorA;
    }
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB() {
        return this.m_localAnchorB;
    }
    /**
     * The local joint axis relative to bodyA.
     */
    getLocalAxisA() {
        return this.m_localXAxisA;
    }
    /**
     * Get the current joint translation, usually in meters.
     */
    getJointTranslation() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const pA = bA.getWorldPoint(this.m_localAnchorA); // Vec2
        const pB = bB.getWorldPoint(this.m_localAnchorB); // Vec2
        const d = Vec2.sub(pB, pA); // Vec2
        const axis = bA.getWorldVector(this.m_localXAxisA); // Vec2
        const translation = Vec2.dot(d, axis); // float
        return translation;
    }
    /**
     * Get the current joint translation speed, usually in meters per second.
     */
    getJointSpeed() {
        const wA = this.m_bodyA.m_angularVelocity;
        const wB = this.m_bodyB.m_angularVelocity;
        return wB - wA;
    }
    /**
     * Is the joint motor enabled?
     */
    isMotorEnabled() {
        return this.m_enableMotor;
    }
    /**
     * Enable/disable the joint motor.
     */
    enableMotor(flag) {
        if (flag == this.m_enableMotor)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_enableMotor = flag;
    }
    /**
     * Set the motor speed, usually in radians per second.
     */
    setMotorSpeed(speed) {
        if (speed == this.m_motorSpeed)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_motorSpeed = speed;
    }
    /**
     * Get the motor speed, usually in radians per second.
     */
    getMotorSpeed() {
        return this.m_motorSpeed;
    }
    /**
     * Set/Get the maximum motor force, usually in N-m.
     */
    setMaxMotorTorque(torque) {
        if (torque == this.m_maxMotorTorque)
            return;
        this.m_bodyA.setAwake(true);
        this.m_bodyB.setAwake(true);
        this.m_maxMotorTorque = torque;
    }
    getMaxMotorTorque() {
        return this.m_maxMotorTorque;
    }
    /**
     * Get the current motor torque given the inverse time step, usually in N-m.
     */
    getMotorTorque(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    /**
     * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
     * the spring.
     */
    setSpringFrequencyHz(hz) {
        this.m_frequencyHz = hz;
    }
    getSpringFrequencyHz() {
        return this.m_frequencyHz;
    }
    /**
     * Set/Get the spring damping ratio
     */
    setSpringDampingRatio(ratio) {
        this.m_dampingRatio = ratio;
    }
    getSpringDampingRatio() {
        return this.m_dampingRatio;
    }
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA() {
        return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    }
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB() {
        return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    }
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt) {
        return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
    }
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt) {
        return inv_dt * this.m_motorImpulse;
    }
    initVelocityConstraints(step) {
        this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
        this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
        this.m_invMassA = this.m_bodyA.m_invMass;
        this.m_invMassB = this.m_bodyB.m_invMass;
        this.m_invIA = this.m_bodyA.m_invI;
        this.m_invIB = this.m_bodyB.m_invI;
        const mA = this.m_invMassA;
        const mB = this.m_invMassB; // float
        const iA = this.m_invIA;
        const iB = this.m_invIB; // float
        const cA = this.m_bodyA.c_position.c;
        const aA = this.m_bodyA.c_position.a;
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const cB = this.m_bodyB.c_position.c;
        const aB = this.m_bodyB.c_position.a;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        // Compute the effective masses.
        const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        const d = Vec2.zero();
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
            const invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx
                * this.m_sBx; // float
            if (invMass > 0.0) {
                this.m_springMass = 1.0 / invMass;
                const C = Vec2.dot(d, this.m_ax); // float
                // Frequency
                const omega = 2.0 * math.PI * this.m_frequencyHz; // float
                // Damping coefficient
                const damp = 2.0 * this.m_springMass * this.m_dampingRatio * omega; // float
                // Spring stiffness
                const k = this.m_springMass * omega * omega; // float
                // magic formulas
                const h = step.dt; // float
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
            const P = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
            const LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
            const LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
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
    }
    solveVelocityConstraints(step) {
        const mA = this.m_invMassA;
        const mB = this.m_invMassB; // float
        const iA = this.m_invIA;
        const iB = this.m_invIB; // float
        const vA = this.m_bodyA.c_velocity.v;
        let wA = this.m_bodyA.c_velocity.w;
        const vB = this.m_bodyB.c_velocity.v;
        let wB = this.m_bodyB.c_velocity.w;
        // Solve spring constraint
        {
            const Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx
                * wB - this.m_sAx * wA; // float
            const impulse = -this.m_springMass
                * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse); // float
            this.m_springImpulse += impulse;
            const P = Vec2.mulNumVec2(impulse, this.m_ax); // Vec2
            const LA = impulse * this.m_sAx; // float
            const LB = impulse * this.m_sBx; // float
            vA.subMul(mA, P);
            wA -= iA * LA;
            vB.addMul(mB, P);
            wB += iB * LB;
        }
        // Solve rotational motor constraint
        {
            const Cdot = wB - wA - this.m_motorSpeed; // float
            let impulse = -this.m_motorMass * Cdot; // float
            const oldImpulse = this.m_motorImpulse; // float
            const maxImpulse = step.dt * this.m_maxMotorTorque; // float
            this.m_motorImpulse = math.clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            wA -= iA * impulse;
            wB += iB * impulse;
        }
        // Solve point to line constraint
        {
            const Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy
                * wB - this.m_sAy * wA; // float
            const impulse = -this.m_mass * Cdot; // float
            this.m_impulse += impulse;
            const P = Vec2.mulNumVec2(impulse, this.m_ay); // Vec2
            const LA = impulse * this.m_sAy; // float
            const LB = impulse * this.m_sBy; // float
            vA.subMul(mA, P);
            wA -= iA * LA;
            vB.addMul(mB, P);
            wB += iB * LB;
        }
        this.m_bodyA.c_velocity.v.setVec2(vA);
        this.m_bodyA.c_velocity.w = wA;
        this.m_bodyB.c_velocity.v.setVec2(vB);
        this.m_bodyB.c_velocity.w = wB;
    }
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step) {
        const cA = this.m_bodyA.c_position.c;
        let aA = this.m_bodyA.c_position.a;
        const cB = this.m_bodyB.c_position.c;
        let aB = this.m_bodyB.c_position.a;
        const qA = Rot.neo(aA);
        const qB = Rot.neo(aB);
        const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
        const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
        const d = Vec2.zero();
        d.addCombine(1, cB, 1, rB);
        d.subCombine(1, cA, 1, rA);
        const ay = Rot.mulVec2(qA, this.m_localYAxisA);
        const sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), ay); // float
        const sBy = Vec2.crossVec2Vec2(rB, ay); // float
        const C = Vec2.dot(d, ay); // float
        const k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy
            * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy; // float
        let impulse; // float
        if (k != 0.0) {
            impulse = -C / k;
        }
        else {
            impulse = 0.0;
        }
        const P = Vec2.mulNumVec2(impulse, ay); // Vec2
        const LA = impulse * sAy; // float
        const LB = impulse * sBy; // float
        cA.subMul(this.m_invMassA, P);
        aA -= this.m_invIA * LA;
        cB.addMul(this.m_invMassB, P);
        aB += this.m_invIB * LB;
        this.m_bodyA.c_position.c.setVec2(cA);
        this.m_bodyA.c_position.a = aA;
        this.m_bodyB.c_position.c.setVec2(cB);
        this.m_bodyB.c_position.a = aB;
        return math.abs(C) <= SettingsInternal.linearSlop;
    }
}
WheelJoint.TYPE = 'wheel-joint';

// tslint:disable:typedef
let SID = 0;
function Serializer(opts) {
    opts = opts || {};
    const rootClass = opts.rootClass || World;
    const preSerialize = opts.preSerialize || function (obj) { return obj; };
    const postSerialize = opts.postSerialize || function (data, obj) { return data; };
    const preDeserialize = opts.preDeserialize || function (data) { return data; };
    const postDeserialize = opts.postDeserialize || function (obj, data) { return obj; };
    // This is used to create ref objects during serialize
    const refTypes = {
        World,
        Body,
        Joint,
        Fixture,
        Shape,
    };
    // This is used by restore to deserialize objects and refs
    const restoreTypes = Object.assign({ Vec2,
        Vec3 }, refTypes);
    const CLASS_BY_TYPE_PROP = {
        [Body.STATIC]: Body,
        [Body.DYNAMIC]: Body,
        [Body.KINEMATIC]: Body,
        [ChainShape.TYPE]: ChainShape,
        [BoxShape.TYPE]: BoxShape,
        [EdgeShape.TYPE]: EdgeShape,
        [PolygonShape.TYPE]: PolygonShape,
        [CircleShape.TYPE]: CircleShape,
        [DistanceJoint.TYPE]: DistanceJoint,
        [FrictionJoint.TYPE]: FrictionJoint,
        [GearJoint.TYPE]: GearJoint,
        [MotorJoint.TYPE]: MotorJoint,
        [MouseJoint.TYPE]: MouseJoint,
        [PrismaticJoint.TYPE]: PrismaticJoint,
        [PulleyJoint.TYPE]: PulleyJoint,
        [RevoluteJoint.TYPE]: RevoluteJoint,
        [RopeJoint.TYPE]: RopeJoint,
        [WeldJoint.TYPE]: WeldJoint,
        [WheelJoint.TYPE]: WheelJoint,
    };
    this.toJson = function (root) {
        const json = [];
        const queue = [root];
        const refMap = {};
        function storeRef(value, typeName) {
            value.__sid = value.__sid || ++SID;
            if (!refMap[value.__sid]) {
                queue.push(value);
                const index = json.length + queue.length;
                const ref = {
                    refIndex: index,
                    refType: typeName
                };
                refMap[value.__sid] = ref;
            }
            return refMap[value.__sid];
        }
        function serialize(obj) {
            obj = preSerialize(obj);
            let data = obj._serialize();
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
                    for (const typeName in refTypes) {
                        if (value instanceof refTypes[typeName]) {
                            return storeRef(value, typeName);
                        }
                    }
                }
                value = serialize(value);
            }
            if (Array.isArray(value)) {
                const newValue = [];
                for (let key = 0; key < value.length; key++) {
                    newValue[key] = toJson(value[key]);
                }
                value = newValue;
            }
            else {
                const newValue = {};
                // tslint:disable-next-line:no-for-in
                for (const key in value) {
                    if (value.hasOwnProperty(key)) {
                        newValue[key] = toJson(value[key]);
                    }
                }
                value = newValue;
            }
            return value;
        }
        while (queue.length) {
            const obj = queue.shift();
            const str = toJson(obj, obj);
            json.push(str);
        }
        return json;
    };
    this.fromJson = function (json) {
        const refMap = {};
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
            const deserializer = findDeserilizer(data, cls);
            if (!deserializer) {
                return;
            }
            data = preDeserialize(data);
            let obj = deserializer(data, ctx, restoreRef);
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
            const index = ref.refIndex;
            if (!refMap[index]) {
                const data = json[index];
                const obj = deserialize(cls, data, ctx);
                refMap[index] = obj;
            }
            return refMap[index];
        }
        const root = rootClass._deserialize(json[0], null, restoreRef);
        return root;
    };
}
const serializer = new Serializer();
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
const pA = vec2(0, 0);
const pB = vec2(0, 0);
const CollideCircles = function (manifold, circleA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    transformVec2(pA, xfA, circleA.m_p);
    transformVec2(pB, xfB, circleB.m_p);
    const distSqr = distSqrVec2(pB, pA);
    const rA = circleA.m_radius;
    const rB = circleB.m_radius;
    const radius = rA + rB;
    if (distSqr > radius * radius) {
        return;
    }
    manifold.type = ManifoldType.e_circles;
    copyVec2(manifold.localPoint, circleA.m_p);
    zeroVec2(manifold.localNormal);
    manifold.pointCount = 1;
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    // manifold.points[0].id.key = 0;
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
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
Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);
function EdgeCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    const shapeA = fixtureA.getShape();
    const shapeB = fixtureB.getShape();
    CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}
function ChainCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    const chain = fixtureA.getShape();
    const edge = new EdgeShape();
    chain.getChildEdge(edge, indexA);
    const shapeA = edge;
    const shapeB = fixtureB.getShape();
    CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
}
const e = vec2(0, 0);
const e1 = vec2(0, 0);
const e2 = vec2(0, 0);
const Q = vec2(0, 0);
const P = vec2(0, 0);
const n$2 = vec2(0, 0);
// Compute contact points for edge versus circle.
// This accounts for edge connectivity.
const CollideEdgeCircle = function (manifold, edgeA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    // Compute circle in frame of edge
    retransformVec2(Q, xfB, xfA, circleB.m_p);
    const A = edgeA.m_vertex1;
    const B = edgeA.m_vertex2;
    diffVec2(e, B, A);
    // Barycentric coordinates
    const u = dotVec2(e, B) - dotVec2(e, Q);
    const v = dotVec2(e, Q) - dotVec2(e, A);
    const radius = edgeA.m_radius + circleB.m_radius;
    // Region A
    if (v <= 0.0) {
        copyVec2(P, A);
        const dd = distSqrVec2(Q, A);
        if (dd > radius * radius) {
            return;
        }
        // Is there an edge connected to A?
        if (edgeA.m_hasVertex0) {
            const A1 = edgeA.m_vertex0;
            const B1 = A;
            diffVec2(e1, B1, A1);
            const u1 = dotVec2(e1, B1) - dotVec2(e1, Q);
            // Is the circle in Region AB of the previous edge?
            if (u1 > 0.0) {
                return;
            }
        }
        manifold.type = ManifoldType.e_circles;
        zeroVec2(manifold.localNormal);
        copyVec2(manifold.localPoint, P);
        manifold.pointCount = 1;
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
        return;
    }
    // Region B
    if (u <= 0.0) {
        copyVec2(P, B);
        const dd = distSqrVec2(Q, P);
        if (dd > radius * radius) {
            return;
        }
        // Is there an edge connected to B?
        if (edgeA.m_hasVertex3) {
            const B2 = edgeA.m_vertex3;
            const A2 = B;
            diffVec2(e2, B2, A2);
            const v2 = dotVec2(e2, Q) - dotVec2(e2, A2);
            // Is the circle in Region AB of the next edge?
            if (v2 > 0.0) {
                return;
            }
        }
        manifold.type = ManifoldType.e_circles;
        zeroVec2(manifold.localNormal);
        copyVec2(manifold.localPoint, P);
        manifold.pointCount = 1;
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(1, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
        return;
    }
    // Region AB
    const den = lengthSqrVec2(e);
    combineVec2(P, u / den, A, v / den, B);
    const dd = distSqrVec2(Q, P);
    if (dd > radius * radius) {
        return;
    }
    crossNumVec2(n$2, 1, e);
    if (dotVec2(n$2, Q) - dotVec2(n$2, A) < 0.0) {
        negVec2(n$2);
    }
    normalizeVec2(n$2);
    manifold.type = ManifoldType.e_faceA;
    copyVec2(manifold.localNormal, n$2);
    copyVec2(manifold.localPoint, A);
    manifold.pointCount = 1;
    copyVec2(manifold.points[0].localPoint, circleB.m_p);
    // manifold.points[0].id.key = 0;
    manifold.points[0].id.setFeatures(0, ContactFeatureType.e_face, 0, ContactFeatureType.e_vertex);
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
const incidentEdge = [new ClipVertex(), new ClipVertex()];
const clipPoints1$1 = [new ClipVertex(), new ClipVertex()];
const clipPoints2$1 = [new ClipVertex(), new ClipVertex()];
const clipSegmentToLineNormal = vec2(0, 0);
const v1 = vec2(0, 0);
const n$1 = vec2(0, 0);
const xf$1 = transform(0, 0, 0);
const v11 = vec2(0, 0);
const v12 = vec2(0, 0);
const localTangent = vec2(0, 0);
const localNormal = vec2(0, 0);
const planePoint = vec2(0, 0);
const tangent = vec2(0, 0);
const normal$1 = vec2(0, 0);
const normal1$1 = vec2(0, 0);
Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);
function PolygonContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    CollidePolygons(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}
/**
 * Find the max separation between poly1 and poly2 using edge normals from
 * poly1.
 */
function findMaxSeparation(poly1, xf1, poly2, xf2, output) {
    const count1 = poly1.m_count;
    const count2 = poly2.m_count;
    const n1s = poly1.m_normals;
    const v1s = poly1.m_vertices;
    const v2s = poly2.m_vertices;
    invTransformTransform(xf$1, xf2, xf1);
    let bestIndex = 0;
    let maxSeparation = -Infinity;
    for (let i = 0; i < count1; ++i) {
        // Get poly1 normal in frame2.
        rotVec2(n$1, xf$1.q, n1s[i]);
        transformVec2(v1, xf$1, v1s[i]);
        // Find deepest point for normal i.
        let si = Infinity;
        for (let j = 0; j < count2; ++j) {
            const sij = dotVec2(n$1, v2s[j]) - dotVec2(n$1, v1);
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
function findIncidentEdge(clipVertex, poly1, xf1, edge1, poly2, xf2) {
    const normals1 = poly1.m_normals;
    const count2 = poly2.m_count;
    const vertices2 = poly2.m_vertices;
    const normals2 = poly2.m_normals;
    // Get the normal of the reference edge in poly2's frame.
    rerotVec2(normal1$1, xf2.q, xf1.q, normals1[edge1]);
    // Find the incident edge on poly2.
    let index = 0;
    let minDot = Infinity;
    for (let i = 0; i < count2; ++i) {
        const dot = dotVec2(normal1$1, normals2[i]);
        if (dot < minDot) {
            minDot = dot;
            index = i;
        }
    }
    // Build the clip vertices for the incident edge.
    const i1 = index;
    const i2 = i1 + 1 < count2 ? i1 + 1 : 0;
    transformVec2(clipVertex[0].v, xf2, vertices2[i1]);
    clipVertex[0].id.setFeatures(edge1, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);
    transformVec2(clipVertex[1].v, xf2, vertices2[i2]);
    clipVertex[1].id.setFeatures(edge1, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);
}
const maxSeparation = {
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
const CollidePolygons = function (manifold, polyA, xfA, polyB, xfB) {
    manifold.pointCount = 0;
    const totalRadius = polyA.m_radius + polyB.m_radius;
    findMaxSeparation(polyA, xfA, polyB, xfB, maxSeparation);
    const edgeA = maxSeparation.bestIndex;
    const separationA = maxSeparation.maxSeparation;
    if (separationA > totalRadius)
        return;
    findMaxSeparation(polyB, xfB, polyA, xfA, maxSeparation);
    const edgeB = maxSeparation.bestIndex;
    const separationB = maxSeparation.maxSeparation;
    if (separationB > totalRadius)
        return;
    let poly1; // reference polygon
    let poly2; // incident polygon
    let xf1;
    let xf2;
    let edge1; // reference edge
    let flip;
    const k_tol = 0.1 * SettingsInternal.linearSlop;
    if (separationB > separationA + k_tol) {
        poly1 = polyB;
        poly2 = polyA;
        xf1 = xfB;
        xf2 = xfA;
        edge1 = edgeB;
        manifold.type = ManifoldType.e_faceB;
        flip = true;
    }
    else {
        poly1 = polyA;
        poly2 = polyB;
        xf1 = xfA;
        xf2 = xfB;
        edge1 = edgeA;
        manifold.type = ManifoldType.e_faceA;
        flip = false;
    }
    incidentEdge[0].recycle(), incidentEdge[1].recycle();
    findIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
    const count1 = poly1.m_count;
    const vertices1 = poly1.m_vertices;
    const iv1 = edge1;
    const iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;
    copyVec2(v11, vertices1[iv1]);
    copyVec2(v12, vertices1[iv2]);
    diffVec2(localTangent, v12, v11);
    normalizeVec2(localTangent);
    crossVec2Num(localNormal, localTangent, 1.0);
    combineVec2(planePoint, 0.5, v11, 0.5, v12);
    rotVec2(tangent, xf1.q, localTangent);
    crossVec2Num(normal$1, tangent, 1.0);
    transformVec2(v11, xf1, v11);
    transformVec2(v12, xf1, v12);
    // Face offset.
    const frontOffset = dotVec2(normal$1, v11);
    // Side offsets, extended by polytope skin thickness.
    const sideOffset1 = -dotVec2(tangent, v11) + totalRadius;
    const sideOffset2 = dotVec2(tangent, v12) + totalRadius;
    // Clip incident edge against extruded edge1 side edges.
    clipPoints1$1[0].recycle(), clipPoints1$1[1].recycle();
    clipPoints2$1[0].recycle(), clipPoints2$1[1].recycle();
    // Clip to box side 1
    setVec2(clipSegmentToLineNormal, -tangent.x, -tangent.y);
    const np1 = clipSegmentToLine(clipPoints1$1, incidentEdge, clipSegmentToLineNormal, sideOffset1, iv1);
    if (np1 < 2) {
        return;
    }
    // Clip to negative box side 1
    setVec2(clipSegmentToLineNormal, tangent.x, tangent.y);
    const np2 = clipSegmentToLine(clipPoints2$1, clipPoints1$1, clipSegmentToLineNormal, sideOffset2, iv2);
    if (np2 < 2) {
        return;
    }
    // Now clipPoints2 contains the clipped points.
    copyVec2(manifold.localNormal, localNormal);
    copyVec2(manifold.localPoint, planePoint);
    let pointCount = 0;
    for (let i = 0; i < clipPoints2$1.length /* maxManifoldPoints */; ++i) {
        const separation = dotVec2(normal$1, clipPoints2$1[i].v) - frontOffset;
        if (separation <= totalRadius) {
            const cp = manifold.points[pointCount];
            invTransformVec2(cp.localPoint, xf2, clipPoints2$1[i].v);
            cp.id.set(clipPoints2$1[i].id);
            if (flip) {
                // Swap features
                cp.id.swapFeatures();
            }
            ++pointCount;
        }
    }
    manifold.pointCount = pointCount;
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
Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);
function PolygonCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
    CollidePolygonCircle(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
}
const cLocal = vec2(0, 0);
const faceCenter = vec2(0, 0);
const CollidePolygonCircle = function (manifold, polygonA, xfA, circleB, xfB) {
    manifold.pointCount = 0;
    // Compute circle position in the frame of the polygon.
    retransformVec2(cLocal, xfB, xfA, circleB.m_p);
    // Find the min separating edge.
    let normalIndex = 0;
    let separation = -Infinity;
    const radius = polygonA.m_radius + circleB.m_radius;
    const vertexCount = polygonA.m_count;
    const vertices = polygonA.m_vertices;
    const normals = polygonA.m_normals;
    for (let i = 0; i < vertexCount; ++i) {
        const s = dotVec2(normals[i], cLocal) - dotVec2(normals[i], vertices[i]);
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
    const vertIndex1 = normalIndex;
    const vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
    const v1 = vertices[vertIndex1];
    const v2 = vertices[vertIndex2];
    // If the center is inside the polygon ...
    if (separation < math.EPSILON) {
        manifold.pointCount = 1;
        manifold.type = ManifoldType.e_faceA;
        copyVec2(manifold.localNormal, normals[normalIndex]);
        combineVec2(manifold.localPoint, 0.5, v1, 0.5, v2);
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
        return;
    }
    // Compute barycentric coordinates
    // u1 = (cLocal - v1) dot (v2 - v1))
    const u1 = dotVec2(cLocal, v2) - dotVec2(cLocal, v1) - dotVec2(v1, v2) + dotVec2(v1, v1);
    // u2 = (cLocal - v2) dot (v1 - v2)
    const u2 = dotVec2(cLocal, v1) - dotVec2(cLocal, v2) - dotVec2(v2, v1) + dotVec2(v2, v2);
    if (u1 <= 0.0) {
        if (distSqrVec2(cLocal, v1) > radius * radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = ManifoldType.e_faceA;
        diffVec2(manifold.localNormal, cLocal, v1);
        normalizeVec2(manifold.localNormal);
        copyVec2(manifold.localPoint, v1);
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    }
    else if (u2 <= 0.0) {
        if (distSqrVec2(cLocal, v2) > radius * radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = ManifoldType.e_faceA;
        diffVec2(manifold.localNormal, cLocal, v2);
        normalizeVec2(manifold.localNormal);
        copyVec2(manifold.localPoint, v2);
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
    }
    else {
        combineVec2(faceCenter, 0.5, v1, 0.5, v2);
        const separation = dotVec2(cLocal, normals[vertIndex1]) - dotVec2(faceCenter, normals[vertIndex1]);
        if (separation > radius) {
            return;
        }
        manifold.pointCount = 1;
        manifold.type = ManifoldType.e_faceA;
        copyVec2(manifold.localNormal, normals[vertIndex1]);
        copyVec2(manifold.localPoint, faceCenter);
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, ContactFeatureType.e_vertex, 0, ContactFeatureType.e_vertex);
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
Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);
function EdgePolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
    CollideEdgePolygon(manifold, fA.getShape(), xfA, fB.getShape(), xfB);
}
// reused
const edge_reuse = new EdgeShape();
function ChainPolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
    const chain = fA.getShape();
    chain.getChildEdge(edge_reuse, indexA);
    CollideEdgePolygon(manifold, edge_reuse, xfA, fB.getShape(), xfB);
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
class EPAxis {
}
/**
 * This holds polygon B expressed in frame A.
 */
class TempPolygon {
    constructor() {
        this.vertices = []; // [Settings.maxPolygonVertices]
        this.normals = []; // [Settings.maxPolygonVertices];
        this.count = 0;
        for (let i = 0; i < SettingsInternal.maxPolygonVertices; i++) {
            this.vertices.push(vec2(0, 0));
            this.normals.push(vec2(0, 0));
        }
    }
}
/**
 * Reference face used for clipping
 */
class ReferenceFace {
    constructor() {
        this.v1 = vec2(0, 0);
        this.v2 = vec2(0, 0);
        this.normal = vec2(0, 0);
        this.sideNormal1 = vec2(0, 0);
        this.sideNormal2 = vec2(0, 0);
    }
    recycle() {
        zeroVec2(this.v1);
        zeroVec2(this.v2);
        zeroVec2(this.normal);
        zeroVec2(this.sideNormal1);
        zeroVec2(this.sideNormal2);
    }
}
// reused
const clipPoints1 = [new ClipVertex(), new ClipVertex()];
const clipPoints2 = [new ClipVertex(), new ClipVertex()];
const ie = [new ClipVertex(), new ClipVertex()];
const edgeAxis = new EPAxis();
const polygonAxis = new EPAxis();
const polygonBA = new TempPolygon();
const rf = new ReferenceFace();
const centroidB = vec2(0, 0);
const edge0 = vec2(0, 0);
const edge1 = vec2(0, 0);
const edge2 = vec2(0, 0);
const xf = transform(0, 0, 0);
const normal = vec2(0, 0);
const normal0 = vec2(0, 0);
const normal1 = vec2(0, 0);
const normal2 = vec2(0, 0);
const lowerLimit = vec2(0, 0);
const upperLimit = vec2(0, 0);
const perp = vec2(0, 0);
const n = vec2(0, 0);
/**
 * This function collides and edge and a polygon, taking into account edge
 * adjacency.
 */
const CollideEdgePolygon = function (manifold, edgeA, xfA, polygonB, xfB) {
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
    invTransformTransform(xf, xfA, xfB);
    transformVec2(centroidB, xf, polygonB.m_centroid);
    const v0 = edgeA.m_vertex0;
    const v1 = edgeA.m_vertex1;
    const v2 = edgeA.m_vertex2;
    const v3 = edgeA.m_vertex3;
    const hasVertex0 = edgeA.m_hasVertex0;
    const hasVertex3 = edgeA.m_hasVertex3;
    diffVec2(edge1, v2, v1);
    normalizeVec2(edge1);
    setVec2(normal1, edge1.y, -edge1.x);
    const offset1 = dotVec2(normal1, centroidB) - dotVec2(normal1, v1);
    let offset0 = 0.0;
    let offset2 = 0.0;
    let convex1 = false;
    let convex2 = false;
    zeroVec2(normal0);
    zeroVec2(normal2);
    // Is there a preceding edge?
    if (hasVertex0) {
        diffVec2(edge0, v1, v0);
        normalizeVec2(edge0);
        setVec2(normal0, edge0.y, -edge0.x);
        convex1 = crossVec2Vec2(edge0, edge1) >= 0.0;
        offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
    }
    // Is there a following edge?
    if (hasVertex3) {
        diffVec2(edge2, v3, v2);
        normalizeVec2(edge2);
        setVec2(normal2, edge2.y, -edge2.x);
        convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0.0;
        offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
    }
    let front;
    zeroVec2(normal);
    zeroVec2(lowerLimit);
    zeroVec2(upperLimit);
    // Determine front or back collision. Determine collision normal limits.
    if (hasVertex0 && hasVertex3) {
        if (convex1 && convex2) {
            front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                copyVec2(lowerLimit, normal0);
                copyVec2(upperLimit, normal2);
            }
            else {
                setMulVec2(normal, -1, normal1);
                setMulVec2(lowerLimit, -1, normal1);
                setMulVec2(upperLimit, -1, normal1);
            }
        }
        else if (convex1) {
            front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
            if (front) {
                copyVec2(normal, normal1);
                copyVec2(lowerLimit, normal0);
                copyVec2(upperLimit, normal1);
            }
            else {
                setMulVec2(normal, -1, normal1);
                setMulVec2(lowerLimit, -1, normal2);
                setMulVec2(upperLimit, -1, normal1);
            }
        }
        else if (convex2) {
            front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
            if (front) {
                copyVec2(normal, normal1);
                copyVec2(lowerLimit, normal1);
                copyVec2(upperLimit, normal2);
            }
            else {
                setMulVec2(normal, -1, normal1);
                setMulVec2(lowerLimit, -1, normal1);
                setMulVec2(upperLimit, -1, normal0);
            }
        }
        else {
            front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                copyVec2(lowerLimit, normal1);
                copyVec2(upperLimit, normal1);
            }
            else {
                setMulVec2(normal, -1, normal1);
                setMulVec2(lowerLimit, -1, normal2);
                setMulVec2(upperLimit, -1, normal0);
            }
        }
    }
    else if (hasVertex0) {
        if (convex1) {
            front = offset0 >= 0.0 || offset1 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                copyVec2(lowerLimit, normal0);
                setMulVec2(upperLimit, -1, normal1);
            }
            else {
                setMulVec2(normal, -1, normal1);
                copyVec2(lowerLimit, normal1);
                setMulVec2(upperLimit, -1, normal1);
            }
        }
        else {
            front = offset0 >= 0.0 && offset1 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                copyVec2(lowerLimit, normal1);
                setMulVec2(upperLimit, -1, normal1);
            }
            else {
                setMulVec2(normal, -1, normal1);
                copyVec2(lowerLimit, normal1);
                setMulVec2(upperLimit, -1, normal0);
            }
        }
    }
    else if (hasVertex3) {
        if (convex2) {
            front = offset1 >= 0.0 || offset2 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                setMulVec2(lowerLimit, -1, normal1);
                copyVec2(upperLimit, normal2);
            }
            else {
                setMulVec2(normal, -1, normal1);
                setMulVec2(lowerLimit, -1, normal1);
                copyVec2(upperLimit, normal1);
            }
        }
        else {
            front = offset1 >= 0.0 && offset2 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                setMulVec2(lowerLimit, -1, normal1);
                copyVec2(upperLimit, normal1);
            }
            else {
                setMulVec2(normal, -1, normal1);
                setMulVec2(lowerLimit, -1, normal2);
                copyVec2(upperLimit, normal1);
            }
        }
    }
    else {
        front = offset1 >= 0.0;
        if (front) {
            copyVec2(normal, normal1);
            setMulVec2(lowerLimit, -1, normal1);
            setMulVec2(upperLimit, -1, normal1);
        }
        else {
            setMulVec2(normal, -1, normal1);
            copyVec2(lowerLimit, normal1);
            copyVec2(upperLimit, normal1);
        }
    }
    // Get polygonB in frameA
    polygonBA.count = polygonB.m_count;
    for (let i = 0; i < polygonB.m_count; ++i) {
        transformVec2(polygonBA.vertices[i], xf, polygonB.m_vertices[i]);
        rotVec2(polygonBA.normals[i], xf.q, polygonB.m_normals[i]);
    }
    const radius = polygonB.m_radius + edgeA.m_radius;
    manifold.pointCount = 0;
    { // ComputeEdgeSeparation
        edgeAxis.type = EPAxisType.e_edgeA;
        edgeAxis.index = front ? 0 : 1;
        edgeAxis.separation = Infinity;
        for (let i = 0; i < polygonBA.count; ++i) {
            const v = polygonBA.vertices[i];
            const s = dotVec2(normal, v) - dotVec2(normal, v1);
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
        setVec2(perp, -normal.y, normal.x);
        for (let i = 0; i < polygonBA.count; ++i) {
            setMulVec2(n, -1, polygonBA.normals[i]);
            const s1 = dotVec2(n, polygonBA.vertices[i]) - dotVec2(n, v1);
            const s2 = dotVec2(n, polygonBA.vertices[i]) - dotVec2(n, v2);
            const s = Math.min(s1, s2);
            if (s > radius) {
                // No collision
                polygonAxis.type = EPAxisType.e_edgeB;
                polygonAxis.index = i;
                polygonAxis.separation = s;
                break;
            }
            // Adjacency
            if (dotVec2(n, perp) >= 0.0) {
                if (dotVec2(n, normal) - dotVec2(upperLimit, normal) < -SettingsInternal.angularSlop) {
                    continue;
                }
            }
            else {
                if (dotVec2(n, normal) - dotVec2(lowerLimit, normal) < -SettingsInternal.angularSlop) {
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
    const k_relativeTol = 0.98;
    const k_absoluteTol = 0.001;
    let primaryAxis;
    if (polygonAxis.type == EPAxisType.e_unknown) {
        primaryAxis = edgeAxis;
    }
    else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
        primaryAxis = polygonAxis;
    }
    else {
        primaryAxis = edgeAxis;
    }
    ie[0].recycle(), ie[1].recycle();
    if (primaryAxis.type == EPAxisType.e_edgeA) {
        manifold.type = ManifoldType.e_faceA;
        // Search for the polygon normal that is most anti-parallel to the edge
        // normal.
        let bestIndex = 0;
        let bestValue = dotVec2(normal, polygonBA.normals[0]);
        for (let i = 1; i < polygonBA.count; ++i) {
            const value = dotVec2(normal, polygonBA.normals[i]);
            if (value < bestValue) {
                bestValue = value;
                bestIndex = i;
            }
        }
        const i1 = bestIndex;
        const i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;
        copyVec2(ie[0].v, polygonBA.vertices[i1]);
        ie[0].id.setFeatures(0, ContactFeatureType.e_face, i1, ContactFeatureType.e_vertex);
        copyVec2(ie[1].v, polygonBA.vertices[i2]);
        ie[1].id.setFeatures(0, ContactFeatureType.e_face, i2, ContactFeatureType.e_vertex);
        if (front) {
            rf.i1 = 0;
            rf.i2 = 1;
            copyVec2(rf.v1, v1);
            copyVec2(rf.v2, v2);
            copyVec2(rf.normal, normal1);
        }
        else {
            rf.i1 = 1;
            rf.i2 = 0;
            copyVec2(rf.v1, v2);
            copyVec2(rf.v2, v1);
            setMulVec2(rf.normal, -1, normal1);
        }
    }
    else {
        manifold.type = ManifoldType.e_faceB;
        copyVec2(ie[0].v, v1);
        ie[0].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);
        copyVec2(ie[1].v, v2);
        ie[1].id.setFeatures(0, ContactFeatureType.e_vertex, primaryAxis.index, ContactFeatureType.e_face);
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
    // Clip incident edge against extruded edge1 side edges.
    clipPoints1[0].recycle(), clipPoints1[1].recycle();
    clipPoints2[0].recycle(), clipPoints2[1].recycle();
    // Clip to box side 1
    const np1 = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
    if (np1 < SettingsInternal.maxManifoldPoints) {
        return;
    }
    // Clip to negative box side 1
    const np2 = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
    if (np2 < SettingsInternal.maxManifoldPoints) {
        return;
    }
    // Now clipPoints2 contains the clipped points.
    if (primaryAxis.type == EPAxisType.e_edgeA) {
        copyVec2(manifold.localNormal, rf.normal);
        copyVec2(manifold.localPoint, rf.v1);
    }
    else {
        copyVec2(manifold.localNormal, polygonB.m_normals[rf.i1]);
        copyVec2(manifold.localPoint, polygonB.m_vertices[rf.i1]);
    }
    let pointCount = 0;
    for (let i = 0; i < SettingsInternal.maxManifoldPoints; ++i) {
        const separation = dotVec2(rf.normal, clipPoints2[i].v) - dotVec2(rf.normal, rf.v1);
        if (separation <= radius) {
            const cp = manifold.points[pointCount]; // ManifoldPoint
            if (primaryAxis.type == EPAxisType.e_edgeA) {
                invTransformVec2(cp.localPoint, xf, clipPoints2[i].v);
                cp.id.set(clipPoints2[i].id);
            }
            else {
                copyVec2(cp.localPoint, clipPoints2[i].v);
                cp.id.set(clipPoints2[i].id);
                cp.id.swapFeatures();
            }
            ++pointCount;
        }
    }
    manifold.pointCount = pointCount;
};

const Math$1 = math;
/** @deprecated Merged with main namespace */
const internal = {
    CollidePolygons,
    Settings: SettingsInternal,
    Sweep,
    Manifold,
    Distance,
    TimeOfImpact,
    DynamicTree,
    stats
};

var planck = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Math: Math$1,
  internal: internal,
  Serializer: Serializer,
  math: math,
  Vec2: Vec2,
  Vec3: Vec3,
  Mat22: Mat22,
  Mat33: Mat33,
  Transform: Transform,
  Rot: Rot,
  AABB: AABB,
  Shape: Shape,
  FixtureProxy: FixtureProxy,
  Fixture: Fixture,
  MassData: MassData,
  Body: Body,
  ContactEdge: ContactEdge,
  mixFriction: mixFriction,
  mixRestitution: mixRestitution,
  VelocityConstraintPoint: VelocityConstraintPoint,
  Contact: Contact,
  JointEdge: JointEdge,
  Joint: Joint,
  World: World,
  CircleShape: CircleShape,
  Circle: Circle,
  EdgeShape: EdgeShape,
  Edge: Edge,
  PolygonShape: PolygonShape,
  Polygon: Polygon,
  ChainShape: ChainShape,
  Chain: Chain,
  BoxShape: BoxShape,
  Box: Box,
  CollideCircles: CollideCircles,
  CollideEdgeCircle: CollideEdgeCircle,
  CollidePolygons: CollidePolygons,
  CollidePolygonCircle: CollidePolygonCircle,
  CollideEdgePolygon: CollideEdgePolygon,
  DistanceJoint: DistanceJoint,
  FrictionJoint: FrictionJoint,
  GearJoint: GearJoint,
  MotorJoint: MotorJoint,
  MouseJoint: MouseJoint,
  PrismaticJoint: PrismaticJoint,
  PulleyJoint: PulleyJoint,
  RevoluteJoint: RevoluteJoint,
  RopeJoint: RopeJoint,
  WeldJoint: WeldJoint,
  WheelJoint: WheelJoint,
  Settings: Settings,
  SettingsInternal: SettingsInternal,
  Sweep: Sweep,
  get ManifoldType () { return ManifoldType; },
  get ContactFeatureType () { return ContactFeatureType; },
  get PointState () { return PointState; },
  ClipVertex: ClipVertex,
  Manifold: Manifold,
  ManifoldPoint: ManifoldPoint,
  ContactID: ContactID,
  WorldManifold: WorldManifold,
  getPointStates: getPointStates,
  clipSegmentToLine: clipSegmentToLine,
  DistanceInput: DistanceInput,
  DistanceOutput: DistanceOutput,
  SimplexCache: SimplexCache,
  Distance: Distance,
  DistanceProxy: DistanceProxy,
  testOverlap: testOverlap,
  ShapeCastInput: ShapeCastInput,
  ShapeCastOutput: ShapeCastOutput,
  ShapeCast: ShapeCast,
  TOIInput: TOIInput,
  get TOIOutputState () { return TOIOutputState; },
  TOIOutput: TOIOutput,
  TimeOfImpact: TimeOfImpact,
  TreeNode: TreeNode,
  DynamicTree: DynamicTree,
  stats: stats
});

export { AABB, Body, Box, BoxShape, Chain, ChainShape, Circle, CircleShape, ClipVertex, CollideCircles, CollideEdgeCircle, CollideEdgePolygon, CollidePolygonCircle, CollidePolygons, Contact, ContactEdge, ContactFeatureType, ContactID, Distance, DistanceInput, DistanceJoint, DistanceOutput, DistanceProxy, DynamicTree, Edge, EdgeShape, Fixture, FixtureProxy, FrictionJoint, GearJoint, Joint, JointEdge, Manifold, ManifoldPoint, ManifoldType, MassData, Mat22, Mat33, Math$1 as Math, MotorJoint, MouseJoint, PointState, Polygon, PolygonShape, PrismaticJoint, PulleyJoint, RevoluteJoint, RopeJoint, Rot, Serializer, Settings, SettingsInternal, Shape, ShapeCast, ShapeCastInput, ShapeCastOutput, SimplexCache, Sweep, TOIInput, TOIOutput, TOIOutputState, TimeOfImpact, Transform, TreeNode, Vec2, Vec3, VelocityConstraintPoint, WeldJoint, WheelJoint, World, WorldManifold, clipSegmentToLine, planck as default, getPointStates, internal, math, mixFriction, mixRestitution, stats, testOverlap };
//# sourceMappingURL=planck.js.map
