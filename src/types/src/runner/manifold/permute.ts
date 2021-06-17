import {assert} from './assert'

export function rawPermute<T>({
  items,
  reorder,
  amount: {min, max},
  requiredItems = [],
}: {
  items: T[]
  reorder: boolean
  amount: {min: number; max: number}
  requiredItems?: T[]
}) {
  assert(min <= max, 'min amount should be less than max')
  const results: T[][] = []
  if (requiredItems.length > 0) {
    assert(
      requiredItems.length <= max,
      'cannot demant more items than max amount',
    )
    assert(
      requiredItems.every(item => items.includes(item)),
      'required items should present in items',
    )
  }
  for (const combination of selectFromNToM(items, min, max, !reorder)) {
    if (requiredItems.length > 0) {
      if (!requiredItems.every(e => combination.includes(e))) continue
    }
    results.push(combination)
  }
  return results
}
function selectFromNToM<T>(
  items: T[],
  from: number,
  to: number,
  noReorder: boolean,
) {
  const result = [] as T[][]
  const fn = noReorder ? selectNNoReorder : selectN
  for (let i = from; i < Math.min(to + 1, items.length + 1); i++) {
    result.push(...fn(items, i))
  }
  return result
}
function selectNNoReorder<T>(items: T[], n: number): T[][] {
  if (n > items.length) return [[]]
  if (n === 0) return [[]]
  if (n === 1) return items.map(item => [item])
  const result = []
  const subItems = [...items]
  for (let i = 0; i < items.length; i++) {
    subItems.splice(i, 1)
    result.push(
      ...selectNNoReorder(subItems, n - 1)
        .map(nested => [items[i], ...nested])
        .filter(
          selection => [...new Set(selection)].length === selection.length,
        ),
    )
  }
  return result
}
function selectN<T>(items: T[], n: number): T[][] {
  if (n === 0) return [[]]
  if (n === 1) return items.map(item => [item])
  const result = []
  for (let i = 0; i < items.length; i++) {
    const subItems = [...items]
    subItems.splice(i, 1)
    result.push(
      ...selectN(subItems, n - 1).map(nested => [items[i], ...nested]),
    )
  }
  return result
}
