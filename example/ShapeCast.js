/*
 * Copyright (c) Erin Catto
 *
 * This source code is licensed under the MIT license.
 */

const { Vec2, Transform, World, Settings, ShapeCastInput, ShapeCastOutput, ShapeCast, DistanceInput, DistanceOutput, Distance, SimplexCache, Testbed } = planck;

let world = new World();

const testbed = Testbed.mount();
testbed.width = 40;
testbed.height = 40;
testbed.start(world);

const vAs = new Array(3).fill().map(() => Vec2.zero());
let countA;
let radiusA;

const vBs = new Array(Settings.maxPolygonVertices).fill().map(() => Vec2.zero());
let countB;
let radiusB;

let transformA;
let transformB;
let translationB;

if (true) {
  vAs[0].set(-0.5, 1.0);
  vAs[1].set(0.5, 1.0);
  vAs[2].set(0.0, 0.0);
  countA = 3;
  radiusA = Settings.polygonRadius;

  vBs[0].set(-0.5, -0.5);
  vBs[1].set(0.5, -0.5);
  vBs[2].set(0.5, 0.5);
  vBs[3].set(-0.5, 0.5);
  countB = 4;
  radiusB = Settings.polygonRadius;

  transformA = new Transform(new Vec2(4, 0.25));
  transformB = new Transform(new Vec2(-4, 0));
  translationB = new Vec2(8.0, 0.0);
} else if (true) {
  vAs[0].set(0.0, 0.0);
  countA = 1;
  radiusA = 0.5;

  vBs[0].set(0.0, 0.0);
  countB = 1;
  radiusB = 0.5;

  transformA = new Transform(new Vec2(0, 0.25));
  transformB = new Transform(new Vec2(-4, 0));
  translationB = new Vec2(8.0, 0.0);
} else {
  vAs[0].set(0.0, 0.0);
  vAs[1].set(2.0, 0.0);
  countA = 2;
  radiusA = Settings.polygonRadius;

  vBs[0].set(0.0, 0.0);
  countB = 1;
  radiusB = 0.25;

  // Initial overlap
  transformA = new Transform(new Vec2(0, 0));
  transformB = new Transform(new Vec2(-0.244360745, 0.05999358));
  transformB.q.setIdentity();
  translationB = new Vec2(0.0, 0.0399999991);
}

testbed.step = function() {
  const transformB = Transform.identity();

  const input = new ShapeCastInput();
  input.proxyA.setVertices(vAs, countA, radiusA);
  input.proxyB.setVertices(vBs, countB, radiusB);
  input.transformA.set(transformA);
  input.transformB.set(transformB);
  input.translationB.set(translationB);

  const output = new ShapeCastOutput();

  const hit = ShapeCast(output, input);

  const transformB2 = new Transform(
    Vec2.combine(1, transformB.p, output.lambda, input.translationB),
    transformB.q.getAngle()
  );

  const distanceInput = new DistanceInput();
  distanceInput.proxyA.setVertices(vAs, countA, radiusA);
  distanceInput.proxyB.setVertices(vBs, countB, radiusB);
  distanceInput.transformA.set(transformA);
  distanceInput.transformB.set(transformB2);
  distanceInput.useRadii = false;
  const simplexCache = new SimplexCache();
  simplexCache.count = 0;
  const distanceOutput = new DistanceOutput();
  
  Distance(distanceOutput, simplexCache, distanceInput);

  testbed.status({
    hit,
    iters: output.iterations,
    lambda: output.lambda,
    distance: distanceOutput.distance,
  });

  const vertices = new Array(Settings.maxPolygonVertices);

  for (let i = 0; i < countA; ++i) {
    vertices[i] = Transform.mul(transformA, vAs[i]);
  }
  if (countA == 1) {
    testbed.drawCircle(vertices[0], radiusA, testbed.color(0.9, 0.9, 0.9));
  } else {
    testbed.drawPolygon(vertices.slice(0, countA), testbed.color(0.9, 0.9, 0.9));
  }

  for (let i = 0; i < countB; ++i) {
    vertices[i] = Transform.mul(transformB, vBs[i]);
  }
  if (countB == 1) {
    testbed.drawCircle(vertices[0], radiusB, testbed.color(0.5, 0.9, 0.5));
  } else {
    testbed.drawPolygon(vertices.slice(0, countB), testbed.color(0.5, 0.9, 0.5));
  }

  for (let i = 0; i < countB; ++i) {
    vertices[i] = Transform.mul(transformB2, vBs[i]);
  }
  if (countB == 1) {
    testbed.drawCircle(vertices[0], radiusB, testbed.color(0.5, 0.7, 0.9));
  } else {
    testbed.drawPolygon(vertices.slice(0, countB), testbed.color(0.5, 0.7, 0.9));
  }

  if (hit) {
    const p1 = output.point;
    testbed.drawPoint(p1, 10.0, testbed.color(0.9, 0.3, 0.3));
    const p2 = Vec2.add(p1, output.normal);
    testbed.drawSegment(p1, p2, testbed.color(0.9, 0.3, 0.3));
  }
};
