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

___

###  dt

• **dt**: *number* = 0

time step

___

###  dtRatio

• **dtRatio**: *number* = 1

dt * inv_dt0

___

###  inv_dt

• **inv_dt**: *number* = 0

inverse time step (0 if dt == 0)

___

###  inv_dt0

• **inv_dt0**: *number* = 0

timestep ratio for variable timestep

___

###  positionIterations

• **positionIterations**: *number* = 0

___

###  velocityIterations

• **velocityIterations**: *number* = 0

___

###  warmStarting

• **warmStarting**: *boolean* = false

## Methods

###  reset

▸ **reset**(`dt`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | number |

**Returns:** *void*
