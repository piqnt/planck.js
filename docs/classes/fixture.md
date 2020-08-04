[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Fixture](fixture.md)

# Class: Fixture

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
* [setFilterData](fixture.md#setfilterdata)
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

*Defined in [index.d.ts:85](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`def` | [FixtureDef](../interfaces/fixturedef.md) |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: [Body](body.md), `shape`: [Shape](shape.md), `def?`: [FixtureOpt](../interfaces/fixtureopt.md)): *[Fixture](fixture.md)*

*Defined in [index.d.ts:86](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`shape` | [Shape](shape.md) |
`def?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

\+ **new Fixture**(`body`: [Body](body.md), `shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [index.d.ts:87](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

## Methods

###  createProxies

▸ **createProxies**(`broadPhase`: [BroadPhase](broadphase.md), `xf`: [Transform](transform.md)): *void*

*Defined in [index.d.ts:122](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |
`xf` | [Transform](transform.md) |

**Returns:** *void*

___

###  destroyProxies

▸ **destroyProxies**(`broadPhase`: [BroadPhase](broadphase.md)): *void*

*Defined in [index.d.ts:123](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`broadPhase` | [BroadPhase](broadphase.md) |

**Returns:** *void*

___

###  getAABB

▸ **getAABB**(`childIndex`: number): *[AABB](aabb.md)*

*Defined in [index.d.ts:121](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`childIndex` | number |

**Returns:** *[AABB](aabb.md)*

___

###  getBody

▸ **getBody**(): *[Body](body.md)*

*Defined in [index.d.ts:110](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L110)*

**Returns:** *[Body](body.md)*

___

###  getDensity

▸ **getDensity**(): *number*

*Defined in [index.d.ts:112](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L112)*

**Returns:** *number*

___

###  getFilterCategoryBits

▸ **getFilterCategoryBits**(): *number*

*Defined in [index.d.ts:127](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L127)*

**Returns:** *number*

___

###  getFilterGroupIndex

▸ **getFilterGroupIndex**(): *number*

*Defined in [index.d.ts:126](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L126)*

**Returns:** *number*

___

###  getFilterMaskBits

▸ **getFilterMaskBits**(): *number*

*Defined in [index.d.ts:128](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L128)*

**Returns:** *number*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [index.d.ts:114](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L114)*

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`massData`: [MassData](../interfaces/massdata.md)): *void*

*Defined in [index.d.ts:120](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Fixture](fixture.md) | null*

*Defined in [index.d.ts:111](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L111)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [index.d.ts:116](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L116)*

**Returns:** *number*

___

###  getShape

▸ **getShape**(): *[Shape](shape.md)*

*Defined in [index.d.ts:105](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L105)*

**Returns:** *[Shape](shape.md)*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Defined in [index.d.ts:104](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L104)*

**Returns:** *[ShapeType](../globals.md#shapetype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [index.d.ts:108](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L108)*

**Returns:** *unknown*

___

###  isSensor

▸ **isSensor**(): *boolean*

*Defined in [index.d.ts:106](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L106)*

**Returns:** *boolean*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `childIndex`: number): *boolean*

*Defined in [index.d.ts:119](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L119)*

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

*Defined in [index.d.ts:129](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L129)*

**Returns:** *void*

___

###  setDensity

▸ **setDensity**(`density`: number): *void*

*Defined in [index.d.ts:113](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`density` | number |

**Returns:** *void*

___

###  setFilterData

▸ **setFilterData**(`filter`: object): *void*

*Defined in [index.d.ts:125](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L125)*

**Parameters:**

▪ **filter**: *object*

Name | Type |
------ | ------ |
`categoryBits` | number |
`groupIndex` | number |
`maskBits` | number |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [index.d.ts:115](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

*Defined in [index.d.ts:117](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`restitution` | number |

**Returns:** *void*

___

###  setSensor

▸ **setSensor**(`sensor`: boolean): *void*

*Defined in [index.d.ts:107](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`sensor` | boolean |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [index.d.ts:109](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Fixture](fixture.md)): *boolean*

*Defined in [index.d.ts:130](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Fixture](fixture.md) |

**Returns:** *boolean*

___

###  synchronize

▸ **synchronize**(`broadPhase`: [BroadPhase](broadphase.md), `xf1`: [Transform](transform.md), `xf2`: [Transform](transform.md)): *void*

*Defined in [index.d.ts:124](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L124)*

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

*Defined in [index.d.ts:118](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *boolean*
