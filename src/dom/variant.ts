import {Store, createStore, combine} from 'effector'
import {list} from './render/list'
import {spec} from './h'

export function variant<State extends {[key: string]: any}>(
  key: Store<keyof State>,
  cases: Partial<{[K in keyof State]: () => void}>,
) {
  const caseList = createStore(
    Object.entries(cases).map(([key, val]) => ({key, val: val!})),
  )
  list(
    {source: caseList, key: 'key', fields: ['key', 'val']},
    ({fields: [field, val]}) => {
      spec({
        visible: combine(field, key, (field, key) => field === key),
      })
      val.getState()()
    },
  )
}
