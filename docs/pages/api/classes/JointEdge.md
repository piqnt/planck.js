# Class: JointEdge

A joint edge is used to connect bodies and joints together in a joint graph
where each body is a node and each joint is an edge. A joint edge belongs to
a doubly linked list maintained in each attached body. Each joint has two
joint nodes, one for each attached body.

## Constructors

### new JointEdge()

> **new JointEdge**(): [`JointEdge`](JointEdge)

#### Returns

[`JointEdge`](JointEdge)

## Properties

### joint

> **joint**: [`Joint`](Joint) = `null`

the joint

***

### next

> **next**: [`JointEdge`](JointEdge) = `null`

the next joint edge in the body's joint list

***

### other

> **other**: [`Body`](Body) = `null`

provides quick access to the other body attached.

***

### prev

> **prev**: [`JointEdge`](JointEdge) = `null`

prev the previous joint edge in the body's joint list
