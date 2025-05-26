import { describe, it, expect } from "vitest";

import { Vec2 } from "../common/Vec2";
import { Vec3 } from "../common/Vec3";

describe("Math", function (): void {
  it("Vec2", function (): void {
    const v = new Vec2();
    expect(v.x).equal(0);
    expect(v.y).equal(0);

    v.setNum(3, 4);
    expect(v.x).equal(3);
    expect(v.y).equal(4);
    expect(v.length()).equal(5);
    expect(v.lengthSquared()).equal(25);

    v.normalize();
    expect(v.x).closeTo(3 / 5, 1e-12);
    expect(v.y).closeTo(4 / 5, 1e-12);

    v.setZero();
    expect(v.x).equal(0);
    expect(v.y).equal(0);

    v.add(new Vec2(3, 2));
    expect(v.x).equal(3);
    expect(v.y).equal(2);

    v.sub(new Vec2(2, 1));
    expect(v.x).equal(1);
    expect(v.y).equal(1);

    v.mul(5);
    expect(v.x).equal(5);
    expect(v.y).equal(5);

    v.setNum(2, 3);
    expect(v.x).equal(2);
    expect(v.y).equal(3);

    const sv = Vec2.skew(v);
    expect(sv.x).equal(-3);
    expect(sv.y).equal(2);

    const d = Vec2.dot(v, new Vec2(2, 3));
    expect(d).equal(13);

    const cvv = Vec2.crossVec2Vec2(v, new Vec2(2, 3));
    expect(cvv).equal(0);

    const cvn = Vec2.crossVec2Num(v, 5);
    expect(cvn.x).equal(15);
    expect(cvn.y).equal(-10);

    const c = Vec2.clamp(new Vec2(6, 8), 5);
    expect(c.x).closeTo(3, 1e-12);
    expect(c.y).closeTo(4, 1e-12);
  });

  it("Vec3", function (): void {
    const v0 = new Vec3();
    expect(v0.x).equal(0);
    expect(v0.y).equal(0);
    expect(v0.z).equal(0);

    const v = new Vec3(3, 4, 5);
    expect(v.x).equal(3);
    expect(v.y).equal(4);
    expect(v.z).equal(5);

    v.setZero();
    expect(v.x).equal(0);
    expect(v.y).equal(0);
    expect(v.z).equal(0);

    v.add(new Vec3(3, 2, 1));
    expect(v.x).equal(3);
    expect(v.y).equal(2);
    expect(v.z).equal(1);

    v.sub(new Vec3(0, 1, 2));
    expect(v.x).equal(3);
    expect(v.y).equal(1);
    expect(v.z).equal(-1);

    v.mul(5);
    expect(v.x).equal(15);
    expect(v.y).equal(5);
    expect(v.z).equal(-5);

    v.set(2, 3, 4);
    expect(v.x).equal(2);
    expect(v.y).equal(3);
    expect(v.z).equal(4);

    const d = Vec3.dot(v, new Vec3(2, 0, -1));
    expect(d).equal(0);

    const c = Vec3.cross(v, new Vec3(2, 0, -1));
    expect(c.x).equal(-3);
    expect(c.y).equal(10);
    expect(c.z).equal(-6);
  });
});
