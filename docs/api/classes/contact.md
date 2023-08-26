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

*Defined in [src/dynamics/Contact.ts:544](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L544)*

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

*Defined in [src/dynamics/Contact.ts:472](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L472)*

Flag this contact for filtering. Filtering will occur the next time step.

**Returns:** *void*

___

###  getChildIndexA

▸ **getChildIndexA**(): *number*

*Defined in [src/dynamics/Contact.ts:458](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L458)*

Get the child primitive index for fixture A.

**Returns:** *number*

___

###  getChildIndexB

▸ **getChildIndexB**(): *number*

*Defined in [src/dynamics/Contact.ts:465](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L465)*

Get the child primitive index for fixture B.

**Returns:** *number*

___

###  getFixtureA

▸ **getFixtureA**(): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Contact.ts:444](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L444)*

Get fixture A in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Contact.ts:451](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L451)*

Get fixture B in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [src/dynamics/Contact.ts:487](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L487)*

Get the friction.

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](manifold.md)*

*Defined in [src/dynamics/Contact.ts:386](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L386)*

Get the contact manifold. Do not modify the manifold unless you understand
the internals of the library.

**Returns:** *[Manifold](manifold.md)*

___

###  getNext

▸ **getNext**(): *[Contact](contact.md) | null*

*Defined in [src/dynamics/Contact.ts:437](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L437)*

Get the next contact in the world's contact list.

**Returns:** *[Contact](contact.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [src/dynamics/Contact.ts:512](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L512)*

Get the restitution.

**Returns:** *number*

___

###  getTangentSpeed

▸ **getTangentSpeed**(): *number*

*Defined in [src/dynamics/Contact.ts:537](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L537)*

Get the desired tangent speed. In meters per second.

**Returns:** *number*

___

###  getWorldManifold

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](worldmanifold.md) | null): *[WorldManifold](worldmanifold.md) | undefined*

*Defined in [src/dynamics/Contact.ts:393](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L393)*

Get the world manifold.

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](worldmanifold.md) &#124; null |

**Returns:** *[WorldManifold](worldmanifold.md) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Contact.ts:321](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L321)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Contact.ts:774](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L774)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isEnabled

▸ **isEnabled**(): *boolean*

*Defined in [src/dynamics/Contact.ts:423](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L423)*

Has this contact been disabled?

**Returns:** *boolean*

___

###  isTouching

▸ **isTouching**(): *boolean*

*Defined in [src/dynamics/Contact.ts:430](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L430)*

Is this contact touching?

**Returns:** *boolean*

___

###  resetFriction

▸ **resetFriction**(): *void*

*Defined in [src/dynamics/Contact.ts:494](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L494)*

Reset the friction mixture to the default value.

**Returns:** *void*

___

###  resetRestitution

▸ **resetRestitution**(): *void*

*Defined in [src/dynamics/Contact.ts:519](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L519)*

Reset the restitution to the default value.

**Returns:** *void*

___

###  setEnabled

▸ **setEnabled**(`flag`: boolean): *void*

*Defined in [src/dynamics/Contact.ts:416](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L416)*

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

*Defined in [src/dynamics/Contact.ts:480](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L480)*

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

*Defined in [src/dynamics/Contact.ts:505](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L505)*

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

*Defined in [src/dynamics/Contact.ts:530](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L530)*

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

*Defined in [src/dynamics/Contact.ts:643](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L643)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: [TimeStep](timestep.md), `toiA`: [Body](body.md), `toiB`: [Body](body.md)): *number*

*Defined in [src/dynamics/Contact.ts:647](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L647)*

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

*Defined in [src/dynamics/Contact.ts:957](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L957)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Contact.ts:949](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L949)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  update

▸ **update**(`listener?`: object): *void*

*Defined in [src/dynamics/Contact.ts:560](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L560)*

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

*Defined in [src/dynamics/Contact.ts:906](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Contact.ts#L906)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
