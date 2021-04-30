[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [World](world.md)

# Class: World

## Hierarchy

* **World**

## Callable

▸ **World**(`def?`: [WorldDef](../interfaces/worlddef.md) | [Vec2](vec2.md) | null): *[World](world.md)*

*Defined in [dist/planck.d.ts:1348](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1348)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) &#124; [Vec2](vec2.md) &#124; null |

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

\+ **new World**(`def?`: [WorldDef](../interfaces/worlddef.md) | [Vec2](vec2.md) | null): *[World](world.md)*

*Defined in [dist/planck.d.ts:1349](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1349)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) &#124; [Vec2](vec2.md) &#124; null | World definition or gravity vector.  |

**Returns:** *[World](world.md)*

## Methods

###  clearForces

▸ **clearForces**(): *void*

*Defined in [dist/planck.d.ts:1436](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1436)*

Manually clear the force buffer on all bodies. By default, forces are cleared
automatically after each call to step. The default behavior is modified by
calling setAutoClearForces. The purpose of this function is to support
sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
under a variable frame-rate. When you perform sub-stepping you will disable
auto clearing of forces and instead call clearForces after all sub-steps are
complete in one pass of your game loop.

**`see`** setAutoClearForces

**Returns:** *void*

___

###  createBody

▸ **createBody**(`def?`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1485](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1485)*

Create a rigid body given a definition. No reference to the definition is
retained.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1486](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1486)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createBody**(`def?`: BodyDef): *Body*

*Defined in [src/dynamics/World.ts:499](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L499)*

