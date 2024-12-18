import {
  World,
  Vec2,
  CircleShape,
  BoxShape,
  EdgeShape,
  PolygonShape,
  Testbed,
  Shape,
  Body,
  Contact,
} from "planck";

class ObjectData {
  type: "ball" | "brick" | "drop" | "paddle" | "bottom";
  subtype: string;
  i: number;
  j: number;
  speed: number;
  body: Body;
}

class BallData extends ObjectData {
  type = "ball" as const;
  constructor(speed: number) {
    super();
    this.speed = speed;
  }
}

class BrickData extends ObjectData {
  type = "brick" as const;
  constructor(type: string, i: number, j: number) {
    super();
    this.subtype = type;
    this.i = i;
    this.j = j;
  }
}

class DropData extends ObjectData {
  type = "drop" as const;
  constructor(type: string, i: number, j: number, speed: number) {
    super();
    this.subtype = type;
    this.i = i;
    this.j = j;
    this.speed = speed;
  }
}

class PaddleData extends ObjectData {
  type = "paddle" as const;
  subtype: "mini" | "full";
  constructor(type: "mini" | "full") {
    super();
    this.subtype = type;
  }
}

class WallData extends ObjectData {
  type = "bottom" as const;
  constructor() {
    super();
  }
}

interface BreakoutPhysicsClient {
  collideBallBrick(ball: BallData, brick: BrickData): void;
  collideBallPaddle(ball: BallData): void;
  collideBallBottom(ball: BallData): void;
  collideDropPaddle(drop: DropData): void;
  collideDropBottom(drop: DropData): void;
}

const BALL_BITS = 1;
const WALL_BITS = 2;
const BRICK_BITS = 4;
const DROP_BITS = 8;
const PADDLE_BITS = 16;

const ballFix = {
  friction: 0.0,
  restitution: 1.0,
  filterCategoryBits: BALL_BITS,
  filterMaskBits: PADDLE_BITS | WALL_BITS | BRICK_BITS,
};
const paddleFix = {
  filterCategoryBits: PADDLE_BITS,
  filterMaskBits: BALL_BITS | DROP_BITS,
};
const wallFix = {
  filterCategoryBits: WALL_BITS,
  filterMaskBits: BALL_BITS | DROP_BITS,
};
const brickFix = {
  filterCategoryBits: BRICK_BITS,
  filterMaskBits: BALL_BITS,
};
const dropFix = {
  filterCategoryBits: DROP_BITS,
  filterMaskBits: PADDLE_BITS | WALL_BITS,
};

const ballShape = new CircleShape(0.5);
const normalBrickShape = new BoxShape(1.9 / 2, 1.9 / 2);
const smallBrickShape = new BoxShape(0.9 / 2, 0.9 / 2);
const miniPaddleShape = new PolygonShape([
  new Vec2(1.7, -0.2),
  new Vec2(1.8, -0.1),
  new Vec2(1.8, 0.1),
  new Vec2(1.7, 0.2),
  new Vec2(1.2, 0.4),
  new Vec2(0.4, 0.6),
  new Vec2(-0.4, 0.6),
  new Vec2(-1.2, 0.4),
  new Vec2(-1.7, 0.2),
  new Vec2(-1.8, 0.1),
  new Vec2(-1.8, -0.1),
  new Vec2(-1.7, -0.2),
]);
const fullPaddleShape = new PolygonShape([
  new Vec2(1.2, -0.1),
  new Vec2(1.2, 0.1),
  new Vec2(0.9, 0.4),
  new Vec2(0.2, 0.6),
  new Vec2(-0.2, 0.6),
  new Vec2(-0.9, 0.4),
  new Vec2(-1.2, 0.1),
  new Vec2(-1.2, -0.1),
]);
class BreakoutPhysics {
  client?: BreakoutPhysicsClient;

  world: World;
  bottomWall: Body;
  paddle: Body;
  balls: Body[] = [];
  bricks: Body[] = [];
  drops: Body[] = [];

  constructor(client?: BreakoutPhysicsClient) {
    this.client = client;
  }

  setupPhysics() {
    if (this.world) return;

    this.world = new World();
    this.world.on("pre-solve", this.collidePhysics);

    this.createBoardPhysics();
  }

  resetPhysics() {
    for (let i = 0; i < this.balls.length; i++) {
      this.world.destroyBody(this.balls[i]);
    }
    for (let i = 0; i < this.bricks.length; i++) {
      this.world.destroyBody(this.bricks[i]);
    }
    for (let i = 0; i < this.drops.length; i++) {
      this.world.destroyBody(this.drops[i]);
    }
  }

