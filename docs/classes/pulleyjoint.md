[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PulleyJoint](pulleyjoint.md)

# Class: PulleyJoint

## Hierarchy

* any

  ↳ **PulleyJoint**

## Callable

▸ **PulleyJoint**(`def`: [PulleyJointDef](../interfaces/pulleyjointdef.md)): *[PulleyJoint](pulleyjoint.md)*

*Defined in [joint/index.d.ts:377](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L377)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

▸ **PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Defined in [joint/index.d.ts:378](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L378)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](../interfaces/pulleyjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`groundA` | [Vec2](vec2.md) |
`groundB` | [Vec2](vec2.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |
`ratio` | number |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

## Index

### Constructors

* [constructor](pulleyjoint.md#constructor)

### Properties

* [MIN_PULLEY_LENGTH](pulleyjoint.md#static-min_pulley_length)
* [TYPE](pulleyjoint.md#static-type)

### Methods

* [getCurrentLengthA](pulleyjoint.md#getcurrentlengtha)
* [getCurrentLengthB](pulleyjoint.md#getcurrentlengthb)
* [getGroundAnchorA](pulleyjoint.md#getgroundanchora)
* [getGroundAnchorB](pulleyjoint.md#getgroundanchorb)
* [getLengthA](pulleyjoint.md#getlengtha)
* [getLengthB](pulleyjoint.md#getlengthb)
* [getRatio](pulleyjoint.md#getratio)

## Constructors

###  constructor

\+ **new PulleyJoint**(`def`: [PulleyJointDef](../interfaces/pulleyjointdef.md)): *[PulleyJoint](pulleyjoint.md)*

*Defined in [joint/index.d.ts:381](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L381)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](../interfaces/pulleyjointdef.md) |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

\+ **new PulleyJoint**(`def`: [PulleyJointOpt](../interfaces/pulleyjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `groundA`: [Vec2](vec2.md), `groundB`: [Vec2](vec2.md), `anchorA`: [Vec2](vec2.md), `anchorB`: [Vec2](vec2.md), `ratio`: number): *[PulleyJoint](pulleyjoint.md)*

*Defined in [joint/index.d.ts:383](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L383)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](../interfaces/pulleyjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`groundA` | [Vec2](vec2.md) |
`groundB` | [Vec2](vec2.md) |
`anchorA` | [Vec2](vec2.md) |
`anchorB` | [Vec2](vec2.md) |
`ratio` | number |

**Returns:** *[PulleyJoint](pulleyjoint.md)*

## Properties

### `Static` MIN_PULLEY_LENGTH

▪ **MIN_PULLEY_LENGTH**: *number*

*Defined in [joint/index.d.ts:381](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L381)*

___

### `Static` TYPE

▪ **TYPE**: *"pulley-joint"*

*Defined in [joint/index.d.ts:380](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L380)*

## Methods

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

*Defined in [joint/index.d.ts:414](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L414)*

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

*Defined in [joint/index.d.ts:415](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L415)*

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:409](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L409)*

**Returns:** *[Vec2](vec2.md)*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:410](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L410)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLengthA

▸ **getLengthA**(): *number*

*Defined in [joint/index.d.ts:411](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L411)*

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

*Defined in [joint/index.d.ts:412](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L412)*

**Returns:** *number*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [joint/index.d.ts:413](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L413)*

**Returns:** *number*
