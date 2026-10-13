// What planck/testbed publishes in its declarations (dist/testbed.d.ts): the API users and hosts
// may rely on. The module (index.ts) exports more, for the testbed shell and this repo's examples;
// those exports are internal, untyped for consumers, and may change in any release.
//
// This file is only read to generate the declarations; the bundle is built from index.ts.

import { mountTestbed as mountTestbedImpl } from "./testbed/Testbed";
import { runtime as runtimeImpl } from "./common/globals";
import { type TestbedInterface } from "./testbed/TestbedInterface";

// For users: `import { Testbed } from "planck/testbed"`, or the bare import for scripts that use
// planck's own Testbed (loading this module makes Testbed.mount() work on it).
export { Testbed } from "./testbed/Testbed";
export type {
  TestbedInterface,
  ActiveKeys,
  Style,
  StepEvent,
  StepCallback,
  FrameCallback,
  KeydownCallback,
  KeyupCallback,
} from "./testbed/TestbedInterface";

/** a value a host reads and sets; the testbed's own signal underneath */
export interface HostValue<T> {
  value: T;
}

/** The parts of the mounted testbed's state a host such as piqnt drives. */
export interface HostContext {
  activity: HostValue<string>;
  paused: HostValue<boolean>;
  showOutline: HostValue<boolean>;
  showToolbar: HostValue<boolean>;
  simulation: { speed: number };
}

/**
 * For hosts: the mounted testbed, undefined until it mounts. Read and set it through `.value`,
 * and watch for the mount with `.subscribe()`. Its signals are the testbed's own copy of
 * @preact/signals-core, bundled in this module, so a host's own `effect()` does not track them.
 */
export interface TestbedRuntime {
  readonly value: { context: HostContext } | undefined;
  subscribe(listener: (value: { context: HostContext } | undefined) => void): () => void;
}

/** For hosts: mounts the testbed once, as Testbed.mount() does, and returns it. */
export const mountTestbed: () => TestbedInterface = mountTestbedImpl;

/** For hosts: see TestbedRuntime. */
export const runtime: TestbedRuntime = runtimeImpl;
