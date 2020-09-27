[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MouseJoint](mousejoint.md)

# Class: MouseJoint

## Hierarchy

* any

  ↳ **MouseJoint**

## Callable

▸ **MouseJoint**(`def`: [MouseJointDef](../interfaces/mousejointdef.md)): *[MouseJoint](mousejoint.md)*

*Defined in [joint/index.d.ts:258](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](../interfaces/mousejointdef.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

▸ **MouseJoint**(`def`: [MouseJointOpt](../interfaces/mousejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `target`: [Vec2](vec2.md)): *[MouseJoint](mousejoint.md)*

*Defined in [joint/index.d.ts:259](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L259)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](../interfaces/mousejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`target` | [Vec2](vec2.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

## Index

### Constructors

* [constructor](mousejoint.md#constructor)

### Properties

* [TYPE](mousejoint.md#static-type)

### Methods

* [getDampingRatio](mousejoint.md#getdampingratio)
* [getFrequency](mousejoint.md#getfrequency)
* [getMaxForce](mousejoint.md#getmaxforce)
* [getTarget](mousejoint.md#gettarget)
* [setDampingRatio](mousejoint.md#setdampingratio)
* [setFrequency](mousejoint.md#setfrequency)
* [setMaxForce](mousejoint.md#setmaxforce)
* [setTarget](mousejoint.md#settarget)

## Constructors

###  constructor

\+ **new MouseJoint**(`def`: [MouseJointDef](../interfaces/mousejointdef.md)): *[MouseJoint](mousejoint.md)*

*Defined in [joint/index.d.ts:261](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](../interfaces/mousejointdef.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

\+ **new MouseJoint**(`def`: [MouseJointOpt](../interfaces/mousejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `target`: [Vec2](vec2.md)): *[MouseJoint](mousejoint.md)*

*Defined in [joint/index.d.ts:263](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](../interfaces/mousejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`target` | [Vec2](vec2.md) |

**Returns:** *[MouseJoint](mousejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"mouse-joint"*

*Defined in [joint/index.d.ts:261](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L261)*

## Methods

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [joint/index.d.ts:290](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L290)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [joint/index.d.ts:288](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L288)*

**Returns:** *number*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [joint/index.d.ts:286](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L286)*

**Returns:** *number*

___

###  getTarget

▸ **getTarget**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:284](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L284)*

**Returns:** *[Vec2](vec2.md)*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:289](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [joint/index.d.ts:287](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L287)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:285](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L285)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setTarget

▸ **setTarget**(`target`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:283](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L283)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | [Vec2](vec2.md) |

**Returns:** *void*
