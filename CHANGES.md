## 1.1.0
* Vite build migration

## 1.0.0
* Typescript migration
* Performance improvements

## 0.2
* TypeScript definitions added
* wSet/wAdd/wSub(a, v, b, w) replaced with combine/setCombine/addCombine/subCombine(a, v, b, w)
* wSet/wAdd/wSub(a, v) replaced with mul/setMul/addMul/subMul(a, v)
* Joints constructors cleanup

## 0.1
* source code directory layout changed, classes moved around!
* b2Class renamed to Class
* Dumping is removed, Drawing is moved to tesbed
* GrowableStack replaced with native array, Timer is changed
* Math is changed and split
* Contact and Collide classes merged, Contact registration/creation is changes
* Shape.computeDistanceProxy is added
* Collision and WorldCallback files merged with others
* TestOverlap moved from Collision to Distance
* Manifold files is added, WorldManifold.Initialize moved to Manifold.getWorldManifold
* ContactFilter.ShouldCollide moved to Fixture?
* ContactSolver/VelocityConstraint/PositionConstraint merged with Contact
* ContactManager/ContactListener merged into World (and Contact)
* Island/World.Solve/SolveTOI moved to new Solver
* Position/Velocity correction objects assigned to owner bodies
* binary flags changes to boolean fields (awakeFlag, autoSleepFlag, bulletFlag, fixedRotationFlag, activeFlag, enabledFlag, islandFlag, touchingFlag, filterFlag, bulletHitFlag, toiFlag, clearForces, newFixture, locked)
* Body.Is[Type]/Set[Type] added
* Shape, Body and Joint string types ('circle', 'dynamic', 'mouse-joint', etc.)
* Vec2.Min/Max renamed to Vec2.Upper/Lower and several other methods added
* Distance method, DistanceInput/Output and SimplexCache merged into a stateful Distance class
* Fixture.Filter merged with Fixture
* World listeners changed to events: PostSolve, PreSolve, EndContact, BeginContact, SayGoodby to post-solve, pre-solve, end-contact, begin-contact, remove-body, remove-joint, remove-fixture
* Callbacks classes changed to functions: DynamicTree.query DynamicTree.rayCast BroadPhase.updatePairs BroadPhase.rayCast BroadPhase.query World.queryAAB World.rayCast