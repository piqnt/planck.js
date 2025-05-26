/* eslint-disable @typescript-eslint/no-unused-expressions */
import Ajv from "ajv";
import { describe, it, expect } from "vitest";

import { Vec2 } from "../../common/Vec2";
import { CircleShape } from "../../collision/shape/CircleShape";
import { BoxShape } from "../../collision/shape/BoxShape";
import { DistanceJoint } from "../../dynamics/joint/DistanceJoint";
import { World } from "../../dynamics/World";

import { Serializer } from "..";

import schema from "../schema.json";

describe("Serializer", function () {
  var ajv = new Ajv();
  var validate = ajv.compile(schema);

  it("produces valid schema", function () {
    var world = new World();

    var circle = new CircleShape(1);
    var box = new BoxShape(1, 1);

    var b1 = world.createBody({
      position: new Vec2(0, 0),
      type: "dynamic",
    });

    b1.createFixture(circle);

    var b2 = world.createBody({
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

    var json = Serializer.toJson(world);

    // console.log(JSON.stringify(json, null, " "));

    var valid = validate(json);
    console.log(valid || validate.errors);
    expect(valid).be.true;
  });
});
