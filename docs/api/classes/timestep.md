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

*Defined in [dist/planck.d.ts:1311](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1311)*

*Defined in [src/dynamics/Solver.ts:49](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L49)*

___

###  dt

• **dt**: *number* = 0

*Defined in [dist/planck.d.ts:1305](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1305)*

*Defined in [src/dynamics/Solver.ts:43](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L43)*

time step
time step

___

###  dtRatio

• **dtRatio**: *number* = 1

*Defined in [dist/planck.d.ts:1315](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1315)*

*Defined in [src/dynamics/Solver.ts:54](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L54)*

dt * inv_dt0
dt * inv_dt0

___

###  inv_dt

• **inv_dt**: *number* = 0

*Defined in [dist/planck.d.ts:1307](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1307)*

*Defined in [src/dynamics/Solver.ts:45](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L45)*

inverse time step (0 if dt == 0)
inverse time step (0 if dt == 0)

___

###  inv_dt0

• **inv_dt0**: *number* = 0

*Defined in [dist/planck.d.ts:1313](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1313)*

*Defined in [src/dynamics/Solver.ts:52](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L52)*

timestep ratio for variable timestep
timestep ratio for variable timestep

___

###  positionIterations

• **positionIterations**: *number* = 0

*Defined in [dist/planck.d.ts:1309](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1309)*

*Defined in [src/dynamics/Solver.ts:47](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L47)*

___

###  velocityIterations

• **velocityIterations**: *number* = 0

*Defined in [dist/planck.d.ts:1308](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1308)*

*Defined in [src/dynamics/Solver.ts:46](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L46)*

___

###  warmStarting

• **warmStarting**: *boolean* = false

*Defined in [dist/planck.d.ts:1310](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1310)*

*Defined in [src/dynamics/Solver.ts:48](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Solver.ts#L48)*

## Methods

###  reset

▸ **reset**(`dt`: any): *void*

*Defined in [dist/planck.d.ts:1316](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1316)*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | any |

**Returns:** *void*
