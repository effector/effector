import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import {useStore} from 'effector-vue/composition'

beforeEach(() => {
  Vue.use(VueCompositionAPI)
})

it('exists', () => {
  expect(typeof useStore === 'function').toBe(true)
})
