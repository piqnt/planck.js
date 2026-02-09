import { World, CircleShape, BoxShape, EdgeShape, PolygonShape, Body, Contact, Vec2Value } from "../testbed";

import { Binder, Driver, Middleware, Runtime } from "polymatic";

import { DefaultTestbedContext, TestbedMain } from "planck-testbed";

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

class BreakoutState {
  boardWidth = 20;
  boardHeight = 26;

  boardRows = 10;
  boardColumns = 7;

  state: string = "gameover";
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
}

class BreakoutContext extends DefaultTestbedContext {
  game = new BreakoutState();
}

class BreakoutGame extends Middleware<BreakoutContext> {
  constructor() {
    super();
    this.use(new BreakoutPhysics());
    this.use(new TestbedTerminal());

    this.on("frame-update", this.step);
    this.on("gamepad-keydown", this.keydown);

    this.on("collideBallBrick", this.collideBallBrick);
    this.on("collideBallPaddle", this.collideBallPaddle);
    this.on("collideBallBottom", this.collideBallBottom);
    this.on("collideDropPaddle", this.collideDropPaddle);
    this.on("collideDropBottom", this.collideDropBottom);
  }

  getPaddleSpeed() {
    return 18;
  }

  getDropSpeed() {
    return -6;
  }

  getBallSpeed() {
    const { game } = this.context;
    return (13 + game.score * 0.05) * 0.7;
  }

  getNextRowTime() {
    const { game } = this.context;
    return Math.max(8000 - 20 * game.score, 1000);
  }

  getResetPaddleTime() {
    return 7500;
  }

  ready() {
    const { game } = this.context;
    if (game.state == "ready") return;
    game.state = "ready";
    game.score = 0;
    game.combo = 1;
    game.nextRowTime = 0;
    game.resetPaddleTime = 0;

    game.bricks.length = 0;
    game.balls.length = 0;
    game.drops.length = 0;

    this.setPaddle("full");
    this.addBall();
    this.addRow();
    this.addRow();
    this.addRow();
  }

  play() {
    const { game } = this.context;
    this.ready();
    game.state = "playing";
  }

  end() {
    const { game } = this.context;
    game.state = "gameover";
    game.paddle = null;
  }

  keydown() {
    const { game, gamepad } = this.context;

    if (gamepad.activeKeys.fire) {
      if (game.state == "gameover") {
        this.ready();
      } else if (game.state == "ready") {
        this.play();
      }
    }
  }

  step({ dt }: { dt: number }) {
    const { game } = this.context;
    dt = Math.min(dt, 50);
    const isPlaying = game.state === "playing";
    if (isPlaying) {
      game.globalTime += dt;
      if (game.nextRowTime && game.globalTime > game.nextRowTime) {
        game.nextRowTime = 0;
        this.addRow();
      }
      if (game.resetPaddleTime && game.globalTime > game.resetPaddleTime) {
        game.resetPaddleTime = 0;
        this.setPaddle("full");
      }
    }
    this.movePaddle();
  }

  movePaddle() {
    const { game, gamepad } = this.context;
    const isPlaying = game.state === "playing";
    const isReady = game.state === "ready";
    if (!isPlaying && !isReady) return;
    if (!game.paddle) return;

    const isLeftPressed = gamepad.activeKeys.left;
    const isRightPressed = gamepad.activeKeys.right;
    if (isLeftPressed && !isRightPressed) {
      game.paddle.speed = -this.getPaddleSpeed();
    } else if (isRightPressed && !isLeftPressed) {
      game.paddle.speed = +this.getPaddleSpeed();
    } else {
      game.paddle.speed = 0;
    }
  }

  setPaddle(size: "mini" | "full") {
    const { game } = this.context;
    const position = game.paddle?.position ?? { x: 0, y: -10.5 };
    const speed = game.paddle?.speed ?? 0;

    game.paddle = {
      key: "paddle-" + performance.now(),
      type: "paddle",
      size: size,
      speed: speed,
      position: position,
    };

    if (size == "mini") {
      game.resetPaddleTime = game.globalTime + this.getResetPaddleTime();
    }
  }

  addBall() {
    const { game } = this.context;
    const speed = this.getBallSpeed();

    const ball = game.balls[game.balls.length - 1];
    const position = ball?.position ?? { x: 0, y: -5 };
    let velocity = ball?.velocity;

    if (velocity) {
      velocity = { x: -velocity.x, y: -velocity.y };
    } else {
      const a = Math.PI * Math.random() * 0.4 - 0.2;
      velocity = { x: speed * Math.sin(a), y: speed * Math.cos(a) };
    }
    game.balls.push({
      key: "ball-" + Math.random(),
      type: "ball",
      speed: this.getBallSpeed(),
      position: position,
      velocity: velocity,
    });
  }

  addDrop(i: number, j: number) {
    const { game } = this.context;
    const type = Math.random() < 0.6 ? "+" : "-";
    game.drops.push({
      key: "drop-" + Math.random(),
      type: "drop",
      value: type,
      i,
      j,
      speed: this.getDropSpeed(),
    });
  }

  addBrick(type: "normal" | "small", i: number, j: number) {
    const { game } = this.context;

    game.bricks.push({
      key: "brick-" + Math.random(),
      type: "brick",
      size: type,
      i,
      j,
    });
  }

