import { World, Circle, Polygon, Body, Contact, Vec2Value, PolygonShape } from "../testbed";

import { Binder, Driver, Middleware, Runtime } from "polymatic";

import { DefaultTestbedContext } from "../testbed/testbed/TestbedContext";
import { TestbedMain } from "../testbed/testbed/TestbedMain";

const SPACE_WIDTH = 16;
const SPACE_HEIGHT = 9;

const FIRE_RELOAD_TIME = 400;
const BULLET_LIFE_TIME = 1000;

const ASTEROID_RADIUS = 0.2;
const ASTEROID_SPEED = 2;

interface ShipData {
  key: string;
  type: "ship";
  x: number;
  y: number;
  left?: boolean;
  right?: boolean;
  forward?: boolean;
}

interface BulletData {
  key: string;
  type: "bullet";
  bulletTime?: number;
  ship: ShipData;
}

interface AsteroidData {
  key: string;
  type: "asteroid";
  size?: number;
  x: number;
  y: number;
}

type UserData = ShipData | BulletData | AsteroidData;

class AsteroidState {
  level: number = 0;
  lives: number = 0;
  gameover: boolean = false;

  globalTime = 0;
  allowCrashTime = 0;
  allowFireTime = 0;

  bullets: BulletData[] = [];
  asteroids: AsteroidData[] = [];
  ship: ShipData | null = null;
}

class AsteroidContext extends DefaultTestbedContext {
  game = new AsteroidState();
}

class AsteroidGame extends Middleware<AsteroidContext> {
  constructor() {
    super();
    this.use(new TestbedTerminal());
    this.use(new AsteroidPhysics());

    this.on("game-start", this.handleGameStart);
    this.on("game-end", this.handleGameEnd);
    this.on("frame-update", this.handleFrameUpdate);

    this.on("collide-bullet-asteroid", this.collideBulletAsteroid);
    this.on("collide-ship-asteroid", this.collideShipAsteroid);
  }

  handleGameStart() {
    this.context.game.gameover = false;
    this.context.game.level = 1;
    this.context.game.lives = 3;

    this.setupShip();
    this.initAsteroids(4);
  }

  handleGameEnd() {
    this.context.game.gameover = true;
  }

  setupShip() {
    this.context.game.ship = {
      key: "ship",
      type: "ship",
      x: 0,
      y: 0,
    };
    this.context.game.allowCrashTime = this.context.game.globalTime + 2000;
  }

  handleFrameUpdate = (ev: { dt: number }) => {
    const { game, gamepad } = this.context;
    game.globalTime += ev.dt;

    if (game.ship) {
      game.ship.left = gamepad.activeKeys.left && !gamepad.activeKeys.right;
      game.ship.right = gamepad.activeKeys.right && !gamepad.activeKeys.left;
      game.ship.forward = gamepad.activeKeys.up;
      if (gamepad.activeKeys.fire) {
        this.fireBullet(game.ship);
      }
    }

    for (let i = game.bullets.length - 1; i >= 0; i--) {
      const bullet = game.bullets[i];
      if ((bullet.bulletTime ?? 0) <= game.globalTime) {
        this.deleteBullet(bullet);
      }
    }
  };

  fireBullet(ship: ShipData) {
    const { game } = this.context;

    if (game.allowFireTime > game.globalTime || !game.ship) {
      return false;
    }
    game.allowFireTime = game.globalTime + FIRE_RELOAD_TIME;
    game.bullets.push({
      key: "bullet-" + Math.random(),
      type: "bullet",
      bulletTime: game.globalTime + BULLET_LIFE_TIME,

      ship: game.ship,
    });
  }

  initAsteroids(count: number) {
    const { game } = this.context;
    game.asteroids.length = 0;

    for (let i = 0; i < count; i++) {
      const x = Calc.random(SPACE_WIDTH);
      const y = Calc.random(SPACE_HEIGHT);

      game.asteroids.push({
        key: "asteroid-" + Math.random(),
        type: "asteroid",
        size: 4,
        x: x,
        y: y,
      });
    }
  }

