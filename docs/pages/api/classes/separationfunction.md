---
showOutline: false
---

# Class: SeparationFunction

## Hierarchy

* **SeparationFunction**

## Index

### Properties

* [indexA](/api/classes/separationfunction#indexa)
* [indexB](/api/classes/separationfunction#indexb)
* [m_axis](/api/classes/separationfunction#m_axis)
* [m_localPoint](/api/classes/separationfunction#m_localpoint)
* [m_proxyA](/api/classes/separationfunction#m_proxya)
* [m_proxyB](/api/classes/separationfunction#m_proxyb)
* [m_sweepA](/api/classes/separationfunction#m_sweepa)
* [m_sweepB](/api/classes/separationfunction#m_sweepb)
* [m_type](/api/classes/separationfunction#m_type)

### Methods

* [compute](/api/classes/separationfunction#compute)
* [evaluate](/api/classes/separationfunction#evaluate)
* [findMinSeparation](/api/classes/separationfunction#findminseparation)
* [initialize](/api/classes/separationfunction#initialize)
* [recycle](/api/classes/separationfunction#recycle)

## Properties

###  indexA

• **indexA**: *number* = -1

___

###  indexB

• **indexB**: *number* = -1

___

###  m_axis

• **m_axis**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

___

###  m_localPoint

• **m_localPoint**: *[Vec2Value](/api/interfaces/vec2value)* = matrix.vec2(0, 0)

___

###  m_proxyA

• **m_proxyA**: *[DistanceProxy](/api/classes/distanceproxy)* = null

___

###  m_proxyB

• **m_proxyB**: *[DistanceProxy](/api/classes/distanceproxy)* = null

___

###  m_sweepA

• **m_sweepA**: *[Sweep](/api/classes/sweep)* = null

___

###  m_sweepB

• **m_sweepB**: *[Sweep](/api/classes/sweep)* = null

___

###  m_type

• **m_type**: *[SeparationFunctionType](/api/enums/separationfunctiontype)* = SeparationFunctionType.e_unset

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

▸ **initialize**(`cache`: [SimplexCache](/api/classes/simplexcache), `proxyA`: [DistanceProxy](/api/classes/distanceproxy), `sweepA`: [Sweep](/api/classes/sweep), `proxyB`: [DistanceProxy](/api/classes/distanceproxy), `sweepB`: [Sweep](/api/classes/sweep), `t1`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | [SimplexCache](/api/classes/simplexcache) |
`proxyA` | [DistanceProxy](/api/classes/distanceproxy) |
`sweepA` | [Sweep](/api/classes/sweep) |
`proxyB` | [DistanceProxy](/api/classes/distanceproxy) |
`sweepB` | [Sweep](/api/classes/sweep) |
`t1` | number |

**Returns:** *number*

___

###  recycle

▸ **recycle**(): *void*

**Returns:** *void*
