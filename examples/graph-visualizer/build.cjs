const esbuild = require('esbuild')
const path = require('node:path')
esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'demo.ts')],
  outfile: path.join(__dirname, 'dist/demo.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  sourcemap: true,
  alias: {
    'effector/inspect': path.resolve(
      __dirname,
      '../../src/effector/inspect.ts',
    ),
    effector: path.resolve(__dirname, '../../src/effector/index.ts'),
  },
  define: {'process.env.NODE_ENV': '"development"'},
})
