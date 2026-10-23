// Which examples the site publishes, read by the build (vite.config.mts) and the docs' list of
// them (examples-doc-page.mjs). Debug and Issue315 are for working on planck, not for reading.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const EXAMPLE_DIR = path.join(ROOT, "example");
export const EXAMPLE_EXCLUDE = ["index", "Debug", "Issue315"];

/** every example's name, as its file and its url both spell it */
export const exampleNames = () =>
  fs
    .readdirSync(EXAMPLE_DIR)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => file.slice(0, -".ts".length))
    .filter((name) => !EXAMPLE_EXCLUDE.includes(name))
    .sort();
