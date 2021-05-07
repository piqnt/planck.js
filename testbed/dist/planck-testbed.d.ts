declare function Serializer(opts?: any): void;
declare namespace Serializer {
    var toJson: any;
    var fromJson: any;
}
declare const math: Math & {
    readonly EPSILON: number;
    /**
     * This function is used to ensure that a floating point number is not a NaN or
     * infinity.
     */
    isFinite(x: any): boolean;
    assert(x: any): void;
    /**
     * This is a approximate yet fast inverse square-root (todo).
     */
    invSqrt(x: number): number;
    /**
     * Next Largest Power of 2 Given a binary integer value x, the next largest
     * power of 2 can be computed by a SWAR algorithm that recursively "folds" the
     * upper bits into the lower bits. This process yields a bit vector with the
     * same most significant 1 as x, but all 1's below it. Adding 1 to that value
     * yields the next largest power of 2. For a 32-bit value:
     */
    nextPowerOfTwo(x: number): number;
    isPowerOfTwo(x: number): boolean;
    mod(num: number, min?: number, max?: number): number;
    /**
     * Returns a min if num is less than min, and max if more than max, otherwise returns num.
     */
    clamp(num: number, min: number, max: number): number;
    /**
     * Returns a random number between min and max when two arguments are provided.
     * If one arg is provided between 0 to max.
     * If one arg is passed between 0 to 1.
     */
    random(min?: number, max?: number): number;
};
declare function Vec2(x: number, y: number): Vec2;
declare function Vec2(obj: {
    x: number;
    y: number;
}): Vec2;
declare function Vec2(): Vec2;
declare class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    constructor(obj: {
        x: number;
        y: number;
    });
    constructor();
    static zero(): Vec2;
    static clone(v: Vec2): Vec2;
    toString(): string;
    /**
     * Does this vector contain finite coordinates?
     */
    static isValid(v: any): boolean;
    static assert(o: any): void;
    clone(): Vec2;
    /**
     * Set this vector to all zeros.
     *
     * @returns this
     */
    setZero(): Vec2;
    set(x: number, y: number): Vec2;
    set(value: Vec2): Vec2;
    /**
     * @deprecated Use setCombine or setMul
     */
    wSet(a: any, v: any, b: any, w: any): Vec2;
    /**
     * Set linear combination of v and w: `a * v + b * w`
     */
    setCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
    setMul(a: number, v: Vec2): Vec2;
    /**
     * Add a vector to this vector.
     *
     * @returns this
     */
    add(w: Vec2): Vec2;
    /**
     * @deprecated Use addCombine or addMul
     */
    wAdd(a: any, v: any, b: any, w: any): Vec2;
    /**
     * Add linear combination of v and w: `a * v + b * w`
     */
    addCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
    addMul(a: number, v: Vec2): Vec2;
    /**
     * @deprecated Use subCombine or subMul
     */
    wSub(a: any, v: any, b: any, w: any): Vec2;
    /**
     * Subtract linear combination of v and w: `a * v + b * w`
     */
    subCombine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
    subMul(a: number, v: Vec2): Vec2;
    /**
     * Subtract a vector from this vector
     *
     * @returns this
     */
    sub(w: Vec2): Vec2;
    /**
     * Multiply this vector by a scalar.
     *
     * @returns this
     */
    mul(m: number): Vec2;
    /**
     * Get the length of this vector (the norm).
     *
     * For performance, use this instead of lengthSquared (if possible).
     */
    length(): number;
    /**
     * Get the length squared.
     */
    lengthSquared(): number;
    /**
     * Convert this vector into a unit vector.
     *
     * @returns old length
     */
    normalize(): number;
    /**
     * Get the length of this vector (the norm).
     *
     * For performance, use this instead of lengthSquared (if possible).
     */
    static lengthOf(v: Vec2): number;
    /**
     * Get the length squared.
     */
    static lengthSquared(v: Vec2): number;
    static distance(v: Vec2, w: Vec2): number;
    static distanceSquared(v: Vec2, w: Vec2): number;
    static areEqual(v: Vec2, w: Vec2): boolean;
    /**
     * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
     */
    static skew(v: Vec2): Vec2;
    /**
     * Perform the dot product on two vectors.
     */
    static dot(v: Vec2, w: Vec2): number;
    static cross(v: Vec2, w: Vec2): number;
    static cross(v: Vec2, w: number): Vec2;
    static cross(v: number, w: Vec2): Vec2;
    static addCross(a: Vec2, v: Vec2, w: number): Vec2;
    static addCross(a: Vec2, v: number, w: Vec2): Vec2;
    static add(v: Vec2, w: Vec2): Vec2;
    /**
     * @deprecated Use combine
     */
    static wAdd(a: any, v: any, b: any, w: any): Vec2;
    static combine(a: number, v: Vec2, b: number, w: Vec2): Vec2;
    static sub(v: Vec2, w: Vec2): Vec2;
    static mul(a: Vec2, b: number): Vec2;
    static mul(a: number, b: Vec2): Vec2;
    neg(): Vec2;
    static neg(v: Vec2): Vec2;
    static abs(v: Vec2): Vec2;
    static mid(v: Vec2, w: Vec2): Vec2;
    static upper(v: Vec2, w: Vec2): Vec2;
    static lower(v: Vec2, w: Vec2): Vec2;
    clamp(max: number): Vec2;
    static clamp(v: Vec2, max: number): Vec2;
    /**
     * @deprecated
     */
    static scaleFn(x: any, y: any): (v: any) => Vec2;
    /**
     * @deprecated
     */
    static translateFn(x: any, y: any): (v: any) => Vec2;
}
declare function Vec3(x: number, y: number, z: number): Vec3;
declare function Vec3(obj: {
    x: number;
    y: number;
    z: number;
}): Vec3;
declare function Vec3(): Vec3;
declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    constructor(obj: {
        x: number;
        y: number;
        z: number;
    });
    constructor();
    static zero(): Vec3;
    static clone(v: Vec3): Vec3;
    toString(): string;
    /**
     * Does this vector contain finite coordinates?
     */
    static isValid(v: any): boolean;
    static assert(o: any): void;
    setZero(): Vec3;
    set(x: number, y: number, z: number): Vec3;
    add(w: Vec3): Vec3;
    sub(w: Vec3): Vec3;
    mul(m: number): Vec3;
    static areEqual(v: Vec3, w: Vec3): boolean;
    /**
     * Perform the dot product on two vectors.
     */
    static dot(v: Vec3, w: Vec3): number;
    /**
     * Perform the cross product on two vectors. In 2D this produces a scalar.
     */
    static cross(v: Vec3, w: Vec3): Vec3;
    static add(v: Vec3, w: Vec3): Vec3;
    static sub(v: Vec3, w: Vec3): Vec3;
    static mul(v: Vec3, m: number): Vec3;
    neg(): Vec3;
    static neg(v: Vec3): Vec3;
}
/**
 * A 2-by-2 matrix. Stored in column-major order.
 */
declare class Mat22 {
    ex: Vec2;
    ey: Vec2;
    constructor(a: number, b: number, c: number, d: number);
    constructor(a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    });
    constructor();
    toString(): string;
    static isValid(o: any): boolean;
    static assert(o: any): void;
    set(a: Mat22): void;
    set(a: Vec2, b: Vec2): void;
    set(a: number, b: number, c: number, d: number): void;
    setIdentity(): void;
    setZero(): void;
    getInverse(): Mat22;
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient than
     * computing the inverse in one-shot cases.
     */
    solve(v: Vec2): Vec2;
    /**
     * Multiply a matrix times a vector. If a rotation matrix is provided, then this
     * transforms the vector from one frame to another.
     */
    static mul(mx: Mat22, my: Mat22): Mat22;
    static mul(mx: Mat22, v: Vec2): Vec2;
    static mulVec2(mx: any, v: any): Vec2;
    static mulMat22(mx: any, v: any): Mat22;
    /**
     * Multiply a matrix transpose times a vector. If a rotation matrix is provided,
     * then this transforms the vector from one frame to another (inverse
     * transform).
     */
    static mulT(mx: Mat22, my: Mat22): Mat22;
    static mulT(mx: Mat22, v: Vec2): Vec2;
    static mulTVec2(mx: Mat22, v: Vec2): Vec2;
    static mulTMat22(mx: Mat22, v: Mat22): Mat22;
    static abs(mx: Mat22): Mat22;
    static add(mx1: Mat22, mx2: Mat22): Mat22;
}
/**
 * A 3-by-3 matrix. Stored in column-major order.
 */
declare class Mat33 {
    ex: Vec3;
    ey: Vec3;
    ez: Vec3;
    constructor(a: Vec3, b: Vec3, c: Vec3);
    constructor();
    toString(): string;
    static isValid(o: any): boolean;
    static assert(o: any): void;
    /**
     * Set this matrix to all zeros.
     */
    setZero(): Mat33;
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient than
     * computing the inverse in one-shot cases.
     */
    solve33(v: Vec3): Vec3;
    /**
     * Solve A * x = b, where b is a column vector. This is more efficient than
     * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
     * equation.
     */
    solve22(v: Vec2): Vec2;
    /**
     * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
     * singular.
     */
    getInverse22(M: Mat33): void;
    /**
     * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
     * if singular.
     */
    getSymInverse33(M: Mat33): void;
    /**
     * Multiply a matrix times a vector.
     */
    static mul(a: Mat33, b: Vec2): Vec2;
    static mul(a: Mat33, b: Vec3): Vec3;
    static mulVec3(a: Mat33, b: Vec3): Vec3;
    static mulVec2(a: Mat33, b: Vec2): Vec2;
    static add(a: Mat33, b: Mat33): Mat33;
}
declare function Rot(angle?: number | Rot): Rot;
declare class Rot {
    s: number;
    c: number;
    /** Initialize from an angle in radians. */
    constructor(angle?: number | Rot);
    static clone(rot: Rot): Rot;
    static identity(): Rot;
    static isValid(o: any): boolean;
    static assert(o: any): void;
    /** Set to the identity rotation. */
    setIdentity(): void;
    set(angle: number | Rot): void;
    /** Set using an angle in radians. */
    setAngle(angle: number): void;
    /** Get the angle in radians. */
    getAngle(): number;
    /** Get the x-axis. */
    getXAxis(): Vec2;
    /** Get the u-axis. */
    getYAxis(): Vec2;
    /** Multiply two rotations: q * r */
    static mul(rot: Rot, m: Rot): Rot;
    /** Rotate a vector */
    static mul(rot: Rot, m: Vec2): Vec2;
    static mulRot(rot: Rot, m: Rot): Rot;
    static mulVec2(rot: Rot, m: Vec2): Vec2;
    static mulSub(rot: Rot, v: Vec2, w: Vec2): Vec2;
    /** Transpose multiply two rotations: qT * r */
    static mulT(rot: Rot, m: Rot): Rot;
    /** Inverse rotate a vector */
    static mulT(rot: Rot, m: Vec2): Vec2;
    static mulTRot(rot: Rot, m: Rot): Rot;
    static mulTVec2(rot: Rot, m: Vec2): Vec2;
}
declare function Transform(position?: Vec2, rotation?: number): Transform;
/**
 * A transform contains translation and rotation. It is used to represent the
 * position and orientation of rigid frames. Initialize using a position vector
 * and a rotation.
 */
declare class Transform {
    /** position */
    p: Vec2;
    /** rotation */
    q: Rot;
    constructor(position?: Vec2, rotation?: number);
    static clone(xf: Transform): Transform;
    static identity(): Transform;
    /**
     * Set this to the identity transform.
     */
    setIdentity(): void;
    set(position: Vec2, rotation: number): void;
    set(xf: Transform): void;
    static isValid(o: any): boolean;
    static assert(o: any): void;
    static mul(a: Transform, b: Vec2): Vec2;
    static mul(a: Transform, b: Transform): Transform;
    static mulAll(a: Transform, b: Vec2[]): Vec2[];
    static mulAll(a: Transform, b: Transform[]): Transform[];
    /** @deprecated */
    static mulFn(a: any): (b: any) => Vec2;
    static mulVec2(a: Transform, b: Vec2): Vec2;
    static mulXf(a: Transform, b: Transform): Transform;
    static mulT(a: Transform, b: Vec2): Vec2;
    static mulT(a: Transform, b: Transform): Transform;
    static mulTVec2(a: Transform, b: Vec2): Vec2;
    static mulTXf(a: Transform, b: Transform): Transform;
}
/**
 * Ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
 */
