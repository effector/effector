import {fork} from 'effector';
import { mount, config } from "vue-test-utils-next"
import { getScope } from '../lib/get-scope';

import { VueSSRPlugin } from '../ssr/VueSSRPlugin';

jest.mock('vue', () => require('vue-next'))

it('check default scope name', () => {
  const scope = fork()

  config.global.plugins = [VueSSRPlugin({scope})]

  const wrapper = mount({
    template: `
      <div>{{scopeName}}</div>
    `,
    setup() {
      const {scopeName} = getScope()
      return {
        scopeName
      }
    }
  });

  expect(wrapper.vm.scopeName).toBe("root");
})

it('set custom scope name', () => {
  const scope = fork()

  config.global.plugins = [VueSSRPlugin({scope, scopeName: "my-custom-scope-name"})]

  const wrapper = mount({
    template: `
      <div>{{scopeName}}</div>
    `,
    setup() {
      const {scopeName} = getScope()
      return {
        scopeName
      }
    }
  });

  expect(wrapper.vm.scopeName).toBe("my-custom-scope-name");
})
