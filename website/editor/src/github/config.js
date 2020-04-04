export const GITHUB_EFFECTOR_CLIENT_ID = process.env.NODE_ENV === 'development'
  ? 'd08be6446720578f0880'
  : 'baab6fec46fcfee8b81f'

export const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
export const GITHUB_API_URL = 'https://api.github.com/graphql'
export const GITHUB_GATEKEEPER_URL = process.env.NODE_ENV === 'development'
  ? 'https://effector-gatekeeper-dev.now.sh/api/auth'
  : 'https://effector-gatekeeper.now.sh/api/auth'

const githubAuthUrl = new URL(GITHUB_AUTH_URL)
githubAuthUrl.searchParams.set('client_id', GITHUB_EFFECTOR_CLIENT_ID)
githubAuthUrl.searchParams.set('scope', 'gist,read:user')

export const config = {
  githubAuthUrl,
}
