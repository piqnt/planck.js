---
"planck": patch
---

`TimeOfImpact` returns `e_failed` at once when a sweep is non-finite instead of spending the whole root-finder budget on it; `Sweep.isValid()` is new.
