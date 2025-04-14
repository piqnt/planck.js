# Class: World

The `World` class contains the bodies and joints. It manages all aspects
of the simulation and allows for asynchronous queries (like AABB queries
and ray-casts). Much of your interactions with Planck.js will be with a
World object.

## Constructors

### new World()

> **new World**(`def`?): [`World`](/api/classes/World)

#### Parameters

• **def?**: [`Vec2Value`](/api/interfaces/Vec2Value) \| [`WorldDef`](/api/interfaces/WorldDef)

World definition or gravity vector.

#### Returns

[`World`](/api/classes/World)

## Methods

### clearForces()

> **clearForces**(): `void`

Manually clear the force buffer on all bodies. By default, forces are cleared
automatically after each call to step. The default behavior is modified by
calling setAutoClearForces. The purpose of this function is to support
sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
under a variable frame-rate. When you perform sub-stepping you will disable
auto clearing of forces and instead call clearForces after all sub-steps are
complete in one pass of your game loop.

See [World.setAutoClearForces](/api/classes/World#setautoclearforces)

#### Returns

`void`

***

### createBody()

#### createBody(def)

> **createBody**(`def`?): [`Body`](/api/classes/Body)

Create a rigid body given a definition. No reference to the definition is
retained.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

##### Parameters

• **def?**: [`BodyDef`](/api/interfaces/BodyDef)

##### Returns

[`Body`](/api/classes/Body)

#### createBody(position, angle)

> **createBody**(`position`, `angle`?): [`Body`](/api/classes/Body)

##### Parameters

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **angle?**: `number`

##### Returns

[`Body`](/api/classes/Body)

***

### createDynamicBody()

#### createDynamicBody(def)

> **createDynamicBody**(`def`?): [`Body`](/api/classes/Body)

##### Parameters

• **def?**: [`BodyDef`](/api/interfaces/BodyDef)

##### Returns

[`Body`](/api/classes/Body)

#### createDynamicBody(position, angle)

> **createDynamicBody**(`position`, `angle`?): [`Body`](/api/classes/Body)

##### Parameters

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **angle?**: `number`

##### Returns

[`Body`](/api/classes/Body)

***

### createJoint()

> **createJoint**\<`T`\>(`joint`): `T`

Create a joint to constrain bodies together. No reference to the definition
is retained. This may cause the connected bodies to cease colliding.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Type Parameters

• **T** *extends* [`Joint`](/api/classes/Joint)

#### Parameters

• **joint**: `T`

#### Returns

`T`

***

### createKinematicBody()

#### createKinematicBody(def)

> **createKinematicBody**(`def`?): [`Body`](/api/classes/Body)

##### Parameters

• **def?**: [`BodyDef`](/api/interfaces/BodyDef)

##### Returns

[`Body`](/api/classes/Body)

#### createKinematicBody(position, angle)

> **createKinematicBody**(`position`, `angle`?): [`Body`](/api/classes/Body)

##### Parameters

• **position**: [`Vec2Value`](/api/interfaces/Vec2Value)

• **angle?**: `number`

##### Returns

[`Body`](/api/classes/Body)

***

### destroyBody()

> **destroyBody**(`b`): `boolean`

Destroy a body from the world.

Warning: This automatically deletes all associated shapes and joints.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Parameters

• **b**: [`Body`](/api/classes/Body)

#### Returns

`boolean`

***

### destroyJoint()

> **destroyJoint**(`joint`): `void`

Destroy a joint.

Warning: This may cause the connected bodies to begin colliding.

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Parameters

• **joint**: [`Joint`](/api/classes/Joint)

#### Returns

`void`

***

### getAllowSleeping()

> **getAllowSleeping**(): `boolean`

#### Returns

`boolean`

***

### getAutoClearForces()

> **getAutoClearForces**(): `boolean`

Get the flag that controls automatic clearing of forces after each time step.

#### Returns

`boolean`

***

### getBodyCount()

> **getBodyCount**(): `number`

#### Returns

`number`

***

### getBodyList()

> **getBodyList**(): [`Body`](/api/classes/Body)

Get the world body list. With the returned body, use Body.getNext to get the
next body in the world list. A null body indicates the end of the list.

#### Returns

[`Body`](/api/classes/Body)

the head of the world body list.

***

### getContactCount()

> **getContactCount**(): `number`

Get the number of contacts (each may have 0 or more contact points).

#### Returns

`number`

***

### getContactList()

> **getContactList**(): [`Contact`](/api/classes/Contact)

Get the world contact list. With the returned contact, use Contact.getNext to
get the next contact in the world list. A null contact indicates the end of
the list.

Warning: contacts are created and destroyed in the middle of a time step.
Use ContactListener to avoid missing contacts.

#### Returns

[`Contact`](/api/classes/Contact)

the head of the world contact list.

***

### getContinuousPhysics()

> **getContinuousPhysics**(): `boolean`

#### Returns

`boolean`

***

### getGravity()

> **getGravity**(): [`Vec2`](/api/classes/Vec2)

Get the global gravity vector.

#### Returns

[`Vec2`](/api/classes/Vec2)

***

### getJointCount()

> **getJointCount**(): `number`

#### Returns

`number`

***

### getJointList()

> **getJointList**(): [`Joint`](/api/classes/Joint)

Get the world joint list. With the returned joint, use Joint.getNext to get
the next joint in the world list. A null joint indicates the end of the list.

#### Returns

[`Joint`](/api/classes/Joint)

the head of the world joint list.

***

### getProxyCount()

> **getProxyCount**(): `number`

Get the number of broad-phase proxies.

#### Returns

`number`

***

### getSubStepping()

> **getSubStepping**(): `boolean`

#### Returns

`boolean`

***

### getTreeBalance()

> **getTreeBalance**(): `number`

Get the balance of broad-phase dynamic tree.

#### Returns

`number`

***

### getTreeHeight()

> **getTreeHeight**(): `number`

Get the height of broad-phase dynamic tree.

#### Returns

`number`

***

### getTreeQuality()

> **getTreeQuality**(): `number`

Get the quality metric of broad-phase dynamic tree. The smaller the better.
The minimum is 1.

#### Returns

`number`

***

### getWarmStarting()

> **getWarmStarting**(): `boolean`

#### Returns

`boolean`

***

### isLocked()

> **isLocked**(): `boolean`

Is the world locked (in the middle of a time step).

#### Returns

`boolean`

***

### off()

Remove an event listener.

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"begin-contact"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"end-contact"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"pre-solve"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"post-solve"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"remove-body"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"remove-joint"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### off(name, listener)

> **off**(`name`, `listener`): [`World`](/api/classes/World)

Remove an event listener.

##### Parameters

• **name**: `"remove-fixture"`

• **listener**

##### Returns

[`World`](/api/classes/World)

***

### on()

Register an event listener.

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

Called when two fixtures begin to touch.

Implement contact callbacks to get contact information. You can use these
results for things like sounds and game logic. You can also get contact
results by traversing the contact lists after the time step. However, you
might miss some contacts because continuous physics leads to sub-stepping.
Additionally you may receive multiple callbacks for the same contact in a
single time step. You should strive to make your callbacks efficient because
there may be many callbacks per time step.

Warning: You cannot create/destroy world entities inside these callbacks.

##### Parameters

• **name**: `"begin-contact"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

Called when two fixtures cease to touch.

Implement contact callbacks to get contact information. You can use these
results for things like sounds and game logic. You can also get contact
results by traversing the contact lists after the time step. However, you
might miss some contacts because continuous physics leads to sub-stepping.
Additionally you may receive multiple callbacks for the same contact in a
single time step. You should strive to make your callbacks efficient because
there may be many callbacks per time step.

Warning: You cannot create/destroy world entities inside these callbacks.

##### Parameters

• **name**: `"end-contact"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

This is called after a contact is updated. This allows you to inspect a
contact before it goes to the solver. If you are careful, you can modify the
contact manifold (e.g. disable contact). A copy of the old manifold is
provided so that you can detect changes. Note: this is called only for awake
bodies. Note: this is called even when the number of contact points is zero.
Note: this is not called for sensors. Note: if you set the number of contact
points to zero, you will not get an end-contact callback. However, you may get
a begin-contact callback the next step.

Warning: You cannot create/destroy world entities inside these callbacks.

##### Parameters

• **name**: `"pre-solve"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

This lets you inspect a contact after the solver is finished. This is useful
for inspecting impulses. Note: the contact manifold does not include time of
impact impulses, which can be arbitrarily large if the sub-step is small.
Hence the impulse is provided explicitly in a separate data structure. Note:
this is only called for contacts that are touching, solid, and awake.

Warning: You cannot create/destroy world entities inside these callbacks.

##### Parameters

• **name**: `"post-solve"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

Listener is called whenever a body is removed.

##### Parameters

• **name**: `"remove-body"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

Listener is called whenever a joint is removed implicitly or explicitly.

##### Parameters

• **name**: `"remove-joint"`

• **listener**

##### Returns

[`World`](/api/classes/World)

#### on(name, listener)

> **on**(`name`, `listener`): [`World`](/api/classes/World)

Listener is called whenever a fixture is removed implicitly or explicitly.

##### Parameters

• **name**: `"remove-fixture"`

• **listener**

##### Returns

[`World`](/api/classes/World)

***

### publish()

> **publish**(`name`, `arg1`?, `arg2`?, `arg3`?): `number`

#### Parameters

• **name**: `string`

• **arg1?**: `any`

• **arg2?**: `any`

• **arg3?**: `any`

#### Returns

`number`

***

### queryAABB()

> **queryAABB**(`aabb`, `callback`): `void`

Query the world for all fixtures that potentially overlap the provided AABB.

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

The query box.

• **callback**: [`WorldAABBQueryCallback`](/api/type-aliases/WorldAABBQueryCallback)

Called for each fixture found in the query AABB. It may return `false` to terminate the query.

#### Returns

`void`

***

### queueUpdate()

> **queueUpdate**(`callback`): `void`

Queue a function to be called after ongoing simulation step. If no simulation is in progress call it immediately.

#### Parameters

• **callback**

#### Returns

`void`

***

### rayCast()

> **rayCast**(`point1`, `point2`, `callback`): `void`

Ray-cast the world for all fixtures in the path of the ray. Your callback
controls whether you get the closest point, any point, or n-points. The
ray-cast ignores shapes that contain the starting point.

#### Parameters

• **point1**: [`Vec2Value`](/api/interfaces/Vec2Value)

The ray starting point

• **point2**: [`Vec2Value`](/api/interfaces/Vec2Value)

The ray ending point

• **callback**: [`WorldRayCastCallback`](/api/type-aliases/WorldRayCastCallback)

A function that is called for each fixture that is hit by the ray. You control how the ray cast proceeds by returning a numeric/float value.

#### Returns

`void`

***

### setAllowSleeping()

> **setAllowSleeping**(`flag`): `void`

Enable/disable sleep.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setAutoClearForces()

> **setAutoClearForces**(`flag`): `void`

Set flag to control automatic clearing of forces after each time step.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setContinuousPhysics()

> **setContinuousPhysics**(`flag`): `void`

Enable/disable continuous physics. For testing.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setGravity()

> **setGravity**(`gravity`): `void`

Change the global gravity vector.

#### Parameters

• **gravity**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`void`

***

### setSubStepping()

> **setSubStepping**(`flag`): `void`

Enable/disable single stepped continuous physics. For testing.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### setWarmStarting()

> **setWarmStarting**(`flag`): `void`

Enable/disable warm starting. For testing.

#### Parameters

• **flag**: `boolean`

#### Returns

`void`

***

### shiftOrigin()

> **shiftOrigin**(`newOrigin`): `void`

Shift the world origin. Useful for large worlds. The body shift formula is:
position -= newOrigin

#### Parameters

• **newOrigin**: [`Vec2Value`](/api/interfaces/Vec2Value)

The new origin with respect to the old origin

Warning: This function is locked when a world simulation step is in progress. Use queueUpdate to schedule a function to be called after the step.

#### Returns

`void`

***

### step()

> **step**(`timeStep`, `velocityIterations`?, `positionIterations`?): `void`

Take a time step. This performs collision detection, integration, and
constraint solution.

Broad-phase, narrow-phase, solve and solve time of impacts.

#### Parameters

• **timeStep**: `number`

Time step, this should not vary.

• **velocityIterations?**: `number`

• **positionIterations?**: `number`

#### Returns

`void`
