import { Runtime } from "polymatic";

import { initTestbedContext } from "./TestbedContext";
import { TestbedMain } from "./TestbedMain";
import { runtime } from "../common/globals";

export interface MountOptions {
  /** zoom with the wheel or a pinch, pan by dragging empty space; default true */
  zoomPan?: boolean;
}

/**
 * Activates the testbed, once: a later call returns the first. Each entry passes its defaults —
 * `planck/testbed` zooms and pans, `planck-with-testbed` starts with that off.
 */
export const mount = (options: MountOptions = {}): TestbedMain => {
  // activate once, only if user calls Testbed.mount()
  if (runtime.value) return runtime.value.middleware as TestbedMain;

  const main = new TestbedMain();
  const context = initTestbedContext();

  context.activeTool.value = { name: "interact-pull" };
  context.zoomPan.value = options.zoomPan ?? true;

  runtime.value = {
    middleware: main,
    context: context,
    emit: main.emit.bind(main),
  };
  window["runtime"] = main; // for debugging
  Runtime.activate(main, context);

  return main;
};
