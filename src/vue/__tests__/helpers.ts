import {Scope} from 'effector'
import {EffectorScopePlugin} from 'effector-vue/composition'
import {
  App,
  Component,
  Plugin,
  createApp,
  createSSRApp,
  effectScope,
} from 'vue-next'
import {renderToString} from '@vue/server-renderer'

type AppOptions = {
  scope?: Scope
  plugins?: Plugin[]
}

/** Runs a composable in the setup of a mounted component. */
export function withSetup<T>(composable: () => T, plugins: Plugin[] = []): T {
  return mountSetup(composable, plugins).result
}

/** The same, with a handle to unmount the application afterwards. */
export function mountSetup<T>(composable: () => T, plugins: Plugin[] = []) {
  let result: T
  const app = createApp({
    setup() {
      result = composable()
      return () => null
    },
  })
  for (const plugin of plugins) app.use(plugin)
  app.mount(document.createElement('div'))

  return {
    result: result!,
    unmount: () => app.unmount(),
  }
}

/**
 * Runs a composable with an injection context but without a component
 * instance: the same conditions `app.runWithContext` and Vapor components
 * give.
 */
export function withApp<T>(
  composable: () => T,
  install?: (app: App) => void,
): T {
  const app = createApp({render: () => null})
  if (install) install(app)
  return app.runWithContext(composable)
}

/**
 * Runs a composable in a detached effect scope, the way a store of a state
 * manager or a shared composable does it: there is no component to unmount,
 * the scope is stopped by hand.
 */
export function withEffectScope<T>(
  composable: () => T,
  install?: (app: App) => void,
) {
  const app = createApp({render: () => null})
  if (install) install(app)
  const scope = effectScope(true)
  const result = scope.run(() => app.runWithContext(composable))!

  return {
    result,
    stop: () => scope.stop(),
  }
}

/** Watcher nodes the composables keep in a scope. */
export function linksCount(scope: Scope): number {
  const links = (scope as any).additionalLinks as Record<string, unknown[]>
  return Object.keys(links).reduce((count, id) => count + links[id].length, 0)
}

export function renderSSR(
  component: Component,
  options: AppOptions = {},
): Promise<string> {
  return renderToString(createTestApp(createSSRApp, component, options))
}

export function hydrateInto(
  html: string,
  component: Component,
  options: AppOptions = {},
) {
  const container = document.createElement('div')
  container.innerHTML = html
  const app = createTestApp(createSSRApp, component, options)
  app.mount(container)

  return {
    container,
    unmount: () => app.unmount(),
  }
}

function createTestApp(
  create: typeof createApp,
  component: Component,
  {scope, plugins = []}: AppOptions,
) {
  const app = create(component)
  if (scope) app.use(EffectorScopePlugin({scope}))
  for (const plugin of plugins) app.use(plugin)
  return app
}
