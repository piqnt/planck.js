
## AABB Queries
Sometimes you want to determine all the shapes in a region. The World
class has a fast O(log N) method for this using the broad-phase data
structure. You provide an AABB in world coordinates and an
implementation of `QueryCallback`. The world calls your class with each
fixture whose AABB overlaps the query AABB. Return `true` to continue the
query, otherwise return `false`. For example, the following code finds all
the fixtures that potentially intersect a specified AABB and wakes up
all of the associated bodies.

```js
const query = new AABB(
  new Vec2(-1, -1),
  new Vec2(1, 1),
);
myWorld.queryAABB(query, function(fixture) {
  let body = fixture.getBody();
  body.setAwake(true);
  // Return true to continue the query.
  return true;
});
```

You cannot make any assumptions about the order of the callbacks.
