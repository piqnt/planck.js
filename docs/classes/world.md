[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [World](world.md)

# Class: World

## Hierarchy

* **World**

## Callable

▸ **World**(`def?`: [WorldDef](../interfaces/worlddef.md)): *[World](world.md)*

*Defined in [index.d.ts:433](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L433)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) |

**Returns:** *[World](world.md)*

## Index

### Constructors

* [constructor](world.md#constructor)

### Methods

* [clearForces](world.md#clearforces)
* [createBody](world.md#createbody)
* [createDynamicBody](world.md#createdynamicbody)
* [createJoint](world.md#createjoint)
* [createKinematicBody](world.md#createkinematicbody)
* [destroyBody](world.md#destroybody)
* [destroyJoint](world.md#destroyjoint)
* [getAllowSleeping](world.md#getallowsleeping)
* [getAutoClearForces](world.md#getautoclearforces)
* [getBodyCount](world.md#getbodycount)
* [getBodyList](world.md#getbodylist)
* [getContactCount](world.md#getcontactcount)
* [getContactList](world.md#getcontactlist)
* [getContinuousPhysics](world.md#getcontinuousphysics)
* [getGravity](world.md#getgravity)
* [getJointCount](world.md#getjointcount)
* [getJointList](world.md#getjointlist)
* [getProxyCount](world.md#getproxycount)
* [getSubStepping](world.md#getsubstepping)
* [getTreeBalance](world.md#gettreebalance)
* [getTreeHeight](world.md#gettreeheight)
* [getTreeQuality](world.md#gettreequality)
* [getWarmStarting](world.md#getwarmstarting)
* [isLocked](world.md#islocked)
* [off](world.md#off)
* [on](world.md#on)
* [publish](world.md#publish)
* [queryAABB](world.md#queryaabb)
* [rayCast](world.md#raycast)
* [setAllowSleeping](world.md#setallowsleeping)
* [setAutoClearForces](world.md#setautoclearforces)
* [setContinuousPhysics](world.md#setcontinuousphysics)
* [setGravity](world.md#setgravity)
* [setSubStepping](world.md#setsubstepping)
* [setWarmStarting](world.md#setwarmstarting)
* [shiftOrigin](world.md#shiftorigin)
* [step](world.md#step)

## Constructors

###  constructor

\+ **new World**(`def?`: [WorldDef](../interfaces/worlddef.md)): *[World](world.md)*

*Defined in [index.d.ts:434](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L434)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) |

**Returns:** *[World](world.md)*

## Methods

###  clearForces

▸ **clearForces**(): *void*

*Defined in [index.d.ts:480](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L480)*

**Returns:** *void*

___

###  createBody

▸ **createBody**(`def`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [index.d.ts:488](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L488)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [index.d.ts:489](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L489)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createBody**(): *[Body](body.md)*

*Defined in [index.d.ts:490](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L490)*

**Returns:** *[Body](body.md)*

___

###  createDynamicBody

▸ **createDynamicBody**(`def`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [index.d.ts:491](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L491)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [index.d.ts:492](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L492)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(): *[Body](body.md)*

*Defined in [index.d.ts:493](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L493)*

**Returns:** *[Body](body.md)*

___

###  createJoint

▸ **createJoint**‹**T**›(`joint`: T): *T | null*

*Defined in [index.d.ts:498](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L498)*

**Type parameters:**

▪ **T**: *[Joint](joint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | T |

**Returns:** *T | null*

___

###  createKinematicBody

▸ **createKinematicBody**(`def`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [index.d.ts:494](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L494)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [index.d.ts:495](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L495)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(): *[Body](body.md)*

*Defined in [index.d.ts:496](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L496)*

**Returns:** *[Body](body.md)*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](body.md)): *boolean*

*Defined in [index.d.ts:497](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L497)*

**Parameters:**

Name | Type |
------ | ------ |
`b` | [Body](body.md) |

**Returns:** *boolean*

___

###  destroyJoint

▸ **destroyJoint**(`joint`: [Joint](joint.md)): *void*

*Defined in [index.d.ts:499](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L499)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *void*

___

###  getAllowSleeping

▸ **getAllowSleeping**(): *boolean*

*Defined in [index.d.ts:471](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L471)*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

*Defined in [index.d.ts:479](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L479)*

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

*Defined in [index.d.ts:464](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L464)*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](body.md) | null*

*Defined in [index.d.ts:461](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L461)*

**Returns:** *[Body](body.md) | null*

___

###  getContactCount

▸ **getContactCount**(): *number*

*Defined in [index.d.ts:466](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L466)*

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](contact.md) | null*

*Defined in [index.d.ts:463](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L463)*

**Returns:** *[Contact](contact.md) | null*

___

###  getContinuousPhysics

▸ **getContinuousPhysics**(): *boolean*

*Defined in [index.d.ts:475](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L475)*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *[Vec2](vec2.md)*

*Defined in [index.d.ts:468](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L468)*

**Returns:** *[Vec2](vec2.md)*

___

###  getJointCount

▸ **getJointCount**(): *number*

*Defined in [index.d.ts:465](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L465)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](joint.md) | null*

*Defined in [index.d.ts:462](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L462)*

**Returns:** *[Joint](joint.md) | null*

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [index.d.ts:483](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L483)*

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

*Defined in [index.d.ts:477](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L477)*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [index.d.ts:485](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L485)*

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [index.d.ts:484](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L484)*

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [index.d.ts:486](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L486)*

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

*Defined in [index.d.ts:473](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L473)*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

*Defined in [index.d.ts:469](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L469)*

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:516](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L516)*

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "end-contact", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:517](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L517)*

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "pre-solve", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:518](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L518)*

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `oldManifold`: [Manifold](../interfaces/manifold.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`oldManifold` | [Manifold](../interfaces/manifold.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "post-solve", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:519](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L519)*

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `impulse`: [ContactImpulse](contactimpulse.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`impulse` | [ContactImpulse](contactimpulse.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "remove-body", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:520](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L520)*

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: [Body](body.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "remove-joint", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:521](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L521)*

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: [Joint](joint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "remove-fixture", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:522](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L522)*

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *[World](world.md)*

___

###  on

▸ **on**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:509](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L509)*

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "end-contact", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:510](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L510)*

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "pre-solve", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:511](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L511)*

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `oldManifold`: [Manifold](../interfaces/manifold.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`oldManifold` | [Manifold](../interfaces/manifold.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "post-solve", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:512](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L512)*

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `impulse`: [ContactImpulse](contactimpulse.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`impulse` | [ContactImpulse](contactimpulse.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "remove-body", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:513](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L513)*

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: [Body](body.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "remove-joint", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:514](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L514)*

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: [Joint](joint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "remove-fixture", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:515](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L515)*

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *[World](world.md)*

___

###  publish

▸ **publish**(`name`: string, `arg1`: any, `arg2`: any, `arg3`: any): *number*

*Defined in [index.d.ts:524](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L524)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`arg1` | any |
`arg2` | any |
`arg3` | any |

**Returns:** *number*

___

###  queryAABB

▸ **queryAABB**(`aabb`: [AABB](aabb.md), `queryCallback`: function): *void*

*Defined in [index.d.ts:481](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L481)*

**Parameters:**

▪ **aabb**: *[AABB](aabb.md)*

▪ **queryCallback**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`point1`: [Vec2](vec2.md), `point2`: [Vec2](vec2.md), `reportFixtureCallback`: function): *void*

*Defined in [index.d.ts:482](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L482)*

**Parameters:**

▪ **point1**: *[Vec2](vec2.md)*

▪ **point2**: *[Vec2](vec2.md)*

▪ **reportFixtureCallback**: *function*

▸ (`fixture`: [Fixture](fixture.md), `point`: [Vec2](vec2.md), `normal`: [Vec2](vec2.md), `fraction`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |
`point` | [Vec2](vec2.md) |
`normal` | [Vec2](vec2.md) |
`fraction` | number |

**Returns:** *void*

___

###  setAllowSleeping

▸ **setAllowSleeping**(`flag`: boolean): *void*

*Defined in [index.d.ts:470](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L470)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

*Defined in [index.d.ts:478](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L478)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

*Defined in [index.d.ts:474](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L474)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: [Vec2](vec2.md)): *void*

*Defined in [index.d.ts:467](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L467)*

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

*Defined in [index.d.ts:476](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L476)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

*Defined in [index.d.ts:472](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L472)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [index.d.ts:487](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L487)*

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  step

▸ **step**(`timeStep`: number, `velocityIterations?`: number, `positionIterations?`: number): *void*

*Defined in [index.d.ts:500](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L500)*

**Parameters:**

Name | Type |
------ | ------ |
`timeStep` | number |
`velocityIterations?` | number |
`positionIterations?` | number |

**Returns:** *void*
