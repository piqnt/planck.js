// @preact/signals-core as planck/testbed-shell's build sees it (vite.config.mts points every
// import of it here, the outline's own and signals-react's): the copy bundled in planck/testbed,
// re-exported, so the outline's effects track the testbed's signals. Not used in development, where
// the shell and the testbed share node_modules' copy anyway.
import { signalsCore } from "planck/testbed";

export const { Computed, Effect, Signal, action, batch, computed, createModel, effect, signal, untracked } =
  signalsCore;
