import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {resolve} from 'path'
import {promises as fs} from 'fs'
import {fork, serialize, allSettled} from 'effector/fork'
import {app, startServer, App} from './app'
import users from './users.json'

const port = process.env.PORT || 8080
const clientPath = resolve(__dirname, '..', 'client')
const clientTemplatePath = resolve(clientPath, 'index.html')

const server = express()

for (const key in users) {
  server.get(`/${key}`, async(req, res) => {
    try {
      const scope = fork(app)
      await allSettled(startServer, {
        scope,
        params: users[key],
      })
      const data = serialize(scope)
      const content = renderToString(<App root={scope} />)
      const result = await compile({content, data})
      res.send(result)
    } catch (err) {
      console.error(err)
      res.status(500).send('something going wrong')
    }
  })
}

server.get('/', async(req, res) => {
  const routes = Object.keys(users)
  const route = routes[(Math.random() * routes.length) | 0]
  res.redirect(`/${route}`)
})

async function compile({content, data}: {content: string; data: any}) {
  const html = `<div id="root">${content}</div>`
  const template = await fs.readFile(clientTemplatePath, 'utf8')
  const injectedState = `
    <script>
      window.__initialState__ = ${JSON.stringify(data)};
    </script>
  `
  const [head, tail] = template.split('<script></script>')
  return [head, html, injectedState, tail].join('')
}
server.use(express.static(clientPath))

server.listen(port, () => {
  console.log(`server started on port ${port}`)
})
