import * as sinon from "sinon";
import { describe, it, expect } from "vitest";

import { Vec2 } from "../common/Vec2";
import { AABB } from "../collision/AABB";
import { DynamicTree } from "../collision/DynamicTree";
import { BroadPhase } from "../collision/BroadPhase";
import { Transform } from "../common/Transform";
import { Manifold, ManifoldType } from "../collision/Manifold";
import { EdgeShape } from "../collision/shape/EdgeShape";
import { BoxShape } from "../collision/shape/BoxShape";
import { CollideEdgePolygon } from "../collision/shape/CollideEdgePolygon";

describe("Collision", function (): void {
  it("AABB", function (): void {
    const o = new AABB();
    expect(o.isValid()).equal(true);

    o.upperBound.setNum(10, 6);
    o.lowerBound.setNum(6, 4);

    const c = o.getCenter();
    expect(c.x).equal(8);
    expect(c.y).equal(5);

    const e = o.getExtents();
    expect(e.x).equal(2);
    expect(e.y).equal(1);

    const p = o.getPerimeter();
    expect(p).equal(12);

    o.combine(new AABB(new Vec2(7, 4), new Vec2(9, 6)));
    expect(o.upperBound.x).equal(10);
    expect(o.upperBound.y).equal(6);
    expect(o.lowerBound.x).equal(6);
    expect(o.lowerBound.y).equal(4);

    o.combine(new AABB(new Vec2(5, 3), new Vec2(11, 7)));
    expect(o.upperBound.x).equal(11);
    expect(o.upperBound.y).equal(7);
    expect(o.lowerBound.x).equal(5);
    expect(o.lowerBound.y).equal(3);

    expect(o.contains(new AABB(new Vec2(5, 3), new Vec2(11, 7)))).equal(true);
    expect(o.contains(new AABB(new Vec2(5, 2), new Vec2(11, 7)))).equal(false);
    expect(o.contains(new AABB(new Vec2(4, 2), new Vec2(11, 7)))).equal(false);
    expect(o.contains(new AABB(new Vec2(5, 3), new Vec2(11, 8)))).equal(false);
    expect(o.contains(new AABB(new Vec2(5, 3), new Vec2(12, 7)))).equal(false);

    // rayCast
  });

  it("DynamicTree", function (): void {
    const tree = new DynamicTree();

    const foo = tree.createProxy(new AABB(new Vec2(0, 0), new Vec2(1, 1)), "foo");
    const bar = tree.createProxy(new AABB(new Vec2(1, 1), new Vec2(2, 2)), "bar");
    const baz = tree.createProxy(new AABB(new Vec2(2, 2), new Vec2(3, 3)), "baz");

    expect(tree.getHeight()).equal(2);

    expect(tree.getUserData(foo)).equal("foo");
    expect(tree.getUserData(bar)).equal("bar");
    expect(tree.getUserData(baz)).equal("baz");

    expect(tree.getFatAABB(foo).upperBound.x).be.above(1);
    expect(tree.getFatAABB(foo).upperBound.y).be.above(1);
    expect(tree.getFatAABB(foo).lowerBound.x).be.below(0);
    expect(tree.getFatAABB(foo).lowerBound.y).be.below(0);

    const QueryCallback = sinon.spy();
    const callback = QueryCallback;

    tree.query(new AABB(new Vec2(1, 1), new Vec2(2, 2)), callback);
    expect(QueryCallback.calledWith(foo)).equal(true);
    expect(QueryCallback.calledWith(bar)).equal(true);
    expect(QueryCallback.calledWith(baz)).equal(true);

    tree.query(new AABB(new Vec2(0.3, 0.3), new Vec2(0.7, 0.7)), callback);
    expect(QueryCallback.lastCall.calledWith(foo)).equal(true);

    tree.query(new AABB(new Vec2(1.3, 1.3), new Vec2(1.7, 1.7)), callback);
    expect(QueryCallback.lastCall.calledWith(bar)).equal(true);

    tree.query(new AABB(new Vec2(2.3, 2.3), new Vec2(2.7, 2.7)), callback);
    expect(QueryCallback.lastCall.calledWith(baz)).equal(true);

    expect(tree.moveProxy(foo, new AABB(new Vec2(0, 0), new Vec2(1, 1)), new Vec2(0.01, 0.01))).equal(false);

    expect(tree.moveProxy(baz, new AABB(new Vec2(3, 3), new Vec2(4, 4)), new Vec2(0, 0))).equal(true);

    tree.query(new AABB(new Vec2(3.3, 3.3), new Vec2(3.7, 3.7)), callback);
    expect(QueryCallback.lastCall.calledWith(baz)).equal(true);

    tree.destroyProxy(foo);
    expect(tree.getHeight()).equal(1);

    tree.destroyProxy(bar);
    expect(tree.getHeight()).equal(0);

    tree.destroyProxy(baz);
    expect(tree.getHeight()).equal(0);
  });

  it("BroadPhase", function (): void {
    const bp = new BroadPhase();

    const AddPair = sinon.spy();
    const callback = AddPair;

    // @ts-ignore
    const foo = bp.createProxy(new AABB(new Vec2(0, 0), new Vec2(1, 1)), "foo");
    // @ts-ignore
    const bar = bp.createProxy(new AABB(new Vec2(2, 2), new Vec2(3, 3)), "bar");

    bp.updatePairs(callback);
    expect(AddPair.callCount).equal(0);

    // @ts-ignore
    const baz = bp.createProxy(new AABB(new Vec2(1, 1), new Vec2(2, 2)), "baz");

    AddPair.resetHistory();
    bp.updatePairs(callback);
    expect(AddPair.callCount).equal(2);
    expect(AddPair.calledWith("bar", "baz")).equal(true);
    expect(AddPair.calledWith("foo", "baz")).equal(true);

    bp.moveProxy(baz, new AABB(new Vec2(0.5, 0.5), new Vec2(1.5, 1.5)), new Vec2());

    AddPair.resetHistory();
    bp.updatePairs(callback);
    expect(AddPair.callCount).equal(1);
    expect(AddPair.calledWith("foo", "baz")).equal(true);
  });
});

