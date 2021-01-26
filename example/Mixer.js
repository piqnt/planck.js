planck.testbed('Mixer', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  testbed.y = 0;

  var container = world.createKinematicBody();
  container.createFixture(pl.Edge(Vec2(15, -5), Vec2(25, 5)));
  container.createFixture(pl.Circle(Vec2(-10, -10), 3));
  container.createFixture(pl.Circle(Vec2(10, 10), 3));
  container.createFixture(pl.Box(3, 3, Vec2(-10, 10)));
  container.createFixture(pl.Box(3, 3, Vec2(10, -10)));

  container.createFixture(pl.Chain(
    [Vec2(-20, -20), Vec2(20, -20), Vec2(20, 20), Vec2(-20, 20)],
    true
  ));

  for (var i = -5; i <= 5; i++) {
    for (var j = -5; j <= 5; j++) {
      var particle = world.createDynamicBody(Vec2(i * 2, j * 2));
      particle.createFixture(Math.random() > 0.5 ? pl.Circle(0.6) : pl.Box(0.6, 0.4));
      particle.setMassData({
        mass : 2,
        center : Vec2(),
        I : 0.4
      });
      particle.applyForceToCenter(Vec2(pl.Math.random(-100, 100), pl.Math.random(-100, 100)));
    }
  }

  container.setAngularVelocity(0.3);

  return world
});
