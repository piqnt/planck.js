
# Class: ContactEdge

A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.

## Hierarchy

* **ContactEdge**

## Index

### Constructors

* [constructor](/api/classes/contactedge#constructor)

### Properties

* [contact](/api/classes/contactedge#contact)
* [next](/api/classes/contactedge#next)
* [other](/api/classes/contactedge#other)
* [prev](/api/classes/contactedge#prev)

## Constructors

###  constructor

\+ **new ContactEdge**(`contact`: [Contact](/api/classes/contact)): *[ContactEdge](/api/classes/contactedge)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](/api/classes/contact) |

**Returns:** *[ContactEdge](/api/classes/contactedge)*

## Properties

###  contact

• **contact**: *[Contact](/api/classes/contact)*

___

###  next

• **next**: *[ContactEdge](/api/classes/contactedge) | null* = null

___

###  other

• **other**: *[Body](/api/classes/body) | null* = null

___

###  prev

• **prev**: *[ContactEdge](/api/classes/contactedge) | null* = null
