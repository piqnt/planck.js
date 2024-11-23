# Class: FrictionJoint

Friction joint. This is used for top-down friction. It provides 2D
translational friction and angular friction.

## Extends

- [`Joint`](Joint)

## Constructors

### new FrictionJoint()

> **new FrictionJoint**(`def`): [`FrictionJoint`](FrictionJoint)

#### Parameters

• **def**: [`FrictionJointDef`](../interfaces/FrictionJointDef)

#### Returns

[`FrictionJoint`](FrictionJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

### new FrictionJoint()

> **new FrictionJoint**(`def`, `bodyA`, `bodyB`, `anchor`): [`FrictionJoint`](FrictionJoint)

#### Parameters

• **def**: [`FrictionJointOpt`](../interfaces/FrictionJointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

• **anchor**: [`Vec2Value`](../interfaces/Vec2Value)

Anchor in global coordination.

#### Returns

[`FrictionJoint`](FrictionJoint)

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

> `static` **TYPE**: `"friction-joint"`

## Methods

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
