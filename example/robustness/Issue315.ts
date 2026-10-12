// Reproduces https://github.com/piqnt/planck.js/issues/315 on planck 1.5.0. Needed, all at once:
// - an edge or chain segment short enough to lie entirely under a polygon face, entering the polygon
//   from the face side: the manifold then takes the polygon face as its reference face and its two
//   points are the segment's ends, which 1.5.0 tagged with the same contact id;
// - uneven load on those two points (here: the joint pulls off-centre);
// - a body that can never resolve the overlap: a joint pulling it into the segment, and a pocket that
//   leaves it no way out.
// Warm starting then puts the stored impulses on the wrong points every step and they grow by a constant
// factor until they overflow, and World.step() throws from the time-of-impact solver. Exact values matter;
// a plain Edge works too but is more fragile, the chain's ghost segments help hold the jam.

import { World, Vec2, Box, Chain, RevoluteJoint, Testbed } from "planck";

const world = new World({ gravity: { x: 0, y: -10 } });

const testbed = Testbed.mount();
testbed.x = 0;
testbed.y = 0;
testbed.width = 6;
testbed.height = 4;
testbed.hz = 240;
testbed.info("Box wedged in a pocket and pulled into a chain (#315): the joint impulse should stay small");
testbed.start(world);

// the testbed steps the world with its own iteration counts; the jam needs 10 and 4
testbed.on("step-before", (ev) => {
  ev.velocityIterations = 10;
  ev.positionIterations = 4;
});

const hw = 0.8420396029949189; // box half width
const hh = 0.4911016643047333; // box half height
const top = 0.31806490421295164; // the box's top face; the chain runs along y = 0, 0.31806490421295164 below it
const clearance = 0.01;

// the pocket
const pocket = world.createBody({ type: "static" });
pocket.createFixture({ shape: new Box(hw + 1, 0.5, { x: 0, y: top - 2 * hh - clearance - 0.5 }) }); // floor
pocket.createFixture({ shape: new Box(0.5, 2, { x: -hw - clearance - 0.5, y: top - hh }) }); // left wall
pocket.createFixture({ shape: new Box(0.5, 2, { x: hw + clearance + 0.5, y: top - hh }) }); // right wall
pocket.createFixture({ shape: new Box(hw + 1, 0.5, { x: 0, y: top + clearance + 0.5 }) }); // ceiling

// the chain segment through the box, with a ghost vertex at each end
const edgeX = 0.11306583743303378;
const edgeLen = 0.9754352510894264;
const ghostY = 0.18355602025985718;
const chain = world.createBody({ type: "static" });
chain.createFixture({
  shape: new Chain(
    [
      new Vec2(edgeX - edgeLen / 2 - 0.4, ghostY),
      new Vec2(edgeX - edgeLen / 2, 0),
      new Vec2(edgeX + edgeLen / 2, 0),
      new Vec2(edgeX + edgeLen / 2 + 0.4, ghostY),
    ],
    false,
  ),
});

// the box, frictionless, never allowed to sleep
const box = world.createBody({ type: "dynamic", position: { x: 0, y: top - hh }, allowSleep: false });
box.createFixture({ shape: new Box(hw, hh), density: 1, friction: 0 });

// the joint, created already violated: its ground anchor is `pull` above its box anchor
const px = -0.5868638832898313;
const pull = 0.4969154834747314;
const pivot = world.createBody({ type: "static" });
const joint = world.createJoint(
  new RevoluteJoint(
    { localAnchorA: { x: px, y: top + pull }, localAnchorB: box.getLocalPoint({ x: px, y: top }) },
    pivot,
    box,
  ),
)!;

let time = 0;
testbed.step = function (dt) {
  time += dt / 1000;
  const impulse = Math.hypot(joint.m_impulse.x, joint.m_impulse.y);
  const a = joint.getAnchorA();
  const b = joint.getAnchorB();
  testbed.status("time", time.toFixed(2) + " s");
  testbed.status("joint impulse", impulse.toExponential(2));
  testbed.status("anchor error", Math.hypot(a.x - b.x, a.y - b.y).toFixed(3) + " m");
};
