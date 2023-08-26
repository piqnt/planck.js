[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [SeparationFunction](separationfunction.md)

# Class: SeparationFunction

## Hierarchy

* **SeparationFunction**

## Index

### Properties

* [indexA](separationfunction.md#indexa)
* [indexB](separationfunction.md#indexb)
* [m_axis](separationfunction.md#m_axis)
* [m_localPoint](separationfunction.md#m_localpoint)
* [m_proxyA](separationfunction.md#m_proxya)
* [m_proxyB](separationfunction.md#m_proxyb)
* [m_sweepA](separationfunction.md#m_sweepa)
* [m_sweepB](separationfunction.md#m_sweepb)
* [m_type](separationfunction.md#m_type)

### Methods

* [compute](separationfunction.md#compute)
* [evaluate](separationfunction.md#evaluate)
* [findMinSeparation](separationfunction.md#findminseparation)
* [initialize](separationfunction.md#initialize)
* [recycle](separationfunction.md#recycle)

## Properties

###  indexA

• **indexA**: *number* = -1

*Defined in [src/collision/TimeOfImpact.ts:343](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L343)*

___

###  indexB

• **indexB**: *number* = -1

*Defined in [src/collision/TimeOfImpact.ts:344](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L344)*

___

###  m_axis

• **m_axis**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [src/collision/TimeOfImpact.ts:340](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L340)*

___

###  m_localPoint

• **m_localPoint**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

*Defined in [src/collision/TimeOfImpact.ts:339](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L339)*

___

###  m_proxyA

• **m_proxyA**: *[DistanceProxy](distanceproxy.md)* = null

*Defined in [src/collision/TimeOfImpact.ts:332](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L332)*

___

###  m_proxyB

• **m_proxyB**: *[DistanceProxy](distanceproxy.md)* = null

*Defined in [src/collision/TimeOfImpact.ts:333](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L333)*

___

###  m_sweepA

• **m_sweepA**: *[Sweep](sweep.md)* = null

*Defined in [src/collision/TimeOfImpact.ts:334](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L334)*

___

###  m_sweepB

• **m_sweepB**: *[Sweep](sweep.md)* = null

*Defined in [src/collision/TimeOfImpact.ts:335](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L335)*

___

###  m_type

• **m_type**: *[SeparationFunctionType](../enums/separationfunctiontype.md)* = SeparationFunctionType.e_unset

*Defined in [src/collision/TimeOfImpact.ts:338](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L338)*

## Methods

###  compute

▸ **compute**(`find`: boolean, `t`: number): *number*

*Defined in [src/collision/TimeOfImpact.ts:432](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L432)*

**Parameters:**

Name | Type |
------ | ------ |
`find` | boolean |
`t` | number |

**Returns:** *number*

___

###  evaluate

▸ **evaluate**(`t`: number): *number*

*Defined in [src/collision/TimeOfImpact.ts:507](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L507)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |

**Returns:** *number*

___

###  findMinSeparation

▸ **findMinSeparation**(`t`: number): *number*

*Defined in [src/collision/TimeOfImpact.ts:503](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L503)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |

**Returns:** *number*

___

###  initialize

▸ **initialize**(`cache`: [SimplexCache](simplexcache.md), `proxyA`: [DistanceProxy](distanceproxy.md), `sweepA`: [Sweep](sweep.md), `proxyB`: [DistanceProxy](distanceproxy.md), `sweepB`: [Sweep](sweep.md), `t1`: number): *number*

*Defined in [src/collision/TimeOfImpact.ts:362](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L362)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](simplexcache.md) |
`proxyA` | [DistanceProxy](distanceproxy.md) |
`sweepA` | [Sweep](sweep.md) |
`proxyB` | [DistanceProxy](distanceproxy.md) |
`sweepB` | [Sweep](sweep.md) |
`t1` | number |

**Returns:** *number*

___

###  recycle

▸ **recycle**(): *void*

*Defined in [src/collision/TimeOfImpact.ts:346](https://github.com/shakiba/planck.js/blob/6ab76c7/src/collision/TimeOfImpact.ts#L346)*

**Returns:** *void*