interface RayCastInput {
    p1: Vec2;
    p2: Vec2;
    maxFraction: number;
}
/**
 * Ray-cast output data. The ray hits at `p1 + fraction * (p2 - p1)`,
 * where `p1` and `p2` come from RayCastInput.
 */
interface RayCastOutput {
    normal: Vec2;
    fraction: number;
}
declare function AABB(lower?: Vec2, upper?: Vec2): AABB;
declare class AABB {
    lowerBound: Vec2;
    upperBound: Vec2;
    constructor(lower?: Vec2, upper?: Vec2);
    /**
     * Verify that the bounds are sorted.
     */
    isValid(): boolean;
    static isValid(aabb: any): boolean;
    static assert(o: any): void;
    /**
     * Get the center of the AABB.
     */
    getCenter(): Vec2;
    /**
     * Get the extents of the AABB (half-widths).
     */
    getExtents(): Vec2;
    /**
     * Get the perimeter length.
     */
    getPerimeter(): number;
    /**
     * Combine one or two AABB into this one.
     */
    combine(a: AABB, b: AABB): void;
    combinePoints(a: Vec2, b: Vec2): void;
    set(aabb: AABB): void;
    contains(aabb: AABB): boolean;
    extend(value: number): AABB;
    static extend(aabb: AABB, value: number): void;
    static testOverlap(a: AABB, b: AABB): boolean;
    static areEqual(a: AABB, b: AABB): boolean;
    static diff(a: AABB, b: AABB): number;
    rayCast(output: RayCastOutput, input: RayCastInput): boolean;
    toString(): string;
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
declare class Pool<T> {
    _list: any[];
    _max: number;
    _createFn: () => T;
    _outFn: (T: any) => void;
    _inFn: (T: any) => void;
    _discardFn: (T: any) => T;
    _createCount: number;
    _outCount: number;
    _inCount: number;
    _discardCount: number;
    constructor(opts: any);
    max(n: any): number | this;
    size(): number;
    allocate(): T;
    release(item: T): void;
    toString(): string;
}
/**
 * A node in the dynamic tree. The client does not interact with this directly.
 */
declare class TreeNode<T> {
    id: number;
    /** Enlarged AABB */
    aabb: AABB;
    userData: T;
    parent: TreeNode<T>;
    child1: TreeNode<T>;
    child2: TreeNode<T>;
    /** 0: leaf, -1: free node */
    height: number;
    constructor(id?: any);
    toString(): string;
    isLeaf(): boolean;
}
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
declare class DynamicTree<T> {
    m_root: TreeNode<T>;
    m_lastProxyId: number;
    m_nodes: {
        [id: number]: TreeNode<T>;
    };
    m_pool: Pool<TreeNode<T>>;
    constructor();
    /**
     * Get proxy user data.
     *
     * @return the proxy user data or 0 if the id is invalid.
     */
    getUserData(id: number): T;
    /**
     * Get the fat AABB for a node id.
     *
     * @return the proxy user data or 0 if the id is invalid.
     */
    getFatAABB(id: number): AABB;
    allocateNode(): TreeNode<T>;
    freeNode(node: TreeNode<T>): void;
    /**
     * Create a proxy in the tree as a leaf node. We return the index of the node
     * instead of a pointer so that we can grow the node pool.
     *
     * Create a proxy. Provide a tight fitting AABB and a userData pointer.
     */
    createProxy(aabb: AABB, userData: T): number;
    /**
     * Destroy a proxy. This asserts if the id is invalid.
     */
    destroyProxy(id: number): void;
    /**
     * Move a proxy with a swepted AABB. If the proxy has moved outside of its
     * fattened AABB, then the proxy is removed from the tree and re-inserted.
     * Otherwise the function returns immediately.
     *
     * @param d Displacement
     *
     * @return true if the proxy was re-inserted.
     */
    moveProxy(id: number, aabb: AABB, d: Vec2): boolean;
    insertLeaf(leaf: TreeNode<T>): void;
    removeLeaf(leaf: TreeNode<T>): void;
    /**
     * Perform a left or right rotation if node A is imbalanced. Returns the new
     * root index.
     */
    balance(iA: TreeNode<T>): TreeNode<T>;
    /**
     * Compute the height of the binary tree in O(N) time. Should not be called
     * often.
     */
    getHeight(): number;
    /**
     * Get the ratio of the sum of the node areas to the root area.
     */
    getAreaRatio(): number;
    /**
     * Compute the height of a sub-tree.
     */
    computeHeight(id?: number): number;
    validateStructure(node: TreeNode<T>): void;
    validateMetrics(node: TreeNode<T>): void;
    /**
     * Validate this tree. For testing.
     */
    validate(): void;
    /**
     * Get the maximum balance of an node in the tree. The balance is the difference
     * in height of the two children of a node.
     */
    getMaxBalance(): number;
    /**
     * Build an optimal tree. Very expensive. For testing.
     */
    rebuildBottomUp(): void;
    /**
     * Shift the world origin. Useful for large worlds. The shift formula is:
     * position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    shiftOrigin(newOrigin: Vec2): void;
    /**
     * Query an AABB for overlapping proxies. The callback class is called for each
     * proxy that overlaps the supplied AABB.
     */
    query(aabb: AABB, queryCallback: (nodeId: number) => boolean): void;
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
    rayCast(input: RayCastInput, rayCastCallback: (subInput: RayCastInput, id: number) => number): void;
    private inputPool;
    private stackPool;
    private iteratorPool;
}
/**
 * The broad-phase wraps and extends a dynamic-tree to keep track of moved
 * objects and query them on update.
 */
declare class BroadPhase {
    m_tree: DynamicTree<FixtureProxy>;
    m_proxyCount: number;
    m_moveBuffer: any[];
    m_callback: (userDataA: any, userDataB: any) => void;
    m_queryProxyId: number;
    /**
     * Get user data from a proxy. Returns null if the id is invalid.
     */
    getUserData(proxyId: any): FixtureProxy;
    /**
     * Test overlap of fat AABBs.
     */
    testOverlap(proxyIdA: any, proxyIdB: any): boolean;
    /**
     * Get the fat AABB for a proxy.
     */
    getFatAABB(proxyId: any): AABB;
    /**
     * Get the number of proxies.
     */
    getProxyCount(): number;
    /**
     * Get the height of the embedded tree.
     */
    getTreeHeight(): number;
    /**
     * Get the balance (integer) of the embedded tree.
     */
    getTreeBalance(): number;
    /**
     * Get the quality metric of the embedded tree.
     */
    getTreeQuality(): number;
    /**
     * Query an AABB for overlapping proxies. The callback class is called for each
     * proxy that overlaps the supplied AABB.
     */
    query: (aabb: any, queryCallback: any) => void;
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
    rayCast(input: any, rayCastCallback: any): void;
    /**
     * Shift the world origin. Useful for large worlds. The shift formula is:
     * position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    shiftOrigin(newOrigin: Vec2): void;
    /**
     * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
     * is called.
     */
    createProxy(aabb: AABB, userData: FixtureProxy): number;
    /**
     * Destroy a proxy. It is up to the client to remove any pairs.
     */
    destroyProxy(proxyId: number): void;
    /**
     * Call moveProxy as many times as you like, then when you are done call
     * UpdatePairs to finalized the proxy pairs (for your time step).
     */
    moveProxy(proxyId: number, aabb: AABB, displacement: Vec2): void;
    /**
     * Call to trigger a re-processing of it's pairs on the next call to
     * UpdatePairs.
     */
    touchProxy(proxyId: number): void;
    bufferMove(proxyId: number): void;
    unbufferMove(proxyId: number): void;
    /**
     * Update the pairs. This results in pair callbacks. This can only add pairs.
     */
    updatePairs(addPairCallback: (userDataA: FixtureProxy, userDataB: FixtureProxy) => void): void;
    queryCallback: (proxyId: number) => boolean;
}
/**
 * A fixture definition is used to create a fixture. This class defines an
 * abstract fixture definition. You can reuse fixture definitions safely.
 */
interface FixtureOpt {
    userData?: unknown;
    /**
     * The friction coefficient, usually in the range [0,1]
     */
    friction?: number;
    /**
     * The restitution (elasticity) usually in the range [0,1]
     */
    restitution?: number;
    /**
     * The density, usually in kg/m^2
     */
    density?: number;
    /**
     * A sensor shape collects contact information but never generates a collision response.
     */
    isSensor?: boolean;
    /**
     * Zero, positive or negative collision group.
     * Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.
     */
    filterGroupIndex?: number;
    /**
     * Collision category bit or bits that this fixture belongs to.
     * If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.
     */
    filterCategoryBits?: number;
    /**
     * Collision category bit or bits that this fixture accept for collision.
     */
    filterMaskBits?: number;
}
interface FixtureDef extends FixtureOpt {
    shape: Shape;
}
/**
 * This proxy is used internally to connect shape children to the broad-phase.
 */
declare class FixtureProxy {
    aabb: AABB;
    fixture: Fixture;
    childIndex: number;
    proxyId: number;
    constructor(fixture: any, childIndex: any);
}
/**
 * A fixture is used to attach a shape to a body for collision detection. A
 * fixture inherits its transform from its parent. Fixtures hold additional
 * non-geometric data such as friction, collision filters, etc. Fixtures are
 * created via Body.createFixture.
 */
declare class Fixture {
    constructor(body: Body, def: FixtureDef);
    constructor(body: Body, shape: Shape, def?: FixtureOpt);
    constructor(body: Body, shape: Shape, density?: number);
    /**
     * Re-setup fixture.
     * @private
     */
    _reset(): void;
    /**
     * Get the type of the child shape. You can use this to down cast to the
     * concrete shape.
     */
    getType(): ShapeType;
    /**
     * Get the child shape. You can modify the child shape, however you should not
     * change the number of vertices because this will crash some collision caching
     * mechanisms. Manipulating the shape may lead to non-physical behavior.
     */
    getShape(): Shape;
    /**
     * A sensor shape collects contact information but never generates a collision
     * response.
     */
    isSensor(): boolean;
    /**
     * Set if this fixture is a sensor.
     */
    setSensor(sensor: boolean): void;
    /**
     * Get the contact filtering data.
     */
    // getFilterData() {
    //   return this.m_filter;
    // }
    /**
     * Get the user data that was assigned in the fixture definition. Use this to
     * store your application specific data.
     */
    getUserData(): unknown;
    /**
     * Set the user data. Use this to store your application specific data.
     */
    setUserData(data: unknown): void;
    /**
     * Get the parent body of this fixture. This is null if the fixture is not
     * attached.
     */
    getBody(): Body;
    /**
     * Get the next fixture in the parent body's fixture list.
     */
    getNext(): Fixture | null;
    /**
     * Get the density of this fixture.
     */
    getDensity(): number;
    /**
     * Set the density of this fixture. This will _not_ automatically adjust the
     * mass of the body. You must call Body.resetMassData to update the body's mass.
     */
    setDensity(density: number): void;
    /**
     * Get the coefficient of friction, usually in the range [0,1].
     */
    getFriction(): number;
    /**
     * Set the coefficient of friction. This will not change the friction of
     * existing contacts.
     */
    setFriction(friction: number): void;
    /**
     * Get the coefficient of restitution.
     */
    getRestitution(): number;
    /**
     * Set the coefficient of restitution. This will not change the restitution of
     * existing contacts.
     */
    setRestitution(restitution: number): void;
    /**
     * Test a point in world coordinates for containment in this fixture.
     */
    testPoint(p: Vec2): boolean;
    /**
     * Cast a ray against this shape.
     */
    rayCast(output: RayCastOutput, input: RayCastInput, childIndex: number): boolean;
    /**
     * Get the mass data for this fixture. The mass data is based on the density and
     * the shape. The rotational inertia is about the shape's origin. This operation
     * may be expensive.
     */
    getMassData(massData: MassData): void;
    /**
     * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
     * more accurate AABB, compute it using the shape and the body transform.
     */
    getAABB(childIndex: number): AABB;
    /**
     * These support body activation/deactivation.
     */
    createProxies(broadPhase: BroadPhase, xf: Transform): void;
    destroyProxies(broadPhase: BroadPhase): void;
    /**
     * Updates this fixture proxy in broad-phase (with combined AABB of current and
     * next transformation).
     */
    synchronize(broadPhase: BroadPhase, xf1: Transform, xf2: Transform): void;
    /**
     * Set the contact filtering data. This will not update contacts until the next
     * time step when either parent body is active and awake. This automatically
     * calls refilter.
     */
    setFilterData(filter: {
        groupIndex: number;
        categoryBits: number;
        maskBits: number;
    }): void;
    getFilterGroupIndex(): number;
    setFilterGroupIndex(groupIndex: number): number;
    getFilterCategoryBits(): number;
    setFilterCategoryBits(categoryBits: number): void;
    getFilterMaskBits(): number;
    setFilterMaskBits(maskBits: number): void;
    /**
     * Call this if you want to establish collision that was previously disabled by
     * ContactFilter.
     */
    refilter(): void;
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
    shouldCollide(that: Fixture): boolean;
}
/**
 * A joint edge is used to connect bodies and joints together in a joint graph
 * where each body is a node and each joint is an edge. A joint edge belongs to
 * a doubly linked list maintained in each attached body. Each joint has two
 * joint nodes, one for each attached body.
 */
declare class JointEdge {
    /**
     * provides quick access to the other body attached.
     */
    other: Body;
    /**
     * the joint
     */
    joint: Joint;
    /**
     * prev the previous joint edge in the body's joint list
     */
    prev: JointEdge;
    /**
     * the next joint edge in the body's joint list
     */
    next: JointEdge;
}
/**
 * Joint definitions are used to construct joints.
 */
interface JointOpt {
    /**
     * Use this to attach application specific data to your joints.
     */
    userData?: any;
    /**
     * Set this flag to true if the attached bodies
     * should collide.
     */
    collideConnected?: boolean;
}
/**
 * Joint definitions are used to construct joints.
 */
interface JointDef extends JointOpt {
    /**
     * The first attached body.
     */
    bodyA: Body;
    /**
     * The second attached body.
     */
    bodyB: Body;
}
/**
 * The base joint class. Joints are used to constraint two bodies together in
 * various fashions. Some joints also feature limits and motors.
 */
declare abstract class Joint {
    constructor(def: JointDef);
    constructor(def: JointOpt, bodyA: Body, bodyB: Body);
    static TYPES: {
        [id: string]: new (...args: any[]) => Joint;
    };
    /**
     * Short-cut function to determine if either body is inactive.
     */
    isActive(): boolean;
    /**
     * Get the type of the concrete joint.
     */
    getType(): string;
    /**
     * Get the first body attached to this joint.
     */
    getBodyA(): Body;
    /**
     * Get the second body attached to this joint.
     */
    getBodyB(): Body;
    /**
     * Get the next joint the world joint list.
     */
    getNext(): Joint;
    getUserData(): unknown;
    setUserData(data: unknown): void;
    /**
     * Get collide connected. Note: modifying the collide connect flag won't work
     * correctly because the flag is only checked when fixture AABBs begin to
     * overlap.
     */
    getCollideConnected(): boolean;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    abstract getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    abstract getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    abstract getReactionForce(inv_dt: number): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    abstract getReactionTorque(inv_dt: number): number;
    /**
     * Shift the origin for any points stored in world coordinates.
     */
    shiftOrigin(newOrigin: Vec2): void;
    abstract initVelocityConstraints(step: any): void;
    abstract solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    abstract solvePositionConstraints(step: any): boolean;
}
declare enum ManifoldType {
    e_circles = 0,
    e_faceA = 1,
    e_faceB = 2
}
declare enum ContactFeatureType {
    e_vertex = 0,
    e_face = 1
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
declare class Manifold {
    type: ManifoldType;
    localNormal: Vec2;
    localPoint: Vec2;
    points: ManifoldPoint[];
    pointCount: number;
    /**
     * Evaluate the manifold with supplied transforms. This assumes modest motion
     * from the original state. This does not change the point count, impulses, etc.
     * The radii must come from the shapes that generated the manifold.
     */
    getWorldManifold(wm: WorldManifold | undefined, xfA: Transform, radiusA: number, xfB: Transform, radiusB: number): WorldManifold;
}
/**
 * A manifold point is a contact point belonging to a contact manifold. It holds
 * details related to the geometry and dynamics of the contact points.
 *
 * This structure is stored across time steps, so we keep it small.
 *
 * Note: impulses are used for internal caching and may not provide reliable
 * contact forces, especially for high speed collisions.
 */
declare class ManifoldPoint {
    /**
     * Usage depends on manifold type.
     *       e_circles: the local center of circleB,
     *       e_faceA: the local center of cirlceB or the clip point of polygonB,
     *       e_faceB: the clip point of polygonA.
     */
    localPoint: Vec2;
    /**
     * The non-penetration impulse
     */
    normalImpulse: number;
    /**
     * The friction impulse
     */
    tangentImpulse: number;
    /**
     * Uniquely identifies a contact point between two shapes to facilatate warm starting
     */
    id: ContactID;
}
/**
 * Contact ids to facilitate warm starting.
 */
declare class ContactID {
    cf: ContactFeature;
    /**
     * Used to quickly compare contact ids.
     */
    get key(): number;
    set(o: any): void;
}
/**
 * The features that intersect to form the contact point.
 */
declare class ContactFeature {
    /**
     * Feature index on shapeA
     */
    indexA: number;
    /**
     * Feature index on shapeB
     */
    indexB: number;
    /**
     * The feature type on shapeA
     */
    typeA: ContactFeatureType;
    /**
     * The feature type on shapeB
     */
    typeB: ContactFeatureType;
    set(o: ContactFeature): void;
}
/**
 * This is used to compute the current state of a contact manifold.
 */
declare class WorldManifold {
    /**
     * World vector pointing from A to B
     */
    normal: Vec2;
    /**
     * World contact point (point of intersection)
     */
    points: Vec2[]; // [maxManifoldPoints]
    /**
     * A negative value indicates overlap, in meters
     */
    separations: number[]; // [maxManifoldPoints]
}
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
declare class ContactEdge {
    contact: Contact;
    prev: ContactEdge | undefined;
    next: ContactEdge | undefined;
    other: Body | undefined;
    constructor(contact: any);
}
type EvaluateFunction = (manifold: Manifold, xfA: Transform, fixtureA: Fixture, indexA: number, xfB: Transform, fixtureB: Fixture, indexB: number) => void;
/**
 * The class manages contact between two shapes. A contact exists for each
 * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
 * object may exist that has no contact points.
 */
declare class Contact {
    constructor(fA: Fixture, indexA: number, fB: Fixture, indexB: number, evaluateFcn: EvaluateFunction);
    initConstraint(step: TimeStep): void;
    /**
     * Get the contact manifold. Do not modify the manifold unless you understand
     * the internals of the library.
     */
    getManifold(): Manifold;
    /**
     * Get the world manifold.
     */
    getWorldManifold(worldManifold: WorldManifold | null | undefined): WorldManifold | undefined;
    /**
     * Enable/disable this contact. This can be used inside the pre-solve contact
     * listener. The contact is only disabled for the current time step (or sub-step
     * in continuous collisions).
     */
    setEnabled(flag: boolean): void;
    /**
     * Has this contact been disabled?
     */
    isEnabled(): boolean;
    /**
     * Is this contact touching?
     */
    isTouching(): boolean;
    /**
     * Get the next contact in the world's contact list.
     */
    getNext(): Contact | null;
    /**
     * Get fixture A in this contact.
     */
    getFixtureA(): Fixture;
    /**
     * Get fixture B in this contact.
     */
    getFixtureB(): Fixture;
    /**
     * Get the child primitive index for fixture A.
     */
    getChildIndexA(): number;
    /**
     * Get the child primitive index for fixture B.
     */
    getChildIndexB(): number;
    /**
     * Flag this contact for filtering. Filtering will occur the next time step.
     */
    flagForFiltering(): void;
    /**
     * Override the default friction mixture. You can call this in
     * ContactListener.preSolve. This value persists until set or reset.
     */
    setFriction(friction: number): void;
    /**
     * Get the friction.
     */
    getFriction(): number;
    /**
     * Reset the friction mixture to the default value.
     */
    resetFriction(): void;
    /**
     * Override the default restitution mixture. You can call this in
     * ContactListener.preSolve. The value persists until you set or reset.
     */
    setRestitution(restitution: number): void;
    /**
     * Get the restitution.
     */
    getRestitution(): number;
    /**
     * Reset the restitution to the default value.
     */
    resetRestitution(): void;
    /**
     * Set the desired tangent speed for a conveyor belt behavior. In meters per
     * second.
     */
    setTangentSpeed(speed: number): void;
    /**
     * Get the desired tangent speed. In meters per second.
     */
    getTangentSpeed(): number;
    /**
     * Called by Update method, and implemented by subclasses.
     */
    evaluate(manifold: Manifold, xfA: Transform, xfB: Transform): void;
    /**
     * Updates the contact manifold and touching status.
     *
     * Note: do not assume the fixture AABBs are overlapping or are valid.
     *
     * @param listener.beginContact
     * @param listener.endContact
     * @param listener.preSolve
     */
    update(listener?: {
        beginContact(contact: Contact): void;
        endContact(contact: Contact): void;
        preSolve(contact: Contact, oldManifold: Manifold): void;
    }): void;
    solvePositionConstraint(step: TimeStep): number;
    solvePositionConstraintTOI(step: TimeStep, toiA: Body, toiB: Body): number;
    private _solvePositionConstraint;
    initVelocityConstraint(step: TimeStep): void;
    warmStartConstraint(step: TimeStep): void;
    storeConstraintImpulses(step: TimeStep): void;
    solveVelocityConstraint(step: TimeStep): void;
}
declare class TimeStep {
    /** time step */
    dt: number;
    /** inverse time step (0 if dt == 0) */
    inv_dt: number;
    velocityIterations: number;
    positionIterations: number;
    warmStarting: boolean;
    blockSolve: boolean;
    /** timestep ratio for variable timestep */
    inv_dt0: number;
    /** dt * inv_dt0 */
    dtRatio: number;
    reset(dt: any): void;
}
/**
 * Contact impulses for reporting. Impulses are used instead of forces because
 * sub-step forces may approach infinity for rigid body collisions. These match
 * up one-to-one with the contact points in Manifold.
 */
declare class ContactImpulse {
    // TODO: merge with Contact class?
    private readonly contact;
    private readonly normals;
    private readonly tangents;
    constructor(contact: any);
    get normalImpulses(): number[];
    get tangentImpulses(): number[];
}
/**
 * @prop gravity [{ x : 0, y : 0}]
 * @prop allowSleep [true]
 * @prop warmStarting [true]
 * @prop continuousPhysics [true]
 * @prop subStepping [false]
 * @prop blockSolve [true]
 * @prop velocityIterations [8] For the velocity constraint solver.
 * @prop positionIterations [3] For the position constraint solver.
 */
interface WorldDef {
    gravity?: Vec2;
    allowSleep?: boolean;
    warmStarting?: boolean;
    continuousPhysics?: boolean;
    subStepping?: boolean;
    blockSolve?: boolean;
    velocityIterations?: number;
    positionIterations?: number;
}
/**
 * Callback function for ray casts, see World.rayCast().
 *
 * Called for each fixture found in the query. You control how the ray cast
 * proceeds by returning a float: return -1: ignore this fixture and continue
 * return 0: terminate the ray cast return fraction: clip the ray to this point
 * return 1: don't clip the ray and continue
 *
 * @param fixture The fixture hit by the ray
 * @param point The point of initial intersection
 * @param normal The normal vector at the point of intersection
 * @param fraction
 *
 * @return -1 to filter, 0 to terminate, fraction to clip the ray for closest hit, 1 to continue
 */
type WorldRayCastCallback = (fixture: Fixture, point: Vec2, normal: Vec2, fraction: number) => number;
/**
 * Called for each fixture found in the query AABB. It may return `false` to terminate the query.
 */
type WorldAABBQueryCallback = (fixture: Fixture) => boolean;
declare function World(def?: WorldDef | Vec2 | null): World;
declare class World {
    /**
     * @param def World definition or gravity vector.
     */
    constructor(def?: WorldDef | Vec2 | null);
    /**
     * Get the world body list. With the returned body, use Body.getNext to get the
     * next body in the world list. A null body indicates the end of the list.
     *
     * @return the head of the world body list.
     */
    getBodyList(): Body | null;
    /**
     * Get the world joint list. With the returned joint, use Joint.getNext to get
     * the next joint in the world list. A null joint indicates the end of the list.
     *
     * @return the head of the world joint list.
     */
    getJointList(): Joint | null;
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
    getContactList(): Contact | null;
    getBodyCount(): number;
    getJointCount(): number;
    /**
     * Get the number of contacts (each may have 0 or more contact points).
     */
    getContactCount(): number;
    /**
     * Change the global gravity vector.
     */
    setGravity(gravity: Vec2): void;
    /**
     * Get the global gravity vector.
     */
    getGravity(): Vec2;
    /**
     * Is the world locked (in the middle of a time step).
     */
    isLocked(): boolean;
    /**
     * Enable/disable sleep.
     */
    setAllowSleeping(flag: boolean): void;
    getAllowSleeping(): boolean;
    /**
     * Enable/disable warm starting. For testing.
     */
    setWarmStarting(flag: boolean): void;
    getWarmStarting(): boolean;
    /**
     * Enable/disable continuous physics. For testing.
     */
    setContinuousPhysics(flag: boolean): void;
    getContinuousPhysics(): boolean;
    /**
     * Enable/disable single stepped continuous physics. For testing.
     */
    setSubStepping(flag: boolean): void;
    getSubStepping(): boolean;
    /**
     * Set flag to control automatic clearing of forces after each time step.
     */
    setAutoClearForces(flag: boolean): void;
    /**
     * Get the flag that controls automatic clearing of forces after each time step.
     */
    getAutoClearForces(): boolean;
    /**
     * Manually clear the force buffer on all bodies. By default, forces are cleared
     * automatically after each call to step. The default behavior is modified by
     * calling setAutoClearForces. The purpose of this function is to support
     * sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
     * under a variable frame-rate. When you perform sub-stepping you will disable
     * auto clearing of forces and instead call clearForces after all sub-steps are
     * complete in one pass of your game loop.
     *
     * @see setAutoClearForces
     */
    clearForces(): void;
    /**
     * Query the world for all fixtures that potentially overlap the provided AABB.
     *
     * @param aabb The query box.
     * @param callback Called for each fixture found in the query AABB. It may return `false` to terminate the query.
     */
    queryAABB(aabb: AABB, callback: WorldAABBQueryCallback): void;
    /**
     *
     * Ray-cast the world for all fixtures in the path of the ray. Your callback
     * controls whether you get the closest point, any point, or n-points. The
     * ray-cast ignores shapes that contain the starting point.
     *
     * @param point1 The ray starting point
     * @param point2 The ray ending point
     * @param callback A user implemented callback function.
     */
    rayCast(point1: Vec2, point2: Vec2, callback: WorldRayCastCallback): void;
    /**
     * Get the number of broad-phase proxies.
     */
    getProxyCount(): number;
    /**
     * Get the height of broad-phase dynamic tree.
     */
    getTreeHeight(): number;
    /**
     * Get the balance of broad-phase dynamic tree.
     */
    getTreeBalance(): number;
    /**
     * Get the quality metric of broad-phase dynamic tree. The smaller the better.
     * The minimum is 1.
     */
    getTreeQuality(): number;
    /**
     * Shift the world origin. Useful for large worlds. The body shift formula is:
     * position -= newOrigin
     *
     * @param newOrigin The new origin with respect to the old origin
     */
    shiftOrigin(newOrigin: Vec2): void;
    /**
     * Create a rigid body given a definition. No reference to the definition is
     * retained.
     *
     * Warning: This function is locked during callbacks.
     */
    createBody(def?: BodyDef): Body;
    createBody(position: Vec2, angle?: number): Body;
    createDynamicBody(def?: BodyDef): Body;
    createDynamicBody(position: Vec2, angle?: number): Body;
    createKinematicBody(def?: BodyDef): Body;
    createKinematicBody(position: Vec2, angle?: number): Body;
    /**
     * Destroy a rigid body given a definition. No reference to the definition is
     * retained.
     *
     * Warning: This automatically deletes all associated shapes and joints.
     *
     * Warning: This function is locked during callbacks.
     */
    destroyBody(b: Body): boolean;
    /**
     * Create a joint to constrain bodies together. No reference to the definition
     * is retained. This may cause the connected bodies to cease colliding.
     *
     * Warning: This function is locked during callbacks.
     */
    createJoint<T extends Joint>(joint: T): T | null;
    /**
     * Destroy a joint. This may cause the connected bodies to begin colliding.
     * Warning: This function is locked during callbacks.
     */
    destroyJoint(joint: Joint): void;
    /**
     * Take a time step. This performs collision detection, integration, and
     * constraint solution.
     *
     * Broad-phase, narrow-phase, solve and solve time of impacts.
     *
     * @param timeStep Time step, this should not vary.
     */
    step(timeStep: number, velocityIterations?: number, positionIterations?: number): void;
    on(name: "begin-contact", listener: (contact: Contact) => void): World;
    on(name: "end-contact", listener: (contact: Contact) => void): World;
    on(name: "pre-solve", listener: (contact: Contact, oldManifold: Manifold) => void): World;
    on(name: "post-solve", listener: (contact: Contact, impulse: ContactImpulse) => void): World;
    on(name: "remove-body", listener: (body: Body) => void): World;
    on(name: "remove-joint", listener: (joint: Joint) => void): World;
    on(name: "remove-fixture", listener: (fixture: Fixture) => void): World;
    off(name: "begin-contact", listener: (contact: Contact) => void): World;
    off(name: "end-contact", listener: (contact: Contact) => void): World;
    off(name: "pre-solve", listener: (contact: Contact, oldManifold: Manifold) => void): World;
    off(name: "post-solve", listener: (contact: Contact, impulse: ContactImpulse) => void): World;
    off(name: "remove-body", listener: (body: Body) => void): World;
    off(name: "remove-joint", listener: (joint: Joint) => void): World;
    off(name: "remove-fixture", listener: (fixture: Fixture) => void): World;
    publish(name: string, arg1?: any, arg2?: any, arg3?: any): number;
}
type BodyType = "static" | "kinematic" | "dynamic";
interface BodyDef {
    /**
     * Body types are static, kinematic, or dynamic. Note: if a dynamic
     * body would have zero mass, the mass is set to one.
     */
    type?: BodyType;
    /**
     * The world position of the body. Avoid creating bodies at the
     * origin since this can lead to many overlapping shapes.
     */
    position?: Vec2;
    /**
     * The world angle of the body in radians.
     */
    angle?: number;
    /**
     * The linear velocity of the body's origin in world co-ordinates.
     */
    linearVelocity?: Vec2;
    angularVelocity?: number;
    /**
     * Linear damping is use to reduce the linear velocity. The
     * damping parameter can be larger than 1.0 but the damping effect becomes
     * sensitive to the time step when the damping parameter is large.
     */
    linearDamping?: number;
    /**
     * Angular damping is use to reduce the angular velocity.
     * The damping parameter can be larger than 1.0 but the damping effect
     * becomes sensitive to the time step when the damping parameter is large.
     */
    angularDamping?: number;
    /**
     * Should this body be prevented from rotating? Useful for characters.
     */
    fixedRotation?: boolean;
    /**
     * Is this a fast moving body that should be prevented from
     * tunneling through other moving bodies? Note that all bodies are
     * prevented from tunneling through kinematic and static bodies. This
     * setting is only considered on dynamic bodies. Warning: You should use
     * this flag sparingly since it increases processing time.
     */
    bullet?: boolean;
    gravityScale?: number;
    /**
     * Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.
     */
    allowSleep?: boolean;
    /**
     * Is this body initially awake or sleeping?
     */
    awake?: boolean;
    /**
     * Does this body start out active?
     */
    active?: boolean;
    userData?: any;
}
/**
 * MassData This holds the mass data computed for a shape.
 */
declare class MassData {
    /** The mass of the shape, usually in kilograms. */
    mass: number;
    /** The position of the shape's centroid relative to the shape's origin. */
    center: Vec2;
    /** The rotational inertia of the shape about the local origin. */
    I: number;
}
/**
 * A rigid body composed of one or more fixtures.
 */
declare class Body {
    static STATIC: BodyType;
    static KINEMATIC: BodyType;
    static DYNAMIC: BodyType;
    constructor(world: any, def: any);
    isWorldLocked(): boolean;
    getWorld(): World;
    getNext(): Body | null;
    setUserData(data: any): void;
    getUserData(): unknown;
    getFixtureList(): Fixture | null;
    getJointList(): JointEdge | null;
    /**
     * Warning: this list changes during the time step and you may miss some
     * collisions if you don't use ContactListener.
     */
    getContactList(): ContactEdge | null;
    isStatic(): boolean;
    isDynamic(): boolean;
    isKinematic(): boolean;
    /**
     * This will alter the mass and velocity.
     */
    setStatic(): Body;
    setDynamic(): Body;
    setKinematic(): Body;
    isBullet(): boolean;
    /**
     * Should this body be treated like a bullet for continuous collision detection?
     */
    setBullet(flag: boolean): void;
    isSleepingAllowed(): boolean;
    setSleepingAllowed(flag: boolean): void;
    isAwake(): boolean;
    /**
     * Set the sleep state of the body. A sleeping body has very low CPU cost.
     *
     * @param flag Set to true to wake the body, false to put it to sleep.
     */
    setAwake(flag: boolean): void;
    isActive(): boolean;
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
    setActive(flag: boolean): void;
    isFixedRotation(): boolean;
    /**
     * Set this body to have fixed rotation. This causes the mass to be reset.
     */
    setFixedRotation(flag: boolean): void;
    /**
     * Get the world transform for the body's origin.
     */
    getTransform(): Transform;
    /**
     * Set the position of the body's origin and rotation. Manipulating a body's
     * transform may cause non-physical behavior. Note: contacts are updated on the
     * next call to World.step.
     *
     * @param position The world position of the body's local origin.
     * @param angle The world rotation in radians.
     */
    setTransform(position: Vec2, angle: number): void;
    synchronizeTransform(): void;
    /**
     * Update fixtures in broad-phase.
     */
    synchronizeFixtures(): void;
    /**
     * Used in TOI.
     */
    advance(alpha: number): void;
    /**
     * Get the world position for the body's origin.
     */
    getPosition(): Vec2;
    setPosition(p: Vec2): void;
    /**
     * Get the current world rotation angle in radians.
     */
    getAngle(): number;
    setAngle(angle: number): void;
    /**
     * Get the world position of the center of mass.
     */
    getWorldCenter(): Vec2;
    /**
     * Get the local position of the center of mass.
     */
    getLocalCenter(): Vec2;
    /**
     * Get the linear velocity of the center of mass.
     *
     * @return the linear velocity of the center of mass.
     */
    getLinearVelocity(): Vec2;
    /**
     * Get the world linear velocity of a world point attached to this body.
     *
     * @param worldPoint A point in world coordinates.
     */
    getLinearVelocityFromWorldPoint(worldPoint: Vec2): Vec2;
    /**
     * Get the world velocity of a local point.
     *
     * @param localPoint A point in local coordinates.
     */
    getLinearVelocityFromLocalPoint(localPoint: Vec2): Vec2;
    /**
     * Set the linear velocity of the center of mass.
     *
     * @param v The new linear velocity of the center of mass.
     */
    setLinearVelocity(v: Vec2): void;
    /**
     * Get the angular velocity.
     *
     * @returns the angular velocity in radians/second.
     */
    getAngularVelocity(): number;
    /**
     * Set the angular velocity.
     *
     * @param omega The new angular velocity in radians/second.
     */
    setAngularVelocity(w: number): void;
    getLinearDamping(): number;
    setLinearDamping(linearDamping: number): void;
    getAngularDamping(): number;
    setAngularDamping(angularDamping: number): void;
    getGravityScale(): number;
    /**
     * Scale the gravity applied to this body.
     */
    setGravityScale(scale: number): void;
    /**
     * Get the total mass of the body.
     *
     * @returns The mass, usually in kilograms (kg).
     */
    getMass(): number;
    /**
     * Get the rotational inertia of the body about the local origin.
     *
     * @return the rotational inertia, usually in kg-m^2.
     */
    getInertia(): number;
    /**
     * Copy the mass data of the body to data.
     */
    getMassData(data: MassData): void;
    /**
     * This resets the mass properties to the sum of the mass properties of the
     * fixtures. This normally does not need to be called unless you called
     * SetMassData to override the mass and you later want to reset the mass.
     */
    resetMassData(): void;
    /**
     * Set the mass properties to override the mass properties of the fixtures. Note
     * that this changes the center of mass position. Note that creating or
     * destroying fixtures can also alter the mass. This function has no effect if
     * the body isn't dynamic.
     *
     * @param massData The mass properties.
     */
    setMassData(massData: MassData): void;
    /**
     * Apply a force at a world point. If the force is not applied at the center of
     * mass, it will generate a torque and affect the angular velocity. This wakes
     * up the body.
     *
     * @param force The world force vector, usually in Newtons (N).
     * @param point The world position of the point of application.
     * @param wake Also wake up the body
     */
    applyForce(force: Vec2, point: Vec2, wake?: boolean): void;
    /**
     * Apply a force to the center of mass. This wakes up the body.
     *
     * @param force The world force vector, usually in Newtons (N).
     * @param wake Also wake up the body
     */
    applyForceToCenter(force: Vec2, wake?: boolean): void;
    /**
     * Apply a torque. This affects the angular velocity without affecting the
     * linear velocity of the center of mass. This wakes up the body.
     *
     * @param torque About the z-axis (out of the screen), usually in N-m.
     * @param wake Also wake up the body
     */
    applyTorque(torque: number, wake?: boolean): void;
    /**
     * Apply an impulse at a point. This immediately modifies the velocity. It also
     * modifies the angular velocity if the point of application is not at the
     * center of mass. This wakes up the body.
     *
     * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
     * @param point The world position of the point of application.
     * @param wake Also wake up the body
     */
    applyLinearImpulse(impulse: Vec2, point: Vec2, wake?: boolean): void;
    /**
     * Apply an angular impulse.
     *
     * @param impulse The angular impulse in units of kg*m*m/s
     * @param wake Also wake up the body
     */
    applyAngularImpulse(impulse: number, wake?: boolean): void;
    /**
     * This is used to prevent connected bodies (by joints) from colliding,
     * depending on the joint's collideConnected flag.
     */
    shouldCollide(that: Body): boolean;
    /**
     * Creates a fixture and attach it to this body.
     *
     * If the density is non-zero, this function automatically updates the mass of
     * the body.
     *
     * Contacts are not created until the next time step.
     *
     * Warning: This function is locked during callbacks.
     */
    createFixture(def: FixtureDef): Fixture;
    createFixture(shape: Shape, opt?: FixtureOpt): Fixture;
    createFixture(shape: Shape, density?: number): Fixture;
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
    destroyFixture(fixture: Fixture): void;
    /**
     * Get the corresponding world point of a local point.
     */
    getWorldPoint(localPoint: Vec2): Vec2;
    /**
     * Get the corresponding world vector of a local vector.
     */
    getWorldVector(localVector: Vec2): Vec2;
    /**
     * Gets the corresponding local point of a world point.
     */
    getLocalPoint(worldPoint: Vec2): Vec2;
    /**
     * Gets the corresponding local vector of a world vector.
     */
    getLocalVector(worldVector: Vec2): Vec2;
}
/**
 * Input for Distance. You have to option to use the shape radii in the
 * computation. Even
 */
declare class DistanceInput {
    proxyA: DistanceProxy;
    proxyB: DistanceProxy;
    transformA: Transform | null;
    transformB: Transform | null;
    useRadii: boolean;
}
/**
 * Output for Distance.
 *
 * @prop {Vec2} pointA closest point on shapeA
 * @prop {Vec2} pointB closest point on shapeB
 * @prop distance
 * @prop iterations number of GJK iterations used
 */
declare class DistanceOutput {
    pointA: Vec2;
    pointB: Vec2;
    distance: number;
    iterations: number;
}
/**
 * Used to warm start Distance. Set count to zero on first call.
 *
 * @prop {number} metric length or area
 * @prop {array} indexA vertices on shape A
 * @prop {array} indexB vertices on shape B
 * @prop {number} count
 */
declare class SimplexCache {
    metric: number;
    indexA: number[];
    indexB: number[];
    count: number;
}
/**
 * Compute the closest points between two shapes. Supports any combination of:
 * CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
 * the first call set SimplexCache.count to zero.
 */
declare function Distance(output: DistanceOutput, cache: SimplexCache, input: DistanceInput): void;
/**
 * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
 */
declare class DistanceProxy {
    /** internal */ m_buffer: Vec2[];
    /** internal */ m_vertices: Vec2[];
    /** internal */ m_count: number;
    /** internal */ m_radius: number;
    constructor();
    /**
     * Get the vertex count.
     */
    getVertexCount(): number;
    /**
     * Get a vertex by index. Used by Distance.
     */
    getVertex(index: number): Vec2;
    /**
     * Get the supporting vertex index in the given direction.
     */
    getSupport(d: Vec2): number;
    /**
     * Get the supporting vertex in the given direction.
     */
    getSupportVertex(d: Vec2): Vec2;
    /**
     * Initialize the proxy using the given shape. The shape must remain in scope
     * while the proxy is in use.
     */
    set(shape: Shape, index: number): void;
}
/**
 * A shape is used for collision detection. You can create a shape however you
 * like. Shapes used for simulation in World are created automatically when a
 * Fixture is created. Shapes may encapsulate one or more child shapes.
 */
declare abstract class Shape {
    m_type: ShapeType;
    m_radius: number;
    _reset(): void;
    static TYPES: {
        [id: string]: new (...args: any[]) => Shape;
    };
    static isValid(shape: Shape | null | undefined): shape is Shape;
    getRadius(): number;
    /**
     * Get the type of this shape. You can use this to down cast to the concrete
     * shape.
     *
     * @return the shape type.
     */
    getType(): ShapeType;
    /**
     * @deprecated Shapes should be treated as immutable.
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
    abstract testPoint(xf: Transform, p: Vec2): boolean;
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
    abstract computeAABB(aabb: AABB, xf: Transform, childIndex: number): void;
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
type ShapeType = "circle" | "edge" | "polygon" | "chain";
declare function CircleShape(position: Vec2, radius?: number): CircleShape;
declare function CircleShape(radius?: number): CircleShape;
declare class CircleShape extends Shape {
    static TYPE: "circle";
    private m_p;
    constructor(position: Vec2, radius?: number);
    constructor(radius?: number);
    // TODO: already defined in Shape
    getRadius(): number;
    getCenter(): Vec2;
    getVertex(index: 0): Vec2;
    /**
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone(): CircleShape;
    /**
     * Get the number of child primitives.
     */
    getChildCount(): 1;
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * @param {Transform} xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf: Transform, p: Vec2): boolean;
    /**
     * Cast a ray against a child shape.
     *
     * @param {RayCastOutput} output The ray-cast results.
     * @param {RayCastInput} input The ray-cast input parameters.
     * @param {Transform} transform The transform to be applied to the shape.
     * @param childIndex The child shape index
     */
    // Collision Detection in Interactive 3D Environments by Gino van den Bergen
    // From Section 3.1.2
    // x = s + a * r
    // norm(x) = radius
    rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean;
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param {AABB} aabb Returns the axis aligned box.
     * @param {Transform} xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb: AABB, xf: Transform, childIndex: number): void;
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * @param {MassData} massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData: MassData, density: number): void;
    computeDistanceProxy(proxy: DistanceProxy): void;
}
declare function EdgeShape(v1?: Vec2, v2?: Vec2): EdgeShape;
/**
 * A line segment (edge) shape. These can be connected in chains or loops to
 * other edge shapes. The connectivity information is used to ensure correct
 * contact normals.
 */
