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

* [_serialize](fixture.md#_serialize)
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
* [_deserialize](fixture.md#static-_deserialize)

## Constructors

###  constructor

\+ **new Fixture**(`body`: [Body](body.md), `def`: [FixtureDef](../interfaces/fixturedef.md)): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:771](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L771)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`def` | [FixtureDef](../interfaces/fixturedef.md) |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: [Body](body.md), `shape`: [Shape](shape.md), `def?`: [FixtureOpt](../interfaces/fixtureopt.md)): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:772](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L772)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`shape` | [Shape](shape.md) |
`def?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: [Body](body.md), `shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:773](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L773)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: Body, `def`: FixtureDef): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Fixture.ts:128](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Fixture.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |
`def` | FixtureDef |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: Body, `shape`: Shape, `def?`: FixtureOpt): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Fixture.ts:130](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Fixture.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |
`shape` | Shape |
`def?` | FixtureOpt |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: Body, `shape`: Shape, `density?`: number): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Fixture.ts:131](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Fixture.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | Body |
`shape` | Shape |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Defined in [dist/planck.d.ts:780](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L780)*

**Returns:** *object*

* **density**: *number*

* **filterCategoryBits**: *number*

* **filterGroupIndex**: *number*

* **filterMaskBits**: *number*

* **friction**: *number*

* **isSensor**: *boolean*

* **restitution**: *number*

* **shape**: *[Shape](shape.md)*

___

###  createProxies

▸ **createProxies**(`broadPhase`: [BroadPhase](broadphase.md), `xf`: [Transform](transform.md)): *void*

*Defined in [dist/planck.d.ts:884](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L884)*

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

*Defined in [dist/planck.d.ts:885](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L885)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |

**Returns:** *void*

___

###  getAABB

▸ **getAABB**(`childIndex`: number): *[AABB](aabb.md)*

*Defined in [dist/planck.d.ts:880](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L880)*

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

*Defined in [dist/planck.d.ts:830](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L830)*

Get the parent body of this fixture. This is null if the fixture is not
attached.

**Returns:** *[Body](body.md)*

___

###  getDensity

▸ **getDensity**(): *number*

*Defined in [dist/planck.d.ts:838](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L838)*

Get the density of this fixture.

**Returns:** *number*

___

###  getFilterCategoryBits

▸ **getFilterCategoryBits**(): *number*

*Defined in [dist/planck.d.ts:903](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L903)*

**Returns:** *number*

___

###  getFilterGroupIndex

▸ **getFilterGroupIndex**(): *number*

*Defined in [dist/planck.d.ts:901](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L901)*

**Returns:** *number*

___

###  getFilterMaskBits

▸ **getFilterMaskBits**(): *number*

*Defined in [dist/planck.d.ts:905](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L905)*

**Returns:** *number*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [dist/planck.d.ts:847](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L847)*

Get the coefficient of friction, usually in the range [0,1].

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [dist/planck.d.ts:875](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L875)*

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

*Defined in [dist/planck.d.ts:834](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L834)*

Get the next fixture in the parent body's fixture list.

**Returns:** *[Fixture](fixture.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [dist/planck.d.ts:856](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L856)*

Get the coefficient of restitution.

**Returns:** *number*

___

###  getShape

▸ **getShape**(): *[Shape](shape.md)*

*Defined in [dist/planck.d.ts:801](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L801)*

Get the child shape. You can modify the child shape, however you should not
change the number of vertices because this will crash some collision caching
mechanisms. Manipulating the shape may lead to non-physical behavior.

**Returns:** *[Shape](shape.md)*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [dist/planck.d.ts:795](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L795)*

Get the type of the child shape. You can use this to down cast to the
concrete shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dist/planck.d.ts:821](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L821)*

Get the user data that was assigned in the fixture definition. Use this to
store your application specific data.

**Returns:** *unknown*

___

###  isSensor

▸ **isSensor**(): *boolean*

*Defined in [dist/planck.d.ts:806](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L806)*

A sensor shape collects contact information but never generates a collision
response.

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `childIndex`: number): *boolean*

*Defined in [dist/planck.d.ts:869](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L869)*

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

*Defined in [dist/planck.d.ts:911](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L911)*

Call this if you want to establish collision that was previously disabled by
ContactFilter.

**Returns:** *void*

___

###  setDensity

▸ **setDensity**(`density`: number): *void*

*Defined in [dist/planck.d.ts:843](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L843)*

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

*Defined in [dist/planck.d.ts:904](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L904)*

**Parameters:**

Name | Type |
------ | ------ |
`categoryBits` | number |

**Returns:** *void*

___

###  setFilterData

▸ **setFilterData**(`filter`: object): *void*

*Defined in [dist/planck.d.ts:896](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L896)*

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

*Defined in [dist/planck.d.ts:902](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L902)*

**Parameters:**

Name | Type |
------ | ------ |
`groupIndex` | number |

**Returns:** *number*

___

###  setFilterMaskBits

▸ **setFilterMaskBits**(`maskBits`: number): *void*

*Defined in [dist/planck.d.ts:906](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L906)*

**Parameters:**

Name | Type |
------ | ------ |
`maskBits` | number |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [dist/planck.d.ts:852](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L852)*

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

*Defined in [dist/planck.d.ts:861](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L861)*

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

*Defined in [dist/planck.d.ts:810](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L810)*

Set if this fixture is a sensor.

**Parameters:**

Name | Type |
------ | ------ |
`sensor` | boolean |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Defined in [dist/planck.d.ts:825](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L825)*

Set the user data. Use this to store your application specific data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Fixture](fixture.md)): *boolean*

*Defined in [dist/planck.d.ts:922](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L922)*

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

*Defined in [dist/planck.d.ts:890](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L890)*

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

*Defined in [dist/planck.d.ts:865](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L865)*

Test a point in world coordinates for containment in this fixture.

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *boolean*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `body`: any, `restore`: any): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:790](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L790)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`body` | any |
`restore` | any |

**Returns:** *[Fixture](fixture.md)*
