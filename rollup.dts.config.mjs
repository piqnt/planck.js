// the declaration bundles, one per entry, after the vite builds (see the build scripts):
// rollup resolves the sources through the tsconfigs' paths and its `external` says which imports
// stay imports — the core for testbed.d.ts, so consumers see one set of planck types
import dts from "rollup-plugin-dts";

// bundled into the testbed's builds, so never named by its declarations
const BUNDLED = ["polymatic", "@preact/signals-core"];

// a package or any of its subpaths
const externalOf = (names) => (id) => names.some((name) => id === name || id.startsWith(name + "/"));

const bundle = (input, file, external, tsconfig) => ({
  input,
  output: { file, format: "es" },
  external,
  plugins: [dts({ tsconfig })],
});

export default [
  bundle("src/main.ts", "dist/planck.d.ts", [], "src/tsconfig.json"),
  // what planck/testbed publishes (api.ts), not everything its module exports (index.ts)
  bundle("testbed/api.ts", "dist/testbed.d.ts", ["planck"], "testbed/tsconfig.json"),
  bundle("testbed/shell/hostShell.tsx", "dist/testbed-shell.d.ts", externalOf(["planck"]), "testbed/tsconfig.json"),
  // self-contained: the core's declarations inlined
  bundle("testbed/with-testbed.ts", "dist/planck-with-testbed.d.ts", BUNDLED, "testbed/tsconfig.json"),
];
