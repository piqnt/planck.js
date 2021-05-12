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

*Defined in [src/dynamics/Joint.ts:46](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L46)*

the joint

___

###  next

• **next**: *[JointEdge](jointedge.md)‹›* = null as JointEdge | null

*Defined in [src/dynamics/Joint.ts:54](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L54)*

the next joint edge in the body's joint list

___

###  other

• **other**: *[Body](body.md)‹›* = null as Body | null

*Defined in [src/dynamics/Joint.ts:42](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L42)*

provides quick access to the other body attached.

___

###  prev

• **prev**: *[JointEdge](jointedge.md)‹›* = null as JointEdge | null

*Defined in [src/dynamics/Joint.ts:50](https://github.com/shakiba/planck.js/blob/acc3bd8/src/dynamics/Joint.ts#L50)*

prev the previous joint edge in the body's joint list
