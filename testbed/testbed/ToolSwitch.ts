import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";

export interface ToolConfig {
  name: string;
  [prop: string]: unknown;
}

interface ToolSwitchContext {
  activeTool: Signal<ToolConfig>;
}

export class ToolSwitch<T extends ToolSwitchContext> extends Middleware<T> {
  name: string;
  tool: Middleware;
  private disposers: (() => void)[] = [];

  constructor(name: string, tool: Middleware) {
    super();
    this.name = name;
    this.tool = tool;
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.disposers.push(
      effect(() => {
        const activeTool = this.context.activeTool.value;
        const isMe = activeTool?.name === this.name;
        if (isMe && !this.tool.activated) {
          this.use(this.tool);
        } else if (!isMe && this.tool.activated) {
          this.unuse(this.tool);
        }
        return () => {
          this.unuse(this.tool);
        };
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
  };
}
