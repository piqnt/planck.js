# Class: Testbed

## Constructors

### new Testbed()

> **new Testbed**(): [`Testbed`](/api/classes/Testbed)

#### Returns

[`Testbed`](/api/classes/Testbed)

## Methods

### mount()

> `static` **mount**(`options`?): [`TestbedInterface`](/api/interfaces/TestbedInterface)

Mounts testbed. Call start with a world to start simulation and rendering.

#### Parameters

• **options?**: `TestbedMountOptions`

#### Returns

[`TestbedInterface`](/api/interfaces/TestbedInterface)

***

### start()

> `static` **start**(`world`): [`TestbedInterface`](/api/interfaces/TestbedInterface)

Mounts testbed if needed, then starts simulation and rendering.

If you need to customize testbed before starting, first run `const testbed = Testbed.mount()` and then `testbed.start()`.

#### Parameters

• **world**: [`World`](/api/classes/World)

#### Returns

[`TestbedInterface`](/api/interfaces/TestbedInterface)
