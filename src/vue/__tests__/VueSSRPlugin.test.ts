import {Scope, fork} from 'effector';
import { mount, config } from "vue-test-utils-next"
import { getCurrentInstance } from 'vue-next';
import { useProvidedScope } from '../composition';

import { VueSSRPlugin } from '../ssr/VueSSRPlugin';

jest.mock('vue', () => require('vue-next'))

function mountWithPlugin() {
  let scopeName: string | undefined
  let provided: Scope | null = null

  const wrapper = mount({
    template: `
      <div>{{scopeName}}</div>
    `,
    setup() {
      scopeName = getCurrentInstance()!.appContext.config.globalProperties
        .scopeName
      provided = useProvidedScope()
      return {
        scopeName
      }
    }
  });

  return {wrapper, scopeName, provided}
}

it('check default scope name', () => {
  const scope = fork()

  config.global.plugins = [VueSSRPlugin({scope})]

  const {wrapper, scopeName, provided} = mountWithPlugin()

  expect(scopeName).toBe("root");
  expect(wrapper.vm.scopeName).toBe("root");
  expect(provided).toBe(scope);
})

it('set custom scope name', () => {
  const scope = fork()

  config.global.plugins = [VueSSRPlugin({scope, scopeName: "my-custom-scope-name"})]

  const {wrapper, scopeName, provided} = mountWithPlugin()

  expect(scopeName).toBe("my-custom-scope-name");
  expect(wrapper.vm.scopeName).toBe("my-custom-scope-name");
  expect(provided).toBe(scope);
})
