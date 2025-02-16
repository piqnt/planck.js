import {
  World,
  Vec2Value,
  Circle,
  Chain,
  Settings,
  Testbed,
  Contact,
  Body,
  DataDriver,
} from "planck";

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

class ShuffleGame {
  physics = new ShufflePhysics();
  terminal = new TestbedTerminal();

  redPucks: PuckData[] = [];
  bluePucks: PuckData[] = [];

  width = 10.0;
  height = 10.0;

  puckRadius = 0.3;
  puckSpace = 1;

  setup() {
    this.physics.setup(this);
    this.terminal.setup(this);
  }

  update() {
    this.physics.update(this);
    this.terminal.update(this);
  }

  start() {
    this.physics.start();

    this.physics.createBoard(this.width, this.height);

    this.redPucks = this.team(1, 8, this.puckRadius, this.puckSpace).map((v) => ({
      key: "red-puck-" + v.x + "-" + v.y,
      x: v.x + this.height * 0.4,
      y: v.y + 0,
      color: "red",
      type: "puck",
      radius: this.puckRadius,
    }));

    this.bluePucks = this.team(1, 8, this.puckRadius, this.puckSpace).map((v) => ({
      key: "blue-puck-" + v.x + "-" + v.y,
      x: v.x + -this.height * 0.4,
      y: v.y + 0,
      color: "blue",
      type: "puck",
      radius: this.puckRadius,
    }));

    this.update();
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

  onPuckOut(data: PuckData) {
    if (data.color == "red") {
      const index = this.redPucks.indexOf(data);
      if (index >= 0) this.redPucks.splice(index, 1);
    } else if (data.color == "blue") {
      const index = this.bluePucks.indexOf(data);
      if (index >= 0) this.bluePucks.splice(index, 1);
    }

    this.update();
  }
}

class TestbedTerminal {
  testbed: Testbed;

  setup(game: ShuffleGame) {
    this.testbed = Testbed.mount();
    this.testbed.x = 0;
    this.testbed.y = 0;
    this.testbed.width = game.width * 1.5;
    this.testbed.height = game.height * 1.5;
    this.testbed.mouseForce = -100;
    this.testbed.start(game.physics.world);
  }

  update(game: ShuffleGame) {
    this.testbed.status("Red", game.redPucks.length);
    this.testbed.status("Blue", game.bluePucks.length);
  }
}

const STYLES = {
  red: { fill: "#ff411a", stroke: "black" },
  blue: { fill: "#0077ff", stroke: "black" },
};

interface ShufflePhysicsListener {
  onPuckOut(data: PuckData, body: Body): void;
}

class ShufflePhysics {
  listener: ShufflePhysicsListener;

  world: World;

  driver = new DataDriver<UserData, Body>((data: UserData) => data.key, {
    enter: (data: UserData) => {
      if (data.type === "puck") return this.createPuck(data);
      return null;
    },
    update: (data: UserData, body: Body) => {},
    exit: (data: UserData, body: Body) => {
      if (body) {
        this.world.destroyBody(body);
      }
    },
  });

  setup(client: ShufflePhysicsListener) {
    this.listener = client;
    Settings.velocityThreshold = 0;
    this.world = new World();
    this.world.on("begin-contact", this.handleBeginContact.bind(this));
  }

  update(game: ShuffleGame) {
    this.driver.update([...game.redPucks, ...game.bluePucks]);
  }

  start() {}

  createBoard(width: number, height: number) {
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

    const body = this.world.createBody({
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
    const body = this.world.createBody({
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
      this.world.queueUpdate(() => {
        this.listener.onPuckOut(puck.getUserData() as PuckData, puck);
      });
    }
  };
}

{
  const game = new ShuffleGame();
  game.setup();
  game.start();
}