  endPhysics() {
    this.world.destroyBody(this.paddle);
  }

  startPhysics() {
    const ball = this.balls[0];
    const a = Math.PI * Math.random() * 0.4 - 0.2;
    const speed = 10;
    ball.setLinearVelocity(new Vec2(speed * Math.sin(a), speed * Math.cos(a)));
  }

  collidePhysics = (contact: Contact) => {
    const fixtureA = contact.getFixtureA();
    const bodyA = fixtureA.getBody();
    const fixtureB = contact.getFixtureB();
    const bodyB = fixtureB.getBody();

    const dataA = bodyA.getUserData() as ObjectData;
    const dataB = bodyB.getUserData() as ObjectData;

    if (!dataA || !dataB) {
      return;
    }

    const typeA = dataA.type;
    const typeB = dataB.type;

    const ball = typeA === "ball" ? dataA : typeB === "ball" ? dataB : null;
    const brick = typeA === "brick" ? dataA : typeB === "brick" ? dataB : null;
    const bottom = typeA === "bottom" ? dataA : typeB === "bottom" ? dataB : null;
    const paddle = typeA === "paddle" ? dataA : typeB === "paddle" ? dataB : null;
    const drop = typeA === "drop" ? dataA : typeB === "drop" ? dataB : null;

    // do not change world immediately
    setTimeout(() => {
      if (ball && brick) {
        this.client?.collideBallBrick(ball as BallData, brick as BrickData);
      } else if (ball && bottom) {
        this.client?.collideBallBottom(ball as BallData);
      } else if (ball && paddle) {
        this.client?.collideBallPaddle(ball as BallData);
      } else if (drop && paddle) {
        this.client?.collideDropPaddle(drop as DropData);
      } else if (drop && bottom) {
        this.client?.collideDropBottom(drop as DropData);
      }
    }, 1);
  };

  createBoardPhysics() {
    {
      const wall = this.world.createBody(new Vec2(+9, -0.5));
      wall.createFixture(new EdgeShape(new Vec2(0, -12.5), new Vec2(0, +11.5)), wallFix);
    }
    {
      const wall = this.world.createBody(new Vec2(-9, -0.5));
      wall.createFixture(new EdgeShape(new Vec2(0, -12.5), new Vec2(0, +11.5)), wallFix);
    }
    {
      const wall = this.world.createBody(new Vec2(0, +12));
      wall.createFixture(new EdgeShape(new Vec2(-8, 0), new Vec2(+8, 0)), wallFix);
    }
    {
      const wall = this.world.createBody(new Vec2(9, 12));
      wall.createFixture(new EdgeShape(new Vec2(-1, 0), new Vec2(0, -1)), wallFix);
    }
    {
      const wall = this.world.createBody(new Vec2(-9, 12));
      wall.createFixture(new EdgeShape(new Vec2(1, 0), new Vec2(0, -1)), wallFix);
    }
    {
      const wall = this.world.createBody(new Vec2(0, -13));
      wall.createFixture(new EdgeShape(new Vec2(-9, 0), new Vec2(+9, 0)), wallFix);

      wall.setUserData(new WallData());
      this.bottomWall = wall;
    }
  }

  setPaddlePhysics(data: PaddleData) {
    let shape: Shape;

    if (data.subtype == "mini") {
      shape = miniPaddleShape;
    } else {
      shape = fullPaddleShape;
    }

    const body = this.world.createBody({
      type: "kinematic",
      position: new Vec2(0, -10.5),
    });

    body.createFixture(shape, paddleFix);

    if (this.paddle) {
      const pInit = this.paddle.getPosition();
      const vInit = this.paddle.getLinearVelocity();
      body.setPosition(pInit);
      body.setLinearVelocity(vInit);
      this.world.destroyBody(this.paddle);
    }

    body.setUserData(data);
    data.body = body;
    this.paddle = body;
  }

  addBallPhysics(data: BallData) {
    const body = this.world.createDynamicBody({
      bullet: true,
      angle: Math.random() * Math.PI * 2,
    });
    body.createFixture(ballShape, ballFix);

    const oldBall = this.balls[0];
    if (oldBall) {
      body.setPosition(oldBall.getPosition());
      body.setLinearVelocity(Vec2.neg(oldBall.getLinearVelocity()));
    } else {
      body.setPosition(new Vec2(0, -5));
    }

    body.setUserData(data);
    data.body = body;
    this.balls.push(body);
  }

  removeBallPhysics(ball: BallData) {
    const body = ball.body;
    if (!removeFromArray(this.balls, body)) return;
    this.world.destroyBody(body);
  }

