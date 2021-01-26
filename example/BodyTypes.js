/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

planck.testbed('BodyTypes', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = pl.World(Vec2(0, -10));

  var SPEED = 3.0;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)));

  // Define attachment
  var attachment = world.createDynamicBody(Vec2(0.0, 3.0));
  attachment.createFixture(pl.Box(0.5, 2.0), 2.0);

  // Define platform
  var platform = world.createDynamicBody(Vec2(-4.0, 5.0));

  platform.createFixture(
    pl.Box(0.5, 4.0, Vec2(4.0, 0.0), 0.5 * Math.PI),
    { friction : 0.6, density : 2.0 }
  );

  world.createJoint(pl.RevoluteJoint({
    maxMotorTorque : 50.0,
    enableMotor : true
  }, attachment, platform, Vec2(0.0, 5.0)));

  world.createJoint(pl.PrismaticJoint({
    maxMotorForce : 1000.0,
    enableMotor : true,
    lowerTranslation : -10.0,
    upperTranslation : 10.0,
    enableLimit : true
  }, ground, platform, Vec2(0.0, 5.0), Vec2(1.0, 0.0)));

  // Create a payload
  var payload = world.createDynamicBody(Vec2(0.0, 8.0));
  payload.createFixture(
    pl.Box(0.75, 0.75),
    { friction : 0.6, density : 2.0 }
  );

  testbed.keydown = function(code, char) {
    if (char === 'Z') {
      platform.setDynamic();

    } else if (char === 'X') {
      platform.setStatic();

    } else if (char === 'C') {
      platform.setKinematic();
      platform.setLinearVelocity(Vec2(-SPEED, 0.0));
      platform.setAngularVelocity(0.0);
    }
  };

  testbed.step = function(settings) {
    // Drive the kinematic body.
    if (platform.isKinematic()) {
      var p = platform.getTransform().p;
      var v = platform.getLinearVelocity();

      if ((p.x < -10.0 && v.x < 0.0) || (p.x > 10.0 && v.x > 0.0)) {
        v.x = -v.x;
        platform.setLinearVelocity(v);
      }
    }
  };

  testbed.info('Z: Dynamic, X: Static, C: Kinematic');
  return world;
});