declare class EdgeShape extends Shape {
    static TYPE: "edge";
    // These are the edge vertices
    m_vertex1: Vec2;
    m_vertex2: Vec2;
    // Optional adjacent vertices. These are used for smooth collision.
    // Used by chain shape.
    m_vertex0: Vec2;
    m_vertex3: Vec2;
    m_hasVertex0: boolean;
    m_hasVertex3: boolean;
    constructor(v1?: Vec2, v2?: Vec2);
    setNext(v3?: Vec2): this;
    setPrev(v0?: Vec2): this;
    /**
     * Set this as an isolated edge.
     */
    _set(v1: Vec2, v2: Vec2): this;
    /**
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone(): EdgeShape;
    /**
     * Get the number of child primitives.
     */
    getChildCount(): 1;
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * @param {Transform} xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf: Transform, p: Vec2): false;
    /**
     * Cast a ray against a child shape.
     *
     * @param {RayCastOutput} output The ray-cast results.
     * @param {RayCastInput} input The ray-cast input parameters.
     * @param {Transform} transform The transform to be applied to the shape.
     * @param childIndex The child shape index
     */
    // p = p1 + t * d
    // v = v1 + s * e
    // p1 + t * d = v1 + s * e
    // s * e - t * d = p1 - v1
    rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean;
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param {AABB} aabb Returns the axis aligned box.
     * @param {Transform} xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb: AABB, xf: Transform, childIndex: number): void;
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * @param {MassData} massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData: MassData, density?: number): void;
    computeDistanceProxy(proxy: DistanceProxy): void;
}
declare function PolygonShape(vertices?: Vec2[]): PolygonShape;
/**
 * A convex polygon. It is assumed that the interior of the polygon is to the
 * left of each edge. Polygons have a maximum number of vertices equal to
 * Settings.maxPolygonVertices. In most cases you should not need many vertices
 * for a convex polygon. extends Shape
 */
