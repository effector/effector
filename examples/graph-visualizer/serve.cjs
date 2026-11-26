const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/dist/demo.js', ['dist/demo.js', 'text/javascript; charset=utf-8']],
  ['/dist/demo.js.map', ['dist/demo.js.map', 'application/json']],
])
http
  .createServer((request, response) => {
    if (request.url === '/favicon.ico') {
      response.writeHead(204)
      response.end()
      return
    }
    const file = files.get(new URL(request.url, 'http://127.0.0.1').pathname)
    if (!file) {
      response.writeHead(404)
      response.end()
      return
    }
    fs.readFile(path.join(__dirname, file[0]), (error, body) => {
      response.writeHead(error ? 404 : 200, {'Content-Type': file[1]})
      response.end(error ? '' : body)
    })
  })
  .listen(8875, '127.0.0.1', () =>
    console.log('Graph example: http://127.0.0.1:8875'),
  )
