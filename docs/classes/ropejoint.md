[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RopeJoint](ropejoint.md)

# Class: RopeJoint

## Hierarchy

* any

  ↳ **RopeJoint**

## Callable

▸ **RopeJoint**(`def`: [RopeJointDef](../interfaces/ropejointdef.md)): *[RopeJoint](ropejoint.md)*

*Defined in [joint/index.d.ts:502](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L502)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](../interfaces/ropejointdef.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

▸ **RopeJoint**(`def`: [RopeJointOpt](../interfaces/ropejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RopeJoint](ropejoint.md)*

*Defined in [joint/index.d.ts:503](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L503)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](../interfaces/ropejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

## Index

### Constructors

* [constructor](ropejoint.md#constructor)

### Properties

* [TYPE](ropejoint.md#static-type)

### Methods

* [getLimitState](ropejoint.md#getlimitstate)
* [getLocalAnchorA](ropejoint.md#getlocalanchora)
* [getLocalAnchorB](ropejoint.md#getlocalanchorb)
* [getMaxLength](ropejoint.md#getmaxlength)
* [setMaxLength](ropejoint.md#setmaxlength)

## Constructors

###  constructor

\+ **new RopeJoint**(`def`: [RopeJointDef](../interfaces/ropejointdef.md)): *[RopeJoint](ropejoint.md)*

*Defined in [joint/index.d.ts:505](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L505)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](../interfaces/ropejointdef.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

\+ **new RopeJoint**(`def`: [RopeJointOpt](../interfaces/ropejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RopeJoint](ropejoint.md)*

*Defined in [joint/index.d.ts:507](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L507)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](../interfaces/ropejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RopeJoint](ropejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"rope-joint"*

*Defined in [joint/index.d.ts:505](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L505)*

## Methods

###  getLimitState

▸ **getLimitState**(): *[LIMIT_STATE](../enums/limit_state.md)*

*Defined in [joint/index.d.ts:535](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L535)*

**Returns:** *[LIMIT_STATE](../enums/limit_state.md)*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:531](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L531)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:532](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L532)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxLength

▸ **getMaxLength**(): *number*

*Defined in [joint/index.d.ts:534](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L534)*

**Returns:** *number*

___

###  setMaxLength

▸ **setMaxLength**(`length`: number): *void*

*Defined in [joint/index.d.ts:533](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L533)*

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *void*
