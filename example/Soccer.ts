import { World, Circle, Chain, Settings, Contact, Vec2Value, Body } from "../testbed";

import { Binder, Driver, Middleware, Runtime } from "polymatic";

import { DefaultTestbedContext, TestbedMain } from "planck-testbed";

const width = 10.0;
const height = 6.0;

const PLAYER_R = 0.35;
const BALL_R = 0.23;

interface PlayerData {
  type: "player";
  key: string;
  color: string;
  position: Vec2Value;
}

interface BallData {
  type: "ball";
  key: string;
}

interface WallData {
  type: "wall";
  key: string;
}

interface GoalData {
  type: "goal";
  key: string;
}

type UserData = PlayerData | BallData | WallData | GoalData;

class SoccerState {
  wall?: WallData;
  rightGoal?: GoalData;
  leftGoal?: GoalData;
  ball: BallData | null = null;

  playersRed: PlayerData[] = [];
  playersBlue: PlayerData[] = [];
}

class SoccerContext extends DefaultTestbedContext {
  soccer = new SoccerState();
}

class SoccerGame extends Middleware<SoccerContext> {
  constructor() {
    super();
    this.use(new SoccerPhysics());
    this.use(new TestbedTerminal());

    this.on("game-start", this.start);
    this.on("onGoal", this.onGoal);
  }

  start() {
    this.context.soccer.wall = {
      key: "wall",
      type: "wall",
    };

    this.context.soccer.ball = {
      key: "ball-" + Math.random(),
      type: "ball",
    };

    this.context.soccer.leftGoal = {
      key: "left",
      type: "goal",
    };

    this.context.soccer.rightGoal = {
      key: "right",
      type: "goal",
    };

    this.context.soccer.playersRed = this.team().map((v) => ({
      type: "player",
      key: "player-" + Math.random(),
      position: v,
      color: "red",
    }));

    this.context.soccer.playersBlue = this.team(true).map((v) => ({
      type: "player",
      key: "player-" + Math.random(),
      position: v,
      color: "blue",
    }));
  }

  onGoal() {
    this.context.soccer.ball = null;
    setTimeout(() => {
      this.context.soccer.ball = {
        key: "ball-" + Math.random(),
        type: "ball",
      };
    }, 500);
  }

  team(reverse: boolean = false) {
    const positions = [
      { x: -width * 0.45, y: 0 },
      { x: -width * 0.3, y: -height * 0.2 },
      { x: -width * 0.3, y: +height * 0.2 },
      { x: -width * 0.1, y: -height * 0.1 },
      { x: -width * 0.1, y: +height * 0.1 },
    ];
    if (!reverse) {
      return positions;
    } else {
      return positions.map((v) => ({ x: -v.x, y: v.y }));
    }
  }
}

class TestbedTerminal extends Middleware<SoccerContext> {
  constructor() {
    super();
    this.use(new TestbedMain());

    this.on("game-start", this.setup);
  }
  setup() {
    this.context.camera.x = 0;
    this.context.camera.y = 0;
    this.context.camera.width = width * 1.6;
    this.context.camera.height = height * 1.6;
  }
}

