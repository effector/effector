//@flow
const {join} = require('path')
const shell = require('shelljs')
const {outputFileSync} = require('fs-extra')
const rootPath = `${join(process.cwd(), process.env.SRC || '')}/`
const out = process.env.OUT || ''
const target = process.env.TARGET || ''

const command = `npx flow cycle ${rootPath}${target}`
const child = shell.exec(command, {
  cwd: process.cwd(),
})
if (child.code !== 0) {
  shell.exit(1)
  process.exit(child.code)
}
const src = child.stdout
const normalizePath = obj => {
  const ROOT = rootPath
  const EXT = '.js'
  if (obj.normalized) return
  if (obj.value.startsWith(ROOT)) obj.value = obj.value.replace(ROOT, '')
  if (obj.value.endsWith(EXT))
    obj.value = obj.value.slice(0, obj.value.length - EXT.length)
  obj.normalized = true
}
const Token = {
  lexeme(row, column, value) {
    return {
      type: 'lexeme',
      row,
      column,
      value,
      id: -1,
    }
  },
  link(from, to) {
    return {
      type: 'link',
      from: to,
      to: from,
    }
  },
}

function prepare(text) {
  const trim = word => word.trim()
  const splitToWords = text => {
    const chars = [...text]
    const words = [[]]
    const getCurrentWord = () => words[words.length - 1]
    const newWord = () => words.push([])
    const isEmpty = (word = getCurrentWord()) => word.length === 0
    let inName = false
    const visitor = {
      '"': function() {
        if (inName) {
          inName = false
        } else {
          inName = true
        }
        if (!isEmpty()) {
          newWord()
        }
      },
      ' ': function(char) {
        if (inName) {
          visitor.__(char)
        } else if (!isEmpty()) {
          newWord()
        }
      },
      __(char) {
        getCurrentWord().push(char)
      },
    }
    for (const char of chars) {
      let node
      if (char in visitor) node = visitor[char]
      else node = visitor.__
      node(char)
    }
    return words.filter(word => word.length > 0)
  }
  const scanLexemes = lexemes => {
    const visitor = {
      '->': function(lexeme, ctx) {
        ctx.result.push(
          Token.link(ctx.lexemes[ctx.i - 1], ctx.lexemes[ctx.i + 1]),
        )
        ctx.i += 2
      },
      __(lexeme, ctx) {
        ctx.i += 1
      },
    }
    const ctx = {i: 0, result: [], lexemes}
    while (ctx.i < lexemes.length) {
      const lexeme = lexemes[ctx.i]
      let node
      if (lexeme.value in visitor) node = visitor[lexeme.value]
      else node = visitor.__
      node(lexeme, ctx)
    }
    return ctx.result
  }
  //prettier-ignore
  function unsafeGetCheck/*::<T>*/(value/*: T |  void*/)/*: T*/ {
    if (typeof value === 'undefined') throw new Error('upsert fail')
    return value
  }
  const scanLinks = links => {
    const zones = new Set()
    const leafs = new Map()
    const upsert = (value, defs) => {
      if (leafs.has(value)) return unsafeGetCheck(leafs.get(value))
      leafs.set(value, defs)
      return defs
    }

    for (const link of links) {
      normalizePath(link.from)
      normalizePath(link.to)
      const z1 = {
        value: link.from.value.replace(/^(.+)\/.*/g, '$1'),
        normalized: false,
      }
      const z2 = {
        value: link.to.value.replace(/^(.+)\/.*/g, '$1'),
        normalized: false,
      }
      normalizePath(z1)
      normalizePath(z2)
      const leafA = upsert(link.from.value, {
        value: link.from.value,
        zone: z1.value,
        name: link.from.value.replace(/^(.+\/)?(.*)/g, '$2'),
        childOf: new Set(),
        parentOf: new Set(),
      })
      const leafB = upsert(link.to.value, {
        value: link.to.value,
        zone: z2.value,
        name: link.to.value.replace(/^(.+\/)?(.*)/g, '$2'),
        childOf: new Set(),
        parentOf: new Set(),
      })
      leafA.parentOf.add(link.to.value)
      leafB.childOf.add(link.from.value)
      zones.add(leafA.zone).add(leafB.zone)
    }
    return {zones, leafs}
  }
  const connectLeafs = ({zones, leafs}) => {
    const renderLeafDef = leaf =>
      `      "${leaf.value}" [label="${leaf.name}",group="${leaf.zone}"];`
    const zoneMap = new Map(
      [...zones].map(zone => [
        zone,
        {
          name: zone,
          defs: [],
          links: [],
        },
      ]),
    )
    const commonLinks = []
    for (const leaf of leafs.values()) {
      const zone = unsafeGetCheck(zoneMap.get(leaf.zone))
      zone.defs.push(renderLeafDef(leaf))
      for (const child of leaf.parentOf) {
        const ch = unsafeGetCheck(leafs.get(child))
        if (leaf.zone === ch.zone) {
          zone.links.push(`      "${leaf.value}"->"${ch.value}";`)
        } else {
          commonLinks.push(`    "${leaf.value}"->"${ch.value}";`)
        }
      }
    }
    const clusters = []
    for (const zone of zoneMap.values()) {
      const hashColorFull = parseInt(
        `${zone.name}${zone.name}`.slice(0, 12),
        36,
      ).toString(16)
      const hashColor1 = hashColorFull.slice(-6)
      const clusterStyle = color =>
        `color="#${color}";
      style="rounded,bold"
      edge [style="dashed", color="#${color}", dir=forward];
      node [
        color="transparent",
        fontcolor="#${color}",
        fontsize="25px",
      ];`
      clusters.push(`
    subgraph "cluster_${zone.name}" {
      ${clusterStyle(hashColor1)}
${zone.defs.join(`\n`)}
${zone.links.join(`\n`)}
      fontcolor="#${hashColor1}";
      fontsize="45px";
      label="${zone.name}";
    }`)
    }
    return {
      leafs,
      zones: [...zoneMap.values()],
      clusters: clusters.join(`\n`),
      commonLinks: commonLinks.join(`\n`),
    }
  }
  const join = words => words.map(word => word.join(''))
  const trimmed = text
    .trim()
    .split(`\n`)
    .map(trim)
  const splitted = trimmed.map(splitToWords).map(join)
  const lexemes = []
  for (let r = 0; r < splitted.length; r++) {
    const row = splitted[r]

    for (let c = 0; c < row.length; c++) {
      const col = row[c]
      const lex = Token.lexeme(r, c, col)
      lex.id = lexemes.length
      lexemes.push(lex)
      //lexemes.push(Node.Lexeme(r, c, col))
    }
  }
  const scanned = scanLexemes(lexemes)
  const linked = scanLinks(scanned)
  const connected = connectLeafs(linked)
  return {
    clusters: connected.clusters,
    commonLinks: connected.commonLinks,
    zones: [...linked.zones],
    leafs: [...linked.leafs.values()]
      .filter(leaf => leaf.zone === 'graphite')
      .map(leaf => ({
        ...leaf,
        childOf: [...leaf.childOf].join(' '),
        parentOf: [...leaf.parentOf].join(' '),
      })),
  }
}

