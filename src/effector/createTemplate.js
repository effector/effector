//@flow

import {createNode, withRegion, launch, restore, step} from 'effector'

const SILENT = true

let spawnID = 0
let currentTemplate = null
let currentSpawn = null

export function createTemplate({fn, state: values = {}, name = ''}) {
  const parent = currentTemplate
  const template = {
    name,
    plain: [],
    closure: [],
    seq: {},
    watch: [],
    nameMap: {},
    pages: [],
    childTemplates: [],
    loader: step.filter({
      fn(upd, scope, stack) {
        if (!stack.page || stack.page.template !== template) {
          template.pages.forEach(page => {
            launch({
              params: upd,
              target: stack.node,
              page,
              defer: true,
            })
          })
          return false
        }
        return true
      },
    }),
    parent,
  }
  if (parent) {
    parent.childTemplates.push(template)
  }
  const node = createNode({
    meta: {
      template,
    },
  })
  currentTemplate = template
  withRegion(node, () => {
    const state = restore(values)
    fn(state)
    template.nameMap = state
  })
  currentTemplate = parent
  return node
}

function getCurrent(ref) {
  switch (ref.type) {
    case 'list':
      return [...ref.current]
    case 'shape':
      return {...ref.current}
    default:
      return ref.current
  }
}

export function spawn(unit, {values = {}} = {}) {
  const template = unit.meta.template
  const parent = currentSpawn
  const page = {}
  const result = {
    id: ++spawnID,
    reg: page,
    template,
    parent,
  }
  template.pages.push(result)
  currentSpawn = {template, spawn: result}
  log('spawn', template.name)
  for (const ref of template.plain) {
    page[ref.id] = {
      id: ref.id,
      current: getCurrent(ref),
    }
  }
  for (const ref of template.closure) {
    page[ref.id] = ref
  }
  if (parent) {
    log('parent spawn reg', parent.spawn.reg)
    log('page before assign', page)
    Object.assign(page, parent.spawn.reg)
    log('page after assign', page)
  }
  for (const name in values) {
    const id = template.nameMap[name].stateRef.id
    page[id] = {
      id,
      current: values[name],
    }
  }

  for (const ref of template.plain) {
    if (!ref.after) continue
    const value = page[ref.id].current
    for (const cmd of ref.after) {
      const to = cmd.to
      if (!page[to.id]) {
        page[to.id] = {
          id: to.id,
          current: to.current,
        }
      }
      switch (cmd.type) {
        case 'copy':
          page[to.id].current = value
          break
        case 'map':
          page[to.id].current = cmd.fn(value)
          break
        case 'field':
          page[to.id].current[cmd.field] = value
          break
      }
    }
  }
  // for (const id in template.seq) {
  //   const after = template.seq[id]
  //   const value = page[id].current
  //   for (const cmd of after) {
  //     switch (cmd.type) {
  //       case 'copy':
  //         page[cmd.to.id].current = value
  //         break
  //       case 'map':
  //         page[cmd.to.id].current = cmd.fn(value)
  //         break
  //       case 'field':
  //         page[cmd.to.id].current[cmd.field] = value
  //         break
  //     }
  //   }
  // }
  log('pre-final page', page)
  const state = {i: 0, stop: false}
  while (!state.stop) {
    runWatchersFrom(template.watch, state, page)
  }
  log('final page', page)
  currentSpawn = parent
  return result
}

function runWatchersFrom(list, state, page) {
  state.stop = true
  let val
  try {
    while (state.i < list.length) {
      val = list[state.i]
      state.i++
      val.fn(page[val.of.id].current)
    }
  } catch (err) {
    console.error(err)
    state.stop = false
  }
}

function log(tag, value) {
  if (SILENT) return
  console.log(tag, JSON.stringify(value, null, 2))
}

// function list({fn, source, key}) {
//   const listTemplate = createTemplate({
//     fn,
//     state: {
//       key: null,
//       value: null,
//     },
//   })
// }
