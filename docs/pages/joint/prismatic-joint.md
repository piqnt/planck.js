### Prismatic Joint
A prismatic joint allows for relative translation of two bodies along a
specified axis. A prismatic joint prevents relative rotation. Therefore,
a prismatic joint has a single degree of freedom.

![Prismatic Joint](../images/prismatic_joint.gif)

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



### Mouse Joint
The mouse joint is used in the testbed to manipulate bodies with the
mouse. It attempts to drive a point on a body towards the current
position of the cursor. There is no restriction on rotation.

The mouse joint definition has a target point, maximum force, frequency,
and damping ratio. The target point initially coincides with the body's
anchor point. The maximum force is used to prevent violent reactions
when multiple dynamic bodies interact. You can make this as large as you
like. The frequency and damping ratio are used to create a spring/damper
effect similar to the distance joint.

Many users have tried to adapt the mouse joint for game play. Users
often want to achieve precise positioning and instantaneous response.
The mouse joint doesn't work very well in that context. You may wish to
consider using kinematic bodies instead.






### Friction Joint
The friction joint is used for top-down friction. The joint provides 2D
translational friction and angular friction. See FrictionJoint.js and
ApplyForce.js for details.

### Motor Joint
A motor joint lets you control the motion of a body by specifying target
position and rotation offsets. You can set the maximum motor force and
torque that will be applied to reach the target position and rotation.
If the body is blocked, it will stop and the contact forces will be
proportional the maximum motor force and torque. See MotorJoint and
MotorJoint.h for details.
