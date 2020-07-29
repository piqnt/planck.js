[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJoint](gearjoint.md)

# Class: GearJoint

## Hierarchy

* any

  ↳ **GearJoint**

## Callable

▸ **GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:157](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

▸ **GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:158](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L158)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointOpt](../interfaces/gearjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`joint1` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`joint2` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`ratio?` | number |

**Returns:** *[GearJoint](gearjoint.md)*

## Index

### Constructors

* [constructor](gearjoint.md#constructor)

### Properties

* [m_bodyC](gearjoint.md#m_bodyc)
* [m_bodyD](gearjoint.md#m_bodyd)
* [m_constant](gearjoint.md#m_constant)
* [m_impulse](gearjoint.md#m_impulse)
* [m_joint1](gearjoint.md#m_joint1)
* [m_joint2](gearjoint.md#m_joint2)
* [m_localAnchorA](gearjoint.md#m_localanchora)
* [m_localAnchorB](gearjoint.md#m_localanchorb)
* [m_localAnchorC](gearjoint.md#m_localanchorc)
* [m_localAnchorD](gearjoint.md#m_localanchord)
* [m_localAxisC](gearjoint.md#m_localaxisc)
* [m_localAxisD](gearjoint.md#m_localaxisd)
* [m_ratio](gearjoint.md#m_ratio)
* [m_referenceAngleA](gearjoint.md#m_referenceanglea)
* [m_referenceAngleB](gearjoint.md#m_referenceangleb)
* [m_type](gearjoint.md#m_type)
* [m_type1](gearjoint.md#m_type1)
* [m_type2](gearjoint.md#m_type2)
* [TYPE](gearjoint.md#static-type)

### Methods

* [getJoint1](gearjoint.md#getjoint1)
* [getJoint2](gearjoint.md#getjoint2)
* [getRatio](gearjoint.md#getratio)
* [setRatio](gearjoint.md#setratio)

## Constructors

###  constructor

\+ **new GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:160](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

\+ **new GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:162](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointOpt](../interfaces/gearjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`joint1` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`joint2` | [RevoluteJoint](revolutejoint.md) &#124; [PrismaticJoint](prismaticjoint.md) |
`ratio?` | number |

**Returns:** *[GearJoint](gearjoint.md)*

## Properties

###  m_bodyC

• **m_bodyC**: *[Body](body.md)*

*Defined in [joint/index.d.ts:170](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L170)*

___

###  m_bodyD

• **m_bodyD**: *[Body](body.md)*

*Defined in [joint/index.d.ts:175](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L175)*

___

###  m_constant

• **m_constant**: *number*

*Defined in [joint/index.d.ts:181](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L181)*

___

###  m_impulse

• **m_impulse**: *number*

*Defined in [joint/index.d.ts:182](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L182)*

___

###  m_joint1

• **m_joint1**: *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:166](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L166)*

___

###  m_joint2

• **m_joint2**: *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:167](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L167)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:172](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L172)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:177](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L177)*

___

###  m_localAnchorC

• **m_localAnchorC**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:171](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L171)*

___

###  m_localAnchorD

• **m_localAnchorD**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:176](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L176)*

___

###  m_localAxisC

• **m_localAxisC**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:174](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L174)*

___

###  m_localAxisD

• **m_localAxisD**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:179](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L179)*

___

###  m_ratio

• **m_ratio**: *number*

*Defined in [joint/index.d.ts:180](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L180)*

___

###  m_referenceAngleA

• **m_referenceAngleA**: *number*

*Defined in [joint/index.d.ts:173](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L173)*

___

###  m_referenceAngleB

• **m_referenceAngleB**: *number*

*Defined in [joint/index.d.ts:178](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L178)*

___

###  m_type

• **m_type**: *"gear-joint"*

*Defined in [joint/index.d.ts:165](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L165)*

___

###  m_type1

• **m_type1**: *"revolute-joint" | "prismatic-joint"*

*Defined in [joint/index.d.ts:168](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L168)*

___

###  m_type2

• **m_type2**: *"revolute-joint" | "prismatic-joint"*

*Defined in [joint/index.d.ts:169](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L169)*

___

### `Static` TYPE

▪ **TYPE**: *"gear-joint"*

*Defined in [joint/index.d.ts:160](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L160)*

## Methods

###  getJoint1

▸ **getJoint1**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:191](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L191)*

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getJoint2

▸ **getJoint2**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:192](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L192)*

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [joint/index.d.ts:194](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L194)*

**Returns:** *number*

___

###  setRatio

▸ **setRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:193](https://github.com/shakiba/planck.js/blob/b7f66f1/lib/joint/index.d.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*
