import { Middleware } from "polymatic";

export class ContainerLoader extends Middleware<{ containerElement: HTMLElement }> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate() {
    if (document.readyState !== "loading") {
      this.handleDomReady();
    } else {
      document.addEventListener("DOMContentLoaded", this.handleDomReady);
    }
  }

  handleDomReady = () => {
    const containerElement = document.getElementById("space") ?? document.getElementById("stage");
    if (!containerElement) {
      throw new Error("Runtime canvas element not available!");
    }
    this.setContext((context) => {
      context.containerElement = containerElement;
    });
  };
}
