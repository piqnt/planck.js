[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJoint](prismaticjoint.md)

# Class: PrismaticJoint

## Hierarchy

* any

  ↳ **PrismaticJoint**

## Callable

▸ **PrismaticJoint**(`def`: [PrismaticJointDef](../interfaces/prismaticjointdef.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:303](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L303)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

▸ **PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:304](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L304)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](../interfaces/prismaticjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

## Index

### Constructors

* [constructor](prismaticjoint.md#constructor)

### Properties

* [TYPE](prismaticjoint.md#static-type)

### Methods

* [enableLimit](prismaticjoint.md#enablelimit)
* [enableMotor](prismaticjoint.md#enablemotor)
* [getJointSpeed](prismaticjoint.md#getjointspeed)
* [getJointTranslation](prismaticjoint.md#getjointtranslation)
* [getLocalAnchorA](prismaticjoint.md#getlocalanchora)
* [getLocalAnchorB](prismaticjoint.md#getlocalanchorb)
* [getLocalAxisA](prismaticjoint.md#getlocalaxisa)
* [getLowerLimit](prismaticjoint.md#getlowerlimit)
* [getMotorForce](prismaticjoint.md#getmotorforce)
* [getMotorSpeed](prismaticjoint.md#getmotorspeed)
* [getReferenceAngle](prismaticjoint.md#getreferenceangle)
* [getUpperLimit](prismaticjoint.md#getupperlimit)
* [isLimitEnabled](prismaticjoint.md#islimitenabled)
* [isMotorEnabled](prismaticjoint.md#ismotorenabled)
* [setLimits](prismaticjoint.md#setlimits)
* [setMaxMotorForce](prismaticjoint.md#setmaxmotorforce)
* [setMotorSpeed](prismaticjoint.md#setmotorspeed)

## Constructors

###  constructor

\+ **new PrismaticJoint**(`def`: [PrismaticJointDef](../interfaces/prismaticjointdef.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:306](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L306)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:308](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L308)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](../interfaces/prismaticjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"prismatic-joint"*

*Defined in [joint/index.d.ts:306](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L306)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:349](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L349)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:354](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L354)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [joint/index.d.ts:347](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L347)*

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [joint/index.d.ts:346](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L346)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:342](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L342)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:343](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L343)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:344](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L344)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [joint/index.d.ts:350](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L350)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:358](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L358)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:357](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L357)*

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [joint/index.d.ts:345](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L345)*

**Returns:** *number*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [joint/index.d.ts:351](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L351)*

**Returns:** *number*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [joint/index.d.ts:348](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L348)*

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:353](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L353)*

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [joint/index.d.ts:352](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L352)*

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorForce

▸ **setMaxMotorForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:356](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L356)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:355](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L355)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*
