import { Runtime } from "polymatic";

import { DefaultTestbedContext } from "./TestbedContext";
import { TestbedMain } from "./TestbedMain";
import { Testbed } from "../";
import { TestbedInstance } from "./Testbed";

Testbed.mount = () => {
  const main = new TestbedMain();
  const context = new DefaultTestbedContext();
  // for debugging
  window["runtime"] = main;
  context.testbed = new TestbedInstance(main);
  Runtime.activate(main, context);
  main.emit("tool-switch", { name: "interact-pull" });
  return context.testbed;
};
