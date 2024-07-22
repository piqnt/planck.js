const { World, Vec2, Circle, Polygon, Testbed } = planck;

const SHIP = 2;
const BULLET = 4;
const ASTEROID = 4;

const SPACE_WIDTH = 16;
const SPACE_HEIGHT = 9;

const SHIP_SIZE = 0.30;
const FIRE_RELOAD_TIME = 100;
const BULLET_LIFE_TIME = 2000;

const asteroidRadius = 0.9;
const asteroidSpeed = 2;
const asteroidLevels = 4;

let level;
let lives;
let gameover;

const allowCrashTime = 0;
const allowFireTime = 0;

const world = new World();

const testbed = Testbed.mount();
testbed.width = SPACE_WIDTH;
testbed.height = SPACE_HEIGHT;
testbed.y = 0;
testbed.start(world);

const asteroidBodies = [];
const bulletBodies = [];
let shipBody;

testbed.keydown = function(code, char) {
  if (testbed.activeKeys.fire) {
    gameover && start();
  }
};

// Todo: check if several bullets hit the same asteroid in the same time step
world.on('pre-solve', function(contact) {
  const fixtureA = contact.getFixtureA();
  const fixtureB = contact.getFixtureB();

  const bodyA = contact.getFixtureA().getBody();
  const bodyB = contact.getFixtureB().getBody();

  const aship = bodyA === shipBody;
  const bship = bodyB === shipBody;
  const abullet = fixtureA.getFilterCategoryBits() & BULLET;
  const bbullet = fixtureB.getFilterCategoryBits() & BULLET;

  if ((aship || bship) && allowCrashTime < globalTime) {
    // Ship collided with something
    const ship = aship ? bodyA : bodyB;
    const asteroid = !aship ? bodyA : bodyB;

    setTimeout(function () {
      crash(ship, asteroid);
    }, 1);
  }

  if (abullet || bbullet) {
    // Bullet collided with something
    const bullet = abullet ? bodyA : bodyB;
    const asteroid = !abullet ? bodyA : bodyB;

    setTimeout(function () {
      hit(bullet, asteroid);
    }, 1);
  }
});

function start() {
  gameover = false;
  level = 1;
  lives = 3;
  uiStatus();
  setupShip(true);
  addAsteroids();
  uiStart();
}

function end() {
  gameover = true;
  uiEnd();
}

function setupShip() {
  shipBody = world.createBody({
    type : 'dynamic',
    angularDamping : 2.0,
    linearDamping : 0.5,
    position : new Vec2(),
  });

  shipBody.createFixture(new Polygon([
    new Vec2(-0.15, -0.15),
    new Vec2(0, -0.1),
    new Vec2(0.15, -0.15),
    new Vec2(0, 0.2)
  ]), {
    density : 1000,
    filterCategoryBits : SHIP,
    filterMaskBits : ASTEROID
  });

  allowCrashTime = globalTime + 2000;
}

const globalTime = 0;
testbed.step = function(dt) {
  globalTime += dt;

  if (shipBody) {

    // Set velocities
    if (testbed.activeKeys.left && !testbed.activeKeys.right) {
      shipBody.applyAngularImpulse(0.1, true);
    } else if (testbed.activeKeys.right && !testbed.activeKeys.left) {
      shipBody.applyAngularImpulse(-0.1, true);
    }

    // Thrust: add some force in the ship direction
    if (testbed.activeKeys.up) {
      const f = shipBody.getWorldVector(new Vec2(0.0, 1.0));
      const p = shipBody.getWorldPoint(new Vec2(0.0, 2.0));
      shipBody.applyLinearImpulse(f, p, true);
    }

    // Fire
    if (testbed.activeKeys.fire && globalTime > allowFireTime) {

      const magnitude = 2;
      const angle = shipBody.Getangle + Math.PI / 2;

      // Create a bullet body
      const bulletBody = world.createDynamicBody({
        // mass : 0.05,
        position: shipBody.getWorldPoint(new Vec2(0, SHIP_SIZE)),
        linearVelocity: shipBody.getWorldVector(new Vec2(0, magnitude)),
        bullet: true
      });
      bulletBody.createFixture(new Circle(0.05), {
        filterCategoryBits: BULLET,
        filterMaskBits: ASTEROID
      });
      bulletBodies.push(bulletBody);

      // Keep track of the last time we shot
      allowFireTime = globalTime + FIRE_RELOAD_TIME;

      // Remember when we should delete this bullet
      bulletBody.dieTime = globalTime + BULLET_LIFE_TIME;
    }

    wrap(shipBody);
  }

  for (const i = 0; i !== bulletBodies.length; i++) {
    const bulletBody = bulletBodies[i];

    // If the bullet is old, delete it
    if (bulletBody.dieTime <= globalTime) {
      bulletBodies.splice(i, 1);
      world.destroyBody(bulletBody);
      i--;
      continue;
    }
    wrap(bulletBody);
  }

  for (const i = 0; i !== asteroidBodies.length; i++) {
    const asteroidBody = asteroidBodies[i];
    wrap(asteroidBody);
  }

}

