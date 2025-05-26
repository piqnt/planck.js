import planck, { World, Circle, Testbed } from '..';

const world = new World();

const body = world.createBody();
const shape = new Circle(3);

body.createFixture({
  shape,
});

planck.testbed(function(testbed) {
  testbed.info("Info text");
  return world;
});

const testbed = Testbed.mount();
testbed.info("Info text");
testbed.start(world);
