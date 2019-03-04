//@flow

import {forward} from 'effector'

export function switcher({event, selector, pre = {}, post = {}, target = {}}) {
  const mapped = event.map(data => {
    const ctx = new SwitcherContext()
    for (const key in selector) {
      const val = onKey({
        from: pre,
        key,
        source: data,
        fn: ({source, item}) => item(source),
      })
      if (selector[key](val)) {
        ctx.winner = key
        ctx.result = val
        break
      }
    }
    return ctx
  })
  const result = {}
  for (const key in selector) {
    result[key] = onKey({
      from: target,
      source: onKey({
        from: post,
        source: mapped.filter(filter.bind(key)),
        fn: ({source, item}) => source.map(item),
        key,
      }),
      fn({source, item}) {
        forward({
          from: source,
          to: item,
        })
        return item
      },
      key,
    })
  }
  return result
}

function onKey({from, key, fn, source}) {
  if (key in from) {
    return fn({item: from[key], source, key})
  }
  return source
}

function SwitcherContext() {
  this.winner = ''
  this.result = null
}
function filter(ctx) {
  if (ctx.winner === this) return ctx.result
}