  addRow() {
    const { game } = this.context;
    game.nextRowTime = game.globalTime + this.getNextRowTime();

    for (let i = 0; i < game.bricks.length; i++) {
      const brick = game.bricks[i];
      brick.j++;
    }

    for (let i = 0; i < game.boardColumns; i++) {
      if (Math.random() < 0.1) {
        continue;
      }
      const oneChance = game.score + 1;
      const fourChance = Math.max(0, game.score * 1.1 - 60);
      if (Math.random() < oneChance / (fourChance + oneChance)) {
        this.addBrick("normal", i, 0);
      } else {
        this.addBrick("small", i - 0.25, -0.25);
        this.addBrick("small", i + 0.25, -0.25);
        this.addBrick("small", i - 0.25, +0.25);
        this.addBrick("small", i + 0.25, +0.25);
      }
    }

    for (let i = 0; i < game.bricks.length; i++) {
      const brick = game.bricks[i];
      if (brick.j >= game.boardRows) {
        this.end();
        continue;
      }
    }
  }

  collideBallBrick({ ball, brick }: { ball: BallData; brick: BrickData }) {
    const { game } = this.context;
    if (!Util.removeFromArray(game.bricks, brick)) return;

    if (!game.bricks.length) {
      this.addRow();
    }
    this.addDrop(brick.i, brick.j);

    game.score += game.combo;
    game.combo++;
  }

  collideBallPaddle({ ball }: { ball: BallData }) {
    const { game } = this.context;
    game.combo = 1;
  }

  collideBallBottom({ ball }: { ball: BallData }) {
    const { game } = this.context;
    if (!Util.removeFromArray(game.balls, ball)) return;

    if (!game.balls.length) {
      this.end();
    }
  }

  collideDropPaddle({ drop }: { drop: DropData }) {
    const { game } = this.context;
    if (!Util.removeFromArray(game.drops, drop)) return;

    if (drop.value == "+") {
      this.addBall();
    } else if (drop.value == "-") {
      this.setPaddle("mini");
    }
  }

  collideDropBottom({ drop }: { drop: DropData }) {
    const { game } = this.context;
    if (!Util.removeFromArray(game.drops, drop)) return;
  }
}

class TestbedTerminal extends Middleware<BreakoutContext> {
  constructor() {
    super();
    this.use(new TestbedMain());
    this.on("activate", this.setup);
    this.on("frame-update", this.update);
  }

  setup() {
    this.context.camera.width = context.game.boardWidth;
    this.context.camera.height = context.game.boardHeight * 1.12;
    this.context.camera.x = 0;
    this.context.camera.y = 0;
  }

  update() {
    // if (game.state == "gameover") {
    //   this.testbed.status("Gameover!");
    //   this.testbed.status("Score", game.score);
    // } else if (game.state == "ready") {
    //   this.testbed.status("Ready!");
    //   this.testbed.status("Score", game.score);
    // } else {
    //   this.testbed.status("");
    //   this.testbed.status("Score", game.score);
    // }
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

class BreakoutPhysics extends Middleware<BreakoutContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("frame-update", this.handleFrameUpdate);
  }

  binder = Binder.create<UserData>({
    key: (data) => data.key,
    drivers: [
      Driver.create<BallData, Body>({
        filter: (data) => data.type === "ball",
        enter: (data) => {
          return this.createBall(data);
        },
        update: (data, body) => {
          this.updateBall(data, body);
        },
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<BrickData, Body>({
        filter: (data) => data.type === "brick",
        enter: (data) => {
          return this.createBrick(data);
        },
        update: (data, body) => {
          this.updateBrick(data, body);
        },
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<DropData, Body>({
        filter: (data) => data.type === "drop",
        enter: (data) => {
          return this.createDrop(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<PaddleData, Body>({
        filter: (data) => data.type === "paddle",
        enter: (data) => {
          return this.createPaddle(data);
        },
        update: (data, body) => {
          this.updatePaddle(data, body);
        },
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<WallData, Body>({
        filter: (data) => data.type === "wall",
        enter: (data) => {
          return this.createBoard(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
    ],
  });

  handleActivate() {
    this.context.world = new World();
    this.context.world.on("pre-solve", this.collidePhysics);
  }

  handleFrameUpdate() {
    const { game } = this.context;
    this.binder.data([...game.balls, ...game.bricks, ...game.drops, game.paddle, game.board]);
  }

  createBoard(data: WallData) {
    {
      const wall = this.context.world.createBody({
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
      const wall = this.context.world.createBody({
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
      const wall = this.context.world.createBody({
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
      const wall = this.context.world.createBody({
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
      const wall = this.context.world.createBody({
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
      const wall = this.context.world.createBody({
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
    const body = this.context.world.createBody({
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
    const body = this.context.world.createBody({
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
    const body = this.context.world.createBody({
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
    const body = this.context.world.createBody({
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
      this.context.world.queueUpdate(() => {
        this.emit("collideBallBrick", { ball, brick });
      });
    } else if (ball && bottom) {
      this.context.world.queueUpdate(() => {
        this.emit("collideBallBottom", { ball });
      });
    } else if (ball && paddle) {
      this.context.world.queueUpdate(() => {
        this.emit("collideBallPaddle", { ball });
      });
    } else if (drop && paddle) {
      this.context.world.queueUpdate(() => {
        this.emit("collideDropPaddle", { drop });
      });
    } else if (drop && bottom) {
      this.context.world.queueUpdate(() => {
        this.emit("collideDropBottom", { drop });
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

const main = new BreakoutGame();
const context = new BreakoutContext();
Runtime.activate(main, context);
main.emit("game-start");
