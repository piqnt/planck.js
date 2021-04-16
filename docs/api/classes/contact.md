[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Contact](contact.md)

# Class: Contact

The class manages contact between two shapes. A contact exists for each
overlapping AABB in the broad-phase (except if filtered). Therefore a contact
object may exist that has no contact points.
The class manages contact between two shapes. A contact exists for each
overlapping AABB in the broad-phase (except if filtered). Therefore a contact
object may exist that has no contact points.

## Hierarchy

* **Contact**

## Index

### Constructors

* [constructor](contact.md#constructor)

### Methods

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

*Defined in [dist/planck.d.ts:1192](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1192)*

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

###  evaluate

▸ **evaluate**(`manifold`: [Manifold](manifold.md), `xfA`: [Transform](transform.md), `xfB`: [Transform](transform.md)): *void*

*Defined in [dist/planck.d.ts:1280](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1280)*

Called by Update method, and implemented by subclasses.

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](manifold.md) |
`xfA` | [Transform](transform.md) |
`xfB` | [Transform](transform.md) |

**Returns:** *void*

___

###  flagForFiltering

▸ **flagForFiltering**(): *void*

*Defined in [dist/planck.d.ts:1241](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1241)*

Flag this contact for filtering. Filtering will occur the next time step.

**Returns:** *void*

___

###  getChildIndexA

▸ **getChildIndexA**(): *number*

*Defined in [dist/planck.d.ts:1233](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1233)*

Get the child primitive index for fixture A.

**Returns:** *number*

___

###  getChildIndexB

▸ **getChildIndexB**(): *number*

*Defined in [dist/planck.d.ts:1237](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1237)*

Get the child primitive index for fixture B.

**Returns:** *number*

___

###  getFixtureA

▸ **getFixtureA**(): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:1225](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1225)*

Get fixture A in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:1229](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1229)*

Get fixture B in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [dist/planck.d.ts:1250](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1250)*

Get the friction.

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](manifold.md)*

*Defined in [dist/planck.d.ts:1199](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1199)*

Get the contact manifold. Do not modify the manifold unless you understand
the internals of the library.

**Returns:** *[Manifold](manifold.md)*

___

###  getNext

▸ **getNext**(): *[Contact](contact.md) | null*

*Defined in [dist/planck.d.ts:1221](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1221)*

Get the next contact in the world's contact list.

**Returns:** *[Contact](contact.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [dist/planck.d.ts:1263](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1263)*

Get the restitution.

**Returns:** *number*

___

###  getTangentSpeed

▸ **getTangentSpeed**(): *number*

*Defined in [dist/planck.d.ts:1276](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1276)*

Get the desired tangent speed. In meters per second.

**Returns:** *number*

___

###  getWorldManifold

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](worldmanifold.md) | null | undefined): *[WorldManifold](worldmanifold.md) | undefined*

*Defined in [dist/planck.d.ts:1203](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1203)*

Get the world manifold.

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](worldmanifold.md) &#124; null &#124; undefined |

**Returns:** *[WorldManifold](worldmanifold.md) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [dist/planck.d.ts:1194](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1194)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [dist/planck.d.ts:1298](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1298)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isEnabled

▸ **isEnabled**(): *boolean*

*Defined in [dist/planck.d.ts:1213](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1213)*

Has this contact been disabled?

**Returns:** *boolean*

___

###  isTouching

▸ **isTouching**(): *boolean*

*Defined in [dist/planck.d.ts:1217](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1217)*

Is this contact touching?

**Returns:** *boolean*

___

###  resetFriction

▸ **resetFriction**(): *void*

*Defined in [dist/planck.d.ts:1254](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1254)*

Reset the friction mixture to the default value.

**Returns:** *void*

___

###  resetRestitution

▸ **resetRestitution**(): *void*

*Defined in [dist/planck.d.ts:1267](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1267)*

Reset the restitution to the default value.

**Returns:** *void*

___

###  setEnabled

▸ **setEnabled**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1209](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1209)*

Enable/disable this contact. This can be used inside the pre-solve contact
listener. The contact is only disabled for the current time step (or sub-step
in continuous collisions).

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [dist/planck.d.ts:1246](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1246)*

Override the default friction mixture. You can call this in
ContactListener.preSolve. This value persists until set or reset.

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

*Defined in [dist/planck.d.ts:1259](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1259)*

Override the default restitution mixture. You can call this in
ContactListener.preSolve. The value persists until you set or reset.

**Parameters:**

Name | Type |
------ | ------ |
`restitution` | number |

**Returns:** *void*

___

###  setTangentSpeed

▸ **setTangentSpeed**(`speed`: number): *void*

*Defined in [dist/planck.d.ts:1272](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1272)*

Set the desired tangent speed for a conveyor belt behavior. In meters per
second.

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  solvePositionConstraint

▸ **solvePositionConstraint**(`step`: [TimeStep](timestep.md)): *number*

*Defined in [dist/planck.d.ts:1295](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1295)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: [TimeStep](timestep.md), `toiA`: [Body](body.md), `toiB`: [Body](body.md)): *number*

*Defined in [dist/planck.d.ts:1296](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1296)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |
`toiA` | [Body](body.md) |
`toiB` | [Body](body.md) |

**Returns:** *number*

___

###  solveVelocityConstraint

▸ **solveVelocityConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [dist/planck.d.ts:1301](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1301)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [dist/planck.d.ts:1300](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1300)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  update

▸ **update**(`listener?`: object): *void*

*Defined in [dist/planck.d.ts:1290](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1290)*

Updates the contact manifold and touching status.

Note: do not assume the fixture AABBs are overlapping or are valid.

**Parameters:**

▪`Optional`  **listener**: *object*

Name | Type | Description |
------ | ------ | ------ |
`beginContact` |  | - |
`endContact` |  | - |
`preSolve` |  |   |

**Returns:** *void*

___

###  warmStartConstraint

▸ **warmStartConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [dist/planck.d.ts:1299](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1299)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
