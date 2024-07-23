
# Class: World

## Hierarchy

* **World**

## Index

### Constructors

* [constructor](/api/classes/world#constructor)

### Methods

* [clearForces](/api/classes/world#clearforces)
* [createBody](/api/classes/world#createbody)
* [createDynamicBody](/api/classes/world#createdynamicbody)
* [createJoint](/api/classes/world#createjoint)
* [createKinematicBody](/api/classes/world#createkinematicbody)
* [destroyBody](/api/classes/world#destroybody)
* [destroyJoint](/api/classes/world#destroyjoint)
* [getAllowSleeping](/api/classes/world#getallowsleeping)
* [getAutoClearForces](/api/classes/world#getautoclearforces)
* [getBodyCount](/api/classes/world#getbodycount)
* [getBodyList](/api/classes/world#getbodylist)
* [getContactCount](/api/classes/world#getcontactcount)
* [getContactList](/api/classes/world#getcontactlist)
* [getContinuousPhysics](/api/classes/world#getcontinuousphysics)
* [getGravity](/api/classes/world#getgravity)
* [getJointCount](/api/classes/world#getjointcount)
* [getJointList](/api/classes/world#getjointlist)
* [getProxyCount](/api/classes/world#getproxycount)
* [getSubStepping](/api/classes/world#getsubstepping)
* [getTreeBalance](/api/classes/world#gettreebalance)
* [getTreeHeight](/api/classes/world#gettreeheight)
* [getTreeQuality](/api/classes/world#gettreequality)
* [getWarmStarting](/api/classes/world#getwarmstarting)
* [isLocked](/api/classes/world#islocked)
* [off](/api/classes/world#off)
* [on](/api/classes/world#on)
* [publish](/api/classes/world#publish)
* [queryAABB](/api/classes/world#queryaabb)
* [rayCast](/api/classes/world#raycast)
* [setAllowSleeping](/api/classes/world#setallowsleeping)
* [setAutoClearForces](/api/classes/world#setautoclearforces)
* [setContinuousPhysics](/api/classes/world#setcontinuousphysics)
* [setGravity](/api/classes/world#setgravity)
* [setSubStepping](/api/classes/world#setsubstepping)
* [setWarmStarting](/api/classes/world#setwarmstarting)
* [shiftOrigin](/api/classes/world#shiftorigin)
* [step](/api/classes/world#step)

## Constructors

###  constructor

\+ **new World**(`def?`: [WorldDef](/api/interfaces/worlddef) | Vec2 | null): *[World](/api/classes/world)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`def?` | [WorldDef](/api/interfaces/worlddef) &#124; Vec2 &#124; null | World definition or gravity vector.  |

**Returns:** *[World](/api/classes/world)*

## Methods

###  clearForces

▸ **clearForces**(): *void*

Manually clear the force buffer on all bodies. By default, forces are cleared
automatically after each call to step. The default behavior is modified by
calling setAutoClearForces. The purpose of this function is to support
sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
under a variable frame-rate. When you perform sub-stepping you will disable
auto clearing of forces and instead call clearForces after all sub-steps are
complete in one pass of your game loop.

See [World.setAutoClearForces](world#setautoclearforces)

**Returns:** *void*

___

###  createBody

▸ **createBody**(`def?`: [BodyDef](/api/interfaces/bodydef)): *[Body](/api/classes/body)*

Create a rigid body given a definition. No reference to the definition is
retained.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](/api/interfaces/bodydef) |

**Returns:** *[Body](/api/classes/body)*

▸ **createBody**(`position`: [Vec2Value](/api/interfaces/vec2value), `angle?`: number): *[Body](/api/classes/body)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) |
`angle?` | number |

**Returns:** *[Body](/api/classes/body)*

___

###  createDynamicBody

▸ **createDynamicBody**(`def?`: [BodyDef](/api/interfaces/bodydef)): *[Body](/api/classes/body)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](/api/interfaces/bodydef) |

**Returns:** *[Body](/api/classes/body)*

▸ **createDynamicBody**(`position`: [Vec2Value](/api/interfaces/vec2value), `angle?`: number): *[Body](/api/classes/body)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) |
`angle?` | number |

**Returns:** *[Body](/api/classes/body)*

___

###  createJoint

▸ **createJoint**‹**T**›(`joint`: T): *T | null*

Create a joint to constrain bodies together. No reference to the definition
is retained. This may cause the connected bodies to cease colliding.

Warning: This function is locked during callbacks.

**Type parameters:**

▪ **T**: *[Joint](/api/classes/joint)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | T |

**Returns:** *T | null*

___

###  createKinematicBody

▸ **createKinematicBody**(`def?`: [BodyDef](/api/interfaces/bodydef)): *[Body](/api/classes/body)*

**Parameters:**

Name | Type |
------ | ------ |
`def?` | [BodyDef](/api/interfaces/bodydef) |

**Returns:** *[Body](/api/classes/body)*

▸ **createKinematicBody**(`position`: [Vec2Value](/api/interfaces/vec2value), `angle?`: number): *[Body](/api/classes/body)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) |
`angle?` | number |

**Returns:** *[Body](/api/classes/body)*

___

###  destroyBody

▸ **destroyBody**(`b`: [Body](/api/classes/body)): *boolean*

Destroy a rigid body given a definition. No reference to the definition is
retained.

Warning: This automatically deletes all associated shapes and joints.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`b` | [Body](/api/classes/body) |

**Returns:** *boolean*

___

###  destroyJoint

▸ **destroyJoint**(`joint`: [Joint](/api/classes/joint)): *void*

Destroy a joint. This may cause the connected bodies to begin colliding.
Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](/api/classes/joint) |

**Returns:** *void*

___

###  getAllowSleeping

▸ **getAllowSleeping**(): *boolean*

**Returns:** *boolean*

___

###  getAutoClearForces

▸ **getAutoClearForces**(): *boolean*

Get the flag that controls automatic clearing of forces after each time step.

**Returns:** *boolean*

___

###  getBodyCount

▸ **getBodyCount**(): *number*

**Returns:** *number*

___

###  getBodyList

▸ **getBodyList**(): *[Body](/api/classes/body) | null*

Get the world body list. With the returned body, use Body.getNext to get the
next body in the world list. A null body indicates the end of the list.

**Returns:** *[Body](/api/classes/body) | null*

the head of the world body list.

___

###  getContactCount

▸ **getContactCount**(): *number*

Get the number of contacts (each may have 0 or more contact points).

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[Contact](/api/classes/contact) | null*

Get the world contact list. With the returned contact, use Contact.getNext to
get the next contact in the world list. A null contact indicates the end of
the list.

Warning: contacts are created and destroyed in the middle of a time step.
Use ContactListener to avoid missing contacts.

**Returns:** *[Contact](/api/classes/contact) | null*

the head of the world contact list.

___

###  getContinuousPhysics

▸ **getContinuousPhysics**(): *boolean*

**Returns:** *boolean*

___

###  getGravity

▸ **getGravity**(): *Vec2*

Get the global gravity vector.

**Returns:** *Vec2*

___

###  getJointCount

▸ **getJointCount**(): *number*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[Joint](/api/classes/joint) | null*

Get the world joint list. With the returned joint, use Joint.getNext to get
the next joint in the world list. A null joint indicates the end of the list.

**Returns:** *[Joint](/api/classes/joint) | null*

the head of the world joint list.

___

###  getProxyCount

▸ **getProxyCount**(): *number*

Get the number of broad-phase proxies.

**Returns:** *number*

___

###  getSubStepping

▸ **getSubStepping**(): *boolean*

**Returns:** *boolean*

___

###  getTreeBalance

▸ **getTreeBalance**(): *number*

Get the balance of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeHeight

▸ **getTreeHeight**(): *number*

Get the height of broad-phase dynamic tree.

**Returns:** *number*

___

###  getTreeQuality

▸ **getTreeQuality**(): *number*

Get the quality metric of broad-phase dynamic tree. The smaller the better.
The minimum is 1.

**Returns:** *number*

___

###  getWarmStarting

▸ **getWarmStarting**(): *boolean*

**Returns:** *boolean*

___

###  isLocked

▸ **isLocked**(): *boolean*

Is the world locked (in the middle of a time step).

**Returns:** *boolean*

___

###  off

▸ **off**(`name`: "begin-contact", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"begin-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](/api/classes/contact)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *World*

▸ **off**(`name`: "end-contact", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"end-contact"*

▪ **listener**: *function*

▸ (`contact`: [Contact](/api/classes/contact)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *World*

▸ **off**(`name`: "pre-solve", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](/api/classes/contact), `oldManifold`: [Manifold](/api/classes/manifold)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |
`oldManifold` | [Manifold](/api/classes/manifold) |

**Returns:** *World*

▸ **off**(`name`: "post-solve", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](/api/classes/contact), `impulse`: [ContactImpulse](/api/classes/contactimpulse)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |
`impulse` | [ContactImpulse](/api/classes/contactimpulse) |

**Returns:** *World*

▸ **off**(`name`: "remove-body", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: [Body](/api/classes/body)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](/api/classes/body) |

**Returns:** *World*

▸ **off**(`name`: "remove-joint", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: [Joint](/api/classes/joint)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](/api/classes/joint) |

**Returns:** *World*

▸ **off**(`name`: "remove-fixture", `listener`: function): *World*

Remove an event listener.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](/api/classes/fixture)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](/api/classes/fixture) |

**Returns:** *World*

___

###  on

▸ **on**(`name`: "begin-contact", `listener`: function): *World*

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

▸ (`contact`: [Contact](/api/classes/contact)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *World*

▸ **on**(`name`: "end-contact", `listener`: function): *World*

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

▸ (`contact`: [Contact](/api/classes/contact)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *World*

▸ **on**(`name`: "pre-solve", `listener`: function): *World*

This is called after a contact is updated. This allows you to inspect a
contact before it goes to the solver. If you are careful, you can modify the
contact manifold (e.g. disable contact). A copy of the old manifold is
provided so that you can detect changes. Note: this is called only for awake
bodies. Note: this is called even when the number of contact points is zero.
Note: this is not called for sensors. Note: if you set the number of contact
points to zero, you will not get an end-contact callback. However, you may get
a begin-contact callback the next step.

Warning: You cannot create/destroy world entities inside these callbacks.

**Parameters:**

▪ **name**: *"pre-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](/api/classes/contact), `oldManifold`: [Manifold](/api/classes/manifold)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |
`oldManifold` | [Manifold](/api/classes/manifold) |

**Returns:** *World*

▸ **on**(`name`: "post-solve", `listener`: function): *World*

This lets you inspect a contact after the solver is finished. This is useful
for inspecting impulses. Note: the contact manifold does not include time of
impact impulses, which can be arbitrarily large if the sub-step is small.
Hence the impulse is provided explicitly in a separate data structure. Note:
this is only called for contacts that are touching, solid, and awake.

Warning: You cannot create/destroy world entities inside these callbacks.

**Parameters:**

▪ **name**: *"post-solve"*

▪ **listener**: *function*

▸ (`contact`: [Contact](/api/classes/contact), `impulse`: [ContactImpulse](/api/classes/contactimpulse)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |
`impulse` | [ContactImpulse](/api/classes/contactimpulse) |

**Returns:** *World*

▸ **on**(`name`: "remove-body", `listener`: function): *World*

Listener is called whenever a body is removed.

**Parameters:**

▪ **name**: *"remove-body"*

▪ **listener**: *function*

▸ (`body`: [Body](/api/classes/body)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](/api/classes/body) |

**Returns:** *World*

▸ **on**(`name`: "remove-joint", `listener`: function): *World*

Listener is called whenever a joint is removed implicitly or explicitly.

**Parameters:**

▪ **name**: *"remove-joint"*

▪ **listener**: *function*

▸ (`joint`: [Joint](/api/classes/joint)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](/api/classes/joint) |

**Returns:** *World*

▸ **on**(`name`: "remove-fixture", `listener`: function): *World*

Listener is called whenever a fixture is removed implicitly or explicitly.

**Parameters:**

▪ **name**: *"remove-fixture"*

▪ **listener**: *function*

▸ (`fixture`: [Fixture](/api/classes/fixture)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](/api/classes/fixture) |

**Returns:** *World*

___

###  publish

▸ **publish**(`name`: string, `arg1?`: any, `arg2?`: any, `arg3?`: any): *number*

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

▸ **queryAABB**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `callback`: [WorldAABBQueryCallback](/api/globals#worldaabbquerycallback)): *void*

Query the world for all fixtures that potentially overlap the provided AABB.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) | The query box. |
`callback` | [WorldAABBQueryCallback](/api/globals#worldaabbquerycallback) | Called for each fixture found in the query AABB. It may return `false` to terminate the query.  |

**Returns:** *void*

___

###  rayCast

▸ **rayCast**(`point1`: [Vec2Value](/api/interfaces/vec2value), `point2`: [Vec2Value](/api/interfaces/vec2value), `callback`: [WorldRayCastCallback](/api/globals#worldraycastcallback)): *void*

Ray-cast the world for all fixtures in the path of the ray. Your callback
controls whether you get the closest point, any point, or n-points. The
ray-cast ignores shapes that contain the starting point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`point1` | [Vec2Value](/api/interfaces/vec2value) | The ray starting point |
`point2` | [Vec2Value](/api/interfaces/vec2value) | The ray ending point |
`callback` | [WorldRayCastCallback](/api/globals#worldraycastcallback) | A function that is called for each fixture that is hit by the ray. You control how the ray cast proceeds by returning a numeric/float value.  |

**Returns:** *void*

___

###  setAllowSleeping

▸ **setAllowSleeping**(`flag`: boolean): *void*

Enable/disable sleep.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAutoClearForces

▸ **setAutoClearForces**(`flag`: boolean): *void*

Set flag to control automatic clearing of forces after each time step.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setContinuousPhysics

▸ **setContinuousPhysics**(`flag`: boolean): *void*

Enable/disable continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravity

▸ **setGravity**(`gravity`: [Vec2Value](/api/interfaces/vec2value)): *void*

Change the global gravity vector.

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

___

###  setSubStepping

▸ **setSubStepping**(`flag`: boolean): *void*

Enable/disable single stepped continuous physics. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setWarmStarting

▸ **setWarmStarting**(`flag`: boolean): *void*

Enable/disable warm starting. For testing.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2Value](/api/interfaces/vec2value)): *void*

Shift the world origin. Useful for large worlds. The body shift formula is:
position -= newOrigin

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newOrigin` | [Vec2Value](/api/interfaces/vec2value) | The new origin with respect to the old origin  |

**Returns:** *void*

___

###  step

▸ **step**(`timeStep`: number, `velocityIterations?`: number, `positionIterations?`: number): *void*

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
