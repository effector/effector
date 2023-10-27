import {useStoreMap} from 'effector-react'
import { useStoreMap as useCompatStoreMap } from 'effector-react/compat'

// ## useStoreMap

useStoreMap($store, (a) => 1)
useStoreMap($store, fn)
const value91 = useStoreMap($store, fn)
const value92 = useStoreMap($store, (a) => 1)
const value93 = useStoreMap($store, (a, b) => 1)
const value94 = useStoreMap($store, (a, [b, c]) => 1)
const value95 = useStoreMap($store, function(a, [b, c]) {
  return 1
})
const value96 = useStoreMap($store, function demo(a, [b, c]) {
  return 1
})

useCompatStoreMap($store, (a) => 1)
useCompatStoreMap($store, fn)
const value100 = useCompatStoreMap($store, fn)
const value101 = useCompatStoreMap($store, (a) => 1)
const value102 = useCompatStoreMap($store, (a, b) => 1)
const value103 = useCompatStoreMap($store, (a, [b, c]) => 1)
const value104 = useCompatStoreMap($store, function(a, [b, c]) {
  return 1
})
const value105 = useCompatStoreMap($store, function demo(a, [b, c]) {
  return 1
})
