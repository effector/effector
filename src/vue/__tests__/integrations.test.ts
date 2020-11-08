/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import App from './integrations/src/App'

jest.mock('vue', () => require('vue-next'))

it('no console errors', () => {
  const wrapper = shallowMount(App)
  console.log(wrapper)
})
