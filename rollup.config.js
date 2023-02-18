import babel from '@rollup/plugin-babel';
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
    dest: 'dist/planck.mjs',
    format: 'esm',
    minimize: false,
    declaration: true,
  },
  {
    src: 'src/index.ts',
    dest: 'dist/planck.js',
    format: 'umd',
    minimize: false,
    declaration: false,
  },
  {
    src: 'src/index.ts',
    dest: 'dist/planck.min.js',
    format: 'umd',
    minimize: true,
    declaration: false,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.mjs',
    format: 'esm',
    minimize: false,
    declaration: true,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.js',
    format: 'umd',
    minimize: false,
    declaration: false,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.min.js',
    format: 'umd',
    minimize: true,
    declaration: false,
  }
].map(options => {
  const config = {
    input: options.src,
    output: {
      name: 'planck',
      file: options.dest,
      format: options.format,
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
              classes: [
                'Vec2',
                'Vec3',
                'Rot',
                'Transform',
                'AABB',
                'World',
                'BoxShape',
                'CircleShape',
                'ChainShape',
                'EdgeShape',
                'PolygonShape',
                'DistanceJoint',
                'FrictionJoint',
                'GearJoint',
                'MotorJoint',
                'MouseJoint',
                'PrismaticJoint',
                'PulleyJoint',
                'RevoluteJoint',
                'RopeJoint',
                'WeldJoint',
                'WheelJoint',
              ]
            })
          ]
        },
      }),
      babel({
        babelHelpers: 'runtime',
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
