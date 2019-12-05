import {resolve, extname, basename} from 'path'
import {promises as fs} from 'fs'
import {APIGatewayProxyEvent} from 'aws-sdk'

export default async(event: APIGatewayProxyEvent) => {
  console.log(event)
  const file = Object(event.pathParameters).file || ''
  if (file === '') return {statusCode: 404}
  return staticContent(file)
}

async function staticContent(file) {
  const ext = extname(file)
  const filePath = resolve(__dirname, '..', 'client', basename(file))
  const contentType = fileTypes.hasOwnProperty(ext)
    ? fileTypes[ext]
    : 'application/octet-stream'
  try {
    let body
    if (binaryTypes.has(ext) || contentType === binaryType) {
      body = (await fs.readFile(filePath)).toString('base64')
    } else {
      body = await fs.readFile(filePath, 'utf8')
    }
    return {
      statusCode: 200,
      body,
      headers: {
        'Content-Type': contentType,
      },
    }
  } catch (error) {
    return {
      statusCode: 404,
    }
  }
}

const binaryTypes = new Set(['.ico', '.jpg', '.png'])

const binaryType = 'application/octet-stream'

const fileTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}
