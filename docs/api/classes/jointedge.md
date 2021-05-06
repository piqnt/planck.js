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

• **joint**: *[Joint](joint.md)‹›* = null as Joint | null

*Defined in [src/dynamics/Joint.ts:45](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L45)*

the joint

___

###  next

• **next**: *[JointEdge](jointedge.md)‹›* = null as JointEdge | null

*Defined in [src/dynamics/Joint.ts:53](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L53)*

the next joint edge in the body's joint list

___

###  other

• **other**: *[Body](body.md)‹›* = null as Body | null

*Defined in [src/dynamics/Joint.ts:41](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L41)*

provides quick access to the other body attached.

___

###  prev

• **prev**: *[JointEdge](jointedge.md)‹›* = null as JointEdge | null

*Defined in [src/dynamics/Joint.ts:49](https://github.com/shakiba/planck.js/blob/b8c946c/src/dynamics/Joint.ts#L49)*

prev the previous joint edge in the body's joint list
