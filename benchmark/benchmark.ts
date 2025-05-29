export interface TestInterface {
    name: string;
    createBoxShape: (hx: number, hy: number) => any;
    createBoxBody: (shape: any, x: number, y: number, density: number) => any;
    step: (timeStep: number, velocityIterations: number, positionIterations: number) => void;
    setup: () => void;
    teardown: () => void;
}

export interface XY {
    x: number;
    y: number;
}

export type TestFactory = (gravity: XY, edgeV1: XY, edgeV2: XY, edgeDensity: number) => TestInterface;

const PYRAMID_SIZE = 40;
const GRAVITY = { x: 0, y: -10 };
const DELTA_X = { x: 0.5625, y: 1 };
const DELTA_Y = { x: 1.125, y: 0 };
const BOX_DENSITY = 5;
const GROUND_DENSITY = 0;
const TIME_STEP = 1 / 60;
const VELOCITY_ITERATIONS = 3;
const POSITION_ITERATIONS = 3;
const EDGE_V1 = { x: -40, y: 0 };
const EDGE_V2 = { x: 40, y: 0 };
const START_X = { x: -7, y: 0.75 };
const BOX_SIZE = { x: 0.5, y: 0.5 };
const WARMUP_ITERATIONS = 64;
const BENCH_ITERATIONS = 256;

function setupWorld(test: TestInterface) {
    // Setup world
    const shape = test.createBoxShape(BOX_SIZE.x, BOX_SIZE.y);
    const x = { ...START_X };

    for (let i = 0; i < PYRAMID_SIZE; ++i) {
        const y = { ...x };

        for (let j = i; j < PYRAMID_SIZE; ++j) {
            test.createBoxBody(shape, y.x, y.y, BOX_DENSITY);
            y.x += DELTA_Y.x;
            y.y += DELTA_Y.y;
        }

        x.x += DELTA_X.x;
        x.y += DELTA_X.y;
    }
}

export type ProgressFunc = (value: number, max: number) => void;

async function warmupAsync(test: TestInterface, progress: ProgressFunc): Promise<void> {
    return new Promise<void>((resolve: (value: void) => void) => {
        let step = 0;
        progress(0, WARMUP_ITERATIONS + BENCH_ITERATIONS);
        const runNext = () => {
            if (step < WARMUP_ITERATIONS) {
                test.step(TIME_STEP, VELOCITY_ITERATIONS, POSITION_ITERATIONS);
                progress(step, WARMUP_ITERATIONS + BENCH_ITERATIONS);
                step++;
                window.requestAnimationFrame(runNext);
            } else {
                resolve();
            }
        };
        window.requestAnimationFrame(runNext);
    });
}

async function benchAsync(test: TestInterface, progress: ProgressFunc): Promise<number[]> {
    return new Promise((resolve: (value: number[]) => void) => {
        let step = 0;
        progress(0, WARMUP_ITERATIONS + BENCH_ITERATIONS);
        const times: number[] = [];
        const runNext = () => {
            if (step < BENCH_ITERATIONS) {
                const begin = performance.now();
                test.step(TIME_STEP, VELOCITY_ITERATIONS, POSITION_ITERATIONS);
                times.push(performance.now() - begin);
                progress(WARMUP_ITERATIONS + step, WARMUP_ITERATIONS + BENCH_ITERATIONS);
                step++;
                window.requestAnimationFrame(runNext);
            } else {
                resolve(times);
            }
        };
        window.requestAnimationFrame(runNext);
    });
}

function warmup(test: TestInterface) {
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
        test.step(TIME_STEP, VELOCITY_ITERATIONS, POSITION_ITERATIONS);
    }
}

function bench(test: TestInterface) {
    const times: number[] = [];
    for (let i = 0; i < BENCH_ITERATIONS; i++) {
        const begin = performance.now();
        test.step(TIME_STEP, VELOCITY_ITERATIONS, POSITION_ITERATIONS);
        times.push(performance.now() - begin);
    }
    return times.sort();
}

function mean(values: number[]) {
    let total = 0;
    for (const value of values) total += value;
    return total / BENCH_ITERATIONS;
}

// Simple nearest-rank %ile (on sorted array). We should have enough samples to make this reasonable.
function percentile(values: number[], pc: number) {
    const rank = Math.floor((pc * values.length) / 100);
    return values[rank];
}

export function prepareTests(factories: TestFactory[]) {
    return factories.map((factory: TestFactory) => factory(GRAVITY, EDGE_V1, EDGE_V2, GROUND_DENSITY));
}

export function runTest(test: TestInterface) {
    setupWorld(test);

    warmup(test);

    const times = bench(test);
    return {
        name: test.name,
        avg: mean(times),
        p5: percentile(times, 5),
        p95: percentile(times, 95),
    };
}

export async function runTestAsync(test: TestInterface, progress: ProgressFunc) {
    setupWorld(test);

    await warmupAsync(test, progress);

    const times = await benchAsync(test, progress);
    return {
        name: test.name,
        avg: mean(times),
        p5: percentile(times, 5),
        p95: percentile(times, 95),
    };
}

export type TestResult = ReturnType<typeof runTest>;

export function runAllTests(factories: TestFactory[]) {
    const tests = prepareTests(factories);
    const results: TestResult[] = [];

    console.log("Running Benchmarks:");
    for (const test of tests) {
        const result = runTest(test);
        results.push(result);
        console.log(` ✓ ${result.name}`);
    }

    return results.sort((a: TestResult, b: TestResult) => a.avg - b.avg);
}

const noop = () => undefined;

export async function runAllTestsAsync(factories: TestFactory[]) {
    const tests = prepareTests(factories);
    console.log("Running Benchmarks:");
    const results: TestResult[] = [];
    for (const test of tests) {
        // eslint-disable-next-line no-await-in-loop
        const result = await runTestAsync(test, noop);
        console.log(` ✓ ${result.name}`);
        results.push(result);
    }

    return results.sort((a: TestResult, b: TestResult) => a.avg - b.avg);
}

export function resultsToMarkdown(results: TestResult[]) {
    const header = ["Name", "avg ms/frame", "5th %ile", "95th %ile", "Ratio"];
    const rows = results.map((r: TestResult) => [
        r.name,
        r.avg.toFixed(2),
        r.p5.toString(),
        r.p95.toString(),
        (r.avg / results[0].avg).toFixed(2),
    ]);
    const lengths = header.map((label: string, index: number) =>
        Math.max(label.length, ...rows.map((columns: string[]) => columns[index].length)),
    );

    function getDashes(length: number) {
        return "-".repeat(length);
    }
    const dashes = `| ${lengths.map(getDashes).join(" | ")} |`;

    const lines: string[] = [];
    lines.push(`| ${header.map(pad).join(" | ")} |`);
    lines.push(dashes);

    function pad(value: string, index: number) {
        const length = lengths[index];
        if (value.length < length) {
            if (index > 0) return " ".repeat(length - value.length) + value;
            return value + " ".repeat(length - value.length);
        }
        return value;
    }

    for (const row of rows) {
        lines.push(`| ${row.map(pad).join(" | ")} |`);
    }
    return lines.join("\n");
}

export function logResults(results: TestResult[]) {
    console.log("\nResults:");
    console.log(resultsToMarkdown(results));
}
