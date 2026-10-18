// What planck/testbed publishes in its declarations (dist/testbed.d.ts): the API users, games and
// hosts may rely on. The module (index.ts) exports more, for the testbed shell and this repo's
// examples; those exports are internal, untyped for consumers, and may change in any release.
//
// This file is only read to generate the declarations; the bundle is built from index.ts.

import { type Middleware } from "polymatic";
import { type World } from "planck";

import { mountTestbed as mountTestbedImpl } from "./testbed/Testbed";
import { initTestbedContext as initTestbedContextImpl } from "./testbed/TestbedContext";
import { TestbedMain as TestbedMainImpl } from "./testbed/TestbedMain";
import { runtime as runtimeImpl } from "./common/globals";
import { testbedDefaults as testbedDefaultsImpl, type TestbedDefaults } from "./testbed/testbedDefaults";
import { type ActiveKeys, type TestbedInterface } from "./testbed/TestbedInterface";

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

/**
 * For games: the testbed's own state, as a game's middleware sees it beside its own. The context
 * carries more; these are the parts a game is meant to read and set.
 */
export interface TestbedContext {
  /** the world the testbed draws and steps; a game sets its own */
  world: HostValue<World>;
  /** the view, in world units */
  camera: { x: number; y: number; width: number; height: number };
  /** the force the pointer applies; negative is an impulse on release */
  mouseForce: HostValue<number>;
  /** "interact-pull", "interact-impulse", "inspect", or a tool a game registers */
  activeTool: HostValue<{ name: string }>;
  /** left/right/up/down (arrows or WASD), fire (space or enter), and characters */
  activeKeys: ActiveKeys;
}

/**
 * For games: the testbed as a middleware, to `use()` inside a stack of your own. Activate that
 * stack yourself with polymatic's `Runtime.activate(main, context)`; the testbed registers
 * itself as it activates, so the shell and a host find it.
 *
 * `emit("tool-switch", { name, mouseForce })` picks what the pointer does: "interact-pull",
 * "interact-impulse" (a negative mouseForce throws on release) or "inspect".
 */
export const TestbedMain: new () => Middleware<TestbedContext> = TestbedMainImpl;

/** For games: the testbed's context, with your own state on it. */
export const initTestbedContext: <C extends object>(state?: C) => TestbedContext & C = initTestbedContextImpl;

/**
 * For hosts: what to decide before running a project's code — the page you are making, read
 * once when the testbed mounts. The project's own settings run afterwards and win. To drive a
 * testbed that is already running, use `runtime` instead.
 */
export const testbedDefaults: Partial<TestbedDefaults> = testbedDefaultsImpl;
export type { TestbedDefaults };

/** For hosts: mounts the testbed once, as Testbed.mount() does, and returns it. */
export const mountTestbed: () => TestbedInterface = mountTestbedImpl;

/** For hosts: see TestbedRuntime. */
export const runtime: TestbedRuntime = runtimeImpl;
