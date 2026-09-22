// the declaration bundles, one per entry, after the vite builds (see the build scripts):
// rollup resolves the sources through the tsconfigs' paths and its `external` says which imports
// stay imports — the core for testbed.d.ts, so consumers see one set of planck types
import dts from "rollup-plugin-dts";

const PEERS = ["polymatic", "@preact/signals", "@egjs/hammerjs"];

const bundle = (input, file, external, tsconfig) => ({
  input,
  output: { file, format: "es" },
  external,
  plugins: [dts({ tsconfig })],
});

export default [
  bundle("src/main.ts", "dist/planck.d.ts", [], "tsconfig.json"),
  bundle("testbed/index.ts", "dist/testbed.d.ts", ["planck", ...PEERS], "testbed/tsconfig.json"),
  // self-contained: the core's declarations inlined
  bundle("testbed/with-testbed.ts", "dist/planck-with-testbed.d.ts", PEERS, "testbed/tsconfig.json"),
];