declare class PolygonShape extends Shape {
    static TYPE: "polygon";
    m_centroid: Vec2;
    m_vertices: Vec2[]; // Vec2[Settings.maxPolygonVertices]
    m_normals: Vec2[]; // Vec2[Settings.maxPolygonVertices]
    m_count: number;
    // @ts-ignore
    constructor(vertices?: Vec2[]);
    getVertex(index: number): Vec2;
    /**
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone(): PolygonShape;
    /**
     * Get the number of child primitives.
     */
    getChildCount(): 1;
    _reset(): void;
    _setAsBox(hx: number, hy: number): void;
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * @param {Transform} xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf: Transform, p: Vec2): boolean;
    /**
     * Cast a ray against a child shape.
     *
     * @param output The ray-cast results.
     * @param input The ray-cast input parameters.
     * @param xf The transform to be applied to the shape.
     * @param childIndex The child shape index
     */
    rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean;
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param aabb Returns the axis aligned box.
     * @param xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb: AABB, xf: Transform, childIndex: number): void;
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * @param {MassData} massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData: MassData, density: number): void;
    /**
     * Validate convexity. This is a very time consuming operation.
     * @returns true if valid
     */
    validate(): boolean;
    computeDistanceProxy(proxy: DistanceProxy): void;
}
declare function ChainShape(vertices?: Vec2[], loop?: boolean): ChainShape;
/**
 * A chain shape is a free form sequence of line segments. The chain has
 * two-sided collision, so you can use inside and outside collision. Therefore,
 * you may use any winding order. Connectivity information is used to create
 * smooth collisions.
 *
 * WARNING: The chain will not collide properly if there are self-intersections.
 */
