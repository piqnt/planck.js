import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";

import {
  Multiselect,
  emptySelection,
  removeSelection,
  selectBody,
  selectFixture,
  selectJoint,
  setSelection,
} from "../common/Selection";

interface SelectionManagerContext {
  multiselect: Signal<Multiselect>;
}

/** the selection as the outline asks for it: select-body, select-fixture, select-joint, deselect-* */
export class SelectionManager extends Middleware<SelectionManagerContext> {
  constructor() {
    super();
    this.on("select-body", this.selectBody);
    this.on("deselect-body", this.deselectBody);
    this.on("select-fixture", this.selectFixture);
    this.on("deselect-fixture", this.deselectFixture);
    this.on("select-joint", this.selectJoint);
    this.on("deselect-joint", this.deselectJoint);
    this.on("deselect-all", this.deselectAll);
  }

  selectBody = (select: { body: string }) => {
    if (!select?.body) return;
    setSelection(this.context, selectBody(select.body));
  };

  deselectBody = (select: { body: string }) => {
    if (!select?.body) return;
    removeSelection(this.context, selectBody(select.body));
  };

  selectFixture = (select: { fixture: string; body: string }) => {
    if (!select?.fixture) return;
    setSelection(this.context, selectFixture(select.fixture, select.body));
  };

  deselectFixture = (select: { fixture: string; body: string }) => {
    if (!select?.fixture) return;
    removeSelection(this.context, selectFixture(select.fixture, select.body));
  };

  selectJoint = (select: { joint: string }) => {
    if (!select?.joint) return;
    setSelection(this.context, selectJoint(select.joint));
  };

  deselectJoint = (select: { joint: string }) => {
    if (!select?.joint) return;
    removeSelection(this.context, selectJoint(select.joint));
  };

  deselectAll = () => {
    emptySelection(this.context);
  };
}
