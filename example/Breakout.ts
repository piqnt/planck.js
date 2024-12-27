import {
  World,
  CircleShape,
  BoxShape,
  EdgeShape,
  PolygonShape,
  Testbed,
  Body,
  Contact,
  DataDriver,
  Vec2Value,
} from "planck";

interface BallData {
  key: string;
  type: "ball";
  speed: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface BrickData {
  key: string;
  type: "brick";
  size: "normal" | "small";
  i: number;
  j: number;
}

interface DropData {
  key: string;
  type: "drop";
  value: "+" | "-";
  i: number;
  j: number;
  speed: number;
}

interface PaddleData {
  key: string;
  type: "paddle";
  size: "mini" | "full";
  speed: number;
  position: Vec2Value;
}

interface WallData {
  key: string;
  type: "wall";
  floor?: boolean;
}

type UserData = BallData | BrickData | DropData | PaddleData | WallData;

class BreakoutGame {
  physics = new BreakoutPhysics();
  terminal = new TestbedTerminal();

  boardWidth = 20;
  boardHeight = 26;

  boardRows = 10;
  boardColumns = 7;

  state: string;
  score = 0;
  combo = 1;

  globalTime = 0;
  nextRowTime = 0;
  resetPaddleTime = 0;

  balls: BallData[] = [];
  bricks: BrickData[] = [];
  drops: DropData[] = [];
  paddle: PaddleData | null = null;
  board: WallData = { key: "board", type: "wall" };

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

  setup() {
    this.physics.setup(this);
    this.terminal.setup(this);
  }

  update() {
    this.physics.update(this);
    this.terminal.update(this);
  }

  ready() {
    if (this.state == "ready") return;
    this.state = "ready";
    this.score = 0;
    this.combo = 1;
    this.nextRowTime = 0;
    this.resetPaddleTime = 0;

    this.bricks.length = 0;
    this.balls.length = 0;
    this.drops.length = 0;

    this.setPaddle("full");
    this.addBall();
    this.addRow();
    this.addRow();
    this.addRow();

    this.update();
  }

  play() {
    this.ready();

    this.state = "playing";

    this.update();
  }

  end() {
    this.state = "gameover";
    this.paddle = null;

    this.update();
  }

  keydown(activeKeys: { left?: boolean; right?: boolean; fire?: boolean }) {
    if (activeKeys.fire) {
      if (this.state == "gameover") {
        this.ready();
      } else if (this.state == "ready") {
        this.play();
      }
    }
  }

  step(dt: number) {
    dt = Math.min(dt, 50);
    const isPlaying = this.state === "playing";
    if (isPlaying) {
      this.globalTime += dt;
      if (this.nextRowTime && this.globalTime > this.nextRowTime) {
        this.nextRowTime = 0;
        this.addRow();
      }
      if (this.resetPaddleTime && this.globalTime > this.resetPaddleTime) {
        this.resetPaddleTime = 0;
        this.setPaddle("full");
      }
    }
    this.movePaddle();
    this.update();
  }

  movePaddle() {
    const isPlaying = this.state === "playing";
    const isReady = this.state === "ready";
    if (!isPlaying && !isReady) return;
    if (!this.paddle) return;

    const isLeftPressed = this.terminal.activeKeys.left;
    const isRightPressed = this.terminal.activeKeys.right;
    if (isLeftPressed && !isRightPressed) {
      this.paddle.speed = -this.getPaddleSpeed();
    } else if (isRightPressed && !isLeftPressed) {
      this.paddle.speed = +this.getPaddleSpeed();
    } else {
      this.paddle.speed = 0;
    }
  }

  setPaddle(size: "mini" | "full") {
    const position = this.paddle?.position ?? { x: 0, y: -10.5 };
    const speed = this.paddle?.speed ?? 0;

    this.paddle = {
      key: "paddle-" + performance.now(),
      type: "paddle",
      size: size,
      speed: speed,
      position: position,
    };

    if (size == "mini") {
      this.resetPaddleTime = this.globalTime + this.getResetPaddleTime();
    }

    this.update();
  }

