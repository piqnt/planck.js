
// this plugin serves the testbed when the url points to an example
const TestbedPlugin = {
  name: 'testbed-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // console.log('middleware', req);
      // todo: check if the url + '.js' or '.ts' is a file
      if (/^\/example\/(\w|-)+$/.test(req.originalUrl)) {
        req.url = '/testbed/';
      }
      next();
    })
  }
}

export default {
  define: {
    ASSERT: "false",
    _ASSERT: "false",
    CONSTRUCTOR_FACTORY: "false",
    _CONSTRUCTOR_FACTORY: "false",
  },
  plugins: [
    TestbedPlugin,
  ]
};
