import { Middleware } from "polymatic";
import { type Signal } from "@preact/signals";
import { getKey } from "../common/Key";

import {
  type Body,
  type Fixture,
  type World,
  type Vec2Value,
  AABB,
  CircleShape,
  Distance,
  DistanceInput,
  DistanceOutput,
  SimplexCache,
  Vec2,
} from "planck";

export interface WorldQueryMatch {
  worldBody: Body;
  worldFixture: Fixture;
  /** their keys (see WorldKeys), what the selection and the outline hold */
  body: string;
  fixture: string;
}

interface WorldQueryContext {
  world: Signal<World>;
  pointerRadius?: number;
  worldQuery: WorldQuery;
}

const DEFAULT_POINTER_RADIUS = 0.1;

/** what is under a point (the nearest fixture within the pointer's radius) or inside a box */
export class WorldQuery extends Middleware<WorldQueryContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate = () => {
    this.context.worldQuery = this;
  };

  testPoint = (point: Vec2Value, filter?: (match: WorldQueryMatch) => boolean): WorldQueryMatch | undefined => {
    const world = this.context.world.value;
    if (!world) return undefined;

    const radius = this.context.pointerRadius ?? DEFAULT_POINTER_RADIUS;

    let bestMatch: WorldQueryMatch | undefined;
    let bestDistance = radius;

    const aabb = new AABB(point, point).extend(radius);

    const distanceInput = new DistanceInput();
    distanceInput.useRadii = true;
    distanceInput.proxyB.set(new CircleShape(0.00001), 0);
    distanceInput.transformB.p.x = point.x;
    distanceInput.transformB.p.y = point.y;
    distanceInput.transformB.q.s = 0;
    distanceInput.transformB.q.c = 1;

    world.queryAABB(aabb, function (fixture) {
      const body = fixture.getBody();
      const match: WorldQueryMatch = {
        worldBody: body,
        worldFixture: fixture,
        body: getKey(body),
        fixture: getKey(fixture),
      };
      if (filter && !filter(match)) {
        return true;
      }

      if (fixture.testPoint(point)) {
        bestMatch = match;
        bestDistance = 0;
        return false;
      }

      for (let childIndex = fixture.getShape().getChildCount() - 1; childIndex >= 0; childIndex--) {
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
          bestMatch = match;
          bestDistance = distance;
        }
      }

      return true;
    });

    return bestMatch;
  };

  testBox = (start: Vec2Value, end: Vec2Value, filter?: (match: WorldQueryMatch) => boolean): WorldQueryMatch[] => {
    const world = this.context.world.value;
    if (!world) return [];

    const aabb = {
      lowerBound: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
      upperBound: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) },
    };
    const results: WorldQueryMatch[] = [];

    world.queryAABB(aabb, function (fixture) {
      const body = fixture.getBody();
      const match: WorldQueryMatch = {
        worldBody: body,
        worldFixture: fixture,
        body: getKey(body),
        fixture: getKey(fixture),
      };
      if (filter && !filter(match)) return true;
      results.push(match);
      return true;
    });

    return results;
  };
}
