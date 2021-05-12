[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [ContactEdge](contactedge.md)

# Class: ContactEdge

A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.

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

\+ **new ContactEdge**(`contact`: [Contact](contact.md)): *[ContactEdge](contactedge.md)*

*Defined in [src/dynamics/Contact.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | [Contact](contact.md) |

**Returns:** *[ContactEdge](contactedge.md)*

## Properties

###  contact

• **contact**: *[Contact](contact.md)*

*Defined in [src/dynamics/Contact.ts:57](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L57)*

___

###  next

• **next**: *[ContactEdge](contactedge.md) | undefined*

*Defined in [src/dynamics/Contact.ts:59](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L59)*

___

###  other

• **other**: *[Body](body.md) | undefined*

*Defined in [src/dynamics/Contact.ts:60](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L60)*

___

###  prev

• **prev**: *[ContactEdge](contactedge.md) | undefined*

*Defined in [src/dynamics/Contact.ts:58](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Contact.ts#L58)*
