import { World, Circle, Settings, Polygon, Vec2Value, Contact, Body } from "../testbed";

import { Binder, Driver, Middleware, Runtime } from "polymatic";

import { DefaultTestbedContext } from "../testbed/testbed/TestbedContext";
import { TestbedMain } from "../testbed/testbed/TestbedMain";

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

class EightBallState {
  // table geometry
  table = new BilliardTableData();
  // game data
  balls: BallData[] = [];
  rails: RailData[] = [];
  pockets: PocketData[] = [];
}

class EightBallContext extends DefaultTestbedContext {
  game = new EightBallState();
}

class EightBallGame extends Middleware<EightBallContext> {
  constructor() {
    super();
    this.use(new BilliardPhysics());
    this.use(new EightBallTestbed());

    this.on("activate", this.handleActivate);
    this.on("ball-in-pocket", this.onBallInPocket);
  }

  // start a new game
  handleActivate() {
    this.context.game.rails = this.context.game.table.getRails();
    this.context.game.pockets = this.context.game.table.getPockets();
    this.context.game.balls = this.context.game.table.rackBalls();
  }

  // reset the cue ball
  resetCueBall() {
    this.context.game.balls.push(this.context.game.table.cueBall());
  }

  // sink event listener
  onBallInPocket({ ball, pocket }: { ball: BallData; pocket: PocketData }) {
    const index = this.context.game.balls.indexOf(ball);
    if (index !== -1) this.context.game.balls.splice(index, 1);

    if (ball.color === BLACK) {
      this.context.game.balls = [];
      setTimeout(this.handleActivate.bind(this), 400);
    } else if (ball.color === WHITE) {
      setTimeout(this.resetCueBall.bind(this), 400);
    }
  }
}

class EightBallTestbed extends Middleware<EightBallContext> {
  constructor() {
    super();
    this.use(new TestbedMain());
    this.on("activate", this.handleActivate);
  }

  handleActivate() {
    Settings.velocityThreshold = 0;

    this.context.camera.x = 0;
    this.context.camera.y = 0;
    this.context.camera.width = this.context.game.table.tableWidth * 1.2;
    this.context.camera.height = this.context.game.table.tableHeight * 1.2;
  }
}

interface BallData {
  type: "ball";
  key: string;
  position: { x: number; y: number };
  radius: number;
  color: string;
}

interface RailData {
  type: "rail";
  key: string;
  vertices: Vec2Value[] | undefined;
}

interface PocketData {
  type: "pocket";
  key: string;
  position: {
    x: number;
    y: number;
  };
  radius: number;
}

type UserData = BallData | RailData | PocketData;

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
} as Record<string, { fill: string; stroke: string }>;