// Adds some asteroids to the scene.
function addAsteroids() {
  while (asteroidBodies.length) {
    const asteroidBody = asteroidBodies.shift();
    world.destroyBody(asteroidBody);
    // asteroidBody.uiRemove();
  }

  for (const i = 0; i < level; i++) {
    const shipPosition = shipBody.getPosition();
    const x = shipPosition.x;
    const y = shipPosition.y;

    // Aviod the ship!
    while (Math.abs(x - shipPosition.x) < asteroidRadius * 2
        && Math.abs(y - shipPosition.y) < asteroidRadius * 2) {
      x = rand(SPACE_WIDTH);
      y = rand(SPACE_HEIGHT);
    }

    const vx = rand(asteroidSpeed);
    const vy = rand(asteroidSpeed);
    const va = rand(asteroidSpeed);

    // Create asteroid body
    const asteroidBody = makeAsteroidBody(x, y, vx, vy, va, 0);
    asteroidBody.level = 1;
  }
}

function asteroidLevelRadius(level) {
  return asteroidRadius * (asteroidLevels - level) / asteroidLevels;
}

function makeAsteroidBody(x, y, vx, vy, va, level) {
  const asteroidBody = world.createKinematicBody({
    // mass : 10,
    position : new Vec2(x, y),
    linearVelocity : new Vec2(vx, vy),
    angularVelocity : va
  });
  asteroidBodies.push(asteroidBody);

  const radius = asteroidLevelRadius(level);

  const n = 8, path = [];
  for (const i = 0; i < n; i++) {
    const a = i * 2 * Math.PI / n;
    const x = radius * (Math.sin(a) + rand(0.3));
    const y = radius * (Math.cos(a) + rand(0.3));
    path.push(new Vec2(x, y));
  }

  asteroidBody.createFixture(new Polygon(path), {
    filterCategoryBits : ASTEROID,
    filterMaskBits : BULLET | SHIP
  });

  return asteroidBody;
}

function crash(ship, asteroid) {
  if (!shipBody) return;

  lives--;
  uiStatus();

  // Remove the ship body for a while
  world.destroyBody(shipBody);
  shipBody = null;

  if (lives <= 0) {
    end();
    return;
  }
  setTimeout(function() {
    // Add ship again
    setupShip();
  }, 1000);
}

function hit(asteroidBody, bulletBody) {
  const aidx = asteroidBodies.indexOf(asteroidBody);
  const bidx = bulletBodies.indexOf(bulletBody);
  if (aidx != -1 && bidx != -1) {

    // Remove asteroid
    world.destroyBody(asteroidBody);
    asteroidBodies.splice(aidx, 1);
    // asteroidBody.uiRemove();

    // Remove bullet
    world.destroyBody(bulletBody);
    bulletBodies.splice(bidx, 1);
    // bulletBody.uiRemove();

    // Add new sub-asteroids
    splitAsteroid(asteroidBody);
  }

  if (asteroidBodies.length == 0) {
    level++;
    uiStatus();
    addAsteroids();
  }
}

function splitAsteroid(parent) {
  if (parent.level < 4) {
    const angleDisturb = Math.PI / 2 * Math.random();
    for (const i = 0; i < 4; i++) {
      const angle = Math.PI / 2 * i + angleDisturb;

      const r = asteroidLevelRadius(0) - asteroidLevelRadius(parent.level);
      const sp = parent.getWorldPoint(new Vec2(r * Math.cos(angle), r * Math.sin(angle)));

      const vx = rand(asteroidSpeed);
      const vy = rand(asteroidSpeed);
      const va = rand(asteroidSpeed);

      const child = makeAsteroidBody(sp.x, sp.y, vx, vy, va, parent.level);
      child.level = parent.level + 1;
      child.setAngle(rand() * Math.PI);
    }
  }
}

// If the body is out of space bounds, wrap it to the other side
function wrap(body) {
  const p = body.getPosition();
  p.x = wrapNumber(p.x, -SPACE_WIDTH / 2, SPACE_WIDTH / 2);
  p.y = wrapNumber(p.y, -SPACE_HEIGHT / 2, SPACE_HEIGHT / 2);
  body.setPosition(p);
}

function wrapNumber(num, min, max) {
  if (typeof min === 'undefined') {
    max = 1, min = 0;
  } else if (typeof max === 'undefined') {
    max = min, min = 0;
  }
  if (max > min) {
    num = (num - min) % (max - min);
    return num + (num < 0 ? max : min);
  } else {
    num = (num - max) % (min - max);
    return num + (num <= 0 ? min : max);
  }
}

// Returns a random number between -0.5 and 0.5
function rand(value) {
  return (Math.random() - 0.5) * (value || 1);
}

function uiStart() {
  console.log('Game started');
}

function uiEnd() {
  console.log('Game over');
  testbed.status('Game Over!');
}

function uiStatus() {
  console.log('Level: ' + level + ' Lives: ' + lives);
  testbed.status('Level', level);
  testbed.status('Lives', lives);
}

start();
