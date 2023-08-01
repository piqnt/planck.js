const { World, Vec2, Circle, Chain, Settings } = planck;

const testbed = planck.testbed();

var width = 10.00, height = 6.00;

var PLAYER_R = 0.35;
var BALL_R = 0.23;

testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.6;
testbed.height = height * 1.6;
testbed.ratio = 60;
testbed.mouseForce = -120;

Settings.velocityThreshold = 0;

var world = new World({});
testbed.start(world);

var goal = [
  new Vec2(0, -height * 0.2),
  new Vec2(0, +height * 0.2)
];

var wallFixDef = {
  friction: 0,
  restitution: 0,
  userData : 'wall'
};
var goalFixDef = {
  friction: 0,
  restitution: 1,
  userData : 'goal'
};

var ballFixDef = {
  friction: .2,
  restitution: .99,
  density: .5,
  userData : 'ball'
};
var ballBodyDef = {
  bullet: true,
  linearDamping : 3.5,
  angularDamping : 1.6
};

var playerFixDef = {
  friction: .1,
  restitution: .99,
  density: .8,
  userData : 'player'
};
var playerBodyDef = {
  bullet: true,
  linearDamping : 4,
  angularDamping : 1.6
};

world.createBody().createFixture(new Chain(walls(), true), wallFixDef);

world.createBody(new Vec2(-width * 0.5 - BALL_R, 0)).createFixture(new Chain(goal), goalFixDef);
world.createBody(new Vec2(+width * 0.5 + BALL_R, 0)).createFixture(new Chain(goal), goalFixDef);

var ball = world.createDynamicBody(ballBodyDef);
ball.createFixture(new Circle(BALL_R), ballFixDef);
ball.style = {fill: 'white', stroke : 'black'};

team().forEach(function(p) {
  var player = world.createDynamicBody(playerBodyDef);
  player.setPosition(p);
  player.createFixture(new Circle(PLAYER_R), playerFixDef);
  player.style = {fill : '#0077ff', stroke: 'black'};
});

team().map(Vec2.scaleFn(-1, 1)).forEach(function(p) {
  var player = world.createDynamicBody(playerBodyDef);
  player.setPosition(p);
  player.setAngle(Math.PI);
  player.createFixture(new Circle(PLAYER_R), playerFixDef);
  player.style = {fill : '#ff411a', stroke: 'black'};
});

world.on('post-solve', function(contact) {
  var fA = contact.getFixtureA(), bA = fA.getBody();
  var fB = contact.getFixtureB(), bB = fB.getBody();

  var wall = fA.getUserData() === wallFixDef.userData ? bA : fB.getUserData() === wallFixDef.userData ? bB : null;
  var ball = fA.getUserData() === ballFixDef.userData ? bA : fB.getUserData() === ballFixDef.userData ? bB : null;
  var goal = fA.getUserData() === goalFixDef.userData ? bA : fB.getUserData() === goalFixDef.userData ? bB : null;

  // do not change world immediately
  setTimeout(function() {
    if (ball && goal) {
      ball.setPosition(new Vec2(0, 0));
      ball.setLinearVelocity(new Vec2(0, 0));
      // world.destroyBody(ball);
    }
  }, 1);
});

function team() {
  var positions = [];
  positions.push(new Vec2(-width * .45, 0));
  positions.push(new Vec2(-width * .3, -height * 0.2));
  positions.push(new Vec2(-width * .3, +height * 0.2));
  positions.push(new Vec2(-width * .1, -height * 0.1));
  positions.push(new Vec2(-width * .1, +height * 0.1));
  return positions;
}

function walls() {
  var chain = [
    new Vec2(-width * .5 +0.2, -height * .5),
    new Vec2(-width * .5, -height * .5 +0.2),
    new Vec2(-width * .5, -height * .2),
    new Vec2(-width * .6, -height * .2),
    new Vec2(-width * .6, +height * .2),
    new Vec2(-width * .5, +height * .2),
    new Vec2(-width * .5, +height * .5 -.2),
    new Vec2(-width * .5 +.2, +height * .5),
    new Vec2(+width * .5 -.2, +height * .5),
    new Vec2(+width * .5, +height * .5 -.2),
    new Vec2(+width * .5, +height * .2),
    new Vec2(+width * .6, +height * .2),
    new Vec2(+width * .6, -height * .2),
    new Vec2(+width * .5, -height * .2),
    new Vec2(+width * .5, -height * .5 +.2),
    new Vec2(+width * .5 -.2, -height * .5)
  ];
  return chain;
}
