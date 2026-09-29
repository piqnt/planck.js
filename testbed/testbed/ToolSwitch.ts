import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";

export interface ToolConfig {
  name: string;
  [prop: string]: unknown;
}

interface ToolSwitchContext {
  activeTool: Signal<ToolConfig>;
}

/**
 * Uses its tool while the active tool has its name, so only the active tool receives events.
 * Typed by its tool, so the parent must provide the tool's context too.
 */
export class ToolSwitch<T extends object> extends Middleware<T & ToolSwitchContext> {
  name: string;
  tool: Middleware<T>;
  private disposers: (() => void)[] = [];

  constructor(name: string, tool: Middleware<T>) {
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
        // no effect cleanup: it would run before every re-run, and remount the tool whenever the
        // active tool changes, even to a new config with the same name
        if (isMe && !this.tool.activated) {
          this.use(this.tool);
        } else if (!isMe && this.tool.activated) {
          this.unuse(this.tool);
        }
      }),
    );
  };

  handleDeactivate = () => {
    this.disposers.forEach((d) => d());
    this.disposers = [];
    this.unuse(this.tool);
  };
}
