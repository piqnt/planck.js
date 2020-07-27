[API Doc](../README.md) › [internal](internal.md) › [Distance](internal.distance.md)

# Namespace: Distance

## Callable

▸ **Distance**(`output`: [Input](../classes/internal.distance.input.md), `cache`: [Cache](../classes/internal.distance.cache.md), `input`: [Input](../classes/internal.distance.input.md)): *void*

*Defined in [index.d.ts:663](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L663)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [Input](../classes/internal.distance.input.md) |
`cache` | [Cache](../classes/internal.distance.cache.md) |
`input` | [Input](../classes/internal.distance.input.md) |

**Returns:** *void*

## Index

### Classes

* [Cache](../classes/internal.distance.cache.md)
* [Input](../classes/internal.distance.input.md)
* [Output](../classes/internal.distance.output.md)

### Variables

* [Proxy](internal.distance.md#let-proxy)

### Functions

* [testOverlap](internal.distance.md#testoverlap)

## Variables

### `Let` Proxy

• **Proxy**: *object*

*Defined in [index.d.ts:678](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L678)*

#### Type declaration:

* **new __type**(): *[DistanceProxy](../interfaces/distanceproxy.md)*

## Functions

###  testOverlap

▸ **testOverlap**(`shapeA`: [Shape](../interfaces/shape.md), `indexA`: number, `shapeB`: [Shape](../interfaces/shape.md), `indexB`: number, `xfA`: [Transform](../interfaces/transform.md), `xfB`: [Transform](../interfaces/transform.md)): *boolean*

*Defined in [index.d.ts:687](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L687)*

**Parameters:**

Name | Type |
------ | ------ |
`shapeA` | [Shape](../interfaces/shape.md) |
`indexA` | number |
`shapeB` | [Shape](../interfaces/shape.md) |
`indexB` | number |
`xfA` | [Transform](../interfaces/transform.md) |
`xfB` | [Transform](../interfaces/transform.md) |

**Returns:** *boolean*
