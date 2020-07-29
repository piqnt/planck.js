[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PrismaticJoint](prismaticjoint.md)

# Class: PrismaticJoint

## Hierarchy

* any

  ↳ **PrismaticJoint**

## Callable

▸ **PrismaticJoint**(`def`: [PrismaticJointDef](../interfaces/prismaticjointdef.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:303](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L303)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

▸ **PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:304](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L304)*

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

* [m_axis](prismaticjoint.md#m_axis)
* [m_enableLimit](prismaticjoint.md#m_enablelimit)
* [m_enableMotor](prismaticjoint.md#m_enablemotor)
* [m_impulse](prismaticjoint.md#m_impulse)
* [m_limitState](prismaticjoint.md#m_limitstate)
* [m_localAnchorA](prismaticjoint.md#m_localanchora)
* [m_localAnchorB](prismaticjoint.md#m_localanchorb)
* [m_localXAxisA](prismaticjoint.md#m_localxaxisa)
* [m_localYAxisA](prismaticjoint.md#m_localyaxisa)
* [m_lowerTranslation](prismaticjoint.md#m_lowertranslation)
* [m_maxMotorForce](prismaticjoint.md#m_maxmotorforce)
* [m_motorImpulse](prismaticjoint.md#m_motorimpulse)
* [m_motorMass](prismaticjoint.md#m_motormass)
* [m_motorSpeed](prismaticjoint.md#m_motorspeed)
* [m_perp](prismaticjoint.md#m_perp)
* [m_referenceAngle](prismaticjoint.md#m_referenceangle)
* [m_type](prismaticjoint.md#m_type)
* [m_upperTranslation](prismaticjoint.md#m_uppertranslation)
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

*Defined in [joint/index.d.ts:306](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L306)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](../interfaces/prismaticjointdef.md) |

**Returns:** *[PrismaticJoint](prismaticjoint.md)*

\+ **new PrismaticJoint**(`def`: [PrismaticJointOpt](../interfaces/prismaticjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md), `axis`: [Vec2](vec2.md)): *[PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:308](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L308)*

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

###  m_axis

• **m_axis**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:327](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L327)*

___

###  m_enableLimit

• **m_enableLimit**: *boolean*

*Defined in [joint/index.d.ts:324](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L324)*

___

###  m_enableMotor

• **m_enableMotor**: *boolean*

*Defined in [joint/index.d.ts:325](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L325)*

___

###  m_impulse

• **m_impulse**: *[Vec3](vec3.md)*

*Defined in [joint/index.d.ts:317](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L317)*

___

###  m_limitState

• **m_limitState**: *[LIMIT_STATE](../enums/limit_state.md)*

*Defined in [joint/index.d.ts:326](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L326)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:312](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L312)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:313](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L313)*

___

###  m_localXAxisA

• **m_localXAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:314](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L314)*

___

###  m_localYAxisA

• **m_localYAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:315](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L315)*

___

###  m_lowerTranslation

• **m_lowerTranslation**: *number*

*Defined in [joint/index.d.ts:320](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L320)*

___

###  m_maxMotorForce

• **m_maxMotorForce**: *number*

*Defined in [joint/index.d.ts:322](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L322)*

___

###  m_motorImpulse

• **m_motorImpulse**: *number*

*Defined in [joint/index.d.ts:319](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L319)*

___

###  m_motorMass

• **m_motorMass**: *number*

*Defined in [joint/index.d.ts:318](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L318)*

___

###  m_motorSpeed

• **m_motorSpeed**: *number*

*Defined in [joint/index.d.ts:323](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L323)*

___

###  m_perp

• **m_perp**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:328](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L328)*

___

###  m_referenceAngle

• **m_referenceAngle**: *number*

*Defined in [joint/index.d.ts:316](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L316)*

___

###  m_type

• **m_type**: *"prismatic-joint"*

*Defined in [joint/index.d.ts:311](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L311)*

___

###  m_upperTranslation

• **m_upperTranslation**: *number*

*Defined in [joint/index.d.ts:321](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L321)*

___

### `Static` TYPE

▪ **TYPE**: *"prismatic-joint"*

*Defined in [joint/index.d.ts:306](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L306)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:349](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L349)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:354](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L354)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [joint/index.d.ts:347](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L347)*

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [joint/index.d.ts:346](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L346)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:342](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L342)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:343](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L343)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:344](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L344)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [joint/index.d.ts:350](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L350)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:358](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L358)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:357](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L357)*

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [joint/index.d.ts:345](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L345)*

**Returns:** *number*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [joint/index.d.ts:351](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L351)*

**Returns:** *number*

___

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [joint/index.d.ts:348](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L348)*

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:353](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L353)*

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [joint/index.d.ts:352](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L352)*

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorForce

▸ **setMaxMotorForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:356](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L356)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:355](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L355)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*
