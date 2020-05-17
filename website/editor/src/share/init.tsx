import {
  addShare,
  onKeyDown,
  onTextChange,
  removeShare,
  setCurrentShareId,
} from './index'
import {$currentShareId, $shareDescription, $shareList} from './state'
import {combine, forward, sample, split} from 'effector'
import {shareCode} from '../graphql'
import {$githubUser} from '../github/state'
import {pressCtrlS} from './controller'
import {tabApi} from '../tabs/domain'

$currentShareId.on(setCurrentShareId, (_, id) => id)

const keyDown = split(onKeyDown, {
  Escape: key => key === 'Escape',
  Enter: key => key === 'Enter',
})

forward({
  from: keyDown.Enter,
  to: shareCode,
})

$shareDescription.on(onTextChange, (_, value) => value).reset(keyDown.Escape)

const sharesWithUser = combine({
  shareList: $shareList,
  githubUser: $githubUser,
})

sample({
  source: sharesWithUser,
  clock: $currentShareId,
  target: $shareDescription,
  fn({shareList, githubUser}, slug) {
    const userShares = shareList[githubUser.databaseId]
    const currentShare = Object.values(userShares || {}).find(
      share => share.slug === slug,
    )
    return currentShare?.description
  },
})

sample({
  source: sharesWithUser,
  clock: addShare,
  target: $shareList,
  fn({shareList, githubUser}, newShare) {
    const {code, ...rest} = newShare
    return {
      ...shareList,
      [githubUser.databaseId]: {
        ...shareList[githubUser.databaseId],
        [newShare.md5]: rest,
      },
    }
  },
})

sample({
  source: sharesWithUser,
  clock: removeShare,
  target: $shareList,
  fn: ({shareList, githubUser}, slug) => ({
    ...shareList,
    [githubUser.databaseId]: {
      ...Object.values(shareList[githubUser.databaseId] || {}).reduce(
        (acc, share) => {
          if (share.slug !== slug) {
            acc[share.md5] = share
          }
          return acc
        },
        {},
      ),
    },
  }),
})

export const $sortedShareList = sharesWithUser.map(
  ({shareList, githubUser}) => {
    if (!(githubUser.databaseId in shareList)) return []

    return Object.values(shareList[githubUser.databaseId] || {})
      .filter(share => share.author === githubUser.databaseId)
      .sort((a, b) => b.created - a.created)
  },
)

// sample({
//   source: $shareDescription,
//   clock: pressCtrlS,
//   fn: (desc) => {
//     if (!desc) {
//       tabApi.showShare()
//     }
//   },
// })
