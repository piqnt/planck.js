# Class: ContactEdge

A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.

## Constructors

### new ContactEdge()

> **new ContactEdge**(`contact`): [`ContactEdge`](/api/classes/ContactEdge)

#### Parameters

• **contact**: [`Contact`](/api/classes/Contact)

#### Returns

[`ContactEdge`](/api/classes/ContactEdge)

## Properties

### contact

> **contact**: [`Contact`](/api/classes/Contact)

***

### next

> **next**: [`ContactEdge`](/api/classes/ContactEdge) = `null`

***

### other

> **other**: [`Body`](/api/classes/Body) = `null`

***

### prev

> **prev**: [`ContactEdge`](/api/classes/ContactEdge) = `null`
