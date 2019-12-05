import fetch from 'cross-fetch'
import {resolve, extname, basename} from 'path'
import {promises as fs} from 'fs'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {fork, serialize} from 'effector-react/ssr'
import fetch from 'cross-fetch'
import {startServer, App} from '../app'
import {app} from '../domain'
import {APIGatewayProxyEvent} from 'aws-sdk'
import domainConfig from '../../domain.json'

async function getAllUsers(): Promise<string[]> {
  const req = await fetch(`https://${domainConfig.domainName}/api`, {
    method: 'POST',
  })
  return req.json()
}

export default async (event: APIGatewayProxyEvent) => {
  console.log(event)
  const user = Object(event.pathParameters).user || ''
  const users = await getAllUsers()
  if (user === '') return randomRedirect(users)
  console.log('user', user)
  if (!users.includes(user)) return {statusCode: 404}
  return dynamicContent(user)
}

async function dynamicContent(user) {
  try {
    const scope = await fork(app, {
      start: startServer,
      ctx: user,
    })
    const data = serialize(scope)
    const content = renderToString(React.createElement(App, {root: scope}))
    const result = await compile({content, data})
    return {
      statusCode: 200,
      body: result,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
    }
  }
}

async function compile({content, data}: {content: string; data: any}) {
  const htmlContent = `<div id="root">${content}</div>`
  const htmlFilePath = resolve(__dirname, '..', 'client', 'index.html')
  const template = await fs.readFile(htmlFilePath, 'utf8')
  const injectedState = `
    <script>
      window.__initialState__ = ${JSON.stringify(data)};
    </script>
  `
  const [head, tail] = template.split('<script></script>')
  return [head, htmlContent, injectedState, tail].join('')
}

async function randomRedirect(users) {
  const route = users[(Math.random() * users.length) | 0]
  return {
    statusCode: 302,
    headers: {
      Location: `/user/${route}`,
    },
  }
}
