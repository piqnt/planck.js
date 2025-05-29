import { World, Vec2, EdgeShape, BoxShape, Body } from "../../src/index";

import { TestFactory } from "../benchmark";

export const planckFactory: TestFactory = (gravity, edgeV1, edgeV2, edgeDensity) => {
  let world: World | null = null;
  let ground: Body | null = null;
  let edgeShape: EdgeShape | null = null;
  return {
    name: "planck.js (current)",
    setup() {
      world = new World({
        gravity: new Vec2(gravity.x, gravity.y),
      });
      ground = world.createBody({});

      edgeShape = new EdgeShape(new Vec2(edgeV1.x, edgeV1.y), new Vec2(edgeV2.x, edgeV2.y));
      ground.createFixture(edgeShape as any, edgeDensity);
    },
    createBoxShape(hx: number, hy: number) {
      return new BoxShape(hx, hy);
    },
    createBoxBody(shape: any, x: number, y: number, density: number) {
      const body = world?.createBody({
        type: "dynamic",
        position: new Vec2(x, y),
      });
      body?.createFixture(shape, density);
    },
    step(timeStep: number, velocityIterations: number, positionIterations: number) {
      world?.step(timeStep, velocityIterations, positionIterations);
    },
    teardown() {
      world = null;
      ground = null;
      edgeShape = null;
    },
  };
};
