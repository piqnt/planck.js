import { World, Vec2, Circle, Polygon, Testbed, Body, Contact, Vec2Value } from "planck";

const SPACE_WIDTH = 16;
const SPACE_HEIGHT = 9;

const FIRE_RELOAD_TIME = 400;
const BULLET_LIFE_TIME = 1000;

const ASTEROID_RADIUS = 0.2;
const ASTEROID_SPEED = 2;

const SHIP_BITS = 2;
const BULLET_BITS = 4;
const ASTEROID_BITS = 4;

interface UserData {
  type: string;
  size?: number;
  bulletTime?: number;
}

interface AsteroidPhysicsClient {
  collideShipAsteroid(ship: Body, asteroid: Body): void;
  collideBulletAsteroid(asteroidBody: Body, bulletBody: Body): void;
}

class AsteroidPhysics {
  client?: AsteroidPhysicsClient;

  world: World;
  asteroids: Body[] = [];
  bullets: Body[] = [];
  ship: Body | null;

  constructor(client?: AsteroidPhysicsClient) {
    this.client = client;
  }

  setup() {
    if (this.world) return;

    this.world = new World();
    this.world.on("pre-solve", this.collidePhysics.bind(this));
  }

  start() {
    this.createShip();
    this.createAsteroids(4);
  }

  end() {}

  step = (dt: number) => {
    if (this.ship) {
      this.wrapBody(this.ship);
    }

    for (let i = 0; i !== this.bullets.length; i++) {
      this.wrapBody(this.bullets[i]);
    }

    for (let i = 0; i !== this.asteroids.length; i++) {
      this.wrapBody(this.asteroids[i]);
    }
  };

  createShip() {
    this.ship = this.world.createBody({
      type: "dynamic",
      angularDamping: 2.0,
      linearDamping: 0.5,
      position: new Vec2(),
      userData: {
        type: "ship",
      },
    });

    this.ship.createFixture(
      new Polygon([
        new Vec2(-0.15, -0.15),
        new Vec2(0, -0.1),
        new Vec2(0.15, -0.15),
        new Vec2(0, 0.2),
      ]),
      {
        density: 1000,
        filterCategoryBits: SHIP_BITS,
        filterMaskBits: ASTEROID_BITS,
      },
    );
  }

  steerLeft() {
    if (!this.ship) return false;
    this.ship.applyAngularImpulse(0.1, true);
    return true;
  }

  steerRight() {
    if (!this.ship) return false;
    this.ship.applyAngularImpulse(-0.1, true);
    return true;
  }

  thrustForward() {
    if (!this.ship) return false;
    const f = this.ship.getWorldVector(new Vec2(0.0, 1.0));
    const p = this.ship.getWorldPoint(new Vec2(0.0, 2.0));
    this.ship.applyLinearImpulse(f, p, true);
    return true;
  }

  fireBullet(speed = 5): Body | null {
    if (!this.ship) return null;

    const body = this.world.createBody({
      type: "dynamic",
      // mass : 0.05,
      position: this.ship.getWorldPoint(new Vec2(0, 0)),
      linearVelocity: this.ship.getWorldVector(new Vec2(0, speed)),
      bullet: true,
      userData: {
        type: "bullet",
      },
    });

    body.createFixture(new Circle(0.05), {
      filterCategoryBits: BULLET_BITS,
      filterMaskBits: ASTEROID_BITS,
    });

    this.bullets.push(body);
    return body;
  }

  createAsteroids(count: number) {
    while (this.asteroids.length) {
      const asteroidBody = this.asteroids.shift();
      this.world.destroyBody(asteroidBody!);
    }

    for (let i = 0; i < count; i++) {
      const x = Calc.random(SPACE_WIDTH);
      const y = Calc.random(SPACE_HEIGHT);

      const vx = Calc.random(ASTEROID_SPEED);
      const vy = Calc.random(ASTEROID_SPEED);
      const va = Calc.random(ASTEROID_SPEED);

      this.makeAsteroidBody(x, y, vx, vy, va, 4);
    }
  }

