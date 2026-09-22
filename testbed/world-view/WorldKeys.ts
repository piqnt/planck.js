import { Middleware } from "polymatic";
import { effect, type Signal } from "@preact/signals";
import { type Body, type Fixture, type Joint, type World } from "planck";

import { setKey } from "../common/Key";

interface WorldKeysContext {
  world: Signal<World>;
}

/**
 * Every body, fixture and joint of the world gets a key, if it has none: the outline and the
 * selection refer to them by key.
 */
export class WorldKeys extends Middleware<WorldKeysContext> {
  private dispose: () => void;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.dispose = effect(() => {
      const world = this.context.world.value;
      if (!world) return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        setKey(body);
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          setKey(fixture);
        }
      }
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        setKey(joint);
      }
      world.on("add-body", this.keyOne);
      world.on("add-fixture", this.keyOne);
      world.on("add-joint", this.keyOne);
      return () => {
        world.off("add-body", this.keyOne);
        world.off("add-fixture", this.keyOne);
        world.off("add-joint", this.keyOne);
      };
    });
  };

  handleDeactivate = () => {
    this.dispose?.();
    this.dispose = undefined;
  };

  keyOne = (obj: Body | Fixture | Joint) => {
    setKey(obj);
  };
}
