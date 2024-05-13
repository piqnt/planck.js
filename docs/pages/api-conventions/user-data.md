
## User Data
The `Fixture`, `Body`, and `Joint` classes allow you to attach user data.

This is handy to implement game-logic and rendering.

For example, it is typical to attach an actor reference to the rigid body
on that actor. This sets up a circular reference. If you have the actor,
you can get the body. If you have the body, you can get the actor.

```js
let actor = gameCreateActor();
actor.body = myWorld.createBody({
  userData: actor
});
```

For fixtures you might consider defining a user data structure that lets
you store game specific information, such as material type, effects
hooks, sound hooks, etc.

```js
let fixture = body.createFixture({
  shape: someShape,
  userData: { materialIndex: 2 },
});
```

Keep in mind that user data is optional and you can put anything in it.
However, you should be consistent. For example, if you want to store an
actor reference on one body, you should keep an actor reference on all
bodies. Don't store an actor reference on one body, and a foo reference on
another body. Casting an actor reference to a foo reference may lead to a
crash.

User data references are null by default.
