import type {
  EffectorPluginOptions,
  EffectorPluginOptionsNormalized,
  MethodParser,
  SmallConfig,
} from './types'
import {
  setConfigForConfMethod,
  setEventNameAfter,
  setRestoreNameAfter,
  setStoreNameAfter,
  stripExtension,
} from './util'

const defaultFactories = [
  '@farfetched/core',
  '@effector/reflect',
  '@effector/reflect/ssr',
  '@effector/reflect/scope',
  'atomic-router',
  '@withease/factories',
  'effector-action',
  'patronum', // there is also custom handling for patronum/{method} imports
]

export function normalizeOptions(options: EffectorPluginOptions) {
  const defaults = options.noDefaults
    ? {
        store: [],
        event: [],
        effect: [],
        domain: [],
        restore: [],
        combine: [],
        sample: [],
        forward: [],
        guard: [],
        attach: [],
        split: [],
        createApi: [],
        merge: [],
        domainMethods: {
          store: [],
          event: [],
          effect: [],
          domain: [],
        },
        reactMethods: {
          createGate: [],
        },
        factories: [],
      }
    : {
        store: ['createStore'],
        event: ['createEvent'],
        effect: ['createEffect'],
        domain: ['createDomain'],
        restore: ['restore'],
        combine: ['combine'],
        sample: ['sample'],
        forward: ['forward'],
        guard: ['guard'],
        attach: ['attach'],
        split: ['split'],
        createApi: ['createApi'],
        merge: ['merge'],
        domainMethods: {
          store: ['store', 'createStore'],
          event: ['event', 'createEvent'],
          effect: ['effect', 'createEffect'],
          domain: ['domain', 'createDomain'],
        },
        reactMethods: {
          createGate: ['createGate'],
        },
        factories: defaultFactories,
      }
  const fullConfig: EffectorPluginOptionsNormalized = readConfigFlags({
    options,
    properties: {
      reactSsr: false,
      transformLegacyDomainMethods: true,
      forceScope: false,
      filename: true,
      stores: true,
      events: true,
      effects: true,
      domains: true,
      restores: true,
      combines: true,
      samples: true,
      forwards: true,
      guards: true,
      attaches: true,
      splits: true,
      apis: true,
      merges: true,
      gates: true,
    },
    result: {
      importName: new Set(
        options.importName
          ? Array.isArray(options.importName)
            ? options.importName
            : [options.importName]
          : [
              'effector',
              'effector/compat',
              'effector-root',
              'effector-root/compat',
              'effector-logger',
              'trail/runtime',
              '@effector/effector',
            ],
      ),
      importReactNames: {
        ssr: new Set(
          readReactImportOption(options, 'ssr', [
            'effector-react/scope',
            'effector-react/ssr',
          ]),
        ),
        nossr: new Set(
          readReactImportOption(options, 'nossr', [
            'effector-react',
            'effector-react/compat',
          ]),
        ),
      },
      storeCreators: new Set(options.storeCreators || defaults.store),
      eventCreators: new Set(options.eventCreators || defaults.event),
      effectCreators: new Set(options.effectCreators || defaults.effect),
      domainCreators: new Set(options.domainCreators || defaults.domain),
      restoreCreators: new Set(options.restoreCreators || defaults.restore),
      combineCreators: new Set(options.combineCreators || defaults.combine),
      sampleCreators: new Set(options.sampleCreators || defaults.sample),
      forwardCreators: new Set(options.forwardCreators || defaults.forward),
      guardCreators: new Set(options.guardCreators || defaults.guard),
      attachCreators: new Set(options.attachCreators || defaults.attach),
      splitCreators: new Set(options.splitCreators || defaults.split),
      apiCreators: new Set(options.apiCreators || defaults.createApi),
      mergeCreators: new Set(options.mergeCreators || defaults.merge),
      domainMethods: readConfigShape(
        options.domainMethods,
        defaults.domainMethods,
      ),
      reactMethods: readConfigShape(
        options.reactMethods,
        defaults.reactMethods,
      ),
      factories: [...(options.factories || []), ...defaults.factories].map(
        stripExtension,
      ),
      addLoc: Boolean(options.addLoc),
      debugSids: Boolean(options.debugSids),
      forceScope: Boolean(options.forceScope),
      hmr: options.hmr || 'none',
      addNames:
        typeof options.addNames !== 'undefined'
          ? Boolean(options.addNames)
          : true,
    },
  })

  const creatorsList = [
    fullConfig.storeCreators,
    fullConfig.eventCreators,
    fullConfig.effectCreators,
    fullConfig.domainCreators,
    fullConfig.restoreCreators,
    fullConfig.combineCreators,
    fullConfig.sampleCreators,
    fullConfig.forwardCreators,
    fullConfig.guardCreators,
    fullConfig.attachCreators,
    fullConfig.splitCreators,
    fullConfig.apiCreators,
    fullConfig.mergeCreators,
  ]

  return {
    fullConfig,
    creatorsList,
  }
}

