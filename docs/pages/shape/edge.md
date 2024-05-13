
## Edge Shapes
Edge shapes are line segments. These are provided to assist in making a
free-form static environment for your game. A major limitation of edge
shapes is that they can collide with circles and polygons but not with
themselves. The collision algorithms used by Planck.js require that at least
one of two colliding shapes have volume. Edge shapes have no volume, so
edge-edge collision is not possible.

```js
// This is an edge shape.
let edge = new Edge(new Vec2(0, 0), new Vec2(1, 0));
```

In many cases a game environment is constructed by connecting several
edge shapes end-to-end. This can give rise to an unexpected artifact
when a polygon slides along the chain of edges. In the figure below we
see a box colliding with an internal vertex. These *ghost* collisions
are caused when the polygon collides with an internal vertex generating
an internal collision normal.

![Ghost Collision](/planck.js/docs/images/ghost_collision.svg)

If edge1 did not exist this collision would seem fine. With edge1
present, the internal collision seems like a bug. But normally when
Planck.js collides two shapes, it views them in isolation.

Fortunately, the edge shape provides a mechanism for eliminating ghost
collisions by storing the adjacent *ghost* vertices. Planck.js uses these
ghost vertices to prevent internal collisions.

![Ghost Vertices](/planck.js/docs/images/ghost_vertices.svg)

```js
// This is an edge shape with ghost vertices.
let v0 = Vec2(1.7, 0);
let v1 = Vec2(1, 0.25);
let v2 = Vec2(0, 0);
let v3 = Vec2(-1.7, 0.4);

let edge = new Edge(v1, v2).setPrevVertex(v0).setNextVertex(v3);
```

In general stitching edges together this way is a bit wasteful and
tedious. This brings us to chain shapes.
