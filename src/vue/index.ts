import Vue, {VueConstructor, ComponentOptions} from 'vue'
import {createEvent, restore, is, combine, Store, withRegion, clearNode, forward} from 'effector'

export interface EffectorVue extends Vue {
  $watchAsStore: typeof watchAsStore;
  $store: typeof store;
}

export const VueEffector = (
  vue: VueConstructor<EffectorVue>,
  options: Object,
) => {
  vue.mixin(effectorMixin)
  vue.prototype.$watchAsStore = watchAsStore
  vue.prototype.$store = store
}

const effectorMixin: ComponentOptions<Vue> = {
  beforeCreate() {
    let shape = this.$options.effector;

    if (typeof shape === "function") shape = shape.call(this);
    if (!shape) return;
    if (!this.$options.computed) this.$options.computed = {}

    // @ts-ignore
    this.__clear = createEvent();

    // @ts-ignore
    this.__forwards = [];
    let computed: Record<string, any> = {};

    // @ts-ignore
    withRegion(this.__clear, () => {
      if (is.store(shape)) {
        const key = 'state';
        const reactive = Vue.observable({
          [key]: shape.getState()
        })

        const updated = createEvent();
        const unwatch = forward({from: updated, to: shape})

        // @ts-ignore
        this.__forwards.push(unwatch);
        shape.watch(value => {
          reactive[key] = value;
        })

        computed[key] = {
          get: () => reactive[key],
          set: updated
        };

        this.$options.computed = {
          ...this.$options.computed,
          ...computed
        };
      } else if (typeof shape === 'object' && shape !== null) {
        const state: Record<string, Store<any>> = {};
        let nextID = 0;

        for(const key in shape) {
          const v = shape[key];

          if (is.store(v)) {
            state[key] = v;
          } else if (is.unit(v)) {
            state[key] = restore(v.map(() => ++nextID), null);
          } else {
            throw Error('property should be Store or Unit (will be transform to Store<number>)');
          }
        }

        const store = combine(state);
        const reactive = Vue.observable(store.defaultState);

        store.watch(value => {
          for (const key in value) {
            reactive[key] = value[key]
          }
        })

        for (const key in reactive) {
          const updated = createEvent();
          const unwatch = forward({from: updated, to: state[key]});

          // @ts-ignore
          this.__forwards.push(unwatch);
          computed[key] = {
            get: () => reactive[key],
            set: updated
          };
        }

        this.$options.computed = {
          ...this.$options.computed,
          ...computed
        };
      } else {
        throw Error('property should be Store')
      }
    })
  },

  beforeDestroy() {
    // @ts-ignore
    if (this.__clear) {
      // @ts-ignore
      clearNode(this.__clear);

      // @ts-ignore
      this.__forwards.forEach(unwatch => {
        unwatch()
      });
    }
  }
}

export function createComponent<S>(options: any, store?: S) {
  return Vue.extend(
    Object.assign(
      {},
      options,
      store && {
        effector: () => store
      },
    ),
  )
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
