import { World, Circle, Polygon, Testbed, Body, Contact, Vec2Value, DataDriver } from "planck";

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

class AsteroidGame {
  terminal = new TestbedTerminal();
  physics = new AsteroidPhysics();

  level: number;
  lives: number;
  gameover: boolean;

  globalTime = 0;
  allowCrashTime = 0;
  allowFireTime = 0;

  bullets: BulletData[] = [];
  asteroids: AsteroidData[] = [];
  ship: ShipData | null = null;

  setup() {
    this.physics.setup(this);
    this.terminal.setup(this);
  }

  update() {
    this.physics.update(this);
    this.terminal.update(this);
  }

  start() {
    this.gameover = false;
    this.level = 1;
    this.lives = 3;

    this.setupShip();
    this.initAsteroids(4);

    this.update();
  }

  end() {
    this.gameover = true;

    this.update();
  }

  setupShip() {
    this.ship = {
      key: "ship",
      type: "ship",
      x: 0,
      y: 0,
    };
    this.allowCrashTime = this.globalTime + 2000;
    this.update();
  }

  step = (dt: number) => {
    this.globalTime += dt;

    if (this.ship) {
      this.ship.left = this.terminal.activeKeys.left && !this.terminal.activeKeys.right;
      this.ship.right = this.terminal.activeKeys.right && !this.terminal.activeKeys.left;
      this.ship.forward = this.terminal.activeKeys.up;
      if (this.terminal.activeKeys.fire) {
        this.fireBullet(this.ship);
      }
    }

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      if ((bullet.bulletTime ?? 0) <= this.globalTime) {
        this.deleteBullet(bullet);
      }
    }

    this.update();
    this.physics.step(dt);
  };

  fireBullet(ship: ShipData) {
    if (this.allowFireTime > this.globalTime || !this.ship) {
      return false;
    }
    this.allowFireTime = this.globalTime + FIRE_RELOAD_TIME;
    this.bullets.push({
      key: "bullet-" + Math.random(),
      type: "bullet",
      bulletTime: this.globalTime + BULLET_LIFE_TIME,

      ship: this.ship,
    });

    this.update();
  }

  initAsteroids(count: number) {
    this.asteroids.length = 0;

    for (let i = 0; i < count; i++) {
      const x = Calc.random(SPACE_WIDTH);
      const y = Calc.random(SPACE_HEIGHT);

      this.asteroids.push({
        key: "asteroid-" + Math.random(),
        type: "asteroid",
        size: 4,
        x: x,
        y: y,
      });
    }

    this.update();
  }

  splitAsteroid(parentData: AsteroidData, parentBody: Body) {
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

      this.asteroids.push({
        key: "asteroid-" + Math.random(),
        type: "asteroid",
        size: splitSize,
        x: sp.x,
        y: sp.y,
      });
    }

    this.update();
  }

  deleteShip(): boolean {
    if (!this.ship) return false;
    this.ship = null;

    this.update();
    return true;
  }

  deleteBullet(data: BulletData): boolean {
    const index = this.bullets.indexOf(data);
    if (index != -1) {
      this.bullets.splice(index, 1);
      this.update();
      return true;
    }

    return false;
  }

  deleteAsteroid(data: AsteroidData): boolean {
    const index = this.asteroids.indexOf(data);
    if (index != -1) {
      this.asteroids.splice(index, 1);
      this.update();
      return true;
    }

    return false;
  }

  collideShipAsteroid() {
    if (this.allowCrashTime > this.globalTime) {
      return;
    }

    this.lives--;

    this.deleteShip();

    if (this.lives <= 0) {
      this.end();
    } else {
      setTimeout(() => {
        this.setupShip();
      }, 1000);
    }

    this.update();
  }

  collideBulletAsteroid(bullet: Body, asteroid: Body) {
    const deletedAsteroid = this.deleteAsteroid(asteroid.getUserData() as AsteroidData);
    const deletedBullet = this.deleteBullet(bullet.getUserData() as BulletData);

    if (deletedAsteroid && deletedBullet) {
      this.splitAsteroid(asteroid.getUserData() as AsteroidData, asteroid);
    }

    if (this.asteroids.length == 0) {
      this.level++;
      this.initAsteroids(this.level);
    }
  }
}

class TestbedTerminal {
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

  update(game: AsteroidGame) {
    if (game.lives > 0) {
      this.testbed.status("");
    } else {
      this.testbed.status("Game Over!");
    }
    this.testbed.status("Level", game.level);
    this.testbed.status("Lives", game.lives);
  }
}

interface AsteroidPhysicsListener {
  collideShipAsteroid(ship: Body, asteroid: Body): void;
  collideBulletAsteroid(asteroidBody: Body, bulletBody: Body): void;
}

class AsteroidPhysics {

  static SHIP_BITS = 2;
  static BULLET_BITS = 4;
  static ASTEROID_BITS = 4;
  

  listener: AsteroidPhysicsListener;

  world: World;

  driver = new DataDriver<UserData, Body>((data: UserData) => data.key, {
    enter: (data: UserData) => {
      if (data.type == "ship") return this.createShip(data);
      if (data.type == "asteroid") return this.createAsteroid(data);
      if (data.type == "bullet") return this.createBullet(data);
      return null;
    },
    update: (data: UserData, body: Body) => {
      if (data.type == "ship" && body) {
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
      }
    },
    exit: (data: UserData, body: Body) => {
      this.world.destroyBody(body);
    },
  });

  setup(listener: AsteroidPhysicsListener) {
    this.listener = listener;

    if (this.world) return;
    this.world = new World();
    this.world.on("pre-solve", this.collide.bind(this));
  }

  update(game: AsteroidGame) {
    this.driver.update([...game.asteroids, ...game.bullets, game.ship]);
  }

  step = (dt: number) => {
    // wrap objects around the screen
    let body = this.world.getBodyList();
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
    const body = this.world.createBody({
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
    const ship = this.driver.ref(data.ship);
    if (!ship) return null;
    const body = this.world.createBody({
      type: "dynamic",
      // mass : 0.05,
      position: ship.getWorldPoint({ x: 0, y: 0 }),
      linearVelocity: ship.getWorldVector({ x: 0, y: speed }),
      bullet: true,
      userData: data,
    });

    body.createFixture({
      shape: new Circle(0.05),
      filterCategoryBits: AsteroidPhysics.BULLET_BITS,
      filterMaskBits: AsteroidPhysics.ASTEROID_BITS,
    });

    return body;
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
    const body = this.world.createBody({
      // mass : 10,
      type: "kinematic",
      position: { x: data.x, y: data.y },
      angle: Calc.random() * Math.PI,
      linearVelocity: { x: vx, y: vy },
      angularVelocity: va,
      userData: data,
    });

    body.createFixture({
      shape: new Polygon(path),
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
      this.world.queueUpdate(() => {
        this.listener.collideShipAsteroid(ship, asteroid);
      });
    }

    if (bullet && asteroid) {
      // do not change world immediately
      this.world.queueUpdate(() => {
        this.listener.collideBulletAsteroid(bullet, asteroid);
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

{
  const game = new AsteroidGame();
  game.setup();
  game.start();
}
