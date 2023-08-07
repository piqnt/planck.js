import type { TestFactory } from "../benchmark";

import { planckFactory } from "./planck";
import { box2dJsFactory } from "./box2d-js";

export const tests: TestFactory[] = [
  planckFactory,
  box2dJsFactory,
];