declare class ChainShape extends Shape {
    static TYPE: "chain";
    m_vertices: Vec2[];
    m_count: number;
    m_prevVertex: Vec2 | null;
    m_nextVertex: Vec2 | null;
    m_hasPrevVertex: boolean;
    m_hasNextVertex: boolean;
    m_isLoop: boolean;
    constructor(vertices?: Vec2[], loop?: boolean);
    // clear() {
    //   this.m_vertices.length = 0;
    //   this.m_count = 0;
    // }
    /**
     * Create a loop. This automatically adjusts connectivity.
     *
     * @param vertices an array of vertices, these are copied
     * @param count the vertex count
     */
    _createLoop(vertices: Vec2[]): this;
    /**
     * Create a chain with isolated end vertices.
     *
     * @param vertices an array of vertices, these are copied
     * @param count the vertex count
     */
    _createChain(vertices: Vec2[]): this;
    _reset(): void;
    /**
     * Establish connectivity to a vertex that precedes the first vertex. Don't call
     * this for loops.
     */
    setPrevVertex(prevVertex: Vec2): void;
    /**
     * Establish connectivity to a vertex that follows the last vertex. Don't call
     * this for loops.
     */
    setNextVertex(nextVertex: Vec2): void;
    /**
     * @deprecated Shapes should be treated as immutable.
     *
     * clone the concrete shape.
     */
    _clone(): ChainShape;
    /**
     * Get the number of child primitives.
     */
    getChildCount(): number;
    // Get a child edge.
    getChildEdge(edge: EdgeShape, childIndex: number): void;
    getVertex(index: number): Vec2;
    /**
     * Test a point for containment in this shape. This only works for convex
     * shapes.
     *
     * This always return false.
     *
     * @param {Transform} xf The shape world transform.
     * @param p A point in world coordinates.
     */
    testPoint(xf: Transform, p: Vec2): false;
    /**
     * Cast a ray against a child shape.
     *
     * @param {RayCastOutput} output The ray-cast results.
     * @param {RayCastInput} input The ray-cast input parameters.
     * @param {Transform} transform The transform to be applied to the shape.
     * @param childIndex The child shape index
     */
    rayCast(output: RayCastOutput, input: RayCastInput, xf: Transform, childIndex: number): boolean;
    /**
     * Given a transform, compute the associated axis aligned bounding box for a
     * child shape.
     *
     * @param {AABB} aabb Returns the axis aligned box.
     * @param {Transform} xf The world transform of the shape.
     * @param childIndex The child shape
     */
    computeAABB(aabb: AABB, xf: Transform, childIndex: number): void;
    /**
     * Compute the mass properties of this shape using its dimensions and density.
     * The inertia tensor is computed about the local origin.
     *
     * Chains have zero mass.
     *
     * @param {MassData} massData Returns the mass data for this shape.
     * @param density The density in kilograms per meter squared.
     */
    computeMass(massData: MassData, density?: number): void;
    computeDistanceProxy(proxy: DistanceProxy, childIndex: number): void;
}
declare function BoxShape(hx: number, hy: number, center?: Vec2, angle?: number): BoxShape;
/**
 * A rectangle polygon which extend PolygonShape.
 */
