import {createLocalStore} from '../lib/createLocalStorage'

export type TGitHubUserInfo = {
  databaseId?: number | null
  name: string
  url: string
  avatarUrl: string
}

export const initialUserInfo: TGitHubUserInfo = {
  databaseId: null,
  avatarUrl: '',
  name: '',
  url: '',
}

export type TToken = string | null

export const $csrf = createLocalStore<string>('csrf', '')
export const $githubToken = createLocalStore<TToken>('github-token', null)
export const $githubUser = createLocalStore<TGitHubUserInfo>(
  'github-user',
  initialUserInfo,
)
