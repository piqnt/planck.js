[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [DistanceInput](distanceinput.md)

# Class: DistanceInput

Input for Distance. You have to option to use the shape radii in the
computation. Even

## Hierarchy

* **DistanceInput**

## Index

### Properties

* [proxyA](distanceinput.md#readonly-proxya)
* [proxyB](distanceinput.md#readonly-proxyb)
* [transformA](distanceinput.md#readonly-transforma)
* [transformB](distanceinput.md#readonly-transformb)
* [useRadii](distanceinput.md#useradii)

### Methods

* [recycle](distanceinput.md#recycle)

## Properties

### `Readonly` proxyA

• **proxyA**: *[DistanceProxy](distanceproxy.md)‹›* = new DistanceProxy()

*Defined in [collision/Distance.ts:60](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L60)*

___

### `Readonly` proxyB

• **proxyB**: *[DistanceProxy](distanceproxy.md)‹›* = new DistanceProxy()

*Defined in [collision/Distance.ts:61](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L61)*

___

### `Readonly` transformA

• **transformA**: *[Transform](transform.md)‹›* = Transform.identity()

*Defined in [collision/Distance.ts:62](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L62)*

___

### `Readonly` transformB

• **transformB**: *[Transform](transform.md)‹›* = Transform.identity()

*Defined in [collision/Distance.ts:63](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L63)*

___

###  useRadii

• **useRadii**: *boolean* = false

*Defined in [collision/Distance.ts:64](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L64)*

## Methods

###  recycle

▸ **recycle**(): *void*

*Defined in [collision/Distance.ts:65](https://github.com/shakiba/planck.js/blob/5b96d95/src/collision/Distance.ts#L65)*

**Returns:** *void*
