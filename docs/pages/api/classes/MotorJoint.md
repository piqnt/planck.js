# Class: MotorJoint

A motor joint is used to control the relative motion between two bodies. A
typical usage is to control the movement of a dynamic body with respect to
the ground.

## Extends

- [`Joint`](/api/classes/Joint)

## Constructors

### new MotorJoint()

> **new MotorJoint**(`def`): [`MotorJoint`](/api/classes/MotorJoint)

#### Parameters

• **def**: [`MotorJointDef`](/api/interfaces/MotorJointDef)

#### Returns

[`MotorJoint`](/api/classes/MotorJoint)

#### Overrides

[`Joint`](/api/classes/Joint).[`constructor`](/api/classes/Joint#constructors)

### new MotorJoint()

> **new MotorJoint**(`def`, `bodyA`, `bodyB`): [`MotorJoint`](/api/classes/MotorJoint)

#### Parameters

• **def**: [`MotorJointOpt`](/api/interfaces/MotorJointOpt)

• **bodyA**: [`Body`](/api/classes/Body)

• **bodyB**: [`Body`](/api/classes/Body)

#### Returns

[`MotorJoint`](/api/classes/MotorJoint)

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

> `static` **TYPE**: `"motor-joint"`

## Methods

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

### getAngularOffset()

> **getAngularOffset**(): `number`

#### Returns

`number`

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

### getCorrectionFactor()

> **getCorrectionFactor**(): `number`

Get the position correction factor in the range [0,1].

#### Returns

`number`

***

### getLinearOffset()

> **getLinearOffset**(): [`Vec2`](/api/classes/Vec2)

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getMaxForce()

> **getMaxForce**(): `number`

Get the maximum friction force in N.

#### Returns

`number`

***

### getMaxTorque()

> **getMaxTorque**(): `number`

Get the maximum friction torque in N*m.

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

Get the reaction force on bodyB at the joint anchor in Newtons.

#### Parameters

• **inv\_dt**: `number`

#### Returns

[`Vec2`](/api/classes/Vec2)

#### Overrides

[`Joint`](/api/classes/Joint).[`getReactionForce`](/api/classes/Joint#getreactionforce)

***

### getReactionTorque()

> **getReactionTorque**(`inv_dt`): `number`

Get the reaction torque on bodyB in N*m.

#### Parameters

• **inv\_dt**: `number`

#### Returns

`number`

#### Overrides

[`Joint`](/api/classes/Joint).[`getReactionTorque`](/api/classes/Joint#getreactiontorque)

***

### getType()

> **getType**(): `string`

Get the type of the concrete joint.

#### Returns

`string`

#### Inherited from

[`Joint`](/api/classes/Joint).[`getType`](/api/classes/Joint#gettype)

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

### setAngularOffset()

> **setAngularOffset**(`angularOffset`): `void`

Set/get the target angular offset, in radians.

#### Parameters

• **angularOffset**: `number`

#### Returns

`void`

***

### setCorrectionFactor()

> **setCorrectionFactor**(`factor`): `void`

Set the position correction factor in the range [0,1].

#### Parameters

• **factor**: `number`

#### Returns

`void`

***

### setLinearOffset()

> **setLinearOffset**(`linearOffset`): `void`

Set/get the target linear offset, in frame A, in meters.

#### Parameters

• **linearOffset**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`void`

***

### setMaxForce()

> **setMaxForce**(`force`): `void`

Set the maximum friction force in N.

#### Parameters

• **force**: `number`

#### Returns

`void`

***

### setMaxTorque()

> **setMaxTorque**(`torque`): `void`

Set the maximum friction torque in N*m.

#### Parameters

• **torque**: `number`

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
