//@flow

import Vue from 'vue'
import {effectorMixin} from './mixin'
import {createComponent} from './component'
import {watchAsStore, store} from './methods'

export const VueEffector = (Vue: Class<Vue>, options: Object) => {
  Vue.mixin(effectorMixin)
  //$off
  Vue.prototype.$watchAsStore = watchAsStore
  //$off
  Vue.prototype.$store = store
}

export {createComponent}

declare export class EffectorVue extends Vue {
  $watchAsStore: typeof watchAsStore;
  $store: typeof store;
}
