import { Middleware } from "polymatic";

export interface ConsoleInterface {
  info(text: string): void;
  status(name: string, value: any): void;
  status(value: object | string): void;
}

interface ConsoleContext {
  console: ConsoleInterface;
}

export class ConsoleProvider extends Middleware<ConsoleContext> implements ConsoleInterface {
  private statusElement: HTMLElement;
  private infoElement: HTMLElement;

  private lastStatus: string;
  private lastInfo: string;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate() {
    this.context.console = this;

    this.statusElement = document.getElementById("testbed-status");
    this.lastStatus = "";
    if (this.statusElement) {
      this.statusElement.innerText = this.lastStatus;
    } else {
      console.warn("Element with id='testbed-status' not found!");
    }

    this.infoElement = document.getElementById("testbed-info");
    this.lastInfo = "";
    if (this.infoElement) {
      this.infoElement.innerText = this.lastInfo;
    } else {
      console.warn("Element with id='testbed-info' not found!");
    }
  }

  handleDeactivate() {
    this.context.console = null;
  }

  info(text: string): void {
    this.updateInfo(text);
  }

  private _statusText = "";
  private _statusMap: Record<string, any> = {};

  status(name: string, value: any): void;
  status(value: object | string): void;
  status(a: any, b?: any) {
    if (typeof b !== "undefined") {
      const key = a;
      const value = b;
      if (typeof value !== "function" && typeof value !== "object") {
        this._statusMap[key] = value;
      }
    } else if (a && typeof a === "object") {
      // tslint:disable-next-line:no-for-in
      for (const key in a) {
        const value = a[key];
        if (typeof value !== "function" && typeof value !== "object") {
          this._statusMap[key] = value;
        }
      }
    } else if (typeof a === "string") {
      this._statusText = a;
    }

    const newline = "\n";
    let text = this._statusText || "";
    for (const key in this._statusMap) {
      const value = this._statusMap[key];
      if (typeof value === "function") continue;
      text += (text && newline) + key + ": " + value;
    }

    this.updateStatus(text);
  }

  updateInfo(text: string): void {
    if (this.lastInfo === text) {
      return;
    }
    this.lastInfo = text;
    if (this.infoElement) {
      this.infoElement.innerText = text;
    }
  }

  updateStatus(text: string) {
    if (this.lastStatus === text) {
      return;
    }
    this.lastStatus = text;
    if (this.statusElement) {
      this.statusElement.innerText = text;
    }
  }
}
