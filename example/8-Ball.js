planck.play('8 Ball', function(pl, testbed) {
  var Vec2 = pl.Vec2, Math = pl.Math;

  var SPI4 = Math.sin(Math.PI / 4), SPI3 = Math.sin(Math.PI / 3);

  var width = 8.00, height = 4.00;

  var BALL_R = 0.12;
  var POCKET_R = 0.16;

  testbed.x = 0;
  testbed.y = 0;
  testbed.width = width * 1.2;
  testbed.height = height * 1.2;
  testbed.ratio = 100;
  testbed.mouseForce = -30;

  pl.internal.Settings.velocityThreshold = 0;

  var world = pl.World({});

  var railH = [
    Vec2(POCKET_R , height * .5),
    Vec2(POCKET_R , height * .5 + POCKET_R),
    Vec2(width * .5 - POCKET_R / SPI4 + POCKET_R, height * .5 + POCKET_R),
    Vec2(width * .5 - POCKET_R / SPI4, height * .5)
  ];

  var railV = [
    Vec2(width * .5, POCKET_R),
    Vec2(width * .5 + POCKET_R, POCKET_R),
    Vec2(width * .5 + POCKET_R, height * .5 - POCKET_R / SPI4 + POCKET_R),
    Vec2(width * .5, height * .5 - POCKET_R / SPI4)
  ];

  var railFixDef = {
    friction : 0.1,
    restitution : 0.9,
    userData : 'rail'
  };
  var pocketFixDef = {
    userData : 'pocket'
  };
  var ballFixDef = {
    friction: 0.1,
    restitution: 0.99,
    density: 1,
    userData : 'ball'
  };
  var ballBodyDef = {
    linearDamping : 1.5,
    angularDamping : 1
  };

  world.createBody().createFixture(pl.Polygon(railV.map(scale(+1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railV.map(scale(+1, -1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railV.map(scale(-1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railV.map(scale(-1, -1))), railFixDef);

  world.createBody().createFixture(pl.Polygon(railH.map(scale(+1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railH.map(scale(-1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railH.map(scale(+1, -1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railH.map(scale(-1, -1))), railFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(0, -height * .5 - POCKET_R * 1.5), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(0, +height * .5 + POCKET_R * 1.5), POCKET_R), pocketFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(+width * .5 + POCKET_R * 1.5, 0), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(-width * .5 - POCKET_R * 1.5, 0), POCKET_R), pocketFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(+width * .5 + POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(-width * .5 - POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(+width * .5 + POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(-width * .5 - POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);

  var balls = rack(5, BALL_R).map(translate(width / 4, 0));

  balls.push(Vec2(-width / 4, 0));

  for (i = 0; i < balls.length; i++) {
    var ball = world.createDynamicBody(ballBodyDef);
    ball.setPosition(balls[i]);
    ball.createFixture(pl.Circle(BALL_R), ballFixDef);
  }

  world.on('post-solve', function(contact) {
    var fA = contact.getFixtureA(), bA = fA.getBody();
    var fB = contact.getFixtureB(), bB = fB.getBody();

    var pocket = fA.getUserData() == pocketFixDef.userData && bA || fB.getUserData() == pocketFixDef.userData && bB;
    var ball = fA.getUserData() == ballFixDef.userData && bA || fB.getUserData() == ballFixDef.userData && bB;

    // do not change world immediately
    setTimeout(function() {
      if (ball && pocket) {
        world.destroyBody(ball);
      }
    }, 1);
  });

  return world;

  function rack(n, r) {
    var balls = [];
    var d = r * 2, l = SPI3 * d;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j <= i; j++) {
        balls.push(Vec2(i * l /*- (n - 1) * 0.5 * l*/ + Math.random(r * 0.02), (j - i * 0.5 ) * d + Math.random(r * 0.02)));
      }
    }
    return balls;
  }

  function scale(x, y) {
    return function (v) {
      return pl.Vec2(v.x * x, v.y * y);
    };
  }

  function translate(x, y) {
    return function (v) {
      return pl.Vec2(v.x + x, v.y + y);
    };
  }

});
