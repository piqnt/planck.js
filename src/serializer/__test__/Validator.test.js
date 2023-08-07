const { default: Ajv } = await import('ajv');
import { describe, it, expect } from 'vitest';

const { Vec2 }  = await import( '../../common/Vec2');
const { CircleShape }  = await import( '../../collision/shape/CircleShape');
const { BoxShape }  = await import( '../../collision/shape/BoxShape');
const { DistanceJoint }  = await import( '../../dynamics/joint/DistanceJoint');
const { World }  = await import( '../../dynamics/World');

const { Serializer }  = await import( '../');

const schema = await import('../schema.json');

describe('Serializer', function() {
  var ajv = new Ajv();
  var validate = ajv.compile(schema);

  it('produces valid schema', function() {
    var world = new World();

    var circle = new CircleShape(1);
    var box = new BoxShape(1, 1);

    var b1 = world.createBody({
      position : new Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    var b2 = world.createBody({
      position : new Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    world.createJoint(new DistanceJoint({
      bodyA: b1,
      localAnchorA: new Vec2(6, 0),
      bodyB: b2,
      localAnchorB: new Vec2(0, -1)
    }));

    var json = Serializer.toJson(world);

    // console.log(JSON.stringify(json, null, ' '));

    var valid = validate(json);
    console.log(valid || validate.errors);
    expect(valid).be.true;
  });
});
