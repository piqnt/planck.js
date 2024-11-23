# Class: ContactEdge

A contact edge is used to connect bodies and contacts together in a contact
graph where each body is a node and each contact is an edge. A contact edge
belongs to a doubly linked list maintained in each attached body. Each
contact has two contact nodes, one for each attached body.

## Constructors

### new ContactEdge()

> **new ContactEdge**(`contact`): [`ContactEdge`](ContactEdge)

#### Parameters

• **contact**: [`Contact`](Contact)

#### Returns

[`ContactEdge`](ContactEdge)

## Properties

### contact

> **contact**: [`Contact`](Contact)

***

### next

> **next**: [`ContactEdge`](ContactEdge) = `null`

***

### other

> **other**: [`Body`](Body) = `null`

***

### prev

> **prev**: [`ContactEdge`](ContactEdge) = `null`
