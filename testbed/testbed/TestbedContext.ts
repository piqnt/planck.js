import { signal, type Signal } from "@preact/signals-core";

import { type World } from "planck";
import { type ActiveKeys } from "./TestbedInterface";
import { type ToolConfig } from "./ToolSwitch";
import { type ConsoleInterface } from "./ConsoleManager";
import { type WorldQuery } from "../world-view/WorldQuery";
import { type Mat2d, makeMat2d } from "../common/Mat2d";
import { type GLResources } from "../gl/GLContext";
import { Multiselect } from "../common/Selection";
import { testbedDefaults } from "./testbedDefaults";

/**
 * The testbed's context, on the object it is given: a game's own state object is the context,
 * so a proxy, a class instance or an accessor on it keeps working and the game holds the same
 * object every middleware sees.
 */
export function initTestbedContext<C extends object>(state: C = {} as C): TestbedContext & C {
  const ctx = state as TestbedContext & C;
  ctx.activity = signal("mode:play");
  ctx.activeTool = signal(undefined as ToolConfig);
  ctx.paused = signal(false);
  ctx.editable = signal(false);
  ctx.pointerCaptured = false;
  ctx.style = { background: testbedDefaults.background ?? "#222222" };
  // planck 1's testbed defaults (`testbed.y = -10`, y measured downwards): the view centered
  // on world y = 10, so the ground at y = 0 sits below the middle
  ctx.camera = {
    x: 0,
    y: 10,
    width: 80,
    height: 60,
  };
  ctx.containerElement = signal(undefined as HTMLElement);
  ctx.canvasElement = signal(undefined as HTMLCanvasElement);
  ctx.gl = signal(undefined as GLResources);
  ctx.worldMatrix = makeMat2d();
  // as in planck 1.5: unset pulls (a mouse joint), non-zero flings on release, 0 does neither
  ctx.mouseForce = signal(undefined as number);
  ctx.pixelPerUnit = 1;
  ctx.pointerRadius = 20;
  ctx.showOutline = signal(testbedDefaults.showOutline ?? true);
  ctx.showToolbar = signal(testbedDefaults.showToolbar ?? true);
  // off unless the host says otherwise, so a testbed embedded in a page leaves the wheel to it
  ctx.zoomPan = signal(testbedDefaults.zoomPan ?? false);
  ctx.autoPause = signal(testbedDefaults.autoPause ?? false);
  ctx.activeKeys = {};
  ctx.multiselect = signal(new Multiselect([]));

  ctx.world = signal();
  ctx.simulation = {
    speed: 1,
    hz: 60,
    velocityIterations: 8,
    positionIterations: 3,
  };

  ctx.renderConfig = signal({
    shapes: true,
    bounds: false,
    mass: false,
    bodyNames: false,
    joints: true,
    contact: false,
    contactNormals: false,
  });

  ctx.textOverlay = signal(undefined as CanvasRenderingContext2D);

  return ctx;
}

export interface ContextSimulation {
  speed: number;
  /** steps per second */
  hz: number;
  velocityIterations: number;
  positionIterations: number;
}

/** what the debug draw shows */
export interface RenderConfig {
  shapes: boolean;
  bounds: boolean;
  mass: boolean;
  bodyNames: boolean;
  joints: boolean;
  contact: boolean;
  contactNormals: boolean;
}

export interface TestbedContext {
  activity: Signal<string>;
  activeTool: Signal<ToolConfig>;
  paused: Signal<boolean>;
  editable: Signal<boolean>;
  pointerCaptured: boolean;
  style: { background?: string };
  camera: { x: number; y: number; width: number; height: number };
  mouseForce: Signal<number>;
  containerElement: Signal<HTMLElement>;
  canvasElement: Signal<HTMLCanvasElement>;
  gl: Signal<GLResources>;
  worldMatrix: Mat2d;
  pixelPerUnit: number;
  pointerRadius: number;
  showOutline: Signal<boolean>;
  showToolbar: Signal<boolean>;
  /** wheel, drag and pinch zoom and pan the view (ZoomPanProvider) */
  zoomPan: Signal<boolean>;
  /** pause after 15 seconds without user input (AutoPause) */
  autoPause: Signal<boolean>;
  activeKeys: ActiveKeys;
  /** what the outline and the inspect tool selected, by key */
  multiselect: Signal<Multiselect>;
  console: ConsoleInterface;
  /** set by the WorldQuery middleware */
  worldQuery: WorldQuery;

  world: Signal<World>;
  simulation: ContextSimulation;

  renderConfig: Signal<RenderConfig>;
  textOverlay: Signal<CanvasRenderingContext2D>;
}
