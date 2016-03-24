var expect = require('./testutil/expect');
var sinon = require('sinon');

var Math = require('../lib/common/Math');
var Vec2 = require('../lib/common/Vec2');
var Vec3 = require('../lib/common/Vec2');

describe('Math', function() {

  it('Math', function() {
    expect(Math.isFinite(+'NaN')).be(false);
    expect(Math.isFinite(Infinity)).be(false);
    expect(Math.isFinite('0')).be(false);
    expect(Math.isFinite('')).be(false);

    expect(Math.isFinite(1)).be(true);
    expect(Math.isFinite(0)).be(true);
    expect(Math.isFinite(-1)).be(true);

    // InvSqrt
    // NextPowerOfTwo
    // IsPowerOfTwo
    // clamp
    // EPSILON
  });

  it('Vec2', function() {
    var r, v = new Vec2();
    expect(v.x).be(0);
    expect(v.y).be(0);

    v.set(3, 4);
    expect(v.x).be(3);
    expect(v.y).be(4);
    expect(v.length()).be(5);
    expect(v.lengthSquared()).be(25);

    v.normalize(3, 4);
    expect(v.x).near(3 / 5);
    expect(v.y).near(4 / 5);

    v.setZero();
    expect(v.x).be(0);
    expect(v.y).be(0);

    v.add(new Vec2(3, 2));
    expect(v.x).be(3);
    expect(v.y).be(2);

    v.sub(new Vec2(2, 1));
    expect(v.x).be(1);
    expect(v.y).be(1);

    v.mul(5);
    expect(v.x).be(5);
    expect(v.y).be(5);

    v.set(2, 3);
    expect(v.x).be(2);
    expect(v.y).be(3);

    r = Vec2.skew(v);
    expect(r.x).be(-3);
    expect(r.y).be(2);

    r = Vec2.dot(v, new Vec2(2, 3));
    expect(r).be(13);

    r = Vec2.cross(v, new Vec2(2, 3));
    expect(r).be(0);

    r = Vec2.cross(v, 5);
    expect(r.x).be(15);
    expect(r.y).be(-10);

    r = Vec2.clamp(Vec2(6, 8), 5);
    expect(r.x).near(3);
    expect(r.y).near(4);

  });

  it('Vec3', function() {
    return;

    var r, v = Vec3();
    expect(v.x).be(0);
    expect(v.y).be(0);
    expect(v.z).be(0);

    v = Vec3(3, 4, 5);
    expect(v.x).be(3);
    expect(v.y).be(4);
    expect(v.z).be(5);

    v.setZero();
    expect(v.x).be(0);
    expect(v.y).be(0);
    expect(v.z).be(0);

    v.add(Vec3(3, 2, 1));
    expect(v.x).be(3);
    expect(v.y).be(2);
    expect(v.z).be(1);

    v.sub(Vec3(0, 1, 2));
    expect(v.x).be(3);
    expect(v.y).be(1);
    expect(v.z).be(-1);

    v.mul(5);
    expect(v.x).be(15);
    expect(v.y).be(5);
    expect(v.z).be(-5);

    v.set(2, 3, 4);
    expect(v.x).be(2);
    expect(v.y).be(3);
    expect(v.z).be(4);

    r = Vec3.dot(v, Vec3(2, 0, -1));
    expect(r).be(0);

    r = Vec3.cross(v, Vec3(2, 0, -1));
    expect(r.x).be(-3);
    expect(r.y).be(10);
    expect(r.z).be(-6);
  });
});
