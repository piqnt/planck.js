const { Vec2, World, Edge, Circle, Box, Chain, Math } = planck;

var world = new World(new Vec2(0, -10));

const testbed = planck.testbed();
testbed.y = 0;
testbed.start(world);

var container = world.createKinematicBody();
container.createFixture(new Edge(new Vec2(15, -5), new Vec2(25, 5)));
container.createFixture(new Circle(new Vec2(-10, -10), 3));
container.createFixture(new Circle(new Vec2(10, 10), 3));
container.createFixture(new Box(3, 3, new Vec2(-10, 10)));
container.createFixture(new Box(3, 3, new Vec2(10, -10)));

container.createFixture(new Chain(
  [new Vec2(-20, -20), new Vec2(20, -20), new Vec2(20, 20), new Vec2(-20, 20)],
  true
));

const n = 15;

for (var i = -n; i <= n; i++) {
  for (var j = -n; j <= n; j++) {
    var particle = world.createDynamicBody(new Vec2(i * 1, j * 1));
    particle.createFixture(Math.random() > 0.5 ? new Circle(0.4) : new Box(0.4, 0.4));
    particle.setMassData({
      mass : 2,
      center : new Vec2(),
      I : 0.4
    });
    particle.applyForceToCenter(new Vec2(Math.random(-100, 100), Math.random(-100, 100)));
  }
}

container.setAngularVelocity(0.3);
