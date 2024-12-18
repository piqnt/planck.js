import { Vec2, World, Circle, Settings, Polygon, Testbed, Vec2Value, Contact, Body } from "planck";

const POCKET = "pocket";
const BALL = "ball";
const RAIL = "rail";

const TABLE_WIDTH = 8.0;
const TABLE_HEIGHT = 4.0;

const BALL_RADIUS = 0.12;
const POCKET_RADIUS = 0.2;

const BLACK = "black";
const WHITE = "white";
const COLORS = [
  "yellow-solid",
  "yellow-stripe",
  "red-solid",
  "red-stripe",
  "burgundy-solid",
  "burgundy-stripe",
  "orange-solid",
  "orange-stripe",
  "green-solid",
  "green-stripe",
  "purple-solid",
  "purple-stripe",
  "blue-solid",
  "blue-stripe",
];

const STYLES = {
  "black": { fill: "#000000", stroke: "#ffffff" },
  "white": { fill: "#ffffff", stroke: "#000000" },
  "yellow-solid": { fill: "#ffdd00", stroke: "#000000" },
  "yellow-stripe": { fill: "#ffdd00", stroke: "#ffffff" },
  "red-solid": { fill: "#ff3300", stroke: "#000000" },
  "red-stripe": { fill: "#ff3300", stroke: "#ffffff" },
  "burgundy-solid": { fill: "#662200", stroke: "#000000" },
  "burgundy-stripe": { fill: "#662200", stroke: "#ffffff" },
  "orange-solid": { fill: "#ff8800", stroke: "#000000" },
  "orange-stripe": { fill: "#ff8800", stroke: "#ffffff" },
  "green-solid": { fill: "#00bb11", stroke: "#000000" },
  "green-stripe": { fill: "#00bb11", stroke: "#ffffff" },
  "purple-solid": { fill: "#9900ff", stroke: "#000000" },
  "purple-stripe": { fill: "#9900ff", stroke: "#ffffff" },
  "blue-solid": { fill: "#0077ff", stroke: "#000000" },
  "blue-stripe": { fill: "#0077ff", stroke: "#ffffff" },
};

Settings.velocityThreshold = 0;

interface BallData {
  x: number;
  y: number;
  color?: string;
}

interface BilliardPhysicsClient {
  onBallInPocket(ball: Body, pocket: Body): void;
}

class BilliardPhysics {
  client?: BilliardPhysicsClient;

  world: World;
  balls: Body[] = [];

  constructor(client?: BilliardPhysicsClient) {
    this.client = client;
  }

  setup() {
    if (this.world) return;

    this.world = new World();
    this.world.on("post-solve", this.collide.bind(this));

    this.createTable();
  }

  start(balls: BallData[]) {
    this.createBalls(balls);
  }

  createBalls(ballsData: BallData[]) {
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      this.world.destroyBody(ball);
    }

