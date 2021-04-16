[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [World](world.md)

# Class: World

## Hierarchy

* **World**

## Callable

▸ **World**(`def?`: [WorldDef](../interfaces/worlddef.md) | [Vec2](vec2.md) | null): *[World](world.md)*

*Defined in [dist/planck.d.ts:1372](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1372)*

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

*Defined in [dist/planck.d.ts:1373](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1373)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) &#124; [Vec2](vec2.md) &#124; null | World definition or gravity vector.  |

**Returns:** *[World](world.md)*

## Methods

###  clearForces

▸ **clearForces**(): *void*

*Defined in [dist/planck.d.ts:1460](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1460)*

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

*Defined in [dist/planck.d.ts:1509](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1509)*

Create a rigid body given a definition. No reference to the definition is
retained.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1510](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1510)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createBody**(`def?`: BodyDef): *Body*

*Defined in [src/dynamics/World.ts:499](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L499)*

Create a rigid body given a definition. No reference to the definition is
retained.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def?` | BodyDef |

**Returns:** *Body*

▸ **createBody**(`position`: Vec2, `angle?`: number): *Body*

*Defined in [src/dynamics/World.ts:500](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L500)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *Body*

___

###  createDynamicBody

▸ **createDynamicBody**(`def?`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1511](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1511)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1512](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1512)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createDynamicBody**(`def?`: BodyDef): *Body*

*Defined in [src/dynamics/World.ts:520](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L520)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | BodyDef |

**Returns:** *Body*

▸ **createDynamicBody**(`position`: Vec2, `angle?`: number): *Body*

*Defined in [src/dynamics/World.ts:521](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L521)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *Body*

___

###  createJoint

▸ **createJoint**‹**T**›(`joint`: T): *T | null*

*Defined in [dist/planck.d.ts:1530](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1530)*

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

*Defined in [dist/planck.d.ts:1513](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1513)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1514](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1514)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`def?`: BodyDef): *Body*

*Defined in [src/dynamics/World.ts:534](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L534)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | BodyDef |

**Returns:** *Body*

▸ **createKinematicBody**(`position`: Vec2, `angle?`: number): *Body*

*Defined in [src/dynamics/World.ts:535](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L535)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *Body*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](body.md)): *boolean*

*Defined in [dist/planck.d.ts:1523](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1523)*

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

*Defined in [dist/planck.d.ts:1535](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1535)*

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

*Defined in [dist/planck.d.ts:1425](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1425)*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

*Defined in [dist/planck.d.ts:1448](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1448)*

Get the flag that controls automatic clearing of forces after each time step.

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

*Defined in [dist/planck.d.ts:1403](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1403)*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](body.md) | null*

*Defined in [dist/planck.d.ts:1384](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1384)*

Get the world body list. With the returned body, use Body.getNext to get the
next body in the world list. A null body indicates the end of the list.

**Returns:** *[Body](body.md) | null*

the head of the world body list.

___

###  getContactCount

▸ **getContactCount**(): *number*

*Defined in [dist/planck.d.ts:1408](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1408)*

Get the number of contacts (each may have 0 or more contact points).

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](contact.md) | null*

*Defined in [dist/planck.d.ts:1402](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1402)*

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

*Defined in [dist/planck.d.ts:1435](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1435)*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1416](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1416)*

Get the global gravity vector.

**Returns:** *[Vec2](vec2.md)*

___

###  getJointCount

▸ **getJointCount**(): *number*

*Defined in [dist/planck.d.ts:1404](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1404)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](joint.md) | null*

*Defined in [dist/planck.d.ts:1391](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1391)*

Get the world joint list. With the returned joint, use Joint.getNext to get
the next joint in the world list. A null joint indicates the end of the list.

**Returns:** *[Joint](joint.md) | null*

the head of the world joint list.

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [dist/planck.d.ts:1482](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1482)*

Get the number of broad-phase proxies.

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

*Defined in [dist/planck.d.ts:1440](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1440)*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [dist/planck.d.ts:1490](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1490)*

Get the balance of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [dist/planck.d.ts:1486](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1486)*

Get the height of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [dist/planck.d.ts:1495](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1495)*

Get the quality metric of broad-phase dynamic tree. The smaller the better.
The minimum is 1.

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

*Defined in [dist/planck.d.ts:1430](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1430)*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

*Defined in [dist/planck.d.ts:1420](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1420)*

Is the world locked (in the middle of a time step).

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [dist/planck.d.ts:1552](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1552)*

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

*Defined in [dist/planck.d.ts:1553](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1553)*

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

*Defined in [dist/planck.d.ts:1554](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1554)*

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

*Defined in [dist/planck.d.ts:1555](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1555)*

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

*Defined in [dist/planck.d.ts:1556](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1556)*

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

*Defined in [dist/planck.d.ts:1557](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1557)*

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

*Defined in [dist/planck.d.ts:1558](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1558)*

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

*Defined in [src/dynamics/World.ts:1018](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1018)*

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

*Defined in [src/dynamics/World.ts:1019](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1019)*

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

*Defined in [src/dynamics/World.ts:1020](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1020)*

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

*Defined in [src/dynamics/World.ts:1021](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1021)*

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

*Defined in [src/dynamics/World.ts:1022](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1022)*

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

*Defined in [src/dynamics/World.ts:1023](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1023)*

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

*Defined in [src/dynamics/World.ts:1024](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1024)*

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

*Defined in [dist/planck.d.ts:1545](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1545)*

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

*Defined in [dist/planck.d.ts:1546](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1546)*

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

*Defined in [dist/planck.d.ts:1547](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1547)*

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

*Defined in [dist/planck.d.ts:1548](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1548)*

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

*Defined in [dist/planck.d.ts:1549](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1549)*

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

*Defined in [dist/planck.d.ts:1550](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1550)*

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

*Defined in [dist/planck.d.ts:1551](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1551)*

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

*Defined in [src/dynamics/World.ts:994](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L994)*

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

*Defined in [src/dynamics/World.ts:995](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L995)*

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

*Defined in [src/dynamics/World.ts:996](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L996)*

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

*Defined in [src/dynamics/World.ts:997](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L997)*

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

*Defined in [src/dynamics/World.ts:998](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L998)*

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

*Defined in [src/dynamics/World.ts:999](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L999)*

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

*Defined in [src/dynamics/World.ts:1000](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/World.ts#L1000)*

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

*Defined in [dist/planck.d.ts:1559](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1559)*

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

*Defined in [dist/planck.d.ts:1467](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1467)*

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

*Defined in [dist/planck.d.ts:1478](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1478)*

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

*Defined in [dist/planck.d.ts:1424](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1424)*

Enable/disable sleep.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1444](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1444)*

Set flag to control automatic clearing of forces after each time step.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1434](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1434)*

Enable/disable continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1412](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1412)*

Change the global gravity vector.

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1439](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1439)*

Enable/disable single stepped continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1429](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1429)*

Enable/disable warm starting. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1502](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1502)*

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

*Defined in [dist/planck.d.ts:1544](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1544)*

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
