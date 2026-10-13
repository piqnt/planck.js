// planck/testbed: the GL testbed as a module, sharing the host's planck; polymatic and
// @preact/signals-core are bundled in. Loading it makes Testbed.mount() work on planck's Testbed.
//
// Public (users): Testbed, TestbedInterface. For hosts such as piqnt: mountTestbed, runtime.
// Everything else exported here is internal — for the host's shell (planck/testbed-shell), the whole shell and
// this repo's examples — absent from the published declarations (see api.ts) and liable to change.
//
// Games and apps that compose their own polymatic middleware stack instead of calling
// Testbed.mount() register `runtime.value = { middleware, context, emit }` before Runtime.activate.
export * from "./common/globals";

export * from "./common/Key";
export * from "./common/Label";
export * from "./common/FindLabel";
export * from "./common/FindKey";
export * from "./common/Selection";

export * from "./testbed/TestbedInterface";
export * from "./testbed/Testbed";
export * from "./testbed/TestbedMain";
export * from "./testbed/TestbedContext";

export { DrawWorld } from "./world-view/DrawWorld";
export * from "./world-view/DrawBounds";
export * from "./world-view/DrawBodyInfo";
export * from "./world-view/DrawJoints";
export * from "./world-view/DrawContacts";

export * from "./world-view/WorldStep";

export * from "./world-view/WorldKeys";

export * from "./world-view/WorldQuery";

export * from "./world-inspect/InspectTool";
export * from "./world-inspect/SelectionManager";

export * from "./gl/TextOverlay";

/**
 * @internal the testbed's bundled @preact/signals-core, for planck/testbed-shell: its effects
 * must use the very copy that made the testbed's signals
 */
export * as signalsCore from "@preact/signals-core";
