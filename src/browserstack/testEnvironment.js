/*eslint-disable max-len*/

module.exports = class WebdriverEnvironment extends require('jest-environment-node') {
  constructor(options) {
    super(options)
    // const {
    //   staticServer,
    //   ...testEnvironmentOptions
    // } = options.testEnvironmentOptions
    // this.options = testEnvironmentOptions
    // this.staticServerOptions = staticServer
    this.options = options.testEnvironmentOptions
    if (!this.options.baseUrl) {
      const ip = this.options.staticServer.ip
        ? this.options.staticServer.ip
        : getIp()
      const port = this.options.staticServer.port
      this.options.baseUrl = `http://${ip}:${port}`
    }
    console.log('DONE')
  }
  async setup() {
    await super.setup()
    const {remote} = require('webdriverio')
    const {Local} = require('browserstack-local')
    // const serveHandler = require('serve-handler')
    // const {createServer} = require('http')
    // const {port, root} = this.staticServerOptions
    // const server = createServer((req, res) => {
    //   serveHandler(req, res, {
    //     public: root,
    //   })
    // })
    const bsLocal = new Local()
    // this.global.staticServer = server
    this.global.bsLocal = bsLocal
    const bsArgs = {
      key: this.options.key,
      // force: 'true',
    }
    await Promise.all([
      // new Promise((rs, rj) => {
      //   server.on('error', rj)
      //   server.listen(port, rs)
      // }),
      new Promise((rs, rj) => {
        bsLocal.start(bsArgs, err => {
          if (err) return rj(err)
          return rs()
        })
      }),
    ])
    this.global.browser = await remote(this.options)
    this.global.$ = this.global.browser.$
    this.global.$$ = this.global.browser.$$
  }
  async teardown() {
    if (this.global.browser) {
      await this.global.browser.deleteSession()
    }
    if (this.global.bsLocal) {
      await new Promise((rs, rj) => {
        this.global.bsLocal.stop(err => {
          if (err) return rj(err)
          return rs()
        })
      })
    }
    // if (this.global.staticServer) {
    //   await new Promise(rs => {
    //     this.global.staticServer.close(rs)
    //   })
    // }
    await super.teardown()
  }
}

function getIp() {
  const ifaces = require('os').networkInterfaces()
  const addresses = []
  for (const ifname in ifaces) {
    let alias = 0
    for (const iface of ifaces[ifname]) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        continue
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address)
        addresses.push(iface.address)
      } else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address)
        addresses.push(iface.address)
      }
      ++alias
    }
  }
  if (addresses.length === 0) throw Error('not connected to internet')
  return addresses[0]
}
