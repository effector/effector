import {Plugin} from 'vue'
import {Scope, Event} from 'effector'

/** @deprecated since v23.0.0 */
export function VueSSRPlugin(config: {scope: Scope; scopeName?: string}): Plugin

/** @deprecated since v23.0.0 */
export function useEvent<T>(event: Event<T>): (payload: T) => void
