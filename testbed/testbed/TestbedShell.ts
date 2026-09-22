import { ZoomPanProvider } from "./ZoomPanProvider";
import { TestbedMain } from "./TestbedMain";

/** Testbed with preset middleware and extended for examples shell */
export class TestbedShell extends TestbedMain {
  constructor() {
    super();
    this.use(new ZoomPanProvider());
  }
}
