import { World, Edge, Box, Testbed } from "planck";

const world = new World({ x: 0, y: -10 });

const testbed = Testbed.mount();
testbed.start(world);

const bar = world.createBody();
bar.createFixture(new Edge({ x: -20, y: 5 }, { x: 20, y: 5 }));
bar.setAngle(0.2);

for (let i = -2; i <= 2; i++) {
  for (let j = -2; j <= 2; j++) {
    const box = world.createBody().setDynamic();
    box.createFixture(new Box(0.5, 0.5));
    box.setPosition({ x: i * 1, y: -j * 1 + 20 });
    box.setMassData({
      mass: 1,
      center: { x: 0, y: 0 },
      I: 1,
    });
  }
}
