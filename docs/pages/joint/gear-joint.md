
## Gear Joint
If you want to create a sophisticated mechanical contraption you might
want to use gears. In principle you can create gears in Planck.js by using
compound shapes to model gear teeth. This is not very efficient and
might be tedious to author. You also have to be careful to line up the
gears so the teeth mesh smoothly. Planck.js has a simpler method of creating
gears: the gear joint.

![Gear Joint](/planck.js/docs/images/gear_joint.gif)

The gear joint can only connect revolute and/or prismatic joints.

Like the pulley ratio, you can specify a gear ratio. However, in this
case the gear ratio can be negative. Also keep in mind that when one
joint is a revolute joint (angular) and the other joint is prismatic
(translation), and then the gear ratio will have units of length or one
over length.

```
coordinate1 + ratio * coordinate2 == constant
```

Here is an example gear joint. The bodies myBodyA and myBodyB are any
bodies from the two joints, as long as they are not the same bodies.

```js
new GearJoint({
  bodyA: myBodyA,
  bodyB: myBodyB,
  joint1: myRevoluteJoint,
  joint2: myPrismaticJoint,
  ratio: 2 * Math.PI / myLength,
})
```

Note that the gear joint depends on two other joints. This creates a
fragile situation. What happens if those joints are deleted?

> **Caution**:
> Always delete gear joints before the revolute/prismatic joints on the
> gears. Otherwise your code will crash in a bad way due to the orphaned
> joint references in the gear joint. You should also delete the gear joint
> before you delete any of the bodies involved.
