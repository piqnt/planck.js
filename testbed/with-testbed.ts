// planck with its testbed in one file — the core, the GL testbed and the testbed's dependencies —
// for a script tag (`planck-with-testbed.js`, the global `planck`) or one import
// (`planck/with-testbed`). Loading it makes `Testbed.mount()` available on the core it carries.
//
// It renders no shell, so zoom and pan stay off and the wheel scrolls the page, as in planck 1.5
// (`testbed.zoomPan = true` turns them on).
export * from "planck";
export { default } from "planck";
import "planck/testbed";
import { TestbedMain } from "planck/testbed/testbed/TestbedMain";

/**
 * @hidden @deprecated planck 1.5's testbed class, which this file exported; use `Testbed.mount()`.
 * Typed loosely so these declarations do not name the testbed's own dependencies.
 */
export const StageTestbed: new () => unknown = TestbedMain;
