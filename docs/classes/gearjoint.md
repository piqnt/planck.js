[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJoint](gearjoint.md)

# Class: GearJoint

## Hierarchy

* any

  ↳ **GearJoint**

## Callable

▸ **GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:157](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

▸ **GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:158](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L158)*

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

* [TYPE](gearjoint.md#static-type)

### Methods

* [getJoint1](gearjoint.md#getjoint1)
* [getJoint2](gearjoint.md#getjoint2)
* [getRatio](gearjoint.md#getratio)
* [setRatio](gearjoint.md#setratio)

## Constructors

###  constructor

\+ **new GearJoint**(`def`: [GearJointDef](../interfaces/gearjointdef.md)): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:160](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](../interfaces/gearjointdef.md) |

**Returns:** *[GearJoint](gearjoint.md)*

\+ **new GearJoint**(`def`: [GearJointOpt](../interfaces/gearjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `joint1`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `joint2`: [RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md), `ratio?`: number): *[GearJoint](gearjoint.md)*

*Defined in [joint/index.d.ts:162](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L162)*

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

### `Static` TYPE

▪ **TYPE**: *"gear-joint"*

*Defined in [joint/index.d.ts:160](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L160)*

## Methods

###  getJoint1

▸ **getJoint1**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:191](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L191)*

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getJoint2

▸ **getJoint2**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:192](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L192)*

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [joint/index.d.ts:194](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L194)*

**Returns:** *number*

___

###  setRatio

▸ **setRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:193](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*