class BilliardPhysics extends Middleware<EightBallContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("frame-update", this.handleFrameLoop);
  }

  binder = Binder.create<UserData>({
    key: (data) => data.key,
    drivers: [
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
      Driver.create<RailData, Body>({
        filter: (data) => data.type === "rail",
        enter: (data) => {
          return this.createRail(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          this.context.world.destroyBody(body);
        },
      }),
      Driver.create<PocketData, Body>({
        filter: (data) => data.type === "pocket",
        enter: (data) => {
          return this.createPocket(data);
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
    this.context.world.on("begin-contact", this.collide);
  }

  handleFrameLoop() {
    const { game } = this.context;
    this.binder.data([...game.balls, ...game.rails, ...game.pockets]);
  }

  createBall(data: BallData) {
    const body = this.context.world.createBody({
      type: "dynamic",
      bullet: true,
      position: data.position,
      linearDamping: 1.5,
      angularDamping: 1,
      userData: data,
    });
    body.createFixture({
      shape: new Circle(data.radius),
      friction: 0.1,
      restitution: 0.99,
      density: 1,
      userData: data,
      style: STYLES[data.color],
    });
    return body;
  }

  createRail(data: RailData) {
    const body = this.context.world.createBody({
      type: "static",
      userData: data,
    });
    const fixture = body.createFixture({
      shape: new Polygon(data.vertices),
      friction: 0.1,
      restitution: 0.9,
      userData: data,
    });
    return body;
  }

  createPocket(data: PocketData) {
    const body = this.context.world.createBody({
      type: "static",
      position: data.position,
      userData: data,
    });
    const fixture = body.createFixture({
      shape: new Circle(data.radius),
      userData: data,
      isSensor: true,
    });
    return body;
  }

  collide = (contact: Contact) => {
    const fA = contact.getFixtureA();
    const bA = fA.getBody();
    const fB = contact.getFixtureB();
    const bB = fB.getBody();

    const dataA = bA.getUserData() as UserData;
    const dataB = bB.getUserData() as UserData;

    if (!dataA || !dataB) return;

    const ball = dataA.type === "ball" ? bA : dataB.type === "ball" ? bB : null;
    const pocket = dataA.type === "pocket" ? bA : dataB.type === "pocket" ? bB : null;

    if (ball && pocket) {
      // do not change world immediately
      this.context.world.queueUpdate(() => {
        this.emit("ball-in-pocket", {
          ball: ball.getUserData() as BallData,
          pocket: pocket.getUserData() as PocketData,
        });
      });
    }
  };
}

// table data
class BilliardTableData {
  tableWidth = 8.0;
  tableHeight = 4.0;

  ballRadius = 0.12;
  pocketRadius = 0.2;

  getRails(): RailData[] {
    const SPI4 = Math.sin(Math.PI / 4);

    const topLeftRail = [
      {
        x: this.pocketRadius,
        y: this.tableHeight * 0.5,
      },
      {
        x: this.pocketRadius,
        y: this.tableHeight * 0.5 + this.pocketRadius,
      },
      {
        x: this.tableWidth * 0.5 - this.pocketRadius / SPI4 + this.pocketRadius,
        y: this.tableHeight * 0.5 + this.pocketRadius,
      },
      {
        x: this.tableWidth * 0.5 - this.pocketRadius / SPI4,
        y: this.tableHeight * 0.5,
      },
    ];

    const leftRail = [
      {
        x: this.tableWidth * 0.5,
        y: -(this.tableHeight * 0.5 - this.pocketRadius / SPI4),
      },
      {
        x: this.tableWidth * 0.5 + this.pocketRadius,
        y: -(this.tableHeight * 0.5 - this.pocketRadius / SPI4 + this.pocketRadius),
      },
      {
        x: this.tableWidth * 0.5 + this.pocketRadius,
        y: this.tableHeight * 0.5 - this.pocketRadius / SPI4 + this.pocketRadius,
      },
      {
        x: this.tableWidth * 0.5,
        y: this.tableHeight * 0.5 - this.pocketRadius / SPI4,
      },
    ];
    return [
      {
        type: "rail",
        key: "rail-1",
        vertices: leftRail,
      },
      {
        type: "rail",
        key: "rail-2",
        vertices: leftRail.map((v) => ({ x: -v.x, y: +v.y })),
      },
      {
        type: "rail",
        key: "rail-3",
        vertices: topLeftRail,
      },
      {
        type: "rail",
        key: "rail-4",
        vertices: topLeftRail.map((v) => ({ x: -v.x, y: +v.y })),
      },
      {
        type: "rail",
        key: "rail-5",
        vertices: topLeftRail.map((v) => ({ x: +v.x, y: -v.y })),
      },
      {
        type: "rail",
        key: "rail-6",
        vertices: topLeftRail.map((v) => ({ x: -v.x, y: -v.y })),
      },
    ];
  }

  getPockets(): PocketData[] {
    return [
      {
        type: "pocket",
        key: "pocket-1",
        radius: this.pocketRadius,
        position: {
          x: 0,
          y: -this.tableHeight * 0.5 - this.pocketRadius * 1.5,
        },
      },
      {
        type: "pocket",
        key: "pocket-2",
        radius: this.pocketRadius,
        position: {
          x: 0,
          y: +this.tableHeight * 0.5 + this.pocketRadius * 1.5,
        },
      },
      {
        type: "pocket",
        key: "pocket-3",
        radius: this.pocketRadius,
        position: {
          x: +this.tableWidth * 0.5 + this.pocketRadius * 0.7,
          y: +this.tableHeight * 0.5 + this.pocketRadius * 0.7,
        },
      },
      {
        type: "pocket",
        key: "pocket-4",
        radius: this.pocketRadius,
        position: {
          x: -this.tableWidth * 0.5 - this.pocketRadius * 0.7,
          y: +this.tableHeight * 0.5 + this.pocketRadius * 0.7,
        },
      },
      {
        type: "pocket",
        key: "pocket-5",
        radius: this.pocketRadius,
        position: {
          x: +this.tableWidth * 0.5 + this.pocketRadius * 0.7,
          y: -this.tableHeight * 0.5 - this.pocketRadius * 0.7,
        },
      },
      {
        type: "pocket",
        key: "pocket-6",
        radius: this.pocketRadius,
        position: {
          x: -this.tableWidth * 0.5 - this.pocketRadius * 0.7,
          y: -this.tableHeight * 0.5 - this.pocketRadius * 0.7,
        },
      },
    ];
  }

  rackBalls() {
    const r = this.ballRadius;
    const cx = this.tableWidth / 4;
    const cy = 0;

    const SPI3 = Math.sin(Math.PI / 3);

    Util.shuffleArray(COLORS);

    const n = 5;
    const balls: BallData[] = [];
    const d = r * 2;
    const l = SPI3 * d;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        balls.push({
          type: "ball",
          key: "ball-" + Math.random(),
          position: {
            x: cx + i * l /*- (n - 1) * 0.5 * l*/ + Math.random() * r * 0.02,
            y: cy + (j - i * 0.5) * d + Math.random() * r * 0.02,
          },
          radius: this.ballRadius,
          color: COLORS[balls.length],
        });
      }
    }

    balls[14].color = balls[4].color;
    balls[4].color = BLACK;

    balls.push(this.cueBall());

    return balls;
  }

  cueBall(): BallData {
    return {
      type: "ball",
      key: "ball-" + Math.random(),
      position: {
        x: -this.tableWidth / 4,
        y: 0,
      },

      radius: this.ballRadius,
      color: WHITE,
    };
  }
}

class Util {
  static shuffleArray<T>(array: T[]) {
    // http://stackoverflow.com/a/12646864/483728
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}

const main = new EightBallGame();
const context = new EightBallContext();
Runtime.activate(main, context);
main.emit("game-start");
main.emit("tool-switch", { name: "interact-impulse", maxForce: 20 });
