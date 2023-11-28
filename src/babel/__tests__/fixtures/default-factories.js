import {createQuery} from '@farfetched/core'
import {debounce} from 'patronum'
import {delay} from 'patronum/delay'

const q = createQuery({handler: async () => null})

debounce({
  source: q,
  timeout: 100,
  target: q.refresh,
})

delay({
  source: q,
  timeout: 100,
  target: q.refresh,
})
