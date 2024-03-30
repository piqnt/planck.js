[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [JointEdge](jointedge.md)

# Class: JointEdge

A joint edge is used to connect bodies and joints together in a joint graph
where each body is a node and each joint is an edge. A joint edge belongs to
a doubly linked list maintained in each attached body. Each joint has two
joint nodes, one for each attached body.

## Hierarchy

* **JointEdge**

## Index

### Properties

* [joint](jointedge.md#joint)
* [next](jointedge.md#next)
* [other](jointedge.md#other)
* [prev](jointedge.md#prev)

## Properties

###  joint

• **joint**: *[Joint](joint.md) | null* = null

the joint

___

###  next

• **next**: *[JointEdge](jointedge.md) | null* = null

the next joint edge in the body's joint list

___

###  other

• **other**: *[Body](body.md) | null* = null

provides quick access to the other body attached.

___

###  prev

• **prev**: *[JointEdge](jointedge.md) | null* = null

prev the previous joint edge in the body's joint list
