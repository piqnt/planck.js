---
"planck": patch
---

`PolygonShape` no longer hangs and throws `RangeError` when a vertex lies on an edge and the collinear test gets round-off sized cross products.
