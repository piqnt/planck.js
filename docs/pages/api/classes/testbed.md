
# Class: Testbed

## Hierarchy

* **Testbed**

## Index

### Properties

* [activeKeys](/api/classes/testbed#activekeys)
* [background](/api/classes/testbed#background)
* [height](/api/classes/testbed#height)
* [hz](/api/classes/testbed#hz)
* [mouseForce](/api/classes/testbed#optional-mouseforce)
* [speed](/api/classes/testbed#speed)
* [width](/api/classes/testbed#width)
* [x](/api/classes/testbed#x)
* [y](/api/classes/testbed#y)

### Methods

* [color](/api/classes/testbed#color)
* [drawAABB](/api/classes/testbed#abstract-drawaabb)
* [drawCircle](/api/classes/testbed#abstract-drawcircle)
* [drawEdge](/api/classes/testbed#abstract-drawedge)
* [drawPoint](/api/classes/testbed#abstract-drawpoint)
* [drawPolygon](/api/classes/testbed#abstract-drawpolygon)
* [drawSegment](/api/classes/testbed#abstract-drawsegment)
* [findAll](/api/classes/testbed#abstract-findall)
* [findOne](/api/classes/testbed#abstract-findone)
* [info](/api/classes/testbed#abstract-info)
* [keydown](/api/classes/testbed#keydown)
* [keyup](/api/classes/testbed#keyup)
* [start](/api/classes/testbed#abstract-start)
* [status](/api/classes/testbed#abstract-status)
* [step](/api/classes/testbed#step)
* [mount](/api/classes/testbed#static-mount)
* [start](/api/classes/testbed#static-start)

## Properties

###  activeKeys

• **activeKeys**: *[ActiveKeys](/api/globals#activekeys)*

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

▸ **drawAABB**(`aabb`: [AABBValue](/api/interfaces/aabbvalue), `color`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | [AABBValue](/api/interfaces/aabbvalue) |
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

▸ **findAll**(`query`: string): *([Body](/api/classes/body)‹› | [Joint](/api/classes/joint)‹› | [Fixture](/api/classes/fixture)‹›)[]*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *([Body](/api/classes/body)‹› | [Joint](/api/classes/joint)‹› | [Fixture](/api/classes/fixture)‹›)[]*

___

### `Abstract` findOne

▸ **findOne**(`query`: string): *[Body](/api/classes/body)‹› | [Joint](/api/classes/joint)‹› | [Fixture](/api/classes/fixture)‹›*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[Body](/api/classes/body)‹› | [Joint](/api/classes/joint)‹› | [Fixture](/api/classes/fixture)‹›*

___

### `Abstract` info

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

▸ **start**(`world`: [World](/api/classes/world)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`world` | [World](/api/classes/world) |

**Returns:** *void*

___

### `Abstract` status

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

▸ **mount**(`options?`: [TestbedMountOptions](/api/globals#testbedmountoptions)): *[Testbed](/api/classes/testbed)*

Mounts testbed. Call start with a world to start simulation and rendering.

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [TestbedMountOptions](/api/globals#testbedmountoptions) |

**Returns:** *[Testbed](/api/classes/testbed)*

___

### `Static` start

▸ **start**(`world`: [World](/api/classes/world)): *[Testbed](/api/classes/testbed)*

Mounts testbed if needed, then starts simulation and rendering.

If you need to customize testbed before starting, first run `const testbed = Testbed.mount()` and then `testbed.start()`.

**Parameters:**

Name | Type |
------ | ------ |
`world` | [World](/api/classes/world) |

**Returns:** *[Testbed](/api/classes/testbed)*
