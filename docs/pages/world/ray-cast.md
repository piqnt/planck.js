
## Ray Casts
You can use ray casts to do line-of-sight checks, fire guns, etc. You
perform a ray cast by implementing a callback class and providing the
start and end points. The world class calls your class with each fixture
hit by the ray. Your callback is provided with the fixture, the point of
intersection, the unit normal vector, and the fractional distance along
the ray. You cannot make any assumptions about the order of the
callbacks.

You control the continuation of the ray cast by returning a fraction.
Returning a fraction of zero indicates the ray cast should be
terminated. A fraction of one indicates the ray cast should continue as
if no hit occurred. If you return the fraction from the argument list,
the ray will be clipped to the current intersection point. So you can
ray cast any shape, ray cast all shapes, or ray cast the closest shape
by returning the appropriate fraction.

You may also return of fraction of -1 to filter the fixture. Then the
ray cast will proceed as if the fixture does not exist.

Here is an example:

```js
// This class captures the closest hit shape.
let closest = null;

myWorld.rayCast(Vec2(-1, 0), Vec2(3, 1), function(fixture, point, normal, fraction) {
  closest = {
    fixture: fixture,
    point: point, // Vec2
    normal: normal, // Vec2
    fraction: fraction, // number
  }

  // By returning the current fraction, we instruct the calling code to clip the ray and
  // continue the ray-cast to the next fixture. WARNING: do not assume that fixtures
  // are reported in order. However, by clipping, we can always get the closest fixture.
  return fraction;
});
```

> **Caution**:
> Due to round-off errors, ray casts can sneak through small cracks
> between polygons in your static environment. If this is not acceptable
> in your application, try slightly overlapping your polygons.
