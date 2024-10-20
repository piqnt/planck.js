import { describe, it, expect } from 'vitest';

import { Vec2 } from '../common/Vec2';
import { CircleShape } from '../collision/shape/CircleShape';
import { World } from '../dynamics/World';

import '../collision/shape/CollideCircle';

describe('Basic', function(): void {

  it('World', function(): void {

    var world = new World();

    var circle = new CircleShape(1);

    var b1 = world.createBody({
      position : Vec2.create(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    expect(b1.getFixtureList().getType()).equal('circle');
    expect(b1.getWorld()).equal(world);
    expect(world.getBodyList()).equal(b1);

    b1.applyForceToCenter(Vec2.create(1, 0), true);

    var b2 = world.createBody({
      position : Vec2.create(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(circle);
    b2.applyForceToCenter(Vec2.create(-1, 0), true);

    world.step(1 / 20);

    // console.log(b2.getPosition());

    var p = b1.getPosition();
    expect(p.x).closeTo(0.0, 1e-12);
    expect(p.y).closeTo(0.0, 1e-12);
  });

});
