[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJoint](distancejoint.md)

# Class: DistanceJoint

## Hierarchy

* any

  ↳ **DistanceJoint**

## Callable

▸ **DistanceJoint**(`def`: [DistanceJointDef](../interfaces/distancejointdef.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:60](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

▸ **DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:61](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointOpt](../interfaces/distancejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

## Index

### Constructors

* [constructor](distancejoint.md#constructor)

### Properties

* [TYPE](distancejoint.md#static-type)

### Methods

* [getDampingRatio](distancejoint.md#getdampingratio)
* [getFrequency](distancejoint.md#getfrequency)
* [getLength](distancejoint.md#getlength)
* [getLocalAnchorA](distancejoint.md#getlocalanchora)
* [getLocalAnchorB](distancejoint.md#getlocalanchorb)
* [setDampingRatio](distancejoint.md#setdampingratio)
* [setFrequency](distancejoint.md#setfrequency)
* [setLength](distancejoint.md#setlength)

## Constructors

###  constructor

\+ **new DistanceJoint**(`def`: [DistanceJointDef](../interfaces/distancejointdef.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:63](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:65](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointOpt](../interfaces/distancejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"distance-joint"*

*Defined in [joint/index.d.ts:63](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L63)*

## Methods

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [joint/index.d.ts:97](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L97)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [joint/index.d.ts:95](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L95)*

**Returns:** *number*

___

###  getLength

▸ **getLength**(): *number*

*Defined in [joint/index.d.ts:93](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L93)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:90](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L90)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:91](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L91)*

**Returns:** *[Vec2](vec2.md)*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:96](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [joint/index.d.ts:94](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setLength

▸ **setLength**(`length`: number): *void*

*Defined in [joint/index.d.ts:92](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *void*
