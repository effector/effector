const fs = require('fs-extra')

const {getReleaseStatePaths} = require('../utils')

const {updateJsonPath, changelogsPath} = getReleaseStatePaths()

fs.outputJSONSync(updateJsonPath, {})
fs.rmSync(changelogsPath, {force: true, recursive: true})
fs.ensureDirSync(changelogsPath)
