import {Scope, is} from 'effector'
import type {App, Plugin} from 'vue-next'

import {EffectorScopeConfigKey, EffectorScopeKey} from './lib/scope-key'
import {throwError} from './lib/throw'

export type EffectorScopePluginOptions = {
  scope: Scope
  scopeName?: string
  forceScope?: boolean
  /**
   * Overrides the server render detection of the composables: on a server
   * they read the scope without subscribing to it. Set it for a renderer
   * that provides no context of its own.
   */
  ssr?: boolean
}

export function EffectorScopePlugin(options: EffectorScopePluginOptions): Plugin
export function EffectorScopePlugin(
  app: App,
  options: EffectorScopePluginOptions,
): void
export function EffectorScopePlugin(
  appOrOptions: any,
  maybeOptions?: EffectorScopePluginOptions,
): any {
  /**
   * `app.use(EffectorScopePlugin, {scope})` calls the plugin as a function
   * with the application first; that form used to install nothing at all.
   * `app.use(EffectorScopePlugin({scope}))` stays the documented one.
   */
  if (isApp(appOrOptions)) {
    install(appOrOptions, maybeOptions)
    return
  }

  const options = appOrOptions as EffectorScopePluginOptions

  return {
    install(app: App) {
      install(app, options)
    },
  }
}

function install(app: App, options?: EffectorScopePluginOptions) {
  if (!options || !is.scope(options.scope)) {
    throwError(
      'EffectorScopePlugin: expected "scope" to be a Scope created by fork()',
    )
  }

  const {scope, scopeName = 'root', forceScope, ssr} = options

  app.provide(EffectorScopeKey, scope)
  app.provide(EffectorScopeConfigKey, {forceScope, scopeName, ssr})

  /**
   * The scope used to be provided under a string key read from
   * `globalProperties.scopeName`; both are kept for applications and plugins
   * written against that contract.
   */
  app.config.globalProperties.scopeName = scopeName
  app.provide(scopeName, scope)
}

function isApp(value: any): value is App {
  return (
    !!value &&
    typeof value.provide === 'function' &&
    typeof value.use === 'function' &&
    !!value.config
  )
}
