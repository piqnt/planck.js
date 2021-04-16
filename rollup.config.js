import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import license from 'rollup-plugin-license';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-ts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import declarationTransformer from './declarationTransformer';

import licenseBanner from './license';


export default [
  {
    src: 'src/index.ts',
    dest: 'dist/planck.js',
    minimize: false,
    declaration: true,
  },
  {
    src: 'src/index.ts',
    dest: 'dist/planck.min.js',
    minimize: true,
    declaration: false,
  },
  {
    src: 'testbed/index.js',
    dest: 'dist/planck-with-testbed.js',
    minimize: false,
    declaration: false,
  },
  {
    src: 'testbed/index.js',
    dest: 'dist/planck-with-testbed.min.js',
    minimize: true,
    declaration: false,
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
        transformers: {
          afterDeclarations: [
            declarationTransformer({
              exclude: [
                'Mat22',
                'Mat33',
                'Pool',
                'TreeNode',
                'DynamicTree',
                'BroadPhase',
                'FixtureProxy',
                'Fixture',
                'JointEdge',
                'Joint',
                'Manifold',
                'ManifoldPoint',
                'ContactID',
                'ContactFeature',
                'WorldManifold',
                'ContactEdge',
                'Contact',
                'TimeStep',
                'ContactImpulse',
                'MassData',
                'Body',
                'DistanceInput',
                'DistanceOutput',
                'SimplexCache',
                'DistanceProxy',
                'Shape',
                'Sweep',
                'TOIInput',
                'TOIOutput'
              ]
            })
          ]
        },
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
