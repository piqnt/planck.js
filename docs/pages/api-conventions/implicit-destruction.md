
## Implicit Destruction

Often when using Planck.js you will create and destroy many bodies, shapes,
and joints. Managing these entities is somewhat automated by Planck.js. If
you destroy a body then all associated shapes and joints are
automatically destroyed. This is called implicit destruction.

When you destroy a body, all its attached shapes, joints, and contacts
are destroyed.
Any body connected to one of those joints and/or contacts is woken. This process is usually
convenient. However, you must be aware of one crucial issue:

> **Caution**:
> When a body is destroyed, all fixtures and joints attached to the body
> are automatically destroyed. You must nullify any references you have to
> those shapes and joints. Otherwise, your program will die horribly if
> you try to use those fixtures or joints later.

To help you nullify your references, Planck.js world publishes events
(`remove-joint`, `remove-fixture`, `remove-body`) that you can listen
to. Then the world object will notify you when an object is
going to be implicitly destroyed.

```js
world.on('remove-joint', function(joint) {
  // remove all references to joint.  
});
world.on('remove-fixture', function(fixture) {
  // remove all references to fixture.
});
world.on('remove-body', function(body) {
  // bodies are not removed implicitly,
  // but the world publishes this event if a body is removed
})
```
