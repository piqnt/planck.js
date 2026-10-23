// Two boxes hung from the same ground, one rigid and one soft, so the difference frequencyHz and
// dampingRatio make can be watched rather than described. Embedded by docs/pages/joint/distance-joint.md.
import { World, Box, DistanceJoint, Testbed } from "planck/with-testbed";

const world = new World({ gravity: { x: 0, y: -10 } });

const testbed = Testbed.mount();
testbed.width = 24;
testbed.height = 14;
testbed.y = -2;
testbed.start(world);

// #region joints
const ground = world.createBody();
const shape = new Box(0.6, 0.6);

const rigid = world.createDynamicBody({ x: -4, y: -4 });
rigid.createFixture(shape, { density: 1 });
world.createJoint(
  new DistanceJoint({
    bodyA: ground,
    localAnchorA: { x: -4, y: 2 },
    bodyB: rigid,
    localAnchorB: { x: 0, y: 0 },
  }),
);

const soft = world.createDynamicBody({ x: 4, y: -4 });
soft.createFixture(shape, { density: 1 });
world.createJoint(
  new DistanceJoint({
    frequencyHz: 4,
    dampingRatio: 0.5,
    bodyA: ground,
    localAnchorA: { x: 4, y: 2 },
    bodyB: soft,
    localAnchorB: { x: 0, y: 0 },
  }),
);

// #endregion joints

testbed.info("left: rigid — right: frequencyHz 4, dampingRatio 0.5");
