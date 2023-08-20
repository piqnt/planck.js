const { World, Vec2, Circle, Chain, Settings, Testbed } = planck;

const testbed = Testbed.mount();

let width = 10.00, height = 6.00;

let PLAYER_R = 0.35;
let BALL_R = 0.23;

testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.6;
testbed.height = height * 1.6;
testbed.ratio = 60;
testbed.mouseForce = -120;

Settings.velocityThreshold = 0;

let world = new World();
testbed.start(world);

let goal = [
  new Vec2(0, -height * 0.2),
  new Vec2(0, +height * 0.2)
];

let wallFixDef = {
  friction: 0,
  restitution: 0,
  userData : 'wall'
};
let goalFixDef = {
  friction: 0,
  restitution: 1,
  userData : 'goal'
};

let ballFixDef = {
  friction: .2,
  restitution: .99,
  density: .5,
  userData : 'ball'
};
let ballBodyDef = {
  bullet: true,
  linearDamping : 3.5,
  angularDamping : 1.6
};

let playerFixDef = {
  friction: .1,
  restitution: .99,
  density: .8,
  userData : 'player'
};
let playerBodyDef = {
  bullet: true,
  linearDamping : 4,
  angularDamping : 1.6
};

world.createBody().createFixture(new Chain(walls(), true), wallFixDef);

world.createBody(new Vec2(-width * 0.5 - BALL_R, 0)).createFixture(new Chain(goal), goalFixDef);
world.createBody(new Vec2(+width * 0.5 + BALL_R, 0)).createFixture(new Chain(goal), goalFixDef);

let ball = world.createDynamicBody(ballBodyDef);
ball.createFixture(new Circle(BALL_R), ballFixDef);
ball.style = {fill: 'white', stroke : 'black'};

team().forEach(function(p) {
  let player = world.createDynamicBody(playerBodyDef);
  player.setPosition(p);
  player.createFixture(new Circle(PLAYER_R), playerFixDef);
  player.style = {fill : '#0077ff', stroke: 'black'};
});

team().map(v => new Vec2(-v.x, v.y)).forEach(function(p) {
  let player = world.createDynamicBody(playerBodyDef);
  player.setPosition(p);
  player.setAngle(Math.PI);
  player.createFixture(new Circle(PLAYER_R), playerFixDef);
  player.style = {fill : '#ff411a', stroke: 'black'};
});

world.on('post-solve', function(contact) {
  let fA = contact.getFixtureA(), bA = fA.getBody();
  let fB = contact.getFixtureB(), bB = fB.getBody();

  let wall = fA.getUserData() === wallFixDef.userData ? bA : fB.getUserData() === wallFixDef.userData ? bB : null;
  let ball = fA.getUserData() === ballFixDef.userData ? bA : fB.getUserData() === ballFixDef.userData ? bB : null;
  let goal = fA.getUserData() === goalFixDef.userData ? bA : fB.getUserData() === goalFixDef.userData ? bB : null;

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
  let positions = [];
  positions.push(new Vec2(-width * .45, 0));
  positions.push(new Vec2(-width * .3, -height * 0.2));
  positions.push(new Vec2(-width * .3, +height * 0.2));
  positions.push(new Vec2(-width * .1, -height * 0.1));
  positions.push(new Vec2(-width * .1, +height * 0.1));
  return positions;
}

function walls() {
  let chain = [
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
