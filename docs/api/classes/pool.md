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

\+ **new Pool**(`opts`: any): *[Pool](pool.md)*

*Defined in [util/Pool.ts:31](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | any |

**Returns:** *[Pool](pool.md)*

## Properties

###  _createCount

• **_createCount**: *number* = 0

*Defined in [util/Pool.ts:28](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L28)*

___

###  _createFn

• **_createFn**: *function*

*Defined in [util/Pool.ts:23](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L23)*

#### Type declaration:

▸ (): *T*

___

###  _discardCount

• **_discardCount**: *number* = 0

*Defined in [util/Pool.ts:31](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L31)*

___

###  _discardFn

• **_discardFn**: *function*

*Defined in [util/Pool.ts:26](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L26)*

#### Type declaration:

▸ (`T`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`T` | any |

___

###  _inCount

• **_inCount**: *number* = 0

*Defined in [util/Pool.ts:30](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L30)*

___

###  _inFn

• **_inFn**: *function*

*Defined in [util/Pool.ts:25](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L25)*

#### Type declaration:

▸ (`T`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`T` | any |

___

###  _list

• **_list**: *any[]* = []

*Defined in [util/Pool.ts:20](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L20)*

___

###  _max

• **_max**: *number* = Infinity

*Defined in [util/Pool.ts:21](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L21)*

___

###  _outCount

• **_outCount**: *number* = 0

*Defined in [util/Pool.ts:29](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L29)*

___

###  _outFn

• **_outFn**: *function*

*Defined in [util/Pool.ts:24](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L24)*

#### Type declaration:

▸ (`T`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`T` | any |

## Methods

###  allocate

▸ **allocate**(): *T*

*Defined in [util/Pool.ts:55](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L55)*

**Returns:** *T*

___

###  max

▸ **max**(`n`: any): *number | this*

*Defined in [util/Pool.ts:43](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | any |

**Returns:** *number | this*

___

###  release

▸ **release**(`item`: T): *void*

*Defined in [util/Pool.ts:74](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  size

▸ **size**(): *number*

*Defined in [util/Pool.ts:51](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L51)*

**Returns:** *number*

___

###  toString

▸ **toString**(): *string*

*Defined in [util/Pool.ts:89](https://github.com/shakiba/planck.js/blob/8127f05/src/util/Pool.ts#L89)*

**Returns:** *string*
