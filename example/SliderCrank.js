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

// A motor driven slider crank with joint friction.
planck.testbed('SliderCrank', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);


  // Define crank.
  var crank = world.createDynamicBody(Vec2(0.0, 7.0));
  crank.createFixture(pl.Box(0.5, 2.0), 2.0);

  var joint1 = world.createJoint(pl.RevoluteJoint({
    motorSpeed: Math.PI,
    maxMotorTorque: 10000.0,
    enableMotor: true
  }, ground, crank, Vec2(0.0, 5.0)));


  // Define follower.
  var follower = world.createDynamicBody(Vec2(0.0, 13.0));
  follower.createFixture(pl.Box(0.5, 4.0), 2.0);

  world.createJoint(pl.RevoluteJoint({enableMotor: false}, crank, follower, Vec2(0.0, 9.0)));


  // Define piston
  var piston = world.createBody({
    type: 'dynamic',
    fixedRotation: true,
    position: Vec2(0.0, 17.0)
  });
  piston.createFixture(pl.Box(1.5, 1.5), 2.0);

  world.createJoint(pl.RevoluteJoint({}, follower, piston, Vec2(0.0, 17.0)));

  var joint2 = world.createJoint(pl.PrismaticJoint({
    maxMotorForce: 1000.0,
    enableMotor: true
  }, ground, piston, Vec2(0.0, 17.0), Vec2(0.0, 1.0)));


  // Create a payload
  var payload = world.createDynamicBody(Vec2(0.0, 23.0));
  payload.createFixture(pl.Box(1.5, 1.5), 2.0);


  testbed.keydown = function(code, char) {
    switch (char) {
      case 'Z':
        joint2.enableMotor(!joint2.isMotorEnabled());
        joint2.getBodyB().setAwake(true);
        break;

      case 'X':
        joint1.enableMotor(!joint1.isMotorEnabled());
        joint1.getBodyB().setAwake(true);
        break;
    }
  };

  testbed.step = function() {
    var torque = joint1.getMotorTorque(1 / 60);
    testbed.status("Motor Torque", torque);
  };

  testbed.info('Z: Toggle friction, X: Toggle motor');

  return world;
});
