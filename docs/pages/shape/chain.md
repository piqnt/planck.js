
## Chain Shapes

The chain shape provides an efficient way to connect many edges together
to construct your static game worlds. Chain shapes automatically
eliminate ghost collisions and provide two-sided collision.

![Chain Shape](/planck.js/docs/images/chain_shape.svg)

```js
// This is a chain shape with isolated vertices
let vs = [
  Vec2(1.7, 0),
  Vec2(1, 0.25),
  Vec2(0, 0),
  Vec2(-1.7, 0.4)
];

let chain = new Chain(vs);
```

You may have a scrolling game world and would like to connect several
chains together. You can connect chains together using ghost vertices,
like we did with EdgeShape.

```js
// Install ghost vertices
chain.setPrevVertex(Vec2(3, 1));
chain.setNextVertex(Vec2(-2, 0));
```

You may also create loops automatically.

```js
// Create a loop. The first and last vertices are connected.
let chain = new Chain(vs, true);
```

Self-intersection of chain shapes is not supported. It might work, it
might not. The code that prevents ghost collisions assumes there are no
self-intersections of the chain. Also, very close vertices can cause
problems. Make sure all your edges are longer than Settings.linearSlop (5mm).

![Self Intersection](/planck.js/docs/images/self_intersect.svg)

Each edge in the chain is treated as a child shape and can be accessed
by index. When a chain shape is connected to a body, each edge gets its
own bounding box in the broad-phase collision tree.

```js
// Visit each child edge.
for (let i = 0; i < chain.getChildCount(); ++i) {
  let edge = new Edge();
  chain.getChildEdge(edge, i);
}
```
