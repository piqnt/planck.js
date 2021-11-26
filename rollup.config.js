import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import license from 'rollup-plugin-license';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-ts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import addConstructorsWithoutNewKeyword from './transformers/addConstructorsWithoutNewKeyword';

import licenseBanner from './license';


function buildTransformerPipeline(...transformers) {
  transformers = transformers.map(t => t({}))

  return {
    before: transformers
      .map(t => t.before)
      .filter(Boolean),
    after: transformers
      .map(t => t.after)
      .filter(Boolean),
    afterDeclarations: transformers
      .map(t => t.afterDeclarations)
      .filter(Boolean),
  }
}

export default [
  {
    src: 'src/index.ts',
    dest: 'dist/planck.js',
    minimize: false,
    declaration: true,
    includeFactoryConstructors: true,
  },
  {
    src: 'src/index.ts',
    dest: 'dist/planck.min.js',
    minimize: true,
    declaration: false,
    includeFactoryConstructors: true,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.js',
    minimize: false,
    declaration: true,
    includeFactoryConstructors: true,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.min.js',
    minimize: true,
    declaration: false,
    includeFactoryConstructors: true,
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
      typescript({
        tsconfig: resolvedConfig => ({
          ...resolvedConfig,
          declaration: options.declaration
        }),
        transformers: buildTransformerPipeline(
          addConstructorsWithoutNewKeyword({ enabled: options.includeFactoryConstructors })
        ),
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
