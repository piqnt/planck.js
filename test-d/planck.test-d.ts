import { World, Circle } from '..';

const world = new World();

const body = world.createBody();
const shape = new Circle(3);

body.createFixture({
  shape,
});
