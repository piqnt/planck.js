const { Vec2, World, Edge, Box, Testbed } = planck;

let world = new World(new Vec2(0, -10));

const testbed = Testbed.mount();
testbed.start(world);

let bar = world.createBody();
bar.createFixture(new Edge(new Vec2(-20, 5), new Vec2(20, 5)));
bar.setAngle(0.2);

for (let i = -2; i <= 2; i++) {
  for (let j = -2; j <= 2; j++) {
    let box = world.createBody().setDynamic();
    box.createFixture(new Box(0.5, 0.5));
    box.setPosition(new Vec2(i * 1, -j * 1 + 20));
    box.setMassData({
      mass : 1,
      center : new Vec2(),
      I : 1
    });
  }
}
