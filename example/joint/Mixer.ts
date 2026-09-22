import { World, Edge, Circle, Box, Chain, Math, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.y = 0;
testbed.start(world);

const container = world.createBody({
  type: "kinematic",
});

container.createFixture({
  shape: new Edge({ x: 15, y: -5 }, { x: 25, y: 5 }),
});
container.createFixture({
  shape: new Circle({ x: -10, y: -10 }, 3),
});
container.createFixture({
  shape: new Circle({ x: 10, y: 10 }, 3),
});
container.createFixture({
  shape: new Box(3, 3, { x: -10, y: 10 }),
});
container.createFixture({
  shape: new Box(3, 3, { x: 10, y: -10 }),
});

container.createFixture(
  new Chain(
    [
      { x: -20, y: -20 },
      { x: 20, y: -20 },
      { x: 20, y: 20 },
      { x: -20, y: 20 },
    ],
    true,
  ),
);

const n = 15;

for (let i = -n; i <= n; i++) {
  for (let j = -n; j <= n; j++) {
    const particle = world.createBody({
      type: "dynamic",
      position: { x: i * 1, y: j * 1 },
    });
    particle.createFixture({
      shape: Math.random() > 0.5 ? new Circle(0.4) : new Box(0.4, 0.4),
    });
    particle.setMassData({
      mass: 2,
      center: { x: 0, y: 0 },
      I: 0.4,
    });
    particle.applyForceToCenter({
      x: Math.random(-100, 100),
      y: Math.random(-100, 100),
    });
  }
}

container.setAngularVelocity(0.3);
