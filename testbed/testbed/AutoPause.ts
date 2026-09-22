import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";

interface AutoPauseContext {
  paused: Signal<boolean>;
}

const IDLE_TIMEOUT = 15000;

/**
 * Pauses the simulation 3 seconds after the last user interaction.
 */
export class AutoPause extends Middleware<AutoPauseContext> {
  private idleTimeout: ReturnType<typeof setTimeout>;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    window.addEventListener("pointerdown", this.handleInteraction);
    window.addEventListener("pointermove", this.handleInteraction);
    window.addEventListener("keydown", this.handleInteraction);
    window.addEventListener("wheel", this.handleInteraction);
    window.addEventListener("touchstart", this.handleInteraction);
    this.resetIdleTimeout();
  };

  handleDeactivate = () => {
    window.removeEventListener("pointerdown", this.handleInteraction);
    window.removeEventListener("pointermove", this.handleInteraction);
    window.removeEventListener("keydown", this.handleInteraction);
    window.removeEventListener("wheel", this.handleInteraction);
    window.removeEventListener("touchstart", this.handleInteraction);
    clearTimeout(this.idleTimeout);
  };

  handleInteraction = () => {
    this.resetIdleTimeout();
  };

  resetIdleTimeout() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(this.handleIdleTimeout, IDLE_TIMEOUT);
  }

  handleIdleTimeout = () => {
    this.context.paused.value = true;
  };
}