  addBall() {
    const speed = this.getBallSpeed();

    const ball = this.balls[this.balls.length - 1];
    const position = ball?.position ?? { x: 0, y: -5 };
    let velocity = ball?.velocity;

    if (velocity) {
      velocity = { x: -velocity.x, y: -velocity.y };
    } else {
      const a = Math.PI * Math.random() * 0.4 - 0.2;
      velocity = { x: speed * Math.sin(a), y: speed * Math.cos(a) };
    }
    this.balls.push({
      key: "ball-" + Math.random(),
      type: "ball",
      speed: this.getBallSpeed(),
      position: position,
      velocity: velocity,
    });

    this.update();
  }

  addDrop(i: number, j: number) {
    const type = Math.random() < 0.6 ? "+" : "-";
    this.drops.push({
      key: "drop-" + Math.random(),
      type: "drop",
      value: type,
      i,
      j,
      speed: this.getDropSpeed(),
    });

    this.update();
  }

  addBrick(type: "normal" | "small", i: number, j: number) {
    this.bricks.push({
      key: "brick-" + Math.random(),
      type: "brick",
      size: type,
      i,
      j,
    });

    this.update();
  }

  addRow() {
    this.nextRowTime = this.globalTime + this.getNextRowTime();

    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];
      brick.j++;
    }

    for (let i = 0; i < this.boardColumns; i++) {
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
      if (brick.j >= this.boardRows) {
        this.end();
        continue;
      }
    }
  }

  collideBallBrick(ball: BallData, brick: BrickData) {
    if (!Util.removeFromArray(this.bricks, brick)) return;

    if (!this.bricks.length) {
      this.addRow();
    }
    this.addDrop(brick.i, brick.j);

    this.score += this.combo;
    this.combo++;

    this.update();
  }

  collideBallPaddle(ball: BallData) {
    this.combo = 1;
  }

  collideBallBottom(ball: BallData) {
    if (!Util.removeFromArray(this.balls, ball)) return;

    if (!this.balls.length) {
      this.end();
    }

    this.update();
  }

  collideDropPaddle(drop: DropData) {
    if (!Util.removeFromArray(this.drops, drop)) return;

    if (drop.value == "+") {
      this.addBall();
    } else if (drop.value == "-") {
      this.setPaddle("mini");
    }

    this.update();
  }

  collideDropBottom(drop: DropData) {
    if (!Util.removeFromArray(this.drops, drop)) return;

    this.update();
  }
}

class TestbedTerminal {
  testbed: Testbed;

  get activeKeys() {
    return this.testbed.activeKeys;
  }

  setup(game: BreakoutGame) {
    if (this.testbed) return;

    this.testbed = Testbed.mount();
    this.testbed.width = game.boardWidth;
    this.testbed.height = game.boardHeight * 1.12;
    this.testbed.y = 0;

    this.testbed.keydown = () => {
      game.keydown(this.testbed.activeKeys);
    };

    this.testbed.step = (dt) => {
      game.step(dt);
    };

    this.testbed.start(game.physics.world);
  }