class SoccerPhysics extends Middleware<SoccerContext> {
  binder = Binder.create<UserData>({
    key: (object) => object.key,
    drivers: [
      Driver.create<PlayerData, Body>({
        filter: (data) => data.type === "player",
        enter: (data) => {
          return this.createPlayer(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<BallData, Body>({
        filter: (data) => data.type === "ball",
        enter: (data) => {
          return this.createBall(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<WallData, Body>({
        filter: (data) => data.type === "wall",
        enter: (data) => {
          return this.createWall(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<GoalData, Body>({
        filter: (data) => data.type === "goal",
        enter: (data) => {
          return this.createGoal(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
    ],
  });

  constructor() {
    super();
    this.on("game-start", this.setup);
    this.on("frame-update", this.update);
  }

  setup() {
    this.context.world = new World();
    this.context.world.on("post-solve", this.collide.bind(this));

    Settings.velocityThreshold = 0;
  }

  update() {
    this.binder.data([
      this.context.soccer.wall,
      this.context.soccer.leftGoal,
      this.context.soccer.rightGoal,
      this.context.soccer.ball,
      ...this.context.soccer.playersRed,
      ...this.context.soccer.playersBlue,
    ]);
  }

  createWall(data: WallData) {
    const vertices = [
      { x: -width * 0.5 + 0.2, y: -height * 0.5 },
      { x: -width * 0.5, y: -height * 0.5 + 0.2 },
      { x: -width * 0.5, y: -height * 0.2 },
      { x: -width * 0.6, y: -height * 0.2 },
      { x: -width * 0.6, y: +height * 0.2 },
      { x: -width * 0.5, y: +height * 0.2 },
      { x: -width * 0.5, y: +height * 0.5 - 0.2 },
      { x: -width * 0.5 + 0.2, y: +height * 0.5 },
      { x: +width * 0.5 - 0.2, y: +height * 0.5 },
      { x: +width * 0.5, y: +height * 0.5 - 0.2 },
      { x: +width * 0.5, y: +height * 0.2 },
      { x: +width * 0.6, y: +height * 0.2 },
      { x: +width * 0.6, y: -height * 0.2 },
      { x: +width * 0.5, y: -height * 0.2 },
      { x: +width * 0.5, y: -height * 0.5 + 0.2 },
      { x: +width * 0.5 - 0.2, y: -height * 0.5 },
    ];

    const body = this.context.world.createBody({
      type: "static",
      userData: data,
    });
    body.createFixture({
      shape: new Chain(vertices, true),
      friction: 0,
      restitution: 0,
      userData: data,
    });

    return body;
  }

  createGoal(data: GoalData) {
    const body = this.context.world.createBody({
      type: "static",
      position: {
        x: data.key === "left" ? -width * 0.5 : +width * 0.5,
        y: 0,
      },
      userData: data,
    });
    body.createFixture({
      shape: new Chain([
        { x: 0, y: -height * 0.2 },
        { x: 0, y: +height * 0.2 },
      ]),
      friction: 0,
      restitution: 1,
      userData: data,
    });
    return body;
  }

  createBall(data: BallData) {
    const body = this.context.world.createBody({
      type: "dynamic",
      bullet: true,
      linearDamping: 3.5,
      angularDamping: 1.6,
      userData: data,
    });
    body.createFixture({
      shape: new Circle(BALL_R),
      friction: 0.2,
      restitution: 0.99,
      density: 0.5,
      userData: data,
    });
    body.style = { fill: "white", stroke: "black" };
    return body;
  }

  createPlayer(data: PlayerData) {
    const body = this.context.world.createBody({
      type: "dynamic",
      bullet: true,
      linearDamping: 4,
      angularDamping: 1.6,
      position: data.position,
      userData: data,
    });
    body.createFixture({
      shape: new Circle(PLAYER_R),
      friction: 0.1,
      restitution: 0.99,
      density: 0.8,
      userData: data,
    });
    if (data.color === "red") {
      body.style = { fill: "#ff411a", stroke: "black" };
    } else if (data.color === "blue") {
      body.style = { fill: "#0077ff", stroke: "black" };
    }
    return body;
  }

  collide(contact: Contact) {
    const fA = contact.getFixtureA();
    const bA = fA.getBody();
    const fB = contact.getFixtureB();
    const bB = fB.getBody();

    const dataA = bA.getUserData() as UserData;
    const dataB = bB.getUserData() as UserData;

    if (!dataA || !dataB) return;

    const ball = dataA.type === "ball" ? bA : dataB.type === "ball" ? bB : null;
    const goal = dataA.type === "goal" ? bA : dataB.type === "goal" ? bB : null;

    if (ball && goal) {
      // do not change world immediately
      this.context.world.queueUpdate(() => {
        this.emit("onGoal");
      });
    }
  }
}

const main = new SoccerGame();
const context = new SoccerContext();
Runtime.activate(main, context);
main.emit("game-start");
main.emit("tool-switch", { name: "interact-impulse", maxForce: 120 });
