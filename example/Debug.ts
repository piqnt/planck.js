import planck from "../src/main";

const { Testbed, World, Vec2, Box } = planck;

const testbed = Testbed.mount();

const world = new World();

testbed.x = 0;
testbed.y = 0;
testbed.start(world);

testbed.info(
  "This is a template, update the code and implement something here!"
);
