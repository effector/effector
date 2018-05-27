//@flow

const {outputFile, readFile, readFileSync, outputFileSync} = require('fs-extra')
const {dump, load} = require('js-yaml')

function saveYamlSync(
 path /*: string*/,
 data /*: Object*/,
 {sortKeys = true, noCompatMode = true} /*: * */ = {
  sortKeys: true,
  noCompatMode: true,
 },
) {
 const dumped = dump(data, {
  sortKeys,
  noCompatMode,
 })
 return outputFileSync(path, dumped)
}

function loadYamlSync(path /*: string*/) {
 const data = readFileSync(path, {encoding: 'utf8'})
 return load(data)
}

const sync = {
 read: loadYamlSync,
 write: saveYamlSync,
}

const async = {
 read: loadYaml,
 write: saveYaml,
}

async function saveYaml(
 path /*: string*/,
 data /*: Object*/,
 {sortKeys = true, noCompatMode = true} /*: * */ = {
  sortKeys: true,
  noCompatMode: true,
 },
) {
 const dumped = dump(data, {
  sortKeys,
  noCompatMode,
 })
 return await outputFile(path, dumped)
}

async function loadYaml(path /*: string*/) {
 const data = await readFile(path, 'utf8')
 return load(data)
}

module.exports = {
 saveYaml,
 loadYaml,
 saveYamlSync,
 loadYamlSync,
 sync,
 async,
}
