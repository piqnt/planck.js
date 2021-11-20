import * as planck from '.'

const world = planck.World()

const body = world.createBody()
const shape = planck.Circle(3)

body.createFixture({
  shape,
})
