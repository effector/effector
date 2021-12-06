import {resolve, relative, extname} from 'path'
import {promises as fs} from 'fs'
import {compile} from './tsRunner'

const WRITE_RAW_REPORTS = false

const TESTS_DIR = resolve(__dirname, '..', '__tests__')
const FULL_REPORT_PATH = resolve(
  __dirname,
  '..',
  '.reports',
  'type-report-full.json',
)
const RAW_REPORT_PATH = resolve(
  __dirname,
  '..',
  '.reports',
  'type-report-ts-raw',
)
export default async function () {
  const testFiles = await readTypeDir(TESTS_DIR, TESTS_DIR)
  const tsReport = await runTypeScript(testFiles)
  const fileNames = testFiles.map(fullPath => relative(TESTS_DIR, fullPath))
  await fs.writeFile(
    FULL_REPORT_PATH,
    JSON.stringify({tsReport, fileNames}),
    'utf8',
  )
}
async function readTypeDir(dir: string, base: string) {
  const dirents = await fs.readdir(dir, {withFileTypes: true})
  const files: string[] = []
  const reqs = []
  for (const dirent of dirents) {
    const name = dirent.name
    if (dirent.isFile()) {
      const fullPath = resolve(dir, name)
      const ext = extname(name)
      if (ext !== '.ts' && ext !== '.tsx') continue
      files.push(fullPath)
    } else {
      reqs.push(readTypeDir(resolve(dir, name), base))
    }
  }
  const subdirs = await Promise.all(reqs)
  for (const subdir of subdirs) {
    files.push(...subdir)
  }
  return files
}
async function runTypeScript(testFiles: string[]) {
  try {
    const report = await compile({
      fullTestFileNames: testFiles,
      testsRoot: TESTS_DIR,
      paths: {
        'effector/fork': '../../../packages/effector/fork.d.ts',
        effector: '../../../packages/effector/index.d.ts',
        'effector-react/scope': '../../../packages/effector-react/scope.d.ts',
        'effector-react': '../../../packages/effector-react/index.d.ts',
        'effector-vue': '../../../packages/effector-vue/index.d.ts',
        'forest/server': '../../../packages/forest/server.d.ts',
        forest: '../../../packages/forest/index.d.ts',
        react: '../../../node_modules/@types/react/index.d.ts',
        vue: '../../../node_modules/vue/types/index.d.ts',
      },
      typings: ['@types/jest/index.d.ts'],
      tsConfig: {
        strictNullChecks: true,
        module: 'CommonJS',
        target: 'esnext',
        jsx: 'react',
        allowJs: true,
        strict: true,
        allowSyntheticDefaultImports: true,
        moduleResolution: 'node',
        resolveJsonModule: false,
        lib: ['esnext', 'es2019', 'dom'],
        noEmit: true,
        // disableReferencedProjectLoad: true,
        // disableSolutionSearching: true,
        // disableSourceOfProjectReferenceRedirect: true,
        // composite: true,
        // incremental: true,
      },
    })
    if (report === '') {
      console.warn('no errors found by typescript typecheck')
      return []
    }
    const cleanedMessage = report.replace(/error TS\d+: /gm, '')
    if (WRITE_RAW_REPORTS) {
      await fs.writeFile(RAW_REPORT_PATH, cleanedMessage, 'utf8')
    }
    return normalizeTSReport(cleanedMessage)
  } catch (error) {
    console.error('compilation failed')
    console.error(error)
    return []
  }
  function normalizeTSReport(report: string) {
    let current = {
      pos: {line: -1, col: -1},
      lines: [] as string[],
      file: '',
    }
    const tsProcessed = []
    for (const line of report.split(/\n/)) {
      if (line.startsWith(' ')) {
        current.lines.push(line)
      } else {
        const match = line.match(/\.\.\/__tests__\/(.+)\((\d+),(\d+)\): (.+)/)
        if (match) {
          const file = match[1].trim()
          const x = +match[3]
          const y = +match[2]
          const message = match[4]
          tsProcessed.push(current)
          current = {
            pos: {line: y, col: x},
            lines: [message],
            file,
          }
        } else {
          current.lines.push(line)
        }
      }
    }
    tsProcessed.push(current)
    return tsProcessed.map(({pos, lines, file}) => ({
      pos,
      message: lines.join(`\n`),
      file,
    }))
  }
}
