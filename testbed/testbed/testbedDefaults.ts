/**
 * What a host decides before it runs a project's code: the page it is making, not the commands
 * it sends later. A host writes these while loading, and `initTestbedContext` reads them once,
 * when the testbed mounts — so the project's own `testbed.zoomPan = …`, running afterwards,
 * always wins, with no second writer to race.
 *
 * Changing them after the testbed has mounted does nothing: a host drives a running testbed
 * through its context instead (see `runtime` in api.ts).
 */
export interface TestbedDefaults {
  /** zoom with the wheel or a pinch, pan by dragging empty space; off, so an embedded testbed leaves the wheel to the page */
  zoomPan: boolean;
  /** pause after 15 seconds without user input */
  autoPause: boolean;
  /** the view's background color */
  background: string;
  /** show the outline, where a shell renders one */
  showOutline: boolean;
  /** show the toolbar, where a shell renders one */
  showToolbar: boolean;
}

/** The host's defaults, read once when the testbed mounts. */
export const testbedDefaults: Partial<TestbedDefaults> = {};
