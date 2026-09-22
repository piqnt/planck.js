import { World, Edge, Box, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.start(world);

const bar = world.createBody({
  type: "static",
  angle: 0.2,
});
bar.createFixture({
  shape: new Edge({ x: -20, y: 5 }, { x: 20, y: 5 }),
});

for (let i = -2; i <= 2; i++) {
  for (let j = -2; j <= 2; j++) {
    const box = world.createBody({
      type: "dynamic",
      position: { x: i * 1, y: -j * 1 + 20 },
    });
    box.setMassData({
      mass: 1,
      center: { x: 0, y: 0 },
      I: 1,
    });
    box.createFixture({
      shape: new Box(0.5, 0.5),
    });
  }
}
