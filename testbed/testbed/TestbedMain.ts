import { Middleware } from "polymatic";

import { Magicboard } from "../common/Magicboard";
import { GamepadPlugin } from "./Gamepad";
import { ConsoleProvider } from "./ConsolePlugin";
import { WorldView } from "../world-view";
import { WorldPointer } from "../world-view/WorldPointer";
import { StageLoader } from "../common/StageLoader";
import { ZoomPanProvider } from "../common/ZoomPan";

import { ImpulseTool } from "../world-play/ImpulseTool";
import { PullTool } from "../world-play/PullTool";

import { ToolSwitch } from "../common-tool";

import { TestbedContext } from "./TestbedContext";
import { TestbedLoader } from "./Testbed";
import { ContainerLoader } from "../common/ContainerLoader";
import { FrameLoop } from "../common/FrameLoop";
import { WorldStep } from "../world-view/WorldStep";
import { ParticleViewOffCanvas } from "../particle-view/ParticleViewOffCanvas";

/**
 * Preset middlewares for planck testbed.
 */
export class TestbedMain extends Middleware<TestbedContext> {
  constructor() {
    super();
    this.use(new FrameLoop());
    this.use(new ContainerLoader());
    this.use(new GamepadPlugin());
    this.use(new StageLoader());
    this.use(new WorldStep());
    this.use(new WorldView());
    this.use(new WorldPointer());
    this.use(new ConsoleProvider());
    this.use(new Magicboard());
    this.use(new TestbedLoader());
    this.use(new ZoomPanProvider());
    this.use(new ParticleViewOffCanvas());

    this.use(new ToolSwitch("interact-pull", new PullTool()));
    this.use(new ToolSwitch("interact-impulse", new ImpulseTool()));
  }
}
