import {mkdtempSync, writeFileSync, readFileSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join, resolve} from 'node:path'
import {spawnSync, execFileSync} from 'node:child_process'

// Each invocation checks identical inputs in fresh compiler processes, sequentially.
const [revision = 'working', scaleArg = '100', runsArg = '3'] = process.argv.slice(2)
const scale = Number(scaleArg)
const runs = Number(runsArg)
const root = process.cwd()
const compiler = process.env.TSC || resolve('node_modules/typescript/bin/tsc')
const directory = mkdtempSync(join(tmpdir(), 'effector-sample-perf-'))
const declaration = revision === 'working'
  ? readFileSync('packages/effector/index.d.ts', 'utf8')
  : execFileSync('git', ['show', `${revision}:packages/effector/index.d.ts`], {encoding: 'utf8'})
const mode = process.env.SAMPLE_MODE || 'mixed'
const cases = Array.from({length: scale}, (_, i) => {
  let callIndex = 0
  return `
namespace Case${i} {
  type Item = {id: ${i}; name: string; nested: {value: number}; tags: readonly string[]}
  const item = createStore<Item>({id: ${i}, name: '', nested: {value: 0}, tags: []})
  const maybe = createStore<Item | null>(null)
  const tick = createEvent<{id: ${i}; time: number}>()
  const other = createEvent<{id: ${i}; reason: string}>()
  const accept = createEvent<Item>()
  const broad = createEvent<{id: number}>()
  const enabled = createStore(true)
  sample({clock: tick, source: item, target: [accept, broad]})
  sample({clock: [tick, other], source: {item, enabled}, fn: ({item}, clk) => ({...item, clock: clk}), target: broad})
  sample({clock: tick, source: maybe, filter: (value): value is Item => value !== null, fn: (value: Item) => value.name})
  sample({source: maybe, filter: Boolean, target: accept})
  sample({clock: tick, source: item, filter: enabled, fn: value => value.nested.value})
  sample({source: [item, enabled] as const, clock: [tick, other] as const})
  sample({clock: [tick, other], target: broad})
  sample({clock: tick, fn: value => value.id, target: createEffect((value: number) => value.toString())})
  sample({source: item})
  sample({clock: tick, filter: Boolean})
  sample(item, tick, (value, clk) => ({value, clk}))
  function generic<T extends Item>(source: Store<T>, clock: Event<T>) {
    return sample({source, clock, filter: value => value.name.length > 0, fn: value => value})
  }
}
`.split('\n').filter(line => {
  if (mode === 'mixed' || !line.trim().startsWith('sample(')) return true
  const calls = ['source-target', 'record-fn', 'predicate', 'boolean', 'store-filter', 'tuple', 'clock-target', 'inline-effect', 'source', 'clock', 'positional']
  return calls[callIndex++] === mode
}).join('\n')
}).join('\n')
try {
  writeFileSync(join(directory, 'effector.d.ts'), declaration)
  writeFileSync(join(directory, 'workload.ts'), `import {createEvent, createStore, createEffect, sample, Store, Event} from './effector'\n${cases}`)
  writeFileSync(join(directory, 'tsconfig.json'), JSON.stringify({compilerOptions: {
    strict: true, noEmit: true, target: 'ES2020', module: 'commonjs', types: [],
    skipLibCheck: false, incremental: false,
  }, files: ['workload.ts']}))
  console.log(JSON.stringify({revision, mode, scale, calls: scale * (mode === 'mixed' ? 12 : mode === 'generic' ? 1 : 2), runs, node: process.version,
    compiler: execFileSync(process.execPath, [compiler, '--version'], {encoding: 'utf8'}).trim()}))
  for (let run = 1; run <= runs; run++) {
    const args = [process.execPath, compiler, '-p', join(directory, 'tsconfig.json'), '--extendedDiagnostics']
    if (process.env.TRACE) args.push('--generateTrace', resolve(process.env.TRACE))
    const result = spawnSync('/usr/bin/time', process.platform === 'darwin' ? ['-l', ...args] : ['-v', ...args], {cwd: root, encoding: 'utf8'})
    console.log(`Run ${run}\n${result.stdout}\n${result.stderr}`)
    if (result.status !== 0) throw new Error(`Compiler exited with ${result.status}`)
  }
} finally {
  rmSync(directory, {recursive: true, force: true})
}
