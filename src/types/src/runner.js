module.exports = class Runner extends require('jest-runner') {
  get isSerial() {
    return true
  }
}
