import * as Stage from "stage-js";
import { TestbedInterface, type ActiveKeys, type World } from "../";

import { type ToolConfig } from "../common-tool";
import { MagicboardInterface } from "../common/Magicboard";
import { ConsoleInterface } from "./ConsolePlugin";
import { Camera } from "../common/Viewbox";

export interface ContextSimulation {
  speed: number;
  hz: number;
}

export interface ContextStyle {
  stroke?: string;
  fill?: string;
  lineWidth?: number;
  background?: string;
}

export interface ContextGamepad {
  activeKeys: ActiveKeys;
}

export interface TestbedContext {
  activeMode: string;
  activeTool: ToolConfig;
  paused: boolean;
  pointerCaptured: boolean;

  world: World;

  gamepad: ContextGamepad;
  style: ContextStyle;
  simulation: ContextSimulation;
  camera: Camera;

  containerElement?: HTMLElement;

  stage: Stage.Root;

  magicboard: MagicboardInterface;
  console: ConsoleInterface;

  testbed?: TestbedInterface
}

export class DefaultTestbedContext implements TestbedContext {
  activeMode = "play";
  activeTool: ToolConfig = null;
  paused = false;
  pointerCaptured = false;
  world: World;
  gamepad = {
    activeKeys: {} as Record<string, boolean>,
  };
  style = {
    background: "#111",
  };
  simulation = {
    speed: 1,
    hz: 60,
  };
  camera = {
    x: 0,
    y: -10,
    width: 80,
    height: 60,
  };
  containerElement?: HTMLElement;
  stage: Stage.Root;
  magicboard: MagicboardInterface;
  console: ConsoleInterface;

  testbed?: TestbedInterface;
}
