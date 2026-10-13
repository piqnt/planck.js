// planck with its testbed in one file — the core, the GL testbed and the testbed's dependencies —
// for a script tag (`planck-with-testbed.js`, the global `planck`) or one import
// (`planck/with-testbed`). Loading it makes `Testbed.mount()` available on the core it carries.
//
// It keeps planck 1.5's testbed defaults: zoom and pan off, so the wheel scrolls the page
// (`testbed.zoomPan = true` turns them on), no auto-pause, and its background.
export * from "planck";
export { default } from "planck";
import { Testbed } from "planck";
import { mount } from "planck/testbed/testbed/mount";
import { TestbedMain } from "planck/testbed/testbed/TestbedMain";

Testbed.mount = () => mount({ zoomPan: false, autoPause: false, background: "#222222" });

/**
 * @hidden @deprecated planck 1.5's testbed class, which this file exported; use `Testbed.mount()`.
 * Typed loosely so these declarations do not name the testbed's own dependencies.
 */
export const StageTestbed: new () => unknown = TestbedMain;
