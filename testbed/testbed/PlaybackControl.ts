import { Memo, Middleware } from "polymatic";

interface ToolbarPluginContext {
  paused: boolean;
}

export class PlaybackControl extends Middleware<ToolbarPluginContext> {
  private playButton: HTMLElement;
  private pausedMemo = Memo.init();

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.playButton = document.getElementById("testbed-play");

    if (!this.playButton) {
      console.warn("Button with id='testbed-play' not found!");
    }
    this.playButton?.addEventListener("click", this.handleClick);
    this.handleContextChange();
  };

  handleContextChange = () => {
    if (this.pausedMemo.update(this.context.paused)) {
      if (this.context.paused) {
        this.handlePause();
      } else {
        this.handleResume();
      }
    }
  };

  handleDeactivate = () => {
    this.playButton?.removeEventListener("click", this.handleClick);
  };

  handleClick = () => {
    if (this.context.paused) {
      this.setContext((context) => {
        context.paused = false;
      });
    } else {
      this.setContext((context) => {
        context.paused = true;
      });
    }
  };

  handlePause = () => {
    if (!this.playButton) return;
    this.playButton.classList.add("pause");
    this.playButton.classList.remove("play");
  };

  handleResume = () => {
    if (!this.playButton) return;
    this.playButton.classList.add("play");
    this.playButton.classList.remove("pause");
  };
}
