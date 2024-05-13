
# Class: Solver

Finds and solves islands. An island is a connected subset of the world.

## Hierarchy

* **Solver**

## Index

### Constructors

* [constructor](/api/classes/solver#constructor)

### Properties

* [m_bodies](/api/classes/solver#m_bodies)
* [m_contacts](/api/classes/solver#m_contacts)
* [m_joints](/api/classes/solver#m_joints)
* [m_stack](/api/classes/solver#m_stack)
* [m_world](/api/classes/solver#m_world)

### Methods

* [addBody](/api/classes/solver#addbody)
* [addContact](/api/classes/solver#addcontact)
* [addJoint](/api/classes/solver#addjoint)
* [clear](/api/classes/solver#clear)
* [solveIsland](/api/classes/solver#solveisland)
* [solveIslandTOI](/api/classes/solver#solveislandtoi)
* [solveWorld](/api/classes/solver#solveworld)
* [solveWorldTOI](/api/classes/solver#solveworldtoi)

## Constructors

###  constructor

\+ **new Solver**(`world`: World): *[Solver](/api/classes/solver)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | World |

**Returns:** *[Solver](/api/classes/solver)*

## Properties

###  m_bodies

• **m_bodies**: *[Body](/api/classes/body)[]*

___

###  m_contacts

• **m_contacts**: *[Contact](/api/classes/contact)[]*

___

###  m_joints

• **m_joints**: *[Joint](/api/classes/joint)[]*

___

###  m_stack

• **m_stack**: *[Body](/api/classes/body)[]*

___

###  m_world

• **m_world**: *World*

## Methods

###  addBody

▸ **addBody**(`body`: [Body](/api/classes/body)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [Body](/api/classes/body) |

**Returns:** *void*

___

###  addContact

▸ **addContact**(`contact`: [Contact](/api/classes/contact)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *void*

___

###  addJoint

▸ **addJoint**(`joint`: [Joint](/api/classes/joint)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | [Joint](/api/classes/joint) |

**Returns:** *void*

___

###  clear

▸ **clear**(): *void*

**Returns:** *void*

___

###  solveIsland

▸ **solveIsland**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*

___

###  solveIslandTOI

▸ **solveIslandTOI**(`subStep`: [TimeStep](/api/classes/timestep), `toiA`: [Body](/api/classes/body), `toiB`: [Body](/api/classes/body)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`subStep` | [TimeStep](/api/classes/timestep) |
`toiA` | [Body](/api/classes/body) |
`toiB` | [Body](/api/classes/body) |

**Returns:** *void*

___

###  solveWorld

▸ **solveWorld**(`step`: [TimeStep](/api/classes/timestep)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*

___

###  solveWorldTOI

▸ **solveWorldTOI**(`step`: [TimeStep](/api/classes/timestep)): *void*

Find TOI contacts and solve them.

**Parameters:**

Name | Type |
------ | ------ |
`step` | [TimeStep](/api/classes/timestep) |

**Returns:** *void*
