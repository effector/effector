import { createStore } from 'effector';
import { defineComponent, h } from 'vue-next';
import { useStore } from '../../../../../npm/effector-vue/composition.cjs';

const $user = createStore('')

export default defineComponent({
  name: 'App',
  setup() {
    const user = useStore($user);
    return {user}
  },
  render() {
    return h('div', 'Hello, world')
  }
})