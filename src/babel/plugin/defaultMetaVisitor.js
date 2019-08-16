'use strict'

const {normalize, resolve, sep, dirname} = require('path')
const {promisify} = require('util')
const fs = require('fs')
const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const stat = promisify(fs.stat)

function defaultMetaVisitor(file, data) {
  return outputJson(file, data, {spaces: 2})
}

module.exports = {defaultMetaVisitor}

const INVALID_PATH_CHARS = /[<>:"|?*]/
const O777 = parseInt('0777', 8)

const pathExists = path =>
  access(path)
    .then(() => true)
    .catch(() => false)

function getRootPath(p) {
  p = normalize(resolve(p)).split(sep)
  if (p.length > 0) return p[0]
  return null
}

function invalidWin32Path(p) {
  const rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

function mkdirs(p, mode = O777 & ~process.umask(), made = null) {
  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return Promise.reject(errInval)
  }
  p = resolve(p)
  return mkdir(p, mode)
    .then(() => made || p)
    .catch(er => {
      if (er.code === 'ENOENT') {
        if (dirname(p) === p) return Promise.reject(er)
        return mkdirs(dirname(p), mode).then(made => mkdirs(p, mode, made))
      }
      return stat(p)
        .then(stat => {
          if (!stat.isDirectory()) return Promise.reject(er)
          return made
        })
        .catch(() => Promise.reject(er))
    })
}
function stringify(obj, options) {
  let spaces
  let EOL = '\n'
  if (typeof options === 'object' && options !== null) {
    if (options.spaces) {
      spaces = options.spaces
    }
    if (options.EOL) {
      EOL = options.EOL
    }
  }

  const str = JSON.stringify(obj, options ? options.replacer : null, spaces)

  return str.replace(/\n/g, EOL) + EOL
}
function writeJson(file, obj, options) {
  const str = stringify(obj, options)
  return writeFile(file, str, options)
}
function outputJson(file, data, options) {
  const dir = dirname(file)
  return pathExists(dir).then(itDoes => {
    if (itDoes) return writeJson(file, data, options)
    return mkdirs(dir).then(() => writeJson(file, data, options))
  })
}
