planck.testbed('Boxes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = pl.World(Vec2(0, -10));

  var bar = world.createBody();
  bar.createFixture(pl.Edge(Vec2(-20, 5), Vec2(20, 5)));
  bar.setAngle(0.2);

  for (var i = -2; i <= 2; i++) {
    for (var j = -2; j <= 2; j++) {
      var box = world.createBody().setDynamic();
      box.createFixture(pl.Box(0.5, 0.5));
      box.setPosition(Vec2(i * 1, -j * 1 + 20));
      box.setMassData({
        mass : 1,
        center : Vec2(),
        I : 1
      })
    }
  }

  return world
});
