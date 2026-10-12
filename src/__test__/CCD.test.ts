import { describe, it, expect } from "vitest";

import { Vec2 } from "../common/Vec2";
import { Transform } from "../common/Transform";
import { CircleShape } from "../collision/shape/CircleShape";
import { TimeOfImpact, TOIInput, TOIOutput } from "../collision/TimeOfImpact";
import { Distance, SimplexCache, DistanceOutput, DistanceInput, DistanceProxy } from "../collision/Distance";
import { ChainShape } from "../collision/shape/ChainShape";
import { World } from "../dynamics/World";
import "../collision/shape/CollideEdgeCircle";

describe("CCD", function (): void {
  it("Distance", function (): void {
    const c1 = new CircleShape(1);
    {
      const input = new DistanceInput();
      input.proxyA.set(c1, 0);
      input.proxyB.set(c1, 0);
      input.transformB.p.setNum(1.9, 0);
      input.useRadii = true;
      const cache = new SimplexCache();
      const output = new DistanceOutput();
      Distance(output, cache, input);

      expect(output.distance).equal(0);
      console.log(output);
    }

    {
      const input = new DistanceInput();
      input.proxyA.set(c1, 0);
      input.proxyB.set(c1, 0);
      input.transformB.p.setNum(2.1, 0);

      input.useRadii = true;
      const cache = new SimplexCache();
      const output = new DistanceOutput();
      Distance(output, cache, input);

      expect(output.distance).closeTo(0.1, 1e-12);
      console.log(output);
    }
  });

  it("TimeOfImpact", function (): void {
    const c1 = new CircleShape(1);

    const input = new TOIInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);

    input.sweepA.setTransform(new Transform(new Vec2(0, 0), 0));
    input.sweepB.setTransform(new Transform(new Vec2(1.9, 0), 0));

    input.tMax = 1.0;

    const output = new TOIOutput();

    TimeOfImpact(output, input);
    console.log(output.t, output.state);

    input.sweepB.setTransform(new Transform(new Vec2(2, 0), 0));

    TimeOfImpact(output, input);
    console.log(output.t, output.state);

    input.sweepB.setTransform(new Transform(new Vec2(2.1, 0), 0));

    TimeOfImpact(output, input);
    console.log(output.t, output.state);
  });
});

describe("CCD with non-finite input", function (): void {
  it("DistanceProxy.getSupport returns a valid index for a NaN direction", function (): void {
    const proxy = new DistanceProxy();
    proxy.set(new CircleShape(1), 0);
    expect(proxy.getSupport(new Vec2(NaN, NaN))).equal(0);
    expect(proxy.getVertex(proxy.getSupport(new Vec2(NaN, 0)))).toBeDefined();
  });

  it("World.step does not throw when a body touching a chain becomes NaN", function (): void {
    // Regression for https://github.com/piqnt/planck.js/issues/315
    const world = new World({ gravity: new Vec2(0, 30) });
    const ground = world.createBody();
    const pts: Vec2[] = [];
    for (let i = 0; i < 15; i++) {
      const a = Math.PI / 2 + ((Math.PI / 2) * i) / 14;
      pts.push(new Vec2(5 + 1.9 * Math.cos(a), 5 + 1.9 * Math.sin(a)));
    }
    ground.createFixture(new ChainShape(pts, false));
    const ball = world.createBody({ type: "dynamic", bullet: true, position: new Vec2(3.2, 5.5) });
    ball.createFixture(new CircleShape(0.3), { density: 1 });
    for (let i = 0; i < 60; i++) world.step(1 / 240, 10, 4);
    expect(world.getContactCount()).toBeGreaterThan(0);

    ball.setLinearVelocity(new Vec2(NaN, 0));
    expect(() => {
      for (let i = 0; i < 10; i++) world.step(1 / 240, 10, 4);
    }).not.toThrow();
  });
});
