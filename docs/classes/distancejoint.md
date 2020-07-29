[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceJoint](distancejoint.md)

# Class: DistanceJoint

## Hierarchy

* any

  ↳ **DistanceJoint**

## Callable

▸ **DistanceJoint**(`def`: [DistanceJointDef](../interfaces/distancejointdef.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:60](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

▸ **DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:61](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L61)*

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

* [m_bias](distancejoint.md#m_bias)
* [m_dampingRatio](distancejoint.md#m_dampingratio)
* [m_frequencyHz](distancejoint.md#m_frequencyhz)
* [m_gamma](distancejoint.md#m_gamma)
* [m_impulse](distancejoint.md#m_impulse)
* [m_length](distancejoint.md#m_length)
* [m_localAnchorA](distancejoint.md#m_localanchora)
* [m_localAnchorB](distancejoint.md#m_localanchorb)
* [m_type](distancejoint.md#m_type)
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

*Defined in [joint/index.d.ts:63](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](../interfaces/distancejointdef.md) |

**Returns:** *[DistanceJoint](distancejoint.md)*

\+ **new DistanceJoint**(`def`: [DistanceJointOpt](../interfaces/distancejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md)): *[DistanceJoint](distancejoint.md)*

*Defined in [joint/index.d.ts:65](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L65)*

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

###  m_bias

• **m_bias**: *number*

*Defined in [joint/index.d.ts:77](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L77)*

___

###  m_dampingRatio

• **m_dampingRatio**: *number*

*Defined in [joint/index.d.ts:74](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L74)*

___

###  m_frequencyHz

• **m_frequencyHz**: *number*

*Defined in [joint/index.d.ts:73](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L73)*

___

###  m_gamma

• **m_gamma**: *number*

*Defined in [joint/index.d.ts:76](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L76)*

___

###  m_impulse

• **m_impulse**: *number*

*Defined in [joint/index.d.ts:75](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L75)*

___

###  m_length

• **m_length**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:72](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L72)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:70](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L70)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:71](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L71)*

___

###  m_type

• **m_type**: *"distance-joint"*

*Defined in [joint/index.d.ts:68](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L68)*

___

### `Static` TYPE

▪ **TYPE**: *"distance-joint"*

*Defined in [joint/index.d.ts:63](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L63)*

## Methods

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [joint/index.d.ts:97](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L97)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [joint/index.d.ts:95](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L95)*

**Returns:** *number*

___

###  getLength

▸ **getLength**(): *number*

*Defined in [joint/index.d.ts:93](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L93)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:90](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L90)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:91](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L91)*

**Returns:** *[Vec2](vec2.md)*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:96](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [joint/index.d.ts:94](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setLength

▸ **setLength**(`length`: number): *void*

*Defined in [joint/index.d.ts:92](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *void*
