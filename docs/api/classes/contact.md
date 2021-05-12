[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Contact](contact.md)

# Class: Contact

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

*Defined in [src/dynamics/Contact.ts:196](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L196)*

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

*Defined in [src/dynamics/Contact.ts:433](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L433)*

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

*Defined in [src/dynamics/Contact.ts:365](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L365)*

Flag this contact for filtering. Filtering will occur the next time step.

**Returns:** *void*

___

###  getChildIndexA

▸ **getChildIndexA**(): *number*

*Defined in [src/dynamics/Contact.ts:351](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L351)*

Get the child primitive index for fixture A.

**Returns:** *number*

___

###  getChildIndexB

▸ **getChildIndexB**(): *number*

*Defined in [src/dynamics/Contact.ts:358](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L358)*

Get the child primitive index for fixture B.

**Returns:** *number*

___

###  getFixtureA

▸ **getFixtureA**(): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Contact.ts:337](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L337)*

Get fixture A in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Contact.ts:344](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L344)*

Get fixture B in this contact.

**Returns:** *[Fixture](fixture.md)*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [src/dynamics/Contact.ts:380](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L380)*

Get the friction.

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](manifold.md)*

*Defined in [src/dynamics/Contact.ts:287](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L287)*

Get the contact manifold. Do not modify the manifold unless you understand
the internals of the library.

**Returns:** *[Manifold](manifold.md)*

___

###  getNext

▸ **getNext**(): *[Contact](contact.md) | null*

*Defined in [src/dynamics/Contact.ts:330](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L330)*

Get the next contact in the world's contact list.

**Returns:** *[Contact](contact.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [src/dynamics/Contact.ts:403](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L403)*

Get the restitution.

**Returns:** *number*

___

###  getTangentSpeed

▸ **getTangentSpeed**(): *number*

*Defined in [src/dynamics/Contact.ts:426](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L426)*

Get the desired tangent speed. In meters per second.

**Returns:** *number*

___

###  getWorldManifold

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](worldmanifold.md) | null | undefined): *[WorldManifold](worldmanifold.md) | undefined*

*Defined in [src/dynamics/Contact.ts:294](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L294)*

Get the world manifold.

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](worldmanifold.md) &#124; null &#124; undefined |

**Returns:** *[WorldManifold](worldmanifold.md) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Contact.ts:215](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L215)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Contact.ts:657](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L657)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  isEnabled

▸ **isEnabled**(): *boolean*

*Defined in [src/dynamics/Contact.ts:316](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L316)*

Has this contact been disabled?

**Returns:** *boolean*

___

###  isTouching

▸ **isTouching**(): *boolean*

*Defined in [src/dynamics/Contact.ts:323](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L323)*

Is this contact touching?

**Returns:** *boolean*

___

###  resetFriction

▸ **resetFriction**(): *void*

*Defined in [src/dynamics/Contact.ts:387](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L387)*

Reset the friction mixture to the default value.

**Returns:** *void*

___

###  resetRestitution

▸ **resetRestitution**(): *void*

*Defined in [src/dynamics/Contact.ts:410](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L410)*

Reset the restitution to the default value.

**Returns:** *void*

___

###  setEnabled

▸ **setEnabled**(`flag`: boolean): *void*

*Defined in [src/dynamics/Contact.ts:309](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L309)*

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

*Defined in [src/dynamics/Contact.ts:373](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L373)*

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

*Defined in [src/dynamics/Contact.ts:396](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L396)*

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

*Defined in [src/dynamics/Contact.ts:419](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L419)*

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

*Defined in [src/dynamics/Contact.ts:525](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L525)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: [TimeStep](timestep.md), `toiA`: [Body](body.md), `toiB`: [Body](body.md)): *number*

*Defined in [src/dynamics/Contact.ts:529](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L529)*

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

*Defined in [src/dynamics/Contact.ts:825](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L825)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Contact.ts:817](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L817)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  update

▸ **update**(`listener?`: object): *void*

*Defined in [src/dynamics/Contact.ts:447](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L447)*

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

*Defined in [src/dynamics/Contact.ts:776](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L776)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
