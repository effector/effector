import {combine, forward, sample, guard} from 'effector'
import {$gistApiKey, $gistAuth, $gistRemember} from './state'
import {login, setApiKeyRemember} from './index'


$gistRemember.on(setApiKeyRemember, (state, checked) => checked)

forward({
  from: guard({source: login, filter: $gistRemember}),
  to: $gistApiKey,
})

$gistApiKey.watch(console.log)

export const $gist = combine({
  gistApiKey: $gistApiKey,
  gistRemember: $gistRemember,
  gistAuth: $gistAuth,
})

window.gist = $gist

login.use(async (apiKey) => {
  console.log('login handle')
  const result = await fetch('https://api.github.com/users/kobzarvs', {
    headers: {
      Authorization: `token ${apiKey}`
    }
  }).json()
  return result
})
