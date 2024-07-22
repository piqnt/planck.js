import planck from "../src/main";

const { World, Circle, Settings, Polygon , Testbed} = planck

const SPI4 = Math.sin(Math.PI / 4), SPI3 = Math.sin(Math.PI / 3);

const COLORED = true;
const BLACK = {fill: 'black', stroke: 'white'};
const WHITE = {fill: 'white', stroke: 'black'};
const COLORS = [
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

const width = 8.00, height = 4.00;

const BALL_R = 0.12;
const POCKET_R = 0.2;

Settings.velocityThreshold = 0;

const world = new World();

const testbed = Testbed.mount();
testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.2;
testbed.height = height * 1.2;
testbed.mouseForce = -20;
testbed.start(world);

const railH = [
  new planck.Vec2(POCKET_R, height * .5),
  new planck.Vec2(POCKET_R, height * .5 + POCKET_R),
  new planck.Vec2(width * .5 - POCKET_R / SPI4 + POCKET_R, height * .5 + POCKET_R),
  new planck.Vec2(width * .5 - POCKET_R / SPI4, height * .5)
];

const railV = [
  new planck.Vec2(width * .5, -(height * .5 - POCKET_R / SPI4)),
  new planck.Vec2(width * .5 + POCKET_R, -(height * .5 - POCKET_R / SPI4 + POCKET_R)),
  new planck.Vec2(width * .5 + POCKET_R, height * .5 - POCKET_R / SPI4 + POCKET_R),
  new planck.Vec2(width * .5, height * .5 - POCKET_R / SPI4)
];

const railFixDef = {
  friction: 0.1,
  restitution: 0.9,
  userData: 'rail'
};
const pocketFixDef = {
  userData: 'pocket'
};
const ballFixDef = {
  friction: 0.1,
  restitution: 0.99,
  density: 1,
  userData: 'ball'
};
const ballBodyDef = {
  linearDamping: 1.5,
  angularDamping: 1
};

function mirror(vertices:planck.Vec2[], x:number, y:number) {
  return vertices.map((v:planck.Vec2) => new planck.Vec2(x * v.x, y * v.y));
}

world.createBody().createFixture(new Polygon(railV), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railV, -1, +1)), railFixDef);

world.createBody().createFixture(new Polygon(railH), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railH, -1, +1)), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railH, +1, -1)), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railH, -1, -1)), railFixDef);

world.createBody().createFixture(new Circle(new planck.Vec2(0, -height * .5 - POCKET_R * 1.5), POCKET_R), pocketFixDef);
world.createBody().createFixture(new Circle(new planck.Vec2(0, +height * .5 + POCKET_R * 1.5), POCKET_R), pocketFixDef);

world.createBody().createFixture(new Circle(new planck.Vec2(+width * .5 + POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);
world.createBody().createFixture(new Circle(new planck.Vec2(-width * .5 - POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);

world.createBody().createFixture(new Circle(new planck.Vec2(+width * .5 + POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);
world.createBody().createFixture(new Circle(new planck.Vec2(-width * .5 - POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);

const balls = rack(BALL_R, width / 4, 0);

balls.push({x: -width / 4, y: 0});

if (COLORED) {
  shuffleArray(COLORS);
  for (let i = 0; i < COLORS.length; i++) {
    balls[i].style = COLORS[i];
  }
  balls[14].style = balls[4].style;
  balls[4].style = BLACK;
  balls[balls.length - 1].style = WHITE;
}

for (let i = 0; i < balls.length; i++) {
  const ball = world.createDynamicBody(ballBodyDef);
  ball.setBullet(true)
  ball.setPosition(balls[i]);
  ball.createFixture(new Circle(BALL_R), ballFixDef);
  ball.style = balls[i].style;
}

world.on('post-solve', function(contact) {
  const fA = contact.getFixtureA(), bA = fA.getBody();
  const fB = contact.getFixtureB(), bB = fB.getBody();

  const pocket = fA.getUserData() === pocketFixDef.userData && bA || fB.getUserData() === pocketFixDef.userData && bB;
  const ball = fA.getUserData() === ballFixDef.userData && bA || fB.getUserData() === ballFixDef.userData && bB;

  // do not change world immediately
  setTimeout(function() {
    if (ball && pocket) {
      world.destroyBody(ball);
    }
  }, 1);
});

function rack(r, cx, cy) {
  const n = 5;
  const balls = [];
  const d = r * 2, l = SPI3 * d;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      balls.push({
        x: cx + i * l /*- (n - 1) * 0.5 * l*/ + Math.random() * r * 0.02,
        y: cy + (j - i * 0.5 ) * d + Math.random() * r * 0.02,
      });
    }
  }
  return balls;
}

function shuffleArray(array) {
  // http://stackoverflow.com/a/12646864/483728
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}