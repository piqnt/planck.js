const { Vec2, World, Circle, Settings, Polygon, Testbed } = planck;

let SPI4 = Math.sin(Math.PI / 4), SPI3 = Math.sin(Math.PI / 3);

let COLORED = true;
let BLACK = {fill: 'black', stroke: 'white'};
let WHITE = {fill: 'white', stroke: 'black'};
let COLORS = [
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

let width = 8.00, height = 4.00;

let BALL_R = 0.12;
let POCKET_R = 0.2;

Settings.velocityThreshold = 0;

let world = new World();

const testbed = Testbed.mount();
testbed.x = 0;
testbed.y = 0;
testbed.width = width * 1.2;
testbed.height = height * 1.2;
testbed.ratio = 100;
testbed.mouseForce = -20;
testbed.start(world);

let railH = [
  new Vec2(POCKET_R, height * .5),
  new Vec2(POCKET_R, height * .5 + POCKET_R),
  new Vec2(width * .5 - POCKET_R / SPI4 + POCKET_R, height * .5 + POCKET_R),
  new Vec2(width * .5 - POCKET_R / SPI4, height * .5)
];

let railV = [
  new Vec2(width * .5, -(height * .5 - POCKET_R / SPI4)),
  new Vec2(width * .5 + POCKET_R, -(height * .5 - POCKET_R / SPI4 + POCKET_R)),
  new Vec2(width * .5 + POCKET_R, height * .5 - POCKET_R / SPI4 + POCKET_R),
  new Vec2(width * .5, height * .5 - POCKET_R / SPI4)
];

let railFixDef = {
  friction: 0.1,
  restitution: 0.9,
  userData: 'rail'
};
let pocketFixDef = {
  userData: 'pocket'
};
let ballFixDef = {
  friction: 0.1,
  restitution: 0.99,
  density: 1,
  userData: 'ball'
};
let ballBodyDef = {
  linearDamping: 1.5,
  angularDamping: 1
};

function mirror(vertices, x, y) {
  return vertices.map(v => new Vec2(x * v.x, y * v.y));
}

world.createBody().createFixture(new Polygon(railV), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railV, -1, +1)), railFixDef);

world.createBody().createFixture(new Polygon(railH), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railH, -1, +1)), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railH, +1, -1)), railFixDef);
world.createBody().createFixture(new Polygon(mirror(railH, -1, -1)), railFixDef);

world.createBody().createFixture(new Circle(new Vec2(0, -height * .5 - POCKET_R * 1.5), POCKET_R), pocketFixDef);
world.createBody().createFixture(new Circle(new Vec2(0, +height * .5 + POCKET_R * 1.5), POCKET_R), pocketFixDef);

world.createBody().createFixture(new Circle(new Vec2(+width * .5 + POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);
world.createBody().createFixture(new Circle(new Vec2(-width * .5 - POCKET_R * .7, +height * .5 + POCKET_R * .7), POCKET_R), pocketFixDef);

world.createBody().createFixture(new Circle(new Vec2(+width * .5 + POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);
world.createBody().createFixture(new Circle(new Vec2(-width * .5 - POCKET_R * .7, -height * .5 - POCKET_R * .7), POCKET_R), pocketFixDef);

let balls = rack(BALL_R, width / 4, 0);

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
  let ball = world.createDynamicBody(ballBodyDef);
  ball.setBullet(true);
  ball.setPosition(balls[i]);
  ball.createFixture(new Circle(BALL_R), ballFixDef);
  ball.style = balls[i].style;
}

world.on('post-solve', function(contact) {
  let fA = contact.getFixtureA(), bA = fA.getBody();
  let fB = contact.getFixtureB(), bB = fB.getBody();

  let pocket = fA.getUserData() === pocketFixDef.userData && bA || fB.getUserData() === pocketFixDef.userData && bB;
  let ball = fA.getUserData() === ballFixDef.userData && bA || fB.getUserData() === ballFixDef.userData && bB;

  // do not change world immediately
  setTimeout(function() {
    if (ball && pocket) {
      world.destroyBody(ball);
    }
  }, 1);
});

function rack(r, cx, cy) {
  let n = 5;
  let balls = [];
  let d = r * 2, l = SPI3 * d;
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
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