  splitAsteroid(parentData: AsteroidData, parentBody: Body) {
    const { game } = this.context;
    const parentSize = parentData.size ?? 4;
    const splitSize = parentSize - 1;
    if (splitSize == 0) {
      return;
    }

    const radius = splitSize * ASTEROID_RADIUS;

    const angleDisturb = (Math.PI / 2) * Math.random();
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i + angleDisturb;
      const d = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
      const sp = parentBody.getWorldPoint(d);

      game.asteroids.push({
        key: "asteroid-" + Math.random(),
        type: "asteroid",
        size: splitSize,
        x: sp.x,
        y: sp.y,
      });
    }
  }

  deleteShip(): boolean {
    const { game } = this.context;
    if (!game.ship) return false;
    game.ship = null;
    return true;
  }

  deleteBullet(data: BulletData): boolean {
    const { game } = this.context;
    const index = game.bullets.indexOf(data);
    if (index != -1) {
      game.bullets.splice(index, 1);
      return true;
    }

    return false;
  }

  deleteAsteroid(data: AsteroidData): boolean {
    const { game } = this.context;
    const index = game.asteroids.indexOf(data);
    if (index != -1) {
      game.asteroids.splice(index, 1);
      return true;
    }

    return false;
  }

  collideShipAsteroid() {
    const { game } = this.context;
    if (game.allowCrashTime > game.globalTime) {
      return;
    }

    game.lives--;

    this.deleteShip();

    if (game.lives <= 0) {
      this.handleGameEnd();
    } else {
      setTimeout(() => {
        this.setupShip();
      }, 1000);
    }
  }

  collideBulletAsteroid({ bullet, asteroid }: { bullet: Body; asteroid: Body }) {
    const { game } = this.context;

    const deletedAsteroid = this.deleteAsteroid(asteroid.getUserData() as AsteroidData);
    const deletedBullet = this.deleteBullet(bullet.getUserData() as BulletData);

    if (deletedAsteroid && deletedBullet) {
      this.splitAsteroid(asteroid.getUserData() as AsteroidData, asteroid);
    }

    if (game.asteroids.length == 0) {
      game.level++;
      this.initAsteroids(game.level);
    }
  }
}

class TestbedTerminal extends Middleware<AsteroidContext> {
  constructor() {
    super();
    this.use(new TestbedMain());

    this.on("activate", this.handleActivate);
    this.on("gamepad-keydown", this.handleKeydown);
    this.on("frame-render", this.handleFrameRender);
  }

  handleActivate() {
    this.context.camera.width = SPACE_WIDTH;
    this.context.camera.height = SPACE_HEIGHT;
    this.context.camera.x = 0;
    this.context.camera.y = 0;
  }

  handleKeydown() {
    const { game, gamepad } = this.context;

    if (gamepad.activeKeys.fire && game.gameover) {
      this.emit("game-start");
    }
  }

  handleFrameRender() {
    const { game, gamepad } = this.context;
    // if (game.lives > 0) {
    //   this.testbed.status("");
    // } else {
    //   this.testbed.status("Game Over!");
    // }
    // this.testbed.status("Level", game.level);
    // this.testbed.status("Lives", game.lives);
  }
}

class AsteroidPhysics extends Middleware<AsteroidContext> {
  constructor() {
    super();
    this.on("game-start", this.handleActivate);
    this.on("frame-update", this.handleFrameUpdate);
  }

  static SHIP_BITS = 2;
  static BULLET_BITS = 4;
  static ASTEROID_BITS = 4;

  shipDriver = Driver.create<ShipData, Body>({
    filter: (data) => data.type == "ship",
    enter: (data) => {
      return this.createShip(data);
    },
    update: (data, body) => {
      if (data.left) {
        body.applyAngularImpulse(0.1, true);
      }
      if (data.right) {
        body.applyAngularImpulse(-0.1, true);
      }
      if (data.forward) {
        const f = body.getWorldVector({ x: 0.0, y: 1.0 });
        const p = body.getWorldPoint({ x: 0.0, y: 2.0 });
        body.applyLinearImpulse(f, p, true);
      }
    },
    exit: (data, body) => {
      this.context.world.destroyBody(body);
    },
  });

  asteroidDriver = Driver.create<AsteroidData, Body>({
    filter: (data) => data.type == "asteroid",
    enter: (data) => {
      return this.createAsteroid(data);
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.context.world.destroyBody(body);
    },
  });

  bulletDriver = Driver.create<BulletData, Body>({
    filter: (data) => data.type == "bullet",
    enter: (data) => {
      return this.createBullet(data);
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.context.world.destroyBody(body);
    },
  });

  binder = Binder.create<UserData>({
    key: (data: UserData) => data.key,
    drivers: [this.shipDriver, this.bulletDriver, this.asteroidDriver],
  });

  handleActivate() {
    this.context.world = new World();
    this.context.world.on("pre-solve", this.collide.bind(this));
  }

