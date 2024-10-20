import { describe, it, expect } from 'vitest';

import { Vec2 } from '../../../common/Vec2';
import { CircleShape } from '../../../collision/shape/CircleShape';
import { BoxShape } from '../../../collision/shape/BoxShape';
import { World } from '../../World';

import { DistanceJoint } from '../DistanceJoint';

describe('DistanceJoint', function(): void {

  it('calculates local anchors from global', function(): void {
    var world = new World();

    var circle = new CircleShape(1);
    var box = new BoxShape(1, 1);

    var b1 = world.createBody({
      position : Vec2.create(0, 0),
      type : 'dynamic'
    });
    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2.create(10, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    var joint = new DistanceJoint({}, b1, b2, Vec2.create(1, 0), Vec2.create(9, -1));
    world.createJoint(joint);

    expect(joint.getLocalAnchorA()).deep.equal(Vec2.create(1, 0));
    expect(joint.getLocalAnchorB()).deep.equal(Vec2.create(-1, -1));

    expect(joint.getAnchorA()).deep.equal(Vec2.create(1, 0));
    expect(joint.getAnchorB()).deep.equal(Vec2.create(9, -1));

  });

  it('moves attached body', function(): void {
    var world = new World();

    var circle = new CircleShape(1);
    var box = new BoxShape(1, 1);

    var b1 = world.createBody({
      position : Vec2.create(0, 0),
      type : 'dynamic'
    });
    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2.create(10, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    var joint = new DistanceJoint({}, b1, b2, Vec2.create(1, 0), Vec2.create(9, -1));
    world.createJoint(joint);

    b2.applyForceToCenter(Vec2.create(500, 0), true);
    world.step(1 / 10);

    expect(b1.getPosition().x).closeTo(2, 1e-1);
    expect(b2.getPosition().x).closeTo(12, 1e-1);
  });

});
