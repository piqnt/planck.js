const { execSync } = require('child_process');

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

export default () => {
  const commitDate = execSync('git log -1 --format=%cI').toString().trimEnd();
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd();
  const commitHash = execSync('git rev-parse HEAD').toString().trimEnd();
  const lastCommitMessage = execSync('git show -s --format=%s').toString().trimEnd();

  process.env.VITE_GIT_COMMIT_DATE = commitDate;
  process.env.VITE_GIT_BRANCH_NAME = branchName;
  process.env.VITE_GIT_COMMIT_HASH = commitHash;
  process.env.VITE_GIT_LAST_COMMIT_MESSAGE = lastCommitMessage;

  return {
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
};
