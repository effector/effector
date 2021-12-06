import {resolve} from 'path'
import {promises as fs} from 'fs'

const REMOVE_REPORT = true

export default async () => {
  const reportDir = resolve(__dirname, '..', '.reports')
  if (REMOVE_REPORT) {
    await Promise.all([
      fs.rm(resolve(reportDir, 'type-report-full.json'), {force: true}),
      fs.rm(resolve(reportDir, 'type-report-ts-raw'), {force: true}),
    ])
  }
}