  makeAsteroidBody(x: number, y: number, vx: number, vy: number, va: number, size: number) {
    const radius = size * ASTEROID_RADIUS;

    const n = 8;
    const path: Vec2Value[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i * 2 * Math.PI) / n;
      const x = radius * (Math.sin(a) + Calc.random(0.3));
      const y = radius * (Math.cos(a) + Calc.random(0.3));
      path.push(new Vec2(x, y));
    }

    const shape = new Polygon(path);

    const asteroidBody = this.world.createBody({
      // mass : 10,
      type: "kinematic",
      position: new Vec2(x, y),
      linearVelocity: new Vec2(vx, vy),
      angularVelocity: va,
      userData: {
        type: "asteroid",
        size: size,
      },
    });
    this.asteroids.push(asteroidBody);

    asteroidBody.createFixture(shape, {
      filterCategoryBits: ASTEROID_BITS,
      filterMaskBits: BULLET_BITS | SHIP_BITS,
    });

    return asteroidBody;
  }

  splitAsteroid(parent: Body) {
    const parentData = parent.getUserData() as UserData;
    const currentSize = parentData?.size ?? 4;
    const splitSize = currentSize - 1;
    if (splitSize == 0) {
      return;
    }

    const radius = splitSize * ASTEROID_RADIUS;

    const angleDisturb = (Math.PI / 2) * Math.random();
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i + angleDisturb;
      const d = new Vec2(radius * Math.cos(angle), radius * Math.sin(angle));
      const sp = parent.getWorldPoint(d);

      const vx = Calc.random(ASTEROID_SPEED);
      const vy = Calc.random(ASTEROID_SPEED);
      const va = Calc.random(ASTEROID_SPEED);

      const child = this.makeAsteroidBody(sp.x, sp.y, vx, vy, va, splitSize);
      child.setAngle(Calc.random() * Math.PI);
    }
  }

  collidePhysics(contact: Contact) {
    const fixtureA = contact.getFixtureA();
    const fixtureB = contact.getFixtureB();

    const bodyA = fixtureA.getBody();
    const bodyB = fixtureB.getBody();

    const dataA = bodyA.getUserData() as UserData;
    const dataB = bodyB.getUserData() as UserData;

    const ship = dataA?.type == "ship" ? bodyA : dataB?.type == "ship" ? bodyB : null;

    const bullet = dataA?.type == "bullet" ? bodyA : dataB?.type == "bullet" ? bodyB : null;

    const asteroid = dataA?.type == "asteroid" ? bodyA : dataB?.type == "asteroid" ? bodyB : null;

    setTimeout(() => {
      if (ship && asteroid) {
        this.client?.collideShipAsteroid(ship, asteroid);
      }

      if (bullet && asteroid) {
        this.client?.collideBulletAsteroid(bullet, asteroid);
      }
    }, 1);
  }

  deleteShip(): boolean {
    if (!this.ship) return false;

    this.world.destroyBody(this.ship);
    this.ship = null;
    return true;
  }

  deleteBullet(bullet: Body): boolean {
    const index = this.bullets.indexOf(bullet);
    if (index != -1) {
      this.world.destroyBody(bullet);
      this.bullets.splice(index, 1);
      return true;
    }
    return false;
  }

  deleteAsteroid(asteroid: Body): boolean {
    const index = this.asteroids.indexOf(asteroid);
    if (index != -1) {
      this.world.destroyBody(asteroid);
      this.asteroids.splice(index, 1);
      return true;
    }
    return false;
  }

  wrapBody(body: Body) {
    const p = body.getPosition();
    p.x = Calc.wrap(p.x, -SPACE_WIDTH / 2, SPACE_WIDTH / 2);
    p.y = Calc.wrap(p.y, -SPACE_HEIGHT / 2, SPACE_HEIGHT / 2);
    body.setPosition(p);
  }
}

class AsteroidGame {
  terminal: TerminalInterface;
  physics: AsteroidPhysics;

