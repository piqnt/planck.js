import { performance } from "perf_hooks";
global.performance = performance as any;

import { logResults, runAllTests } from "./benchmark";
import type { TestFactory } from "./benchmark";
import { planckFactory } from "./tests/planck";

export const tests: TestFactory[] = [
  planckFactory,
];

const results = runAllTests(tests);
logResults(results);