  update(game: BreakoutGame) {
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
const fullPaddleShape = new PolygonShape([
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
const miniPaddleShape = new PolygonShape([
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

interface BreakoutPhysicsListener {
  collideBallBrick(ball: BallData, brick: BrickData): void;
  collideBallPaddle(ball: BallData): void;
  collideBallBottom(ball: BallData): void;
  collideDropPaddle(drop: DropData): void;
  collideDropBottom(drop: DropData): void;
}

class BreakoutPhysics {
  listener: BreakoutPhysicsListener;

  world: World;

  driver = new DataDriver<UserData, Body>((data) => data.key, {
    enter: (data) => {
      if (data.type === "ball") {
        return this.createBall(data);
      } else if (data.type === "brick") {
        return this.createBrick(data);
      } else if (data.type === "drop") {
        return this.createDrop(data);
      } else if (data.type === "paddle") {
        return this.createPaddle(data);
      } else if (data.type === "wall") {
        return this.createBoard(data);
      }
      return null;
    },
    update: (data, body) => {
      if (data.type === "brick") {
        this.updateBrick(data, body);
      } else if (data.type === "ball") {
        this.updateBall(data, body);
      } else if (data.type === "paddle") {
        this.updatePaddle(data, body);
      }
    },
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  setup(listener: BreakoutPhysicsListener) {
    this.listener = listener;

    if (this.world) return;
    this.world = new World();
    this.world.on("pre-solve", this.collidePhysics);
  }

  update(game: BreakoutGame) {
    this.driver.update([...game.balls, ...game.bricks, ...game.drops, game.paddle, game.board]);
  }

  createBoard(data: WallData) {
    {
      const wall = this.world.createBody({
        type: "static",
        position: { x: +9, y: -0.5 },
        userData: data,
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
        userData: data,
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
        userData: data,
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
        userData: data,
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
        userData: data,
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
        userData: {
          ...data,
          floor: true,
        },
      });
      wall.createFixture({
        shape: new EdgeShape({ x: -9, y: 0 }, { x: +9, y: 0 }),
        ...wallFix,
      });
    }

    return null;
  }

  createPaddle(data: PaddleData) {
    const body = this.world.createBody({
      type: "kinematic",
      position: data.position,
      userData: data,
    });

    const shape = paddleShapes[data.size] || fullPaddleShape;

    body.createFixture({
      shape: shape,
      ...paddleFix,
    });

    return body;
  }

  updatePaddle(data: PaddleData, body: Body) {
    if (!body) return;

    data.position = body.getPosition();

    body.setLinearVelocity({
      x: data.speed,
      y: 0,
    });
  }

  createBall(data: BallData) {
    const body = this.world.createBody({
      type: "dynamic",
      bullet: true,
      position: data.position,
      linearVelocity: data.velocity,
      angle: Math.random() * Math.PI * 2,
      fixedRotation: true,
      userData: data,
    });
    body.createFixture({
      shape: ballShape,
      ...ballFix,
    });

    return body;
  }

  updateBall(data: BallData, body: Body) {
    if (!body) return;

    data.position = body.getPosition();
    data.velocity = body.getLinearVelocity();
  }

  createBrick(data: BrickData) {
    const shape = data.size == "small" ? smallBrickShape : normalBrickShape;
    const pos = { x: (data.i - 3) * 2, y: 9 - data.j * 2 };
    const body = this.world.createBody({
      type: "static",
      position: pos,
      userData: data,
    });
    body.createFixture({
      shape: shape,
      ...brickFix,
    });

    return body;
  }

  updateBrick(data: BrickData, body: Body) {
    body.setPosition({
      x: (data.i - 3) * 2,
      y: 9 - data.j * 2,
    });
  }

  createDrop(drop: DropData) {
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

    if (drop.value == "+") {
      body.createFixture({
        shape: new BoxShape(0.08, 0.32),
        ...dropFix,
      });
      body.createFixture({
        shape: new BoxShape(0.32, 0.08),
        ...dropFix,
      });
    } else if (drop.value == "-") {
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

    return body;
  }

  collidePhysics = (contact: Contact) => {
    const fixtureA = contact.getFixtureA();
    const bodyA = fixtureA.getBody();
    const fixtureB = contact.getFixtureB();
    const bodyB = fixtureB.getBody();

    const dA = bodyA.getUserData() as UserData;
    const dB = bodyB.getUserData() as UserData;

    if (!dA || !dB) {
      return;
    }

    const ball = dA.type === "ball" ? dA : dB.type === "ball" ? dB : null;
    const brick = dA.type === "brick" ? dA : dB.type === "brick" ? dB : null;
    const bottom = dA.type === "wall" && dA.floor ? dA : dB.type === "wall" && dB.floor ? dB : null;
    const paddle = dA.type === "paddle" ? dA : dB.type === "paddle" ? dB : null;
    const drop = dA.type === "drop" ? dA : dB.type === "drop" ? dB : null;

    // do not change world immediately
    if (ball && brick) {
      this.world.queueUpdate(() => {
        this.listener.collideBallBrick(ball as BallData, brick as BrickData);
      });
    } else if (ball && bottom) {
      this.world.queueUpdate(() => {
        this.listener.collideBallBottom(ball as BallData);
      });
    } else if (ball && paddle) {
      this.world.queueUpdate(() => {
        this.listener.collideBallPaddle(ball as BallData);
      });
    } else if (drop && paddle) {
      this.world.queueUpdate(() => {
        this.listener.collideDropPaddle(drop as DropData);
      });
    } else if (drop && bottom) {
      this.world.queueUpdate(() => {
        this.listener.collideDropBottom(drop as DropData);
      });
    }
  };
}

class Util {
  static removeFromArray<T>(array: T[], item: T) {
    const i = array.indexOf(item);
    if (i == -1) {
      return false;
    } else {
      array.splice(i, 1);
      return true;
    }
  }
}

{
  const game = new BreakoutGame();
  game.setup();
  game.play();
}
