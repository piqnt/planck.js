[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [World](world.md)

# Class: World

## Hierarchy

* **World**

## Index

### Constructors

* [constructor](world.md#constructor)

### Methods

* [clearForces](world.md#clearforces)
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

\+ **new World**(`def?`: [WorldDef](../interfaces/worlddef.md) | Vec2 | null): *[World](world.md)*

*Defined in [src/dynamics/World.ts:124](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L124)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) &#124; Vec2 &#124; null | World definition or gravity vector.  |

**Returns:** *[World](world.md)*

## Methods

###  clearForces

▸ **clearForces**(): *void*

*Defined in [src/dynamics/World.ts:371](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L371)*

Manually clear the force buffer on all bodies. By default, forces are cleared
automatically after each call to step. The default behavior is modified by
calling setAutoClearForces. The purpose of this function is to support
sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
under a variable frame-rate. When you perform sub-stepping you will disable
auto clearing of forces and instead call clearForces after all sub-steps are
complete in one pass of your game loop.

See [World.setAutoClearForces](world.md#setautoclearforces)

**Returns:** *void*

___

###  createJoint

▸ **createJoint**‹**T**›(`joint`: T): *T | null*

*Defined in [src/dynamics/World.ts:640](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L640)*

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

*Defined in [src/dynamics/World.ts:540](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L540)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`position`: Vec2, `angle?`: number): *[Body](body.md)*

*Defined in [src/dynamics/World.ts:541](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L541)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | Vec2 |
`angle?` | number |

**Returns:** *[Body](body.md)*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](body.md)): *boolean*

*Defined in [src/dynamics/World.ts:563](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L563)*

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

*Defined in [src/dynamics/World.ts:694](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L694)*

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

*Defined in [src/dynamics/World.ts:309](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L309)*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

*Defined in [src/dynamics/World.ts:356](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L356)*

Get the flag that controls automatic clearing of forces after each time step.

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

*Defined in [src/dynamics/World.ts:257](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L257)*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](body.md) | null*

*Defined in [src/dynamics/World.ts:229](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L229)*

Get the world body list. With the returned body, use Body.getNext to get the
next body in the world list. A null body indicates the end of the list.

**Returns:** *[Body](body.md) | null*

the head of the world body list.

___

###  getContactCount

▸ **getContactCount**(): *number*

*Defined in [src/dynamics/World.ts:268](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L268)*

Get the number of contacts (each may have 0 or more contact points).

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](contact.md) | null*

*Defined in [src/dynamics/World.ts:253](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L253)*

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

*Defined in [src/dynamics/World.ts:331](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L331)*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *Vec2*

*Defined in [src/dynamics/World.ts:282](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L282)*

Get the global gravity vector.

**Returns:** *Vec2*

___

###  getJointCount

▸ **getJointCount**(): *number*

*Defined in [src/dynamics/World.ts:261](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L261)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](joint.md) | null*

*Defined in [src/dynamics/World.ts:239](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L239)*

Get the world joint list. With the returned joint, use Joint.getNext to get
the next joint in the world list. A null joint indicates the end of the list.

**Returns:** *[Joint](joint.md) | null*

the head of the world joint list.

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [src/dynamics/World.ts:429](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L429)*

Get the number of broad-phase proxies.

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

*Defined in [src/dynamics/World.ts:342](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L342)*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [src/dynamics/World.ts:443](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L443)*

Get the balance of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [src/dynamics/World.ts:436](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L436)*

Get the height of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [src/dynamics/World.ts:451](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L451)*

Get the quality metric of broad-phase dynamic tree. The smaller the better.
The minimum is 1.

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

*Defined in [src/dynamics/World.ts:320](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L320)*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

*Defined in [src/dynamics/World.ts:289](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L289)*

Is the world locked (in the middle of a time step).

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1076](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1076)*

Remove an event listener.

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *World*

