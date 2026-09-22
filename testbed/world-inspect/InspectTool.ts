import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";

import { Multiselect, setSelection, selectBody, selectFixture } from "../common/Selection";
import { type LocalPointerUp } from "../testbed/Pointer";
import { type WorldQuery } from "../world-view/WorldQuery";

interface InspectToolContext {
  multiselect: Signal<Multiselect>;
  worldQuery: WorldQuery;
}

/**
 * Click to select a body; click it again for the fixture under the pointer,
 * or another fixture of the same body. A click on the background steps back
 * up: from a fixture to its body, from a body to nothing.
 */
export class InspectTool extends Middleware<InspectToolContext> {
  constructor() {
    super();
    this.on("pointer-click", this.handleClick);
  }

  handleClick = (ev: LocalPointerUp) => {
    const match = this.context.worldQuery.testPoint(ev.point);
    const was = this.context.multiselect.value.selected[0];

    if (!match?.fixture) {
      setSelection(this.context, was?.up ?? null);
    } else if (was?.key === match.body || (was?.key !== match.fixture && was?.up?.key === match.body)) {
      // the body, or a sibling fixture, was selected: down to the fixture
      setSelection(this.context, selectFixture(match.fixture, match.body));
    } else {
      setSelection(this.context, selectBody(match.body));
    }
  };
}
