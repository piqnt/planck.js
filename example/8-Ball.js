planck.testbed('8 Ball', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2, Math = pl.Math;

  var SPI4 = Math.sin(Math.PI / 4), SPI3 = Math.sin(Math.PI / 3);

  var COLORED = true;
  var BLACK = {fill: 'black', stroke: 'white'};
  var WHITE = {fill: 'white', stroke: 'black'};
  var COLORS = [
    {fill: '#ffdd00', stroke: '#000000'},
    {fill: '#ffdd00', stroke: '#ffffff'},
    {fill: '#ff3300', stroke: '#000000'},
    {fill: '#ff3300', stroke: '#ffffff'},
    {fill: '#662200', stroke: '#000000'},
    {fill: '#662200', stroke: '#ffffff'},
    {fill: '#ff8800', stroke: '#000000'},
    {fill: '#ff8800', stroke: '#ffffff'},
    {fill: '#00bb11', stroke: '#000000'},
    {fill: '#00bb11', stroke: '#ffffff'},
    {fill: '#9900ff', stroke: '#000000'},
    {fill: '#9900ff', stroke: '#ffffff'},
    {fill: '#0077ff', stroke: '#000000'},
    {fill: '#0077ff', stroke: '#ffffff'}
  ];

  var width = 8.00, height = 4.00;

  var BALL_R = 0.12;
  var POCKET_R = 0.2;

  testbed.x = 0;
  testbed.y = 0;
  testbed.width = width * 1.2;
  testbed.height = height * 1.2;
  testbed.ratio = 100;
  testbed.mouseForce = -30;

  pl.Settings.velocityThreshold = 0;

  var world = pl.World({});

  var railH = [
    Vec2(POCKET_R, height * .5),
    Vec2(POCKET_R, height * .5 + POCKET_R),
    Vec2(width * .5 - POCKET_R / SPI4 + POCKET_R, height * .5 + POCKET_R),
    Vec2(width * .5 - POCKET_R / SPI4, height * .5)
  ];

  var railV = [
    Vec2(width * .5, -(height * .5 - POCKET_R / SPI4)),
    Vec2(width * .5 + POCKET_R, -(height * .5 - POCKET_R / SPI4 + POCKET_R)),
    Vec2(width * .5 + POCKET_R, height * .5 - POCKET_R / SPI4 + POCKET_R),
    Vec2(width * .5, height * .5 - POCKET_R / SPI4)
  ];

  var railFixDef = {
    friction: 0.1,
    restitution: 0.9,
    userData: 'rail'
  };
  var pocketFixDef = {
    userData: 'pocket'
  };
  var ballFixDef = {
    friction: 0.1,
    restitution: 0.99,
    density: 1,
    userData: 'ball'
  };
  var ballBodyDef = {
    linearDamping: 1.5,
    angularDamping: 1
  };

  world.createBody().createFixture(pl.Polygon(railV.map(Vec2.scaleFn(+1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railV.map(Vec2.scaleFn(-1, +1))), railFixDef);

  world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(+1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(-1, +1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(+1, -1))), railFixDef);
  world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(-1, -1))), railFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(0, -height * .5 - POCKET_R * 1.5), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(0, +height * .5 + POCKET_R * 1.5), POCKET_R), pocketFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(+width * .5 + POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(-width * .5 - POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(+width * .5 + POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);
  world.createBody().createFixture(pl.Circle(Vec2(-width * .5 - POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);

  var balls = rack(BALL_R).map(Vec2.translateFn(width / 4, 0));

  balls.push({x: -width / 4, y: 0});

  if (COLORED) {
    shuffleArray(COLORS);
    for (var i = 0; i < COLORS.length; i++) {
      balls[i].render = COLORS[i];
    }
    balls[14].render = balls[4].render;
    balls[4].render = BLACK;
    balls[balls.length - 1].render = WHITE;
  }

  for (i = 0; i < balls.length; i++) {
    var ball = world.createDynamicBody(ballBodyDef);
    ball.setBullet(true);
    ball.setPosition(balls[i]);
    ball.createFixture(pl.Circle(BALL_R), ballFixDef);
    ball.render = balls[i].render;
  }

  world.on('post-solve', function(contact) {
    var fA = contact.getFixtureA(), bA = fA.getBody();
    var fB = contact.getFixtureB(), bB = fB.getBody();

    var pocket = fA.getUserData() === pocketFixDef.userData && bA || fB.getUserData() === pocketFixDef.userData && bB;
    var ball = fA.getUserData() === ballFixDef.userData && bA || fB.getUserData() === ballFixDef.userData && bB;

    // do not change world immediately
    setTimeout(function() {
      if (ball && pocket) {
        world.destroyBody(ball);
      }
    }, 1);
  });

  return world;

  function rack(r) {
    var n = 5;
    var balls = [];
    var d = r * 2, l = SPI3 * d;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j <= i; j++) {
        balls.push({
          x: i * l /*- (n - 1) * 0.5 * l*/ + Math.random(r * 0.02),
          y: (j - i * 0.5 ) * d + Math.random(r * 0.02),
        });
      }
    }
    return balls;
  }

  function shuffleArray(array) {
    // http://stackoverflow.com/a/12646864/483728
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

});
