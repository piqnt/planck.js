[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [MotorJoint](motorjoint.md)

# Class: MotorJoint

## Hierarchy

* any

  ↳ **MotorJoint**

## Callable

▸ **MotorJoint**(`def`: [MotorJointDef](../interfaces/motorjointdef.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:206](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](../interfaces/motorjointdef.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

▸ **MotorJoint**(`def`: [MotorJointOpt](../interfaces/motorjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:207](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L207)*

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

* [m_angularImpulse](motorjoint.md#m_angularimpulse)
* [m_angularOffset](motorjoint.md#m_angularoffset)
* [m_correctionFactor](motorjoint.md#m_correctionfactor)
* [m_linearImpulse](motorjoint.md#m_linearimpulse)
* [m_linearOffset](motorjoint.md#m_linearoffset)
* [m_maxForce](motorjoint.md#m_maxforce)
* [m_maxTorque](motorjoint.md#m_maxtorque)
* [m_type](motorjoint.md#m_type)
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

*Defined in [joint/index.d.ts:209](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L209)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](../interfaces/motorjointdef.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

\+ **new MotorJoint**(`def`: [MotorJointOpt](../interfaces/motorjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md)): *[MotorJoint](motorjoint.md)*

*Defined in [joint/index.d.ts:211](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](../interfaces/motorjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |

**Returns:** *[MotorJoint](motorjoint.md)*

## Properties

###  m_angularImpulse

• **m_angularImpulse**: *number*

*Defined in [joint/index.d.ts:218](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L218)*

___

###  m_angularOffset

• **m_angularOffset**: *number*

*Defined in [joint/index.d.ts:216](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L216)*

___

###  m_correctionFactor

• **m_correctionFactor**: *number*

*Defined in [joint/index.d.ts:221](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L221)*

___

###  m_linearImpulse

• **m_linearImpulse**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:217](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L217)*

___

###  m_linearOffset

• **m_linearOffset**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:215](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L215)*

___

###  m_maxForce

• **m_maxForce**: *number*

*Defined in [joint/index.d.ts:219](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L219)*

___

###  m_maxTorque

• **m_maxTorque**: *number*

*Defined in [joint/index.d.ts:220](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L220)*

___

###  m_type

• **m_type**: *"motor-joint"*

*Defined in [joint/index.d.ts:214](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L214)*

___

### `Static` TYPE

▪ **TYPE**: *"motor-joint"*

*Defined in [joint/index.d.ts:209](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L209)*

## Methods

###  getAngularOffset

▸ **getAngularOffset**(): *number*

*Defined in [joint/index.d.ts:245](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L245)*

**Returns:** *number*

___

###  getCorrectionFactor

▸ **getCorrectionFactor**(): *number*

*Defined in [joint/index.d.ts:241](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L241)*

**Returns:** *number*

___

###  getLinearOffset

▸ **getLinearOffset**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:243](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L243)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [joint/index.d.ts:237](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L237)*

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [joint/index.d.ts:239](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L239)*

**Returns:** *number*

___

###  setAngularOffset

▸ **setAngularOffset**(`angularOffset`: number): *void*

*Defined in [joint/index.d.ts:244](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`angularOffset` | number |

**Returns:** *void*

___

###  setCorrectionFactor

▸ **setCorrectionFactor**(`factor`: number): *void*

*Defined in [joint/index.d.ts:240](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`factor` | number |

**Returns:** *void*

___

###  setLinearOffset

▸ **setLinearOffset**(`linearOffset`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:242](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`linearOffset` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:236](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:238](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*
