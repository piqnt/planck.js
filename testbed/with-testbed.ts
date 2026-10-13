// planck with its testbed in one file — the core, the GL testbed and the testbed's dependencies —
// for a script tag (`planck-with-testbed.js`, the global `planck`) or one import
// (`planck/with-testbed`). Loading it makes `Testbed.mount()` available on the core it carries.
//
// Its testbed starts with zoom and pan off, so the wheel scrolls the page as it did with the
// stage-js testbed; `testbed.zoomPan = true` turns them on.
export * from "planck";
import { Testbed } from "planck";
import { mount } from "planck/testbed/testbed/mount";

Testbed.mount = () => mount({ zoomPan: false });
