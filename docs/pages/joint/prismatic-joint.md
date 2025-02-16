
## Prismatic Joint
A prismatic joint allows for relative translation of two bodies along a
specified axis. A prismatic joint prevents relative rotation. Therefore,
a prismatic joint has a single degree of freedom.

![Prismatic Joint](/planck.js/docs/images/prismatic_joint.gif)

The prismatic joint definition is similar to the revolute joint
description; just substitute translation for angle, and force for torque.
Using this analogy provides an example prismatic joint definition with a
joint limit and a friction motor:

```js
let worldAxis = new Vec2(1, 0);
new PrismaticJoint({
  lowerTranslation: -5,
  upperTranslation: 2.5,
  enableLimit: true,
  maxMotorForce: 1,
  motorSpeed: 0,
  enableMotor: true,
}, myBodyA, myBodyB, myBodyA.getWorldCenter(), worldAxis);
```

The revolute joint has an implicit axis coming out of the screen. The
prismatic joint needs an explicit axis parallel to the screen. This axis
is fixed in the two bodies and follows their motion.

Like the revolute joint, the prismatic joint translation is zero when
it is not defined. So be sure zero is between your
lower and upper translation limits.

Using a prismatic joint is similar to using a revolute joint. Here are
the relevant member functions:

```js
prismaticJoint.getJointTranslation(); // number
prismaticJoint.getJointSpeed(); // number
prismaticJoint.getMotorForce(); // number
prismaticJoint.setMotorSpeed(speed /*number*/);
prismaticJoint.setMotorForce(force /*number*/);
```
