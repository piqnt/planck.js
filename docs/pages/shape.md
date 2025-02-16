
## Shape

Shapes describe collision geometry and may be used independently of
physics simulation. At a minimum, you should understand how to create
shapes that can be later attached to rigid bodies.

Planck.js shapes implement the Shape base class. The base class defines
functions to:
- Test a point for overlap with the shape.
- Perform a ray cast against the shape.
- Compute the shape's AABB.
- Compute the mass properties of the shape.

In addition, each shape has a type member and a radius. The radius even
applies to polygons, as discussed below.

Keep in mind that a shape does not know about bodies and stand apart
from the dynamics system. In Planck.js shapes are considered immutable.
When a shape is attached to a body using a fixture, the
shapes move rigidly with the host body. In summary:
- When a shape is **not** attached to a body, you can view its vertices as being expressed in world-space.
- When a shape is attached to a body, you can view its vertices as being expressed in local coordinates.

### Geometric Queries

You can perform a couple geometric queries on a single shape.

#### Shape Point Test

You can test a point for overlap with a shape. You provide a transform
for the shape and a world point.

```js
let transform = Transform.identity();
let point = Vec2(5, 2);

let hit = shape.testPoint(transform, point);
```

Edge and chain shapes always return false, even if the chain is a loop.

#### Shape Ray Cast

You can cast a ray at a shape to get the point of first intersection and normal
vector. A child index is included for chain shapes because the ray cast will 
only check a single edge at a time.

> **Caution**:
> No hit will register if the ray starts inside a convex shape like a circle or
> polygon. This is consistent with Planck.js treating convex shapes as solid. 
>

```js
let transform = Transform.identity();

let input = {}; // RayCastInput
input.p1 = Vec2(0, 0);
input.p2 = Vec2(1, 0);
input.maxFraction = 1;
let childIndex = 0;

let output = {}; // RayCastOutput
let hit = shape.RayCast(output, input, transform, childIndex);

if (hit) {
  let hitPoint = Vec2.add(
    Vec2.mul(1 - output.fraction, input.p1),
    Vec2.mul(output.fraction, input.p2)
  );
}
```

#### Pairwise Functions

The Collision module contains functions that take a pair of shapes and compute some results. These include:
- Overlap
- Contact manifolds
- Distance
- Time of impact

#### Overlap

You can test two shapes for overlap using this function:

```js
Transform xfA = ..., xfB = ...;
bool overlap = TestOverlap(shapeA, indexA, shapeB, indexB, xfA, xfB);
```

Again you must provide child indices for the case of chain shapes.
