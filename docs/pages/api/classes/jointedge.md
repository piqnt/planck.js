
# Class: JointEdge

A joint edge is used to connect bodies and joints together in a joint graph
where each body is a node and each joint is an edge. A joint edge belongs to
a doubly linked list maintained in each attached body. Each joint has two
joint nodes, one for each attached body.

## Hierarchy

* **JointEdge**

## Index

### Properties

* [joint](/api/classes/jointedge#joint)
* [next](/api/classes/jointedge#next)
* [other](/api/classes/jointedge#other)
* [prev](/api/classes/jointedge#prev)

## Properties

###  joint

• **joint**: *[Joint](/api/classes/joint) | null* = null

the joint

___

###  next

• **next**: *[JointEdge](/api/classes/jointedge) | null* = null

the next joint edge in the body's joint list

___

###  other

• **other**: *[Body](/api/classes/body) | null* = null

provides quick access to the other body attached.

___

###  prev

• **prev**: *[JointEdge](/api/classes/jointedge) | null* = null

prev the previous joint edge in the body's joint list
