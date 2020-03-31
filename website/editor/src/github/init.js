import {$csrf, $gitDropDownMenu, $githubToken, $githubUser} from './state'
import {login, setAuth, setGitDropDownMenu} from './index'
import {GITHUB_API_URL, GITHUB_GATEKEEPER_URL} from './config'
import {userInfo} from './gql'
import {createEffect, attach, guard, restore} from 'effector'


const auth = async (cb) => {
  const params = new URLSearchParams(location.search)
  if (params.has('code')) {
    const code = params.get('code')
    const url = new URL(GITHUB_GATEKEEPER_URL)
    url.searchParams.set('code', code)
    try {
      const res = await fetch(url)
      if (res.ok) {
        const {token} = await res.json()
        setAuth(token)
        location.replace(location.pathname)
      }
    } catch (e) {
      setAuth(null)
    }
  } else {
    cb()
  }
}

class AuthError extends Error {
  constructor() {
    super('Authotization error!')
  }
}

class BadTokenError extends AuthError {
  constructor() {
    super('Bad token!')
  }
}

class UnauthorizedError extends AuthError {
  constructor() {
    super('Unauthorized!')
  }
}

const gqlQuery = createEffect({
  async handler({query, variables = null, token}) {
    if (!token) throw new BadTokenError()
    const res = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!res.ok) {
      throw new UnauthorizedError()
    }

    return res.json()
  },
})

const authorizedRequest = attach({
  effect: gqlQuery,
  source: $githubToken,
  mapParams: ({query, variables}, token) => ({
    query,
    variables,
    token,
  }),
})

const createGqlQuery = ({query, variables}) =>
  attach({
    effect: authorizedRequest,
    mapParams: () => ({query, variables}),
  })

const getUserInfo = createGqlQuery({query: userInfo})

$githubUser
  .on(getUserInfo.doneData, (state, {data}) => data.viewer)
  .on(getUserInfo.fail, () => ({
    email: '',
    avatarUrl: '',
    name: '',
  }))

$githubToken
  .on(login, () => '')
  .on(setAuth, (state, token) => token)
  .on(getUserInfo.fail, () => null)


auth(() => {
  getUserInfo()
})
