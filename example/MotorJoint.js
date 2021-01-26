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

// This test shows how to use a motor joint. A motor joint
// can be used to animate a dynamic body. With finite motor forces
// the body can be blocked by collision with other bodies.
planck.testbed('Motor Joint', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var time = 0;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)));

  // Define motorized body
  var body = world.createDynamicBody(Vec2(0.0, 8.0));
  body.createFixture(pl.Box(2.0, 0.5), {
    friction : 0.6,
    density : 2.0
  });

  var joint = world.createJoint(pl.MotorJoint({
    maxForce : 1000.0,
    maxTorque : 1000.0
  }, ground, body));

  testbed.step = function (dt) {
    // if (m_go && settings.hz > 0.0) {
    //   time += 1.0 / settings.hz;
    // }
    time += Math.min(dt, 100) / 1000;

    var linearOffset = Vec2();
    linearOffset.x = 6.0 * Math.sin(2.0 * time);
    linearOffset.y = 8.0 + 4.0 * Math.sin(1.0 * time);

    var angularOffset = 4.0 * time;

    joint.setLinearOffset(linearOffset);
    joint.setAngularOffset(angularOffset);
  };

  return world;
});
