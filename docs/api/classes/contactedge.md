[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ContactEdge](contactedge.md)

# Class: ContactEdge

A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.
A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.

**`prop`** {Contact} contact The contact

**`prop`** {ContactEdge} prev The previous contact edge in the body's contact list

**`prop`** {ContactEdge} next The next contact edge in the body's contact list

**`prop`** {Body} other Provides quick access to the other body attached.

**`prop`** {Contact} contact The contact

**`prop`** {ContactEdge} prev The previous contact edge in the body's contact list

**`prop`** {ContactEdge} next The next contact edge in the body's contact list

**`prop`** {Body} other Provides quick access to the other body attached.

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

\+ **new ContactEdge**(`contact`: any): *[ContactEdge](contactedge.md)*

*Defined in [dist/planck.d.ts:1159](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1159)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | any |

**Returns:** *[ContactEdge](contactedge.md)*

## Properties

###  contact

• **contact**: *Contact*

*Defined in [dist/planck.d.ts:1156](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1156)*

*Defined in [src/dynamics/Contact.ts:57](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Contact.ts#L57)*

___

###  next

• **next**: *ContactEdge | undefined*

*Defined in [dist/planck.d.ts:1158](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1158)*

*Defined in [src/dynamics/Contact.ts:59](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Contact.ts#L59)*

___

###  other

• **other**: *Body | undefined*

*Defined in [dist/planck.d.ts:1159](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1159)*

*Defined in [src/dynamics/Contact.ts:60](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Contact.ts#L60)*

___

###  prev

• **prev**: *ContactEdge | undefined*

*Defined in [dist/planck.d.ts:1157](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1157)*

*Defined in [src/dynamics/Contact.ts:58](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Contact.ts#L58)*
