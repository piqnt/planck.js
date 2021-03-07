import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import license from 'rollup-plugin-license';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';

import licenseBanner from './license';


export default [
  {
    input: 'lib/index.js',
    output: {
      name: 'planck',
      file: 'dist/planck.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'DEBUG': JSON.stringify(false),
          'ASSERT': JSON.stringify(false),
        },
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      license({
        banner: licenseBanner,
      }),
      filesize()
    ]
  },
  {
    input: 'lib/index.js',
    output: {
      name: 'planck',
      file: 'dist/planck.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'DEBUG': JSON.stringify(false),
          'ASSERT': JSON.stringify(false),
        },
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      license({
        banner: licenseBanner,
      }),
      terser(),
      filesize()
    ]
  }
];
