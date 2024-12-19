# Class: RopeJoint

A rope joint enforces a maximum distance between two points on two bodies. It
has no other effect.

Warning: if you attempt to change the maximum length during the simulation
you will get some non-physical behavior.

A model that would allow you to dynamically modify the length would have some
sponginess, so I chose not to implement it that way. See [DistanceJoint](DistanceJoint) if you
want to dynamically control length.

## Extends

- [`Joint`](Joint)

## Constructors

### new RopeJoint()

> **new RopeJoint**(`def`): [`RopeJoint`](RopeJoint)

#### Parameters

• **def**: [`RopeJointDef`](../interfaces/RopeJointDef)

#### Returns

[`RopeJoint`](RopeJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

### new RopeJoint()

> **new RopeJoint**(`def`, `bodyA`, `bodyB`, `anchor`?): [`RopeJoint`](RopeJoint)

#### Parameters

• **def**: [`RopeJointOpt`](../interfaces/RopeJointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

• **anchor?**: [`Vec2Value`](../interfaces/Vec2Value)

#### Returns

[`RopeJoint`](RopeJoint)

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

> `static` **TYPE**: `"rope-joint"`

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

### getLimitState()

> **getLimitState**(): `number`

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

### getMaxLength()

> **getMaxLength**(): `number`

Get the maximum length of the rope.

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

### setMaxLength()

> **setMaxLength**(`length`): `void`

Set the maximum length of the rope.

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
