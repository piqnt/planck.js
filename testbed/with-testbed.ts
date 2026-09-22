// planck with its testbed in one file — the core, the GL testbed and the testbed's dependencies —
// for a script tag (`planck-with-testbed.js`, the global `planck`) or one import
// (`planck/with-testbed`). Loading it makes `Testbed.mount()` available on the core it carries.
export * from "planck";
import "planck/testbed";
