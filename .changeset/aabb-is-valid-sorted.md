---
"planck": patch
---

`AABB.isValid()` now returns false when the bounds are not sorted (`lowerBound` above or right of `upperBound`), as documented. Before, the check `lengthSquared() >= 0` was always true.
