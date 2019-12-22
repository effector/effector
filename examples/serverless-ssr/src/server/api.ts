import {APIGatewayProxyEvent} from 'aws-sdk'

const users = {
  alice: {
    name: 'alice',
    friends: ['bob', 'carol'],
  },
  bob: {
    name: 'bob',
    friends: ['alice'],
  },
  carol: {
    name: 'carol',
    friends: ['alice'],
  },
  charlie: {
    name: 'charlie',
    friends: [],
  },
}

export default async(event: APIGatewayProxyEvent) => {
  console.log(event)
  const user = Object(event.pathParameters).user || ''
  if (user === '') return json(Object.keys(users))
  if (users.hasOwnProperty(user)) return json(users[user])
  return {statusCode: 404}
}

function json(data) {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}
