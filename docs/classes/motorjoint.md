[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJoint](motorjoint.md)

# Class: MotorJoint

## Hierarchy

* any

  ↳ **MotorJoint**

## Callable

▸ **MotorJoint**(`def`: [MotorJointDef](../interfaces/motorjointdef.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:206](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](../interfaces/motorjointdef.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

▸ **MotorJoint**(`def`: [MotorJointOpt](../interfaces/motorjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:207](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](../interfaces/motorjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

## Index

### Constructors

* [constructor](motorjoint.md#constructor)

### Properties

* [TYPE](motorjoint.md#static-type)

### Methods

* [getAngularOffset](motorjoint.md#getangularoffset)
* [getCorrectionFactor](motorjoint.md#getcorrectionfactor)
* [getLinearOffset](motorjoint.md#getlinearoffset)
* [getMaxForce](motorjoint.md#getmaxforce)
* [getMaxTorque](motorjoint.md#getmaxtorque)
* [setAngularOffset](motorjoint.md#setangularoffset)
* [setCorrectionFactor](motorjoint.md#setcorrectionfactor)
* [setLinearOffset](motorjoint.md#setlinearoffset)
* [setMaxForce](motorjoint.md#setmaxforce)
* [setMaxTorque](motorjoint.md#setmaxtorque)

## Constructors

###  constructor

\+ **new MotorJoint**(`def`: [MotorJointDef](../interfaces/motorjointdef.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:209](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L209)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](../interfaces/motorjointdef.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

\+ **new MotorJoint**(`def`: [MotorJointOpt](../interfaces/motorjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:211](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](../interfaces/motorjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"motor-joint"*

*Defined in [joint/index.d.ts:209](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L209)*

## Methods

###  getAngularOffset

▸ **getAngularOffset**(): *number*

*Defined in [joint/index.d.ts:245](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L245)*

**Returns:** *number*

___

###  getCorrectionFactor

▸ **getCorrectionFactor**(): *number*

*Defined in [joint/index.d.ts:241](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L241)*

**Returns:** *number*

___

###  getLinearOffset

▸ **getLinearOffset**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:243](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L243)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [joint/index.d.ts:237](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L237)*

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [joint/index.d.ts:239](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L239)*

**Returns:** *number*

___

###  setAngularOffset

▸ **setAngularOffset**(`angularOffset`: number): *void*

*Defined in [joint/index.d.ts:244](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`angularOffset` | number |

**Returns:** *void*

___

###  setCorrectionFactor

▸ **setCorrectionFactor**(`factor`: number): *void*

*Defined in [joint/index.d.ts:240](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`factor` | number |

**Returns:** *void*

___

###  setLinearOffset

▸ **setLinearOffset**(`linearOffset`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:242](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`linearOffset` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:236](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:238](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*
