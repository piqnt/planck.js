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

\+ **new Solver**(`world`: World): *[Solver](solver.md)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | World |

**Returns:** *[Solver](solver.md)*

## Properties

###  m_bodies

• **m_bodies**: *[Body](body.md)[]*

___

###  m_contacts

• **m_contacts**: *[Contact](contact.md)[]*

___

###  m_joints

• **m_joints**: *[Joint](joint.md)[]*

___

###  m_stack

• **m_stack**: *[Body](body.md)[]*

___

###  m_world

• **m_world**: *World*

## Methods

###  addBody

▸ **addBody**(`body`: [Body](body.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](body.md) |

**Returns:** *void*

___

###  addContact

▸ **addContact**(`contact`: [Contact](contact.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *void*

___

###  addJoint

▸ **addJoint**(`joint`: [Joint](joint.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](joint.md) |

**Returns:** *void*

___

###  clear

▸ **clear**(): *void*

**Returns:** *void*

___

###  solveIsland

▸ **solveIsland**(`step`: [TimeStep](timestep.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  solveIslandTOI

▸ **solveIslandTOI**(`subStep`: [TimeStep](timestep.md), `toiA`: [Body](body.md), `toiB`: [Body](body.md)): *void*

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

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*

___

###  solveWorldTOI

▸ **solveWorldTOI**(`step`: [TimeStep](timestep.md)): *void*

Find TOI contacts and solve them.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](timestep.md) |

**Returns:** *void*
