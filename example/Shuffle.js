const { World, Vec2, Circle, Chain, Settings, Math } = planck;

var width = 10.00, height = 10.00;

var BALL_R = 0.3;
var BALL_D = 1;

Settings.velocityThreshold = 0;

var world = new World({});

const testbed = planck.testbed();
testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.5;
testbed.height = height * 1.5;
testbed.ratio = 50;
testbed.mouseForce = -100;
testbed.start(world);

var walls = [
  new Vec2(-width * .5, -height * .5),
  new Vec2(-width * .5, +height * .5),
  new Vec2(+width * .5, +height * .5),
  new Vec2(+width * .5, -height * .5)
];

var wallFixDef = {
  userData : 'wall'
};
var ballFixDef = {
  friction: 0.1,
  restitution: 0.98,
  density: 0.8,
  userData : 'ball'
};
var ballBodyDef = {
  bullet: true,
  linearDamping : 1.6,
  angularDamping : 1.6
};

world.createBody().createFixture(new Chain(walls, true), wallFixDef);

row(1, 8, BALL_R, BALL_D).map(Vec2.translateFn(height * 0.4, 0)).forEach(function(p) {
  var ball = world.createDynamicBody(ballBodyDef);
  ball.setPosition(p);
  ball.setAngle(Math.PI);
  ball.createFixture(new Circle(BALL_R), ballFixDef);
  ball.style = {fill : '#ff411a', stroke: 'black'};
});

row(1, 8, BALL_R, BALL_D).map(Vec2.translateFn(-height * 0.4, 0)).forEach(function(p) {
  var ball = world.createDynamicBody(ballBodyDef);
  ball.setPosition(p);
  ball.createFixture(new Circle(BALL_R), ballFixDef);
  ball.style = {fill : '#0077ff', stroke: 'black'};
});

world.on('post-solve', function(contact) {
  var fA = contact.getFixtureA(), bA = fA.getBody();
  var fB = contact.getFixtureB(), bB = fB.getBody();

  var wall = fA.getUserData() === wallFixDef.userData ? bA : fB.getUserData() === wallFixDef.userData ? bB : null;
  var ball = fA.getUserData() === ballFixDef.userData ? bA : fB.getUserData() === ballFixDef.userData ? bB : null;

  // do not change world immediately
  setTimeout(function() {
    if (ball && wall) {
      world.destroyBody(ball);
    }
  }, 1);
});

function row(n, m, r, l) {
  var d = r * 2;
  var balls = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      balls.push(new Vec2(i * l - (n - 1) * .5 * l + Math.random(r * 0.02), j * l - (m - 1) * .5 * l + Math.random(r * 0.02)));
    }
  }
  return balls;
}
