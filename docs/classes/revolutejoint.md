[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [RevoluteJoint](revolutejoint.md)

# Class: RevoluteJoint

## Hierarchy

* any

  ↳ **RevoluteJoint**

## Callable

▸ **RevoluteJoint**(`def`: [RevoluteJointDef](../interfaces/revolutejointdef.md)): *[RevoluteJoint](revolutejoint.md)*

*Defined in [joint/index.d.ts:432](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L432)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](../interfaces/revolutejointdef.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

▸ **RevoluteJoint**(`def`: [RevoluteJointOpt](../interfaces/revolutejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RevoluteJoint](revolutejoint.md)*

*Defined in [joint/index.d.ts:433](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L433)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](../interfaces/revolutejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

## Index

### Constructors

* [constructor](revolutejoint.md#constructor)

### Properties

* [TYPE](revolutejoint.md#static-type)

### Methods

* [enableLimit](revolutejoint.md#enablelimit)
* [enableMotor](revolutejoint.md#enablemotor)
* [getJointAngle](revolutejoint.md#getjointangle)
* [getJointSpeed](revolutejoint.md#getjointspeed)
* [getLocalAnchorA](revolutejoint.md#getlocalanchora)
* [getLocalAnchorB](revolutejoint.md#getlocalanchorb)
* [getLowerLimit](revolutejoint.md#getlowerlimit)
* [getMaxMotorTorque](revolutejoint.md#getmaxmotortorque)
* [getMotorSpeed](revolutejoint.md#getmotorspeed)
* [getMotorTorque](revolutejoint.md#getmotortorque)
* [getReferenceAngle](revolutejoint.md#getreferenceangle)
* [getUpperLimit](revolutejoint.md#getupperlimit)
* [isLimitEnabled](revolutejoint.md#islimitenabled)
* [isMotorEnabled](revolutejoint.md#ismotorenabled)
* [setLimits](revolutejoint.md#setlimits)
* [setMaxMotorTorque](revolutejoint.md#setmaxmotortorque)
* [setMotorSpeed](revolutejoint.md#setmotorspeed)

## Constructors

###  constructor

\+ **new RevoluteJoint**(`def`: [RevoluteJointDef](../interfaces/revolutejointdef.md)): *[RevoluteJoint](revolutejoint.md)*

*Defined in [joint/index.d.ts:435](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L435)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](../interfaces/revolutejointdef.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

\+ **new RevoluteJoint**(`def`: [RevoluteJointOpt](../interfaces/revolutejointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[RevoluteJoint](revolutejoint.md)*

*Defined in [joint/index.d.ts:437](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L437)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](../interfaces/revolutejointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[RevoluteJoint](revolutejoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"revolute-joint"*

*Defined in [joint/index.d.ts:435](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L435)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:481](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L481)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:474](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L474)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  getJointAngle

▸ **getJointAngle**(): *number*

*Defined in [joint/index.d.ts:471](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L471)*

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [joint/index.d.ts:472](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L472)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:468](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L468)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:469](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L469)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [joint/index.d.ts:482](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L482)*

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [joint/index.d.ts:479](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L479)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:477](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L477)*

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:475](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L475)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [joint/index.d.ts:470](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L470)*

**Returns:** *number*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [joint/index.d.ts:483](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L483)*

**Returns:** *number*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [joint/index.d.ts:480](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L480)*

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:473](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L473)*

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [joint/index.d.ts:484](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L484)*

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:478](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L478)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:476](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L476)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*