declare class BoxShape extends PolygonShape {
    static TYPE: "polygon";
    constructor(hx: number, hy: number, center?: Vec2, angle?: number);
}
declare function CollideCircles(manifold: any, circleA: any, xfA: any, circleB: any, xfB: any): void;
// Compute contact points for edge versus circle.
// This accounts for edge connectivity.
declare function CollideEdgeCircle(manifold: any, edgeA: any, xfA: any, circleB: any, xfB: any): void;
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
declare function CollidePolygons(manifold: any, polyA: PolygonShape, xfA: Transform, polyB: PolygonShape, xfB: Transform): void;
declare function CollidePolygonCircle(manifold: any, polygonA: any, xfA: any, circleB: any, xfB: any): void;
/**
 * This function collides and edge and a polygon, taking into account edge
 * adjacency.
 */
declare function CollideEdgePolygon(manifold: any, edgeA: any, xfA: any, polygonB: any, xfB: any): void;
/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 */
interface DistanceJointOpt extends JointOpt {
    /**
     * The mass-spring-damper frequency in Hertz. A value of 0 disables softness.
     */
    frequencyHz?: number;
    /**
     * The damping ratio. 0 = no damping, 1 = critical damping.
     */
    dampingRatio?: number;
    /**
     * Distance length.
     */
    length?: number;
}
/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 */
interface DistanceJointDef extends JointDef, DistanceJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
}
declare function DistanceJoint(def: DistanceJointDef): DistanceJoint;
declare function DistanceJoint(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2): DistanceJoint;
/**
 * A distance joint constrains two points on two bodies to remain at a fixed
 * distance from each other. You can view this as a massless, rigid rod.
 *
 * @param anchorA Anchor A in global coordination.
 * @param anchorB Anchor B in global coordination.
 */
declare class DistanceJoint extends Joint {
    static TYPE: "distance-joint";
    constructor(def: DistanceJointDef);
    constructor(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * Set the natural length. Manipulating the length can lead to non-physical
     * behavior when the frequency is zero.
     */
    setLength(length: number): void;
    /**
     * Get the natural length.
     */
    getLength(): number;
    setFrequency(hz: number): void;
    getFrequency(): number;
    setDampingRatio(ratio: number): void;
    getDampingRatio(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: number): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: number): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Friction joint definition.
 */
interface FrictionJointOpt extends JointOpt {
    /**
     * The maximum friction force in N.
     */
    maxForce?: number;
    /**
     * The maximum friction torque in N-m.
     */
    maxTorque?: number;
}
/**
 * Friction joint definition.
 */
interface FrictionJointDef extends JointDef, FrictionJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
}
declare function FrictionJoint(def: FrictionJointDef): FrictionJoint;
declare function FrictionJoint(def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): FrictionJoint;
/**
 * Friction joint. This is used for top-down friction. It provides 2D
 * translational friction and angular friction.
 *
 * @param anchor Anchor in global coordination.
 */
