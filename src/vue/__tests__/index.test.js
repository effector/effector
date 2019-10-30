//@flow

/*::import typeof VueType from 'vue'*/
const Vue = require('vue/dist/vue')
import {Store, combine, createStore} from 'effector'
import {VueEffector, createComponent} from '../'

const counter = createStore(0)

const component = {
  data() {
    return {
      meme: 'lol',
    }
  },
  effector(): Store<string> {
    return combine(
      this.$store(() => this.meme),
      counter,
      (meme, counter) => `${meme} + ${counter}`,
    )
  },
}

const componentWithWrapper = createComponent({
  name: 'ComponentWithWrapper'
}, {counter})

const vm = new Vue(component).$mount()
const vmWithWrapper = new Vue(componentWithWrapper).$mount()

console.error(vmWithWrapper)

console.error(vm)