    for (let i = 0; i < ballsData.length; i++) {
      const ball = this.world.createBody({
        type: "dynamic",
        linearDamping: 1.5,
        angularDamping: 1,
      });
      this.balls.push(ball);
      ball.setBullet(true);
      ball.setPosition(ballsData[i]);
      const shape = new Circle(BALL_RADIUS);
      ball.createFixture(shape, {
        friction: 0.1,
        restitution: 0.99,
        density: 1,
        userData: BALL,
      });
      const color = ballsData[i].color;
      if (color) {
        ball.style = STYLES[color];
      }
    }
  }

  createTable() {
    const SPI4 = Math.sin(Math.PI / 4);

    const topLeftRail = [
      new Vec2(POCKET_RADIUS, TABLE_HEIGHT * 0.5),
      new Vec2(POCKET_RADIUS, TABLE_HEIGHT * 0.5 + POCKET_RADIUS),
      new Vec2(
        TABLE_WIDTH * 0.5 - POCKET_RADIUS / SPI4 + POCKET_RADIUS,
        TABLE_HEIGHT * 0.5 + POCKET_RADIUS,
      ),
      new Vec2(TABLE_WIDTH * 0.5 - POCKET_RADIUS / SPI4, TABLE_HEIGHT * 0.5),
    ];

    const leftRail = [
      new Vec2(TABLE_WIDTH * 0.5, -(TABLE_HEIGHT * 0.5 - POCKET_RADIUS / SPI4)),
      new Vec2(
        TABLE_WIDTH * 0.5 + POCKET_RADIUS,
        -(TABLE_HEIGHT * 0.5 - POCKET_RADIUS / SPI4 + POCKET_RADIUS),
      ),
      new Vec2(
        TABLE_WIDTH * 0.5 + POCKET_RADIUS,
        TABLE_HEIGHT * 0.5 - POCKET_RADIUS / SPI4 + POCKET_RADIUS,
      ),
      new Vec2(TABLE_WIDTH * 0.5, TABLE_HEIGHT * 0.5 - POCKET_RADIUS / SPI4),
    ];

    const rails: Vec2Value[][] = [];

    rails.push(leftRail);
    rails.push(leftRail.map((v) => new Vec2(-v.x, +v.y)));

    rails.push(topLeftRail);
    rails.push(topLeftRail.map((v) => new Vec2(-v.x, +v.y)));
    rails.push(topLeftRail.map((v) => new Vec2(+v.x, -v.y)));
    rails.push(topLeftRail.map((v) => new Vec2(-v.x, -v.y)));

    for (let i = 0; i < rails.length; i++) {
      const body = this.world.createBody();
      const shape = new Polygon(rails[i]);
      const fixture = body.createFixture(shape, {
        friction: 0.1,
        restitution: 0.9,
        userData: RAIL,
      });
    }

    const pockets: Vec2Value[] = [];
    pockets.push(new Vec2(0, -TABLE_HEIGHT * 0.5 - POCKET_RADIUS * 1.5));
    pockets.push(new Vec2(0, +TABLE_HEIGHT * 0.5 + POCKET_RADIUS * 1.5));
    pockets.push(
      new Vec2(+TABLE_WIDTH * 0.5 + POCKET_RADIUS * 0.7, +TABLE_HEIGHT * 0.5 + POCKET_RADIUS * 0.7),
    );
    pockets.push(
      new Vec2(-TABLE_WIDTH * 0.5 - POCKET_RADIUS * 0.7, +TABLE_HEIGHT * 0.5 + POCKET_RADIUS * 0.7),
    );
    pockets.push(
      new Vec2(+TABLE_WIDTH * 0.5 + POCKET_RADIUS * 0.7, -TABLE_HEIGHT * 0.5 - POCKET_RADIUS * 0.7),
    );
    pockets.push(
      new Vec2(-TABLE_WIDTH * 0.5 - POCKET_RADIUS * 0.7, -TABLE_HEIGHT * 0.5 - POCKET_RADIUS * 0.7),
    );

    for (let i = 0; i < pockets.length; i++) {
      const body = this.world.createBody({
        position: pockets[i],
      });
      const shape = new Circle(POCKET_RADIUS);
      const fixture = body.createFixture(shape, {
        userData: POCKET,
      });
    }
  }

  collide = (contact: Contact) => {
    const fA = contact.getFixtureA();
    const bA = fA.getBody();
    const fB = contact.getFixtureB();
    const bB = fB.getBody();

    const ball = fA.getUserData() === BALL ? bA : fB.getUserData() === BALL ? bB : null;
    const pocket = fA.getUserData() === POCKET ? bA : fB.getUserData() === POCKET ? bB : null;

    // do not change world immediately
    setTimeout(() => {
      if (ball && pocket) {
        this.world.destroyBody(ball);
        this.client?.onBallInPocket(ball, pocket);
      }
    }, 1);
  };
}

class EightBallGame {
  terminal: TerminalInterface;
  physics: BilliardPhysics;

  setup(terminal: TerminalInterface) {
    this.terminal = terminal;
    this.physics = new BilliardPhysics(this);

    this.physics.setup();
    this.terminal.setup(this);
  }

  onBallInPocket(ball: Body, pocket: Body) {
    // todo
  }

  start() {
    this.physics.start(this.rackBalls());
    this.terminal.start(this);
  }

  rackBalls() {
    const r = BALL_RADIUS;
    const cx = TABLE_WIDTH / 4;
    const cy = 0;

    const SPI3 = Math.sin(Math.PI / 3);

    const n = 5;
    const balls: BallData[] = [];
    const d = r * 2;
    const l = SPI3 * d;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        balls.push({
          x: cx + i * l /*- (n - 1) * 0.5 * l*/ + Math.random() * r * 0.02,
          y: cy + (j - i * 0.5) * d + Math.random() * r * 0.02,
        });
      }
    }

    shuffleArray(COLORS);

    for (let i = 0; i < COLORS.length; i++) {
      balls[i].color = COLORS[i];
    }
    balls[14].color = balls[4].color;
    balls[4].color = BLACK;

    balls.push({ x: -TABLE_WIDTH / 4, y: 0, color: WHITE });

    return balls;
  }
}

interface TerminalInterface {
  setup(game: EightBallGame): void;
  start(game: EightBallGame): void;
}

class TestbedTerminal implements TerminalInterface {
  testbed: Testbed;

  setup(game: EightBallGame) {
    if (this.testbed) return;
    this.testbed = Testbed.mount();
    this.testbed.x = 0;
    this.testbed.y = 0;
    this.testbed.width = TABLE_WIDTH * 1.2;
    this.testbed.height = TABLE_HEIGHT * 1.2;
    this.testbed.mouseForce = -20;
    this.testbed.start(game.physics.world);
  }

  start(game: EightBallGame) {}
}

{
  const terminal = new TestbedTerminal();
  const game = new EightBallGame();
  game.setup(terminal);
  game.start();
}

function shuffleArray<T>(array: T[]) {
  // http://stackoverflow.com/a/12646864/483728
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
