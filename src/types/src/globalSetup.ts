import {resolve, relative, parse, sep, join, extname, basename} from 'path'
//@ts-expect-error
import execa from 'execa'
import {
  readFile,
  copy,
  outputJSON,
  outputFile,
  ensureDir,
  readdir,
} from 'fs-extra'

const WRITE_RAW_REPORTS = false

async function syncDirs(
  from: string,
  to: string,
  filter: (fullName: string, fullTargetName: string) => boolean,
) {
  const fromRoot = from
  const toRoot = to
  async function writeFileOnChange(
    from: string,
    to: string,
    map: (code: string) => string,
  ) {
    try {
      const [source, target] = await Promise.all([
        readFile(from, 'utf8'),
        readFile(to, 'utf8').catch(err => 'ERROR'),
      ])
      const mappedSource = map(source)
      if (target === 'ERROR' || mappedSource !== target) {
        await outputFile(to, mappedSource, 'utf8')
      }
    } catch (err) {
      console.log(err)
      return
    }
  }
  const reqs: Promise<void>[] = []
  async function readDirRec(dir: string) {
    const relativeSuffix = relative(fromRoot, dir)
    const targetDir = resolve(toRoot, relativeSuffix)
    const dirents = await readdir(dir, {withFileTypes: true})
    for (const dirent of dirents) {
      const name = dirent.name
      const fullName = resolve(dir, name)
      const fullTargetName = resolve(targetDir, name)
      if (dirent.isFile()) {
        if (filter(fullName, fullTargetName)) {
          reqs.push(
            writeFileOnChange(fullName, fullTargetName, code =>
              code.replace(/\@ts\-expect\-error/gm, ''),
            ),
          )
        }
      } else {
        reqs.push(readDirRec(fullName))
      }
    }
  }
  reqs.push(readDirRec(from))
  await Promise.all(reqs)
}

export default async function () {
  const reportPath = resolve(
    __dirname,
    '..',
    '.reports',
    'type-report-full.json',
  )
  const testsDir = resolve(__dirname, '..', '__tests__')
  const tsTestDir = resolve(__dirname, '..', '__fixtures__', '.typescript')
  const tsTemplateDir = resolve(__dirname, '..', '__fixtures__', 'typescript')
  const [testFiles] = await Promise.all([
    getTestFiles(testsDir),
    ensureDir(tsTestDir),
  ])
  await Promise.all([
    copy(tsTemplateDir, tsTestDir, {
      overwrite: true,
      errorOnExist: false,
      recursive: false,
    }),
    syncDirs(testsDir, tsTestDir, (filePath, to) => {
      if (extname(filePath) === '') return true
      return !!testFiles.find(file => file.fullPath === filePath)
    }),
  ])
  const tsReport = await runTypeScript(testFiles)
  const fileNames = testFiles.map(({fullPath}) => relative(testsDir, fullPath))
  await outputJSON(reportPath, {tsReport, fileNames})
}

async function getTestFiles(root: string) {
  const files = await readTypeDir(root)
  return files.map(file => ({
    fullPath: file.fullPath,
    relativePath: relative(root, file.fullPath),
    ext: file.ext,
  }))
  async function readTypeDir(dir: string) {
    const dirents = await readdir(dir, {withFileTypes: true})
    const files: Array<{
      baseName: string
      relativeDir: string
      fullPath: string
      ext: string
    }> = []
    const reqs = []
    for (const dirent of dirents) {
      const name = dirent.name
      if (dirent.isFile()) {
        const fullPath = resolve(dir, name)
        const ext = extname(name)
        if (ext !== '.ts' && ext !== '.tsx') continue
        files.push({
          baseName: basename(name, ext),
          relativeDir: relative(root, dir),
          fullPath,
          ext,
        })
      } else {
        reqs.push(readTypeDir(resolve(dir, name)))
      }
    }
    const subdirs = await Promise.all(reqs)
    for (const subdir of subdirs) {
      files.push(...subdir)
    }
    return files
  }
}
async function runTypeScript(
  testFiles: Array<{
    fullPath: string
    relativePath: string
    ext: string
  }>,
) {
  const testsDir = resolve(__dirname, '..', '__tests__')
  const reportPath = resolve(__dirname, '..', '.reports', 'type-report-ts-raw')
  try {
    const result = await execa('npx', [
      'tsc',
      '-p',
      join('src', 'types', '__fixtures__', '.typescript'),
    ])
    console.warn('no errors found by typescript typecheck', result)
    return ''
  } catch (error) {
    const err = error as {message: string}
    const cleanedMessage = err.message.replace(/error TS\d+: /gm, '')
    if (WRITE_RAW_REPORTS) {
      await outputFile(reportPath, cleanedMessage)
    }
    return normalizeTSReport(cleanedMessage)
  }
  function normalizeTSReport(report: string) {
    let current = {
      pos: {line: -1, col: -1},
      lines: [] as string[],
      file: '',
    }
    const tsProcessed = []
    for (const line of report.split(/\n/).slice(2)) {
      if (line.startsWith(' ')) {
        current.lines.push(line)
      } else {
        const match = line.match(
          /src\/types\/__fixtures__\/\.typescript\/(.+)\((\d+),(\d+)\): (.+)/,
        )
        if (match) {
          const file = match[1]
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
    const tsReport = tsProcessed.slice(1).map(({pos, lines, file}) => ({
      pos,
      message: lines.join(`\n`),
      file: recontructFileName(file),
    }))
    return tsReport
  }
  function recontructFileName(file: string) {
    file = removeExt(resolve(testsDir, file))
    const {ext} = testFiles.find(({fullPath}) => removeExt(fullPath) === file)!
    return relative(testsDir, `${file}${ext}`)
  }
  function removeExt(file: string) {
    return file
      .replace('.tsx', '')
      .replace('.ts', '')
      .replace('.jsx', '')
      .replace('.js', '')
  }
}