  addBrickPhysics(data: BrickData) {
    const shape = data.subtype == "small" ? smallBrickShape : normalBrickShape;
    const pos = new Vec2((data.i - 3) * 2, 9 - data.j * 2);
    const body = this.world.createBody(pos);
    body.createFixture(shape, brickFix);

    body.setUserData(data);
    data.body = body;
    this.bricks.push(body);
  }

  updateBrickPhysics(data: BrickData) {
    const body = data.body;
    body.setPosition(new Vec2((data.i - 3) * 2, 9 - data.j * 2));
  }

  removeBrickPhysics(data: BrickData) {
    const body = data.body;
    if (!removeFromArray(this.bricks, body)) return;
    this.world.destroyBody(body);
  }

  addDropPhysics(drop: DropData) {
    const body = this.world.createDynamicBody();
    if (drop.subtype == "+") {
      body.createFixture(new BoxShape(0.08, 0.32), dropFix);
      body.createFixture(new BoxShape(0.32, 0.08), dropFix);
    } else if (drop.subtype == "-") {
      body.createFixture(new BoxShape(0.3, 0.1), dropFix);
    } else {
      body.createFixture(new CircleShape(0.3), dropFix);
    }
    body.setPosition(new Vec2((drop.i - 3) * 2, 9 - drop.j * 2));
    body.setLinearVelocity(new Vec2(0, drop.speed));

    body.setUserData(drop);
    drop.body = body;
    this.drops.push(body);
  }

  removeDropPhysics(drop: DropData) {
    const body = drop.body;
    if (!removeFromArray(this.drops, body)) return;
    this.world.destroyBody(body);
  }

  movePaddlePhysics(dir: number) {
    let p = this.paddle.getPosition();
    p = new Vec2(dir, 0).add(p);
    const data = this.paddle.getUserData() as PaddleData;
    const paddleWidth = data.subtype == "mini" ? 2.4 : 3.6;
    const maxX = 9 - paddleWidth / 2;
    p.x = Math.min(maxX, Math.max(-maxX, p.x));
    this.paddle.setPosition(p);
  }
}

class BreakoutGame {
  WIDTH = 20;
  HEIGHT = 26;

  ROWS = 10;
  COLUMNS = 7;

  physics: BreakoutPhysics;
  terminal: TerminalInterface;

  state: string;

  score = 0;
  combo = 1;

  passedTime = 0;
  nextRowTime = 0;
  resetPaddleTime = 0;

  balls: BallData[] = [];
  bricks: BrickData[] = [];
  drops: DropData[] = [];

  getPaddleSpeed() {
    return 18;
  }

  getDropSpeed() {
    return -6;
  }

  getBallSpeed() {
    return (13 + this.score * 0.05) * 0.7;
  }

  getNextRowTime() {
    return Math.max(8000 - 20 * this.score, 1000);
  }

  getResetPaddleTime() {
    return 7500;
  }

  setup(terminal: TerminalInterface) {
    this.terminal = terminal;

    this.physics = new BreakoutPhysics(this);

    this.physics.setupPhysics();
    this.terminal.setup(this);

    this.resetBoard();
  }

  resetBoard() {
    if (this.state == "ready") return;
    this.state = "ready";
    this.score = 0;
    this.combo = 1;
    this.nextRowTime = 0;
    this.resetPaddleTime = 0;
    this.physics.resetPhysics();
    this.setPaddle("full");
    this.addBall();
    this.addRow();
    this.addRow();
    this.addRow();
    this.updateStatus();
  }

  startGame() {
    this.resetBoard();
    this.state = "playing";
    this.physics.startPhysics();
  }

  endGame() {
    this.state = "gameover";
    this.updateStatus();
    this.physics.endPhysics();
  }

  setPaddle(size: "mini" | "full") {
    const paddle = new PaddleData(size);

    this.physics.setPaddlePhysics(paddle);
  }

  addBall() {
    const ball = new BallData(this.getBallSpeed());
    this.balls.push(ball);

    this.physics.addBallPhysics(ball);
  }

  addDrop(i: number, j: number) {
    const type = Math.random() < 0.6 ? "+" : "-";
    const drop = new DropData(type, i, j, this.getDropSpeed());
    this.drops.push(drop);

    this.physics.addDropPhysics(drop);
  }

  addBrick(type: string, i: number, j: number) {
    const brick = new BrickData(type, i, j);
    this.bricks.push(brick);

    this.physics.addBrickPhysics(brick);
  }

  updateBrick(brick: BrickData) {
    this.physics.updateBrickPhysics(brick);
  }

