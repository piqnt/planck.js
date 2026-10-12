---
"planck": patch
---

Fix duplicate contact ids in edge- and chain-vs-polygon manifolds, which let warm-start impulses grow without bound on a jammed body and made `World.step()` throw from the time-of-impact solver (#315). Simulations with such contacts may not replay bit-identically to 1.5.0.

Fix the inverted `isValid` assertions in the math types.
