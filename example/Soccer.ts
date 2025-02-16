import {
  World,
  Circle,
  Chain,
  Settings,
  Testbed,
  Contact,
  Vec2Value,
  DataDriver,
  Body,
} from "planck";

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

class SoccerGame {
  terminal = new TestbedTerminal();
  physics = new SoccerPhysics();

  wall: WallData;
  rightGoal: GoalData;
  leftGoal: GoalData;
  ball: BallData | null = null;

  playersRed: PlayerData[] = [];
  playersBlue: PlayerData[] = [];

  setup() {
    this.physics.setup(this);
    this.terminal.setup(this);
  }

  update() {
    this.physics.update(this);
    this.terminal.update(this);
  }

  start() {
    this.wall = {
      key: "wall",
      type: "wall",
    };

    this.ball = {
      key: "ball-" + Math.random(),
      type: "ball",
    };

    this.leftGoal = {
      key: "left",
      type: "goal",
    };

    this.rightGoal = {
      key: "right",
      type: "goal",
    };

    this.playersRed = this.team().map((v) => ({
      type: "player",
      key: "player-" + Math.random(),
      position: v,
      color: "red",
    }));

    this.playersBlue = this.team(true).map((v) => ({
      type: "player",
      key: "player-" + Math.random(),
      position: v,
      color: "blue",
    }));

    this.update();
  }

  onGoal() {
    this.ball = null;
    setTimeout(() => {
      this.ball = {
        key: "ball-" + Math.random(),
        type: "ball",
      };
      this.update();
    }, 500);

    this.update();
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

class TestbedTerminal {
  setup(game: SoccerGame) {
    const testbed = Testbed.mount();
    testbed.x = 0;
    testbed.y = 0;
    testbed.width = width * 1.6;
    testbed.height = height * 1.6;
    testbed.mouseForce = -120;
    testbed.start(game.physics.world);
  }

  update(game: SoccerGame) {}
}

interface SoccerPhysicsListener {
  onGoal(): void;
}

class SoccerPhysics {
  listener: SoccerPhysicsListener;

  world: World;

  driver = new DataDriver<UserData, Body>((data) => data.key, {
    enter: (data: UserData) => {
      if (data.type === "player") return this.createPlayer(data);
      if (data.type === "ball") return this.createBall(data);
      if (data.type === "wall") return this.createWall(data);
      if (data.type === "goal") return this.createGoal(data);
      return null;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  setup(listener: SoccerPhysicsListener) {
    this.listener = listener;
    this.world = new World();
    this.world.on("post-solve", this.collide.bind(this));

    Settings.velocityThreshold = 0;
  }

  update(game: SoccerGame) {
    this.driver.update([
      game.wall,
      game.leftGoal,
      game.rightGoal,
      game.ball,
      ...game.playersRed,
      ...game.playersBlue,
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

    const body = this.world.createBody({
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
    const body = this.world.createBody({
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
    const body = this.world.createBody({
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
    const body = this.world.createBody({
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
      this.world.queueUpdate(() => {
        this.listener.onGoal();
      });
    }
  }
}

{
  const game = new SoccerGame();
  game.setup();
  game.start();
}
