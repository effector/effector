import {itIsALongName, Randomizing} from 'c/d'
import Defaulting, {AnotherImport} from '@/f'
import {splitMap} from 'patronum/split-map'

const longer = itIsALongName(0)
const arcade = Defaulting({
  source: longer,
  condition: AnotherImport({test: true}),
})
Randomizing({arcade})

const result = splitMap({
  longer,
  source: arcade,
})
