[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WeldJoint](weldjoint.md)

# Class: WeldJoint

## Hierarchy

* any

  ↳ **WeldJoint**

## Callable

▸ **WeldJoint**(`def`: [WeldJointDef](../interfaces/weldjointdef.md)): *[WeldJoint](weldjoint.md)*

*Defined in [joint/index.d.ts:547](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L547)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](../interfaces/weldjointdef.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

▸ **WeldJoint**(`def`: [WeldJointOpt](../interfaces/weldjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[WeldJoint](weldjoint.md)*

*Defined in [joint/index.d.ts:548](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L548)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](../interfaces/weldjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

## Index

### Constructors

* [constructor](weldjoint.md#constructor)

### Properties

* [TYPE](weldjoint.md#static-type)

### Methods

* [getDampingRatio](weldjoint.md#getdampingratio)
* [getFrequency](weldjoint.md#getfrequency)
* [getLocalAnchorA](weldjoint.md#getlocalanchora)
* [getLocalAnchorB](weldjoint.md#getlocalanchorb)
* [getReferenceAngle](weldjoint.md#getreferenceangle)
* [setDampingRatio](weldjoint.md#setdampingratio)
* [setFrequency](weldjoint.md#setfrequency)

## Constructors

###  constructor

\+ **new WeldJoint**(`def`: [WeldJointDef](../interfaces/weldjointdef.md)): *[WeldJoint](weldjoint.md)*

*Defined in [joint/index.d.ts:550](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L550)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](../interfaces/weldjointdef.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

\+ **new WeldJoint**(`def`: [WeldJointOpt](../interfaces/weldjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[WeldJoint](weldjoint.md)*

*Defined in [joint/index.d.ts:552](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L552)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](../interfaces/weldjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"weld-joint"*

*Defined in [joint/index.d.ts:550](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L550)*

## Methods

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [joint/index.d.ts:581](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L581)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [joint/index.d.ts:579](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L579)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:575](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L575)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:576](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L576)*

**Returns:** *[Vec2](vec2.md)*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [joint/index.d.ts:577](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L577)*

**Returns:** *number*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:580](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L580)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [joint/index.d.ts:578](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L578)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*
