/*
 * Copyright (c) Erin Catto
 * Licensed under the MIT license
 */

import { World, Edge, Box, RevoluteJoint, DistanceJoint, Circle, Testbed } from "planck";

const world = new World({
  gravity: { x: 0, y: -10 },
});

const testbed = Testbed.mount();
testbed.width = 50;
testbed.height = 50;
testbed.start(world);

const ground = world.createBody({
  type: "static",
});
ground.createFixture({
  shape: new Edge({ x: -40, y: 0 }, { x: 40, y: 0 }),
  density: 0,
});

world
  .createBody({
    type: "static",
    position: { x: -1.5, y: 10 },
  })
  .createFixture({
    shape: new Box(6, 0.25),
    density: 0,
  });

const columnShape = new Box(0.1, 1);

for (let i = 0; i < 10; ++i) {
  const ball = world.createBody({
    type: "dynamic",
    position: { x: -6 + 1 * i, y: 11.25 },
  });
  ball.createFixture({
    shape: columnShape,
    density: 20,
    friction: 0.1,
  });
}

world
  .createBody({
    type: "static",
    position: { x: 1, y: 6 },
  })
  .createFixture({
    shape: new Box(7, 0.25, { x: 0, y: 0 }, 0.3),
    density: 0,
  });

const b2 = world.createBody({
  type: "static",
  position: { x: -7, y: 4 },
});
b2.createFixture({
  shape: new Box(0.25, 1.5),
  density: 0,
});

const b3 = world.createBody({
  type: "dynamic",
  position: { x: -0.9, y: 1 },
  angle: -0.15,
});
b3.createFixture({
  shape: new Box(6, 0.125),
  density: 10,
});

const jd = {
  collideConnected: true,
};

world.createJoint(new RevoluteJoint(jd, ground, b3, { x: -2, y: 1 }));

const b4 = world.createBody({
  type: "dynamic",
  position: { x: -10, y: 15 },
});
b4.createFixture({
  shape: new Box(0.25, 0.25),
  density: 10,
});

world.createJoint(new RevoluteJoint(jd, b2, b4, { x: -7, y: 15 }));

const b5 = world.createBody({
  type: "dynamic",
  position: { x: 6.5, y: 3 },
});

{
  const fd = {
    density: 10,
    friction: 0.1,
  };

  b5.createFixture({
    shape: new Box(1, 0.1, { x: 0, y: -0.9 }, 0),
    ...fd,
  });
  b5.createFixture({
    shape: new Box(0.1, 1, { x: -0.9, y: 0 }, 0),
    ...fd,
  });
  b5.createFixture({
    shape: new Box(0.1, 1, { x: 0.9, y: 0 }, 0),
    ...fd,
  });
}

world.createJoint(new RevoluteJoint(jd, ground, b5, { x: 6, y: 2 }));

const b6 = world.createBody({
  type: "dynamic",
  position: { x: 6.5, y: 4.1 },
});
b6.createFixture({
  shape: new Box(1, 0.1),
  density: 30,
});

world.createJoint(new RevoluteJoint(jd, b5, b6, { x: 7.5, y: 4 }));

const b7 = world.createBody({
  type: "dynamic",
  position: { x: 7.4, y: 1 },
});
b7.createFixture({
  shape: new Box(0.1, 1),
  density: 10,
});

world.createJoint(
  new DistanceJoint({
    bodyA: b3,
    localAnchorA: { x: 6, y: 0 },
    bodyB: b7,
    localAnchorB: { x: 0, y: -1 },
  }),
);

{
  const radius = 0.2;
  const circleShape = new Circle(radius);
  for (let i = 0; i < 4; ++i) {
    const body = world.createBody({
      type: "dynamic",
      position: {
        x: 5.9 + 2 * radius * i,
        y: 2.4,
      },
    });
    body.createFixture({
      shape: circleShape,
      density: 10,
    });
  }
}
