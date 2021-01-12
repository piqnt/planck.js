[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FrictionJoint](frictionjoint.md)

# Class: FrictionJoint

## Hierarchy

* any

  ↳ **FrictionJoint**

## Callable

▸ **FrictionJoint**(`def`: [FrictionJointDef](../interfaces/frictionjointdef.md)): *[FrictionJoint](frictionjoint.md)*

*Defined in [joint/index.d.ts:111](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

▸ **FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Defined in [joint/index.d.ts:112](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointOpt](../interfaces/frictionjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

## Index

### Constructors

* [constructor](frictionjoint.md#constructor)

### Properties

* [TYPE](frictionjoint.md#static-type)

### Methods

* [getLocalAnchorA](frictionjoint.md#getlocalanchora)
* [getLocalAnchorB](frictionjoint.md#getlocalanchorb)
* [getMaxForce](frictionjoint.md#getmaxforce)
* [getMaxTorque](frictionjoint.md#getmaxtorque)
* [setMaxForce](frictionjoint.md#setmaxforce)
* [setMaxTorque](frictionjoint.md#setmaxtorque)

## Constructors

###  constructor

\+ **new FrictionJoint**(`def`: [FrictionJointDef](../interfaces/frictionjointdef.md)): *[FrictionJoint](frictionjoint.md)*

*Defined in [joint/index.d.ts:114](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](../interfaces/frictionjointdef.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

\+ **new FrictionJoint**(`def`: [FrictionJointOpt](../interfaces/frictionjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[FrictionJoint](frictionjoint.md)*

*Defined in [joint/index.d.ts:115](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointOpt](../interfaces/frictionjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[FrictionJoint](frictionjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"friction-joint"*

*Defined in [joint/index.d.ts:114](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L114)*

## Methods

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:139](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L139)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:140](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L140)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [joint/index.d.ts:142](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L142)*

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [joint/index.d.ts:144](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L144)*

**Returns:** *number*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:141](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:143](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*
