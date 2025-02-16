# Class: `abstract` Joint

The base joint class. Joints are used to constraint two bodies together in
various fashions. Some joints also feature limits and motors.

## Extended by

- [`DistanceJoint`](/api/classes/DistanceJoint)
- [`FrictionJoint`](/api/classes/FrictionJoint)
- [`GearJoint`](/api/classes/GearJoint)
- [`MotorJoint`](/api/classes/MotorJoint)
- [`MouseJoint`](/api/classes/MouseJoint)
- [`PrismaticJoint`](/api/classes/PrismaticJoint)
- [`PulleyJoint`](/api/classes/PulleyJoint)
- [`RevoluteJoint`](/api/classes/RevoluteJoint)
- [`RopeJoint`](/api/classes/RopeJoint)
- [`WeldJoint`](/api/classes/WeldJoint)
- [`WheelJoint`](/api/classes/WheelJoint)

## Constructors

### new Joint()

> **new Joint**(`def`): [`Joint`](/api/classes/Joint)

#### Parameters

• **def**: [`JointDef`](/api/interfaces/JointDef)

#### Returns

[`Joint`](/api/classes/Joint)

### new Joint()

> **new Joint**(`def`, `bodyA`, `bodyB`): [`Joint`](/api/classes/Joint)

#### Parameters

• **def**: [`JointOpt`](/api/interfaces/JointOpt)

• **bodyA**: [`Body`](/api/classes/Body)

• **bodyB**: [`Body`](/api/classes/Body)

#### Returns

[`Joint`](/api/classes/Joint)

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

## Methods

### getAnchorA()

> `abstract` **getAnchorA**(): [`Vec2`](/api/classes/Vec2)

Get the anchor point on bodyA in world coordinates.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getAnchorB()

> `abstract` **getAnchorB**(): [`Vec2`](/api/classes/Vec2)

Get the anchor point on bodyB in world coordinates.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getBodyA()

> **getBodyA**(): [`Body`](/api/classes/Body)

Get the first body attached to this joint.

#### Returns

[`Body`](/api/classes/Body)

***

### getBodyB()

> **getBodyB**(): [`Body`](/api/classes/Body)

Get the second body attached to this joint.

#### Returns

[`Body`](/api/classes/Body)

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

> **getNext**(): [`Joint`](/api/classes/Joint)

Get the next joint the world joint list.

#### Returns

[`Joint`](/api/classes/Joint)

***

### getReactionForce()

> `abstract` **getReactionForce**(`inv_dt`): [`Vec2`](/api/classes/Vec2)

Get the reaction force on bodyB at the joint anchor in Newtons.

#### Parameters

• **inv\_dt**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

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

• **step**: [`TimeStep`](/api/classes/TimeStep)

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

• **newOrigin**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`void`

***

### solvePositionConstraints()

> `abstract` **solvePositionConstraints**(`step`): `boolean`

This returns true if the position errors are within tolerance.

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`boolean`

***

### solveVelocityConstraints()

> `abstract` **solveVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`void`
