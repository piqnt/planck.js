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

• **activeKeys**: *object*

*Defined in [testbed/index.d.ts:15](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L15)*

#### Type declaration:

* **0**? : *boolean*

* **1**? : *boolean*

* **2**? : *boolean*

* **3**? : *boolean*

* **4**? : *boolean*

* **5**? : *boolean*

* **6**? : *boolean*

* **7**? : *boolean*

* **8**? : *boolean*

* **9**? : *boolean*

* **A**? : *boolean*

* **B**? : *boolean*

* **C**? : *boolean*

* **D**? : *boolean*

* **E**? : *boolean*

* **F**? : *boolean*

* **G**? : *boolean*

* **H**? : *boolean*

* **I**? : *boolean*

* **J**? : *boolean*

* **K**? : *boolean*

* **L**? : *boolean*

* **M**? : *boolean*

* **N**? : *boolean*

* **O**? : *boolean*

* **P**? : *boolean*

* **Q**? : *boolean*

* **R**? : *boolean*

* **S**? : *boolean*

* **T**? : *boolean*

* **U**? : *boolean*

* **V**? : *boolean*

* **W**? : *boolean*

* **X**? : *boolean*

* **Y**? : *boolean*

* **Z**? : *boolean*

* **down**? : *boolean*

* **fire**? : *boolean*

* **left**? : *boolean*

* **right**? : *boolean*

* **up**? : *boolean*

___

###  background

• **background**: *string*

*Defined in [testbed/index.d.ts:58](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L58)*

___

###  findAll

• **findAll**: *function*

*Defined in [testbed/index.d.ts:80](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L80)*

#### Type declaration:

▸ (`query`: string): *Body[] | Joint[] | Fixture[]*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

___

###  findOne

• **findOne**: *function*

*Defined in [testbed/index.d.ts:79](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L79)*

#### Type declaration:

▸ (`query`: string): *Body | Joint | Fixture | null*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

___

###  height

• **height**: *number*

*Defined in [testbed/index.d.ts:8](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L8)*

___

###  hz

• **hz**: *number*

*Defined in [testbed/index.d.ts:13](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L13)*

___

### `Optional` keydown

• **keydown**? : *function*

*Defined in [testbed/index.d.ts:76](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L76)*

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

*Defined in [testbed/index.d.ts:77](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L77)*

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

*Defined in [testbed/index.d.ts:60](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L60)*

___

###  ratio

• **ratio**: *number*

*Defined in [testbed/index.d.ts:12](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L12)*

___

###  scaleY

• **scaleY**: *number*

*Defined in [testbed/index.d.ts:11](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L11)*

___

###  speed

• **speed**: *number*

*Defined in [testbed/index.d.ts:14](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L14)*

___

### `Optional` step

• **step**? : *function*

*Defined in [testbed/index.d.ts:75](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L75)*

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

*Defined in [testbed/index.d.ts:7](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L7)*

___

###  x

• **x**: *number*

*Defined in [testbed/index.d.ts:9](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L9)*

___

###  y

• **y**: *number*

*Defined in [testbed/index.d.ts:10](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L10)*

## Methods

###  color

▸ **color**(`r`: number, `g`: number, `b`: number): *string*

*Defined in [testbed/index.d.ts:72](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |

**Returns:** *string*

___

###  drawAABB

▸ **drawAABB**(`aabb`: AABB, `color`: string): *void*

*Defined in [testbed/index.d.ts:71](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`aabb` | AABB |
`color` | string |

**Returns:** *void*

___

###  drawCircle

▸ **drawCircle**(`p`: object, `r`: number, `color`: string): *void*

*Defined in [testbed/index.d.ts:68](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L68)*

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

*Defined in [testbed/index.d.ts:67](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L67)*

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

▸ **drawPolygon**(`points`: object[], `color`: string): *void*

*Defined in [testbed/index.d.ts:70](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`points` | object[] |
`color` | string |

**Returns:** *void*

___

###  drawSegment

▸ **drawSegment**(`a`: object, `b`: object, `color`: string): *void*

*Defined in [testbed/index.d.ts:69](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L69)*

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

*Defined in [testbed/index.d.ts:65](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *void*

___

###  status

▸ **status**(`name`: string, `value`: any): *void*

*Defined in [testbed/index.d.ts:62](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | any |

**Returns:** *void*

▸ **status**(`a`: object): *void*

*Defined in [testbed/index.d.ts:63](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | object |

**Returns:** *void*

▸ **status**(`a`: string): *void*

*Defined in [testbed/index.d.ts:64](https://github.com/shakiba/planck.js/blob/7e469c4/testbed/index.d.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *void*
