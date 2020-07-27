[API Doc](../README.md) › [World](world.md)

# Interface: World

## Hierarchy

* **World**

## Index

### Properties

* [_listeners](world.md#_listeners)
* [addPair](world.md#addpair)
* [m_allowSleep](world.md#m_allowsleep)
* [m_blockSolve](world.md#m_blocksolve)
* [m_bodyCount](world.md#m_bodycount)
* [m_bodyList](world.md#m_bodylist)
* [m_broadPhase](world.md#m_broadphase)
* [m_clearForces](world.md#m_clearforces)
* [m_contactCount](world.md#m_contactcount)
* [m_contactList](world.md#m_contactlist)
* [m_continuousPhysics](world.md#m_continuousphysics)
* [m_gravity](world.md#m_gravity)
* [m_jointCount](world.md#m_jointcount)
* [m_jointList](world.md#m_jointlist)
* [m_locked](world.md#m_locked)
* [m_newFixture](world.md#m_newfixture)
* [m_positionIterations](world.md#m_positioniterations)
* [m_solver](world.md#m_solver)
* [m_stepComplete](world.md#m_stepcomplete)
* [m_subStepping](world.md#m_substepping)
* [m_t](world.md#m_t)
* [m_velocityIterations](world.md#m_velocityiterations)
* [m_warmStarting](world.md#m_warmstarting)

### Methods

* [beginContact](world.md#begincontact)
* [clearForces](world.md#clearforces)
* [createBody](world.md#createbody)
* [createContact](world.md#private-createcontact)
* [createDynamicBody](world.md#createdynamicbody)
* [createJoint](world.md#createjoint)
* [createKinematicBody](world.md#createkinematicbody)
* [destroyBody](world.md#destroybody)
* [destroyContact](world.md#destroycontact)
* [destroyJoint](world.md#destroyjoint)
* [endContact](world.md#endcontact)
* [findNewContacts](world.md#findnewcontacts)
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
* [postSolve](world.md#postsolve)
* [preSolve](world.md#presolve)
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
* [updateContacts](world.md#updatecontacts)

## Properties

###  _listeners

• **_listeners**: *any*

*Defined in [index.d.ts:483](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L483)*

___

###  addPair

• **addPair**: *function*

*Defined in [index.d.ts:433](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L433)*

#### Type declaration:

▸ (`proxyA`: [FixtureProxy](fixtureproxy.md), `proxyB`: [FixtureProxy](fixtureproxy.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`proxyA` | [FixtureProxy](fixtureproxy.md) |
`proxyB` | [FixtureProxy](fixtureproxy.md) |

___

###  m_allowSleep

• **m_allowSleep**: *boolean*

*Defined in [index.d.ts:421](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L421)*

___

###  m_blockSolve

• **m_blockSolve**: *boolean*

*Defined in [index.d.ts:429](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L429)*

___

###  m_bodyCount

• **m_bodyCount**: *number*

*Defined in [index.d.ts:417](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L417)*

___

###  m_bodyList

• **m_bodyList**: *[Body](body.md) | null*

*Defined in [index.d.ts:416](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L416)*

___

###  m_broadPhase

• **m_broadPhase**: *[BroadPhase](../README.md#broadphase)*

*Defined in [index.d.ts:413](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L413)*

___

###  m_clearForces

• **m_clearForces**: *boolean*

*Defined in [index.d.ts:423](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L423)*

___

###  m_contactCount

• **m_contactCount**: *number*

*Defined in [index.d.ts:415](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L415)*

___

###  m_contactList

• **m_contactList**: *[Contact](contact.md) | null*

*Defined in [index.d.ts:414](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L414)*

___

###  m_continuousPhysics

• **m_continuousPhysics**: *boolean*

*Defined in [index.d.ts:427](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L427)*

___

###  m_gravity

• **m_gravity**: *[Vec2](vec2.md)*

*Defined in [index.d.ts:422](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L422)*

___

###  m_jointCount

• **m_jointCount**: *number*

*Defined in [index.d.ts:419](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L419)*

___

###  m_jointList

• **m_jointList**: *[Joint](joint.md) | null*

*Defined in [index.d.ts:418](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L418)*

___

###  m_locked

• **m_locked**: *boolean*

*Defined in [index.d.ts:425](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L425)*

___

###  m_newFixture

• **m_newFixture**: *boolean*

*Defined in [index.d.ts:424](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L424)*

___

###  m_positionIterations

• **m_positionIterations**: *number*

*Defined in [index.d.ts:431](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L431)*

___

###  m_solver

• **m_solver**: *[Solver](../README.md#solver)*

*Defined in [index.d.ts:412](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L412)*

___

###  m_stepComplete

• **m_stepComplete**: *boolean*

*Defined in [index.d.ts:420](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L420)*

___

###  m_subStepping

• **m_subStepping**: *boolean*

*Defined in [index.d.ts:428](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L428)*

___

###  m_t

• **m_t**: *number*

*Defined in [index.d.ts:432](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L432)*

___

###  m_velocityIterations

• **m_velocityIterations**: *number*

*Defined in [index.d.ts:430](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L430)*

___

###  m_warmStarting

• **m_warmStarting**: *boolean*

*Defined in [index.d.ts:426](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L426)*

## Methods

###  beginContact

▸ **beginContact**(`contact`: [Contact](contact.md)): *void*

*Defined in [index.d.ts:502](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L502)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *void*

___

###  clearForces

▸ **clearForces**(): *void*

*Defined in [index.d.ts:454](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L454)*

**Returns:** *void*

___

###  createBody

▸ **createBody**(`def`: [BodyDef](../README.md#bodydef)): *[Body](body.md)*

*Defined in [index.d.ts:462](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L462)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [BodyDef](../README.md#bodydef) |

**Returns:** *[Body](body.md)*

▸ **createBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [index.d.ts:463](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createBody**(): *[Body](body.md)*

*Defined in [index.d.ts:464](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L464)*

**Returns:** *[Body](body.md)*

___

### `Private` createContact

▸ **createContact**(`proxyA`: [FixtureProxy](fixtureproxy.md), `proxyB`: [FixtureProxy](fixtureproxy.md)): *void*

*Defined in [index.d.ts:479](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L479)*

**Parameters:**

Name | Type |
------ | ------ |
`proxyA` | [FixtureProxy](fixtureproxy.md) |
`proxyB` | [FixtureProxy](fixtureproxy.md) |

**Returns:** *void*

___

###  createDynamicBody

▸ **createDynamicBody**(`def`: [BodyDef](../README.md#bodydef)): *[Body](body.md)*

*Defined in [index.d.ts:465](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L465)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [BodyDef](../README.md#bodydef) |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [index.d.ts:466](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L466)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(): *[Body](body.md)*

*Defined in [index.d.ts:467](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L467)*

**Returns:** *[Body](body.md)*

___

###  createJoint

▸ **createJoint**‹**T**›(`joint`: T): *T | null*

*Defined in [index.d.ts:472](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L472)*

**Type parameters:**

▪ **T**: *[Joint](joint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | T |

**Returns:** *T | null*

___

###  createKinematicBody

▸ **createKinematicBody**(`def`: [BodyDef](../README.md#bodydef)): *[Body](body.md)*

*Defined in [index.d.ts:468](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L468)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [BodyDef](../README.md#bodydef) |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [index.d.ts:469](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L469)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(): *[Body](body.md)*

*Defined in [index.d.ts:470](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L470)*

**Returns:** *[Body](body.md)*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](body.md)): *boolean*

*Defined in [index.d.ts:471](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L471)*

**Parameters:**

Name | Type |
------ | ------ |
`b` | [Body](body.md) |

**Returns:** *boolean*

___

###  destroyContact

▸ **destroyContact**(`contact`: [Contact](contact.md)): *void*

*Defined in [index.d.ts:481](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L481)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *void*

___

###  destroyJoint

▸ **destroyJoint**(`joint`: [Joint](joint.md)): *void*

*Defined in [index.d.ts:473](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L473)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *void*

___

###  endContact

▸ **endContact**(`contact`: [Contact](contact.md)): *void*

*Defined in [index.d.ts:503](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L503)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *void*

___

###  findNewContacts

▸ **findNewContacts**(): *void*

*Defined in [index.d.ts:475](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L475)*

**Returns:** *void*

___

###  getAllowSleeping

▸ **getAllowSleeping**(): *boolean*

*Defined in [index.d.ts:445](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L445)*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

*Defined in [index.d.ts:453](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L453)*

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

*Defined in [index.d.ts:438](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L438)*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](body.md) | null*

*Defined in [index.d.ts:435](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L435)*

**Returns:** *[Body](body.md) | null*

___

###  getContactCount

▸ **getContactCount**(): *number*

*Defined in [index.d.ts:440](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L440)*

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](contact.md) | null*

*Defined in [index.d.ts:437](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L437)*

**Returns:** *[Contact](contact.md) | null*

___

###  getContinuousPhysics

▸ **getContinuousPhysics**(): *boolean*

*Defined in [index.d.ts:449](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L449)*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *[Vec2](vec2.md)*

*Defined in [index.d.ts:442](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L442)*

**Returns:** *[Vec2](vec2.md)*

___

###  getJointCount

▸ **getJointCount**(): *number*

*Defined in [index.d.ts:439](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L439)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](joint.md) | null*

*Defined in [index.d.ts:436](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L436)*

**Returns:** *[Joint](joint.md) | null*

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [index.d.ts:457](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L457)*

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

*Defined in [index.d.ts:451](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L451)*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [index.d.ts:459](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L459)*

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [index.d.ts:458](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L458)*

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [index.d.ts:460](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L460)*

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

*Defined in [index.d.ts:447](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L447)*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

*Defined in [index.d.ts:443](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L443)*

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:492](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L492)*

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

*Defined in [index.d.ts:493](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L493)*

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

*Defined in [index.d.ts:494](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L494)*

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `oldManifold`: [Manifold](manifold.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`oldManifold` | [Manifold](manifold.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "post-solve", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:495](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L495)*

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `impulse`: [ContactImpulse](../README.md#contactimpulse)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`impulse` | [ContactImpulse](../README.md#contactimpulse) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "remove-body", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:496](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L496)*

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

*Defined in [index.d.ts:497](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L497)*

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

*Defined in [index.d.ts:498](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L498)*

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

*Defined in [index.d.ts:485](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L485)*

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

*Defined in [index.d.ts:486](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L486)*

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

*Defined in [index.d.ts:487](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L487)*

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `oldManifold`: [Manifold](manifold.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`oldManifold` | [Manifold](manifold.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "post-solve", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:488](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L488)*

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `impulse`: [ContactImpulse](../README.md#contactimpulse)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`impulse` | [ContactImpulse](../README.md#contactimpulse) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "remove-body", `listener`: function): *[World](world.md)*

*Defined in [index.d.ts:489](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L489)*

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

*Defined in [index.d.ts:490](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L490)*

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

*Defined in [index.d.ts:491](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L491)*

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

###  postSolve

▸ **postSolve**(`contact`: [Contact](contact.md), `impulse`: [ContactImpulse](../README.md#contactimpulse)): *void*

*Defined in [index.d.ts:505](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L505)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`impulse` | [ContactImpulse](../README.md#contactimpulse) |

**Returns:** *void*

___

###  preSolve

▸ **preSolve**(`contact`: [Contact](contact.md), `oldManifold`: [Manifold](manifold.md)): *void*

*Defined in [index.d.ts:504](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L504)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`oldManifold` | [Manifold](manifold.md) |

**Returns:** *void*

___

###  publish

▸ **publish**(`name`: string, `arg1`: any, `arg2`: any, `arg3`: any): *number*

*Defined in [index.d.ts:500](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L500)*

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

*Defined in [index.d.ts:455](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L455)*

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

*Defined in [index.d.ts:456](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L456)*

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

*Defined in [index.d.ts:444](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L444)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

*Defined in [index.d.ts:452](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L452)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

*Defined in [index.d.ts:448](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L448)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: [Vec2](vec2.md)): *void*

*Defined in [index.d.ts:441](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L441)*

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

*Defined in [index.d.ts:450](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L450)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

*Defined in [index.d.ts:446](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L446)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [index.d.ts:461](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L461)*

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  step

▸ **step**(`timeStep`: number, `velocityIterations?`: number, `positionIterations?`: number): *void*

*Defined in [index.d.ts:474](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L474)*

**Parameters:**

Name | Type |
------ | ------ |
`timeStep` | number |
`velocityIterations?` | number |
`positionIterations?` | number |

**Returns:** *void*

___

###  updateContacts

▸ **updateContacts**(): *void*

*Defined in [index.d.ts:480](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L480)*

**Returns:** *void*
