import {Plugin} from 'vue-next';
import {Scope, Event} from 'effector';

export function VuePluginSSR(config: {scope: Scope; scopeName?: string}): Plugin
export function useEvent<T>(event: Event<T>): (payload: T) => void
