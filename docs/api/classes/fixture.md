[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Fixture](fixture.md)

# Class: Fixture

A fixture is used to attach a shape to a body for collision detection. A
fixture inherits its transform from its parent. Fixtures hold additional
non-geometric data such as friction, collision filters, etc.

To create a new Fixture use [Body.createFixture](body.md#createfixture).

## Hierarchy

* **Fixture**

## Index

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

## Methods

###  createProxies

▸ **createProxies**(`broadPhase`: [BroadPhase](broadphase.md), `xf`: [Transform](transform.md)): *void*

*Defined in [src/dynamics/Fixture.ts:369](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L369)*

These support body activation/deactivation.

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  destroyProxies

▸ **destroyProxies**(`broadPhase`: [BroadPhase](broadphase.md)): *void*

*Defined in [src/dynamics/Fixture.ts:382](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L382)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |

**Returns:** *void*

___

###  getAABB

▸ **getAABB**(`childIndex`: number): *[AABB](aabb.md)*

*Defined in [src/dynamics/Fixture.ts:361](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L361)*

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

*Defined in [src/dynamics/Fixture.ts:277](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L277)*

Get the parent body of this fixture. This is null if the fixture is not
attached.

**Returns:** *[Body](body.md)*

___

###  getDensity

▸ **getDensity**(): *number*

*Defined in [src/dynamics/Fixture.ts:291](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L291)*

Get the density of this fixture.

**Returns:** *number*

___

###  getFilterCategoryBits

▸ **getFilterCategoryBits**(): *number*

*Defined in [src/dynamics/Fixture.ts:435](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L435)*

**Returns:** *number*

___

###  getFilterGroupIndex

▸ **getFilterGroupIndex**(): *number*

*Defined in [src/dynamics/Fixture.ts:427](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L427)*

**Returns:** *number*

___

###  getFilterMaskBits

▸ **getFilterMaskBits**(): *number*

*Defined in [src/dynamics/Fixture.ts:443](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L443)*

**Returns:** *number*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [src/dynamics/Fixture.ts:307](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L307)*

Get the coefficient of friction, usually in the range [0,1].

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [src/dynamics/Fixture.ts:353](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L353)*

Get the mass data for this fixture. The mass data is based on the density and
the shape. The rotational inertia is about the shape's origin. This operation
may be expensive.

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Fixture](fixture.md) | null*

*Defined in [src/dynamics/Fixture.ts:284](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L284)*

Get the next fixture in the parent body's fixture list.

**Returns:** *[Fixture](fixture.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [src/dynamics/Fixture.ts:322](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L322)*

Get the coefficient of restitution.

**Returns:** *number*

___

###  getShape

▸ **getShape**(): *[Shape](shape.md)*

*Defined in [src/dynamics/Fixture.ts:229](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L229)*

Get the child shape. You can modify the child shape, however you should not
change the number of vertices because this will crash some collision caching
mechanisms. Manipulating the shape may lead to non-physical behavior.

**Returns:** *[Shape](shape.md)*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [src/dynamics/Fixture.ts:220](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L220)*

Get the type of the child shape. You can use this to down cast to the
concrete shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [src/dynamics/Fixture.ts:262](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L262)*

Get the user data that was assigned in the fixture definition. Use this to
store your application specific data.

**Returns:** *unknown*

___

###  isSensor

▸ **isSensor**(): *boolean*

*Defined in [src/dynamics/Fixture.ts:237](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L237)*

A sensor shape collects contact information but never generates a collision
response.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `childIndex`: number): *boolean*

*Defined in [src/dynamics/Fixture.ts:344](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L344)*

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

*Defined in [src/dynamics/Fixture.ts:455](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L455)*

Call this if you want to establish collision that was previously disabled by
ContactFilter.

**Returns:** *void*

___

###  setDensity

▸ **setDensity**(`density`: number): *void*

*Defined in [src/dynamics/Fixture.ts:299](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L299)*

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

*Defined in [src/dynamics/Fixture.ts:439](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L439)*

**Parameters:**

Name | Type |
------ | ------ |
`categoryBits` | number |

**Returns:** *void*

___

###  setFilterData

▸ **setFilterData**(`filter`: object): *void*

*Defined in [src/dynamics/Fixture.ts:420](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L420)*

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

*Defined in [src/dynamics/Fixture.ts:431](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L431)*

**Parameters:**

Name | Type |
------ | ------ |
`groupIndex` | number |

**Returns:** *void*

___

###  setFilterMaskBits

▸ **setFilterMaskBits**(`maskBits`: number): *void*

*Defined in [src/dynamics/Fixture.ts:447](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L447)*

**Parameters:**

Name | Type |
------ | ------ |
`maskBits` | number |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [src/dynamics/Fixture.ts:315](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L315)*

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

*Defined in [src/dynamics/Fixture.ts:330](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L330)*

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

*Defined in [src/dynamics/Fixture.ts:244](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L244)*

Set if this fixture is a sensor.

**Parameters:**

Name | Type |
------ | ------ |
`sensor` | boolean |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Defined in [src/dynamics/Fixture.ts:269](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L269)*

Set the user data. Use this to store your application specific data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Fixture](fixture.md)): *boolean*

*Defined in [src/dynamics/Fixture.ts:496](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L496)*

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

▸ **synchronize**(`broadPhase`: [BroadPhase](broadphase.md), `xf1`: [Transform](transform.md), `xf2`: [Transform](transform.md)): *void*

*Defined in [src/dynamics/Fixture.ts:397](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L397)*

Updates this fixture proxy in broad-phase (with combined AABB of current and
next transformation).

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |
`xf1` | [Transform](transform.md) |
`xf2` | [Transform](transform.md) |

**Returns:** *void*

___

###  testPoint

▸ **testPoint**(`p`: [Vec2](vec2.md)): *boolean*

*Defined in [src/dynamics/Fixture.ts:337](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Fixture.ts#L337)*

Test a point in world coordinates for containment in this fixture.

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *boolean*
