const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// var merge = require('lodash.merge');
const pkg = require('./package.json');

const license = fs.readFileSync('./LICENSE.txt', 'utf8');

const licenseBanner = `
Planck.js v${pkg.version}

${license}
`;

module.exports = [
  {
    entry: {
      'planck': './lib/index.js',
      'planck-with-testbed': './testbed/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
      library: 'planck',
    },
    devtool: 'source-map',
    optimization: {
      minimize: true
    },
    plugins: [
      new webpack.BannerPlugin(licenseBanner),
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(false),
        ASSERT: JSON.stringify(false),
      }),
    ],
  },
  {
    entry: {
      'planck': './lib/index.js',
      'planck-with-testbed': './testbed/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: 'planck',
    },
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    plugins: [
      // function
      new webpack.BannerPlugin(licenseBanner),
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(false),
        ASSERT: JSON.stringify(false),
      }),
    ],
  },
];
