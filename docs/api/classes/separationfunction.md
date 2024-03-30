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

___

###  indexB

• **indexB**: *number* = -1

___

###  m_axis

• **m_axis**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

___

###  m_localPoint

• **m_localPoint**: *[Vec2Value](../interfaces/vec2value.md)* = matrix.vec2(0, 0)

___

###  m_proxyA

• **m_proxyA**: *[DistanceProxy](distanceproxy.md)* = null

___

###  m_proxyB

• **m_proxyB**: *[DistanceProxy](distanceproxy.md)* = null

___

###  m_sweepA

• **m_sweepA**: *[Sweep](sweep.md)* = null

___

###  m_sweepB

• **m_sweepB**: *[Sweep](sweep.md)* = null

___

###  m_type

• **m_type**: *[SeparationFunctionType](../enums/separationfunctiontype.md)* = SeparationFunctionType.e_unset

## Methods

###  compute

▸ **compute**(`find`: boolean, `t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`find` | boolean |
`t` | number |

**Returns:** *number*

___

###  evaluate

▸ **evaluate**(`t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |

**Returns:** *number*

___

###  findMinSeparation

▸ **findMinSeparation**(`t`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`t` | number |

**Returns:** *number*

___

###  initialize

▸ **initialize**(`cache`: [SimplexCache](simplexcache.md), `proxyA`: [DistanceProxy](distanceproxy.md), `sweepA`: [Sweep](sweep.md), `proxyB`: [DistanceProxy](distanceproxy.md), `sweepB`: [Sweep](sweep.md), `t1`: number): *number*

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

**Returns:** *void*
