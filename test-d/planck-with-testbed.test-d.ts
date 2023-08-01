import planck from '../dist/planck-with-testbed';

planck.testbed(function(testebd) {
  return new planck.World();
});
