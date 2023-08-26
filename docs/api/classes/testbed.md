[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Testbed](testbed.md)

# Class: Testbed

## Hierarchy

* **Testbed**

## Index

### Properties

* [activeKeys](testbed.md#activekeys)
* [background](testbed.md#background)
* [height](testbed.md#height)
* [hz](testbed.md#hz)
* [mouseForce](testbed.md#optional-mouseforce)
* [ratio](testbed.md#ratio)
* [scaleY](testbed.md#scaley)
* [speed](testbed.md#speed)
* [width](testbed.md#width)
* [x](testbed.md#x)
* [y](testbed.md#y)

### Methods

* [color](testbed.md#color)
* [drawAABB](testbed.md#abstract-drawaabb)
* [drawCircle](testbed.md#abstract-drawcircle)
* [drawEdge](testbed.md#abstract-drawedge)
* [drawPoint](testbed.md#abstract-drawpoint)
* [drawPolygon](testbed.md#abstract-drawpolygon)
* [drawSegment](testbed.md#abstract-drawsegment)
* [findAll](testbed.md#abstract-findall)
* [findOne](testbed.md#abstract-findone)
* [info](testbed.md#info)
* [keydown](testbed.md#keydown)
* [keyup](testbed.md#keyup)
* [start](testbed.md#abstract-start)
* [status](testbed.md#status)
* [step](testbed.md#step)
* [mount](testbed.md#static-mount)

## Properties

###  activeKeys

• **activeKeys**: *[ActiveKeys](../globals.md#activekeys)*

___

###  background

• **background**: *string* = "#222222"

___

###  height

• **height**: *number* = 60

World viewbox height.

___

###  hz

• **hz**: *number* = 60

World simulation step frequency

___

### `Optional` mouseForce

• **mouseForce**? : *number*

___

###  ratio

• **ratio**: *number* = 16

___

###  scaleY

• **scaleY**: *number* = -1

___

###  speed

• **speed**: *number* = 1

World simulation speed, default is 1

___

###  width

• **width**: *number* = 80

World viewbox width.

___

###  x

• **x**: *number* = 0

World viewbox center vertical offset.

___

###  y

• **y**: *number* = -10

World viewbox center horizontal offset.

## Methods

###  color

▸ **color**(`r`: number, `g`: number, `b`: number): *string*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |

**Returns:** *string*

___

### `Abstract` drawAABB

▸ **drawAABB**(`aabb`: [AABBValue](../interfaces/aabbvalue.md), `color`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](../interfaces/aabbvalue.md) |
`color` | string |

**Returns:** *void*

___

### `Abstract` drawCircle

▸ **drawCircle**(`p`: object, `r`: number, `color`: string): *void*

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

### `Abstract` drawEdge

▸ **drawEdge**(`a`: object, `b`: object, `color`: string): *void*

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

### `Abstract` drawPoint

▸ **drawPoint**(`p`: object, `r`: any, `color`: string): *void*

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

### `Abstract` drawPolygon

▸ **drawPolygon**(`points`: Array‹object›, `color`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`points` | Array‹object› |
`color` | string |

**Returns:** *void*

___

### `Abstract` drawSegment

▸ **drawSegment**(`a`: object, `b`: object, `color`: string): *void*

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

### `Abstract` findAll

▸ **findAll**(`query`: string): *([Fixture](fixture.md)‹› | [Body](body.md)‹› | [Joint](joint.md)‹›)[]*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *([Fixture](fixture.md)‹› | [Body](body.md)‹› | [Joint](joint.md)‹›)[]*

___

### `Abstract` findOne

▸ **findOne**(`query`: string): *[Fixture](fixture.md)‹› | [Body](body.md)‹› | [Joint](joint.md)‹›*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[Fixture](fixture.md)‹› | [Body](body.md)‹› | [Joint](joint.md)‹›*

___

###  info

▸ **info**(`text`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *void*

___

###  keydown

▸ **keydown**(`keyCode`: number, `label`: string): *void*

callback, to be implemented by user

**Parameters:**

Name | Type |
------ | ------ |
`keyCode` | number |
`label` | string |

**Returns:** *void*

___

###  keyup

▸ **keyup**(`keyCode`: number, `label`: string): *void*

callback, to be implemented by user

**Parameters:**

Name | Type |
------ | ------ |
`keyCode` | number |
`label` | string |

**Returns:** *void*

___

### `Abstract` start

▸ **start**(`world`: World): *void*

**Parameters:**

Name | Type |
------ | ------ |
`world` | World |

**Returns:** *void*

___

###  status

▸ **status**(`name`: string, `value`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | any |

**Returns:** *void*

▸ **status**(`value`: object | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | object &#124; string |

**Returns:** *void*

___

###  step

▸ **step**(`dt`: number, `t`: number): *void*

callback, to be implemented by user

**Parameters:**

Name | Type |
------ | ------ |
`dt` | number |
`t` | number |

**Returns:** *void*

___

### `Static` mount

▸ **mount**(`options?`: [TestbedMountOptions](../globals.md#testbedmountoptions)): *Testbed*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [TestbedMountOptions](../globals.md#testbedmountoptions) |

**Returns:** *Testbed*
