// global dependency injection
// todo: split to multiple files

import { signal, type Signal } from "@preact/signals";
import { type Middleware } from "polymatic";
import { TestbedContext } from "../testbed/TestbedContext";

export class ProviderCollection<P> {
  list: P[] = [];
  register(provider: P) {
    this.list.push(provider);
  }
}

export interface ToolbarTool {
  name: string;
  activate: (context: any) => void;
}

export interface PlayConfig {
  path: string;
  key: string;
  url: string;
}

export const playlist: PlayConfig[] = [];

export const currentPlay: Signal<PlayConfig> = signal<PlayConfig>();

export const toolbarTool = new ProviderCollection<ToolbarTool>();

/** the running stack: TestbedMain from Testbed.mount(), or a game's own middleware that uses it */
export interface RuntimeRef {
  middleware: Middleware<TestbedContext>;
  context: TestbedContext;
  emit: (type: string, ev?: any) => void;
}

export const runtime: Signal<RuntimeRef> = signal<RuntimeRef>();
