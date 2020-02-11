import {Store, createStore, combine} from 'effector'
import {list} from './render/list'

export function variant<State extends {[key: string]: any}>(
  key: Store<keyof State>,
  cases: Partial<{[K in keyof State]: () => void}>,
) {
  const caseList = createStore(
    Object.entries(cases).map(([key, val]) => ({key, val: val!})),
  )
  const caseListWithVisibility = combine(caseList, key, (list, key) =>
    list.map(e => ({
      key: e.key,
      val: e.val,
      visible: e.key === key,
    })),
  )
  list({
    source: caseListWithVisibility,
    key: 'key',
    visible: ({visible}) => visible,
    fn({store}) {
      store.getState().val()
    },
  })
}
