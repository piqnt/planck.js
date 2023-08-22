[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ContactEdge](contactedge.md)

# Class: ContactEdge

A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.

## Hierarchy

* **ContactEdge**

## Index

### Constructors

* [constructor](contactedge.md#constructor)

### Properties

* [contact](contactedge.md#contact)
* [next](contactedge.md#next)
* [other](contactedge.md#other)
* [prev](contactedge.md#prev)

## Constructors

###  constructor

\+ **new ContactEdge**(`contact`: [Contact](contact.md)): *[ContactEdge](contactedge.md)*

*Defined in [dynamics/Contact.ts:73](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Contact.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[ContactEdge](contactedge.md)*

## Properties

###  contact

• **contact**: *[Contact](contact.md)*

*Defined in [dynamics/Contact.ts:70](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Contact.ts#L70)*

___

###  next

• **next**: *[ContactEdge](contactedge.md) | null* = null

*Defined in [dynamics/Contact.ts:72](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Contact.ts#L72)*

___

###  other

• **other**: *[Body](body.md) | null* = null

*Defined in [dynamics/Contact.ts:73](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Contact.ts#L73)*

___

###  prev

• **prev**: *[ContactEdge](contactedge.md) | null* = null

*Defined in [dynamics/Contact.ts:71](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Contact.ts#L71)*
