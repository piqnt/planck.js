
## Revolute Joint
A revolute joint forces two bodies to share a common anchor point, often
called a hinge point. The revolute joint has a single degree of freedom:
the relative rotation of the two bodies. This is called the joint angle.

![Revolute Joint](/planck.js/docs/images/revolute_joint.gif)

To specify a revolute you need to provide two bodies and a single anchor
point in world space. The initialization function assumes that the
bodies are already in the correct position.

In this example, two bodies are connected by a revolute joint at the
first body's center of mass.

```js
new RevoluteJoint({}, myBodyA, myBodyB, myBodyA.getWorldCenter());
```

The revolute joint angle is positive when bodyB rotates CCW about the
angle point. Like all angles in Planck.js, the revolute angle is measured in
radians. By convention the revolute joint angle is zero if it not specified,
regardless of the current rotation of the two bodies.

In some cases you might wish to control the joint angle. For this, the
revolute joint can optionally simulate a joint limit and/or a motor.

A joint limit forces the joint angle to remain between a lower and upper
bound. The limit will apply as much torque as needed to make this
happen. The limit range should include zero, otherwise the joint will
lurch when the simulation begins.

A joint motor allows you to specify the joint speed (the time derivative
of the angle). The speed can be negative or positive. A motor can have
infinite force, but this is usually not desirable. Recall the eternal
question:

> *What happens when an irresistible force meets an immovable object?*

I can tell you it's not pretty. So you can provide a maximum torque for
the joint motor. The joint motor will maintain the specified speed
unless the required torque exceeds the specified maximum. When the
maximum torque is exceeded, the joint will slow down and can even
reverse.

You can use a joint motor to simulate joint friction. Just set the joint
speed to zero, and set the maximum torque to some small, but significant
value. The motor will try to prevent the joint from rotating, but will
yield to a significant load.

Here's a revision of the revolute joint definition above; this time the
joint has a limit and a motor enabled. The motor is setup to simulate
joint friction.

```js
new RevoluteJoint({
  lowerAngle: -0.5 * Math.PI, // -90 degrees
  upperAngle: 0.25 * Math.PI, // 45 degrees
  enableLimit: true,
  maxMotorTorque: 10,
  motorSpeed: 0,
  enableMotor: true,
}, myBodyA, myBodyB, myBodyA.getWorldCenter());

```
You can access a revolute joint's angle, speed, and motor torque.

```js
revoluteJoint.getJointAngle(); // number
revoluteJoint.getJointSpeed(); // number
revoluteJoint.getMotorTorque(); // number
```

You also update the motor parameters each step.

```js
revoluteJoint.setMotorSpeed(speed /*number*/);
revoluteJoint.setMaxMotorTorque(torque /*number*/);
```

Joint motors have some interesting abilities. You can update the joint
speed every time step so you can make the joint move back-and-forth like
a sine-wave or according to whatever function you want.

```js
// ... Game Loop Begin ...

myJoint.setMotorSpeed(Math.cos(0.5 * time));

// ... Game Loop End ...
```

You can also use joint motors to track a desired joint angle. For example:

```js
// ... Game Loop Begin ...

let angleError = myJoint.getJointAngle() - angleTarget;
let gain = 0.1;
myJoint.setMotorSpeed(-gain * angleError);

// ... Game Loop End ...
```

Generally your gain parameter should not be too large. Otherwise your
joint may become unstable.
