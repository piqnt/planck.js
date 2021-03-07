import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import license from 'rollup-plugin-license';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import licenseBanner from './license';


export default [
  {
    src: 'lib/index.js',
    dest: 'dist/planck.js',
    minimize: false,
  },
  {
    src: 'lib/index.js',
    dest: 'dist/planck.min.js',
    minimize: true,
  },
  {
    src: 'testbed/index.js',
    dest: 'dist/planck-with-testbed.js',
    minimize: false,
  },
  {
    src: 'testbed/index.js',
    dest: 'dist/planck-with-testbed.min.js',
    minimize: true,
  }
].map(options => {
  const config = {
    input: options.src,
    output: {
      name: 'planck',
      file: options.dest,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'DEBUG': JSON.stringify(false),
          'ASSERT': JSON.stringify(false),
        },
      }),
      nodeResolve(),
      commonjs({
        include: ['node_modules/stage-js/**']
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      license({
        banner: licenseBanner,
      }),
      {...(options.minimize ? terser() : null)},
      filesize(),
    ]
  };
  return config;
})
