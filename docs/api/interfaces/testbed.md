[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Testbed](testbed.md)

# Interface: Testbed

## Hierarchy

* **Testbed**

## Index

### Properties

* [activeKeys](testbed.md#activekeys)
* [background](testbed.md#background)
* [findAll](testbed.md#findall)
* [findOne](testbed.md#findone)
* [height](testbed.md#height)
* [hz](testbed.md#hz)
* [keydown](testbed.md#optional-keydown)
* [keyup](testbed.md#optional-keyup)
* [mouseForce](testbed.md#optional-mouseforce)
* [ratio](testbed.md#ratio)
* [scaleY](testbed.md#scaley)
* [speed](testbed.md#speed)
* [step](testbed.md#optional-step)
* [width](testbed.md#width)
* [x](testbed.md#x)
* [y](testbed.md#y)

### Methods

* [color](testbed.md#color)
* [drawAABB](testbed.md#drawaabb)
* [drawCircle](testbed.md#drawcircle)
* [drawPoint](testbed.md#drawpoint)
* [drawPolygon](testbed.md#drawpolygon)
* [drawSegment](testbed.md#drawsegment)
* [info](testbed.md#info)
* [status](testbed.md#status)

## Properties

###  activeKeys

• **activeKeys**: *[ActiveKeys](activekeys.md)*

*Defined in [testbed/index.ts:87](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L87)*

___

###  background

• **background**: *string*

*Defined in [testbed/index.ts:88](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L88)*

___

###  findAll

• **findAll**: *function*

*Defined in [testbed/index.ts:109](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L109)*

#### Type declaration:

▸ (`query`: string): *[Body](../classes/body.md)[] | [Joint](../classes/joint.md)[] | [Fixture](../classes/fixture.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

___

###  findOne

• **findOne**: *function*

*Defined in [testbed/index.ts:108](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L108)*

#### Type declaration:

▸ (`query`: string): *[Body](../classes/body.md) | [Joint](../classes/joint.md) | [Fixture](../classes/fixture.md) | null*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

___

###  height

• **height**: *number*

*Defined in [testbed/index.ts:73](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L73)*

World viewbox height.

___

###  hz

• **hz**: *number*

*Defined in [testbed/index.ts:83](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L83)*

World simulation step frequency

___

### `Optional` keydown

• **keydown**? : *function*

*Defined in [testbed/index.ts:105](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L105)*

#### Type declaration:

▸ (`keyCode`: number, `label`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`keyCode` | number |
`label` | string |

___

### `Optional` keyup

• **keyup**? : *function*

*Defined in [testbed/index.ts:106](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L106)*

#### Type declaration:

▸ (`keyCode`: number, `label`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`keyCode` | number |
`label` | string |

___

### `Optional` mouseForce

• **mouseForce**? : *number*

*Defined in [testbed/index.ts:90](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L90)*

___

###  ratio

• **ratio**: *number*

*Defined in [testbed/index.ts:80](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L80)*

___

###  scaleY

• **scaleY**: *number*

*Defined in [testbed/index.ts:79](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L79)*

___

###  speed

• **speed**: *number*

*Defined in [testbed/index.ts:85](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L85)*

World simulation speed, default is 1

___

### `Optional` step

• **step**? : *function*

*Defined in [testbed/index.ts:104](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L104)*

#### Type declaration:

▸ (`dt`: number, `t`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | number |
`t` | number |

___

###  width

• **width**: *number*

*Defined in [testbed/index.ts:71](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L71)*

World viewbox width.

___

###  x

• **x**: *number*

*Defined in [testbed/index.ts:75](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L75)*

World viewbox center vertical offset.

___

###  y

• **y**: *number*

*Defined in [testbed/index.ts:77](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L77)*

World viewbox center horizontal offset.

## Methods

###  color

▸ **color**(`r`: number, `g`: number, `b`: number): *string*

*Defined in [testbed/index.ts:101](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |

**Returns:** *string*

___

###  drawAABB

▸ **drawAABB**(`aabb`: [AABB](../classes/aabb.md), `color`: string): *void*

*Defined in [testbed/index.ts:100](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABB](../classes/aabb.md) |
`color` | string |

**Returns:** *void*

___

###  drawCircle

▸ **drawCircle**(`p`: object, `r`: number, `color`: string): *void*

*Defined in [testbed/index.ts:97](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L97)*

**Parameters:**

▪ **p**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▪ **r**: *number*

▪ **color**: *string*

**Returns:** *void*

___

###  drawPoint

▸ **drawPoint**(`p`: object, `r`: any, `color`: string): *void*

*Defined in [testbed/index.ts:96](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L96)*

**Parameters:**

▪ **p**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▪ **r**: *any*

▪ **color**: *string*

**Returns:** *void*

___

###  drawPolygon

▸ **drawPolygon**(`points`: Array‹object›, `color`: string): *void*

*Defined in [testbed/index.ts:99](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`points` | Array‹object› |
`color` | string |

**Returns:** *void*

___

###  drawSegment

▸ **drawSegment**(`a`: object, `b`: object, `color`: string): *void*

*Defined in [testbed/index.ts:98](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L98)*

**Parameters:**

▪ **a**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▪ **b**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▪ **color**: *string*

**Returns:** *void*

___

###  info

▸ **info**(`text`: string): *void*

*Defined in [testbed/index.ts:94](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *void*

___

###  status

▸ **status**(`name`: string, `value`: any): *void*

*Defined in [testbed/index.ts:92](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | any |

**Returns:** *void*

▸ **status**(`value`: object | string): *void*

*Defined in [testbed/index.ts:93](https://github.com/shakiba/planck.js/blob/acc3bd8/testbed/index.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | object &#124; string |

**Returns:** *void*
