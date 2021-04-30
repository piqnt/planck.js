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
* [postSolveIsland](solver.md#postsolveisland)
* [printBodies](solver.md#printbodies)
* [solveIsland](solver.md#solveisland)
* [solveIslandTOI](solver.md#solveislandtoi)
* [solveWorld](solver.md#solveworld)
* [solveWorldTOI](solver.md#solveworldtoi)

## Constructors

###  constructor

\+ **new Solver**(`world`: any): *[Solver](solver.md)*

*Defined in [src/dynamics/Solver.ts:114](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | any |

**Returns:** *[Solver](solver.md)*

## Properties

###  m_bodies

• **m_bodies**: *Body[]*

*Defined in [src/dynamics/Solver.ts:112](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L112)*

___

###  m_contacts

• **m_contacts**: *Contact[]*

*Defined in [src/dynamics/Solver.ts:113](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L113)*

___

###  m_joints

• **m_joints**: *Joint[]*

*Defined in [src/dynamics/Solver.ts:114](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L114)*

___

###  m_stack

• **m_stack**: *Body[]*

*Defined in [src/dynamics/Solver.ts:111](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L111)*

___

###  m_world

• **m_world**: *World*

*Defined in [src/dynamics/Solver.ts:110](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L110)*

## Methods

###  addBody

▸ **addBody**(`body`: any): *void*

*Defined in [src/dynamics/Solver.ts:131](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | any |

**Returns:** *void*

___

###  addContact

▸ **addContact**(`contact`: any): *void*

*Defined in [src/dynamics/Solver.ts:141](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | any |

**Returns:** *void*

___

###  addJoint

▸ **addJoint**(`joint`: any): *void*

*Defined in [src/dynamics/Solver.ts:146](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`joint` | any |

**Returns:** *void*

___

###  clear

▸ **clear**(): *void*

*Defined in [src/dynamics/Solver.ts:124](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L124)*

**Returns:** *void*

___

###  postSolveIsland

▸ **postSolveIsland**(): *void*

*Defined in [src/dynamics/Solver.ts:910](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L910)*

**Returns:** *void*

___

###  printBodies

▸ **printBodies**(`tag`: any): *void*

*Defined in [src/dynamics/Solver.ts:491](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L491)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | any |

**Returns:** *void*

___

###  solveIsland

▸ **solveIsland**(`step`: TimeStep): *void*

*Defined in [src/dynamics/Solver.ts:282](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L282)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | TimeStep |

**Returns:** *void*

___

###  solveIslandTOI

▸ **solveIslandTOI**(`subStep`: TimeStep, `toiA`: any, `toiB`: any): *void*

*Defined in [src/dynamics/Solver.ts:779](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L779)*

**Parameters:**

Name | Type |
------ | ------ |
`subStep` | TimeStep |
`toiA` | any |
`toiB` | any |

**Returns:** *void*

___

###  solveWorld

▸ **solveWorld**(`step`: TimeStep): *void*

*Defined in [src/dynamics/Solver.ts:151](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | TimeStep |

**Returns:** *void*

___

###  solveWorldTOI

▸ **solveWorldTOI**(`step`: TimeStep): *void*

*Defined in [src/dynamics/Solver.ts:501](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Solver.ts#L501)*

Find TOI contacts and solve them.

**Parameters:**

Name | Type |
------ | ------ |
`step` | TimeStep |

**Returns:** *void*
