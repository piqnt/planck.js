// How planck and its testbed resolve when built from source. vite.config.mts and
// docs/.vitepress/config.ts both need this and must agree — a define set in one and missed in the
// other fails at runtime, not at build.
import path from "path";
import { fileURLToPath } from "url";

import { EXAMPLE_EXCLUDE } from "./examples-list.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Where the site is served: piqnt.com/planck.js/ and piqnt.github.io/planck.js/ alike. SITE_BASE
 * overrides it for a deployment that lives somewhere else — a GitHub Pages project site serves at
 * /<repo>/, so a preview of this build needs its own.
 */
export const SITE_BASE = process.env.SITE_BASE ?? "/planck.js/";

/** planck and its testbed from source; the shell is React written against preact */
export const sourceAlias = [
  { find: "react", replacement: "preact/compat" },
  { find: "react-dom", replacement: "preact/compat" },
  { find: "react-dom/client", replacement: "preact/compat/client" },
  { find: /^planck\/with-testbed$/, replacement: path.join(ROOT, "testbed", "with-testbed.ts") },
  { find: /^planck\/testbed(\/.*)?$/, replacement: path.join(ROOT, "testbed") + "$1" },
  { find: /^planck$/, replacement: path.join(ROOT, "src", "main.ts") },
];

/**
 * @param shellUrl the url the playlist's links are relative to, for a config that serves the
 *   examples: "/example" on the dev site, the site's root everywhere else
 */
export const sourceDefine = (shellUrl) => ({
  ASSERT: "false",
  _ASSERT: "false",
  CONSTRUCTOR_FACTORY: "false",
  _CONSTRUCTOR_FACTORY: "false",
  // what the playlist leaves out, from the one list the build takes its pages from
  EXAMPLE_EXCLUDE: JSON.stringify(EXAMPLE_EXCLUDE),
  SHELL_URL: JSON.stringify(shellUrl),
});
