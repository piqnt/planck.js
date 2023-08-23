[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [TOIInput](toiinput.md)

# Class: TOIInput

Input parameters for TimeOfImpact.

## Hierarchy

* **TOIInput**

## Index

### Properties

* [proxyA](toiinput.md#proxya)
* [proxyB](toiinput.md#proxyb)
* [sweepA](toiinput.md#sweepa)
* [sweepB](toiinput.md#sweepb)
* [tMax](toiinput.md#tmax)

### Methods

* [recycle](toiinput.md#recycle)

## Properties

###  proxyA

• **proxyA**: *[DistanceProxy](distanceproxy.md)‹›* = new DistanceProxy()

*Defined in [collision/TimeOfImpact.ts:43](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/TimeOfImpact.ts#L43)*

___

###  proxyB

• **proxyB**: *[DistanceProxy](distanceproxy.md)‹›* = new DistanceProxy()

*Defined in [collision/TimeOfImpact.ts:44](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/TimeOfImpact.ts#L44)*

___

###  sweepA

• **sweepA**: *[Sweep](sweep.md)‹›* = new Sweep()

*Defined in [collision/TimeOfImpact.ts:45](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/TimeOfImpact.ts#L45)*

___

###  sweepB

• **sweepB**: *[Sweep](sweep.md)‹›* = new Sweep()

*Defined in [collision/TimeOfImpact.ts:46](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/TimeOfImpact.ts#L46)*

___

###  tMax

• **tMax**: *number*

*Defined in [collision/TimeOfImpact.ts:48](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/TimeOfImpact.ts#L48)*

defines sweep interval [0, tMax]

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/TimeOfImpact.ts:49](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/TimeOfImpact.ts#L49)*

**Returns:** *void*
