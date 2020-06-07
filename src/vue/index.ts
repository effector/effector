import Vue, {VueConstructor} from 'vue'
import {createEvent, restore, is, combine, Store, Subscription, Event} from 'effector'

export interface EffectorVue extends Vue {
  $watchAsStore: typeof watchAsStore
  $store: typeof store
}

export const VueEffector = (
  vue: VueConstructor<EffectorVue>,
  options: Object,
) => {
  vue.mixin(effectorMixin)
  vue.prototype.$watchAsStore = watchAsStore
  vue.prototype.$store = store
}

function watchAsStore(
  this: EffectorVue,
  expOrFn: string | Function,
  options: {
    immediate?: boolean
  } = {
    immediate: true,
  },
): Store<{oldValue: any; newValue: any}> {
  const update = createEvent<{oldValue: any; newValue: any}>()
  const store = restore(update, {} as any)
  const watch = () => {
    this.$watch(
      //@ts-ignore
      expOrFn,
      //@ts-ignore
      (newValue, oldValue) => {
        update({oldValue, newValue})
      },
      options,
    )
  }
  //@ts-ignore
  if (this._data) {
    watch()
  } else {
    this.$once('hook:created', watch)
  }

  return store
}

function store<State>(
  this: EffectorVue,
  expOrFn: string | Function,
): Store<State> {
  return this.$watchAsStore(expOrFn).map(({newValue}) => newValue)
}

//@ts-ignore
const effectorMixin: {
  beforeCreate(): void
  beforeDestroy(): void
  _subscription?: Subscription
  $options: {
    effector?: (() => Store<any>) | Store<any> | {[key: string]: Store<any> | Event<any>}
  }
  [key: string]: any
} = {
  beforeCreate() {
    const key = 'state'
    let shape = this.$options.effector
    if (typeof shape === 'function') {
      shape = shape.call(this)
    }
    if (shape) {
      let nextID = 0;
      if (is.store(shape)) {
        //@ts-ignore
        Vue.util.defineReactive(this, key, shape.getState())
        this._subscription = shape.watch(value => {
          this[key] = value
        })
      } else if (typeof shape === 'object' && shape !== null) {
        const state = {} as Record<string, Store<any>>;
        for (const key in shape) {
          const v = shape[key];
          state[key] = is.store(v) ? v : restore(v.map(() => ++nextID), null);
        }

        const store = combine(state)
        for (const key in state) {
          //@ts-ignore
          Vue.util.defineReactive(this, key, store.defaultState[key])
        }
        this._subscription = store.watch(value => {
          for (const key in value) {
            this[key] = value[key]
          }
        })
      } else {
        throw Error('property should be Store')
      }
    }
  },
  beforeDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  },
}

export function createComponent<S>(options: any, store?: S) {
  return Vue.extend(
    Object.assign(
      {},
      options,
      store && {
        effector() {
          return store
        },
      },
    ),
  )
}
