// planck/testbed: the GL testbed as a module, sharing the host's planck; polymatic and
// @preact/signals-core are bundled in. Loading it makes Testbed.mount() work on planck's Testbed.
//
// Public: Testbed, TestbedInterface; testbedDefaults for a host to seed before a project runs;
// mount for a game composing its own polymatic middleware; mountTestbed and runtime for a host.
// Everything else here is internal — for the shell and this repo's examples — absent from the
// published declarations (see api.ts) and liable to change.
export * from "./common/globals";

export * from "./common/Key";
export * from "./common/Label";
export * from "./common/FindLabel";
export * from "./common/FindKey";
export * from "./common/Selection";

export * from "./testbed/TestbedInterface";
export * from "./testbed/Testbed";
export * from "./testbed/testbedDefaults";
export * from "./testbed/mount";
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
