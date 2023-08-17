const { terser } =  require('rollup-plugin-terser');
const license =  require('rollup-plugin-license');
const replace =  require('@rollup/plugin-replace');
const filesize =  require('rollup-plugin-filesize');
const typescript =  require('rollup-plugin-ts');
const { nodeResolve } =  require('@rollup/plugin-node-resolve');

const declarationTransformer =  require('./build-utils/declarationTransformer');
const licenseBanner =  require('./build-utils/license');


module.exports = [
  {
    format: 'es',
    src: 'src/main.ts',
    dest: 'dist/planck.mjs',
    minimize: false,
    sourcemap: false,
    declaration: true,
  },
  {
    format: 'umd',
    src: 'src/main.ts',
    dest: 'dist/planck.js',
    minimize: false,
    sourcemap: false,
    declaration: false,
  },
  {
    format: 'umd',
    src: 'src/main.ts',
    dest: 'dist/planck.min.js',
    minimize: true,
    sourcemap: true,
    declaration: false,
  },
  {
    format: 'es',
    src: 'testbed/main.ts',
    dest: 'dist/planck-with-testbed.mjs',
    minimize: false,
    sourcemap: false,
    declaration: true,
  },
  {
    format: 'umd',
    src: 'testbed/main.ts',
    dest: 'dist/planck-with-testbed.js',
    minimize: false,
    sourcemap: false,
    declaration: false,
  },
  {
    format: 'umd',
    src: 'testbed/main.ts',
    dest: 'dist/planck-with-testbed.min.js',
    minimize: true,
    sourcemap: true,
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
          'ASSERT': JSON.stringify(false),
          '_ASSERT': JSON.stringify(false),
          // we are still compiling to ES5, so we keep constructor factories until v2
          'CONSTRUCTOR_FACTORY': JSON.stringify(true),
          '_CONSTRUCTOR_FACTORY': JSON.stringify(true),
          'PLANCK_VERSION': JSON.stringify(process.env.npm_package_version),
        },
      }),
      nodeResolve(),
      typescript({
        sourceMap: false,
        tsconfig: resolvedConfig => ({
          ...resolvedConfig,
          declaration: options.declaration,
          declarationMap: options.declaration
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
      license({
        banner: licenseBanner,
      }),
      {...(options.minimize ? terser() : null)},
      filesize(),
    ]
  };
  return config;
})
