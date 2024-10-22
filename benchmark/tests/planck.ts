import { World, Vec2, Edge, Box } from "../../src/index";

import { TestFactory } from "../benchmark";

export const planckFactory: TestFactory = (gravity, edgeV1, edgeV2, edgeDensity) => {
    const world = new World({
        gravity: Vec2.create(gravity.x, gravity.y),
    });
    const ground = world.createBody({});

    const edgeShape = new Edge(Vec2.create(edgeV1.x, edgeV1.y), Vec2.create(edgeV2.x, edgeV2.y));
    ground.createFixture(edgeShape as any, edgeDensity);

    return {
        name: "planck.js (current)",
        createBoxShape(hx: number, hy: number) {
            return new Box(hx, hy);
        },
        createBoxBody(shape: any, x: number, y: number, density: number) {
            const body = world.createBody({
                type: "dynamic",
                position: Vec2.create(x, y),
            });
            body.createFixture(shape, density);
        },
        step(timeStep: number, velocityIterations: number, positionIterations: number) {
            world.step(timeStep, velocityIterations, positionIterations);
        },
    };
};
