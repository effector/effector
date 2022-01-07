import {Plugin} from 'vue';
import {Scope, Event} from 'effector';

export function VueSSRPlugin(config: {scope: Scope; scopeName?: string}): Plugin
export function useEvent<T>(event: Event<T>): (payload: T) => void
