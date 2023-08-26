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

*Defined in [src/dynamics/Solver.ts:51](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L51)*

___

###  dt

• **dt**: *number* = 0

*Defined in [src/dynamics/Solver.ts:45](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L45)*

time step

___

###  dtRatio

• **dtRatio**: *number* = 1

*Defined in [src/dynamics/Solver.ts:56](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L56)*

dt * inv_dt0

___

###  inv_dt

• **inv_dt**: *number* = 0

*Defined in [src/dynamics/Solver.ts:47](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L47)*

inverse time step (0 if dt == 0)

___

###  inv_dt0

• **inv_dt0**: *number* = 0

*Defined in [src/dynamics/Solver.ts:54](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L54)*

timestep ratio for variable timestep

___

###  positionIterations

• **positionIterations**: *number* = 0

*Defined in [src/dynamics/Solver.ts:49](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L49)*

___

###  velocityIterations

• **velocityIterations**: *number* = 0

*Defined in [src/dynamics/Solver.ts:48](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L48)*

___

###  warmStarting

• **warmStarting**: *boolean* = false

*Defined in [src/dynamics/Solver.ts:50](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L50)*

## Methods

###  reset

▸ **reset**(`dt`: number): *void*

*Defined in [src/dynamics/Solver.ts:58](https://github.com/shakiba/planck.js/blob/6ab76c7/src/dynamics/Solver.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | number |

**Returns:** *void*
