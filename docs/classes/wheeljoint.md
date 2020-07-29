[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WheelJoint](wheeljoint.md)

# Class: WheelJoint

## Hierarchy

* any

  ↳ **WheelJoint**

## Callable

▸ **WheelJoint**(`def`: [WheelJointDef](../interfaces/wheeljointdef.md)): *[WheelJoint](wheeljoint.md)*

*Defined in [joint/index.d.ts:596](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L596)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointDef](../interfaces/wheeljointdef.md) |

**Returns:** *[WheelJoint](wheeljoint.md)*

▸ **WheelJoint**(`def`: [WheelJointOpt](../interfaces/wheeljointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[WheelJoint](wheeljoint.md)*

*Defined in [joint/index.d.ts:597](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L597)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointOpt](../interfaces/wheeljointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[WheelJoint](wheeljoint.md)*

## Index

### Constructors

* [constructor](wheeljoint.md#constructor)

### Properties

* [m_bias](wheeljoint.md#m_bias)
* [m_dampingRatio](wheeljoint.md#m_dampingratio)
* [m_enableMotor](wheeljoint.md#m_enablemotor)
* [m_frequencyHz](wheeljoint.md#m_frequencyhz)
* [m_gamma](wheeljoint.md#m_gamma)
* [m_impulse](wheeljoint.md#m_impulse)
* [m_localAnchorA](wheeljoint.md#m_localanchora)
* [m_localAnchorB](wheeljoint.md#m_localanchorb)
* [m_localXAxisA](wheeljoint.md#m_localxaxisa)
* [m_localYAxisA](wheeljoint.md#m_localyaxisa)
* [m_mass](wheeljoint.md#m_mass)
* [m_maxMotorTorque](wheeljoint.md#m_maxmotortorque)
* [m_motorImpulse](wheeljoint.md#m_motorimpulse)
* [m_motorMass](wheeljoint.md#m_motormass)
* [m_motorSpeed](wheeljoint.md#m_motorspeed)
* [m_springImpulse](wheeljoint.md#m_springimpulse)
* [m_springMass](wheeljoint.md#m_springmass)
* [m_type](wheeljoint.md#m_type)
* [TYPE](wheeljoint.md#static-type)

### Methods

* [enableMotor](wheeljoint.md#enablemotor)
* [getJointSpeed](wheeljoint.md#getjointspeed)
* [getJointTranslation](wheeljoint.md#getjointtranslation)
* [getLocalAnchorA](wheeljoint.md#getlocalanchora)
* [getLocalAnchorB](wheeljoint.md#getlocalanchorb)
* [getLocalAxisA](wheeljoint.md#getlocalaxisa)
* [getMaxMotorTorque](wheeljoint.md#getmaxmotortorque)
* [getMotorSpeed](wheeljoint.md#getmotorspeed)
* [getMotorTorque](wheeljoint.md#getmotortorque)
* [getSpringDampingRatio](wheeljoint.md#getspringdampingratio)
* [getSpringFrequencyHz](wheeljoint.md#getspringfrequencyhz)
* [isMotorEnabled](wheeljoint.md#ismotorenabled)
* [setMaxMotorTorque](wheeljoint.md#setmaxmotortorque)
* [setMotorSpeed](wheeljoint.md#setmotorspeed)
* [setSpringDampingRatio](wheeljoint.md#setspringdampingratio)
* [setSpringFrequencyHz](wheeljoint.md#setspringfrequencyhz)

## Constructors

###  constructor

\+ **new WheelJoint**(`def`: [WheelJointDef](../interfaces/wheeljointdef.md)): *[WheelJoint](wheeljoint.md)*

*Defined in [joint/index.d.ts:599](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L599)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointDef](../interfaces/wheeljointdef.md) |

**Returns:** *[WheelJoint](wheeljoint.md)*

\+ **new WheelJoint**(`def`: [WheelJointOpt](../interfaces/wheeljointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[WheelJoint](wheeljoint.md)*

*Defined in [joint/index.d.ts:601](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L601)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointOpt](../interfaces/wheeljointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |
`axis` | [Vec2](vec2.md) |

**Returns:** *[WheelJoint](wheeljoint.md)*

## Properties

###  m_bias

• **m_bias**: *number*

*Defined in [joint/index.d.ts:620](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L620)*

___

###  m_dampingRatio

• **m_dampingRatio**: *number*

*Defined in [joint/index.d.ts:619](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L619)*

___

###  m_enableMotor

• **m_enableMotor**: *boolean*

*Defined in [joint/index.d.ts:617](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L617)*

___

###  m_frequencyHz

• **m_frequencyHz**: *number*

*Defined in [joint/index.d.ts:618](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L618)*

___

###  m_gamma

• **m_gamma**: *number*

*Defined in [joint/index.d.ts:621](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L621)*

___

###  m_impulse

• **m_impulse**: *number*

*Defined in [joint/index.d.ts:610](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L610)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:605](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L605)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:606](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L606)*

___

###  m_localXAxisA

• **m_localXAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:607](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L607)*

___

###  m_localYAxisA

• **m_localYAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:608](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L608)*

___

###  m_mass

• **m_mass**: *number*

*Defined in [joint/index.d.ts:609](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L609)*

___

###  m_maxMotorTorque

• **m_maxMotorTorque**: *number*

*Defined in [joint/index.d.ts:615](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L615)*

___

###  m_motorImpulse

• **m_motorImpulse**: *number*

*Defined in [joint/index.d.ts:612](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L612)*

___

###  m_motorMass

• **m_motorMass**: *number*

*Defined in [joint/index.d.ts:611](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L611)*

___

###  m_motorSpeed

• **m_motorSpeed**: *number*

*Defined in [joint/index.d.ts:616](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L616)*

___

###  m_springImpulse

• **m_springImpulse**: *number*

*Defined in [joint/index.d.ts:614](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L614)*

___

###  m_springMass

• **m_springMass**: *number*

*Defined in [joint/index.d.ts:613](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L613)*

___

###  m_type

• **m_type**: *"wheel-joint"*

*Defined in [joint/index.d.ts:604](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L604)*

___

### `Static` TYPE

▪ **TYPE**: *"wheel-joint"*

*Defined in [joint/index.d.ts:599](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L599)*

## Methods

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:642](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L642)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [joint/index.d.ts:640](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L640)*

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [joint/index.d.ts:639](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L639)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:636](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L636)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:637](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L637)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:638](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L638)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [joint/index.d.ts:646](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L646)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:644](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L644)*

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:647](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L647)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getSpringDampingRatio

▸ **getSpringDampingRatio**(): *number*

*Defined in [joint/index.d.ts:651](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L651)*

**Returns:** *number*

___

###  getSpringFrequencyHz

▸ **getSpringFrequencyHz**(): *number*

*Defined in [joint/index.d.ts:649](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L649)*

**Returns:** *number*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:641](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L641)*

**Returns:** *boolean*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:645](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L645)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:643](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L643)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  setSpringDampingRatio

▸ **setSpringDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:650](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L650)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setSpringFrequencyHz

▸ **setSpringFrequencyHz**(`hz`: number): *void*

*Defined in [joint/index.d.ts:648](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L648)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*
