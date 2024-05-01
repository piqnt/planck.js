---
showOutline: false
---

# Class: TimeStep

## Hierarchy

* **TimeStep**

## Index

### Properties

* [blockSolve](/api/classes/timestep#blocksolve)
* [dt](/api/classes/timestep#dt)
* [dtRatio](/api/classes/timestep#dtratio)
* [inv_dt](/api/classes/timestep#inv_dt)
* [inv_dt0](/api/classes/timestep#inv_dt0)
* [positionIterations](/api/classes/timestep#positioniterations)
* [velocityIterations](/api/classes/timestep#velocityiterations)
* [warmStarting](/api/classes/timestep#warmstarting)

### Methods

* [reset](/api/classes/timestep#reset)

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
