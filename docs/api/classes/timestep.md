[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [TimeStep](timestep.md)

# Class: TimeStep

## Hierarchy

* **TimeStep**

## Index

### Properties

* [blockSolve](timestep.md#blocksolve)
* [dt](timestep.md#dt)
* [dtRatio](timestep.md#dtratio)
* [inv_dt](timestep.md#inv_dt)
* [inv_dt0](timestep.md#inv_dt0)
* [positionIterations](timestep.md#positioniterations)
* [velocityIterations](timestep.md#velocityiterations)
* [warmStarting](timestep.md#warmstarting)

### Methods

* [reset](timestep.md#reset)

## Properties

###  blockSolve

• **blockSolve**: *boolean* = true

*Defined in [src/dynamics/Solver.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L49)*

___

###  dt

• **dt**: *number* = 0

*Defined in [src/dynamics/Solver.ts:43](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L43)*

time step

___

###  dtRatio

• **dtRatio**: *number* = 1

*Defined in [src/dynamics/Solver.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L54)*

dt * inv_dt0

___

###  inv_dt

• **inv_dt**: *number* = 0

*Defined in [src/dynamics/Solver.ts:45](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L45)*

inverse time step (0 if dt == 0)

___

###  inv_dt0

• **inv_dt0**: *number* = 0

*Defined in [src/dynamics/Solver.ts:52](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L52)*

timestep ratio for variable timestep

___

###  positionIterations

• **positionIterations**: *number* = 0

*Defined in [src/dynamics/Solver.ts:47](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L47)*

___

###  velocityIterations

• **velocityIterations**: *number* = 0

*Defined in [src/dynamics/Solver.ts:46](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L46)*

___

###  warmStarting

• **warmStarting**: *boolean* = false

*Defined in [src/dynamics/Solver.ts:48](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L48)*

## Methods

###  reset

▸ **reset**(`dt`: number): *void*

*Defined in [src/dynamics/Solver.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Solver.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | number |

**Returns:** *void*
