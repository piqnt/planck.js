# Class: DynamicTree\<T\>

A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt. A
dynamic tree arranges data in a binary tree to accelerate queries such as
volume queries and ray casts. Leafs are proxies with an AABB. In the tree we
expand the proxy AABB by `aabbExtension` so that the proxy AABB is bigger
than the client object. This allows the client object to move by small
amounts without triggering a tree update.

Nodes are pooled and relocatable, so we use node indices rather than
pointers.

## Type Parameters

• **T**

## Constructors

### new DynamicTree()

> **new DynamicTree**\<`T`\>(): [`DynamicTree`](/api/classes/DynamicTree)\<`T`\>

#### Returns

[`DynamicTree`](/api/classes/DynamicTree)\<`T`\>

## Properties

### m\_lastProxyId

> **m\_lastProxyId**: `number`

***

### m\_nodes

> **m\_nodes**: `object`

#### Index Signature

 \[`id`: `number`\]: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

***

### m\_root

> **m\_root**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

## Methods

### allocateNode()

> **allocateNode**(): [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

[`TreeNode`](/api/classes/TreeNode)\<`T`\>

***

### balance()

> **balance**(`iA`): [`TreeNode`](/api/classes/TreeNode)\<`T`\>

Perform a left or right rotation if node A is imbalanced. Returns the new
root index.

#### Parameters

• **iA**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

[`TreeNode`](/api/classes/TreeNode)\<`T`\>

***

### computeHeight()

> **computeHeight**(`id`?): `number`

Compute the height of a sub-tree.

#### Parameters

• **id?**: `number`

#### Returns

`number`

***

### createProxy()

> **createProxy**(`aabb`, `userData`): `number`

Create a proxy in the tree as a leaf node. We return the index of the node
instead of a pointer so that we can grow the node pool.

Create a proxy. Provide a tight fitting AABB and a userData pointer.

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

• **userData**: `T`

#### Returns

`number`

***

### destroyProxy()

> **destroyProxy**(`id`): `void`

Destroy a proxy. This asserts if the id is invalid.

#### Parameters

• **id**: `number`

#### Returns

`void`

***

### freeNode()

> **freeNode**(`node`): `void`

#### Parameters

• **node**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

`void`

***

### getAreaRatio()

> **getAreaRatio**(): `number`

Get the ratio of the sum of the node areas to the root area.

#### Returns

`number`

***

### getFatAABB()

> **getFatAABB**(`id`): [`AABB`](/api/classes/AABB)

Get the fat AABB for a node id.

#### Parameters

• **id**: `number`

#### Returns

[`AABB`](/api/classes/AABB)

the proxy user data or 0 if the id is invalid.

***

### getHeight()

> **getHeight**(): `number`

Compute the height of the binary tree in O(N) time. Should not be called
often.

#### Returns

`number`

***

### getMaxBalance()

> **getMaxBalance**(): `number`

Get the maximum balance of an node in the tree. The balance is the difference
in height of the two children of a node.

#### Returns

`number`

***

### getUserData()

> **getUserData**(`id`): `T`

Get proxy user data.

#### Parameters

• **id**: `number`

#### Returns

`T`

the proxy user data or 0 if the id is invalid.

***

### insertLeaf()

> **insertLeaf**(`leaf`): `void`

#### Parameters

• **leaf**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

`void`

***

### moveProxy()

> **moveProxy**(`id`, `aabb`, `d`): `boolean`

Move a proxy with a swepted AABB. If the proxy has moved outside of its
fattened AABB, then the proxy is removed from the tree and re-inserted.
Otherwise the function returns immediately.

#### Parameters

• **id**: `number`

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

• **d**: [`Vec2Value`](/api/interfaces/Vec2Value)

Displacement

#### Returns

`boolean`

true if the proxy was re-inserted.

***

### query()

> **query**(`aabb`, `queryCallback`): `void`

Query an AABB for overlapping proxies. The callback class is called for each
proxy that overlaps the supplied AABB.

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

• **queryCallback**: [`DynamicTreeQueryCallback`](/api/type-aliases/DynamicTreeQueryCallback)

#### Returns

`void`

***

### rayCast()

> **rayCast**(`input`, `rayCastCallback`): `void`

Ray-cast against the proxies in the tree. This relies on the callback to
perform a exact ray-cast in the case were the proxy contains a shape. The
callback also performs the any collision filtering. This has performance
roughly equal to k * log(n), where k is the number of collisions and n is the
number of proxies in the tree.

#### Parameters

• **input**: [`RayCastInput`](/api/interfaces/RayCastInput)

The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.

• **rayCastCallback**: [`RayCastCallback`](/api/type-aliases/RayCastCallback)

A function that is called for each proxy that is hit by the ray. If the return value is a positive number it will update the maxFraction of the ray cast input, and if it is zero it will terminate they ray cast.

#### Returns

`void`

***

### rebuildBottomUp()

> **rebuildBottomUp**(): `void`

Build an optimal tree. Very expensive. For testing.

#### Returns

`void`

***

### removeLeaf()

> **removeLeaf**(`leaf`): `void`

#### Parameters

• **leaf**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

`void`

***

### shiftOrigin()

> **shiftOrigin**(`newOrigin`): `void`

Shift the world origin. Useful for large worlds. The shift formula is:
position -= newOrigin

#### Parameters

• **newOrigin**: [`Vec2Value`](/api/interfaces/Vec2Value)

The new origin with respect to the old origin

#### Returns

`void`

***

### validate()

> **validate**(): `void`

Validate this tree. For testing.

#### Returns

`void`

***

### validateMetrics()

> **validateMetrics**(`node`): `void`

#### Parameters

• **node**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

`void`

***

### validateStructure()

> **validateStructure**(`node`): `void`

#### Parameters

• **node**: [`TreeNode`](/api/classes/TreeNode)\<`T`\>

#### Returns

`void`
