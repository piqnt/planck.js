---
"planck": patch
---

`DistanceProxy.getSupport` starts at index 0 as in Box2D, so a body whose state has become non-finite no longer makes `World.step()` throw from the time-of-impact solver.
