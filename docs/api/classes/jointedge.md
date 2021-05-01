[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [JointEdge](jointedge.md)

# Class: JointEdge

A joint edge is used to connect bodies and joints together in a joint graph
where each body is a node and each joint is an edge. A joint edge belongs to
a doubly linked list maintained in each attached body. Each joint has two
joint nodes, one for each attached body.
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

• **joint**: *Joint‹›* = null as Joint | null

*Defined in [dist/planck.d.ts:916](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L916)*

*Defined in [src/dynamics/Joint.ts:45](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L45)*

the joint
the joint

___

###  next

• **next**: *JointEdge‹›* = null as JointEdge | null

*Defined in [dist/planck.d.ts:924](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L924)*

*Defined in [src/dynamics/Joint.ts:53](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L53)*

the next joint edge in the body's joint list
the next joint edge in the body's joint list

___

###  other

• **other**: *Body‹›* = null as Body | null

*Defined in [dist/planck.d.ts:912](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L912)*

*Defined in [src/dynamics/Joint.ts:41](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L41)*

provides quick access to the other body attached.
provides quick access to the other body attached.

___

###  prev

• **prev**: *JointEdge‹›* = null as JointEdge | null

*Defined in [dist/planck.d.ts:920](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L920)*

*Defined in [src/dynamics/Joint.ts:49](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Joint.ts#L49)*

prev the previous joint edge in the body's joint list
prev the previous joint edge in the body's joint list
