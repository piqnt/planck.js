[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Fixture](fixture.md)

# Class: Fixture

A fixture is used to attach a shape to a body for collision detection. A
fixture inherits its transform from its parent. Fixtures hold additional
non-geometric data such as friction, collision filters, etc.

To create a new Fixture use [Body.createFixture](body.md#createfixture).

## Hierarchy

* **Fixture**

## Index

### Properties

* [style](fixture.md#style)

### Methods

* [createProxies](fixture.md#createproxies)
* [destroyProxies](fixture.md#destroyproxies)
* [getAABB](fixture.md#getaabb)
* [getBody](fixture.md#getbody)
* [getDensity](fixture.md#getdensity)
* [getFilterCategoryBits](fixture.md#getfiltercategorybits)
* [getFilterGroupIndex](fixture.md#getfiltergroupindex)
* [getFilterMaskBits](fixture.md#getfiltermaskbits)
* [getFriction](fixture.md#getfriction)
* [getMassData](fixture.md#getmassdata)
* [getNext](fixture.md#getnext)
* [getRestitution](fixture.md#getrestitution)
* [getShape](fixture.md#getshape)
* [getType](fixture.md#gettype)
* [getUserData](fixture.md#getuserdata)
* [isSensor](fixture.md#issensor)
* [rayCast](fixture.md#raycast)
* [refilter](fixture.md#refilter)
* [setDensity](fixture.md#setdensity)
* [setFilterCategoryBits](fixture.md#setfiltercategorybits)
* [setFilterData](fixture.md#setfilterdata)
* [setFilterGroupIndex](fixture.md#setfiltergroupindex)
* [setFilterMaskBits](fixture.md#setfiltermaskbits)
* [setFriction](fixture.md#setfriction)
* [setRestitution](fixture.md#setrestitution)
* [setSensor](fixture.md#setsensor)
* [setUserData](fixture.md#setuserdata)
* [shouldCollide](fixture.md#shouldcollide)
* [synchronize](fixture.md#synchronize)
* [testPoint](fixture.md#testpoint)

## Properties

###  style

• **style**: *[Style](../interfaces/style.md)*

Styling for dev-tools.

## Methods

###  createProxies

▸ **createProxies**(`broadPhase`: [BroadPhase](broadphase.md), `xf`: [TransformValue](../globals.md#transformvalue)): *void*

These support body activation/deactivation.

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |
`xf` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

###  destroyProxies

▸ **destroyProxies**(`broadPhase`: [BroadPhase](broadphase.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |

**Returns:** *void*

___

###  getAABB

▸ **getAABB**(`childIndex`: number): *[AABB](aabb.md)*

Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
more accurate AABB, compute it using the shape and the body transform.

**Parameters:**

Name | Type |
------ | ------ |
`childIndex` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getBody

▸ **getBody**(): *[Body](body.md)*

Get the parent body of this fixture. This is null if the fixture is not
attached.

**Returns:** *[Body](body.md)*

___

###  getDensity

▸ **getDensity**(): *number*

Get the density of this fixture.

**Returns:** *number*

___

###  getFilterCategoryBits

▸ **getFilterCategoryBits**(): *number*

**Returns:** *number*

___

###  getFilterGroupIndex

▸ **getFilterGroupIndex**(): *number*

**Returns:** *number*

___

###  getFilterMaskBits

▸ **getFilterMaskBits**(): *number*

**Returns:** *number*

___

###  getFriction

▸ **getFriction**(): *number*

Get the coefficient of friction, usually in the range [0,1].

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`massData`: [MassData](../interfaces/massdata.md)): *void*

Get the mass data for this fixture. The mass data is based on the density and
the shape. The rotational inertia is about the shape's origin. This operation
may be expensive.

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Fixture](fixture.md) | null*

Get the next fixture in the parent body's fixture list.

**Returns:** *[Fixture](fixture.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

Get the coefficient of restitution.

**Returns:** *number*

___

###  getShape

▸ **getShape**(): *[Shape](shape.md)*

Get the child shape. You can modify the child shape, however you should not
change the number of vertices because this will crash some collision caching
mechanisms. Manipulating the shape may lead to non-physical behavior.

**Returns:** *[Shape](shape.md)*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

Get the type of the child shape. You can use this to down cast to the
concrete shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

Get the user data that was assigned in the fixture definition. Use this to
store your application specific data.

**Returns:** *unknown*

___

###  isSensor

▸ **isSensor**(): *boolean*

A sensor shape collects contact information but never generates a collision
response.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `childIndex`: number): *boolean*

Cast a ray against this shape.

**Parameters:**

Name | Type |
------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) |
`input` | [RayCastInput](../interfaces/raycastinput.md) |
`childIndex` | number |

**Returns:** *boolean*

___

###  refilter

▸ **refilter**(): *void*

Call this if you want to establish collision that was previously disabled by
ContactFilter.

**Returns:** *void*

___

###  setDensity

▸ **setDensity**(`density`: number): *void*

Set the density of this fixture. This will _not_ automatically adjust the
mass of the body. You must call Body.resetMassData to update the body's mass.

**Parameters:**

Name | Type |
------ | ------ |
`density` | number |

**Returns:** *void*

___

###  setFilterCategoryBits

▸ **setFilterCategoryBits**(`categoryBits`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`categoryBits` | number |

**Returns:** *void*

___

###  setFilterData

▸ **setFilterData**(`filter`: object): *void*

Set the contact filtering data. This will not update contacts until the next
time step when either parent body is active and awake. This automatically
calls refilter.

**Parameters:**

▪ **filter**: *object*

Name | Type |
------ | ------ |
`categoryBits` | number |
`groupIndex` | number |
`maskBits` | number |

**Returns:** *void*

___

###  setFilterGroupIndex

▸ **setFilterGroupIndex**(`groupIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`groupIndex` | number |

**Returns:** *void*

___

###  setFilterMaskBits

▸ **setFilterMaskBits**(`maskBits`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`maskBits` | number |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

Set the coefficient of friction. This will not change the friction of
existing contacts.

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

Set the coefficient of restitution. This will not change the restitution of
existing contacts.

**Parameters:**

Name | Type |
------ | ------ |
`restitution` | number |

**Returns:** *void*

___

###  setSensor

▸ **setSensor**(`sensor`: boolean): *void*

Set if this fixture is a sensor.

**Parameters:**

Name | Type |
------ | ------ |
`sensor` | boolean |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

Set the user data. Use this to store your application specific data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Fixture](fixture.md)): *boolean*

Implement this method to provide collision filtering, if you want finer
control over contact creation.

Return true if contact calculations should be performed between these two
fixtures.

Warning: for performance reasons this is only called when the AABBs begin to
overlap.

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Fixture](fixture.md) |

**Returns:** *boolean*

___

###  synchronize

▸ **synchronize**(`broadPhase`: [BroadPhase](broadphase.md), `xf1`: [TransformValue](../globals.md#transformvalue), `xf2`: [TransformValue](../globals.md#transformvalue)): *void*

Updates this fixture proxy in broad-phase (with combined AABB of current and
next transformation).

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |
`xf1` | [TransformValue](../globals.md#transformvalue) |
`xf2` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

###  testPoint

▸ **testPoint**(`p`: [Vec2Value](../interfaces/vec2value.md)): *boolean*

Test a point in world coordinates for containment in this fixture.

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *boolean*
