[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Pool](pool.md)

# Class: Pool ‹**T, T**›

## Type parameters

▪ **T**

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

*Defined in [dist/planck.d.ts:475](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L475)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | any |

**Returns:** *[Pool](pool.md)*

## Properties

###  _createCount

• **_createCount**: *number* = 0

*Defined in [dist/planck.d.ts:472](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L472)*

*Defined in [src/util/Pool.ts:28](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L28)*

___

###  _createFn

• **_createFn**: *function*

*Defined in [dist/planck.d.ts:468](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L468)*

*Defined in [src/util/Pool.ts:23](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L23)*

#### Type declaration:

▸ (): *T*

___

###  _discardCount

• **_discardCount**: *number* = 0

*Defined in [dist/planck.d.ts:475](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L475)*

*Defined in [src/util/Pool.ts:31](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L31)*

___

###  _discardFn

• **_discardFn**: *function*

*Defined in [dist/planck.d.ts:471](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L471)*

*Defined in [src/util/Pool.ts:26](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L26)*

#### Type declaration:

▸ (`T`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`T` | any |

___

###  _inCount

• **_inCount**: *number* = 0

*Defined in [dist/planck.d.ts:474](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L474)*

*Defined in [src/util/Pool.ts:30](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L30)*

___

###  _inFn

• **_inFn**: *function*

*Defined in [dist/planck.d.ts:470](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L470)*

*Defined in [src/util/Pool.ts:25](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L25)*

#### Type declaration:

▸ (`T`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`T` | any |

___

###  _list

• **_list**: *any[]* = []

*Defined in [dist/planck.d.ts:466](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L466)*

*Defined in [src/util/Pool.ts:20](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L20)*

___

###  _max

• **_max**: *number* = Infinity

*Defined in [dist/planck.d.ts:467](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L467)*

*Defined in [src/util/Pool.ts:21](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L21)*

___

###  _outCount

• **_outCount**: *number* = 0

*Defined in [dist/planck.d.ts:473](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L473)*

*Defined in [src/util/Pool.ts:29](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L29)*

___

###  _outFn

• **_outFn**: *function*

*Defined in [dist/planck.d.ts:469](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L469)*

*Defined in [src/util/Pool.ts:24](https://github.com/shakiba/planck.js/blob/3ede11b/src/util/Pool.ts#L24)*

#### Type declaration:

▸ (`T`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`T` | any |

## Methods

###  allocate

▸ **allocate**(): *T*

*Defined in [dist/planck.d.ts:479](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L479)*

**Returns:** *T*

___

###  max

▸ **max**(`n`: any): *number | this*

*Defined in [dist/planck.d.ts:477](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L477)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | any |

**Returns:** *number | this*

___

###  release

▸ **release**(`item`: T): *void*

*Defined in [dist/planck.d.ts:480](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L480)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  size

▸ **size**(): *number*

*Defined in [dist/planck.d.ts:478](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L478)*

**Returns:** *number*

___

###  toString

▸ **toString**(): *string*

*Defined in [dist/planck.d.ts:481](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L481)*

**Returns:** *string*
