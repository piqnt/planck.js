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

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[ContactEdge](contactedge.md)*

## Properties

###  contact

• **contact**: *[Contact](contact.md)*

___

###  next

• **next**: *[ContactEdge](contactedge.md) | null* = null

___

###  other

• **other**: *[Body](body.md) | null* = null

___

###  prev

• **prev**: *[ContactEdge](contactedge.md) | null* = null
