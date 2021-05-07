import { configFactory } from '../rollup.config';

export default [
  {
    src: './index.ts',
    dest: 'dist/planck-testbed.js',
    minimize: false,
    declaration: true,
  },
  {
    src: './index.ts',
    dest: 'dist/planck-testbed.min.js',
    minimize: true,
    declaration: false,
  }
].map(configFactory)
