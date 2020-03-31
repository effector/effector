import {$csrf, $gitDropDownMenu, $githubToken, $githubUser} from './state'
import {login, setAuth, setGitDropDownMenu} from './index'
import {GITHUB_API_URL, GITHUB_GATEKEEPER_URL} from './config'
import {userInfo} from './gql'
import {createEffect, attach, guard, restore} from 'effector'


const auth = async (cb) => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  if (code) {
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

const gqlQuery = createEffect({
  async handler({query, variables = null, token}) {
    if (!token) throw new Error('bad token')
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
  .reset(getUserInfo.fail)

$githubToken
  .on(login, () => '')
  .on(setAuth, (state, token) => token)
  .reset(getUserInfo.fail)

const profileMenuElement = document.getElementById('profile-menu')
setGitDropDownMenu.watch(value => {
  profileMenuElement.style.display = value ? 'block' : 'none'
})

auth(() => {
  getUserInfo()
})
