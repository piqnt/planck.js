[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Contact](contact.md)

# Class: Contact

## Hierarchy

* **Contact**

## Index

### Constructors

* [constructor](contact.md#constructor)

### Methods

* [_solvePositionConstraint](contact.md#_solvepositionconstraint)
* [evaluate](contact.md#evaluate)
* [flagForFiltering](contact.md#flagforfiltering)
* [getChildIndexA](contact.md#getchildindexa)
* [getChildIndexB](contact.md#getchildindexb)
* [getFixtureA](contact.md#getfixturea)
* [getFixtureB](contact.md#getfixtureb)
* [getFriction](contact.md#getfriction)
* [getManifold](contact.md#getmanifold)
* [getNext](contact.md#getnext)
* [getRestitution](contact.md#getrestitution)
* [getTangentSpeed](contact.md#gettangentspeed)
* [getWorldManifold](contact.md#getworldmanifold)
* [initConstraint](contact.md#initconstraint)
* [initVelocityConstraint](contact.md#initvelocityconstraint)
* [isEnabled](contact.md#isenabled)
* [isTouching](contact.md#istouching)
* [resetFriction](contact.md#resetfriction)
* [resetRestitution](contact.md#resetrestitution)
* [setEnabled](contact.md#setenabled)
* [setFriction](contact.md#setfriction)
* [setRestitution](contact.md#setrestitution)
* [setTangentSpeed](contact.md#settangentspeed)
* [solvePositionConstraint](contact.md#solvepositionconstraint)
* [solvePositionConstraintTOI](contact.md#solvepositionconstrainttoi)
* [solveVelocityConstraint](contact.md#solvevelocityconstraint)
* [storeConstraintImpulses](contact.md#storeconstraintimpulses)
* [update](contact.md#update)
* [warmStartConstraint](contact.md#warmstartconstraint)

## Constructors

###  constructor

\+ **new Contact**(`fA`: [Fixture](fixture.md), `indexA`: number, `fB`: [Fixture](fixture.md), `indexB`: number, `evaluateFcn`: [EvaluateFunction](../globals.md#evaluatefunction)): *[Contact](contact.md)*

*Defined in [index.d.ts:331](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L331)*

**Parameters:**

Name | Type |
------ | ------ |
`fA` | [Fixture](fixture.md) |
`indexA` | number |
`fB` | [Fixture](fixture.md) |
`indexB` | number |
`evaluateFcn` | [EvaluateFunction](../globals.md#evaluatefunction) |

**Returns:** *[Contact](contact.md)*

## Methods

###  _solvePositionConstraint

▸ **_solvePositionConstraint**(`step`: any, `toi`: boolean, `toiA?`: [Body](body.md) | null, `toiB?`: [Body](body.md) | null): *number*

*Defined in [index.d.ts:415](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L415)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |
`toi` | boolean |
`toiA?` | [Body](body.md) &#124; null |
`toiB?` | [Body](body.md) &#124; null |

**Returns:** *number*

___

###  evaluate

▸ **evaluate**(`manifold`: [Manifold](../interfaces/manifold.md), `xfA`: [Transform](transform.md), `xfB`: [Transform](transform.md)): *void*

*Defined in [index.d.ts:411](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L411)*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](../interfaces/manifold.md) |
`xfA` | [Transform](transform.md) |
`xfB` | [Transform](transform.md) |

**Returns:** *void*

___

###  flagForFiltering

▸ **flagForFiltering**(): *void*

*Defined in [index.d.ts:402](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L402)*

**Returns:** *void*

___

###  getChildIndexA

▸ **getChildIndexA**(): *number*

*Defined in [index.d.ts:400](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L400)*

**Returns:** *number*

___

###  getChildIndexB

▸ **getChildIndexB**(): *number*

*Defined in [index.d.ts:401](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L401)*

**Returns:** *number*

___

###  getFixtureA

▸ **getFixtureA**(): *[Fixture](fixture.md)*

*Defined in [index.d.ts:398](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L398)*

**Returns:** *[Fixture](fixture.md)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](fixture.md)*

*Defined in [index.d.ts:399](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L399)*

**Returns:** *[Fixture](fixture.md)*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [index.d.ts:404](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L404)*

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](../interfaces/manifold.md)*

*Defined in [index.d.ts:392](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L392)*

**Returns:** *[Manifold](../interfaces/manifold.md)*

___

###  getNext

▸ **getNext**(): *[Contact](contact.md) | null*

*Defined in [index.d.ts:397](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L397)*

**Returns:** *[Contact](contact.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [index.d.ts:407](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L407)*

**Returns:** *number*

___

###  getTangentSpeed

▸ **getTangentSpeed**(): *number*

*Defined in [index.d.ts:410](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L410)*

**Returns:** *number*

___

###  getWorldManifold

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](../interfaces/worldmanifold.md) | null | undefined): *[WorldManifold](../interfaces/worldmanifold.md) | undefined*

*Defined in [index.d.ts:393](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L393)*

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](../interfaces/worldmanifold.md) &#124; null &#124; undefined |

**Returns:** *[WorldManifold](../interfaces/worldmanifold.md) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: object): *void*

*Defined in [index.d.ts:391](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L391)*

**Parameters:**

▪ **step**: *object*

Name | Type |
------ | ------ |
`dtRatio` | number |
`warmStarting` | boolean |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: object): *void*

*Defined in [index.d.ts:416](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L416)*

**Parameters:**

▪ **step**: *object*

Name | Type |
------ | ------ |
`blockSolve` | boolean |

**Returns:** *void*

___

###  isEnabled

▸ **isEnabled**(): *boolean*

*Defined in [index.d.ts:395](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L395)*

**Returns:** *boolean*

___

###  isTouching

▸ **isTouching**(): *boolean*

*Defined in [index.d.ts:396](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L396)*

**Returns:** *boolean*

___

###  resetFriction

▸ **resetFriction**(): *void*

*Defined in [index.d.ts:405](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L405)*

**Returns:** *void*

___

###  resetRestitution

▸ **resetRestitution**(): *void*

*Defined in [index.d.ts:408](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L408)*

**Returns:** *void*

___

###  setEnabled

▸ **setEnabled**(`flag`: boolean): *void*

*Defined in [index.d.ts:394](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L394)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [index.d.ts:403](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L403)*

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

*Defined in [index.d.ts:406](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L406)*

**Parameters:**

Name | Type |
------ | ------ |
`restitution` | number |

**Returns:** *void*

___

###  setTangentSpeed

▸ **setTangentSpeed**(`speed`: number): *void*

*Defined in [index.d.ts:409](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L409)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  solvePositionConstraint

▸ **solvePositionConstraint**(`step`: any): *number*

*Defined in [index.d.ts:413](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L413)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: any, `toiA?`: [Body](body.md) | null, `toiB?`: [Body](body.md) | null): *number*

*Defined in [index.d.ts:414](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L414)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |
`toiA?` | [Body](body.md) &#124; null |
`toiB?` | [Body](body.md) &#124; null |

**Returns:** *number*

___

###  solveVelocityConstraint

▸ **solveVelocityConstraint**(`step`: object): *void*

*Defined in [index.d.ts:419](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L419)*

**Parameters:**

▪ **step**: *object*

Name | Type |
------ | ------ |
`blockSolve` | boolean |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step?`: any): *void*

*Defined in [index.d.ts:418](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L418)*

**Parameters:**

Name | Type |
------ | ------ |
`step?` | any |

**Returns:** *void*

___

###  update

▸ **update**(`listener?`: object): *void*

*Defined in [index.d.ts:412](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L412)*

**Parameters:**

▪`Optional`  **listener**: *object*

Name | Type |
------ | ------ |
`beginContact` |  |
`endContact` |  |
`oreSolve` |  |

**Returns:** *void*

___

###  warmStartConstraint

▸ **warmStartConstraint**(`step?`: any): *void*

*Defined in [index.d.ts:417](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L417)*

**Parameters:**

Name | Type |
------ | ------ |
`step?` | any |

**Returns:** *void*
