import { describe, it, expect } from "vitest";

import { Vec2 } from "../common/Vec2";
import { PolygonShape } from "../collision/shape/PolygonShape";

describe("PolygonShape", function (): void {
  it("builds the hull when a vertex lies on an edge (round-off collinear)", function (): void {
    // (0.3, 0.2) lies on the segment from (0.5, -0.1) to (0.1, 0.5), but the
    // cross products are about 1e-17 with signs that depend on the pivot.
    const shape = new PolygonShape([new Vec2(0.3, 0.2), new Vec2(0.5, -0.1), new Vec2(0.1, 0.5), new Vec2(0.4, 0.5)]);

    expect(shape.m_count).equal(3);
    expect(shape.m_vertices.map((v) => [v.x, v.y])).deep.equal([
      [0.5, -0.1],
      [0.4, 0.5],
      [0.1, 0.5],
    ]);
    expect(shape.m_centroid.x).closeTo(1 / 3, 1e-12);
    expect(shape.m_centroid.y).closeTo(0.3, 1e-12);
  });

  it("keeps exact collinear handling", function (): void {
    const shape = new PolygonShape([new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(2, 2), new Vec2(0, 2)]);
    expect(shape.m_count).equal(4);
  });
});
