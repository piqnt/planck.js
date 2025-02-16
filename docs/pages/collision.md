
## Collision
The Collision classes include shapes and functions that operate on them.
The module also contains a dynamic tree and broad-phase to acceleration
collision processing of large systems.

The collision classes are designed to be usable outside of the dynamic
system. For example, you can use the dynamic tree for other aspects of
your game besides physics.

However, the main purpose of Planck.js is to provide a rigid body physics
engine, so the using the collision module by itself may feel limited for
some applications. Likewise, I will not make a strong effort to document
it or polish the APIs.

### Contact Manifolds
Planck.js has functions to compute contact points for overlapping shapes. If
we consider circle-circle or circle-polygon, we can only get one contact
point and normal. In the case of polygon-polygon we can get two points.
These points share the same normal vector so Planck.js groups them into a
manifold structure. The contact solver takes advantage of this to
improve stacking stability.

![Contact Manifold](/planck.js/docs/images/manifolds.svg)

Normally you don't need to compute contact manifolds directly, however
you will likely use the results produced in the simulation.

The `Manifold` structure holds a normal vector and up to two contact
points. The normal and points are held in local coordinates. As a
convenience for the contact solver, each point stores the normal and
tangential (friction) impulses.

The data stored in `Manifold` is optimized for internal use. If you need
this data, it is usually best to use the `WorldManifold` structure to
generate the world coordinates of the contact normal and points. You
need to provide a `Manifold` and the shape transforms and radii.

```js
let worldManifold = manifold.getWorldManifold(null, transformA, shapeA.m_radius, transformB, shapeB.m_radius)

for (let i = 0; i < manifold.pointCount; ++i) {
  let point = worldManifold.points[i]; // Vec2
  // ...
}
```

Notice that the world manifold uses the point count from the original
manifold.

During simulation shapes may move and the manifolds may change. Points
may be added or removed. You can detect this using `GetPointStates()`.

```js
let state1 = []; // [PointState]
let state2 = []; // [PointState]
getPointStates(state1, state2, manifold1, manifold2);

if (state1[0] == PointState.removeState) {
  // process event
}
```

### Distance
The `Distance` function can be used to compute the distance between two
shapes. The distance function needs both shapes to be converted into a
`DistanceProxy`. There is also some caching used to warm start the
distance function for repeated calls.

![Distance Function](/planck.js/docs/images/distance.svg)

### Time of Impact
If two shapes are moving fast, they may *tunnel* through each other in a
single time step.

![Tunneling](/planck.js/docs/images/tunneling2.svg)

The `TimeOfImpact` function is used to determine the time when two
moving shapes collide. This is called the *time of impact* (TOI). The
main purpose of `TimeOfImpact` is for tunnel prevention. In particular,
it is designed to prevent moving objects from tunneling outside of
static level geometry.

This function accounts for rotation and translation of both shapes,
however if the rotations are large enough, then the function may miss a
collision. However the function will still report a non-overlapped time
and will capture all translational collisions.

The time of impact function identities an initial separating axis and
ensures the shapes do not cross on that axis. This might miss collisions
that are clear at the final positions. While this approach may miss some
collisions, it is very fast and adequate for tunnel prevention.

![Captured Collision](/planck.js/docs/images/captured_toi.svg)

![Missed Collision](/planck.js/docs/images/missed_toi.svg)

It is difficult to put a restriction on the rotation magnitude. There
may be cases where collisions are missed for small rotations. Normally,
these missed rotational collisions should not harm game play. They tend
to be glancing collisions.

The function requires two shapes (converted to `DistanceProxy`) and two
`Sweep` structures. The sweep structure defines the initial and final
transforms of the shapes.

You can use fixed rotations to perform a *shape cast*. In this case, the
time of impact function will not miss any collisions.

## Dynamic Tree
The `DynamicTree` class is used by Planck.js to organize large numbers of
shapes efficiently. The class does not know about shapes. Instead it
operates on axis-aligned bounding boxes (AABBs) with user data pointers.

The dynamic tree is a hierarchical AABB tree. Each internal node in the
tree has two children. A leaf node is a single user AABB. The tree uses
rotations to keep the tree balanced, even in the case of degenerate
input.

The tree structure allows for efficient ray casts and region queries.
For example, you may have hundreds of shapes in your scene. You could
perform a ray cast against the scene in a brute force manner by ray
casting each shape. This would be inefficient because it does not take
advantage of shapes being spread out. Instead, you can maintain a
dynamic tree and perform ray casts against the tree. This traverses the
ray through the tree skipping large numbers of shapes.

A region query uses the tree to find all leaf AABBs that overlap a query
AABB. This is faster than a brute force approach because many shapes can
be skipped.

![Raycast](/planck.js/docs/images/raycast.svg)

![Overlap Test](/planck.js/docs/images/overlap_test.svg)

Normally you will not use the dynamic tree directly. Rather you will go
through the `World` class for ray casts and region queries. If you plan
to instantiate your own dynamic tree, you can learn how to use it by
looking at how Planck.js uses it.

## Broad-phase
Collision processing in a physics step can be divided into narrow-phase
and broad-phase. In the narrow-phase we compute contact points between
pairs of shapes. Imagine we have N shapes. Using brute force, we would
need to perform the narrow-phase for N*N/2 pairs.

The `BroadPhase` class reduces this load by using a dynamic tree for
pair management. This greatly reduces the number of narrow-phase calls.

Normally you do not interact with the broad-phase directly. Instead,
Planck.js creates and manages a broad-phase internally. Also, BroadPhase
is designed with Planck.js's simulation loop in mind, so it is likely not
suited for other use cases.
