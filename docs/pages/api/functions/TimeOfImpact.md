# Function: TimeOfImpact()

> **TimeOfImpact**(`output`, `input`): `void`

Compute the upper bound on time before two shapes penetrate. Time is
represented as a fraction between [0,tMax]. This uses a swept separating axis
and may miss some intermediate, non-tunneling collisions. If you change the
time interval, you should call this function again.

Note: use Distance to compute the contact point and normal at the time of
impact.

CCD via the local separating axis method. This seeks progression by computing
the largest time at which separation is maintained.

## Parameters

• **output**: [`TOIOutput`](/api/classes/TOIOutput)

• **input**: [`TOIInput`](/api/classes/TOIInput)

## Returns

`void`
