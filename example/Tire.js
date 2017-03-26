/*
 * Copyright (c) 2017 Ilya Kolpakov
 * Copyright (c) 2014 Chris Cambell http://www.iforce2d.net
 * Copyright (c) 2006-2011 Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 *
 */

// Box2d single tire dynamics model by Chris Campbell
// http://www.iforce2d.net/b2dtut/top-down-car
// http://www.iforce2d.net/src/iforce2d_TopdownCar.h
// Adapted to planck.js by Ilya Kolpakov
planck.testbed('Tire', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  Vec2.prototype.projectOn = function(other) {
    return Vec2.mul(other, Vec2.dot(this, other));
  };

  var world = new pl.World({
    gravity: Vec2(0, 0)
  });

  function Tire(world) {
    // todo: make option without es6
    var maxForwardSpeed = 50;
    var maxBackwardSpeed = -40;
    var maxDriveForce = 300;
    var maxLateralImpulse = 7.5; // 8.5 originally
    var angularImpulseDampingFactor = 0.1;
    var dragForceFactor = 2;
    var discreteTurningTorqueMagnitude = 20; // 15 originally

    this.m_body = world.createDynamicBody();
    this.m_body.createFixture(pl.Box(0.5, 1.25), 1); // (shape, density)
    this.m_currentTraction = 1;

    // Get local vector in world coordinates
    this.getWorldVector = function(x, y) {
      return this.m_body.getWorldVector(Vec2(x, y));
    };

    this.getRightNormal = function() {
      return this.getWorldVector(1, 0);
    };

    this.getForwardNormal = function() {
      return this.getWorldVector(0, 1);
    };

    this.getLateralVelocity = function() {
      return this.m_body.getLinearVelocity()
        .projectOn(this.getRightNormal());
    };

    this.getForwardVelocity = function() {
      return this.m_body.getLinearVelocity()
        .projectOn(this.getForwardNormal());
    };

    this.updateFriction = function() {
      // lateral velocity
      var impulse = this.getLateralVelocity().neg().mul(this.m_body.getMass());
      if (Vec2.lengthOf(impulse) > maxLateralImpulse) {
        impulse = impulse.mul(maxLateralImpulse / Vec2.lengthOf(impulse));
      }
      this.m_body.applyLinearImpulse(
        impulse.mul(this.m_currentTraction),
        this.m_body.getWorldCenter()
      );
      // angular velocity
      this.m_body.applyAngularImpulse(
        this.m_currentTraction
        * angularImpulseDampingFactor
        * this.m_body.getInertia()
        * (-this.m_body.getAngularVelocity())
      );
      // forward linear velocity
      var currentForwardNormal = this.getForwardVelocity();
      var currentForwardSpeed = currentForwardNormal.normalize();
      var dragForceMagnitude = -dragForceFactor * currentForwardSpeed;
      this.m_body.applyForce(
        currentForwardNormal.mul(
          this.m_currentTraction * dragForceMagnitude
        ),
        this.m_body.getWorldCenter()
      );
    };

    this.updateDrive = function() {
      var desiredSpeed = 0;
      if (testbed.activeKeys.up) {
        desiredSpeed = maxForwardSpeed;
      } else if (testbed.activeKeys.down) {
        desiredSpeed = maxBackwardSpeed;
      }
      else {
        return;
      }
      var forwardNormal = this.getForwardNormal();
      var currentSpeed = Vec2.dot(this.getForwardVelocity(), forwardNormal);
      var force = 0;
      if (desiredSpeed > currentSpeed) {
        force = maxDriveForce;
      } else if (desiredSpeed < currentSpeed) {
        force = -maxDriveForce;
      } else {
        return;
      }
      this.m_body.applyForce(
        Vec2.mul(forwardNormal, this.m_currentTraction * force),
        this.m_body.getWorldCenter(),
        true // fucking wake up if "sleeping"
      );
    };

    this.xor = function(a, b) {
      return (!a ^ !b);
    };

    this.updateTurn = function() {
      var anyTurn = this.xor(
        testbed.activeKeys.left,
        testbed.activeKeys.right
      );
      var desiredTorque = anyTurn ? discreteTurningTorqueMagnitude : 0;
      if (testbed.activeKeys.right) {
        desiredTorque *= -1;
      }
      this.m_body.applyTorque(desiredTorque);
    }
  }

  var tire = new Tire(world);

  testbed.step = function() {
    tire.updateFriction();
    tire.updateDrive();
    tire.updateTurn();
    pos = tire.m_body.getPosition();
    testbed.info('←/→: Rotate, ↑/↓: Accelerate forward/backward\n' + "pos: [" + pos.x.toFixed(0) + ", " + pos.y.toFixed(0) + "]");
  };

  testbed.x = 0;
  testbed.y = 0;

  return world;
});
