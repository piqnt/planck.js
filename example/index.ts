/// <reference types="vite/client" />

// The testbed's shell around the example the url names (see testbed/shell/Playlist). Every page of
// the examples site loads this — the dev server falls every url back here, and each built page is
// this entry at its own url.

import { testbedDefaults } from "planck/testbed";
import { renderShell } from "planck/testbed/shell/testbedShell";
import { findModules, findSources, loadModule } from "planck/testbed/shell";

/** what the site does not publish, so the playlist cannot offer a page that is not there */
declare const EXAMPLE_EXCLUDE: string[];

// a dev view owns its viewport, unlike a testbed embedded in someone's page
testbedDefaults.zoomPan = true;

// load testbed shell
renderShell("runtime-shell");

// setup playlist
const modules = import.meta.glob(["./*.ts", "!./index.ts"]);
findModules(
  Object.fromEntries(
    Object.entries(modules).filter(([file]) => !EXAMPLE_EXCLUDE.includes(file.replace(/^\.\/|\.ts$/g, ""))),
  ),
);

// the same files again as text, for the toolbar's code view
const sources = import.meta.glob(["./*.ts", "!./index.ts"], { query: "?raw", import: "default" });
findSources(
  Object.fromEntries(
    Object.entries(sources).filter(([file]) => !EXAMPLE_EXCLUDE.includes(file.replace(/^\.\/|\.ts$/g, ""))),
  ) as Record<string, () => Promise<string>>,
);

// load current play, this will load testbed canvas
loadModule();
