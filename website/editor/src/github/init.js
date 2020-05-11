import {attach, createEffect, Store} from 'effector'
import type {TGitHubUserInfo, TToken} from './state'
import {$githubToken, $githubUser} from './state'
import {login, logout, setToken} from './index'
import {GITHUB_API_URL, GITHUB_GATEKEEPER_URL} from './config'
import {userInfo} from './gql'

type GQLParams = {
  query: string,
  variables?: {},
  token?: TToken,
}

type TUserInfoResult = {
  data: {
    viewer: TGitHubUserInfo,
  },
}

export const auth = createEffect({
  async handler() {
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    if (code) {
      const url = new URL(GITHUB_GATEKEEPER_URL)
      url.searchParams.set('code', code)
      try {
        const res = await fetch(url)
        if (res.ok) {
          const {token} = await res.json()
          setToken(token)
          history.replaceState({}, '', location.origin)
        }
      } catch (e) {
        return setToken(null)
      }
    }
    getUserInfo()
  },
})

class AuthError extends Error {
  constructor(message: string) {
    super(message || 'Authorization error!')
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
  async handler({query, variables, token}) {
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

    return await res.json()
  },
})

const authorizedRequest = attach({
  effect: gqlQuery,
  source: $githubToken,
  mapParams: ({query, variables}, token: TToken) => ({
    query,
    variables,
    token,
  }),
})

const createGqlQuery = (query: string) =>
  attach({
    effect: authorizedRequest,
    mapParams: (variables?: {}) => ({query, variables}),
  })

export const getUserInfo = createGqlQuery(userInfo)

$githubUser
  .on(getUserInfo.doneData, (state, {data}) => data.viewer)
  .reset(getUserInfo.fail, logout, login)

$githubToken
  .on(setToken, (state, token) => token)
  .reset(getUserInfo.fail, logout, login)

if (location.pathname === '/auth') {
  auth()
}
