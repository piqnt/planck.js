# Class: GearJoint

A gear joint is used to connect two joints together. Either joint can be a
revolute or prismatic joint. You specify a gear ratio to bind the motions
together: coordinate1 + ratio * coordinate2 = constant

The ratio can be negative or positive. If one joint is a revolute joint and
the other joint is a prismatic joint, then the ratio will have units of
length or units of 1/length. Warning: You have to manually destroy the gear
joint if joint1 or joint2 is destroyed.

This definition requires two existing revolute or prismatic joints (any
combination will work).

## Extends

- [`Joint`](/api/classes/Joint)

## Constructors

### new GearJoint()

> **new GearJoint**(`def`): [`GearJoint`](/api/classes/GearJoint)

#### Parameters

• **def**: [`GearJointDef`](/api/interfaces/GearJointDef)

#### Returns

[`GearJoint`](/api/classes/GearJoint)

#### Overrides

[`Joint`](/api/classes/Joint).[`constructor`](/api/classes/Joint#constructors)

### new GearJoint()

> **new GearJoint**(`def`, `bodyA`, `bodyB`, `joint1`, `joint2`, `ratio`?): [`GearJoint`](/api/classes/GearJoint)

#### Parameters

• **def**: [`GearJointOpt`](/api/interfaces/GearJointOpt)

• **bodyA**: [`Body`](/api/classes/Body)

• **bodyB**: [`Body`](/api/classes/Body)

• **joint1**: [`RevoluteJoint`](/api/classes/RevoluteJoint) \| [`PrismaticJoint`](/api/classes/PrismaticJoint)

• **joint2**: [`RevoluteJoint`](/api/classes/RevoluteJoint) \| [`PrismaticJoint`](/api/classes/PrismaticJoint)

• **ratio?**: `number`

#### Returns

[`GearJoint`](/api/classes/GearJoint)

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

> `static` **TYPE**: `"gear-joint"`

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

### getJoint1()

> **getJoint1**(): [`Joint`](/api/classes/Joint)

Get the first joint.

#### Returns

[`Joint`](/api/classes/Joint)

***

### getJoint2()

> **getJoint2**(): [`Joint`](/api/classes/Joint)

Get the second joint.

#### Returns

[`Joint`](/api/classes/Joint)

***

### getNext()

> **getNext**(): [`Joint`](/api/classes/Joint)

Get the next joint the world joint list.

#### Returns

[`Joint`](/api/classes/Joint)

#### Inherited from

[`Joint`](/api/classes/Joint).[`getNext`](/api/classes/Joint#getnext)

***

### getRatio()

> **getRatio**(): `number`

Get the gear ratio.

#### Returns

`number`

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

### setRatio()

> **setRatio**(`ratio`): `void`

Set the gear ratio.

#### Parameters

• **ratio**: `number`

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
