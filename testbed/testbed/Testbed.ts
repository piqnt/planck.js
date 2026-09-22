import { Runtime } from "polymatic";

import { Testbed } from "planck";
import { initTestbedContext } from "./TestbedContext";
import { TestbedMain } from "./TestbedMain";
import { runtime } from "../common/globals";

/**
 * Mounts the testbed. `Testbed.mount()` and `Testbed.start(world)` on planck's own Testbed class
 * do this once `planck/testbed` is loaded.
 */
export const mountTestbed = (): TestbedMain => {
  // activate once, only if user calls Testbed.mount()
  if (runtime.value) return runtime.value.middleware as TestbedMain;

  const main = new TestbedMain();
  const context = initTestbedContext();

  context.activeTool.value = { name: "interact-pull" };

  runtime.value = {
    middleware: main,
    context: context,
    emit: main.emit.bind(main),
  };
  window["runtime"] = main; // for debugging
  Runtime.activate(main, context);

  return main;
};

Testbed.mount = mountTestbed;

export { Testbed };
