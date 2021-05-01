[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Fixture](fixture.md)

# Class: Fixture

A fixture is used to attach a shape to a body for collision detection. A
fixture inherits its transform from its parent. Fixtures hold additional
non-geometric data such as friction, collision filters, etc. Fixtures are
created via Body.createFixture.
A fixture is used to attach a shape to a body for collision detection. A
fixture inherits its transform from its parent. Fixtures hold additional
non-geometric data such as friction, collision filters, etc. Fixtures are
created via Body.createFixture.

## Hierarchy

* **Fixture**

## Index

### Constructors

* [constructor](fixture.md#constructor)

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

## Constructors

###  constructor

\+ **new Fixture**(`body`: [Body](body.md), `def`: [FixtureDef](../interfaces/fixturedef.md)): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:760](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L760)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`def` | [FixtureDef](../interfaces/fixturedef.md) |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: [Body](body.md), `shape`: [Shape](shape.md), `def?`: [FixtureOpt](../interfaces/fixtureopt.md)): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:761](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L761)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`shape` | [Shape](shape.md) |
`def?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: [Body](body.md), `shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:762](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L762)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: Body, `def`: FixtureDef): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Fixture.ts:128](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Fixture.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |
`def` | FixtureDef |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: Body, `shape`: Shape, `def?`: FixtureOpt): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Fixture.ts:130](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Fixture.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |
`shape` | Shape |
`def?` | FixtureOpt |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: Body, `shape`: Shape, `density?`: number): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Fixture.ts:131](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Fixture.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |
`shape` | Shape |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

## Methods

###  createProxies

▸ **createProxies**(`broadPhase`: [BroadPhase](broadphase.md), `xf`: [Transform](transform.md)): *void*

*Defined in [dist/planck.d.ts:862](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L862)*

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

*Defined in [dist/planck.d.ts:863](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L863)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |

**Returns:** *void*

___

###  getAABB

▸ **getAABB**(`childIndex`: number): *[AABB](aabb.md)*

*Defined in [dist/planck.d.ts:858](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L858)*

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

*Defined in [dist/planck.d.ts:808](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L808)*

Get the parent body of this fixture. This is null if the fixture is not
attached.

**Returns:** *[Body](body.md)*

___

###  getDensity

▸ **getDensity**(): *number*

*Defined in [dist/planck.d.ts:816](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L816)*

Get the density of this fixture.

**Returns:** *number*

___

###  getFilterCategoryBits

▸ **getFilterCategoryBits**(): *number*

*Defined in [dist/planck.d.ts:881](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L881)*

**Returns:** *number*

___

###  getFilterGroupIndex

▸ **getFilterGroupIndex**(): *number*

*Defined in [dist/planck.d.ts:879](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L879)*

**Returns:** *number*

___

###  getFilterMaskBits

▸ **getFilterMaskBits**(): *number*

*Defined in [dist/planck.d.ts:883](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L883)*

**Returns:** *number*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [dist/planck.d.ts:825](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L825)*

Get the coefficient of friction, usually in the range [0,1].

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [dist/planck.d.ts:853](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L853)*

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

*Defined in [dist/planck.d.ts:812](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L812)*

Get the next fixture in the parent body's fixture list.

**Returns:** *[Fixture](fixture.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [dist/planck.d.ts:834](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L834)*

Get the coefficient of restitution.

**Returns:** *number*

___

###  getShape

▸ **getShape**(): *[Shape](shape.md)*

*Defined in [dist/planck.d.ts:779](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L779)*

Get the child shape. You can modify the child shape, however you should not
change the number of vertices because this will crash some collision caching
mechanisms. Manipulating the shape may lead to non-physical behavior.

**Returns:** *[Shape](shape.md)*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [dist/planck.d.ts:773](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L773)*

Get the type of the child shape. You can use this to down cast to the
concrete shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dist/planck.d.ts:799](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L799)*

Get the user data that was assigned in the fixture definition. Use this to
store your application specific data.

**Returns:** *unknown*

___

###  isSensor

▸ **isSensor**(): *boolean*

*Defined in [dist/planck.d.ts:784](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L784)*

A sensor shape collects contact information but never generates a collision
response.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `childIndex`: number): *boolean*

*Defined in [dist/planck.d.ts:847](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L847)*

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

*Defined in [dist/planck.d.ts:889](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L889)*

Call this if you want to establish collision that was previously disabled by
ContactFilter.

**Returns:** *void*

___

###  setDensity

▸ **setDensity**(`density`: number): *void*

*Defined in [dist/planck.d.ts:821](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L821)*

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

*Defined in [dist/planck.d.ts:882](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L882)*

**Parameters:**

Name | Type |
------ | ------ |
`categoryBits` | number |

**Returns:** *void*

___

###  setFilterData

▸ **setFilterData**(`filter`: object): *void*

*Defined in [dist/planck.d.ts:874](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L874)*

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

▸ **setFilterGroupIndex**(`groupIndex`: number): *number*

*Defined in [dist/planck.d.ts:880](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L880)*

**Parameters:**

Name | Type |
------ | ------ |
`groupIndex` | number |

**Returns:** *number*

___

###  setFilterMaskBits

▸ **setFilterMaskBits**(`maskBits`: number): *void*

*Defined in [dist/planck.d.ts:884](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L884)*

**Parameters:**

Name | Type |
------ | ------ |
`maskBits` | number |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [dist/planck.d.ts:830](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L830)*

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

*Defined in [dist/planck.d.ts:839](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L839)*

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

*Defined in [dist/planck.d.ts:788](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L788)*

Set if this fixture is a sensor.

**Parameters:**

Name | Type |
------ | ------ |
`sensor` | boolean |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Defined in [dist/planck.d.ts:803](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L803)*

Set the user data. Use this to store your application specific data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Fixture](fixture.md)): *boolean*

*Defined in [dist/planck.d.ts:900](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L900)*

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

*Defined in [dist/planck.d.ts:868](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L868)*

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

*Defined in [dist/planck.d.ts:843](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L843)*

Test a point in world coordinates for containment in this fixture.

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *boolean*
