const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// var merge = require('lodash.merge');
const pkg = require('./package.json');

const license = fs.readFileSync('./LICENSE.txt', 'utf8');

const licenseBanner = `
Planck.js v${pkg.version}
@license The MIT license
@copyright Copyright (c) 2021 Erin Catto, Ali Shakiba

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
      'planck': './lib/index.js',
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
      'planck': './lib/index.js',
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
