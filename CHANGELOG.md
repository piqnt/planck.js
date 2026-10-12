# planck

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
