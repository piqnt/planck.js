import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals-core";

interface ContainerLoaderContext {
  containerElement: Signal<HTMLElement>;
}

export class ContainerLoader extends Middleware<ContainerLoaderContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate = () => {
    if (document.readyState !== "loading") {
      this.handleDomReady();
    } else {
      document.addEventListener("DOMContentLoaded", this.handleDomReady);
    }
  };

  // the page's #space if it has one (the shell, mono's play page), otherwise a full-page one, as
  // the stage-js testbed's Stage.mount() did with its canvas, so a bare script-tag page just works
  handleDomReady = () => {
    let containerElement = document.getElementById("space");
    if (!containerElement) {
      containerElement = document.createElement("div");
      containerElement.id = "space";
      Object.assign(containerElement.style, {
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        width: "100%",
        height: "100%",
      });
      document.body.insertBefore(containerElement, document.body.firstChild);
    }
    this.context.containerElement.value = containerElement;
  };
}