declare class FrictionJoint extends Joint {
    static TYPE: "friction-joint";
    // float
    constructor(def: FrictionJointDef);
    constructor(def: FrictionJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * Set the maximum friction force in N.
     */
    setMaxForce(force: any): void;
    /**
     * Get the maximum friction force in N.
     */
    getMaxForce(): number;
    /**
     * Set the maximum friction torque in N*m.
     */
    setMaxTorque(torque: any): void;
    /**
     * Get the maximum friction torque in N*m.
     */
    getMaxTorque(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Revolute joint definition. This requires defining an anchor point where the
 * bodies are joined. The definition uses local anchor points so that the
 * initial configuration can violate the constraint slightly. You also need to
 * specify the initial relative angle for joint limits. This helps when saving
 * and loading a game.
 *
 * The local anchor points are measured from the body's origin rather than the
 * center of mass because: 1. you might not know where the center of mass will
 * be. 2. if you add/remove shapes from a body and recompute the mass, the
 * joints will be broken.
 */
interface RevoluteJointOpt extends JointOpt {
    /**
     * The lower angle for the joint limit (radians).
     */
    lowerAngle?: number;
    /**
     * The upper angle for the joint limit (radians).
     */
    upperAngle?: number;
    /**
     * The maximum motor torque used to achieve the desired motor speed. Usually
     * in N-m.
     */
    maxMotorTorque?: number;
    /**
     * The desired motor speed. Usually in radians per second.
     */
    motorSpeed?: number;
    /**
     * A flag to enable joint limits.
     */
    enableLimit?: boolean;
    /**
     * A flag to enable the joint motor.
     */
    enableMotor?: boolean;
}
/**
 * Revolute joint definition. This requires defining an anchor point where the
 * bodies are joined. The definition uses local anchor points so that the
 * initial configuration can violate the constraint slightly. You also need to
 * specify the initial relative angle for joint limits. This helps when saving
 * and loading a game.
 *
 * The local anchor points are measured from the body's origin rather than the
 * center of mass because: 1. you might not know where the center of mass will
 * be. 2. if you add/remove shapes from a body and recompute the mass, the
 * joints will be broken.
 */
interface RevoluteJointDef extends JointDef, RevoluteJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
    /**
     * The bodyB angle minus bodyA angle in the reference state (radians).
     */
    referenceAngle: number;
}
declare function RevoluteJoint(def: RevoluteJointDef): RevoluteJoint;
declare function RevoluteJoint(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RevoluteJoint;
/**
 * A revolute joint constrains two bodies to share a common point while they are
 * free to rotate about the point. The relative rotation about the shared point
 * is the joint angle. You can limit the relative rotation with a joint limit
 * that specifies a lower and upper angle. You can use a motor to drive the
 * relative rotation about the shared point. A maximum motor torque is provided
 * so that infinite forces are not generated.
 */
declare class RevoluteJoint extends Joint {
    static TYPE: "revolute-joint";
    // TODO enum
    constructor(def: RevoluteJointDef);
    constructor(def: RevoluteJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * Get the reference angle.
     */
    getReferenceAngle(): number;
    /**
     * Get the current joint angle in radians.
     */
    getJointAngle(): number;
    /**
     * Get the current joint angle speed in radians per second.
     */
    getJointSpeed(): number;
    /**
     * Is the joint motor enabled?
     */
    isMotorEnabled(): boolean;
    /**
     * Enable/disable the joint motor.
     */
    enableMotor(flag: any): void;
    /**
     * Get the current motor torque given the inverse time step. Unit is N*m.
     */
    getMotorTorque(inv_dt: any): number;
    /**
     * Set the motor speed in radians per second.
     */
    setMotorSpeed(speed: any): void;
    /**
     * Get the motor speed in radians per second.
     */
    getMotorSpeed(): number;
    /**
     * Set the maximum motor torque, usually in N-m.
     */
    setMaxMotorTorque(torque: any): void;
    getMaxMotorTorque(): number;
    /**
     * Is the joint limit enabled?
     */
    isLimitEnabled(): boolean;
    /**
     * Enable/disable the joint limit.
     */
    enableLimit(flag: any): void;
    /**
     * Get the lower joint limit in radians.
     */
    getLowerLimit(): number;
    /**
     * Get the upper joint limit in radians.
     */
    getUpperLimit(): number;
    /**
     * Set the joint limits in radians.
     */
    setLimits(lower: any, upper: any): void;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force given the inverse time step. Unit is N.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque due to the joint limit given the inverse time step.
     * Unit is N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Prismatic joint definition. This requires defining a line of motion using an
 * axis and an anchor point. The definition uses local anchor points and a local
 * axis so that the initial configuration can violate the constraint slightly.
 * The joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
interface PrismaticJointOpt extends JointOpt {
    /**
     * Enable/disable the joint limit.
     */
    enableLimit?: boolean;
    /**
     * The lower translation limit, usually in meters.
     */
    lowerTranslation?: number;
    /**
     * The upper translation limit, usually in meters.
     */
    upperTranslation?: number;
    /**
     * Enable/disable the joint motor.
     */
    enableMotor?: boolean;
    /**
     * The maximum motor torque, usually in N-m.
     */
    maxMotorForce?: number;
    /**
     * The desired motor speed in radians per second.
     */
    motorSpeed?: number;
}
/**
 * Prismatic joint definition. This requires defining a line of motion using an
 * axis and an anchor point. The definition uses local anchor points and a local
 * axis so that the initial configuration can violate the constraint slightly.
 * The joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
interface PrismaticJointDef extends JointDef, PrismaticJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
    /**
     * The local translation unit axis in bodyA.
     */
    localAxisA: Vec2;
    /**
     * referenceAngle The constrained angle between the bodies:
     * bodyB_angle - bodyA_angle.
     */
    referenceAngle: number;
}
declare function PrismaticJoint(def: PrismaticJointDef): PrismaticJoint;
declare function PrismaticJoint(def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): PrismaticJoint;
/**
 * A prismatic joint. This joint provides one degree of freedom: translation
 * along an axis fixed in bodyA. Relative rotation is prevented. You can use a
 * joint limit to restrict the range of motion and a joint motor to drive the
 * motion or to model joint friction.
 */
declare class PrismaticJoint extends Joint {
    static TYPE: "prismatic-joint";
    constructor(def: PrismaticJointDef);
    constructor(def: PrismaticJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * The local joint axis relative to bodyA.
     */
    getLocalAxisA(): Vec2;
    /**
     * Get the reference angle.
     */
    getReferenceAngle(): number;
    /**
     * Get the current joint translation, usually in meters.
     */
    getJointTranslation(): number;
    /**
     * Get the current joint translation speed, usually in meters per second.
     */
    getJointSpeed(): number;
    /**
     * Is the joint limit enabled?
     */
    isLimitEnabled(): boolean;
    /**
     * Enable/disable the joint limit.
     */
    enableLimit(flag: any): void;
    /**
     * Get the lower joint limit, usually in meters.
     */
    getLowerLimit(): number;
    /**
     * Get the upper joint limit, usually in meters.
     */
    getUpperLimit(): number;
    /**
     * Set the joint limits, usually in meters.
     */
    setLimits(lower: any, upper: any): void;
    /**
     * Is the joint motor enabled?
     */
    isMotorEnabled(): boolean;
    /**
     * Enable/disable the joint motor.
     */
    enableMotor(flag: any): void;
    /**
     * Set the motor speed, usually in meters per second.
     */
    setMotorSpeed(speed: any): void;
    /**
     * Set the maximum motor force, usually in N.
     */
    setMaxMotorForce(force: any): void;
    getMaxMotorForce(): number;
    /**
     * Get the motor speed, usually in meters per second.
     */
    getMotorSpeed(): number;
    /**
     * Get the current motor force given the inverse time step, usually in N.
     */
    getMotorForce(inv_dt: any): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Gear joint definition.
 */
interface GearJointOpt extends JointOpt {
    /**
     * The gear ratio. See GearJoint for explanation.
     */
    ratio?: number;
}
/**
 * Gear joint definition.
 */
interface GearJointDef extends JointDef, GearJointOpt {
    /**
     * The first revolute/prismatic joint attached to the gear joint.
     */
    joint1: RevoluteJoint | PrismaticJoint;
    /**
     * The second prismatic/revolute joint attached to the gear joint.
     */
    joint2: RevoluteJoint | PrismaticJoint;
}
declare function GearJoint(def: GearJointDef): GearJoint;
declare function GearJoint(def: GearJointOpt, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number): GearJoint;
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
declare class GearJoint extends Joint {
    static TYPE: "gear-joint";
    // float
    constructor(def: GearJointDef);
    constructor(def: GearJointOpt, bodyA: Body, bodyB: Body, joint1: RevoluteJoint | PrismaticJoint, joint2: RevoluteJoint | PrismaticJoint, ratio?: number);
    /**
     * Get the first joint.
     */
    getJoint1(): RevoluteJoint | PrismaticJoint;
    /**
     * Get the second joint.
     */
    getJoint2(): RevoluteJoint | PrismaticJoint;
    /**
     * Set the gear ratio.
     */
    setRatio(ratio: any): void;
    /**
     * Get the gear ratio.
     */
    getRatio(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Motor joint definition.
 */
interface MotorJointOpt extends JointOpt {
    /**
     * The bodyB angle minus bodyA angle in radians.
     */
    angularOffset?: number;
    /**
     * The maximum motor force in N.
     */
    maxForce?: number;
    /**
     * The maximum motor torque in N-m.
     */
    maxTorque?: number;
    /**
     * Position correction factor in the range [0,1].
     */
    correctionFactor?: number;
    /**
     * Position of bodyB minus the position of bodyA, in bodyA's frame, in meters.
     */
    linearOffset?: Vec2;
}
/**
 * Motor joint definition.
 */
interface MotorJointDef extends JointDef, MotorJointOpt {
}
declare function MotorJoint(def: MotorJointDef): MotorJoint;
declare function MotorJoint(def: MotorJointOpt, bodyA: Body, bodyB: Body): MotorJoint;
/**
 * A motor joint is used to control the relative motion between two bodies. A
 * typical usage is to control the movement of a dynamic body with respect to
 * the ground.
 */
declare class MotorJoint extends Joint {
    static TYPE: "motor-joint";
    // float
    constructor(def: MotorJointDef);
    constructor(def: MotorJointOpt, bodyA: Body, bodyB: Body);
    /**
     * Set the maximum friction force in N.
     */
    setMaxForce(force: any): void;
    /**
     * Get the maximum friction force in N.
     */
    getMaxForce(): number;
    /**
     * Set the maximum friction torque in N*m.
     */
    setMaxTorque(torque: any): void;
    /**
     * Get the maximum friction torque in N*m.
     */
    getMaxTorque(): number;
    /**
     * Set the position correction factor in the range [0,1].
     */
    setCorrectionFactor(factor: any): void;
    /**
     * Get the position correction factor in the range [0,1].
     */
    getCorrectionFactor(): number;
    /**
     * Set/get the target linear offset, in frame A, in meters.
     */
    setLinearOffset(linearOffset: any): void;
    getLinearOffset(): Vec2;
    /**
     * Set/get the target angular offset, in radians.
     */
    setAngularOffset(angularOffset: any): void;
    getAngularOffset(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Mouse joint definition. This requires a world target point, tuning
 * parameters, and the time step.
 */
interface MouseJointOpt extends JointOpt {
    /**
     * [maxForce = 0.0] The maximum constraint force that can be exerted to move
     * the candidate body. Usually you will express as some multiple of the
     * weight (multiplier * mass * gravity).
     */
    maxForce?: number;
    /**
     * [frequencyHz = 5.0] The response speed.
     */
    frequencyHz?: number;
    /**
     * [dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
     * damping.
     */
    dampingRatio?: number;
}
/**
 * Mouse joint definition. This requires a world target point, tuning
 * parameters, and the time step.
 */
interface MouseJointDef extends JointDef, MouseJointOpt {
    /**
     * The initial world target point. This is assumed to coincide with the body
     * anchor initially.
     */
    target: Vec2;
}
declare function MouseJoint(def: MouseJointDef): MouseJoint;
declare function MouseJoint(def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2): MouseJoint;
/**
 * A mouse joint is used to make a point on a body track a specified world
 * point. This a soft constraint with a maximum force. This allows the
 * constraint to stretch and without applying huge forces.
 *
 * NOTE: this joint is not documented in the manual because it was developed to
 * be used in the testbed. If you want to learn how to use the mouse joint, look
 * at the testbed.
 */
declare class MouseJoint extends Joint {
    static TYPE: "mouse-joint";
    constructor(def: MouseJointDef);
    constructor(def: MouseJointOpt, bodyA: Body, bodyB: Body, target: Vec2);
    /**
     * Use this to update the target point.
     */
    setTarget(target: any): void;
    getTarget(): Vec2;
    /**
     * Set the maximum force in Newtons.
     */
    setMaxForce(force: any): void;
    /**
     * Get the maximum force in Newtons.
     */
    getMaxForce(): number;
    /**
     * Set the frequency in Hertz.
     */
    setFrequency(hz: any): void;
    /**
     * Get the frequency in Hertz.
     */
    getFrequency(): number;
    /**
     * Set the damping ratio (dimensionless).
     */
    setDampingRatio(ratio: any): void;
    /**
     * Get the damping ratio (dimensionless).
     */
    getDampingRatio(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    /**
     * Shift the origin for any points stored in world coordinates.
     */
    shiftOrigin(newOrigin: any): void;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Pulley joint definition. This requires two ground anchors, two dynamic body
 * anchor points, and a pulley ratio.
 */
interface PulleyJointOpt extends JointOpt {
}
/**
 * Pulley joint definition. This requires two ground anchors, two dynamic body
 * anchor points, and a pulley ratio.
 */
interface PulleyJointDef extends JointDef, PulleyJointOpt {
    /**
     * The first ground anchor in world coordinates. This point never moves.
     */
    groundAnchorA: Vec2;
    /**
     * The second ground anchor in world coordinates. This point never moves.
     */
    groundAnchorB: Vec2;
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
    /**
     * The reference length for the segment attached to bodyA.
     */
    lengthA: number;
    /**
     * The reference length for the segment attached to bodyB.
     */
    lengthB: number;
    /**
     * The pulley ratio, used to simulate a block-and-tackle.
     */
    ratio: number;
}
declare function PulleyJoint(def: PulleyJointDef): PulleyJoint;
declare function PulleyJoint(def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number): PulleyJoint;
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
declare class PulleyJoint extends Joint {
    static TYPE: "pulley-joint";
    static MIN_PULLEY_LENGTH: number; // minPulleyLength
    // float
    constructor(def: PulleyJointDef);
    constructor(def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number);
    _serialize(): {
        type: "pulley-joint";
        bodyA: Body;
        bodyB: Body;
        collideConnected: boolean;
        groundAnchorA: Vec2;
        groundAnchorB: Vec2;
        localAnchorA: Vec2;
        localAnchorB: Vec2;
        lengthA: number;
        lengthB: number;
        ratio: number;
    };
    static _deserialize(data: any, world: any, restore: any): PulleyJoint;
    /**
     * Get the first ground anchor.
     */
    getGroundAnchorA(): Vec2;
    /**
     * Get the second ground anchor.
     */
    getGroundAnchorB(): Vec2;
    /**
     * Get the current length of the segment attached to bodyA.
     */
    getLengthA(): number;
    /**
     * Get the current length of the segment attached to bodyB.
     */
    getLengthB(): number;
    /**
     * Get the pulley ratio.
     */
    getRatio(): number;
    /**
     * Get the current length of the segment attached to bodyA.
     */
    getCurrentLengthA(): number;
    /**
     * Get the current length of the segment attached to bodyB.
     */
    getCurrentLengthB(): number;
    /**
     * Shift the origin for any points stored in world coordinates.
     *
     * @param newOrigin
     */
    shiftOrigin(newOrigin: any): void;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Rope joint definition. This requires two body anchor points and a maximum
 * lengths. Note: by default the connected objects will not collide. see
 * collideConnected in JointDef.
 */
interface RopeJointOpt extends JointOpt {
    /**
     * The maximum length of the rope.
     * Warning: this must be larger than linearSlop or the joint will have no effect.
     */
    maxLength?: number;
}
/**
 * Rope joint definition. This requires two body anchor points and a maximum
 * lengths. Note: by default the connected objects will not collide. see
 * collideConnected in JointDef.
 */
interface RopeJointDef extends JointDef, RopeJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
}
declare function RopeJoint(def: RopeJointDef): RopeJoint;
declare function RopeJoint(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): RopeJoint;
/**
 * A rope joint enforces a maximum distance between two points on two bodies. It
 * has no other effect.
 *
 * Warning: if you attempt to change the maximum length during the simulation
 * you will get some non-physical behavior.
 *
 * A model that would allow you to dynamically modify the length would have some
 * sponginess, so I chose not to implement it that way. See DistanceJoint if you
 * want to dynamically control length.
 */
declare class RopeJoint extends Joint {
    static TYPE: "rope-joint";
    // float
    constructor(def: RopeJointDef);
    constructor(def: RopeJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * Set the maximum length of the rope.
     */
    setMaxLength(length: any): void;
    /**
     * Get the maximum length of the rope.
     */
    getMaxLength(): number;
    getLimitState(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 *
 * @prop {float} frequencyHz
 * @prop {float} dampingRatio
 *
 * @prop {Vec2} localAnchorA
 * @prop {Vec2} localAnchorB
 * @prop {float} referenceAngle
 */
interface WeldJointOpt extends JointOpt {
    /**
     * The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
     * with a value of 0.
     */
    frequencyHz?: number;
    /**
     * The damping ratio. 0 = no damping, 1 = critical damping.
     */
    dampingRatio?: number;
    /**
     * The bodyB angle minus bodyA angle in the reference state (radians).
     */
    referenceAngle?: number;
}
/**
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 */
interface WeldJointDef extends JointDef, WeldJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
}
declare function WeldJoint(def: WeldJointDef): WeldJoint;
declare function WeldJoint(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2): WeldJoint;
/**
 * A weld joint essentially glues two bodies together. A weld joint may distort
 * somewhat because the island constraint solver is approximate.
 */
declare class WeldJoint extends Joint {
    static TYPE: "weld-joint";
    constructor(def: WeldJointDef);
    constructor(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * Get the reference angle.
     */
    getReferenceAngle(): number;
    /**
     * Set frequency in Hz.
     */
    setFrequency(hz: number): void;
    /**
     * Get frequency in Hz.
     */
    getFrequency(): number;
    /**
     * Set damping ratio.
     */
    setDampingRatio(ratio: number): void;
    /**
     * Get damping ratio.
     */
    getDampingRatio(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: number): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: number): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
}
/**
 * Wheel joint definition. This requires defining a line of motion using an axis
 * and an anchor point. The definition uses local anchor points and a local axis
 * so that the initial configuration can violate the constraint slightly. The
 * joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
interface WheelJointOpt extends JointOpt {
    /**
     * Enable/disable the joint motor.
     */
    enableMotor?: boolean;
    /**
     * The maximum motor torque, usually in N-m.
     */
    maxMotorTorque?: number;
    /**
     * The desired motor speed in radians per second.
     */
    motorSpeed?: number;
    /**
     * Suspension frequency, zero indicates no suspension.
     */
    frequencyHz?: number;
    /**
     * Suspension damping ratio, one indicates critical damping.
     */
    dampingRatio?: number;
}
/**
 * Wheel joint definition. This requires defining a line of motion using an axis
 * and an anchor point. The definition uses local anchor points and a local axis
 * so that the initial configuration can violate the constraint slightly. The
 * joint translation is zero when the local anchor points coincide in world
 * space. Using local anchors and a local axis helps when saving and loading a
 * game.
 */
interface WheelJointDef extends JointDef, WheelJointOpt {
    /**
     * The local anchor point relative to bodyA's origin.
     */
    localAnchorA: Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    localAnchorB: Vec2;
    /**
     * The local translation axis in bodyA.
     */
    localAxisA: Vec2;
}
declare function WheelJoint(def: WheelJointDef): WheelJoint;
declare function WheelJoint(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2): WheelJoint;
/**
 * A wheel joint. This joint provides two degrees of freedom: translation along
 * an axis fixed in bodyA and rotation in the plane. In other words, it is a
 * point to line constraint with a rotational motor and a linear spring/damper.
 * This joint is designed for vehicle suspensions.
 */
declare class WheelJoint extends Joint {
    static TYPE: "wheel-joint";
    // float
    constructor(def: WheelJointDef);
    constructor(def: WheelJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2, axis: Vec2);
    /**
     * The local anchor point relative to bodyA's origin.
     */
    getLocalAnchorA(): Vec2;
    /**
     * The local anchor point relative to bodyB's origin.
     */
    getLocalAnchorB(): Vec2;
    /**
     * The local joint axis relative to bodyA.
     */
    getLocalAxisA(): Vec2;
    /**
     * Get the current joint translation, usually in meters.
     */
    getJointTranslation(): number;
    /**
     * Get the current joint translation speed, usually in meters per second.
     */
    getJointSpeed(): number;
    /**
     * Is the joint motor enabled?
     */
    isMotorEnabled(): boolean;
    /**
     * Enable/disable the joint motor.
     */
    enableMotor(flag: any): void;
    /**
     * Set the motor speed, usually in radians per second.
     */
    setMotorSpeed(speed: any): void;
    /**
     * Get the motor speed, usually in radians per second.
     */
    getMotorSpeed(): number;
    /**
     * Set/Get the maximum motor force, usually in N-m.
     */
    setMaxMotorTorque(torque: any): void;
    getMaxMotorTorque(): number;
    /**
     * Get the current motor torque given the inverse time step, usually in N-m.
     */
    getMotorTorque(inv_dt: any): number;
    /**
     * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
     * the spring.
     */
    setSpringFrequencyHz(hz: any): void;
    getSpringFrequencyHz(): number;
    /**
     * Set/Get the spring damping ratio
     */
    setSpringDampingRatio(ratio: any): void;
    getSpringDampingRatio(): number;
    /**
     * Get the anchor point on bodyA in world coordinates.
     */
    getAnchorA(): Vec2;
    /**
     * Get the anchor point on bodyB in world coordinates.
     */
    getAnchorB(): Vec2;
    /**
     * Get the reaction force on bodyB at the joint anchor in Newtons.
     */
    getReactionForce(inv_dt: any): Vec2;
    /**
     * Get the reaction torque on bodyB in N*m.
     */
    getReactionTorque(inv_dt: any): number;
    initVelocityConstraints(step: any): void;
    solveVelocityConstraints(step: any): void;
    /**
     * This returns true if the position errors are within tolerance.
     */
    solvePositionConstraints(step: any): boolean;
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
// TODO merge with World options?
/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */
// tslint:disable-next-line:no-unnecessary-class
declare class Settings {
    // Collision
    /**
     * The maximum number of contact points between two convex shapes. Do not change
     * this value.
     */
    static maxManifoldPoints: number;
    /**
     * The maximum number of vertices on a convex polygon. You cannot increase this
     * too much because BlockAllocator has a maximum object size.
     */
    static maxPolygonVertices: number;
    /**
     * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
     * by a small amount without triggering a tree adjustment. This is in meters.
     */
    static aabbExtension: number;
    /**
     * This is used to fatten AABBs in the dynamic tree. This is used to predict the
     * future position based on the current displacement. This is a dimensionless
     * multiplier.
     */
    static aabbMultiplier: number;
    /**
     * A small length used as a collision and constraint tolerance. Usually it is
     * chosen to be numerically significant, but visually insignificant.
     */
    static linearSlop: number;
    static get linearSlopSquared(): number;
    /**
     * A small angle used as a collision and constraint tolerance. Usually it is
     * chosen to be numerically significant, but visually insignificant.
     */
    static angularSlop: number;
    /**
     * The radius of the polygon/edge shape skin. This should not be modified.
     * Making this smaller means polygons will have an insufficient buffer for
     * continuous collision. Making it larger may create artifacts for vertex
     * collision.
     */
    static get polygonRadius(): number;
    /**
     * Maximum number of sub-steps per contact in continuous physics simulation.
     */
    static maxSubSteps: number;
    // Dynamics
    /**
     * Maximum number of contacts to be handled to solve a TOI impact.
     */
    static maxTOIContacts: number;
    /**
     * Maximum iterations to solve a TOI.
     */
    static maxTOIIterations: number;
    /**
     * Maximum iterations to find Distance.
     */
    static maxDistnceIterations: number;
    /**
     * A velocity threshold for elastic collisions. Any collision with a relative
     * linear velocity below this threshold will be treated as inelastic.
     */
    static velocityThreshold: number;
    /**
     * The maximum linear position correction used when solving constraints. This
     * helps to prevent overshoot.
     */
    static maxLinearCorrection: number;
    /**
     * The maximum angular position correction used when solving constraints. This
     * helps to prevent overshoot.
     */
    static maxAngularCorrection: number;
    /**
     * The maximum linear velocity of a body. This limit is very large and is used
     * to prevent numerical problems. You shouldn't need to adjust Settings.
     */
    static maxTranslation: number;
    static get maxTranslationSquared(): number;
    /**
     * The maximum angular velocity of a body. This limit is very large and is used
     * to prevent numerical problems. You shouldn't need to adjust Settings.
     */
    static maxRotation: number;
    static get maxRotationSquared(): number;
    /**
     * This scale factor controls how fast overlap is resolved. Ideally this would
     * be 1 so that overlap is removed in one time step. However using values close
     * to 1 often lead to overshoot.
     */
    static baumgarte: number;
    static toiBaugarte: number;
    // Sleep
    /**
     * The time that a body must be still before it will go to sleep.
     */
    static timeToSleep: number;
    /**
     * A body cannot sleep if its linear velocity is above this tolerance.
     */
    static linearSleepTolerance: number;
    static get linearSleepToleranceSqr(): number;
    /**
     * A body cannot sleep if its angular velocity is above this tolerance.
     */
    static angularSleepTolerance: number;
    static get angularSleepToleranceSqr(): number;
}
/**
 * This describes the motion of a body/shape for TOI computation. Shapes are
 * defined with respect to the body origin, which may not coincide with the
 * center of mass. However, to support dynamics we must interpolate the center
 * of mass position.
 */
declare class Sweep {
    /** Local center of mass position */
    localCenter: Vec2;
    /** World center position */
    c: Vec2;
    /** World angle */
    a: number;
    /** Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0. */
    alpha0: number;
    c0: Vec2;
    a0: number;
    constructor(c?: Vec2, a?: number);
    setTransform(xf: Transform): void;
    setLocalCenter(localCenter: Vec2, xf: Transform): void;
    /**
     * Get the interpolated transform at a specific time.
     *
     * @param xf
     * @param beta A factor in [0,1], where 0 indicates alpha0
     */
    getTransform(xf: Transform, beta: number): void;
    /**
     * Advance the sweep forward, yielding a new initial state.
     *
     * @param alpha The new initial time
     */
    advance(alpha: number): void;
    forward(): void;
    /**
     * normalize the angles in radians to be between -pi and pi.
     */
    normalize(): void;
    clone(): Sweep;
    set(that: Sweep): void;
}
/**
 * Input parameters for TimeOfImpact.
 */
declare class TOIInput {
    proxyA: DistanceProxy;
    proxyB: DistanceProxy;
    sweepA: Sweep;
    sweepB: Sweep;
    /** defines sweep interval [0, tMax] */
    tMax: number | undefined;
}
declare enum TOIOutputState {
    e_unknown = 0,
    e_failed = 1,
    e_overlapped = 2,
    e_touching = 3,
    e_separated = 4
}
/**
 * Output parameters for TimeOfImpact.
 */
declare class TOIOutput {
    state: TOIOutputState | undefined;
    t: number | undefined;
}
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
declare function TimeOfImpact(output: TOIOutput, input: TOIInput): void;
interface ActiveKeys {
    0?: boolean;
    1?: boolean;
    2?: boolean;
    3?: boolean;
    4?: boolean;
    5?: boolean;
    6?: boolean;
    7?: boolean;
    8?: boolean;
    9?: boolean;
    A?: boolean;
    B?: boolean;
    C?: boolean;
    D?: boolean;
    E?: boolean;
    F?: boolean;
    G?: boolean;
    H?: boolean;
    I?: boolean;
    J?: boolean;
    K?: boolean;
    L?: boolean;
    M?: boolean;
    N?: boolean;
    O?: boolean;
    P?: boolean;
    Q?: boolean;
    R?: boolean;
    S?: boolean;
    T?: boolean;
    U?: boolean;
    V?: boolean;
    W?: boolean;
    X?: boolean;
    Y?: boolean;
    Z?: boolean;
    right?: boolean;
    left?: boolean;
    up?: boolean;
    down?: boolean;
    fire?: boolean;
}
interface Testbed {
    /** World viewbox width. */
    width: number;
    /** World viewbox height. */
    height: number;
    /** World viewbox center vertical offset. */
    x: number;
    /** World viewbox center horizontal offset. */
    y: number;
    scaleY: number;
    ratio: number;
    /** World simulation step frequency */
    hz: number;
    /** World simulation speed, default is 1 */
    speed: number;
    activeKeys: ActiveKeys;
    background: string;
    mouseForce?: number;
    status(name: string, value: any): void;
    status(value: object | string): void;
    info(text: string): void;
    drawPoint(p: {
        x: number;
        y: number;
    }, r: any, color: string): void;
    drawCircle(p: {
        x: number;
        y: number;
    }, r: number, color: string): void;
    drawSegment(a: {
        x: number;
        y: number;
    }, b: {
        x: number;
        y: number;
    }, color: string): void;
    drawPolygon(points: Array<{
        x: number;
        y: number;
    }>, color: string): void;
    drawAABB(aabb: AABB, color: string): void;
    color(r: number, g: number, b: number): string;
    step?: (dt: number, t: number) => void;
    keydown?: (keyCode: number, label: string) => void;
    keyup?: (keyCode: number, label: string) => void;
    findOne: (query: string) => Body | Joint | Fixture | null;
    findAll: (query: string) => Body[] | Joint[] | Fixture[];
}
declare function testbed(opts: object, callback: (testbed: Testbed) => World): any;
declare function testbed(callback: (testbed: Testbed) => World): any;
/** @deprecated Merged with main namespace */
declare const internal$0: {};
export { ActiveKeys, Testbed, testbed, Serializer, math as Math, Vec2, Vec3, Mat22, Mat33, Transform, Rot, AABB, Shape, Fixture, Body, Contact, Joint, World, CircleShape as Circle, EdgeShape as Edge, PolygonShape as Polygon, ChainShape as Chain, BoxShape as Box, CollideCircles, CollideEdgeCircle, CollidePolygons, CollidePolygonCircle, CollideEdgePolygon, DistanceJoint, FrictionJoint, GearJoint, MotorJoint, MouseJoint, PrismaticJoint, PulleyJoint, RevoluteJoint, RopeJoint, WeldJoint, WheelJoint, Settings, Sweep, Manifold, Distance, TimeOfImpact, DynamicTree, internal$0 as internal };