  addRow() {
    this.nextRowTime = this.passedTime + this.getNextRowTime();

    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];
      brick.j++;
      this.updateBrick(brick);
    }

    for (let i = 0; i < this.COLUMNS; i++) {
      if (Math.random() < 0.1) {
        continue;
      }
      const oneChance = this.score + 1;
      const fourChance = Math.max(0, this.score * 1.1 - 60);
      if (Math.random() < oneChance / (fourChance + oneChance)) {
        this.addBrick("normal", i, 0);
      } else {
        this.addBrick("small", i - 0.25, -0.25);
        this.addBrick("small", i + 0.25, -0.25);
        this.addBrick("small", i - 0.25, +0.25);
        this.addBrick("small", i + 0.25, +0.25);
      }
    }

    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];
      if (brick.j >= this.ROWS) {
        this.endGame();
        continue;
      }
    }
  }

  movePaddle(dir: number) {
    this.physics.movePaddlePhysics(dir);
  }

  step(dt: number) {
    dt = Math.min(dt, 50);
    this.passedTime += dt;

    const isPlaying = this.state === "playing";
    const isReady = this.state === "ready";

    if (isPlaying && isReady) {
      return;
    }

    const isLeftPressed = this.terminal.activeKeys.left;
    const isRightPressed = this.terminal.activeKeys.right;
    if (isLeftPressed && !isRightPressed) {
      this.movePaddle((-this.getPaddleSpeed() * dt) / 1000);
    } else if (isRightPressed && !isLeftPressed) {
      this.movePaddle((+this.getPaddleSpeed() * dt) / 1000);
    }

    if (isPlaying) {
      return;
    }

    if (this.nextRowTime && this.passedTime > this.nextRowTime) {
      this.nextRowTime = 0;
      this.addRow();
    }

    if (this.resetPaddleTime && this.passedTime > this.resetPaddleTime) {
      this.resetPaddleTime = 0;
      this.setPaddle("full");
    }
  }

  collideBallBrick(ball: BallData, brick: BrickData) {
    if (!removeFromArray(this.bricks, brick)) return;
    this.physics.removeBrickPhysics(brick);

    if (!this.bricks.length) {
      this.addRow();
    }
    this.score += this.combo;
    // this.combo++;
    this.updateStatus();
    this.addDrop(brick.i, brick.j);
  }

  collideBallPaddle(ball: BallData) {
    // this.combo = 1;
  }

  collideBallBottom(ball: BallData) {
    if (!removeFromArray(this.balls, ball)) return;
    this.physics.removeBallPhysics(ball);

    if (!this.balls.length) {
      this.endGame();
    }
  }

  collideDropPaddle(drop: DropData) {
    if (!removeFromArray(this.drops, drop)) return;
    this.physics.removeDropPhysics(drop);

    if (drop.subtype == "+") {
      this.addBall();
    } else if (drop.subtype == "-") {
      this.setPaddle("mini");
    }
  }

  collideDropBottom(drop: DropData) {
    if (!removeFromArray(this.drops, drop)) return;
    this.physics.removeDropPhysics(drop);
  }

  updateStatus() {
    this.terminal.updateState(this);
  }
}

interface TerminalInterface {
  setup(game: BreakoutGame): void;
  activeKeys: Record<string, boolean>;
  updateState(game: BreakoutGame): void;
}

class TestbedTerminal implements TerminalInterface {
  testbed: Testbed;

  get activeKeys() {
    return this.testbed.activeKeys;
  }

  updateState(game: BreakoutGame) {
    if (game.state == "gameover") {
      this.testbed.status("Gameover!");
      this.testbed.status("Score", game.score);
    } else if (game.state == "ready") {
      this.testbed.status("Ready!");
      this.testbed.status("Score", game.score);
    } else {
      this.testbed.status("");
      this.testbed.status("Score", game.score);
    }
  }

  setup(game: BreakoutGame) {
    if (this.testbed) return;

    this.testbed = Testbed.mount();
    this.testbed.width = game.WIDTH;
    this.testbed.height = game.HEIGHT * 1.12;
    this.testbed.y = 0;

    this.testbed.keydown = () => {
      if (this.testbed.activeKeys.fire) {
        if (game.state == "gameover") {
          game.resetBoard();
        } else if (game.state == "ready") {
          game.startGame();
        }
      }
    };

    this.testbed.step = (dt) => {
      game.step(dt);
    };

    this.testbed.start(game.physics.world);
  }
}

{
  const terminal = new TestbedTerminal();
  const game = new BreakoutGame();
  game.setup(terminal);
}

function removeFromArray<T>(array: T[], item: T) {
  const i = array.indexOf(item);
  if (i == -1) {
    return false;
  } else {
    array.splice(i, 1);
    return true;
  }
}
