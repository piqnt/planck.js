
# Class: Vec3

## Hierarchy

* **Vec3**

## Index

### Constructors

* [constructor](/api/classes/vec3#constructor)

### Properties

* [x](/api/classes/vec3#x)
* [y](/api/classes/vec3#y)
* [z](/api/classes/vec3#z)

### Methods

* [add](/api/classes/vec3#add)
* [mul](/api/classes/vec3#mul)
* [neg](/api/classes/vec3#neg)
* [set](/api/classes/vec3#set)
* [setZero](/api/classes/vec3#setzero)
* [sub](/api/classes/vec3#sub)
* [add](/api/classes/vec3#static-add)
* [areEqual](/api/classes/vec3#static-areequal)
* [assert](/api/classes/vec3#static-assert)
* [clone](/api/classes/vec3#static-clone)
* [cross](/api/classes/vec3#static-cross)
* [dot](/api/classes/vec3#static-dot)
* [isValid](/api/classes/vec3#static-isvalid)
* [mul](/api/classes/vec3#static-mul)
* [neg](/api/classes/vec3#static-neg)
* [sub](/api/classes/vec3#static-sub)
* [zero](/api/classes/vec3#static-zero)

## Constructors

###  constructor

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](/api/classes/vec3)*

\+ **new Vec3**(`obj`: object): *[Vec3](/api/classes/vec3)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](/api/classes/vec3)*

\+ **new Vec3**(): *[Vec3](/api/classes/vec3)*

**Returns:** *[Vec3](/api/classes/vec3)*

## Properties

###  x

• **x**: *number*

___

###  y

• **y**: *number*

___

###  z

• **z**: *number*

## Methods

###  add

▸ **add**(`w`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

###  mul

▸ **mul**(`m`: number): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | number |

**Returns:** *[Vec3](/api/classes/vec3)*

___

###  neg

▸ **neg**(): *[Vec3](/api/classes/vec3)*

**Returns:** *[Vec3](/api/classes/vec3)*

___

###  set

▸ **set**(`x`: number, `y`: number, `z`: number): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** *[Vec3](/api/classes/vec3)*

___

###  setZero

▸ **setZero**(): *[Vec3](/api/classes/vec3)*

**Returns:** *[Vec3](/api/classes/vec3)*

___

###  sub

▸ **sub**(`w`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` add

▸ **add**(`v`: [Vec3Value](/api/interfaces/vec3value), `w`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` areEqual

▸ **areEqual**(`v`: [Vec3Value](/api/interfaces/vec3value), `w`: [Vec3Value](/api/interfaces/vec3value)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *boolean*

___

### `Static` assert

▸ **assert**(`o`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *void*

___

### `Static` clone

▸ **clone**(`v`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` cross

▸ **cross**(`v`: [Vec3Value](/api/interfaces/vec3value), `w`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

Cross product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` dot

▸ **dot**(`v`: [Vec3Value](/api/interfaces/vec3value), `w`: [Vec3Value](/api/interfaces/vec3value)): *number*

Dot product on two vectors

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *number*

___

### `Static` isValid

▸ **isValid**(`obj`: any): *boolean*

Does this vector contain finite coordinates?

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Static` mul

▸ **mul**(`v`: [Vec3Value](/api/interfaces/vec3value), `m`: number): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |
`m` | number |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` neg

▸ **neg**(`v`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` sub

▸ **sub**(`v`: [Vec3Value](/api/interfaces/vec3value), `w`: [Vec3Value](/api/interfaces/vec3value)): *[Vec3](/api/classes/vec3)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec3Value](/api/interfaces/vec3value) |
`w` | [Vec3Value](/api/interfaces/vec3value) |

**Returns:** *[Vec3](/api/classes/vec3)*

___

### `Static` zero

▸ **zero**(): *[Vec3](/api/classes/vec3)*

**Returns:** *[Vec3](/api/classes/vec3)*
