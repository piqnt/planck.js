import { Middleware } from "polymatic";

interface KeyboardContext {
  activeKeys: Record<string, boolean>;
}

export class KeyboardManager extends Middleware<KeyboardContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("keyup", this.handleKeyup);
    window.addEventListener("keypress", this.handleKeypress);
  };

  handleDeactivate = () => {
    window.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("keyup", this.handleKeyup);
    window.removeEventListener("keypress", this.handleKeypress);
  };

  private downKeys: Record<number, boolean> = {};

  // `left`/`right`/`up`/`down` (arrows or WASD), `fire` (space or enter), and characters
  private updateActiveKeys(keyCode: number, down: boolean) {
    const activeKeys = this.context.activeKeys;
    const downKeys = this.downKeys;
    const char = String.fromCharCode(keyCode);
    if (/[A-Z0-9]/.test(char)) {
      activeKeys[char] = down;
    }
    activeKeys.right = downKeys[39] || activeKeys["D"];
    activeKeys.left = downKeys[37] || activeKeys["A"];
    activeKeys.up = downKeys[38] || activeKeys["W"];
    activeKeys.down = downKeys[40] || activeKeys["S"];
    activeKeys.fire = downKeys[32] || downKeys[13];
  }

  handleKeydown = (ev: KeyboardEvent) => {
    this.downKeys[ev.keyCode] = true;
    this.updateActiveKeys(ev.keyCode, true);
    this.emit("keydown", ev);
  };

  handleKeyup = (ev: KeyboardEvent) => {
    this.downKeys[ev.keyCode] = false;
    this.updateActiveKeys(ev.keyCode, false);
    this.emit("keyup", ev);
  };

  handleKeypress = (ev: KeyboardEvent) => {
    this.emit("keypress", ev);
  };
}
