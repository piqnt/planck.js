import { Middleware } from "polymatic";
import { ContextGamepad } from "./TestbedContext";

const KEY_MAP = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  32: "fire",
  13: "fire",
};

interface GamepadPluginContext {
  gamepad: ContextGamepad;
  activeMode: string;
  paused: boolean;
}

// todo: do no use String.fromCharCode

export class GamepadPlugin extends Middleware<GamepadPluginContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate() {
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("keyup", this.handleKeyup);
  }

  handleDeactivate() {
    window.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("keyup", this.handleKeyup);
  }

  private handleKeydown = (ev: KeyboardEvent) => {
    if (this.context.paused) return;
    if (this.context.activeMode !== "play") return;

    const keyCode = ev.keyCode;
    this.updateActiveKeys(keyCode, true);
    this.emit("gamepad-keydown", ev);
  };

  private handleKeyup = (ev: KeyboardEvent) => {
    if (this.context.paused) return;
    if (this.context.activeMode !== "play") return;

    const keyCode = ev.keyCode;
    this.updateActiveKeys(keyCode, false);
    this.emit("gamepad-keyup", ev);
  };

  private downKeys: Record<number, boolean> = {};

  private updateActiveKeys = (keyCode: number, down: boolean) => {
    const activeKeys = this.context.gamepad.activeKeys;
    this.downKeys[keyCode] = down;
    const char = String.fromCharCode(keyCode);
    if (/\w/.test(char)) {
      if (down) {
        activeKeys[char] = true;
        activeKeys[keyCode] = true;
      } else {
        delete activeKeys[char];
        delete activeKeys[keyCode];
      }
    }
    // todo: is this correct, we should probably use downKeys
    if (KEY_MAP[keyCode]) {
      if (down) {
        activeKeys[KEY_MAP[keyCode]] = true;
      } else {
        delete activeKeys[KEY_MAP[keyCode]];
      }
    }
  };
}
