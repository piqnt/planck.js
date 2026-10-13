import { Testbed } from "planck";
import { mount } from "./mount";
import { TestbedMain } from "./TestbedMain";

/**
 * Mounts the testbed, with zoom and pan on (wheel, pinch, and dragging where no tool holds the
 * pointer; `testbed.zoomPan = false` turns them off). `Testbed.mount()` and
 * `Testbed.start(world)` on planck's own Testbed class do this once `planck/testbed` is loaded.
 */
export const mountTestbed = (): TestbedMain => mount();

Testbed.mount = mountTestbed;

export { Testbed };
