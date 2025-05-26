// import util from 'util';
import { describe, it, expect } from "vitest";

import { Vec2 } from "../../common/Vec2";
import { CircleShape } from "../../collision/shape/CircleShape";
import { BoxShape } from "../../collision/shape/BoxShape";
import { DistanceJoint } from "../../dynamics/joint/DistanceJoint";
import { World } from "../../dynamics/World";

import { Serializer } from "../../serializer/index";

describe("Serializer", function (): void {
  it("saves and loads to JSON", function (): void {
    const world = new World();

    const circle = new CircleShape(1);
    const box = new BoxShape(1, 1);

    const b1 = world.createBody({
      position: new Vec2(0, 0),
      type: "dynamic",
    });

    b1.createFixture(circle);

    const b2 = world.createBody({
      position: new Vec2(2, 0),
      type: "dynamic",
    });
    b2.createFixture(box);

    world.createJoint(
      new DistanceJoint({
        bodyA: b1,
        localAnchorA: new Vec2(6, 0),
        bodyB: b2,
        localAnchorB: new Vec2(0, -1),
      }),
    );

    const json1 = Serializer.toJson(world);
    const text1 = JSON.stringify(json1, null, " ");

    const world2 = Serializer.fromJson(json1);
    const json2 = Serializer.toJson(world2);

    const text2 = JSON.stringify(json2, null, " ");

    expect(json1).to.deep.equal(json2);
    expect(text1.split("\n")).to.deep.equal(text2.split("\n"));
  });
});
