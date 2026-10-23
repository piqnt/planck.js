import { execSync } from "child_process";
import path from "path";
import { defineConfig, normalizePath, type ConfigEnv, type Plugin } from "vite";
import typescript from "vite-plugin-typescript";
import rollupLicensePlugin from "rollup-plugin-license";
import glsl from "vite-plugin-glsl";

import { sourceAlias, sourceDefine, SITE_BASE } from "./scripts/vite-shared.mjs";
import { copyExamplePages, serveExamplePages } from "./scripts/examples-html.mjs";

export default function viteConfig(configEnv: ConfigEnv) {
  const isServe = configEnv.command === "serve";
  // `vite preview` is "serve" too, and needs the built site's base, not the dev site's
  if (configEnv.isPreview && process.env.BUILD_NAME === "example") {
    return previewSiteConfig();
  }
  if (isServe) {
    return serveConfig(configEnv);
  }
  // which bundle to build: the core (default), the testbed, the examples site, or with-testbed
  const buildName = process.env.BUILD_NAME;
  if (buildName === "with-testbed") {
    return buildWithTestbedConfig();
  }
  if (buildName === "testbed") {
    return buildTestbedConfig();
  }
  if (buildName === "example") {
    return buildExampleConfig();
  } else {
    return buildConfig();
  }
}

// The declaration bundles (dist/*.d.ts) are rollup.dts.config.mjs, run after these builds.
//
// the testbed's own entry, `planck/testbed`: ES2020 classes on top of polymatic (a native class,
// which ES5 output could not extend). Only planck is left to the host, so the testbed and the
// host's code share one planck; polymatic and @preact/signals-core are bundled in
const TESTBED_EXTERNAL = ["planck"];

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

// the examples site, `BUILD_NAME=example`: one page per example at /planck.js/<Name>, built from
// source into site/ (the docs build adds site/docs; together they are the Pages artifact).
//
// Every page is example/index.html, built once and copied per example, loading example/index.ts,
// which reads the url — so a page carries the shell, and moving between examples is a page load,
// not a route, which is why no host needs an SPA fallback.

// the site's front door. piqnt.com rewrites /planck.js/ to the docs before this is reached, but a
// plain static host (GitHub Pages) has no rewrites and would answer 404.
//
// The url is absolute, not `docs/`: reached without its trailing slash — which a rewrite leaves
// alone, where Pages would redirect first — a relative one resolves against the host's root and
// lands outside the site.
const rootPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Planck.js</title>
    <meta http-equiv="refresh" content="0; url=${SITE_BASE}docs/" />
    <link rel="canonical" href="${SITE_BASE}docs/" />
  </head>
  <body>
    <a href="${SITE_BASE}docs/">Planck.js documentation</a>
  </body>
</html>
`;

// Preview serves site/ as plain files, so /planck.js/Car would 404 where the hosts answer: Pages
// redirects to the trailing-slash form, the piqnt.com rewrite maps straight to index.html. Doing
// the same here keeps the urls tried locally the urls that ship.
const previewLikeProduction = (): Plugin => ({
  name: "planck-preview-like-production",
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const [pathname = "", search] = (req.url ?? "").split("?");
      const isRoot = pathname === "/" || pathname === SITE_BASE || pathname === SITE_BASE.slice(0, -1);
      if (isRoot) {
        // the front door is the docs, as piqnt.com has it
        res.statusCode = 302;
        res.setHeader("location", `${SITE_BASE}docs/`);
        res.end();
        return;
      }
      if (!pathname.endsWith("/") && !path.basename(pathname).includes(".")) {
        req.url = `${pathname}/${search ? `?${search}` : ""}`;
      }
      next();
    });
  },
});

/** Serves the built site, as its hosts serve it. */
function previewSiteConfig() {
  return defineConfig({
    base: SITE_BASE,
    plugins: [previewLikeProduction()],
    build: { outDir: path.resolve(__dirname, "site") },
  });
}

function buildExampleConfig() {
  const outDir = path.resolve(__dirname, "site");

  return defineConfig({
    // the page is example/index.html, which the build writes to site/index.html; the plugin then
    // copies it to site/<Name>/ for each example and puts the front door back at the root
    root: path.resolve(__dirname, "example"),
    base: SITE_BASE,
    plugins: [glsl(), copyExamplePages(outDir, rootPage)],
    resolve: { alias: sourceAlias },
    // the playlist's links: /planck.js/<Name>, which is where the pages are
    define: sourceDefine(SITE_BASE.replace(/\/$/, "")),
    build: {
      outDir,
      // the docs build writes site/docs; the workflow clears site/ once, up front
      emptyOutDir: false,
      sourcemap: false,
    },
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
    // index.ts is in this server's root, the example directory
    plugins: [glsl(), serveExamplePages({ prefix: "/example/", src: "/index.ts" })],
    resolve: { alias: sourceAlias },
    // the examples browser's url base (see testbed/shell/Playlist)
    define: sourceDefine("/example"),
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
