import React from 'react'
import {renderToString} from 'react-dom/server'
import {resolve} from 'path'
import {promises as fs} from 'fs'
import {fork, serialize} from 'effector-react/ssr'
import {app, startServer, App} from './app'
import users from './users.json'

const clientPath = resolve(__dirname, '..', 'client')
const clientTemplatePath = resolve(clientPath, 'index.html')

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

export default async(req, res) => {
  const url = req.url.replace('/ssr', '').replace(/^\//, '')
  if (url === '') {
    const routes = Object.keys(users)
    const route = routes[(Math.random() * routes.length) | 0]
    res.setHeader('Location', `/${route}`)
    res.status(302).send('')
    return
  }
  if (!users.hasOwnProperty(url)) {
    res.status(404).send('not found')
    return
  }
  try {
    const scope = await fork(app, {
      start: startServer,
      ctx: users[url],
    })
    const data = serialize(scope)
    const content = renderToString(React.createElement(App, {root: scope}))
    const result = await compile({content, data})
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('something going wrong')
  }
}
