import { World, Vec2Value, Circle, Chain, Settings, Contact, Body } from "../testbed";

import { Binder, Driver, Middleware, Runtime } from "polymatic";

import { DefaultTestbedContext, TestbedMain } from "planck-testbed";

type Color = "red" | "blue";

interface PuckData {
  key: string;
  type: "puck";
  color?: Color;
  x?: number;
  y?: number;
  radius?: number;
}

interface WallData {
  key: string;
  type: "wall";
}

type UserData = PuckData | WallData;

class ShuffleState {
  boardWidth = 10.0;
  boardHeight = 10.0;
  puckRadius = 0.3;
  puckSpace = 1;
  pucks: PuckData[] = [];
}

class ShuffleContext extends DefaultTestbedContext {
  shuffle = new ShuffleState();
}

class ShuffleGame extends Middleware<ShuffleContext> {
  constructor() {
    super();
    this.on("game-puck-out", this.handlePuckOut);
    this.on("game-start", this.handleGameStart);

    this.use(new ShufflePhysics());
    this.use(new TestbedTerminal());
  }

  handleGameStart() {
    const { boardWidth: width, boardHeight: height, puckRadius, puckSpace } = this.context.shuffle;

    this.context.shuffle.pucks.push(
      ...this.team(1, 8, puckRadius, puckSpace).map((v) => ({
        key: "red-puck-" + v.x + "-" + v.y,
        x: v.x + height * 0.4,
        y: v.y + 0,
        color: "red" as const,
        type: "puck" as const,
        radius: puckRadius,
      })),
    );

    this.context.shuffle.pucks.push(
      ...this.team(1, 8, puckRadius, puckSpace).map((v) => ({
        key: "blue-puck-" + v.x + "-" + v.y,
        x: v.x + -height * 0.4,
        y: v.y + 0,
        color: "blue" as const,
        type: "puck" as const,
        radius: puckRadius,
      })),
    );
  }

  team(n: number, m: number, r: number, l: number) {
    const pucks: Vec2Value[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        pucks.push({
          x: i * l - (n - 1) * 0.5 * l + Math.random() * r * 0.02,
          y: j * l - (m - 1) * 0.5 * l + Math.random() * r * 0.02,
        });
      }
    }

    return pucks;
  }

  handlePuckOut(ev: { data: PuckData }) {
    const index = this.context.shuffle.pucks.indexOf(ev.data);
    if (index >= 0) this.context.shuffle.pucks.splice(index, 1);
  }
}

class TestbedTerminal extends Middleware<ShuffleContext> {
  constructor() {
    super();
    this.use(new TestbedMain());

    this.on("activate", this.handleActivate);
    this.on("frame-loop", this.handleFrameLoop);
  }

  handleActivate() {
    const { boardWidth: width, boardHeight: height } = this.context.shuffle;
    this.context.camera.x = 0;
    this.context.camera.y = 0;
    this.context.camera.width = width * 1.5;
    this.context.camera.height = height * 1.5;
  }

  handleFrameLoop() {
    // this.testbed.status("Red", game.redPucks.length);
    // this.testbed.status("Blue", game.bluePucks.length);
  }
}

const STYLES = {
  red: { fill: "#ff411a", stroke: "black" },
  blue: { fill: "#0077ff", stroke: "black" },
};

class ShufflePhysics extends Middleware<ShuffleContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("frame-update", this.handleFrameUpdate);
    this.on("game-start", this.handleGameStart);
  }

  binder = Binder.create<UserData>({
    key: (data: UserData) => data.key,
    drivers: [
      Driver.create<PuckData, Body>({
        filter: (data) => data.type === "puck",
        enter: (data) => {
          return this.createPuck(data);
        },
        update: (data, body) => {},
        exit: (data, body) => {
          if (body) {
            this.context.world.destroyBody(body);
          }
        },
      }),
    ],
  });

  handleActivate() {
    Settings.velocityThreshold = 0;
    this.context.world = new World();
    this.context.world.on("begin-contact", this.handleBeginContact.bind(this));
  }

  handleFrameUpdate() {
    this.binder.data(this.context.shuffle.pucks);
  }

  handleGameStart() {
    this.createBoard();
  }

  createBoard() {
    const { boardWidth: width, boardHeight: height } = this.context.shuffle;

    const userData = {
      type: "wall",
    };

    const shape = new Chain(
      [
        { x: -width * 0.5, y: -height * 0.5 },
        { x: -width * 0.5, y: +height * 0.5 },
        { x: +width * 0.5, y: +height * 0.5 },
        { x: +width * 0.5, y: -height * 0.5 },
      ],
      true,
    );

    const body = this.context.world.createBody({
      type: "static",
      userData,
    });

    body.createFixture({
      shape: shape,
      isSensor: true,
      userData,
    });
  }

  createPuck(data: PuckData) {
    const style = data.color ? STYLES[data.color] : undefined;
    const body = this.context.world.createBody({
      type: "dynamic",
      bullet: true,
      position: data as Vec2Value,
      linearDamping: 1.6,
      angularDamping: 1.6,
      userData: data,
      style,
    });
    body.createFixture({
      shape: new Circle(data.radius),
      friction: 0.1,
      restitution: 0.98,
      density: 0.8,
      userData: data,
      style,
    });

    return body;
  }

  handleBeginContact = (contact: Contact) => {
    const fA = contact.getFixtureA();
    const bA = fA.getBody();
    const fB = contact.getFixtureB();
    const bB = fB.getBody();

    const dataA = fA.getUserData() as UserData;
    const dataB = fB.getUserData() as UserData;

    if (!dataA || !dataB) return;

    const wall = dataA.type === "wall" ? bA : dataB.type === "wall" ? bB : null;
    const puck = dataA.type === "puck" ? bA : dataB.type === "puck" ? bB : null;

    if (puck && wall) {
      this.context.world.queueUpdate(() => {
        this.emit("game-puck-out", {
          data: puck.getUserData() as PuckData,
          body: puck,
        });
      });
    }
  };
}

const main = new ShuffleGame();
const context = new ShuffleContext();
Runtime.activate(main, context);
main.emit("game-start");
main.emit("tool-switch", { name: "interact-impulse", maxForce: 100 });
