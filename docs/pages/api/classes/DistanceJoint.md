# Class: DistanceJoint

A distance joint constrains two points on two bodies to remain at a fixed
distance from each other. You can view this as a massless, rigid rod.

## Extends

- [`Joint`](Joint)

## Constructors

### new DistanceJoint()

> **new DistanceJoint**(`def`): [`DistanceJoint`](DistanceJoint)

#### Parameters

• **def**: [`DistanceJointDef`](../interfaces/DistanceJointDef)

DistanceJoint definition.

#### Returns

[`DistanceJoint`](DistanceJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

### new DistanceJoint()

> **new DistanceJoint**(`def`, `bodyA`, `bodyB`, `anchorA`?, `anchorB`?): [`DistanceJoint`](DistanceJoint)

#### Parameters

• **def**: [`DistanceJointOpt`](../interfaces/DistanceJointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

• **anchorA?**: [`Vec2Value`](../interfaces/Vec2Value)

Anchor A in global coordination.

• **anchorB?**: [`Vec2Value`](../interfaces/Vec2Value)

Anchor B in global coordination.

#### Returns

[`DistanceJoint`](DistanceJoint)

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

> `static` **TYPE**: `"distance-joint"`

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

### getDampingRatio()

> **getDampingRatio**(): `number`

#### Returns

`number`

***

### getFrequency()

> **getFrequency**(): `number`

#### Returns

`number`

***

### getLength()

> **getLength**(): `number`

Get the natural length.

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

### setDampingRatio()

> **setDampingRatio**(`ratio`): `void`

#### Parameters

• **ratio**: `number`

#### Returns

`void`

***

### setFrequency()

> **setFrequency**(`hz`): `void`

#### Parameters

• **hz**: `number`

#### Returns

`void`

***

### setLength()

> **setLength**(`length`): `void`

Set the natural length. Manipulating the length can lead to non-physical
behavior when the frequency is zero.

#### Parameters

• **length**: `number`

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
