import { type Signal } from "@preact/signals";

export interface Target {
  key: string;
  type: string;
  /** what it belongs to: a fixture's body */
  up?: Target;
}

/**
 * What is selected: one body, fixture or joint (the testbed inspects one
 * thing at a time). A list, for compatibility with readers of `selected`.
 */
export class Multiselect {
  /** do not mutate */
  readonly selected: Target[] = [];
  constructor(selected: Target[] = []) {
    this.selected = selected;
  }
}

export function isSelected(selection: Multiselect | undefined, key: string): boolean {
  return !!selection?.selected.some((s) => s.key === key);
}

interface SelectionContext {
  multiselect: Signal<Multiselect>;
}

export function setSelection(context: SelectionContext, selection: Target | null): void {
  context.multiselect.value = new Multiselect(selection?.key ? [selection] : []);
}

export function emptySelection(context: SelectionContext): void {
  setSelection(context, null);
}

/** clears the selection if it is this target */
export function removeSelection(context: SelectionContext, selection: Target): void {
  if (isSelected(context.multiselect.value, selection.key)) emptySelection(context);
}

export function selectBody(body: string): Target {
  return { type: "body", key: body };
}

export function selectFixture(fixture: string, body: string): Target {
  return { type: "fixture", key: fixture, up: { type: "body", key: body } };
}

export function selectJoint(joint: string): Target {
  return { type: "joint", key: joint };
}
