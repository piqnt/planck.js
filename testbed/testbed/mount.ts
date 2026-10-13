import { Runtime } from "polymatic";

import { initTestbedContext } from "./TestbedContext";
import { TestbedMain } from "./TestbedMain";
import { runtime } from "../common/globals";

export interface MountOptions {
  /** zoom with the wheel or a pinch, pan by dragging empty space; default true */
  zoomPan?: boolean;
  /** pause after 15 seconds without user input; default false, as in planck 1.5 */
  autoPause?: boolean;
  /** the view's background color; default the context's */
  background?: string;
}

/**
 * Activates the testbed, once: a later call returns the first. Each entry passes its defaults —
 * `planck/testbed` zooms and pans, `planck-with-testbed` keeps planck 1.5's testbed defaults.
 */
export const mount = (options: MountOptions = {}): TestbedMain => {
  // activate once, only if user calls Testbed.mount()
  if (runtime.value) return runtime.value.middleware as TestbedMain;

  const main = new TestbedMain();
  const context = initTestbedContext();

  context.zoomPan.value = options.zoomPan ?? true;
  context.autoPause.value = options.autoPause ?? false;
  if (options.background) context.style.background = options.background;

  runtime.value = {
    middleware: main,
    context: context,
    emit: main.emit.bind(main),
  };
  window["runtime"] = main; // for debugging
  Runtime.activate(main, context);

  return main;
};