▸ **off**(`name`: "end-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1077](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1077)*

Remove an event listener.

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *World*

▸ **off**(`name`: "pre-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1078](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1078)*

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

**Returns:** *World*

▸ **off**(`name`: "post-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1079](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1079)*

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

**Returns:** *World*

▸ **off**(`name`: "remove-body", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1080](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1080)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: [Body](body.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |

**Returns:** *World*

▸ **off**(`name`: "remove-joint", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1081](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1081)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: [Joint](joint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *World*

▸ **off**(`name`: "remove-fixture", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1082](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1082)*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *World*

___

###  on

▸ **on**(`name`: "begin-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1014](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1014)*

Called when two fixtures begin to touch.

Implement contact callbacks to get contact information. You can use these
results for things like sounds and game logic. You can also get contact
results by traversing the contact lists after the time step. However, you
might miss some contacts because continuous physics leads to sub-stepping.
Additionally you may receive multiple callbacks for the same contact in a
single time step. You should strive to make your callbacks efficient because
there may be many callbacks per time step.

Warning: You cannot create/destroy world entities inside these callbacks.

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *World*

▸ **on**(`name`: "end-contact", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1028](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1028)*

Called when two fixtures cease to touch.

Implement contact callbacks to get contact information. You can use these
results for things like sounds and game logic. You can also get contact
results by traversing the contact lists after the time step. However, you
might miss some contacts because continuous physics leads to sub-stepping.
Additionally you may receive multiple callbacks for the same contact in a
single time step. You should strive to make your callbacks efficient because
there may be many callbacks per time step.

Warning: You cannot create/destroy world entities inside these callbacks.

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *World*

▸ **on**(`name`: "pre-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1041](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1041)*

This is called after a contact is updated. This allows you to inspect a
contact before it goes to the solver. If you are careful, you can modify the
contact manifold (e.g. disable contact). A copy of the old manifold is
provided so that you can detect changes. Note: this is called only for awake
bodies. Note: this is called even when the number of contact points is zero.
Note: this is not called for sensors. Note: if you set the number of contact
points to zero, you will not get an endContact callback. However, you may get
a beginContact callback the next step.

Warning: You cannot create/destroy world entities inside these callbacks.

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `oldManifold`: [Manifold](manifold.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`oldManifold` | [Manifold](manifold.md) |

**Returns:** *World*

▸ **on**(`name`: "post-solve", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1051](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1051)*

This lets you inspect a contact after the solver is finished. This is useful
for inspecting impulses. Note: the contact manifold does not include time of
impact impulses, which can be arbitrarily large if the sub-step is small.
Hence the impulse is provided explicitly in a separate data structure. Note:
this is only called for contacts that are touching, solid, and awake.

Warning: You cannot create/destroy world entities inside these callbacks.

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](contact.md), `impulse`: [ContactImpulse](contactimpulse.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |
`impulse` | [ContactImpulse](contactimpulse.md) |

**Returns:** *World*

▸ **on**(`name`: "remove-body", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1053](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1053)*

Listener is called whenever a body is removed.

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: [Body](body.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |

**Returns:** *World*

▸ **on**(`name`: "remove-joint", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1055](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1055)*

Listener is called whenever a joint is removed implicitly or explicitly.

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: [Joint](joint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *World*

▸ **on**(`name`: "remove-fixture", `listener`: function): *World*

*Defined in [src/dynamics/World.ts:1057](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1057)*

Listener is called whenever a fixture is removed implicitly or explicitly.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](fixture.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *World*

___

###  publish

▸ **publish**(`name`: string, `arg1?`: any, `arg2?`: any, `arg3?`: any): *number*

*Defined in [src/dynamics/World.ts:1102](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L1102)*

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

▸ **queryAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `callback`: [WorldAABBQueryCallback](../globals.md#worldaabbquerycallback)): *void*

*Defined in [src/dynamics/World.ts:384](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L384)*

Query the world for all fixtures that potentially overlap the provided AABB.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) | The query box. |
`callback` | [WorldAABBQueryCallback](../globals.md#worldaabbquerycallback) | Called for each fixture found in the query AABB. It may return `false` to terminate the query.  |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`point1`: Vec2, `point2`: Vec2, `callback`: [WorldRayCastCallback](../globals.md#worldraycastcallback)): *void*

*Defined in [src/dynamics/World.ts:402](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L402)*

Ray-cast the world for all fixtures in the path of the ray. Your callback
controls whether you get the closest point, any point, or n-points. The
ray-cast ignores shapes that contain the starting point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`point1` | Vec2 | The ray starting point |
`point2` | Vec2 | The ray ending point |
`callback` | [WorldRayCastCallback](../globals.md#worldraycastcallback) | A user implemented callback function.  |

**Returns:** *void*

___

###  setAllowSleeping

▸ **setAllowSleeping**(`flag`: boolean): *void*

*Defined in [src/dynamics/World.ts:296](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L296)*

Enable/disable sleep.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

*Defined in [src/dynamics/World.ts:349](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L349)*

Set flag to control automatic clearing of forces after each time step.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

*Defined in [src/dynamics/World.ts:327](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L327)*

Enable/disable continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: Vec2): *void*

*Defined in [src/dynamics/World.ts:275](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L275)*

Change the global gravity vector.

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | Vec2 |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

*Defined in [src/dynamics/World.ts:338](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L338)*

Enable/disable single stepped continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

*Defined in [src/dynamics/World.ts:316](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L316)*

Enable/disable warm starting. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Defined in [src/dynamics/World.ts:461](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L461)*

Shift the world origin. Useful for large worlds. The body shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | Vec2 | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  step

▸ **step**(`timeStep`: number, `velocityIterations?`: number, `positionIterations?`: number): *void*

*Defined in [src/dynamics/World.ts:784](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/World.ts#L784)*

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
