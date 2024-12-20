# Class: RevoluteJoint

A revolute joint constrains two bodies to share a common point while they are
free to rotate about the point. The relative rotation about the shared point
is the joint angle. You can limit the relative rotation with a joint limit
that specifies a lower and upper angle. You can use a motor to drive the
relative rotation about the shared point. A maximum motor torque is provided
so that infinite forces are not generated.

## Extends

- [`Joint`](/api/classes/Joint)

## Constructors

### new RevoluteJoint()

> **new RevoluteJoint**(`def`): [`RevoluteJoint`](/api/classes/RevoluteJoint)

#### Parameters

• **def**: [`RevoluteJointDef`](/api/interfaces/RevoluteJointDef)

#### Returns

[`RevoluteJoint`](/api/classes/RevoluteJoint)

#### Overrides

[`Joint`](/api/classes/Joint).[`constructor`](/api/classes/Joint#constructors)

### new RevoluteJoint()

> **new RevoluteJoint**(`def`, `bodyA`, `bodyB`, `anchor`?): [`RevoluteJoint`](/api/classes/RevoluteJoint)

#### Parameters

• **def**: [`RevoluteJointOpt`](/api/interfaces/RevoluteJointOpt)

• **bodyA**: [`Body`](/api/classes/Body)

• **bodyB**: [`Body`](/api/classes/Body)

• **anchor?**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

[`RevoluteJoint`](/api/classes/RevoluteJoint)

#### Overrides

[`Joint`](/api/classes/Joint).[`constructor`](/api/classes/Joint#constructors)

## Properties

### style

> **style**: [`Style`](/api/interfaces/Style) = `{}`

Styling for dev-tools.

#### Inherited from

[`Joint`](/api/classes/Joint).[`style`](/api/classes/Joint#style)

***

### TYPE

> `static` **TYPE**: `"revolute-joint"`

## Methods

### enableLimit()

> **enableLimit**(`flag`): `void`

Enable/disable the joint limit.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### enableMotor()

> **enableMotor**(`flag`): `void`

Enable/disable the joint motor.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### getAnchorA()

> **getAnchorA**(): [`Vec2`](/api/classes/Vec2)

Get the anchor point on bodyA in world coordinates.

#### Returns

[`Vec2`](/api/classes/Vec2)

#### Overrides

[`Joint`](/api/classes/Joint).[`getAnchorA`](/api/classes/Joint#getanchora)

***

### getAnchorB()

> **getAnchorB**(): [`Vec2`](/api/classes/Vec2)

Get the anchor point on bodyB in world coordinates.

#### Returns

[`Vec2`](/api/classes/Vec2)

#### Overrides

[`Joint`](/api/classes/Joint).[`getAnchorB`](/api/classes/Joint#getanchorb)

***

### getBodyA()

> **getBodyA**(): [`Body`](/api/classes/Body)

Get the first body attached to this joint.

#### Returns

[`Body`](/api/classes/Body)

#### Inherited from

[`Joint`](/api/classes/Joint).[`getBodyA`](/api/classes/Joint#getbodya)

***

### getBodyB()

> **getBodyB**(): [`Body`](/api/classes/Body)

Get the second body attached to this joint.

#### Returns

[`Body`](/api/classes/Body)

#### Inherited from

[`Joint`](/api/classes/Joint).[`getBodyB`](/api/classes/Joint#getbodyb)

***

### getCollideConnected()

> **getCollideConnected**(): `boolean`

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

#### Returns

`boolean`

#### Inherited from

[`Joint`](/api/classes/Joint).[`getCollideConnected`](/api/classes/Joint#getcollideconnected)

***

### getJointAngle()

> **getJointAngle**(): `number`

Get the current joint angle in radians.

#### Returns

`number`

***

### getJointSpeed()

> **getJointSpeed**(): `number`

Get the current joint angle speed in radians per second.

#### Returns

`number`

***

### getLocalAnchorA()

> **getLocalAnchorA**(): [`Vec2`](/api/classes/Vec2)

The local anchor point relative to bodyA's origin.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getLocalAnchorB()

> **getLocalAnchorB**(): [`Vec2`](/api/classes/Vec2)

The local anchor point relative to bodyB's origin.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getLowerLimit()

> **getLowerLimit**(): `number`

Get the lower joint limit in radians.

#### Returns

`number`

***

### getMaxMotorTorque()

> **getMaxMotorTorque**(): `number`

#### Returns

`number`

***

### getMotorSpeed()

> **getMotorSpeed**(): `number`

Get the motor speed in radians per second.

#### Returns

`number`

***

### getMotorTorque()

> **getMotorTorque**(`inv_dt`): `number`

Get the current motor torque given the inverse time step. Unit is N*m.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

***

### getNext()

> **getNext**(): [`Joint`](/api/classes/Joint)

Get the next joint the world joint list.

#### Returns

[`Joint`](/api/classes/Joint)

#### Inherited from

[`Joint`](/api/classes/Joint).[`getNext`](/api/classes/Joint#getnext)

***

### getReactionForce()

> **getReactionForce**(`inv_dt`): [`Vec2`](/api/classes/Vec2)

Get the reaction force given the inverse time step. Unit is N.

#### Parameters

• **inv\_dt**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

#### Overrides

[`Joint`](/api/classes/Joint).[`getReactionForce`](/api/classes/Joint#getreactionforce)

***

### getReactionTorque()

> **getReactionTorque**(`inv_dt`): `number`

Get the reaction torque due to the joint limit given the inverse time step.
Unit is N*m.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

#### Overrides

[`Joint`](/api/classes/Joint).[`getReactionTorque`](/api/classes/Joint#getreactiontorque)

***

### getReferenceAngle()

> **getReferenceAngle**(): `number`

Get the reference angle.

#### Returns

`number`

***

### getType()

> **getType**(): `string`

Get the type of the concrete joint.

#### Returns

`string`

#### Inherited from

[`Joint`](/api/classes/Joint).[`getType`](/api/classes/Joint#gettype)

***

### getUpperLimit()

> **getUpperLimit**(): `number`

Get the upper joint limit in radians.

#### Returns

`number`

***

### getUserData()

> **getUserData**(): `unknown`

#### Returns

`unknown`

#### Inherited from

[`Joint`](/api/classes/Joint).[`getUserData`](/api/classes/Joint#getuserdata)

***

### initVelocityConstraints()

> **initVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`void`

#### Overrides

[`Joint`](/api/classes/Joint).[`initVelocityConstraints`](/api/classes/Joint#initvelocityconstraints)

***

### isActive()

> **isActive**(): `boolean`

Short-cut function to determine if either body is inactive.

#### Returns

`boolean`

#### Inherited from

[`Joint`](/api/classes/Joint).[`isActive`](/api/classes/Joint#isactive)

***

### isLimitEnabled()

> **isLimitEnabled**(): `boolean`

Is the joint limit enabled?

#### Returns

`boolean`

***

### isMotorEnabled()

> **isMotorEnabled**(): `boolean`

Is the joint motor enabled?

#### Returns

`boolean`

***

### setLimits()

> **setLimits**(`lower`, `upper`): `void`

Set the joint limits in radians.

#### Parameters

• **lower**: `number`

• **upper**: `number`

#### Returns

`void`

***

### setMaxMotorTorque()

> **setMaxMotorTorque**(`torque`): `void`

Set the maximum motor torque, usually in N-m.

#### Parameters

• **torque**: `number`

#### Returns

`void`

***

### setMotorSpeed()

> **setMotorSpeed**(`speed`): `void`

Set the motor speed in radians per second.

#### Parameters

• **speed**: `number`

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

[`Joint`](/api/classes/Joint).[`setUserData`](/api/classes/Joint#setuserdata)

***

### shiftOrigin()

> **shiftOrigin**(`newOrigin`): `void`

Shift the origin for any points stored in world coordinates.

#### Parameters

• **newOrigin**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`void`

#### Inherited from

[`Joint`](/api/classes/Joint).[`shiftOrigin`](/api/classes/Joint#shiftorigin)

***

### solvePositionConstraints()

> **solvePositionConstraints**(`step`): `boolean`

This returns true if the position errors are within tolerance.

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`boolean`

#### Overrides

[`Joint`](/api/classes/Joint).[`solvePositionConstraints`](/api/classes/Joint#solvepositionconstraints)

***

### solveVelocityConstraints()

> **solveVelocityConstraints**(`step`): `void`

#### Parameters

• **step**: [`TimeStep`](/api/classes/TimeStep)

#### Returns

`void`

#### Overrides

[`Joint`](/api/classes/Joint).[`solveVelocityConstraints`](/api/classes/Joint#solvevelocityconstraints)
