
## Polygon Shapes
Polygon shapes are solid convex polygons. A polygon is convex when all
line segments connecting two points in the interior do not cross any
edge of the polygon. Polygons are solid and never hollow. A polygon must
have 3 or more vertices.

![Convex and Concave Polygons](/planck.js/docs/images/convex_concave.gif)

Polygon vertices are stored with a counter-clockwise winding (CCW). We
must be careful because the notion of CCW is with respect to a
right-handed coordinate system with the z-axis pointing out of the
plane. This might turn out to be clockwise on your screen, depending on
your coordinate system conventions.

![Polygon Winding Order](/planck.js/docs/images/winding.svg)

The initialization functions create normal vectors and perform validation. 
So you should use initialization functions to create a polygon.

You can create a polygon shape by passing in a vertex array. The maximal
size of the array is controlled by `Setting.MaxPolygonVertices` which has a
default value of 8. This is sufficient to describe most convex polygons.

The `PolygonShape.set` function automatically computes the convex hull
and establishes the proper winding order. This function is fast when the
number of vertices is low. If you increase `MaxPolygonVertices`, then
the convex hull computation might become slow. Also note that the convex
hull function may eliminate and/or re-order the points you provide.
Vertices that are closer than `Settings.linearSlop` may be merged.

```js
// This defines a triangle in CCW order.
let vertices = [
  Vec2(0, 0),
  Vec2(1, 0),
  Vec2(0, 1)
];

let polygon = new Polygon(vertices);
```

The polygon shape has some convenience functions to create boxes.

```js
new Box(halfWidth, halfHeight);
new Box(halfWidth, halfHeight, center, angle);
```

`center` is the local position of the center of the box shape, and `angle` is its rotation. When not provided, center and angle of the box are `{x: 0, y: 0}` and `0` (relative to the body's origin and angle).

Polygons inherit a radius from Shape. The radius creates a skin around
the polygon. The skin is used in stacking scenarios to keep polygons
slightly separated. This allows continuous collision to work against the
core polygon.

![Polygon Skin](/planck.js/docs/images/skinned_polygon.svg)

The polygon skin helps prevent tunneling by keeping the polygons
separated. This results in small gaps between the shapes. Your visual
representation can be larger than the polygon to hide any gaps.

![Skin Collision](/planck.js/docs/images/skin_collision.svg)
