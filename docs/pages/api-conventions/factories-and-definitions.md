
## Factories and Definitions

To create a `Body` or a `Joint`, you need to call the factory functions on World:

```js
body = world.createBody(bodyDef);
joint = world.createJoint(jointDef);
```

And there are corresponding destruction functions:

```js
world.destroyBody(body)
world.destroyJoint(joint)
```

When you create a body or joint, you need to provide a definition. These
definitions contain all the information needed to build the body or
joint. By using this approach we can prevent construction errors, keep
the number of function parameters small, provide sensible defaults, and
reduce the number of accessors.

Since fixtures must be parented to a body, they are created and
destroyed using a factory method on `Body`:

```js
let fixture = body.createFixture(fixtureDef);
body.destroyFixture(fixture);
```

There is also a shortcut to create a fixture directly from the shape and
density.

```js
let fixture = body.createFixture(shape, density);
```
