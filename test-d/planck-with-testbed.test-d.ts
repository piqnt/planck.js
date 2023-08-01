import planck from '../dist/planck-with-testbed';

if (planck.testbed) {
  planck.testbed(function(testbed: planck.Testbed) {
    return new planck.World();
  });
  
  const testbed: planck.Testbed = planck.testbed();
  testbed.info("Info text");
}
