//@flow

const {resolve, join} = require('path')
const {outputJsonSync, readJsonSync} = require('fs-extra')

const rootDir = resolve(__dirname, '..')
const npmDir = join(rootDir, 'npm/effector')

const packageSrcPath = join(rootDir, 'package.npm.json')
const packageRootPath = join(rootDir, 'package.json')
const packageNpmPath = join(npmDir, 'package.json')

const srcPackage = readJsonSync(packageSrcPath)
const rootPackage = readJsonSync(packageRootPath)

srcPackage.version = rootPackage.version

outputJsonSync(packageNpmPath, srcPackage, {spaces: 2})
