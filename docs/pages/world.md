
## World
The `World` class contains the bodies and joints. It manages all aspects
of the simulation and allows for asynchronous queries (like AABB queries
and ray-casts). Much of your interactions with Planck.js will be with a
World object.

Creating a world is fairly simple. You just need to provide a gravity
vector and a boolean indicating if bodies can sleep.

```js
let myWorld = new World({
  gravity: {x: 0, y: -10},
  allowSleep: true,
});
```

The world class contains factories for creating and destroying bodies
and joints. These factories are discussed later in the sections on
bodies and joints. There are some other interactions with World that I
will cover now.

### Exploring the World
The world is a container for bodies, contacts, and joints. You can grab
the body, contact, and joint lists off the world and iterate over them.
For example, this code wakes up all the bodies in the world:

```js
for (let b = myWorld.getBodyList(); b; b = b.getNext()) {
  b.setAwake(true);
}
```

Unfortunately real programs can be more complicated. For example, the
following code is broken:

```js
for (let b = myWorld.getBodyList(); b; b = b.getNext()) {
  let myActor = b.getUserData();
  if (myActor.isDead()) {
    myWorld.destroyBody(b); // ERROR: now GetNext returns garbage.
  }
}
```

Everything goes ok until a body is destroyed. Once a body is destroyed,
its next pointer becomes invalid. So the call to `body.getNext()` will
return garbage. The solution to this is to copy the next pointer before
destroying the body.

```js
let node = myWorld.getBodyList();
while (node) {
  let b = node;
  node = node.getNext();
  
  let myActor = b.getUserData();
  if (myActor.isDead()) {
    myWorld.destroyBody(b);
  }
}
```

This safely destroys the current body. However, you may want to call a
game function that may destroy multiple bodies. In this case you need to
be very careful. The solution is application specific, but for
convenience I'll show one method of solving the problem.

```js
let node = myWorld.getBodyList();
while (node) {
  let b = node;
  node = node.getNext();

  let myActor = b.getUserData();
  if (myActor.IsDead()) {
    let otherBodiesDestroyed = gameCrazyBodyDestroyer(b);
    if (otherBodiesDestroyed) {
      node = myWorld.getBodyList();
    }
  }
}
```

Obviously to make this work, `gameCrazyBodyDestroyer()` must be honest about
what it has destroyed.