Create a rigid body given a definition. No reference to the definition is
retained.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def?` | BodyDef |

**Returns:** *Body*

▸ **createBody**(`position`: Vec2, `angle?`: number): *Body*

*Defined in [src/dynamics/World.ts:500](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L500)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *Body*

___

###  createDynamicBody

▸ **createDynamicBody**(`def?`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1487](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1487)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1488](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1488)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(`def?`: BodyDef): *Body*

*Defined in [src/dynamics/World.ts:520](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L520)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | BodyDef |

**Returns:** *Body*

▸ **createDynamicBody**(`position`: Vec2, `angle?`: number): *Body*

*Defined in [src/dynamics/World.ts:521](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L521)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *Body*

___

###  createJoint

▸ **createJoint**‹**T**›(`joint`: T): *T | null*

*Defined in [dist/planck.d.ts:1506](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1506)*

Create a joint to constrain bodies together. No reference to the definition
is retained. This may cause the connected bodies to cease colliding.

Warning: This function is locked during callbacks.

**Type parameters:**

▪ **T**: *[Joint](joint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | T |

**Returns:** *T | null*

___

###  createKinematicBody

▸ **createKinematicBody**(`def?`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1489](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1489)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1490](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1490)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`def?`: BodyDef): *Body*

*Defined in [src/dynamics/World.ts:534](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L534)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | BodyDef |

**Returns:** *Body*

▸ **createKinematicBody**(`position`: Vec2, `angle?`: number): *Body*

*Defined in [src/dynamics/World.ts:535](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L535)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *Body*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](body.md)): *boolean*

*Defined in [dist/planck.d.ts:1499](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1499)*

Destroy a rigid body given a definition. No reference to the definition is
retained.

Warning: This automatically deletes all associated shapes and joints.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`b` | [Body](body.md) |

**Returns:** *boolean*

___

###  destroyJoint

▸ **destroyJoint**(`joint`: [Joint](joint.md)): *void*

*Defined in [dist/planck.d.ts:1511](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1511)*

Destroy a joint. This may cause the connected bodies to begin colliding.
Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *void*

___

###  getAllowSleeping

▸ **getAllowSleeping**(): *boolean*

*Defined in [dist/planck.d.ts:1401](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1401)*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

*Defined in [dist/planck.d.ts:1424](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1424)*

Get the flag that controls automatic clearing of forces after each time step.

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

*Defined in [dist/planck.d.ts:1379](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1379)*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](body.md) | null*

*Defined in [dist/planck.d.ts:1360](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1360)*

Get the world body list. With the returned body, use Body.getNext to get the
next body in the world list. A null body indicates the end of the list.

**Returns:** *[Body](body.md) | null*

the head of the world body list.

___

###  getContactCount

▸ **getContactCount**(): *number*

*Defined in [dist/planck.d.ts:1384](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1384)*

Get the number of contacts (each may have 0 or more contact points).

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](contact.md) | null*

*Defined in [dist/planck.d.ts:1378](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1378)*

Get the world contact list. With the returned contact, use Contact.getNext to
get the next contact in the world list. A null contact indicates the end of
the list.

Warning: contacts are created and destroyed in the middle of a time step.
Use ContactListener to avoid missing contacts.

**Returns:** *[Contact](contact.md) | null*

the head of the world contact list.

___

###  getContinuousPhysics

▸ **getContinuousPhysics**(): *boolean*

*Defined in [dist/planck.d.ts:1411](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1411)*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1392](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1392)*

Get the global gravity vector.

**Returns:** *[Vec2](vec2.md)*

___

###  getJointCount

▸ **getJointCount**(): *number*

*Defined in [dist/planck.d.ts:1380](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1380)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](joint.md) | null*

*Defined in [dist/planck.d.ts:1367](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1367)*

Get the world joint list. With the returned joint, use Joint.getNext to get
the next joint in the world list. A null joint indicates the end of the list.

**Returns:** *[Joint](joint.md) | null*

the head of the world joint list.

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [dist/planck.d.ts:1458](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1458)*

Get the number of broad-phase proxies.

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

*Defined in [dist/planck.d.ts:1416](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1416)*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [dist/planck.d.ts:1466](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1466)*

Get the balance of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [dist/planck.d.ts:1462](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1462)*

Get the height of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [dist/planck.d.ts:1471](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1471)*

Get the quality metric of broad-phase dynamic tree. The smaller the better.
The minimum is 1.

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

*Defined in [dist/planck.d.ts:1406](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1406)*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

*Defined in [dist/planck.d.ts:1396](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1396)*

Is the world locked (in the middle of a time step).

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [dist/planck.d.ts:1528](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1528)*

Remove an event listener.

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

*Defined in [dist/planck.d.ts:1529](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1529)*

Remove an event listener.

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

*Defined in [dist/planck.d.ts:1530](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1530)*

Remove an event listener.

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

*Defined in [dist/planck.d.ts:1531](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1531)*

Remove an event listener.

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

*Defined in [dist/planck.d.ts:1532](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1532)*

Remove an event listener.

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

*Defined in [dist/planck.d.ts:1533](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1533)*

Remove an event listener.

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

*Defined in [dist/planck.d.ts:1534](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1534)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *[World](world.md)*

▸ **off**(`name`: "begin-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1018](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1018)*

Remove an event listener.

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: Contact): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |

**Returns:** *World*

▸ **off**(`name`: "end-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1019](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1019)*

Remove an event listener.

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: Contact): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |

**Returns:** *World*

▸ **off**(`name`: "pre-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1020](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1020)*

Remove an event listener.

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: Contact, `oldManifold`: Manifold): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |
`oldManifold` | Manifold |

**Returns:** *World*

▸ **off**(`name`: "post-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1021](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1021)*

Remove an event listener.

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: Contact, `impulse`: ContactImpulse): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |
`impulse` | ContactImpulse |

**Returns:** *World*

▸ **off**(`name`: "remove-body", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1022](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1022)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: Body): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |

**Returns:** *World*

▸ **off**(`name`: "remove-joint", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1023](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1023)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: Joint): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | Joint |

**Returns:** *World*

▸ **off**(`name`: "remove-fixture", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1024](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1024)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: Fixture): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | Fixture |

**Returns:** *World*

___

###  on

▸ **on**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [dist/planck.d.ts:1521](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1521)*

Register an event listener.

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

*Defined in [dist/planck.d.ts:1522](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1522)*

Register an event listener.

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

*Defined in [dist/planck.d.ts:1523](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1523)*

Register an event listener.

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

*Defined in [dist/planck.d.ts:1524](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1524)*

Register an event listener.

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

*Defined in [dist/planck.d.ts:1525](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1525)*

Register an event listener.

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

*Defined in [dist/planck.d.ts:1526](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1526)*

Register an event listener.

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

*Defined in [dist/planck.d.ts:1527](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1527)*

Register an event listener.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *[World](world.md)*

▸ **on**(`name`: "begin-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:994](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L994)*

Register an event listener.

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: Contact): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |

**Returns:** *World*

▸ **on**(`name`: "end-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:995](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L995)*

Register an event listener.

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: Contact): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |

**Returns:** *World*

▸ **on**(`name`: "pre-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:996](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L996)*

Register an event listener.

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: Contact, `oldManifold`: Manifold): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |
`oldManifold` | Manifold |

**Returns:** *World*

▸ **on**(`name`: "post-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:997](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L997)*

Register an event listener.

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: Contact, `impulse`: ContactImpulse): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | Contact |
`impulse` | ContactImpulse |

**Returns:** *World*

▸ **on**(`name`: "remove-body", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:998](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L998)*

Register an event listener.

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: Body): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |

**Returns:** *World*

▸ **on**(`name`: "remove-joint", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:999](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L999)*

Register an event listener.

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: Joint): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | Joint |

**Returns:** *World*

▸ **on**(`name`: "remove-fixture", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1000](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/World.ts#L1000)*

Register an event listener.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: Fixture): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | Fixture |

**Returns:** *World*

___

###  publish

▸ **publish**(`name`: string, `arg1?`: any, `arg2?`: any, `arg3?`: any): *number*

*Defined in [dist/planck.d.ts:1535](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1535)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`arg1?` | any |
`arg2?` | any |
`arg3?` | any |

**Returns:** *number*

___

###  queryAABB

▸ **queryAABB**(`aabb`: [AABB](aabb.md), `callback`: [WorldAABBQueryCallback](../globals.md#worldaabbquerycallback)): *void*

*Defined in [dist/planck.d.ts:1443](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1443)*

Query the world for all fixtures that potentially overlap the provided AABB.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABB](aabb.md) | The query box. |
`callback` | [WorldAABBQueryCallback](../globals.md#worldaabbquerycallback) | Called for each fixture found in the query AABB. It may return `false` to terminate the query.  |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`point1`: [Vec2](vec2.md), `point2`: [Vec2](vec2.md), `callback`: [WorldRayCastCallback](../globals.md#worldraycastcallback)): *void*

*Defined in [dist/planck.d.ts:1454](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1454)*

Ray-cast the world for all fixtures in the path of the ray. Your callback
controls whether you get the closest point, any point, or n-points. The
ray-cast ignores shapes that contain the starting point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`point1` | [Vec2](vec2.md) | The ray starting point |
`point2` | [Vec2](vec2.md) | The ray ending point |
`callback` | [WorldRayCastCallback](../globals.md#worldraycastcallback) | A user implemented callback function.  |

**Returns:** *void*

___

###  setAllowSleeping

▸ **setAllowSleeping**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1400](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1400)*

Enable/disable sleep.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1420](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1420)*

Set flag to control automatic clearing of forces after each time step.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1410](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1410)*

Enable/disable continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1388](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1388)*

Change the global gravity vector.

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1415](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1415)*

Enable/disable single stepped continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1405](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1405)*

Enable/disable warm starting. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1478](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1478)*

Shift the world origin. Useful for large worlds. The body shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2](vec2.md) | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  step

▸ **step**(`timeStep`: number, `velocityIterations?`: number, `positionIterations?`: number): *void*

*Defined in [dist/planck.d.ts:1520](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1520)*

Take a time step. This performs collision detection, integration, and
constraint solution.

Broad-phase, narrow-phase, solve and solve time of impacts.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`timeStep` | number | Time step, this should not vary.  |
`velocityIterations?` | number | - |
`positionIterations?` | number | - |

**Returns:** *void*
