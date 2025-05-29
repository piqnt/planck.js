import { prepareTests, resultsToMarkdown, runTestAsync, TestResult, TestInterface, TestFactory } from "./benchmark";
import { box2dJsFactory } from "./tests/box2d-js";
import { planckFactory } from "./tests/planck";

export const tests: TestFactory[] = [
  box2dJsFactory,
  planckFactory,
];
  
export function getBrowserInfo() {
    const ua = navigator.userAgent;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ?? [];
    if (/trident/i.test(M[1])) {
        const tem = /\brv[ :]+(\d+)/g.exec(ua) ?? [];
        const version = tem[1] || "";
        return `IE ${version}`;
    }
    if (M[1] === "Chrome") {
        const tem = ua.match(/\bOPR|Edge\/(\d+)/);
        if (tem !== null) return `Opera ${tem[1]}`;
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    const tem = ua.match(/version\/(\d+)/i);
    if (tem !== null) M.splice(1, 1, tem[1]);

    return `${M[0]} ${M[1]}`;
}

const startButton = document.getElementById("start") as HTMLButtonElement;
const tbody = document.querySelector("tbody") as HTMLElement;
const ratioHead = document.getElementById("ratio") as HTMLElement;
const branchName = document.getElementById("branch-name") as HTMLElement;

branchName.innerHTML = [
  import.meta.env.VITE_GIT_BRANCH_NAME,
  import.meta.env.VITE_GIT_COMMIT_HASH.slice(0, 7),
  import.meta.env.VITE_GIT_COMMIT_DATE.slice(0, 19).replace("T", " "),
  '\"' + import.meta.env.VITE_GIT_LAST_COMMIT_MESSAGE + '\"',
].join("<br />");



const testRows = prepareTests(tests).map((test: TestInterface) => {
    const row = document.createElement("tr");
    tbody.appendChild(row);
    const name = document.createElement("td");
    const avg = document.createElement("td");
    const p5 = document.createElement("td");
    const p95 = document.createElement("td");
    const ratio = document.createElement("td");
    name.textContent = test.name;
    row.appendChild(name);
    row.appendChild(avg);
    row.appendChild(p5);
    row.appendChild(p95);
    row.appendChild(ratio);
    const progress = document.createElement("progress");
    return {
        row,
        test,
        begin() {
            test.setup();
            ratio.appendChild(progress);
            progress.value = 0;
        },
        progress(value: number, max: number) {
            progress.value = value;
            progress.max = max;
        },
        end(result: TestResult) {
            test.teardown();
            avg.textContent = result.avg.toFixed(2);
            p5.textContent = result.p5.toString();
            p95.textContent = result.p95.toString();
            ratio.textContent = "✓";
        },
        final(ratioValue: number) {
            ratio.textContent = ratioValue.toFixed(2);
            tbody.appendChild(row);
        },
    };
});

type TestResultAndRow = TestResult & { testRow: typeof testRows[0] };

export async function runAllTestsAsync() {
    ratioHead.textContent = "";
    const results: TestResultAndRow[] = [];
    for (const testRow of testRows) {
        testRow.begin();
        // eslint-disable-next-line no-await-in-loop
        const result = await runTestAsync(testRow.test, testRow.progress);
        testRow.end(result);
        results.push({ ...result, testRow });
    }

    results.sort((a: TestResultAndRow, b: TestResultAndRow) => a.avg - b.avg).forEach((result: TestResultAndRow) => result.testRow.final(result.avg / results[0].avg));
    startButton.removeAttribute("disabled");
    ratioHead.textContent = "Ratio";
    console.log(`Browser: ${getBrowserInfo()}\n${resultsToMarkdown(results)}`);
}

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    runAllTestsAsync();
});
