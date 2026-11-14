---
"planck": patch
---

`PolygonShape` stops the hull wrap after as many steps as there are input points and falls back to a box, so a hull that fails to close can no longer hang or throw `RangeError` in production builds.
