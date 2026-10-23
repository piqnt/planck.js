import { World, Testbed } from "planck/with-testbed";

const testbed = Testbed.mount();

const world = new World();

testbed.x = 0;
testbed.y = 0;
testbed.start(world);

testbed.info("This is a template, update the code and implement something here!");
