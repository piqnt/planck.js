[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Solver](solver.md)

# Class: Solver

Finds and solves islands. An island is a connected subset of the world.

## Hierarchy

* **Solver**

## Index

### Constructors

* [constructor](solver.md#constructor)

### Properties

* [m_bodies](solver.md#m_bodies)
* [m_contacts](solver.md#m_contacts)
* [m_joints](solver.md#m_joints)
* [m_stack](solver.md#m_stack)
* [m_world](solver.md#m_world)

### Methods

* [addBody](solver.md#addbody)
* [addContact](solver.md#addcontact)
* [addJoint](solver.md#addjoint)
* [clear](solver.md#clear)
* [solveIsland](solver.md#solveisland)
* [solveIslandTOI](solver.md#solveislandtoi)
* [solveWorld](solver.md#solveworld)
* [solveWorldTOI](solver.md#solveworldtoi)

## Constructors

###  constructor

\+ **new Solver**(`world`: [World](world.md)): *[Solver](solver.md)*

*Defined in [src/dynamics/Solver.ts:116](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | [World](world.md) |

**Returns:** *[Solver](solver.md)*

## Properties

###  m_bodies

• **m_bodies**: *[Body](body.md)[]*

*Defined in [src/dynamics/Solver.ts:114](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L114)*

___

###  m_contacts

• **m_contacts**: *[Contact](contact.md)[]*

*Defined in [src/dynamics/Solver.ts:115](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L115)*

___

###  m_joints

• **m_joints**: *[Joint](joint.md)[]*

*Defined in [src/dynamics/Solver.ts:116](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L116)*

___

###  m_stack

• **m_stack**: *[Body](body.md)[]*

*Defined in [src/dynamics/Solver.ts:113](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L113)*

___

###  m_world

• **m_world**: *[World](world.md)*

*Defined in [src/dynamics/Solver.ts:112](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L112)*

## Methods

###  addBody

▸ **addBody**(`body`: [Body](body.md)): *void*

*Defined in [src/dynamics/Solver.ts:133](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |

**Returns:** *void*

___

###  addContact

▸ **addContact**(`contact`: [Contact](contact.md)): *void*

*Defined in [src/dynamics/Solver.ts:143](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *void*

___

###  addJoint

▸ **addJoint**(`joint`: [Joint](joint.md)): *void*

*Defined in [src/dynamics/Solver.ts:148](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *void*

___

###  clear

▸ **clear**(): *void*

*Defined in [src/dynamics/Solver.ts:126](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L126)*

**Returns:** *void*

___

###  solveIsland

▸ **solveIsland**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Solver.ts:284](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L284)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  solveIslandTOI

▸ **solveIslandTOI**(`subStep`: [TimeStep](timestep.md), `toiA`: [Body](body.md), `toiB`: [Body](body.md)): *void*

*Defined in [src/dynamics/Solver.ts:782](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L782)*

**Parameters:**

Name | Type |
------ | ------ |
`subStep` | [TimeStep](timestep.md) |
`toiA` | [Body](body.md) |
`toiB` | [Body](body.md) |

**Returns:** *void*

___

###  solveWorld

▸ **solveWorld**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Solver.ts:153](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  solveWorldTOI

▸ **solveWorldTOI**(`step`: [TimeStep](timestep.md)): *void*

*Defined in [src/dynamics/Solver.ts:504](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L504)*

Find TOI contacts and solve them.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
