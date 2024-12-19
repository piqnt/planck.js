# Class: WheelJoint

A wheel joint. This joint provides two degrees of freedom: translation along
an axis fixed in bodyA and rotation in the plane. In other words, it is a
point to line constraint with a rotational motor and a linear spring/damper.
This joint is designed for vehicle suspensions.

## Extends

- [`Joint`](Joint)

## Constructors

### new WheelJoint()

> **new WheelJoint**(`def`): [`WheelJoint`](WheelJoint)

#### Parameters

• **def**: [`WheelJointDef`](../interfaces/WheelJointDef)

#### Returns

[`WheelJoint`](WheelJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

### new WheelJoint()

> **new WheelJoint**(`def`, `bodyA`, `bodyB`, `anchor`?, `axis`?): [`WheelJoint`](WheelJoint)

#### Parameters

• **def**: [`WheelJointOpt`](../interfaces/WheelJointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

• **anchor?**: [`Vec2Value`](../interfaces/Vec2Value)

• **axis?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`WheelJoint`](WheelJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

## Properties

### style

> **style**: [`Style`](../interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`Joint`](Joint).[`style`](Joint#style)

***

### TYPE

> `static` **TYPE**: `"wheel-joint"`

## Methods

### enableMotor()

> **enableMotor**(`flag`): `void`

Enable/disable the joint motor.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### getAnchorA()

> **getAnchorA**(): [`Vec2`](Vec2)

Get the anchor point on bodyA in world coordinates.

#### Returns

[`Vec2`](Vec2)

#### Overrides

[`Joint`](Joint).[`getAnchorA`](Joint#getanchora)

***

### getAnchorB()

> **getAnchorB**(): [`Vec2`](Vec2)

Get the anchor point on bodyB in world coordinates.

#### Returns

[`Vec2`](Vec2)

#### Overrides

[`Joint`](Joint).[`getAnchorB`](Joint#getanchorb)

***

### getBodyA()

> **getBodyA**(): [`Body`](Body)

Get the first body attached to this joint.

#### Returns

[`Body`](Body)

#### Inherited from

[`Joint`](Joint).[`getBodyA`](Joint#getbodya)

***

### getBodyB()

> **getBodyB**(): [`Body`](Body)

Get the second body attached to this joint.

#### Returns

[`Body`](Body)

#### Inherited from

[`Joint`](Joint).[`getBodyB`](Joint#getbodyb)

***

### getCollideConnected()

> **getCollideConnected**(): `boolean`

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

#### Returns

`boolean`

#### Inherited from

[`Joint`](Joint).[`getCollideConnected`](Joint#getcollideconnected)

***

### getJointSpeed()

> **getJointSpeed**(): `number`

Get the current joint translation speed, usually in meters per second.

#### Returns

`number`

***

### getJointTranslation()

> **getJointTranslation**(): `number`

Get the current joint translation, usually in meters.

#### Returns

`number`

***

### getLocalAnchorA()

> **getLocalAnchorA**(): [`Vec2`](Vec2)

The local anchor point relative to bodyA's origin.

#### Returns

[`Vec2`](Vec2)

***

### getLocalAnchorB()

> **getLocalAnchorB**(): [`Vec2`](Vec2)

The local anchor point relative to bodyB's origin.

#### Returns

[`Vec2`](Vec2)

***

### getLocalAxisA()

> **getLocalAxisA**(): [`Vec2`](Vec2)

The local joint axis relative to bodyA.

#### Returns

[`Vec2`](Vec2)

***

### getMaxMotorTorque()

> **getMaxMotorTorque**(): `number`

#### Returns

`number`

***

### getMotorSpeed()

> **getMotorSpeed**(): `number`

Get the motor speed, usually in radians per second.

#### Returns

`number`

***

### getMotorTorque()

> **getMotorTorque**(`inv_dt`): `number`

Get the current motor torque given the inverse time step, usually in N-m.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

***

### getNext()

> **getNext**(): [`Joint`](Joint)

Get the next joint the world joint list.

#### Returns

[`Joint`](Joint)

#### Inherited from

[`Joint`](Joint).[`getNext`](Joint#getnext)

***

### getReactionForce()

> **getReactionForce**(`inv_dt`): [`Vec2`](Vec2)

Get the reaction force on bodyB at the joint anchor in Newtons.

#### Parameters

• **inv\_dt**: `number`

#### Returns

[`Vec2`](Vec2)

#### Overrides

[`Joint`](Joint).[`getReactionForce`](Joint#getreactionforce)

***

### getReactionTorque()

> **getReactionTorque**(`inv_dt`): `number`

Get the reaction torque on bodyB in N*m.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

#### Overrides

[`Joint`](Joint).[`getReactionTorque`](Joint#getreactiontorque)

***

### getSpringDampingRatio()

> **getSpringDampingRatio**(): `number`

#### Returns

`number`

***

### getSpringFrequencyHz()

> **getSpringFrequencyHz**(): `number`

#### Returns

`number`

***

### getType()

> **getType**(): `string`

Get the type of the concrete joint.

#### Returns

`string`

#### Inherited from

[`Joint`](Joint).[`getType`](Joint#gettype)

***

### getUserData()

> **getUserData**(): `unknown`

#### Returns

`unknown`

#### Inherited from

[`Joint`](Joint).[`getUserData`](Joint#getuserdata)

***

### initVelocityConstraints()

> **initVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

#### Overrides

[`Joint`](Joint).[`initVelocityConstraints`](Joint#initvelocityconstraints)

***

### isActive()

> **isActive**(): `boolean`

Short-cut function to determine if either body is inactive.

#### Returns

`boolean`

#### Inherited from

[`Joint`](Joint).[`isActive`](Joint#isactive)

***

### isMotorEnabled()

> **isMotorEnabled**(): `boolean`

Is the joint motor enabled?

#### Returns

`boolean`

***

### setMaxMotorTorque()

> **setMaxMotorTorque**(`torque`): `void`

Set/Get the maximum motor force, usually in N-m.

#### Parameters

• **torque**: `number`

#### Returns

`void`

***

### setMotorSpeed()

> **setMotorSpeed**(`speed`): `void`

Set the motor speed, usually in radians per second.

#### Parameters

• **speed**: `number`

#### Returns

`void`

***

### setSpringDampingRatio()

> **setSpringDampingRatio**(`ratio`): `void`

Set/Get the spring damping ratio

#### Parameters

• **ratio**: `number`

#### Returns

`void`

***

### setSpringFrequencyHz()

> **setSpringFrequencyHz**(`hz`): `void`

Set/Get the spring frequency in hertz. Setting the frequency to zero disables
the spring.

#### Parameters

• **hz**: `number`

#### Returns

`void`

***

### setUserData()

> **setUserData**(`data`): `void`

#### Parameters

• **data**: `unknown`

#### Returns

`void`

#### Inherited from

[`Joint`](Joint).[`setUserData`](Joint#setuserdata)

***

### shiftOrigin()

> **shiftOrigin**(`newOrigin`): `void`

Shift the origin for any points stored in world coordinates.

#### Parameters

• **newOrigin**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

`void`

#### Inherited from

[`Joint`](Joint).[`shiftOrigin`](Joint#shiftorigin)

***

### solvePositionConstraints()

> **solvePositionConstraints**(`step`): `boolean`

This returns true if the position errors are within tolerance.

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`boolean`

#### Overrides

[`Joint`](Joint).[`solvePositionConstraints`](Joint#solvepositionconstraints)

***

### solveVelocityConstraints()

> **solveVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](TimeStep)

#### Returns

`void`

#### Overrides

[`Joint`](Joint).[`solveVelocityConstraints`](Joint#solvevelocityconstraints)
