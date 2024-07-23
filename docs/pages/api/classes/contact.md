
# Class: Contact

The class manages contact between two shapes. A contact exists for each
overlapping AABB in the broad-phase (except if filtered). Therefore a contact
object may exist that has no contact points.

## Hierarchy

* **Contact**

## Index

### Methods

* [evaluate](/api/classes/contact#evaluate)
* [flagForFiltering](/api/classes/contact#flagforfiltering)
* [getChildIndexA](/api/classes/contact#getchildindexa)
* [getChildIndexB](/api/classes/contact#getchildindexb)
* [getFixtureA](/api/classes/contact#getfixturea)
* [getFixtureB](/api/classes/contact#getfixtureb)
* [getFriction](/api/classes/contact#getfriction)
* [getManifold](/api/classes/contact#getmanifold)
* [getNext](/api/classes/contact#getnext)
* [getRestitution](/api/classes/contact#getrestitution)
* [getTangentSpeed](/api/classes/contact#gettangentspeed)
* [getWorldManifold](/api/classes/contact#getworldmanifold)
* [initConstraint](/api/classes/contact#initconstraint)
* [initVelocityConstraint](/api/classes/contact#initvelocityconstraint)
* [isEnabled](/api/classes/contact#isenabled)
* [isTouching](/api/classes/contact#istouching)
* [resetFriction](/api/classes/contact#resetfriction)
* [resetRestitution](/api/classes/contact#resetrestitution)
* [setEnabled](/api/classes/contact#setenabled)
* [setFriction](/api/classes/contact#setfriction)
* [setRestitution](/api/classes/contact#setrestitution)
* [setTangentSpeed](/api/classes/contact#settangentspeed)
* [solvePositionConstraint](/api/classes/contact#solvepositionconstraint)
* [solvePositionConstraintTOI](/api/classes/contact#solvepositionconstrainttoi)
* [solveVelocityConstraint](/api/classes/contact#solvevelocityconstraint)
* [storeConstraintImpulses](/api/classes/contact#storeconstraintimpulses)
* [update](/api/classes/contact#update)
* [warmStartConstraint](/api/classes/contact#warmstartconstraint)

## Methods

###  evaluate

▸ **evaluate**(`manifold`: [Manifold](/api/classes/manifold), `xfA`: [TransformValue](/api/globals#transformvalue), `xfB`: [TransformValue](/api/globals#transformvalue)): *void*

Called by Update method, and implemented by subclasses.

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`xfB` | [TransformValue](/api/globals#transformvalue) |

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

▸ **getFixtureA**(): *[Fixture](/api/classes/fixture)*

Get fixture A in this contact.

**Returns:** *[Fixture](/api/classes/fixture)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](/api/classes/fixture)*

Get fixture B in this contact.

**Returns:** *[Fixture](/api/classes/fixture)*

___

###  getFriction

▸ **getFriction**(): *number*

Get the friction.

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](/api/classes/manifold)*

Get the contact manifold. Do not modify the manifold unless you understand
the internals of the library.

**Returns:** *[Manifold](/api/classes/manifold)*

___

###  getNext

▸ **getNext**(): *[Contact](/api/classes/contact) | null*

Get the next contact in the world's contact list.

**Returns:** *[Contact](/api/classes/contact) | null*

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

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](/api/classes/worldmanifold) | null): *[WorldManifold](/api/classes/worldmanifold) | undefined*

Get the world manifold.

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](/api/classes/worldmanifold) &#124; null |

**Returns:** *[WorldManifold](/api/classes/worldmanifold) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

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
"pre-solve" callback. This value persists until set or reset.

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

Override the default restitution mixture. You can call this in
"pre-solve" callback. The value persists until you set or reset.

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

▸ **solvePositionConstraint**(`step`: [TimeStep](/api/classes/timestep)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: [TimeStep](/api/classes/timestep), `toiA`: [Body](/api/classes/body), `toiB`: [Body](/api/classes/body)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |
`toiA` | [Body](/api/classes/body) |
`toiB` | [Body](/api/classes/body) |

**Returns:** *number*

___

###  solveVelocityConstraint

▸ **solveVelocityConstraint**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

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

▸ **warmStartConstraint**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*
