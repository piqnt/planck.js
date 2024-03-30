import "./fixprocess";

const { b2World, b2Vec2, b2EdgeShape, b2PolygonShape, b2_dynamicBody, b2BodyDef } = Box2D;

import type { TestFactory } from "../benchmark";

export const box2dJsFactory: TestFactory = (gravity, edgeV1, edgeV2, edgeDensity) => {
    const world = new b2World(new b2Vec2(gravity.x, gravity.y));
    const ground = world.CreateBody(new b2BodyDef());

    const edgeShape = new b2EdgeShape();
    edgeShape.Set(new b2Vec2(edgeV1.x, edgeV1.y), new b2Vec2(edgeV2.x, edgeV2.y));
    ground.CreateFixture(edgeShape as any, edgeDensity);

    return {
        name: "box2d.js",
        createBoxShape(hx: number, hy: number) {
            const box = new b2PolygonShape();
            box.SetAsBox(hx, hy);
            return box;
        },
        createBoxBody(shape: any, x: number, y: number, density: number) {
            const bd = new b2BodyDef();
            bd.set_type(b2_dynamicBody);
            bd.set_position(new b2Vec2(x, y));
            const body = world.CreateBody(bd);
            body.CreateFixture(shape, density);
        },
        step(timeStep: number, velocityIterations: number, positionIterations: number) {
            world.Step(timeStep, velocityIterations, positionIterations);
        },
    };
};
