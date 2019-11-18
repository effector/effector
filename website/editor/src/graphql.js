//@flow

import {createEffect, type Effect} from 'effector'

const ENDPOINT = {
  DIST: 'y6776i4nfja2lnx3gbkbmlgr3i',
  REGION: 'us-east-1',
  PUBLIC_API_KEY: 'da2-srl2uzygsnhpdd2bban5gscnza',
}

const request = data => {
  const url = `https://${ENDPOINT.DIST}.appsync-api.${ENDPOINT.REGION}.amazonaws.com/graphql`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ENDPOINT.PUBLIC_API_KEY,
    },
    body: JSON.stringify(data),
  })
    .then(req => req.json())
    .then(result => {
      if ('errors' in result) {
        console.error(result.errors)
        throw Error('request exception')
      }
      return result.data
    })
}
type ShareCode = Effect<string, {|slug: string|}>
export const shareCode: ShareCode = createEffect('share code', {
  async handler(code) {
    const {createCodePage} = await request({
      query: `
        mutation ReplMutation($codePage: CodePageInput!) {
          createCodePage(codePage: $codePage) {
            slug
          }
        }
      `,
      variables: {
        codePage: {code},
      },
      operationName: 'ReplMutation',
    })
    return createCodePage
  },
})
