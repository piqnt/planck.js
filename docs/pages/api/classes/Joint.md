# Class: `abstract` Joint

The base joint class. Joints are used to constraint two bodies together in
various fashions. Some joints also feature limits and motors.

## Extended by

- [`DistanceJoint`](DistanceJoint)
- [`FrictionJoint`](FrictionJoint)
- [`GearJoint`](GearJoint)
- [`MotorJoint`](MotorJoint)
- [`MouseJoint`](MouseJoint)
- [`PrismaticJoint`](PrismaticJoint)
- [`PulleyJoint`](PulleyJoint)
- [`RevoluteJoint`](RevoluteJoint)
- [`RopeJoint`](RopeJoint)
- [`WeldJoint`](WeldJoint)
- [`WheelJoint`](WheelJoint)

## Constructors

### new Joint()

> **new Joint**(`def`): [`Joint`](Joint)

#### Parameters

• **def**: [`JointDef`](../interfaces/JointDef)

#### Returns

[`Joint`](Joint)

### new Joint()

> **new Joint**(`def`, `bodyA`, `bodyB`): [`Joint`](Joint)

#### Parameters

• **def**: [`JointOpt`](../interfaces/JointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

#### Returns

[`Joint`](Joint)

## Properties

### style

> **style**: [`Style`](../interfaces/Style) = `{}`

Styling for dev-tools.

## Methods

### getAnchorA()

> `abstract` **getAnchorA**(): [`Vec2`](Vec2)

Get the anchor point on bodyA in world coordinates.

#### Returns

[`Vec2`](Vec2)

***

### getAnchorB()

> `abstract` **getAnchorB**(): [`Vec2`](Vec2)

Get the anchor point on bodyB in world coordinates.

#### Returns

[`Vec2`](Vec2)

***

### getBodyA()

> **getBodyA**(): [`Body`](Body)

Get the first body attached to this joint.

#### Returns

[`Body`](Body)

***

### getBodyB()

> **getBodyB**(): [`Body`](Body)

Get the second body attached to this joint.

#### Returns

[`Body`](Body)

***

### getCollideConnected()

> **getCollideConnected**(): `boolean`

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

#### Returns

`boolean`

***

### getNext()

> **getNext**(): [`Joint`](Joint)

Get the next joint the world joint list.

#### Returns

[`Joint`](Joint)

***

### getReactionForce()

> `abstract` **getReactionForce**(`inv_dt`): [`Vec2`](Vec2)

Get the reaction force on bodyB at the joint anchor in Newtons.

#### Parameters

• **inv\_dt**: `number`

#### Returns

[`Vec2`](Vec2)

***

### getReactionTorque()

> `abstract` **getReactionTorque**(`inv_dt`): `number`

Get the reaction torque on bodyB in N*m.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

***

### getType()

> **getType**(): `string`

Get the type of the concrete joint.

#### Returns

`string`

***

### getUserData()

> **getUserData**(): `unknown`

#### Returns

`unknown`

***

### initVelocityConstraints()

> `abstract` **initVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

***

### isActive()

> **isActive**(): `boolean`

Short-cut function to determine if either body is inactive.

#### Returns

`boolean`

***

### setUserData()

> **setUserData**(`data`): `void`

#### Parameters

• **data**: `unknown`

#### Returns

`void`

***

### shiftOrigin()

> **shiftOrigin**(`newOrigin`): `void`

Shift the origin for any points stored in world coordinates.

#### Parameters

• **newOrigin**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

`void`

***

### solvePositionConstraints()

> `abstract` **solvePositionConstraints**(`step`): `boolean`

This returns true if the position errors are within tolerance.

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`boolean`

***

### solveVelocityConstraints()

> `abstract` **solveVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`
