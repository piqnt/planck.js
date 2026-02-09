import { Middleware } from "polymatic";

import { ToolConfig } from "./ToolConfig";

interface ToolSwitchContext {
  activeTool: ToolConfig;
}

/**
 * Handles tool-switch events, activates the provided tool if the name matches.
 */
export class ToolSwitch<T extends ToolSwitchContext> extends Middleware<T> {
  constructor(private name: string, private tool: Middleware) {
    super();
    this.on("tool-switch", this.handleSetActiveTool);
  }

  handleSetActiveTool(tool: ToolConfig) {
    if (tool.name === this.name) {
      this.setContext((context) => {
        context.activeTool = tool;
      });
      this.use(this.tool);
    } else {
      this.unuse(this.tool);
    }
  }
}
