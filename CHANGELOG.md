# planck

## 1.6.0

### Minor Changes

- ce65dd2: New testbed with WebGL and polymatic
- 46aa765: Publish the library and its sources — `src`, `testbed`, `dist`, the type entry point and the changelog — rather than the whole repository.

### Patch Changes

- b93ed7e: `DataDriver` is deprecated; it was experimental, use polymatic data-binder instead.

## 1.5.1

### Patch Changes

- acbed6b: `DistanceProxy.getSupport` starts at index 0 as in Box2D, so a body whose state has become non-finite no longer makes `World.step()` throw from the time-of-impact solver.
- 6ae0fc1: `TimeOfImpact` returns `e_failed` at once when a sweep is non-finite instead of spending the whole root-finder budget on it; `Sweep.isValid()` is new.
- c48cb32: Fix duplicate contact ids in edge- and chain-vs-polygon manifolds, which let warm-start impulses grow without bound on a jammed body and made `World.step()` throw from the time-of-impact solver (#315). Simulations with such contacts may not replay bit-identically to 1.5.0.

  Fix the inverted `isValid` assertions in the math types.

## 1.5.0

### Minor Changes

- 6ede4f3: Publish add-body, add-fixture, add-joint events

### Patch Changes

- 9415379: Add fixedRotation to body serialize
- 7791ea1: Remove temp fields from distance-joint serialization
- 86c9079: Remove hasVertex0 and hasVertex3 from serialize Edge
- 4fc10a7: In polygon and chain \_deserialize use Vec2Value

## 1.4.3

### Patch Changes

- 0bba3b2: Bug fix addVec2

## 1.4.2

### Patch Changes

- 9343ffc: Fix testbed drawing

## 1.4.1

### Patch Changes

- d12d0cc: Fix shape name alias export

## 1.4.0

### Minor Changes

- 0dcc98b: Split TestbedInterface and Testbed class

### Patch Changes

- e1a2717: Mark serialize and deserialize functions as @hidden instead of @internal
- 3446820: Fix AABB.rayCast

## 1.3.0

### Minor Changes

- bb9bb87: Testbed rendering rewrite
- 56193e7: Add DataDriver (experimental for demo use-case)

### Patch Changes

- ce1c486: No pointer interaction when mouseForce===0

## 1.2.0

### Minor Changes

- f0127f4: Add world.queueUpdate() to queue and defer updates after current simulation step

### Patch Changes

- 97bb79e: Improve world.queueUpdate

## 1.1.6

### Patch Changes

- f31114b: Add static Vec2.normalize
- bee0e16: Change clampVec2 arg to Vec2Value

## 1.1.5

### Patch Changes

- fbd0021: Un-hidden style field type

---

Versions below predate this file; their notes were kept by hand in CHANGES.md, merged here.
1.0.2, 1.0.5, 1.0.6, 1.1.1, 1.1.2 and 1.1.4 were released without notes.

## 1.1.0

- Vite build migration

## 1.0.0

- Typescript migration
- Performance improvements

## 0.2

- TypeScript definitions added
- wSet/wAdd/wSub(a, v, b, w) replaced with combine/setCombine/addCombine/subCombine(a, v, b, w)
- wSet/wAdd/wSub(a, v) replaced with mul/setMul/addMul/subMul(a, v)
- Joints constructors cleanup

## 0.1

- source code directory layout changed, classes moved around!
- b2Class renamed to Class
- Dumping is removed, Drawing is moved to tesbed
- GrowableStack replaced with native array, Timer is changed
- Math is changed and split
- Contact and Collide classes merged, Contact registration/creation is changes
- Shape.computeDistanceProxy is added
- Collision and WorldCallback files merged with others
- TestOverlap moved from Collision to Distance
- Manifold files is added, WorldManifold.Initialize moved to Manifold.getWorldManifold
- ContactFilter.ShouldCollide moved to Fixture?
- ContactSolver/VelocityConstraint/PositionConstraint merged with Contact
- ContactManager/ContactListener merged into World (and Contact)
- Island/World.Solve/SolveTOI moved to new Solver
- Position/Velocity correction objects assigned to owner bodies
- binary flags changes to boolean fields (awakeFlag, autoSleepFlag, bulletFlag, fixedRotationFlag, activeFlag, enabledFlag, islandFlag, touchingFlag, filterFlag, bulletHitFlag, toiFlag, clearForces, newFixture, locked)
- Body.Is[Type]/Set[Type] added
- Shape, Body and Joint string types ('circle', 'dynamic', 'mouse-joint', etc.)
- Vec2.Min/Max renamed to Vec2.Upper/Lower and several other methods added
- Distance method, DistanceInput/Output and SimplexCache merged into a stateful Distance class
- Fixture.Filter merged with Fixture
- World listeners changed to events: PostSolve, PreSolve, EndContact, BeginContact, SayGoodby to post-solve, pre-solve, end-contact, begin-contact, remove-body, remove-joint, remove-fixture
- Callbacks classes changed to functions: DynamicTree.query DynamicTree.rayCast BroadPhase.updatePairs BroadPhase.rayCast BroadPhase.query World.queryAAB World.rayCast
