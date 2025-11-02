import { Middleware } from "polymatic";
import * as Stage from "stage-js";
import {
  Vec2,
  AABB,
  type Vec2Value,
  type World,
  type Fixture,
  DistanceInput,
  CircleShape,
  SimplexCache,
  DistanceOutput,
  Distance,
} from "../";

// todo: remove this
const HIT_RADIUS_PIXEL = 0.1;

interface WorldPointerContext {
  world: World;
  stage: Stage.Root;
}

/**
 * Handles stage pointer events, and emits world-related pointer events:
 * - world-pointer-down
 * - world-pointer-move
 * - world-pointer-up
 * - world-pointer-cancel
 * - world-drag-start
 * - world-drag-move
 * - world-drag-end
 * - world-drag-cancel
 * - world-click
 */
export class WorldPointer extends Middleware<WorldPointerContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate = () => {
    this.context.stage.on(Stage.POINTER_DOWN, this.handlePointerDown);
    this.context.stage.on(Stage.POINTER_MOVE, this.handlePointerMove);
    this.context.stage.on(Stage.POINTER_UP, this.handlePointerUp);
    this.context.stage.on(Stage.POINTER_CANCEL, this.handlePointerCancel);
  };

  pointerStart = { x: 0, y: 0 };
  pointerLast = { x: 0, y: 0 };
  pointerDragged = false;
  pointerDown = false;

  handlePointerDown = (point: Vec2Value) => {
    if (!this.context.world) return;

    const fixture = findFixture(this.context, point);

    this.emit("world-pointer-down", {
      point,
      fixture,
      background: !fixture,
    });

    this.pointerStart.x = point.x;
    this.pointerStart.y = point.y;
    this.pointerLast.x = point.x;
    this.pointerLast.y = point.y;

    this.pointerDown = true;
    this.pointerDragged = false;
  };

  handlePointerMove = (point: Vec2Value) => {
    if (!this.context.world) return;

    this.emit("world-pointer-move", {
      point,
    });

    if (!this.pointerDown) return;

    const move = {
      x: point.x - this.pointerStart.x,
      y: point.y - this.pointerStart.y,
    };
    const delta = {
      x: point.x - this.pointerLast.x,
      y: point.y - this.pointerLast.y,
    };

    if (this.pointerDragged) {
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      this.emit("world-drag-move", {
        point,
        delta,
        move,
      });
    } else if (move.x !== 0 || move.y !== 0) {
      this.pointerDragged = true;

      const fixture = findFixture(this.context, point);

      this.emit("world-drag-start", {
        point,
        fixture,
        background: !fixture,
      });
    }
  };

  handlePointerUp = (point: Vec2Value) => {
    if (!this.context.world) return;

    this.emit("world-pointer-up", {
      point,
    });

    if (!this.pointerDown) return;

    this.pointerDown = false;

    const move = {
      x: point.x - this.pointerStart.x,
      y: point.y - this.pointerStart.y,
    };
    const delta = {
      x: point.x - this.pointerLast.x,
      y: point.y - this.pointerLast.y,
    };
    this.pointerLast.x = point.x;
    this.pointerLast.y = point.y;

    if (this.pointerDragged) {
      this.emit("world-drag-end", {
        point,
      });
      return;
    }

    const fixture = findFixture(this.context, point);
    this.emit("world-click", {
      point,
      fixture,
      background: !fixture,
    });
  };

  handlePointerCancel = () => {
    if (!this.context.world) return;

    this.emit("world-pointer-cancel");

    if (!this.pointerDown) return;

    this.pointerDown = false;

    if (this.pointerDragged) {
      this.emit("world-drag-cancel");
    }
  };
}

interface FindFixtureContext {
  world: World;
  stage: Stage.Root;
}

export function findFixture(context: FindFixtureContext, point: Vec2Value, filter?: (fixture: Fixture) => boolean) {
  const radius = getHitRadius(context.stage);

  let bestFixture: Fixture | undefined;
  let bestDistance = radius;

  const aabb = new AABB(point, point).extend(radius);

  const distanceInput = new DistanceInput();
  distanceInput.useRadii = true;
  distanceInput.proxyB.set(new CircleShape(0.00001), 0);
  distanceInput.transformB.p.x = point.x;
  distanceInput.transformB.p.y = point.y;
  distanceInput.transformB.q.s = 0;
  distanceInput.transformB.q.c = 1;

  context.world.queryAABB(aabb, function (fixture) {
    if (filter && !filter(fixture)) {
      return true;
    }

    if (fixture.testPoint(point)) {
      bestFixture = fixture;
      bestDistance = 0;
      return true;
    }

    for (let childIndex = fixture.getShape().getChildCount(); childIndex >= 0; childIndex--) {
      distanceInput.proxyA.set(fixture.getShape(), childIndex);
      const xf = fixture.getBody().getTransform();
      distanceInput.transformA.p.x = xf.p.x;
      distanceInput.transformA.p.y = xf.p.y;
      distanceInput.transformA.q.s = xf.q.s;
      distanceInput.transformA.q.c = xf.q.c;

      const cache = new SimplexCache();
      const output = new DistanceOutput();

      Distance(output, cache, distanceInput);

      const distance = Vec2.distance(output.pointA, output.pointB);

      if (distance < bestDistance) {
        bestFixture = fixture;
        bestDistance = distance;
      }
    }

    return bestDistance == 0 ? false : true;
  });

  return bestFixture;
}

export const getHitRadius = (component: Stage.Node) => {
  const pixelPerUnit = component.getLogicalPixelRatio();
  const hitRadius = HIT_RADIUS_PIXEL / pixelPerUnit;
  return hitRadius;
};
