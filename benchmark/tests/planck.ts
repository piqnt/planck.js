import { World, Vec2, Edge, Box } from "../../src/index";

import { TestFactory } from "../benchmark";

export const planckFactory: TestFactory = (gravity, edgeV1, edgeV2, edgeDensity) => {
    const world = new World({
        gravity: new Vec2(gravity.x, gravity.y),
    });
    const ground = world.createBody({});

    const edgeShape = new Edge(new Vec2(edgeV1.x, edgeV1.y), new Vec2(edgeV2.x, edgeV2.y));
    ground.createFixture(edgeShape as any, edgeDensity);

    return {
        name: "planck.js (current)",
        createBoxShape(hx: number, hy: number) {
            return new Box(hx, hy);
        },
        createBoxBody(shape: any, x: number, y: number, density: number) {
            const body = world.createBody({
                type: "dynamic",
                position: new Vec2(x, y),
            });
            body.createFixture(shape, density);
        },
        step(timeStep: number, velocityIterations: number, positionIterations: number) {
            world.step(timeStep, velocityIterations, positionIterations);
        },
    };
};