function readReactImportOption(
  options: EffectorPluginOptions,
  name: 'ssr' | 'nossr',
  defaults: string[],
) {
  if (!options || !options.importReactNames) return defaults
  const {importReactNames} = options
  const value = importReactNames[name]
  if (value) {
    if (Array.isArray(value)) return value
    else return [value]
  }
  return defaults
}

function readConfigShape<T extends Record<string, string[]>>(
  shape: Record<string, any> = {},
  defaults: T,
) {
  const result = {} as {
    [K in keyof T]: Set<string>
  }
  for (const key in defaults) {
    result[key] = readConfigArray(shape[key], defaults[key])
  }
  return result
}

function readConfigArray(array: string[] | undefined, defaults: string[]) {
  return new Set(array || defaults)
}

function readConfigFlags({
  options,
  properties,
  result,
}: {
  options: EffectorPluginOptions
  properties: Record<string, boolean>
  result: Record<string, any>
}): any {
  for (const property in properties) {
    if (property in options) {
      result[property] = Boolean(
        options[property as keyof EffectorPluginOptions],
      )
    } else {
      result[property] = properties[property]
    }
  }
  return result
}

export function getMethodParsers(
  t: typeof import('@babel/types'),
  smallConfig: SmallConfig,
  {
    stores,
    events,
    effects,
    domains,
    restores,
    combines,
    samples,
    forwards,
    guards,
    attaches,
    splits,
    apis,
    merges,
    gates,

    storeCreators,
    eventCreators,
    effectCreators,
    domainCreators,
    restoreCreators,
    combineCreators,
    sampleCreators,
    forwardCreators,
    guardCreators,
    attachCreators,
    splitCreators,
    apiCreators,
    mergeCreators,
    domainMethods,
    reactMethods,
  }: {
    stores: boolean
    events: boolean
    effects: boolean
    domains: boolean
    restores: boolean
    combines: boolean
    samples: boolean
    forwards: boolean
    guards: boolean
    attaches: boolean
    splits: boolean
    apis: boolean
    merges: boolean
    gates: boolean

    storeCreators: Set<string>
    eventCreators: Set<string>
    effectCreators: Set<string>
    domainCreators: Set<string>
    restoreCreators: Set<string>
    combineCreators: Set<string>
    sampleCreators: Set<string>
    forwardCreators: Set<string>
    guardCreators: Set<string>
    attachCreators: Set<string>
    splitCreators: Set<string>
    apiCreators: Set<string>
    mergeCreators: Set<string>
    domainMethods: {
      store: Set<string>
      event: Set<string>
      effect: Set<string>
      domain: Set<string>
    }
    reactMethods: {
      createGate: Set<string>
    }
  },
) {
  const methodParsers: MethodParser[] = [
    {
      flag: stores,
      set: storeCreators,
      fn: (path, state, name, id) =>
        setStoreNameAfter(path, state, id, t, smallConfig, false, name),
    },
    {
      flag: events,
      set: eventCreators,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig, name),
    },
    {
      flag: effects,
      set: effectCreators,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig, name),
    },
    {
      flag: domains,
      set: domainCreators,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig, name),
    },
    {
      flag: restores,
      set: restoreCreators,
      fn: (path, state, name, id) =>
        setRestoreNameAfter(path, state, id, t, smallConfig, name),
    },
    {
      flag: combines,
      set: combineCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, false, name),
    },
    {
      flag: samples,
      set: sampleCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, false, name),
    },
    {
      flag: forwards,
      set: forwardCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, true, name),
    },
    {
      flag: guards,
      set: guardCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, false, name),
    },
    {
      flag: attaches,
      set: attachCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, id, t, smallConfig, true, name),
    },
    {
      flag: splits,
      set: splitCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, null, t, smallConfig, false, name),
    },
    {
      flag: apis,
      set: apiCreators,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(path, state, null, t, smallConfig, false, name),
    },
    {
      flag: merges,
      set: mergeCreators,
      fn: (path, state, name, id) =>
        setStoreNameAfter(path, state, id, t, smallConfig, false, name),
    },
  ]
  const domainMethodParsers: MethodParser[] = [
    {
      flag: stores,
      set: domainMethods.store,
      fn: (path, state, name, id) =>
        setStoreNameAfter(path, state, id, t, smallConfig, false),
    },
    {
      flag: events,
      set: domainMethods.event,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: effects,
      set: domainMethods.effect,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
    {
      flag: domains,
      set: domainMethods.domain,
      fn: (path, state, name, id) =>
        setEventNameAfter(path, state, id, t, smallConfig),
    },
  ]
  const reactMethodParsers: MethodParser[] = [
    {
      flag: gates,
      set: reactMethods.createGate,
      fn: (path, state, name, id) =>
        setConfigForConfMethod(
          path,
          state,
          id,
          t,
          smallConfig,
          false,
          name,
          true,
        ),
    },
  ]
  return {
    methodParsers,
    domainMethodParsers,
    reactMethodParsers,
  }
}
