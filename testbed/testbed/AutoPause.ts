import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals-core";

interface AutoPauseContext {
  paused: Signal<boolean>;
  autoPause: Signal<boolean>;
}

const IDLE_TIMEOUT = 15000;

/**
 * Pauses the simulation 15 seconds after the last user interaction, while `autoPause` is on.
 * It is off by default: planck 1.5's testbed never paused on its own.
 */
export class AutoPause extends Middleware<AutoPauseContext> {
  private idleTimeout: ReturnType<typeof setTimeout>;
  private disposeEffect: (() => void) | null = null;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    window.addEventListener("pointerdown", this.handleInteraction);
    window.addEventListener("pointermove", this.handleInteraction);
    window.addEventListener("keydown", this.handleInteraction);
    window.addEventListener("wheel", this.handleInteraction, { passive: true });
    window.addEventListener("touchstart", this.handleInteraction, { passive: true });
    // the idle time counts from when it is turned on
    this.disposeEffect = effect(() => {
      if (this.context.autoPause?.value) {
        this.resetIdleTimeout();
      } else {
        clearTimeout(this.idleTimeout);
      }
    });
  };

  handleDeactivate = () => {
    window.removeEventListener("pointerdown", this.handleInteraction);
    window.removeEventListener("pointermove", this.handleInteraction);
    window.removeEventListener("keydown", this.handleInteraction);
    window.removeEventListener("wheel", this.handleInteraction);
    window.removeEventListener("touchstart", this.handleInteraction);
    this.disposeEffect?.();
    this.disposeEffect = null;
    clearTimeout(this.idleTimeout);
  };

  handleInteraction = () => {
    if (this.context.autoPause?.peek()) this.resetIdleTimeout();
  };

  resetIdleTimeout() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(this.handleIdleTimeout, IDLE_TIMEOUT);
  }

  handleIdleTimeout = () => {
    if (!this.context.autoPause?.peek()) return;
    this.context.paused.value = true;
  };
}