describe("CollideEdgePolygon contact ids", function (): void {
  it("gives the two points of a face-B manifold distinct ids", function (): void {
    // Regression for https://github.com/piqnt/planck.js/issues/315: with equal ids, Contact.update copies
    // the first point's warm-start impulse onto both points, which lets jammed contacts run away.
    // Boxes lying across the edge with the box face as the reference face and both edge ends inside it.
    const edge = new EdgeShape(new Vec2(-1, 0), new Vec2(1, 0));
    const xfA = new Transform(new Vec2(0, 0), 0);
    const cases = [
      {
        hw: 0.4475753784179688,
        hh: 0.23543739318847656,
        x: 0.882720947265625,
        y: 0.23307838439941406,
        angle: -1.7545952606201172,
      },
      {
        hw: 0.22182068824768067,
        hh: 0.31885512471199035,
        x: -0.9197063446044922,
        y: -0.11656492352485656,
        angle: 1.350540463924408,
      },
      {
        hw: 0.556450080871582,
        hh: 0.4116379737854004,
        x: -0.7844958305358887,
        y: -0.38117035031318663,
        angle: 1.504119803905487,
      },
    ];
    const manifold = new Manifold();
    for (const c of cases) {
      const box = new BoxShape(c.hw, c.hh);
      const xfB = new Transform(new Vec2(c.x, c.y), c.angle);
      manifold.recycle();
      CollideEdgePolygon(manifold, edge, xfA, box, xfB);
      expect(manifold.type).equal(ManifoldType.e_faceB);
      expect(manifold.pointCount).equal(2);
      expect(manifold.points[0].id.key).not.equal(manifold.points[1].id.key);
    }
  });
});
