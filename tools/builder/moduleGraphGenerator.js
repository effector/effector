//@flow
import * as Path from 'path'
import {outputFileSync} from 'fs-extra'
//$off
import chroma from 'chroma-js'

const scale = chroma.scale([chroma('#fafa6e').darken(2), '#2A4858']).mode('lch')

function toDot(modules, output) {
  const results = []
  results.push('digraph G {')
  results.push('  edge [color="#aaaaaa",dir=back];')
  results.push('  node [style=filled,color=white,fontsize="25px"];')
  results.push('  graph [fontsize=15 compound=true];')
  results.push('  rankdir=TB;')
  results.push('  ranksep=".95 equally";')
  results.push('  ratio=auto;')
  let links = []
  const cwd = process.cwd() + '/'
  const modulesOnly = modules.map(md => {
    const id = processPath(md.id)
    const deps = md.deps.map(processPath)
    return {id, deps}
  })
  function processPath(path) {
    path = path.replace(cwd, '')
    path = path.replace('src/', '')
    path = path.replace('.js', '')
    path = path.replace(/(.+)\/index$/, '$1')
    return path
  }
  const moduleNames = new Set()
  modulesOnly.forEach(m => {
    const from = m.id
    moduleNames.add(from)
    m.deps.forEach(dep => {
      moduleNames.add(dep)
      links.push({from, to: dep})
    })
  })
  links = links.sort((a, b) => {
    if (a.from === b.from) {
      return a.to.localeCompare(b.to)
    }
    return a.from.localeCompare(b.from)
  })
  const moduleSet = [...moduleNames]
  const nextID = (() => {
    let id = 10
    return () => `id_${(id++).toString(36)}`
  })()
  const nameMap = {
    names: [],
    nameOf: {},
    idOf: {},
  }
  moduleSet.forEach(name => {
    const id = nextID()
    nameMap.nameOf[id] = name
    nameMap.idOf[name] = id
    nameMap.names.push(name)
  })
  let clusters = moduleSet
    .reduce((acc, name) => [...new Set([...acc, name.split('/')[0]])], [])
    .map(name => ({
      name,
      childs: moduleSet.filter(n => n === name || n.startsWith(`${name}/`)),
    }))
  const clustersFirst = [...clusters]
  clusters = clusters
    .filter(({name}, i, clusters) =>
      clusters.every(({name: item, childs}) => {
        if (item === name) return true
        return !childs.includes(name)
      }),
    )
    .filter(({childs}) => childs.length > 1)
  const freeNodes = new Set(moduleSet)
  const clusterRoots = {
    roots: new Set(),
    map: {},
    colors: {},
    clusterOf: {},
  }
  const colors = scale.colors(clusters.length + 1)
  clusters.forEach(({name, childs}, i) => {
    const color = colors[i + 1]
    const id = nextID()
    const cluster = []
    const clusterName = `cluster_${id}`
    clusterRoots.colors[clusterName] = color
    cluster.push(`  subgraph ${clusterName} {`)
    cluster.push(`    style="rounded,bold";`)
    cluster.push(`    color="${color}";`)
    cluster.push(`    node [fontcolor="${color}",fontsize="25px"];`)
    childs.forEach(childName => {
      freeNodes.delete(childName)
      const id = nameMap.idOf[childName]
      clusterRoots.clusterOf[id] = clusterName
      let visibleName = '/'
      if (childName !== name) {
        visibleName = childName.slice(name.length + 1)
      } else {
        clusterRoots.roots.add(id)
        clusterRoots.map[id] = clusterName
      }
      cluster.push(`    ${id} [label="${visibleName}",group="${name}"];`)
    })
    cluster.push(`    fontcolor="${color}";`)
    cluster.push(`    fontsize="45px";`)
    cluster.push(`    label = "${name}";`)
    cluster.push(`  }`)

    results.push(...cluster)
  })
  freeNodes.forEach(name => {
    results.push(`  ${nameMap.idOf[name]} [label="${name}"];`)
  })
  links.forEach(({from, to}) => {
    const fromId = nameMap.idOf[from]
    const toId = nameMap.idOf[to]
    let opts = ' [style="dashed"]'
    const sameCluster =
      toId in clusterRoots.clusterOf
      && clusterRoots.clusterOf[fromId] === clusterRoots.clusterOf[toId]
    if (sameCluster) {
      const cluster = clusterRoots.clusterOf[fromId]
      const color = clusterRoots.colors[cluster]
      opts = ` [style="bold",color="${color}"]`
    } else if (clusterRoots.roots.has(toId)) {
      opts = ` [style="dashed",lhead=${clusterRoots.map[toId]}]`
    }
    results.push(`  ${fromId} -> ${toId}${opts};`)
  })
  results.push('}')
  const fullText = results.join(`\n`)
  // console.log('path', Path.resolve(process.cwd(), output))
  // console.log('moduleSet', moduleSet)
  // console.log('nameMap', nameMap)
  // console.log('clustersFirst', clustersFirst)
  // console.log('clusters', clusters)
  if (nameMap.names.length === 0) {
    console.log(
      '[moduleGraphGenerator] no modules given, return without writing results',
    )
    return
  }
  const outputPath = Path.resolve(process.cwd(), output)
  outputFileSync(outputPath, fullText)
  console.log(
    '[moduleGraphGenerator] module dependency scheme saved to file %s',
    outputPath,
  )
}

function prune(modules) {
  const avail = modules.filter(m => m.deps.length == 0)
  if (!avail.length) {
    return
  }

  const id = avail[0].id
  const index = modules.indexOf(avail[0])
  modules.splice(index, 1)
  modules.forEach(m => {
    m.deps = m.deps.filter(dep => dep != id)
  })
  prune(modules)
}

function getPrefix(ids) {
  if (ids.length < 2) {
    return ''
  }
  return ids.reduce((prefix, val) => {
    while (val.indexOf(prefix) != 0) {
      prefix = prefix.substring(0, prefix.length - 1)
    }
    return prefix
  })
}

type Opts = {
  exclude?: string,
  prune?: boolean,
  output: string,
}

export default function plugin(options: Opts = {}): any {
  const exclude = str => options.exclude && str.match(options.exclude)

  return {
    generateBundle(bundleOptions, bundle, isWrite) {
      const ids = []
      for (const moduleId of this.moduleIds) {
        if (!exclude(moduleId)) {
          ids.push(moduleId)
        }
      }

      const prefix = getPrefix(ids)
      const strip = str => str.substring(prefix.length)

      const modules = []
      ids.forEach(id => {
        const m = {
          id: strip(id),
          deps: this.getModuleInfo(id)
            .importedIds.filter(x => !exclude(x))
            .map(strip),
        }
        if (exclude(m.id)) {
          return
        }
        modules.push(m)
      })
      if (Boolean(options.prune)) {
        prune(modules)
      }
      toDot(modules, options.output)
    },
  }
}
