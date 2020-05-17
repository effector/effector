import {attach, createEffect, Effect} from 'effector'
import md5 from 'js-md5'
import {$githubUser} from './github/state'
import {$shareDescription} from './share/state'
import {addShare} from './share'
import {sourceCode} from './editor/state'
import {auth} from './github/init'

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

const WARNING_MUST_SIGNIN = 'Share not saved. You must be signed in!"'

// type ShareCode = Effect<string, {slug: string}>
export const shareCode = attach({
  effect: createEffect('share code', {
    async handler({author, description, code}) {
      description = description || undefined
      author = author || undefined
      const {createCodePage} = await request({
        query: `
        mutation ReplMutation($codePage: CodePageInput!) {
          createCodePage(codePage: $codePage) {
            slug
            description
            author
            created
            code
          }
        }
      `,
        variables: {
          codePage: {author, description, code},
        },
        operationName: 'ReplMutation',
      })
      addShare({
        ...createCodePage,
        md5: md5(createCodePage.code),
      })
      return createCodePage
    },
  }),
  source: {
    user: $githubUser,
    description: $shareDescription,
    sourceCode,
  },
  mapParams: (params, {user, description, sourceCode}) => ({
    author: user ? user.databaseId : null,
    description,
    code: sourceCode,
  }),
})
