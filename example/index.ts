/// <reference types="vite/client" />

// the examples browser: the testbed's shell around the example the url names (see
// testbed/shell/Playlist); `vite` serves this folder, every url falling back to index.html

import { testbedDefaults } from "planck/testbed";
import { renderShell } from "planck/testbed/shell/testbedShell";
import { findModules, loadModule } from "planck/testbed/shell";

// a dev view owns its viewport, unlike a testbed embedded in someone's page
testbedDefaults.zoomPan = true;

// load testbed shell
renderShell("runtime-shell");

// setup playlist
findModules(import.meta.glob(["./*.ts", "!./index.ts"]));

// load current play, this will load testbed canvas
loadModule();
