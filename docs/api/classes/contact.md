[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Contact](contact.md)

# Class: Contact

The class manages contact between two shapes. A contact exists for each
overlapping AABB in the broad-phase (except if filtered). Therefore a contact
object may exist that has no contact points.

## Hierarchy

* **Contact**

## Index

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

## Methods

###  evaluate

▸ **evaluate**(`manifold`: [Manifold](manifold.md), `xfA`: [TransformValue](../globals.md#transformvalue), `xfB`: [TransformValue](../globals.md#transformvalue)): *void*

Called by Update method, and implemented by subclasses.

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](manifold.md) |
`xfA` | [TransformValue](../globals.md#transformvalue) |
`xfB` | [TransformValue](../globals.md#transformvalue) |

**Returns:** *void*

___

###  flagForFiltering

▸ **flagForFiltering**(): *void*

Flag this contact for filtering. Filtering will occur the next time step.

**Returns:** *void*

___

###  getChildIndexA

▸ **getChildIndexA**(): *number*

Get the child primitive index for fixture A.

**Returns:** *number*

___

###  getChildIndexB

▸ **getChildIndexB**(): *number*

Get the child primitive index for fixture B.

**Returns:** *number*

___

###  getFixtureA

▸ **getFixtureA**(): *[Fixture](fixture.md)*

Get fixture A in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](fixture.md)*

Get fixture B in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFriction

▸ **getFriction**(): *number*

Get the friction.

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](manifold.md)*

Get the contact manifold. Do not modify the manifold unless you understand
the internals of the library.

**Returns:** *[Manifold](manifold.md)*

___

###  getNext

▸ **getNext**(): *[Contact](contact.md) | null*

Get the next contact in the world's contact list.

**Returns:** *[Contact](contact.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

Get the restitution.

**Returns:** *number*

___

###  getTangentSpeed

▸ **getTangentSpeed**(): *number*

Get the desired tangent speed. In meters per second.

**Returns:** *number*

___

###  getWorldManifold

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](worldmanifold.md) | null): *[WorldManifold](worldmanifold.md) | undefined*

Get the world manifold.

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](worldmanifold.md) &#124; null |

**Returns:** *[WorldManifold](worldmanifold.md) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: [TimeStep](timestep.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: [TimeStep](timestep.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isEnabled

▸ **isEnabled**(): *boolean*

Has this contact been disabled?

**Returns:** *boolean*

___

###  isTouching

▸ **isTouching**(): *boolean*

Is this contact touching?

**Returns:** *boolean*

___

###  resetFriction

▸ **resetFriction**(): *void*

Reset the friction mixture to the default value.

**Returns:** *void*

___

###  resetRestitution

▸ **resetRestitution**(): *void*

Reset the restitution to the default value.

**Returns:** *void*

___

###  setEnabled

▸ **setEnabled**(`flag`: boolean): *void*

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

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: [TimeStep](timestep.md), `toiA`: [Body](body.md), `toiB`: [Body](body.md)): *number*

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

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step`: [TimeStep](timestep.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  update

▸ **update**(`listener?`: object): *void*

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

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
