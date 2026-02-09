import * as Stage from "stage-js";
import { Middleware, Memo } from "polymatic";
import { ContextStyle } from "../testbed/TestbedContext";
import { Camera } from "./Viewbox";

interface StageLoaderContext {
  paused: boolean;

  stage: Stage.Root;
  containerElement: HTMLElement;

  pointerCaptured: boolean;

  style: ContextStyle;
  camera: Camera;
}

export class StageLoader extends Middleware<StageLoaderContext> {
  viewboxMemo = Memo.init();
  backgroundMemo = Memo.init();
  flipMemo = Memo.init();
  pausedMemo = Memo.init();

  stage: Stage.Root;
  containerElementMemo = Memo.init();

  constructor() {
    super();
    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);

    this.on("capture-pointer", this.handleCapturePointer);
    this.on("release-pointer", this.handleReleasePointer);

    this.on("frame-update", this.handleUpdateState);
  }

  handleContextChange = () => {
    const containerElement = this.context.containerElement;
    if (!containerElement) {
      return;
    }

    // don't need to setup again
    if (!this.containerElementMemo.update(containerElement) && this.stage) return;

    // create stage
    const stageCanvasElement = document.createElement("canvas");
    containerElement.appendChild(stageCanvasElement);

    this.stage = Stage.mount({
      // canvas: stageCanvasElement,
    });

    this.stage.MAX_ELAPSE = 1000 / 30;
    // todo
    this.stage.pin("alignX", -0.5);
    this.stage.pin("alignY", -0.5);

    this.handleUpdateState();

    this.stage.dom.addEventListener("mousedown", this.focus);
    this.stage.dom.addEventListener("touchstart", this.focus);

    this.setContext((context) => {
      context.stage = this.stage;
      // context.zoom = this.camera.a;
    });

    this.stage.on(Stage.POINTER_CANCEL, this.handleReleasePointer);
    this.stage.on(Stage.POINTER_UP, this.handleReleasePointer);
  };

  handleCapturePointer = () => {
    this.setContext((context) => {
      context.pointerCaptured = true;
    });
  };

  handleReleasePointer = () => {
    this.setContext((context) => {
      context.pointerCaptured = false;
    });
  };

  handleDeactivate = () => {
    this.setContext((context) => {
      context.stage = null;
    });
    this.stage.dom.removeEventListener("mousedown", this.focus);
    this.stage.dom.removeEventListener("touchstart", this.focus);
  };

  handleUpdateState = () => {
    const flipY = true;
    if (this.flipMemo.update(flipY)) {
      this.stage.flipY(true);
    }

    if (this.pausedMemo.update(this.context.paused)) {
      if (!this.context.paused) {
        this.focus();
      }
    }

    const background = this.context.style.background;
    if (this.backgroundMemo.update(background)) {
      if (background) this.stage.background(background);
    }

    const camera = this.context.camera;
    if (this.viewboxMemo.update(camera.x, camera.y, camera.width, camera.height)) {
      this.stage.viewbox(camera);
    }
  };

  focus = () => {
    // todo: move this to stage-js
    window.focus();
    (document.activeElement as HTMLElement)?.blur?.();
    this.stage?.dom.focus();
  };
}
