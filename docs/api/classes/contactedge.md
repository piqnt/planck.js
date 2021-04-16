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

*Defined in [dist/planck.d.ts:1183](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1183)*

**Parameters:**

Name | Type |
------ | ------ |
`contact` | any |

**Returns:** *[ContactEdge](contactedge.md)*

## Properties

###  contact

• **contact**: *Contact*

*Defined in [dist/planck.d.ts:1180](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1180)*

*Defined in [src/dynamics/Contact.ts:57](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Contact.ts#L57)*

___

###  next

• **next**: *ContactEdge | undefined*

*Defined in [dist/planck.d.ts:1182](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1182)*

*Defined in [src/dynamics/Contact.ts:59](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Contact.ts#L59)*

___

###  other

• **other**: *Body | undefined*

*Defined in [dist/planck.d.ts:1183](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1183)*

*Defined in [src/dynamics/Contact.ts:60](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Contact.ts#L60)*

___

###  prev

• **prev**: *ContactEdge | undefined*

*Defined in [dist/planck.d.ts:1181](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1181)*

*Defined in [src/dynamics/Contact.ts:58](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Contact.ts#L58)*
