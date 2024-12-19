# Class: PrismaticJoint

A prismatic joint. This joint provides one degree of freedom: translation
along an axis fixed in bodyA. Relative rotation is prevented. You can use a
joint limit to restrict the range of motion and a joint motor to drive the
motion or to model joint friction.

## Extends

- [`Joint`](Joint)

## Constructors

### new PrismaticJoint()

> **new PrismaticJoint**(`def`): [`PrismaticJoint`](PrismaticJoint)

#### Parameters

• **def**: [`PrismaticJointDef`](../interfaces/PrismaticJointDef)

#### Returns

[`PrismaticJoint`](PrismaticJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

### new PrismaticJoint()

> **new PrismaticJoint**(`def`, `bodyA`, `bodyB`, `anchor`?, `axis`?): [`PrismaticJoint`](PrismaticJoint)

#### Parameters

• **def**: [`PrismaticJointOpt`](../interfaces/PrismaticJointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

• **anchor?**: [`Vec2Value`](../interfaces/Vec2Value)

• **axis?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`PrismaticJoint`](PrismaticJoint)

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

> `static` **TYPE**: `"prismatic-joint"`

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

### getLowerLimit()

> **getLowerLimit**(): `number`

Get the lower joint limit, usually in meters.

#### Returns

`number`

***

### getMaxMotorForce()

> **getMaxMotorForce**(): `number`

#### Returns

`number`

***

### getMotorForce()

> **getMotorForce**(`inv_dt`): `number`

Get the current motor force given the inverse time step, usually in N.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

***

### getMotorSpeed()

> **getMotorSpeed**(): `number`

Get the motor speed, usually in meters per second.

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

[`Joint`](Joint).[`getType`](Joint#gettype)

***

### getUpperLimit()

> **getUpperLimit**(): `number`

Get the upper joint limit, usually in meters.

#### Returns

`number`

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

Set the joint limits, usually in meters.

#### Parameters

• **lower**: `number`

• **upper**: `number`

#### Returns

`void`

***

### setMaxMotorForce()

> **setMaxMotorForce**(`force`): `void`

Set the maximum motor force, usually in N.

#### Parameters

• **force**: `number`

#### Returns

`void`

***

### setMotorSpeed()

> **setMotorSpeed**(`speed`): `void`

Set the motor speed, usually in meters per second.

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
