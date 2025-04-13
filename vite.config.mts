import { execSync } from "child_process";
import path from "path";
import { defineConfig, normalizePath, type ConfigEnv, type Plugin } from "vite";
import dtsBundleGenerator from "vite-plugin-dts-bundle-generator";
import typescript from "vite-plugin-typescript";
import rollupLicensePlugin from "rollup-plugin-license";

export default function viteConfig(configEnv: ConfigEnv) {
  const isServe = configEnv.command === "serve";
  if (isServe) {
    return serveConfig(configEnv);
  }
  const buildTestbed = process.env.BUILD_TESTBED === "true";
  return buildConfig(configEnv, buildTestbed);
}

function buildConfig(configEnv: ConfigEnv, buildTestbed: boolean) {
  const filename = buildTestbed ? "planck-with-testbed" : "planck";
  const entry = normalizePath(path.resolve(__dirname, buildTestbed ? "testbed" : "src", "main.ts"));

  return defineConfig({
    define: {
      ASSERT: "false",
      _ASSERT: "false",
      CONSTRUCTOR_FACTORY: "true",
      _CONSTRUCTOR_FACTORY: "true",
    },
    build: {
      lib: {
        entry: entry,
        name: "planck",
        fileName: function (format) {
          if (format === "umd") {
            return filename + ".js";
          } else if (format === "es") {
            return filename + ".mjs";
          }
          return filename + "." + format + ".js";
        },
        formats: ["es", "umd"],
      },
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
    },
    plugins: [
      rollupLicensePlugin({
        banner: getLicense(),
      }) as Plugin,
      typescript({}),
      dtsBundleGenerator({
        fileName: filename + ".d.ts",
      })
    ]
  });
}

function serveConfig(configEnv: ConfigEnv) {
  const commitDate = execSync("git log -1 --format=%cI").toString().trimEnd();
  const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd();
  const commitHash = execSync("git rev-parse HEAD").toString().trimEnd();
  const lastCommitMessage = execSync("git show -s --format=%s").toString().trimEnd();

  // used in benchmark
  process.env.VITE_GIT_COMMIT_DATE = commitDate;
  process.env.VITE_GIT_BRANCH_NAME = branchName;
  process.env.VITE_GIT_COMMIT_HASH = commitHash;
  process.env.VITE_GIT_LAST_COMMIT_MESSAGE = lastCommitMessage;

  return defineConfig({
    resolve: {
      alias: {
        "planck": path.resolve(__dirname, "testbed", "main.ts"),
      },
    },
    define: {
      ASSERT: "false",
      _ASSERT: "false",
      CONSTRUCTOR_FACTORY: "false",
      _CONSTRUCTOR_FACTORY: "false",
    },
  });
}

function getLicense() {
  const version = process.env.npm_package_version;
  const year = new Date().getFullYear();
  const license = `
Planck.js v${version ?? "?"}
@license The MIT license
@copyright Copyright (c) ${year} Erin Catto, Ali Shakiba

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
  `;
  return license;
}