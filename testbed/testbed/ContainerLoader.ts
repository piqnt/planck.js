import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";

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

  handleDomReady = () => {
    const containerElement = document.getElementById("space");
    if (!containerElement) {
      throw new Error("Runtime container element not available!");
    }
    this.context.containerElement.value = containerElement as HTMLElement;
  };
}
