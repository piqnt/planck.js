[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Pool](pool.md)

# Class: Pool ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **Pool**

## Index

### Constructors

* [constructor](pool.md#constructor)

### Properties

* [_createCount](pool.md#_createcount)
* [_createFn](pool.md#_createfn)
* [_discardCount](pool.md#_discardcount)
* [_discardFn](pool.md#_discardfn)
* [_inCount](pool.md#_incount)
* [_inFn](pool.md#_infn)
* [_list](pool.md#_list)
* [_max](pool.md#_max)
* [_outCount](pool.md#_outcount)
* [_outFn](pool.md#_outfn)

### Methods

* [allocate](pool.md#allocate)
* [max](pool.md#max)
* [release](pool.md#release)
* [size](pool.md#size)
* [toString](pool.md#tostring)

## Constructors

###  constructor

\+ **new Pool**(`opts`: object): *[Pool](pool.md)*

*Defined in [src/util/Pool.ts:31](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L31)*

**Parameters:**

▪ **opts**: *object*

Name | Type |
------ | ------ |
`allocate?` | function |
`create?` | function |
`discard?` | function |
`max?` | number |
`release?` | function |

**Returns:** *[Pool](pool.md)*

## Properties

###  _createCount

• **_createCount**: *number* = 0

*Defined in [src/util/Pool.ts:28](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L28)*

___

###  _createFn

• **_createFn**: *function*

*Defined in [src/util/Pool.ts:23](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L23)*

#### Type declaration:

▸ (): *T*

___

###  _discardCount

• **_discardCount**: *number* = 0

*Defined in [src/util/Pool.ts:31](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L31)*

___

###  _discardFn

• **_discardFn**: *function*

*Defined in [src/util/Pool.ts:26](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L26)*

#### Type declaration:

▸ (`item`: T): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

___

###  _inCount

• **_inCount**: *number* = 0

*Defined in [src/util/Pool.ts:30](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L30)*

___

###  _inFn

• **_inFn**: *function*

*Defined in [src/util/Pool.ts:25](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L25)*

#### Type declaration:

▸ (`item`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

___

###  _list

• **_list**: *T[]* = []

*Defined in [src/util/Pool.ts:20](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L20)*

___

###  _max

• **_max**: *number* = Infinity

*Defined in [src/util/Pool.ts:21](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L21)*

___

###  _outCount

• **_outCount**: *number* = 0

*Defined in [src/util/Pool.ts:29](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L29)*

___

###  _outFn

• **_outFn**: *function*

*Defined in [src/util/Pool.ts:24](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L24)*

#### Type declaration:

▸ (`item`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

## Methods

###  allocate

▸ **allocate**(): *T*

*Defined in [src/util/Pool.ts:61](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L61)*

**Returns:** *T*

___

###  max

▸ **max**(`n?`: number): *number | [Pool](pool.md)‹T›*

*Defined in [src/util/Pool.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`n?` | number |

**Returns:** *number | [Pool](pool.md)‹T›*

___

###  release

▸ **release**(`item`: T): *void*

*Defined in [src/util/Pool.ts:81](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  size

▸ **size**(): *number*

*Defined in [src/util/Pool.ts:57](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L57)*

**Returns:** *number*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/util/Pool.ts:96](https://github.com/shakiba/planck.js/blob/acc3bd8/src/util/Pool.ts#L96)*

**Returns:** *string*
