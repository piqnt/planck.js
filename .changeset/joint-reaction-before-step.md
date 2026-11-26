---
"planck": patch
---

`getReactionForce()` and `getReactionTorque()` on `DistanceJoint`, `RopeJoint`, `PulleyJoint` and `GearJoint` now return zero before the first world step instead of throwing.
