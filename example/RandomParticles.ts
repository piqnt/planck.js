import { World, Box, Testbed } from "planck";

const world = new World();

const particles: any[] = [];
for (let i = 0; i < 10000; i++) {
  particles.push({
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5,
    vx: (Math.random() - 0.5) * 0.01,
    vy: (Math.random() - 0.5) * 0.01,
    r: 255, //(Math.random() * 255) | 0,
    g: 255, //(Math.random() * 255) | 0,
    b: 255, //(Math.random() * 255) | 0,
  });
}

(world as any)["particles"] = particles;

const testbed = Testbed.mount();
testbed.y = 0;
testbed.start(world);

const box = world.createBody({
  type: "static",
  position: { x: 0, y: 0 },
});

box.createFixture({
  shape: new Box(10, 10),
  density: 1.0,
});

testbed.step = function (dt) {
  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
};
