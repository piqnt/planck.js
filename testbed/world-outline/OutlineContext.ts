import { type Signal } from "@preact/signals";
import { World } from "planck";
import { Multiselect } from "planck/testbed";

export interface OutlineContext {
  editable: Signal<boolean>;
  world: Signal<World>;
  multiselect: Signal<Multiselect>;
  activity: Signal<string>;
}
