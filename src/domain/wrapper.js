//@flow

import type {Domain} from './index.h'
import type {Event} from 'effector/event'
// import type {Store} from 'effector/store'
import type {Effect} from 'effector/effect'
function watchEvent(e: Event<any> | Effect<any, any, any>, watcher: Function) {
 return e.watch(watcher)
}

function eventWrapper(
 event: (name?: string) => Event<any>,
 watcher: Function,
 name?: string,
) {
 const e = event(name)
 watchEvent(e, watcher)
 return e
}

function effectWrapper(
 effect: (name?: string) => Effect<any, any, any>,
 watcher: Function,
 name?: string,
) {
 const e = effect(name)
 watchEvent(e, watcher)
 watchEvent(e.done, watcher)
 watchEvent(e.fail, watcher)
 return e
}
function domainWrapper(
 domain: (name?: string) => Domain,
 watcher: Function,
 name?: string,
) {
 //$off
 const child = domain(name)
 //$off
 child.event = (name?: string) => eventWrapper(child.event, watcher, name)
 //$off
 child.effect = (name?: string) => effectWrapper(child.effect, watcher, name)
 //$off
 child.domain = (name?: string) => domainWrapper(child.domain, watcher, name)
 return child
}

export function createWrappedDomain(
 watcher: Function,
 parentFabric: (name?: string) => Domain,
 name?: string,
): Domain {
 return domainWrapper(parentFabric, watcher, name)
}
