import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";

import { type ToolConfig } from "./ToolSwitch";

interface ToolSwitchContext {
  activeTool: Signal<ToolConfig>;

  paused: Signal<boolean>;
  activity: Signal<string>;
  editable: Signal<boolean>;

  mouseForce: Signal<number>;
}

/**
 * Automatically switch tools based on context, or when default-tool is requested.
 */
export class DefaultTool extends Middleware<ToolSwitchContext> {
  private disposers: (() => void)[] = [];

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        this.resetTool();
      }),
    );
    this.disposers.push(
      this.context.activeTool.subscribe((activeTool) => {
        if (activeTool?.name === "default-tool") {
          this.resetTool();
        }
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };

  resetTool() {
    const paused = this.context.paused.value;
    const mouseForce = this.context.mouseForce.value;

    let tool = { name: "inspect" };

    if (!paused) {
      if (mouseForce > 0) {
        tool = { name: "interact-pull" };
      } else if (mouseForce < 0) {
        tool = { name: "interact-impulse" };
      }
    }

    this.context.activeTool.value = tool;
  }
}
