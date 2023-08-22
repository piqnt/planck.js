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

\+ **new World**(`def?`: [WorldDef](../interfaces/worlddef.md) | [Vec2](vec2.md) | null): *[World](world.md)*

*Defined in [dynamics/World.ts:121](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L121)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def?` | [WorldDef](../interfaces/worlddef.md) &#124; [Vec2](vec2.md) &#124; null | World definition or gravity vector.  |

**Returns:** *[World](world.md)*

## Methods

###  clearForces

▸ **clearForces**(): *void*

*Defined in [dynamics/World.ts:368](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L368)*

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

*Defined in [dynamics/World.ts:637](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L637)*

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

*Defined in [dynamics/World.ts:537](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L537)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

▸ **createKinematicBody**(`position`: [Vec2](vec2.md), `angle?`: number): *[Body](body.md)*

*Defined in [dynamics/World.ts:538](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L538)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle?` | number |

**Returns:** *[Body](body.md)*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](body.md)): *boolean*

*Defined in [dynamics/World.ts:560](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L560)*

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

*Defined in [dynamics/World.ts:691](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L691)*

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

*Defined in [dynamics/World.ts:306](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L306)*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

*Defined in [dynamics/World.ts:353](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L353)*

Get the flag that controls automatic clearing of forces after each time step.

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

*Defined in [dynamics/World.ts:254](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L254)*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](body.md) | null*

*Defined in [dynamics/World.ts:226](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L226)*

Get the world body list. With the returned body, use Body.getNext to get the
next body in the world list. A null body indicates the end of the list.

**Returns:** *[Body](body.md) | null*

the head of the world body list.

___

###  getContactCount

▸ **getContactCount**(): *number*

*Defined in [dynamics/World.ts:265](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L265)*

Get the number of contacts (each may have 0 or more contact points).

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](contact.md) | null*

*Defined in [dynamics/World.ts:250](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L250)*

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

*Defined in [dynamics/World.ts:328](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L328)*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *[Vec2](vec2.md)*

*Defined in [dynamics/World.ts:279](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L279)*

Get the global gravity vector.

**Returns:** *[Vec2](vec2.md)*

___

###  getJointCount

▸ **getJointCount**(): *number*

*Defined in [dynamics/World.ts:258](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L258)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](joint.md) | null*

*Defined in [dynamics/World.ts:236](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L236)*

Get the world joint list. With the returned joint, use Joint.getNext to get
the next joint in the world list. A null joint indicates the end of the list.

**Returns:** *[Joint](joint.md) | null*

the head of the world joint list.

___

###  getProxyCount

▸ **getProxyCount**(): *number*

*Defined in [dynamics/World.ts:426](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L426)*

Get the number of broad-phase proxies.

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

*Defined in [dynamics/World.ts:339](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L339)*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

*Defined in [dynamics/World.ts:440](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L440)*

Get the balance of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

*Defined in [dynamics/World.ts:433](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L433)*

Get the height of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

*Defined in [dynamics/World.ts:448](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L448)*

Get the quality metric of broad-phase dynamic tree. The smaller the better.
The minimum is 1.

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

*Defined in [dynamics/World.ts:317](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L317)*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

*Defined in [dynamics/World.ts:286](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L286)*

Is the world locked (in the middle of a time step).

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [dynamics/World.ts:1073](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1073)*

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

*Defined in [dynamics/World.ts:1074](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1074)*

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

*Defined in [dynamics/World.ts:1075](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1075)*

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

*Defined in [dynamics/World.ts:1076](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1076)*

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

*Defined in [dynamics/World.ts:1077](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1077)*

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

*Defined in [dynamics/World.ts:1078](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1078)*

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

*Defined in [dynamics/World.ts:1079](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1079)*

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

___

###  on

▸ **on**(`name`: "begin-contact", `listener`: function): *[World](world.md)*

*Defined in [dynamics/World.ts:1011](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1011)*

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

**Returns:** *[World](world.md)*

▸ **on**(`name`: "end-contact", `listener`: function): *[World](world.md)*

*Defined in [dynamics/World.ts:1025](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1025)*

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

**Returns:** *[World](world.md)*

▸ **on**(`name`: "pre-solve", `listener`: function): *[World](world.md)*

*Defined in [dynamics/World.ts:1038](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1038)*

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

**Returns:** *[World](world.md)*

▸ **on**(`name`: "post-solve", `listener`: function): *[World](world.md)*

*Defined in [dynamics/World.ts:1048](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1048)*

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

**Returns:** *[World](world.md)*

▸ **on**(`name`: "remove-body", `listener`: function): *[World](world.md)*

*Defined in [dynamics/World.ts:1050](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1050)*

Listener is called whenever a body is removed.

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

*Defined in [dynamics/World.ts:1052](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1052)*

Listener is called whenever a joint is removed implicitly or explicitly.

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

*Defined in [dynamics/World.ts:1054](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1054)*

Listener is called whenever a fixture is removed implicitly or explicitly.

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

▸ **publish**(`name`: string, `arg1?`: any, `arg2?`: any, `arg3?`: any): *number*

*Defined in [dynamics/World.ts:1099](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L1099)*

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

*Defined in [dynamics/World.ts:381](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L381)*

Query the world for all fixtures that potentially overlap the provided AABB.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) | The query box. |
`callback` | [WorldAABBQueryCallback](../globals.md#worldaabbquerycallback) | Called for each fixture found in the query AABB. It may return `false` to terminate the query.  |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`point1`: [Vec2](vec2.md), `point2`: [Vec2](vec2.md), `callback`: [WorldRayCastCallback](../globals.md#worldraycastcallback)): *void*

*Defined in [dynamics/World.ts:399](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L399)*

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

*Defined in [dynamics/World.ts:293](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L293)*

Enable/disable sleep.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

*Defined in [dynamics/World.ts:346](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L346)*

Set flag to control automatic clearing of forces after each time step.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

*Defined in [dynamics/World.ts:324](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L324)*

Enable/disable continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: [Vec2](vec2.md)): *void*

*Defined in [dynamics/World.ts:272](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L272)*

Change the global gravity vector.

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

*Defined in [dynamics/World.ts:335](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L335)*

Enable/disable single stepped continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

*Defined in [dynamics/World.ts:313](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L313)*

Enable/disable warm starting. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [dynamics/World.ts:458](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L458)*

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

*Defined in [dynamics/World.ts:781](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/World.ts#L781)*

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
