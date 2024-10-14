import planck from "../src/main";

const { World, Vec2, Circle, Chain, Settings, Testbed } = planck;

const width = 10.0,
  height = 10.0;

const BALL_R = 0.3;
const BALL_D = 1;

Settings.velocityThreshold = 0;

const world = new World();

const testbed = Testbed.mount();
testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.5;
testbed.height = height * 1.5;
testbed.mouseForce = -100;
testbed.start(world);

const walls = [
  new Vec2(-width * 0.5, -height * 0.5),
  new Vec2(-width * 0.5, +height * 0.5),
  new Vec2(+width * 0.5, +height * 0.5),
  new Vec2(+width * 0.5, -height * 0.5),
];

const wallFixDef = {
  userData: "wall",
};
const ballFixDef = {
  friction: 0.1,
  restitution: 0.98,
  density: 0.8,
  userData: "ball",
};
const ballBodyDef = {
  bullet: true,
  linearDamping: 1.6,
  angularDamping: 1.6,
};

world.createBody().createFixture(new Chain(walls, true), wallFixDef);

row(1, 8, BALL_R, BALL_D)
  .map((v: planck.Vec2) => Vec2.add(v, new Vec2(height * 0.4, 0)))
  .forEach(function (p) {
    const ball = world.createDynamicBody(ballBodyDef);
    ball.setPosition(p);
    ball.setAngle(Math.PI);
    ball.createFixture(new Circle(BALL_R), ballFixDef);
    ball.style = { fill: "#ff411a", stroke: "black" };
  });

row(1, 8, BALL_R, BALL_D)
  .map((v: planck.Vec2) => Vec2.add(v, new Vec2(-height * 0.4, 0)))
  .forEach(function (p) {
    const ball = world.createDynamicBody(ballBodyDef);
    ball.setPosition(p);
    ball.createFixture(new Circle(BALL_R), ballFixDef);
    ball.style = { fill: "#0077ff", stroke: "black" };
  });

world.on("post-solve", function (contact) {
  const fA = contact.getFixtureA(),
    bA = fA.getBody();
  const fB = contact.getFixtureB(),
    bB = fB.getBody();

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

  // do not change world immediately
  setTimeout(function () {
    if (ball && wall) {
      world.destroyBody(ball);
    }
  }, 1);
});

function row(n: number, m: number, r: number, l: number) {
  const balls = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      balls.push(
        new Vec2(
          i * l - (n - 1) * 0.5 * l + Math.random() * r * 0.02,
          j * l - (m - 1) * 0.5 * l + Math.random() * r * 0.02
        )
      );
    }
  }
  return balls;
}