  handleFrameUpdate = ({ dt }: { dt: number }) => {
    const { game } = this.context;
    this.binder.data([...game.asteroids, ...game.bullets, game.ship]);

    // wrap objects around the screen
    let body = this.context.world.getBodyList();
    while (body) {
      if (body.getType() !== "static") {
        const p = body.getPosition();
        p.x = Calc.wrap(p.x, -SPACE_WIDTH / 2, SPACE_WIDTH / 2);
        p.y = Calc.wrap(p.y, -SPACE_HEIGHT / 2, SPACE_HEIGHT / 2);
        body.setPosition(p);
      }
      body = body.getNext();
    }
  };

  createShip(data: ShipData) {
    const body = this.context.world.createBody({
      type: "dynamic",
      angularDamping: 2.0,
      linearDamping: 0.5,
      position: { x: 0, y: 0 },
      userData: data,
    });

    body.createFixture({
      shape: new Polygon([
        { x: -0.15, y: -0.15 },
        { x: 0, y: -0.1 },
        { x: 0.15, y: -0.15 },
        { x: 0, y: 0.2 },
      ]),
      density: 1000,
      filterCategoryBits: AsteroidPhysics.SHIP_BITS,
      filterMaskBits: AsteroidPhysics.ASTEROID_BITS,
    });

    return body;
  }

  createBullet(data: BulletData): Body | null {
    const speed = 5;
    const shipBody = this.shipDriver.ref(data.ship.key);
    if (!shipBody) return null;
    const bulletBody = this.context.world.createBody({
      type: "dynamic",
      // mass : 0.05,
      position: shipBody.getWorldPoint({ x: 0, y: 0 }),
      linearVelocity: shipBody.getWorldVector({ x: 0, y: speed }),
      bullet: true,
      userData: data,
    });

    bulletBody.createFixture({
      shape: new Circle(0.05),
      filterCategoryBits: AsteroidPhysics.BULLET_BITS,
      filterMaskBits: AsteroidPhysics.ASTEROID_BITS,
    });

    return bulletBody;
  }

  createAsteroid(data: AsteroidData) {
    const size = data.size ?? 4;
    const radius = size * ASTEROID_RADIUS;

    const n = 8;
    const path: Vec2Value[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i * 2 * Math.PI) / n;
      const x = radius * (Math.sin(a) + Calc.random(0.3));
      const y = radius * (Math.cos(a) + Calc.random(0.3));
      path.push({ x: x, y: y });
    }
    const vx = Calc.random(ASTEROID_SPEED);
    const vy = Calc.random(ASTEROID_SPEED);
    const va = Calc.random(ASTEROID_SPEED);
    const body = this.context.world.createBody({
      // mass : 10,
      type: "kinematic",
      position: { x: data.x, y: data.y },
      angle: Calc.random() * Math.PI,
      linearVelocity: { x: vx, y: vy },
      angularVelocity: va,
      userData: data,
    });

    body.createFixture({
      shape: new PolygonShape(path),
      filterCategoryBits: AsteroidPhysics.ASTEROID_BITS,
      filterMaskBits: AsteroidPhysics.BULLET_BITS | AsteroidPhysics.SHIP_BITS,
    });

    return body;
  }

  collide(contact: Contact) {
    const fixtureA = contact.getFixtureA();
    const fixtureB = contact.getFixtureB();

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    const dataA = bodyA.getUserData() as UserData;
    const dataB = bodyB.getUserData() as UserData;

    if (!dataA || !dataB) return;

    const ship = dataA.type == "ship" ? bodyA : dataB.type == "ship" ? bodyB : null;
    const bullet = dataA.type == "bullet" ? bodyA : dataB.type == "bullet" ? bodyB : null;
    const asteroid = dataA.type == "asteroid" ? bodyA : dataB.type == "asteroid" ? bodyB : null;

    if (ship && asteroid) {
      // do not change world immediately
      this.context.world.queueUpdate(() => {
        this.emit("collide-ship-asteroid", { ship, asteroid });
      });
    }

    if (bullet && asteroid) {
      // do not change world immediately
      this.context.world.queueUpdate(() => {
        this.emit("collide-bullet-asteroid", { bullet, asteroid });
      });
    }
  }
}

class Calc {
  static wrap(num: number, min: number, max: number) {
    if (typeof min === "undefined") {
      max = 1;
      min = 0;
    } else if (typeof max === "undefined") {
      max = min;
      min = 0;
    }
    if (max > min) {
      num = (num - min) % (max - min);
      return num + (num < 0 ? max : min);
    } else {
      num = (num - max) % (min - max);
      return num + (num <= 0 ? min : max);
    }
  }

  static random(value = 1) {
    return (Math.random() - 0.5) * value;
  }
}

const main = new AsteroidGame();
const context = new AsteroidContext();
Runtime.activate(main, context);
main.emit("game-start");
