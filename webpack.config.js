const path = require('path');
const webpack = require('webpack');
const licenseBanner = require('license');

module.exports = [
  {
    entry: {
      'planck': './src/index.ts',
      'planck-with-testbed': './testbed/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
      library: 'planck',
      libraryTarget: 'umd',
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
      'planck': './src/index.ts',
      'planck-with-testbed': './testbed/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: 'planck',
      libraryTarget: 'umd',
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
  { // todo: remove this, added umd to others instead
    entry: {
      'planck': './src/index.ts',
      'planck-with-testbed': './testbed/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].commonjs.js',
      library: 'planck',
      libraryTarget: 'commonjs'
    },
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    plugins: [
      new webpack.BannerPlugin(licenseBanner),
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(false),
        ASSERT: JSON.stringify(false),
      }),
    ],
  }
];
