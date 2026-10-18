import { Runtime } from "polymatic";

import { initTestbedContext } from "./TestbedContext";
import { TestbedMain } from "./TestbedMain";
import { runtime } from "../common/globals";

/** Activates the testbed, once: a later call returns the first. */
export const mount = (): TestbedMain => {
  // activate once, only if user calls Testbed.mount()
  if (runtime.value) return runtime.value.middleware as TestbedMain;

  const main = new TestbedMain();
  const context = initTestbedContext();

  // TestbedMain registers itself as it activates, as it does in a game's own stack
  Runtime.activate(main, context);

  return main;
};
