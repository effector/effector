import {createNode, withRegion, launch, restore, step} from 'effector'

let SILENT = true

let templateID = 0
let spawnID = 0
let currentTemplate = null
let currentSpawn = null

export const setSilent = val => {
  SILENT = val
}

export function createTemplate({fn, state: values = {}, name = ''}) {
  const parent = currentTemplate
  const template = {
    id: ++templateID,
    name,
    plain: [],
    watch: [],
    nameMap: {},
    pages: [],
    childTemplates: [],
    loader: step.filter({
      fn(upd, scope, stack) {
        if (stack.parent) {
          if (stack.page) {
            if (stack.page.template === template) return true
            stack.page.childSpawns[template.id].forEach(page => {
              launch({
                params: upd,
                target: stack.node,
                page,
                defer: false,
              })
            })
          } else {
            template.pages.forEach(page => {
              launch({
                params: upd,
                target: stack.node,
                page,
                defer: false,
              })
            })
          }

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
  // console.log(`{+} ${template.name} ${template.id}`)
  withRegion(node, () => {
    const state = restore(values)
    fn(state)
    template.nameMap = state
  })
  // for (const child of template.childTemplates) {
  //   template.plain = template.plain.concat(child.plain)
  // }
  // template.plain = [...new Set(template.plain)]
  currentTemplate = parent
  // console.log(`{-} ${template.name} ${template.id}`)
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
    fullID: '',
    reg: page,
    template,
    parent,
    childSpawns: {},
  }
  template.pages.push(result)
  currentSpawn = {template, spawn: result}
  if (parent) {
    if (!parent.spawn.childSpawns[template.id]) {
      parent.spawn.childSpawns[template.id] = []
    }
    parent.spawn.childSpawns[template.id].push(result)
  }
  if (parent) {
    result.fullID = `${parent.spawn.fullID}_${result.id}`
  } else {
    result.fullID = `${result.id}`
  }
  // console.log(`[+] ${template.name} ${result.fullID}`)
  log('spawn', template.name)

  if (parent) {
    // log('parent spawn reg', parent.spawn.reg)
    // log('page before assign', page)
    Object.assign(page, parent.spawn.reg)
    log(`page after assign ${template.name}`, page)
  }
  for (const ref of template.plain) {
    const next = {
      id: ref.id,
      current: getCurrent(ref),
    }
    if (ref.id in page) {
      log(`has id (${template.name})`, {ref, old: page[ref.id], next})
    }
    page[ref.id] = next
  }
  for (const name in values) {
    const id = template.nameMap[name].stateRef.id
    page[id] = {
      id,
      current: values[name],
    }
  }
  log(`page before plain assignment (${template.name})`, page)
  for (const ref of template.plain) {
    if (ref.before) {
      for (const cmd of ref.before) {
        switch (cmd.type) {
          case 'map':
            page[ref.id].current = cmd.fn(page[cmd.from.id].current)
            break
          case 'field': {
            const from = cmd.from
            if (!page[from.id]) {
              page[from.id] = from
            }
            page[ref.id].current[cmd.field] = page[from.id].current
            break
          }
          case 'closure':
            if (!page[cmd.of.id]) {
              page[cmd.of.id] = cmd.of
            }
            break
        }
      }
    }
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
      }
    }
  }
  log(`pre-final page ${template.name}`, page)
  const state = {i: 0, stop: false}
  while (!state.stop) {
    runWatchersFrom(template.watch, state, page)
  }
  log(`final page ${template.name}`, page)
  currentSpawn = parent
  if (parent) {
    for (const id in result.childSpawns) {
      if (!(id in parent.spawn.childSpawns)) {
        parent.spawn.childSpawns[id] = []
      }
      parent.spawn.childSpawns[id].push(...result.childSpawns[id])
    }
  }
  // console.log(`[-] ${template.name} ${result.fullID}`)
  return result
}

function runWatchersFrom(list, state, page) {
  state.stop = true
  let val
  try {
    while (state.i < list.length) {
      val = list[state.i]
      // console.log(
      //   'watch',
      //   JSON.stringify(
      //     {
      //       val,
      //       pageRef: page[val.of.id],
      //     },
      //     null,
      //     2,
      //   ),
      // )
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
