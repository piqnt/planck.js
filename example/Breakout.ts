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

interface BreakoutPhysicsClientInterface {
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
  { x: 1.7, y: -0.2 },
  { x: 1.8, y: -0.1 },
  { x: 1.8, y: 0.1 },
  { x: 1.7, y: 0.2 },
  { x: 1.2, y: 0.4 },
  { x: 0.4, y: 0.6 },
  { x: -0.4, y: 0.6 },
  { x: -1.2, y: 0.4 },
  { x: -1.7, y: 0.2 },
  { x: -1.8, y: 0.1 },
  { x: -1.8, y: -0.1 },
  { x: -1.7, y: -0.2 },
]);
const fullPaddleShape = new PolygonShape([
  { x: 1.2, y: -0.1 },
  { x: 1.2, y: 0.1 },
  { x: 0.9, y: 0.4 },
  { x: 0.2, y: 0.6 },
  { x: -0.2, y: 0.6 },
  { x: -0.9, y: 0.4 },
  { x: -1.2, y: 0.1 },
  { x: -1.2, y: -0.1 },
]);

const paddleShapes = {
  mini: miniPaddleShape,
  full: fullPaddleShape,
};

class BreakoutPhysics {
  client?: BreakoutPhysicsClientInterface;

  world: World;
  bottomWall: Body;
  paddle: Body;
  balls: Body[] = [];
  bricks: Body[] = [];
  drops: Body[] = [];

  constructor(client?: BreakoutPhysicsClientInterface) {
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
    ball.setLinearVelocity({ x: speed * Math.sin(a), y: speed * Math.cos(a) });
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
    if (ball && brick) {
      this.world.queueUpdate(() => {
        this.client?.collideBallBrick(ball as BallData, brick as BrickData);
      });
    } else if (ball && bottom) {
      this.world.queueUpdate(() => {
        this.client?.collideBallBottom(ball as BallData);
      });
    } else if (ball && paddle) {
      this.world.queueUpdate(() => {
        this.client?.collideBallPaddle(ball as BallData);
      });
    } else if (drop && paddle) {
      this.world.queueUpdate(() => {
        this.client?.collideDropPaddle(drop as DropData);
      });
    } else if (drop && bottom) {
      this.world.queueUpdate(() => {
        this.client?.collideDropBottom(drop as DropData);
      });
    }
  };

  createBoardPhysics() {
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: +9, y: -0.5 },
      });
      wall.createFixture({
        shape: new EdgeShape({ x: 0, y: -12.5 }, { x: 0, y: +11.5 }),
        ...wallFix,
      });
    }
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: -9, y: -0.5 },
      });
      wall.createFixture({
        shape: new EdgeShape({ x: 0, y: -12.5 }, { x: 0, y: +11.5 }),
        ...wallFix,
      });
    }
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: 0, y: +12 },
      });
      wall.createFixture({
        shape: new EdgeShape({ x: -8, y: 0 }, { x: +8, y: 0 }),
        ...wallFix,
      });
    }
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: 9, y: 12 },
      });
      wall.createFixture({
        shape: new EdgeShape({ x: -1, y: 0 }, { x: 0, y: -1 }),
        ...wallFix,
      });
    }
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: -9, y: 12 },
      });
      wall.createFixture({
        shape: new EdgeShape({ x: 1, y: 0 }, { x: 0, y: -1 }),
        ...wallFix,
      });
    }
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: 0, y: -13 },
        userData: new WallData(),
      });
      wall.createFixture({
        shape: new EdgeShape({ x: -9, y: 0 }, { x: +9, y: 0 }),
        ...wallFix,
      });

      this.bottomWall = wall;
    }
  }

  setPaddlePhysics(data: PaddleData) {
    const body = this.world.createBody({
      type: "kinematic",
      position: { x: 0, y: -10.5 },
      userData: data,
    });

    const shape = paddleShapes[data.subtype] || fullPaddleShape;

    body.createFixture({
      shape: shape,
      ...paddleFix,
    });

    if (this.paddle) {
      const pInit = this.paddle.getPosition();
      const vInit = this.paddle.getLinearVelocity();
      body.setPosition(pInit);
      body.setLinearVelocity(vInit);
      this.world.destroyBody(this.paddle);
    }

    data.body = body;
    this.paddle = body;
  }

  addBallPhysics(data: BallData) {
    const body = this.world.createBody({
      type: "dynamic",
      bullet: true,
      angle: Math.random() * Math.PI * 2,
    });
    body.createFixture({
      shape: ballShape,
      ...ballFix,
    });

    const oldBall = this.balls[0];
    if (oldBall) {
      body.setPosition(oldBall.getPosition());
      body.setLinearVelocity(Vec2.neg(oldBall.getLinearVelocity()));
    } else {
      body.setPosition({ x: 0, y: -5 });
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
    const pos = { x: (data.i - 3) * 2, y: 9 - data.j * 2 };
    const body = this.world.createBody({
      type: "static",
      position: pos,
    });
    body.createFixture({
      shape: shape,
      ...brickFix,
    });

    body.setUserData(data);
    data.body = body;
    this.bricks.push(body);
  }

  updateBrickPhysics(data: BrickData) {
    const body = data.body;
    body.setPosition({ x: (data.i - 3) * 2, y: 9 - data.j * 2 });
  }

  removeBrickPhysics(data: BrickData) {
    const body = data.body;
    if (!removeFromArray(this.bricks, body)) return;
    this.world.destroyBody(body);
  }

  addDropPhysics(drop: DropData) {
    const body = this.world.createBody({
      type: "dynamic",
      position: {
        x: (drop.i - 3) * 2,
        y: 9 - drop.j * 2,
      },
      linearVelocity: {
        x: 0,
        y: drop.speed,
      },
      userData: drop,
    });
    if (drop.subtype == "+") {
      body.createFixture({
        shape: new BoxShape(0.08, 0.32),
        ...dropFix,
      });
      body.createFixture({
        shape: new BoxShape(0.32, 0.08),
        ...dropFix,
      });
    } else if (drop.subtype == "-") {
      body.createFixture({
        shape: new BoxShape(0.3, 0.1),
        ...dropFix,
      });
    } else {
      body.createFixture({
        shape: new CircleShape(0.3),
        ...dropFix,
      });
    }

    drop.body = body;
    this.drops.push(body);
  }

  removeDropPhysics(drop: DropData) {
    const body = drop.body;
    if (!removeFromArray(this.drops, body)) return;
    this.world.destroyBody(body);
  }

  movePaddlePhysics(dir: number) {
    const from = this.paddle.getPosition();
    const to = { x: dir + from.x, y: 0 + from.y };
    const data = this.paddle.getUserData() as PaddleData;
    const paddleWidth = data.subtype == "mini" ? 2.4 : 3.6;
    const maxX = 9 - paddleWidth / 2;
    to.x = Math.min(maxX, Math.max(-maxX, to.x));
    this.paddle.setPosition(to);
  }
}

class BreakoutGame {
  WIDTH = 20;
  HEIGHT = 26;

  ROWS = 10;
  COLUMNS = 7;

  physics: BreakoutPhysics;
  terminal: BreakoutTerminalInterface;

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

  setup(terminal: BreakoutTerminalInterface) {
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

interface BreakoutTerminalInterface {
  setup(game: BreakoutGame): void;
  activeKeys: Record<string, boolean>;
  updateState(game: BreakoutGame): void;
}

class TestbedTerminal implements BreakoutTerminalInterface {
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
