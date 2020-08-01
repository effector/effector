import {
  addShare,
  onKeyDown,
  onTextChange,
  removeShare,
  setCurrentShareId, setFilterMode,
} from './index'
import md5 from 'js-md5'
import {$currentShareId, $filterMode, $hiddenShareList, $shareDescription, $shareList} from './state'
import {combine, forward, sample, split} from 'effector'
import {getShareListByAuthor, shareCode} from '~/graphql'
import {$githubUser} from '~/github/state'


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

$shareList.on(getShareListByAuthor.done, (state, {params, result}) => {
  return {
    ...state,
    [params.author]: result.pages.sort((a, b) => a.created - b.created).reduce((acc, record) => {
      const id = md5(record.code)
      acc[id] = {
        author: params.author,
        slug: record.slug,
        description: record.description,
        created: record.created,
        md5: id,
        code: record.code
      }
      return acc
    }, {}),
  }
})

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

$hiddenShareList.on(removeShare, (list, slug) => ({
  ...list,
  [slug]: true,
}))

export const $sortedShareList = combine(sharesWithUser, $hiddenShareList, ({shareList, githubUser}, hiddenShareList) => {
  if (!(githubUser.databaseId in shareList)) return []

  return Object.values(shareList[githubUser.databaseId] || {})
    .filter(share => share.author === githubUser.databaseId && !hiddenShareList[share.slug])
    .sort((a, b) => b.created - a.created)
})

// sample({
//   source: $shareDescription,
//   clock: pressCtrlS,
//   fn: (desc) => {
//     if (!desc) {
//       tabApi.showShare()
//     }
//   },
// })

$githubUser.watch(({databaseId}) => {
  if (databaseId) {
    getShareListByAuthor({author: databaseId})
  }
})


$filterMode.on(setFilterMode, (_, value) => value)
