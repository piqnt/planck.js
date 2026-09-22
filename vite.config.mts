import { execSync } from "child_process";
import path from "path";
import { defineConfig, normalizePath, type ConfigEnv, type Plugin } from "vite";
import typescript from "vite-plugin-typescript";
import rollupLicensePlugin from "rollup-plugin-license";
import glsl from "vite-plugin-glsl";

export default function viteConfig(configEnv: ConfigEnv) {
  const isServe = configEnv.command === "serve";
  if (isServe) {
    return serveConfig(configEnv);
  }
  // which bundle to build: the core (default), the testbed, or planck-with-testbed
  const buildName = process.env.BUILD_NAME;
  if (buildName === "with-testbed") {
    return buildWithTestbedConfig();
  }
  if (buildName === "testbed") {
    return buildTestbedConfig();
  } else {
    return buildConfig();
  }
}

// The declaration bundles (dist/*.d.ts) are rollup.dts.config.mjs, run after these builds.
//
// the testbed's own entry, `planck/testbed`: ES2020 classes on top of polymatic (a native class,
// which ES5 output could not extend), with planck itself and the testbed's peer dependencies left
// to the consumer
const TESTBED_EXTERNAL = ["planck", "polymatic", "@preact/signals", "@egjs/hammerjs"];

function buildConfig() {
  const entry = normalizePath(path.resolve(__dirname, "src", "main.ts"));

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
            return "planck.js";
          } else if (format === "es") {
            return "planck.mjs";
          }
          return "planck." + format + ".js";
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
    ],
  });
}

// planck-with-testbed.{js,mjs}: the core (its ES5 build, so `Vec2(x, y)` without `new` keeps working),
// the testbed and the testbed's dependencies in one file; the rest is ES2020 like the testbed.
// Built after the core and the testbed: it bundles dist/planck.mjs.
function buildWithTestbedConfig() {
  const entry = normalizePath(path.resolve(__dirname, "testbed", "with-testbed.ts"));
  const tsconfig = path.resolve(__dirname, "testbed", "tsconfig.json");

  return defineConfig({
    resolve: {
      alias: [
        { find: /^planck\/testbed(\/.*)?$/, replacement: path.resolve(__dirname, "testbed") + "$1" },
        { find: "planck", replacement: path.resolve(__dirname, "dist", "planck.mjs") },
      ],
    },
    build: {
      lib: {
        entry: entry,
        name: "planck",
        fileName: (format) => (format === "es" ? "planck-with-testbed.mjs" : "planck-with-testbed.js"),
        formats: ["es", "umd"],
      },
      target: "es2020",
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
    },
    plugins: [
      glsl(),
      rollupLicensePlugin({
        banner: getLicense(),
      }) as Plugin,
      typescript({ tsconfig }),
    ],
  });
}

function buildTestbedConfig() {
  const entry = normalizePath(path.resolve(__dirname, "testbed", "index.ts"));
  const tsconfig = path.resolve(__dirname, "testbed", "tsconfig.json");

  return defineConfig({
    build: {
      lib: {
        entry: entry,
        name: "planckTestbed",
        // the package is commonjs, so .js is what node reads as such; the es build is .mjs
        // like the core's
        fileName: (format) => (format === "es" ? "testbed.mjs" : "testbed.js"),
        formats: ["es"],
      },
      target: "es2020",
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      rollupOptions: {
        external: TESTBED_EXTERNAL,
      },
    },
    plugins: [
      glsl(),
      rollupLicensePlugin({
        banner: getLicense(),
      }) as Plugin,
      typescript({ tsconfig }),
    ],
  });
}

function serveConfig(configEnv: ConfigEnv) {
  // vitest runs this config too (mode "test"): the tests live at the repo root, not the dev site
  const isTest = configEnv.mode === "test";
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
    // the examples browser (example/index.html) is the dev site: /<example> opens that example,
    // every url falling back to it. `vite benchmark` serves the benchmark page instead.
    root: isTest ? __dirname : path.resolve(__dirname, "example"),
    appType: "spa",
    // the testbed's shaders are imported as strings; its shell is React on preact
    plugins: [glsl()],
    resolve: {
      alias: [
        { find: "react", replacement: "preact/compat" },
        { find: "react-dom", replacement: "preact/compat" },
        { find: "react-dom/client", replacement: "preact/compat/client" },
        { find: /^planck\/testbed(\/.*)?$/, replacement: path.resolve(__dirname, "testbed") + "$1" },
        { find: /^planck$/, replacement: path.resolve(__dirname, "src", "main.ts") },
      ],
    },
    define: {
      ASSERT: "false",
      _ASSERT: "false",
      CONSTRUCTOR_FACTORY: "false",
      _CONSTRUCTOR_FACTORY: "false",
      // the examples browser's url base (see testbed/shell/Playlist)
      SHELL_URL: JSON.stringify("/example"),
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
