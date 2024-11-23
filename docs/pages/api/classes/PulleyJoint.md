# Class: PulleyJoint

The pulley joint is connected to two bodies and two fixed ground points. The
pulley supports a ratio such that: length1 + ratio * length2 <= constant

Yes, the force transmitted is scaled by the ratio.

Warning: the pulley joint can get a bit squirrelly by itself. They often work
better when combined with prismatic joints. You should also cover the the
anchor points with static shapes to prevent one side from going to zero
length.

## Extends

- [`Joint`](Joint)

## Constructors

### new PulleyJoint()

> **new PulleyJoint**(`def`): [`PulleyJoint`](PulleyJoint)

#### Parameters

• **def**: [`PulleyJointDef`](../interfaces/PulleyJointDef)

#### Returns

[`PulleyJoint`](PulleyJoint)

#### Overrides

[`Joint`](Joint).[`constructor`](Joint#constructors)

### new PulleyJoint()

> **new PulleyJoint**(`def`, `bodyA`, `bodyB`, `groundA`, `groundB`, `anchorA`, `anchorB`, `ratio`): [`PulleyJoint`](PulleyJoint)

#### Parameters

• **def**: [`PulleyJointOpt`](../interfaces/PulleyJointOpt)

• **bodyA**: [`Body`](Body)

• **bodyB**: [`Body`](Body)

• **groundA**: [`Vec2Value`](../interfaces/Vec2Value)

• **groundB**: [`Vec2Value`](../interfaces/Vec2Value)

• **anchorA**: [`Vec2Value`](../interfaces/Vec2Value)

• **anchorB**: [`Vec2Value`](../interfaces/Vec2Value)

• **ratio**: `number`

#### Returns

[`PulleyJoint`](PulleyJoint)

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

> `static` **TYPE**: `"pulley-joint"`

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

### getCurrentLengthA()

> **getCurrentLengthA**(): `number`

Get the current length of the segment attached to bodyA.

#### Returns

`number`

***

### getCurrentLengthB()

> **getCurrentLengthB**(): `number`

Get the current length of the segment attached to bodyB.

#### Returns

`number`

***

### getGroundAnchorA()

> **getGroundAnchorA**(): [`Vec2`](Vec2)

Get the first ground anchor.

#### Returns

[`Vec2`](Vec2)

***

### getGroundAnchorB()

> **getGroundAnchorB**(): [`Vec2`](Vec2)

Get the second ground anchor.

#### Returns

[`Vec2`](Vec2)

***

### getLengthA()

> **getLengthA**(): `number`

Get the current length of the segment attached to bodyA.

#### Returns

`number`

***

### getLengthB()

> **getLengthB**(): `number`

Get the current length of the segment attached to bodyB.

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

### getRatio()

> **getRatio**(): `number`

Get the pulley ratio.

#### Returns

`number`

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

#### Overrides

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