function run() {
  const rootStyle = `
    rankdir=BT;
    ranksep=".95 equally";
    ratio=auto;
    ordering=out

    edge [style="bold", color="#aaaaaa", dir=forward];
`
  const results = prepare(src)

  const dot = `
digraph {
  ${rootStyle}
  ${results.clusters}
${results.commonLinks}
}`
  console.log(dot)
  outputFileSync(out, dot)
}

// const src = `
// digraph {
//   "src/store/storeFabric.js" -> "src/store/setStoreName.js"
//   "src/store/storeFabric.js" -> "src/store/index.h.js"
//   "src/store/storeFabric.js" -> "src/event/index.js"
//   "src/store/setStoreName.js" -> "src/store/index.h.js"
//   "src/store/restore.js" -> "src/store/index.h.js"
//   "src/store/restore.js" -> "src/store/createStore.js"
//   "src/store/restore.js" -> "src/event/index.js"
//   "src/store/restore.js" -> "src/effect/index.js"
//   "src/store/index.js" -> "src/store/storeFabric.js"
//   "src/store/index.js" -> "src/store/setStoreName.js"
//   "src/store/index.js" -> "src/store/restore.js"
//   "src/store/index.js" -> "src/store/index.h.js"
//   "src/store/index.js" -> "src/store/createStoreObject.js"
//   "src/store/index.js" -> "src/store/createStore.js"
//   "src/store/index.js" -> "src/store/createApi.js"
//   "src/store/index.h.js" -> "src/event/index.js"
//   "src/store/index.h.js" -> "src/effect/index.js"
//   "src/store/createStoreObject.js" -> "src/store/storeFabric.js"
//   "src/store/createStoreObject.js" -> "src/store/index.h.js"
//   "src/store/createStoreObject.js" -> "src/event/index.js"
//   "src/store/createStore.js" -> "src/store/storeFabric.js"
//   "src/store/createStore.js" -> "src/store/index.h.js"
//   "src/store/createApi.js" -> "src/store/index.h.js"
//   "src/store/createApi.js" -> "src/event/index.js"
//   "src/graphite/walk.js" -> "src/event/index.js"
//   "src/graphite/index.js" -> "src/graphite/walk.js"
//   "src/event/index.js" -> "src/event/index.h.js"
//   "src/event/index.js" -> "src/event/eventFabric.js"
//   "src/event/index.js" -> "src/event/createEvent.js"
//   "src/event/index.h.js" -> "src/store/index.js"
//   "src/event/eventFabric.js" -> "src/store/index.js"
//   "src/event/eventFabric.js" -> "src/graphite/index.js"
//   "src/event/eventFabric.js" -> "src/event/index.h.js"
//   "src/event/eventFabric.js" -> "src/effect/index.js"
//   "src/event/createEvent.js" -> "src/event/index.h.js"
//   "src/event/createEvent.js" -> "src/event/eventFabric.js"
//   "src/effect/index.js" -> "src/effect/index.h.js"
//   "src/effect/index.js" -> "src/effect/effectFabric.js"
//   "src/effect/index.js" -> "src/effect/createEffect.js"
//   "src/effect/index.h.js" -> "src/store/index.js"
//   "src/effect/index.h.js" -> "src/event/index.js"
//   "src/effect/exec.js" -> "src/effect/index.h.js"
//   "src/effect/effectFabric.js" -> "src/event/index.js"
//   "src/effect/effectFabric.js" -> "src/effect/index.h.js"
//   "src/effect/effectFabric.js" -> "src/effect/exec.js"
//   "src/effect/effectFabric.js" -> "src/effect/callbacks.js"
//   "src/effect/createEffect.js" -> "src/effect/index.h.js"
//   "src/effect/createEffect.js" -> "src/effect/effectFabric.js"
//   "src/effect/callbacks.js" -> "src/effect/index.h.js"
// }
// `

run()
