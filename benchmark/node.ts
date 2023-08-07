import { performance } from "perf_hooks";
global.performance = performance as any;

import { logResults, runAllTests } from "./benchmark";
import { tests } from "./tests";

const results = runAllTests(tests);
logResults(results);
