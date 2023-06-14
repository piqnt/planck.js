const terser =  require('@rollup/plugin-terser');
const license =  require('rollup-plugin-license');
const replace =  require('@rollup/plugin-replace');
const filesize =  require('rollup-plugin-filesize');
const typescript =  require('rollup-plugin-ts');
const { nodeResolve } =  require('@rollup/plugin-node-resolve');

const declarationTransformer =  require('./build-utils/declarationTransformer');
const licenseBanner =  require('./build-utils/license');


module.exports = [
  {
    src: 'src/main.ts',
    dest: 'dist/planck.js',
    minimize: false,
    declaration: true,
  },
  {
    src: 'src/main.ts',
    dest: 'dist/planck.min.js',
    minimize: true,
    declaration: false,
  },
  {
    src: 'testbed/main.ts',
    dest: 'dist/planck-with-testbed.js',
    minimize: false,
    declaration: true,
  },
  {
    src: 'testbed/main.ts',
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
      typescript({
        sourceMap: false,
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
      license({
        banner: licenseBanner,
      }),
      {...(options.minimize ? terser() : null)},
      filesize(),
    ]
  };
  return config;
})
