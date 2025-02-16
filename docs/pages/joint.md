
## Joint
Joints are used to constrain bodies to the world or to each other.
Typical examples in games include ragdolls, teeters, and pulleys. Joints
can be combined in many different ways to create interesting motions.

Some joints provide limits so you can control the range of motion. Some
joints provide motors which can be used to drive the joint at a
prescribed speed until a prescribed force/torque is exceeded.

Joint motors can be used in many ways. You can use motors to control
position by specifying a joint velocity that is proportional to the
difference between the actual and desired position. You can also use
motors to simulate joint friction: set the joint velocity to zero and
provide a small, but significant maximum motor force/torque. Then the
motor will attempt to keep the joint from moving until the load becomes
too strong.

### Joint Definition
Each joint type has a definition that derives from JointDef. All
joints are connected between two different bodies. One body may be static.
Joints between static and/or kinematic bodies are allowed, but have no
effect and use some processing time.

You can specify user data for any joint type and you can provide a flag
to prevent the attached bodies from colliding with each other. This is
actually the default behavior and you must set `collideConnected`
to `true` to allow collision between two connected bodies.

Many joint definitions require that you provide some geometric data.
Often a joint will be defined by anchor points. These are points fixed
in the attached bodies. Planck.js requires these points to be specified in
local coordinates. This way the joint can be specified even when the
current body transforms violate the joint constraint—a common
occurrence when a game is saved and reloaded. Additionally, some joint
definitions need to know the default relative angle between the bodies.
This is necessary to constrain rotation correctly.

Initializing the geometric data can be tedious, so many joints have a
constructor that uses the current body transforms to remove
much of the work. However, these initialization functions should usually
only be used for prototyping. Production code should define the geometry
directly. This will make joint behavior more robust.

The rest of the joint definition data depends on the joint type. We
cover these now.

### Joint Factory
Joints are created and destroyed using the world factory methods.

> **Caution**:
> You must create and destroy bodies and joints using the create
> and destroy methods of the World class.

Here's an example of the lifetime of a revolute joint:

```js
let joint = myWorld.createJoint(new RevoluteJoint({
  bodyA: myBodyA,
  bodyB: myBodyB,
  anchorPoint: myBodyA.getCenterPosition(),
}));

// ... do stuff ...

myWorld.destroyJoint(joint);
joint = null;
```

It is always good to nullify your variables after they are destroyed. This
will make the program crash in a controlled manner if you try to reuse
the variable.

The lifetime of a joint is not simple. Heed this warning well:

> **Caution**:
> Joints are destroyed when an attached body is destroyed.

This precaution is not always necessary. You may organize your game
engine so that joints are always destroyed before the attached bodies.
In this case you don't need to implement the listener class. See the
section on Implicit Destruction for details.

### Using Joints
Many simulations create the joints and don't access them again until
they are destroyed. However, there is a lot of useful data contained in
joints that you can use to create a rich simulation.

First of all, you can get the bodies, anchor points, and user data from
a joint.

```js
joint.getBodyA();
joint.getBodyB();
joint.getAnchorA();
joint.getAnchorB();
joint.getUserData();
```

All joints have a reaction force and torque. This the reaction force
applied to body 2 at the anchor point. You can use reaction forces to
break joints or trigger other game events. These functions may do some
computations, so don't call them if you don't need the result.

```js
joint.getReactionForce(inv_dt); // Vec2
joint.getReactionTorque(inv_dt); // number
```
