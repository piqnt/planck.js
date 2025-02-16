# Class: BroadPhase

The broad-phase wraps and extends a dynamic-tree to keep track of moved
objects and query them on update.

## Constructors

### new BroadPhase()

> **new BroadPhase**(): [`BroadPhase`](/api/classes/BroadPhase)

#### Returns

[`BroadPhase`](/api/classes/BroadPhase)

## Properties

### m\_callback()

> **m\_callback**: (`userDataA`, `userDataB`) => `void`

#### Parameters

• **userDataA**: `any`

• **userDataB**: `any`

#### Returns

`void`

***

### m\_moveBuffer

> **m\_moveBuffer**: `number`[] = `[]`

***

### m\_queryProxyId

> **m\_queryProxyId**: `number`

***

### m\_tree

> **m\_tree**: [`DynamicTree`](/api/classes/DynamicTree)\<[`FixtureProxy`](/api/classes/FixtureProxy)\>

## Methods

### bufferMove()

> **bufferMove**(`proxyId`): `void`

#### Parameters

• **proxyId**: `number`

#### Returns

`void`

***

### createProxy()

> **createProxy**(`aabb`, `userData`): `number`

Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
is called.

#### Parameters

• **aabb**: [`AABBValue`](/api/interfaces/AABBValue)

• **userData**: [`FixtureProxy`](/api/classes/FixtureProxy)

#### Returns

`number`

***

### destroyProxy()

> **destroyProxy**(`proxyId`): `void`

Destroy a proxy. It is up to the client to remove any pairs.

#### Parameters

• **proxyId**: `number`

#### Returns

`void`

***

### getFatAABB()

> **getFatAABB**(`proxyId`): [`AABB`](/api/classes/AABB)

Get the fat AABB for a proxy.

#### Parameters

• **proxyId**: `number`

#### Returns

[`AABB`](/api/classes/AABB)

***

### getProxyCount()

> **getProxyCount**(): `number`

Get the number of proxies.

#### Returns

`number`

***

### getTreeBalance()

> **getTreeBalance**(): `number`

Get the balance (integer) of the embedded tree.

#### Returns

`number`

***

### getTreeHeight()

> **getTreeHeight**(): `number`

Get the height of the embedded tree.

#### Returns

`number`

***

### getTreeQuality()

> **getTreeQuality**(): `number`

Get the quality metric of the embedded tree.

#### Returns

`number`

***

### getUserData()

> **getUserData**(`proxyId`): [`FixtureProxy`](/api/classes/FixtureProxy)

Get user data from a proxy. Returns null if the id is invalid.

#### Parameters

• **proxyId**: `number`

#### Returns

[`FixtureProxy`](/api/classes/FixtureProxy)

***

### moveProxy()

> **moveProxy**(`proxyId`, `aabb`, `displacement`): `void`

Call moveProxy as many times as you like, then when you are done call
UpdatePairs to finalized the proxy pairs (for your time step).

#### Parameters

• **proxyId**: `number`

• **aabb**: [`AABB`](/api/classes/AABB)

• **displacement**: [`Vec2Value`](/api/interfaces/Vec2Value)

#### Returns

`void`

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

### queryCallback()

> **queryCallback**(`proxyId`): `boolean`

#### Parameters

• **proxyId**: `number`

#### Returns

`boolean`

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

### testOverlap()

> **testOverlap**(`proxyIdA`, `proxyIdB`): `boolean`

Test overlap of fat AABBs.

#### Parameters

• **proxyIdA**: `number`

• **proxyIdB**: `number`

#### Returns

`boolean`

***

### touchProxy()

> **touchProxy**(`proxyId`): `void`

Call to trigger a re-processing of it's pairs on the next call to
UpdatePairs.

#### Parameters

• **proxyId**: `number`

#### Returns

`void`

***

### unbufferMove()

> **unbufferMove**(`proxyId`): `void`

#### Parameters

• **proxyId**: `number`

#### Returns

`void`

***

### updatePairs()

> **updatePairs**(`addPairCallback`): `void`

Update the pairs. This results in pair callbacks. This can only add pairs.

#### Parameters

• **addPairCallback**

#### Returns

`void`
