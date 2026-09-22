/// <reference types="vite/client" />

// the examples browser: the testbed's shell around the example the url names (see
// testbed/shell/Playlist); `vite` serves this folder, every url falling back to index.html

// the testbed implements Testbed.mount() for the examples, which import Testbed from "planck"
import "planck/testbed";
import { renderShell } from "planck/testbed/shell/index";
import { findModules, loadModule } from "planck/testbed/shell/Playlist";

// load testbed shell
renderShell("runtime-shell");

// setup playlist
findModules(import.meta.glob("./*.ts"));

// load current play, this will load testbed canvas
loadModule();
