import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals-core";

interface PlayButtonContext {
  paused: Signal<boolean>;
}

/**
 * The page's `#testbed-play` button, as the stage-js testbed had it: a click pauses or resumes,
 * and the button's class is "pause" while paused and "play" while running, whatever paused it.
 */
export class PlayButton extends Middleware<PlayButtonContext> {
  private button: HTMLElement | null = null;
  private disposeEffect: (() => void) | null = null;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    if (document.readyState !== "loading") {
      this.handleDomReady();
    } else {
      document.addEventListener("DOMContentLoaded", this.handleDomReady);
    }
  };

  handleDomReady = () => {
    this.button = document.getElementById("testbed-play");
    if (!this.button) return;
    this.button.addEventListener("click", this.handleClick);
    this.disposeEffect = effect(() => {
      const paused = this.context.paused.value;
      this.button.classList.toggle("pause", paused);
      this.button.classList.toggle("play", !paused);
    });
  };

  handleDeactivate = () => {
    document.removeEventListener("DOMContentLoaded", this.handleDomReady);
    this.button?.removeEventListener("click", this.handleClick);
    this.disposeEffect?.();
    this.button = null;
    this.disposeEffect = null;
  };

  handleClick = () => {
    this.context.paused.value = !this.context.paused.value;
  };
}
