import { World, Vec2, Circle, Chain, Settings, Testbed } from "planck";

const testbed = Testbed.mount();

const width = 10.0;
const height = 6.0;

const PLAYER_R = 0.35;
const BALL_R = 0.23;

testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.6;
testbed.height = height * 1.6;
testbed.mouseForce = -120;

Settings.velocityThreshold = 0;

const world = new World();
testbed.start(world);

const goal = [new Vec2(0, -height * 0.2), new Vec2(0, +height * 0.2)];

const wallFixDef = {
  friction: 0,
  restitution: 0,
  userData: "wall",
};
const goalFixDef = {
  friction: 0,
  restitution: 1,
  userData: "goal",
};

const ballFixDef = {
  friction: 0.2,
  restitution: 0.99,
  density: 0.5,
  userData: "ball",
};
const ballBodyDef = {
  bullet: true,
  linearDamping: 3.5,
  angularDamping: 1.6,
};

const playerFixDef = {
  friction: 0.1,
  restitution: 0.99,
  density: 0.8,
  userData: "player",
};
const playerBodyDef = {
  bullet: true,
  linearDamping: 4,
  angularDamping: 1.6,
};

world.createBody().createFixture(new Chain(walls(), true), wallFixDef);

world.createBody(new Vec2(-width * 0.5 - BALL_R, 0)).createFixture(new Chain(goal), goalFixDef);
world.createBody(new Vec2(+width * 0.5 + BALL_R, 0)).createFixture(new Chain(goal), goalFixDef);

const ball = world.createDynamicBody(ballBodyDef);
ball.createFixture(new Circle(BALL_R), ballFixDef);
ball.style = { fill: "white", stroke: "black" };

team().forEach(function (p) {
  const player = world.createDynamicBody(playerBodyDef);
  player.setPosition(p);
  player.createFixture(new Circle(PLAYER_R), playerFixDef);
  player.style = { fill: "#0077ff", stroke: "black" };
});

team()
  .map((v) => new Vec2(-v.x, v.y))
  .forEach(function (p) {
    const player = world.createDynamicBody(playerBodyDef);
    player.setPosition(p);
    player.setAngle(Math.PI);
    player.createFixture(new Circle(PLAYER_R), playerFixDef);
    player.style = { fill: "#ff411a", stroke: "black" };
  });

world.on("post-solve", function (contact) {
  const fA = contact.getFixtureA();
  const bA = fA.getBody();
  const fB = contact.getFixtureB();
  const bB = fB.getBody();

  const wall =
    fA.getUserData() === wallFixDef.userData
      ? bA
      : fB.getUserData() === wallFixDef.userData
        ? bB
        : null;
  const ball =
    fA.getUserData() === ballFixDef.userData
      ? bA
      : fB.getUserData() === ballFixDef.userData
        ? bB
        : null;
  const goal =
    fA.getUserData() === goalFixDef.userData
      ? bA
      : fB.getUserData() === goalFixDef.userData
        ? bB
        : null;

  // do not change world immediately
  setTimeout(function () {
    if (ball && goal) {
      ball.setPosition(new Vec2(0, 0));
      ball.setLinearVelocity(new Vec2(0, 0));
      // world.destroyBody(ball);
    }
  }, 1);
});

function team() {
  const positions = [
    new Vec2(-width * 0.45, 0),
    new Vec2(-width * 0.3, -height * 0.2),
    new Vec2(-width * 0.3, +height * 0.2),
    new Vec2(-width * 0.1, -height * 0.1),
    new Vec2(-width * 0.1, +height * 0.1),
  ];
  return positions;
}

function walls() {
  const chain = [
    new Vec2(-width * 0.5 + 0.2, -height * 0.5),
    new Vec2(-width * 0.5, -height * 0.5 + 0.2),
    new Vec2(-width * 0.5, -height * 0.2),
    new Vec2(-width * 0.6, -height * 0.2),
    new Vec2(-width * 0.6, +height * 0.2),
    new Vec2(-width * 0.5, +height * 0.2),
    new Vec2(-width * 0.5, +height * 0.5 - 0.2),
    new Vec2(-width * 0.5 + 0.2, +height * 0.5),
    new Vec2(+width * 0.5 - 0.2, +height * 0.5),
    new Vec2(+width * 0.5, +height * 0.5 - 0.2),
    new Vec2(+width * 0.5, +height * 0.2),
    new Vec2(+width * 0.6, +height * 0.2),
    new Vec2(+width * 0.6, -height * 0.2),
    new Vec2(+width * 0.5, -height * 0.2),
    new Vec2(+width * 0.5, -height * 0.5 + 0.2),
    new Vec2(+width * 0.5 - 0.2, -height * 0.5),
  ];
  return chain;
}