  globalTime = 0;

  level: number;
  lives: number;
  gameover: boolean;

  allowCrashTime = 0;
  allowFireTime = 0;

  setup(terminal: TerminalInterface) {
    this.terminal = terminal;
    this.physics = new AsteroidPhysics(this);

    this.physics.setup();
    this.terminal.setup(this);
  }

  start() {
    this.gameover = false;
    this.level = 1;
    this.lives = 3;

    this.physics.start();
    this.terminal.start(this);
  }

  end() {
    this.gameover = true;
    this.terminal.end(this);
  }

  setupShip() {
    this.physics.createShip();
    this.allowCrashTime = this.globalTime + 2000;
  }

  step = (dt: number) => {
    this.globalTime += dt;

    if (this.terminal.activeKeys.left && !this.terminal.activeKeys.right) {
      this.physics.steerLeft();
    } else if (this.terminal.activeKeys.right && !this.terminal.activeKeys.left) {
      this.physics.steerRight();
    }

    if (this.terminal.activeKeys.up) {
      this.physics.thrustForward();
    }

    if (this.terminal.activeKeys.fire && this.globalTime > this.allowFireTime) {
      const bullet = this.physics.fireBullet();
      if (bullet) {
        this.allowFireTime = this.globalTime + FIRE_RELOAD_TIME;
        const data = bullet.getUserData() as UserData;
        data.bulletTime = this.globalTime + BULLET_LIFE_TIME;
      }
    }

    for (let i = this.physics.bullets.length - 1; i >= 0; i--) {
      const bullet = this.physics.bullets[i];
      const data = bullet.getUserData() as UserData;
      if ((data.bulletTime ?? 0) <= this.globalTime) {
        this.physics.deleteBullet(bullet);
      }
    }

    this.physics.step(dt);
  };

  collideShipAsteroid(ship: Body, asteroid: Body) {
    if (this.allowCrashTime > this.globalTime) {
      return;
    }

    this.lives--;
    this.terminal.status(this);

    this.physics.deleteShip();

    if (this.lives <= 0) {
      this.end();
      return;
    }
    setTimeout(() => {
      this.setupShip();
    }, 1000);
  }

  collideBulletAsteroid(bullet: Body, asteroid: Body) {
    const deletedAsteroid = this.physics.deleteAsteroid(asteroid);
    const deletedBullet = this.physics.deleteBullet(bullet);

    if (deletedAsteroid && deletedBullet) {
      this.physics.splitAsteroid(asteroid);
    }

    if (this.physics.asteroids.length == 0) {
      this.level++;
      this.terminal.status(this);
      this.physics.createAsteroids(this.level);
    }
  }
}

interface TerminalInterface {
  activeKeys: { [key: string]: boolean };
  setup(game: AsteroidGame): void;
  start(game: AsteroidGame): void;
  end(game: AsteroidGame): void;
  status(game: AsteroidGame): void;
}

class TestbedTerminal implements TerminalInterface {
  testbed: Testbed;

  get activeKeys() {
    return this.testbed.activeKeys;
  }

  setup(game: AsteroidGame) {
    if (this.testbed) return;

    this.testbed = Testbed.mount();
    this.testbed.width = SPACE_WIDTH;
    this.testbed.height = SPACE_HEIGHT;
    this.testbed.y = 0;

    this.testbed.keydown = () => {
      if (this.testbed.activeKeys.fire && game.gameover) {
        game.start();
      }
    };

    this.testbed.step = (dt) => {
      game.step(dt);
    };

    this.testbed.start(game.physics.world);
  }

  start(game: AsteroidGame) {
    this.status(game);
  }

  end(game: AsteroidGame) {
    this.testbed.status("Game Over!");
  }

  status(game: AsteroidGame) {
    this.testbed.status("Level", game.level);
    this.testbed.status("Lives", game.lives);
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

{
  const terminal = new TestbedTerminal();
  const game = new AsteroidGame();
  game.setup(terminal);
  game.start();
}
